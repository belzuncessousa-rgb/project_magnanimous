import { describe, expect, it } from 'vitest';
import { applyEffect, applyEffects } from '../src/core/effects';
import { evaluateCrises, crisisPressure, type CrisisDef } from '../src/core/crisis';
import {
  compassDistance,
  formulaEPI,
  formulaFC,
  formulaIPI,
  formulaPT,
  loyaltyRV,
  refreshResources,
  regionRV,
  simulateTurn,
  taxApprovalShock,
} from '../src/core/turn';
import { nationalAvg } from '../src/core/query';
import { cloneState } from '../src/core/world';
import { TUNING, driftToward } from '../src/core/tuning';
import { testState } from './helpers';

describe('drift', () => {
  it('moves toward the target without overshooting', () => {
    expect(driftToward(10, 20, 1)).toBe(11);
    expect(driftToward(10, 10.5, 1)).toBe(10.5);
    expect(driftToward(10, 0, 0.6)).toBeCloseTo(9.4);
  });
});

describe('initial state is at rest', () => {
  it('rest values equal starting values', () => {
    const s = testState();
    for (const r of Object.values(s.regions)) {
      const rv = regionRV(s, r);
      expect(rv.approval).toBeCloseTo(r.approval);
      expect(rv.stability).toBeCloseTo(r.stability);
      expect(rv.output).toBeCloseTo(r.output);
      expect(rv.col).toBeCloseTo(r.col);
    }
    for (const a of Object.values(s.actors)) expect(loyaltyRV(s, a)).toBeCloseTo(a.loyalty);
  });

  it('nothing moves over many turns without events', () => {
    const s = testState();
    // equal cultural power → no cultural drift (culture spreading is a real force, tested separately)
    for (const c of Object.values(s.countries)) c.culturalPower = s.nation.culturalPower;
    const before = cloneState(s);
    for (let i = 0; i < 10; i++) simulateTurn(s);
    for (const id of Object.keys(s.regions)) {
      expect(s.regions[id]!.approval).toBeCloseTo(before.regions[id]!.approval, 5);
      expect(s.regions[id]!.stability).toBeCloseTo(before.regions[id]!.stability, 5);
      expect(s.regions[id]!.output).toBeCloseTo(before.regions[id]!.output, 5);
    }
    for (const id of Object.keys(s.countries)) expect(s.countries[id]!.relation).toBeCloseTo(before.countries[id]!.relation, 0); // trade compounds slowly (GDD formula)
  });
});

describe('formula fixes (audit)', () => {
  it('education does not drift back after an investment', () => {
    const s = testState();
    s.regions.ibicui!.education += 5;
    const e = s.regions.ibicui!.education;
    for (let i = 0; i < 5; i++) simulateTurn(s);
    expect(s.regions.ibicui!.education).toBe(e);
  });
  it('cultural influence moves by (own − their) / 100 per turn', () => {
    const s = testState();
    const c = Object.values(s.countries)[0]!;
    c.culturalInfluence = 0;
    c.culturalPower = s.nation.culturalPower - 20;
    simulateTurn(s);
    expect(c.culturalInfluence).toBeCloseTo(0.2, 5);
  });
});

describe('shock deltas decay toward the rest value', () => {
  it('approval shock decays at 1/turn', () => {
    const s = testState();
    applyEffect(s, { type: 'region', index: 'approval', delta: 5, regions: ['ibicui'] });
    expect(s.regions.ibicui!.approval).toBe(46);
    simulateTurn(s);
    // approval moves by its drift rate; stability reacts to the higher approval
    expect(s.regions.ibicui!.approval).toBeCloseTo(45, 0);
    expect(s.regions.ibicui!.stability).toBeGreaterThan(50);
  });

  it('rv effects are permanent', () => {
    const s = testState();
    applyEffect(s, { type: 'region', index: 'approval', delta: 4, regions: ['tapira'], rv: true });
    for (let i = 0; i < 4; i++) simulateTurn(s);
    expect(s.regions.tapira!.approval).toBeGreaterThan(28);
  });

  it('CoL shocks persist (no drift)', () => {
    const s = testState();
    applyEffect(s, { type: 'region', index: 'col', delta: 3, regions: 'all' });
    const v = s.regions.ibira!.col;
    simulateTurn(s);
    expect(s.regions.ibira!.col).toBeCloseTo(v, 0);
  });

  it('relation changes persist (no drift)', () => {
    const s = testState();
    applyEffect(s, { type: 'country', country: 'Arennian Federation', stat: 'relation', delta: -3 });
    expect(s.countries.federation!.relation).toBe(1);
    simulateTurn(s);
    expect(s.countries.federation!.relation).toBeCloseTo(1, 1);
  });

  it('loyalty drifts back at 0.6/turn', () => {
    const s = testState();
    applyEffect(s, { type: 'actor', actor: 'Mertens', stat: 'loyalty', delta: 5 });
    simulateTurn(s);
    expect(s.actors.mertens!.loyalty).toBeCloseTo(6.4);
  });
});

describe('compass and loyalty', () => {
  it('loyalty rest value falls as the president drifts away', () => {
    const s = testState();
    const sal = s.actors.salgado!;
    const d0 = compassDistance(s, sal);
    s.compass.STRUCT = 8; // authoritarian, Salgado is democratic and cares a lot
    expect(compassDistance(s, sal)).toBeGreaterThan(d0);
    expect(loyaltyRV(s, sal)).toBeLessThan(sal.loyalty);
    simulateTurn(s);
    expect(sal.loyalty).toBeCloseTo(4 - 0.6);
  });
  it('compass is clamped to ±10', () => {
    const s = testState();
    applyEffect(s, { type: 'compass', axis: 'ECON', delta: 25 });
    expect(s.compass.ECON).toBe(10);
  });
});

describe('taxes', () => {
  it('approval shock above 45% / below 15%', () => {
    const s = testState();
    const r = s.regions.ibicui!;
    s.taxes.domestic = 0.5;
    expect(taxApprovalShock(s, r)).toBeCloseTo(-5);
    s.taxes.domestic = 0.1;
    expect(taxApprovalShock(s, r)).toBeCloseTo(-3);
    s.taxes.domestic = 0.3;
    expect(taxApprovalShock(s, r)).toBe(0);
  });
  it('high trade tax sours relations', () => {
    const s = testState();
    applyEffect(s, { type: 'tax', which: 'trade', delta: 0.25 });
    expect(s.taxes.trade).toBeCloseTo(0.35);
    const rel = s.countries.zharan!.relation;
    simulateTurn(s);
    expect(s.countries.zharan!.relation).toBeLessThan(rel);
  });
  it('tax rates are clamped', () => {
    const s = testState();
    applyEffect(s, { type: 'tax', which: 'domestic', delta: 5 });
    expect(s.taxes.domestic).toBe(TUNING.taxes.domesticRange[1]);
  });
});

describe('resources', () => {
  it('PT formula and clamp', () => {
    const s = testState();
    const expected = Math.floor((nationalAvg(s, 'approval') + nationalAvg(s, 'stability')) / 2 / 10);
    expect(formulaPT(s)).toBe(Math.max(2, Math.min(8, expected)));
    for (const r of Object.values(s.regions)) { r.approval = 0; r.stability = 0; }
    expect(formulaPT(s)).toBe(2);
    for (const r of Object.values(s.regions)) { r.approval = 100; r.stability = 100; }
    expect(formulaPT(s)).toBe(8);
  });
  it('IPI from loyalty x capacity', () => {
    const s = testState();
    for (const a of Object.values(s.actors)) { a.loyalty = 10; a.capacity = 100; }
    expect(formulaIPI(s)).toBe(8);
    for (const a of Object.values(s.actors)) { a.loyalty = -10; }
    expect(formulaIPI(s)).toBe(1);
  });
  it('EPI weights powerful countries and ignores context neighbours', () => {
    const s = testState();
    const e0 = formulaEPI(s);
    s.countries.vassel!.relation = 10;
    expect(formulaEPI(s)).toBe(e0);
    s.countries.federation!.relation = 10;
    s.countries.zharan!.relation = 10;
    expect(formulaEPI(s)).toBeGreaterThanOrEqual(e0);
  });
  it('FC income within [1,10] and starting FC > 0', () => {
    const s = testState();
    const f = formulaFC(s);
    expect(f).toBeGreaterThanOrEqual(1);
    expect(f).toBeLessThanOrEqual(10);
    expect(s.resources.FC).toBeGreaterThan(0);
  });
  it('carryover: PT 0%, FC 100%, IPI/EPI 50%', () => {
    const s = testState();
    s.resources = { PT: 7, FC: 4, IPI: 4, EPI: 3 };
    const interest = (s.nation.debt ?? 0) * TUNING.debt.interestRatePerTurn;
    refreshResources(s);
    expect(s.resources.PT).toBe(formulaPT(s));
    expect(s.resources.FC).toBeCloseTo(4 + formulaFC(s) - interest);
    expect(s.resources.IPI).toBe(formulaIPI(s) + 2);
    expect(s.resources.EPI).toBe(formulaEPI(s) + 1);
  });
});

describe('effects', () => {
  it('resolves display names and aliases', () => {
    const s = testState();
    applyEffects(s, [
      { effect: { type: 'region', index: 'approval', delta: -5, regions: ['Ibicuí', 'Mognagna', 'Ibira'] } },
      { effect: { type: 'actor', actor: 'OPP', stat: 'capacity', delta: -2 } },
      { effect: { type: 'actor', actor: 'Caio Mertens', stat: 'suspicion', delta: 10 } },
      { effect: { type: 'flag', name: 'n', op: '+=', value: 2 } },
      { effect: { type: 'flag', name: 'n', op: '+=', value: 1 } },
    ]);
    expect(s.regions.ibicui!.approval).toBe(36);
    expect(s.regions.tekoku!.approval).toBe(15);
    expect(s.actors.opp!.capacity).toBe(53);
    expect(s.actors.mertens!.suspicion).toBe(10);
    expect(s.flags.n).toBe(3);
  });
  it('warns on unknown names and supports the target placeholder', () => {
    const s = testState();
    const warnings: string[] = [];
    applyEffects(s, [{ effect: { type: 'region', index: 'approval', delta: 3, regions: ['target'] } }], { target: 'tapira', warn: (m) => warnings.push(m) });
    expect(s.regions.tapira!.approval).toBe(28);
    applyEffects(s, [{ effect: { type: 'actor', actor: 'Nobody', stat: 'loyalty', delta: 1 } }], { warn: (m) => warnings.push(m) });
    expect(warnings).toHaveLength(1);
  });
  it('indices are clamped', () => {
    const s = testState();
    applyEffect(s, { type: 'region', index: 'approval', delta: 500, regions: 'all' });
    expect(s.regions.ibira!.approval).toBe(100);
    applyEffect(s, { type: 'actor', actor: 'mertens', stat: 'loyalty', delta: -50 });
    expect(s.actors.mertens!.loyalty).toBe(-10);
  });
  it('embargo locks trade to zero', () => {
    const s = testState();
    applyEffect(s, { type: 'embargo', country: 'zharan', value: true });
    simulateTurn(s);
    expect(s.countries.zharan!.trade).toBe(0);
  });
});

describe('crisis pressure meters', () => {
  const def: CrisisDef = {
    id: 'ibicui_strikes',
    scene: 'p3-strikes',
    threshold: 10,
    when: 'chapter >= 1',
    terms: [
      { expr: '50 - col@ibicui', weight: 0.5 },
      { expr: '!flag.decentralisation', weight: 3 },
      { expr: 'flag.palliative', weight: -4 },
    ],
    signals: { popups: ['strike-rumours'], news: [{ paper: 'voice', id: 'strike-talk' }] },
  };

  it('computes a weighted sum of expressions', () => {
    const s = testState();
    s.regions.ibicui!.col = 40;
    expect(crisisPressure(s, def)).toBeCloseTo(5 + 3);
    s.flags.palliative = true;
    expect(crisisPressure(s, def)).toBeCloseTo(4);
  });

  it('signals before firing, fires at threshold, only once', () => {
    const s = testState();
    s.regions.ibicui!.col = 40; // pressure 8: above 60% of 10
    expect(evaluateCrises(s, [def])).toEqual([]);
    expect(s.popupQueue).toEqual(['strike-rumours']);
    expect(s.newsQueue).toEqual([{ paper: 'voice', id: 'strike-talk' }]);
    s.regions.ibicui!.col = 30; // 10 + 3
    expect(evaluateCrises(s, [def])).toEqual(['ibicui_strikes']);
    expect(s.flags.crisis_ibicui_strikes).toBe(true);
    expect(evaluateCrises(s, [def])).toEqual([]);
  });

  it('accumulating meters build pressure over turns', () => {
    const s = testState();
    const acc: CrisisDef = { id: 'a', threshold: 10, accumulate: true, terms: [{ expr: '4' }] };
    expect(evaluateCrises(s, [acc])).toEqual([]);
    expect(evaluateCrises(s, [acc])).toEqual([]);
    expect(evaluateCrises(s, [acc])).toEqual(['a']);
  });

  it('respects when', () => {
    const s = testState();
    const d: CrisisDef = { id: 'b', threshold: 1, when: 'chapter >= 3', terms: [{ expr: '5' }] };
    expect(evaluateCrises(s, [d])).toEqual([]);
    s.chapter = 3;
    expect(evaluateCrises(s, [d])).toEqual(['b']);
  });
});
