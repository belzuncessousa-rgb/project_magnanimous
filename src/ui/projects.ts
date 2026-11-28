// Great-project folders on the desk (C-40, author direction 2026-11-28, docs/DECISIONS.md "Desk documents").
// Documents carry no explanations and never show effects: names, places, status and known costs only.
import type { Popup, Project } from '../content/schema';
import type { FlagValue } from '../core/types';
import { h } from './dom';
import { letterhead, type DossierPage } from './dossier';
import { bn } from './format';

export type ProjectStatus = 'Under way' | 'Paused' | 'Complete';

const on = (v: FlagValue | undefined) => v !== undefined && v !== false && v !== 0 && v !== '';

/** Projects that have a folder: the chosen one (flag `great_project`) plus any marked complete. */
export function deskProjects(projects: Project[], flags: Record<string, FlagValue>): Project[] {
  const chosen = Number(flags.great_project);
  return projects.filter((p) => p.flag === chosen || (p.completeFlag && on(flags[p.completeFlag])));
}

export function projectStatus(p: Project, flags: Record<string, FlagValue>): ProjectStatus {
  if (p.completeFlag && on(flags[p.completeFlag])) return 'Complete';
  if (p.pausedFlag && on(flags[p.pausedFlag])) return 'Paused';
  return 'Under way';
}

/** Readables whose condition mentions this project (its `great_project` value or one of its own flags). */
export function projectDocuments(p: Project, readables: Popup[]): Popup[] {
  const own = [p.completeFlag, ...p.phases.map((x) => x.flag)].filter((x): x is string => !!x);
  const valueRe = new RegExp(`\\bgreat_project\\s*==\\s*${p.flag}\\b`);
  return readables.filter((r) => r.when && (valueRe.test(r.when) || own.some((f) => new RegExp(`\\b${f}\\b`).test(r.when!))));
}

const OFFICE = 'Ministry of Planning & Development';

function dashboard(p: Project, flags: Record<string, FlagValue>, label: string): DossierPage {
  return {
    tab: label,
    render: () => {
      const status = projectStatus(p, flags);
      const sheet = h('div', { class: 'sheet sheet-project' },
        letterhead(OFFICE),
        h('div', { class: `project-stamp project-stamp-${status.replace(' ', '-').toLowerCase()}` }, status),
        h('h2', { class: 'sheet-title' }, p.name),
        h('p', { class: 'sheet-sub' }, [p.region, p.site].filter(Boolean).join(' — ')));
      if (p.phases.length) {
        sheet.append(h('h3', { class: 'sheet-section' }, 'Phases'),
          h('ul', { class: 'project-phases' }, ...p.phases.map((ph) => {
            const done = status === 'Complete' || (ph.flag ? on(flags[ph.flag]) : false);
            return h('li', { class: done ? 'done' : '' }, h('span', { class: 'project-check', 'aria-hidden': 'true' }), ph.name);
          })));
      }
      const rows: [string, number][] = [];
      if (p.costOnce !== undefined) rows.push(['Once', p.costOnce]);
      if (p.costPerPeriod !== undefined) rows.push(['Per period', p.costPerPeriod]);
      if (rows.length) {
        sheet.append(h('h3', { class: 'sheet-section' }, 'Costs'),
          h('table', { class: 'budget-totals project-costs' }, h('tbody', {}, ...rows.map(([k, v]) => h('tr', {}, h('th', {}, k), h('td', {}, bn(v)))))));
      }
      return sheet;
    },
  };
}

function filed(r: Popup, tab: string): DossierPage {
  return {
    tab,
    render: () => h('div', { class: 'sheet sheet-project sheet-filed' },
      h('p', { class: 'filed-mark' }, 'Filed'),
      h('h2', { class: 'sheet-title' }, r.title ?? ''),
      r.from ? h('p', { class: 'sheet-sub' }, r.from) : '',
      h('p', { class: 'filed-text' }, r.text)),
  };
}

/** Pages of the desk folder: per project a dashboard followed by its filed documents. */
export function projectPages(list: Project[], flags: Record<string, FlagValue>, readables: Popup[]): DossierPage[] {
  const many = list.length > 1;
  return list.flatMap((p) => {
    const docs = projectDocuments(p, readables);
    return [dashboard(p, flags, many ? p.name : 'Dashboard'),
      ...docs.map((r, i) => filed(r, r.title ?? `Document ${i + 1}`))];
  });
}
