import { describe, expect, it } from 'vitest';
import { buildContent, normalizeProjects } from '../src/content/schema';
import { rawContentFiles } from '../src/content/loader';
import { deskProjects, projectDocuments, projectStatus } from '../src/ui/projects';

describe('great projects (content/projects.json)', () => {
  it('normalizes leniently: optional costs/phases, string numbers, missing flag skipped', () => {
    const warns: string[] = [];
    const out = normalizeProjects({ projects: [
      { id: 'a', flag: '4', name: 'Rail', cost_once: '12.5', phases: [{ name: 'Survey', flag: 'rail_survey' }, { title: '' }] },
      { id: 'b', name: 'No flag' },
      { id: 'c', great_project: 6, title: 'Works', paused_flag: 'project_paused' },
    ] }, (m) => warns.push(m));
    expect(out.map((p) => p.id)).toEqual(['a', 'c']);
    expect(out[0]).toMatchObject({ flag: 4, name: 'Rail', costOnce: 12.5, phases: [{ name: 'Survey', flag: 'rail_survey' }] });
    expect(out[0]!.costPerPeriod).toBeUndefined();
    expect(out[1]).toMatchObject({ flag: 6, name: 'Works', pausedFlag: 'project_paused', phases: [] });
    expect(warns).toHaveLength(1);
    expect(normalizeProjects(undefined, () => {})).toEqual([]);
  });

  it('loads the three chapter-1 projects and picks the folder from flags', () => {
    const c = buildContent(rawContentFiles());
    expect(c.projects.map((p) => p.flag).sort()).toEqual([1, 4, 6]);
    const list = deskProjects(c.projects, { great_project: 6 });
    expect(list.map((p) => p.id)).toEqual(['sanitation']);
    expect(projectStatus(list[0]!, { great_project: 6, project_paused: true })).toBe('Paused');
    expect(projectStatus(list[0]!, { great_project: 6 })).toBe('Under way');
    expect(deskProjects(c.projects, {})).toEqual([]);
    expect(projectDocuments(list[0]!, c.popups).map((r) => r.id)).toContain('r9-tamarin-pipe');
  });
});
