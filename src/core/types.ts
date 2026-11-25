import type { Axis } from './tuning';

export type Compass = Record<Axis, number>;
export type FlagValue = boolean | number | string;

export const REGION_INDICES = ['approval', 'stability', 'col', 'education', 'infrastructure', 'output', 'population'] as const;
export type RegionIndex = (typeof REGION_INDICES)[number];

export interface Region {
  id: string;
  name: string;
  approval: number;
  stability: number;
  output: number;
  education: number;
  infrastructure: number;
  population: number;
  col: number;
  popSensitivity: number;
  welfareSensitivity: number;
  /** calibration constants so the starting state is at rest + accumulated "Events" modifiers */
  base: { approval: number; stability: number; output: number; education: number; col: number };
  /** what the region's people believe and care about (alignment with the president moves approval) */
  compass?: Compass;
  relevance?: Compass;
  /** per-capita output last turn (for Δ(Output/Population)%) */
  prevOutputPerCapita: number;
}

export interface Country {
  id: string;
  name: string;
  relation: number;
  trade: number;
  aggressiveness: number;
  /** economic weight 0..100 (GDD: "Economic Weight" / GDP proxy) */
  weight: number;
  military: number;
  culturalPower: number;
  culturalInfluence: number;
  embargo: boolean;
  /** context neighbours: newspaper/map only, excluded from EPI */
  context: boolean;
  base: { relation: number; aggressiveness: number };
  compass?: Compass;
  relevance?: Compass;
  diploSensitivity?: number;
}

export type ActorKind = 'character' | 'party' | 'faction';

export interface Actor {
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
  /** counts towards IPI */
  ipi: boolean;
  /** multiplies TUNING.alignment.kLoyalty */
  sensitivity?: number;
  /** alignment penalty at game start (votes compare against it) */
  alignStart?: number;
  base: { loyalty: number; capacity: number };
  aliases: string[];
}

export type ResourceId = 'PT' | 'FC' | 'IPI' | 'EPI';
export type Resources = Record<ResourceId, number>;

export interface QueuedNews {
  paper?: string;
  id: string;
}

export interface GameState {
  version: number;
  chapter: number;
  /** turn inside the chapter (1-based) */
  turn: number;
  /** global turn counter (1-based) */
  turnIndex: number;
  dateLabel: string;
  regions: Record<string, Region>;
  countries: Record<string, Country>;
  actors: Record<string, Actor>;
  compass: Compass;
  flags: Record<string, FlagValue>;
  resources: Resources;
  taxes: { domestic: number; trade: number };
  nation: {
    debtInterest: number;
    culturalPower: number;
    costPerCapita: number;
    /** legacy (pre-billions saves) */
    fcBracket?: number;
    /** principal paid every turn (bn), set on the debt screen */
    amortization?: number;
    /** outstanding public debt, in FC */
    debt?: number;
    /** FC paid last turn: interest and principal (for UI) */
    debtPaid?: { interest: number; principal: number };
    baseRevenue?: number;
  };
  completedScenes: string[];
  newsQueue: QueuedNews[];
  printedNews: string[];
  popupQueue: string[];
  shownPopups: string[];
  /** pop-ups on the map this turn */
  activePopups: string[];
  crisis: Record<string, { meter: number; fired: boolean; signalled: boolean; steps?: number[] }>;
  cooldowns: Record<string, number>;
  freeActionsUsed: Record<string, number>;
  ended: boolean;
}
