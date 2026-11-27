// Remove CSS declarations that can never win: an earlier declaration is dropped when a LATER rule with the identical
// selector list, in the identical at-rule context, sets the same property (and the earlier one is not !important
// while the later one is not). Identical selectors match the same elements with the same specificity, so the later
// declaration always wins; deleting the earlier one cannot change rendering. Empty rules are then removed.
// Usage: node tools/css-dedupe.mjs <file.css> [--write]
import { readFileSync, writeFileSync } from 'node:fs';
import postcss from 'postcss';

const [file, flag] = process.argv.slice(2);
const root = postcss.parse(readFileSync(file, 'utf8'), { from: file });

const ctx = (node) => {
  const parts = [];
  for (let p = node.parent; p && p.type !== 'root'; p = p.parent) if (p.type === 'atrule') parts.unshift(`@${p.name} ${p.params}`);
  return parts.join(' | ');
};
const normSel = (sel) => sel.split(',').map((s) => s.trim().replace(/\s+/g, ' ')).join(', ');

// Walk rules from last to first, remembering which (context, selector, property) a later rule already sets.
const rules = [];
root.walkRules((r) => { if (r.parent.type !== 'atrule' || !/keyframes$/.test(r.parent.name)) rules.push(r); });
const seen = new Map(); // key -> { important }
let removed = 0;
for (let i = rules.length - 1; i >= 0; i--) {
  const r = rules[i];
  const base = `${ctx(r)} ## ${normSel(r.selector)}`;
  const decls = r.nodes.filter((n) => n.type === 'decl');
  // Within one rule the last declaration of a property wins too.
  for (let j = decls.length - 1; j >= 0; j--) {
    const d = decls[j];
    if (d.prop.startsWith('--')) { // custom properties: same rule, same name
      const k = `${base} ## ${d.prop}`;
      const later = seen.get(k);
      if (later && (later.important || !d.important)) { d.remove(); removed++; continue; }
      seen.set(k, { important: (later?.important) || d.important });
      continue;
    }
    const k = `${base} ## ${d.prop.toLowerCase()}`;
    const later = seen.get(k);
    // Keep deliberate fallbacks such as `height: 100vh; height: 100dvh`.
    if (later && (later.important || !d.important) && !later.fallbackFor) { d.remove(); removed++; continue; }
    seen.set(k, { important: (later?.important) || d.important, fallbackFor: /\b\d*[dsl]v[hwib]\b/.test(d.value) && !later });
  }
}
let emptied = 0;
root.walkRules((r) => { if (!r.nodes.some((n) => n.type === 'decl')) { r.remove(); emptied++; } });
root.walkAtRules((a) => { if (['media', 'supports'].includes(a.name) && !a.nodes?.length) a.remove(); });
console.log(`${file}: removed ${removed} overridden declarations, ${emptied} empty rules`);
if (flag === '--write') writeFileSync(file, root.toString());
