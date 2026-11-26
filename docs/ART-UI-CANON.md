# Art and dialogue production direction

2026-11-25 — UI track. Narrative authority: docs/story/NARRATIVE-CANON.md and docs/story/production/. Keep scene IDs, rules, state changes and the other production track intact.

## Approved
- Contemporary tropical modernist architecture, rich wood, ivory stone, leather and historical furnishings. Cinematic painterly realism, no animated character art. Deep emerald control surfaces, ivory reading, restrained brass. Source Serif 4 and Inter (font files not yet installed).
- Kunasai flag: green field, thick white wave, gold sun disk (no rays). State shield echoes flag, surrounded by foliage, gold star, English REPUBLIC OF KUNASAI ribbon. Green presidential standard with gold arms/fringe. UI palette #173F35, #326554, #B99A60, #F0EBDD, #392B24.
- Central continuous transcript; choices inline, numbered and borderless; chosen responses retained. Narration and thoughts share italic styling. Word reveal is silent and skippable, click/Space to advance; mandatory breaks for narration/thoughts and speaker changes. Adjacent plain paragraphs from the same speaker advance together. Effects, screen hooks, choices, highlights, narration, and speaker changes keep their existing boundaries. Respect scrollback, locks, costs, tutorial and modal hooks.
- Lara normally offscreen. Fixed room slots, assigned per scene; overflow speaking characters get small icons by their speech. Keep all participants at normal light throughout. Identify speakers by name and use the overflow icon for speech outside the fixed slots. Mirror right-slot figures inward by default. Review pins, lettering, uniform details and lighting per pose. Use original orientation or a corrected right-facing master where necessary. Recurring characters get seated and standing transparent PNG assets with matching identity, costume and lighting. Side-angled natural posture. Chair belongs to environment; Livia's approved seated prototype has residual chair fragments that still require staging validation. Crop icons/codex from masters.
- Presidential reports partly physical, rare executive decisions ceremonial; news/social media tablet; map and analytics clean functional. Music/ambience and sparse interaction sounds; no typing sounds/voice acting.

## Scene-driven opening priorities
Consult staged drafts before art generation. Blue Room (p1-blue-room): long table, blue folders and curtains, Livia seated to Lara's left, Mertens right, eight other ministers represented in overflow. VP office (p1-panorama): informal sitting area with windows, television, coffee; Mertens and Livia. Presidential office: Plateau Square view, premium modernist interior, one or two guests. Residence (p1-first-night): garden behind palace, upstairs bedroom/sitting room and downstairs lounge with sofa, coffee table and television; Amanda physically present, family on the phone. Palace doors (inauguration): standing Mertens, public crowd implied. Use same assets in later recurring scenes, but avoid pretending everyone in the portrait metadata is physically in one room. Explicit arrivals, departures and background/pose changes need authored staging metadata later.
Sources: docs/story/production/p1-blue-room.md, p1-panorama.md, p1-first-night.md, PRODUCTION-ROADMAP.md.

## Character queue (appearance sketches, not new narrative canon)
Livia: approved wavy dark hair, silver streaks, freckles, tailored green jacket, ivory blouse, confident chin-on-hand seated pose. Mertens: late 50s/early 60s, slightly overweight, unshowy suit, relaxed and deceptively ordinary. Amanda: 42, short hair with some grey, reading glasses, practical clothes, serious yet approachable. Lara last. Fontes: reading glasses, measured academic/central-bank bearing. Marne: civil engineer/former mayor, practical tailoring. Salgado: crisp, direct legal professional and former colleague. Other cast appearances delegated; use canon and actual scenes, avoid caricatures or regional stereotypes.

## Asset contract and limitations
Backgrounds: public/backgrounds/<background-id>.webp. Character masters: public/portraits/<portrait-id>-seated.png or -standing.png, legacy <portrait-id>.png fallback. The presidential office and both pose masters for Livia and Mertens are installed. The renderer uses the map and initials where artwork is missing. Initial room presets support one/two fixed slots; slot-specific geometry, close foreground chair artwork/occlusion masks, art-directed codex crops and additional per-beat staging still need production. The renderer keeps a pause at prose boundaries except for adjacent plain speech from the same speaker. Verify TypeScript build, UI hooks, keyboard numbers (including disabled choices), scrolling, reduced motion, choice histories, portrait overflow and real 16:9 asset placement before declaring finished. Scene files and runner state transitions are unchanged.

## Implementation batch 2
- Scene staging presets extracted into a testable presentation-only module. Location label, date, compact national header and explicit return-to-latest added to dialogue. Same-speaker grouping was added later through a read-only runner lookahead.
- Added scalable interpretations of the approved flag/arms/standard in public/identity; exact decorative heraldic treatment may be refined against the reference. Font families requested via the existing Google Fonts stylesheet, with local fallback; offline packaging and OFL notices remain outstanding.
- Existing news edition now has a modern foreground tablet frame, outlet tabs and digital reading typography. No new social feed content or mechanics invented.
- Existing budget/debt screens get official letterhead and institutional material styling; vote remains a clean analytic panel. Their current mechanical semantics are unchanged and will need later reconciliation with the narrative redesign.
- Mertens paired pose art generated and alpha checked. The Livia and Mertens masters and presidential office were initially supplied in a separate starter pack. Other generation outputs were composite concept boards, not independently usable assets. No additional character identities approved.


## Implementation batch 3
- Strategic HUD, agenda, action sidebar, map view controls and end-turn action use dark emerald, contemporary sans-serif type and restrained brass. Informational region popups stay light. No changes to displayed resource values, positioning logic, map geography or rules. The title screen uses the national arms.
- Widescreen portrait proportions revised based on an independent browser composition test with Livia and Mertens. The test used the staged Counting Votes text and the presidential office as a stand-in for the VP office; two genuine alpha PNGs per actor, the now-superseded active-speaker dimming, numbered choices, and no JavaScript errors. The test is separate from the game. Seated chair/desk occlusion remains room-specific future work; do not bake an arbitrary desk mask into all scenes.
- Asset starter pack includes exactly public/backgrounds/president-office.webp and public/portraits/{livia,mertens}-{seated,standing}.png. The five starter assets are installed under public/. The office is an interim crop; Mertens's appearance remains provisional. No Amanda or other environment files are falsely listed as finished.
- Optional validation command: node tools/check-art.mjs. This checks the opening prototype art filenames and PNG alpha-capable color types without modifying any files.

## Opening scene artwork
- Installed the cabinet Blue Room, informal VP office, residence lounge at night and inauguration palace doors. The residence plate depicts the downstairs conversation. Upstairs staging now has bedroom and study plates with beat-based presentation cues.
- Amanda has paired transparent seated and standing portraits. In the first-night scene she occupies the fixed slot, while voices on the phone use the transcript.
- At compact widths the transcript shows speaker icons for fixed-slot characters as well as overflow speakers. Desktop keeps icons for overflow speakers.
- Edge verified the four installed rooms in the built game at 1600 x 900 and the compact Blue Room at 390 x 844. Livia's chair edge is still visible in the seated master. The right-slot portraits remain mirrored in these rooms.

## Minister briefings and Codex
- Installed the Blue Room night variant, Treasury and Justice offices, and the Planning model room. Fontes, Salgado and Marne have matching seated and standing transparent masters.
- The map Codex lists people from completed scenes using existing cast metadata and roles. It has portrait crops, initials when a portrait is unavailable, and search by name or role.
- Edge checked the four room presets at 1600 x 900 and Codex search at 390 x 844.

## Cabinet, reports and residence staging
- Dara, Kaval, Voss, Kesht and Aroun have seated and standing masters. Installed background plates for the hospital corridor, university hall, palace courtyard, intelligence office, Congress office and Vila Tamarin kitchen.
- First Night switches between the lounge, study and upstairs room, with cast changes keyed to scene beats. Staged telephone beats keep Amanda offstage after her departure. The current playable phone call retains Amanda while she is still in the room.
- Official map reports use the national arms, paper typography and viewport-aware sizing. Notes, reactions and incidents retain the dispatch card.
- Edge checked the cabinet briefing and visit backgrounds, the live First Night transition to the study, and a report card at 390 x 844.

## Congress, Vila Tamarin and the tablet
- Installed paired portraits for Lessa, Avros, Celia and Marco. The Congress gallery, residence garden and port authority office are available in playable scenes.
- Newspaper outlet tabs support arrow keys, Home and End, and announce the current reading panel. Edge checked tab selection and focus in the five-outlet game edition at 390 x 844.
