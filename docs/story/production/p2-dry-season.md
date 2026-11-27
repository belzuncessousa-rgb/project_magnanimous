---
id: p2-dry-season
chapter: 2
turn: 2
title: The Dry Season
kind: briefing
location: mognagna-sertao
token: health
portraits: [dara, porper]
background: sertao-town
---

⚙️ Staged drought response. Shared weather pressure may recur, severity and consequences depend on preparation, transfers and infrastructure. Keep famine_relief 1 civilian relief, 2 military logistics support, 3 state-led response; final costs/eligibility and program effects must be computed. Do not guarantee a particular famine or public result. Dates provisional.

## arrival

The town is several hours inland from Sugar Bay. On the outskirts, you pass fields where the plants have grown only a short distance above the soil. A water delivery vehicle is parked near the municipal building, and several residents are waiting beside it.

Governor Julio Porper meets you in the town hall with Owin Dara and the mayor.

> **Julio Porper:** "Thank you for coming, Madam President. The situation varies across the region, but there are several municipalities where the rainfall has been particularly disappointing."

The mayor shows you a map with the affected communities marked.

> **Mayor:** "We've been arranging water deliveries. Some of the smaller reservoirs are approaching the point where we won't be able to use them."

Dara opens a report from his ministry.

→ assessment

> **Owin Dara:** "We are also seeing indications of financial difficulty among households that depend on the harvest. We should consider assistance before the situation becomes more serious."

## assessment

Porper pulls his chair closer to the table.

> **Julio Porper:** "The regional government has committed funds, but we may need federal support if the conditions persist. We have requests from a number of municipalities."

1. **"Which towns are in the most immediate difficulty?"**
   ↳ The mayor and Porper go through the map with you.
2. **"Have the existing assistance programmes reached those areas?"**
   ↳ `[if: flag.initiative.transfers]` > **Owin Dara:** "The continuing payments have helped. They cannot solve the water shortage itself, but they have given families more flexibility."
   ↳ `[if: !flag.initiative.transfers]` > **Owin Dara:** "We have concerns about gaps in the existing payments. The assessment needs to account for the funds that remain available."
3. **"Let's discuss what support is required."**

→ questions

## questions

1. **"What would an emergency programme include?"** `[once]` `→ relief`
2. **"Could the armed forces help with distribution?"** `[once]` `→ military`
3. **"How much could the state government provide?"** `[once]` `→ state`
4. **"What would reduce the impact of future dry seasons?"** `[once]` `→ long-term`
5. **"I said we would prioritize preventing hunger."** `[show if: flag.promised_no_hunger]` `[once]` `→ pledge`
6. **"I'm ready to establish our response."** `→ decision`

## relief

> **Owin Dara:** "Water supplies, temporary food assistance and support for households whose income has been affected. The agricultural authorities can also assess what will be needed for the next planting season."

> **Julio Porper:** "We can collect the requests from the municipalities and coordinate the deliveries."

1. **"How will the assistance reach the intended households?"**
   ↳ > **Owin Dara:** "We need a reliable way to register recipients and verify distribution. We can use the existing municipal networks where they are working effectively."
2. **"Include the most affected towns first."**
   ↳ > **Julio Porper:** "We'll prepare the priorities."
3. **"Understood."**

→ questions

## military

> **Julio Porper:** "The armed forces may be able to help us reach places where civilian transport is limited."

> **Owin Dara:** "That could be useful. The health and regional authorities should still coordinate eligibility and the distribution priorities."

→ questions

## state

> **Julio Porper:** "We have some reserves, but the amounts available differ between municipalities. I would be reluctant to use all of them before we know how long the conditions will last."

1. **"Could we agree on a shared contribution?"**
   ↳ > **Julio Porper:** "I would welcome that. We can prepare the figures for Treasury."
2. **"I want an account of what has already been allocated."**
   ↳ > **Julio Porper:** "I'll have it sent to you."
3. **"I see."**

→ questions

## long-term

> **Owin Dara:** "Reliable water infrastructure, local storage and agricultural practices suited to the conditions would help. The region also needs ways for households to earn income that is less dependent on a single harvest."

Porper points to the map.

> **Julio Porper:** "There are towns with proposals that have been waiting for funding for years. We should discuss those when the immediate situation is under control."

→ questions

## pledge

> **Owin Dara:** "Then I would recommend identifying the families at greatest risk and establishing what assistance is actually available to them."

> **Owin Dara:** "We should keep the commitment in mind when reviewing the budget."

→ questions

## decision

1. **"Prepare a federal emergency relief programme with the state."** `[flag: famine_relief = 1]` `[flag: famine_relief_proposal_requested = true]`
   ↳ Porper nods.
   ↳ > **Julio Porper:** "I'll have the municipalities' requests consolidated."
   ↳ > **Owin Dara:** "We'll prepare the health and household assistance requirements."
2. **"Coordinate targeted relief with military logistics support."** `[flag: famine_relief = 2]` `[flag: famine_relief_proposal_requested = true]`
   ↳ > **Owin Dara:** "I'll establish the distribution priorities with the regional authorities."
   ↳ > **Julio Porper:** "We'll coordinate the transport requirements with Defense."
3. **"Use the state government's resources first. Review federal support as conditions develop."** `[flag: famine_relief = 3]` `[flag: famine_pressure = true]` `[flag: famine_relief_proposal_requested = true]`
   ↳ Porper looks concerned.
   ↳ > **Julio Porper:** "I would like us to establish when that review will take place."
   ↳ > **Owin Dara:** "I'll make sure the government receives regular assessments."
4. **"Bring me a joint funding proposal before we commit additional money."** `[flag: famine_relief_pending = true]` `[flag: famine_relief_proposal_requested = true]`
   ↳ > **Julio Porper:** "Very well. We'll prepare it with the ministries."

⚙️ Federal relief choices set intent, not cost-free guaranteed delivery. Route every choice to the costed joint proposal before authorization. Flags are provisional; the game must show scope, appropriation and source of funds.

## close

The mayor asks whether you would like to see the municipality's water distribution centre.

1. **Visit the centre.** `[flag: seen_dry_season = true]` `→ centre`
2. **Return to Sugar Bay.** `[flag: seen_dry_season = true]` `→ END`

## centre

At the municipal distribution centre, a clerk keeps a delivery book beside a wall map. Two water tanks stand outside. One truck is away on a route that can be reached by the main road; a smaller vehicle is used for the communities where it narrows.

> **Clerk:** "This column is what left here. We have not confirmed every household got the amount written beside its town."

> **Owin Dara:** "The clinic has reported more visits for heat-related symptoms. We are comparing its notes with the district records before we call that a trend."

The mayor marks the delivery routes on the map. The names of households are kept in a separate register at the municipal office.

1. **Ask which deliveries have been confirmed by the receiving towns.**
   ↳ The clerk lists the signed receipts and the communities still awaiting confirmation. Porper asks for a copy to be included in the joint proposal.
2. **Ask what makes the smaller routes difficult.**
   ↳ The mayor explains which bridges and road sections restrict the vehicle. Dara notes that a delivery schedule will need to account for them.
3. **Return to Sugar Bay.**

→ END
