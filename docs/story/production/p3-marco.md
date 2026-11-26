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
4. **"I intend to continue implementing the measures already in the budget."** `→ close`

## aid

> **Sena:** That could help, if it reaches people soon enough.

> **Marco:** Ask the people who live there what they need. We can help arrange a meeting.

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

A woman near the front of the queue recognizes you. She asks whether your mother is doing well. Another customer asks Marco for an extra piece of bread.

1. **Finish helping and leave when the next volunteer arrives.** `[flag: seen_marco = true]` `→ END`
