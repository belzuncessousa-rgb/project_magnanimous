# The First Great Project

*Chapter 1.3 · Blue Room · GP1. Available after all three core presentations in Three Projects (`seen_planning_briefing`). Play once. The selection sends one appraisal to the working budget.*

Livia has left the three summaries open at your place. Marne sets a folded map beside them and moves it a little so Fontes can see.

> **Livia:** “Which one should Planning take forward for the first budget?”

> **Marne:** “At Tauá we'd have to establish where we could survey and what it would cost to bring in power and transport. With the railway, we can start by costing the freight connection at the existing junction in Tapira. The sanitation engineers could tell us what remains to be done once they've inspected the old works.”

> **Fontes:** “And I'd like Justice's reading of the Corvel agreement before I put a figure against the remaining work.”

> **Mertens:** “If we pick the railway, I'll have deputies asking me about stations by tomorrow.”

Marne takes his hand off the map.

> **Marne:** “You can tell them we're looking at the junction. We'll need to hear from the towns before we can tell anyone where the trains will stop.”

*If Lara promised Celia a Planning update and actually asked Livia to follow up:*

> **Livia:** “I'll keep the follow-up for your parents' street on my list. We still need to check which addresses the works would cover.”

## Choose a priority

1. **“Appraise the rare-earth development at Tauá.”** → Mine
2. **“Appraise the first freight section in Tapira.”** → Railway
3. **“Appraise completion of the housing and sanitation works.”** → Sanitation

### Mine

> **Marne:** “I'll use the geological survey to sketch the area we'd need to examine. I'll bring you the proposed survey boundaries and the costs of getting to the site before the working budget review.”

He passes Fontes the preliminary estimate.

> **Fontes:** “I'll put survey and access costs in as estimates. Tell me if anyone produces an agreement with a payment date.”

→ Close

### Railway

Marne unfolds only the part of the map nearest you.

> **Marne:** “We'll compare the approaches to this junction, including how the smaller producers would reach it. I'll bring you a cost range for the first freight section and the earliest payment we'd need to allow for if we went ahead. I'll have both for the working budget review.”

He slides his estimate across the table. Fontes takes it out from under the map.

> **Fontes:** “I can put this range in the capital forecast now. There's no railway payment due at this stage. Bring me the proposed first payment and when it would fall, and I'll show you what the budget could carry.”

→ Close

### Sanitation

Marne opens the schedule at the list of unfinished connections.

> **Marne:** “I'll bring the inspection scope and the cost to finish the first group of connections to the working budget review. We'll check the addresses against the agreement.”

He gives Fontes the works estimate and the contract summary.

> **Fontes:** “I'll check which payments, if any, the existing contract already requires. The estimate for finishing the works gets its own line.”

→ Close

### Close

> **Mertens:** “I can start sounding out the deputies.”

> **Fontes:** “Let me know what they're willing to vote for. I'll keep the project figures with the capital papers.”

Livia writes down the date of the review and reads it back to Marne.

**Review the selection and leave.** Set `seen_great_project` and `chapter1_complete`.

## Branch cards

| Choice | Scope and knowledge | Receipt and fallback |
| --- | --- | --- |
| Mine | Set `great_project = 1` and `project_rare_earths`. Tauá survey boundaries and access appraisal. Planning knows the deposit and preliminary needs. Access, partners and terms remain open. | Fontes gets the preliminary survey and access estimate. Bring proposed boundaries and costs to the review. If access remains unresolved, limit preparation to desk work and carry the access question forward. |
| Railway | Set `great_project = 4` and `project_railway`. First freight section at the existing Tapira junction, subject to appraisal and authority. Both traces have the same alternatives, including local access. Alignment and terms remain open. | Fontes gets the provisional capital range. The review needs the first payment estimate and timing. Current payment due is zero. If authority, funding or access is unresolved, retain the conditional appraisal and hold any award. |
| Sanitation | Set `great_project = 6` and `project_sanitation`. Appraise the first group of unfinished connections. Corvel obligations and address coverage require verification. | Fontes gets the completion estimate and contract summary. Carry verified inherited liabilities once. Pending verification, keep the exposure unresolved and refer the contract for review before any new work order. |

The receipt goes to Fontes's working capital forecast. Congressional support and available funds are tracked separately. GP1 records selection only. Award, funding, site consent, approved scope, usable phase and opening date await their own evidence. Port terms are unnecessary for this appraisal and may be unknown. Use only the scoped Planning request for the callback. A promise to ask is private until Lara passes it on.
