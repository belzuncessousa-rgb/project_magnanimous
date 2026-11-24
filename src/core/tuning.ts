// All balancing constants live here. The GDD (docs/gdd/05-mechanics-reference) leaves several of these TBD;
// values below are simplifications chosen so the starting state sits at rest and nothing explodes.

export const AXES = ['ECON', 'WELF', 'IDEN', 'FORCE', 'STRUCT', 'RELIG'] as const;
export type Axis = (typeof AXES)[number];

export const TUNING = {
  compass: { min: -10, max: 10 },

  // Drift rates per turn (docs/gdd/05-mechanics-reference/indices/rest-values.md)
  drift: {
    approval: 1,
    stability: 0.6,
    education: 0.4,
    aggressiveness: 0.6,
    loyalty: 0.6,
    capacity: 1,
    culturalInfluence: 1,
    /** Output has no drift rate in the GDD: it closes this fraction of the gap to its RV each turn. */
    outputFraction: 0.25,
  },

  region: {
    approvalStabilityWeight: 0.4,
    approvalOutputDeltaWeight: 0.6,
    approvalOutputDeltaClamp: 20,
    stabilityApprovalWeight: 0.5,
    popSensitivityDefault: 0.5,
    popSensitivityRange: [0.2, 1.0] as [number, number],
    welfareSensitivityDefault: 1,
    /** CoL weights: education, infrastructure, output per capita (normalised), stability */
    col: { education: 0.35, infrastructure: 0.3, outputPerCapita: 0.25, stability: 0.1 },
    /** output per capita (output / population M) that maps to 100 on the CoL scale */
    colOutputPerCapitaRef: 1.0,
  },

  country: {
    relationMin: -10,
    relationMax: 10,
    relationTradeWeight: 10,
    tradeGrowthBase: 1.001,
    tradeFloor: 0.5,
    /** fraction of the GDD's "−TV * trade_tax * 0.3" applied per turn (GDD value is per phase) */
    tradeTaxSuppressionPerTurn: 0.1,
    tradeTaxRelationThreshold: 0.25,
    tradeTaxRelationFactor: 8,
  },

  actor: {
    /** loyalty penalty per point of weighted compass distance beyond the threshold */
    loyaltyCompassFactor: 0.8,
    loyaltyCompassThreshold: 3,
  },

  taxes: {
    domesticDefault: 0.3,
    tradeDefault: 0.1,
    domesticRange: [0.05, 0.6] as [number, number],
    tradeRange: [0, 0.4] as [number, number],
    highTaxThreshold: 0.45,
    highTaxFactor: 100,
    lowTaxThreshold: 0.15,
    lowTaxFactor: 60,
    reinvestmentBase: 0.08,
    reinvestmentPerEcon: 0.007,
  },

  resources: {
    PT: { min: 2, max: 8, carry: 0 },
    FC: { min: 1, max: 10, carry: 1 },
    IPI: { min: 1, max: 8, carry: 0.5 },
    EPI: { min: 1, max: 8, carry: 0.5 },
    /** cost per million inhabitants per turn (same units as output) */
    perCapitaCost: 0.08,
    /** RawFC units per 1 FC */
    fcBracket: 3.5,
    /** inherited debt interest as a share of the initial tax revenue (DECISIONS: ≈ 11%) */
    debtInterestShare: 0.11,
    startingFC: 3,
  },

  crisis: {
    /** fraction of threshold at which signal pop-ups/news are queued (unless a crisis defines its own) */
    signalFraction: 0.6,
  },

  /** scene kinds that must be completed before "End turn" unlocks */
  requiredKinds: ['fixed', 'crisis', 'personal'] as string[],
} as const;

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/** Move `current` toward `target` by at most `rate`. */
export function driftToward(current: number, target: number, rate: number): number {
  if (current < target) return Math.min(target, current + rate);
  if (current > target) return Math.max(target, current - rate);
  return current;
}
