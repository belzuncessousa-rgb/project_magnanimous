// HUD (top right): date, PT · FC · IPI · EPI · Approval %.
import { nationalApproval } from '../core/query';
import type { GameState } from '../core/types';
import { h } from './dom';
import { bn, pct1 } from './format';
import { TUNING } from '../core/tuning';

const TIPS: Record<string, string> = {
  PT: 'PT — Presidential Time. Your own hours and attention: visits, rallies, meetings. Refills each turn from approval and stability; unused time is lost.',
  FC: 'FC — Financial Capital, in billions. The treasury\'s free money: tax revenue minus the fixed costs of the state and debt interest, every turn. It accumulates; ministry budgets draw on it.',
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
    this.el = h('section', { class: 'hud paper ledger', hidden: true, 'data-ui': 'hud', role: 'group', 'aria-label': 'Current turn ledger' },
      h('div', { class: 'ledger-letterhead' },
        h('img', { src: 'identity/kunasai-arms.svg', alt: '', draggable: 'false' }),
        h('span', {}, h('small', {}, 'OFFICE OF THE PRESIDENCY'), h('strong', {}, 'Turn ledger'))),
      h('div', { class: 'hud-top' }, this.chapter, this.date),
      row);
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
    set('FC', bn(st.resources.FC));
    const fcBox = this.vals.FC!.parentElement!;
    const debt = st.nation.debt ?? 0;
    const paid = st.nation.debtPaid;
    fcBox.setAttribute('data-tip', `${TIPS.FC} Public debt: ${bn(debt)}.` +
      (paid ? ` Last turn: ${bn(paid.interest)} interest${paid.principal ? `, ${bn(paid.principal)} principal` : ''}.` : ` Interest: ${bn(debt * TUNING.debt.interestRatePerTurn)} per turn.`));
    set('IPI', String(Math.floor(st.resources.IPI)));
    set('EPI', String(Math.floor(st.resources.EPI)));
    set('APP', pct1(nationalApproval(st)));
  }
}

