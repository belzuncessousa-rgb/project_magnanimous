# Decisions log (source of truth for the build)

Only the **new GDD** in Notion ("📖 GDD — Project Magnanimous") counts. The "📦 GDD Archive — Sessions 1–21" is discarded
(exception: minister NAMES + base concept may be reused, rewritten in the new tone).

## Platform
- Web game: TypeScript + Vite, deployed to GitHub Pages from `main` (Settings → Pages → Source: GitHub Actions).
- Steam later via Electron/Tauri wrapper.
- Game text in English. Story content lives only in this repo (no writing back to Notion).

## Scope v1
- Only Lara Vento (SOC, Movimento Popular, from Ibicuí). VP is fixed: Caio Mertens (OPP coalition price).
- First playable target: chapters 1–3 (~2h) ending in a newspaper summary + "to be continued".
- Arennian Federation lies to the SOUTH (Moreya). Inauguration speech text must say south.

## Map
- Hand sketch: reference/map-sketch.jpg. Clean geometry: tools/map-geometry.mjs → public/map/regions.json.
- Letters: A=Vassel, B(left)=Mondrath, B(right)=Tarev, C=Veldmoor, D=Orvane, E=Arenza, F=Selvara, G=Cabral, H=Torreval.
- Strait (Mondrath/Vassel) on the far west opens into the gulf that bathes Ibicuí and Mognagna. Rivers Arvane & Ibira run north to Tekoku.
- Feedback on first painted map: keep the terrain detail, but borders must be organic (not polygonal);
  do NOT invent extra land at the edges; provide TWO views: (1) terrain/detail view, (2) political colour map by state.
- Art budget: Creative Claw, ~12 credits/image at 2K (88 left after map v1). Spend on map + map tokens.

## UI (locked in Design Rules)
- Rest state = full-screen map, clickable regions/countries with info popup, event markers, free-actions sidebar, HUD (PT, FC, IPI, EPI, Approval%).
- VN mode = map dimmed, centre text column, portraits left/right. No numeric feedback after choices; compass hidden.
- Visual references: Suzerain + Crusader Kings/EU.

## Newspapers (Suzerain-style)
- 3 papers with political slant + 2 more neutral thematic ones:
  (a) international relations & geopolitics, (b) science/health/environment.
- Mix of reactive headlines (player choices) and world news independent of the player.

## Story structure (first block)
- Chapter 1: debt + great projects focus, with intro to the political scenario and the representation crisis.
- Chapter 2: deeper politics (representation crisis), small economic follow-ups, first international visits.
- Light distribution of education, health, environment, security across chapters.
- Lara needs a personal arc (not yet designed).
- Process: decide each front with the author one by one before writing beyond P1-S1 + 2 scenes.

## Rhythm (topic 1 — closed)
- Irregular, visible dates. Chapter 1 happens within the first month; later turns can span many months.
- Each turn: an IRREGULAR number (3–6ish) of main interactions the player can do in any order (minister briefings, meetings, decisions, visits)
  + an ambient layer of map pop-ups/incidents (crime activity, river levels, etc.) and small news.
- Every sector minister (health, education, environment, security...) gets an overview/briefing scene early:
  what is going on, their plans, the crises brewing (brain drain, environmental, etc.) even if payoff comes later.
- First great project is chosen at the END of chapter 1 (main decision of the chapter, surrounded by other content).

## Debt (topic 2 — closed)
- The whole inherited debt is owed to "the Fund" (IMF analog). Interest ≈ 11% of initial revenue.
- Ch1: Fontes reveals the hole (no decision). Ch2 decision inside the budget: pay principal / borrow more (Fund only) / status quo.
- Ch5 opens many options: Fund again, Zharan, the Federation directly, domestic bonds (cheaper the more nationalist
  the government — rare upside of nationalism), and default/repudiation (gated by how the government was run).
- The inheritance has faces: two previous governments — a PM government (Tercilio Luz) and a CP (center-right) government.
  One left an overpriced great work (superfaturamento) financed by the Fund loan; the other a plain corruption scandal,
  deepening the democratic crisis.

## Great projects (topic 3 — closed)
- Six projects: 1 Rare-earth mining (Ibira) · 2 Tech & university hub (Tekoku/Strawberry) · 3 Sertão irrigation canal (Mognagna)
  · 4 Railway/logistics corridor (Tapira→ports) · 5 Ibira river hydro dam · 6 Housing & sanitation in the peripheries (Ibicuí+).
- Combos kept: 1+2 (national chips/Strawberry), 1+4 (mineral exports), 3+4 (+Zharan trade), 5+1/5+2 (cheap energy),
  5 vs 3 anti-combo (water crisis in Tekoku), 6+security (weakens cartels in peripheries).
- Other side effects come from the index system, not dedicated chains (e.g. mining output needs Ibira stability → you must
  deal with cartels; indigenous/environmental conflict is one event chain). Avoid multiplying event chains.
- Projects NEVER fail. Instead: follow-up events until inauguration (pick contractor, oversight, incidents) that add or save cost
  (any resource: FC, PT, IPI, EPI, approval — not only money) and can involve corruption.
- Chapter 1 offers exactly 3 projects: 1 (rare earths), 4 (railway), 6 (housing & sanitation). Project 2 unlocks only in chapter 4 and only with prior
  tech/knowledge investment. Unchosen chapter-1 options may carry over to chapter 4 (to be decided then).
- The inherited overpriced unfinished work of Tercilio Luz (PM, populist) IS project 6, sanitation: choosing it = finishing
  your own party's tainted work (cheaper, scandal attached). The CP government after him had a plain bribery scandal.

## Politics & representation (topic 4 — closed)
- Resources: PT = the president's personal time/energy, mostly spent in free actions (rallies, visiting a great project to
  reduce trouble, etc.). IPI = legislative/cabinet leverage for Congress deals.
- Unicameral Congress for all votes; the Senate exists only as the subject of the representation reform.
- No simple majority: PM + OPP coalition is short of 50%. Lara is NOT PM's party leader: the PM bench has its own leader
  she must convince, and OPP must be paid too. CV is strongly opposed (a real communist party).
- The representation reform has a recurring face: an influential Ibicuí senator (CP or CA) — to be created.
- Drama: Lara is from Ibicuí; rebalancing helps her state but hurts PM's poor base in Ibira/Mognagna.
- Endings (from Notion 7. Endings): final campaign speech before the 2nd-term election, assembled from sphere fragments
  (Economy 3x3 matrix, Democracy + representation addendum, Corruption, Geopolitics 5 outcomes + Mondrath addendum,
  Social, Security). Term 1 "sets the stage" for term 2 (e.g. a pivot left to run with CV) — not designed yet, not needed now.
- NOTE: the endings geopolitics fragment calls the Federation "Northern Partnership" — must become southern.

## Cabinet (topic 5 — in progress)
- See docs/CABINET-NOTION.md for what Notion already defines. Archive may be used as inspiration.
- Big cabinet on purpose (complex, long game). ~10 ministers.
- Mertens shows up to collect the alliance price; NOT a plotting VP. OPP prefers to play behind the scenes, wants benefits, not the presidency.
- No "fire minister" free action. Cabinet changes come late in the term (re-election preparation) or as specific events with costs.
- PT = "Presidential Time": broad resource (rallies, visits, oversight, meetings...), examples were not exhaustive.
- Geopolitical lines: Zharan / Federation / isolationism / the regional bloc ("Northern Partnership" = Mercosur-but-stronger,
  EU-like bloc of Kunasai + neighbours) / in-between neutral "friend of all". The endings page currently uses
  "Northern Partnership" for the Federation fragment — rename that one; the bloc keeps the name.
- Cabinet answers: Claude creates the missing ministers (archive names as inspiration). Environment is NOT a ministry:
  the theme is spread across existing ministries.
- Great projects final list (reconciled with Notion Planning page): 1 Rare-earth mining (Ibira) · 2 Tech & university hub
  (Tekoku; ch4, gated) · 3 Mognagna Water Program (desalination) · 4 National Railway Integration · 5 Ibira Fluvial Network
  · 6 Housing & sanitation (Luz's unfinished work). Hydro dam and Katanaí port → term 2. Chapter 1 offers 1, 4, 6.
  (Old 5-vs-3 water anti-combo dropped with the dam.)
- Before asking more design questions: read the full mirrored GDD in docs/gdd/ (many answers are already there).

## Facts confirmed by reading the full mirrored GDD (docs/gdd)
- Treasury minister = Alexander (surname TBD by Claude). Achievement "That's an order from your commander - tell Alexander to figure it out".
- Lara is PM party leader; PM congressional (bench) leader = Pelan Avros (Statist faction, corruption scheme). Lara must win the bench.
- OPP holds VP (Mertens) + two of {Chief of Staff, Planning & Development, Justice & Interior}; J&I is Salgado (PM),
  so OPP holds Chief of Staff and Planning & Development.
- Congress seats: PM 24, OPP 20, CP 16, NF 10, CV 5, CA 5, FFF 5 (= 85%; remaining 15% = small parties/independents, to define).
  PM+OPP = 44%. Even PM+OPP+CV = 49% < 50%.
- Cartels P1 hook: at the end of the first meeting with the VP and Chief of Staff, CoS briefs Lara on the cartels (monitor
  quietly / loudly, ignore, soften). Cartels: Red Tree and Blue Piranhas (uneasy truce).
- Jaguars: imperial-era elite presidential guard; a quick event offers defunding them (−1 survival counter).
- Early endings: Impeachment (corruption + press freedom irony), Assassination (survival counter 2). Regular: Reelection /
  Not reelected / Voluntary retirement. Epilogue = campaign speech.
- Region start values (approval for Lara): Tekoku 15, Ibicuí 41, Mognagna 80, Tapira 25, Ibira 70. Many regional arcs are
  written in docs/gdd/03-world/3.1-* (Ibicuí decentralisation/strikes, St. Veldra renaming, Tobacco legacy/Trembolo;
  Mognagna Coronéis, desalination, migration; Tapira drought in P5, transgenics; Ibira infrastructure options, cartels,
  rare minerals gated by education or foreign concessions, ecotourism).
- Resources formulas, rest values, taxation are specified in docs/gdd/05-mechanics-reference.
- CV: backed Lara in the election (PM+CV+OPP electoral coalition) but got no ministry; now votes case by case and charges
  dearly ("critical support").
- Congress seats final: PM 24, OPP 20, CP 17, NF 12, FFF 9, CA 8, CV 6, Independents 4 (=100). PM+OPP+CV = 50% (no majority).

## International (topic 6 — closed)
- Federation: always markedly arrogant, somewhat imperialist toward Kunasai and the rest of the continent.
- Identities: Federation (south, beyond the canal; de-facto owner of the Fund; wants open market, Ibira minerals, Kunasai away
  from Zharan) · Zharan (other continent, east; patient state superpower; infrastructure for minerals/ports) · Arenza (behind
  the eastern belt; proud mid-size democracy, historical RIVAL of Kunasai; partnership of equals → Northern Partnership pillar)
  · Tarev (east border; fragile Zharan satellite; cartels manufacture there) · Veldmoor (peninsula north of Tekoku; small, rich,
  scientific, culturally Veldran; credibility for democratic behaviour) · Mondrath (as written in GDD).
- Context neighbours (Vassel, Orvane, Selvara, Cabral, Torreval): newspaper/map only in v1.
- Chapter 2 first contacts: Federation ambassador (debt, polite threat) · Zharan envoy (investment in the chosen project)
  · Arenza president courtesy visit (tests Lara; bloc seed) · Mondrath cold letter.
- Northern Partnership: any neighbour can be brought in; Arenza is REQUIRED to start it; others need a minimum relationship
  or some manoeuvre (pressure/deal) to force them in. Success is graded (more/less members, depth).
- Claude creates leader names and decides any big foreign event in chapters 1–3.

## Light themes & crises (topic 7)
- Terminology: CoL = Conditions of Living (quality of life), never "cost of living".
- Each theme (health, education, environment, security) gets: early minister briefing, ambient pop-ups/news, ministry budget
  tier in ch2, and small decisions — distributed across ch1–3.
- Military Dictatorship Files: only a SEED in ch1–3 (petition/news), explodes later.
- Cartels: conceding ≠ war. Conceding → cartel DOMINANCE in their regions (fewer visible problems, they control part of the
  vote, but heavy CoL/stability damage etc. — effects to be designed richer). WAR happens if you ANTAGONISE them without
  eliminating them (reducing their Capacity to Act) first. Cartel war is too early for ch3.
- Ch3 crisis candidates: Ibicuí periphery strikes; representation-reform impasse (more than one may trigger).
  Trigger conditions must be rich (multiple indices/flags), not one-liners.
- Ministers: Claude may give own arcs where they fit.
