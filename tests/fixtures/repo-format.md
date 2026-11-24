---
id: test-blue-room            # unique, kebab-case
chapter: 1
turn: 2
title: The Blue Room
kind: briefing
location: capital
order: 2
when: "!flag.tutorial_skipped && chapter == 1"
portraits: [mertens, fontes]
background: blue-room
tags:
  - test
  - fixture
---

## opening | The Blue Room

The Blue Room is colder than you expected.

*You wonder if Fontes already knows.*

> **Caio Mertens:** "Madam President. I assume you did not call me here to admire the curtains."
> He smiles thinly.

> "Let us begin."

⚙️ Designer note: this line is ignored
and so is this one.

`[flag: entered_blue_room = true]`

1. **"I want the fiscal pact by Friday."** `[+1 STRUCT]` `[flag: fiscal_pact = true]` `[Mertens opinion -3]`
   ↳ > **Caio Mertens:** "Friday," he repeats.
   ↳ *Too fast?*
2. **"Tell me what we can afford."** `[0 STRUCT]` `[Mertens opinion +2]` `→ hub`
   ↳ He opens the folder.
3. **Bribe the clerk** `[cost: 2 FC]` `[show if: flag.corrupt]`
4. **Call in a favour** `[cost: 1 IPI]` `[lock if: !flag.met_dara]`
5. **Spend a long evening** `[cost: 99 PT]`
6. **Ask Salgado** `[req flag: salgado_met]`

→ hub

## hub | Agenda

Mertens waits for you to choose a topic.

1. **Debt** `[once]` `→ debt`
2. **Cartels** `[once]` `→ cartels`
3. **Gossip** `[once]` `[gain: 1 IPI]`
   ↳ He leans in.
4. **We are done here** `→ wrapup`

## debt | The Debt

> **Caio Mertens:** "The Fund will not wait."

`[if: flag.fiscal_pact]` `[flag: debt_plan = true]`

## cartels

Narration about cartels. `[if: flag.fiscal_pact]`

1. **Monitor quietly** `[cartels capacity -1]` `[if: flag.fiscal_pact]` `[cartels suspicion +5]`
2. **Ignore** `[approval -2 @ ibira]`

→ hub

## wrapup

You leave the room. `[news: ledger blue-room]` `[pop: corridor-whispers]`

→ END
