---
id: p3-marco
chapter: 3
turn: 2
title: The Six O'Clock Kitchen
kind: conditional
location: vila-tamarin
token: strike
when: "!flag.crisis_strikes"
portraits: [marco, sena]
background: community-kitchen
---

⚙️ Marco beat when the Ibicuí strikes have NOT fired yet (crisis flag `crisis_strikes`). Palliatives (DECISIONS: temporary housing, meals) lower the strikes pressure meter before the end of this turn. Dorival Sena (union confederation) is present.

## opening

Marco's community kitchen is a former garage near the top of Vila Tamarin. It opens at six every morning and serves about four hundred breakfasts. You arrive at seven. The queue goes down the street.

Dorival Sena is there too. He is the president of the National Workers' Confederation, the largest union federation, in his sixties, a PM member and an old ally of yours. He looks tired.

> **Dorival Sena:** "Madam President. I'll be honest. I'm losing control of the port union. The young ones don't listen to the confederation any more. They listen to people like Marco, and Marco doesn't tell them anything."

> **Marco Prestes:** "I tell them to eat breakfast. It's what I do."

> **Marco Prestes:** "The upper slopes have doubled since January. No pipe, no school, no clinic, the buses stop at dusk because of the Piranhas. They talk about stopping the port every night. One night they will."

→ questions

## questions

1. **"What would stop it?"** `[once]` `→ questions`
   ↳ > **Dorival Sena:** "Something they can see. Housing, buses, a clinic. A wage agreement. Something before the cold weather."
2. **"Marco, will you join them?"** `[once]` `→ questions`
   ↳ > **Marco Prestes:** "If they go out, I'll be with them. I told you in January."
3. **"Here's what I can do now."** `→ decide`

## decide

1. **"Temporary housing, a bus service and a clinic on the slopes, starting this month."** `[cost: 2 FC]` `[col +2 @ ibicui]` `[unions opinion +2]` `[marco loyalty +1]` `[flag: strike_palliatives = true]`
   ↳ > **Dorival Sena:** "That buys time. Maybe a lot of it."
2. **"Free meals through community kitchens like this one, paid by the state."** `[cost: 1 FC]` `[marco loyalty +2]` `[unions opinion +1]` `[flag: strike_palliatives = true]`
   ↳ > **Marco Prestes:** "That's a start. It's not a pipe."
3. **"I'll ask Renata to open wage talks for the port immediately."** `[salgado loyalty +1]` `[unions opinion +1]` `[flag: port_talks = true]`
   ↳ > **Dorival Sena:** "Talks help if they finish."
4. **"The government can't buy every strike off. I'll do what's in the budget."** `[marco loyalty -1]` `[unions opinion -1]` `[flag: path_harden += 1]`
   ↳ > **Marco Prestes:** "Then you'll see them on the news."

## close

1. **Serve breakfast for an hour** `[flag: seen_marco = true]`
   ↳ You stand behind the counter with Marco and hand out bread and coffee. Several people take photographs. Most of them just say good morning.

→ END
