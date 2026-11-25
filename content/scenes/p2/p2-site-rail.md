---
id: p2-site-rail
chapter: 2
turn: 2
title: The First Section
kind: conditional
location: tapira-mines
token: project
when: "flag.great_project == 4"
portraits: [arturo, marne]
background: rail-yard
---

⚙️ Great-project follow-up (project 4, railway): oversight visit in Tapira. The route of the first section and where its stations go. The landowners want stations on their land.

## opening

The first section of the railway will run from the grain country of Tapira to the capital. You visit the survey camp outside a market town in the Tapira highlands with Marne. The land is flat and planted with soy and maize to the horizon.

The Governor of Tapira, Arturo Trembolo, meets you there. He is in his sixties, from the family that owns the largest tobacco company in the country and a great deal of land. He belongs to the Capital Party, the opposition. He is friendly.

> **Arturo Trembolo:** "Madam President. Welcome to Tapira. I'll say it plainly: this is the best decision your government has made. Our grain will reach the port at half the cost."

> **Tobias Marne:** "The engineers have proposed a route. Governor Trembolo has proposed a different one."

> **Arturo Trembolo:** "Only small changes. Three stations moved a few kilometres, closer to the towns that need them."

> **Tobias Marne:** "Closer to the Governor's family's silos, among other things. The engineers' route is shorter and cheaper."

→ questions

## questions

1. **"How much more would the Governor's route cost?"** `[once]` `→ questions`
   ↳ > **Tobias Marne:** "About a tenth more for this section. And six months."
2. **"Governor, who owns the land near your stations?"** `[once]` `→ questions`
   ↳ > **Arturo Trembolo:** "Several families. Mine among them, I won't pretend otherwise. This is Tapira; we own most of it."
3. **"Let's decide the route."** `→ decide`

## decide

1. **"The engineers' route. Stations where the engineers put them."** `[arturo loyalty -2]` `[cp opinion -1]` `[fontes loyalty +1]` `[flag: rail_route = 1]` `[flag: path_hold += 1]`
   ↳ > **Arturo Trembolo:** "As you wish. The farmers will remember who chose for them."
2. **"The Governor's route. We need Tapira on our side."** `[cost: 1 FC]` `[arturo loyalty +3]` `[cp opinion +2]` `[approval +2 @ tapira]` `[flag: corruption += 1]` `[flag: rail_route = 2]` `[flag: voice += 1]`
   ↳ > **Arturo Trembolo:** "Thank you, Madam President. Tapira won't forget."
   ↳ *A tenth more, for a railway that will last a century. And Tapira's deputies will vote with you in July.*
3. **"Public hearings in each town before the route is fixed."** `[arturo loyalty -1]` `[approval +1 @ tapira]` `[flag: rail_route = 3]`
   ↳ > **Tobias Marne:** "That adds three months. But nobody can say we decided it in an office."

## close

1. **Return to the capital** `[flag: seen_site_visit = true]`

→ END
