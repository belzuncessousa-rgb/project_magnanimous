// Player-facing wording for indices (docs/gdd/05-mechanics-reference/indices/index.md).

export function relationWord(r: number): string {
  if (r <= -10) return 'Rival';
  if (r < -7) return 'Terrible';
  if (r < -4) return 'Bad';
  if (r < -1) return 'Cold';
  if (r < 2) return 'Professional';
  if (r < 5) return 'Good';
  if (r < 9) return 'Cooperation';
  return 'Full support';
}

export function militaryWord(m: number): string {
  if (m < 10) return 'Weak';
  if (m < 35) return 'Questionable';
  if (m < 65) return 'Established';
  if (m < 80) return 'Respectable';
  if (m < 95) return 'Powerful';
  return 'Global power';
}

export function stabilityWord(v: number): string {
  if (v < 20) return 'Collapsing';
  if (v < 35) return 'Volatile';
  if (v < 50) return 'Tense';
  if (v < 65) return 'Steady';
  if (v < 80) return 'Secure';
  return 'Unshakeable';
}

export const pct1 = (v: number) => `${v.toFixed(1)}%`;
export const int = (v: number) => `${Math.round(v)}`;
export const money = (v: number) => `$${v.toFixed(v < 10 ? 1 : 0)}bn`;
/** FC is money in billions: always one decimal */
export const bn = (v: number) => `${v.toFixed(1)} bn`;
/** Resource costs for buttons/tooltips: "12.5 bn · 1 IPI" */
export function costText(c: Partial<Record<string, number>>): string {
  return Object.entries(c)
    .filter(([, v]) => v)
    .map(([k, v]) => (k === 'FC' ? bn(v!) : `${+v!.toFixed(1)} ${k}`))
    .join(' · ');
}
export const millions = (v: number) => `${Math.round(v)}M`;

export const KIND_LABEL: Record<string, string> = {
  fixed: 'Event',
  conditional: 'Opportunity',
  personal: 'Personal',
  briefing: 'Briefing',
  ambient: 'Ambient',
  crisis: 'Crisis',
};

export const KIND_GLYPH: Record<string, string> = {
  fixed: '★',
  conditional: '◆',
  personal: '♥',
  briefing: '▤',
  ambient: '•',
  crisis: '!',
};
