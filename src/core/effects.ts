import type { Expr } from './expr';
import { isAllRegions, normId, resolveActor, resolveCountry, resolveRegion } from './ids';
import { test, type ResolveExtra } from './query';
import { AXES, TUNING, clamp, type Axis } from './tuning';
import type { FlagValue, GameState, RegionIndex, ResourceId } from './types';

export type ResourceAmounts = Partial<Record<ResourceId, number>>;

export type Effect =
  | { type: 'compass'; axis: Axis; delta: number }
  /** shock delta on a regional index; `rv` = permanent change of the rest value ("Events" term) */
  | { type: 'region'; index: RegionIndex; delta: number; regions: string[] | 'all'; rv?: boolean }
  | { type: 'actor'; actor: string; stat: 'loyalty' | 'suspicion' | 'capacity' | 'seats'; delta: number; rv?: boolean }
  | { type: 'country'; country: string; stat: 'relation' | 'trade' | 'aggressiveness'; delta: number; rv?: boolean }
  | { type: 'flag'; name: string; op: '=' | '+=' | '-='; value: FlagValue }
  | { type: 'resource'; amounts: ResourceAmounts }
  | { type: 'tax'; which: 'domestic' | 'trade'; delta: number }
  | { type: 'news'; paper?: string; id: string }
  | { type: 'popup'; id: string }
  | { type: 'embargo'; country: string; value: boolean };

/** An effect gated by an optional `[if: expr]`. */
export interface CondEffect {
  effect: Effect;
  cond?: Expr;
}

export interface ApplyContext extends ResolveExtra {
  /** substitution for the `target` placeholder (free actions) */
  target?: string;
  warn?: (msg: string) => void;
}

const LOYALTY = { min: -10, max: 10 };

function sub(name: string, ctx: ApplyContext): string {
  if (ctx.target && /^(\$?target|\{target\})$/i.test(name.trim())) return ctx.target;
  return name;
}

export function regionIds(state: GameState, regions: string[] | 'all', ctx: ApplyContext = {}): string[] {
  if (regions === 'all') return Object.keys(state.regions);
  const out: string[] = [];
  for (const raw of regions) {
    const name = sub(raw, ctx);
    if (isAllRegions(name)) return Object.keys(state.regions);
    const id = resolveRegion(state, name);
    if (id) out.push(id);
    else ctx.warn?.(`Unknown region '${raw}'`);
  }
  return out;
}

function clampRegion(index: RegionIndex, v: number): number {
  if (index === 'output' || index === 'population') return Math.max(0, v);
  return clamp(v, 0, 100);
}

export function applyEffect(state: GameState, e: Effect, ctx: ApplyContext = {}): void {
  switch (e.type) {
    case 'compass': {
      const { min, max } = TUNING.compass;
      state.compass[e.axis] = clamp(state.compass[e.axis] + e.delta, min, max);
      return;
    }
    case 'region': {
      for (const id of regionIds(state, e.regions, ctx)) {
        const r = state.regions[id]!;
        if (e.rv) {
          if (e.index in r.base) r.base[e.index as keyof typeof r.base] += e.delta;
          if (e.index === 'col') r.col = clampRegion('col', r.col + e.delta);
        } else {
          r[e.index] = clampRegion(e.index, r[e.index] + e.delta);
          // CoL has no drift: a shock is a lasting change to its formula offset
          if (e.index === 'col') r.base.col += e.delta;
          if (e.index === 'education') r.base.education += e.delta;
        }
      }
      return;
    }
    case 'actor': {
      const id = resolveActor(state, sub(e.actor, ctx));
      if (!id) { ctx.warn?.(`Unknown character/faction '${e.actor}'`); return; }
      const a = state.actors[id]!;
      if (e.stat === 'seats') { a.seats = Math.max(0, (a.seats ?? 0) + e.delta); return; }
      if (e.rv && (e.stat === 'loyalty' || e.stat === 'capacity')) a.base[e.stat] += e.delta;
      if (e.stat === 'loyalty') a.loyalty = clamp(a.loyalty + e.delta, LOYALTY.min, LOYALTY.max);
      else a[e.stat] = clamp(a[e.stat] + e.delta, 0, 100);
      return;
    }
    case 'country': {
      const id = resolveCountry(state, sub(e.country, ctx));
      if (!id) { ctx.warn?.(`Unknown country '${e.country}'`); return; }
      const c = state.countries[id]!;
      if (e.stat === 'relation') {
        // relation has no drift: events change its formula offset
        c.base.relation += e.delta;
        c.relation = clamp(c.relation + e.delta, TUNING.country.relationMin, TUNING.country.relationMax);
      } else if (e.stat === 'aggressiveness') {
        if (e.rv) c.base.aggressiveness += e.delta;
        c.aggressiveness = clamp(c.aggressiveness + e.delta, -10, 10);
      } else {
        c.trade = Math.max(0, c.trade + e.delta);
      }
      return;
    }
    case 'flag': {
      const name = e.name;
      if (e.op === '=') state.flags[name] = e.value;
      else {
        const cur = state.flags[name];
        const n = typeof cur === 'number' ? cur : cur === true ? 1 : 0;
        const d = typeof e.value === 'number' ? e.value : Number(e.value) || 0;
        state.flags[name] = e.op === '+=' ? n + d : n - d;
      }
      return;
    }
    case 'resource': {
      for (const [k, v] of Object.entries(e.amounts)) {
        const key = k as ResourceId;
        state.resources[key] = Math.max(0, state.resources[key] + (v ?? 0));
      }
      return;
    }
    case 'tax': {
      const range = e.which === 'domestic' ? TUNING.taxes.domesticRange : TUNING.taxes.tradeRange;
      state.taxes[e.which] = clamp(+(state.taxes[e.which] + e.delta).toFixed(4), range[0], range[1]);
      return;
    }
    case 'news':
      state.newsQueue.push({ paper: e.paper, id: e.id });
      return;
    case 'popup':
      if (!state.popupQueue.includes(e.id)) state.popupQueue.push(e.id);
      return;
    case 'embargo': {
      const id = resolveCountry(state, sub(e.country, ctx));
      if (id) {
        state.countries[id]!.embargo = e.value;
        if (e.value) state.countries[id]!.trade = 0;
      }
      return;
    }
  }
}

export function applyEffects(state: GameState, effects: CondEffect[], ctx: ApplyContext = {}): void {
  for (const ce of effects) {
    if (ce.cond && !test(state, ce.cond, { ...ctx, vars: { ...ctx.vars, ...(ctx.target ? { target: ctx.target } : {}) } })) continue;
    applyEffect(state, ce.effect, ctx);
  }
}

export function canAfford(state: GameState, cost: ResourceAmounts): boolean {
  return Object.entries(cost).every(([k, v]) => state.resources[k as ResourceId] >= (v ?? 0));
}

export function pay(state: GameState, cost: ResourceAmounts): void {
  for (const [k, v] of Object.entries(cost)) state.resources[k as ResourceId] = Math.max(0, state.resources[k as ResourceId] - (v ?? 0));
}

export function isAxis(s: string): s is Axis {
  return (AXES as readonly string[]).includes(s.toUpperCase());
}

export { normId };
