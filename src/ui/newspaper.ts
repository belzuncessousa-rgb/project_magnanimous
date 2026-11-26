// Presidential tablet: digital news outlets from the existing end-of-turn edition.
import type { Edition } from '../game/game';
import { clear, h, inlineMd } from './dom';

export function showNewspaper(root: HTMLElement, edition: Edition, footer: string): Promise<void> {
  return new Promise((resolve) => {
    const apps = h('div', { class: 'np-apps', role: 'tablist', 'aria-label': 'Tablet apps' });
    const tabs = h('div', { class: 'np-tabs', role: 'tablist', 'aria-label': 'News outlets' });
    const sheet = h('article', { class: 'np-sheet paper', id: 'tablet-news', role: 'tabpanel', tabindex: 0 });
    const overlay = h('div', { class: 'newspaper overlay' },
      h('div', { class: 'np-wrap' },
        h('div', { class: 'np-device-head' }, h('span', {}, 'Presidential tablet'), h('span', {}, edition.dateLabel)),
        apps,
        tabs,
        sheet,
        h('div', { class: 'np-footer' },
          h('span', { class: 'np-note' }, footer),
          h('button', { class: 'btn primary', onclick: () => { overlay.classList.remove('open'); setTimeout(() => { overlay.remove(); resolve(); }, 350); } }, 'Continue ▸'))));

    let activeApp: 'news' | 'social' = 'news';
    const setApp = (app: 'news' | 'social') => {
      activeApp = app;
      for (const button of [...apps.querySelectorAll<HTMLButtonElement>('button')]) {
        const selected = button.dataset.app === app;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
      }
      tabs.hidden = app !== 'news' || edition.papers.length < 2;
      if (app === 'social') renderSocial();
      else render(activeIndex);
    };
    let activeIndex = 0;
    const renderSocial = () => {
      sheet.removeAttribute('aria-labelledby');
      sheet.scrollTop = 0;
      clear(sheet);
      sheet.className = 'np-sheet np-social';
      const posts = edition.papers.flatMap(({ paper, items }) => items.map((item) => ({ paper, item })));
      sheet.append(
        h('header', { class: 'np-social-head' },
          h('div', { class: 'np-social-kicker' }, 'PUBLIC CONVERSATION'),
          h('h2', {}, 'The feed'),
          h('p', {}, 'Stories from today’s papers, as they appear in the news edition.')),
        posts.length
          ? h('div', { class: 'np-posts' }, ...posts.map(({ paper, item }) =>
              h('article', { class: 'np-post' },
                h('div', { class: 'np-post-source' }, h('span', { class: 'np-source-mark', 'aria-hidden': 'true' }, '◌'), h('span', {}, paper.name), h('span', { class: 'np-source-label' }, 'NEWSROOM')),
                h('h3', { html: inlineMd(item.headline) }),
                item.text ? h('div', { class: 'np-body', html: inlineMd(item.text) }) : null)))
          : h('p', { class: 'np-empty' }, 'No new stories in this edition.'),
      );
    };
    const render = (i: number) => {
      activeIndex = i;
      if (activeApp !== 'news') return;
      const p = edition.papers[i];
      if (!p) return;
      for (const [j, t] of [...tabs.querySelectorAll('button')].entries()) {
        t.classList.toggle('active', j === i);
        t.setAttribute('aria-selected', String(j === i));
        t.tabIndex = j === i ? 0 : -1;
      }
      sheet.setAttribute('aria-labelledby', `tablet-outlet-${i}`);
      sheet.scrollTop = 0;
      clear(sheet);
      sheet.className = `np-sheet paper paper-${p.paper.id}`;
      const [lead, ...rest] = p.items;
      sheet.append(
        h('header', { class: 'np-masthead' },
          h('div', { class: 'np-name' }, p.paper.name),
          h('div', { class: 'np-dateline' },
            h('span', {}, p.paper.tagline),
            h('span', {}, edition.dateLabel),
            h('span', {}, p.paper.slant))),
        lead
          ? h('section', { class: 'np-lead' },
              h('h2', { html: inlineMd(lead.headline) }),
              lead.text ? h('div', { class: 'np-body', html: inlineMd(lead.text) }) : null)
          : '',
        rest.length
          ? h('section', { class: 'np-rest' },
              ...rest.map((it) => h('div', { class: 'np-item' }, h('h3', { html: inlineMd(it.headline) }), it.text ? h('div', { class: 'np-body', html: inlineMd(it.text) }) : null)))
          : '',
      );
    };
    apps.append(
      h('button', { class: 'np-app active', role: 'tab', 'aria-selected': 'true', tabindex: 0, 'data-app': 'news', onclick: () => setApp('news') }, 'News'),
      h('button', { class: 'np-app', role: 'tab', 'aria-selected': 'false', tabindex: -1, 'data-app': 'social', onclick: () => setApp('social') }, 'Social'),
    );
    apps.addEventListener('keydown', event => {
      const buttons = [...apps.querySelectorAll<HTMLButtonElement>('button')];
      const current = buttons.findIndex(button => button === event.target);
      if (current < 0) return;
      let next: number;
      switch (event.key) {
        case 'ArrowRight': next = (current + 1) % buttons.length; break;
        case 'ArrowLeft': next = (current - 1 + buttons.length) % buttons.length; break;
        case 'Home': next = 0; break;
        case 'End': next = buttons.length - 1; break;
        default: return;
      }
      event.preventDefault();
      setApp(buttons[next]!.dataset.app as 'news' | 'social');
      buttons[next]?.focus();
    });
    edition.papers.forEach((p, i) => {
      tabs.append(h('button', {
        class: 'np-tab', role: 'tab', id: `tablet-outlet-${i}`, 'aria-controls': sheet.id,
        onclick: () => render(i),
      }, p.paper.name));
    });
    tabs.addEventListener('keydown', event => {
      const buttons = [...tabs.querySelectorAll('button')];
      const current = buttons.findIndex(button => button === event.target);
      if (current < 0) return;
      let next: number;
      switch (event.key) {
        case 'ArrowRight': next = (current + 1) % buttons.length; break;
        case 'ArrowLeft': next = (current - 1 + buttons.length) % buttons.length; break;
        case 'Home': next = 0; break;
        case 'End': next = buttons.length - 1; break;
        default: return;
      }
      event.preventDefault();
      render(next);
      buttons[next]?.focus();
    });
    root.append(overlay);
    render(0);
    if (!edition.papers.length) {
      tabs.hidden = true;
      sheet.removeAttribute('role');
      sheet.append(h('p', { class: 'np-empty' }, 'No new articles in this edition.'));
    }
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('open')));
  });
}
