// One alignment system for regions, characters/parties, countries and votes (author, round 5):
//   penalty(entity) = Σ_i w_i · |player_i − entity_i|^p / Σ_i |w_i|
// w = the entity's relevance vector (may be negative: the sign is kept, so caring "against" an axis turns
// distance into approval), p = TUNING.alignment.exponent. Entities without a compass have no penalty.
// Every use is calibrated at game start (the starting penalty is folded into the Base terms), so only
// CHANGES of alignment move indices.
import { AXES, TUNING } from './tuning';
import type { Compass } from './types';

export function alignmentPenalty(player: Compass, compass: Compass | undefined, relevance: Compass | undefined): number {
  if (!compass) return 0;
  const w = relevance ?? DEFAULT_RELEVANCE;
  let num = 0;
  let den = 0;
  for (const ax of AXES) {
    const wi = w[ax] ?? 0;
    num += wi * Math.pow(Math.abs(player[ax] - (compass[ax] ?? 0)), TUNING.alignment.exponent);
    den += Math.abs(wi);
  }
  return den > 0 ? num / den : 0;
}

/** used when an entity has a compass but no relevance vector (people, parties, regions) */
const DEFAULT_RELEVANCE = Object.fromEntries(AXES.map((a) => [a, 0.5])) as Compass;

/** Countries without a relevance vector: interstate weights (archive: Identity 3, Force 2, Power 2, Religion 1, Economic 1, Welfare 0). */
export function interstateRelevance(): Compass {
  return { ...TUNING.alignment.interstateRelevance } as Compass;
}
