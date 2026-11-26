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

⚙️ Staged railway site encounter. Keep rail_route 1 engineers' proposal, 2 governor's alternative, 3 hearings. Family interest disclosed; corruption depends on actual arrangement, not automatically on route choice. Costs, projected demand and effects require engineering/game balance.

## arrival

A survey team has established an office near one of the proposed railway routes in Tapira. From the road, fields extend towards the low hills. Trucks wait beside a grain storage facility near the junction.

Governor Arturo Trembolo is waiting at the survey office. He greets you warmly and introduces you to several local officials.

> **Arturo Trembolo:** "Madam President. I was very pleased to hear that you had chosen the railway."

Marne lays two maps on a table beneath the awning.

> **Tobias Marne:** "The engineers have prepared a proposed alignment. The state government has suggested some changes to the locations of the stations and the route between them."

> **Arturo Trembolo:** "We've spoken to several of the municipalities and producers. They believe the alternative would serve the region better."

Marne points to the difference between the lines.

> **Tobias Marne:** "It would also make this section longer. We have not yet established whether the additional demand justifies the cost."

## comparison

The governor calls one of his officials over, who explains the proposed connections to the storage facilities.

> **Arturo Trembolo:** "There is a great deal of produce moving through those towns. A station nearby would make a considerable difference."

Marne turns another page.

> **Tobias Marne:** "Some of the storage facilities belong to the Governor's family."

Trembolo looks at him, then back at you.

> **Arturo Trembolo:** "Yes. We have interests in the region, as do a number of other families. I don't think that makes the economic argument invalid."

→ questions

## questions

1. **"What would the additional route cost?"** `[once]` `→ costs`
2. **"How many other producers would benefit?"** `[once]` `→ demand`
3. **"What have the smaller municipalities requested?"** `[once]` `→ towns`
4. **"Could an independent assessment compare the routes?"** `[once]` `→ review`
5. **"Let's establish the direction."** `→ decision`

## costs

> **Tobias Marne:** "Our preliminary estimate is that the alternative would increase the cost of this section and require additional time. The precise amount depends on the engineering work and land arrangements."

> **Arturo Trembolo:** "We should also consider the additional freight that would use it."

Marne nods.

> **Tobias Marne:** "Certainly. That is part of the comparison we need."

→ questions

## demand

> **Arturo Trembolo:** "There are several large producers and a number of smaller ones using the same storage and transport facilities."

1. **"Would all producers have access on the same terms?"**
   ↳ > **Arturo Trembolo:** "That would need to be established in the operation of the stations."
   ↳ > **Tobias Marne:** "We can include the access requirements in the assessment."
2. **"I'd like to see the demand figures."**
   ↳ The governor asks his official to send them to Planning.
3. **"Understood."**

→ questions

## towns

> **Tobias Marne:** "Several municipalities want a connection. We could consult them on both routes before the final alignment is settled."

> **Arturo Trembolo:** "That would take some time. Every town along the proposed route will want a station of its own."

→ questions

## review

> **Tobias Marne:** "Yes. We can have the projected demand, costs and land arrangements reviewed together."

1. **"Include the ownership of the land that would benefit."**
   ↳ Trembolo gives you a small nod.
   ↳ > **Arturo Trembolo:** "Very well. I would expect the assessment to include everyone with an interest."
2. **"Make sure the comparison is available to the state government."**
   ↳ > **Tobias Marne:** "Of course."

→ questions

## decision

1. **"Proceed with the engineers' proposed alignment."** `[flag: rail_route = 1]`
   ↳ Marne nods.
   ↳ Trembolo looks down at the map.
   ↳ > **Arturo Trembolo:** "I hope there will still be an opportunity to discuss connections to some of those facilities."
2. **"Prioritize the state government's alternative, subject to the required assessment."** `[flag: rail_route = 2]`
   ↳ Trembolo smiles.
   ↳ > **Arturo Trembolo:** "Thank you. We'll provide the figures your engineers need."
   ↳ > **Tobias Marne:** "I'll have the implications for the budget assessed."
3. **"Hold consultations and compare the routes before fixing the alignment."** `[flag: rail_route = 3]`
   ↳ > **Tobias Marne:** "We'll arrange that with the state and municipal authorities."
   ↳ Trembolo nods, though he seems somewhat disappointed.
   ↳ > **Arturo Trembolo:** "I'll ask the municipalities to prepare their proposals."

## close

The governor offers to show you one of the nearby storage facilities before you leave.

1. **Visit the facility.** `[flag: seen_site_visit = true]`
   ↳ A manager explains how the harvest is transported to the ports and what a railway connection would change.
2. **Return to the capital.** `[flag: seen_site_visit = true]`

→ END
