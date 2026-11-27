# The government's accounts

## What we can give a date for

*Turn 3.3. Livia leads. Use the strongest documented point of tension between a public commitment and the work the departments can actually deliver. If Lara made no relevant commitment, use the most consequential pending decision. This meeting does not depend on Lara opening Amanda's folder in A Quiet Evening.*

Livia has placed the cabinet papers at each seat. At yours there is also a copy of a letter sent by a regional office. Someone has drawn a line under the words *awaiting further instructions*.

> **Livia:** “That is the answer they gave last month. This week they've been asked for a date.”

> **Lara:** “Have we given them one before?”

*If a relevant date was promised:*

> **Livia:** “Yes. It's on the second page. I'd like us to agree what they can say when someone brings in the original letter.”

*If there was a commitment without a date:*

> **Livia:** “We said we'd do it. The department hasn't given the regional offices a timetable.”

*If there was no relevant commitment:*

> **Livia:** “No. They can give an answer on the applications they already have. For the rest, they need a decision from us.”

*Use one report available from the actual record.*

- **Delayed public works.** Marne turns over his copy of the contractor's schedule. “The local office was waiting for this revision. They can give people the date for the work already funded. If they give a date for the extension, the contractor will assume we've approved it.”
- **Pressure on services.** Dara puts his pen down. “I've asked the districts which appointments they're moving. A few can keep taking registrations. I can give those offices a clear answer today.”
- **Integrity commitment.** Renata checks the letter before passing it to Livia. “We have acknowledged the referrals. I can give the public the figures on what has been received and where it has gone. The cases themselves are for the offices dealing with them.”
- **Work delivered.** Livia hands you the most recent report. “The office has confirmed that it is operating. They still get calls from people who were sent the opening notice with last month's hours.”

### Give the current position publicly

> **Lara:** “Use the figures we've confirmed. Tell people which dates we can stand behind and what is still waiting for a decision.”

Livia makes a note in the margin of the letter.

> **Livia:** “I'll have the office send the same answer to everyone who received this one.”

Record publication only when issued. Preserve the underlying commitment and its actual status.

### Put the authorized work first

> **Lara:** “Give me a timetable for the work we've already approved. Bring the rest to the budget review.”

Livia passes the letter back to the minister responsible.

> **Livia:** “Can your office send the dates by tomorrow? I'd like the regional staff to have them before we meet again.”

Record the request for a timetable. Use only confirmed dates in later public responses.

### Bring forward one pending decision

*Offer only decisions that are both unresolved and supported by a complete record. Show each eligible item by its actual subject. Do not display this section if none qualifies; the current-position choices above remain available.*

> **Livia:** “We can move one decision up. Which item should come first? If it needs expenditure, Alexander will need the estimate before the meeting.”

- **“Bring the costed public-works extension to the next budget review.”** `[show if: the extension has a complete estimate and an available lawful funding route, and Lara has not decided it]` Marne supplies the proposed scope and funding route. Livia adds it to the first available review; Lara has not authorized the extension.
- **“Bring the district service-capacity plan to the next cabinet review.”** `[show if: a complete district service plan is awaiting Lara's decision]` Dara names the affected offices and confirmed staffing or appointment scope. Livia adds the decision to the next review; any appropriation remains separate.
- **“Schedule a decision on publishing the cleared referral totals.”** `[show if: Renata has a cleared aggregate report awaiting Lara's publication decision]` Renata confirms that no protected case detail is included. Livia records the publication question for the first available review; no totals are published now, and the agenda does not direct an investigator or decide a case.
- **“Bring the operating-service notice correction to the next review.”** `[show if: a confirmed operating service has an unresolved notice correction requiring Lara's direction]` Livia identifies the published hours and the correction confirmed by the office. She adds the instruction to the next review; the existing notice stays in force until then and no service is expanded.
- **“Leave the current order in place.”** The current agenda remains unchanged. Livia records no acceleration and no new expenditure.

## The festival estimate

*Conditional follow-up after the Mognagna festival scene, only if Lara asked for a costed proposal. Use the scope she selected: a permanent rehearsal space and music school, or a grant for a later festival. A request for a proposal is not approval or a promise to fund it.*

Livia brings the proposal to the cabinet room with the Culture and Festivals officer. The cover sheet has the organizer's name and a box for the ministry's recommendation. The officer places the estimate beside the existing culture budget.

> **Culture officer:** "They've priced the request you asked us to examine and named the people responsible for it. The estimate separates the first cost from anything that will need funding again later."

Livia checks the date beside the amount.

> **Livia:** "The space would need staff and an operating budget after it opened. The festival grant covers one edition. Either way, they can't treat an approval today as an annual commitment."

Fontes checks the available balance and the authorizing line. If the proposal is unaffordable or requires a new appropriation, he says which approval or funding source is missing before Lara chooses. An unsupported amount is not presented as available money.

- **“Approve the rehearsal space and music school on the terms shown.”** `[show if: flag.festival_investment_intent == 2]` Show only when the full cost, lawful authority and required funds are available. Read the total, site, scope and operating plan back to Lara before confirmation. This authorizes only the listed work and maintenance plan; it does not open an additional regional education service.
- **“Approve the grant for the listed festival edition.”** `[show if: flag.festival_investment_intent == 1]` Show only when the full cost, lawful authority and required funds are available. Read the amount, event date and eligible expenses back to Lara before confirmation. This grant covers only the listed edition and does not guarantee future annual funding.
- **“Ask them to reduce or revise the proposal.”** The officer marks the cost or responsibility Lara wants reconsidered. No funds are committed. The organizers can accept, revise, or withdraw the proposal; return to this decision only when the revised terms are complete.
- **“Defer the decision to the next budget review.”** Livia dates the request and tells the organizers no allocation has been made. The proposal remains eligible only while its cost and permissions remain current.
- **“Decline the proposal.”** The officer returns the unsigned cover sheet. No construction or grant follows from the festival speech or the visit.

⚙️ The old prototype charged 10 FC for either cultural option, while the staged budget model does not yet define the Culture Fund's appropriation, continuing obligations, or interaction with a costed proposal. Do not hard-code that amount or apply regional, approval, loyalty, or `cultural_power` effects until the resource schedule and effect rules are integrated. Proposed integration keys are `festival_estimate_status` (complete, revision requested, deferred, or declined), `mognagna_culture_award` (0 none, 1 one-edition grant, 2 permanent space), and `mognagna_culture_operational` (false until the funded activity actually begins). These are provisional and not present in the live game. The player-facing choice and its funding limit are explicit.

## The revised estimate

*Turn 4.1. Fontes presents actual receipts, existing obligations and remaining decisions. Reveal the direction and material implications before the player chooses. Conditional instructions here govern the selection of player-facing lines.*

Fontes is holding the expenditure summary upright while an assistant takes the other copies around the table. He sets it flat when she reaches your chair.

> **Fontes:** “The left column is what we expected. The right is what's come in. I've left the receipts that haven't cleared off both.”

*Shortfall.*

> **Fontes:** “The last page is the new work we're still considering. I've put the existing obligations ahead of it so you can see what comes due first.”

*If current authority cannot meet those obligations, he turns back a page.*

> **Fontes:** “These payments would fall due before we can cover them. We can ask the other parties to agree to new dates. For some of them we'll need to take the numbers back to Congress.”

*Surplus.*

> **Fontes:** “There's room after the existing obligations. The reserve we agreed is already shown. We can decide whether to use what is left.”

*Broadly on forecast.*

> **Fontes:** “The total is close. The difference is in which receipts have come in first. The spending dates matter more than the annual total at the moment.”

> **Lara:** “Which decisions are ours today?”

> **Fontes:** “The items that haven't been committed. Livia has set aside the ones that need a vote. We can tell those offices when we intend to bring them back.”

- **“Protect the existing schedule.”** Fontes turns to the reserve page. “Then I'll ask the departments which new starts they can move. If anything on the existing schedule needs authority we don't have, I'll bring it back to you.” Apply only lawful scheduling changes. Where the reserve cannot cover the schedule, show the residual gap before confirmation.
- **“Move available money to the pending priority.”** Show eligible source and recipient. Livia circles both lines. “I'll tell the office losing the allocation before this is published. If the transfer needs a vote, they'll get the same figures as the deputies.” Do not spend funds until the transfer is authorized.
- **“Keep the available balance in reserve.”** Show if a balance is available. Fontes asks his assistant for the ledger. “Put the balance against the autumn estimate. If that changes, I'd like to see it before we agree another start date.”

*At follow-up, the affected department reports the authorized schedule. If Lara changed a line covered by an earlier bargain, use the actual counterparty's response before assigning renewed support.*

## The payment date

*Turn 5.1. Requires the debt ledger and actual loan terms. A debt payment coming due and an overdue project commitment are separate facts.*

Fontes has brought the last payment notice and a copy of the bank confirmation. He moves the confirmation aside and shows you the date on the new notice.

> **Fontes:** “This is the next payment. I've asked the bank to confirm when they need the instruction. The date on the notice is when they need the money.”

*If a review condition is outstanding:*

> **Fontes:** “They've also asked for the material due under the agreement. I can send what we've completed. If we ask for more time, they'll want to know what remains.”

*If a project or programme has an overdue commitment:*

> **Fontes:** “The department called about its payment this morning. We should answer them separately. Their contract has a date of its own.”

- **“Make the scheduled payment.”** Available if funded. Fontes checks the payment instruction with the treasury officer. “I'll have the confirmation sent back to us before the office closes.” Pay from authorized funds.
- **“Ask for revised terms.”** Available when negotiations are possible. “I'll send the schedule we're able to meet. Until they answer, the current schedule is the one the bank will use.” Counteroffer may be accepted or declined. Update the ledger only on an effective agreement.
- **“Use the available surplus to reduce principal.”** Available only where permitted and funded. Fontes shows the balance after payment. “Have a look at what that leaves for the next quarter. If you confirm it, I'll ask the bank to put the reduction in writing.”
- **“Bring a funding correction to Congress.”** Livia takes the department list. “I'll tell the bench what the correction pays for. They'll want to know which expenditure moves if it passes.” If the vote fails and an obligation falls overdue, show the lender's actual response and any verified budget consequence.

*If no timely payment or agreement is available, show the impending arrears before closing.*

> **Fontes:** “I'll inform the bank today. When they reply, I'll bring you the notice. The departments need the updated balance before they place any new orders.”

## The review date

*When an effective Fund agreement reaches a scheduled review. Use the actual condition and available remedies. A later draw and a payment already due are separate.*

Fontes puts the Fund's letter beside the government's submission. He turns back to the appendix to check the date.

> **Fontes:** “They've acknowledged the papers. On this condition, they've asked for a decision from us before they complete the review.”

*If the Fund accepted the evidence, use instead:* “They've accepted the report. This is the date of the next draw.” Fontes asks which departments need an updated schedule. Record the receipt only when it arrives.

*If the requirement is outstanding, show the agreed condition and what remains.*

- **“Complete the work on the agreed terms.”** Show when the responsible office can comply. Fontes calls the minister and asks for the earliest confirmed date. “I'll send that back with the material. They can issue a decision when they've reviewed it.”
- **“Ask for more time.”** Fontes sets the letter beside the submission. “I'll tell them what we've sent and when we can send the rest. They'll tell us whether they can release the draw in the meantime.” Change the terms only on effective agreement.
- **“Plan for the money to be held.”** Fontes opens the spending schedule. “These orders were going to use that draw. Which ones should I bring back with another source of funds?” Show the actual work at risk and the feasible alternatives. Payments on existing debt remain due. Previously funded work continues within its authority.

## The bank's answer

*Conditional follow-up when the bank answers Lara's request to revise a commercial loan schedule, or sends a notice after an actual payment falls overdue. Keep the two outcomes distinct. A request, a missed vote or an approaching due date is not itself a default notice. Use only the written terms and remedies the bank confirmed.*

Fontes lays the bank's letter beside the current ledger. He puts the old payment schedule on top until you have read the reply.

*A revised schedule is offered.*

> **Fontes:** “They've offered to lower this payment if we move the difference to the end of the schedule. The total cost rises by the amount on this page. The current dates stay in force unless we both sign.”

Show the actual payment dates, total repayment and any fee. If the bank offered a different arrangement, describe its confirmed terms instead. Do not invent a concession or imply that the government has accepted it.

- **“Accept the written schedule.”** Show only if authorized and affordable under the revised cash flow. Lara confirms the exact dates and total cost. Fontes sends the signature; the ledger changes only when the bank confirms the effective date.
- **“Ask them to change a named term.”** Fontes marks the payment or fee Lara identifies. “I'll send that back. Their offer remains open only until the date in the letter.” No change takes effect while the bank considers it; return when a complete answer arrives.
- **“Keep the current schedule.”** Fontes files the offer without signing. The original dates and obligations remain. He shows the next amount due and asks the departments to plan against it.

*The bank declined the request.* Fontes shows Lara the reply and the unchanged payment schedule. “They won't revise these dates. The next amount is still due on the original date.”

- **“Make the scheduled payment.”** Show only if it is funded and remains due. Treasury sends the instruction; record the payment only when the bank confirms receipt.
- **“Ask counsel to review the written terms.”** Counsel identifies any available response and its deadline. Review does not suspend or alter the schedule.
- **“Keep the existing schedule and bring me the next confirmed balance.”** Fontes returns the letter to the file. No new agreement or payment is recorded.

*An overdue payment notice arrived.* The letter states the amount, the period overdue and the bank's next confirmed action. Fontes checks each line against the treasury receipt before he turns it around.

> **Fontes:** “This is the notice they sent after the payment did not arrive. It gives us until this date to answer. The next step is the one in their letter; I won't add a penalty they haven't stated.”

- **“Pay the overdue amount.”** Show only if lawful funds are available and the bank confirms they will accept payment on these terms. Fontes asks Treasury to send the receipt and bank confirmation. The arrears clear only when payment is acknowledged.
- **“Ask for a written cure schedule.”** Fontes prepares the dates and sources Lara can actually meet. Existing terms remain until the bank accepts a replacement in writing.
- **“Refer the notice to counsel and protect essential orders.”** Counsel identifies the response deadline. Fontes lists the orders at risk; Lara may protect only spending she has authority to prioritize. A referral does not suspend the bank's stated deadline.

⚙️ Provisional integration: `bank_response_ready` dispatches this scene only when a written response exists. `bank_response_type` distinguishes a revised schedule from an overdue notice. `bank_terms_effective` changes the ledger only after both authorized signatures and the confirmed effective date; `bank_arrears_cleared` requires a bank receipt. These states and the commercial-loan response rules are not live. Never infer an overdraft fee, acceleration, default, or seizure without an explicit term in the bank's notice.

## What Defense brought back

*After the ministry has a report on Lara's Guard instruction or a costed response to the Ibira request. Voss attends if he still holds office. Use the current authorized official otherwise. A change proposed in the courtyard becomes a change in service only when carried out.*

At the ministry, an aide has moved the afternoon appointments down the page to give you time to read the estimate. The official opposite you waits while the aide leaves.

*Ceremonial spending reduced.* He shows you the orders cancelled and the services still funded. “This is what we stopped buying. The training and staffing schedules are on the next page.” Show the retained schedule only if those duties actually stayed with the Guard.

*Guard retained as constituted.* He opens the annual estimate. “We've budgeted for the ceremonies on this list. If we add another, I'd like the departments to agree who pays for it.”

*Transfer to police ordered.* He puts the papers from both offices together. “Each office has sent the date it can confirm. We need to use the same one before we notify the staff.” If the transfer has legally taken effect, replace this with the effective date and the office responsible. The paperwork does not generate an attack or award an extra protection bonus.

Where savings were projected, show only those realized in the accounts. They become available to spend only under actual budget authority.

### The request from Ibira

*Use when the request or wider assessment is ready. If Lara asked for joint work with Justice or Intelligence, attribute only the material those offices actually supplied.*

The official sets a repair bill next to the replacement estimate.

> **Official:** “The district sent both. They'd like an answer before they book the next repair.”

- **“Bring the replacement request into the funded budget.”** Show only an available appropriation or an eligible amendment. The official marks the estimate. “I'll tell the district which part they can proceed on after the authorization arrives.”
- **“Keep the equipment operating while we review the wider needs.”** Show only where maintenance is funded and the equipment can still be used safely. The official keeps the repair bill on top and asks the district for its revised service schedule.
- **“Tell them what the present budget can cover.”** The official checks the two papers. “I'll send them a decision on the repair and tell them whether the replacement is still under consideration.” Use the actual decision. A request deferred here remains separate from the outcomes of the Ibira security cases.


## The joint relief proposal

*Conditional follow-up to The Dry Season after the state and ministries return a complete estimate. Play for any of Lara's four response choices, including a request to defer until the figures are known. A pending request does not authorize spending. Show the actual cost, proposed source of funds, affected districts, and any part the current authority cannot fund.*

The proposal is open on the cabinet table. Porper has marked the towns whose requests are complete. Dara has separated water delivery, temporary food support and household assistance. A Defense officer has added transport only where the regional authorities identified a route civilian vehicles cannot serve.

> **Porper:** "This is the joint estimate. The state contribution is listed separately from the federal request. We can reduce the districts covered if the government cannot fund the whole plan."

> **Dara:** "The records support the requests on these pages. They do not tell us how long the dry conditions will last. We should review the programme when the next assessment is ready."

*If Lara chose the joint civilian programme:* Porper points to the full estimate. “This covers the water, food and seed requests from the listed towns. The state share is confirmed; the federal share still needs your authorization.”

*If Lara chose military transport:* The Defense officer points to the named routes. “These are the deliveries that need our vehicles. The regional office will set the recipients and confirm each handover.” Military support does not expand eligibility or authorize use of force.

*If Lara chose to begin with state resources:* Porper indicates the remaining state balance. “We can begin with this amount. The smaller programme would cover the districts marked in blue. The others would remain on the request list.”

*If Lara asked to see the proposal before choosing a scope:* Dara turns the pages so the water, food, seed and transport estimates can be considered separately. “You can decide now which parts to bring forward. The current state and municipal deliveries will continue only under the authority they already have.”

- **“Approve the full joint civilian programme.”** `[show if: flag.famine_relief == 1 || flag.famine_relief_pending]` Show only if the full amount is within available, authorized funds. Read total cost, funding source, districts and review date back before confirmation. Record authorization; delivery is recorded only from later receipts.
- **“Approve the programme with military transport on the listed routes.”** `[show if: flag.famine_relief == 2 || flag.famine_relief_pending]` Show only if the scope and transport costs are funded and lawful. Civilian authorities retain recipient selection and receipt records.
- **“Use state funds for the listed first stage and review federal support later.”** `[show if: flag.famine_relief == 3 || flag.famine_relief_pending]` Show only if the state has confirmed those funds and authority. This authorizes only the named first stage; schedule a review against a dated regional assessment.
- **“Approve the reduced civilian programme shown here.”** `[show if: flag.famine_relief == 1 || flag.famine_relief == 2 || flag.famine_relief_pending]` Show only if that scope is fully funded and lawful. The unfunded districts remain unserved by this authorization; they are not silently covered.
- **“Ask them to revise the scope or funding split.”** Porper marks Lara's requested change. No appropriation or distribution is authorized. Return only when the revised proposal is complete.
- **“Defer the decision.”** Livia dates the next review. Existing state deliveries continue only under their current authority. The federal programme has not been approved.
- **“Decline the proposal.”** The ministers return the unsigned estimate. The record must still show what current state or municipal assistance continues; do not imply that it was stopped by this decision.

⚙️ Provisional integration: `famine_relief_proposal_requested` dispatches this encounter; `famine_relief` records the preferred scope (1 joint federal relief, 2 relief with military logistics, 3 state-first staged response); `famine_relief_pending` records that Lara asked to wait for costs. `relief_authorized_scope`, `relief_funding_source`, `relief_review_date` and receipt records are proposed integration keys, not live mechanics. `famine_pressure` is a risk marker, not a guaranteed famine outcome. Exact appropriations, district eligibility, delivery evidence and downstream effects require economic-system design. Do not deduct a cost until authority and funding are confirmed.


## The specialist appointment

*Conditional follow-up after Dara or the hospital confirms what happened to Lara's request for earlier specialist access. Play before the next routine family callback if a result is available. A request does not reorder the queue unless the hospital confirms the change. The clinical team retains responsibility for medical need and the safe plan.*

Dara comes to the residence with a note from the hospital's appointments office. He sets it beside the dates for the next cabinet meetings.

> **Dara:** "I have the answer from the clinic. They have separated the clinical review from the order of appointments so we can see what happened."

*If the specialist had an ordinary cancellation or an appointment available through the normal process:* The clinic confirms the date and says no other patient was moved. Dara: "They could offer her this slot. It didn't depend on your request."

*If Lara's instruction moved another patient:* The clinic confirms Celia's earlier slot and identifies the appointment that was moved, without disclosing that patient's private medical details. Dara: "Your instruction changed the order. The other patient has a later date. The hospital wants to know whether that remains your direction."

*If the clinic could not expedite the appointment:* The clinic confirms the reason and the next available date. Dara: "They couldn't move her earlier without delaying someone with a more urgent need. Her existing follow-up remains in place."

- **"Keep the earlier appointment."** `[show if: flag.celia_specialist_priority_status == 2]` `[flag: celia_priority_decision = 1]` Lara confirms the instruction after seeing the effect. The hospital records the decision and the displaced patient's new date. Do not claim a change to Celia's health or a diagnosis.
- **"Return her to the ordinary clinical order."** `[show if: flag.celia_specialist_priority_status == 2]` `[flag: celia_priority_decision = 2]` The hospital reviews Celia's needs and offers the earliest slot consistent with its clinical process. Record the actual appointment; do not guarantee the previous patient regains a particular date.
- **"Ask for an independent review of how the appointment was changed."** `[show if: flag.celia_specialist_priority_status == 2]` `[flag: celia_priority_decision = 3]` Renata receives only the administrative record. The review can confirm, correct, or leave the finding unresolved; it does not replace clinical judgment.
- **"Thank the clinic for checking and keep the date they offered."** `[show if: flag.celia_specialist_priority_status == 1 || flag.celia_specialist_priority_status == 3]` The appointment remains on the hospital's confirmed schedule.

⚙️ Provisional integration: `celia_specialist_priority_status` is 0 (no request), 1 (earlier date through ordinary availability), 2 (request caused an actual queue displacement), or 3 (no safe or feasible earlier appointment). The hospital result is a separate fact; the instruction alone cannot set status 2. The exact effect on Celia's case, the displaced patient, any inquiry, and public disclosure must follow recorded hospital decisions. `celia_priority_decision` records Lara's follow-up choice (1 keep, 2 return to ordinary clinical order, 3 independent administrative review) and does not change the medical record. These states are not live.
