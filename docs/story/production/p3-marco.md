---
id: p3-marco
title: Before Six
chapter: 3
turn: 2
location: vila-tamarin
portraits: [marco, sena]
background: community-kitchen
---

<!-- This encounter precedes a possible strike. If a strike is underway, substitute the relevant negotiation/crisis scene. Aid flags represent proposals until funding and delivery are confirmed. -->

## arrival

Marco is arranging bread on a metal counter when you arrive at the kitchen. There is a stack of clean cups beside him and a queue forming outside.

> **Marco:** Give me a minute. We're short a pair of hands this morning.

Dorival Sena is waiting at a small table near the entrance. He makes room for you among several bags of flour.

> **Sena:** Thank you for coming. I have been speaking to representatives from the port. They are losing patience with the negotiations.

Marco brings three cups to the table.

> **Marco:** They are also paying more for rent and transport. Some of the workers spend half their morning getting down from the slopes.

1. **"What are they asking the government to do?"** `→ demands`
2. **"How close are they to a strike?"** `→ strike`
3. **"How many families are relying on this kitchen now?"** `→ kitchen`
4. **"Let's discuss what we can do."** `→ options`

## demands

> **Sena:** Wages, scheduling, the conditions under which subcontractors are hired. Some of the problems need an agreement with employers. Others concern public services.

→ options

## strike

> **Sena:** I cannot promise you that they will wait for the next meeting. The local representatives have to answer to their members.

> **Marco:** They are not all of one mind. Talk to them before you decide what they want.

→ options

## kitchen

Marco glances towards the counter.

> **Marco:** More than last year. Some have work and still come here. We try not to turn anyone away.

→ options

## options

1. **Develop a temporary housing and transport assistance programme.** `[flag: strike_housing_intent = true]` `→ aid`
2. **Prepare support for community kitchens and food distribution.** `[flag: strike_food_intent = true]` `→ aid`
3. **Invite unions and employers to formal wage negotiations.** `[flag: port_talks = true]` `→ talks`
4. **"I won't announce assistance until we know what can be funded."** `→ close`

## aid

> **Sena:** That could help, if it reaches people soon enough.

*If Lara requested housing and transport assistance:*

> **Marco:** There's a woman who comes here after the first bus from the slopes. The other day she missed it because it filled up before it got to her stop. If you're going to look at fares, could someone look at the first buses as well?

*If Lara requested food distribution:*

> **Marco:** We can serve more in the mornings if we know what day the supplies are coming. I can get the other kitchens' opening hours. They're all different.

→ close

## talks

> **Sena:** I will bring the proposal to the local representatives. They should be part of deciding who attends.

→ close

## close

The first people in the queue begin coming inside. Marco stands and goes back to the counter.

1. **Stay and help serve breakfast for a while.** `→ serve`
2. **Thank Marco and Sena and return to your appointments.** `[flag: seen_marco = true]` `→ END`

## serve

Marco hands you a tray of cups and shows you where the clean ones go.

A woman near the front of the queue recognizes you. If Celia's admission is public, she asks whether your mother is doing well. Otherwise, she asks Marco what time the kitchen will open tomorrow. Another customer asks for an extra piece of bread.

1. **Finish helping and leave when the next volunteer arrives.** `[flag: seen_marco = true]` `→ END`

### What the centre can offer

*Separate follow-up after a requested housing, transport, or food measure has been costed. Use the proposal Lara actually authorized for study. If none was requested, omit the funding decision. A local service can still report its independently established hours.*

Marco has brought the centre's opening hours to the municipal office. The clerk has pinned them to the board beside the bus timetable. She asks him which of the two kitchen hours is current.

> **Marco:** “The one in pencil. I wrote it down this morning. We can open earlier if the bread comes before six.”

*Food proposal.* The clerk gives you the list of providers that can take deliveries and the earliest confirmed delivery date. If fewer sites are affordable than the original request covered, she names the districts that would still wait.

*Housing and transport proposal.* The clerk gives you the proposed eligibility notice. “They can apply here. We have a place to take the applications. I still need the date when we can start deciding them.” If the proposal changes service rather than fare support, use the confirmed route and capacity instead.

- **“Approve the funded measure.”** Show the scope and remaining budget before confirmation. The clerk adds the authorized start to the notice. “I'll send the same copy to the other offices. I'd like them to call us if they can't use that date.” Record approval. The appointment, payment or delivery counts only once it occurs.
- **“Bring back an option for the districts still waiting.”** The clerk keeps the eligibility list beside her. “I'll ask those offices what they can handle now. Then we can see what needs another allocation.” Record a request for a revised plan. Existing authorization remains in force.
- **“Keep the existing service for now.”** Marco takes down the pencilled notice so the clerk can make a clean copy. “I'll tell them the hours we've got this week. Can they ring someone here if they can't get to us?” The clerk gives him the public number if one is staffed. Do not announce an unfunded expansion.

End this decision encounter after Lara chooses. Do not append delivery or delay results to the same visit. Dispatch [The notice on the board](p3-marco-followup.md) only after the approved measure has reached its first verified delivery milestone or its confirmed start date has passed without delivery. The port's labour terms are resolved separately.

→ END
