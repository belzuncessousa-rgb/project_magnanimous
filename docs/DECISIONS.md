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
- Each turn: ~4 main interactions the player can do in any order (minister briefings, meetings, decisions, visits)
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
  and can involve corruption.
- Chapter 1 offers only 3 projects (candidates: 4, 5, 6 and/or 1). Project 2 unlocks only in chapter 4 and only with prior
  tech/knowledge investment. Unchosen chapter-1 options may carry over to chapter 4 (to be decided then).
- The inherited Tercilio Luz overpriced unfinished work is kept as a story thread.
