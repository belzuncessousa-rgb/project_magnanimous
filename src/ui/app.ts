// Top-level UI controller: title ↔ rest state (map) ↔ VN mode ↔ newspaper.
import { resolveCountry, resolveRegion } from '../core/ids';
import type { ContentBundle, FreeAction } from '../content/schema';
import { validateContent } from '../content/validate';
import { Game } from '../game/game';
import { deleteSave, loadGame, loadSettings, saveGame, saveSettings, type Settings } from '../game/save';
import { clear, h } from './dom';
import { KIND_LABEL, int, militaryWord, millions, money, pct1, relationWord, stabilityWord } from './format';
import { Hud } from './hud';
import { MapView, OFFMAP, type Geometry, type MarkerSpec } from './map';
import { showNewspaper } from './newspaper';
import { tokenFor } from './tokens';
import { VNView } from './vn';

export class App {
  private game: Game | null = null;
  private settings: Settings = loadSettings();
  private map: MapView;
  private hud = new Hud();
  private vn: VNView;
  private layer = h('div', { class: 'ui-layer', hidden: true });
  private sidebar = h('aside', { class: 'sidebar paper' });
  private agenda = h('div', { class: 'agenda paper' });
  private info = h('div', { class: 'info-panel paper', hidden: true });
  private endBtn = h('button', { class: 'btn primary end-turn' }, 'End turn');
  private endNote = h('div', { class: 'end-note' });
  private banner = h('div', { class: 'target-banner', hidden: true });
  private toast = h('div', { class: 'toast', hidden: true });
  private titleScreen: HTMLElement | null = null;
  private targeting: FreeAction | null = null;
  private busy = false;

  constructor(
    private root: HTMLElement,
    private content: ContentBundle,
    private geo: Geometry,
  ) {
    this.map = new MapView(geo, {
      onSelect: (id, x, y) => this.showInfo(id, x, y),
      onMarker: (id) => void this.playScene(id),
      onTarget: (id) => this.finishTargeting(id),
      onBackground: () => this.hideInfo(),
    });
    this.map.loadImage('map/terrain-small.jpg', 'map/terrain.jpg');
    this.map.setView(this.settings.mapView);
    const player = content.world.actors.find((a) => a.id === 'lara' || /vento/i.test(a.name));
    this.vn = new VNView(() => this.game!.state, { transitions: this.settings.transitions, playerId: player?.id ?? 'lara' });
    this.applySettings();

    const viewToggle = h('div', { class: 'view-toggle paper', role: 'group', 'aria-label': 'Map view' },
      h('button', { 'data-view': 'terrain', onclick: () => this.setView('terrain') }, 'Terrain'),
      h('button', { 'data-view': 'political', onclick: () => this.setView('political') }, 'Political'),
      h('span', { class: 'sep' }),
      h('button', { title: 'Zoom in', onclick: () => this.map.zoomBy(1.4) }, '+'),
      h('button', { title: 'Zoom out', onclick: () => this.map.zoomBy(1 / 1.4) }, '−'),
      h('button', { title: 'Reset view', onclick: () => this.map.resetZoom() }, '⌂'));
    const topLeft = h('div', { class: 'top-left' },
      h('button', { class: 'btn ghost', onclick: () => this.openMenu() }, '☰ Menu'),
      h('button', { class: 'btn ghost', onclick: () => this.toggleSidebar() }, 'Actions'));
    this.endBtn.addEventListener('click', () => void this.endTurn());
    const bottomRight = h('div', { class: 'bottom-right' }, this.endNote, this.endBtn);
    this.layer.append(topLeft, this.hud.el, this.agenda, this.sidebar, viewToggle, bottomRight, this.info, this.banner, this.toast);
    this.hud.el.hidden = false;
    root.append(this.map.el, this.layer, this.vn.el);
    this.updateViewToggle();

    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        if (this.targeting) this.cancelTargeting();
        else if (!this.info.hidden) this.hideInfo();
      }
    });
    if (content.warnings.length) console.warn('[content]', content.warnings);
    if (content.demo.length) console.info('[content] using demo files for:', content.demo.join(', '));
  }

  // ---------------------------------------------------------------- settings

  private applySettings() {
    document.documentElement.dataset.textSize = this.settings.textSize;
    document.documentElement.classList.toggle('no-transitions', !this.settings.transitions);
    this.vn.setOptions({ transitions: this.settings.transitions });
  }

  private setView(v: 'terrain' | 'political') {
    this.settings.mapView = v;
    saveSettings(this.settings);
    this.map.setView(v);
    this.updateViewToggle();
  }

  private updateViewToggle() {
    for (const b of this.layer.querySelectorAll<HTMLButtonElement>('.view-toggle [data-view]')) b.classList.toggle('active', b.dataset.view === this.settings.mapView);
  }

  // ---------------------------------------------------------------- title

  showTitle() {
    this.layer.hidden = true;
    this.map.el.classList.add('dim');
    const save = loadGame();
    const cont = h('button', { class: 'btn', disabled: !save, onclick: () => this.continueGame() }, 'Continue');
    this.titleScreen?.remove();
    this.titleScreen = h('div', { class: 'title-screen overlay open' },
      h('div', { class: 'title-card paper' },
        h('div', { class: 'title-kicker' }, 'The Republic of Kunasai'),
        h('h1', { class: 'title-name' }, 'Magnanimous'),
        h('div', { class: 'title-sub' }, 'A presidency in five regions and one conscience'),
        h('div', { class: 'title-buttons' },
          h('button', { class: 'btn primary', onclick: () => this.newGame() }, 'New game'),
          cont,
          h('button', { class: 'btn', onclick: () => this.openSettings() }, 'Settings')),
        save ? h('div', { class: 'title-save' }, `Saved game: ${save.dateLabel}`) : null,
        this.content.demo.includes('scenes') ? h('div', { class: 'title-demo' }, 'Demo content — the story has not landed yet.') : null));
    this.root.append(this.titleScreen);
  }

  private closeTitle() {
    this.titleScreen?.remove();
    this.titleScreen = null;
    this.map.el.classList.remove('dim');
    this.layer.hidden = false;
  }

  private newGame() {
    this.game = Game.newGame(this.content);
    if (import.meta.env.DEV) {
      const locs = new Set([...this.geo.regions.map((r) => r.id), ...Object.keys(this.geo.points), ...Object.keys(OFFMAP)]);
      const w = validateContent(this.content, this.game.state, locs);
      if (w.length) console.warn('[content] cross-reference warnings:', w);
    }
    this.closeTitle();
    saveGame(this.game.state);
    this.refresh();
    void this.autoStart();
  }

  private continueGame() {
    const f = loadGame();
    if (!f) return;
    try {
      this.game = Game.fromState(this.content, f.state);
    } catch {
      this.flash('That save is from an older version and cannot be loaded.');
      return;
    }
    this.closeTitle();
    this.refresh();
    if (this.game.state.ended) void this.showEnd();
    else void this.autoStart();
  }

  private modal(title: string, body: HTMLElement, onClose?: () => void): HTMLElement {
    const close = () => { m.remove(); onClose?.(); };
    const m = h('div', { class: 'modal overlay open', onclick: (ev: Event) => { if (ev.target === m) close(); } },
      h('div', { class: 'modal-card paper' },
        h('div', { class: 'modal-head' }, h('h2', {}, title), h('button', { class: 'x', 'aria-label': 'Close', onclick: close }, '×')),
        body));
    this.root.append(m);
    return m;
  }

  private openSettings() {
    const sizes = ['small', 'medium', 'large'] as const;
    const body = h('div', { class: 'settings' },
      h('label', {}, 'Text size',
        h('select', { onchange: (ev: Event) => { this.settings.textSize = (ev.target as HTMLSelectElement).value as Settings['textSize']; saveSettings(this.settings); this.applySettings(); } },
          ...sizes.map((v) => h('option', { value: v, selected: this.settings.textSize === v }, v[0]!.toUpperCase() + v.slice(1))))),
      h('label', { class: 'check' },
        h('input', { type: 'checkbox', checked: this.settings.transitions, onchange: (ev: Event) => { this.settings.transitions = (ev.target as HTMLInputElement).checked; saveSettings(this.settings); this.applySettings(); } }),
        'Transitions & animations'),
      h('button', { class: 'btn danger', onclick: () => { if (confirm('Delete the saved game?')) { deleteSave(); this.flash('Save deleted.'); if (!this.game) this.showTitle(); } } }, 'Delete saved game'));
    this.modal('Settings', body);
  }

  private openMenu() {
    let m: HTMLElement;
    const body = h('div', { class: 'menu-buttons' },
      h('button', { class: 'btn', onclick: () => m.remove() }, 'Resume'),
      h('button', { class: 'btn', onclick: () => { if (this.game) saveGame(this.game.state); this.flash('Game saved.'); m.remove(); } }, 'Save'),
      h('button', { class: 'btn', onclick: () => { m.remove(); this.openSettings(); } }, 'Settings'),
      h('button', { class: 'btn', onclick: () => { if (this.game) saveGame(this.game.state); m.remove(); this.game = null; this.showTitle(); } }, 'Save & quit to title'));
    m = this.modal('Menu', body);
  }

  // ---------------------------------------------------------------- rest state

  private chapterTitle(): string {
    const g = this.game!;
    const ch = g.chapterDef();
    return ch ? `Chapter ${ch.id} · ${ch.title}` : `Chapter ${g.state.chapter}`;
  }

  refresh() {
    const g = this.game;
    if (!g) return;
    this.hud.update(g.state, this.chapterTitle());
    const scenes = g.availableScenes();
    const foreign = new Set([...this.geo.regions.filter((r) => r.kind === 'country').map((r) => r.id), ...Object.keys(OFFMAP)]);
    const markers: MarkerSpec[] = scenes.map((sc) => ({
      id: sc.id,
      title: sc.meta.title,
      kind: sc.meta.kind,
      token: tokenFor(sc, foreign),
      at: this.map.locate(sc.meta.location) ?? this.map.locate('capital')!,
      required: g.isRequired(sc),
      locked: g.isLocked(sc),
    }));
    this.map.setMarkers(markers);
    this.map.setToasts(
      g.activePopups().map((p) => ({ id: `${g.state.turnIndex}:${p.id}`, title: p.title, text: p.text, at: this.map.locate(p.location) ?? this.map.locate('capital')! })),
    );
    // agenda
    clear(this.agenda);
    this.agenda.append(h('div', { class: 'panel-title' }, 'Agenda'));
    if (!scenes.length) this.agenda.append(h('div', { class: 'agenda-empty' }, 'Nothing on your desk.'));
    this.agenda.classList.toggle('empty', !scenes.length);
    for (const sc of scenes) {
      const locked = g.isLocked(sc);
      this.agenda.append(
        h('button', { class: `agenda-item kind-${sc.meta.kind}${locked ? ' locked' : ''}`, disabled: locked, onclick: () => void this.playScene(sc.id) },
          h('span', { class: 'agenda-kind' }, (g.isRequired(sc) ? '● ' : '○ ') + (KIND_LABEL[sc.meta.kind] ?? sc.meta.kind)),
          h('span', { class: 'agenda-title' }, sc.meta.title)));
    }
    // end turn
    const pending = g.pendingRequired().length;
    this.endBtn.disabled = !g.canEndTurn() || this.busy;
    this.endNote.textContent = g.state.ended ? '' : pending ? `${pending} required ${pending === 1 ? 'matter remains' : 'matters remain'}` : 'You may end the turn';
    this.renderSidebar();
  }

  private toggleSidebar() {
    this.sidebar.classList.toggle('open');
  }

  private renderSidebar() {
    const g = this.game!;
    clear(this.sidebar);
    this.sidebar.append(h('div', { class: 'panel-title' }, 'Free actions', h('button', { class: 'x', 'aria-label': 'Close', onclick: () => this.toggleSidebar() }, '×')));
    const list = g.freeActions();
    if (!list.length) this.sidebar.append(h('div', { class: 'agenda-empty' }, 'No actions available.'));
    for (const v of list) {
      const cost = Object.entries(v.action.cost).filter(([, n]) => n).map(([k, n]) => `${n} ${k}`).join(' · ');
      this.sidebar.append(
        h('button', { class: 'fa-item', disabled: !v.available || this.busy, onclick: () => this.startAction(v.action) },
          h('span', { class: 'fa-label' }, v.action.label, v.action.targeted ? h('span', { class: 'fa-target' }, ' ⌖') : null),
          v.action.description ? h('span', { class: 'fa-desc' }, v.action.description) : null,
          h('span', { class: 'fa-cost' }, v.cooldown ? `Available in ${v.cooldown} turn${v.cooldown > 1 ? 's' : ''}` : cost || 'Free')));
    }
  }

  private geoIds() {
    return {
      regions: this.geo.regions.filter((r) => r.kind === 'region').map((r) => r.id),
      countries: [...this.geo.regions.filter((r) => r.kind === 'country').map((r) => r.id), ...Object.keys(OFFMAP)],
    };
  }

  private startAction(a: FreeAction) {
    const g = this.game!;
    if (!a.targeted) {
      this.runAction(a.id);
      return;
    }
    const valid = g.validTargets(a, this.geoIds());
    if (!valid.length) {
      this.flash('There is nowhere to do that right now.');
      return;
    }
    this.targeting = a;
    this.hideInfo();
    this.sidebar.classList.remove('open');
    this.map.setTargeting(valid);
    clear(this.banner);
    this.banner.append(h('span', {}, `${a.label}: choose a target on the map`), h('button', { class: 'btn ghost', onclick: () => this.cancelTargeting() }, 'Cancel (Esc)'));
    this.banner.hidden = false;
  }

  private cancelTargeting() {
    this.targeting = null;
    this.map.setTargeting(null);
    this.banner.hidden = true;
  }

  private finishTargeting(id: string) {
    const a = this.targeting;
    this.cancelTargeting();
    if (a) this.runAction(a.id, id);
  }

  private runAction(id: string, target?: string) {
    const g = this.game!;
    const r = g.doFreeAction(id, target);
    if (!r) return;
    this.flash(r.text);
    saveGame(g.state);
    this.refresh();
    if (r.scene && g.scene(r.scene)) void this.playScene(r.scene, true);
  }

  private flash(text: string) {
    this.toast.textContent = text;
    this.toast.hidden = false;
    this.toast.classList.remove('show');
    void this.toast.offsetWidth;
    this.toast.classList.add('show');
    clearTimeout((this.toast as unknown as { _t?: number })._t);
    (this.toast as unknown as { _t?: number })._t = window.setTimeout(() => (this.toast.hidden = true), 3200);
  }

  private showInfo(id: string, x: number, y: number) {
    const g = this.game;
    if (!g) return;
    const st = g.state;
    clear(this.info);
    const rows: [string, string][] = [];
    let title = id;
    let sub = '';
    const rid = resolveRegion(st, id);
    const cid = rid ? undefined : resolveCountry(st, id);
    if (rid) {
      const r = st.regions[rid]!;
      title = r.name;
      sub = 'Region of Kunasai';
      rows.push(['Approval', pct1(r.approval)], ['Stability', `${stabilityWord(r.stability)} (${int(r.stability)})`], ['Conditions of living', int(r.col)],
        ['Education', int(r.education)], ['Infrastructure', int(r.infrastructure)], ['Economic output', `${money(r.output)} / month`], ['Population', millions(r.population)]);
    } else if (cid) {
      const c = st.countries[cid]!;
      title = c.name;
      sub = c.context ? 'Neighbour' : 'Foreign power';
      rows.push(['Relations', relationWord(c.relation)], ['Trade volume', money(c.trade)], ['Economy', `${int(c.weight)} / 100`], ['Military', militaryWord(c.military)], ['Cultural power', int(c.culturalPower)]);
    } else {
      const shape = this.geo.regions.find((r) => r.id === id);
      title = shape?.name ?? OFFMAP[id]?.name ?? id;
      sub = 'No information';
    }
    const here = g.availableScenes().filter((sc) => sc.meta.location === id);
    this.info.append(
      h('div', { class: 'info-head' }, h('div', {}, h('h3', {}, title), h('div', { class: 'info-sub' }, sub)), h('button', { class: 'x', 'aria-label': 'Close', onclick: () => this.hideInfo() }, '×')),
      h('dl', { class: 'info-rows' }, ...rows.flatMap(([k, v]) => [h('dt', {}, k), h('dd', {}, v)])),
      here.length ? h('div', { class: 'info-events' }, ...here.map((sc) => h('button', { class: 'btn small', disabled: g.isLocked(sc), onclick: () => void this.playScene(sc.id) }, sc.meta.title))) : '',
    );
    this.info.hidden = false;
    const w = 280;
    const left = Math.min(window.innerWidth - w - 16, Math.max(16, x + 18));
    const top = Math.min(window.innerHeight - 340, Math.max(70, y - 40));
    this.info.style.left = `${left}px`;
    this.info.style.top = `${top}px`;
    this.map.setSelected(id);
  }

  private hideInfo() {
    this.info.hidden = true;
    this.map.setSelected(null);
  }

  // ---------------------------------------------------------------- scenes & turns

  private async autoStart() {
    const g = this.game;
    if (!g || this.busy) return;
    const f = g.forcedScene();
    if (f) {
      await new Promise((r) => setTimeout(r, this.settings.transitions ? 600 : 0));
      if (this.game === g && !this.busy) await this.playScene(f.id);
    }
  }

  async playScene(id: string, force = false) {
    const g = this.game;
    if (!g || this.busy) return;
    const sc = g.scene(id);
    if (!sc || (!force && (!g.isAvailable(sc) || g.isLocked(sc)))) return;
    this.busy = true;
    this.hideInfo();
    this.cancelTargeting();
    this.layer.classList.add('hidden-ui');
    let current: string | undefined = id;
    try {
      while (current) {
        const s = g.scene(current);
        if (!s) break;
        const runner = g.startScene(current);
        const next = await this.vn.play(runner, s.meta.title);
        g.completeScene(current);
        for (const w of runner.warnings) console.warn(`[scene ${current}]`, w);
        current = next;
      }
      await this.vn.close();
    } finally {
      this.busy = false;
      this.layer.classList.remove('hidden-ui');
      saveGame(g.state);
      this.refresh();
    }
    void this.autoStart();
  }

  private async endTurn() {
    const g = this.game;
    if (!g || !g.canEndTurn() || this.busy) return;
    this.busy = true;
    this.hideInfo();
    this.cancelTargeting();
    const res = g.endTurn();
    this.layer.classList.add('hidden-ui');
    if (res.edition.papers.length) {
      await showNewspaper(this.root, res.edition, res.ended ? 'The term goes on — to be continued.' : `Next: ${g.state.dateLabel}`);
    }
    this.layer.classList.remove('hidden-ui');
    this.busy = false;
    saveGame(g.state);
    if (res.ended) {
      await this.showEnd();
      return;
    }
    this.refresh();
    void this.autoStart();
  }

  private async showEnd() {
    this.layer.hidden = true;
    this.map.el.classList.add('dim');
    const el = h('div', { class: 'title-screen overlay open' },
      h('div', { class: 'title-card paper' },
        h('div', { class: 'title-kicker' }, this.game?.state.dateLabel ?? ''),
        h('h1', { class: 'title-name small' }, 'To be continued'),
        h('div', { class: 'title-sub' }, 'This is as far as the story goes for now.'),
        h('div', { class: 'title-buttons' }, h('button', { class: 'btn primary', onclick: () => { el.remove(); this.game = null; this.showTitle(); } }, 'Back to title'))));
    this.root.append(el);
  }
}
