// Remove CSS rules whose every selector needs a class that the UI code can never produce.
// Class names are collected from every identifier-like token in src/**/*.ts and index.html. A selector is dead when one of its required classes is neither a known class nor matches a known
// dynamic prefix. Pseudo/negated parts (:not(...)) are ignored when deciding.
// Usage: node tools/css-unused.mjs <file.css> [--write]
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import postcss from 'postcss';

const [file, flag] = process.argv.slice(2);
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const sources = [...walk('src').filter((f) => f.endsWith('.ts')), 'index.html'].map((f) => readFileSync(f, 'utf8')).join('\n');

const known = new Set();
const prefixes = new Set();
// Over-inclusive on purpose: any identifier-like token anywhere in the sources counts as a class it might produce,
// and `prefix-${...}` templates count as dynamic prefixes. False positives only keep CSS; they never remove it.
for (const m of sources.matchAll(/-?[A-Za-z_][\w-]*/g)) known.add(m[0]);
for (const m of sources.matchAll(/([A-Za-z_][\w-]*-)\$\{/g)) prefixes.add(m[1]);
const isKnown = (c) => known.has(c) || [...prefixes].some((p) => c.startsWith(p));

const required = (sel) => {
  const stripped = sel.replace(/:(not|where|is|has)\((?:[^()]|\([^()]*\))*\)/g, '');
  return [...stripped.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)].map((m) => m[1]);
};
const root = postcss.parse(readFileSync(file, 'utf8'), { from: file });
let removedRules = 0, removedSelectors = 0;
const deadClasses = new Set();
root.walkRules((r) => {
  if (r.parent.type === 'atrule' && /keyframes$/.test(r.parent.name)) return;
  const keep = r.selectors.filter((s) => {
    const missing = required(s).filter((c) => !isKnown(c));
    missing.forEach((c) => deadClasses.add(c));
    return missing.length === 0;
  });
  if (keep.length === 0) { r.remove(); removedRules++; }
  else if (keep.length < r.selectors.length) { removedSelectors += r.selectors.length - keep.length; r.selectors = keep; }
});
root.walkAtRules((a) => { if (['media', 'supports'].includes(a.name) && !a.nodes?.length) a.remove(); });
console.log(`${file}: removed ${removedRules} dead rules and ${removedSelectors} dead selectors`);
console.log('classes never produced by the UI:', [...deadClasses].sort().join(' '));
if (flag === '--write') writeFileSync(file, root.toString());
