---
id: p1-tamarin
chapter: 1
turn: 3
title: Vila Tamarin
kind: personal
location: vila-tamarin
token: personal
portraits: [celia, marco, amanda]
background: tamarin-kitchen
---

⚙️ Personal scene. Celia and Marco in Vila Tamarin, the Katanaí periphery where Luz's sewer stops. Celia's savings (keep / give to Marco's kitchen / pay for the street) can become news. Marco describes the strike that may come (chapter-3 Ibicuí strikes meter) and says where he will stand.
⚙️ If `mother_visits_promised`, this is the first monthly visit (from chapter 2 those cost PT; this one is free).

## opening

Vila Tamarin is a neighbourhood on the hills above Katanaí. The streets are too narrow for the official cars, so the convoy stops at the bottom and you walk up with Amanda and two guards.

Neighbours come out to their doors as you pass. By the time you reach your mother's street, a small group is following you.

At the corner there is a large sign from the Luz years: *GREAT SANITATION WORKS — WORKS WILL RESUME SOON*. Someone has written *WHEN?* underneath in marker pen.

Celia is waiting at her gate. She is wearing her best blouse.

> **Celia Vento:** "You walked up the hill. Good. People should see you can still walk."

1. **"I said every month. This is the first visit."** `[show if: flag.mother_visits_promised]`
   ↳ > **Celia Vento:** "It's the twenty-sixth. I'll count it."
2. **"I had a free afternoon and I wanted to spend it here."** `[show if: !flag.mother_visits_promised]`
   ↳ > **Celia Vento:** "Presidents don't have free afternoons. Somebody arranged this one. Thank them."
3. **Hug her in front of the street**
   ↳ She lets you, briefly, then takes you inside. The coffee has been ready since eight.

## kitchen

The kitchen is small. The calendar on the wall comes from the pharmacy.

> **Celia Vento:** "I want to tell you something, and I want you to let me finish."

> **Celia Vento:** "I have some savings, from my pension and from your father. Eleven thousand. I was keeping it for my funeral. I've decided I'd rather have a sewer."

> **Celia Vento:** "The engineers say it's three hundred metres from the end of the pipe to the bottom of our street. Ivone's grandson says that if the street pays for that last part, the contractor will connect it. I'll pay. The neighbours will pay me back when they can."

*She has clearly thought about this for months.*

1. **"Keep your money, Mum. This is the government's job."** `[celia loyalty -1]` `[flag: celia_savings = 1]` `[flag: path_hold += 1]`
   ↳ > **Celia Vento:** "The government has had forty years. I'm seventy-four."
   ↳ She puts the envelope back in the biscuit tin, but leaves the tin on the table.
2. **"Give it to Marco's kitchen instead. I'll make sure the street gets its sewer."** `[celia loyalty +1]` `[marco loyalty +1]` `[flag: celia_savings = 2]` `[flag: promised_mother_street = true]`
   ↳ > **Celia Vento:** "From you. Not from Corvel, not from Tercilio. I'll tell Ivone."
   ↳ *Now the whole street will know you promised.*
3. **"It's your money. If you want to pay for the street, pay for it."** `[celia loyalty +2]` `[flag: celia_savings = 3]` `[flag: voice += 1]`
   ↳ > **Celia Vento:** "Good. I didn't need your permission, but thank you."
   ↳ *It's her money and her street. You don't need to be involved.*

## marco

Marco Prestes arrives without knocking, as he always has. He is in his late sixties and runs a community kitchen in the neighbourhood that opens at six every morning. He has been arrested three times in his life, each time for organising something. He taught you, years ago, how to run a meeting. He is carrying a crate of onions.

> **Marco Prestes:** "Madam President."

> "Please, Marco."

> **Marco Prestes:** "I'm practising."

He sits down and accepts a coffee from your mother.

> **Marco Prestes:** "There are about fourteen hundred families on the upper slopes who came from Mognagna since the last harvest. They have no sewer, no school, and not much work. Many of the young men work at the port. If nothing improves by winter, I think the port workers will strike. Nobody will need to organise it."

> **Marco Prestes:** "I won't lead it. I won't stop it either. I'm telling you now, so you know."

1. **"Give me until the budget, Marco. Then judge me."** `[marco loyalty +1]` `[flag: marco_deadline = true]` `[flag: path_hold += 1]`
   ↳ > **Marco Prestes:** "All right. Until the budget. I'll tell them."
2. **"If you stand with them against the government, I won't be able to protect you."** `[marco loyalty -2]` `[flag: warned_marco = true]` `[flag: path_harden += 1]`
   ↳ Your mother stops stirring the pot.
   ↳ > **Marco Prestes:** "You've never protected me, Lara. You were my lawyer three times. That's different."
3. **"Tell me their names. I want to know who they are."** `[marco loyalty +1]` `[unions opinion +1]` `[flag: tamarin_names = true]`
   ↳ He tells you, and Amanda writes them down. It takes a quarter of an hour. A crane driver called Joaquim. Severina, who sells lunch at the port gate. Two brothers from Sugar Bay.
   ↳ > **Marco Prestes:** "Now you know some of them."

## evening

It is dark when you leave. You walk down the hill with Amanda. At the bottom, by the cars, she puts her notebook away.

> **Amanda Troes:** "She'll be all right."

> "You don't know that."

> **Amanda Troes:** "No. But she's all right tonight."

1. **Get into the car** `[flag: seen_tamarin = true]`
   ↳ `[if: flag.voice >= 3]` *In the car you think about the pipe, the savings and the names. Just this once, you think, and then you don't finish the thought.*

→ END
