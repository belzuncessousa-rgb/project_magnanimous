// Source of truth for map geometry. Coordinates are in "sketch space"
// (traced from reference/map-sketch.jpg). The game view uses VIEWBOX below.
// Run: node tools/map-geometry.mjs  -> writes public/map/regions.json + reference/map-layout.svg
import { writeFileSync } from 'node:fs';

export const VIEWBOX = { x: -405, y: 160, w: 1536, h: 864 };

const P = {
  // Tekoku
  T0: [402, 442], T2: [425, 420], T3: [452, 392], T4: [497, 393], T5: [502, 425],
  T6: [490, 472], T7: [472, 520], T8: [432, 506], T9: [405, 494], T1: [383, 472],
  // Ibicui
  I1: [462, 562], I2: [447, 603], I3: [372, 605], I4: [300, 578], I5: [294, 548],
  I6: [283, 520], I7: [318, 492], I8: [350, 477],
  // Mognagna
  M1: [367, 662], M2: [370, 726], M3: [330, 742], M4: [300, 706], M5: [255, 668],
  M6: [210, 642], M7: [242, 606],
  // Tapira
  P1: [472, 665], P2: [443, 735], P3: [405, 740],
  // Ibira
  R1: [522, 790], R2: [592, 852], R3: [600, 892], R4: [585, 935], R5: [512, 950],
  R6: [452, 966], R7: [400, 1015], R8: [330, 986], R9: [285, 960], R10: [255, 905],
  R11: [225, 877], R12: [198, 886], R13: [194, 936], R14: [175, 936], R15: [178, 868],
  R16: [122, 842], R17: [92, 822], R18: [150, 792], R19: [230, 772], R20: [285, 742],
  // Veldmoor peninsula (C)
  C1: [540, 350], C2: [585, 305], C3: [592, 250], C4: [612, 178], C5: [592, 168],
  C6: [556, 240], C7: [515, 292], C8: [472, 372],
  // Tarev (B right)
  B1: [572, 430], B2: [580, 560], E0: [565, 642], D1: [540, 668],
  // Arenza (E)
  E1: [632, 620], E2: [662, 700], E3: [690, 840],
  // Selvara (F)
  F2: [650, 860], F3: [688, 905], F4: [672, 1000], F5: [560, 1012], F6: [528, 1000],
  F7: [508, 1230],
  // Torreval (H)
  G1: [190, 1022], H1: [320, 1230], H2: [245, 1110],
  // Cabral (G)
  G2: [110, 1012], G3: [70, 962], G4: [85, 880],
  // Mondrath (B left)
  L1: [240, 522], L2: [150, 540], L3: [78, 546], L4: [80, 512], L5: [130, 452],
  L6: [172, 425], L7: [280, 405], L8: [355, 418],
  // Vassel (A)
  V1: [60, 800], V2: [25, 740], V3: [22, 690], V4: [30, 620], V5: [42, 580],
  V6: [70, 592], V7: [78, 655], V8: [140, 648],
};

export const REGIONS = [
  { id: 'tekoku', name: 'Tekoku', kind: 'region', pts: 'T0 T2 T3 T4 T5 T6 T7 T8 T9 T1' },
  { id: 'ibicui', name: 'Ibicuí', kind: 'region', pts: 'T1 T9 T8 T7 I1 I2 I3 I4 I5 I6 I7 I8' },
  { id: 'mognagna', name: 'Mognagna', kind: 'region', pts: 'I4 I3 M1 M2 M3 M4 M5 M6 M7' },
  { id: 'tapira', name: 'Tapira', kind: 'region', pts: 'I3 I2 P1 P2 P3 M2 M1' },
  { id: 'ibira', name: 'Ibira', kind: 'region', pts: 'M4 M3 M2 P3 P2 R1 R2 R3 R4 R5 R6 R7 R8 R9 R10 R11 R12 R13 R14 R15 R16 R17 R18 R19 R20' },
  { id: 'veldmoor', name: 'Veldmoor', kind: 'country', pts: 'T3 C8 C7 C6 C5 C4 C3 C2 C1 T4' },
  { id: 'tarev', name: 'Tarev', kind: 'country', pts: 'T4 C1 C2 B1 B2 E0 D1 P1 I2 I1 T7 T6 T5' },
  { id: 'orvane', name: 'Orvane', kind: 'country', pts: 'P1 D1 R1 P2' },
  { id: 'arenza', name: 'Arenza', kind: 'country', pts: 'D1 E0 E1 E2 E3 F2 R2 R1' },
  { id: 'selvara', name: 'Selvara', kind: 'country', pts: 'R2 F2 F3 F4 F5 F6 R4 R3' },
  { id: 'torreval', name: 'Torreval', kind: 'country', pts: 'G1 R10 R9 R8 R7 R6 R5 R4 F6 F7 H1 H2' },
  { id: 'cabral', name: 'Cabral', kind: 'country', pts: 'R17 R16 R15 R14 R13 R12 R11 R10 G1 G2 G3 G4' },
  { id: 'mondrath', name: 'Mondrath', kind: 'country', pts: 'T0 T1 I8 I7 I6 L1 L2 L3 L4 L5 L6 L7 L8' },
  { id: 'vassel', name: 'Vassel', kind: 'country', pts: 'M6 M5 M4 R20 R19 R18 R17 V1 V2 V3 V4 V5 V6 V7 V8' },
];

export const POINTS = {
  capital: { name: 'New Veldrania', at: [372, 618] },
  strait: { name: 'Mondrath Strait', at: [58, 563] },
};

// ---- Organic borders: every edge (pair of control points) gets a deterministic fractal polyline,
// so two neighbours always share the exact same wiggly border. Coast edges are rougher.
const edgeCount = new Map();
const ekey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);
for (const r of REGIONS) {
  const ks = r.pts.split(' ');
  ks.forEach((k, i) => { const key = ekey(k, ks[(i + 1) % ks.length]); edgeCount.set(key, (edgeCount.get(key) || 0) + 1); });
}
function rng(seedStr) {
  let h = 2166136261; for (const c of seedStr) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function fractal(a, b, rough, rand, depth) {
  if (depth === 0) return [a, b];
  const [x1, y1] = a, [x2, y2] = b; const dx = x2 - x1, dy = y2 - y1; const len = Math.hypot(dx, dy);
  if (len < 6) return [a, b];
  const off = (rand() - 0.5) * 2 * rough * len;
  const m = [(x1 + x2) / 2 - (dy / len) * off, (y1 + y2) / 2 + (dx / len) * off];
  const L = fractal(a, m, rough * 0.92, rand, depth - 1), R = fractal(m, b, rough * 0.92, rand, depth - 1);
  return L.concat(R.slice(1));
}
function smooth(pts) { // one Chaikin pass, endpoints fixed
  const out = [pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
    out.push([ax * 0.75 + bx * 0.25, ay * 0.75 + by * 0.25], [ax * 0.25 + bx * 0.75, ay * 0.25 + by * 0.75]);
  }
  out.push(pts[pts.length - 1]); return out;
}
const edgeCache = new Map();
function edgePath(a, b) {
  const key = ekey(a, b); const forward = a < b;
  if (!edgeCache.has(key)) {
    const [p, q] = forward ? [P[a], P[b]] : [P[b], P[a]];
    const coast = edgeCount.get(key) === 1;
    const line = smooth(fractal(p, q, coast ? 0.16 : 0.11, rng(key), 5)).map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
    edgeCache.set(key, { line, coast });
  }
  const { line } = edgeCache.get(key);
  return forward ? line : [...line].reverse();
}
const regions = REGIONS.map(r => {
  const ks = r.pts.split(' ');
  for (const k of ks) if (!P[k]) throw new Error(k);
  const polygon = [];
  ks.forEach((k, i) => { const seg = edgePath(k, ks[(i + 1) % ks.length]); polygon.push(...seg.slice(0, -1)); });
  return { id: r.id, name: r.name, kind: r.kind, control: ks.map(k => P[k]), polygon };
});
// Borders as separate lines (for rendering): internal Kunasai borders, international borders, coastlines.
const kunasai = new Set(REGIONS.filter(r => r.kind === 'region').map(r => r.id));
const owners = new Map();
for (const r of REGIONS) { const ks = r.pts.split(' '); ks.forEach((k, i) => { const key = ekey(k, ks[(i + 1) % ks.length]); (owners.get(key) || owners.set(key, []).get(key)).push(r.id); }); }
export const BORDERS = [...owners.entries()].map(([key, ids]) => {
  const [a, b] = key.split('|');
  const type = ids.length === 1 ? 'coast' : (ids.every(id => kunasai.has(id)) ? 'internal' : 'international');
  return { type, between: ids, line: edgePath(a, b) };
});

const centroid = poly => { let x = 0, y = 0; for (const [a, b] of poly) { x += a; y += b; } return [Math.round(x / poly.length), Math.round(y / poly.length)]; };
for (const r of regions) r.center = centroid(r.polygon);

for (const r of regions) delete r.control;
writeFileSync(new URL('../public/map/regions.json', import.meta.url), JSON.stringify({ viewBox: VIEWBOX, regions, borders: BORDERS, points: POINTS }));

// Flat layout reference for the painter (no labels, distinct colours).
const fill = { region: ['#d9b26f', '#c98f5a', '#e0c78a', '#b9a06a', '#7f9f5a'], country: '#bdb6a3' };
let i = 0;
const path = r => 'M' + r.polygon.map(p => p.join(',')).join(' L') + ' Z';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}" width="1920" height="1080">
<rect x="${VIEWBOX.x}" y="${VIEWBOX.y}" width="${VIEWBOX.w}" height="${VIEWBOX.h}" fill="#5f8fa8"/>
${regions.map(r => `<path d="${path(r)}" fill="${r.kind === 'region' ? fill.region[i++] : fill.country}" stroke="#2b2118" stroke-width="${r.kind === 'region' ? 3 : 2}" stroke-linejoin="round"/>`).join('\n')}
</svg>`;
writeFileSync(new URL('../reference/map-layout.svg', import.meta.url), svg);
console.log('ok', regions.length);
