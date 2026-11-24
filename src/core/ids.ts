import type { GameState } from './types';

/** "Ibicuí" -> "ibicui", "Caio Mertens" -> "caio_mertens", "Armed Forces" -> "armed_forces". */
export function normId(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/^the\s+/, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/** kebab-case slug, used for beat ids. */
export function slugify(s: string): string {
  return normId(s).replace(/_/g, '-');
}

const ALL = new Set(['all', 'national', 'nation', 'country', 'kunasai', 'everywhere']);

export function isAllRegions(name: string): boolean {
  return ALL.has(normId(name));
}

/** Built-in aliases that content may use (old Notion names etc.). */
const COUNTRY_ALIASES: Record<string, string> = {
  arennian_federation: 'federation',
  arennia: 'federation',
  arennian: 'federation',
  zharan_republic: 'zharan',
};

export function resolveRegion(state: GameState, name: string): string | undefined {
  const n = normId(name);
  if (state.regions[n]) return n;
  for (const r of Object.values(state.regions)) if (normId(r.name) === n) return r.id;
  return undefined;
}

export function resolveCountry(state: GameState, name: string): string | undefined {
  const n = normId(name);
  if (state.countries[n]) return n;
  const alias = COUNTRY_ALIASES[n];
  if (alias && state.countries[alias]) return alias;
  for (const c of Object.values(state.countries)) {
    const cn = normId(c.name);
    if (cn === n || cn.endsWith('_' + n) || n.endsWith('_' + cn)) return c.id;
  }
  return undefined;
}

export function resolveActor(state: GameState, name: string): string | undefined {
  const n = normId(name);
  if (state.actors[n]) return n;
  const actors = Object.values(state.actors);
  for (const a of actors) if (a.aliases.includes(n) || normId(a.name) === n) return a.id;
  // surname / first-name match, only when unambiguous
  const partial = actors.filter((a) => normId(a.name).split('_').includes(n));
  if (partial.length === 1) return partial[0]!.id;
  return undefined;
}

/** Build the default alias list for an actor. */
export function actorAliases(id: string, name: string, extra: string[] = []): string[] {
  const set = new Set<string>([normId(id), normId(name), ...extra.map(normId)]);
  return [...set].filter(Boolean);
}
