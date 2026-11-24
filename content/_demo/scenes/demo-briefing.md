---
id: demo-briefing
chapter: 1
turn: 1
title: "[Demo] Justice Briefing"
kind: briefing
location: ibicui
portraits: [salgado]
---

## office | Ministry of Justice

[DEMO SCENE] Renata Salgado has covered her desk in folders.

> **Renata Salgado:** "Three things, Madam President. Pick where we start."

## agenda | Agenda (hub)

1. **"The cartels."** `→ cartels`
2. **"The labour compact."** `→ compact`
3. **"Corruption in our own house."** `[once]`
   ↳ > **Renata Salgado:** "Then you will not like what I find."
   ↳ `[salgado opinion +2]` *She almost smiles.*
4. **"That will do for today."** `→ END`

## cartels | Cartels

> **Renata Salgado:** "Red Tree and the Blue Piranhas keep an uneasy truce in Ibira."

1. **Monitor them quietly** `[cartels suspicion +5]` `[flag: demo_cartels_watched = true]`
2. **Leave them be for now** `[flag: demo_ignored_cartels = true]`

## compact | Labour compact

> **Renata Salgado:** "The unions want a seat at the table. It will cost money."

1. **Fund the compact** `[cost: 1 FC]` `[flag: demo_labor_compact = true]` `[unions opinion +2]`
2. **"Not yet."** `[flag: demo_ignored_unions = true]` `[unions opinion -2]`
