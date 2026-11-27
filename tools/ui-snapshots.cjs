// UI snapshot capture for visual regression checks.
// usage: npm run dev (port 5173), then: node tools/ui-snapshots.cjs <outdir> [state,state...]
// Compare two runs with: python3 tools/ui-snapshots-diff.py <dirA> <dirB>
// Known noisy states (tiny diffs between identical runs): d-social, d-actions, m-marker.
const { chromium } = require('playwright');
const out = process.argv[2]; require('fs').mkdirSync(out, { recursive: true });
const KILL = '*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}';
const vps = { d: { width: 1600, height: 900 }, l: { width: 1280, height: 800 }, m: { width: 390, height: 844 } };
let SAVE = null;
async function fresh(b, vp, q = '') {
  const p = await b.newPage({ viewport: vp });
  await p.addInitScript((save) => { localStorage.clear(); if (save) localStorage.setItem('magnanimous.save.v1', save); }, SAVE);
  await p.goto('http://localhost:5173/' + q, { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: KILL });
  return p;
}
const sp = async (p, n) => { for (let i = 0; i < n; i++) { await p.keyboard.press('Space'); await p.waitForTimeout(25); } };
async function toMap(p) {
  if (SAVE) { await p.click('button:text-is("Continue")'); await p.waitForTimeout(400); return; }
  await p.click('button:text-is("New game")'); await p.waitForTimeout(300);
  for (let k = 0; k < 8; k++) { const c = await p.$('.choice, .vn-choice'); if (c) await c.evaluate(el => el.click()); await sp(p, 30); }
  await p.waitForTimeout(300);
}
const openApp = async (p, id) => { await toMap(p); await p.evaluate(() => window.__app.openTablet()); await p.waitForTimeout(150);
  const a = await p.$(`.np-app-icon-button[data-app="${id}"]`); if (a) { await a.evaluate(el => el.click()); await p.waitForTimeout(250); } };
const states = {
  title: async () => {},
  vn: async (p) => { await p.evaluate(() => localStorage.clear()); await p.reload({ waitUntil: 'networkidle' }); await p.addStyleTag({ content: KILL }); await p.click('button:text-is("New game")'); await p.waitForTimeout(300); await sp(p, 6); },
  vn2: async (p) => { await p.evaluate(() => localStorage.clear()); await p.reload({ waitUntil: 'networkidle' }); await p.addStyleTag({ content: KILL }); await p.click('button:text-is("New game")'); await p.waitForTimeout(300); await sp(p, 25); },
  map: toMap,
  menu: async (p) => { await toMap(p); await p.evaluate(() => window.__app.openMenu()); },
  actions: async (p) => { await toMap(p); await p.evaluate(() => window.__app.toggleSidebar()); },
  tablet: async (p) => { await toMap(p); await p.evaluate(() => window.__app.openTablet()); await p.waitForTimeout(200); },
  news: (p) => openApp(p, 'news'),
  social: (p) => openApp(p, 'social'),
  codex: (p) => openApp(p, 'codex'),
  reports: (p) => openApp(p, 'reports'),
  settings: async (p) => { await p.evaluate(() => window.__app.openSettings()); await p.waitForTimeout(150); },
  budget: async (p) => { await toMap(p); await p.evaluate(async () => { const m = await import('/src/ui/screens.ts'); const a = window.__app; m.showBudget(a.root, a.game.state, a.content.ministries); }); await p.waitForTimeout(300); },
  vote: async (p) => { await toMap(p); await p.evaluate(async () => { const m = await import('/src/ui/screens.ts'); const a = window.__app; m.showVote(a.root, a.game.state, a.content.bills[0]); }); await p.waitForTimeout(300); },
  debt: async (p) => { await toMap(p); await p.evaluate(async () => { const m = await import('/src/ui/screens.ts'); const a = window.__app; m.showDebt(a.root, a.game.state); }); await p.waitForTimeout(300); },
  marker: async (p) => { await toMap(p); const r = await p.$('.marker'); if (r) await r.hover({ force: true }).catch(() => {}); await p.waitForTimeout(150); },
  scene2: async (p) => { await toMap(p); const r = await p.$('.marker'); if (r) await r.evaluate(el => el.dispatchEvent(new MouseEvent('click', { bubbles: true }))); await p.waitForTimeout(300); await sp(p, 4); },
};
(async () => {
  const b = await chromium.launch();
  const only = process.argv[3];
  { const p = await fresh(b, vps.d); await toMap(p); SAVE = await p.evaluate(() => localStorage.getItem('magnanimous.save.v1')); await p.close(); console.log('save', SAVE ? SAVE.length : 'none'); }
  for (const [vk, vp] of Object.entries(vps)) for (const [sk, fn] of Object.entries(states)) {
    if (only && !only.split(',').includes(sk)) continue;
    const p = await fresh(b, vp); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try { await fn(p); await p.waitForTimeout(250); await p.screenshot({ path: `${out}/${vk}-${sk}.png` }); }
    catch (e) { console.log('FAIL', vk, sk, e.message.split('\n')[0]); }
    if (errs.length) console.log('ERR', vk, sk, errs);
    await p.close();
  }
  await b.close();
})();
