/// <reference types="node" />
// Integration test against the chapter-1 content corpus (snapshot of origin/wip/content-ch1 in tests/fixtures/ch1).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildContent, type RawFile } from '../src/content/schema';
import { validateContent } from '../src/content/validate';
import { createState } from '../src/core/world';
import { Game } from '../src/game/game';
import type { SceneRunner } from '../src/scene/runner';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function corpus(root = 'tests/fixtures/ch1'): RawFile[] {
  return walk(join(root, 'content')).map((p) => {
    const rel = '/' + p.slice(root.length + 1).replace(/\\/g, '/');
    const txt = readFileSync(p, 'utf8');
    return { path: rel, data: p.endsWith('.json') ? JSON.parse(txt) : txt };
  });
}

function autoplay(r: SceneRunner, pickIdx: (n: number) => number) {
  for (let i = 0; i < 2000; i++) {
    const out = r.next();
    if (out.type === 'end') return out;
    if (out.type === 'choices') {
      const ok = out.options.filter((o) => !o.locked && o.affordable);
      if (!ok.length) throw new Error(`stuck in ${r.scene.id} at ${r.currentBeat}`);
      r.choose(ok[pickIdx(ok.length) % ok.length]!.index);
    }
  }
  throw new Error(`scene ${r.scene.id} did not end`);
}

const geo = JSON.parse(readFileSync('public/map/regions.json', 'utf8')) as { regions: { id: string }[]; points: Record<string, unknown> };
const locations = new Set([...geo.regions.map((r) => r.id), ...Object.keys(geo.points), 'federation', 'zharan']);

describe('chapter-1 corpus', () => {
  const c = buildContent(corpus());

  it('parses every scene without warnings', () => {
    expect(c.demo).toEqual([]);
    expect(c.scenes.length).toBeGreaterThanOrEqual(13);
    expect(c.warnings).toEqual([]);
  });

  it('cross-references resolve', () => {
    expect(validateContent(c, createState(c.world), locations)).toEqual([]);
  });

  it('every listed scene is reachable and the closing scene is last', () => {
    const ids = new Set(c.scenes.map((s) => s.id));
    for (const t of c.chapters[0]!.turns) for (const s of t.scenes) expect(ids.has(s)).toBe(true);
    expect(c.chapters[0]!.turns[2]!.closing).toBe('p1-great-project');
  });

  for (const seed of [0, 1, 2, 7]) {
    it(`plays the whole chapter (choice pattern ${seed})`, () => {
      const g = Game.newGame(c);
      let k = seed;
      const pick = (n: number) => (k = (k * 31 + 17) % 9973) % n;
      const played: string[][] = [];
      for (let turn = 0; turn < 10 && !g.state.ended; turn++) {
        const thisTurn: string[] = [];
        for (let guard = 0; guard < 40; guard++) {
          const next = g.availableScenes().find((s) => !g.isLocked(s));
          if (!next) break;
          autoplay(g.startScene(next.id), pick);
          g.completeScene(next.id);
          thisTurn.push(next.id);
        }
        played.push(thisTurn);
        expect(g.canEndTurn()).toBe(true);
        const res = g.endTurn();
        expect(res.edition.papers.length).toBeGreaterThan(0);
      }
      expect(played[0]!.slice(0, 3)).toEqual(['p1-inauguration', 'p1-blue-room', 'p1-first-night']);
      expect(played[2]![played[2]!.length - 1]).toBe('p1-great-project');
      expect(g.state.ended).toBe(true);
      for (const r of Object.values(g.state.regions)) {
        expect(Number.isFinite(r.approval)).toBe(true);
        expect(r.approval).toBeGreaterThanOrEqual(0);
      }
      expect(g.state.resources.PT).toBeGreaterThanOrEqual(2);
    });
  }

  it('random playthroughs visit every beat of every scene, without runner warnings', () => {
    const seen = new Set<string>();
    const warns = new Set<string>();
    for (let seed = 0; seed < 150; seed++) {
      const g = Game.newGame(c);
      let k = seed;
      while (!g.state.ended) {
        for (let i = 0; i < 40; i++) {
          const sc = g.availableScenes().find((x) => !g.isLocked(x));
          if (!sc) break;
          const r = g.startScene(sc.id);
          for (;;) {
            const o = r.next();
            if (r.currentBeat) seen.add(`${sc.id}#${r.currentBeat}`);
            if (o.type === 'end') break;
            if (o.type === 'choices') {
              const ok = o.options.filter((x) => !x.locked && x.affordable);
              k = (k * 1103515245 + 12345) % 2147483648;
              r.choose(ok[k % ok.length]!.index);
            }
          }
          r.warnings.forEach((w) => warns.add(w));
          g.completeScene(sc.id);
        }
        g.endTurn();
      }
    }
    const unvisited = c.scenes.flatMap((s) => s.beats.filter((b) => !seen.has(`${s.id}#${b.id}`)).map((b) => `${s.id}#${b.id}`));
    expect(unvisited).toEqual([]);
    expect([...warns]).toEqual([]);
  });
});
