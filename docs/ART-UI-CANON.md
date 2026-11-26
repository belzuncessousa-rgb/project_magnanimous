# Art and dialogue production direction

2026-11-25 — UI track. Narrative authority: docs/story/NARRATIVE-CANON.md and docs/story/production/. Keep scene IDs, rules, state changes and the other production track intact.

## Approved
- Contemporary tropical modernist architecture, rich wood, ivory stone, leather and historical furnishings. Cinematic painterly realism, no animated character art. Deep emerald control surfaces, ivory reading, restrained brass. Source Serif 4 and Inter (font files not yet installed).
- Kunasai flag: green field, thick white wave, gold sun disk (no rays). State shield echoes flag, surrounded by foliage, gold star, English REPUBLIC OF KUNASAI ribbon. Green presidential standard with gold arms/fringe. UI palette #173F35, #326554, #B99A60, #F0EBDD, #392B24.
- Central continuous transcript; choices inline, numbered and borderless; chosen responses retained. Narration and thoughts share italic styling. Word reveal is silent and skippable, click/Space to advance; mandatory breaks for narration/thoughts and speaker changes. Adjacent plain paragraphs from the same speaker advance together. Effects, screen hooks, choices, highlights, narration, and speaker changes keep their existing boundaries. Respect scrollback, locks, costs, tutorial and modal hooks.
- Lara normally offscreen. Fixed room slots come from scene cast metadata; approved beats may override a pose or location in the presentation layer. Overflow speakers get small icons by their speech. Keep all participants at normal light throughout. Identify speakers by name and use the overflow icon for speech outside the fixed slots. Mirror right-slot figures inward by default. Livia and Mertens keep their original orientation because their portraits carry jacket pins. Add an asset-specific original-orientation exception or a corrected right-facing master when lettering, insignia, clothing details or directional lighting require it. Recurring characters get seated and standing transparent PNG assets with matching identity, costume and lighting. Side-angled natural posture. Chair belongs to environment; Livia's approved seated prototype has residual chair fragments that still require staging validation. Crop icons/codex from masters.
- Presidential reports partly physical, rare executive decisions ceremonial; news/social media tablet; map and analytics clean functional. Music/ambience and sparse interaction sounds; no typing sounds/voice acting.

## Scene-driven opening priorities
Consult staged drafts before art generation. Blue Room (p1-blue-room): long table, blue folders and curtains, Livia seated to Lara's left, Mertens right, eight other ministers represented in overflow. VP office (p1-panorama): informal sitting area with windows, television, coffee; Mertens and Livia. Presidential office: Plateau Square view, premium modernist interior, one or two guests. Residence (p1-first-night): garden behind palace, upstairs bedroom/sitting room and downstairs lounge with sofa, coffee table and television; Amanda physically present, family on the phone. Palace doors (inauguration): standing Mertens, public crowd implied. Use same assets in later recurring scenes, but avoid pretending everyone in the portrait metadata is physically in one room. Explicit arrivals, departures and background/pose changes need authored staging metadata later.
Sources: docs/story/production/p1-blue-room.md, p1-panorama.md, p1-first-night.md, PRODUCTION-ROADMAP.md.

## Character queue (appearance sketches, not new narrative canon)
Livia: approved wavy dark hair, silver streaks, freckles, tailored green jacket, ivory blouse, confident chin-on-hand seated pose. Mertens: late 50s/early 60s, slightly overweight, unshowy suit, relaxed and deceptively ordinary. Amanda: 42, short hair with some grey, reading glasses, practical clothes, serious yet approachable. Lara last. Fontes: reading glasses, measured academic/central-bank bearing. Marne: civil engineer/former mayor, practical tailoring. Salgado: crisp, direct legal professional and former colleague. Other cast appearances delegated; use canon and actual scenes, avoid caricatures or regional stereotypes.

## Asset contract and limitations
Backgrounds: public/backgrounds/<background-id>.webp. Character masters: public/portraits/<portrait-id>-seated.png or -standing.png, legacy <portrait-id>.png fallback. All 29 room plates and 26 seated/standing character pairs are installed. The dialogue UI uses the scene background and portrait metadata, falls back to map and initials for missing assets, and has per-beat staging for the residence. Right-slot mirroring is automatic with per-pose exceptions. Portrait masters feed the overflow speaker circles and searchable Codex. Remaining art work includes room-specific close chair/desk overlaps and more detailed cast-position staging. Adjacent plain dialogue from one speaker advances together while narration, thoughts, speaker changes, choices, highlights and UI hooks retain their pauses.

## Implementation batch 2
- Scene staging presets extracted into a testable presentation-only module. Location label, date, compact national header and explicit return-to-latest added to dialogue. Same-speaker grouping was added later through a read-only runner lookahead.
- Added scalable interpretations of the approved flag/arms/standard in public/identity; exact decorative heraldic treatment may be refined against the reference. Font families requested via the existing Google Fonts stylesheet, with local fallback; offline packaging and OFL notices remain outstanding.
- Existing news edition now has a modern foreground tablet frame, outlet tabs and digital reading typography. No new social feed content or mechanics invented.
- Existing budget/debt screens get official letterhead and institutional material styling; vote remains a clean analytic panel. Their current mechanical semantics are unchanged and will need later reconciliation with the narrative redesign.
- Mertens paired pose art generated and alpha checked. The Livia and Mertens masters and presidential office were initially supplied in a separate starter pack. Other generation outputs were composite concept boards, not independently usable assets. No additional character identities approved.


## Implementation batch 3
- Strategic HUD, agenda, action sidebar, map view controls and end-turn action use dark emerald, contemporary sans-serif type and restrained brass. Informational region popups stay light. The map has two geographic scales: a political overview of Arvane from Veldmoor to Torreval's southern canal, where Kunasai is one country and international borders carry restrained political fills; and a closer Kunasai terrain view with a calm painted atlas landscape, five regions and fine organic internal borders. Keep the terrain artwork clipped to repository geography; retain exact regional boundaries, labels and selectable areas above it. The overview does not show Moreya, Karath or other continents. The title screen uses the national arms.
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


## UI and image integration status
- Transcript presentation, numbered inline choices, silent skippable word reveal, same-speaker grouping, overflow icons, compact-width speaker circles, scrollback and room staging are in the game.
- The national tablet uses the current news edition. Outlet tabs support keyboard navigation, an announced reading panel and a compact-width layout. Existing official budget and debt screens and report cards carry national letterhead. The vote remains an analytical screen.
- Room and portrait assets use public/backgrounds/<background-id>.webp and public/portraits/<portrait-id>-<seated|standing>.png. Scene background and portraits fields select the room and fixed participants. The presentation layer chooses seated/standing poses and right-slot orientation without changing scene choices or effects. Missing portrait masters fall back to the legacy portrait-id.png; missing environment art falls back to the game map.
- The searchable Codex uses cast members from completed scenes and portrait masters. The compact map HUD, agenda and actions use the approved emerald, ivory and brass palette.

## Interface system
- Use deep emerald for persistent control surfaces, warm ivory for reading and decision surfaces, and restrained brass for selected, required or primary states. Keep danger red reserved for crises and harmful outcomes. Use Source Serif 4 for titles and Inter for compact controls and data.
- Main map controls, resource HUD, agenda, free-action drawer, region information, reports, title screen, menus and decision windows share these materials, border weights, focus treatment and spacing. At compact widths, retain every control and resource; rearrange them into deliberate rows, allow long panels to scroll, and keep decision actions full-width where needed.
- Region and foreign-area map targets are keyboard-operable. Focus, hover, selection, targeting validity and unavailable state must remain visually distinct. Scene pins keep their type glyph, brass ring for required scenes, and red only for crisis status.
- Menus and modal choices announce themselves to assistive technology, move focus into the open panel, keep keyboard focus inside, close with Escape, and return focus when dismissed. Toggle choices expose their selected state.
- The presidential tablet has separate News and Social apps. News preserves newspaper mastheads and outlet selection. Social uses concise cards attributed to existing publication names from the current edition; opening a card returns to that outlet’s full article. Do not add fictional account holders, user posts, replies, reactions or engagement numbers until their content and mechanics are approved.
