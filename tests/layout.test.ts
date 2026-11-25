import { describe, expect, it } from 'vitest';
import { fanOut, relax, stackPins, type P } from '../src/ui/layout';
import { tokenFor } from '../src/ui/tokens';
import { parseScene } from '../src/scene/parser';

const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function minDist(ps: P[]) {
  let m = Infinity;
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) m = Math.min(m, dist(ps[i]!, ps[j]!));
  return m;
}

describe('marker layout', () => {
  it('fans out markers sharing an anchor and keeps them near it', () => {
    const anchor: P = [372, 608];
    const ps = fanOut([anchor, anchor, anchor, anchor, anchor], 60);
    expect(minDist(ps)).toBeGreaterThanOrEqual(59.9);
    for (const p of ps) expect(dist(p, anchor)).toBeLessThan(160);
  });
  it('separates markers at nearby anchors too', () => {
    const ps = fanOut([[372, 608], [412, 535], [400, 560], [372, 608], [306, 540]], 60);
    expect(minDist(ps)).toBeGreaterThanOrEqual(59.9);
  });
  it('a single marker sits just above its anchor', () => {
    expect(fanOut([[100, 100]], 60, 30)).toEqual([[100, 70]]);
  });
  it('relax is a no-op when points are already apart', () => {
    expect(relax([[0, 0], [100, 0]], 60)).toEqual([[0, 0], [100, 0]]);
  });
});

describe('pin layout', () => {
  it('pins at the same anchor do not overlap each other or markers', () => {
    const pins = [0, 1, 2, 3].map(() => ({ at: [300, 300] as P, w: 160, h: 24 }));
    const obstacles = [{ x: 280, y: 300, w: 40, h: 40 }];
    const pos = stackPins(pins, obstacles);
    const rects = pos.map((p) => ({ x: p[0], y: p[1], w: 160, h: 24 }));
    const overlap = (a: (typeof rects)[0], b: (typeof rects)[0]) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    for (let i = 0; i < rects.length; i++) {
      expect(overlap(rects[i]!, obstacles[0]!)).toBe(false);
      for (let j = i + 1; j < rects.length; j++) expect(overlap(rects[i]!, rects[j]!)).toBe(false);
    }
  });
});

describe('tokens', () => {
  const sc = (fm: string) => parseScene(`---\nid: x\n${fm}\n---\n## a\n\nHi.`);
  it('front-matter token wins, then kind, then keywords, then location', () => {
    expect(tokenFor(sc('token: news\nkind: personal'), new Set())).toBe('news');
    expect(tokenFor(sc('kind: personal'), new Set())).toBe('personal');
    expect(tokenFor(sc('kind: crisis\ntitle: Strikes in Katanaí'), new Set())).toBe('strike');
    expect(tokenFor(parseScene('---\nid: p1-treasury-briefing\n---\n## a\n\nx'), new Set())).toBe('treasury');
    expect(tokenFor(sc('title: Visit\nlocation: arenza'), new Set(['arenza']))).toBe('foreign');
    expect(tokenFor(sc('title: Visit'), new Set())).toBe('palace');
  });
});
