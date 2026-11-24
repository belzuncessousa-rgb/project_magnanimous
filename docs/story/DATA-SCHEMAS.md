# Content data schemas

`docs/SCENE-FORMAT.md` is the contract for scene files and lists the other content files in one line each. This page pins
down the shapes those lines left open. Keep it simple: plain JSON, ids in snake/kebab case, every id referenced must exist.

## Writing conventions the scene format left implicit

- **Conditional accompanying text.** Put the `[if: expr]` token right after the `↳`, before the prose:
  `` ↳ `[if: flag.address_skipped_welf]` Near the barrier, an old man… `` and
  `` ↳ `[if: flag.promised_power]` > **Amanda Troes:** "…" ``. Prose blocks outside choices are never conditional;
  to branch prose, route through a one-option beat whose options use `[show if: …]` (see `p1-first-night` → `pivot`).
- **Beats without choices** must end with `→ target` (or `→ END`); otherwise the scene ends there.
- **Expressions** additionally use `==` (e.g. `flag.opp_price_1 == 1`). Numeric flags hold small enums; their meanings are
  listed in `docs/story/BIBLE.md` §9.
- **Scene completion.** The last choice of a scene sets `seen_<scene_id_with_underscores>` when later content depends on it
  (e.g. `seen_planning_briefing`). The engine may also record seen scenes itself; writers should not rely on it.
- **Lara's speech** always uses quotes: `> "…"`. NPC speech: `> **Display Name:** "…"`.
- Character tokens use the character id from `content/characters.json`: `[fontes loyalty +1]`, `[mertens opinion +5]`.
  Party/faction tokens use the lowercase ids from `content/world.json`: `[opp opinion -2]`, `[cartels capacity -3]`.

## content/characters.json

Top-level array. One object per character.

| field | type | notes |
|---|---|---|
| `id` | string | used in tokens, `portraits`, expressions (`loyalty.<id>`) |
| `name` | string | display name; must match the bold name in speech blocks |
| `short` | string | how the narrator usually refers to them |
| `role` | string | job title as shown in UI |
| `group` | `player` \| `personal` \| `government` \| `cabinet` \| `party` \| `faction` \| `foreign` | |
| `ministry` | string? | cabinet only: `chief_of_staff`, `treasury`, `planning`, `justice`, `defense`, `intelligence`, `health`, `education`, `exterior` |
| `party` | string \| null | party id |
| `country` | string? | foreign only |
| `base` | string | region id or `capital` |
| `portrait` | string | portrait asset id |
| `loyalty` | number −10..10 \| null | starting Personal Loyalty (`opinion` is an alias in tokens) |
| `capacity` | number 0..100 \| null | Capacity to Act |
| `suspicion` | number 0..100 \| null | |
| `compass` | object? | `{ECON, WELF, IDEN, FORCE, STRUCT, RELIG}` −10..10 |
| `relevance` | object? | same keys, 0..1 |
| `redline` | string? | designer reference |
| `note` | string? | designer reference, ignored by the engine |

Characters without compass/relevance do not drift; their loyalty moves only through tokens.

## content/world.json

Object with: `nation`, `regions[]`, `countries[]`, `congress`, `parties[]`, `factions[]`, `papers[]`.

- `regions[]`: `id`, `name`, `population` (M), `approval`, `stability`, `output` (bi/month), `education`, `infrastructure`,
  `col`, `compass`, `relevance`, `flags[]` (initial regional flag ids), `places[]` (flavour).
- `countries[]`: `id`, `name`, `position`, `onMap` (has a polygon in `public/map/regions.json`), `relation` (−10..10),
  `trade` (bi), `culturalInfluence`, `aggressiveness`, `military`, `culture`, `gdp`, `leader` (character id), `compass?`.
  `context: true` marks newspaper/map-only neighbours with no mechanics in v1. `federation` and `zharan` are off-map.
- `parties[]`: `id`, `name`, `acronym`, `seats` (sum = `congress.total` = 100), `leader`, `benchLeader` (character ids),
  `compass`, `relevance`, `voteShare` (per region, %), `opinion` (−10..10 toward Lara), `role`.
- `factions[]`: `id`, `name`, `opinion`, `capacity`, `suspicion`, `face?` (character id), `groups?`.
- `papers[]`: `id` (`ledger`, `clarion`, `voice`, `dispatch`, `canopy`), `name`, `slant`, `owner`, `party`.

## content/chapters.json

```json
{ "chapters": [ { "id": 1, "title": "…", "question": "…", "turns": [
  { "turn": 1, "date": "1 January", "year": 1, "label": "Inauguration Day",
    "scenes": ["scene-id", "…"], "closing": "scene-id" | null,
    "popups": ["popup-id"], "news": ["news-id"] } ] } ] }
```

- `date` is the visible label (irregular dates are intended). `label` is a subtitle.
- `scenes`: main interactions offered this turn, playable in any order. Scenes with `order` in their front-matter are
  forced first, in that order. A scene's own `when` still applies.
- `closing`: a scene that becomes available only after every other available scene of the turn has been played, and ends
  the turn when finished. Used for the chapter-1 great-project choice.
- `popups`: candidate ambient pop-ups for the turn (each still filtered by its own `when`).
- `news`: candidate items for the edition printed at the **end** of the turn (each filtered by its `when`).
- `todo` on a turn/chapter marks unwritten content.

## content/popups.json

Top-level array.

| field | type | notes |
|---|---|---|
| `id` | string | |
| `chapter`, `turn` | number | where it is designed to appear (the turn lists it too) |
| `location` | string | region id, country id, or point id (`capital`, `strait`) |
| `title` | string | short, shown on the marker |
| `text` | string | 1–3 sentences, narrator voice, no numbers that read as a score |
| `when` | string | expression; `"true"` for always |

Pop-ups are information, not choices. Tokens like `[pop: id]` can also queue them from a choice.

## content/news/*.md

One file per item; the filename is the id.

```markdown
---
id: c1t1-voice-tamarin
paper: voice            # ledger | clarion | voice | dispatch | canopy
chapter: 1
turn: 1                 # edition printed at the end of this turn
when: "!flag.address_skipped_welf"
priority: 1             # lower = higher on the page within its paper
---

# Headline

Body: one paragraph, the paper's slant, no mechanics.
```

Writers provide mutually exclusive variants (`when` / `!when`) when one paper reacts differently to the same decision.
Items can also be queued from a choice with `[news: paper-id item-id]`; a queued item ignores the turn's candidate list but
still respects its own `when`.
