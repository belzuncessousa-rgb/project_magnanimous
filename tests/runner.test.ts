import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseScene } from '../src/scene/parser';
import { SceneRunner, type RunnerOutput } from '../src/scene/runner';
import { testState } from './helpers';

const load = (f: string) => parseScene(readFileSync(`tests/fixtures/${f}`, 'utf8'), { filename: f });

/** Advance through prose until choices or end; returns collected prose texts and the stopping output. */
function drain(r: SceneRunner): { texts: string[]; out: RunnerOutput } {
  const texts: string[] = [];
  for (;;) {
    const out = r.next();
    if (out.type === 'prose') texts.push(out.prose.text);
    else return { texts, out };
  }
}

function pick(r: SceneRunner, label: string | RegExp) {
  const out = r.next();
  if (out.type !== 'choices') throw new Error(`expected choices, got ${out.type}`);
  const o = out.options.find((x) => (typeof label === 'string' ? x.choice.label === label : label.test(x.choice.label)));
  if (!o) throw new Error(`no option ${label}; have ${out.options.map((x) => x.choice.label).join(' | ')}`);
  expect(r.choose(o.index)).toBe(true);
}

describe('runner: Inauguration Address', () => {
  it('plays the whole scene through the hub and applies effects', () => {
    const scene = load('inauguration-address.md');
    const s = testState();
    const ibicui0 = s.regions.ibicui!.approval;
    const col0 = s.regions.ibira!.col;
    const r = new SceneRunner(scene, s);

    let d = drain(r);
    expect(d.texts[0]).toMatch(/^As you hear the muffled roar/);
    pick(r, 'You are still in this for them');
    d = drain(r);
    // accompanying thought, then the narration about Mertens, then the thought line
    expect(d.texts[0]).toMatch(/^The work toward a more equal country/);
    expect(d.texts[1]).toMatch(/^You glance at your vice president/);
    expect(s.compass.WELF).toBe(1);
    expect(s.regions.ibira!.col).toBe(col0 + 1);

    pick(r, 'The OPP is a reliable partner, if nothing else');
    expect(s.actors.mertens!.loyalty).toBe(7);
    drain(r);
    pick(r, 'Nod for them to open the doors');
    d = drain(r);
    expect(d.texts[0]).toMatch(/^You step into the sun/);
    expect(r.currentBeat).toBe('balcony-greeting');

    pick(r, '"Sisters and brothers…"');
    expect(s.compass.ECON).toBe(1);
    drain(r);
    pick(r, /^"And the support I was given/);
    expect(s.regions.ibicui!.approval).toBe(ibicui0 + 5);
    drain(r);
    pick(r, /^"We will turn our nation into a powerhouse/);
    expect(s.flags.promised_GDP).toBe(true);
    d = drain(r);
    expect(d.texts[0]).toMatch(/^And in doing so/);
    expect(d.texts[1]).toMatch(/^The square falls into a waiting hush/);
    expect(d.out.type).toBe('choices');
    if (d.out.type === 'choices') expect(d.out.options).toHaveLength(6);

    // topic -> back to the hub (intro is not replayed), option removed
    pick(r, '"Let me speak first of work"');
    d = drain(r);
    expect(d.texts[0]).toMatch(/^Let me speak first of work/);
    pick(r, /^"Prosperity cannot be summoned/);
    d = drain(r);
    expect(d.texts).toHaveLength(1);
    expect(s.compass.ECON).toBe(-1);
    expect(d.out.type).toBe('choices');
    if (d.out.type === 'choices') {
      expect(d.out.options.map((o) => o.choice.label)).not.toContain('"Let me speak first of work"');
      expect(d.out.options).toHaveLength(5);
    }

    pick(r, '"Let me speak of power"');
    drain(r);
    pick(r, '"Power is a tool, never a throne."');
    drain(r);

    pick(r, /^"Thank you for entrusting me/);
    d = drain(r);
    expect(d.texts).toHaveLength(4);
    expect(d.out).toEqual({ type: 'end', nextScene: undefined });
    expect(r.isEnded).toBe(true);
    expect(r.warnings).toEqual([]);
  });

  it('FINISH may be chosen immediately (no minimum topics)', () => {
    const r = new SceneRunner(load('inauguration-address.md'), testState());
    drain(r); pick(r, /still in this/); drain(r); pick(r, /democracy/); drain(r); pick(r, /Nod/);
    drain(r); pick(r, /Dear people/); drain(r); pick(r, /long road/); drain(r); pick(r, /powerhouse\./);
    drain(r); pick(r, /^"Thank you/);
    expect(drain(r).out.type).toBe('end');
  });
});

describe('runner: repo-format fixture', () => {
  it('handles locks, costs, show-if, req, hubs with returns and conditional effects', () => {
    const s = testState();
    s.resources = { PT: 3, FC: 1, IPI: 2, EPI: 1 };
    const r = new SceneRunner(load('repo-format.md'), s);
    let d = drain(r);
    expect(d.texts).toEqual([
      'The Blue Room is colder than you expected.',
      'You wonder if Fontes already knows.',
      'Madam President. I assume you did not call me here to admire the curtains."\nHe smiles thinly.'.replace(/^/, '"'),
      'Let us begin.',
    ]);
    expect(s.flags.entered_blue_room).toBe(true);
    if (d.out.type !== 'choices') throw new Error();
    const byLabel = Object.fromEntries(d.out.options.map((o) => [o.choice.label, o]));
    expect(byLabel['Bribe the clerk']).toBeUndefined(); // show if false
    expect(byLabel['Call in a favour']!.locked).toBe(true); // lock if !met_dara
    expect(byLabel['Spend a long evening']!.affordable).toBe(false);
    expect(byLabel['Ask Salgado']!.locked).toBe(true);
    expect(r.choose(byLabel['Call in a favour']!.index)).toBe(false);
    expect(r.choose(byLabel['Spend a long evening']!.index)).toBe(false);

    pick(r, '"I want the fiscal pact by Friday."');
    expect(s.compass.STRUCT).toBe(1);
    expect(s.actors.mertens!.loyalty).toBe(-1);
    d = drain(r);
    expect(d.texts).toEqual(['"Friday," he repeats.', 'Too fast?', 'Mertens waits for you to choose a topic.']);
    // fell through to "→ hub"
    expect(r.currentBeat).toBe('hub');

    pick(r, 'Gossip');
    expect(s.resources.IPI).toBe(3);
    d = drain(r);
    expect(d.texts).toEqual(['He leans in.']);
    if (d.out.type !== 'choices') throw new Error();
    expect(d.out.options.map((o) => o.choice.label)).toEqual(['Debt', 'Cartels', 'We are done here']);
    expect(s.flags['seen.hub.3']).toBe(true);

    pick(r, 'Debt');
    d = drain(r);
    expect(d.texts).toEqual(['The Fund will not wait.']);
    expect(s.flags.debt_plan).toBe(true); // [if: flag.fiscal_pact] held
    if (d.out.type !== 'choices') throw new Error();
    expect(d.out.options.map((o) => o.choice.label)).toEqual(['Cartels', 'We are done here']);

    pick(r, 'Cartels');
    d = drain(r);
    expect(d.texts).toEqual(['Narration about cartels.']);
    const cap0 = s.actors.cartels!.capacity;
    pick(r, 'Monitor quietly');
    expect(s.actors.cartels!.capacity).toBe(cap0 - 1);
    expect(s.actors.cartels!.suspicion).toBe(5);
    d = drain(r);
    if (d.out.type !== 'choices') throw new Error();
    expect(d.out.options.map((o) => o.choice.label)).toEqual(['We are done here']);
    pick(r, 'We are done here');
    d = drain(r);
    expect(d.texts).toEqual(['You leave the room.']);
    expect(d.out.type).toBe('end');
    expect(s.newsQueue).toEqual([{ paper: 'ledger', id: 'blue-room' }]);
    expect(s.popupQueue).toEqual(['corridor-whispers']);
  });

  it('conditional effects are skipped when the condition fails', () => {
    const s = testState();
    const r = new SceneRunner(load('repo-format.md'), s);
    drain(r);
    pick(r, '"Tell me what we can afford."');
    const d = drain(r);
    expect(d.texts).toEqual(['He opens the folder.', 'Mertens waits for you to choose a topic.']);
    pick(r, 'Debt');
    drain(r);
    expect(s.flags.debt_plan).toBeUndefined();
    pick(r, 'Cartels');
    expect(drain(r).texts).toEqual([]); // conditional narration hidden
    const cap0 = s.actors.cartels!.capacity;
    pick(r, 'Monitor quietly');
    expect(s.actors.cartels!.capacity).toBe(cap0 - 1);
    expect(s.actors.cartels!.suspicion).toBe(0);
  });

  it('costs are paid', () => {
    const s = testState();
    s.flags.corrupt = true;
    s.resources.FC = 5;
    const r = new SceneRunner(load('repo-format.md'), s);
    drain(r);
    pick(r, 'Bribe the clerk');
    expect(s.resources.FC).toBe(3);
  });
});

describe('runner: misc', () => {
  it('scene jumps report nextScene', () => {
    const s = testState();
    const r = new SceneRunner(parseScene('## a\n\nHi.\n\n→ scene:other'), s);
    expect(r.next().type).toBe('prose');
    expect(r.next()).toEqual({ type: 'end', nextScene: 'other' });
  });
  it('a choices step with no visible options is skipped', () => {
    const s = testState();
    const r = new SceneRunner(parseScene('## a\n\n1. **Hidden** `[show if: flag.x]`\n\nAfter.'), s);
    expect(r.next()).toMatchObject({ type: 'prose', prose: { text: 'After.' } });
  });
  it('falls through to the next beat when no target is given', () => {
    const s = testState();
    const r = new SceneRunner(parseScene('## a\n\n1. **Go**\n\n## b\n\nB text.'), s);
    pick(r, 'Go');
    expect(r.next()).toMatchObject({ type: 'prose', prose: { text: 'B text.' } });
    expect(r.next().type).toBe('end');
  });
});
