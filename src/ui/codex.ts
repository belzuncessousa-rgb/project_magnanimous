import type { Actor } from '../core/types';
import { h, initials } from './dom';

export function showCodex(root: HTMLElement, people: Actor[]) {
  const close = h('button', { class: 'btn primary', autofocus: true }, 'Close');
  const search = h('input', { type: 'search', placeholder: 'Search people', 'aria-label': 'Search people' });
  const empty = h('p', { class: 'codex-empty', role: 'status' });
  const entries = [...people].sort((a, b) => a.name.localeCompare(b.name)).map(person => {
    const avatar = h('span', { class: 'codex-portrait', 'aria-hidden': 'true' }, initials(person.name));
    if (person.portrait) {
      const image = h('img', { alt: '', loading: 'lazy' });
      image.addEventListener('error', () => image.remove());
      image.src = `portraits/${person.portrait}-standing.png`;
      avatar.append(image);
    }
    return h('li', { class: 'codex-entry' }, avatar, h('div', {},
      h('strong', {}, person.name), person.role ? h('div', { class: 'codex-role' }, person.role) : null));
  });
  const dialog = h('dialog', { class: 'codex paper', 'aria-labelledby': 'codex-title' },
    h('header', {}, h('h2', { id: 'codex-title' }, 'Codex'), close),
    ...(entries.length ? [search, h('ul', { class: 'codex-list' }, ...entries)] : []),
    empty);
  const filter = () => {
    const query = search.value.trim().toLocaleLowerCase();
    for (const entry of entries) entry.hidden = !(entry.textContent ?? '').toLocaleLowerCase().includes(query);
    empty.hidden = entries.some(entry => !entry.hidden);
    empty.textContent = entries.length ? 'No matching people.' : 'People appear here as you complete scenes.';
  };
  search.addEventListener('input', filter);
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => dialog.remove());
  root.append(dialog);
  filter();
  dialog.showModal();
}
