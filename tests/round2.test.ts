import { describe, expect, it } from 'vitest';
import { buildContent, type RawFile } from '../src/content/schema';
import { Game } from '../src/game/game';
import { applyBudget, budgetCostPerTurn, currentBudget, projectVote, resolveVote, stanceOf, whipOptions } from '../src/game/politics';
import type { SceneRunner } from '../src/scene/runner';

const world = {
  regions: [{ id: 'ibicui', name: 'Ibicuí', population: 100, approval: 41, stability: 60, output: 600, education: 70, infrastructure: 70 }],
  parties: [
    { id: 'pm', name: 'Popular Movement', seats: 24, opinion: 6, capacity: 60 },
    { id: 'opp', name: 'Order and Progress Party', seats: 20, opinion: 1, capacity: 55 },
    { id: 'cp', name: 'Capital Party', seats: 17, opinion: -4, capacity: 55 },
    { id: 'nf', name: 'National Front', seats: 12, opinion: -6, capacity: 45 },
    { id: 'fff', name: 'Faith and Family Front', seats: 9, opinion: -3, capacity: 35 },
    { id: 'ca', name: 'Civic Alliance', seats: 8, opinion: 0, capacity: 30 },
    { id: 'cv', name: 'Communist Vanguard', seats: 6, opinion: 1, capacity: 25 },
    { id: 'ind', name: 'Independents', seats: 4, opinion: 0, capacity: 10 },
  ],
};

const scene = (id: string, fm: string, body: string) => ({ path: `/content/scenes/${id}.md`, data: `---\nid: ${id}\n${fm}\n---\n${body}` });

function bundle(extra: RawFile[] = []) {
  return buildContent([
    { path: '/content/world.json', data: world },
    {
      path: '/content/chapters.json',
      data: {
        chapters: [
          { id: 1, title: 'One', turns: [{ turn: 1, date: 'Jan', scenes: ['a', 'b'], readables: ['r-note'] }] },
          { id: 2, title: 'Two', turns: [{ turn: 1, date: 'Mar', scenes: ['c'] }, { turn: 2, date: 'May', scenes: [], closing: 'z' }] },
          { id: 3, title: 'Three', turns: [{ turn: 1, date: 'Sep', scenes: ['d'] }] },
          { id: 4, title: 'Four', todo: 'later', turns: [] },
        ],
      },
    },
    scene('a', 'chapter: 1\nturn: 1\nkind: fixed\norder: 1\nlocation: capital', '## x\n\nA.\n\n→ scene:b'),
    scene('b', 'chapter: 1\nturn: 1\nkind: fixed\nlocation: katanai', '## x\n\nB.\n\n→ END'),
    scene('c', 'chapter: 2\nturn: 1\nkind: fixed', '## x\n\nBudget. `[open: budget]`\n\n→ END'),
    scene('z', 'chapter: 2\nturn: 2\nkind: fixed', '## x\n\n1. **Vote** `[vote: reform]`'),
    scene('d', 'chapter: 3\nturn: 1\nkind: fixed', '## x\n\nD.\n\n→ END'),
    scene('crisis-s', 'kind: crisis', '## x\n\nCrisis.\n\n→ END'),
    {
      path: '/content/readables.json',
      data: [{ id: 'r-note', chapter: 1, turn: 1, location: 'katanai', kind: 'note', title: 'A note', from: 'Amanda', text: 'Hi.', flags: { read_note: true } }],
    },
    {
      path: '/content/ministries.json',
      data: [
        {
          id: 'health', name: 'Health', minister: 'x',
          tiers: { cut: { fc_per_turn: 0, effects: '[col -1 @ all]' }, low: { fc_per_turn: 1 }, regular: { fc_per_turn: 2 }, high: { fc_per_turn: 3 } },
          initiatives: [
            { id: 'clinics', name: 'Clinics', summary: '', effects_per_turn: '[col +1 @ all]', once: '[flag: clinics_opened = true]' },
            { id: 'transfers', name: 'Transfers', summary: '', effects_per_turn: '[approval +1 @ all]' },
          ],
        },
      ],
    },
    {
      path: '/content/bills.json',
      data: [{
        id: 'reform', title: 'Reform', summary: '',
        positions: { pm: { base: 0.8 }, opp: { base: -0.2, ifs: [{ when: 'flag.opp_price_1 == 1', delta: 0.5 }] }, cv: 0.3, cp: -0.8, nf: -1, fff: -0.5, ca: 0.1 },
        whip_costs: { ca: '[cost: 1 FC]' },
      }],
    },
    {
      path: '/content/crises.json',
      data: [{ id: 'strikes', scene: 'crisis-s', threshold: 10, from_chapter: 2, signals: [{ at: 5, readable: 'r-signal' }], pressure: [{ expr: 'flag.p', weight: 1 }] }],
    },
    ...extra,
  ]);
}

function play(r: SceneRunner, onUi?: (a: string, arg: string) => void) {
  for (let i = 0; i < 100; i++) {
    const o = r.next();
    if (o.type === 'end') return o;
    if (o.type === 'ui') onUi?.(o.action, o.arg);
    if (o.type === 'choices') r.choose(o.options[0]!.index);
  }
  throw new Error('loop');
}

describe('round 2: turn flow', () => {
  it('a scene jump does not chain: the target becomes available on the map', () => {
    const c = bundle();
    expect(c.warnings).toEqual([]);
    const g = Game.newGame(c);
    expect(g.forcedScene()?.id).toBe('a');
    const out = play(g.startScene('a'));
    expect(out).toEqual({ type: 'end', nextScene: 'b' });
    g.completeScene('a', out.type === 'end' ? out.nextScene : undefined);
    expect(g.availableScenes().map((s) => s.id)).toEqual(['b']);
    expect(g.isLocked(g.scene('b')!)).toBe(false);
  });

  it('readables: pins for the turn, reading sets flags', () => {
    const g = Game.newGame(bundle());
    expect(g.activePopups().map((p) => [p.id, p.kind, p.from])).toEqual([['r-note', 'note', 'Amanda']]);
    expect(g.isRead('r-note')).toBe(false);
    g.readPopup('r-note');
    expect(g.isRead('r-note')).toBe(true);
    expect(g.state.flags.read_note).toBe(true);
  });

  it('chapters 2 and 3 play, closing ends chapter 2, empty chapter 4 ends the story', () => {
    const g = Game.newGame(bundle());
    for (const id of ['a', 'b']) { play(g.startScene(id)); g.completeScene(id); }
    g.endTurn();
    expect([g.state.chapter, g.state.turn, g.state.dateLabel]).toEqual([2, 1, 'Mar']);
    const uis: string[] = [];
    play(g.startScene('c'), (a, arg) => uis.push(`${a}:${arg}`));
    g.completeScene('c');
    expect(uis).toEqual(['open:budget']);
    g.endTurn();
    expect([g.state.chapter, g.state.turn]).toEqual([2, 2]);
    expect(g.availableScenes().map((s) => s.id)).toEqual(['z']);
    expect(g.canEndTurn()).toBe(false);
    play(g.startScene('z'), (a, arg) => uis.push(`${a}:${arg}`));
    g.completeScene('z');
    expect(uis).toContain('vote:reform');
    g.endTurn();
    expect([g.state.chapter, g.state.turn, g.state.dateLabel]).toEqual([3, 1, 'Sep']);
    play(g.startScene('d'));
    g.completeScene('d');
    expect(g.endTurn().ended).toBe(true);
  });

  it('crises (round-2 format): from_chapter, signals publish readables, threshold makes the scene available', () => {
    const g = Game.newGame(bundle());
    g.state.flags.p = 20;
    for (const id of ['a', 'b']) { play(g.startScene(id)); g.completeScene(id); }
    expect(g.endTurn().firedCrises).toEqual([]); // chapter 1: from_chapter 2
    expect(g.availableScenes().map((s) => s.id)).not.toContain('crisis-s');
    g.state.flags.p = 6;
    g.endTurn();
    expect(g.state.crisis.strikes!.steps).toEqual([0]);
    g.state.flags.p = 11;
    play(g.startScene('c'));
    g.completeScene('c');
    const r = g.endTurn();
    expect(r.firedCrises).toEqual(['strikes']);
    expect(g.availableScenes().map((s) => s.id)).toContain('crisis-s');
  });
});

describe('round 2: budget', () => {
  it('tiers, initiative pick for Low, FC per turn, recurring and once effects', () => {
    const c = bundle();
    const g = Game.newGame(c);
    const [health] = c.ministries;
    expect(Object.keys(health!.tiers)).toEqual(['cut', 'low', 'regular', 'high']);
    applyBudget(g.state, c.ministries, { health: { tier: 'low', initiative: 'clinics' } });
    expect(g.state.flags['budget.health']).toBe('low');
    expect(g.state.flags['initiative.clinics']).toBe(true);
    expect(g.state.flags['initiative.transfers']).toBe(false);
    expect(g.state.flags.clinics_opened).toBe(true);
    expect(currentBudget(g.state, c.ministries).health).toEqual({ tier: 'low', initiative: 'clinics' });
    expect(budgetCostPerTurn(c.ministries, currentBudget(g.state, c.ministries))).toBe(1);
    const col = g.state.regions.ibicui!.col;
    g.state.resources.FC = 5;
    for (const id of ['a', 'b']) { play(g.startScene(id)); g.completeScene(id); }
    g.endTurn();
    expect(g.state.regions.ibicui!.col).toBeGreaterThan(col);
    applyBudget(g.state, c.ministries, { health: { tier: 'regular' } });
    expect(g.state.flags['initiative.transfers']).toBe(true);
    applyBudget(g.state, c.ministries, { health: { tier: 'cut' } });
    expect(g.state.flags['initiative.clinics']).toBe(false);
  });
});

describe('round 2: congress votes', () => {
  it('projects stances in words and resolves with whip deals', () => {
    const c = bundle();
    const bill = c.bills[0]!;
    const g = Game.newGame(c);
    const p = projectVote(g.state, bill);
    const by = Object.fromEntries(p.parties.map((x) => [x.party, x.stance]));
    expect(by).toMatchObject({ pm: 'for', opp: 'against', cv: 'leaning', ca: 'undecided', cp: 'against', ind: 'undecided' });
    expect(p.yes).toBe(24 + 6 + 4 + 2);
    expect(stanceOf(0.15)).toBe('leaning');
    expect(whipOptions(bill, 'opp').map((d) => d.id)).toEqual(['small', 'medium-ipi', 'medium-fc', 'high']);
    expect(whipOptions(bill, 'ca')[0]).toMatchObject({ id: 'deal', cost: { FC: 1 } });

    g.state.resources = { PT: 3, FC: 1, IPI: 0, EPI: 1 };
    expect(resolveVote(g.state, bill, { opp: 'high' })).toBeNull(); // unaffordable
    g.state.resources = { PT: 3, FC: 6, IPI: 2, EPI: 1 };
    const r = resolveVote(g.state, bill, { opp: 'high', ca: 'deal' })!;
    expect(r.result).toBe('passed');
    expect(g.state.flags['vote.reform']).toBe('passed');
    expect(g.state.flags['vote.reform.margin']).toBe(r.yes - 50);
    expect(g.state.flags.corruption).toBe(1);
    expect(g.state.flags.opp_ministry_promised).toBe(true);
    expect(g.state.resources.FC).toBe(2);
  });

  it('conditional positions (ifs) and failed / watered results', () => {
    const c = bundle();
    const g = Game.newGame(c);
    g.state.flags.opp_price_1 = 1;
    expect(projectVote(g.state, c.bills[0]!).parties.find((x) => x.party === 'opp')!.stance).toBe('leaning');
    const g2 = Game.newGame(c);
    expect(resolveVote(g2.state, c.bills[0]!, {})!.result).toBe('failed');
    expect(resolveVote(g2.state, c.bills[0]!, { opp: 'small' })!.result).toBe('watered');
  });
});
