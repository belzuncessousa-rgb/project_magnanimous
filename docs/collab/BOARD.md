# Task board

Status: `todo` · `doing` · `review` · `blocked` · `done`. Owner: `claude` · `chatgpt` · `author`.
Tags: `ui` (code/interaction), `art` (asset to make), `design` (visual decision/spec), `ux`, `tech`, `audio`.
Claim a task by setting `doing` + your name and pushing that change before you start. Newest tasks at the bottom of each
section. Move finished tasks to **Done** with the commit hash.

## Active

| ID | Owner | Status | Tags | Task | Notes / links |

|---|---|---|---|---|---|
| C-08 | claude | todo | ui | **Lara portrait selector** per the updated plan (`docs/art-candidates/lara-player-portrait-customization-plan.md`, cross-session handoff): three one-at-a-time selectors (outfit, hairstyle, paired pose/expression), others stay fixed when one changes; 168 pre-rendered portraits (no layer compositing). | waits on the portrait catalog |
| G-03 | chatgpt | todo | art | **Lara layered portrait sources** per the customization plan (starter set: 2 hair × 4 outfits × 2 poses × 3 expressions, aligned transparent layers). Needs author approval of Lara's face first. | |
| G-12 | chatgpt | review | art, design | **Tablet app icon family.** Four coordinated dimensional SVG tiles for News, Social, Codex and Reports. | Assets: `public/tablet/apps/{news,social,codex,reports}.svg`; integration reviewed in C-26 at 1280×800 and 1600×900; awaiting author review. |
| C-28 | claude | review | ui, tech | **Integrate sculpted map pins.** Replace the circular coin images with the 12 full transparent SVG pins, using the bottom tip as the location anchor; update art validation. Preserve marker IDs, hit areas, accessibility, selection states and actions. | `docs/design/G-04-map-markers.md`; art delivered at `public/map/markers/*.svg`. Reviewed: `c28-continent-1280.jpg`, `c28-continent-1600.jpg`, `c28-kunasai-1600.jpg`; implementation ready for author review. |
| C-26 | claude | review | ui, art | **Integrate the tablet app icon family** on home tiles and app bars while preserving labels, counts, accessible names and app behavior. Capture 1280×800 and 1600×900. | Art integrated; reviewed `c26-home-1280.jpg`, `c26-home-1600.jpg` and `c26-codex-appbar-1280.jpg`. |
| G-04 | chatgpt | review | design, art | **Map marker & token look.** Twelve transparent object pins replace the circular coin faces; readable objects are also delivered. | Art: `public/map/markers/*.svg` and `public/map/pins/*.svg`; integrated and reviewed in C-23/C-28 at PC sizes; awaiting author review. |
| G-05 | chatgpt | todo | audio | **Title theme + core UI sounds** per `docs/audio/SOUND-PLAN.md` P0 list, with provenance notes. Drop files at `public/audio/music/title-theme.ogg` and `public/audio/sfx/{ui-confirm,ui-back,choice-select,tablet-open,document-open,end-turn,crisis-alert}.ogg` — they play immediately, no code change. | C-07 done. Current session cannot reach the audio service (DNS failure) or read its local sign-in state; no audio generation available: service DNS and sign-in access fail; local Ogg rendering tools are absent. Matched title-theme prompt candidates are ready at `docs/audio/prompts/title-theme-candidates.md`. Recheck service access before generating. |

| A-01 | author | done | — | Confirm ChatGPT can push to this repo (Codex / GitHub connector with write access). If it can only read, it can paste files into chat and the author commits them with prefix `[chatgpt]`. | Author confirmed 2026-11-27: ChatGPT pushes directly. |
| C-13 | claude | doing | tech | **Merge legacy CSS layers per surface.** After C-02 each surface still spans 2–4 files (see `src/styles/README.md`). Fold older layers into the current file one surface at a time, verified with `tools/ui-snapshots.cjs`. | G-02 is complete; ready to start. |

| G-09 | chatgpt | done | design | **Retire legacy typefaces?** Besides Source Serif 4 + Inter, the UI still renders EB Garamond (`--serif`, base body text and some paper surfaces), Cormorant SC (`--caps`, panel titles) and Playfair Display. Decide whether each surface moves to Source Serif 4 / Inter, then Claude removes the extra fonts. | after C-09 |
| A-02 | author | todo | — | **Real free actions.** There is no `content/free-actions.json`, so the game ships the four `[DEMO]` placeholder actions (rally, envoy, benches, interview). `docs/story/production/TERM-FREE-ACTIONS.md` exists — the narrative track needs to turn it into content. | narrative track |
| C-25 | claude | review | ui, ux | **Country labels and off-map flag tokens.** Restyle country names as native cartographic labels; replace off-map brass nameplates with tactile 3D flag pins. Keep on-map country selection on exact land geometry. | `docs/design/G-11-offmap-flag-tokens-and-country-labels.md`; country labels reviewed; off-map flag-pin faces wait for author/world flag canon. |

## Done

| G-02 | chatgpt | Completed the PC visual review at 1600×900 and 1280×800, including the post-rename 2560×1080 C-33 production capture; C-34 closed without code change under the latest large/high and inward-facing portrait direction. | `4f18cc2` |

| C-33 | claude | Promoted the ultrawide art to `public/map/strategy-table-background-ultrawide.png`; post-rename 2560×1080 load accepted. | `e8bff86` |


| G-10 | chatgpt | Ultrawide desk art accepted after live C-33 captures at 2560×1080, 1600×900 and 1280×800; glass, map and wood/tablet composition read cleanly. | 878f922d, 6a127f15 |

| C-32 | chatgpt | Closed after reconciling conflicting seated-portrait guidance; latest author direction again confirms the large/high C-29 treatment. See C-34 and the final author confirmations. | 72a0a56c, 10b64c8a |

| G-07 | chatgpt | Reviewed five RGBA proposal portraits. Kept them as candidates; their full-body framing conflicts with the established portrait crop, so they do not replace the live in-game portraits. | (see log) |

| C-31 | claude | The phone vote list scrolls fully clear of the opaque footer; all party options and the final vote action remain reachable. Verified in `c31-vote-phone-scrolled.jpg`; PC layouts unchanged. | (see log) |

| G-08 | chatgpt | **Refine the seamless sea tile.** Added palette-matched `public/map/sea-tile.png`; live map verified seam-free in `c28-continent-1280.jpg`, `c28-continent-1600.jpg` and `c28-kunasai-1600.jpg`. | `735d31b` |
| ID | Owner | Task | Commit |
| C-18 | claude | Removed the tablet's three faint bottom light lines from the open and resting device; page mirror preserved. Verified at 3×. | `aa0c32f` |
| C-22 | claude | Whip-count sheet accepted at 1600×900 and 1280×800; paper-letterhead layout, hemicycle and party counts read clearly. | `aa0c32f` |
| C-24 | claude | Portfolio title accepted at 1600×900 and 1280×800; wordmark also fits at phone width after wrapping. | `aa0c32f` |
| C-29 | claude | Seated portraits at 76%, standing at 94%, centered in their slot; right slot mirrored inward. Large/high seated treatment remains the latest author-approved direction. | `7e96681` |
| C-16 | claude | Map is an integrated planning display inside the desk glass; the painted sea fills its unused area and the top ARVANE label is gone. Latest evidence: `c25-labels-continent-1280.jpg`. | (see log) |
| C-17 | claude | Turn ledger uses handwritten resource figures with formal letterhead and labels; readable at 1280×800. | (see log) |
| C-21 | claude | Actions folio reviewed: leather-and-gilt folio with distinct ivory action cards and brass costs; capture shows no duplicate action entries. | (see log) |
| C-27 | claude | Continuous same-speaker dialogue grouped under one name and binder line; 1600×900 and 1280×800 captures reviewed. | `b08ed08`, `650293b` |
| G-06 | chatgpt | **Retired by author.** Seated dialogue portraits stay in the foreground and may be lowered to read as seated; exact matching chairs and room-specific furniture overlays are unnecessary. | (see log) |
| C-23 | claude | Map readable cards and focus treatment reviewed; reactions/notes/incidents use distinct paper objects, glyphs removed, and focus has no rectangular box. Compact captures reviewed. | `53e41d1`, `650293b` |
|---|---|---|---|
| C-34 | claude | Closed without change: author confirmed big/high seated figures again (~03:45 UTC). | — |
| C-07 | claude | Audio manager (`src/ui/audio.ts`) + Sound settings (master / music / interface sliders, mute; saved). Hooks: title-theme on the title screen; ui-confirm (menu), ui-back (closing dialogs), choice-select, tablet-open, document-open, end-turn, crisis-alert. Silent until files exist at `public/audio/{music,sfx}/<id>.ogg`; tested with a temporary tone. `docs/screenshots/collab/c07-sound-settings.jpg`. | (see log) |
| C-15 | claude | Integrated Menu and Actions into the leather rail; keyboard focus is the gilt diamond/glow, with no box. | `b08ed08` |
| C-14 | claude | Map labels declutter after every pan/zoom: national/region/country names stay fixed, place and water names shift just enough to clear scene markers and each other (Vila Tamarin, St. Veldra, Tapira highlands, Upper Ibira river now readable). `docs/screenshots/collab/c14-*.jpg`. | (see log) |
| C-03 | claude | Responsive desk: below 16:9 the desk art anchors left so only bare wood is cropped (painted glass frame always complete at 16:10 / 1280×800 / 1366×768); the resting tablet is centred and sized on the remaining wood; with < 190 px of wood (4:3, phones) it falls back to resting over the glass corner. Ultrawide split into G-10. `docs/screenshots/collab/c03-*.jpg`. | (see log) |
| C-09 | claude | Fonts self-hosted (no Google Fonts request): `src/styles/fonts/fonts.css` generated by `tools/make-fonts-css.mjs` from Fontsource, OFL notices in `THIRD-PARTY-NOTICES.md`. Pixel-identical except the tablet clock now uses Inter's real 800 weight. | (see log) |
| C-05 | claude | Game loads `public/portraits/web/*.webp` (made from the PNG masters by `tools/make-portrait-webp.py`, hash-tracked in `web/manifest.json`) and falls back to the PNG master automatically. 96 MB → 8 MB per full cast; dialogue visually identical. | (see log) |
| C-04 | claude | `tools/check-art.mjs` now checks every room plate (scenes + staging presets), every portrait (scenes + `characters.json`, seated/standing per room), PNG alpha, WebP format, map/identity/token files, and warns on portraits > 2.5 MB. Runs in `npm test` (`tests/art.test.ts`). Today: OK, one warning (ivone-standing 2.6 MB). | (see log) |
| C-06 | claude | Readable pins (reaction/note/incident) now treat every visible map label as an obstacle and stay inside the glass; KUNASAI, Orvane, Mondrath, Tarev, Mognagna, Vila Tamarin etc. readable at both scales. Scene-marker part split into C-14. `docs/screenshots/collab/c06-*.jpg`. | (see log) |
| C-11 | claude | Resting tablet: all four apps verified, and it now also restores the **page** — News outlet, open report, Codex search text and scroll position — on the resting device and when reopened (previously only the app). `docs/screenshots/collab/c11-*.jpg`. | (see log) |
| C-10 | claude | Blocked End Turn: full-contrast ivory label, deep emerald body, brass rim, padlock on the brass coin; stays focusable (`aria-disabled`) so the tooltip/label explain why; a click while blocked gives a short nudge (off under reduced motion). No badge. `docs/screenshots/collab/c10-*.jpg`. | (see log) |
| C-12 | claude | Review captures for G-02: `docs/screenshots/collab/g02-{title,map,menu,tablet-social,tablet-social-resting,dialogue-p1-panorama,dialogue-p1-blue-room}-{1600,1280}.jpg`. | (see log) |
| G-01 | chatgpt | Completed the G-01 design-index questions and recorded art direction in `docs/ART-UI-CANON.md`. | `4bd8bac` |
| C-02 | claude | `src/styles.css` → `src/styles/*.css` (21 files in cascade order + README). Removed 624 overridden declarations and 107 rules for elements the UI never creates; CSS 94 → 72 KB; pixel-identical on 48 captured screens. Tools: `css-dedupe.mjs`, `css-unused.mjs`, `ui-snapshots.cjs`. | (see log) |
| C-01 | claude | Map fitted exactly inside the painted desk glass (any aspect), whole glass filled with atlas sea, atlas edges feathered, Federation token moved into visible water. Screens: `docs/screenshots/collab/c01-after*.jpg`. | (see log) |
| C-00 | claude | Collaboration setup: `AGENTS.md`, board, log, design index; stray root screenshots moved to `docs/screenshots/`. | (this commit) |
