// Rest-state map: data-aligned atlas layers, hotspots, labels, markers and pan/zoom.
import { clear, h, s } from './dom';
import { KIND_GLYPH } from './format';
import { fanOut, stackPins, type Rect } from './layout';

export type Pt = [number, number];

export interface GeoShape {
  id: string;
  name: string;
  kind: 'region' | 'country';
  polygon: Pt[];
  center: Pt;
}

export interface BorderLine {
  type: 'coast' | 'internal' | 'international';
  between: string[];
  line: Pt[];
}

export interface Geometry {
  viewBox: { x: number; y: number; w: number; h: number };
  regions: GeoShape[];
  borders?: BorderLine[];
  points: Record<string, { name: string; at: Pt }>;
}

/** Countries that are not drawn on the map get an edge chip (DECISIONS: Federation south, Zharan east). */
export const OFFMAP: Record<string, { at: Pt; name: string; note: string }> = {
  federation: { at: [505, 1325], name: 'Arennian Federation', note: 'South, beyond the canal' },
  zharan: { at: [900, 540], name: 'Zharan', note: 'Across the eastern ocean' },
};

export type MapScale = 'table' | 'continent' | 'kunasai';
const SCALE_LABEL: Record<MapScale, string> = { table: 'Strategy table', continent: 'Arvain', kunasai: 'Kunasai detail' };

/** Muted atlas fills for the regional political map. Kunasai receives one national colour. */
export const POLITICAL_COLORS: Record<string, string> = {
  tekoku: '#9a744d',
  ibicui: '#9a744d',
  mognagna: '#9a744d',
  tapira: '#9a744d',
  ibira: '#9a744d',
  veldmoor: '#6f80a8',
  tarev: '#9c6e8e',
  orvane: '#7c9c90',
  arenza: '#5d8ea2',
  selvara: '#93a66a',
  torreval: '#a58c68',
  cabral: '#a7705f',
  mondrath: '#7b6ba2',
  vassel: '#6ba3a3',
};

const linePath = (pts: Pt[]) => 'M' + pts.map(([x, y]) => `${x},${y}`).join('L');
const MAP_FRAMES = {
  political: { x: -55, y: 135, w: 1150, h: 1280 },
  terrain: { x: 45, y: 350, w: 610, h: 700 },
} as const;
const TABLE_ZOOM = 0.72;
const KUNASAI_ZOOM = 1.48;
const MIN_ZOOM = 0.56;

export interface MarkerSpec {
  id: string;
  title: string;
  kind: string;
  /** token image id in public/map/tokens/ */
  token?: string;
  at: Pt;
  required: boolean;
  locked: boolean;
}

export interface MapToast {
  id: string;
  title?: string;
  kind: string;
  read: boolean;
  at: Pt;
}

const READABLE_ICON: Record<string, string> = { reaction: '❝', note: '✎', report: '▤', incident: '!', popup: '◉' };

export interface MapCallbacks {
  onSelect(id: string, clientX: number, clientY: number): void;
  onMarker(sceneId: string): void;
  onTarget(id: string): void;
  onBackground(): void;
  onReadable(id: string, clientX: number, clientY: number): void;
  onTablet(): void;
  onScaleChange(scale: MapScale): void;
}

function tokenImage(id: string): SVGImageElement {
  const img = s('image', { class: 'token', href: `map/tokens/${id}.png`, x: -32, y: -32, width: 64, height: 64 });
  // CSS fallback (ring + glyph) stays visible when the token art is missing
  img.addEventListener('error', () => img.remove());
  return img;
}

const pathOf = (poly: Pt[]) => 'M' + poly.map(([x, y]) => `${x},${y}`).join('L') + 'Z';

export class MapView {
  readonly el: HTMLElement;
  private svg: SVGSVGElement;
  /** markers live in a second SVG stacked above the HTML pop-up pins */
  private markerSvg: SVGSVGElement;
  private vb: { x: number; y: number; w: number; h: number };
  private base: { x: number; y: number; w: number; h: number };
  private markerLayer: SVGGElement;
  private hotLayer: SVGGElement;
  private toastLayer: HTMLElement;
  private tooltip: HTMLElement;
  private toasts: MapToast[] = [];
  private markerPos: Pt[] = [];
  private dismissed = new Set<string>();
  private dragged = false;
  private targeting: Set<string> | null = null;
  private view: 'terrain' | 'political' = 'terrain';
  private scale: MapScale = 'continent';
  private tablet: HTMLButtonElement;

  constructor(
    readonly geo: Geometry,
    private cb: MapCallbacks,
  ) {
    this.base = { ...MAP_FRAMES.political };
    this.vb = { ...this.base };
    this.el = h('div', { class: 'map', 'data-ui': 'map' });
    this.svg = s('svg', { class: 'map-svg', preserveAspectRatio: 'xMidYMid meet', role: 'group', 'aria-label': 'Map of Kunasai' });
    this.markerLayer = s('g', { class: 'markers' });
    this.markerSvg = s('svg', { class: 'map-svg marker-svg', preserveAspectRatio: 'xMidYMid meet', role: 'group', 'aria-label': 'Available scenes', 'data-ui': 'markers' }, this.markerLayer);
    this.hotLayer = s('g', { class: 'hotspots' });
    this.toastLayer = h('div', { class: 'map-toasts', 'data-ui': 'readables' });
    this.tooltip = h('div', { class: 'map-tooltip', hidden: true });
    this.tablet = h('button', {
      class: 'map-tablet',
      type: 'button',
      'aria-label': 'Pick up the presidential tablet',
      onclick: () => this.cb.onTablet(),
    },
      h('span', { class: 'map-tablet-screen' },
        h('span', { class: 'tablet-status', 'aria-hidden': 'true' }, h('b', {}, '09:41'), h('span', {}, '◉  Wi-Fi  ▰')),
        h('img', { src: 'identity/kunasai-flag.svg', alt: '', draggable: 'false' }),
        h('span', { class: 'map-tablet-apps', 'aria-hidden': 'true' },
          h('i', { class: 'mini-news' }, h('b', {}, '▤'), h('small', {}, 'News')),
          h('i', { class: 'mini-social' }, h('b', {}, '◉'), h('small', {}, 'Social')),
          h('i', { class: 'mini-codex' }, h('b', {}, '◫'), h('small', {}, 'Codex')),
          h('i', { class: 'mini-reports' }, h('b', {}, '▥'), h('small', {}, 'Reports')))),
      h('span', { class: 'map-tablet-caption' }, 'PRESIDENTIAL TABLET'));
    this.build();
    this.el.append(this.svg, this.toastLayer, this.markerSvg, this.tooltip, this.tablet);
    this.applyViewBox();
    this.bindPanZoom();
    window.addEventListener('resize', () => this.layoutToasts());
  }

  private build() {
    const { x, y, w, hgt } = { ...this.base, hgt: this.base.h };
    const shapes = this.geo.regions;
    const defs = s(
      'defs',
      {},
      s('radialGradient', { id: 'sea-grad', cx: '45%', cy: '50%', r: '75%' },
        s('stop', { offset: '0%', 'stop-color': 'var(--sea-light)' }),
        s('stop', { offset: '100%', 'stop-color': 'var(--sea-deep)' })),
      s('pattern', { id: 'sea-lines', width: 180, height: 120, patternUnits: 'userSpaceOnUse' },
        s('path', { d: 'M-12 28 C18 18 44 18 72 28 S126 38 154 28 S202 18 224 28 M-40 80 C-10 70 16 70 44 80 S98 90 126 80 S180 70 208 80', fill: 'none', stroke: '#9bb4ac', 'stroke-width': 1 })),
      s('pattern', { id: 'terrain-contours', width: 92, height: 82, patternUnits: 'userSpaceOnUse' },
        s('path', { d: 'M-20 38 C2 18 28 17 48 31 S83 48 110 24 M-23 54 C4 34 29 33 49 47 S82 64 112 40 M-22 70 C3 51 29 50 49 64 S82 81 111 57', fill: 'none', stroke: '#f1e5c8', 'stroke-width': 1.25, opacity: 0.6 })),
      s('filter', { id: 'organic', x: '-3%', y: '-3%', width: '106%', height: '106%' },
        s('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.012', numOctaves: '2', seed: '7', result: 'n' }),
        s('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: '2.2', xChannelSelector: 'R', yChannelSelector: 'G' })),
      s('filter', { id: 'paper-noise', x: '0', y: '0', width: '100%', height: '100%' },
        s('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.9', numOctaves: '2', seed: '3', result: 'n' }),
        s('feColorMatrix', { in: 'n', type: 'matrix', values: '0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.22 0' }),
        s('feComposite', { in2: 'SourceGraphic', operator: 'in' })),
      s('filter', { id: 'relief', x: '0', y: '0', width: '100%', height: '100%' },
        s('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.012', numOctaves: '4', seed: '11', result: 'n' }),
        s('feDiffuseLighting', { in: 'n', 'lighting-color': '#f4ead2', surfaceScale: '3', result: 'l' }, s('feDistantLight', { azimuth: '235', elevation: '55' })),
        s('feComposite', { in: 'l', in2: 'SourceGraphic', operator: 'in' })),
      s('filter', { id: 'label-shadow' }, s('feDropShadow', { dx: '0', dy: '0', stdDeviation: '1.2', 'flood-color': '#f3ead6', 'flood-opacity': '0.9' })),
      ...shapes.map((g) => s('clipPath', { id: `land-clip-${g.id}` }, s('path', { d: pathOf(g.polygon) }))),
      s('clipPath', { id: 'kunasai-art-clip', clipPathUnits: 'userSpaceOnUse' },
        ...shapes.filter((g) => g.kind === 'region').map((g) => s('path', { d: pathOf(g.polygon) }))),
    );
    const sea = s('g', { class: 'sea' },
      s('rect', { x, y, width: w, height: hgt, fill: 'url(#sea-grad)' }),
      s('rect', { x, y, width: w, height: hgt, filter: 'url(#paper-noise)', fill: '#000', opacity: '0.45' }),
      s('rect', { x, y, width: w, height: hgt, fill: 'url(#sea-lines)', opacity: '0.24' }),
      s('rect', { class: 'sea-frame', x: x + 3, y: y + 3, width: w - 6, height: hgt - 6, rx: 5 }));
    // The approved Arvain painting is the continuous map surface at every map scale.
    // Keep game hit areas and political borders above this art as separate layers.
    const atlasArt = s('image', {
      class: 'atlas-art', href: 'map/arvain-terrain-art.png',
      x: this.geo.viewBox.x, y: this.geo.viewBox.y,
      width: this.geo.viewBox.w, height: this.geo.viewBox.h,
      preserveAspectRatio: 'none', 'aria-hidden': 'true',
    });
    const kunasaiRegions = shapes.filter((g) => g.kind === 'region');
    const outerKunasaiBorders = (this.geo.borders ?? []).filter((b) =>
      b.between.some((id) => kunasaiRegions.some((r) => r.id === id)) && (b.type === 'coast' || b.type === 'international'));
    const landFill = (g: GeoShape) => {
      const palette: Record<string, string> = {
        tekoku: '#c9b48a', ibicui: '#d7bd8c', mognagna: '#c9a66d', tapira: '#a9956a', ibira: '#638565',
      };
      return g.kind === 'region' ? palette[g.id] ?? '#b3aa8e' : '#9daa91';
    };
    const kunasaiPoints = kunasaiRegions.flatMap((g) => g.polygon);
    const kunasaiBounds = {
      x: Math.min(...kunasaiPoints.map(([px]) => px)),
      y: Math.min(...kunasaiPoints.map(([, py]) => py)),
      w: Math.max(...kunasaiPoints.map(([px]) => px)) - Math.min(...kunasaiPoints.map(([px]) => px)),
      h: Math.max(...kunasaiPoints.map(([, py]) => py)) - Math.min(...kunasaiPoints.map(([, py]) => py)),
    };
    const kunasaiArt = s('g', { class: 'kunasai-terrain-art', 'clip-path': 'url(#kunasai-art-clip)', 'aria-hidden': 'true' },
      s('svg', {
        x: kunasaiBounds.x, y: kunasaiBounds.y, width: kunasaiBounds.w, height: kunasaiBounds.h,
        viewBox: '360 0 960 952', preserveAspectRatio: 'none', overflow: 'hidden',
      }, s('image', { href: 'map/kunasai-terrain-art.png', x: 0, y: 0, width: 1672, height: 952 })));
    const terrain = s('g', { class: 'layer-terrain' },
      s('g', { class: 'land', filter: 'url(#organic)' }, ...shapes.map((g) => s('path', { d: pathOf(g.polygon), fill: landFill(g), class: `land-shape land-${g.kind} land-${g.id}` }))),
      s('g', { class: 'terrain-texture' }, ...shapes.map((g) => s('path', { d: pathOf(g.polygon), fill: 'url(#terrain-contours)', 'clip-path': `url(#land-clip-${g.id})`, class: 'contour-wash' }))),
      s('g', { class: 'relief' }, ...shapes.map((g) => s('path', { d: pathOf(g.polygon), filter: 'url(#relief)', class: `relief-${g.kind}` }))),
      kunasaiArt,
    );
    const political = s('g', { class: 'layer-political' },
      ...shapes.map((g) => s('path', { d: pathOf(g.polygon), fill: POLITICAL_COLORS[g.id] ?? '#999', class: `pol-${g.kind} pol-${g.id}` })));
    const borderLines = this.geo.borders ?? [];
    const terrainBorders = s('g', { class: 'terrain-borders' },
      ...borderLines.filter((b) => b.type !== 'coast').map((b) => s('path', { d: linePath(b.line), class: `border-line border-${b.type}` })));
    const coastBorders = s('g', { class: 'coast-borders' },
      ...borderLines.filter((b) => b.type === 'coast').map((b) => s('path', { d: linePath(b.line) })));
    const international = borderLines.filter((b) => b.type === 'international');
    const politicalBorderUnderlay = s('g', { class: 'political-border-underlay' },
      ...international.map((b) => s('path', { d: linePath(b.line) })));
    const politicalBorders = s('g', { class: 'political-borders' },
      ...international.map((b) => s('path', { d: linePath(b.line), class: 'international-border' })));
    const nationalOutline = s('g', { class: 'national-outline' },
      ...outerKunasaiBorders.map((b) => s('path', { d: linePath(b.line) })));

    for (const g of shapes) {
      const p = s('path', {
        d: pathOf(g.polygon), class: `hot hot-${g.kind}`, 'data-id': g.id,
        tabindex: 0, role: 'button', 'aria-label': g.name,
      });
      p.addEventListener('click', (ev) => this.clickShape(g.id, ev as MouseEvent));
      p.addEventListener('keydown', (ev) => this.keySelectShape(g.id, ev as KeyboardEvent, p));
      p.addEventListener('mousemove', (ev) => this.showTip(g.kind === 'region' && this.view === 'political' ? 'Kunasai — open regional map' : g.name, ev as MouseEvent));
      p.addEventListener('mouseleave', () => this.hideTip());
      this.hotLayer.append(p);
    }
    const kunasaiHot = s('g', { class: 'hot-kunasai', 'data-id': 'kunasai', tabindex: 0, role: 'button', 'aria-label': 'Inspect Kunasai' },
      ...kunasaiRegions.map((g) => s('path', { d: pathOf(g.polygon), class: 'hot-kunasai-piece' })));
    kunasaiHot.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (!this.targeting) this.selectShape('kunasai', (ev as MouseEvent).clientX, (ev as MouseEvent).clientY);
    });
    kunasaiHot.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        ev.stopPropagation();
        if (!this.targeting) {
          const bounds = kunasaiHot.getBoundingClientRect();
          this.selectShape('kunasai', bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        }
      }
    });
    kunasaiHot.addEventListener('mousemove', (ev) => this.showTip('Kunasai — zoom in for regional detail', ev as MouseEvent));
    kunasaiHot.addEventListener('mouseleave', () => this.hideTip());
    this.hotLayer.append(kunasaiHot);
    const offmap = s('g', { class: 'offmap' });
    for (const [id, o] of Object.entries(OFFMAP)) {
      const initials = id === 'federation' ? 'AF' : 'ZH';
      const g = s('g', { class: 'offmap-token hot-offmap', 'data-id': id, transform: `translate(${o.at[0]},${o.at[1]})` },
        s('g', { class: 'offmap-token-body' },
          s('circle', { class: 'offmap-token-shadow', cy: 3, r: 31 }),
          s('circle', { class: 'offmap-token-rim', r: 29 }),
          s('circle', { class: 'offmap-token-face', r: 23 }),
          s('circle', { class: 'offmap-token-inlay', r: 18 }),
          s('text', { class: 'offmap-token-mark', y: 5 }, initials),
          s('text', { class: 'offmap-token-name', y: 44 }, o.name),
          s('text', { class: 'offmap-token-note', y: 57 }, o.note)));
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', `Inspect ${o.name}. ${o.note}`);
      g.addEventListener('click', (ev) => this.clickShape(id, ev as MouseEvent));
      g.addEventListener('keydown', (ev) => this.keySelectShape(id, ev as KeyboardEvent, g));
      offmap.append(g);
    }
    const labels = s('g', { class: 'labels' });
    for (const g of shapes) {
      if (g.kind === 'country') labels.append(s('text', { class: 'label label-country', x: g.center[0], y: g.center[1] + 4 }, g.name));
      else labels.append(s('text', { class: 'label label-region', x: g.center[0], y: g.center[1] + 5 }, g.name.toUpperCase()));
    }
    labels.append(s('text', { class: 'label label-national', x: 355, y: 700 }, 'KUNASAI'));
    labels.append(s('text', { class: 'label label-continent', x: 350, y: 158 }, 'ARVANE'));
    labels.append(s('text', { class: 'label label-canal', x: 350, y: 1247 }, 'CONTINENTAL CANAL'));
    for (const [id, p] of Object.entries(this.geo.points)) {
      if (id === 'capital') {
        labels.append(
          s('g', { class: 'capital', transform: `translate(${p.at[0]},${p.at[1]})` },
            s('path', { d: 'M0,-7 L2,-2 L7,-2 L3,1.5 L4.5,7 L0,3.8 L-4.5,7 L-3,1.5 L-7,-2 L-2,-2Z' }),
            s('text', { class: 'label label-point', x: 10, y: 4 }, p.name)),
        );
      } else {
        labels.append(s('text', { class: 'label label-water', x: p.at[0], y: p.at[1] }, p.name));
      }
    }
    labels.append(s('text', { class: 'label label-water', x: 160, y: 600 }, 'Gulf of Katanaí'));
    this.svg.append(defs, sea, atlasArt, terrain, terrainBorders, political, coastBorders, politicalBorderUnderlay, politicalBorders, nationalOutline, this.hotLayer, offmap, labels);
    this.svg.addEventListener('click', (ev) => {
      if (this.dragged) return;
      const t = ev.target as Element;
      if (!t.closest('.hot, .hot-offmap, .marker')) this.cb.onBackground();
    });
  }

  setView(view: 'terrain' | 'political') {
    this.view = view;
    this.vb = view === 'political' ? { ...this.base } : { ...MAP_FRAMES.terrain };
    this.applyViewBox();
  }

  getScaleLabel(): string {
    return SCALE_LABEL[this.scale];
  }

  locate(id: string | undefined): Pt | undefined {
    if (!id) return this.geo.points.capital?.at;
    const shape = this.geo.regions.find((r) => r.id === id);
    if (shape) return shape.center;
    const p = this.geo.points[id];
    if (p) return p.at;
    const o = OFFMAP[id];
    if (o) return [o.at[0], o.at[1] - 34];
    return undefined;
  }

  setMarkers(markers: MarkerSpec[]) {
    clear(this.markerLayer);
    // fan markers sharing an anchor out, then relax so none overlap
    const placed = fanOut(markers.map((m) => m.at), 60, 34);
    this.markerPos = placed;
    markers.forEach((m, mi) => {
      const [x, y] = placed[mi]!;
      const g = s('g', {
        class: `marker kind-${m.kind}${m.required ? ' required' : ''}${m.locked ? ' locked' : ''}`,
        transform: `translate(${x},${y})`,
        tabindex: 0,
        role: 'button',
        'aria-label': m.title,
        'aria-disabled': String(m.locked),
        'data-scene': m.id,
      },
        s('g', { class: 'marker-body' },
          s('circle', { class: 'pulse', r: 27 }),
          s('circle', { class: 'ring', r: 26 }),
          s('text', { class: 'glyph', y: 7 }, KIND_GLYPH[m.kind] ?? '•'),
          m.token ? tokenImage(m.token) : null),
      );
      const open = () => { if (!m.locked && !this.dragged && !this.targeting) this.cb.onMarker(m.id); };
      g.addEventListener('click', (ev) => { ev.stopPropagation(); open(); });
      g.addEventListener('keydown', (ev) => {
        const key = (ev as KeyboardEvent).key;
        if (key === 'Enter' || key === ' ') { ev.preventDefault(); open(); }
      });
      g.addEventListener('mousemove', (ev) => this.showTip(m.locked ? `${m.title} — later` : m.title, ev as MouseEvent));
      g.addEventListener('mouseleave', () => this.hideTip());
      this.markerLayer.append(g);
    });
    this.layoutToasts();
  }

  setToasts(list: MapToast[]) {
    this.toasts = list.filter((t) => !this.dismissed.has(t.id));
    this.renderToasts();
  }

  private renderToasts() {
    clear(this.toastLayer);
    // many items at once: icon-only pins, titles on hover (the agenda lists them too)
    this.toastLayer.classList.toggle('compact', this.toasts.length > 6);
    for (const t of this.toasts) {
      // a small titled pin; click opens the paper card (App)
      const el = h('button', { class: `map-toast kind-${t.kind}${t.read ? ' read' : ''}`, 'data-id': t.id, 'data-tip': `${t.title ?? 'Report'}${t.read ? ' (read)' : ''}`, 'aria-label': t.title ?? 'Report' },
        h('span', { class: 'toast-icon' }, READABLE_ICON[t.kind] ?? '◉'),
        h('span', { class: 'toast-title' }, t.title ?? 'Report'));
      el.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this.cb.onReadable(t.id.replace(/^\d+:/, ''), (ev as MouseEvent).clientX, (ev as MouseEvent).clientY);
      });
      this.toastLayer.append(el);
    }
    this.layoutToasts();
  }

  private layoutToasts() {
    const els = [...this.toastLayer.children] as HTMLElement[];
    if (!els.length) return;
    // markers are obstacles (screen space), pins slide until free
    const obstacles: Rect[] = this.markerPos.map((p) => {
      const c = this.toScreen(p);
      const zoom = this.base.w / this.vb.w;
      const r = 27 * this.screenScale() / zoom;
      return { x: c.x - r, y: c.y - r, w: 2 * r, h: 2 * r };
    });
    const pins = els.map((el, i) => {
      const c = this.toScreen(this.toasts[i]!.at);
      return { at: [c.x, c.y] as Pt, w: el.offsetWidth || 160, h: el.offsetHeight || 24 };
    });
    const pos = stackPins(pins, obstacles);
    els.forEach((el, i) => {
      el.style.left = `${pos[i]![0]}px`;
      el.style.top = `${pos[i]![1]}px`;
    });
  }

  setTargeting(valid: string[] | null) {
    this.targeting = valid ? new Set(valid) : null;
    this.el.classList.toggle('targeting', !!valid);
    for (const el of this.svg.querySelectorAll<SVGElement>('[data-id]')) {
      el.classList.toggle('valid', !!valid && valid.includes(el.dataset.id!));
      el.setAttribute('aria-disabled', String(!!valid && !valid.includes(el.dataset.id!)));
    }
    for (const marker of this.markerSvg.querySelectorAll<SVGElement>('.marker')) {
      marker.setAttribute('aria-disabled', String(!!valid || marker.classList.contains('locked')));
    }
  }

  setSelected(id: string | null) {
    for (const el of this.svg.querySelectorAll<SVGElement>('.hot, .hot-kunasai, .offmap-token')) el.classList.toggle('selected', el.dataset.id === id);
  }

  private clickShape(id: string, ev: MouseEvent) {
    ev.stopPropagation();
    if (this.dragged) return;
    this.selectShape(id, ev.clientX, ev.clientY);
  }

  private keySelectShape(id: string, ev: KeyboardEvent, el: SVGElement) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    ev.preventDefault();
    ev.stopPropagation();
    const bounds = el.getBoundingClientRect();
    this.selectShape(id, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
  }

  private selectShape(id: string, x: number, y: number) {
    if (this.dragged) return;
    if (this.targeting) {
      if (this.targeting.has(id)) this.cb.onTarget(id);
      return;
    }
    this.cb.onSelect(id, x, y);
  }

  private showTip(text: string, ev: MouseEvent) {
    this.tooltip.hidden = false;
    this.tooltip.textContent = text;
    const r = this.el.getBoundingClientRect();
    this.tooltip.style.left = `${ev.clientX - r.left + 14}px`;
    this.tooltip.style.top = `${ev.clientY - r.top + 14}px`;
  }

  private hideTip() {
    this.tooltip.hidden = true;
  }

  /** screen pixels per SVG unit */
  private screenScale(): number {
    return this.svg.getScreenCTM()?.a ?? 1;
  }

  toScreen([x, y]: Pt): { x: number; y: number } {
    const m = this.svg.getScreenCTM();
    const r = this.el.getBoundingClientRect();
    if (!m) return { x: 0, y: 0 };
    const pt = new DOMPoint(x, y).matrixTransform(m);
    return { x: pt.x - r.left, y: pt.y - r.top };
  }

  private toSvg(clientX: number, clientY: number): Pt {
    const m = this.svg.getScreenCTM();
    if (!m) return [0, 0];
    const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
    return [p.x, p.y];
  }

  // ---------------------------------------------------------------- pan & zoom

  private applyViewBox() {
    const b = this.base;
    this.vb.w = Math.min(b.w / MIN_ZOOM, Math.max(b.w / 4, this.vb.w));
    this.vb.h = (this.vb.w * b.h) / b.w;
    if (this.vb.w > b.w) {
      this.vb.x = b.x + (b.w - this.vb.w) / 2;
      this.vb.y = b.y + (b.h - this.vb.h) / 2;
    } else {
      this.vb.x = Math.min(b.x + b.w - this.vb.w, Math.max(b.x, this.vb.x));
      this.vb.y = Math.min(b.y + b.h - this.vb.h, Math.max(b.y, this.vb.y));
    }
    this.svg.setAttribute('viewBox', `${this.vb.x} ${this.vb.y} ${this.vb.w} ${this.vb.h}`);
    this.markerSvg.setAttribute('viewBox', `${this.vb.x} ${this.vb.y} ${this.vb.w} ${this.vb.h}`);
    const zoom = b.w / this.vb.w;
    this.el.style.setProperty('--zoom', String(zoom));
    const nextScale: MapScale = zoom < TABLE_ZOOM ? 'table' : zoom >= KUNASAI_ZOOM ? 'kunasai' : 'continent';
    const nextView = nextScale === 'kunasai' ? 'terrain' : 'political';
    if (nextView !== this.view) this.view = nextView;
    this.el.classList.toggle('view-political', this.view === 'political');
    this.el.classList.toggle('view-terrain', this.view === 'terrain');
    this.el.classList.toggle('table-revealed', nextScale === 'table');
    this.svg.setAttribute('aria-label', this.view === 'political' ? 'Continental map of Arvain' : 'Kunasai regional map');
    if (nextScale !== this.scale) {
      this.scale = nextScale;
      this.cb.onScaleChange(this.scale);
    }
    this.layoutToasts();
  }

  zoomBy(f: number, clientX?: number, clientY?: number) {
    const r = this.svg.getBoundingClientRect();
    const [cx, cy] = this.toSvg(clientX ?? r.left + r.width / 2, clientY ?? r.top + r.height / 2);
    const nw = Math.min(this.base.w / MIN_ZOOM, Math.max(this.base.w / 4, this.vb.w / f));
    const k = nw / this.vb.w;
    this.vb = { x: cx - (cx - this.vb.x) * k, y: cy - (cy - this.vb.y) * k, w: nw, h: this.vb.h * k };
    this.applyViewBox();
  }

  resetZoom() {
    this.vb = { ...this.base };
    this.applyViewBox();
  }

  private bindPanZoom() {
    this.svg.addEventListener('wheel', (ev) => {
      ev.preventDefault();
      this.zoomBy(ev.deltaY < 0 ? 1.15 : 1 / 1.15, ev.clientX, ev.clientY);
    }, { passive: false });
    let start: { x: number; y: number; vx: number; vy: number } | null = null;
    this.svg.addEventListener('pointerdown', (ev) => {
      if (ev.button !== 0) return;
      start = { x: ev.clientX, y: ev.clientY, vx: this.vb.x, vy: this.vb.y };
      this.dragged = false;
    });
    window.addEventListener('pointermove', (ev) => {
      if (!start) return;
      const dx = ev.clientX - start.x;
      const dy = ev.clientY - start.y;
      if (!this.dragged && Math.hypot(dx, dy) < 5) return;
      if (this.vb.w >= this.base.w / TABLE_ZOOM) return; // table framing remains centered
      this.dragged = true;
      this.el.classList.add('panning');
      const m = this.svg.getScreenCTM();
      const scale = m ? m.a : 1;
      this.vb.x = start.vx - dx / scale;
      this.vb.y = start.vy - dy / scale;
      this.applyViewBox();
    });
    window.addEventListener('pointerup', () => {
      start = null;
      this.el.classList.remove('panning');
      // keep `dragged` true until the click event that follows has been seen
      setTimeout(() => (this.dragged = false), 0);
    });
  }
}
