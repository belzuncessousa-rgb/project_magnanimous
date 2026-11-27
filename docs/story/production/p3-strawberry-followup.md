---
id: p3-strawberry-followup
title: The Next Production Run
chapter: 3
turn: 1
kind: conditional
location: tekoku
portraits: [works, kaval]
background: factory-floor
---

## opening

*Show after Strawberry has returned a costed proposal or reportable operating decision from the Chapter 3 meeting. It may also return later if a foreign market-access clause takes effect and Strawberry reports an actual production or staffing decision. Show only topics whose terms or results are ready; a request, study, expression of interest or signed text without an effective date does not authorize a measure.*

Martin Works takes you to the same table where he showed you the two phones. This time the production notebook is open beside the rota. A technician has brought a list of shifts and dates. She waits while Works checks the figures against the notice from the trade office.

> **Technician:** “They asked me to check the rota before I send it out. I have the shifts they confirmed and the ones that still need an answer.”

> **Works:** “The trade office has sent its copy. If Kaval has the university terms ready, she's brought them too.”

1. **“Review the protective measure.”** `[show if: flag.strawberry_protection_terms_ready && !flag.strawberry_protection_decided]` `→ protection`
2. **“Read the university partnership terms.”** `[show if: flag.strawberry_partnership_terms_ready && !flag.strawberry_partnership_decided]` `→ partnership`
3. **“Review the trade office's finding.”** `[show if: flag.strawberry_trade_result_ready]` `→ trade-review`
4. **“What can you confirm about the next run?”** `[show if: flag.strawberry_operating_report_ready]` `→ staffing`
5. **“Finish the meeting.”** `→ END`

→ opening

## protection

*Show only when a complete, costed proposal is awaiting a government decision. Do not dispatch this choice after the measure has taken effect; the operating report can carry its confirmed date and scope.*

Works places the proposal beside the production notebook. Kaval points to the expiry date and the line naming the investment report.

> **Kaval:** “This sets a limit on how long the rate can apply. The investment condition is here, and so is the report the company has to provide.”

> **Works:** “I can plan against these dates. I need to tell the suppliers what we can count on while the measure is in force.”

- **“Adopt the costed measure on these terms.”** `[show if: flag.strawberry_protection_authority && flag.strawberry_protection_funded && !flag.strawberry_protection_decided]` The trade office issues the effective date to the firm and retailers. Do not describe a price or production change before that date.
- **“Return the conditions for revision.”** Kaval marks the cost, duration or reporting term Lara named. The revised text must be costed and approved before the firm or trade office treats it as settled.
- **“Keep the current terms of trade.”** Works closes the notebook. The current rules remain in place; the company makes its next production decision under the conditions actually in force.

→ opening

## partnership

*Show only when the university and Strawberry have returned matching, costed terms, including each partner's contribution, funding, access to results and start date.*

Kaval sets the proposed agreement next to a letter from Tekoku's university. It names the laboratory hours and the teaching time the university can provide. Strawberry's contribution is listed on the facing page.

> **Kaval:** “They've agreed on the hours. This page says who can use the results and how the work will be paid for.”

> **Works:** “The two engineers can join once their current work is covered. I can't release them before that date.”

- **“Approve the costed agreement on these terms.”** `[show if: flag.strawberry_partnership_authority && flag.strawberry_partnership_funded]` Record the agreement and the confirmed start date; do not imply that the technology hub is funded unless its separate requirements are met.
- **“Ask for a smaller or revised scope.”** Kaval marks the section Lara wants changed. The partners return with new terms; the current draft is not approved by this request.
- **“Leave the partners to decide independently.”** Kaval returns the unsigned copy to its folder. Each organization may continue work within its existing authority and resources.

→ opening

## trade-review

*Use the decision the trade office actually issued. If the review is pending, keep this topic unavailable and use the general progress encounter only when a substantive update is due. A finding does not itself change a tariff or authorize a remedy.*

Kaval lays out the trade office's notice and the entries the investigators were able to verify. The notice names the finding, its scope and any remedy the law permits. Works reads the last page before turning it back to you.

> **Kaval:** “They can establish what happened in these entries. The notice also says which response the law allows.”

- **“Issue the remedy the notice authorizes.”** `[show if: flag.strawberry_trade_remedy_available && flag.strawberry_trade_approval_available]` The trade office publishes the measure and its effective date. Other entries remain outside the finding.
- **“Publish the finding and keep the current rules.”** The press office releases the verified scope and outcome. No tariff, payment or production plan changes from publication alone.
- **“Ask for a review of the remaining entries.”** `[show if: flag.strawberry_trade_review_available]` The office records the request and gives a review date; the allegation remains unproven for the entries not examined.

→ opening

## staffing

The technician turns the rota so you can read the dates. Use one report, based on the confirmed operating result.

*If foreign market access took effect and the company has returned its decision:* Report the changed or unchanged schedule only if Works or the signed company plan confirms it. Do not attribute a change to the agreement unless the company says it did so.

`[if: flag.strawberry_operating_status == 1]` The shifts and start date match the company's signed schedule. The technician points to the names on the list. “These are the shifts the manager confirmed. I can send this version to the people listed.”

`[if: flag.strawberry_operating_status == 2]` The technician shows the remaining shifts and the contact named for reassignment. “This is the work the company has kept. The employment office has the names for anyone who needs to ask about another post.”

`[if: flag.strawberry_operating_status == 3]` You meet Works at the former staff entrance. A notice lists the office handling outstanding employment matters. “The last shift is finished. The notice has the address for anyone waiting on a payment or a work record.”

1. **“Add the confirmed operating result to the company record.”** The technician dates the copy and files it with the report. It records only the shifts, closure or reassignment contact already confirmed.
2. **“Include this report in the technology appraisal.”** `[show if: flag.tekoku_hub_study && flag.strawberry_operating_report_ready]` Kaval attaches the report to the existing study. The appraisal still needs its own participants, authority and funding before any project can proceed.
3. **“Thank you. We can finish here.”** Works closes the notebook. No new assistance, placement or production commitment is made.

→ END

⚙️ Provisional integration keys: `strawberry_protection_terms_ready`, `strawberry_protection_authority`, `strawberry_protection_funded`, `strawberry_protection_decided`, `strawberry_partnership_terms_ready`, `strawberry_partnership_authority`, `strawberry_partnership_funded`, `strawberry_partnership_decided`, `strawberry_trade_result_ready`, `strawberry_trade_remedy_available`, `strawberry_trade_approval_available`, `strawberry_trade_review_available`, `strawberry_operating_report_ready` and `strawberry_market_change_result_ready`. The operating report has a separate provisional `strawberry_operating_status`: 1 (scheduled operation confirmed), 2 (reduced operation confirmed), or 3 (closure confirmed). Use the current signed report, not a forecast, to set it. Each `*_terms_ready` flag stays true only while Lara has a complete, costed proposal to decide; clear it when she accepts, declines, or requests revision, and set it again only after a full revised offer returns. `strawberry_protection_decided` and `strawberry_partnership_decided` close their respective proposal; revision requests do not set them. Clear `strawberry_trade_result_ready` when its finding is reported and set it again only when an additional review returns a new result. `strawberry_market_change_result_ready` requires foreign access to be legally effective and Works to return the company's actual response; when set, also set `strawberry_operating_report_ready` and the confirmed `strawberry_operating_status`. Authority and funding remain separate from consent and terms. `strawberry_operating_report_ready` requires a confirmed staffing or production outcome. Existing `tekoku_hub_study` indicates only that the study was requested; it does not prove an appraisal was funded or approved. The outcome and result states from the opening Strawberry scene must remain separate from later authority, expenditure and delivery.
