// Cross-reference checks for content (unknown ids in effects, chapters, news refs...). Pure.
import type { CondEffect } from '../core/effects';
import { isAllRegions, resolveActor, resolveCountry, resolveRegion } from '../core/ids';
import type { GameState } from '../core/types';
import type { Scene, Step } from '../scene/types';
import type { ContentBundle } from './schema';

function effectsOfSteps(steps: Step[]): CondEffect[] {
  const out: CondEffect[] = [];
  for (const st of steps) {
    if (st.type === 'effects') out.push(...st.effects);
    if (st.type === 'prose') out.push(...st.prose.effects);
    if (st.type === 'choices') for (const c of st.choices) { out.push(...c.effects); for (const a of c.after) out.push(...a.effects); }
  }
  return out;
}

export function sceneEffects(sc: Scene): CondEffect[] {
  return sc.beats.flatMap((b) => effectsOfSteps(b.steps));
}

/** `locations`: ids known to the map (regions, countries, points). */
export function validateContent(c: ContentBundle, state: GameState, locations?: Set<string>): string[] {
  const w: string[] = [];
  const sceneIds = new Set(c.scenes.map((s) => s.id));
  const newsIds = new Set(c.news.map((n) => n.id));
  const popupIds = new Set(c.popups.map((p) => p.id));
  for (const sc of c.scenes) {
    if (locations && sc.meta.location && !locations.has(sc.meta.location) && !resolveRegion(state, sc.meta.location) && !resolveCountry(state, sc.meta.location)) {
      w.push(`${sc.id}: unknown location '${sc.meta.location}'`);
    }
    for (const { effect: e } of sceneEffects(sc)) {
      if (e.type === 'region' && e.regions !== 'all') for (const r of e.regions) if (!isAllRegions(r) && !resolveRegion(state, r)) w.push(`${sc.id}: unknown region '${r}'`);
      if (e.type === 'actor' && !resolveActor(state, e.actor)) w.push(`${sc.id}: unknown character/faction '${e.actor}'`);
      if (e.type === 'country' && !resolveCountry(state, e.country)) w.push(`${sc.id}: unknown country '${e.country}'`);
      if (e.type === 'news' && !newsIds.has(e.id)) w.push(`${sc.id}: unknown news item '${e.id}'`);
      if (e.type === 'popup' && !popupIds.has(e.id)) w.push(`${sc.id}: unknown pop-up '${e.id}'`);
    }
    for (const b of sc.beats)
      for (const st of b.steps) {
        const targets = st.type === 'goto' ? [st.target] : st.type === 'choices' ? st.choices.map((ch) => ch.goto).filter(Boolean) : [];
        for (const t of targets) if (t && t.kind === 'scene' && !sceneIds.has(t.scene)) w.push(`${sc.id}: jump to unknown scene '${t.scene}'`);
      }
  }
  for (const ch of c.chapters)
    for (const t of ch.turns) {
      for (const id of t.scenes) if (!sceneIds.has(id)) w.push(`chapters: ch${ch.id} turn ${t.turn} lists unknown scene '${id}'`);
      for (const id of t.popups) if (!popupIds.has(id)) w.push(`chapters: ch${ch.id} turn ${t.turn} lists unknown pop-up '${id}'`);
      for (const n of t.news) if (!newsIds.has(n.id)) w.push(`chapters: ch${ch.id} turn ${t.turn} lists unknown news '${n.id}'`);
    }
  for (const cr of c.crises) if (cr.scene && !sceneIds.has(cr.scene)) w.push(`crises: ${cr.id} fires unknown scene '${cr.scene}'`);
  for (const p of c.popups) if (locations && p.location && !locations.has(p.location) && !resolveRegion(state, p.location)) w.push(`popups: ${p.id} unknown location '${p.location}'`);
  return w;
}
