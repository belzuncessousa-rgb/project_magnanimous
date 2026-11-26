// Budget screen ([open: budget]) and Congress vote screen ([vote: bill-id]). Modal over VN mode.
import type { ResourceAmounts } from '../core/effects';
import { canAfford } from '../core/effects';
import type { GameState } from '../core/types';
import { TIERS, type Bill, type Ministry, type Tier } from '../content/schema';
import { debtInterestDue, formulaFC } from '../core/turn';
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
import { applyDebtPolicy, debtLimits, debtPreview, type DebtPolicy } from '../game/debt';
import { TUNING } from '../core/tuning';
import { clear, h } from './dom';
import { bn, costText as fmtCost } from './format';

const TIER_LABEL: Record<Tier, string> = { cut: 'Cut', low: 'Low', regular: 'Regular', high: 'High' };

const costText = (c: ResourceAmounts) => fmtCost(c) || 'Free';

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
                }, TIER_LABEL[t], h('span', { class: 'tier-fc' }, bn(m.tiers[t]!.fc))))),
            c.tier === 'low' && m.initiatives.length
              ? h('div', { class: 'budget-init' }, 'Keep: ',
                  ...m.initiatives.map((i) =>
                    h('button', { class: `init${c.initiative === i.id ? ' active' : ''}`, 'data-tip': i.summary || undefined, onclick: () => { c.initiative = i.id; render(); } }, i.name)))
              : c.tier === 'cut' ? h('div', { class: 'budget-init muted' }, 'No initiatives') : h('div', { class: 'budget-init muted' }, m.initiatives.map((i) => i.name).join(' · ')),
          ),
        );
      }
      const fc = budgetCostPerTurn(ministries, choices);
      const free = formulaFC(state) - debtInterestDue(state);
      total.textContent = `Spending ${bn(fc)} per turn · about ${bn(free)} per turn left after fixed costs and interest`;
      total.classList.toggle('over', fc > free);
    };
    const card = h('div', { class: 'screen-card paper budget' },
      h('div', { class: 'screen-head' }, h('div', { class: 'executive-letterhead' }, h('img', { src: 'identity/kunasai-arms.svg', alt: '' }), h('span', {}, 'Republic of Kunasai · Ministry of the Treasury')), h('h2', {}, 'The Budget'), h('div', { class: 'screen-sub' }, 'Set each ministry’s tier. Costs are paid every turn.')),
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

// ------------------------------------------------------------------------------------------------ debt

const POLICY_LABEL: Record<DebtPolicy, string> = { 1: 'Pay down the principal', 2: 'Borrow more from the Fund', 3: 'Status quo' };
const POLICY_NOTE: Record<DebtPolicy, string> = {
  1: 'A fixed amount of principal every turn. The balance falls, and so does the interest.',
  2: 'Cash now. The balance grows, and every future turn pays interest on it.',
  3: 'Interest only. Nothing changes.',
};

/** `[open: debt]`. If the scene already chose a policy (flag debt_policy), only that option is offered. */
export function showDebt(root: HTMLElement, state: GameState): Promise<void> {
  return new Promise((resolve) => {
    const preset = Number(state.flags.debt_policy) as DebtPolicy;
    const allowed: DebtPolicy[] = preset === 1 || preset === 2 || preset === 3 ? [preset] : [1, 2, 3];
    let policy: DebtPolicy = allowed[0]!;
    const lim = debtLimits(state);
    const defaultAmount = (p: DebtPolicy) =>
      p === 1 ? Math.min(lim.payDownMax, TUNING.debt.amortizationPerTurn) : p === 2 ? Math.min(lim.borrowMax, TUNING.debt.borrowAmount) : 0;
    let amount = defaultAmount(policy);
    const options = h('div', { class: 'debt-options' });
    const control = h('div', { class: 'debt-control' });
    const preview = h('dl', { class: 'debt-preview info-rows' });
    const renderPreview = () => {
      const pv = debtPreview(state, policy, amount);
      clear(preview);
      const rows: [string, string][] = [
        ['Public debt', bn(pv.balance)],
        ['Interest next turn', bn(pv.nextInterest)],
        ...(policy === 1 ? [['Principal next turn', bn(pv.nextPrincipal)] as [string, string]] : []),
        ['Treasury now', bn(pv.fcNow)],
        ['Treasury after next turn, before other spending', bn(pv.fcAfterTurn)],
      ];
      for (const [k, v] of rows) preview.append(h('dt', {}, k), h('dd', {}, v));
    };
    const render = () => {
      clear(options);
      for (const p of allowed) {
        options.append(
          h('button', {
            class: `debt-option${p === policy ? ' active' : ''}`,
            onclick: () => {
              policy = p;
              amount = defaultAmount(p);
              render();
            },
          }, h('strong', {}, POLICY_LABEL[p]), h('span', {}, POLICY_NOTE[p])));
      }
      clear(control);
      if (policy !== 3) {
        const max = policy === 1 ? lim.payDownMax : lim.borrowMax;
        const step = policy === 1 ? lim.payDownStep : lim.borrowStep;
        const out = h('output', { class: 'debt-amount' }, bn(amount));
        const slider = h('input', {
          type: 'range', min: 0, max, step, value: amount, class: 'debt-range',
          'aria-label': policy === 1 ? 'Principal per turn' : 'Amount to borrow',
        }) as HTMLInputElement;
        slider.addEventListener('input', () => {
          amount = Number(slider.value);
          out.textContent = bn(amount);
          renderPreview();
        });
        control.append(
          h('label', { class: 'debt-label' }, policy === 1 ? 'Principal paid every turn' : 'Borrow now, one time'),
          h('div', { class: 'debt-slider' }, h('span', {}, bn(0)), slider, h('span', {}, bn(max))),
          out);
      }
      renderPreview();
    };
    const card = h('div', { class: 'screen-card paper debt' },
      h('div', { class: 'screen-head' },
        h('div', { class: 'executive-letterhead' }, h('img', { src: 'identity/kunasai-arms.svg', alt: '' }), h('span', {}, 'Republic of Kunasai · Ministry of the Treasury')),
        h('h2', {}, 'The Debt'),
        h('div', { class: 'screen-sub' }, `Owed to the Fund: ${bn(state.nation.debt ?? 0)} · interest ${(TUNING.debt.interestRatePerTurn * 100).toFixed(0)}% of the balance every turn`)),
      options, control, preview,
      h('div', { class: 'screen-foot' },
        h('span', { class: 'budget-total' }, `Free money per turn after interest: about ${bn(lim.income)}`),
        h('button', { class: 'btn primary', onclick: async () => { applyDebtPolicy(state, policy, amount); await close(o); resolve(); } }, 'Confirm')));
    render();
    const o = overlay(root, 'debt-screen', card);
  });
}
