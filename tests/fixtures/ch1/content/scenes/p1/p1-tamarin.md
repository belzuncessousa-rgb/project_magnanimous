---
id: p1-tamarin
chapter: 1
turn: 3
title: Vila Tamarin
kind: personal
location: ibicui
portraits: [celia, marco, amanda]
background: tamarin-kitchen
---

⚙️ Personal scene (no PT to watch). Celia and Marco in Vila Tamarin, the Katanaí periphery where Luz's trunk sewer stops. Crosses into politics: Celia's savings (pay for the street / fund Marco's kitchen / keep them) can become news; Marco names the strike that may come (ch3 Ibicuí strikes meter) and says where he will stand.
⚙️ If `mother_visits_promised`, this is the first of the monthly visits (from chapter 2 those cost PT; this one is free).

## opening

The convoy stops at the bottom of the hill, because the cars do not fit in the streets above it. That has always been true, and it is the first thing about Vila Tamarin that the Jaguars did not know.

You walk up. Amanda walks beside you with her notebook in her coat. The neighbours come to their doors, then to their gates, then into the street, and by the time you reach your mother's house there is a small procession behind you, which is how things happen in Vila Tamarin: nobody organises them, and everybody turns up.

The sign is still there, on two poles at the corner, in the colours of the Luz years. *GREAT SANITATION WORKS — WORKS RESUME SOON.* Somebody has added, in marker pen, *WHEN?*

Celia is at the gate, in her good blouse, pretending she had not been waiting.

> **Celia Vento:** "You came up the hill on foot. Good. They should see your legs work."

1. **"I said every month. This is the first."** `[show if: flag.mother_visits_promised]`
   ↳ > **Celia Vento:** "It's the twenty-sixth. The month was nearly over. I'll count it. Just."
2. **"I had a free afternoon. I wanted it to be here."** `[show if: !flag.mother_visits_promised]`
   ↳ > **Celia Vento:** "Presidents don't have free afternoons. Somebody gave you this one. Thank them."
3. **Hug her, in front of the whole street**
   ↳ She allows it for exactly as long as is decent, then pushes you toward the kitchen, where the coffee has been ready since eight.

## kitchen

The kitchen is the size of the bathroom in the Residence. The calendar on the wall is from the pharmacy, and it is turned to the right month, which, your mother says, is more than can be said for the government.

> **Celia Vento:** "I want to say something and you'll argue, so let me finish."

> **Celia Vento:** "I have money. From the school pension, and from your father, and from not buying things. Eleven thousand. It was for the funeral. I've decided I'd rather have a sewer than a nice funeral."

> **Celia Vento:** "The engineers say it's three hundred metres from the end of the pipe to the bottom of this street. Ivone's grandson says if the street pays for the last bit, Corvel's men will come and connect it. I'll pay. The street will pay me back when it can. Most of it."

*She has thought about this for months. She has the numbers. She learned it from you, or you learned it from her; neither of you has ever been sure.*

1. **"Keep your money, Mum. This is the state's job, and I'm the state."** `[celia loyalty -1]` `[flag: celia_savings = 1]` `[flag: path_hold += 1]`
   ↳ > **Celia Vento:** "The state has had forty years. I'm seventy-four. You do the arithmetic, you're the one with the Treasury."
   ↳ She puts the envelope back in the biscuit tin. She does not put the lid back on.
2. **"Then give it to Marco's kitchen. The street will get its sewer from me."** `[celia loyalty +1]` `[marco loyalty +1]` `[flag: celia_savings = 2]` `[flag: promised_mother_street = true]`
   ↳ > **Celia Vento:** "From you. Not from Corvel, not from Tercilio. From you. I'll tell Ivone. Ivone will tell everyone."
   ↳ *Now the whole hill has heard you promise. Good. Let it hold you to it.*
3. **"It's your money. If you want to pay for the street, pay for it."** `[celia loyalty +2]` `[flag: celia_savings = 3]` `[flag: voice += 1]`
   ↳ > **Celia Vento:** "Good. I didn't need your permission, but it's nice to have it."
   ↳ *It's her money and her street. Nobody could call that a favour. Nobody could call it anything at all, unless they went looking.*

## marco

Marco arrives without knocking, as he has since you were nine. He is thinner than at Christmas and carries a crate of onions from the kitchen, because he never goes anywhere empty-handed and never comes back with the crate.

> **Marco Prestes:** "Madam President."

> "Don't, Marco."

> **Marco Prestes:** "I'm practising. In case I have to shout it."

He sits, takes the coffee your mother gives him, and doesn't drink it.

> **Marco Prestes:** "There are fourteen hundred families up on the slopes who came from Mognagna since the harvest. Brick houses. No pipe. No school. The dockers' union is half their sons. If nothing moves by winter, they'll stop the port. Not because anyone tells them to. Because it's the only thing in Katanaí they can stop."

> **Marco Prestes:** "I won't lead it. I won't stop it either. I'm telling you now so you can't say later I didn't."

1. **"Give me until the budget, Marco. Then judge me."** `[marco loyalty +1]` `[flag: marco_deadline = true]` `[flag: path_hold += 1]`
   ↳ > **Marco Prestes:** "Until the budget. I'll tell them. They'll ask me what a budget is. I'll tell them it's a promise with a date on it."
2. **"If you stand with them against me, I won't be able to protect you."** `[marco loyalty -2]` `[flag: warned_marco = true]` `[flag: path_harden += 1]`
   ↳ He looks at you for a long time. Your mother, at the stove, stops stirring.
   ↳ > **Marco Prestes:** "You've never protected me, Lara. You've been my lawyer three times. That's different. That's why I trusted you."
3. **"Tell me their names. I want to know who they are, not how many."** `[marco loyalty +1]` `[unions opinion +1]` `[flag: tamarin_names = true]`
   ↳ He tells you. Amanda writes. It takes a quarter of an hour. Joaquim, who drives a crane. Dona Severina, who sells lunch at the dock gate. Two brothers from Sugar Bay whose surname you recognise from a school register in a building that no longer exists.
   ↳ > **Marco Prestes:** "Now you've got names. Names are harder to stop than numbers. For both of us."

## evening

When you leave, the procession has gone home. The street is dark except for your mother's kitchen, and the sign at the corner, which somebody has lit with a torch so that the photographers could see it.

Amanda walks beside you down the hill without speaking. At the bottom, by the cars, she closes her notebook.

> **Amanda Troes:** "She'll be all right."

> "You don't know that."

> **Amanda Troes:** "No. But she will be tonight. That's the part I can write down."

1. **Get into the car** `[flag: seen_tamarin = true]`
   ↳ `[if: flag.voice >= 3]` *From the car window the blue line on the hill is invisible, of course; it exists only on a model. Still, you could swear you see where it stops. Just this once, you think, and cannot remember what you were going to add.*

→ END
