---
id: p3-strawberry
title: Made in Kunasai
chapter: 3
turn: 1
location: tekoku
portraits: [works, kaval]
background: factory-floor
---

## factory

Martin Works is waiting beside a production line at Strawberry's factory. Through the glass, technicians wearing blue coats examine small circuit boards under magnifying lenses.

> **Works:** This line makes our newest devices. We have been able to compete on quality. The price is becoming more difficult.

He places two phones on a table. One bears the Strawberry logo; the other was manufactured abroad.

> **Works:** Our imported competitors can sell these for less than we spend making ours. At some point, I will have to decide whether we continue producing them here.

Kaval picks up the Kunasaian phone and turns it over.

> **Kaval:** There is also the question of which components we can develop ourselves.

1. **"How much of the phone is manufactured here?"** `→ components`
2. **"Are these imports being subsidized?"** `→ imports`
3. **"What assistance are you asking for?"** `→ assistance`

## components

> **Works:** Assembly, several components and some of the software. Our most advanced components still come from overseas. That is an area where research and university partnerships could make a difference.

→ assistance

## imports

> **Works:** We suspect that some producers benefit from substantial support in their home markets. Establishing that properly is another matter.

> **Kaval:** A trade investigation would have to distinguish unfair practices from genuinely more efficient production.

→ assistance

## assistance

> **Works:** Temporary protection would give us room to invest. I would also like to see a proper research programme with Tekoku's universities.

> **Kaval:** We should establish what Strawberry would contribute in return. Public research funding should build capabilities that outlast any one company.

1. **Prepare a temporary protective tariff proposal.** `[flag: strawberry_tariff_intent = true]` `→ tariff`
2. **Develop a university research partnership.** `[flag: strawberry_research_intent = true]` `→ research`
3. **Keep the market open and ask the company for its competitiveness plan.** `[flag: strawberry_open = true]` `→ open`
4. **Investigate the alleged unfair trading practices before deciding.** `[flag: strawberry_trade_review = true]` `→ close`

## tariff

Works looks relieved.

> **Works:** That would help us plan the next investment cycle.

> **Kaval:** Provided it is temporary and accompanied by commitments. Otherwise, we may be having the same discussion several years from now.

1. **Include investment and productivity conditions in the proposal.** `[flag: strawberry_protection_conditions = true]` `→ close`
2. **Ask the trade ministry to prepare a straightforward tariff proposal.** `→ close`

## research

> **Kaval:** I can bring the relevant universities together. We will need to establish the scope of the programme and the funding available.

If the higher-education initiative is already funded, the existing programme may provide a route to a more ambitious partnership.

> **Works:** We can contribute our engineers and access to the production line. I would like to be involved from the beginning.

1. **Ask them to develop a shared programme with measurable goals.** `→ close`
2. **Ask them to examine a broader national technology hub.** `[flag: tekoku_hub_study = true]` `→ close`

## open

Works returns one of the phones to its box.

> **Works:** I understand. We will prepare the plan. I cannot guarantee that all our current production will remain viable.

> **Kaval:** We should continue examining the research opportunities regardless of the trade decision.

→ close

## close

A technician approaches Works with a question about a test result. He excuses himself for a moment and follows her to the end of the line.

Kaval watches the discussion.

> **Kaval:** There are good people here. Whatever we decide, I hope we give them reasons to stay in Tekoku.

1. **Finish the visit.** `[flag: seen_strawberry = true]` `→ END`
