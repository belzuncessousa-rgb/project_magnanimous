// Mechanics tokens: the `[ ... ]` groups inside backticks (docs/SCENE-FORMAT.md "Tokens").
import type { Effect, ResourceAmounts } from '../core/effects';
import { parseExpr, type Expr } from '../core/expr';
import { AXES, type Axis } from '../core/tuning';
import type { FlagValue, RegionIndex, ResourceId } from '../core/types';

export type Token =
  | { kind: 'effect'; effect: Effect }
  | { kind: 'cost'; amounts: ResourceAmounts }
  | { kind: 'gain'; amounts: ResourceAmounts }
  | { kind: 'req'; amounts?: ResourceAmounts; expr?: Expr; raw: string }
  | { kind: 'show'; expr: Expr; raw: string }
  | { kind: 'lock'; expr: Expr; raw: string }
  | { kind: 'if'; expr: Expr; raw: string }
  | { kind: 'once' }
  | { kind: 'goto'; target: string }
  | { kind: 'unknown'; raw: string };

const RES_ALIASES: Record<string, ResourceId> = {
  pt: 'PT', time: 'PT', political_time: 'PT', presidential_time: 'PT',
  fc: 'FC', capital: 'FC', money: 'FC', financial_capital: 'FC', funds: 'FC',
  ipi: 'IPI', influence: 'IPI',
  epi: 'EPI',
};

function resId(s: string): ResourceId | undefined {
  return RES_ALIASES[s.toLowerCase().replace(/\s+/g, '_')];
}

export function parseAmounts(src: string): ResourceAmounts | undefined {
  const out: ResourceAmounts = {};
  let any = false;
  for (const part of src.split(/[,;+]|\band\b/)) {
    const p = part.trim();
    if (!p) continue;
    let m = /^(-?\d+(?:\.\d+)?)\s*([A-Za-z][A-Za-z ]*)$/.exec(p);
    let n: number;
    let name: string;
    if (m) { n = parseFloat(m[1]!); name = m[2]!.trim(); }
    else {
      m = /^([A-Za-z][A-Za-z ]*?)\s*(-?\d+(?:\.\d+)?)$/.exec(p);
      if (!m) return undefined;
      name = m[1]!.trim(); n = parseFloat(m[2]!);
    }
    const id = resId(name);
    if (!id) return undefined;
    out[id] = (out[id] ?? 0) + n;
    any = true;
  }
  return any ? out : undefined;
}

const REGION_INDEX: Record<string, RegionIndex> = {
  approval: 'approval', popular_approval: 'approval',
  stability: 'stability',
  col: 'col', conditions_of_living: 'col',
  education: 'education',
  infrastructure: 'infrastructure', infra: 'infrastructure',
  output: 'output', economic_output: 'output',
  population: 'population',
};

function parseValue(v: string): FlagValue {
  const s = v.trim().replace(/^["']|["']$/g, '');
  if (/^true$/i.test(s)) return true;
  if (/^false$/i.test(s)) return false;
  if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
  return s;
}

function num(s: string): number {
  return parseFloat(s.replace(/^\+/, ''));
}

/** Parse the inside of one `[...]` group. */
export function parseBracket(inner: string): Token {
  const s = inner.trim();
  let m: RegExpExecArray | null;

  if (/^once$/i.test(s)) return { kind: 'once' };

  if ((m = /^(show\s*if|lock\s*if|if|req(?:uires?)?\s*flag|req(?:uires?)?|cost|gain)\s*:\s*(.*)$/i.exec(s))) {
    const key = m[1]!.toLowerCase().replace(/\s+/g, ' ');
    const body = m[2]!.trim();
    if (key === 'cost' || key === 'gain') {
      const amounts = parseAmounts(body);
      if (!amounts) return { kind: 'unknown', raw: s };
      return { kind: key, amounts };
    }
    if (key.startsWith('req') && !key.includes('flag')) {
      const amounts = parseAmounts(body);
      if (amounts) return { kind: 'req', amounts, raw: s };
    }
    let expr: Expr;
    try { expr = parseExpr(body); } catch { return { kind: 'unknown', raw: s }; }
    if (key.startsWith('req')) return { kind: 'req', expr, raw: body };
    if (key === 'show if') return { kind: 'show', expr, raw: body };
    if (key === 'lock if') return { kind: 'lock', expr, raw: body };
    return { kind: 'if', expr, raw: body };
  }

  if ((m = /^flag\s*:\s*([\w.\-]+)\s*(\+=|-=|=)\s*(.+)$/i.exec(s))) {
    return { kind: 'effect', effect: { type: 'flag', name: m[1]!, op: m[2] as '=' | '+=' | '-=', value: parseValue(m[3]!) } };
  }
  if ((m = /^flag\s*:\s*([\w.\-]+)$/i.exec(s))) {
    return { kind: 'effect', effect: { type: 'flag', name: m[1]!, op: '=', value: true } };
  }

  if ((m = /^news\s*:\s*(\S+)(?:\s+(\S+))?$/i.exec(s))) {
    return m[2]
      ? { kind: 'effect', effect: { type: 'news', paper: m[1]!, id: m[2] } }
      : { kind: 'effect', effect: { type: 'news', id: m[1]! } };
  }
  if ((m = /^pop(?:up)?\s*:\s*(\S+)$/i.exec(s))) return { kind: 'effect', effect: { type: 'popup', id: m[1]! } };

  if ((m = /^embargo\s*:\s*(.+?)\s*(?:=\s*(true|false))?$/i.exec(s))) {
    return { kind: 'effect', effect: { type: 'embargo', country: m[1]!, value: m[2] ? m[2].toLowerCase() === 'true' : true } };
  }

  // compass: [+2 ECON] / [ECON +2]
  if ((m = /^([+-]?\d+(?:\.\d+)?)\s+([A-Za-z]+)$/.exec(s)) && (AXES as readonly string[]).includes(m[2]!.toUpperCase())) {
    return { kind: 'effect', effect: { type: 'compass', axis: m[2]!.toUpperCase() as Axis, delta: num(m[1]!) } };
  }
  if ((m = /^([A-Za-z]+)\s+([+-]?\d+(?:\.\d+)?)$/.exec(s)) && (AXES as readonly string[]).includes(m[1]!.toUpperCase())) {
    return { kind: 'effect', effect: { type: 'compass', axis: m[1]!.toUpperCase() as Axis, delta: num(m[2]!) } };
  }

  // tax: [tax domestic +0.05]
  if ((m = /^tax\s+(domestic|trade)\s+([+-]?\d+(?:\.\d+)?)(%?)$/i.exec(s))) {
    const d = num(m[2]!) / (m[3] ? 100 : 1);
    return { kind: 'effect', effect: { type: 'tax', which: m[1]!.toLowerCase() as 'domestic' | 'trade', delta: d } };
  }

  // regional index: [approval +5 @ ibicui, mognagna] / [stability +3 @ national] / [col_rv +1 @ all] / [stability +3]
  if ((m = /^([A-Za-z][A-Za-z ]*?)(_rv| rv)?\s+([+-]?\d+(?:\.\d+)?)\s*(?:@\s*(.+))?$/i.exec(s))) {
    const idx = REGION_INDEX[m[1]!.trim().toLowerCase().replace(/\s+/g, '_')];
    if (idx) {
      const where = m[4]?.trim();
      const regions = !where ? 'all' : where.split(',').map((x) => x.trim()).filter(Boolean);
      return { kind: 'effect', effect: { type: 'region', index: idx, delta: num(m[3]!), regions, ...(m[2] ? { rv: true } : {}) } };
    }
  }

  // actor / faction / country stat: [Mertens opinion +5] [OPP capacity -2] [federation relation +1]
  if ((m = /^(.+?)\s+(opinion|loyalty|suspicion|capacity|seats|relation|relations|trade|aggressiveness)(_rv| rv)?\s+([+-]?\d+(?:\.\d+)?)$/i.exec(s))) {
    const name = m[1]!.trim();
    const stat = m[2]!.toLowerCase();
    const rv = m[3] ? { rv: true } : {};
    const d = num(m[4]!);
    if (stat === 'relation' || stat === 'relations' || stat === 'trade' || stat === 'aggressiveness') {
      return { kind: 'effect', effect: { type: 'country', country: name, stat: stat === 'relations' ? 'relation' : (stat as 'relation'), delta: d, ...rv } };
    }
    return { kind: 'effect', effect: { type: 'actor', actor: name, stat: stat === 'opinion' ? 'loyalty' : (stat as 'loyalty'), delta: d, ...rv } };
  }

  return { kind: 'unknown', raw: s };
}

/**
 * Parse the contents of one inline-code span (or a bare token string).
 * A span may hold several bracket groups and/or a `→ target`.
 */
export function parseTokenSpan(span: string): Token[] {
  const out: Token[] = [];
  const s = span.trim();
  const re = /\[([^\]]*)\]/g;
  let m: RegExpExecArray | null;
  let rest = s;
  while ((m = re.exec(s))) {
    out.push(parseBracket(m[1]!));
    rest = rest.replace(m[0], ' ');
  }
  const g = /(?:→|->)\s*(.+)$/.exec(rest.trim());
  if (g) out.push({ kind: 'goto', target: g[1]!.trim() });
  return out;
}

/** Extract every inline-code span from a line. Returns the spans and the line with spans removed. */
export function extractCodeSpans(line: string): { spans: string[]; text: string } {
  const spans: string[] = [];
  const text = line.replace(/`([^`]*)`/g, (_, inner: string) => {
    spans.push(inner);
    return ' ';
  });
  return { spans, text: text.replace(/\s{2,}/g, ' ').trim() };
}
