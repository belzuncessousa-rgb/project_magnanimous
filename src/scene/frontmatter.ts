// Minimal YAML front-matter reader: `key: value` lines, inline [a, b] arrays, `- item` block lists,
// quoted strings, numbers, booleans, trailing `# comments` on unquoted values.

export type FMValue = string | number | boolean | FMValue[] | null;

function scalar(raw: string): FMValue {
  let v = raw.trim();
  if (v.startsWith('"') || v.startsWith("'")) {
    const q = v[0]!;
    const end = v.indexOf(q, 1);
    return end > 0 ? v.slice(1, end) : v.slice(1);
  }
  const hash = v.search(/\s#/);
  if (hash >= 0) v = v.slice(0, hash).trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return splitTop(inner).map(scalar);
  }
  if (v === '' || v === '~' || v === 'null') return null;
  if (/^(true|yes)$/i.test(v)) return true;
  if (/^(false|no)$/i.test(v)) return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return parseFloat(v);
  return v;
}

function splitTop(s: string): string[] {
  const out: string[] = [];
  let cur = '';
  let q: string | null = null;
  for (const ch of s) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === ',') { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

export function parseYamlLite(src: string): Record<string, FMValue> {
  const out: Record<string, FMValue> = {};
  let lastKey: string | null = null;
  for (const line of src.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const item = /^\s+-\s+(.*)$/.exec(line) ?? /^-\s+(.*)$/.exec(line);
    if (item && lastKey) {
      const cur = out[lastKey];
      const arr = Array.isArray(cur) ? cur : [];
      arr.push(scalar(item[1]!));
      out[lastKey] = arr;
      continue;
    }
    const m = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (m) {
      lastKey = m[1]!;
      out[lastKey] = scalar(m[2]!);
    }
  }
  return out;
}

/** Split `---\nfront\n---\nbody`. Returns empty meta when absent. */
export function splitFrontMatter(src: string): { meta: Record<string, FMValue>; body: string; hasFrontMatter: boolean } {
  const text = src.replace(/^﻿/, '');
  const m = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/.exec(text);
  if (!m) return { meta: {}, body: text, hasFrontMatter: false };
  return { meta: parseYamlLite(m[1]!), body: text.slice(m[0].length), hasFrontMatter: true };
}
