---
id: p2-site-taua
chapter: 2
turn: 2
title: The Tauá Hills
kind: conditional
location: taua-hills
token: project
when: "flag.great_project == 1"
portraits: [tuyu, marne]
background: forest-camp
---

⚙️ Great-project follow-up (project 1, rare earths): oversight visit. Indigenous consultation; the cartel river. Projects never fail — choices change cost, delay and relations.

## opening

You fly to Ibira with Marne. From the small airstrip it is three hours by road and one by boat to the base camp below the Tauá Hills. The road is being widened. Along the river, the forest is very close on both sides.

Iracema Tuyú is waiting at the camp. She is the spokeswoman of the Ibira Peoples' Council, which represents most of the indigenous communities of the region. She is in her forties and speaks quietly. Eleven villages lie within twenty kilometres of the planned mine.

> **Iracema Tuyú:** "Thank you for coming yourself, Madam President. Nobody from the capital has come here before the machines."

> **Iracema Tuyú:** "The communities are not all against the mine. Some want the jobs and the road. Others say the rivers will die. What all of them want is to be asked, formally, before anything is decided."

> **Tobias Marne:** "A formal consultation would take four to six months, Madam President."

→ questions

## questions

1. **"What would the communities want in return?"** `[once]` `→ questions`
   ↳ > **Iracema Tuyú:** "Land titles for the villages. Clean water monitoring that we can check ourselves. A share of the income. Schools."
2. **"Who controls the river here?"** `[once]` `→ questions`
   ↳ > **Iracema Tuyú:** "During the day, nobody. At night, the Red Tree. Our young men are offered money to carry their cargo."
3. **"Let's decide how we proceed."** `→ decide`

## decide

1. **"A formal consultation. The work waits until it's done."** `[indigenous opinion +3]` `[tuyu loyalty +3]` `[marne loyalty -1]` `[approval +2 @ ibira]` `[flag: taua_consulted = true]` `[flag: path_hold += 1]`
   ↳ > **Iracema Tuyú:** "Thank you. I'll tell the villages."
   ↳ > **Tobias Marne:** "I'll tell the contractor to slow down."
2. **"The work continues, and we'll negotiate compensation at the same time."** `[cost: 1 FC]` `[indigenous opinion +1]` `[tuyu loyalty +1]` `[flag: project_progress += 1]`
   ↳ > **Iracema Tuyú:** "Money is better than nothing. It isn't what they asked for."
3. **"The mine is a national priority. It goes ahead on schedule."** `[indigenous opinion -3]` `[tuyu loyalty -3]` `[flag: project_progress += 1]` `[flag: taua_forced = true]` `[flag: path_harden += 1]`
   ↳ > **Iracema Tuyú:** "Then I'll tell them that too."
   ↳ Marne looks at the river and says nothing.

## close

1. **Fly back to the capital** `[flag: seen_site_visit = true]`

→ END
