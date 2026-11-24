import { describe, expect, it } from 'vitest';
import { evalExpr, parseExpr } from '../src/core/expr';
import { evaluate, test as check, nationalApproval } from '../src/core/query';
import { testState } from './helpers';

const ev = (src: string, vars: Record<string, number | boolean> = {}) => evalExpr(parseExpr(src), (n) => vars[n]);

describe('expression parser', () => {
  it('handles literals and arithmetic precedence', () => {
    expect(ev('1 + 2 * 3')).toBe(7);
    expect(ev('(1 + 2) * 3')).toBe(9);
    expect(ev('10 / 4')).toBe(2.5);
    expect(ev('-3 + 1')).toBe(-2);
    expect(ev('1 / 0')).toBe(0);
    expect(ev('true')).toBe(true);
    expect(ev('FALSE')).toBe(false);
  });

  it('handles boolean operators in both spellings', () => {
    expect(ev('a && b', { a: true, b: false })).toBe(false);
    expect(ev('a & b', { a: true, b: true })).toBe(true);
    expect(ev('a || b', { a: false, b: true })).toBe(true);
    expect(ev('a | b', { a: false, b: false })).toBe(false);
    expect(ev('!a', { a: false })).toBe(true);
    expect(ev('!!a', { a: true })).toBe(true);
    expect(ev('a & !b | c', { a: true, b: true, c: true })).toBe(true);
    // && binds tighter than ||
    expect(ev('a || b && c', { a: true, b: false, c: false })).toBe(true);
  });

  it('handles comparisons', () => {
    expect(ev('x >= 2', { x: 2 })).toBe(true);
    expect(ev('x > 2', { x: 2 })).toBe(false);
    expect(ev('x < 2', { x: 1 })).toBe(true);
    expect(ev('x <= 1', { x: 1 })).toBe(true);
    expect(ev('x == 3', { x: 3 })).toBe(true);
    expect(ev('x = 3', { x: 3 })).toBe(true);
    expect(ev('x != 3', { x: 3 })).toBe(false);
    expect(ev("s == 'abc'", {})).toBe(false);
  });

  it('unknown variables are 0/false', () => {
    expect(ev('missing')).toBe(0);
    expect(ev('!missing')).toBe(true);
    expect(ev('missing >= 1')).toBe(false);
  });

  it('parses region syntax and dotted/hyphenated identifiers', () => {
    const names: string[] = [];
    evalExpr(parseExpr('approval@ibicui < 40 && approval @ Ibicuí >= 1 && done.p1-inauguration && flag.seen.hub.1'), (n) => {
      names.push(n);
      return 1;
    });
    expect(names).toEqual(['approval@ibicui', 'approval@Ibicuí', 'done.p1-inauguration', 'flag.seen.hub.1']);
  });

  it('rejects malformed input', () => {
    expect(() => parseExpr('(a && b')).toThrow();
    expect(() => parseExpr('a &&')).toThrow();
    expect(() => parseExpr('a $ b')).toThrow();
  });

  it('empty expression is true', () => {
    expect(ev('')).toBe(true);
  });
});

describe('state resolver', () => {
  it('resolves flags, regions, actors, compass, resources', () => {
    const s = testState();
    s.flags.promised_CoL = true;
    s.flags.count = 3;
    s.compass.ECON = 3;
    expect(check(s, 'flag.promised_CoL')).toBe(true);
    expect(check(s, 'promised_CoL')).toBe(true); // bare flag (Notion convention)
    expect(check(s, '!flag.nope')).toBe(true);
    expect(check(s, 'flag.count >= 2')).toBe(true);
    expect(evaluate(s, 'approval@ibicui')).toBe(41);
    expect(evaluate(s, 'approval@Ibicuí')).toBe(41);
    expect(evaluate(s, 'stability@mognagna')).toBe(45);
    expect(evaluate(s, 'loyalty.mertens')).toBe(2);
    expect(evaluate(s, 'opinion.Mertens')).toBe(2);
    expect(evaluate(s, 'capacity.OPP')).toBe(55);
    expect(evaluate(s, 'seats.pm')).toBe(24);
    expect(evaluate(s, 'relation.federation')).toBe(4);
    expect(evaluate(s, 'compass.ECON')).toBe(3);
    expect(evaluate(s, 'resource.PT')).toBe(s.resources.PT);
    expect(evaluate(s, 'chapter')).toBe(1);
    expect(evaluate(s, 'turn')).toBe(1);
    expect(evaluate(s, 'approval@all')).toBeCloseTo(nationalApproval(s));
    expect(check(s, 'done.p1-x')).toBe(false);
    s.completedScenes.push('p1-x');
    expect(check(s, 'done.p1-x')).toBe(true);
  });

  it('national approval is population-weighted', () => {
    const s = testState();
    const expected = (15 * 50 + 41 * 100 + 80 * 70 + 25 * 30 + 70 * 30) / 280;
    expect(nationalApproval(s)).toBeCloseTo(expected);
  });
});
