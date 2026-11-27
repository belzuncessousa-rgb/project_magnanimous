# Design index — where every art, UI and UX decision lives

Start here before making a visual decision. This file is a map, not a new source of truth: when a decision changes,
edit the source document listed below and only update this index if the location changes.

## Sources of truth

| Topic | Source | Owner |
|---|---|---|
| Author decisions (all areas, chronological) | `docs/DECISIONS.md` — UI sections: *UI (locked in Design Rules)*, *Interface system*, *Implementation batch 3* (map desk) | author |
| Art direction: style, palette, identity, rooms, characters, portraits, asset contract | `docs/ART-UI-CANON.md` | ChatGPT |
| Original design rules (rest state = map, VN mode, no numbers after choices) | `docs/gdd/02-design-rules.md` | author |
| Lara portrait customization plan | `docs/art-candidates/lara-player-portrait-customization-plan.md` | ChatGPT → Claude |
| Sound plan and prompts | `docs/audio/SOUND-PLAN.md`, `docs/audio/prompts/` | ChatGPT → Claude |
| Scene staging (who stands where, per-beat backgrounds) | `src/ui/layout.ts`, `src/ui/dialogue-stage.ts`; scene front-matter `background:` / `portraits:` | Claude |
| Colors and fonts in code | `src/styles.css` `:root` tokens (to be cleaned up in C-02) | Claude |
| Narrative canon (who characters are) | `docs/story/NARRATIVE-CANON.md`, `docs/story/BIBLE.md`, `docs/gdd/04-characters/` | author |

## Visual system in one screen

- **Look:** contemporary tropical modernist architecture; rich wood, ivory stone, leather. Cinematic painterly realism.
  No animated character art.
- **Palette:** emerald `#173F35` (persistent controls) · `#326554` · brass `#B99A60` (selected/required/primary, restrained)
  · ivory `#F0EBDD` (reading and decision surfaces) · dark wood `#392B24`. Red only for crises and harmful outcomes.
- **Type:** Source Serif 4 (titles, reading), Inter (controls, data).
- **Identity:** flag = green field, thick white wave, gold sun disk without rays. Arms, standard and mark in
  `public/identity/*.svg`.
- **Surfaces by function:** presidential reports partly physical (paper, letterhead); news/social on a consumer tablet;
  map and analytics clean and functional; rare executive decisions ceremonial.
- **Interaction rules:** no rectangular focus outlines; focus/hover/selected/disabled distinct; menus trap focus and
  close with Escape; End Turn's outstanding requirements live in its tooltip; no Agenda panel.

## Screens and their state

| Screen | Code | Status | Open work |
|---|---|---|---|
| Title | `src/ui/app.ts` (`showTitle`) | arms + emerald card | G-02 review |
| Map desk (rest state) | `src/ui/map.ts`, `src/ui/hud.ts` | painted atlas in a glass display on a wood/leather desk; turn ledger; tablet on the wood | C-01 frame alignment, C-03 compact, C-06 markers |
| Dialogue (VN mode) | `src/ui/vn.ts`, `src/ui/dialogue-stage.ts`, `src/ui/layout.ts` | room plate + fixed portrait slots + central transcript, numbered inline choices | G-06 chair/desk occlusion |
| Tablet (News, Social, Codex, Reports) | `src/ui/tablet.ts` | consumer device, home screen with app icons | G-02 review |
| Reports / readables | `src/ui/app.ts` (readable card) | paper with national arms | — |
| Budget, debt, vote | `src/ui/screens.ts` | letterhead paper; vote is analytic | mechanics to be reconciled with narrative redesign |

## Asset inventory (2026-11-27)

| Kind | Path | Count | Notes |
|---|---|---|---|
| Room plates | `public/backgrounds/<id>.webp` | 29 | 1672×941. All 27 referenced by scenes exist; `residence-study` and `residence-upstairs` are used by per-beat staging. |
| Character masters | `public/portraits/<id>-{seated,standing}.png` | 55 characters | RGBA PNG, every character in `content/characters.json` has at least one. 104 MB total (C-05). |
| Portrait candidates | `public/portraits/proposal-import/` | 5 | undecided (G-07) |
| Map art | `public/map/arvain-terrain-art.png`, `kunasai-terrain-art.png`, `terrain*.jpg` | — | interaction geometry is separate: `public/map/regions.json` |
| Desk | `public/map/strategy-table-background.png` | 1 | 1672×941; painted glass opening ≈ x 2.5–67.5 %, y 14–85 % |
| Map tokens | `public/map/tokens/*.png` | 12 | congress, palace, education, health, treasury, project, security, foreign, personal, news, strike, crisis |
| Identity | `public/identity/*.svg` | 4 | flag, arms, mark, presidential standard |
| Audio | `public/audio/` | 0 | plan only |
| Fonts | Google Fonts link | — | not bundled yet (C-09) |

## Open design questions for ChatGPT (G-01)

1. **Desk composition.** The right third of the desk is bare wood with the tablet on it. Should anything else live
   there (folders, phone, nameplate, the reports stack)? Must stay uncluttered and not compete with the map.
2. **Map markers.** Current pins are flat colored discs (purple quote, brown note, red alert). Do they fit the painted
   atlas? Propose a marker family (see G-04).
3. **End Turn control.** It is a pill with a brass coin. When required scenes remain it is disabled and grey-green;
   is that legible enough, or should "blocked" be a distinct brass-outlined state?
4. **Compact (phone) layout.** Is a phone layout a target at all, or is the floor a small laptop / Steam Deck
   (1280×800)? This changes how much effort C-03 deserves.
5. **Dialogue occlusion.** Per-room foreground overlays (chair backs, desk edges) vs. cleaner portrait masters.
6. **Lara.** Her face needs an approved base before the layered set (G-03).
