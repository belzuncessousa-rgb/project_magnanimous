# Stylesheets

`index.css` imports the files in numeric order. **Later files override earlier ones.** This is the cascade of the
old single `src/styles.css`, cut at its section boundaries (C-02). Many surfaces were restyled several times, so
one surface can be spread over several files. When you change a surface, edit the **current** file below. Add new
rules there too, unless you are deliberately cleaning up a legacy file.

| Surface | Current file | Older layers still in effect |
|---|---|---|
| Tokens, reset, buttons, base type | `00-base.css` | — |
| Desk, map glass, atlas, markers, off-map tokens | `30-desk-map.css` (merged, C-13) | — |
| Turn ledger (HUD), End Turn | `19-turn-ledger.css` | `02-rest-ui-tutorial.css`, `11-control-surfaces.css` |
| Tablet (device, apps, news, social, codex, reports) | `40-tablet.css` (merged, C-13); resting tablet in `30-desk-map.css` | `05-newspaper.css`, `09-documents-tablet-frame.css` |
| Dialogue / VN | `08-dialogue.css` (merged, C-13), `10-portraits.css` (figure size/placement) | — |
| Menus, modals, sidebar, controls | `12-interface-finish.css`, `16-focus.css` | `03-overlays.css`, `11-control-surfaces.css` |
| Readables, budget, vote, debt | `07-readables-screens.css`, `09-documents-tablet-frame.css` | — |
| Tutorial highlights | `02-rest-ui-tutorial.css` | — |
| Compact screens | the `@media` blocks inside each file | `06-compact-legacy.css` |

## Rules

- Use the palette tokens in `00-base.css` (`:root`) instead of new hex values when one fits.
- Never add rectangular focus outlines (see `16-focus.css` and `docs/DECISIONS.md`, *Interface system*).
- Avoid `!important`. Where an old rule needs beating, delete or edit the old rule instead.

## Cleanup tools

- `node tools/css-dedupe.mjs <file> --write` drops declarations that a later rule with the identical selector and
  media always overrides.
- `node tools/css-unused.mjs <file> --write` drops rules for classes that `src/` never creates.

Both tools are provably safe. To check any other style change, run `npm run dev`, then
`node tools/ui-snapshots.cjs snapshots/before`, make the change, and run `node tools/ui-snapshots.cjs snapshots/after`.
Compare the two runs with `python3 tools/ui-snapshots-diff.py snapshots/before snapshots/after`. The capture covers
the title, dialogue, map, menu, actions, tablet apps, settings, budget, vote and debt screens at 1600×900, 1280×800
and 390×844.
