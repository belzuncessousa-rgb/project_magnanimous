// Budget (content/ministries.json) and Congress votes (content/bills.json). Pure, no DOM.
import { applyEffects, canAfford, pay, type ResourceAmounts } from '../core/effects';
import { test } from '../core/query';
import type { GameState } from '../core/types';
import type { Bill, Ministry, Tier } from '../content/schema';

// ------------------------------------------------------------------------------------------------ budget

export interface BudgetChoice {
  tier: Tier;
  /** required for `low`: the one initiative kept alive */
  initiative?: string;
}

export function currentBudget(state: GameState, ministries: Ministry[]): Record<string, BudgetChoice | undefined> {
  const out: Record<string, BudgetChoice | undefined> = {};
  for (const m of ministries) {
    const tier = state.flags[`budget.${m.id}`];
    if (typeof tier !== 'string') continue;
    const init = m.initiatives.find((i) => state.flags[`initiative.${i.id}`] === true);
    out[m.id] = { tier: tier as Tier, initiative: init?.id };
  }
  return out;
}

/** Initiatives a tier funds: cut → none, low → the picked one, regular/high → all. */
export function fundedInitiatives(m: Ministry, c: BudgetChoice): string[] {
  if (c.tier === 'cut') return [];
  if (c.tier === 'low') return c.initiative ? [c.initiative] : [];
  return m.initiatives.map((i) => i.id);
}

export function budgetCostPerTurn(ministries: Ministry[], choices: Record<string, BudgetChoice | undefined>): number {
  let fc = 0;
  for (const m of ministries) {
    const c = choices[m.id];
    if (c) fc += m.tiers[c.tier]?.fc ?? 0;
  }
  return fc;
}

/** Commit the budget screen: flags `budget.<m>` and `initiative.<id>`, one-off effects for newly funded initiatives. */
export function applyBudget(state: GameState, ministries: Ministry[], choices: Record<string, BudgetChoice>): void {
  for (const m of ministries) {
    const c = choices[m.id];
    if (!c) continue;
    state.flags[`budget.${m.id}`] = c.tier;
    const funded = new Set(fundedInitiatives(m, c));
    for (const i of m.initiatives) {
      const was = state.flags[`initiative.${i.id}`] === true;
      state.flags[`initiative.${i.id}`] = funded.has(i.id);
      if (!was && funded.has(i.id) && !state.flags[`initiative.${i.id}.started`]) {
        state.flags[`initiative.${i.id}.started`] = true;
        applyEffects(state, i.once);
      }
    }
  }
}

/** Turn update: deduct FC per turn and apply recurring tier + initiative effects. */
export function budgetTurn(state: GameState, ministries: Ministry[]): void {
  const choices = currentBudget(state, ministries);
  state.resources.FC = Math.max(0, state.resources.FC - budgetCostPerTurn(ministries, choices));
  for (const m of ministries) {
    const c = choices[m.id];
    if (!c) continue;
    applyEffects(state, m.tiers[c.tier]?.effects ?? []);
    for (const id of fundedInitiatives(m, c)) applyEffects(state, m.initiatives.find((i) => i.id === id)?.perTurn ?? []);
  }
}

// ------------------------------------------------------------------------------------------------ votes

export type Stance = 'for' | 'leaning' | 'undecided' | 'against';

export interface WhipDeal {
  id: string;
  label: string;
  cost: ResourceAmounts;
  /** shift in the party's position (−1..1 scale) */
  delta: number;
  /** flags set when the deal is struck (corruption etc.) */
  flags?: Record<string, number | boolean | string>;
  /** counter flags incremented */
  increments?: string[];
}

export interface PartyProjection {
  party: string;
  name: string;
  seats: number;
  position: number;
  stance: Stance;
}

export interface VoteProjection {
  parties: PartyProjection[];
  yes: number;
  outlook: string;
}

export type VoteResult = 'passed' | 'watered' | 'failed';

export const VOTE = {
  majority: 51,
  wateredFrom: 44,
  forAt: 0.5,
  leaningAt: 0.15,
  undecidedAt: -0.15,
};

export function stanceOf(p: number): Stance {
  if (p >= VOTE.forAt) return 'for';
  if (p >= VOTE.leaningAt) return 'leaning';
  if (p > VOTE.undecidedAt) return 'undecided';
  return 'against';
}

export const STANCE_WORD: Record<Stance, string> = { for: 'For', leaning: 'Leaning for', undecided: 'Undecided', against: 'Against' };

/** Whip deals on offer for a party. OPP prices follow the GDD: small = IPI, medium = more IPI or FC (corruption),
 *  high = FC + the promise of a ministry. */
export function whipOptions(bill: Bill, party: string): WhipDeal[] {
  const corrupt = { increments: ['corruption', 'voice', 'path_corrupt'] };
  if (party === 'opp') {
    const small = bill.whipCosts.opp ?? { IPI: 1 };
    return [
      { id: 'small', label: 'A small favour', cost: small, delta: 0.35 },
      { id: 'medium-ipi', label: 'A real concession', cost: { IPI: 2 }, delta: 0.6 },
      { id: 'medium-fc', label: 'Money for their districts', cost: { FC: 2 }, delta: 0.6, ...corrupt },
      { id: 'high', label: 'A ministry, later', cost: { FC: 3 }, delta: 1, flags: { opp_ministry_promised: true }, ...corrupt },
    ];
  }
  const own = bill.whipCosts[party];
  const deals: WhipDeal[] = [];
  if (own) deals.push({ id: 'deal', label: 'Strike their deal', cost: own, delta: 0.6 });
  deals.push({ id: 'favours', label: 'Call in favours', cost: { IPI: 1 }, delta: 0.35 });
  deals.push({ id: 'appeal', label: 'A personal appeal', cost: { PT: 1 }, delta: 0.25 });
  return deals;
}

export function projectVote(state: GameState, bill: Bill, deals: Record<string, string> = {}): VoteProjection {
  const parties: PartyProjection[] = [];
  for (const a of Object.values(state.actors)) {
    if (a.kind !== 'party' || !a.seats) continue;
    const pos = bill.positions[a.id] ?? { base: 0, ifs: [] };
    let p = pos.base;
    for (const f of pos.ifs) if (test(state, f.when)) p += f.delta;
    const dealId = deals[a.id];
    if (dealId) p += whipOptions(bill, a.id).find((d) => d.id === dealId)?.delta ?? 0;
    p = Math.max(-1, Math.min(1, p));
    parties.push({ party: a.id, name: a.name, seats: a.seats, position: p, stance: stanceOf(p) });
  }
  parties.sort((x, y) => y.seats - x.seats);
  const yes = yesSeats(parties);
  const outlook = yes >= VOTE.majority + 5 ? 'Likely to pass' : yes >= VOTE.majority ? 'On a knife edge' : yes >= VOTE.wateredFrom ? 'Short — they may water it down' : 'Likely to fail';
  return { parties, yes, outlook };
}

/** for + leaning vote yes; undecided split down the middle. */
export function yesSeats(parties: PartyProjection[]): number {
  let yes = 0;
  for (const p of parties) {
    if (p.stance === 'for' || p.stance === 'leaning') yes += p.seats;
    else if (p.stance === 'undecided') yes += Math.floor(p.seats / 2);
  }
  return yes;
}

export function dealsCost(bill: Bill, deals: Record<string, string>): ResourceAmounts {
  const total: ResourceAmounts = {};
  for (const [party, id] of Object.entries(deals)) {
    const d = whipOptions(bill, party).find((x) => x.id === id);
    if (!d) continue;
    for (const [k, v] of Object.entries(d.cost)) total[k as keyof ResourceAmounts] = (total[k as keyof ResourceAmounts] ?? 0) + (v ?? 0);
  }
  return total;
}

/** Pay for the deals, apply their flags, resolve and write `vote.<id>` / `vote.<id>.margin`. Null if unaffordable. */
export function resolveVote(state: GameState, bill: Bill, deals: Record<string, string>): { result: VoteResult; yes: number; margin: number } | null {
  const cost = dealsCost(bill, deals);
  if (!canAfford(state, cost)) return null;
  const { yes } = projectVote(state, bill, deals);
  pay(state, cost);
  for (const [party, id] of Object.entries(deals)) {
    const d = whipOptions(bill, party).find((x) => x.id === id);
    if (!d) continue;
    for (const [k, v] of Object.entries(d.flags ?? {})) state.flags[k] = v;
    for (const k of d.increments ?? []) state.flags[k] = (Number(state.flags[k]) || 0) + 1;
  }
  const result: VoteResult = yes >= VOTE.majority ? 'passed' : yes >= VOTE.wateredFrom ? 'watered' : 'failed';
  state.flags[`vote.${bill.id}`] = result;
  state.flags[`vote.${bill.id}.margin`] = yes - 50;
  return { result, yes, margin: yes - 50 };
}
