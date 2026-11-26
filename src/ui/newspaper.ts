// Presidential tablet: digital news outlets from the existing end-of-turn edition.
import type { Edition } from '../game/game';
import { clear, h, inlineMd } from './dom';

export function showNewspaper(root: HTMLElement, edition: Edition, footer: string): Promise<void> {
  return new Promise((resolve) => {
    const tabs = h('div', { class: 'np-tabs', role: 'tablist' });
    const sheet = h('article', { class: 'np-sheet paper' });
    const overlay = h('div', { class: 'newspaper overlay' },
      h('div', { class: 'np-wrap' },
        h('div', { class: 'np-device-head' }, h('span', {}, 'Presidential tablet'), h('span', {}, edition.dateLabel)),
        tabs,
        sheet,
        h('div', { class: 'np-footer' },
          h('span', { class: 'np-note' }, footer),
          h('button', { class: 'btn primary', onclick: () => { overlay.classList.remove('open'); setTimeout(() => { overlay.remove(); resolve(); }, 350); } }, 'Continue ▸'))));

    const render = (i: number) => {
      const p = edition.papers[i];
      if (!p) return;
      for (const [j, t] of [...tabs.children].entries()) {
        t.classList.toggle('active', j === i);
        t.setAttribute('aria-selected', String(j === i));
      }
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
    edition.papers.forEach((p, i) => {
      tabs.append(h('button', { class: 'np-tab', role: 'tab', onclick: () => render(i) }, p.paper.name));
    });
    root.append(overlay);
    render(0);
    if (!edition.papers.length) sheet.append(h('p', { class: 'np-empty' }, 'No new articles in this edition.'));
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('open')));
  });
}
