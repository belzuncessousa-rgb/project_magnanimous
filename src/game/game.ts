// Game controller: turn flow, scene availability, newspapers, pop-ups, free actions. No DOM.
import { evaluateCrises } from '../core/crisis';
import { applyEffects, canAfford, pay } from '../core/effects';
import { normId, resolveCountry, resolveRegion } from '../core/ids';
import { test } from '../core/query';
import { TUNING } from '../core/tuning';
import { simulateTurn } from '../core/turn';
import type { GameState } from '../core/types';
import { createState, STATE_VERSION } from '../core/world';
import type { ChapterDef, ContentBundle, FreeAction, NewsItem, Paper, Popup, TurnDef } from '../content/schema';
import { SceneRunner, type RunnerOptions } from '../scene/runner';
import { budgetTurn } from './politics';
import type { Scene } from '../scene/types';

export interface Edition {
  dateLabel: string;
  papers: { paper: Paper; items: NewsItem[] }[];
}

export interface EndTurnResult {
  edition: Edition;
  firedCrises: string[];
  ended: boolean;
}

export interface FreeActionView {
  action: FreeAction;
  available: boolean;
  affordable: boolean;
  cooldown: number;
}

export class Game {
  constructor(
    readonly content: ContentBundle,
    public state: GameState,
  ) {}

  static newGame(content: ContentBundle): Game {
    const g = new Game(content, createState(content.world));
    const first = content.chapters[0];
    if (first && !content.world.start?.chapter) g.state.chapter = first.id;
    g.startTurn();
    return g;
  }

  static fromState(content: ContentBundle, state: GameState): Game {
    if (state.version !== STATE_VERSION) throw new Error('Incompatible save');
    state.activePopups ??= [];
    return new Game(content, state);
  }

  // ---------------------------------------------------------------- structure

  chapterDef(chapter = this.state.chapter): ChapterDef | undefined {
    return this.content.chapters.find((c) => c.id === chapter);
  }

  turnDef(): TurnDef | undefined {
    return this.chapterDef()?.turns.find((t) => t.turn === this.state.turn);
  }

  scene(id: string): Scene | undefined {
    return this.content.scenes.find((s) => s.id === id);
  }

  private crisisForScene(id: string) {
    return this.content.crises.find((c) => c.scene === id);
  }

  isAvailable(sc: Scene): boolean {
    const s = this.state;
    if (s.completedScenes.includes(sc.id)) return false;
    // unlocked by a `→ scene:<id>` jump from a finished scene: available now, played from the map
    if (s.flags[`unlocked.${sc.id}`]) return test(s, sc.meta.when, { sceneId: sc.id });
    const td = this.turnDef();
    if (td?.closing === sc.id) {
      // closing scene: only once every other scene of the turn has been played
      const others = this.content.scenes.filter((o) => o.id !== sc.id && this.isAvailable(o));
      return others.length === 0 && test(s, sc.meta.when, { sceneId: sc.id });
    }
    if (this.isClosingElsewhere(sc.id)) return false;
    const listed = td?.scenes.includes(sc.id) ?? false;
    const crisis = this.crisisForScene(sc.id);
    if (crisis && !s.crisis[crisis.id]?.fired) return false;
    if (!listed && !crisis) {
      if (sc.meta.chapter !== undefined && sc.meta.chapter !== s.chapter) return false;
      if (sc.meta.turn !== undefined && sc.meta.turn > s.turn) return false;
      if (sc.meta.chapter === undefined && sc.meta.turn === undefined && sc.meta.kind !== 'crisis' && !sc.meta.when) return false;
    }
    return test(s, sc.meta.when, { sceneId: sc.id });
  }

  /** a scene used as `closing` of some turn is never offered as an ordinary scene */
  private isClosingElsewhere(id: string): boolean {
    return this.content.chapters.some((c) => c.turns.some((t) => t.closing === id));
  }

  isClosing(sc: Scene): boolean {
    return this.turnDef()?.closing === sc.id;
  }

  isRequired(sc: Scene): boolean {
    if (this.isClosing(sc)) return true;
    return sc.meta.required ?? TUNING.requiredKinds.includes(sc.meta.kind);
  }

  /** Scenes playable now, ordered: forced-order scenes first, then required, then the rest. */
  availableScenes(): Scene[] {
    const list = this.content.scenes.filter((s) => this.isAvailable(s));
    const key = (s: Scene) => [s.meta.order ?? 999, this.isRequired(s) ? 0 : 1] as const;
    return list.sort((a, b) => {
      const ka = key(a);
      const kb = key(b);
      return ka[0] - kb[0] || ka[1] - kb[1];
    });
  }

  /** The scene that must be played before anything else (lowest `order`), if any. */
  forcedScene(): Scene | undefined {
    return this.availableScenes().find((s) => s.meta.order !== undefined);
  }

  isLocked(sc: Scene): boolean {
    const f = this.forcedScene();
    return !!f && f.id !== sc.id;
  }

  pendingRequired(): Scene[] {
    const pending = this.availableScenes().filter((s) => this.isRequired(s));
    const closing = this.turnDef()?.closing;
    if (closing && pending.length === 0 && this.scene(closing) && !this.state.completedScenes.includes(closing)) {
      // closing scene not yet unlocked (optional scenes remain) still blocks the end of the turn
      return [this.scene(closing)!];
    }
    return pending;
  }

  canEndTurn(): boolean {
    return !this.state.ended && this.pendingRequired().length === 0;
  }

  // ---------------------------------------------------------------- scenes

  startScene(id: string, opts: RunnerOptions = {}): SceneRunner {
    const sc = this.scene(id);
    if (!sc) throw new Error(`Unknown scene ${id}`);
    return new SceneRunner(sc, this.state, opts);
  }

  /** Mark a scene played. A chained `→ scene:<id>` is not auto-played: it becomes available on the map. */
  completeScene(id: string, nextScene?: string): void {
    if (nextScene && this.scene(nextScene)) this.state.flags[`unlocked.${nextScene}`] = true;
    if (!this.state.completedScenes.includes(id)) this.state.completedScenes.push(id);
    // DATA-SCHEMAS: seen_<scene_id_with_underscores>
    this.state.flags[`seen_${id.replace(/-/g, '_')}`] = true;
  }

  // ---------------------------------------------------------------- turn flow

  /** Prepare the current turn: date label, pop-ups. Called on new game and after each end turn. */
  startTurn(): void {
    const td = this.turnDef();
    if (td) this.state.dateLabel = td.date;
    else if (!this.state.dateLabel) this.state.dateLabel = `Chapter ${this.state.chapter} · Turn ${this.state.turn}`;
    this.state.activePopups = this.selectPopups().map((p) => p.id);
    for (const id of this.state.activePopups) if (!this.state.shownPopups.includes(id)) this.state.shownPopups.push(id);
    this.state.popupQueue = [];
  }

  popup(id: string): Popup | undefined {
    return this.content.popups.find((p) => p.id === id);
  }

  /** Player opened a readable: remember it and set its optional flags. */
  readPopup(id: string): Popup | undefined {
    const p = this.popup(id);
    if (!p) return undefined;
    this.state.flags[`read.${id}`] = true;
    for (const [k, v] of Object.entries(p.flags ?? {})) this.state.flags[k] = v;
    return p;
  }

  isRead(id: string): boolean {
    return this.state.flags[`read.${id}`] === true;
  }

  activePopups(): Popup[] {
    return this.state.activePopups.map((id) => this.popup(id)).filter((p): p is Popup => !!p);
  }

  private selectPopups(): Popup[] {
    const s = this.state;
    const listed = new Set(this.turnDef()?.popups ?? []);
    const queued = new Set(s.popupQueue);
    return this.content.popups.filter((p) => {
      if (!p.repeat && s.shownPopups.includes(p.id)) return false;
      const timed = p.chapter !== undefined || p.turn !== undefined;
      const timeOk = (p.chapter === undefined || p.chapter === s.chapter) && (p.turn === undefined || p.turn === s.turn);
      const eligible = queued.has(p.id) || listed.has(p.id) || (timed ? timeOk : !!p.when);
      return eligible && test(s, p.when);
    });
  }

  /** Newspaper items for the turn that is ending. Marks them printed. */
  collectEdition(): Edition {
    const s = this.state;
    const chosen: NewsItem[] = [];
    const add = (it: NewsItem | undefined) => {
      if (it && !chosen.includes(it)) chosen.push(it);
    };
    const find = (ref: { paper?: string; id: string }) =>
      this.content.news.find((n) => n.id === ref.id && (!ref.paper || n.paper === normId(ref.paper))) ??
      this.content.news.find((n) => n.id === ref.id);
    for (const ref of s.newsQueue) {
      const it = find(ref);
      if (it && test(s, it.when)) add(it);
    }
    for (const ref of this.turnDef()?.news ?? []) {
      const it = find(ref);
      if (it && (it.repeat || !s.printedNews.includes(it.id)) && test(s, it.when)) add(it);
    }
    for (const it of this.content.news) {
      if (it.queuedOnly) continue;
      if (!it.repeat && s.printedNews.includes(it.id)) continue;
      const timed = it.chapter !== undefined || it.turn !== undefined;
      if (timed) {
        if (it.chapter !== undefined && it.chapter !== s.chapter) continue;
        if (it.turn !== undefined && it.turn !== s.turn) continue;
      } else if (!it.when) continue;
      if (test(s, it.when)) add(it);
    }
    s.newsQueue = [];
    for (const it of chosen) if (!s.printedNews.includes(it.id)) s.printedNews.push(it.id);
    const papers = this.content.papers
      .map((paper) => ({ paper, items: chosen.filter((i) => i.paper === paper.id).sort((a, b) => a.priority - b.priority) }))
      .filter((p) => p.items.length > 0);
    // items for unknown papers go to a generic sheet
    const unknown = chosen.filter((i) => !this.content.papers.some((p) => p.id === i.paper));
    if (unknown.length) papers.push({ paper: { id: 'wire', name: 'Wire Services', slant: '', tagline: '' }, items: unknown });
    return { dateLabel: s.dateLabel, papers };
  }

  /** End the current turn: newspaper, simulation, crises, advance. */
  endTurn(): EndTurnResult {
    const edition = this.collectEdition();
    simulateTurn(this.state);
    budgetTurn(this.state, this.content.ministries);
    const firedCrises = evaluateCrises(this.state, this.content.crises);
    this.advance();
    if (!this.state.ended) this.startTurn();
    return { edition, firedCrises, ended: this.state.ended };
  }

  private advance(): void {
    const s = this.state;
    s.turnIndex++;
    const ch = this.chapterDef();
    const maxTurn = ch ? Math.max(...ch.turns.map((t) => t.turn), 1) : s.turn;
    if (s.turn < maxTurn) {
      s.turn++;
      return;
    }
    // chapters without turns are unwritten (todo): the story stops there for now
    const next = this.content.chapters.find((c) => c.id > s.chapter);
    if (next && next.turns.length) {
      s.chapter = next.id;
      s.turn = Math.min(...next.turns.map((t) => t.turn));
    } else {
      s.ended = true;
    }
  }

  // ---------------------------------------------------------------- free actions

  freeActions(): FreeActionView[] {
    return this.content.freeActions
      .filter((a) => test(this.state, a.when))
      .map((a) => {
        const cooldown = this.state.cooldowns[a.id] ?? 0;
        const affordable = canAfford(this.state, a.cost);
        return { action: a, affordable, cooldown, available: affordable && cooldown === 0 && !this.state.ended };
      });
  }

  validTargets(a: FreeAction, geometryIds: { regions: string[]; countries: string[] }): string[] {
    const regions = geometryIds.regions.filter((id) => !!resolveRegion(this.state, id));
    const countries = geometryIds.countries.filter((id) => !!resolveCountry(this.state, id));
    if (a.targets === 'regions') return regions;
    if (a.targets === 'countries') return countries;
    if (a.targets === 'any') return [...regions, ...countries];
    return a.targets.filter((id) => regions.includes(id) || countries.includes(id) || resolveRegion(this.state, id) || resolveCountry(this.state, id));
  }

  /** Perform a free action. Returns the result text (no numbers) or null if not possible. */
  doFreeAction(id: string, target?: string): { text: string; scene?: string } | null {
    const view = this.freeActions().find((v) => v.action.id === id);
    if (!view || !view.available) return null;
    const a = view.action;
    if (a.targeted && !target) return null;
    pay(this.state, a.cost);
    applyEffects(this.state, a.effects, { target, vars: target ? { target } : undefined });
    if (a.cooldown > 0) this.state.cooldowns[a.id] = a.cooldown;
    this.state.freeActionsUsed[a.id] = (this.state.freeActionsUsed[a.id] ?? 0) + 1;
    const tname = target ? (this.state.regions[target]?.name ?? this.state.countries[target]?.name ?? target) : '';
    const text = (a.result ?? `${a.label}${tname ? ` — ${tname}` : ''}.`).replace(/\{target\}/g, tname);
    return { text, scene: a.scene };
  }
}
