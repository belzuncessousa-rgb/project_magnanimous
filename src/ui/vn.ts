// VN MODE: dimmed map, centre text column, portraits left/right, choice buttons. No numeric feedback.
import { resolveActor } from '../core/ids';
import type { GameState } from '../core/types';
import type { ChoiceOption, SceneRunner } from '../scene/runner';
import type { Prose } from '../scene/types';
import { clear, h, initials, inlineMd, wait } from './dom';
import { costText } from './format';

export interface VNHooks {
  /** `[open: …]` / `[vote: …]` tokens: show the screen, resolve when done */
  onUi?: (action: string, arg: string) => Promise<void>;
  /** tutorial highlights for the block on screen ([] clears) */
  onHighlight?: (ids: string[]) => void;
  /** costs are hidden until the tutorial is done, then shown as a tooltip */
  showCosts?: () => boolean;
}

export interface VNOptions {
  transitions: boolean;
  /** Player character id (usually off-screen). */
  playerId: string;
}

interface Who {
  id?: string;
  name: string;
  portrait?: string;
}

function costLabel(o: ChoiceOption): string {
  return costText(o.choice.cost);
}

export class VNView {
  readonly el: HTMLElement;
  private log: HTMLElement;
  private choices: HTMLElement;
  private left: HTMLElement;
  private right: HTMLElement;
  private titleEl: HTMLElement;
  private advanceResolve: (() => void) | null = null;
  private cast: Who[] = [];
  private pose: 'seated' | 'standing' = 'standing';
  private background: HTMLElement;
  private followLog = true;
  private finishReveal: (() => void) | null = null;

  constructor(
    private state: () => GameState,
    private opts: VNOptions,
    private hooks: VNHooks = {},
  ) {
    this.titleEl = h('div', { class: 'vn-title' });
    this.log = h('div', { class: 'vn-log', 'aria-live': 'polite' });
    this.choices = h('div', { class: 'vn-choices' });
    this.left = h('div', { class: 'portrait portrait-left' });
    this.right = h('div', { class: 'portrait portrait-right' });
    this.background = h('div', { class: 'vn-background', 'aria-hidden': 'true' });
    this.log.append(this.choices);
    this.log.tabIndex = 0;
    const column = h('div', { class: 'vn-column paper' }, this.titleEl, this.log);
    this.el = h('div', { class: 'vn', hidden: true }, this.background, this.left, column, this.right);
    this.log.addEventListener('scroll', () => {
      this.followLog = this.log.scrollHeight - this.log.clientHeight - this.log.scrollTop < 48;
    }, { passive: true });
    // the choice list grows/shrinks below the log: keep the newest block in view
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => this.scrollToEnd()).observe(this.log);
    column.addEventListener('click', (ev) => {
      if ((ev.target as Element).closest('button')) return;
      this.advance();
    });
    window.addEventListener('keydown', (ev) => {
      if (this.el.hidden || ev.repeat || ev.ctrlKey || ev.altKey || ev.metaKey) return;
      if ((ev.target as Element | null)?.closest('input, textarea, select, [contenteditable=true]')) return;
      if (ev.key === ' ' || ev.key === 'Enter') {
        if (this.advanceResolve || this.finishReveal) {
          ev.preventDefault();
          this.advance();
        }
      } else if (/^[1-9]$/.test(ev.key)) {
        const btn = this.choices.querySelectorAll<HTMLButtonElement>('button.choice')[Number(ev.key) - 1];
        if (btn && !btn.disabled) { ev.preventDefault(); btn.click(); }
      }
    });
  }

  setOptions(o: Partial<VNOptions>) {
    Object.assign(this.opts, o);
  }

  private scrollToEnd() {
    if (this.followLog) this.log.scrollTop = this.log.scrollHeight;
    this.log.classList.toggle('overflow', this.log.scrollHeight > this.log.clientHeight + 4);
  }

  private advance() {
    if (this.finishReveal) { this.finishReveal(); return; }
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
      const img = h('img', { alt: '' });
      let legacy = false;
      img.addEventListener('error', () => {
        if (!legacy) { legacy = true; img.src = `portraits/${who.portrait}.png`; }
        else img.remove();
      });
      img.addEventListener('load', () => fig.classList.add(legacy ? 'has-img' : 'has-master'));
      fig.querySelector('.silhouette')!.append(img);
      img.src = `portraits/${who.portrait}-${this.pose}.png`;
    }
    slot.append(fig);
  }

  private setSpeaker(p: Prose | null) {
    const w = p?.role === 'speech' ? this.who(p.speaker) : null;
    const active = w?.id ?? w?.name;
    const left = this.cast[0] ?? null;
    const right = this.cast[1] ?? null;
    this.renderPortrait(this.left, left, !!left && (left.id ?? left.name) === active);
    this.renderPortrait(this.right, right, !!right && (right.id ?? right.name) === active);
  }

  private stage(runner: SceneRunner) {
    const id = runner.scene.meta.background ?? '';
    const rooms = new Set(['blue-room', 'blue-room-night', 'vp-office', 'president-office',
      'residence-night', 'treasury-office', 'justice-office', 'congress-office',
      'intelligence-office', 'tamarin-kitchen', 'congress-gallery']);
    const two = new Set(['blue-room', 'blue-room-night', 'vp-office', 'president-office',
      'planning-model-room', 'treasury-office', 'tamarin-kitchen', 'congress-gallery']);
    this.pose = rooms.has(id) ? 'seated' : 'standing';
    let ids = runner.scene.meta.portraits.filter(x => x !== this.opts.playerId);
    // A phone participant is not physically seated in the residence.
    if (runner.scene.id === 'p1-first-night') ids = ids.filter(x => x === 'amanda');
    // The production draft seats Livia to Lara's left and Mertens to her right.
    this.cast = ids.slice(0, two.has(id) ? 2 : 1).map(x => this.who(x));
    clear(this.background);
    this.el.classList.remove('has-environment');
    // The tutorial needs the existing map and its highlighted controls visible.
    if (id && runner.scene.id !== 'p1-tutorial' && /^[a-z0-9-]+$/.test(id)) {
      const bg = h('img', { alt: '' });
      bg.addEventListener('load', () => {
        if (bg.parentElement === this.background) this.el.classList.add('has-environment');
      });
      bg.addEventListener('error', () => bg.remove());
      this.background.append(bg);
      bg.src = `backgrounds/${id}.webp`;
    }
  }

  private overflowIcon(w: Who): HTMLElement {
    const icon = h('span', { class: 'vn-speaker-icon', 'aria-hidden': 'true' }, initials(w.name));
    if (w.portrait) {
      const img = h('img', { alt: '' });
      let legacy = false;
      img.addEventListener('error', () => {
        if (!legacy) { legacy = true; img.src = `portraits/${w.portrait}.png`; }
        else img.remove();
      });
      icon.append(img);
      img.src = `portraits/${w.portrait}-standing.png`;
    }
    return icon;
  }

  private block(p: Prose): HTMLElement {
    if (p.role === 'speech') {
      const w = this.who(p.speaker);
      const outside = w.id !== this.opts.playerId && !this.cast.some(c => (c.id ?? c.name) === (w.id ?? w.name));
      return h('div', { class: `blk speech${w.id === this.opts.playerId ? ' speech-player' : ''}` },
        h('div', { class: 'speaker' }, outside ? this.overflowIcon(w) : null, w.name),
        h('div', { class: 'text', html: inlineMd(p.text) }));
    }
    return h('div', { class: `blk ${p.role}`, html: inlineMd(p.text) });
  }

  private async appendBlock(el: HTMLElement) {
    for (const old of this.log.querySelectorAll('.blk.current')) old.classList.remove('current');
    el.classList.add('current', 'enter');
    this.log.insertBefore(el, this.choices);
    this.scrollToEnd();
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('enter')));
  }

  /** Reveal only existing DOM text; keep inline formatting and runner effects intact. */
  private async reveal(el: HTMLElement): Promise<void> {
    if (!this.opts.transitions || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = el.querySelector('.text') ?? el;
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    const nodes: { node: Text; original: string; words: string[] }[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const original = node.textContent ?? '';
      if (original) nodes.push({ node: node as Text, original, words: original.match(/\S+\s*|\s+/g) ?? [] });
    }
    if (!nodes.length) return;
    for (const entry of nodes) entry.node.data = '';
    let index = 0, word = 0;
    await new Promise<void>(resolve => {
      const finish = () => {
        window.clearInterval(timer);
        for (const entry of nodes) entry.node.data = entry.original;
        this.finishReveal = null;
        this.scrollToEnd();
        resolve();
      };
      const timer = window.setInterval(() => {
        const entry = nodes[index];
        if (!entry) { finish(); return; }
        entry.node.data += entry.words[word++] ?? '';
        if (word >= entry.words.length) { index++; word = 0; }
        this.scrollToEnd();
        if (index >= nodes.length) finish();
      }, 34);
      this.finishReveal = finish;
    });
  }

  private waitAdvance(label = 'Continue'): Promise<void> {
    clear(this.choices);
    const btn = h('button', { class: 'continue', onclick: () => this.advance() }, `${label} ▸`);
    this.choices.append(btn);
    this.scrollToEnd();
    return new Promise((res) => (this.advanceResolve = () => { clear(this.choices); res(); }));
  }

  private waitChoice(options: ChoiceOption[]): Promise<ChoiceOption> {
    clear(this.choices);
    return new Promise((res) => {
      options.forEach((o, i) => {
        const disabled = o.locked || !o.affordable;
        const cost = this.hooks.showCosts?.() === false ? '' : costLabel(o);
        const btn = h('button', {
          class: `choice${o.locked ? ' locked' : ''}${!o.affordable ? ' unaffordable' : ''}${o.choice.spoken ? ' spoken' : ''}`,
          disabled,
          'data-tip': o.locked ? 'Not available' : cost ? (o.affordable ? `Costs ${cost}` : `Not enough resources — costs ${cost}`) : !o.affordable ? 'Not enough resources' : undefined,
        },
          h('span', { class: 'num' }, `${i + 1}.`),
          h('span', { class: 'label', html: inlineMd(o.choice.label) }),
          o.locked ? h('span', { class: 'lock', 'aria-label': 'locked' }, '🔒︎') : null,
          cost ? h('span', { class: 'cost-dot', 'aria-label': `costs ${cost}` }, '◈') : null);
        btn.addEventListener('click', () => {
          clear(this.choices);
          res(o);
        });
        this.choices.append(btn);
      });
      this.scrollToEnd();
    });
  }

  /** Play a runner to its end. Resolves with the next scene id if the scene chains into another. */
  async play(runner: SceneRunner, title: string): Promise<string | undefined> {
    clear(this.log);
    this.followLog = true;
    this.log.classList.remove('overflow');
    clear(this.choices);
    this.log.append(this.choices);
    this.left.dataset.who = '';
    this.right.dataset.who = '';
    clear(this.left);
    clear(this.right);
    this.titleEl.textContent = title;
    this.stage(runner);
    this.setSpeaker(null);
    this.el.hidden = false;
    document.body.classList.add('vn-active');
    await wait(this.opts.transitions ? 30 : 0);
    this.el.classList.add('open');
    let nextScene: string | undefined;
    for (;;) {
      const out = runner.next();
      if (out.type === 'ui') {
        this.hooks.onHighlight?.([]);
        await this.hooks.onUi?.(out.action, out.arg);
        continue;
      }
      if (out.type === 'prose') {
        this.hooks.onHighlight?.(out.prose.highlights ?? []);
        this.setSpeaker(out.prose);
        const block = this.block(out.prose);
        await this.appendBlock(block);
        await this.reveal(block);
        await this.waitAdvance();
      } else if (out.type === 'choices') {
        this.hooks.onHighlight?.([]);
        const o = await this.waitChoice(out.options);
        runner.choose(o.index);
        const echo = o.choice.spoken
          ? this.block({ role: 'speech', text: o.choice.label.replace(/^["“]|["”]$/g, ''), effects: [] })
          : h('div', { class: 'blk choice-echo', html: inlineMd(o.choice.label) });
        if (o.choice.spoken) this.setSpeaker({ role: 'speech', text: '', effects: [] });
        await this.appendBlock(echo);
      } else {
        this.hooks.onHighlight?.([]);
        nextScene = out.nextScene;
        await this.waitAdvance('Return to the map');
        break;
      }
    }
    return nextScene;
  }

  async close() {
    this.finishReveal?.();
    this.el.classList.remove('open');
    document.body.classList.remove('vn-active');
    await wait(this.opts.transitions ? 450 : 0);
    this.el.hidden = true;
  }
}
