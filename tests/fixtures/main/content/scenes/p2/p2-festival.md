---
id: p2-festival
chapter: 2
turn: 3
title: The Folk Festival
kind: conditional
location: mognagna-sertao
token: palace
portraits: [livia, porper]
background: festival-square
---

⚙️ Chief of Staff — Culture & Festivals (GDD): the Mognagna Folk Festival. Attend or skip (skip = nothing). Attending opens a steer (populist patronage / civic state presence) and an optional investment that scales effects (needs the culture fund for the larger one). Gains are meant to be partly transient.

## opening

> **Livia Harvan:** "Madam President, the Folk Festival in Mognagna is at the end of July: music, food, dancing, three days. Governor Porper has invited you to open it. Presidents usually don't go. The ones who did were remembered for it."

> **Livia Harvan:** "If you go, you'll have to decide what kind of visit it is. And whether the government puts money into it."

1. **"I'll go."** `→ attend`
2. **"Thank the Governor and send a message."** `→ skip`

## skip

> **Livia Harvan:** "I'll send a warm message."

1. **Continue** `[flag: festival = 0]` `[flag: seen_festival = true]`

→ END

## attend | The Festival

The festival is held in the main square of a market town in the sertão. It is very hot. There are stages, food stalls and thousands of people. Governor Porper walks you through the crowd. Many people want to touch your hand.

> **Julio Porper:** "They've been waiting since morning. Say a few words and they'll talk about it for years."

1. **Speak about the transfers, the water and what the government will give the region.** `[approval +5 @ mognagna]` `[+1 WELF]` `[cv opinion +1]` `[fff opinion +1]` `[approval -1 @ tekoku, ibicui]` `[flag: festival = 1]`
   ↳ The crowd cheers each promise. Porper stands close behind you.
2. **Speak about schools, clinics and the state being present here every day, not only at festivals.** `[approval +2 @ mognagna]` `[stability +3 @ mognagna]` `[+1 STRUCT]` `[flag: festival = 2]`
   ↳ The applause is quieter and lasts longer. An old man near the stage nods for the whole speech.

## invest

> **Livia Harvan:** "The Culture Fund could pay for a permanent stage and the regional music school the Governor asked for."

1. **"Fund the stage and the school."** `[show if: flag.culture_fund]` `[cost: 10 FC]` `[approval +3 @ mognagna]` `[porper loyalty +2]` `[flag: cultural_power += 1]`
   ↳ > **Julio Porper:** "They'll name it after you, whether you want it or not."
2. **"Fund a smaller grant for the festival itself."** `[cost: 10 FC]` `[approval +1 @ mognagna]` `[porper loyalty +1]`
   ↳ > **Julio Porper:** "Thank you. Next year will be bigger."
3. **"No money this year. Being here is enough."**
   ↳ > **Julio Porper:** "Being here was a lot, Madam President."

## close

1. **Fly back to the capital** `[flag: seen_festival = true]`

→ END
