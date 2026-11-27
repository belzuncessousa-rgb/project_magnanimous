/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadContent, rawContentFiles } from '../src/content/loader';
import { buildContent, normalizeWorld, parseNewsFile, normalizeFreeActions, type RawFile } from '../src/content/schema';
import { validateContent } from '../src/content/validate';
import { createState } from '../src/core/world';
import { Game } from '../src/game/game';
import { deleteSave, loadGame, saveGame } from '../src/game/save';
import type { SceneRunner } from '../src/scene/runner';

/** Demo-only bundle (ignores any real content that may exist in the repo). */
function demoBundle() {
  return buildContent(rawContentFiles().filter((f) => f.path.includes('/content/_demo/')));
}

/** Play a scene, always picking the first enabled option. */
function autoplay(r: SceneRunner, prefer: (label: string) => boolean = () => true) {
  for (let i = 0; i < 500; i++) {
    const out = r.next();
    if (out.type === 'end') return out;
    if (out.type === 'choices') {
      const ok = out.options.filter((o) => !o.locked && o.affordable);
      const o = ok.find((x) => prefer(x.choice.label)) ?? ok[0];
      if (!o) throw new Error('stuck');
      r.choose(o.index);
    }
  }
  throw new Error('scene did not end');
}

describe('content loading', () => {
  it('demo content parses cleanly and cross-references resolve', () => {
    const c = demoBundle();
    expect(c.warnings).toEqual([]);
    expect(c.scenes.length).toBeGreaterThanOrEqual(5);
    expect(c.chapters.map((x) => x.id)).toEqual([1, 2]);
    const geo = JSON.parse(readFileSync('public/map/regions.json', 'utf8')) as { regions: { id: string }[]; points: Record<string, unknown> };
    const locs = new Set([...geo.regions.map((r) => r.id), ...Object.keys(geo.points), 'federation', 'zharan']);
    expect(validateContent(c, createState(c.world), locs)).toEqual([]);
  });

  it('the bundled content (real or demo) builds without throwing', () => {
    const c = loadContent();
    expect(c.scenes.length).toBeGreaterThan(0);
    expect(c.world.regions).toHaveLength(5);
    if (c.warnings.length) console.warn(`content warnings:\n  ${c.warnings.join('\n  ')}`);
  });

  it('real content wins over demo per category; story-bound demo files are dropped with real scenes', () => {
    const files: RawFile[] = [
      { path: '/content/_demo/scenes/a.md', data: '---\nid: demo-a\nchapter: 1\n---\n## x\n\nDemo.' },
      { path: '/content/_demo/chapters.json', data: { chapters: [{ id: 1, turns: [{ turn: 1, date: 'Demo date' }] }] } },
      { path: '/content/_demo/characters.json', data: [{ id: 'mertens', name: 'Caio Mertens' }] },
      { path: '/content/scenes/p1/real.md', data: '---\nid: real-a\nchapter: 1\nturn: 2\n---\n## x\n\nReal.' },
    ];
    const c = buildContent(files);
    expect(c.scenes.map((s) => s.id)).toEqual(['real-a']);
    expect(c.chapters[0]!.turns).toHaveLength(2); // derived from scenes, demo chapters ignored
    expect(c.world.actors.map((a) => a.id)).toContain('mertens'); // demo characters still used
    expect(c.demo).toEqual(['characters']);
  });

  it('world normalisation is lenient', () => {
    const w = normalizeWorld(
      { regions: { tekoku: { approval: 20, Population: 50000000 } }, countries: [{ name: 'Arennian Federation', diplomatic_relation: 3 }], parties: [{ id: 'pm', seats: 24 }] },
      { characters: [{ id: 'x', name: 'X Y', compass: [1, 2, 3, 4, 5, 6] }] },
    );
    const tek = w.regions.find((r) => r.id === 'tekoku')!;
    expect(tek.population).toBe(50);
    expect(tek.approval).toBe(20);
    expect(w.regions.map((r) => r.id).sort()).toEqual(['ibicui', 'ibira', 'mognagna', 'tapira', 'tekoku']);
    expect(w.countries.find((c) => c.id === 'arennian_federation')?.relation).toBe(3);
    expect(w.countries.some((c) => c.id === 'zharan')).toBe(true);
    expect(w.actors.find((a) => a.id === 'pm')).toMatchObject({ kind: 'party', seats: 24 });
    expect(w.actors.find((a) => a.id === 'x')!.compass).toEqual({ ECON: 1, WELF: 2, IDEN: 3, FORCE: 4, STRUCT: 5, RELIG: 6 });
  });

  it('news files: single and multi-item', () => {
    const one = parseNewsFile('/content/news/a.md', '---\npaper: ledger\nchapter: 1\n---\n# Head\n\nBody text.');
    expect(one).toEqual([expect.objectContaining({ id: 'a', paper: 'ledger', headline: 'Head', text: 'Body text.', chapter: 1 })]);
    const many = parseNewsFile('/content/news/b.md', '---\npaper: clarion\n---\n## One\nx\n## Two\ny');
    expect(many.map((n) => [n.id, n.headline, n.text])).toEqual([['b-1', 'One', 'x'], ['b-2', 'Two', 'y']]);
  });

  it('free actions: costs, targets, effects', () => {
    const warns: string[] = [];
    const [a] = normalizeFreeActions([{ id: 'rally', label: 'Rally', cost: { PT: 1 }, targets: 'regions', effects: '[approval +3 @ target] [cost: 1 FC]' }], (m) => warns.push(m));
    expect(a).toMatchObject({ id: 'rally', cost: { PT: 1, FC: 1 }, targets: 'regions', targeted: true });
    expect(a!.effects).toHaveLength(1);
    expect(warns).toEqual([]);
  });
});

describe('game flow (demo content)', () => {
  const geo = { regions: ['tekoku', 'ibicui', 'mognagna', 'tapira', 'ibira'], countries: ['federation', 'zharan', 'arenza', 'vassel'] };

  it('plays chapter 1 → chapter 2 → end', () => {
    const g = Game.newGame(demoBundle());
    const s = g.state;
    expect(s.dateLabel).toBe('1 March — Inauguration Week');
    expect(g.activePopups().map((p) => p.id)).toEqual(['demo-note', 'demo-report', 'demo-reaction', 'demo-river']);

    // forced scene first
    expect(g.forcedScene()?.id).toBe('demo-oath');
    const briefing = g.scene('demo-briefing')!;
    expect(g.isLocked(briefing)).toBe(true);
    expect(g.canEndTurn()).toBe(false);
    expect(g.availableScenes().map((x) => x.id)).toEqual(['demo-oath', 'demo-briefing', 'demo-river-visit']);

    autoplay(g.startScene('demo-oath'));
    g.completeScene('demo-oath');
    expect(s.flags.demo_promised_trust).toBe(true);
    expect(g.isLocked(briefing)).toBe(false);
    expect(g.canEndTurn()).toBe(true); // briefing / visit are optional

    // free action with a target
    const pt0 = s.resources.PT;
    const rally = g.freeActions().find((v) => v.action.id === 'rally')!;
    expect(g.validTargets(rally.action, geo)).toEqual(geo.regions);
    const before = s.regions.tapira!.approval;
    expect(g.doFreeAction('rally')).toBeNull(); // needs a target
    expect(g.doFreeAction('rally', 'tapira')?.text).toBe('You speak to the crowds in Tapira.');
    expect(s.regions.tapira!.approval).toBe(before + 3);
    expect(s.resources.PT).toBe(pt0 - 1);
    expect(g.doFreeAction('rally', 'tapira')).toBeNull(); // cooldown
    const envoy = g.freeActions().find((v) => v.action.id === 'envoy')!;
    expect(g.validTargets(envoy.action, geo)).toEqual(geo.countries);

    // briefing: ignore unions to build crisis pressure
    autoplay(g.startScene('demo-briefing'), (l) => /labour|Not yet/.test(l));
    g.completeScene('demo-briefing');
    expect(s.flags.demo_ignored_unions).toBe(true);

    const end1 = g.endTurn();
    const papers = end1.edition.papers.map((p) => p.paper.id);
    expect(papers).toEqual(['ledger', 'clarion', 'voice', 'dispatch']);
    expect(end1.edition.dateLabel).toBe('1 March — Inauguration Week');
    expect(s.turn).toBe(2);
    expect(s.dateLabel).toBe('19 March');
    // crisis fired (ignored unions + no compact)
    expect(end1.firedCrises).toEqual(['demo_strikes']);
    expect(g.availableScenes().map((x) => x.id)).toContain('demo-strikes');
    expect(g.availableScenes().map((x) => x.id)).toContain('demo-mother');
    expect(g.canEndTurn()).toBe(false);
    autoplay(g.startScene('demo-mother'));
    g.completeScene('demo-mother');
    autoplay(g.startScene('demo-strikes'));
    g.completeScene('demo-strikes');
    expect(g.canEndTurn()).toBe(true);

    const end2 = g.endTurn();
    expect(end2.ended).toBe(false);
    expect(s.chapter).toBe(2);
    expect(s.turn).toBe(1);
    expect(g.availableScenes().map((x) => x.id)).toEqual(['demo-ambassador', 'demo-cabinet']);
    for (const id of ['demo-ambassador', 'demo-cabinet']) {
      autoplay(g.startScene(id));
      g.completeScene(id);
    }
    const end3 = g.endTurn();
    expect(end3.ended).toBe(true);
    expect(g.canEndTurn()).toBe(false);
  });

  it('dispatch item is printed only once; queued items print when queued', () => {
    const g = Game.newGame(demoBundle());
    autoplay(g.startScene('demo-oath'));
    g.completeScene('demo-oath');
    g.state.newsQueue.push({ paper: 'canopy', id: 'demo-canopy-clinic' });
    const e1 = g.endTurn();
    expect(e1.edition.papers.find((p) => p.paper.id === 'canopy')?.items[0]?.headline).toBe('A clinic for the river towns?');
    autoplay(g.startScene('demo-mother'));
    g.completeScene('demo-mother');
    const e2 = g.endTurn();
    expect(e2.edition.papers.some((p) => p.paper.id === 'dispatch')).toBe(false);
  });

  it('save / load round-trip through a storage shim', () => {
    const mem = new Map<string, string>();
    const store = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k) };
    const g = Game.newGame(demoBundle());
    g.state.flags.x = 7;
    expect(saveGame(g.state, store)).toBe(true);
    const f = loadGame(store)!;
    expect(f.state.flags.x).toBe(7);
    const g2 = Game.fromState(demoBundle(), f.state);
    expect(g2.forcedScene()?.id).toBe('demo-oath');
    deleteSave(store);
    expect(loadGame(store)).toBeNull();
    const broken = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('full'); }, removeItem: () => undefined };
    expect(saveGame(g.state, broken)).toBe(false);
    expect(loadGame(broken)).toBeNull();
  });
});

describe('free actions file shapes', () => {
  it('reads each action once whether the file is a list or an object with actions/freeActions', async () => {
    const { normalizeFreeActions } = await import('../src/content/schema');
    const one = [{ id: 'rally', label: 'Hold a rally', cost: '1 PT' }];
    expect(normalizeFreeActions(one, () => {}).map((a) => a.id)).toEqual(['rally']);
    expect(normalizeFreeActions({ actions: one, freeActions: [{ id: 'envoy', label: 'Envoy' }] }, () => {}).map((a) => a.id)).toEqual(['rally', 'envoy']);
    expect(normalizeFreeActions({ rally: { label: 'Hold a rally' } }, () => {}).map((a) => a.id)).toEqual(['rally']);
  });
});
