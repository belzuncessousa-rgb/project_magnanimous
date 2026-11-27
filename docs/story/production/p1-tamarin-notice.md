---
title: Address on the notice
when: "flag.mother_street_status is set"
background: tamarin-kitchen
characters: [lara, celia, father, amanda]
---

⚙️ Conditional family follow-up after a verified report on Celia and her neighbours' street. Proposed integration enum `mother_street_status`: 1 (technical assessment completed; no construction commitment), 2 (construction promised but not completed), 3 (construction completed; connection not yet operating), 4 (connection operating). This key and dispatch are provisional. Report only the exact address and status in the signed notice. A request for an update is not a construction promise. A funded project elsewhere does not establish this street's status.

## at-home

Celia sets a folded notice beside the sugar bowl. Your father has placed a ruler across the map to keep it open. Amanda leans over the table, reading the street name upside down.

> **Celia Vento:** "This is ours, isn't it?"

Your father checks the address against the notice.

> **Father:** "Same street. Let's see what they've actually written."

1. **Read the notice together.**
   ↳ → report
2. **Ask Celia what the neighbours have heard.**
   ↳ > **Celia Vento:** "Only what I told them: that you asked for an update. I haven't said the street is approved."
   ↳ → report
3. **Tell them what you know before looking at the notice.** `[once]`
   ↳ `[if: flag.mother_street_status == 1]` > **Lara:** "Planning finished the assessment. It says how they could connect this end of the street, but it does not authorize the work."
   ↳ `[if: flag.mother_street_status == 2]` > **Lara:** "I promised the connection. I do not have a date for the work yet."
   ↳ `[if: flag.mother_street_status == 3]` > **Lara:** "The work is complete, but the service has not opened. I will not tell you that you can use it yet."
   ↳ `[if: flag.mother_street_status == 4]` > **Lara:** "The connection is operating. Could you check whether the households up this end can use it?"
   ↳ → report

## report

`[if: flag.mother_street_status == 1]` The notice records a technical assessment. It describes the route and the households that could be served. It gives no construction authorization or start date.

`[if: flag.mother_street_status == 2]` The notice records an approved construction commitment for this street. It gives the responsible office and next review date, but the works have not been completed.

`[if: flag.mother_street_status == 3]` The notice says the works on this street are complete. The inspection is signed; the service has not yet been opened to households.

`[if: flag.mother_street_status == 4]` The notice confirms that the connection is operating. It lists the date service began and the contact for households whose connection still needs checking.

Celia reads the page once more before passing it to your father.

`[if: flag.mother_street_status == 1]` > **Celia Vento:** "Then we know what can be done. We still don't know whether anyone will pay for it."

`[if: flag.mother_street_status == 2]` > **Celia Vento:** "I'll tell the neighbours there is a commitment. I'll also tell them the work isn't done yet."

`[if: flag.mother_street_status == 3]` > **Celia Vento:** "So the pipes are there, but we can't use them. Who is responsible for opening it?"

`[if: flag.mother_street_status == 4]` > **Celia Vento:** "I'll check with the households at our end before I tell everyone it is working for them."

`[if: flag.celia_savings == 2]` Celia glances at the envelope she set aside for Marco's kitchen. She does not take it back or ask for it; that decision was hers to make.

1. **Ask Planning to explain the next step and report back.** `[flag: mother_street_followup = 1]`
   ↳ > **Father:** "A date and a name. That's what people need if we're asking them to wait."
   ↳ `[if: flag.mother_street_status == 1]` The assessment remains a report, not a promise to build.
   ↳ `[if: flag.mother_street_status == 2]` The construction commitment remains in place; you request a schedule rather than announce one.
   ↳ `[if: flag.mother_street_status == 3]` You request the inspection and opening schedule before calling the service available.
   ↳ `[if: flag.mother_street_status == 4]` You request the household contact list so unresolved connections can be checked.
   ↳ → END
2. **Ask for a costed proposal before making any further commitment.** `[flag: mother_street_followup = 2]`
   ↳ > **Celia Vento:** "That's fair. Just make sure the estimate doesn't disappear into another office."
   ↳ The request creates no funding authorization and does not change the status in the notice.
   ↳ → END
3. **Leave the next step with the neighbourhood association.** `[flag: mother_street_followup = 3]`
   ↳ > **Celia Vento:** "We'll decide what to tell the neighbours. I don't want anyone collecting money on the strength of a sentence they heard second-hand."
   ↳ → END
