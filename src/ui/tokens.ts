// Which map token (public/map/tokens/<id>.png) represents a scene on the map.
import type { Scene } from '../scene/types';

export const TOKENS = ['congress', 'palace', 'education', 'health', 'treasury', 'project', 'security', 'foreign', 'personal', 'news', 'strike', 'crisis'] as const;

const KEYWORDS: [RegExp, string][] = [
  [/strike|picket|walkout/, 'strike'],
  [/treasury|budget|debt|fund\b|fiscal|tax/, 'treasury'],
  [/health|hospital|clinic|tobacco/, 'health'],
  [/education|school|universit/, 'education'],
  [/defen[cs]e|jaguar|army|military|security|justice|police|cartel|intelligence/, 'security'],
  [/planning|project|railway|mining|sanitation|great-project/, 'project'],
  [/congress|bench|senat|lessa|avros|vote|coalition|party/, 'congress'],
  [/ambassador|envoy|foreign|federation|zharan|arenza|summit/, 'foreign'],
  [/interview|press|newspaper|editor/, 'news'],
];

/**
 * Token choice: front-matter `token:` → kind (personal, crisis) → keywords in id/title (minister portfolio)
 * → foreign location → palace.
 */
export function tokenFor(sc: Scene, foreignIds: Set<string>): string {
  const explicit = sc.meta.extra.token;
  if (typeof explicit === 'string' && explicit) return explicit;
  if (sc.meta.kind === 'personal') return 'personal';
  const text = `${sc.id} ${sc.meta.title} ${sc.meta.background ?? ''}`.toLowerCase();
  if (sc.meta.kind === 'crisis') return /strike/.test(text) ? 'strike' : 'crisis';
  for (const [re, t] of KEYWORDS) if (re.test(text)) return t;
  if (sc.meta.location && foreignIds.has(sc.meta.location)) return 'foreign';
  return 'palace';
}
