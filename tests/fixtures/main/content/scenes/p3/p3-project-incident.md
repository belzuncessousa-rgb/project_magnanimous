---
id: p3-project-incident
chapter: 3
turn: 1
title: An Accident on the Works
kind: briefing
location: capital
token: project
portraits: [marne, salgado]
background: planning-model-room
---

⚙️ Great-project follow-up (DECISIONS: incidents that add or save cost; projects never fail). One incident per project, routed by great_project. The choice weighs speed, cost, blame and corruption.

## opening

Marne asks for an urgent meeting at the Ministry of Planning. Salgado is with him.

1. **Hear what happened** `[show if: flag.great_project == 1]` `→ mine`
2. **Hear what happened** `[show if: flag.great_project == 4]` `→ rail`
3. **Hear what happened** `[show if: flag.great_project == 6]` `→ sewer`
4. **Hear what happened** `[show if: !(flag.great_project == 1 || flag.great_project == 4 || flag.great_project == 6)]` `→ none`

## mine

> **Tobias Marne:** "Armed men burned two of the road crew's machines below the Tauá Hills on Saturday night. Nobody was hurt. The crew has stopped working and wants police protection."

> **Renata Salgado:** "It's almost certainly the Red Tree. A road through the forest means police on the river. They're sending a message."

1. **"Federal police on the road, as long as it takes."** `[cost: 10 FC]` `[cartels capacity -2]` `[cartels suspicion +10]` `[flag: project_progress += 1]` `[flag: road_protected = true]`
   ↳ > **Renata Salgado:** "I'll send a unit next week."
2. **"Pause the road until we have a plan for the river."** `[flag: project_delayed = true]` `[marne loyalty -1]`
   ↳ > **Tobias Marne:** "A pause in the forest means the forest takes the road back. But all right."
3. **"Ask the contractor to come to an arrangement locally."** `[show if: flag.contractor == 1]` `[flag: project_progress += 1]` `[flag: corruption += 1]` `[cartels opinion +1]` `[flag: cartel_toll = true]` `[flag: voice += 1]`
   ↳ > **Tobias Marne:** "I won't ask what kind of arrangement."
   ↳ *The road gets built. What the contractor pays to whom is the contractor's business.*

→ close

## rail

> **Tobias Marne:** "A crane collapsed at a bridge site on the first section on Thursday. Two workers were killed. The others have stopped work and the union is asking who checked the crane."

> **Renata Salgado:** "My inspectors say the crane hadn't been inspected for a year. The contractor says it had."

1. **"A full investigation. Work stops at that site until it's finished."** `[unions opinion +2]` `[salgado loyalty +1]` `[flag: project_delayed = true]` `[flag: path_hold += 1]`
   ↳ > **Tobias Marne:** "Three months lost on that bridge. It's the right decision."
2. **"Compensate the families and restart quickly, with new inspections."** `[cost: 10 FC]` `[unions opinion +1]` `[flag: project_progress += 1]`
   ↳ > **Renata Salgado:** "I'll still want to know who signed off the crane."
3. **"Blame the contractor publicly and change contractor on that section."** `[show if: flag.contractor == 1]` `[opp opinion -1]` `[marne loyalty -2]` `[approval +2 @ tapira]` `[flag: path_harden += 1]`
   ↳ > **Tobias Marne:** "They're friends of the OPP. Odel will hear about it."

→ close

## sewer

> **Tobias Marne:** "A trench wall collapsed on the sewer line above Vila Tamarin on Tuesday night. Nobody was in it. Three houses were damaged. One of them is two streets from your mother's."

> **Renata Salgado:** "The trench wasn't properly supported. That's a cost the contractor saved."

1. **"Rebuild the houses at the contractor's cost, and audit every trench on the line."** `[salgado loyalty +1]` `[approval +2 @ ibicui]` `[flag: project_delayed = true]` `[flag: path_hold += 1]`
   ↳ > **Renata Salgado:** "Corvel will go to court about the cost. We'll win."
2. **"The government pays for the houses now. We'll argue with the contractor later."** `[cost: 10 FC]` `[approval +3 @ ibicui]` `[flag: project_progress += 1]`
   ↳ > **Tobias Marne:** "The families will have their houses back by Christmas."
3. **"Keep it quiet. Repair the houses and keep working."** `[flag: project_progress += 1]` `[flag: corruption += 1]` `[flag: trench_hushed = true]` `[flag: voice += 1]`
   ↳ > **Renata Salgado:** "I can't keep it quiet, Madam President. I can only not make it loud."
   ↳ *Nobody was hurt. The pipe is moving. A scandal now would stop it for months.*

→ close

## none

> **Tobias Marne:** "Nothing urgent, as it turns out. A false alarm. I'm sorry to have taken your time."

→ close

## close

1. **Thank them** `[flag: seen_project_incident = true]`

→ END
