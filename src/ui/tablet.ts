import type { Actor } from '../core/types';
import type { Popup } from '../content/schema';
import type { Edition } from '../game/game';
import { clear, h, initials, inlineMd } from './dom';

export type TabletApp = 'home' | 'news' | 'social' | 'codex' | 'reports';

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
  footer?: string;
  closeLabel?: string;
}

const APPS: { id: TabletApp; icon: string; name: string; description: string }[] = [
  { id: 'news', icon: '▤', name: 'News', description: 'Newspaper reporting' },
  { id: 'social', icon: '◉', name: 'Social', description: 'Public conversation' },
  { id: 'codex', icon: '✣', name: 'Codex', description: 'People you have met' },
  { id: 'reports', icon: '▧', name: 'Reports', description: 'Official correspondence' },
];

export function showTablet(root: HTMLElement, options: TabletOptions): Promise<void> {
  return new Promise((resolve) => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const reports = [...options.reports];
    let closing = false;
    let closeTablet = () => {};
    const close = h('button', { class: 'np-close', 'aria-label': 'Close tablet' }, '×');
    const appNav = h('nav', { class: 'np-apps', 'aria-label': 'Tablet apps' });
    const screen = h('main', { class: 'np-screen', tabindex: -1, 'aria-live': 'polite' });
    const closeBottom = h('button', { class: 'np-return', onclick: () => closeTablet() }, options.closeLabel ?? 'Close tablet');
    const overlay = h('div', {
      class: 'newspaper overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Presidential tablet', tabindex: -1,
    },
      h('section', { class: 'np-wrap' },
        h('div', { class: 'np-camera', 'aria-hidden': 'true' }, h('span', {})),
        h('header', { class: 'np-device-head' },
          h('div', { class: 'np-device-brand' },
            h('span', { class: 'np-device-emblem', 'aria-hidden': 'true' }, 'K'),
            h('span', {}, h('span', { class: 'np-device-kicker' }, 'REPUBLIC OF KUNASAI'), h('strong', {}, 'Presidential tablet'))),
          h('span', { class: 'np-device-date' }, options.edition.dateLabel),
          close),
        h('div', { class: 'np-device-body' }, appNav, screen),
        h('footer', { class: 'np-footer' }, h('span', { class: 'np-note' }, options.footer ?? 'Executive information desk'), closeBottom)));

    const newsCount = options.edition.papers.reduce((n, paper) => n + paper.items.length, 0);
    const unreadReports = () => reports.filter(({ read }) => !read).length;
    const navEntries: { id: TabletApp; icon: string; name: string }[] = [
      { id: 'home', icon: '⌂', name: 'Home' },
      ...APPS,
    ];
    const navButtons = new Map<TabletApp, HTMLButtonElement>();
    for (const app of navEntries) {
      const button = h('button', {
        class: 'np-app', 'data-app': app.id, 'aria-current': 'false',
        onclick: () => openApp(app.id),
      }, h('span', { class: 'np-app-icon', 'aria-hidden': 'true' }, app.icon), h('span', { class: 'np-app-name' }, app.name));
      if (app.id === 'reports') button.append(h('span', { class: 'np-app-count', 'data-count': 'reports', hidden: unreadReports() === 0 }, String(unreadReports())));
      if (app.id === 'news') button.append(h('span', { class: 'np-app-count', 'data-count': 'news' }, String(newsCount)));
      appNav.append(button);
      navButtons.set(app.id, button);
    }

    closeTablet = () => {
      if (closing) return;
      closing = true;
      overlay.classList.remove('open');
      window.setTimeout(() => {
        overlay.remove();
        previousFocus?.focus();
        resolve();
      }, 350);
    };
    close.addEventListener('click', closeTablet);

    const appCount = (app: TabletApp) => {
      if (app === 'news' || app === 'social') return String(newsCount);
      if (app === 'codex') return String(options.people.length);
      if (app === 'reports') return String(unreadReports());
      return '';
    };
    const openApp = (app: TabletApp) => {
      for (const [id, button] of navButtons) button.setAttribute('aria-current', String(id === app));
      if (app === 'home') renderHome();
      else if (app === 'news') renderNews(0);
      else if (app === 'social') renderSocial();
      else if (app === 'codex') renderCodex();
      else renderReports();
      screen.scrollTop = 0;
    };
    const renderHeader = (section: string, title: string, subtitle: string) => h('header', { class: 'np-page-head' },
      h('div', { class: 'np-page-kicker' }, section), h('h1', {}, title), h('p', {}, subtitle));

    const renderHome = () => {
      clear(screen);
      screen.append(
        h('section', { class: 'np-home' },
          h('div', { class: 'np-page-kicker' }, 'THE EXECUTIVE DESK'),
          h('h1', {}, 'Briefing instruments'),
          h('p', { class: 'np-home-intro' }, 'Press coverage, public conversation, people and official reports in one place.'),
          h('div', { class: 'np-launch-list' }, ...APPS.map((app) => h('button', {
            class: 'np-launch', 'data-app': app.id, onclick: () => openApp(app.id),
          },
            h('span', { class: 'np-launch-icon', 'aria-hidden': 'true' }, app.icon),
            h('span', { class: 'np-launch-copy' }, h('strong', {}, app.name), h('small', {}, app.description)),
            h('span', { class: 'np-launch-count' }, appCount(app.id)),
            h('span', { class: 'np-launch-arrow', 'aria-hidden': 'true' }, '›'),
          ))),
          reports.length
            ? h('aside', { class: 'np-home-reports' },
                h('div', { class: 'np-home-section' }, h('span', {}, 'INCOMING'), h('span', {}, unreadReports() ? `${unreadReports()} UNREAD` : 'UP TO DATE')),
                ...reports.slice(0, 2).map(({ popup, read }) => h('button', {
                  class: `np-report-teaser${read ? ' is-read' : ''}`, onclick: () => openReport(popup.id),
                }, h('span', { class: 'np-report-state', 'aria-hidden': 'true' }, read ? '•' : '◆'),
                h('span', {}, h('strong', {}, popup.title ?? 'Official report'), popup.from ? h('small', {}, popup.from) : ''))))
            : h('div', { class: 'np-home-note' }, 'New reports will be filed here when they reach the presidency.'),
        ),
      );
    };

    const renderNews = (index: number) => {
      clear(screen);
      const paper = options.edition.papers[index];
      const page = h('section', { class: 'np-page' });
      page.append(renderHeader('PRESS ROOM', 'News', 'Coverage from the publications in this edition.'));
      if (!options.edition.papers.length) {
        page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '▤'), h('h2', {}, 'No edition on file'),
          h('p', {}, 'Today’s newspaper is prepared when the sitting closes. Previously published articles will appear here.')));
      } else {
        const tabs = h('nav', { class: 'np-tabs', 'aria-label': 'Publications' }, ...options.edition.papers.map((item, i) => h('button', {
          class: `np-tab${i === index ? ' active' : ''}`, 'aria-current': String(i === index), onclick: () => renderNews(i),
        }, item.paper.name)));
        page.append(tabs);
        if (paper) {
          const [lead, ...rest] = paper.items;
          page.append(h('article', { class: `np-sheet paper paper-${paper.paper.id}` },
            h('header', { class: 'np-masthead' }, h('div', { class: 'np-name' }, paper.paper.name),
              h('div', { class: 'np-dateline' }, h('span', {}, paper.paper.tagline), h('span', {}, options.edition.dateLabel), h('span', {}, paper.paper.slant))),
            lead ? h('section', { class: 'np-lead' }, h('h2', { html: inlineMd(lead.headline) }), lead.text ? h('div', { class: 'np-body', html: inlineMd(lead.text) }) : '') : '',
            rest.length ? h('section', { class: 'np-rest' }, ...rest.map((item) => h('div', { class: 'np-item' },
              h('h3', { html: inlineMd(item.headline) }), item.text ? h('div', { class: 'np-body', html: inlineMd(item.text) }) : ''))) : '',
          ));
        }
      }
      screen.append(page);
    };

    const renderSocial = () => {
      clear(screen);
      const posts = options.edition.papers.flatMap(({ paper, items }, paperIndex) => items.map((item) => ({ paper, item, paperIndex })));
      const page = h('section', { class: 'np-page np-social' });
      page.append(renderHeader('PRESS ROOM · PUBLIC FEED', 'Social', 'Short posts from publications in the news edition. Each post opens its full article.'));
      if (!posts.length) page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '◉'), h('h2', {}, 'The feed is quiet'),
        h('p', {}, 'Press posts appear here alongside the newspaper edition.')));
      else page.append(h('div', { class: 'np-posts' }, ...posts.map(({ paper, item, paperIndex }) => {
        const plainText = item.text.replace(/\s+/g, ' ').trim();
        const excerpt = plainText.length > 190 ? `${plainText.slice(0, 187).trimEnd()}…` : plainText;
        return h('article', { class: 'np-post' },
          h('div', { class: 'np-post-source' }, h('span', { class: 'np-source-mark', 'aria-hidden': 'true' }, initials(paper.name)),
            h('span', { class: 'np-account-name' }, paper.name), h('span', { class: 'np-source-label' }, options.edition.dateLabel)),
          h('h2', { html: inlineMd(item.headline) }), excerpt ? h('p', { html: inlineMd(excerpt) }) : '',
          h('button', { class: 'np-post-open', onclick: () => { openApp('news'); renderNews(paperIndex); } }, 'Read in News  →'),
        );
      })));
      screen.append(page);
    };

    const renderCodex = () => {
      clear(screen);
      const page = h('section', { class: 'np-page np-codex' });
      page.append(renderHeader('REFERENCE', 'Codex', 'People encountered in the story.'));
      if (!options.people.length) {
        page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '✣'), h('h2', {}, 'Your Codex is ready'),
          h('p', {}, 'People appear here as you meet them.')));
      } else {
        const search = h('input', { class: 'np-search', type: 'search', placeholder: 'Search people', 'aria-label': 'Search people' });
        const entries = [...options.people].sort((a, b) => a.name.localeCompare(b.name)).map((person) => {
          const avatar = h('span', { class: 'np-person-portrait', 'aria-hidden': 'true' }, initials(person.name));
          if (person.portrait) {
            const image = h('img', { alt: '', loading: 'lazy' });
            image.addEventListener('error', () => image.remove());
            image.src = `portraits/${person.portrait}-standing.png`;
            avatar.append(image);
          }
          return h('li', { class: 'np-person-entry' }, avatar, h('span', {}, h('strong', {}, person.name), person.role ? h('small', {}, person.role) : ''));
        });
        const list = h('ul', { class: 'np-person-list' }, ...entries);
        const empty = h('p', { class: 'np-search-empty', hidden: true }, 'No matching people.');
        search.addEventListener('input', () => {
          const query = search.value.trim().toLocaleLowerCase();
          for (const entry of entries) entry.hidden = !(entry.textContent ?? '').toLocaleLowerCase().includes(query);
          empty.hidden = entries.some((entry) => !entry.hidden);
        });
        page.append(search, list, empty);
      }
      screen.append(page);
    };

    const openReport = (id: string) => {
      const popup = options.onOpenReport(id);
      if (!popup) return;
      const item = reports.find((report) => report.popup.id === id);
      if (item) item.read = true;
      const count = appNav.querySelector<HTMLElement>('[data-count="reports"]');
      if (count) {
        count.textContent = String(unreadReports());
        count.hidden = unreadReports() === 0;
      }
      clear(screen);
      screen.append(h('section', { class: 'np-page np-report-detail' },
        h('button', { class: 'np-back', onclick: renderReports }, '‹  All reports'),
        h('div', { class: 'np-report-document' },
          h('div', { class: 'np-report-letterhead' }, h('span', {}, 'REPUBLIC OF KUNASAI'), h('span', {}, 'OFFICE OF THE PRESIDENCY')),
          h('div', { class: 'np-page-kicker' }, 'OFFICIAL REPORT'), h('h1', {}, popup.title ?? 'Official report'),
          popup.from ? h('div', { class: 'np-report-from' }, `From ${popup.from}`) : '',
          h('div', { class: 'np-report-text' }, popup.text),
        ),
      ));
    };

    const renderReports = () => {
      clear(screen);
      const page = h('section', { class: 'np-page np-reports' });
      page.append(renderHeader('CORRESPONDENCE', 'Reports', `${reports.length} available · ${unreadReports()} unread`));
      if (!reports.length) page.append(h('div', { class: 'np-empty-state' }, h('span', { 'aria-hidden': 'true' }, '▧'), h('h2', {}, 'No reports on file'),
        h('p', {}, 'Official reports will be collected here when they arrive.')));
      else page.append(h('div', { class: 'np-report-list' }, ...reports.map(({ popup, read }) => h('button', {
        class: `np-report-row${read ? ' is-read' : ''}`, onclick: () => openReport(popup.id),
      }, h('span', { class: 'np-report-state', 'aria-hidden': 'true' }, read ? '•' : '◆'),
      h('span', { class: 'np-report-copy' }, h('strong', {}, popup.title ?? 'Official report'), popup.from ? h('small', {}, popup.from) : ''),
      h('span', { class: 'np-report-chevron', 'aria-hidden': 'true' }, '›')))));
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
    root.append(overlay);
    openApp(options.initialApp ?? 'home');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.classList.add('open');
      navButtons.get(options.initialApp ?? 'home')?.focus();
    }));
  });
}

