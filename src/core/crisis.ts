// Crisis pressure meters (DECISIONS: "Crisis model APPROVED").
// Each crisis has a hidden meter = Σ weight * value(expr), computed every turn from indices/flags.
// When it reaches its threshold the crisis fires: flag `crisis_<id>` is set and its scene becomes available.
// Before that, crossing `signalAt` queues signal pop-ups / news (the only thing the player sees).
import { num, test } from './query';
import { TUNING } from './tuning';
import type { GameState } from './types';

export interface CrisisTerm {
  expr: string;
  weight?: number;
}

export interface CrisisDef {
  id: string;
  /** scene id that plays when fired */
  scene?: string;
  threshold: number;
  /** only evaluated while this holds */
  when?: string;
  terms: CrisisTerm[];
  /** true: meter accumulates Σ each turn (pressure builds); false (default): meter = Σ this turn */
  accumulate?: boolean;
  /** with accumulate: fraction lost per turn */
  decay?: number;
  /** absolute meter value (or fraction of threshold if <= 1) at which signals are queued */
  signalAt?: number;
  signals?: { popups?: string[]; news?: { paper?: string; id: string }[] };
  /** round-2 format: each step publishes readables / news ids when the meter reaches `at`
   *  (absolute meter value, or a fraction of the threshold when ≤ 1) */
  steps?: { at: number; publish: string[] }[];
  /** extra flags set when the crisis fires */
  flags?: Record<string, boolean | number | string>;
}

export function crisisPressure(state: GameState, def: CrisisDef): number {
  let sum = 0;
  for (const t of def.terms) sum += (t.weight ?? 1) * num(state, t.expr);
  return sum;
}

export function crisisFlag(id: string): string {
  return `crisis_${id}`;
}

/** Evaluate all crises at end of turn. Returns ids that fired this turn. */
export function evaluateCrises(state: GameState, defs: CrisisDef[]): string[] {
  const fired: string[] = [];
  for (const def of defs) {
    const c = (state.crisis[def.id] ??= { meter: 0, fired: false, signalled: false });
    c.steps ??= [];
    if (c.fired) continue;
    if (!test(state, def.when)) continue;
    const p = crisisPressure(state, def);
    if (def.accumulate) c.meter = Math.max(0, c.meter * (1 - (def.decay ?? 0)) + p);
    else c.meter = Math.max(0, p);
    const signalAt =
      def.signalAt === undefined
        ? def.threshold * TUNING.crisis.signalFraction
        : def.signalAt <= 1
          ? def.threshold * def.signalAt
          : def.signalAt;
    (def.steps ?? []).forEach((st, i) => {
      const at = st.at <= 1 ? st.at * def.threshold : st.at;
      if (c.steps!.includes(i) || c.meter < at) return;
      c.steps!.push(i);
      // an id may be a readable/pop-up or a news item; the game ignores ids unknown to each queue
      for (const id of st.publish) {
        if (!state.popupQueue.includes(id)) state.popupQueue.push(id);
        state.newsQueue.push({ id });
      }
    });
    if (c.meter >= def.threshold) {
      c.fired = true;
      state.flags[crisisFlag(def.id)] = true;
      for (const [k, v] of Object.entries(def.flags ?? {})) state.flags[k] = v;
      fired.push(def.id);
    } else if (!c.signalled && c.meter >= signalAt) {
      c.signalled = true;
      for (const p of def.signals?.popups ?? []) if (!state.popupQueue.includes(p)) state.popupQueue.push(p);
      for (const n of def.signals?.news ?? []) state.newsQueue.push(n);
    }
  }
  return fired;
}
