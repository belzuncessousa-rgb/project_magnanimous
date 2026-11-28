import type { Actor } from '../core/types';
import type { Popup } from '../content/schema';
import type { Edition } from '../game/game';
import { clear, h, initials, inlineMd } from './dom';
import { loadPortrait } from './portraits';

export type TabletApp = 'home' | 'news' | 'social' | 'codex' | 'reports';

/** Where the tablet was left: the app plus the page inside it, so the device reopens (and rests) exactly there. */
export interface TabletPage {
  app: TabletApp;
  newsIndex?: number;
  reportId?: string;
  personId?: string;
  query?: string;
  scroll?: number;
}

export interface TabletReport {
  popup: Popup;
  read: boolean;
}

export interface TabletOptions {
  edition: Edition;
  people: Actor[];
  reports: TabletReport[];
  onOpenReport(id: string): Popup | undefined;
  initialApp?: TabletApp;
  /** Restores the page within the app as well (outlet, open report, Codex search, scroll). Wins over initialApp. */
  initialPage?: TabletPage;
  footer?: string;
  closeLabel?: string;
  /** Build the device and report its screen through onAppChange without showing it (the resting tablet's face). */
  previewOnly?: boolean;
  /** Portrait stems for a person (Lara follows her cosmetic look); default: standing, seated, legacy master. */
  portraitStems?(person: Actor): string[] | undefined;
  onAppChange?(app: TabletApp, screen: HTMLElement, page: TabletPage): void;
}

const APPS: { id: Exclude<TabletApp, 'home'>; icon: string; name: string }[] = [
  { id: 'news', icon: '▤', name: 'News' },
  { id: 'social', icon: '◉', name: 'Social' },
  { id: 'codex', icon: '✣', name: 'Codex' },
  { id: 'reports', icon: '▧', name: 'Reports' },
];

export function showTablet(root: HTMLElement, options: TabletOptions): Promise<void> {
  return new Promise((resolve) => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const reports = [...options.reports];
    let closing = false;
    let currentApp: TabletApp = 'home';
    let where: TabletPage = { app: 'home' };
    const notify = () => {
      where = { ...where, app: currentApp, scroll: screen.scrollTop };
      options.onAppChange?.(currentApp, screen, where);
    };
    let closeTablet = () => {};
    const close = h('button', { class: 'np-close', 'aria-label': 'Close tablet' }, '×');
    const appNav = h('nav', { class: 'np-app-grid', 'aria-label': 'Tablet apps' });
    const screen = h('main', { class: 'np-screen', tabindex: -1, 'aria-live': 'polite' });
    const closeBottom = h('button', { class: 'np-return', onclick: () => closeTablet() }, options.closeLabel ?? 'Close tablet');
    const overlay = h('div', {
      class: 'newspaper overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Kunasai tablet', tabindex: -1,
    },
      h('section', { class: 'np-wrap' },
        h('div', { class: 'np-camera', 'aria-hidden': 'true' }, h('span', {})),
        h('header', { class: 'np-device-head' },
          h('span', { class: 'np-device-date' }, options.edition.dateLabel),
          h('span', { class: 'np-device-status', 'aria-hidden': 'true' }, h('span', {}, '●'), h('span', {}, '◔'), h('span', { class: 'np-battery' }, '')),
          close),
        h('div', { class: 'np-device-body' }, screen),
        h('footer', { class: 'np-footer' },
          options.footer ? h('span', { class: 'np-note' }, options.footer) : '',
          options.closeLabel ? closeBottom : '')));

    const newsCount = options.edition.papers.reduce((n, paper) => n + paper.items.length, 0);
    const unreadReports = () => reports.filter(({ read }) => !read).length;
    const navEntries = APPS;
    const navButtons = new Map<TabletApp, HTMLButtonElement>();
    for (const app of navEntries) {
      const button = h('button', {
        class: 'np-app-icon-button', 'data-app': app.id, 'aria-current': 'false',
        'aria-label': app.name,
        onclick: () => openApp(app.id),
      }, h('span', { class: `np-app-icon np-icon-${app.id}`, 'aria-hidden': 'true' }, h('img', { src: `tablet/apps/${app.id}.svg`, alt: '', draggable: 'false' })),
      h('span', { class: 'np-app-name' }, app.name));
      const count = app.id === 'reports' ? unreadReports() : app.id === 'news' ? newsCount : 0;
      if (count > 0) button.append(h('span', { class: 'np-app-count', 'data-count': app.id }, String(count)));
      appNav.append(button);
      navButtons.set(app.id, button);
    }

    closeTablet = () => {
      if (closing) return;
      closing = true;
      notify();
      overlay.classList.remove('open');
      window.setTimeout(() => {
        overlay.remove();
        previousFocus?.focus();
        resolve();
      }, 350);
    };
    close.addEventListener('click', closeTablet);

    const openApp = (app: TabletApp) => {
      currentApp = app;
      where = { app };
      for (const [id, button] of navButtons) button.setAttribute('aria-current', String(id === app));
      screen.classList.add('is-switching');
      if (app === 'home') renderHome();
      else if (app === 'news') renderNews(0);
      else if (app === 'social') renderSocial();
      else if (app === 'codex') renderCodex();
      else renderReports();
      screen.scrollTop = 0;
      notify();
      requestAnimationFrame(() => requestAnimationFrame(() => screen.classList.remove('is-switching')));
    };
    const renderAppBar = (id: Exclude<TabletApp, 'home'>) => {
      const app = APPS.find((entry) => entry.id === id)!;
      return h('div', { class: 'np-appbar' },
        h('button', { class: 'np-home-back', 'aria-label': 'Back to home screen', onclick: () => openApp('home') }, '‹'),
        h('span', { class: `np-appbar-icon np-icon-${id}`, 'aria-hidden': 'true' }, h('img', { src: `tablet/apps/${id}.svg`, alt: '', draggable: 'false' })),
        h('strong', {}, app.name),
        h('span', { class: 'np-appbar-date' }, options.edition.dateLabel));
    };

    const renderHome = () => {
      clear(screen);
      screen.append(
        h('section', { class: 'np-home' },
          h('div', { class: 'np-wallpaper' },
            h('img', { class: 'np-wallpaper-flag', src: 'identity/kunasai-flag.svg', alt: '', draggable: 'false' }),
            h('div', { class: 'np-wallpaper-shade', 'aria-hidden': 'true' }),
        ),
          appNav,
        ),
      );
    };

    // ---------------------------------------------------------------- News: a newspaper reader
    const renderNews = (index: number) => {
      clear(screen);
      where.newsIndex = index;
      const paper = options.edition.papers[index];
      const page = h('section', { class: 'np-page np-app-news' });
      page.append(renderAppBar('news'));
      if (!options.edition.papers.length) {
        page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '▤'), h('h2', {}, 'No edition on file'),
          h('p', {}, 'Today’s newspaper is prepared when the sitting closes. Previously published articles will appear here.')));
      } else {
        const tabs = h('nav', { class: 'np-tabs np-outlets', 'aria-label': 'Publications' }, ...options.edition.papers.map((item, i) => h('button', {
          class: `np-tab np-outlet outlet-${item.paper.id}${i === index ? ' active' : ''}`, 'aria-current': String(i === index),
          onclick: () => { renderNews(i); screen.scrollTop = 0; notify(); },
        }, h('span', { class: 'np-outlet-name' }, item.paper.name), h('small', {}, `${item.items.length} ${item.items.length === 1 ? 'story' : 'stories'}`))));
        page.append(tabs);
        if (paper) {
          const [lead, ...rest] = paper.items;
          page.append(h('article', { class: `np-sheet paper paper-${paper.paper.id}` },
            h('header', { class: 'np-masthead' }, h('div', { class: 'np-name' }, paper.paper.name),
              h('div', { class: 'np-dateline' }, paper.paper.tagline ? h('span', {}, paper.paper.tagline) : '', h('span', {}, options.edition.dateLabel))),
            lead ? h('section', { class: 'np-lead' }, h('h2', { html: inlineMd(lead.headline) }), lead.text ? h('div', { class: 'np-body', html: inlineMd(lead.text) }) : '') : '',
            rest.length ? h('section', { class: 'np-rest' }, ...rest.map((item) => h('div', { class: 'np-item' },
              h('h3', { html: inlineMd(item.headline) }), item.text ? h('div', { class: 'np-body', html: inlineMd(item.text) }) : ''))) : '',
          ));
        }
      }
      screen.append(page);
    };

    // ---------------------------------------------------------------- Social: a vertical short-post feed
    const renderSocial = () => {
      clear(screen);
      const posts = options.edition.papers.flatMap(({ paper, items }, paperIndex) => items.map((item) => ({ paper, item, paperIndex })));
      const page = h('section', { class: 'np-page np-social' });
      page.append(renderAppBar('social'));
      if (!posts.length) page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '◉'), h('h2', {}, 'The feed is quiet'),
        h('p', {}, 'Press posts appear here alongside the newspaper edition.')));
      else page.append(h('div', { class: 'np-posts' }, ...posts.map(({ paper, item, paperIndex }) => {
        const plainText = item.text.replace(/\s+/g, ' ').trim();
        const excerpt = plainText.length > 190 ? `${plainText.slice(0, 187).trimEnd()}…` : plainText;
        return h('article', { class: `np-post src-${paper.id}` },
          h('span', { class: 'np-source-mark', 'aria-hidden': 'true' }, initials(paper.name)),
          h('div', { class: 'np-post-content' },
            h('div', { class: 'np-post-source' }, h('span', { class: 'np-account-name' }, paper.name),
              h('span', { class: 'np-source-dot', 'aria-hidden': 'true' }, '·'), h('span', { class: 'np-source-label' }, options.edition.dateLabel)),
            h('h2', { html: inlineMd(item.headline) }), excerpt ? h('p', { html: inlineMd(excerpt) }) : '',
            h('button', { class: 'np-post-open', onclick: () => { openApp('news'); renderNews(paperIndex); notify(); } }, 'Read in the paper'),
          ),
        );
      })));
      screen.append(page);
    };

    // ---------------------------------------------------------------- Codex: a two-pane reference library
    const portraitImage = (person: Actor, cls: string) => {
      const avatar = h('span', { class: cls, 'aria-hidden': 'true' }, initials(person.name));
      if (person.portrait) {
        const image = h('img', { alt: '', loading: 'lazy' });
        avatar.append(image);
        loadPortrait(image, options.portraitStems?.(person) ?? [`${person.portrait}-standing`, `${person.portrait}-seated`, person.portrait]);
      }
      return avatar;
    };
    const renderCodex = () => {
      clear(screen);
      const page = h('section', { class: 'np-page np-codex' });
      page.append(renderAppBar('codex'));
      if (!options.people.length) {
        page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '✣'), h('h2', {}, 'Your Codex is ready'),
          h('p', {}, 'People appear here as you meet them.')));
        screen.append(page);
        return;
      }
      const people = [...options.people].sort((a, b) => a.name.localeCompare(b.name));
      const detail = h('article', { class: 'np-codex-detail', 'aria-live': 'polite' });
      const showPerson = (person: Actor) => {
        where.personId = person.id;
        for (const b of list.querySelectorAll<HTMLElement>('.np-person-entry')) b.setAttribute('aria-current', String(b.dataset.id === person.id));
        clear(detail);
        detail.append(
          portraitImage(person, 'np-codex-portrait'),
          h('div', { class: 'np-codex-card' },
            h('div', { class: 'np-page-kicker' }, 'Codex'),
            h('h1', {}, person.name),
            person.role ? h('p', { class: 'np-codex-role' }, person.role) : '',
          ));
      };
      const search = h('input', { class: 'np-search', type: 'search', placeholder: 'Search people', 'aria-label': 'Search people' });
      const entries = people.map((person) => h('button', {
        class: 'np-person-entry', 'data-id': person.id, 'aria-current': 'false',
        onclick: () => { showPerson(person); notify(); },
      }, portraitImage(person, 'np-person-portrait'), h('span', {}, h('strong', {}, person.name), person.role ? h('small', {}, person.role) : '')));
      const list = h('div', { class: 'np-person-list', role: 'list' }, ...entries);
      const empty = h('p', { class: 'np-search-empty', hidden: true }, 'No matching people.');
      const applyQuery = () => {
        const query = search.value.trim().toLocaleLowerCase();
        where.query = search.value;
        search.setAttribute('value', search.value); // keeps the text in the resting device's mirrored copy
        for (const entry of entries) entry.hidden = !(entry.textContent ?? '').toLocaleLowerCase().includes(query);
        empty.hidden = entries.some((entry) => !entry.hidden);
      };
      search.addEventListener('input', () => { applyQuery(); notify(); });
      if (where.query) { search.value = where.query; applyQuery(); }
      page.append(h('div', { class: 'np-codex-body' },
        h('aside', { class: 'np-codex-index' }, search, list, empty),
        detail));
      screen.append(page);
      showPerson(people.find((p) => p.id === where.personId) ?? people.find((p) => p.id !== 'lara') ?? people[0]!);
    };

    // ---------------------------------------------------------------- Reports: an inbox of formal documents
    const reportDocument = (popup: Popup) => h('div', { class: 'np-report-document' },
      h('div', { class: 'np-report-letterhead' },
        h('img', { src: 'identity/kunasai-arms.svg', alt: '' }),
        h('span', {}, 'Republic of Kunasai'), h('span', {}, 'Office of the Presidency')),
      h('div', { class: 'np-page-kicker' }, 'Official report'), h('h1', {}, popup.title ?? 'Official report'),
      popup.from ? h('div', { class: 'np-report-from' }, `From ${popup.from}`) : '',
      h('div', { class: 'np-report-text' }, popup.text));
    const openReport = (id: string) => {
      // The resting face only shows the report; opening (and marking read) happens on the real device.
      const popup = options.previewOnly ? reports.find((r) => r.popup.id === id)?.popup : options.onOpenReport(id);
      if (!popup) return;
      const item = reports.find((report) => report.popup.id === id);
      if (item) item.read = true;
      const count = appNav.querySelector<HTMLElement>('[data-count="reports"]');
      if (count) {
        count.textContent = String(unreadReports());
        count.hidden = unreadReports() === 0;
      }
      renderReports(id);
    };
    const renderReports = (openId?: string) => {
      clear(screen);
      where.reportId = openId;
      const page = h('section', { class: 'np-page np-reports' });
      page.append(renderAppBar('reports'));
      if (!reports.length) {
        page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '▧'), h('h2', {}, 'No reports on file'),
          h('p', {}, 'Official reports will be collected here when they arrive.')));
        screen.append(page);
        return;
      }
      const open = reports.find((r) => r.popup.id === openId)?.popup;
      page.append(h('div', { class: 'np-reports-body' },
        h('nav', { class: 'np-report-list', 'aria-label': `Official reports, ${unreadReports()} unread` },
          ...reports.map(({ popup, read }) => h('button', {
            class: `np-report-row${read ? ' is-read' : ''}`, 'aria-current': String(popup.id === openId),
            onclick: () => { openReport(popup.id); screen.scrollTop = 0; notify(); },
          }, h('span', { class: 'np-report-state', 'aria-hidden': 'true' }),
          h('span', { class: 'np-report-copy' }, h('strong', {}, popup.title ?? 'Official report'), popup.from ? h('small', {}, popup.from) : '')))),
        h('article', { class: 'np-report-reader' }, open ? reportDocument(open)
          : h('div', { class: 'np-report-placeholder' }, h('img', { src: 'identity/kunasai-arms.svg', alt: '' }), h('p', {}, 'Choose a report to read it.')))));
      screen.append(page);
    };

    closeBottom.addEventListener('click', closeTablet);
    overlay.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closeTablet(); return; }
      if (event.key !== 'Tab') return;
      const items = [...overlay.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)')];
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    });
    if (!options.previewOnly) root.append(overlay);
    const start = options.initialPage ?? { app: options.initialApp ?? 'home' };
    openApp(start.app);
    if (start.app === 'news' && start.newsIndex) renderNews(start.newsIndex);
    if (start.app === 'reports' && start.reportId && reports.some((r) => r.popup.id === start.reportId)) openReport(start.reportId);
    if (start.app === 'codex' && (start.query || start.personId)) {
      where.query = start.query;
      where.personId = start.personId;
      renderCodex();
    }
    // Scroll after the overlay has laid out.
    if (start.scroll) requestAnimationFrame(() => { screen.scrollTop = start.scroll ?? 0; });
    notify();
    if (options.previewOnly) { resolve(); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.classList.add('open');
        const initialFocus = start.app === 'home'
          ? screen.querySelector<HTMLElement>('.np-app-icon-button')
          : screen.querySelector<HTMLElement>('.np-home-back, .np-tab, .np-report-row, .np-person-entry');
        (initialFocus ?? close).focus();
    }));
  });
}

