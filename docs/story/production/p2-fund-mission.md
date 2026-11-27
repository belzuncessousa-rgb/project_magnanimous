---
id: p2-fund-mission
chapter: 2
turn: 1
title: The Fund's Mission
kind: fixed
location: capital
token: treasury
order: 1
portraits: [royce, fontes]
background: treasury-office
---

⚙️ Staged production draft. Dates provisional under six-chapter timeline. The Fund is a multilateral lender, not identical to the Federation; the Federation has considerable voting influence. This meeting communicates the initial terms and requests a negotiating position; the actual financing decision follows. Preserve fund_tone and seen_fund_mission. Do not set fund_terms_eased or deduct EPI before the result of negotiations is resolved.

## arrival

Anselm Royce has been in New Veldrania for several days with a delegation from the Fund. The Treasury has made a conference room available to them, and this morning they have come to the palace to present the conclusions of their review.

Royce greets you in Kunasaian. He speaks with a slight Arennian accent.

> **Anselm Royce:** "Thank you for finding the time, Madam President. Your minister has been very generous with his staff's time this week."

Fontes, seated beside him, closes a folder.

> **Alexander Fontes:** "We've been able to establish the figures with considerably more confidence than we had at the beginning of the administration."

Royce's assistant places a copy of the delegation's report in front of you.

→ assessment

> **Anselm Royce:** "Perhaps we could begin with our assessment."

## assessment

> **Anselm Royce:** "Kunasai has a substantial economy and considerable potential for growth. We are concerned, however, about the proportion of public revenue committed to interest payments."

He turns to a chart showing the outstanding debt over several years.

> **Anselm Royce:** "We believe the government can continue meeting its current obligations. We would like to understand how it intends to manage those obligations over the medium term."

> **Alexander Fontes:** "The options are to begin reducing the principal, continue under the existing arrangement, or seek additional financing. Each has implications for the budget."

1. **"Does your board consider our present position sustainable?"**
   ↳ > **Anselm Royce:** "Under reasonable economic assumptions, yes. Our concern is what happens if revenues disappoint or expenditure rises."
2. **"We have substantial investment needs. I hope your assessment considers those."**
   ↳ > **Anselm Royce:** "It does. We would like to discuss which investments the government expects to undertake and how they will be financed."
3. **"Let's examine the alternatives."**

## terms

> **Anselm Royce:** "If you decide to reduce the debt, that would be well received by our board. If you require further lending, we would expect to reach agreement on a fiscal programme."

Fontes moves a second document across the table.

> **Alexander Fontes:** "Their preliminary proposal includes spending constraints and a review of several state enterprises. The exact terms are not yet agreed."

Royce nods.

> **Anselm Royce:** "There is room to discuss their design. I cannot guarantee that every proposal will be acceptable to the board."

→ questions

## questions

1. **"Why does further lending require changes to our domestic policies?"** `[once]` `→ conditions`
2. **"What if we continue with the present arrangement?"** `[once]` `→ status-quo`
3. **"Could we renegotiate the repayment schedule?"** `[once]` `→ schedule`
4. **"Who ultimately decides whether we receive financing?"** `[once]` `→ board`
5. **"I'd like to establish our negotiating position."** `→ answer`

## conditions

> **Anselm Royce:** "The board would need confidence that the government could meet its commitments. Our preliminary recommendations include measures intended to control recurrent expenditure and improve the financial position of the public sector."

1. **"Would you accept alternatives that achieve the same financial result?"**
   ↳ > **Anselm Royce:** "We can consider them. We would need to examine the estimates and the government's ability to carry them out."
   ↳ Fontes makes a note.
2. **"We will want to examine every condition before we agree."**
   ↳ > **Anselm Royce:** "Naturally."

→ questions

## status-quo

> **Anselm Royce:** "The present agreement remains in force. You would continue servicing the debt. We would review the position again at our next mission."

> **Alexander Fontes:** "Which means we would still have to make room for the existing interest payments in every budget."

→ questions

## schedule

> **Anselm Royce:** "We can submit a proposal to extend the repayment schedule. It would need to be considered alongside the rest of the financial arrangement."

1. **"Would a longer schedule necessarily mean additional conditions?"**
   ↳ > **Anselm Royce:** "Not necessarily the same ones as a new loan. It would depend on the proposal and the board's assessment."
2. **"I understand."**

→ questions

## board

> **Anselm Royce:** "The board represents the Fund's shareholders. Their voting weights differ according to their contributions."

> **Alexander Fontes:** "The Arennian Federation is particularly influential."

Royce nods without adding anything.

1. **"Is the assessment itself independent of those governments?"**
   ↳ > **Anselm Royce:** "Our economists prepare the assessment. The board is responsible for approving financing arrangements."
   ↳ Fontes looks down at the report.
2. **"Thank you."**

→ questions

## answer

Royce sets his pen beside the report.

> **Anselm Royce:** "I would appreciate an indication of how your government would like the discussions to proceed."

1. **"We'll present a credible financial plan with the budget."** `[flag: fund_tone = 1]`
   ↳ > **Anselm Royce:** "That would be helpful. We can arrange a further technical discussion once your plan is ready."
2. **"Our domestic priorities will determine the budget. Then we'll discuss financing."** `[flag: fund_tone = 2]`
   ↳ He inclines his head.
   ↳ > **Anselm Royce:** "Of course. I hope the financial implications will receive appropriate consideration."
3. **"I'd like to negotiate a longer schedule without additional policy conditions."** `[flag: fund_tone = 3]`
   ↳ Royce pauses before answering.
   ↳ > **Anselm Royce:** "I can ask our staff to examine that possibility. We would need a proposal from the Treasury before taking it further."
4. **"I indicated to Alexander that I would prefer to avoid further borrowing."** `[show if: flag.no_more_fund]` `[flag: fund_tone = 1]`
   ↳ Fontes nods.
   ↳ > **Alexander Fontes:** "We can examine the budget on that basis."
   ↳ > **Anselm Royce:** "Then I will look forward to seeing the figures."

## close

After the delegation leaves, Fontes remains at the table.

> **Alexander Fontes:** "Their initial recommendations are useful. I would wait to see the complete terms before deciding whether we need another agreement."

1. **"Include the alternatives in the budget documents."** `[flag: seen_fund_mission = true]`
   ↳ > **Alexander Fontes:** "I will."
2. **"Thank you, Alexander. We'll discuss it with the cabinet."** `[flag: seen_fund_mission = true]`

→ END
