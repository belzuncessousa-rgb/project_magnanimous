// Desk documents (author direction 2026-11-28, docs/DECISIONS.md "Desk documents"):
// a physical folder that opens over the desk like the tablet and shows one sheet at a time.
//   case   — the formal green document case (final budget; signed at the end)
//   papers — a loose stack of working papers (budget simulation)
//   manila — a practical yellow project folder (great projects)
// Documents carry no explanations: titles, names and costs only. Effects are never shown.
import { clear, h } from './dom';

export type DossierVariant = 'case' | 'papers' | 'manila';

export interface DossierPage {
  /** Short label for the page index tab (e.g. a ministry name). */
  tab: string;
  /** Builds the sheet; called every time the page is shown so it can reflect current choices. */
  render(): HTMLElement;
}

export interface DossierOptions {
  variant: DossierVariant;
  /** Accessible name of the open folder, e.g. "Budget of the Republic". */
  title: string;
  pages: DossierPage[];
  /** Final action on the last page (e.g. "Sign the budget"); omitted = the folder is read-only. */
  finish?: { label: string; onFinish(): void };
  /** Text on the closing button when there is no finish action. */
  closeLabel?: string;
  startPage?: number;
}

/** Open a dossier; resolves true if the finish action was taken, false if it was closed. */
export function showDossier(root: HTMLElement, o: DossierOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    let index = Math.max(0, Math.min(o.pages.length - 1, o.startPage ?? 0));
    let done = false;
    const sheet = h('article', { class: 'dossier-sheet', tabindex: -1, 'aria-live': 'polite' });
    const tabs = h('nav', { class: 'dossier-tabs', 'aria-label': 'Pages' });
    const prev = h('button', { class: 'dossier-turn dossier-prev', 'aria-label': 'Previous page' }, '‹');
    const next = h('button', { class: 'dossier-turn dossier-next', 'aria-label': 'Next page' }, '›');
    const folio = h('span', { class: 'dossier-folio' });
    const finishBtn = o.finish ? h('button', { class: 'dossier-finish' }, o.finish.label) : null;
    const closeBtn = h('button', { class: 'dossier-close', 'aria-label': 'Close' }, '×');
    const shell = h('div', { class: `dossier dossier-${o.variant}`, role: 'dialog', 'aria-modal': 'true', 'aria-label': o.title, tabindex: -1 },
      h('div', { class: 'dossier-object' },
        h('div', { class: 'dossier-cover', 'aria-hidden': 'true' }),
        h('div', { class: 'dossier-stack', 'aria-hidden': 'true' }),
        sheet,
        tabs,
        h('div', { class: 'dossier-foot' }, prev, folio, next, finishBtn ?? ''),
        closeBtn));
    const overlay = h('div', { class: 'dossier-overlay overlay' }, shell);

    const show = (i: number, dir = 0) => {
      index = Math.max(0, Math.min(o.pages.length - 1, i));
      clear(sheet);
      sheet.append(o.pages[index]!.render());
      sheet.classList.remove('turn-fwd', 'turn-back');
      if (dir) { void sheet.offsetWidth; sheet.classList.add(dir > 0 ? 'turn-fwd' : 'turn-back'); }
      sheet.scrollTop = 0;
      for (const [k, t] of [...tabs.children].entries()) t.setAttribute('aria-current', String(k === index));
      folio.textContent = `${index + 1} / ${o.pages.length}`;
      prev.disabled = index === 0;
      next.disabled = index === o.pages.length - 1;
      if (finishBtn) finishBtn.hidden = index !== o.pages.length - 1;
    };
    o.pages.forEach((p, k) => tabs.append(h('button', { class: 'dossier-tab', onclick: () => show(k, k - index) }, p.tab)));

    const close = (finished: boolean) => {
      if (done) return;
      done = true;
      overlay.classList.remove('open');
      window.setTimeout(() => { overlay.remove(); previousFocus?.focus(); resolve(finished); }, 320);
    };
    prev.addEventListener('click', () => show(index - 1, -1));
    next.addEventListener('click', () => show(index + 1, 1));
    closeBtn.addEventListener('click', () => close(false));
    finishBtn?.addEventListener('click', () => { o.finish!.onFinish(); close(true); });
    overlay.addEventListener('click', (ev) => { if (ev.target === overlay) close(false); });
    shell.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') { ev.preventDefault(); close(false); return; }
      if ((ev.target as Element).closest('input, select, textarea')) return;
      if (ev.key === 'ArrowRight' || ev.key === 'PageDown') { ev.preventDefault(); show(index + 1, 1); }
      if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') { ev.preventDefault(); show(index - 1, -1); }
      if (ev.key === 'Tab') {
        const items = [...shell.querySelectorAll<HTMLElement>('button:not(:disabled):not([hidden]), input, select')];
        const first = items[0], last = items.at(-1);
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last?.focus(); }
        else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first?.focus(); }
      }
    });
    root.append(overlay);
    show(index);
    requestAnimationFrame(() => requestAnimationFrame(() => { overlay.classList.add('open'); shell.focus(); }));
  });
}

/** Letterhead used on formal sheets. */
export function letterhead(office: string): HTMLElement {
  return h('header', { class: 'sheet-letterhead' },
    h('img', { src: 'identity/kunasai-arms.svg', alt: '' }),
    h('span', {}, 'Republic of Kunasai'), h('span', {}, office));
}
