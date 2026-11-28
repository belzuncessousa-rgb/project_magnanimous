// Rest-state map: data-aligned atlas layers, hotspots, labels, markers and pan/zoom.
import { clear, h, s } from './dom';
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
  federation: { at: [640, 1175], name: 'Arennian Federation', note: 'South, beyond the canal' },
  zharan: { at: [900, 540], name: 'Zharan', note: 'Across the eastern ocean' },
};

export type MapScale = 'continent' | 'kunasai';

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
const KUNASAI_ZOOM = 1.48;
/** strategy-table-background.png: size and the inner edge of its painted glass display, in image pixels. */
const DESK_ART = { file: 'strategy-table-background.png', w: 1672, h: 941, rail: 86, railX: 165, glass: { x0: 48, y0: 137, x1: 1123, y1: 791, r: 26 } } as const;
/** Ultrawide desk (G-10, ChatGPT): used from 2.1:1 up, stretched to fill (≤ ~4 %) so no rail or glass is cropped. */
const DESK_ART_WIDE = { file: 'strategy-table-background-ultrawide.png', w: 1881, h: 836, rail: 76, railX: 150, glass: { x0: 39, y0: 105, x1: 1004, y1: 705, r: 24 } } as const;
const WIDE_FROM = 2.1;
/** public/map/sea-tile.png (1024×1024 px, painted by ChatGPT) in map units at the atlas painting's scale (1065 px ↔ 800 units). */
const SEA_TILE = { w: 769, h: 769 } as const;
/** Colour correction hook for the sea tile → atlas water (identity while they match; check with tools/check-sea-tile.py). */
const SEA_MATCH = '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'; // identity: the PNG tile matches the atlas
const MIN_ZOOM = 1;

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


/** Area (map units²) and principal-axis angle (degrees, -90..90, 0 = horizontal) of a polygon. */
function shapeStats(poly: Pt[]): { area: number; angle: number } {
  let a = 0;
  for (let i = 0; i < poly.length; i++) { const [x1, y1] = poly[i]!; const [x2, y2] = poly[(i + 1) % poly.length]!; a += x1 * y2 - x2 * y1; }
  const n = poly.length, mx = poly.reduce((t, p) => t + p[0], 0) / n, my = poly.reduce((t, p) => t + p[1], 0) / n;
  let sxx = 0, syy = 0, sxy = 0;
  for (const [x, y] of poly) { sxx += (x - mx) ** 2; syy += (y - my) ** 2; sxy += (x - mx) * (y - my); }
  let angle = (0.5 * Math.atan2(2 * sxy, sxx - syy) * 180) / Math.PI;
  // only tilt clearly elongated shapes
  const l1 = (sxx + syy) / 2 + Math.sqrt(((sxx - syy) / 2) ** 2 + sxy ** 2), l2 = (sxx + syy) / 2 - Math.sqrt(((sxx - syy) / 2) ** 2 + sxy ** 2);
  if (l1 < 2.2 * Math.max(l2, 1)) angle = 0;
  if (angle > 60 || angle < -60) angle = 0; // near-vertical shapes read better horizontal
  return { area: Math.abs(a) / 2, angle };
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
  private tabletScreen: HTMLSpanElement;
  /** Last measured size of the open tablet (.np-wrap) in CSS px; the resting clone is laid out at this size. */
  private deviceSize = { w: 1220, h: 790 };
  private atlasArtHref: string;
  private seaTileHref: string;
  private seaLayer: SVGGElement | null = null;
  private glassClipRect: SVGRectElement | null = null;

  constructor(
    readonly geo: Geometry,
    private cb: MapCallbacks,
  ) {
    this.base = this.responsivePoliticalFrame((window.innerWidth * 0.60) / Math.max(1, window.innerHeight * 0.94));
    this.vb = { ...this.base };
    this.el = h('div', { class: 'map', 'data-ui': 'map' });

    this.atlasArtHref = new URL(`${import.meta.env.BASE_URL}map/arvain-terrain-art.png`, document.baseURI).href;
    this.seaTileHref = new URL(`${import.meta.env.BASE_URL}map/sea-tile.png`, document.baseURI).href;
    this.svg = s('svg', { class: 'map-svg', preserveAspectRatio: 'xMidYMid meet', role: 'group', 'aria-label': 'Map of Arvain', tabindex: 0 });
    this.markerLayer = s('g', { class: 'markers' });
    this.markerSvg = s('svg', { class: 'map-svg marker-svg', preserveAspectRatio: 'xMidYMid meet', role: 'group', 'aria-label': 'Available scenes', 'data-ui': 'markers' },
      this.markerLayer);
    this.hotLayer = s('g', { class: 'hotspots' });
    this.toastLayer = h('div', { class: 'map-toasts', 'data-ui': 'readables' });
    this.tooltip = h('div', { class: 'map-tooltip', hidden: true });
    // The resting tablet's face is a scaled clone of the real device (setTabletPreview); empty until the app builds it.
    this.tabletScreen = h('span', { class: 'map-tablet-screen' });
    this.tablet = h('button', {
      class: 'map-tablet',
      type: 'button',
      'aria-label': 'Open the tablet where you left it',
      onclick: () => this.cb.onTablet(),
    },
      this.tabletScreen);
    this.build();
    // Planning-display furniture on the glass: thin corner brackets (decorative, fixed to the glass, not the map).
    const glassHud = h('div', { class: 'glass-hud', 'aria-hidden': 'true' }, h('i', {}), h('i', {}), h('i', {}), h('i', {}));
    this.el.append(this.svg, glassHud, this.toastLayer, this.markerSvg, this.tooltip, this.tablet);
    this.layoutGlass();
    new ResizeObserver(() => this.resizeFrame()).observe(this.el);
    this.applyViewBox();
    this.bindPanZoom();
    window.addEventListener('resize', () => this.resizeFrame());
  }

  /**
   * Continental fit: show the whole painted atlas (contain) and extend it sideways or vertically with sea,
   * so the glass display never reveals the painting's edge as an empty margin.
   */
  private responsivePoliticalFrame(aspect: number) {
    const art = this.geo.viewBox;
    const inset = 6; // trims the painting's outermost pixels, which blend into the sea tile
    const fitW = art.w - inset * 2;
    const fitH = art.h - inset * 2;
    const width = aspect >= fitW / fitH ? fitH * aspect : fitW;
    const height = width / aspect;
    return {
      x: art.x + art.w / 2 - width / 2,
      y: art.y + art.h / 2 - height / 2,
      w: width,
      h: height,
    };
  }

  /**
   * Place the map viewport exactly over the glass painted in the desk artwork. The desk image is drawn with
   * background-size: cover, so the glass moves with the window's aspect ratio; mirror that maths here.
   */
  private layoutGlass() {
    const cw = this.el.clientWidth || window.innerWidth;
    const ch = this.el.clientHeight || window.innerHeight;
    const art = cw / ch >= WIDE_FROM ? DESK_ART_WIDE : DESK_ART;
    if (this.el.dataset.desk !== art.file) {
      this.el.dataset.desk = art.file;
      const href = new URL(`${import.meta.env.BASE_URL}map/${art.file}`, document.baseURI).href;
      this.el.style.setProperty('--strategy-table-background', `url("${href}")`);
    }
    let sx: number, sy: number, ox: number, oy: number;
    if (art === DESK_ART_WIDE) {
      // stretch to fill: keeps both rails and the whole glass frame
      sx = cw / art.w; sy = ch / art.h; ox = 0; oy = 0;
    } else {
      const scale = Math.max(cw / art.w, ch / art.h);
      sx = sy = scale;
      // Narrower than the art (16:10, 4:3, portrait): keep the painted left frame and crop only bare wood on the right.
      ox = cw < art.w * scale ? 0 : (cw - art.w * scale) / 2;
      oy = (ch - art.h * scale) / 2;
    }
    const g = art.glass;
    const margin = 6;
    const left = Math.max(margin, ox + g.x0 * sx);
    const top = Math.max(margin, oy + g.y0 * sy);
    const right = Math.min(cw - margin, ox + g.x1 * sx);
    const bottom = Math.min(ch - margin, oy + g.y1 * sy);
    const st = this.el.style;
    st.backgroundSize = `${art.w * sx}px ${art.h * sy}px`;
    st.backgroundPosition = `${ox}px ${oy}px`;
    st.setProperty('--glass-l', `${left}px`);
    st.setProperty('--glass-t', `${top}px`);
    st.setProperty('--glass-w', `${Math.max(0, right - left)}px`);
    st.setProperty('--glass-h', `${Math.max(0, bottom - top)}px`);
    st.setProperty('--glass-r', `${Math.max(6, g.r * Math.min(sx, sy))}px`);
    // The bare wood to the right of the glass frame: the resting tablet is centred in it and sized to fit.
    const woodLeft = Math.min(cw, ox + (g.x1 + 30) * sx);
    const woodW = Math.max(0, cw - woodLeft);
    st.setProperty('--wood-cx', `${woodLeft + woodW / 2}px`);
    st.setProperty('--tablet-w', `${Math.round(Math.min(310, Math.max(150, woodW * 0.78)))}px`);
    this.el.classList.toggle('desk-narrow', woodW < 190);
    // Top leather rail (art y 0–86 px, straight from x ≈ 150): Menu and Actions are tooled into it (C-15).
    const railTop = Math.max(0, oy);
    const railBottom = oy + art.rail * sy;
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--rail-x', `${Math.max(12, ox + art.railX * sx)}px`);
    rootStyle.setProperty('--rail-cy', `${railBottom - railTop >= 30 ? (railTop + railBottom) / 2 : 26}px`);
    requestAnimationFrame(() => this.fitTabletPreview());
  }

  private resizeFrame() {
    this.layoutGlass();
    const rect = this.svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const oldZoom = this.base.w / this.vb.w;
    const centerX = this.vb.x + this.vb.w / 2;
    const centerY = this.vb.y + this.vb.h / 2;
    this.base = this.responsivePoliticalFrame(rect.width / rect.height);
    this.vb = {
      x: centerX - this.base.w / oldZoom / 2,
      y: centerY - this.base.h / oldZoom / 2,
      w: this.base.w / oldZoom,
      h: this.base.h / oldZoom,
    };
    this.applyViewBox();
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
      s('filter', { id: 'water-paint', x: '-10%', y: '-10%', width: '120%', height: '120%', 'color-interpolation-filters': 'sRGB' },
        s('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.018 0.026', numOctaves: '3', seed: '19', stitchTiles: 'stitch', result: 'grain' }),
        s('feColorMatrix', { in: 'grain', type: 'saturate', values: '0' }),
        s('feComponentTransfer', {}, s('feFuncR', { type: 'linear', slope: '0.22', intercept: '0.28' }), s('feFuncG', { type: 'linear', slope: '0.22', intercept: '0.34' }), s('feFuncB', { type: 'linear', slope: '0.22', intercept: '0.34' })),
        s('feBlend', { in: 'SourceGraphic', mode: 'soft-light' })),
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
      s('filter', { id: 'atlas-land-key', x: '0', y: '0', width: '100%', height: '100%', 'color-interpolation-filters': 'sRGB' },
        s('feColorMatrix', {
          type: 'matrix',
          values: '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.55 1.7085 -2.55 0 0.2',
        }),
        s('feComponentTransfer', {}, s('feFuncA', { type: 'linear', slope: '6', intercept: '-1.2' }))),
      s('mask', {
        id: 'atlas-land-mask', maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse', 'mask-type': 'alpha',
        x: this.geo.viewBox.x, y: this.geo.viewBox.y, width: this.geo.viewBox.w, height: this.geo.viewBox.h,
      }, s('image', {
        href: this.atlasArtHref, x: this.geo.viewBox.x, y: this.geo.viewBox.y,
        width: this.geo.viewBox.w, height: this.geo.viewBox.h, preserveAspectRatio: 'none', filter: 'url(#atlas-land-key)',
      })),
      // Mirrored 2x2 tiling: every tile edge meets its own mirror image, so no seam can show.
      s('pattern', { id: 'sea-tile', patternUnits: 'userSpaceOnUse', x: this.geo.viewBox.x, y: this.geo.viewBox.y, width: SEA_TILE.w * 2, height: SEA_TILE.h * 2 },
        ...([[1, 1, 0, 0], [-1, 1, 2, 0], [1, -1, 0, 2], [-1, -1, 2, 2]] as const).map(([sx, sy, tx, ty]) =>
          s('image', {
            href: this.seaTileHref, x: 0, y: 0, width: SEA_TILE.w, height: SEA_TILE.h, preserveAspectRatio: 'none',
            transform: `translate(${tx * SEA_TILE.w},${ty * SEA_TILE.h}) scale(${sx},${sy})`,
          }))),
      // Match the tile's colour to the atlas painting's own open water (measured means, tools/check-sea-tile.py).
      s('filter', { id: 'sea-match', x: '0', y: '0', width: '100%', height: '100%', 'color-interpolation-filters': 'sRGB' },
        s('feColorMatrix', { type: 'matrix', values: SEA_MATCH })),
      // Graticule of the planning display: faint lines every 100 map units that zoom with the map.
      s('pattern', { id: 'planning-grid', patternUnits: 'userSpaceOnUse', x: 0, y: 0, width: 100, height: 100 },
        s('path', { d: 'M100 0 H0 V100', fill: 'none', stroke: '#c9f4ec', 'stroke-width': 0.8, 'vector-effect': 'non-scaling-stroke' })),
      s('filter', { id: 'atlas-feather-blur', x: '-10%', y: '-10%', width: '120%', height: '120%' },
        s('feGaussianBlur', { stdDeviation: 16 })),
      s('mask', { id: 'atlas-feather', maskUnits: 'userSpaceOnUse', x: this.geo.viewBox.x, y: this.geo.viewBox.y, width: this.geo.viewBox.w, height: this.geo.viewBox.h },
        s('rect', { x: this.geo.viewBox.x + 30, y: this.geo.viewBox.y + 30, width: this.geo.viewBox.w - 60, height: this.geo.viewBox.h + 40, fill: '#fff', filter: 'url(#atlas-feather-blur)' })),
      s('clipPath', { id: 'strategy-glass-clip', clipPathUnits: 'userSpaceOnUse' },
        this.glassClipRect = s('rect', { x: this.vb.x, y: this.vb.y, width: this.vb.w, height: this.vb.h, rx: this.vb.w * 0.012 })),
      ...shapes.map((g) => s('clipPath', { id: `land-clip-${g.id}` }, s('path', { d: pathOf(g.polygon) }))),
      s('clipPath', { id: 'kunasai-art-clip', clipPathUnits: 'userSpaceOnUse' },
        ...shapes.filter((g) => g.kind === 'region').map((g) => s('path', { d: pathOf(g.polygon) }))),
    );
    // Open water fills the whole glass; the painting's own sea blends into it at the feathered edges.
    const sea = s('g', { class: 'sea-water', 'aria-hidden': 'true' },
      s('rect', { class: 'sea-water-fill', x, y, width: w, height: hgt, fill: 'url(#sea-tile)', filter: 'url(#sea-match)' }));
    this.seaLayer = sea;
    // The approved Arvain painting is the continuous map surface at every map scale.
    // Game hit areas and political borders stay above the artwork as separate layers.
    const atlasArt = s('image', {
      class: 'atlas-art', href: this.atlasArtHref,
      x: this.geo.viewBox.x, y: this.geo.viewBox.y,
      width: this.geo.viewBox.w, height: this.geo.viewBox.h,
      preserveAspectRatio: 'none', 'aria-hidden': 'true', mask: 'url(#atlas-feather)',
    });
    const kunasaiRegions = shapes.filter((g) => g.kind === 'region');
    const kunasaiRegionIds = new Set(kunasaiRegions.map((g) => g.id));
    const outerKunasaiBorders = (this.geo.borders ?? []).filter((b) =>
      b.between.some((id) => kunasaiRegionIds.has(id)) && b.type === 'international');
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
    const landMasked = (className: string, ...children: SVGElement[]) => s('g', { class: className, mask: 'url(#atlas-land-mask)' }, ...children);
    const kunasaiRegionalBorders = borderLines.filter((b) =>
      b.type === 'internal' && b.between.length > 0 && b.between.every((id) => kunasaiRegionIds.has(id)));
    const terrainBorders = landMasked('terrain-borders',
      ...kunasaiRegionalBorders.map((b) => s('path', { d: linePath(b.line), class: 'border-line border-internal' })));
    const coastBorders = s('g', { class: 'coast-borders' },
      ...borderLines.filter((b) => b.type === 'coast').map((b) => s('path', { d: linePath(b.line) })));
    coastBorders.setAttribute('mask', 'url(#atlas-land-mask)');
    const international = borderLines.filter((b) => b.type === 'international' && !b.between.some((id) => kunasaiRegionIds.has(id)));
    const politicalBorderUnderlay = landMasked('political-border-underlay',
      ...international.map((b) => s('path', { d: linePath(b.line) })));
    const politicalBorders = landMasked('political-borders',
      ...international.map((b) => s('path', { d: linePath(b.line), class: 'international-border' })));
    const nationalOutline = landMasked('national-outline',
      ...outerKunasaiBorders.map((b) => s('path', { d: linePath(b.line) })));
    this.hotLayer.setAttribute('mask', 'url(#atlas-land-mask)');

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
      // An engraved brass nameplate on the glass with an arrow toward the nation beyond the map's edge.
      const w = Math.max(o.name.length, o.note.length * 0.78) * 7.4 + 34;
      const arrow = id === 'federation' ? 'M0,34 l-7,-8 h14 z' : 'M' + (w / 2 + 10) + ',0 l-9,-7 v14 z';
      const g = s('g', { class: 'offmap-token hot-offmap', 'data-id': id, transform: `translate(${o.at[0]},${o.at[1]})` },
        s('g', { class: 'offmap-token-body' },
          s('rect', { class: 'offmap-plate-shadow', x: -w / 2, y: -20, width: w, height: 44, rx: 4, transform: 'translate(0,3)' }),
          s('rect', { class: 'offmap-plate', x: -w / 2, y: -20, width: w, height: 44, rx: 4 }),
          s('rect', { class: 'offmap-plate-inlay', x: -w / 2 + 4, y: -16, width: w - 8, height: 36, rx: 2 }),
          s('path', { class: 'offmap-plate-arrow', d: arrow }),
          s('text', { class: 'offmap-plate-name', y: -1 }, o.name),
          s('text', { class: 'offmap-plate-note', y: 13 }, o.note)));
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', `Inspect ${o.name}. ${o.note}`);
      g.addEventListener('click', (ev) => this.clickShape(id, ev as MouseEvent));
      g.addEventListener('keydown', (ev) => this.keySelectShape(id, ev as KeyboardEvent, g));
      offmap.append(g);
    }
    const labels = s('g', { class: 'labels' });
    for (const g of shapes) {
      if (g.kind === 'country') {
        // C-25: printed-on-the-atlas names — size follows territory, elongated countries get a gentle tilt.
        const { area, angle } = shapeStats(g.polygon);
        const size = Math.max(18, Math.min(30, 10 + Math.sqrt(area) / 9));
        const tilt = Math.max(-18, Math.min(18, angle));
        labels.append(s('text', {
          class: 'label label-country', x: g.center[0], y: g.center[1] + 4, style: `font-size: ${size.toFixed(1)}px`,
          transform: Math.abs(tilt) > 6 ? `rotate(${tilt.toFixed(1)} ${g.center[0]} ${g.center[1]})` : '',
        }, g.name));
      }
      else labels.append(s('text', { class: 'label label-region', x: g.center[0], y: g.center[1] + 5 }, g.name.toUpperCase()));
    }
    labels.append(s('text', { class: 'label label-national', x: 355, y: 700 }, 'KUNASAI'));
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
    const planningGrid = s('rect', { class: 'planning-grid', x: -3000, y: -3000, width: 7000, height: 7000, fill: 'url(#planning-grid)', 'aria-hidden': 'true' });
    this.svg.append(defs, sea, atlasArt, planningGrid, terrain, terrainBorders, political, coastBorders, politicalBorderUnderlay, politicalBorders, nationalOutline, this.hotLayer, offmap, labels);
    this.svg.addEventListener('click', (ev) => {
      if (this.dragged) return;
      const t = ev.target as Element;
      if (!t.closest('.hot, .hot-offmap, .marker')) this.cb.onBackground();
    });
  }

  /**
   * Show the real device on the desk: `screen` is the tablet's .np-screen (inside its .np-wrap). The whole device is
   * cloned at its real pixel size and scaled down, so the resting tablet is exactly what the player picks up.
   */
  setTabletPreview(screen: HTMLElement, scroll = 0) {
    const device = (screen.closest('.np-wrap') as HTMLElement | null) ?? screen;
    if (device.offsetWidth > 0) this.deviceSize = { w: device.offsetWidth, h: device.offsetHeight };
    const clone = device.cloneNode(true) as HTMLElement;
    for (const el of [clone, ...clone.querySelectorAll<HTMLElement>('[tabindex], [aria-live]')]) {
      el.removeAttribute('tabindex');
      el.removeAttribute('aria-live');
    }
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelector('.np-screen')?.classList.remove('is-switching');
    clone.classList.add('map-tablet-device');
    this.tabletScreen.replaceChildren(clone);
    this.fitTabletPreview();
    const cloneScreen = clone.querySelector<HTMLElement>('.np-screen');
    if (cloneScreen) cloneScreen.scrollTop = scroll;
  }

  /** Scale the cloned device to the resting tablet's width and give the tablet the device's proportions. */
  private fitTabletPreview() {
    const { w, h: hgt } = this.deviceSize;
    this.tablet.style.setProperty('--tab-ar', String(w / hgt));
    const clone = this.tabletScreen.firstElementChild as HTMLElement | null;
    if (!clone) return;
    clone.style.width = `${w}px`;
    clone.style.height = `${hgt}px`;
    clone.style.transform = `scale(${(this.tablet.offsetWidth || 300) / w})`;
  }

  setView(view: 'terrain' | 'political') {
    this.view = view;
    if (view === 'political') {
      this.vb = { ...this.base };
    } else {
      const points = this.geo.regions.filter((g) => g.kind === 'region').flatMap((g) => g.polygon);
      const minX = Math.min(...points.map(([px]) => px));
      const maxX = Math.max(...points.map(([px]) => px));
      const minY = Math.min(...points.map(([, py]) => py));
      const maxY = Math.max(...points.map(([, py]) => py));
      const width = this.base.w / KUNASAI_ZOOM;
      const height = this.base.h / KUNASAI_ZOOM;
      this.vb = { x: (minX + maxX) / 2 - width / 2, y: (minY + maxY) / 2 - height / 2, w: width, h: height };
    }
    this.applyViewBox();
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
          // invisible hit target, beacon where the tip lands, then ChatGPT's sculpted object pin (72×88, tip = anchor)
          s('circle', { class: 'marker-hit', cx: 0, cy: 8, r: 24 }),
          s('circle', { class: 'pulse', cx: 0, cy: 34, r: 11 }),
          s('image', { class: 'marker-art', href: `map/markers/${m.token ?? (m.kind === 'crisis' ? 'crisis' : 'palace')}.svg`, x: -21, y: 34 - 51.3, width: 42, height: 51.3 })),
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
    this.declutterLabels();
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
    this.declutterLabels();
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
    const pos = stackPins(pins, [...obstacles, ...this.labelRects()], 3, this.glassRect());
    els.forEach((el, i) => {
      el.style.left = `${pos[i]![0]}px`;
      el.style.top = `${pos[i]![1]}px`;
    });
  }

  /**
   * Keep map labels readable: national, region and country names stay where they are; place and water names shift a
   * little (screen-space search, applied as a map-unit translate) until they clear scene markers and the labels already
   * placed. Re-run after every view change because labels and markers scale differently with zoom.
   */
  private declutterLabels() {
    const texts = [...this.svg.querySelectorAll<SVGTextElement>('.labels text')];
    if (!texts.length) return;
    for (const t of texts) t.removeAttribute('transform');
    const host = this.el.getBoundingClientRect();
    const svgRect = this.svg.getBoundingClientRect();
    if (svgRect.width < 1) return;
    const unitsPerPx = this.vb.w / svgRect.width;
    const rank = (t: SVGTextElement) => t.classList.contains('label-national') ? 0 : t.classList.contains('label-region') ? 1
      : t.classList.contains('label-country') ? 2 : t.classList.contains('label-point') ? 3 : 4;
    const placed: Rect[] = [];
    for (const el of this.markerSvg.querySelectorAll<SVGGElement>('.marker .ring')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0) placed.push({ x: r.left - host.left, y: r.top - host.top, w: r.width, h: r.height });
    }
    const overlaps = (a: Rect) => placed.some((b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h);
    for (const t of texts.sort((a, b) => rank(a) - rank(b))) {
      const r = t.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const box: Rect = { x: r.left - host.left - 2, y: r.top - host.top, w: r.width + 4, h: r.height };
      if (rank(t) <= 2 || !overlaps(box)) { placed.push(box); continue; }
      // Try nearby offsets, closest first: below, above, right, left, then further rings.
      let best: [number, number] | null = null;
      const step = box.h * 0.9;
      search: for (let ring = 1; ring <= 4; ring++) {
        for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]] as const) {
          const ox = dx * ring * Math.max(step, box.w * 0.35), oy = dy * ring * step;
          const cand = { ...box, x: box.x + ox, y: box.y + oy };
          if (!overlaps(cand)) { best = [ox, oy]; placed.push(cand); break search; }
        }
      }
      if (!best) { placed.push(box); continue; }
      t.setAttribute('transform', `translate(${best[0] * unitsPerPx},${best[1] * unitsPerPx})`);
    }
  }

  /** Screen rectangles (relative to the map element) of every map label currently drawn, so pins keep clear of them. */
  private labelRects(): Rect[] {
    const host = this.el.getBoundingClientRect();
    const rects: Rect[] = [];
    for (const t of this.svg.querySelectorAll<SVGTextElement>('text')) {
      const r = t.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const cs = getComputedStyle(t);
      if (cs.visibility === 'hidden' || Number(cs.opacity) < 0.15) continue;
      rects.push({ x: r.left - host.left - 2, y: r.top - host.top - 1, w: r.width + 4, h: r.height + 2 });
    }
    return rects;
  }

  /** The visible glass display (relative to the map element); pins stay inside it. */
  private glassRect(): Rect | undefined {
    const host = this.el.getBoundingClientRect();
    const r = this.svg.getBoundingClientRect();
    if (r.width < 1) return undefined;
    return { x: r.left - host.left + 4, y: r.top - host.top + 4, w: r.width - 8, h: r.height - 8 };
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
    if (this.glassClipRect) {
      this.glassClipRect.setAttribute('x', String(this.vb.x));
      this.glassClipRect.setAttribute('y', String(this.vb.y));
      this.glassClipRect.setAttribute('width', String(this.vb.w));
      this.glassClipRect.setAttribute('height', String(this.vb.h));
      this.glassClipRect.setAttribute('rx', String(this.vb.w * 0.012));
    }
    for (const rect of this.seaLayer?.querySelectorAll<SVGRectElement>('rect') ?? []) {
      rect.setAttribute('x', String(this.vb.x));
      rect.setAttribute('y', String(this.vb.y));
      rect.setAttribute('width', String(this.vb.w));
      rect.setAttribute('height', String(this.vb.h));
    }
    const zoom = b.w / this.vb.w;
    this.el.style.setProperty('--zoom', String(zoom));
    const nextScale: MapScale = zoom >= KUNASAI_ZOOM ? 'kunasai' : 'continent';
    const nextView = nextScale === 'kunasai' ? 'terrain' : 'political';
    if (nextView !== this.view) this.view = nextView;
    this.el.classList.toggle('view-political', this.view === 'political');
    this.el.classList.toggle('view-terrain', this.view === 'terrain');
    this.svg.setAttribute('aria-label', this.view === 'political' ? 'Continental map of Arvain' : 'Kunasai regional map');
    if (nextScale !== this.scale) {
      this.scale = nextScale;
      this.cb.onScaleChange(this.scale);
    }
    this.declutterLabels();
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
    this.svg.addEventListener('keydown', (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      const key = event.key.toLowerCase();
      if (key === '+' || key === '=' || key === 'add') {
        event.preventDefault();
        this.zoomBy(1.2);
      } else if (key === '-' || key === '_' || key === 'subtract') {
        event.preventDefault();
        this.zoomBy(1 / 1.2);
      } else if (key === '0') {
        event.preventDefault();
        this.resetZoom();
      }
    });
    let start: { x: number; y: number; vx: number; vy: number } | null = null;
    this.svg.addEventListener('pointerdown', (ev) => {
      if (ev.button !== 0) return;
      this.svg.focus({ preventScroll: true });
      start = { x: ev.clientX, y: ev.clientY, vx: this.vb.x, vy: this.vb.y };
      this.dragged = false;
    });
    window.addEventListener('pointermove', (ev) => {
      if (!start) return;
      const dx = ev.clientX - start.x;
      const dy = ev.clientY - start.y;
      if (!this.dragged && Math.hypot(dx, dy) < 5) return;
      if (this.vb.w >= this.base.w / 1.001) return;
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

