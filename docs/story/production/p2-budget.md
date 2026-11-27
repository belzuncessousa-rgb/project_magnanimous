---
id: p2-budget
chapter: 2
turn: 1
title: The Budget
kind: fixed
location: capital
token: treasury
order: 2
when: "flag.seen_fund_mission"
portraits: [livia, fontes, dara]
background: blue-room
---

⚙️ Staged prose around existing budget/debt UI hooks, NOT integration-ready. Chapter-level resource generation, recurring ministry spending, debt interest, budget revision and congressional approval require engine reconciliation. Retain existing budget/debt flags and judicial_target; no fabricated currency values, automatic majority or automatic loan proceeds. A later negotiation/approval stage must implement any conditional funding, amendments and debt terms. Reactions to budget flags only after the UI has set them.

## opening

Livia has arranged the budget documents into several piles on the cabinet table. Fontes is speaking to one of his assistants when you arrive. The assistant hands him a final sheet and leaves.

> **Livia Harvan:** "Good morning. We have the consolidated requests from the ministries and the Treasury's revenue estimates. The purpose of this meeting is to decide what we intend to put before Congress."

She hands you the summary.

> **Alexander Fontes:** "The first part shows the government's existing obligations. The second shows the money we could allocate to programmes and investment. As you can see, the requests are considerably larger than the available funds."

Dara, sitting a few places down the table, opens his own copy.

→ overview

> **Owin Dara:** "Does the estimate include the money needed to renew the household assistance programmes?"

> **Alexander Fontes:** "That is included among the programme requests. It hasn't been allocated yet."

Dara nods, looking at the relevant page.

## overview

> **Livia Harvan:** "For each ministry, you can determine the level of funding and which initiatives the government should prioritize. We will then examine the overall position, including the proposed Great Project and the debt."

> **Alexander Fontes:** "The estimates include the expected financial consequences of each level of funding. I would pay particular attention to spending that continues for the duration of the budget."

→ budget-q

## budget-q

1. **"How much flexibility do we have after this meeting?"** `[once]` `→ flexibility`
2. **"What happens if we substantially reduce a ministry's funding?"** `[once]` `→ cuts`
3. **"How are the deputies' investment funds accounted for?"** `[once]` `→ district-funds`
4. **"How will we fund the project we selected?"** `[once]` `→ investment`
5. **"Let's examine the ministry allocations."** `→ screen`

## flexibility

> **Alexander Fontes:** "We can propose revisions when circumstances change. Some changes require congressional approval, and we will already have entered commitments with employees, suppliers or programme beneficiaries."

> **Livia Harvan:** "It is easier to alter a planned initiative than to reverse one that is already being carried out."

→ budget-q

## cuts

> **Livia Harvan:** "The ministry's core responsibilities remain. Reducing discretionary funding can delay initiatives, restrict staffing or reduce services, depending on the ministry."

> **Owin Dara:** "In my case, some of the assistance programmes will need to be renewed. If we don't allocate the money, the recipients will notice fairly quickly."

Fontes nods.

> **Alexander Fontes:** "We should distinguish those consequences from reductions in the administrative budget itself."

→ budget-q

## district-funds

> **Livia Harvan:** "We have included a line for district investment proposals among the matters to settle with Congress."

1. **"I agreed to restore the funds with published allocations."** `[show if: flag.amendments == 1]`
   ↳ > **Livia Harvan:** "I've recorded that condition. We will need the proposed amount and the publication process."
2. **"I told Pelan that deputies could negotiate their allocations privately."** `[show if: flag.amendments == 2]`
   ↳ > **Alexander Fontes:** "We will still need a defined total and appropriate budget authority."
3. **"I told Pelan I intended to prioritize the national programme instead."** `[show if: flag.amendments == 3]`
   ↳ > **Livia Harvan:** "We'll need to take that into account when we discuss the budget with the bench."
4. **"We'll settle the details with Congress."**
   ↳ > **Livia Harvan:** "Of course."

→ budget-q

## investment

> **Alexander Fontes:** "The selected project will have its own funding schedule. We have not yet agreed all the procurement and financing terms, so there is some uncertainty in the estimates."

1. **"I'd like to know whether we could accommodate another project."**
   ↳ > **Alexander Fontes:** "Once we have the overall allocations, I can examine the available margin. We should not count expected financing as received money."
2. **"Let's make sure the existing priority is accounted for first."**
   ↳ He nods.
3. **"Understood."**

→ budget-q

## screen

1. **Review the proposed budget.**

*Open the proposal editor when integration provides it. It drafts allocations and estimates without changing current ministry funding. The player may keep the existing levels as a starting proposal. Use the resulting draft for the next exchange.*

## judicial

1. **"Prioritize additional enforcement resources against the cartels."** `[show if: flag.initiative.judicial]` `[flag: judicial_target = 1]`
   ↳ > **Livia Harvan:** "I'll ask Renata to prepare the corresponding allocation."
2. **"Prioritize enforcement against unlawful influence in rural areas."** `[show if: flag.initiative.judicial]` `[flag: judicial_target = 2]`
   ↳ > **Livia Harvan:** "I'll have the ministry prepare the regional programme."
3. **Continue.** `[show if: !flag.initiative.judicial]`

⚙️ Judicial target is a resource/policy priority, not instruction to adjudicate specific cases.

## reactions

Livia reviews the proposed allocations with Fontes. Dara turns to the health section.

1. **Discuss the proposed allocations.**
   ↳ `[if: flag.transfers_cut]` Dara looks concerned.
   ↳ `[if: flag.transfers_cut]` > **Owin Dara:** "If these allocations are approved, we will need to inform the regional offices that the current assistance payments cannot all continue."
   ↳ `[if: flag.transfers_cut && flag.promised_no_hunger]` > **Owin Dara:** "In Sugar Bay you said preventing hunger would be a priority. We should discuss what assistance will remain available before we announce these changes."
   ↳ `[if: flag.initiative.transfers]` > **Owin Dara:** "The proposed funds would allow us to maintain the assistance programme. Thank you."
   ↳ `[if: flag.project_paused]` > **Livia Harvan:** "The proposed Planning allocation would not support the present project schedule. We'll need a revised financing plan before we proceed."
   ↳ `[if: flag.initiative.anticorruption]` > **Livia Harvan:** "Renata has prepared a proposal for the anti-corruption unit. We'll need to settle its authority and safeguards."
   ↳ `[if: flag.initiative.labor_compact]` > **Livia Harvan:** "Justice can begin arranging the labour negotiations once the relevant allocation is approved."
   ↳ `[if: flag.intelligence_cut]` > **Livia Harvan:** "Darian has requested a meeting to discuss the consequences for his service."

## debt

Fontes turns to the final pages.

> **Alexander Fontes:** "We have one remaining decision. The debt."

He lays out the three alternatives.

> **Alexander Fontes:** "Reducing the principal would reduce our future obligations, but require additional funds now. Continuing under the current arrangement would preserve more immediate flexibility. Additional borrowing could finance more expenditure, provided we accept the terms and can service the larger balance."

1. **"What would you recommend, given this budget?"**
   ↳ > **Alexander Fontes:** "I'd prefer to avoid additional borrowing unless there is a clear financial or economic case for it. The amount we can repay depends on the final budget and our other commitments."
2. **"What conditions would attach to new financing?"**
   ↳ > **Alexander Fontes:** "The Fund's initial proposals include fiscal constraints and a review of state enterprises. We should agree the complete terms before committing to any disbursement."
3. **"I understand the alternatives."**

## debt-choice

1. **"Plan to repay part of the principal."** `[flag: debt_policy = 1]`
   ↳ > **Alexander Fontes:** "We'll establish the amount that can be accommodated within the budget."
2. **"Seek additional financing from the Fund."** `[flag: debt_policy = 2]`
   ↳ > **Alexander Fontes:** "I'll take the proposed amount and the budget to the Fund. Any additional conditions will need to be brought back for your approval."
   ↳ `[if: flag.fund_tone == 1 && !flag.no_more_fund]` > **Alexander Fontes:** "We told Royce we would bring him a financial plan with the budget. I'll send the figures once we've settled them."
   ↳ `[if: flag.fund_tone == 2]` > **Alexander Fontes:** "We told Royce that domestic priorities would shape the budget. I'll send him the figures we have actually approved."
   ↳ `[if: flag.fund_tone == 3]` > **Alexander Fontes:** "We asked the Fund to examine a longer schedule without new policy conditions. Royce said Treasury would need to put forward a proposal."
   ↳ `[if: flag.no_more_fund]` > **Alexander Fontes:** "I note that this differs from your earlier preference. I'll prepare the comparison so we can explain why the proposal has changed."
3. **"Continue servicing the debt under the existing agreement."** `[flag: debt_policy = 3]`
   ↳ > **Alexander Fontes:** "Very well. We'll retain the present obligations in the financial plan."

*Record a debt negotiating direction. If Lara wants to compare amounts, Fontes can show estimates. Actual repayments and new draws belong to [Signed terms](TERM-VOTES.md#the-signed-terms) or a later authorized payment scene.*

## close

Livia closes her copy of the documents.

> **Livia Harvan:** "We'll prepare the copy for the parties. If they ask for changes, we'll bring the figures back to you."

> **Alexander Fontes:** "Please make sure Treasury sees any agreement that changes the expenditure figures."

1. **"Bring me the revised proposal before it goes to a vote."** `[flag: seen_budget = true]`
   ↳ > **Livia Harvan:** "Of course."
2. **"Coordinate the discussions with Caio and keep me informed."** `[flag: seen_budget = true]`
   ↳ She nods.
3. **"Thank you, everyone."** `[flag: seen_budget = true]`

→ END
