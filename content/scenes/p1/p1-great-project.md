---
id: p1-great-project
chapter: 1
turn: 3
title: The First Great Project
kind: fixed
location: capital
token: project
when: "flag.seen_planning_briefing"
portraits: [livia, fontes, marne, mertens]
background: blue-room-night
---

⚙️ Closing scene of chapter 1 (chapters.json `closing`). Main decision of the chapter: the first great project — 1 rare-earth mining (Ibira) · 4 national railway · 6 housing and sanitation (Luz's works, Corvel). Writes `great_project` = 1 / 4 / 6. Livia conducts; each minister gives one factual summary on request. Projects never fail; follow-ups begin in chapter 2.

## opening

It is evening in the Blue Room. Livia has called a short meeting with the ministers involved: Fontes for the money, Marne for the works, and Mertens for Congress. Three folders are on the table in front of your chair.

> **Livia Harvan:** "Madam President, the purpose of this meeting is to record your decision on the first great project, so that the Treasury and Planning can start preparing the budget. Each minister can give you a short summary if you'd like one."

→ counsel

## counsel

1. **"Alexander, the costs."** `[once]` `→ counsel`
   ↳ > **Alexander Fontes:** "The mine is the most expensive to start, and could bring the most revenue in the long term. The railway is expensive and takes the longest. The sanitation works are the cheapest, because half is built, but the Corvel contract has to be dealt with."
   ↳ `[if: compass.ECON >= 3]` > **Alexander Fontes:** "And one observation, if I may. In every meeting this month you have asked what the state can do. Nobody has asked what it costs the private side. I would like that question asked once, even if the answer doesn't change anything."
2. **"Livia, the politics."** `[once]` `→ counsel`
   ↳ > **Livia Harvan:** "The mine will interest the Federation and Zharan, and worry the indigenous communities and the environmental groups. The railway is popular in Tapira, where you have little support. The sanitation works are popular in Katanaí, but they will remind everyone of President Luz."
3. **"Tobias, the work."** `[once]` `→ counsel`
   ↳ > **Tobias Marne:** "All three can be done. The mine needs a road first. The railway needs years. The sanitation works need the contract settled. My ministry is ready for any of them."
4. **"Caio, Congress."** `[once]` `→ counsel`
   ↳ > **Caio Mertens:** "None of them needs a vote this year, only money in the budget. The OPP will want to know who builds it."
5. **"I've heard enough. I'm ready to decide."** `→ choice`

## choice | The Decision

You open the three folders one more time.

1. **The rare earths of Ibira** `[flag: great_project = 1]` `[flag: project_rare_earths = true]` `[+1 ECON]` `[approval +3 @ ibira]` `[approval +2 @ tekoku]` `[indigenous opinion -2]` `[business opinion +2]` `[cartels suspicion +5]` `[federation relation +1]` `[zharan relation +1]` `[marne loyalty +1]`
   ↳ > **Tobias Marne:** "Then we'll start with the road. And someone needs to talk to the communities around the Tauá Hills before any machines arrive."
   ↳ > **Livia Harvan:** "The Arennian and Zharani embassies will both ask for meetings this week."
   ↳ > **Alexander Fontes:** "The Fund will ask who owns the ore. I'd like an answer before they ask."
2. **The national railway** `[flag: great_project = 4]` `[flag: project_railway = true]` `[approval +3 @ tapira, mognagna]` `[approval +1 @ tekoku]` `[business opinion +2]` `[cp opinion +1]` `[unions opinion +1]` `[marne loyalty +3]` `[fontes loyalty -1]`
   ↳ > **Tobias Marne:** "Thank you, Madam President. It will take years, but it will be used for a long time."
   ↳ > **Alexander Fontes:** "It will also cost more than planned. Railways always do. I'll plan for that."
   ↳ > **Livia Harvan:** "The Governor of Tapira will call to thank you, and to ask where the stations will be."
3. **The sanitation works** `[flag: great_project = 6]` `[flag: project_sanitation = true]` `[flag: luz_works_resumed = true]` `[+1 WELF]` `[approval +5 @ ibicui]` `[unions opinion +2]` `[pm opinion +1]` `[media opinion -1]` `[fontes loyalty +1]`
   ↳ > **Alexander Fontes:** "The cheapest option, and the most difficult contract. I'll start on the Corvel prices tomorrow."
   ↳ > **Caio Mertens:** "Corvel will want to discuss it with someone senior."
   ↳ `[if: flag.corvel_to_salgado]` > **Livia Harvan:** "Renata will also want to discuss it with them."
   ↳ `[if: flag.promised_mother_street]` *You promised your mother's street a sewer. Now the whole periphery will get one. You will be asked whether that was the reason.*
   ↳ `[if: !flag.promised_mother_street]` *A million and a half people will get proper sewage. Your mother is one of them. People will ask whether that was the reason.*

## statement

> **Livia Harvan:** "The press office will issue a statement tonight. Would you like to add anything?"

1. **"Say it will be finished on time and on budget."** `[flag: promised_on_time = true]` `[flag: voice += 1]`
   ↳ > **Alexander Fontes:** "I'd advise against promising that, Madam President."
   ↳ > "Say it anyway."
2. **"Say we'll publish every contract and every cost."** `[flag: promised_transparency = true]` `[flag: path_hold += 1]` `[fontes loyalty +1]` `[mertens loyalty -1]`
   ↳ > **Caio Mertens:** "The OPP's builders won't like that."
   ↳ > **Livia Harvan:** "I'll add it."
3. **"No additions. The project speaks for itself."** `[flag: path_harden += 1]`
   ↳ > **Livia Harvan:** "Then it goes out as drafted."

## end-of-month

The ministers leave. Mertens is the last to go.

> **Caio Mertens:** "A good first month, Madam President. Odel thinks so too."

You stay at the table for a while. On the television in the corner, the evening news reads out the statement about the project.

1. **Close the folders** `[flag: seen_great_project = true]` `[flag: chapter1_complete = true]`
   ↳ `[if: flag.path_hold >= 3]` *You said no to a lot of people this month. You are tired.*
   ↳ `[if: flag.path_harden >= 3]` *You made a lot of decisions quickly this month. Amanda has noticed. She hasn't said anything.*
   ↳ `[if: flag.voice >= 3]` *Just this once, just a little more, just until the work is done. The work has barely started.*

→ END
