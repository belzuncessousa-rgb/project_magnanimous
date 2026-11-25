import { createState, type WorldInput } from '../src/core/world';
import type { GameState } from '../src/core/types';

export function testWorld(): WorldInput {
  return {
    regions: [
      { id: 'tekoku', name: 'Tekoku', population: 50, approval: 15, stability: 55, output: 25, education: 60, infrastructure: 60 },
      { id: 'ibicui', name: 'Ibicuí', population: 100, approval: 41, stability: 50, output: 40, education: 50, infrastructure: 55 },
      { id: 'mognagna', name: 'Mognagna', population: 70, approval: 80, stability: 45, output: 10, education: 35, infrastructure: 35 },
      { id: 'tapira', name: 'Tapira', population: 30, approval: 25, stability: 50, output: 12, education: 45, infrastructure: 45 },
      { id: 'ibira', name: 'Ibira', population: 30, approval: 70, stability: 35, output: 6, education: 30, infrastructure: 20 },
    ],
    countries: [
      { id: 'federation', name: 'Arennian Federation', relation: 4, trade: 30, aggressiveness: -4, weight: 100, military: 95, culturalPower: 80, context: false },
      { id: 'zharan', name: 'Zharan', relation: 5, trade: 20, aggressiveness: -8, weight: 95, military: 90, culturalPower: 60, context: false },
      { id: 'arenza', name: 'Arenza', relation: -1, trade: 8, aggressiveness: 0, weight: 40, military: 45, culturalPower: 45, context: false },
      { id: 'vassel', name: 'Vassel', relation: 1, trade: 2, aggressiveness: 0, weight: 10, military: 10, culturalPower: 15, context: true },
    ],
    actors: [
      { id: 'mertens', name: 'Caio Mertens', kind: 'character', loyalty: 2, suspicion: 0, capacity: 60, party: 'opp' },
      { id: 'salgado', name: 'Renata Salgado', kind: 'character', loyalty: 4, suspicion: 0, capacity: 82,
        compass: { ECON: 2, WELF: 3, IDEN: -2, FORCE: -1, STRUCT: -4, RELIG: -2 },
        relevance: { ECON: 0.3, WELF: 0.5, IDEN: 0.2, FORCE: 0.2, STRUCT: 1, RELIG: 0.1 } },
      { id: 'pm', name: 'Popular Movement', kind: 'party', loyalty: 6, suspicion: 0, capacity: 60, seats: 24, aliases: ['PM'] },
      { id: 'opp', name: 'Order and Progress Party', kind: 'party', loyalty: 1, suspicion: 0, capacity: 55, seats: 20, aliases: ['OPP'] },
      { id: 'cartels', name: 'Cartels', kind: 'faction', loyalty: -6, suspicion: 0, capacity: 50 },
    ],
  };
}

export function testState(): GameState {
  return createState(testWorld());
}
