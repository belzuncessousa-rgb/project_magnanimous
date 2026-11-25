# Scene file format (contract between writers and the engine)

Scenes live in `content/scenes/**/*.md`. The format mirrors the author's Notion "Scene Formatting Convention"
(docs/gdd/06-scenes/index.md) so scenes can be copied between Notion and the repo with minimal edits.
All player-facing text is **English**, second person, present tense.

## File layout

```markdown
---
id: p1-inauguration            # unique, kebab-case
chapter: 1
turn: 1                        # turn inside the chapter where it becomes available
title: Inauguration Address    # shown on the map marker tooltip
kind: fixed                    # fixed | conditional | personal | briefing | ambient | crisis
location: capital              # map anchor: region id, country id, or point id from public/map/regions.json
order: 1                       # optional: forced position (fixed scenes that must play first)
when: "!flag.tutorial_skipped" # optional availability expression (see Expressions)
portraits: [mertens]           # character ids that can appear
background: palace-doors       # optional background id
---

## opening

Narration paragraph (plain text).

*Thought paragraph — Lara's private voice (italic, no quotes).*

> **Caio Mertens:** "Speech by an NPC (blockquote, bold name)."

> "Speech by Lara (blockquote without a name)."

1. **You are still in this for them** `[+1 WELF]` `[CoL +1 @ all]`
   ↳ *The work toward a more equal country is yours for life.*
2. **"Spoken option in quotes"** `[flag: promised_CoL = true]` `→ balcony`
   ↳ > Accompanying speech after choosing.

→ balcony
```

### Beats
- `## beat-id` starts a beat. The first beat in the file is the entry point. Optional display title after `|`:
  `## topic-econ | Work`.
- A beat plays its prose blocks in order, then shows its choice list (if any).
- After a choice: its `↳` accompanying blocks play, its effects apply, then it jumps to its `→ target`
  if given, otherwise falls through to the beat's trailing `→ target`, otherwise to the next beat in the file.
- A beat with no choices and no `→` ends the scene. `→ END` also ends the scene explicitly.
- Cross-scene: `→ scene:p1-cabinet` ends this scene and immediately starts another (rare; normally scenes return to the map).

### Prose blocks
| Markdown | Role |
|---|---|
| plain paragraph | Narration |
| `*italic paragraph*` | Thought (Lara's inner voice) |
| `> **Name:** "text"` | NPC speech (`Name` must match a character display name or id) |
| `> "text"` | Lara's speech |
| `> text` continuation lines | same speech block |
| `⚙️ ...` line | designer note — ignored by the engine |

Inline `*italic*` inside narration/speech is allowed.

### Choices
- Numbered list items. Label in `**bold**` (keep to one line). Spoken options use quotes inside the bold.
- Tokens after the label, each in backticks, any order.
- Accompanying text: indented lines beginning with `↳` (a speech `↳ > ...`, a thought `↳ *...*`, or narration).
  Multiple `↳` lines allowed.

### Tokens (mechanics)
| Token | Meaning |
|---|---|
| `[+2 ECON]` `[-1 STRUCT]` `[0 FORCE]` | compass shift. Axes: ECON WELF IDEN FORCE STRUCT RELIG |
| `[approval +5 @ ibicui]` | regional index delta. Indices: approval, stability, col, education, infrastructure, output |
| `[approval -5 @ ibicui, mognagna, ibira]` | several regions |
| `[col +1 @ all]` | all regions (`@ national` = all regions too) |
| `[mertens opinion +5]` / `[mertens loyalty +5]` | character loyalty (opinion = loyalty) |
| `[mertens suspicion +10]` / `[cartels capacity -5]` | character/faction suspicion or capacity |
| `[OPP capacity -2]` `[OPP opinion +1]` | party/faction indices (ids: pm, opp, cp, nf, cv, ca, fff, armed_forces, communion, media, business, unions, indigenous, landless, cartels) |
| `[federation relation +1]` | foreign diplomatic relation (country ids from regions.json) |
| `[flag: name = true]` `[flag: name = 3]` `[flag: name += 1]` | set/increment a global flag |
| `[cost: 2 PT]` `[cost: 1 IPI, 2 FC]` | resource cost (PT, FC, IPI, EPI); choice is disabled if unaffordable |
| `[gain: 1 IPI]` | resource gain |
| `[show if: expr]` | option hidden unless expr true |
| `[lock if: expr]` | option shown greyed (with lock) when expr true |
| `[if: expr]` on a `↳` line or token group | only applies/plays when expr true |
| `[once]` | in a hub, option disappears after being chosen once (sets flag `seen.<beat>.<n>`) |
| `[news: paper-id headline-id]` | queue a newspaper item (see content/news) |
| `[pop: popup-id]` | queue an ambient map pop-up |
| `→ beat-id` | jump target |

Old-Notion aliases accepted: `capital` = FC in `[cost: 2 capital]`; `@ Ibicuí` (display names / accents) map to ids.

### Expressions
`flag.name`, `!flag.name`, `flag.count >= 2`, `approval@ibicui < 40`, `loyalty.mertens > 3`, `compass.ECON > 2`,
`resource.PT >= 2`, `chapter == 1`, `turn >= 2`, `&&`/`&`, `||`/`|`, `!`, parentheses, numbers, true/false.
Unknown flags are false/0.

## Other content files
- `content/characters.json` — characters (id, name, role, party, portrait id, loyalty, capacity, suspicion, compass, relevance).
- `content/world.json` — regions & countries starting indices (from docs/gdd), parties/seats, factions.
- `content/chapters.json` — chapter/turn structure: per turn a date label (irregular dates), list of scene ids
  available, ambient pop-ups, news editions.
- `content/news/*.md` — newspaper items (front-matter: paper, when, priority; body: headline + short text).
- `content/popups.json` — ambient map pop-ups (id, location, when, text).
- `content/free-actions.json` — free actions (id, label, cost, targeted?, valid targets, effects tokens, when, cooldown).

## Additions (round 2)

### Locations
`location:` should be where the event happens: a point id from `public/map/regions.json` `points`
(capital, katanai, st-veldra, vila-tamarin, atiaiaba, sugar-bay, mognagna-sertao, tapira-mines, upper-ibira,
taua-hills, strait), a region id, or a country id. Optional `token:` front-matter picks the marker icon
(congress, palace, education, health, treasury, project, security, foreign, personal, news, strike, crisis).

### Tutorial highlights
`[highlight: <ui-id>]` on a prose line (or as a standalone token line) highlights a UI element while that block is
shown. ui-ids: `hud`, `hud-pt`, `hud-fc`, `hud-ipi`, `hud-epi`, `hud-approval`, `hud-date`, `map`, `map-toggle`,
`markers`, `readables`, `actions`, `agenda`, `end-turn`. Flag `tutorial_done` is set by the tutorial scene;
the engine hides costs on choices until `flag.tutorial_done`.

### Readables (small optional items on the map between scenes)
`content/readables.json`: array of `{ id, chapter, turn, location, kind: "reaction"|"note"|"report"|"incident",
title, from?, when?, text }`. Shown as small pins at `location`; clicking opens a short paper card. No choices, no
effects (except an optional `flags` object set when read). Existing `content/popups.json` items are treated the same.

### Ministries & budget (chapter 2)
`content/ministries.json`: `[{ id, name, minister, tiers: { cut: {fc_per_turn, effects}, low:{...}, regular:{...},
high?:{...} }, initiatives: [{ id, name, summary, effects_per_turn: "<tokens>", once?: "<tokens>" }] }]`.
A scene token `[open: budget]` opens the budget screen; the player picks a tier per ministry and, for Low, which
initiative. Result flags: `budget.<ministry> = cut|low|regular|high`, `initiative.<id> = true`.
Recurring effects apply each turn update; FC per turn is deducted at turn start.

### Congress votes
`content/bills.json`: `[{ id, title, summary, positions: { <party>: { base: -1..1, ifs?: [{ when, delta }] } },
whip_costs?: { <party>: "<cost tokens>" } }]`. Seats come from world.json. Token `[vote: <bill-id>]` in a scene
opens the vote screen: shows the projected count per party (as words: for / leaning / undecided / against), lets the
player spend IPI/FC/PT on whip deals per party (OPP prices per GDD: small=IPI, medium=more IPI or FC with corruption,
high=FC + ministry promise), then resolves. Result flag `vote.<bill-id> = passed|watered|failed`, and
`vote.<bill-id>.margin` = yes seats − 50.

### Crises
`content/crises.json`: `[{ id, scene, threshold, from_chapter?, signals: [{ at, readable }], pressure: [{ expr, weight }] }]`
— pressure is recomputed each turn update as Σ weight·value(expr); crossing `threshold` makes `scene` available
(kind crisis); crossing each `signals.at` publishes that readable/news item.

### Debt screen (round 4)
`[open: debt]` opens the debt screen. Money (FC) is in billions. Options: pay down the principal (slider: bn per
turn, up to 25% of the discretionary income), borrow more from the Fund (slider: one-off amount up to 15% of the
balance; cash now, balance grows), status quo. Live preview of balance, next interest and treasury.
If the scene has already set `flag debt_policy` (1 pay down / 2 borrow / 3 status quo), only that option is shown,
so the choice's prose and reactions stay consistent. The engine keeps `debt_policy` and stores the pay-down amount
(`nation.amortization`); interest = 4% of the balance every turn.

### Money units (round 4)
`FC` in `[cost: …]`, `[gain: …]`, `fc_per_turn` and `whip_costs` is money in **billions** and may have decimals
(`[cost: 12.5 FC]`). 1 old FC ≈ 10 bn.
