---
id: p3-tax-reform
title: The Cost of Government
chapter: 3
turn: 1
location: capital
portraits: [fontes, mertens, livia]
background: treasury-office
---

<!-- Tax direction is a proposal, not enacted tax rates. The existing bill system may be adapted to the negotiated text. Actual implementation, revenue and approval effects must depend on enacted provisions. -->

## opening

Fontes has laid out three versions of the revenue forecast. Each starts with the same estimates for the economy, but the lines begin to diverge in the following year.

> **Fontes:** We have been discussing what the government should do. We also need to decide how it will pay for it.

Mertens takes the document closest to him.

> **Mertens:** Before we announce anything, I would like to know which deputies we expect to vote for it.

> **Fontes:** That depends on which proposal the president chooses.

1. **"Explain the alternatives."** `→ alternatives`
2. **"What happens if we leave the system alone?"** `→ unchanged`

## unchanged

> **Fontes:** We retain the current revenue structure. That is a viable choice if our commitments fit within it. If they do not, we must reduce expenditure, find other revenue or accept additional financing.

→ alternatives

## alternatives

> **Fontes:** We can raise more from higher incomes and property, simplify the system and reduce the burden on production, or concentrate on exemptions and collection without changing its general direction.

1. **"Which taxes would a more progressive proposal change?"** `→ progressive`
2. **"What would simplification involve?"** `→ simplify`
3. **"How much could we recover through enforcement and fewer exemptions?"** `→ enforcement`
4. **"I have enough information to decide."** `→ direction`

## progressive

> **Fontes:** We would ask higher-income households and owners of substantial estates to contribute more. The precise thresholds matter. We should avoid creating an unexpected burden for ordinary households or businesses whose assets cannot readily be converted into cash.

> **Mertens:** Some members of your own party will support that enthusiastically. The Capital Party will ask for exceptions, and the landowners will make their position very clear.

→ direction

## simplify

> **Fontes:** We can consolidate overlapping taxes and reduce selected rates. The difficulty is the initial loss of revenue. I would not include an assumed increase in economic activity in the first year's available funds.

> **Mertens:** The industrial wing of the Capital Party may support us. We would still have to explain the proposal to our own deputies.

→ direction

## enforcement

> **Fontes:** Review exemptions that have outlived their purpose, improve collection and reduce the opportunities to conceal taxable income. We can do some of that administratively; other changes require legislation.

> **Livia:** And certain exemptions were negotiated for a reason. We should establish which ones before we remove them.

→ direction

## direction

1. **Prepare a progressive tax reform.** `[flag: tax_direction = 1]` `→ preparation`
2. **Prepare a simpler system with lower selected rates.** `[flag: tax_direction = 2]` `→ preparation`
3. **Prioritize loopholes and collection.** `[flag: tax_direction = 3]` `→ preparation`
4. **Retain the existing system for now.** `[flag: tax_direction = 0]` `→ close`

## preparation

Mertens moves the other two forecasts aside.

> **Mertens:** Give me the actual provisions when they are ready. I can start with the parties whose interests align with them.

1. **"The central objective must survive negotiations."** `[flag: tax_negotiation_limit = 1]` `→ close`
2. **"I am open to concessions if the result is still worthwhile."** `[flag: tax_negotiation_limit = 2]` `→ close`
3. **"Bring me the proposed compromises before promising anyone anything."** `[flag: tax_negotiation_limit = 3]` `→ close`

## close

Fontes gathers the forecasts.

> **Fontes:** I will update the fiscal projections as soon as we have a settled text. Until then, the current rates remain in force.

1. **Conclude the meeting.** `[flag: seen_tax_reform = true]` `→ END`
