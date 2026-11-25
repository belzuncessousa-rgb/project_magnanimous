---
id: p1-planning-briefing
chapter: 1
turn: 3
title: Three Projects
kind: briefing
location: capital
token: project
portraits: [marne]
background: planning-model-room
---

⚙️ Planning & Development meeting. Tobias Marne presents the three chapter-1 great projects in detail: 1 rare-earth mining (Ibira), 4 national railway, 6 housing and sanitation in the peripheries (finishing Luz's works, Corvel contract). No choice here; the choice is the turn's closing scene. "Finish" appears once all three have been seen.

## opening

The Ministry of Planning has a long hall full of scale models of the country: rivers in blue resin, mountains in plaster, cities in small wooden blocks. Engineers use it to explain projects to ministers.

Tobias Marne is waiting by the models with three folders.

> **Tobias Marne:** "Madam President. As I said in the Blue Room, there are three large projects ready for a decision. The Treasury thinks we can afford one this year. I'll explain each of them: what it is, what it costs roughly, who benefits, and the main problems."

→ models

## models

⚙️ Hub: each project once; "finish" appears after all three.

1. **The rare earths of Ibira** `[once]` `[flag: planning_seen += 1]` `→ rare-earths`
2. **The national railway** `[once]` `[flag: planning_seen += 1]` `→ railway`
3. **The sanitation works** `[once]` `[flag: planning_seen += 1]` `→ sanitation`
4. **"Thank you, Tobias. I've seen all three."** `[show if: flag.planning_seen >= 3]` `→ close`

## rare-earths | Rare Earths

Marne leads you to the southern end of the hall, where the forest of Ibira is modelled in green. A red pin marks a range of hills.

> **Tobias Marne:** "The Tauá Hills, in Ibira. The Geological Service has confirmed a large deposit of rare earths there. These are the minerals used in batteries, electronics and guidance systems. It's one of the largest deposits on the continent."

> **Tobias Marne:** "To mine it we would need a road, a river port, electricity and specialised engineers. We don't have enough engineers, so we'd need foreign partners. The Arennian Federation and Zharan would both be interested, and both would want a share of the output."

> **Tobias Marne:** "The benefits: jobs in Ibira, which has almost none, and a valuable export. The problems: the deposit borders indigenous land on two sides, and the river is used by the cartels for smuggling."

→ rare-earths-q

## rare-earths-q

1. **"Who would own the mine?"** `[once]` `→ rare-earths-q`
   ↳ > **Tobias Marne:** "That depends on the deal. It could be a state company with foreign partners, or a concession to foreign companies. That would be decided later."
2. **"Can it be done without damaging the rivers?"** `[once]` `→ rare-earths-q`
   ↳ > **Tobias Marne:** "Yes, with the right methods and the right people. Helena Kaval will tell you we don't have enough of those people yet."
3. **"What would Ibira get out of it?"** `[once]` `→ rare-earths-q`
   ↳ > **Tobias Marne:** "A road, jobs, and probably a clinic and schools if we write them into the contract. We should."
4. **"Back to the other projects."** `→ models`

## railway | The Railway

The railway is shown as a brass line across the models: from the farming region of Tapira, through the capital, to the port of Katanaí, with a branch north to Atiaiaba and another into Mognagna.

> **Tobias Marne:** "The National Railway Integration. Today most goods travel by road. Grain from Tapira goes to the port in thousands of lorries. The railway would make transport cheaper and connect Mognagna and Tekoku to the rest of the network."

> **Tobias Marne:** "The benefits are spread across several regions and they last a long time. The problem is that it's slow. It takes years, and most of the benefit comes after the last section is finished."

→ railway-q

## railway-q

1. **"Who benefits most?"** `[once]` `→ railway-q`
   ↳ > **Tobias Marne:** "The farmers and exporters of Tapira, then industry in Ibicuí. Mognagna would be connected for the first time. The landowners will want stations near their land."
2. **"What about jobs?"** `[once]` `→ railway-q`
   ↳ > **Tobias Marne:** "Tens of thousands during construction, for several years. The unions would welcome that."
3. **"Who could build it?"** `[once]` `→ railway-q`
   ↳ > **Tobias Marne:** "There are four companies in Kunasai that can build a railway. I know all of them. We could also invite foreign companies."
4. **"Back to the other projects."** `→ models`

## sanitation | The Sanitation Works

The last model is older and dusty. A small plate reads *Great Sanitation Works — President Tercilio Luz*. The sewer lines are painted blue on the hills above Katanaí. Halfway up, the blue line stops.

> **Tobias Marne:** "This is the project President Luz started eight years ago: sewers, a treatment plant and housing for the peripheries of Katanaí and St. Veldra. About half of it was built before it stopped. The treatment plant has no roof. Some of the housing blocks have no doors."

> **Tobias Marne:** "Finishing it would give about a million and a half people proper sewage and water. It's the cheapest of the three, because much of the work is already done."

> **Tobias Marne:** "The problems: the builder, Corvel, still holds the contract at very high prices. And it was President Luz's project, so people will associate it with your party and with what went wrong."

*You find Vila Tamarin on the model. The blue line stops three streets above your mother's house.*

→ sanitation-q

## sanitation-q

1. **"Can we cancel Corvel's contract?"** `[once]` `→ sanitation-q`
   ↳ `[if: flag.corvel_to_salgado]` > **Tobias Marne:** "Renata's people are already reading it. Corvel knows. If we cancel, they'll go to court."
   ↳ `[if: !flag.corvel_to_salgado]` > **Tobias Marne:** "If we cancel it, they'll go to court and the works stay stopped for years. We could renegotiate. Or pay their prices and accept the criticism."
2. **"How long would it take to finish?"** `[once]` `→ sanitation-q`
   ↳ > **Tobias Marne:** "Two or three years, if the contract question is settled quickly."
3. **"My mother lives just below where it stops."** `[once]` `[marne loyalty +1]` `→ sanitation-q`
   ↳ > **Tobias Marne:** "I didn't know that. Then you know the place better than I do."
4. **"Back to the other projects."** `→ models`

## close

> **Tobias Marne:** "I'll send the full files to Livia. Whatever you decide, my ministry will build it."

1. **"I'll decide at the end of the month."** `[flag: seen_planning_briefing = true]`
   ↳ > **Tobias Marne:** "Of course."
2. **"Which one would you choose, Tobias?"** `[flag: seen_planning_briefing = true]`
   ↳ > **Tobias Marne:** "That's your decision, Madam President, and I'd rather not influence it. I'll say only that I'm an engineer, and engineers like railways."

→ END
