// Turn update: rest values + drift (docs/gdd/05-mechanics-reference/indices/rest-values.md),
// tax effects (taxation-system.md) and resources (resources.md).
import { AXES, TUNING, clamp, driftToward } from './tuning';
import type { Actor, Country, GameState, Region } from './types';
import { nationalAvg } from './query';

const T = TUNING;

// ---------- regions ----------

export function outputPerCapita(r: Region): number {
  return r.population > 0 ? r.output / r.population : 0;
}

/** Potential * efficiency, without the calibrated Base multiplier. */
export function outputMultiplier(r: Region): number {
  const potential = (1 + r.education / 100) * (1 + Math.log(Math.max(r.population, 1)) / 10);
  const efficiency = (r.infrastructure + r.stability) / 200;
  return potential * efficiency;
}

export function reinvestmentRate(state: GameState): number {
  return T.taxes.reinvestmentBase + state.compass.ECON * -T.taxes.reinvestmentPerEcon;
}

/** Fraction of output that feeds back into the output RV (private reinvestment). */
export function reinvestShare(state: GameState): number {
  return (1 - state.taxes.domestic) * reinvestmentRate(state);
}

export function colFormula(r: Region): number {
  const w = T.region.col;
  const opcNorm = clamp((outputPerCapita(r) / T.region.colOutputPerCapitaRef) * 100, 0, 100);
  return r.education * w.education + r.infrastructure * w.infrastructure + opcNorm * w.outputPerCapita + r.stability * w.stability;
}

export function outputDeltaPct(r: Region): number {
  if (r.prevOutputPerCapita <= 0) return 0;
  const pct = ((outputPerCapita(r) - r.prevOutputPerCapita) / r.prevOutputPerCapita) * 100;
  return clamp(pct, -T.region.approvalOutputDeltaClamp, T.region.approvalOutputDeltaClamp);
}

export function regionRV(state: GameState, r: Region) {
  return {
    approval: r.base.approval + T.region.approvalStabilityWeight * r.stability + T.region.approvalOutputDeltaWeight * outputDeltaPct(r),
    stability: r.base.stability + T.region.stabilityApprovalWeight * r.approval - r.popSensitivity * r.population,
    output: r.base.output * outputMultiplier(r) + r.output * reinvestShare(state),
    education: r.base.education,
    col: r.base.col + colFormula(r),
  };
}

/** Set Base terms so the current values are exactly at rest (called once at game start). */
export function calibrateRegion(state: GameState, r: Region): void {
  r.base.approval = r.approval - T.region.approvalStabilityWeight * r.stability;
  r.base.stability = r.stability - T.region.stabilityApprovalWeight * r.approval + r.popSensitivity * r.population;
  const mult = outputMultiplier(r);
  r.base.output = mult > 0 ? (r.output * (1 - reinvestShare(state))) / mult : 0;
  r.base.education = r.education;
  r.base.col = r.col - colFormula(r);
  r.prevOutputPerCapita = outputPerCapita(r);
}

export function taxApprovalShock(state: GameState, r: Region): number {
  const t = state.taxes.domestic;
  const X = T.taxes;
  if (t > X.highTaxThreshold) return -(t - X.highTaxThreshold) * X.highTaxFactor * r.welfareSensitivity;
  if (t < X.lowTaxThreshold) return -(X.lowTaxThreshold - t) * X.lowTaxFactor * r.welfareSensitivity;
  return 0;
}

export function updateRegion(state: GameState, r: Region): void {
  // tax SD at phase start
  r.approval = clamp(r.approval + taxApprovalShock(state, r), 0, 100);
  const rv = regionRV(state, r);
  const prevOpc = outputPerCapita(r);
  r.approval = clamp(driftToward(r.approval, clamp(rv.approval, 0, 100), T.drift.approval), 0, 100);
  r.stability = clamp(driftToward(r.stability, clamp(rv.stability, 0, 100), T.drift.stability), 0, 100);
  r.education = clamp(driftToward(r.education, clamp(rv.education, 0, 100), T.drift.education), 0, 100);
  r.output = Math.max(0, r.output + (rv.output - r.output) * T.drift.outputFraction);
  r.prevOutputPerCapita = prevOpc;
  // CoL: no drift, follows its formula
  r.col = clamp(r.base.col + colFormula(r), 0, 100);
}

// ---------- countries ----------

export function relationFormula(c: Country): number {
  return ((c.trade / Math.max(c.weight, 1)) * T.country.relationTradeWeight);
}

export function calibrateCountry(c: Country): void {
  c.base.relation = c.relation - relationFormula(c);
  c.base.aggressiveness = c.aggressiveness;
}

export function updateCountry(state: GameState, c: Country): void {
  const edu = nationalAvg(state, 'education');
  if (c.embargo) {
    c.trade = 0;
  } else {
    const exp = 1 + c.relation / 100 + Math.abs(c.culturalInfluence) / 10 + edu / 1000;
    let tv = Math.max(T.country.tradeFloor, c.trade * Math.pow(T.country.tradeGrowthBase, exp));
    tv -= tv * state.taxes.trade * 0.3 * T.country.tradeTaxSuppressionPerTurn;
    c.trade = Math.max(T.country.tradeFloor, tv);
  }
  if (state.taxes.trade > T.country.tradeTaxRelationThreshold && !c.context) {
    c.base.relation -= (state.taxes.trade - T.country.tradeTaxRelationThreshold) * T.country.tradeTaxRelationFactor;
  }
  c.relation = clamp(c.base.relation + relationFormula(c), T.country.relationMin, T.country.relationMax);
  const ciTarget = clamp((state.nation.culturalPower - c.culturalPower) / 10, -10, 10);
  c.culturalInfluence = driftToward(c.culturalInfluence, ciTarget, T.drift.culturalInfluence);
  c.aggressiveness = clamp(driftToward(c.aggressiveness, c.base.aggressiveness, T.drift.aggressiveness), -10, 10);
}

// ---------- actors ----------

/** Relevance-weighted mean absolute compass distance between the president and an actor (0..20). */
export function compassDistance(state: GameState, a: Actor): number {
  if (!a.compass) return 0;
  let num = 0;
  let den = 0;
  for (const ax of AXES) {
    const w = a.relevance ? a.relevance[ax] : 0.5;
    num += w * Math.abs(state.compass[ax] - a.compass[ax]);
    den += w;
  }
  return den > 0 ? num / den : 0;
}

function compassPenalty(state: GameState, a: Actor): number {
  const d = compassDistance(state, a);
  return T.actor.loyaltyCompassFactor * Math.max(0, d - T.actor.loyaltyCompassThreshold);
}

export function loyaltyRV(state: GameState, a: Actor): number {
  return clamp(a.base.loyalty - compassPenalty(state, a), -10, 10);
}

export function calibrateActor(state: GameState, a: Actor): void {
  a.base.loyalty = a.loyalty + compassPenalty(state, a);
  a.base.capacity = a.capacity;
}

export function updateActor(state: GameState, a: Actor): void {
  a.loyalty = clamp(driftToward(a.loyalty, loyaltyRV(state, a), T.drift.loyalty), -10, 10);
  a.capacity = clamp(driftToward(a.capacity, a.base.capacity, T.drift.capacity), 0, 100);
}

// ---------- resources ----------

export function formulaPT(state: GameState): number {
  const v = Math.floor((nationalAvg(state, 'approval') + nationalAvg(state, 'stability')) / 2 / 10);
  return clamp(v, T.resources.PT.min, T.resources.PT.max);
}

export function taxRevenue(state: GameState): number {
  const output = Object.values(state.regions).reduce((s, r) => s + r.output, 0);
  const trade = Object.values(state.countries).reduce((s, c) => s + c.trade, 0);
  return output * state.taxes.domestic + trade * state.taxes.trade;
}

export function rawFC(state: GameState): number {
  const pop = Object.values(state.regions).reduce((s, r) => s + r.population, 0);
  return taxRevenue(state) - pop * state.nation.costPerCapita - state.nation.debtInterest;
}

export function formulaFC(state: GameState): number {
  return clamp(Math.floor(rawFC(state) / Math.max(state.nation.fcBracket, 1e-9)), T.resources.FC.min, T.resources.FC.max);
}

export function formulaIPI(state: GameState): number {
  const actors = Object.values(state.actors).filter((a) => a.ipi);
  if (actors.length === 0) return T.resources.IPI.min;
  const sum = actors.reduce((s, a) => s + ((a.loyalty + 10) / 20) * (a.capacity / 100), 0);
  return clamp(Math.floor((sum / actors.length) * 10), T.resources.IPI.min, T.resources.IPI.max);
}

export function formulaEPI(state: GameState): number {
  const cs = Object.values(state.countries).filter((c) => !c.context);
  if (cs.length === 0) return T.resources.EPI.min;
  const sum = cs.reduce((s, c) => s + ((c.relation + 10) / 20) * (c.weight / 100), 0);
  return clamp(Math.floor((sum / cs.length) * 10), T.resources.EPI.min, T.resources.EPI.max);
}

/** New-turn resources with carryover rules: PT 0%, FC 100% (+income), IPI/EPI 50%. */
export function refreshResources(state: GameState): void {
  const R = T.resources;
  const r = state.resources;
  r.PT = formulaPT(state) + Math.floor(r.PT * R.PT.carry);
  r.FC = r.FC * R.FC.carry + formulaFC(state);
  r.IPI = Math.min(R.IPI.max * 2, formulaIPI(state) + Math.floor(r.IPI * R.IPI.carry));
  r.EPI = Math.min(R.EPI.max * 2, formulaEPI(state) + Math.floor(r.EPI * R.EPI.carry));
}

/** Full end-of-turn simulation step (does not advance chapter/turn counters). */
export function simulateTurn(state: GameState): void {
  for (const r of Object.values(state.regions)) updateRegion(state, r);
  for (const c of Object.values(state.countries)) updateCountry(state, c);
  for (const a of Object.values(state.actors)) updateActor(state, a);
  for (const k of Object.keys(state.cooldowns)) {
    state.cooldowns[k] = Math.max(0, (state.cooldowns[k] ?? 0) - 1);
    if (state.cooldowns[k] === 0) delete state.cooldowns[k];
  }
  refreshResources(state);
}
