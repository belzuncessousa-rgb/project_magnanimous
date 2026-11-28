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
  VOTE,
  whipOptions,
  type BudgetChoice,
  type VoteResult,
} from '../game/politics';
import { applyDebtPolicy, debtLimits, debtPreview, type DebtPolicy } from '../game/debt';
import { TUNING } from '../core/tuning';
import { clear, h } from './dom';
import { letterhead, showDossier, type DossierPage } from './dossier';
import { bn, costText as fmtCost } from './format';

const TIER_LABEL: Record<Tier, string> = { cut: 'Cut', low: 'Low', regular: 'Regular', high: 'High' };

const costText = (c: ResourceAmounts) => fmtCost(c) || 'Free';

const screenReturnFocus = new WeakMap<HTMLElement, HTMLElement | null>();

function overlay(root: HTMLElement, cls: string, card: HTMLElement): HTMLElement {
  const previousFocus = document.activeElement as HTMLElement | null;
  const title = card.querySelector<HTMLElement>('.screen-head h2');
  if (title) title.id = 'decision-screen-title';
  const o = h('div', {
    class: `screen-overlay overlay ${cls}`,
    role: 'dialog', 'aria-modal': 'true',
    'aria-labelledby': title ? title.id : undefined,
  }, card);
  screenReturnFocus.set(o, previousFocus);
  o.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusables = [...o.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])')];
    if (!focusables.length) { event.preventDefault(); return; }
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  root.append(o);
  requestAnimationFrame(() => {
    const initial = o.querySelector<HTMLElement>('button[aria-pressed="true"]')
      ?? o.querySelector<HTMLElement>('button.primary:not(:disabled)')
      ?? o.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled)');
    initial?.focus();
    requestAnimationFrame(() => o.classList.add('open'));
  });
  return o;
}

function close(o: HTMLElement): Promise<void> {
  o.classList.remove('open');
  return new Promise((r) => setTimeout(() => {
    o.remove();
    const previousFocus = screenReturnFocus.get(o);
    if (previousFocus?.isConnected) previousFocus.focus();
    r();
  }, 300));
}

// ------------------------------------------------------------------------------------------------ budget

/**
 * The budget as a desk document (author direction 2026-11-28): one sheet per ministry, then a summary sheet to sign.
 * Only names and costs are shown — never effects, never explanations.
 *   formal = true  → the green document case; signing applies the budget.
 *   formal = false → loose working papers for the simulation; nothing is applied.
 */
export async function showBudget(root: HTMLElement, state: GameState, ministries: Ministry[], formal = true): Promise<boolean> {
  if (!ministries.length) return false;
  const choices: Record<string, BudgetChoice> = {};
  const cur = currentBudget(state, ministries);
  for (const m of ministries) {
    const tiers = TIERS.filter((t) => m.tiers[t]);
    choices[m.id] = cur[m.id] ?? { tier: tiers.includes('regular') ? 'regular' : tiers[0]! };
    if (choices[m.id]!.tier === 'low' && !choices[m.id]!.initiative) choices[m.id]!.initiative = m.initiatives[0]?.id;
  }
  let signed = false;
  const office = 'Ministry of the Treasury';
  const ministryPage = (m: Ministry): DossierPage => ({
    tab: m.name,
    render: () => {
      const c = choices[m.id]!;
      const tiers = TIERS.filter((t) => m.tiers[t]);
      const sheet = h('div', { class: 'sheet sheet-budget' },
        formal ? letterhead(office) : h('div', { class: 'sheet-draft-mark' }, 'Working draft'),
        h('h2', { class: 'sheet-title' }, m.name),
        m.minister ? h('p', { class: 'sheet-sub' }, m.minister) : '');
      const list = h('div', { class: 'budget-lines', role: 'radiogroup', 'aria-label': `${m.name} allocation` });
      for (const t of tiers) {
        const on = c.tier === t;
        list.append(h('button', {
          class: `budget-line${on ? ' chosen' : ''}`, role: 'radio', 'aria-checked': String(on),
          onclick: () => {
            choices[m.id] = { tier: t, initiative: t === 'low' ? (c.initiative ?? m.initiatives[0]?.id) : undefined };
            sheet.replaceWith(ministryPage(m).render());
          },
        }, h('span', { class: 'budget-mark', 'aria-hidden': 'true' }), h('span', { class: 'budget-line-name' }, TIER_LABEL[t]),
          h('span', { class: 'budget-line-cost' }, `${bn(m.tiers[t]!.fc)} per period`)));
      }
      sheet.append(list);
      if (m.initiatives.length) {
        const keepOne = c.tier === 'low';
        sheet.append(h('h3', { class: 'sheet-section' }, keepOne ? 'Programme kept' : 'Programmes'),
          h('ul', { class: 'budget-programmes' }, ...m.initiatives.map((i) => {
            const funded = c.tier === 'regular' || c.tier === 'high' || (keepOne && c.initiative === i.id);
            return h('li', { class: funded ? 'funded' : 'unfunded' },
              keepOne
                ? h('button', { class: `programme-pick${c.initiative === i.id ? ' chosen' : ''}`, 'aria-pressed': String(c.initiative === i.id), onclick: () => { c.initiative = i.id; sheet.replaceWith(ministryPage(m).render()); } }, i.name)
                : h('span', {}, i.name),
              i.costOnce ? h('span', { class: 'budget-line-cost' }, `${bn(i.costOnce)} once`) : '');
          })));
      }
      return sheet;
    },
  });
  const summary: DossierPage = {
    tab: formal ? 'Signature' : 'Totals',
    render: () => {
      const fc = budgetCostPerTurn(ministries, choices);
      const free = formulaFC(state) - debtInterestDue(state);
      const over = fc > free;
      return h('div', { class: 'sheet sheet-budget sheet-summary' },
        formal ? letterhead(office) : h('div', { class: 'sheet-draft-mark' }, 'Working draft'),
        h('h2', { class: 'sheet-title' }, formal ? 'Budget of the Republic' : 'Draft totals'),
        h('table', { class: 'budget-totals' },
          h('tbody', {},
            ...ministries.map((m) => h('tr', {}, h('th', {}, m.name), h('td', {}, TIER_LABEL[choices[m.id]!.tier]), h('td', {}, bn(m.tiers[choices[m.id]!.tier]!.fc)))),
            h('tr', { class: 'total' }, h('th', {}, 'Total per period'), h('td', {}), h('td', {}, bn(fc))),
            h('tr', { class: `available${over ? ' over' : ''}` }, h('th', {}, 'Available per period'), h('td', {}), h('td', {}, bn(free))))),
        formal ? h('div', { class: `signature-line${signed ? ' signed' : ''}` }, h('span', { class: 'signature' }, 'Lara Vento'), h('small', {}, 'President of the Republic')) : '');
    },
  };
  return showDossier(root, {
    variant: formal ? 'case' : 'papers',
    title: formal ? 'Budget of the Republic' : 'Budget working papers',
    pages: [...ministries.map(ministryPage), summary],
    finish: formal ? { label: 'Sign the budget', onFinish: () => { signed = true; applyBudget(state, ministries, choices); } } : undefined,
    closeLabel: 'Put the papers down',
  });
}

// ------------------------------------------------------------------------------------------------ vote

const STANCE_ORDER: Record<string, number> = { for: 0, leaning: 1, undecided: 2, against: 3 };

/**
 * Congress as a hemicycle: one dot per seat, filled left to right by stance (for → leaning → undecided → against),
 * each party a contiguous block, with the majority line marked. Pure SVG, regenerated on every deal change.
 */
function hemicycle(parties: { party: string; name: string; seats: number; stance: string }[], majority: number): SVGSVGElement {
  const NS = 'http://www.w3.org/2000/svg';
  const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) => {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
    return n;
  };
  const total = parties.reduce((n, p) => n + p.seats, 0);
  const rows = total > 120 ? 7 : total > 60 ? 5 : 4;
  const r0 = 46, r1 = 100;
  const radii = Array.from({ length: rows }, (_, i) => r0 + (i * (r1 - r0)) / (rows - 1));
  const sumR = radii.reduce((a, b) => a + b, 0);
  const counts = radii.map((r) => Math.round((total * r) / sumR));
  counts[rows - 1]! += total - counts.reduce((a, b) => a + b, 0);
  const seats: { x: number; y: number; a: number }[] = [];
  radii.forEach((r, i) => {
    const n = counts[i]!;
    for (let k = 0; k < n; k++) {
      const a = Math.PI - (n === 1 ? Math.PI / 2 : (k * Math.PI) / (n - 1));
      seats.push({ x: 110 + r * Math.cos(a), y: 108 - r * Math.sin(a), a });
    }
  });
  seats.sort((p, q) => q.a - p.a);
  const ordered = [...parties].sort((p, q) => (STANCE_ORDER[p.stance] ?? 9) - (STANCE_ORDER[q.stance] ?? 9) || q.seats - p.seats);
  const svg = el('svg', { class: 'vote-hemicycle', viewBox: '0 0 220 116', role: 'img' });
  svg.setAttribute('aria-label', ordered.map((p) => `${p.name}: ${p.seats} seats, ${p.stance}`).join('; '));
  let at = 0;
  for (const p of ordered) {
    const g = el('g', { class: `hemi-party stance-${p.stance}` });
    const title = el('title', {}); title.textContent = `${p.name} — ${p.seats} seats`; g.append(title);
    for (let k = 0; k < p.seats && at < seats.length; k++, at++) {
      const s = seats[at]!;
      g.append(el('circle', { cx: s.x.toFixed(2), cy: s.y.toFixed(2), r: 3.3 }));
    }
    svg.append(g);
  }
  // majority marker: the angle where seat number `majority` sits
  const m = seats[Math.min(seats.length - 1, majority - 1)];
  if (m) {
    const ux = Math.cos(m.a), uy = -Math.sin(m.a);
    svg.append(el('line', { class: 'hemi-majority', x1: (110 + ux * (r0 - 9)).toFixed(1), y1: (108 + uy * (r0 - 9)).toFixed(1), x2: (110 + ux * (r1 + 7)).toFixed(1), y2: (108 + uy * (r1 + 7)).toFixed(1) }));
  }
  return svg;
}

export function showVote(root: HTMLElement, state: GameState, bill: Bill | undefined): Promise<VoteResult | null> {
  return new Promise((resolve) => {
    if (!bill) { resolve(null); return; }
    const deals: Record<string, string> = {};
    const table = h('div', { class: 'vote-table' });
    const outlook = h('div', { class: 'vote-outlook' });
    const chamber = h('div', { class: 'vote-chamber' });
    const spend = h('div', { class: 'vote-spend' });
    const callBtn = h('button', { class: 'btn primary' }, 'Call the vote');
    const render = () => {
      const p = projectVote(state, bill, deals);
      clear(table);
      clear(chamber);
      chamber.append(hemicycle(p.parties, VOTE.majority),
        h('div', { class: 'vote-count' }, h('strong', {}, String(Math.round(p.yes))), h('span', {}, `of ${VOTE.majority} needed`)));
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
                  'aria-pressed': String(on),
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
      const continueButton = h('button', { class: 'btn primary', onclick: async () => { await close(o); resolve(r.result); } }, 'Continue');
      card.append(
        h('div', { class: 'screen-head' }, h('h2', { id: 'decision-screen-title' }, bill.title)),
        h('div', { class: `vote-result result-${r.result}` }, r.result === 'passed' ? 'The bill passes.' : r.result === 'watered' ? 'It passes — watered down.' : 'The bill fails.'),
        h('div', { class: 'screen-foot' }, h('span', {}), continueButton));
      requestAnimationFrame(() => continueButton.focus());
    });
    const card = h('div', { class: 'screen-card paper vote' },
      h('div', { class: 'screen-head' },
        h('div', { class: 'executive-letterhead' }, h('img', { src: 'identity/kunasai-arms.svg', alt: '' }), h('span', {}, 'Congress of the Republic · Whip count')),
        h('h2', {}, bill.title), bill.summary ? h('div', { class: 'screen-sub' }, bill.summary) : null),
      h('div', { class: 'vote-body' }, chamber, table),
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
            'aria-pressed': String(p === policy),
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
