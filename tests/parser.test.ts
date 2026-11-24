/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { normalizeMarkup, parseScene } from '../src/scene/parser';
import { parseYamlLite, splitFrontMatter } from '../src/scene/frontmatter';
import type { Choice, Scene, Step } from '../src/scene/types';

const inauguration = () =>
  parseScene(readFileSync('tests/fixtures/inauguration-address.md', 'utf8'), { filename: 'tests/fixtures/inauguration-address.md' });
const repo = () => parseScene(readFileSync('tests/fixtures/repo-format.md', 'utf8'), { filename: 'repo-format.md' });

const choicesOf = (steps: Step[]): Choice[][] => steps.filter((s) => s.type === 'choices').map((s) => (s as { choices: Choice[] }).choices);
const beat = (s: Scene, id: string) => s.beats.find((b) => b.id === id)!;

describe('front-matter', () => {
  it('parses scalars, comments, arrays and block lists', () => {
    const fm = parseYamlLite('id: x   # comment\nn: 3\nb: true\nq: "!flag.a # not comment"\narr: [a, b]\nlist:\n  - one\n  - two\nempty:');
    expect(fm).toEqual({ id: 'x', n: 3, b: true, q: '!flag.a # not comment', arr: ['a', 'b'], list: ['one', 'two'], empty: null });
  });
  it('splits front-matter only when present', () => {
    expect(splitFrontMatter('no front matter').hasFrontMatter).toBe(false);
    const r = splitFrontMatter('---\nid: a\n---\nbody');
    expect(r.meta.id).toBe('a');
    expect(r.body).toBe('body');
  });
});

describe('normalizeMarkup (Notion HTML)', () => {
  it('converts tags and entities', () => {
    expect(normalizeMarkup('<b>x</b> <i>y</i> <code>[+1 WELF]</code> &gt; a<br />b')).toBe('**x** *y* `[+1 WELF]` > a b');
    expect(normalizeMarkup('<!-- notion: x -->text \\~ 300')).toBe('text ~ 300');
  });
});

describe('parser: Inauguration Address (Notion page)', () => {
  const s = inauguration();

  it('derives id/title without front-matter and reports no warnings', () => {
    expect(s.id).toBe('inauguration-address');
    expect(s.meta.title).toBe('Inauguration Address');
    expect(s.warnings).toEqual([]);
  });

  it('builds the expected beats and skips the design-questions section', () => {
    expect(s.beats.map((b) => b.id)).toEqual([
      'opening-behind-the-doors',
      'balcony-greeting',
      'address-priorities-hub',
      'topic-work-econ',
      'topic-power-struct',
      'topic-place-in-the-world-iden',
      'topic-the-people-welf',
      'topic-how-we-stand-force',
      'finish-thank-you-for-entrusting-me-with-this-noble-mission',
    ]);
  });

  it('opening: three interleaved choice groups with narration and a thought between', () => {
    const b = beat(s, 'opening-behind-the-doors');
    expect(b.steps.map((x) => x.type)).toEqual(['prose', 'choices', 'prose', 'prose', 'choices', 'prose', 'choices']);
    const groups = choicesOf(b.steps);
    expect(groups.map((g) => g.length)).toEqual([3, 3, 1]);
    const first = groups[0]![0]!;
    expect(first.label).toBe('You are still in this for them');
    expect(first.spoken).toBe(false);
    expect(first.effects.map((e) => e.effect)).toEqual([
      { type: 'compass', axis: 'WELF', delta: 1 },
      { type: 'region', index: 'col', delta: 1, regions: ['all'] },
    ]);
    expect(first.after).toHaveLength(1);
    expect(first.after[0]!.role).toBe('thought');
    expect(b.steps[3]).toMatchObject({ type: 'prose', prose: { role: 'thought', text: 'You think, a little worried.' } });
    expect(groups[1]![1]!.effects[0]!.effect).toEqual({ type: 'actor', actor: 'OPP', stat: 'capacity', delta: -2 });
    expect(groups[1]![2]!.effects[0]!.effect).toEqual({ type: 'actor', actor: 'Mertens', stat: 'loyalty', delta: 5 });
    expect(groups[2]![0]!.goto).toEqual({ kind: 'beat', beat: 'balcony-greeting' });
  });

  it('balcony: spoken options, Lara speech, multi-region tokens and flags', () => {
    const b = beat(s, 'balcony-greeting');
    const groups = choicesOf(b.steps);
    expect(groups.map((g) => g.length)).toEqual([4, 3, 3]);
    expect(groups[0]!.every((c) => c.spoken)).toBe(true);
    expect(groups[0]![3]!.effects).toEqual([]);
    const speech = b.steps.find((x) => x.type === 'prose' && x.prose.role === 'speech');
    expect(speech).toMatchObject({ prose: { role: 'speech', text: 'We have come a long way in this election.' } });
    expect((speech as { prose: { speaker?: string } }).prose.speaker).toBeUndefined();
    expect(groups[1]![0]!.effects.map((e) => e.effect)).toEqual([
      { type: 'region', index: 'stability', delta: 3, regions: ['national'] },
      { type: 'region', index: 'approval', delta: -5, regions: ['Ibicuí', 'Mognagna', 'Ibira'] },
    ]);
    expect(groups[2]![0]!.effects[0]!.effect).toEqual({ type: 'flag', name: 'promised_CoL', op: '=', value: true });
    expect(groups[2]![0]!.after[0]).toMatchObject({ role: 'speech' });
    expect(groups[2]![0]!.after[0]!.speaker).toBeUndefined();
  });

  it('hub: fuzzy targets resolve, topics are implicitly [once], FINISH is not', () => {
    const b = beat(s, 'address-priorities-hub');
    expect(b.hub).toBe(true);
    const [menu] = choicesOf(b.steps);
    expect(menu!.map((c) => c.goto)).toEqual([
      { kind: 'beat', beat: 'topic-work-econ' },
      { kind: 'beat', beat: 'topic-power-struct' },
      { kind: 'beat', beat: 'topic-place-in-the-world-iden' },
      { kind: 'beat', beat: 'topic-the-people-welf' },
      { kind: 'beat', beat: 'topic-how-we-stand-force' },
      { kind: 'beat', beat: 'finish-thank-you-for-entrusting-me-with-this-noble-mission' },
    ]);
    expect(menu!.map((c) => c.once)).toEqual([true, true, true, true, true, false]);
  });

  it('topics: speech intro, three options with spoken expansions', () => {
    for (const id of ['topic-work-econ', 'topic-power-struct', 'topic-place-in-the-world-iden', 'topic-the-people-welf', 'topic-how-we-stand-force']) {
      const b = beat(s, id);
      expect(b.steps[0]).toMatchObject({ type: 'prose', prose: { role: 'speech' } });
      const [g] = choicesOf(b.steps);
      expect(g).toHaveLength(3);
      for (const c of g!) {
        expect(c.after).toHaveLength(1);
        expect(c.after[0]!.role).toBe('speech');
        expect(c.effects[0]!.effect.type).toBe('compass');
      }
    }
    // inline italics survive inside speech
    const power = beat(s, 'topic-power-struct');
    expect((power.steps[0] as { prose: { text: string } }).prose.text).toContain('*to* you');
  });

  it('finish: designer note with → P1-S2 is ignored', () => {
    const b = beat(s, 'finish-thank-you-for-entrusting-me-with-this-noble-mission');
    expect(b.steps.every((x) => x.type === 'prose')).toBe(true);
    expect(b.steps).toHaveLength(4);
  });
});

describe('parser: repo format', () => {
  const s = repo();

  it('reads front-matter', () => {
    expect(s.id).toBe('test-blue-room');
    expect(s.meta).toMatchObject({ chapter: 1, turn: 2, title: 'The Blue Room', kind: 'briefing', location: 'capital', order: 2, portraits: ['mertens', 'fontes'], background: 'blue-room' });
    expect(s.meta.whenRaw).toBe('!flag.tutorial_skipped && chapter == 1');
    expect(s.meta.when).toBeDefined();
    expect(s.meta.extra.tags).toEqual(['test', 'fixture']);
  });

  it('beat ids with display titles', () => {
    expect(s.beats.map((b) => [b.id, b.title])).toEqual([
      ['opening', 'The Blue Room'],
      ['hub', 'Agenda'],
      ['debt', 'The Debt'],
      ['cartels', 'cartels'],
      ['wrapup', 'wrapup'],
    ]);
    expect(s.warnings).toEqual([]);
  });

  it('prose roles, multi-line speech, designer notes, standalone effects', () => {
    const b = beat(s, 'opening');
    const types = b.steps.map((x) => (x.type === 'prose' ? x.prose.role : x.type));
    expect(types).toEqual(['narration', 'thought', 'speech', 'speech', 'effects', 'choices', 'goto']);
    expect(b.steps[2]).toMatchObject({ prose: { speaker: 'Caio Mertens' } });
    expect((b.steps[2] as { prose: { text: string } }).prose.text).toContain('curtains."\nHe smiles thinly.');
    expect(b.steps[3]).toMatchObject({ prose: { text: 'Let us begin.' } });
    expect(b.steps[6]).toMatchObject({ type: 'goto', target: { kind: 'beat', beat: 'hub' } });
  });

  it('choice tokens: cost/show/lock/req/goto/after', () => {
    const [g] = choicesOf(beat(s, 'opening').steps);
    expect(g).toHaveLength(6);
    expect(g![0]!.after.map((a) => [a.role, a.speaker])).toEqual([['speech', 'Caio Mertens'], ['thought', undefined]]);
    expect(g![1]!.goto).toEqual({ kind: 'beat', beat: 'hub' });
    expect(g![1]!.after[0]!.role).toBe('narration');
    expect(g![2]!.cost).toEqual({ FC: 2 });
    expect(g![2]!.show).toBeDefined();
    expect(g![3]!.lock).toBeDefined();
    expect(g![5]!.req).toHaveLength(1);
  });

  it('hub options with [once], gain and exit', () => {
    const b = beat(s, 'hub');
    expect(b.hub).toBe(true);
    const [g] = choicesOf(b.steps);
    expect(g!.map((c) => c.once)).toEqual([true, true, true, false]);
    expect(g![2]!.effects[0]!.effect).toEqual({ type: 'resource', amounts: { IPI: 1 } });
  });

  it('conditional effects and prose', () => {
    const debt = beat(s, 'debt');
    expect(debt.steps[1]).toMatchObject({ type: 'effects' });
    expect((debt.steps[1] as { effects: { cond?: unknown }[] }).effects[0]!.cond).toBeDefined();
    const cartels = beat(s, 'cartels');
    expect(cartels.steps[0]).toMatchObject({ type: 'prose', prose: { role: 'narration', text: 'Narration about cartels.' } });
    expect((cartels.steps[0] as { prose: { cond?: unknown } }).prose.cond).toBeDefined();
    const [g] = choicesOf(cartels.steps);
    expect(g![0]!.effects[0]!.cond).toBeUndefined();
    expect(g![0]!.effects[1]!.cond).toBeDefined();
  });

  it('END and inline news/pop tokens on narration', () => {
    const w = beat(s, 'wrapup');
    expect(w.steps[0]).toMatchObject({ prose: { text: 'You leave the room.' } });
    expect((w.steps[0] as { prose: { effects: unknown[] } }).prose.effects).toHaveLength(2);
    expect(w.steps[1]).toMatchObject({ type: 'goto', target: { kind: 'end' } });
  });
});

describe('parser: edge cases', () => {
  it('preamble without heading becomes a start beat', () => {
    const s = parseScene('---\nid: a\n---\nHello.\n\n1. **Go** `→ b`\n\n## b\n\nBye.');
    expect(s.beats.map((b) => b.id)).toEqual(['start', 'b']);
  });
  it('choices separated by blank lines stay in one group', () => {
    const s = parseScene('## a\n\nText.\n\n1. **One**\n\n2. **Two**\n   ↳ After two.\n\nMore text.');
    const steps = s.beats[0]!.steps;
    expect(steps.map((x) => x.type)).toEqual(['prose', 'choices', 'prose']);
    expect((steps[1] as { choices: Choice[] }).choices).toHaveLength(2);
  });
  it('unresolved targets and scene jumps', () => {
    const s = parseScene('## a\n\n1. **x** `→ nowhere`\n2. **y** `→ scene:p1-cabinet`');
    const [g] = choicesOf(s.beats[0]!.steps);
    expect(g![0]!.goto).toEqual({ kind: 'unresolved', raw: 'nowhere' });
    expect(g![1]!.goto).toEqual({ kind: 'scene', scene: 'p1-cabinet' });
    expect(s.warnings.length).toBe(1);
  });
  it('unknown tokens produce warnings', () => {
    const s = parseScene('## a\n\n1. **x** `[frobnicate 3]`');
    expect(s.warnings[0]).toContain('frobnicate');
  });
  it('NPC speech split when a new name starts inside a running quote', () => {
    const s = parseScene('## a\n\n> **A:** "one"\n> **B:** "two"');
    expect(s.beats[0]!.steps.map((x) => (x as { prose: { speaker?: string } }).prose.speaker)).toEqual(['A', 'B']);
  });
  it('a beat named "end" is a beat, END is the keyword', () => {
    const s = parseScene('## a\n\nx\n\n→ end\n\n## end\n\n1. **Ok** `[flag: f = true]`\n\n→ END');
    expect(s.beats[0]!.steps[1]).toMatchObject({ type: 'goto', target: { kind: 'beat', beat: 'end' } });
    expect(s.beats[1]!.steps[1]).toMatchObject({ type: 'goto', target: { kind: 'end' } });
  });
});
