# G-12 — Tablet app icon family

## Direction

Replace the four stock glyphs on the Kunasai tablet home screen and app bars with one custom icon family. The current home screenshot, `docs/screenshots/collab/c18-open-home-1280.jpg`, shows four unrelated bright tiles with generic symbols. Give the apps the careful, tactile finish of a premium everyday device; keep the overall device consumer-friendly rather than turning its home screen into another government dashboard.

## Art contract

Create four square SVG app tiles at `public/tablet/apps/{news,social,codex,reports}.svg`. Each asset includes its own rounded-square tile, subtle edge lighting, restrained depth and one legible raised/embossed object. Use the shared palette—emerald, muted sea-glass, ivory and brass—with no red tile. Keep the pictograms readable at the current 60 px home-screen size and the smaller app-bar icon size. No text, letters, initials, emoji, flags, or external dependencies.

- News: a folded newspaper sheet with a distinctive masthead band and two/three clean column rules.
- Social: two offset post cards with a clear speech tail and a tiny abstract image window; no user/avatar glyphs.
- Codex: a small open reference book with visible spine, layered pages and one bookmark.
- Reports: a bound presidential document with a clipped corner, narrow green binding and a restrained brass fastener.

Keep each silhouette immediately distinct. Use the same edge radius, border weight and light direction across the set. Do not add new app behavior or content.

## Integration and review

C-26 asks Claude to replace the stock symbols without changing app state, labels, counts, accessible names or interactions. Use the SVG artwork on both the home tiles and app bars, preserving accessibility labels. Remove the old per-app primary-color fills if they conflict with the art; the tile artwork should supply the color and depth.

Capture a fresh home screen at 1280×800 and 1600×900, plus one app bar at its native size. Review that all four icons remain distinct and legible on both sizes, and that the tablet wallpaper remains the visual anchor.
