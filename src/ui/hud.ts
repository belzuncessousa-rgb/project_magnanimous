// HUD (top right): date, PT · FC · IPI · EPI · Approval %.
import { nationalApproval } from '../core/query';
import type { GameState } from '../core/types';
import { h } from './dom';
import { pct1 } from './format';

const TIPS: Record<string, string> = {
  PT: 'PT — Presidential Time. Your own hours and attention: visits, rallies, meetings. Refills each turn from approval and stability; unused time is lost.',
  FC: 'FC — Financial Capital. What the treasury can spend after costs and debt interest. Accumulates between turns; ministry budgets draw on it every turn.',
  IPI: 'IPI — Internal Political Influence. Leverage over Congress, parties and the cabinet, from their loyalty and capacity. Half carries over.',
  EPI: 'EPI — External Political Influence. Leverage abroad, weighted by the size of the countries that like you. Half carries over.',
  APP: 'Approval — national average, weighted by population. Each region has its own; click a region to see it.',
};
const UI_ID: Record<string, string> = { PT: 'hud-pt', FC: 'hud-fc', IPI: 'hud-ipi', EPI: 'hud-epi', APP: 'hud-approval' };

export class Hud {
  readonly el: HTMLElement;
  private date = h('div', { class: 'hud-date', 'data-ui': 'hud-date', 'data-tip': 'The date. Turns are irregular: some cover a week, some a season.' });
  private chapter = h('div', { class: 'hud-chapter' });
  private vals: Record<string, HTMLElement> = {};

  constructor() {
    const row = h('div', { class: 'hud-row' });
    for (const k of ['PT', 'FC', 'IPI', 'EPI', 'APP']) {
      const v = h('span', { class: 'hud-val' });
      this.vals[k] = v;
      row.append(h('div', { class: `hud-res res-${k}`, 'data-tip': TIPS[k], 'data-ui': UI_ID[k], tabindex: 0 }, h('span', { class: 'hud-key' }, k === 'APP' ? 'Approval' : k), v));
    }
    this.el = h('div', { class: 'hud paper', hidden: true, 'data-ui': 'hud' }, h('div', { class: 'hud-top' }, this.chapter, this.date), row);
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
