// Lara's cosmetic appearance (C-08, docs/art-candidates/lara-player-portrait-customization-plan.md).
// Three independent selectors over a catalog of 168 pre-rendered portraits:
//   public/portraits/lara/combinations/<outfit>/<hair>/<demeanor>.png
// Missing combinations fall back to the existing lara-standing master (never a near match).

export const LARA_OUTFITS = [
  ['official-dark', 'Formal state suit'],
  ['business-slate', 'Businesswoman'],
  ['professor-tweed', 'Professor'],
  ['kunasai-patriotic', 'Patriotic'],
  ['party-sapphire', 'Formal party dress'],
  ['revolutionary-red', 'Revolutionary'],
] as const;
export const LARA_HAIR = [
  ['shoulder-waves', 'Natural waves'],
  ['low-bun', 'Low bun'],
  ['layered-bob', 'Layered bob'],
  ['half-up-waves', 'Half-up waves'],
] as const;
export const LARA_DEMEANOR = [
  ['neutral', 'Neutral'],
  ['compassionate', 'Compassionate'],
  ['severe', 'Severe'],
  ['austere', 'Austere'],
  ['skeptical', 'Skeptical'],
  ['intellectual', 'Intellectual'],
  ['concentrated', 'Concentrated'],
] as const;

export interface LaraLook { outfit: string; hair: string; demeanor: string }
export const DEFAULT_LARA_LOOK: LaraLook = { outfit: 'official-dark', hair: 'shoulder-waves', demeanor: 'neutral' };

/** Portrait stems for loadPortrait(): the selected combination, then Lara's existing masters. */
export function laraPortraitStems(look: LaraLook): string[] {
  return [`lara/combinations/${look.outfit}/${look.hair}/${look.demeanor}`, 'lara-standing', 'lara-seated', 'lara'];
}

/** Step one selector by ±1 (wrapping); the other two fields are left untouched. */
export function stepLook(look: LaraLook, field: keyof LaraLook, dir: 1 | -1): LaraLook {
  const list = field === 'outfit' ? LARA_OUTFITS : field === 'hair' ? LARA_HAIR : LARA_DEMEANOR;
  const i = Math.max(0, list.findIndex(([id]) => id === look[field]));
  const next = list[(i + dir + list.length) % list.length]![0];
  return { ...look, [field]: next };
}

export function labelOf(field: keyof LaraLook, id: string): string {
  const list = field === 'outfit' ? LARA_OUTFITS : field === 'hair' ? LARA_HAIR : LARA_DEMEANOR;
  return list.find(([x]) => x === id)?.[1] ?? id;
}
