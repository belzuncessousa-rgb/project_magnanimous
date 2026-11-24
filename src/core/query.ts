import { evalExpr, parseExpr, truthy, toNum, type Expr, type Value } from './expr';
import { isAllRegions, normId, resolveActor, resolveCountry, resolveRegion } from './ids';
import { AXES } from './tuning';
import type { GameState, Region, RegionIndex } from './types';
import { REGION_INDICES } from './types';

/** Population-weighted national average of a regional index. */
export function nationalAvg(state: GameState, index: RegionIndex): number {
  const regions = Object.values(state.regions);
  if (regions.length === 0) return 0;
  if (index === 'population') return regions.reduce((s, r) => s + r.population, 0);
  if (index === 'output') return regions.reduce((s, r) => s + r.output, 0);
  const pop = regions.reduce((s, r) => s + r.population, 0);
  if (pop <= 0) return regions.reduce((s, r) => s + r[index], 0) / regions.length;
  return regions.reduce((s, r) => s + r[index] * r.population, 0) / pop;
}

export function nationalApproval(state: GameState): number {
  return nationalAvg(state, 'approval');
}

function regionIndexName(s: string): RegionIndex | undefined {
  const n = normId(s);
  if (n === 'conditions_of_living' || n === 'col') return 'col';
  if (n === 'infra') return 'infrastructure';
  if (n === 'pop') return 'population';
  return (REGION_INDICES as readonly string[]).includes(n) ? (n as RegionIndex) : undefined;
}

export interface ResolveExtra {
  /** extra variables (e.g. `target` inside free actions) */
  vars?: Record<string, Value>;
  /** id of the scene currently being played (for `seen.` shortcuts) */
  sceneId?: string;
}

/** Resolve a variable name used in an expression against the game state. Unknown names are 0/false. */
export function resolveVar(state: GameState, name: string, extra: ResolveExtra = {}): Value | undefined {
  if (extra.vars && name in extra.vars) return extra.vars[name];
  // index@region
  const at = name.indexOf('@');
  if (at > 0) {
    const idx = regionIndexName(name.slice(0, at));
    const reg = name.slice(at + 1);
    if (!idx) return 0;
    if (isAllRegions(reg)) return nationalAvg(state, idx);
    const rid = resolveRegion(state, reg);
    return rid ? (state.regions[rid] as Region)[idx] : 0;
  }
  const low = name.toLowerCase();
  if (low === 'chapter') return state.chapter;
  if (low === 'turn') return state.turn;
  if (low === 'turnindex') return state.turnIndex;
  if (low === 'approval') return nationalApproval(state);
  const dot = name.indexOf('.');
  if (dot > 0) {
    const head = name.slice(0, dot).toLowerCase();
    const rest = name.slice(dot + 1);
    switch (head) {
      case 'flag':
      case 'flags':
        return state.flags[rest] ?? state.flags[normId(rest)];
      case 'seen':
        return state.flags[name];
      case 'compass': {
        const ax = rest.toUpperCase();
        return (AXES as readonly string[]).includes(ax) ? state.compass[ax as keyof typeof state.compass] : 0;
      }
      case 'resource':
      case 'resources':
        return state.resources[rest.toUpperCase() as keyof typeof state.resources] ?? 0;
      case 'loyalty':
      case 'opinion':
      case 'suspicion':
      case 'capacity':
      case 'seats': {
        const id = resolveActor(state, rest);
        if (!id) return 0;
        const a = state.actors[id]!;
        const stat = head === 'opinion' ? 'loyalty' : head;
        return (a[stat as 'loyalty'] as number | undefined) ?? 0;
      }
      case 'relation':
      case 'trade':
      case 'aggressiveness': {
        const id = resolveCountry(state, rest);
        return id ? state.countries[id]![head] : 0;
      }
      case 'done':
      case 'scene':
        return state.completedScenes.includes(rest);
      case 'crisis': {
        const [cid, field] = rest.split('.');
        const c = state.crisis[cid!];
        if (!c) return 0;
        return field === 'fired' ? c.fired : c.meter;
      }
      case 'national':
      case 'nation': {
        const idx = regionIndexName(rest);
        return idx ? nationalAvg(state, idx) : 0;
      }
      case 'tax':
        return rest === 'trade' ? state.taxes.trade : state.taxes.domestic;
      default: {
        // <region>.<index>, <country>.<stat>, <actor>.<stat>
        const rid = resolveRegion(state, head);
        const idx = regionIndexName(rest);
        if (rid && idx) return state.regions[rid]![idx];
        const cid = resolveCountry(state, head);
        if (cid && ['relation', 'trade', 'aggressiveness'].includes(rest)) return state.countries[cid]![rest as 'relation'];
        const aid = resolveActor(state, head);
        if (aid) {
          const st = rest === 'opinion' ? 'loyalty' : rest;
          const v = state.actors[aid]![st as 'loyalty'];
          if (typeof v === 'number') return v;
        }
        // dotted flag names
        return state.flags[name];
      }
    }
  }
  if (['PT', 'FC', 'IPI', 'EPI'].includes(name)) return state.resources[name as 'PT'];
  // bare identifier = flag (Notion convention: [show if: fontes_fiscal_pact])
  return state.flags[name] ?? state.flags[normId(name)];
}

const cache = new Map<string, Expr>();
export function compile(src: string): Expr {
  let e = cache.get(src);
  if (!e) {
    e = parseExpr(src);
    cache.set(src, e);
  }
  return e;
}

export function evaluate(state: GameState, expr: Expr | string | undefined, extra: ResolveExtra = {}): Value {
  if (expr === undefined) return true;
  const e = typeof expr === 'string' ? compile(expr) : expr;
  return evalExpr(e, (n) => resolveVar(state, n, extra));
}

export function test(state: GameState, expr: Expr | string | undefined, extra: ResolveExtra = {}): boolean {
  if (expr === undefined || expr === '') return true;
  return truthy(evaluate(state, expr, extra));
}

export function num(state: GameState, expr: Expr | string, extra: ResolveExtra = {}): number {
  return toNum(evaluate(state, expr, extra));
}
