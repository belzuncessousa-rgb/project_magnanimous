import { describe, expect, it } from 'vitest';
import { formulaFC, rawFC, simulateTurn } from '../src/core/turn';
import { TUNING } from '../src/core/tuning';
import { testState } from './helpers';

describe('debt policy (flag debt_policy)', () => {
  it('starts at ≈ 11% of revenue', () => {
    const s = testState();
    expect(s.nation.debtShare).toBeCloseTo(TUNING.resources.debtInterestShare);
    expect(s.nation.debtInterest).toBeCloseTo(s.nation.baseRevenue! * 0.11);
  });
  it('no decision yet: interest unchanged', () => {
    const s = testState();
    const i0 = s.nation.debtInterest;
    for (let k = 0; k < 5; k++) simulateTurn(s);
    expect(s.nation.debtInterest).toBeCloseTo(i0);
  });
  it('1 = pay down: FC every turn, interest falls one point per year', () => {
    const s = testState();
    s.flags.debt_policy = 1;
    const fcBefore = s.resources.FC;
    const income = formulaFC(s);
    simulateTurn(s);
    expect(s.resources.FC).toBeLessThan(fcBefore + income);
    for (let k = 1; k < TUNING.debt.turnsPerYear; k++) simulateTurn(s);
    expect(s.nation.debtShare).toBeCloseTo(0.11 - TUNING.debt.payDownSharePerYear);
  });
  it('2 = borrow: interest +2 points once, from chapter 4', () => {
    const s = testState();
    s.flags.debt_policy = 2;
    simulateTurn(s);
    expect(s.nation.debtShare).toBeCloseTo(0.11);
    s.chapter = 4;
    simulateTurn(s);
    simulateTurn(s);
    expect(s.nation.debtShare).toBeCloseTo(0.11 + TUNING.debt.borrowShareIncrease);
    expect(rawFC(s)).toBeLessThan(rawFC(testState()));
  });
  it('3 = status quo: interest creeps up', () => {
    const s = testState();
    s.flags.debt_policy = 3;
    for (let k = 0; k < TUNING.debt.turnsPerYear; k++) simulateTurn(s);
    expect(s.nation.debtShare).toBeCloseTo(0.11 + TUNING.debt.statusQuoSharePerYear);
  });
  it('the share never falls below the floor', () => {
    const s = testState();
    s.flags.debt_policy = 1;
    for (let k = 0; k < 200; k++) simulateTurn(s);
    expect(s.nation.debtShare).toBeCloseTo(TUNING.debt.minShare);
  });
});
