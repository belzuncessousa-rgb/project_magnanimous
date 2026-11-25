import { describe, expect, it } from 'vitest';
import { TUNING } from '../src/core/tuning';
import { debtInterestDue, simulateTurn } from '../src/core/turn';
import { testState as newGame } from './helpers';

const rate = TUNING.debt.interestRatePerTurn;

describe('public debt (balance in FC, interest = fixed % of balance)', () => {
  it('starts with a balance whose interest ≈ 11% of initial revenue', () => {
    const s = newGame();
    const revenueFC = s.nation.baseRevenue! / s.nation.fcBracket;
    expect(s.nation.debt!).toBeGreaterThan(0);
    expect(debtInterestDue(s)).toBeCloseTo(revenueFC * TUNING.resources.debtInterestShare, 5);
  });

  it('status quo: balance unchanged, interest paid every turn', () => {
    const s = newGame();
    const d0 = s.nation.debt!;
    simulateTurn(s);
    expect(s.nation.debt).toBeCloseTo(d0);
    expect(s.nation.debtPaid!.interest).toBeCloseTo(d0 * rate);
    expect(s.nation.debtPaid!.principal).toBe(0);
  });

  it('pay down: principal lowers the balance, so next interest is lower', () => {
    const s = newGame();
    s.flags.debt_policy = 1;
    const d0 = s.nation.debt!;
    simulateTurn(s);
    expect(s.nation.debt).toBeCloseTo(d0 - TUNING.debt.amortizationPerTurn);
    const i1 = s.nation.debtPaid!.interest;
    simulateTurn(s);
    expect(s.nation.debtPaid!.interest).toBeLessThan(i1);
    expect(s.nation.debtPaid!.interest).toBeCloseTo((d0 - TUNING.debt.amortizationPerTurn) * rate);
  });

  it('borrow: balance grows once by borrowAmount, interest grows with it', () => {
    const s = newGame();
    s.flags.debt_policy = 2;
    const d0 = s.nation.debt!;
    simulateTurn(s);
    simulateTurn(s);
    expect(s.nation.debt).toBeCloseTo(d0 + TUNING.debt.borrowAmount);
    expect(s.nation.debtPaid!.interest).toBeCloseTo((d0 + TUNING.debt.borrowAmount) * rate);
  });

  it('a fully paid debt costs nothing', () => {
    const s = newGame();
    s.flags.debt_policy = 1;
    s.nation.debt = 0.5;
    simulateTurn(s);
    expect(s.nation.debt).toBe(0);
    simulateTurn(s);
    expect(s.nation.debtPaid).toEqual({ interest: 0, principal: 0 });
  });
});
