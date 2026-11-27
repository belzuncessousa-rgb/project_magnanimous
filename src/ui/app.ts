// Top-level UI controller: title ↔ rest state (map) ↔ VN mode ↔ presidential tablet.
import { resolveCountry, resolveRegion } from '../core/ids';
import type { ContentBundle, FreeAction, Popup } from '../content/schema';
import { validateContent } from '../content/validate';
import { Game, type Edition } from '../game/game';
import { deleteSave, loadGame, loadSettings, saveGame, saveSettings, type Settings } from '../game/save';
import { clear, h } from './dom';
import { costText, int, militaryWord, millions, money, pct1, relationWord, stabilityWord } from './format';
import { Hud } from './hud';
import { MapView, OFFMAP, type Geometry, type MarkerSpec } from './map';
import { showBudget, showDebt, showVote } from './screens';
import { showTablet, type TabletApp, type TabletOptions } from './tablet';
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
  private info = h('div', { class: 'info-panel paper', hidden: true });
  private endBtn = h('button', { class: 'btn primary end-turn' }, 'End turn');
  private endNote = h('div', { class: 'end-note' });
  private banner = h('div', { class: 'target-banner', hidden: true });
  private toast = h('div', { class: 'toast', hidden: true });
  private titleScreen: HTMLElement | null = null;
  private targeting: FreeAction | null = null;
  private latestEdition: Edition | null = null;
  private busy = false;
  private hasTutorial = false;
  private card = h('div', { class: 'readable-card paper', hidden: true });
  private tip = h('div', { class: 'ui-tip', id: 'ui-tip', role: 'tooltip', hidden: true });

  constructor(
    private root: HTMLElement,
    private content: ContentBundle,
    private geo: Geometry,
  ) {
    let mapScaleText: HTMLElement | null = null;
    this.map = new MapView(geo, {
      onSelect: (id, x, y) => this.showInfo(id, x, y),
      onMarker: (id) => void this.playScene(id),
      onTarget: (id) => this.finishTargeting(id),
      onBackground: () => { this.hideInfo(); this.hideCard(); },
      onReadable: (id, x, y) => this.showReadable(id, x, y),
      onTablet: () => this.openTablet(),
      onScaleChange: (scale) => {
        this.settings.mapView = scale === 'kunasai' ? 'terrain' : 'political';
        saveSettings(this.settings);
        if (mapScaleText) mapScaleText.textContent = this.map.getScaleLabel();
      },
    });
    this.map.setView(this.settings.mapView);
    const player = content.world.actors.find((a) => a.id === 'lara' || /vento/i.test(a.name));
    this.vn = new VNView(() => this.game!.state, { transitions: this.settings.transitions, playerId: player?.id ?? 'lara' }, {
      onUi: (action, arg) => this.openScreen(action, arg),
      onHighlight: (ids) => this.setHighlight(ids),
      showCosts: () => this.tutorialDone(),
    });
    // a content set without a tutorial never hides costs
    this.hasTutorial = content.scenes.some((sc) => sc.source !== undefined && JSON.stringify(sc.beats).includes('tutorial_done'));
    this.applySettings();

    mapScaleText = h('strong', { 'aria-live': 'polite' }, this.map.getScaleLabel());
    const mapControls = h('div', { class: 'map-controls', role: 'group', 'aria-label': 'Map navigation controls', 'data-ui': 'map-toggle' },
      h('div', { class: 'map-scale-status' }, h('span', {}, 'MAP SCALE'), mapScaleText),
      h('div', { class: 'map-zoom-control' },
        h('button', { 'aria-label': 'Zoom out', title: 'Zoom out to the strategy table', onclick: () => this.map.zoomBy(1 / 1.4) }, '−'),
        h('button', { 'aria-label': 'Fit Arvain', title: 'Fit the continent', onclick: () => this.map.resetZoom() }, 'Fit'),
        h('button', { 'aria-label': 'Zoom in', title: 'Zoom in to Kunasai', onclick: () => this.map.zoomBy(1.4) }, '+')));
    const topLeft = h('div', { class: 'top-left', role: 'group', 'aria-label': 'Game controls' },
      h('button', { class: 'btn ghost', onclick: () => this.openMenu() }, '☰ Menu'),
      h('button', { class: 'btn ghost', 'data-ui': 'actions', 'data-tip': 'Free actions: rallies, envoys, calls — they cost resources', onclick: () => this.toggleSidebar() }, 'Actions'));
    this.endBtn.dataset.ui = 'end-turn';
    this.endBtn.addEventListener('click', () => void this.endTurn());
    const bottomRight = h('div', { class: 'bottom-right' }, this.endNote, this.endBtn);
    this.layer.append(topLeft, this.hud.el, this.sidebar, mapControls, bottomRight, this.info, this.card, this.banner, this.toast);
    this.hud.el.hidden = false;
    root.append(this.map.el, this.layer, this.vn.el, this.tip);
    this.bindTooltips();

    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        if (this.targeting) this.cancelTargeting();
        else if (!this.card.hidden) this.hideCard();
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

  // ---------------------------------------------------------------- title

  showTitle() {
    this.layer.hidden = true;
    this.map.el.classList.add('dim');
    const save = loadGame();
    const cont = h('button', { class: 'btn', disabled: !save, onclick: () => this.continueGame() }, 'Continue');
    this.titleScreen?.remove();
    this.titleScreen = h('div', { class: 'title-screen overlay open' },
      h('div', { class: 'title-card paper' },
        h('img', { class: 'title-emblem', src: 'identity/kunasai-arms.svg', alt: 'Coat of arms of Kunasai' }),
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
  }

  private modal(title: string, body: HTMLElement, onClose?: () => void): HTMLElement {
    const previousFocus = document.activeElement as HTMLElement | null;
    const close = () => {
      if (!m.isConnected) return;
      m.remove();
      onClose?.();
      if (previousFocus?.isConnected) previousFocus.focus();
    };
    const m = h('div', {
      class: 'modal overlay open', role: 'dialog', 'aria-modal': 'true', 'aria-label': title, tabindex: -1,
      onclick: (ev: Event) => { if (ev.target === m) close(); },
    },
      h('div', { class: 'modal-card paper' },
        h('div', { class: 'modal-head' }, h('h2', {}, title), h('button', { class: 'x', 'aria-label': 'Close', onclick: close }, '×')),
        body));
    m.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = [...m.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])')];
      if (!focusables.length) { event.preventDefault(); m.focus(); return; }
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    this.root.append(m);
    requestAnimationFrame(() => {
      const initial = m.querySelector<HTMLElement>('.menu-buttons button:not(:disabled)')
        ?? m.querySelector<HTMLElement>('.settings select:not(:disabled)')
        ?? m.querySelector<HTMLElement>('.settings input:not(:disabled)')
        ?? m.querySelector<HTMLElement>('.btn.primary:not(:disabled)')
        ?? m.querySelector<HTMLElement>('.x');
      initial?.focus();
    });
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
    const option = (icon: string, title: string, detail: string, onclick: () => void, extraClass = '') =>
      h('button', { class: `menu-option${extraClass ? ` ${extraClass}` : ''}`, onclick },
        h('span', { class: 'menu-option-icon', 'aria-hidden': 'true' }, icon),
        h('span', { class: 'menu-option-copy' }, h('strong', {}, title), h('small', {}, detail)),
        h('span', { class: 'menu-option-arrow', 'aria-hidden': 'true' }, '›'));
    const body = h('div', { class: 'menu-buttons' },
      h('div', { class: 'menu-section-label' }, 'SESSION'),
      option('↗', 'Resume', 'Return to the map', () => m.remove()),
      option('▣', 'Save', 'Keep your current progress', () => { if (this.game) saveGame(this.game.state); this.flash('Game saved.'); m.remove(); }),
      h('div', { class: 'menu-section-label menu-section-secondary' }, 'PREFERENCES'),
      option('☷', 'Settings', 'Text and display options', () => { m.remove(); this.openSettings(); }),
      option('⇱', 'Save & quit to title', 'Save before leaving this session', () => { if (this.game) saveGame(this.game.state); m.remove(); this.game = null; this.showTitle(); }, 'menu-option-quit'));
    m = this.modal('Menu', body);
  }

  private openTablet() {
    const g = this.game;
    if (!g || this.busy) return;
    this.hideInfo();
    this.hideCard();
    this.sidebar.classList.remove('open');
    void showTablet(this.root, this.tabletOptions(this.latestEdition ?? this.publishedEdition()));
  }

  private tabletOptions(edition: Edition, initialApp: TabletApp = 'home', footer?: string, closeLabel?: string): TabletOptions {
    const g = this.game!;
    const ids = new Set(['lara', ...g.state.completedScenes.flatMap((id) => g.scene(id)?.meta.portraits ?? [])]);
    const people = Object.values(g.state.actors).filter((actor) => actor.kind === 'character' && ids.has(actor.id));
    const seenReports = new Set([...g.state.shownPopups, ...g.state.activePopups]);
    return {
      edition,
      people,
      reports: this.content.popups
        .filter((popup) => popup.kind === 'report' && seenReports.has(popup.id))
        .sort((a, b) => g.state.shownPopups.indexOf(b.id) - g.state.shownPopups.indexOf(a.id))
        .map((popup) => ({ popup, read: g.isRead(popup.id) })),
      initialApp,
      footer,
      closeLabel,
      onOpenReport: (id) => {
        const game = this.game;
        if (!game) return undefined;
        const popup = game.readPopup(id);
        if (popup) {
          saveGame(game.state);
          this.refresh();
        }
        return popup;
      },
    };
  }

  private publishedEdition(): Edition {
    const g = this.game!;
    const printed = this.content.news.filter((item) => g.state.printedNews.includes(item.id));
    const papers = this.content.papers
      .map((paper) => ({ paper, items: printed.filter((item) => item.paper === paper.id).sort((a, b) => a.priority - b.priority) }))
      .filter((entry) => entry.items.length > 0);
    const unknown = printed.filter((item) => !this.content.papers.some((paper) => paper.id === item.paper));
    if (unknown.length) papers.push({ paper: { id: 'wire', name: 'Wire Services', slant: '', tagline: '' }, items: unknown });
    return { dateLabel: g.state.dateLabel, papers };
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
    // Forced-order scenes appear as map markers only after earlier scenes are completed.
    const markers: MarkerSpec[] = scenes.filter((sc) => !g.isLocked(sc)).map((sc) => ({
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
      g.activePopups().map((p) => ({ id: `${g.state.turnIndex}:${p.id}`, title: p.title, kind: p.kind, read: g.isRead(p.id), at: this.map.locate(p.location) ?? this.map.locate('capital')! })),
    );
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
    this.sidebar.append(h('h2', { class: 'panel-title' }, 'Free actions', h('button', { class: 'x', 'aria-label': 'Close', onclick: () => this.toggleSidebar() }, '×')));
    const list = g.freeActions();
    if (!list.length) this.sidebar.append(h('div', { class: 'fa-empty' }, 'No actions available.'));
    for (const v of list) {
      const cost = costText(v.action.cost);
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
    if (id === 'kunasai') {
      const regions = Object.values(st.regions);
      title = 'Kunasai';
      sub = 'Republic · national overview';
      rows.push(['Regions', String(regions.length)],
        ['Population', millions(regions.reduce((sum, region) => sum + region.population, 0))],
        ['Economic output', `${money(regions.reduce((sum, region) => sum + region.output, 0))} / month`]);
    } else if (rid) {
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

  // ---------------------------------------------------------------- readables, tutorial, tooltips, screens

  private showReadable(id: string, x: number, y: number) {
    const g = this.game;
    if (!g || this.busy) return;
    const p = g.readPopup(id);
    if (!p) return;
    this.hideInfo();
    clear(this.card);
    const KIND: Record<string, string> = { reaction: 'Reaction', note: 'Note', report: 'Report', incident: 'Incident', popup: 'Dispatch' };
    this.card.className = `readable-card paper kind-${p.kind}`;
    if (p.kind === 'report') {
      this.card.append(h('div', { class: 'report-letterhead' },
        h('img', { src: 'identity/kunasai-arms.svg', alt: '' }), 'Republic of Kunasai'));
    }
    this.card.append(
      h('div', { class: 'info-head' },
        h('div', {}, h('div', { class: 'info-sub' }, KIND[p.kind] ?? 'Report'), h('h3', {}, p.title ?? '')),
        h('button', { class: 'x', 'aria-label': 'Close', onclick: () => this.hideCard() }, '×')),
      h('p', { class: 'readable-text' }, p.text),
      p.from ? h('div', { class: 'readable-from' }, `— ${p.from}`) : '');
    this.card.hidden = false;
    const w = this.card.offsetWidth;
    const height = this.card.offsetHeight;
    this.card.style.left = `${Math.min(window.innerWidth - w - 16, Math.max(16, x + 16))}px`;
    this.card.style.top = `${Math.min(window.innerHeight - height - 16, Math.max(16, y - 30))}px`;
    saveGame(g.state);
    this.refresh();
  }

  private hideCard() {
    this.card.hidden = true;
  }

  private tutorialDone(): boolean {
    return !this.hasTutorial || this.game?.state.flags.tutorial_done === true;
  }

  private devShowLocked(): boolean {
    if (!import.meta.env.DEV) return false;
    try { return new URLSearchParams(location.search).has('showLocked') || localStorage.getItem('magnanimous.dev.showLocked') === '1'; } catch { return false; }
  }

  /** Tutorial: outline UI elements by `data-ui` id while a block is shown (VN keeps them visible above the dim). */
  private setHighlight(ids: string[]) {
    for (const el of this.root.querySelectorAll('.tut-highlight, .tut-visible')) el.classList.remove('tut-highlight', 'tut-visible');
    this.root.classList.toggle('tutorial-on', ids.length > 0);
    for (const id of ids) {
      for (const el of this.root.querySelectorAll<HTMLElement | SVGElement>(`[data-ui="${id}"]`)) {
        el.classList.add('tut-highlight');
        // keep the top-level panel that contains it visible
        let p: Element | null = el;
        while (p && p.parentElement && p.parentElement !== this.layer && p.parentElement !== this.root) p = p.parentElement;
        p?.classList.add('tut-visible');
      }
    }
  }

  private bindTooltips() {
    const show = (el: HTMLElement) => {
      const t = el.dataset.tip;
      if (!t) return;
      this.tip.textContent = t;
      this.tip.hidden = false;
      for (const described of document.querySelectorAll('[aria-describedby="ui-tip"]')) described.removeAttribute('aria-describedby');
      if (document.activeElement === el) el.setAttribute('aria-describedby', this.tip.id);
      const r = el.getBoundingClientRect();
      const tw = Math.min(300, this.tip.offsetWidth);
      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(window.innerWidth - tw - 8, left));
      const below = r.bottom + 8;
      this.tip.style.left = `${left}px`;
      const above = r.top - this.tip.offsetHeight - 8;
      const focused = document.activeElement === el;
      this.tip.style.top = `${focused && above >= 8 ? above : below + this.tip.offsetHeight > window.innerHeight - 8 ? Math.max(8, above) : below}px`;
    };
    const hide = () => {
      this.tip.hidden = true;
      for (const el of document.querySelectorAll('[aria-describedby="ui-tip"]')) el.removeAttribute('aria-describedby');
    };
    document.addEventListener('mouseover', (ev) => {
      const el = (ev.target as Element).closest<HTMLElement>('[data-tip]');
      if (el) show(el);
      else hide();
    });
    document.addEventListener('focusin', (ev) => {
      const el = (ev.target as Element).closest<HTMLElement>('[data-tip]');
      if (el) show(el);
      else hide();
    });
    document.addEventListener('pointerdown', hide);
  }

  private async openScreen(action: string, arg: string): Promise<void> {
    const g = this.game;
    if (!g) return;
    if (action === 'open' && arg === 'budget') await showBudget(this.root, g.state, this.content.ministries);
    else if (action === 'open' && arg === 'debt') await showDebt(this.root, g.state);
    else if (action === 'vote') await showVote(this.root, g.state, this.content.bills.find((b) => b.id === arg));
    else console.warn(`[ui] unknown screen ${action}: ${arg}`);
    saveGame(g.state);
  }

  private hideInfo() {
    this.info.hidden = true;
    this.map.setSelected(null);
  }

  // ---------------------------------------------------------------- scenes & turns

  async playScene(id: string, force = false) {
    const g = this.game;
    if (!g || this.busy) return;
    const sc = g.scene(id);
    if (!sc || (!force && (!g.isAvailable(sc) || g.isLocked(sc)))) return;
    this.busy = true;
    this.hideInfo();
    this.cancelTargeting();
    this.layer.classList.add('hidden-ui');
    let closingDone = false;
    try {
      // one scene at a time: the player always returns to the map (a `→ scene:` jump unlocks the next marker)
      const runner = g.startScene(id, { showLocked: this.devShowLocked() });
      const next = await this.vn.play(runner, sc.meta.title);
      if (g.turnDef()?.closing === id) closingDone = true;
      g.completeScene(id, next);
      for (const w of runner.warnings) console.warn(`[scene ${id}]`, w);
      await this.vn.close();
    } finally {
      this.setHighlight([]);
      this.busy = false;
      this.layer.classList.remove('hidden-ui');
      saveGame(g.state);
      this.refresh();
    }
    // DATA-SCHEMAS: the turn's closing scene ends the turn when finished
    if (closingDone && g.canEndTurn()) {
      void this.endTurn();
      return;
    }
  }

  private async endTurn() {
    const g = this.game;
    if (!g || !g.canEndTurn() || this.busy) return;
    this.busy = true;
    this.hideInfo();
    this.cancelTargeting();
    const res = g.endTurn();
    if (res.edition.papers.length) this.latestEdition = res.edition;
    this.layer.classList.add('hidden-ui');
    if (res.edition.papers.length) {
      await showTablet(this.root, this.tabletOptions(
        res.edition,
        'news',
        res.ended ? 'The term goes on — to be continued.' : `Next: ${g.state.dateLabel}`,
        'Continue  ›',
      ));
    }
    this.layer.classList.remove('hidden-ui');
    this.busy = false;
    saveGame(g.state);
    if (res.ended) {
      await this.showEnd();
      return;
    }
    this.refresh();
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
