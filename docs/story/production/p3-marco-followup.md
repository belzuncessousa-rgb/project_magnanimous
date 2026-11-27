---
id: p3-marco-followup
title: The Notice on the Board
chapter: 3
turn: conditional
location: capital
portraits: [marco, municipal-clerk]
background: municipal-office
---

<!-- Conditional service report after an authorized local measure reaches its first independently verified operating milestone or its confirmed start date passes without delivery. This is separate from the funding decision in What the centre can offer. -->

## report

*Show once for a specific approved housing, transport, or food measure when its first operating milestone is confirmed, or when its confirmed start date passes without delivery. Branch by the approved measure and the office that administers it. Do not count an authorization, purchase order, application notice, or proposed date as service. If no measure was approved or a new date is still pending, keep the topic in the next planning review rather than dispatching this report.*

The municipal clerk has set the current notice beside the approved scope. Marco waits while she checks the date against the responsible office's copy.

> **Clerk:** “This is what they confirmed for the first stage. The other locations are on a separate sheet.”

> **Marco:** “People ask me when it starts. I'd rather point to the paper than tell them what I think it means.”

### First operating milestone confirmed

*Use only when the responsible office confirms that the measure is operating. Render only the branch matching `marco_aid_measure_id`; name the delivered scope and any places still waiting.*

*Food distribution.* Marco checks the delivery receipt against the kitchen's opening notice. “The first supplies came this morning. These are the kitchens they reached. The other sites are still waiting on their own notice.”

*Transport assistance.* The transport clerk points to the route and the first date fares were covered. “The support applies on this route from this date. The other routes are still on the existing fare.” Name only confirmed routes and assistance actually in effect.

*Housing assistance.* The municipal clerk points to the staffed application desk and its opening date. “We can receive applications from this date. The register shows which cases have been processed; it doesn't mean anyone has been housed yet.” Report placements only from confirmed housing records.

- **“Publish the confirmed scope and date.”** The clerk prepares the notice with the covered places, service and start date. She leaves out any district that has not begun receiving the measure.
- **“Ask the office to check the places still waiting.”** The clerk records the locations and requests a confirmed status. No additional service or funding is authorized.
- **“Keep this as an operating record for now.”** The clerk files the notice. The measure continues under its existing authorization; no new public promise is made.

### Confirmed start date passed without operation

*Use only when an approved date passed and the responsible office confirms the measure did not begin. Identify the responsible office for the approved measure. State the recorded reason if one exists; otherwise say the reason is not confirmed.*

The clerk turns the notice over. There is no receipt or opening record attached.

> **Clerk:** “The date passed. I don't have confirmation that it began.”

> **Marco:** “Then please don't tell the people here that it has started.”

- **“Ask the responsible office for the delay and its next confirmed date.”** The clerk requests a written account and a new date only if the office can support one. The existing service continues where it remains available; no replacement is presumed.
- **“Keep the notice marked as delayed until the office reports back.”** The clerk changes the status on the board and leaves current services unchanged. The delay is recorded without inventing its cause.
- **“Review the measure's scope before setting another date.”** The clerk returns the cost and delivery plan for review. Lara must make any revised funding decision in a later encounter.

⚙️ Provisional integration: dispatch by `marco_aid_measure_id` (food, transport, or housing) and first milestone. `marco_aid_first_milestone_status` is provisional: 1 (first operating milestone confirmed), 2 (approved date passed without operation). Keep approved scope, responsible office, current service, application intake, actual placement or payment, report status and any later revised date as separate state. Do not redispatch this first-milestone report for the same scope; a materially revised and newly authorized measure may create a new milestone.

→ END
