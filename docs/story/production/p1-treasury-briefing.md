---
id: p1-treasury-briefing
chapter: 1
turn: 2
title: The Debt
kind: briefing
location: capital
token: treasury
portraits: [fontes]
background: treasury-office
---

⚙️ Staged rewrite. Retain the inherited debt, arrears and Corvel threads, existing decision flags and achievement hook. No debt commitment or actual borrowing here. The approximately 11% interest burden is the GDD starting assumption, not a verified engine calculation. All numerical effects and disclosure timing require reconciliation with chapter-based finances. Do not treat ordinary confidentiality as corruption.

## arrival

The Treasury occupies an office building a few streets from the palace. On the way upstairs, you pass a room with dozens of desks and several people comparing printed spreadsheets.

Alexander Fontes is waiting at the door of his office.

> **Alexander Fontes:** "I'm afraid we're still surrounded by boxes. My predecessor left rather more paper than I'd expected."

He clears a space at the end of a small meeting table. One of his staff brings in two glasses of water and leaves.

> **Alexander Fontes:** "I've prepared a summary of what we've found so far. There are three matters I would like you to know about before we start putting together a budget."

He opens a folder with the national arms on its cover.

## balance

> **Alexander Fontes:** "Our principal creditor is the international Fund. A considerable part of the debt goes back to the sanitation programme under President Luz. We have refinanced it on several occasions, and the amount outstanding remains substantial."

He points to a line marked interest.

> **Alexander Fontes:** "For every hundred we collect in revenue, approximately eleven go towards servicing the debt. That's a large obligation for a government with the investment needs we've been discussing."

> "How much of that actually reduces the debt?"

> **Alexander Fontes:** "At present, very little. Most of those payments are interest."

He turns to a second page.

> **Alexander Fontes:** "There is another matter. My staff have found invoices from public suppliers which were not properly reflected in the previous government's accounts. Some of the suppliers haven't been paid for months."

1. **"How could the accounts have missed them?"**
   ↳ > **Alexander Fontes:** "Some departments had not submitted the invoices to the Treasury. Others had submitted them and were waiting for approval. We are trying to establish which were delayed deliberately."
2. **"Does that change the budget we anticipated?"**
   ↳ He nods.
   ↳ > **Alexander Fontes:** "Yes. We need to make provision for legitimate liabilities before allocating the remaining funds."
3. **"Show me the rest first."**

→ review

## review

> **Alexander Fontes:** "The last matter concerns the sanitation works. There is a separate file for that, but the financial implications are considerable."

He puts a binder beside the summary.

> **Alexander Fontes:** "Before we discuss it, is there anything about the government's position you'd like me to explain?"

→ questions

## questions

1. **"What happens if we pay down the principal?"** `[once]` `→ principal`
2. **"Could we borrow more?"** `[once]` `→ borrowing`
3. **"How much money will we have for new programmes?"** `[once]` `→ budget-room`
4. **"Who else knows about the unpaid invoices?"** `[once]` `→ disclosure-q`
5. **"Let's discuss how to handle this."** `→ telling`

## principal

> **Alexander Fontes:** "The more of the principal we retire, the lower our future interest obligations should be. It would also improve our position when negotiating with the Fund."

He takes off his glasses.

> **Alexander Fontes:** "Of course, money used to repay the debt is money we cannot spend on new programmes now."

1. **"Would that help us within this term?"**
   ↳ > **Alexander Fontes:** "It depends on how much we pay. A modest payment might have more immediate diplomatic value than financial value."
2. **"Understood."**

→ questions

## borrowing

> **Alexander Fontes:** "We can discuss it with the Fund. I would expect conditions on any additional lending, and those conditions may matter as much as the interest rate."

1. **"Could a loan fund something that pays for itself?"**
   ↳ > **Alexander Fontes:** "Potentially. If we finance a productive investment and its returns exceed the cost of the borrowing, it could improve our position. We would need fairly conservative estimates."
2. **"We'll see what the Fund offers."**

→ questions

## budget-room

Fontes turns the summary towards himself.

> **Alexander Fontes:** "I can give you an estimate after we've finished examining the outstanding obligations. Even then, we will have to decide how much of our available revenue to commit to the different ministries."

> **Alexander Fontes:** "I wouldn't like to promise any of them money on the basis of the figures we have today."

→ questions

## disclosure-q

> **Alexander Fontes:** "My staff, some of the ministries concerned, and presumably the officials who handled the invoices under the previous administration. A number of companies know they haven't been paid."

> **Alexander Fontes:** "The existence of the debt itself is public. The discrepancy in the accounts is what we need to address."

→ questions

## telling

> **Alexander Fontes:** "We should decide what we intend to say about the accounts. I can prepare a statement now, or we can wait until we have verified the full figures and have a financial plan."

1. **"Tell the public what we know now."** `[flag: hole_public = true]`
   ↳ > **Alexander Fontes:** "I'll prepare a summary that distinguishes confirmed obligations from figures we are still checking."
2. **"Wait until the figures and our response are ready."** `[flag: hole_quiet = true]`
   ↳ He nods.
   ↳ > **Alexander Fontes:** "Very well. I'll keep you informed. We should agree on a date for publication once the work is complete."
3. **"Publish it and identify the previous government's responsibility."** `[flag: hole_castelar = true]`
   ↳ Fontes pauses.
   ↳ > **Alexander Fontes:** "Where we can establish that responsibility, I will include it. I would prefer not to name officials before we have examined their records."
4. **"That's an order, Alexander. Figure it out."** `[flag: alexander_ordered = true]`
   ↳ He sets his glasses down and looks at you.
   ↳ > **Alexander Fontes:** "Very well. I'll prepare a recommendation and send it to your office."

## corvel

He pulls the thick binder towards him. Its spine carries the name of the construction consortium Corvel.

> **Alexander Fontes:** "The original sanitation contract. Much of the work was completed, but the project has been suspended for several years."

He opens the binder at a page marked with a yellow tab.

> **Alexander Fontes:** "These are the prices agreed with the contractor. Several are considerably above what we would expect to pay. The contract was not terminated, so any decision to resume work will have to take its terms into account."

→ corvel-q

## corvel-q

1. **"How expensive are we talking about?"** `[once]` `→ contract-prices`
2. **"Would cancelling the contract solve the problem?"** `[once]` `→ contract-cancel`
3. **"Who approved these terms?"** `[once]` `→ contract-signatures`
4. **"Let's decide what to do with the file."** `→ corvel-choice`

## contract-prices

> **Alexander Fontes:** "Our preliminary comparison suggests some items may have been overpriced by a considerable margin. We need an engineering assessment to distinguish poor estimates from unjustified charges."

> "Has Planning seen this?"

> **Alexander Fontes:** "They have access to the contract. I don't know how thoroughly they've examined the old schedules."

→ corvel-q

## contract-cancel

> **Alexander Fontes:** "It might. We could also spend years disputing compensation and trying to recover the site from the existing contractor. Renata would need to advise us on the legal position."

→ corvel-q

## contract-signatures

Fontes turns several pages.

> **Alexander Fontes:** "These are the officials who signed the agreement and its subsequent amendments. Several worked under President Luz. Some are still in public life."

He leaves the page open for you to examine.

→ corvel-q

## corvel-choice

1. **"Send a copy to Renata for a legal review."** `[flag: corvel_to_salgado = true]`
   ↳ > **Alexander Fontes:** "I'll send it to her office. She may want to examine how the contract was awarded as well as its current terms."
2. **"Keep the review within the Treasury until after the budget."** `[flag: corvel_held = true]`
   ↳ He looks at the binder for a moment.
   ↳ > **Alexander Fontes:** "I'll continue checking the financial terms. If my staff find evidence that we are obliged to report, I will inform you."
3. **"Estimate what it would cost to finish the works at fair prices."** `[flag: corvel_costed = true]`
   ↳ > **Alexander Fontes:** "I'll ask Planning for an engineering estimate. We can compare that with the obligations under the existing contract."

## close

Fontes writes a short note on the cover of his summary.

> **Alexander Fontes:** "The Fund's review mission is due in the coming months. Anselm Royce will be leading the delegation. Before you see him, I'll prepare the alternatives for paying down the debt, maintaining our present arrangements or seeking additional financing."

1. **"Prepare all three. We'll decide with the budget."** `[flag: fontes_hole_known = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "Of course."
2. **"I would prefer to avoid additional borrowing."** `[flag: no_more_fund = true]` `[flag: fontes_hole_known = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "I'll give you the figures on that basis, alongside the other options."
3. **"Prioritize room for a major investment."** `[flag: projects_first = true]` `[flag: fontes_hole_known = true]` `[flag: seen_treasury_briefing = true]`
   ↳ He closes the folder.
   ↳ > **Alexander Fontes:** "I'll see what we can accommodate."

→ END
