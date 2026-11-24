// Content normalisation: turns the (lenient) JSON/markdown written by content authors into engine types.
// Pure functions — the Vite-specific file discovery lives in loader.ts.
import type { CondEffect, ResourceAmounts } from '../core/effects';
import type { CrisisDef } from '../core/crisis';
import { normId } from '../core/ids';
import { AXES } from '../core/tuning';
import type { ActorKind, Compass } from '../core/types';
import type { ActorInput, CountryInput, RegionInput, WorldInput } from '../core/world';
import { splitFrontMatter } from '../scene/frontmatter';
import { normalizeMarkup, parseScene } from '../scene/parser';
import { parseAmounts, parseTokenSpan } from '../scene/tokens';
import type { Scene } from '../scene/types';

// ------------------------------------------------------------------------------------------------
// Types

export interface Paper {
  id: string;
  name: string;
  slant: string;
  tagline: string;
}

export interface NewsItem {
  id: string;
  paper: string;
  headline: string;
  text: string;
  when?: string;
  chapter?: number;
  turn?: number;
  priority: number;
  /** printed only when explicitly queued with [news: ...] */
  queuedOnly: boolean;
  repeat: boolean;
}

export interface Popup {
  id: string;
  title?: string;
  text: string;
  location?: string;
  when?: string;
  chapter?: number;
  turn?: number;
  repeat: boolean;
}

export type TargetKind = 'regions' | 'countries' | 'any';

export interface FreeAction {
  id: string;
  label: string;
  description?: string;
  cost: ResourceAmounts;
  targeted: boolean;
  targets: TargetKind | string[];
  effects: CondEffect[];
  when?: string;
  cooldown: number;
  scene?: string;
  result?: string;
}

export interface TurnDef {
  turn: number;
  date: string;
  scenes: string[];
  popups: string[];
  news: { paper?: string; id: string }[];
}

export interface ChapterDef {
  id: number;
  title: string;
  turns: TurnDef[];
}

export interface ContentBundle {
  world: WorldInput;
  scenes: Scene[];
  chapters: ChapterDef[];
  news: NewsItem[];
  popups: Popup[];
  freeActions: FreeAction[];
  crises: CrisisDef[];
  papers: Paper[];
  warnings: string[];
  /** which categories fell back to content/_demo */
  demo: string[];
}

export interface RawFile {
  /** path relative to repo root, e.g. /content/scenes/p1.md */
  path: string;
  /** raw text for .md, parsed object for .json */
  data: unknown;
}

// ------------------------------------------------------------------------------------------------
// Defaults (facts from docs/gdd + DECISIONS)

export const DEFAULT_PAPERS: Paper[] = [
  { id: 'ledger', name: 'The St. Veldra Ledger', slant: 'Establishment liberal', tagline: 'Of record since the Republic' },
  { id: 'clarion', name: 'The Kunasai Clarion', slant: 'Nationalist tabloid', tagline: 'The truth they won’t print' },
  { id: 'voice', name: 'The Katanaí Voice', slant: 'Unions & movements', tagline: 'Written from the periphery' },
  { id: 'dispatch', name: 'Arvane Dispatch', slant: 'Geopolitics', tagline: 'The continent, weekly' },
  { id: 'canopy', name: 'The Canopy Review', slant: 'Science, health & environment', tagline: 'Evidence before opinion' },
];

const GDD_REGIONS: Record<string, Partial<RegionInput>> = {
  tekoku: { name: 'Tekoku', population: 50, approval: 15 },
  ibicui: { name: 'Ibicuí', population: 100, approval: 41 },
  mognagna: { name: 'Mognagna', population: 70, approval: 80 },
  tapira: { name: 'Tapira', population: 30, approval: 25 },
  ibira: { name: 'Ibira', population: 30, approval: 70 },
};

const DEFAULT_COUNTRIES: CountryInput[] = [
  { id: 'federation', name: 'Arennian Federation', relation: 4, trade: 30, aggressiveness: -4, weight: 100, military: 95, culturalPower: 85, context: false },
  { id: 'zharan', name: 'Zharan', relation: 5, trade: 20, aggressiveness: -8, weight: 95, military: 90, culturalPower: 60, context: false },
  { id: 'arenza', name: 'Arenza', relation: -1, trade: 8, aggressiveness: 0, weight: 40, military: 45, culturalPower: 45, context: false },
  { id: 'tarev', name: 'Tarev', relation: 0, trade: 3, aggressiveness: 2, weight: 12, military: 20, culturalPower: 15, context: false },
  { id: 'veldmoor', name: 'Veldmoor', relation: 2, trade: 6, aggressiveness: -3, weight: 30, military: 25, culturalPower: 70, context: false },
  { id: 'mondrath', name: 'Mondrath', relation: -3, trade: 4, aggressiveness: 3, weight: 25, military: 40, culturalPower: 35, context: false },
  { id: 'vassel', name: 'Vassel', relation: 1, trade: 2, aggressiveness: 0, weight: 8, military: 10, culturalPower: 15, context: true },
  { id: 'orvane', name: 'Orvane', relation: 1, trade: 1, aggressiveness: 0, weight: 5, military: 8, culturalPower: 10, context: true },
  { id: 'selvara', name: 'Selvara', relation: 1, trade: 2, aggressiveness: 0, weight: 10, military: 12, culturalPower: 20, context: true },
  { id: 'cabral', name: 'Cabral', relation: 0, trade: 2, aggressiveness: 0, weight: 10, military: 15, culturalPower: 15, context: true },
  { id: 'torreval', name: 'Torreval', relation: 0, trade: 2, aggressiveness: 1, weight: 12, military: 18, culturalPower: 18, context: true },
];

// ------------------------------------------------------------------------------------------------
// helpers

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);

function pick(o: Obj, ...keys: string[]): unknown {
  for (const k of keys) if (o[k] !== undefined) return o[k];
  // case/underscore-insensitive
  const norm = (s: string) => s.toLowerCase().replace(/[_\s-]/g, '');
  const want = keys.map(norm);
  for (const [k, v] of Object.entries(o)) if (want.includes(norm(k)) && v !== undefined) return v;
  return undefined;
}
function n(o: Obj, def: number, ...keys: string[]): number {
  const v = pick(o, ...keys);
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v))) return Number(v);
  return def;
}
function s(o: Obj, ...keys: string[]): string | undefined {
  const v = pick(o, ...keys);
  return typeof v === 'string' ? v : typeof v === 'number' ? String(v) : undefined;
}
function strList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => (isObj(x) ? String(x.id ?? '') : String(x))).filter(Boolean);
  if (typeof v === 'string') return v.split(',').map((x) => x.trim()).filter(Boolean);
  return [];
}

/** Accept `[ {id,...} ]`, `{ id: {...} }` or `{ key: [ ... ] }`. */
export function listOf(v: unknown, key?: string): Obj[] {
  if (Array.isArray(v)) return v.filter(isObj);
  if (isObj(v)) {
    if (key && v[key] !== undefined) return listOf(v[key]);
    const vals = Object.entries(v);
    if (vals.every(([, x]) => isObj(x))) return vals.map(([id, x]) => ({ id, ...(x as Obj) }));
  }
  return [];
}

function compassOf(v: unknown): Compass | undefined {
  if (Array.isArray(v) && v.length >= AXES.length && v.every((x) => typeof x === 'number')) {
    return Object.fromEntries(AXES.map((a, i) => [a, v[i] as number])) as Compass;
  }
  if (isObj(v)) {
    const out = {} as Compass;
    let any = false;
    for (const a of AXES) {
      const x = pick(v, a, a.toLowerCase());
      out[a] = typeof x === 'number' ? x : 0;
      if (typeof x === 'number') any = true;
    }
    return any ? out : undefined;
  }
  return undefined;
}

// ------------------------------------------------------------------------------------------------
// world

export function normalizeRegions(raw: unknown): RegionInput[] {
  const list = listOf(raw, 'regions');
  const out: RegionInput[] = list.map((r) => {
    const id = normId(s(r, 'id') ?? s(r, 'name') ?? 'region');
    const g = GDD_REGIONS[id] ?? {};
    let population = n(r, g.population ?? 30, 'population', 'pop', 'populationM', 'population_m');
    if (population > 5000) population = population / 1e6; // raw head count
    return {
      id,
      name: s(r, 'name') ?? g.name ?? id,
      population,
      approval: n(r, g.approval ?? 50, 'approval', 'popularApproval'),
      stability: n(r, 50, 'stability'),
      output: n(r, population * 0.35, 'output', 'economicOutput'),
      education: n(r, 50, 'education'),
      infrastructure: n(r, 50, 'infrastructure', 'infra'),
      col: pick(r, 'col', 'conditionsOfLiving') !== undefined ? n(r, 50, 'col', 'conditionsOfLiving') : undefined,
      popSensitivity: pick(r, 'popSensitivity') !== undefined ? n(r, 0.5, 'popSensitivity') : undefined,
      welfareSensitivity: pick(r, 'welfareSensitivity') !== undefined ? n(r, 1, 'welfareSensitivity') : undefined,
    };
  });
  for (const [id, g] of Object.entries(GDD_REGIONS)) {
    if (!out.some((r) => r.id === id)) {
      out.push({ id, name: g.name!, population: g.population!, approval: g.approval!, stability: 50, output: g.population! * 0.35, education: 50, infrastructure: 50 });
    }
  }
  return out;
}

export function normalizeCountries(raw: unknown): CountryInput[] {
  const list = listOf(raw, 'countries');
  const out: CountryInput[] = list.map((c) => {
    const id = normId(s(c, 'id') ?? s(c, 'name') ?? 'country');
    const d = DEFAULT_COUNTRIES.find((x) => x.id === id);
    return {
      id,
      name: s(c, 'name') ?? d?.name ?? id,
      relation: n(c, d?.relation ?? 0, 'relation', 'diplomaticRelation'),
      trade: n(c, d?.trade ?? 2, 'trade', 'tradeVolume'),
      aggressiveness: n(c, d?.aggressiveness ?? 0, 'aggressiveness'),
      weight: n(c, d?.weight ?? 10, 'weight', 'economicWeight', 'gdp', 'nationalGdp'),
      military: n(c, d?.military ?? 20, 'military', 'militaryProwess'),
      culturalPower: n(c, d?.culturalPower ?? 20, 'culturalPower'),
      context: typeof pick(c, 'context') === 'boolean' ? (pick(c, 'context') as boolean) : (d?.context ?? false),
      embargo: pick(c, 'embargo') === true,
    };
  });
  for (const d of DEFAULT_COUNTRIES) if (!out.some((c) => c.id === d.id)) out.push({ ...d });
  return out;
}

function normalizeActor(a: Obj, kind: ActorKind): ActorInput {
  const id = normId(s(a, 'id') ?? s(a, 'name') ?? 'actor');
  const aliases = strList(pick(a, 'aliases', 'alias'));
  const short = s(a, 'short', 'abbr', 'acronym');
  if (short) aliases.push(short);
  return {
    id,
    name: s(a, 'name', 'displayName') ?? id,
    kind: (s(a, 'kind', 'type') as ActorKind | undefined) && ['character', 'party', 'faction'].includes(s(a, 'kind', 'type')!) ? (s(a, 'kind', 'type') as ActorKind) : kind,
    role: s(a, 'role', 'title'),
    party: s(a, 'party'),
    portrait: s(a, 'portrait'),
    loyalty: n(a, 0, 'loyalty', 'opinion', 'personalLoyalty'),
    suspicion: n(a, 0, 'suspicion'),
    capacity: n(a, 50, 'capacity', 'capacityToAct', 'coa'),
    seats: pick(a, 'seats') !== undefined ? n(a, 0, 'seats') : undefined,
    compass: compassOf(pick(a, 'compass')),
    relevance: compassOf(pick(a, 'relevance')),
    ipi: typeof pick(a, 'ipi') === 'boolean' ? (pick(a, 'ipi') as boolean) : undefined,
    aliases,
  };
}

export function normalizeWorld(worldRaw: unknown, charactersRaw: unknown): WorldInput {
  const w = isObj(worldRaw) ? worldRaw : {};
  const actors: ActorInput[] = [];
  const add = (a: ActorInput) => {
    const i = actors.findIndex((x) => x.id === a.id);
    if (i >= 0) actors[i] = { ...actors[i]!, ...Object.fromEntries(Object.entries(a).filter(([, v]) => v !== undefined)) } as ActorInput;
    else actors.push(a);
  };
  for (const p of listOf(w.parties)) add(normalizeActor(p, 'party'));
  for (const f of listOf(w.factions)) add(normalizeActor(f, 'faction'));
  for (const c of listOf(w.characters)) add(normalizeActor(c, 'character'));
  for (const c of listOf(charactersRaw, 'characters')) add(normalizeActor(c, 'character'));

  const start = isObj(w.start) ? w.start : {};
  const nation = isObj(w.nation) ? w.nation : {};
  const taxes = isObj(w.taxes) ? w.taxes : {};
  const resources = isObj(w.resources) ? w.resources : {};
  const player = isObj(w.player) ? w.player : {};
  return {
    regions: normalizeRegions(w.regions),
    countries: normalizeCountries(w.countries),
    actors,
    compass: compassOf(pick(player, 'compass') ?? w.compass),
    taxes: { domestic: typeof taxes.domestic === 'number' ? taxes.domestic : undefined, trade: typeof taxes.trade === 'number' ? taxes.trade : undefined },
    resources: Object.fromEntries(['PT', 'FC', 'IPI', 'EPI'].filter((k) => typeof resources[k] === 'number').map((k) => [k, resources[k] as number])),
    flags: isObj(w.flags) ? (w.flags as Record<string, boolean | number | string>) : undefined,
    nation: {
      culturalPower: typeof nation.culturalPower === 'number' ? nation.culturalPower : undefined,
      debtInterest: typeof nation.debtInterest === 'number' ? nation.debtInterest : undefined,
    },
    start: { chapter: typeof start.chapter === 'number' ? start.chapter : undefined, turn: typeof start.turn === 'number' ? start.turn : undefined },
  };
}

// ------------------------------------------------------------------------------------------------
// chapters

function newsRefs(v: unknown): { paper?: string; id: string }[] {
  if (!Array.isArray(v)) return strList(v).map((x) => parseNewsRef(x));
  return v.map((x) => (isObj(x) ? { paper: s(x, 'paper'), id: s(x, 'id', 'headline') ?? '' } : parseNewsRef(String(x)))).filter((x) => x.id);
}
function parseNewsRef(x: string): { paper?: string; id: string } {
  const m = /^([\w-]+)[/: ]+([\w.-]+)$/.exec(x.trim());
  return m ? { paper: m[1], id: m[2]! } : { id: x.trim() };
}

export function normalizeChapters(raw: unknown): ChapterDef[] {
  return listOf(raw, 'chapters')
    .map((c, ci) => {
      const turns = listOf(pick(c, 'turns')).map((t, ti) => ({
        turn: n(t, ti + 1, 'turn', 'id', 'number'),
        date: s(t, 'date', 'dateLabel', 'label') ?? `Turn ${ti + 1}`,
        scenes: strList(pick(t, 'scenes')),
        popups: strList(pick(t, 'popups', 'pops')),
        news: newsRefs(pick(t, 'news', 'editions')),
      }));
      return { id: n(c, ci + 1, 'id', 'chapter', 'number'), title: s(c, 'title', 'name') ?? `Chapter ${ci + 1}`, turns };
    })
    .sort((a, b) => a.id - b.id);
}

/** When no chapters.json exists: chapters/turns derived from scene front-matter. */
export function deriveChapters(scenes: Scene[]): ChapterDef[] {
  const byCh = new Map<number, number>();
  for (const sc of scenes) {
    const ch = sc.meta.chapter ?? 1;
    byCh.set(ch, Math.max(byCh.get(ch) ?? 1, sc.meta.turn ?? 1));
  }
  if (byCh.size === 0) byCh.set(1, 1);
  return [...byCh.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([id, turns]) => ({
      id,
      title: `Chapter ${id}`,
      turns: Array.from({ length: turns }, (_, i) => ({ turn: i + 1, date: `Chapter ${id} · Turn ${i + 1}`, scenes: [], popups: [], news: [] })),
    }));
}

// ------------------------------------------------------------------------------------------------
// news / popups / free actions / crises

export function parseNewsFile(path: string, src: string): NewsItem[] {
  const { meta, body } = splitFrontMatter(src);
  const base = path.replace(/^.*\//, '').replace(/\.md$/i, '');
  const text = normalizeMarkup(body).trim();
  const common = {
    paper: normId(String(meta.paper ?? 'ledger')),
    when: meta.when != null ? String(meta.when) : undefined,
    chapter: typeof meta.chapter === 'number' ? meta.chapter : undefined,
    turn: typeof meta.turn === 'number' ? meta.turn : undefined,
    priority: typeof meta.priority === 'number' ? meta.priority : 0,
    queuedOnly: meta.queued === true || meta.trigger === 'queued',
    repeat: meta.repeat === true,
  };
  const id = meta.id != null ? String(meta.id) : base;
  // several "## Headline" sections = several items sharing the front-matter
  const sections = text.split(/^##\s+/m).filter((x) => x.trim());
  if (/^##\s+/m.test(text) && sections.length > 1) {
    const lead = text.startsWith('##') ? [] : [sections.shift()!];
    void lead;
    return sections.map((sec, i) => {
      const [h, ...rest] = sec.split('\n');
      return { ...common, id: `${id}-${i + 1}`, headline: h!.trim(), text: rest.join('\n').trim() };
    });
  }
  const lines = text.split('\n');
  let headline = meta.headline != null ? String(meta.headline) : '';
  let bodyLines = lines;
  if (!headline) {
    const hi = lines.findIndex((l) => l.trim());
    headline = (lines[hi] ?? id).replace(/^#+\s*/, '').replace(/^\*\*|\*\*$/g, '').trim();
    bodyLines = lines.slice(hi + 1);
  }
  return [{ ...common, id, headline, text: bodyLines.join('\n').trim() }];
}

export function normalizePopups(raw: unknown): Popup[] {
  return listOf(raw, 'popups').map((p) => ({
    id: s(p, 'id') ?? 'popup',
    title: s(p, 'title'),
    text: s(p, 'text', 'body') ?? '',
    location: s(p, 'location', 'at', 'region'),
    when: s(p, 'when'),
    chapter: pick(p, 'chapter') !== undefined ? n(p, 1, 'chapter') : undefined,
    turn: pick(p, 'turn') !== undefined ? n(p, 1, 'turn') : undefined,
    repeat: pick(p, 'repeat') === true,
  }));
}

function tokensFrom(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === 'string') return [v];
  return [];
}

export function normalizeFreeActions(raw: unknown, warn: (m: string) => void): FreeAction[] {
  return listOf(raw, 'actions').concat(listOf(raw, 'freeActions')).map((a) => {
    const id = s(a, 'id') ?? 'action';
    const effects: CondEffect[] = [];
    let cost: ResourceAmounts = {};
    const costRaw = pick(a, 'cost');
    if (typeof costRaw === 'string') cost = parseAmounts(costRaw.replace(/^\[?cost:\s*|\]$/gi, '')) ?? {};
    else if (isObj(costRaw)) for (const [k, v] of Object.entries(costRaw)) if (typeof v === 'number') cost[k.toUpperCase() as keyof ResourceAmounts] = v;
    let cond: CondEffect['cond'];
    for (const span of tokensFrom(pick(a, 'effects', 'tokens'))) {
      for (const t of parseTokenSpan(span.replace(/`/g, ''))) {
        if (t.kind === 'effect') effects.push(cond ? { effect: t.effect, cond } : { effect: t.effect });
        else if (t.kind === 'if') cond = t.expr;
        else if (t.kind === 'gain') effects.push({ effect: { type: 'resource', amounts: t.amounts } });
        else if (t.kind === 'cost') for (const [k, v] of Object.entries(t.amounts)) cost[k as keyof ResourceAmounts] = (cost[k as keyof ResourceAmounts] ?? 0) + (v ?? 0);
        else warn(`free action ${id}: unsupported token in effects`);
      }
    }
    const tv = pick(a, 'targets', 'validTargets', 'target');
    let targets: TargetKind | string[] = 'any';
    if (Array.isArray(tv)) targets = tv.map((x) => normId(String(x)));
    else if (typeof tv === 'string') {
      const t = tv.toLowerCase();
      targets = t.startsWith('region') ? 'regions' : t.startsWith('countr') || t.startsWith('foreign') ? 'countries' : t === 'any' ? 'any' : t.split(',').map((x) => normId(x));
    }
    const targeted = pick(a, 'targeted') === true || (pick(a, 'targeted') === undefined && tv !== undefined);
    return {
      id,
      label: s(a, 'label', 'name', 'title') ?? id,
      description: s(a, 'description', 'desc', 'text'),
      cost,
      targeted,
      targets,
      effects,
      when: s(a, 'when'),
      cooldown: n(a, 0, 'cooldown'),
      scene: s(a, 'scene'),
      result: s(a, 'result', 'resultText', 'feedback'),
    };
  });
}

export function normalizeCrises(raw: unknown): CrisisDef[] {
  return listOf(raw, 'crises').map((c) => ({
    id: s(c, 'id') ?? 'crisis',
    scene: s(c, 'scene'),
    threshold: n(c, 10, 'threshold'),
    when: s(c, 'when'),
    terms: listOf(pick(c, 'terms', 'inputs')).map((t) => ({ expr: s(t, 'expr', 'expression') ?? '0', weight: n(t, 1, 'weight', 'w') })),
    accumulate: pick(c, 'accumulate') === true,
    decay: n(c, 0, 'decay'),
    signalAt: pick(c, 'signalAt') !== undefined ? n(c, 0.6, 'signalAt') : undefined,
    signals: isObj(pick(c, 'signals'))
      ? { popups: strList((pick(c, 'signals') as Obj).popups), news: newsRefs((pick(c, 'signals') as Obj).news) }
      : undefined,
    flags: isObj(pick(c, 'flags')) ? (pick(c, 'flags') as Record<string, boolean>) : undefined,
  }));
}

export function normalizePapers(raw: unknown): Paper[] {
  const list = listOf(raw, 'papers');
  if (!list.length) return DEFAULT_PAPERS;
  return list.map((p) => {
    const id = normId(s(p, 'id') ?? s(p, 'name') ?? 'paper');
    const d = DEFAULT_PAPERS.find((x) => x.id === id);
    return { id, name: s(p, 'name') ?? d?.name ?? id, slant: s(p, 'slant') ?? d?.slant ?? '', tagline: s(p, 'tagline') ?? d?.tagline ?? '' };
  });
}

// ------------------------------------------------------------------------------------------------
// bundle

const DEMO = '/content/_demo/';

function rel(path: string): string {
  const p = path.replace(/\\/g, '/');
  const i = p.indexOf('/content/');
  return i >= 0 ? p.slice(i) : p;
}

/**
 * Build the content bundle. Real files under /content/ win over /content/_demo/ per category
 * (scenes, news, world, characters, chapters, popups, free actions, crises).
 */
export function buildContent(files: RawFile[]): ContentBundle {
  const warnings: string[] = [];
  const demo: string[] = [];
  const all = files.map((f) => ({ ...f, path: rel(f.path) }));
  const real = all.filter((f) => !f.path.startsWith(DEMO));
  const dem = all.filter((f) => f.path.startsWith(DEMO));

  // story-bound demo files (chapters, news, pop-ups, crises) are only used together with the demo scenes
  const realScenes = real.some((f) => /^\/content\/scenes\/.*\.md$/.test(f.path));
  const storyBound = new Set(['chapters', 'news', 'popups', 'crises']);
  function choose(cat: string, test: (p: string) => boolean): RawFile[] {
    const r = real.filter((f) => test(f.path.replace(/^\/content\//, '')));
    if (r.length) return r;
    if (realScenes && storyBound.has(cat)) return [];
    const d = dem.filter((f) => test(f.path.slice(DEMO.length)));
    if (d.length) demo.push(cat);
    return d;
  }
  const jsonOf = (cat: string, name: string): unknown => choose(cat, (p) => p === name)[0]?.data;

  const sceneFiles = choose('scenes', (p) => p.startsWith('scenes/') && p.endsWith('.md'));
  const scenes: Scene[] = [];
  for (const f of sceneFiles) {
    try {
      const sc = parseScene(String(f.data), { filename: f.path });
      if (scenes.some((x) => x.id === sc.id)) warnings.push(`duplicate scene id ${sc.id} (${f.path})`);
      else scenes.push(sc);
      warnings.push(...sc.warnings);
    } catch (e) {
      warnings.push(`${f.path}: ${(e as Error).message}`);
    }
  }

  const worldRaw = jsonOf('world', 'world.json');
  const world = normalizeWorld(worldRaw, jsonOf('characters', 'characters.json'));
  const chaptersRaw = jsonOf('chapters', 'chapters.json');
  let chapters = chaptersRaw ? normalizeChapters(chaptersRaw) : [];
  if (!chapters.length || chapters.every((c) => !c.turns.length)) chapters = deriveChapters(scenes);

  const news = choose('news', (p) => p.startsWith('news/') && p.endsWith('.md')).flatMap((f) => parseNewsFile(f.path, String(f.data)));
  const popups = normalizePopups(jsonOf('popups', 'popups.json'));
  const freeActions = normalizeFreeActions(jsonOf('free-actions', 'free-actions.json'), (m) => warnings.push(m));
  const crisesRaw = jsonOf('crises', 'crises.json') ?? (isObj(worldRaw) ? worldRaw.crises : undefined);
  const crises = normalizeCrises(crisesRaw);
  const papers = normalizePapers(isObj(worldRaw) ? worldRaw.papers : undefined);

  return { world, scenes, chapters, news, popups, freeActions, crises, papers, warnings, demo };
}
