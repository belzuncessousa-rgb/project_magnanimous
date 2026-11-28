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

## Initial screenshots requested — captured in the 2026-11-28 review

Please provide captures in `docs/screenshots/collab/` for:

- `g02-map-1600.jpg` and `g02-map-1280.jpg`: desktop and compact-PC map, with the capital/label area visible.
- `g02-tablet-social-1600.jpg`: tablet opened to the current Social timeline, plus a second capture with the same page visible on the resting device.
- `g02-dialogue-1600.jpg`: a two-person scene and a scene with overflow speakers, to check continuous grouping, name color/binder bar, right-slot mirroring and equal lighting.
- `g02-title-menu-1600.jpg`: title and pause menu.

Use existing current content and scenes. The screenshots are for visual review; do not add temporary story content to make them.

## Initial review gate — superseded by the current status at the end of this file

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

## Initial browser review — before follow-up fixes — 2026-11-28

Reviewed `g04-proposal-1280.jpg`, `c15-desk-1280.jpg`, `c15-leather-controls-states.jpg`, `c16-planning-glass-1280.jpg`, `c17-desk-1280.jpg`, `c18-social-1280.jpg`, `c18-open-home-1280.jpg`, `c18-resting-apps.jpg`, and `c23-readable-cards.jpg`.

- **C-15:** Menu and Actions now sit naturally in the leather edge with no idle button boxes. The control-state capture still shows a thin rectangular focus frame; use the gilt lettering and diamond detail to show focus instead.
- **C-16:** the top map title is gone and the map reads more clearly as a display fitted to the table's glass. Confirm the new sea asset in the live map before review closure.
- **C-17:** the resource figures now look hand-annotated by Lara while the labels and letterhead stay formal; legibility at 1280×800 is good.
- **C-18:** the new open-device capture has no home-indicator line. The Social timeline has a clear short-post hierarchy and the resting display mirrors app/page state.
- **G-04/C-23:** paper, letter, and hazard silhouettes are more tangible and distinct. The reaction pin still uses quotation punctuation and the incident sign an exclamation mark; remove both glyphs. Use the object silhouette alone, keep red for crises, and preserve the brass off-map plaques.
- **G-08:** added `public/map/sea-tile.png` in `735d31b`. The 1024px palette-matched PNG repeats in a browser at the in-game 769px scale without a visible grid seam. It still needs a capture in the live game map at 1280×800 and 1600×900.

The author-facing review gate remains open for the marker glyph cleanup, non-rectangular keyboard focus, and the live sea-map captures. The table controls, physical ledger and tablet are converging on the agreed design.


## Earlier seated-figure note — superseded
The lower-placement direction was superseded by the author's later confirmation recorded in `docs/DECISIONS.md` and the portrait verification below. Keep C-29's large, high seated portraits; do not lower them.


## Latest cross-screen review — 2026-11-28

Reviewed current 1280×800 and 1600×900 captures for the planning-table map, handwritten ledger, tablet icons, action folio, country labels, sculpted map pins, Congress vote sheet and portfolio title.

- **Accepted:** C-16 map glass/sea integration, C-17 handwritten ledger, C-18 tablet page persistence and distinct app treatment (with the newer C-26 icon captures), C-21 tactile action folio, C-24 desktop portfolio cover, C-25 cartographic country labels, C-26 tablet icon integration and C-28 map-pin integration. These are ready for author review where the board remains in `review`.
- **C-21:** the action folio reads as a distinct desk object; the capture shows each of the four current actions once. The placeholder content remains outside this UI task.
- **C-22:** the 1600×900 whip-count sheet is coherent and legible. The phone capture is unusable: party rows and the footer overlap. Reflow or scroll the content at narrow widths; keep the current desktop composition.
- **C-24:** the desktop cover is accepted. On the phone capture the title is cut off at the right edge; scale or wrap it within the leather cover.
- **C-25:** the country labels read naturally at compact PC scale. Keep the off-map flag faces pending approved national flags; current brass plaques remain temporary.



## Seated portrait verification — superseded 2026-11-28

The earlier 12vh-lowered portrait pass was superseded by the author's later direction in `docs/DECISIONS.md`: keep figures big and high in the foreground, let the room serve as ambience, and always mirror right-slot figures inward. Reviewed the updated `c29-seated-1600.jpg`, `c29-seated-1280.jpg` and `c29-standing-1600.jpg`. The scale and inward-facing placement read clearly at the tested PC sizes. This review is historical: the author has since asked for seated portraits to remain in the foreground but be lowered until they read as seated, even if sitting in open air. C-34 will recheck that treatment; the mirrored right-slot rule remains.


## Tablet and responsive review correction — 2026-11-28

- The older `g02-tablet-social-*` captures show an empty-feed state and a white bar under the device; they predate the newer C-18/C-26 work and are stale. Use `c18-social-1280.jpg`, `c25-labels-continent-1280.jpg` and `c26-home-1280.jpg` for current review.
- C-18's populated Social screen is a vertical stream of newspaper-publication posts. This is a reasonable authored-content fallback, but it does not yet show personal posts or photos. Keep all content authored; do not invent handles, people, counts or images. The layout can be reviewed as a public-feed surface until the story track supplies social-native posts/media.
- The latest resting-tablet map capture appears to retain a small white bar beneath the device. Claude should verify whether it is tablet chrome or painted desk art and remove it if it is the home indicator the author rejected. The resting face must still mirror the live tablet page.
- For C-22 and C-24, review and fix 1280×800 first. Phone captures are secondary; no phone-only polishing should delay the compact-PC target.


## Current review — 2026-11-28

Reviewed Claude's C-18/C-22/C-24 update in `aa0c32f`:

- **C-18 accepted:** the 3× resting-tablet edge capture is clean; no light line remains beneath the screen/bezel. The exact app/page mirroring remains intact.
- **C-22 accepted for PC:** the whip-count sheet fits 1280×800 and remains legible at 1600×900. The phone footer has an opaque paper surface. C-31 is now verified: after scrolling, all party options and the final vote action are clear of the footer (`c31-vote-phone-scrolled.jpg`).
- **C-24 accepted:** the title cover fits at 1280×800 and the complete wordmark fits in the phone capture.

The PC target is covered for these surfaces. The narrow-phone C-31 check is also complete; the accepted desktop layouts were unchanged.


## Current review status — 2026-11-28 03:31 UTC

The earlier map-marker, End Turn, tablet-persistence, ledger, label-clearance, phone vote/footer and portfolio-title items in this file are historical review notes. The board and later review sections record the follow-up captures and acceptances; do not treat the old first-pass comments as active defects.

- **Accepted for the current PC review:** the integrated tablet apps and persisted resting face; handwritten turn-ledger figures; leather Menu/Actions controls; map label decluttering; tactile readable/map pins; the responsive vote sheet and portfolio title. Portrait placement will be reviewed again under the latest author direction in C-34. The corresponding evidence and commits are listed on `docs/collab/BOARD.md` and in the later review sections above.
- **C-33 visual integration accepted:** `c33-desk-2560x1080.jpg` shows the complete ultrawide glass and leather rails; `c33-unchanged-1600.jpg` and `c33-unchanged-1280.jpg` confirm the accepted 16:9 and 16:10 layouts remain intact.
- **Remaining close-out:** promote the candidate desk image to its production filename, update `DESK_ART_WIDE`, and confirm a post-rename runtime load at 2560×1080. G-10 art is accepted; C-33 remains open for that path/load confirmation.
- C-34 (lower seated figures) is closed: the author confirmed big/high twice by direct question (FINAL in DECISIONS.md).
