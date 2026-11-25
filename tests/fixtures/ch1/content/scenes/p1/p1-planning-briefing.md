---
id: p1-planning-briefing
chapter: 1
turn: 3
title: Three Models
kind: briefing
location: capital
portraits: [marne]
background: planning-model-room
---

⚙️ Planning & Development briefing. Tobias Marne presents the three chapter-1 great projects (DECISIONS): 1 Rare-earth mining (Ibira) · 4 National Railway Integration · 6 Housing & sanitation in the peripheries (= finishing Luz's Great Sanitation Works, Corvel contract). No choice here; the choice is the turn's closing scene. Each pitch carries Marne's enthusiasm plus one dissent the player has already heard (or will).
⚙️ Projects never fail; their follow-up events (contractor, oversight, incidents) start in chapter 2 and pass through Marne.

## opening

The Ministry of Planning keeps a room nobody else in government has: a long hall with tables down the middle and, on the tables, the country in balsa wood and plaster. Rivers in blue resin. Mountains you could knock over with a sleeve.

Tobias Marne is waiting in a hard hat. He takes it off when he sees your face, and then, after a moment's thought, puts it on the table next to Ibira, where it looks like a small yellow mountain range.

> **Tobias Marne:** "Madam President. Three models. The Treasury says you can afford one. The Treasury says that about everything, including lunch."

> **Tobias Marne:** "Ask me about any of them. I'll tell you the truth, and then I'll tell you why you should build it anyway."

→ models

## models

⚙️ Hub: each model once. Leaving unlocks after all three have been seen, so the closing choice is informed.

1. **The rare earths of Ibira** `[once]` `[flag: planning_seen += 1]` `→ rare-earths`
2. **The railway** `[once]` `[flag: planning_seen += 1]` `→ railway`
3. **The sanitation works** `[once]` `[flag: planning_seen += 1]` `→ sanitation`
4. **"I've seen enough, Tobias."** `[lock if: flag.planning_seen < 3]` `→ close`

## rare-earths | Rare Earths

He leads you to the southern end of the table, where the forest is made of green sponge and a red pin marks the Tauá Hills.

> **Tobias Marne:** "Under these hills, the Geological Service found what every battery and every guidance system in the world is made of. Not a little. A lot. More than Tarev, more than anyone on the continent."

> **Tobias Marne:** "We'd need a road, a river port, power, and engineers. The Arennians would lend us the engineers and the Zharani would build us the port, and both of them would like the ore in return. Ibira gets jobs it has never had. The country gets a currency of its own."

> **Tobias Marne:** "The truth: it's Indigenous land on two sides and cartel river on the third. You'll have to talk to people who don't want to see you, and the Tree will want a toll on every barge."

1. **"Who mines it? Us, or them?"**
   ↳ > **Tobias Marne:** "That's the question you'll be answering for ten years. Today the answer is: whoever pays for the road."
2. **"Helena says we don't have the engineers to do it cleanly."** `[show if: flag.seen_education_briefing]`
   ↳ > **Tobias Marne:** "Helena is right. Helena is always right. We can do it dirty now or clean later. I'd do it now and clean as we go. That's what everyone says, and nobody cleans."
3. **"What does Ibira get out of it, really?"**
   ↳ > **Tobias Marne:** "A road. Some wages. A clinic, if you insist on it in the contract, and you should. And attention, Madam President. Ibira has never had attention it liked."

→ models

## railway | The Railway

The railway is a long brass wire laid across half the table, from the grain country of Tapira through the junction at New Veldrania, down to the docks of Katanaí, with a branch north to Atiaiaba and a branch west into the sertão.

> **Tobias Marne:** "My favourite, and I'm not ashamed of it. Tapira's grain to the sea without a thousand lorries. Mognagna connected to something besides a water truck. Tekoku connected to Ibicuí by more than resentment."

> **Tobias Marne:** "Everybody uses a railway. Even the people who vote against you. Especially them; they're usually farmers."

> **Tobias Marne:** "The truth: it's slow. Nobody cuts a ribbon on a railway until the last kilometre. You'll pay for it and your successor will ride it."

1. **"The landlords will love it. Should that worry me?"**
   ↳ > **Tobias Marne:** "It should, a little. They'll love it, and then they'll want the stations on their land. You'll be choosing where a town is born. That's real power. Most presidents don't notice they have it."
2. **"And the unions?"**
   ↳ > **Tobias Marne:** "Forty thousand jobs laying track for six years. The unions will love it right until the first strike, and then they'll love it again."
3. **"Who builds it?"**
   ↳ > **Tobias Marne:** "There are four firms in this country that can lay a railway. I know all four. I've been to their weddings. That's not a confession, it's a qualification."

→ models

## sanitation | The Works

The last model is not a model. It is the old one — eight years old, dusty, with a small brass plate that says *Great Sanitation Works — President Tercilio Luz*. The trunk lines are painted in blue on the hills above Katanaí. Halfway up, the blue stops.

> **Tobias Marne:** "This one's already half built. That's its virtue and its sin. Pipes in the ground, a treatment plant on the waterfront with no roof, and housing blocks with no doors. Finish it and a million and a half people in Katanaí and St. Veldra get water that goes away when it should."

> **Tobias Marne:** "It's the cheapest, because the expensive part was already stolen. And it's the one you'll be asked about on every programme, because it's Tercilio's, and Tercilio is yours."

> **Tobias Marne:** "The truth: Corvel still holds the contract. We'd have to talk to them. I can talk to them. I'd rather not tell you how."

*You find Vila Tamarin on the model without looking for it. The blue line stops three streets above a small plaster square where somebody, eight years ago, glued a tiny tree.*

1. **"Can we break Corvel's contract?"**
   ↳ `[if: flag.corvel_to_salgado]` > **Tobias Marne:** "Renata's people are already reading it. Corvel knows. Corvel's lawyers are very good, and very bored, and they've been waiting eight years for somebody to give them something to do."
   ↳ `[if: !flag.corvel_to_salgado]` > **Tobias Marne:** "Break it, and they'll sue, and the pipes stay as they are until a judge retires. Renegotiate, and you'll be the President who did business with Corvel. Pay, and you'll be the President who paid them twice."
2. **"Is this the one closest to your heart, or to your contractors?"**
   ↳ He laughs, but not for long.
   ↳ > **Tobias Marne:** "Corvel isn't one of mine. If it were, it would have been finished."
3. **"My mother lives under that line."** `[marne loyalty +1]`
   ↳ He looks at the model, then at you, and takes his hard hat off the table and holds it in both hands, the way men hold hats at funerals.
   ↳ > **Tobias Marne:** "Then you'll know better than anyone what it costs to stop halfway."

→ models

## close

> **Tobias Marne:** "I'll send the files to Livia. Whatever you choose, I'll build it. I'd like to build all three, of course. I'd also like to be twenty-five."

1. **"I'll decide at the end of the month."** `[flag: seen_planning_briefing = true]`
2. **"Tell me honestly. Which one would you put your name on?"** `[flag: seen_planning_briefing = true]`
   ↳ `[if: flag.marne_prefers_railway]` > **Tobias Marne:** "I've told you already. I told the whole Blue Room. The railway. I'm a simple man."
   ↳ `[if: !flag.marne_prefers_railway]` > **Tobias Marne:** "The railway. My name on a station. A small one. Somewhere in Tapira where the cows can read it."

→ END
