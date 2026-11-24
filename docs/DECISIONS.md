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
