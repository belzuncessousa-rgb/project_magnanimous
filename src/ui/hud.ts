// HUD (top right): date, PT · FC · IPI · EPI · Approval %.
import { nationalApproval } from '../core/query';
import type { GameState } from '../core/types';
import { h } from './dom';
import { pct1 } from './format';

const TIPS: Record<string, string> = {
  PT: 'Presidential Time — your personal attention. Refreshes each turn; unused time is lost.',
  FC: 'Financial Capital — the treasury’s room to spend. Accumulates between turns.',
  IPI: 'Internal Political Influence — leverage over Congress and institutions. Half carries over.',
  EPI: 'External Political Influence — leverage abroad. Half carries over.',
  APP: 'National approval (population-weighted).',
};

export class Hud {
  readonly el: HTMLElement;
  private date = h('div', { class: 'hud-date' });
  private chapter = h('div', { class: 'hud-chapter' });
  private vals: Record<string, HTMLElement> = {};

  constructor() {
    const row = h('div', { class: 'hud-row' });
    for (const k of ['PT', 'FC', 'IPI', 'EPI', 'APP']) {
      const v = h('span', { class: 'hud-val' });
      this.vals[k] = v;
      row.append(h('div', { class: `hud-res res-${k}`, title: TIPS[k] }, h('span', { class: 'hud-key' }, k === 'APP' ? 'Approval' : k), v));
    }
    this.el = h('div', { class: 'hud paper', hidden: true }, h('div', { class: 'hud-top' }, this.chapter, this.date), row);
  }

  update(st: GameState, chapterTitle: string) {
    this.date.textContent = st.dateLabel;
    this.chapter.textContent = chapterTitle;
    const set = (k: string, v: string) => {
      const el = this.vals[k]!;
      if (el.textContent !== v) {
        el.textContent = v;
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
      }
    };
    set('PT', String(Math.floor(st.resources.PT)));
    set('FC', String(Math.floor(st.resources.FC)));
    set('IPI', String(Math.floor(st.resources.IPI)));
    set('EPI', String(Math.floor(st.resources.EPI)));
    set('APP', pct1(nationalApproval(st)));
  }
}
