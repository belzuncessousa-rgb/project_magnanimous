import { describe, expect, it } from 'vitest';
import { TUNING } from '../src/core/tuning';
import { debtInterestDue, formulaFC, simulateTurn, taxRevenue } from '../src/core/turn';
import { applyDebtPolicy, debtLimits, debtPreview } from '../src/game/debt';
import { canAfford } from '../src/core/effects';
import { createState } from '../src/core/world';
import { buildContent } from '../src/content/schema';
import { rawContentFiles } from '../src/content/loader';
import { testState as newGame } from './helpers';

const rate = TUNING.debt.interestRatePerTurn;

describe('public debt (balance in FC, interest = fixed % of balance)', () => {
  it('starts with a balance whose interest ≈ 11% of initial revenue', () => {
    const s = newGame();
    expect(s.nation.debt!).toBeGreaterThan(0);
    expect(debtInterestDue(s)).toBeCloseTo(s.nation.baseRevenue! * TUNING.resources.debtInterestShare, 5);
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

  it('borrow without the screen: default loan once, cash now, interest grows with it', () => {
    const s = newGame();
    s.flags.debt_policy = 2;
    const d0 = s.nation.debt!;
    const fc0 = s.resources.FC;
    simulateTurn(s);
    expect(s.resources.FC).toBeCloseTo(fc0 + TUNING.debt.borrowAmount + formulaFC(s) - (d0 + TUNING.debt.borrowAmount) * rate, 0);
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

  it('the debt screen: pay-down slider sets principal per turn (capped), status quo clears it', () => {
    const s = newGame();
    const lim = debtLimits(s);
    expect(lim.income).toBeCloseTo(formulaFC(s) - debtInterestDue(s));
    expect(lim.payDownMax).toBeCloseTo(Math.floor((lim.income * TUNING.debt.payDownMaxShareOfIncome) / 0.5) * 0.5);
    const p = debtPreview(s, 1, lim.payDownMax);
    expect(p.balance).toBeCloseTo(s.nation.debt!);
    expect(p.nextPrincipal).toBeCloseTo(lim.payDownMax);
    applyDebtPolicy(s, 1, 1e9);
    expect(s.flags.debt_policy).toBe(1);
    expect(s.nation.amortization).toBeCloseTo(lim.payDownMax);
    const d0 = s.nation.debt!;
    simulateTurn(s);
    expect(s.nation.debt).toBeCloseTo(d0 - lim.payDownMax);
    applyDebtPolicy(s, 3, 0);
    expect(s.nation.amortization).toBe(0);
    const d1 = s.nation.debt!;
    simulateTurn(s);
    expect(s.nation.debt).toBeCloseTo(d1);
  });

  it('the debt screen: borrow slider adds cash and balance once (capped at 15% of the balance)', () => {
    const s = newGame();
    const lim = debtLimits(s);
    expect(lim.borrowMax).toBe(Math.floor(s.nation.debt! * 0.15));
    const fc0 = s.resources.FC;
    const d0 = s.nation.debt!;
    const pv = debtPreview(s, 2, 4);
    expect(pv.balance).toBeCloseTo(d0 + 4);
    expect(pv.nextInterest).toBeCloseTo((d0 + 4) * rate);
    expect(pv.fcNow).toBeCloseTo(fc0 + 4);
    applyDebtPolicy(s, 2, 4);
    expect(s.resources.FC).toBeCloseTo(fc0 + 4);
    expect(s.nation.debt).toBeCloseTo(d0 + 4);
    simulateTurn(s);
    simulateTurn(s);
    expect(s.nation.debt).toBeCloseTo(d0 + 4); // no extra default loan
    const t = newGame();
    applyDebtPolicy(t, 2, 1e12);
    expect(t.nation.debt).toBeCloseTo(d0 + lim.borrowMax);
  });
});

describe('FC in billions (GDD calibration)', () => {
  const real = buildContent(rawContentFiles());
  const s = createState(real.world);
  const revenue = taxRevenue(s);

  it('revenue per turn = Σ output × domestic tax + trade × trade tax', () => {
    const out = Object.values(s.regions).reduce((a, r) => a + r.output, 0);
    const trade = Object.values(s.countries).reduce((a, c) => a + c.trade, 0);
    expect(revenue).toBeCloseTo(out * s.taxes.domestic + trade * s.taxes.trade);
  });

  it('first interest ≈ 11% of revenue; discretionary money lands in the tens of billions', () => {
    expect(debtInterestDue(s) / revenue).toBeCloseTo(0.11, 5);
    const discretionary = formulaFC(s) - debtInterestDue(s);
    expect(discretionary).toBeGreaterThan(20);
    expect(discretionary).toBeLessThan(60);
    expect(s.resources.FC).toBe(TUNING.resources.startingFC);
  });

  it('FC is continuous: decimals survive the turn, costs compare as decimals', () => {
    const t = createState(real.world);
    t.resources.FC = 12.3;
    expect(canAfford(t, { FC: 12.3 })).toBe(true);
    expect(canAfford(t, { FC: 12.31 })).toBe(false);
    simulateTurn(t);
    expect(Number.isInteger(t.resources.FC)).toBe(false);
  });
});
