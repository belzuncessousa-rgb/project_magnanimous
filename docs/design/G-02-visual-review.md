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
