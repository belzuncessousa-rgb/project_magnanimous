# G-02 — playable UI visual review

Date: 2026-11-27  
Reviewer: ChatGPT, art direction  
Reference capture: `docs/screenshots/collab/c01-after.jpg` (Claude's 1600×900 C-01 result)  
Target: desktop 16:9 first; compact PC / Steam Deck at 1280×800. Phone is a fallback and should not receive polish ahead of these PC sizes.

This is a presentation review only. Do not change scene text, IDs, state effects, requirements, costs, or other mechanics.

## Map desk

**Keep:** the current C-01 map is fitted inside the painted glass; the screen reads as part of the presidential desk, and the atlas uses a coherent painted sea around the land. Preserve the desk art and this inset-screen relationship.

**Fix:** the capital-area pins collide with the Kunasai label and nearby country labels. Fan/cluster tokens at shared cities and keep label clear zones. Anchor event tokens to named cities or locations wherever the geometry provides one; do not spread a location's tokens over its text. Selection/focus must still trace the exact geographic contour and must not introduce a rectangular highlight.

**Check:** show the continental fit through the named canal without exposing an unfinished edge. Inspect both the continental and Kunasai views. Keep the screen, table, ledger and tablet fixed while map zoom changes.

## End Turn

The current blocked button is too faint to read and feels detached from the desk trim. Give it a clear, tactile blocked treatment with legible type and a restrained brass boundary/indicator. Keep it unmistakably unavailable while required matters remain. Keep the count/reason in the hover/focus tooltip and accessible label only; never display a separate count badge.

## Resting tablet and turn ledger

The hardware now reads as a consumer tablet and the turn summary reads as presidential stationery; retain both directions. Verify the resting tablet after opening News, Social, Codex and Reports: on returning it to the table, its visible face should show the same last-used app/page, not reset to the app launcher. The caption under the device stays removed. Keep the ledger fixed in the screen HUD and ensure it does not obscure important map content at 1280×800.

## Screens still needing a fresh look

Please provide captures in `docs/screenshots/collab/` for:

- `g02-map-1600.jpg` and `g02-map-1280.jpg`: desktop and compact-PC map, with the capital/label area visible.
- `g02-tablet-social-1600.jpg`: tablet opened to the current Social timeline, plus a second capture with the same page visible on the resting device.
- `g02-dialogue-1600.jpg`: a two-person scene and a scene with overflow speakers, to check continuous grouping, name color/binder bar, right-slot mirroring and equal lighting.
- `g02-title-menu-1600.jpg`: title and pause menu.

Use existing current content and scenes. The screenshots are for visual review; do not add temporary story content to make them.

## Review gate

G-02 is not ready for author review until the map tokens no longer obstruct labels, the blocked End Turn reads clearly, tablet state persistence is visually confirmed, and the current title, menu, tablet, ledger and dialogue have all been reviewed at the compact-PC target. Keep changes in small commits and ask for art direction in the log if an implementation constraint changes the agreed look.

## New author feedback — 2026-11-27

Add these constraints to the current implementation and review. They are author-confirmed:

- Put Menu and Actions into the green leather desk edging as tactile, integrated lettering/controls. Remove the generic floating rectangular-button treatment; keep labels easy to read and controls easy to activate.
- Preserve the fixed paper-ledger format and Office of the Presidency letterhead. Change only the resource numerals to a restrained, legible handwritten face, like Lara annotated the figures herself.
- Remove the narrow white home-indicator line beneath the tablet. The desk tablet must display the exact same screen/page currently left open in the physical tablet, including after switching apps.
- Give News, Social, Codex and Reports individually designed interiors. Social should read as a familiar vertical short-post feed; include inline photos only when authored content/art exists. Do not invent social users, reactions, counts, posts or mechanics.
- Remove the top map label `ARVANE`. The atlas may not read as an opaque rectangular print over leather. The fitted glass opening itself is the display: continue compatible sea texture through the areas around the atlas so the screen reads as one technological map surface.
- Replace generic circle-plus-letter/glyph markers with a tactile token family. Protect map labels and anchor markers to their real location. G-04 is active and will supply the art direction.

These changes are presentation-only. Preserve the map geometry, game interactions, current content and narrative/state behavior.

## Latest browser review — 2026-11-28

Reviewed `g04-proposal-1280.jpg`, `c15-desk-1280.jpg`, `c15-leather-controls-states.jpg`, `c16-planning-glass-1280.jpg`, `c17-desk-1280.jpg`, `c18-social-1280.jpg`, `c18-open-home-1280.jpg`, `c18-resting-apps.jpg`, and `c23-readable-cards.jpg`.

- **C-15:** Menu and Actions now sit naturally in the leather edge with no idle button boxes. The control-state capture still shows a thin rectangular focus frame; use the gilt lettering and diamond detail to show focus instead.
- **C-16:** the top map title is gone and the map reads more clearly as a display fitted to the table's glass. Confirm the new sea asset in the live map before review closure.
- **C-17:** the resource figures now look hand-annotated by Lara while the labels and letterhead stay formal; legibility at 1280×800 is good.
- **C-18:** the new open-device capture has no home-indicator line. The Social timeline has a clear short-post hierarchy and the resting display mirrors app/page state.
- **G-04/C-23:** paper, letter, and hazard silhouettes are more tangible and distinct. The reaction pin still uses quotation punctuation and the incident sign an exclamation mark; remove both glyphs. Use the object silhouette alone, keep red for crises, and preserve the brass off-map plaques.
- **G-08:** added `public/map/sea-tile.png` in `735d31b`. The 1024px palette-matched PNG repeats in a browser at the in-game 769px scale without a visible grid seam. It still needs a capture in the live game map at 1280×800 and 1600×900.

The author-facing review gate remains open for the marker glyph cleanup, non-rectangular keyboard focus, and the live sea-map captures. The table controls, physical ledger and tablet are converging on the agreed design.
