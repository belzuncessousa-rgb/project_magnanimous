import { actorAliases } from './ids';
import { AXES, TUNING } from './tuning';
import {
  calibrateActor,
  calibrateCountry,
  calibrateRegion,
  colFormula,
  formulaEPI,
  formulaIPI,
  formulaPT,
  formulaFC,
  taxRevenue,
} from './turn';
import type { Actor, ActorKind, Compass, Country, FlagValue, GameState, Region, Resources } from './types';

export const STATE_VERSION = 1;

export interface RegionInput {
  id: string;
  name: string;
  population: number;
  approval: number;
  stability: number;
  output: number;
  education: number;
  infrastructure: number;
  col?: number;
  popSensitivity?: number;
  welfareSensitivity?: number;
}

export interface CountryInput {
  id: string;
  name: string;
  relation: number;
  trade: number;
  aggressiveness: number;
  weight: number;
  military: number;
  culturalPower: number;
  context: boolean;
  embargo?: boolean;
}

export interface ActorInput {
  id: string;
  name: string;
  kind: ActorKind;
  role?: string;
  party?: string;
  portrait?: string;
  loyalty: number;
  suspicion: number;
  capacity: number;
  seats?: number;
  compass?: Compass;
  relevance?: Compass;
  ipi?: boolean;
  aliases?: string[];
}

export interface WorldInput {
  regions: RegionInput[];
  countries: CountryInput[];
  actors: ActorInput[];
  compass?: Partial<Compass>;
  taxes?: { domestic?: number; trade?: number };
  resources?: Partial<Resources>;
  flags?: Record<string, FlagValue>;
  nation?: { culturalPower?: number; debtInterest?: number };
  start?: { chapter?: number; turn?: number; dateLabel?: string };
}

export function zeroCompass(): Compass {
  return Object.fromEntries(AXES.map((a) => [a, 0])) as Compass;
}

export function createState(world: WorldInput): GameState {
  const regions: Record<string, Region> = {};
  for (const ri of world.regions) {
    const r: Region = {
      id: ri.id,
      name: ri.name,
      approval: ri.approval,
      stability: ri.stability,
      output: ri.output,
      education: ri.education,
      infrastructure: ri.infrastructure,
      population: ri.population,
      col: 0,
      popSensitivity: ri.popSensitivity ?? TUNING.region.popSensitivityDefault,
      welfareSensitivity: ri.welfareSensitivity ?? TUNING.region.welfareSensitivityDefault,
      base: { approval: 0, stability: 0, output: 0, education: 0, col: 0 },
      prevOutputPerCapita: 0,
    };
    r.col = ri.col ?? Math.round(colFormula(r));
    regions[r.id] = r;
  }
  const countries: Record<string, Country> = {};
  for (const ci of world.countries) {
    countries[ci.id] = {
      id: ci.id,
      name: ci.name,
      relation: ci.relation,
      trade: ci.trade,
      aggressiveness: ci.aggressiveness,
      weight: ci.weight,
      military: ci.military,
      culturalPower: ci.culturalPower,
      culturalInfluence: 0,
      embargo: !!ci.embargo,
      context: ci.context,
      base: { relation: 0, aggressiveness: 0 },
    };
  }
  const actors: Record<string, Actor> = {};
  for (const ai of world.actors) {
    actors[ai.id] = {
      id: ai.id,
      name: ai.name,
      kind: ai.kind,
      role: ai.role,
      party: ai.party,
      portrait: ai.portrait,
      loyalty: ai.loyalty,
      suspicion: ai.suspicion,
      capacity: ai.capacity,
      seats: ai.seats,
      compass: ai.compass,
      relevance: ai.relevance,
      ipi: ai.ipi ?? ai.kind !== 'faction',
      base: { loyalty: 0, capacity: 0 },
      aliases: actorAliases(ai.id, ai.name, ai.aliases),
    };
  }
  const state: GameState = {
    version: STATE_VERSION,
    chapter: world.start?.chapter ?? 1,
    turn: world.start?.turn ?? 1,
    turnIndex: 1,
    dateLabel: world.start?.dateLabel ?? '',
    regions,
    countries,
    actors,
    compass: { ...zeroCompass(), ...(world.compass ?? {}) },
    flags: { ...(world.flags ?? {}) },
    resources: { PT: 0, FC: 0, IPI: 0, EPI: 0 },
    taxes: {
      domestic: world.taxes?.domestic ?? TUNING.taxes.domesticDefault,
      trade: world.taxes?.trade ?? TUNING.taxes.tradeDefault,
    },
    nation: { debtInterest: 0, culturalPower: world.nation?.culturalPower ?? 40, costPerCapita: 0, fcBracket: 1 },
    completedScenes: [],
    newsQueue: [],
    printedNews: [],
    popupQueue: [],
    shownPopups: [],
    activePopups: [],
    crisis: {},
    cooldowns: {},
    freeActionsUsed: {},
    ended: false,
  };
  for (const r of Object.values(regions)) calibrateRegion(state, r);
  for (const c of Object.values(countries)) calibrateCountry(c);
  for (const a of Object.values(actors)) calibrateActor(state, a);
  const revenue = taxRevenue(state);
  const pop = Object.values(regions).reduce((s, r) => s + r.population, 0);
  state.nation.debtInterest = world.nation?.debtInterest ?? revenue * TUNING.resources.debtInterestShare;
  state.nation.baseRevenue = revenue;
  state.nation.debtShare = revenue > 0 ? state.nation.debtInterest / revenue : TUNING.resources.debtInterestShare;
  state.nation.costPerCapita = pop > 0 ? (revenue * TUNING.resources.baseCostShare) / pop : 0;
  const net = revenue - pop * state.nation.costPerCapita - state.nation.debtInterest;
  state.nation.fcBracket = net > 0 ? net / (TUNING.resources.targetFCIncome + 0.5) : 1;
  state.resources = {
    PT: world.resources?.PT ?? formulaPT(state),
    FC: world.resources?.FC ?? Math.max(TUNING.resources.startingFC, formulaFC(state)),
    IPI: world.resources?.IPI ?? formulaIPI(state),
    EPI: world.resources?.EPI ?? formulaEPI(state),
  };
  return state;
}

export function cloneState(s: GameState): GameState {
  return JSON.parse(JSON.stringify(s)) as GameState;
}
