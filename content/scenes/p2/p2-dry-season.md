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

⚙️ Light theme (health / environment): the rains failed in part of the Mognagna interior. Famine risk (Mognagna initial flag). Small decision with cost. Reacts to promised_no_hunger and the transfers budget.

## opening

Dara asked you to come to a town in the sertão, the dry interior of Mognagna, four hours by road from Sugar Bay. The rains came in March on the coast, but very little fell inland. The reservoir outside the town is a cracked mud basin. Water trucks arrive twice a week.

Governor Julio Porper meets you at the town hall. He is a PM governor in his seventies, a close ally of former President Luz, and very popular in the region.

> **Julio Porper:** "Madam President. Forty towns are like this one. The crops have failed. People are eating their seed stock. If nothing arrives by August, some families will go hungry, and many will leave for Katanaí."

> **Owin Dara:** "The clinics are already seeing more children underweight. It isn't a famine yet. It could become one by the end of the year."

→ questions

## questions

1. **"What do the towns need most?"** `[once]` `→ questions`
   ↳ > **Julio Porper:** "Water, food baskets until the next harvest, and seed for planting."
2. **"Are the transfers reaching these families?"** `[once]` `→ questions`
   ↳ `[if: flag.initiative.transfers]` > **Owin Dara:** "Yes. Without them it would already be much worse."
   ↳ `[if: !flag.initiative.transfers]` > **Owin Dara:** "Not since April. That's part of the problem."
3. **"Why do they leave for Katanaí?"** `[once]` `→ questions`
   ↳ > **Julio Porper:** "Because there's work there, or people think there is. They end up on the hills above the city."
4. **"Here is what we'll do."** `→ decide`

## decide

1. **"An emergency programme: water, food and seed for the forty towns."** `[cost: 20 FC]` `[approval +5 @ mognagna]` `[col +2 @ mognagna]` `[dara loyalty +2]` `[porper loyalty +2]` `[flag: famine_relief = 1]`
   ↳ > **Julio Porper:** "Thank you. I'll have the lists ready tomorrow."
2. **"The army can deliver water and food. It's cheaper and faster."** `[cost: 10 FC]` `[approval +3 @ mognagna]` `[voss loyalty +1]` `[+1 FORCE]` `[flag: famine_relief = 2]`
   ↳ > **Owin Dara:** "People here remember the army. Some of them fondly. That's not my concern today."
3. **"The state government must use its own funds first. We'll help if it gets worse."** `[porper loyalty -2]` `[dara loyalty -1]` `[approval -3 @ mognagna]` `[flag: famine_relief = 3]` `[flag: famine_pressure = true]`
   ↳ > **Julio Porper:** "The state has no funds, Madam President. But I'll tell them you said so."
   ↳ `[if: flag.promised_no_hunger]` *In January you said on the radio that nobody in Mognagna would go hungry while you were in office. Porper remembers it. So do you.*

## close

1. **Return to Sugar Bay** `[flag: seen_dry_season = true]`

→ END
