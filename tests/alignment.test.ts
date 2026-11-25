import { describe, expect, it } from 'vitest';
import { alignmentPenalty, interstateRelevance } from '../src/core/alignment';
import { TUNING } from '../src/core/tuning';
import { actorPenalty, countryPenalty, loyaltyRV, regionPenalty, regionRV, relationRV } from '../src/core/turn';
import type { Compass } from '../src/core/types';
import { createState, zeroCompass } from '../src/core/world';
import { loadContent } from '../src/content/loader';
import { projectVote } from '../src/game/politics';
import type { Bill } from '../src/content/schema';

const C = (o: Partial<Compass>): Compass => ({ ...zeroCompass(), ...o });
const p = TUNING.alignment.exponent;

describe('alignment penalty', () => {
  it('Σ w·|Δ|^p / Σ|w|', () => {
    const player = C({ ECON: 2 });
    const ent = C({ ECON: -2, IDEN: 3 });
    const w = C({ ECON: 1, IDEN: 0.5 });
    expect(alignmentPenalty(player, ent, w)).toBeCloseTo((1 * 4 ** p + 0.5 * 3 ** p) / 1.5);
  });
  it('the exponent makes big gaps count more than small ones', () => {
    const w = C({ ECON: 1 });
    const one = alignmentPenalty(zeroCompass(), C({ ECON: 1 }), w);
    const four = alignmentPenalty(zeroCompass(), C({ ECON: 4 }), w);
    expect(four / one).toBeCloseTo(4 ** p);
    expect(four / one).toBeGreaterThan(4);
  });
  it('negative weights keep their sign (distance on that axis is welcome)', () => {
    const w = C({ IDEN: -1, ECON: 1 });
    const ent = C({ IDEN: 5, ECON: 0 });
    expect(alignmentPenalty(zeroCompass(), ent, w)).toBeCloseTo(-(5 ** p) / 2);
    expect(alignmentPenalty(C({ IDEN: -5 }), ent, w)).toBeLessThan(alignmentPenalty(zeroCompass(), ent, w));
  });
  it('no compass → 0; zero weights → 0', () => {
    expect(alignmentPenalty(zeroCompass(), undefined, undefined)).toBe(0);
    expect(alignmentPenalty(zeroCompass(), C({ ECON: 5 }), zeroCompass())).toBe(0);
  });
  it('interstate default weights', () => {
    expect(interstateRelevance()).toEqual({ ECON: 0.33, WELF: 0, IDEN: 1, FORCE: 0.67, STRUCT: 0.67, RELIG: 0.33 });
  });
});

describe('alignment in the game (real content)', () => {
  const content = loadContent();
  const fresh = () => createState(content.world);

  it('the starting state is at rest', () => {
    const s = fresh();
    for (const r of Object.values(s.regions)) expect(regionRV(s, r).approval).toBeCloseTo(r.approval);
    for (const a of Object.values(s.actors)) expect(loyaltyRV(s, a)).toBeCloseTo(Math.max(-10, Math.min(10, a.loyalty)));
    for (const c of Object.values(s.countries)) expect(relationRV(s, c)).toBeCloseTo(c.relation);
  });

  it('regions and countries carry compass/relevance from world.json; culturalInfluence is loaded', () => {
    const s = fresh();
    expect(s.regions.tekoku!.compass?.IDEN).toBe(7);
    expect(s.regions.tekoku!.relevance?.IDEN).toBe(1);
    expect(s.countries.mondrath!.compass?.STRUCT).toBe(7);
    expect(s.countries.federation!.culturalInfluence).toBe(6);
  });

  it('a nationalist shift raises Tekoku approval RV and lowers Ibicuí, moves Mondrath and the Federation', () => {
    const s = fresh();
    const before = Object.fromEntries(Object.values(s.regions).map((r) => [r.id, regionRV(s, r).approval]));
    const rel0 = { mondrath: relationRV(s, s.countries.mondrath!), federation: relationRV(s, s.countries.federation!) };
    s.compass.IDEN += 3;
    const after = Object.fromEntries(Object.values(s.regions).map((r) => [r.id, regionRV(s, r).approval]));
    expect(after.tekoku!).toBeGreaterThan(before.tekoku!);
    expect(after.ibicui!).toBeLessThan(before.ibicui!);
    expect(relationRV(s, s.countries.mondrath!)).toBeGreaterThan(rel0.mondrath); // Mondrath IDEN +6
    expect(relationRV(s, s.countries.federation!)).toBeLessThan(rel0.federation); // Federation IDEN −1
    const delta = Object.fromEntries(Object.keys(before).map((k) => [k, +(after[k]! - before[k]!).toFixed(2)]));
    console.info('[+3 IDEN] approval RV change by region', JSON.stringify(delta),
      'relation RV: mondrath', +(relationRV(s, s.countries.mondrath!) - rel0.mondrath).toFixed(2),
      'federation', +(relationRV(s, s.countries.federation!) - rel0.federation).toFixed(2));
  });

  it('loyalty RV follows alignment; sensitivity multiplies it', () => {
    const s = fresh();
    const a = Object.values(s.actors).find((x) => x.compass && x.relevance)!;
    const rv0 = loyaltyRV(s, a);
    // move the president away from this actor on its most relevant axis
    const ax = (Object.keys(a.relevance!) as (keyof Compass)[]).sort((x, y) => a.relevance![y] - a.relevance![x])[0]!;
    s.compass[ax] = a.compass![ax] >= 0 ? -8 : 8;
    expect(actorPenalty(s, a)).toBeGreaterThan(a.alignStart!);
    const drop = rv0 - loyaltyRV(s, a);
    expect(drop).toBeGreaterThan(0);
    a.sensitivity = 2;
    a.base.loyalty = 0; // compare raw terms
    const t = fresh().actors[a.id]!;
    expect(TUNING.alignment.kLoyalty * 2 * (actorPenalty(s, a) - t.alignStart!)).toBeGreaterThan(0);
  });

  it('diploSensitivity multiplies the relation response', () => {
    const s = fresh();
    const m = s.countries.mondrath!;
    const r0 = relationRV(s, m);
    s.compass.STRUCT = -8;
    const d1 = relationRV(s, m) - r0;
    m.diploSensitivity = 2;
    const s2 = createState(content.world);
    s2.countries.mondrath!.diploSensitivity = 2;
    // recalibrate base for the new sensitivity: only the change matters
    s2.countries.mondrath!.base.relation += TUNING.alignment.kDiplo * countryPenalty(s2, s2.countries.mondrath!);
    const r2 = relationRV(s2, s2.countries.mondrath!);
    s2.compass.STRUCT = -8;
    expect(relationRV(s2, s2.countries.mondrath!) - r2).toBeCloseTo(2 * d1);
  });

  it('vote positions move with alignment toward / away from the party', () => {
    const s = fresh();
    const bill: Bill = { id: 'b', title: 'b', summary: '', positions: {}, whipCosts: {} };
    const pos0 = Object.fromEntries(projectVote(s, bill).parties.map((x) => [x.party, x.position]));
    const pm = s.actors.pm!;
    // move fully onto the PM compass: penalty falls → PM position rises
    for (const ax of Object.keys(pm.compass!) as (keyof Compass)[]) s.compass[ax] = pm.compass![ax];
    const pos1 = Object.fromEntries(projectVote(s, bill).parties.map((x) => [x.party, x.position]));
    expect(pos1.pm!).toBeGreaterThan(pos0.pm!);
    expect(pos1.pm! - pos0.pm!).toBeCloseTo(TUNING.alignment.kVote * pm.alignStart!);
    expect(Object.values(pos0).every((v) => v === 0)).toBe(true);
  });
});

describe('region penalty helper', () => {
  it('uses region relevance', () => {
    const s = createState(loadContent().world);
    const r = s.regions.tekoku!;
    expect(regionPenalty(s, r)).toBeCloseTo(alignmentPenalty(s.compass, r.compass, r.relevance));
  });
});
