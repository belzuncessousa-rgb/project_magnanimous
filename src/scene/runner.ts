// Scene runner: a pull-based state machine over a parsed Scene.
//   const r = new SceneRunner(scene, state);
//   let out = r.next();            // {type:'prose'} | {type:'choices'} | {type:'end'}
//   if (out.type === 'choices') r.choose(out.options[0].index);
import { applyEffects, canAfford, pay, type ApplyContext } from '../core/effects';
import { test } from '../core/query';
import type { GameState } from '../core/types';
import type { Beat, Choice, Prose, Scene, Target } from './types';

export interface ChoiceOption {
  /** index to pass to choose() */
  index: number;
  choice: Choice;
  locked: boolean;
  affordable: boolean;
}

export type RunnerOutput =
  | { type: 'prose'; prose: Prose }
  | { type: 'choices'; options: ChoiceOption[] }
  | { type: 'end'; nextScene?: string };

interface Pos {
  beat: number;
  step: number;
}

export interface RunnerSnapshot {
  pos: Pos;
  queue: Prose[];
  returnStack: Pos[];
  pendingJump: Target | null;
  ended: boolean;
  nextScene?: string;
}

export class SceneRunner {
  private pos: Pos = { beat: 0, step: 0 };
  private queue: Prose[] = [];
  private returnStack: Pos[] = [];
  private pendingJump: Target | null = null;
  private awaiting: ChoiceOption[] | null = null;
  private ended = false;
  private nextScene?: string;
  readonly warnings: string[] = [];
  /** choices made, as "beat:n" (useful for tests/analytics) */
  readonly trail: string[] = [];

  constructor(
    readonly scene: Scene,
    readonly state: GameState,
  ) {}

  private ctx(): ApplyContext {
    return { sceneId: this.scene.id, warn: (m) => this.warnings.push(m) };
  }

  private beat(i = this.pos.beat): Beat | undefined {
    return this.scene.beats[i];
  }

  get currentBeat(): string | undefined {
    return this.beat()?.id;
  }

  get isEnded(): boolean {
    return this.ended;
  }

  private onceFlag(beat: Beat, c: Choice): string {
    return `seen.${this.scene.id}.${beat.id}.${c.n}`;
  }

  private jump(t: Target) {
    switch (t.kind) {
      case 'beat': {
        const idx = this.scene.beats.findIndex((b) => b.id === t.beat);
        if (idx < 0) { this.end(); return; }
        // explicit jump back to the hub we came from resumes its menu instead of replaying its intro
        const top = this.returnStack[this.returnStack.length - 1];
        if (top && top.beat === idx) {
          this.pos = this.returnStack.pop()!;
          return;
        }
        this.pos = { beat: idx, step: 0 };
        return;
      }
      case 'scene':
        this.nextScene = t.scene;
        this.end();
        return;
      case 'end':
        this.end();
        return;
      case 'unresolved':
        this.warnings.push(`unresolved target → ${t.raw}`);
        this.end();
        return;
    }
  }

  private end() {
    this.ended = true;
  }

  private play(p: Prose): boolean {
    if (p.cond && !test(this.state, p.cond, { sceneId: this.scene.id })) return false;
    applyEffects(this.state, p.effects, this.ctx());
    return true;
  }

  visibleOptions(choices: Choice[], beat: Beat): ChoiceOption[] {
    const out: ChoiceOption[] = [];
    choices.forEach((c, index) => {
      if (c.show && !test(this.state, c.show, { sceneId: this.scene.id })) return;
      if (c.once && this.state.flags[this.onceFlag(beat, c)]) return;
      let locked = !!(c.lock && test(this.state, c.lock, { sceneId: this.scene.id }));
      for (const r of c.req) {
        if (r.expr && !test(this.state, r.expr, { sceneId: this.scene.id })) locked = true;
        if (r.amounts && !canAfford(this.state, r.amounts)) locked = true;
      }
      out.push({ index, choice: c, locked, affordable: canAfford(this.state, c.cost) });
    });
    return out;
  }

  next(): RunnerOutput {
    if (this.awaiting) return { type: 'choices', options: this.awaiting };
    for (let guard = 0; guard < 10000; guard++) {
      if (this.queue.length) {
        const p = this.queue.shift()!;
        if (this.play(p)) return { type: 'prose', prose: p };
        continue;
      }
      if (this.pendingJump) {
        const j = this.pendingJump;
        this.pendingJump = null;
        this.jump(j);
        continue;
      }
      if (this.ended) return { type: 'end', nextScene: this.nextScene };
      const beat = this.beat();
      if (!beat) {
        this.end();
        continue;
      }
      if (this.pos.step >= beat.steps.length) {
        const ret = this.returnStack.pop();
        if (ret) this.pos = ret;
        else if (!beat.steps.some((st) => st.type === 'choices')) {
          // SCENE-FORMAT: a beat with no choices and no → ends the scene
          this.end();
          continue;
        } else this.pos = { beat: this.pos.beat + 1, step: 0 };
        if (!this.beat()) this.end();
        continue;
      }
      const step = beat.steps[this.pos.step]!;
      switch (step.type) {
        case 'prose':
          this.pos.step++;
          if (this.play(step.prose)) return { type: 'prose', prose: step.prose };
          continue;
        case 'effects':
          this.pos.step++;
          applyEffects(this.state, step.effects, this.ctx());
          continue;
        case 'goto':
          this.pos.step++;
          if (step.cond && !test(this.state, step.cond, { sceneId: this.scene.id })) continue;
          this.jump(step.target);
          continue;
        case 'choices': {
          const opts = this.visibleOptions(step.choices, beat);
          if (opts.length === 0) {
            this.pos.step++;
            continue;
          }
          this.awaiting = opts;
          return { type: 'choices', options: opts };
        }
      }
    }
    throw new Error(`Scene ${this.scene.id}: runner loop guard tripped`);
  }

  /** Pick a choice by its `index` (from ChoiceOption). Returns false if it is locked/unaffordable/not offered. */
  choose(index: number): boolean {
    const opts = this.awaiting;
    if (!opts) return false;
    const opt = opts.find((o) => o.index === index);
    if (!opt || opt.locked || !opt.affordable) return false;
    const beat = this.beat()!;
    const c = opt.choice;
    this.awaiting = null;
    this.trail.push(`${beat.id}:${c.n}`);
    pay(this.state, c.cost);
    applyEffects(this.state, c.effects, this.ctx());
    if (c.once) {
      this.state.flags[this.onceFlag(beat, c)] = true;
      this.state.flags[`seen.${beat.id}.${c.n}`] = true;
    }
    this.queue.push(...c.after);
    const here: Pos = { ...this.pos };
    if (c.goto) {
      if (c.once && c.goto.kind === 'beat') this.returnStack.push(here);
      this.pendingJump = c.goto;
      this.pos = { beat: here.beat, step: here.step + 1 };
    } else if (c.once) {
      // hub option without a target: show the menu again afterwards
      this.pos = here;
    } else {
      this.pos = { beat: here.beat, step: here.step + 1 };
    }
    return true;
  }

  snapshot(): RunnerSnapshot {
    return {
      pos: { ...this.pos },
      queue: [...this.queue],
      returnStack: this.returnStack.map((p) => ({ ...p })),
      pendingJump: this.pendingJump,
      ended: this.ended,
      nextScene: this.nextScene,
    };
  }
}
