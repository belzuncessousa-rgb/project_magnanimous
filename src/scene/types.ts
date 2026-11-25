import type { CondEffect, ResourceAmounts } from '../core/effects';
import type { Expr } from '../core/expr';

export type ProseRole = 'narration' | 'thought' | 'speech';

export interface Prose {
  role: ProseRole;
  /** speech only: display name / id as written; undefined = Lara */
  speaker?: string;
  /** inline markdown (*italic*, **bold**) */
  text: string;
  cond?: Expr;
  effects: CondEffect[];
}

export type Target =
  | { kind: 'beat'; beat: string }
  | { kind: 'end' }
  | { kind: 'scene'; scene: string }
  | { kind: 'unresolved'; raw: string };

export interface Requirement {
  amounts?: ResourceAmounts;
  expr?: Expr;
  raw?: string;
}

export interface Choice {
  /** 1-based position in its list (used for `seen.<beat>.<n>`) */
  n: number;
  label: string;
  spoken: boolean;
  effects: CondEffect[];
  cost: ResourceAmounts;
  show?: Expr;
  lock?: Expr;
  req: Requirement[];
  once: boolean;
  goto?: Target;
  /** raw goto text before resolution */
  gotoRaw?: string;
  after: Prose[];
}

export type Step =
  | { type: 'prose'; prose: Prose }
  | { type: 'choices'; choices: Choice[] }
  | { type: 'effects'; effects: CondEffect[] }
  | { type: 'goto'; target: Target; raw: string; cond?: Expr };

export interface Beat {
  id: string;
  title: string;
  steps: Step[];
  hub: boolean;
}

export interface SceneMeta {
  id: string;
  chapter?: number;
  turn?: number;
  title: string;
  kind: string;
  location?: string;
  order?: number;
  when?: Expr;
  whenRaw?: string;
  portraits: string[];
  background?: string;
  required?: boolean;
  /** anything else from the front-matter */
  extra: Record<string, unknown>;
}

export interface Scene {
  id: string;
  meta: SceneMeta;
  beats: Beat[];
  warnings: string[];
  source?: string;
}
