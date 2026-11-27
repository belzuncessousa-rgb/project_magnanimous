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

→ comparison

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

1. **"Use the engineers' alignment for the next assessment."** `[flag: rail_route = 1]`
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

### The revised route

*Before awarding the first railway section, when the route assessment is available. The proposed alignment, a second-round selection, and the alignment authorized for construction are distinct. Keep the actual route decision with this railway project.*

Marne has pinned the two alignments side by side. A municipal official who attended the consultations has brought a copy of the minutes. She keeps it open at a question about access to the loading yard.

> **Official:** “They asked whether smaller producers would use the same entrance. I said I'd wait until you had settled the plans before I answered.”

Marne gives you the latest cost comparison. If the governor's alignment is still eligible, show its verified costs, demand, and disclosed interests. If a hearing ruled out part of either alignment, he points to the section that needs changing before it can appear in a funded contract.

- **“Use the eligible engineers' alignment.”** Marne marks the stations it includes. “I'll send the towns the stops in this version. They'll ask about the other ones, so I'll tell them which part of the comparison decided it.” Bring this alignment to the award scene if funds and authority are in place.
- **“Use the costed state alternative and give eligible smaller producers the same loading-yard access terms.”** `[show if: the state alignment is eligible, assessed and within the available authority]` Marne adds those conditions and any associated capacity cost to the contract before it can be awarded. The municipal official takes a copy of the terms for the towns. A benefit to an interested party is reported as such; a finding of misconduct still requires separate evidence.

→ END
- **“Settle the remaining access question first.”** Marne leaves both maps on the board. “We'll return with the supported alignment and the cost of those access terms.” Keep the award pending. A later reopening requires a feasible route.

The official takes a copy of the instructions for the municipalities. She leaves the proposed opening dates where they are until a contract and an operating plan can support them.
