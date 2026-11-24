---
id: demo-oath
chapter: 1
turn: 1
title: "[Demo] The Oath"
kind: fixed
location: capital
order: 1
portraits: [mertens]
---

## doors | Behind the Doors

[DEMO SCENE — placeholder text so the engine can be exercised.]

The palace corridor smells of floor wax and old paper. Beyond the doors, a crowd is waiting.

*You wonder how long the applause will last.*

> **Caio Mertens:** "Madam President. They are ready for you."

1. **"Then let us not keep them waiting."** `[+1 STRUCT]` `[approval +2 @ all]`
   ↳ > Then let us not keep them waiting.
2. **Take a breath first** `[stability +1 @ all]`
   ↳ *One breath. Then another. The noise outside becomes a single sound.*
3. **"How many of them voted for us, Caio?"** `[mertens opinion -1]`
   ↳ > **Caio Mertens:** "Enough, Madam President. Barely."

→ balcony

## balcony | The Balcony

Sunlight. Flags. A roar that you feel in your ribs.

1. **"We will rebuild the trust they broke."** `[+1 WELF]` `[flag: demo_promised_trust = true]`
2. **"We will make this country work again."** `[-1 ECON]` `[flag: demo_promised_growth = true]`

The doors close behind you. The work begins.
