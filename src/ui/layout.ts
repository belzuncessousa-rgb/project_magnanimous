// Marker / pin placement without overlaps. Pure functions (unit-tested).

export type P = [number, number];

/**
 * Fan markers out around their anchors: markers sharing an anchor are spread in a row (two rows when crowded),
 * then all markers are relaxed so no two centres are closer than `gap`.
 */
export function fanOut(anchors: P[], gap: number, lift = gap * 0.6): P[] {
  const groups = new Map<string, number[]>();
  anchors.forEach((a, i) => {
    const k = `${Math.round(a[0])},${Math.round(a[1])}`;
    groups.set(k, [...(groups.get(k) ?? []), i]);
  });
  const pos: P[] = anchors.map((a) => [a[0], a[1] - lift]);
  for (const idx of groups.values()) {
    const perRow = idx.length > 4 ? Math.ceil(idx.length / 2) : idx.length;
    idx.forEach((i, j) => {
      const row = Math.floor(j / perRow);
      const inRow = Math.min(perRow, idx.length - row * perRow);
      const col = j - row * perRow;
      const a = anchors[i]!;
      pos[i] = [a[0] + (col - (inRow - 1) / 2) * gap, a[1] - lift - row * gap * 0.9];
    });
  }
  return relax(pos, gap);
}

/** Push points apart until every pair is at least `gap` apart (bounded iterations, deterministic). */
export function relax(points: P[], gap: number, iterations = 60): P[] {
  const p = points.map((x) => [x[0], x[1]] as P);
  for (let it = 0; it < iterations; it++) {
    let moved = false;
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        let dx = p[j]![0] - p[i]![0];
        let dy = p[j]![1] - p[i]![1];
        let d = Math.hypot(dx, dy);
        if (d >= gap - 1e-6) continue;
        if (d < 1e-6) { dx = 1; dy = 0; d = 1; }
        const push = (gap - d) / 2 + 0.01;
        const ux = dx / d;
        const uy = dy / d;
        p[i]![0] -= ux * push; p[i]![1] -= uy * push;
        p[j]![0] += ux * push; p[j]![1] += uy * push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return p;
}

export interface Rect { x: number; y: number; w: number; h: number }

const hit = (a: Rect, b: Rect, pad: number) =>
  a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad;

/**
 * Place pins (centred horizontally on their anchor, just below it) so they overlap neither each other nor the
 * obstacles (markers). Each pin slides down, then up, in small steps until free. Returns top-left corners.
 */
/**
 * Place pins near their anchors without overlapping each other or the obstacles (markers, map labels).
 * With `bounds`, a pin is only placed fully inside it unless no free slot exists (then the nearest free slot wins).
 */
export function stackPins(pins: { at: P; w: number; h: number }[], obstacles: Rect[], pad = 4, bounds?: Rect): P[] {
  const placed: Rect[] = [...obstacles];
  const out: P[] = [];
  const order = pins.map((_, i) => i).sort((a, b) => pins[a]!.at[1] - pins[b]!.at[1] || pins[a]!.at[0] - pins[b]!.at[0]);
  const res: P[] = new Array(pins.length);
  for (const i of order) {
    const p = pins[i]!;
    const base: Rect = { x: p.at[0] - p.w / 2, y: p.at[1] + 12, w: p.w, h: p.h };
    let found: Rect = base;
    // search outward from the anchor: rings of candidates (closest free slot wins)
    const step = Math.max(p.h, 12) + pad;
    search: for (let ring = 0; ring < 40; ring++) {
      const cands: Rect[] = ring === 0 ? [base] : [];
      if (ring > 0) {
        const n = 8 * ring;
        for (let j = 0; j < n; j++) {
          const a = (j / n) * Math.PI * 2 + Math.PI / 2; // start below the anchor
          cands.push({ ...base, x: base.x + Math.cos(a) * ring * step * (p.w > 3 * p.h ? 1.6 : 1), y: base.y + Math.sin(a) * ring * step });
        }
      }
      for (const cand of cands) {
        if (bounds && !inside(bounds, cand)) continue;
        if (!placed.some((r) => hit(r, cand, pad))) { found = cand; break search; }
      }
    }
    placed.push(found);
    res[i] = [found.x, found.y];
  }
  out.push(...res);
  return out;
}

function inside(b: Rect, r: Rect): boolean {
  return r.x >= b.x && r.y >= b.y && r.x + r.w <= b.x + b.w && r.y + r.h <= b.y + b.h;
}
