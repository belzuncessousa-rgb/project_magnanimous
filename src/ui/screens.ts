// Budget screen ([open: budget]) and Congress vote screen ([vote: bill-id]). Modal over VN mode.
import type { ResourceAmounts } from '../core/effects';
import { canAfford } from '../core/effects';
import type { GameState } from '../core/types';
import { TIERS, type Bill, type Ministry, type Tier } from '../content/schema';
import { formulaFC } from '../core/turn';
import {
  applyBudget,
  budgetCostPerTurn,
  currentBudget,
  dealsCost,
  projectVote,
  resolveVote,
  STANCE_WORD,
  whipOptions,
  type BudgetChoice,
  type VoteResult,
} from '../game/politics';
import { clear, h } from './dom';

const TIER_LABEL: Record<Tier, string> = { cut: 'Cut', low: 'Low', regular: 'Regular', high: 'High' };

const costText = (c: ResourceAmounts) =>
  Object.entries(c).filter(([, v]) => v).map(([k, v]) => `${v} ${k}`).join(' · ') || 'Free';

function overlay(root: HTMLElement, cls: string, card: HTMLElement): HTMLElement {
  const o = h('div', { class: `screen-overlay overlay ${cls}` }, card);
  root.append(o);
  requestAnimationFrame(() => requestAnimationFrame(() => o.classList.add('open')));
  return o;
}

function close(o: HTMLElement): Promise<void> {
  o.classList.remove('open');
  return new Promise((r) => setTimeout(() => { o.remove(); r(); }, 300));
}

// ------------------------------------------------------------------------------------------------ budget

export function showBudget(root: HTMLElement, state: GameState, ministries: Ministry[]): Promise<void> {
  return new Promise((resolve) => {
    if (!ministries.length) { resolve(); return; }
    const choices: Record<string, BudgetChoice> = {};
    const cur = currentBudget(state, ministries);
    for (const m of ministries) {
      const tiers = TIERS.filter((t) => m.tiers[t]);
      choices[m.id] = cur[m.id] ?? { tier: tiers.includes('regular') ? 'regular' : tiers[0]! };
      if (choices[m.id]!.tier === 'low' && !choices[m.id]!.initiative) choices[m.id]!.initiative = m.initiatives[0]?.id;
    }
    const rows = h('div', { class: 'budget-rows' });
    const total = h('div', { class: 'budget-total' });
    const render = () => {
      clear(rows);
      for (const m of ministries) {
        const c = choices[m.id]!;
        const tiers = TIERS.filter((t) => m.tiers[t]);
        rows.append(
          h('div', { class: 'budget-row' },
            h('div', { class: 'budget-name' }, h('strong', {}, m.name), m.minister ? h('span', { class: 'budget-minister' }, m.minister) : null),
            h('div', { class: 'budget-tiers', role: 'radiogroup' },
              ...tiers.map((t) =>
                h('button', {
                  class: `tier${c.tier === t ? ' active' : ''}`,
                  'data-tip': m.tiers[t]!.label ?? (t === 'low' ? 'Keeps one initiative alive' : t === 'cut' ? 'Shuts the ministry’s programmes' : t === 'high' ? 'Everything, and faster' : 'Every initiative funded'),
                  onclick: () => {
                    choices[m.id] = { tier: t, initiative: t === 'low' ? (c.initiative ?? m.initiatives[0]?.id) : undefined };
                    render();
                  },
                }, TIER_LABEL[t], h('span', { class: 'tier-fc' }, `${m.tiers[t]!.fc} FC`)))),
            c.tier === 'low' && m.initiatives.length
              ? h('div', { class: 'budget-init' }, 'Keep: ',
                  ...m.initiatives.map((i) =>
                    h('button', { class: `init${c.initiative === i.id ? ' active' : ''}`, 'data-tip': i.summary || undefined, onclick: () => { c.initiative = i.id; render(); } }, i.name)))
              : c.tier === 'cut' ? h('div', { class: 'budget-init muted' }, 'No initiatives') : h('div', { class: 'budget-init muted' }, m.initiatives.map((i) => i.name).join(' · ')),
          ),
        );
      }
      const fc = budgetCostPerTurn(ministries, choices);
      total.textContent = `Spending ${fc} FC per turn · treasury brings in about ${formulaFC(state)} FC per turn`;
      total.classList.toggle('over', fc > formulaFC(state));
    };
    const card = h('div', { class: 'screen-card paper budget' },
      h('div', { class: 'screen-head' }, h('h2', {}, 'The Budget'), h('div', { class: 'screen-sub' }, 'Set each ministry’s tier. Costs are paid every turn.')),
      rows,
      h('div', { class: 'screen-foot' }, total, h('button', { class: 'btn primary', onclick: async () => { applyBudget(state, ministries, choices); await close(o); resolve(); } }, 'Sign the budget')));
    render();
    const o = overlay(root, 'budget-screen', card);
  });
}

// ------------------------------------------------------------------------------------------------ vote

export function showVote(root: HTMLElement, state: GameState, bill: Bill | undefined): Promise<VoteResult | null> {
  return new Promise((resolve) => {
    if (!bill) { resolve(null); return; }
    const deals: Record<string, string> = {};
    const table = h('div', { class: 'vote-table' });
    const outlook = h('div', { class: 'vote-outlook' });
    const spend = h('div', { class: 'vote-spend' });
    const callBtn = h('button', { class: 'btn primary' }, 'Call the vote');
    const render = () => {
      const p = projectVote(state, bill, deals);
      clear(table);
      for (const row of p.parties) {
        const opts = whipOptions(bill, row.party);
        table.append(
          h('div', { class: `vote-row stance-${row.stance}` },
            h('div', { class: 'vote-party' }, h('strong', {}, row.name), h('span', { class: 'vote-seats' }, `${row.seats} seats`)),
            h('div', { class: 'vote-stance' }, STANCE_WORD[row.stance]),
            h('div', { class: 'vote-deals' },
              ...opts.map((d) => {
                const on = deals[row.party] === d.id;
                return h('button', {
                  class: `deal${on ? ' active' : ''}${d.increments?.includes('corruption') ? ' corrupt' : ''}`,
                  'data-tip': `${d.label}: ${costText(d.cost)}${d.flags?.opp_ministry_promised ? ' and a ministry promised' : ''}`,
                  onclick: () => { if (on) delete deals[row.party]; else deals[row.party] = d.id; render(); },
                }, d.label);
              }))));
      }
      outlook.textContent = p.outlook;
      const cost = dealsCost(bill, deals);
      const ok = canAfford(state, cost);
      spend.textContent = Object.keys(deals).length ? `Deals: ${costText(cost)}${ok ? '' : ' — more than you have'}` : 'No deals struck';
      spend.classList.toggle('over', !ok);
      callBtn.disabled = !ok;
    };
    callBtn.addEventListener('click', async () => {
      const r = resolveVote(state, bill, deals);
      if (!r) return;
      clear(card);
      card.append(
        h('div', { class: 'screen-head' }, h('h2', {}, bill.title)),
        h('div', { class: `vote-result result-${r.result}` }, r.result === 'passed' ? 'The bill passes.' : r.result === 'watered' ? 'It passes — watered down.' : 'The bill fails.'),
        h('div', { class: 'screen-foot' }, h('span', {}), h('button', { class: 'btn primary', onclick: async () => { await close(o); resolve(r.result); } }, 'Continue')));
    });
    const card = h('div', { class: 'screen-card paper vote' },
      h('div', { class: 'screen-head' }, h('h2', {}, bill.title), bill.summary ? h('div', { class: 'screen-sub' }, bill.summary) : null),
      table,
      h('div', { class: 'screen-foot' }, h('div', {}, outlook, spend), callBtn));
    render();
    const o = overlay(root, 'vote-screen', card);
  });
}
