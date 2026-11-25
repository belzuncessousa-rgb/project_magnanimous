// Debt screen ([open: debt]) logic: pay down (principal per turn), borrow (one-off), status quo. Pure, no DOM.
import { TUNING } from '../core/tuning';
import { debtInterestDue, formulaFC } from '../core/turn';
import type { GameState } from '../core/types';

export type DebtPolicy = 1 | 2 | 3;

export interface DebtLimits {
  /** discretionary income per turn after interest (bn) */
  income: number;
  payDownMax: number;
  payDownStep: number;
  borrowMax: number;
  borrowStep: number;
}

const roundDown = (v: number, step: number) => Math.max(0, Math.floor(v / step + 1e-9) * step);

export function debtLimits(state: GameState): DebtLimits {
  const D = TUNING.debt;
  const income = formulaFC(state) - debtInterestDue(state);
  return {
    income,
    payDownMax: roundDown(Math.max(0, income) * D.payDownMaxShareOfIncome, D.payDownStep),
    payDownStep: D.payDownStep,
    borrowMax: roundDown((state.nation.debt ?? 0) * D.borrowMaxShareOfBalance, D.borrowStep),
    borrowStep: D.borrowStep,
  };
}

export interface DebtPreview {
  /** balance after this decision (borrowing adds now; pay-down is applied at the end of each turn) */
  balance: number;
  /** interest due at the end of this turn */
  nextInterest: number;
  /** principal due at the end of this turn */
  nextPrincipal: number;
  /** cash in the treasury now */
  fcNow: number;
  /** expected cash left after next turn's income, interest and principal (before any other spending) */
  fcAfterTurn: number;
}

/** amount: principal per turn for policy 1, one-off loan for policy 2, ignored for 3. */
export function debtPreview(state: GameState, policy: DebtPolicy, amount: number): DebtPreview {
  const rate = TUNING.debt.interestRatePerTurn;
  const debt = state.nation.debt ?? 0;
  const borrowed = policy === 2 ? amount : 0;
  const balance = debt + borrowed;
  const nextInterest = balance * rate;
  const nextPrincipal = policy === 1 ? Math.min(amount, balance) : 0;
  const fcNow = state.resources.FC + borrowed;
  return { balance, nextInterest, nextPrincipal, fcNow, fcAfterTurn: Math.max(0, fcNow + formulaFC(state) - nextInterest - nextPrincipal) };
}

/** Commit the debt screen. Sets flag debt_policy (story checks) and nation.amortization. */
export function applyDebtPolicy(state: GameState, policy: DebtPolicy, amount: number): void {
  const lim = debtLimits(state);
  state.flags.debt_policy = policy;
  if (policy === 1) {
    state.nation.amortization = Math.min(Math.max(0, amount), lim.payDownMax);
  } else {
    state.nation.amortization = 0;
  }
  if (policy === 2) {
    const loan = Math.min(Math.max(0, amount), lim.borrowMax);
    state.nation.debt = (state.nation.debt ?? 0) + loan;
    state.resources.FC += loan;
    state.flags.debt_borrowed = true;
    state.flags.debt_borrowed_amount = loan;
  }
}
