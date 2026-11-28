# G-04 — Tactile map marker family

## Direction

The author rejected the old circles with letters or punctuation as map markers. The current token files are round coin faces, and the live proposal still uses a circular pin head. Replace the visible coin/disc treatment with small, sculpted location pins: a distinct physical object for each category, set on a shared short brass map-pin stem. Keep the object silhouette as the marker identity; do not place it on a coin, roundel, letter tile or generic badge.

Make the categories legible through their object shape and restrained material/color differences. The pin point anchors the marker at its real map location. Keep the marker hit area invisible and keyboard accessible. Hover, selected, locked and crisis states must remain distinguishable without a visible rectangular outline. Red is reserved for crisis. Use no letters, initials, emoji, exclamation marks or quotation punctuation.

## Category object mapping

- Palace: miniature portico / presidential building.
- Congress: stepped hemicycle / chamber.
- Treasury: closed bound ledger.
- Education: open book.
- Health: doctor's satchel with a small leaf detail (no medical cross).
- Foreign: small navigational globe on a meridian stand.
- Security: beveled shield.
- Project: arch bridge with supports.
- News: folded newspaper.
- Personal: sealed correspondence.
- Strike: raised blank cloth banner; no slogan or lettering.
- Crisis: fractured warning shard / broken plate, amber-red only for this category, without an exclamation glyph.

The art should feel like finely made brass, enamel, leather and paper miniatures viewed from above, with a consistent warm top-left highlight and soft short contact shadow. Vary the principal silhouette enough that categories remain distinguishable when rendered at 30–36 CSS px. Keep detail sparse: one strong silhouette and at most two interior marks per object.

## Asset and integration contract

Deliver one transparent SVG per category under `public/map/markers/<category>.svg`, using a shared 72×88 viewBox with the short pin point at the bottom. The map point is the center of that bottom tip. The visible object should stay inside the upper 68 px.

Claude can swap the old circular head and 54 px clipped PNG for the full SVG as an image while preserving each marker's existing location, accessible name, state and action. Update the art validator to accept these SVG masters. Keep current scene/readable behavior, marker IDs, map geometry, hit areas and selection mechanics unchanged.

The four readable pins delivered under `public/map/pins/` remain their own category: torn press clipping, sealed note, report and amber hazard plate. The readable incident plate has no exclamation mark; the map crisis object is a separate red reserved marker.
