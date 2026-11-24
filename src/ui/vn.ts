// VN MODE: dimmed map, centre text column, portraits left/right, choice buttons. No numeric feedback.
import { resolveActor } from '../core/ids';
import type { GameState } from '../core/types';
import type { ChoiceOption, SceneRunner } from '../scene/runner';
import type { Prose } from '../scene/types';
import { clear, h, initials, inlineMd, wait } from './dom';

export interface VNOptions {
  transitions: boolean;
  /** player character id (portrait on the left) */
  playerId: string;
}

interface Who {
  id?: string;
  name: string;
  portrait?: string;
}

function costLabel(o: ChoiceOption): string {
  const parts = Object.entries(o.choice.cost).filter(([, v]) => v).map(([k, v]) => `${v} ${k}`);
  return parts.join(' · ');
}

export class VNView {
  readonly el: HTMLElement;
  private log: HTMLElement;
  private choices: HTMLElement;
  private left: HTMLElement;
  private right: HTMLElement;
  private titleEl: HTMLElement;
  private advanceResolve: (() => void) | null = null;
  private rightWho: string | null = null;

  constructor(
    private state: () => GameState,
    private opts: VNOptions,
  ) {
    this.titleEl = h('div', { class: 'vn-title' });
    this.log = h('div', { class: 'vn-log', 'aria-live': 'polite' });
    this.choices = h('div', { class: 'vn-choices' });
    this.left = h('div', { class: 'portrait portrait-left' });
    this.right = h('div', { class: 'portrait portrait-right' });
    const column = h('div', { class: 'vn-column paper' }, this.titleEl, this.log, this.choices);
    this.el = h('div', { class: 'vn', hidden: true }, this.left, column, this.right);
    column.addEventListener('click', (ev) => {
      if ((ev.target as Element).closest('button')) return;
      this.advance();
    });
    window.addEventListener('keydown', (ev) => {
      if (this.el.hidden) return;
      if (ev.key === ' ' || ev.key === 'Enter') {
        if (this.advanceResolve) {
          ev.preventDefault();
          this.advance();
        }
      } else if (/^[1-9]$/.test(ev.key)) {
        const btn = this.choices.querySelectorAll<HTMLButtonElement>('button.choice:not([disabled])')[Number(ev.key) - 1];
        btn?.click();
      }
    });
  }

  setOptions(o: Partial<VNOptions>) {
    Object.assign(this.opts, o);
  }

  private advance() {
    const r = this.advanceResolve;
    this.advanceResolve = null;
    r?.();
  }

  private who(name: string | undefined): Who {
    const st = this.state();
    if (!name) {
      const p = st.actors[this.opts.playerId];
      return { id: this.opts.playerId, name: p?.name ?? 'Lara Vento', portrait: p?.portrait ?? this.opts.playerId };
    }
    const id = resolveActor(st, name);
    const a = id ? st.actors[id] : undefined;
    return { id, name: a?.name ?? name, portrait: a?.portrait ?? id };
  }

  private renderPortrait(slot: HTMLElement, who: Who | null, active: boolean) {
    slot.classList.toggle('active', active);
    const key = who ? who.id ?? who.name : '';
    if (slot.dataset.who === key) return;
    slot.dataset.who = key;
    clear(slot);
    if (!who) return;
    const fig = h('figure', { class: 'portrait-frame' },
      h('div', { class: 'silhouette' }, h('span', { class: 'initials' }, initials(who.name))),
      h('figcaption', {}, who.name));
    if (who.portrait) {
      const img = h('img', { src: `portraits/${who.portrait}.png`, alt: '' });
      img.addEventListener('error', () => img.remove());
      img.addEventListener('load', () => fig.classList.add('has-img'));
      fig.querySelector('.silhouette')!.append(img);
    }
    slot.append(fig);
  }

  private setSpeaker(p: Prose | null) {
    const lara = this.who(undefined);
    if (p && p.role === 'speech' && p.speaker) {
      const w = this.who(p.speaker);
      if (w.id !== this.opts.playerId) {
        this.rightWho = p.speaker;
        this.renderPortrait(this.right, w, true);
        this.renderPortrait(this.left, lara, false);
        return;
      }
    }
    const laraActive = !!p && (p.role === 'thought' || (p.role === 'speech' && (!p.speaker || this.who(p.speaker).id === this.opts.playerId)));
    this.renderPortrait(this.left, lara, laraActive);
    this.renderPortrait(this.right, this.rightWho ? this.who(this.rightWho) : null, false);
  }

  private block(p: Prose): HTMLElement {
    if (p.role === 'speech') {
      const w = this.who(p.speaker);
      return h('div', { class: `blk speech${!p.speaker ? ' speech-player' : ''}` },
        h('div', { class: 'speaker' }, w.name),
        h('div', { class: 'text', html: inlineMd(p.text) }));
    }
    return h('div', { class: `blk ${p.role}`, html: inlineMd(p.text) });
  }

  private async appendBlock(el: HTMLElement) {
    for (const old of this.log.querySelectorAll('.blk.current')) old.classList.remove('current');
    el.classList.add('current', 'enter');
    this.log.append(el);
    this.log.scrollTop = this.log.scrollHeight;
    this.log.classList.toggle('overflow', this.log.scrollHeight > this.log.clientHeight + 4);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('enter')));
  }

  private waitAdvance(label = 'Continue'): Promise<void> {
    clear(this.choices);
    const btn = h('button', { class: 'continue', onclick: () => this.advance() }, `${label} ▸`);
    this.choices.append(btn);
    return new Promise((res) => (this.advanceResolve = () => { clear(this.choices); res(); }));
  }

  private waitChoice(options: ChoiceOption[]): Promise<ChoiceOption> {
    clear(this.choices);
    return new Promise((res) => {
      options.forEach((o, i) => {
        const disabled = o.locked || !o.affordable;
        const cost = costLabel(o);
        const btn = h('button', {
          class: `choice${o.locked ? ' locked' : ''}${!o.affordable ? ' unaffordable' : ''}${o.choice.spoken ? ' spoken' : ''}`,
          disabled,
          title: o.locked ? 'Not available' : !o.affordable ? 'Not enough resources' : undefined,
        },
          h('span', { class: 'num' }, `${i + 1}.`),
          h('span', { class: 'label', html: inlineMd(o.choice.label) }),
          o.locked ? h('span', { class: 'lock', 'aria-label': 'locked' }, '🔒︎') : null,
          cost ? h('span', { class: 'cost' }, cost) : null);
        btn.addEventListener('click', () => {
          clear(this.choices);
          res(o);
        });
        this.choices.append(btn);
      });
    });
  }

  /** Play a runner to its end. Resolves with the next scene id if the scene chains into another. */
  async play(runner: SceneRunner, title: string): Promise<string | undefined> {
    clear(this.log);
    this.log.classList.remove('overflow');
    clear(this.choices);
    this.rightWho = null;
    this.left.dataset.who = '';
    this.right.dataset.who = '';
    this.titleEl.textContent = title;
    const first = runner.scene.meta.portraits[0];
    if (first) this.rightWho = first;
    this.setSpeaker(null);
    this.el.hidden = false;
    document.body.classList.add('vn-active');
    await wait(this.opts.transitions ? 30 : 0);
    this.el.classList.add('open');
    let nextScene: string | undefined;
    for (;;) {
      const out = runner.next();
      if (out.type === 'prose') {
        this.setSpeaker(out.prose);
        await this.appendBlock(this.block(out.prose));
        await this.waitAdvance();
      } else if (out.type === 'choices') {
        const o = await this.waitChoice(out.options);
        runner.choose(o.index);
        const echo = o.choice.spoken
          ? this.block({ role: 'speech', text: o.choice.label.replace(/^["“]|["”]$/g, ''), effects: [] })
          : h('div', { class: 'blk choice-echo', html: inlineMd(o.choice.label) });
        if (o.choice.spoken) this.setSpeaker({ role: 'speech', text: '', effects: [] });
        await this.appendBlock(echo);
      } else {
        nextScene = out.nextScene;
        if (!nextScene) await this.waitAdvance('Return to the map');
        break;
      }
    }
    return nextScene;
  }

  async close() {
    this.el.classList.remove('open');
    document.body.classList.remove('vn-active');
    await wait(this.opts.transitions ? 450 : 0);
    this.el.hidden = true;
  }
}
