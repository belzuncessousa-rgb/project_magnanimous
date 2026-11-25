/// <reference types="node" />
// Integration test against the content corpus (snapshot of origin/main content in tests/fixtures/main).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildContent, type RawFile } from '../src/content/schema';
import { validateContent } from '../src/content/validate';
import { createState } from '../src/core/world';
import { Game } from '../src/game/game';
import type { SceneRunner } from '../src/scene/runner';
import { applyBudget, resolveVote, whipOptions, type BudgetChoice } from '../src/game/politics';
import { TIERS } from '../src/content/schema';
import { applyDebtPolicy, debtLimits } from '../src/game/debt';

/** What the UI does for `[open: budget]` / `[vote: id]`, with random picks. */
function resolveUi(g: Game, action: string, arg: string, rnd: (n: number) => number) {
  const c = g.content;
  if (action === 'open' && arg === 'budget') {
    const choices: Record<string, BudgetChoice> = {};
    for (const m of c.ministries) {
      const tiers = TIERS.filter((t) => m.tiers[t]);
      const tier = tiers[rnd(tiers.length)]!;
      choices[m.id] = { tier, initiative: tier === 'low' ? m.initiatives[rnd(Math.max(1, m.initiatives.length))]?.id : undefined };
    }
    applyBudget(g.state, c.ministries, choices);
  } else if (action === 'open' && arg === 'debt') {
    const pol = (Number(g.state.flags.debt_policy) || 1 + rnd(3)) as 1 | 2 | 3;
    const lim = debtLimits(g.state);
    applyDebtPolicy(g.state, pol, pol === 1 ? rnd(Math.floor(lim.payDownMax) + 1) : pol === 2 ? rnd(Math.floor(lim.borrowMax) + 1) : 0);
  } else if (action === 'vote') {
    const bill = c.bills.find((b) => b.id === arg);
    if (!bill) throw new Error(`unknown bill ${arg}`);
    const deals: Record<string, string> = {};
    for (const a of Object.values(g.state.actors)) {
      if (a.kind !== 'party' || !a.seats || rnd(3) !== 0) continue;
      const opts = whipOptions(bill, a.id);
      deals[a.id] = opts[rnd(opts.length)]!.id;
    }
    if (!resolveVote(g.state, bill, deals)) resolveVote(g.state, bill, {});
  } else throw new Error(`unknown ui ${action}:${arg}`);
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function corpus(root = 'tests/fixtures/main'): RawFile[] {
  return walk(join(root, 'content')).map((p) => {
    const rel = '/' + p.slice(root.length + 1).replace(/\\/g, '/');
    const txt = readFileSync(p, 'utf8');
    return { path: rel, data: p.endsWith('.json') ? JSON.parse(txt) : txt };
  });
}

function autoplay(r: SceneRunner, pickIdx: (n: number) => number, g?: Game) {
  for (let i = 0; i < 2000; i++) {
    const out = r.next();
    if (out.type === 'end') return out;
    if (out.type === 'ui' && g) resolveUi(g, out.action, out.arg, pickIdx);
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

describe('content corpus (main)', () => {
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
          autoplay(g.startScene(next.id), pick, g);
          g.completeScene(next.id);
          thisTurn.push(next.id);
        }
        played.push(thisTurn);
        expect(g.canEndTurn()).toBe(true);
        const res = g.endTurn();
        expect(res.edition.papers.length).toBeGreaterThan(0);
      }
      expect(played).toHaveLength(9);
      expect(played[0]![0]).toBe('p1-inauguration');
      expect(played[2]!.at(-1)).toBe('p1-great-project');
      expect(played[5]!.at(-1)).toBe('p2-reform-vote');
      expect(played[8]!.at(-1)).toBe('p3-year-end');
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
    for (let seed = 0; seed < 400; seed++) {
      const g = Game.newGame(c);
      let k = seed;
      const rnd = (n: number) => ((k = (k * 1103515245 + 12345) % 2147483648), (k >>> 12) % n);
      while (!g.state.ended) {
        for (let i = 0; i < 40; i++) {
          const sc = g.availableScenes().find((x) => !g.isLocked(x));
          if (!sc) break;
          const r = g.startScene(sc.id);
          for (;;) {
            const o = r.next();
            if (r.currentBeat) seen.add(`${sc.id}#${r.currentBeat}`);
            if (o.type === 'end') break;
            if (o.type === 'ui') resolveUi(g, o.action, o.arg, rnd);
            if (o.type === 'choices') {
              const ok = o.options.filter((x) => !x.locked && x.affordable);
              r.choose(ok[rnd(ok.length)]!.index);
            }
          }
          r.warnings.forEach((w) => warns.add(w));
          g.completeScene(sc.id);
        }
        g.endTurn();
      }
    }
    // unreachable by design: a great project is always chosen at the end of chapter 1
    // content balance: with base positions the strike package always has ≥ 51 yes votes, so it cannot fail (reported to the writer)
    const byDesign = new Set(['p2-contractor#none', 'p3-project-incident#none', 'p3-crisis-strikes#unresolved']);
    const unvisited = c.scenes.flatMap((s) => s.beats.filter((b) => !seen.has(`${s.id}#${b.id}`)).map((b) => `${s.id}#${b.id}`)).filter((x) => !byDesign.has(x));
    if (unvisited.length) console.log('UNVISITED', JSON.stringify(unvisited));
    expect(unvisited).toEqual([]);
    expect([...warns]).toEqual([]);
  });
});

describe('debt screen in the content', () => {
  const c = buildContent(corpus());
  it('p2-budget opens the debt screen from the pay-down and borrow choices, with the policy already set', () => {
    const sc = c.scenes.find((x) => x.id === 'p2-budget')!;
    const beat = sc.beats.find((b) => b.id === 'debt')!;
    const choices = beat.steps.flatMap((st) => (st.type === 'choices' ? st.choices : []));
    const ui = choices.map((ch) => ch.effects.filter((e) => e.effect.type === 'ui').map((e) => (e.effect as { arg: string }).arg));
    expect(ui).toEqual([['debt'], ['debt'], []]);
    const fcTokens = choices.flatMap((ch) => ch.effects.filter((e) => e.effect.type === 'resource'));
    expect(fcTokens).toEqual([]);
  });
});
