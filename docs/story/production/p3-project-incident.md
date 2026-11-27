---
id: p3-project-incident
title: A Problem on Site
chapter: 3
turn: 1
location: capital
portraits: [marne, salgado]
background: planning-model-room
---

<!-- Integration gate: dispatch this report at the first eligible active-phase review after project commencement. Show an incident only when accumulated project conditions trigger it; preparation may reduce severity or avoid it. Bind the incident and every consequence to that project and phase, never the latest national selection or a pending award. Other project types use their own progress scenes. Exact trigger thresholds remain provisional. -->

## report

Marne has asked to review the latest site report with you. Salgado brings the inspection record.

> **Marne:** The site offices have sent the latest inspection and progress reports. We should read the entry that brought us together.

`[if: flag.project_incident_triggered && flag.project_incident_project_id == flag.active_project_id]` A red tab marks a safety entry. The immediate danger has been contained; the affected work is stopped pending your decision.

1. **Review the mining-road incident.** `[show if: flag.project_incident_triggered && flag.project_incident_project_id == flag.active_project_id && flag.project_incident_project_id == 1]` `→ mine`
2. **Review the railway-bridge incident.** `[show if: flag.project_incident_triggered && flag.project_incident_project_id == flag.active_project_id && flag.project_incident_project_id == 4]` `→ rail`
3. **Review the sanitation-line incident.** `[show if: flag.project_incident_triggered && flag.project_incident_project_id == flag.active_project_id && flag.project_incident_project_id == 6]` `→ sewer`
4. **Review the routine project update.** `[show if: !flag.project_incident_triggered || flag.project_incident_project_id != flag.active_project_id || !(flag.project_incident_project_id == 1 || flag.project_incident_project_id == 4 || flag.project_incident_project_id == 6)]` `→ none`

## none

Marne opens the latest progress sheet. The site has had no qualifying safety incident. The work follows its current authorized schedule; the sheet lists the next inspection date and the milestone the contractor has reported. This update adds no expenditure, delay or progress.

> **Salgado:** “I'll keep the inspection number with the file. If the status changes, it will come back through the same office.”

1. **Review the next scheduled inspection and return to the day's work.** `→ close`

## mine

> **Marne:** “Two of the road crew's machines were burned below the Tauá Hills on Saturday. Nobody was hurt. The crew has stopped work and asked for police protection.”

> **Renata Salgado:** “The marks resemble the Red Tree's earlier warnings. We haven't established who was there that night. A police presence on the road will also change what the group sees on the river.”

1. **Send federal police to protect the road crew during this phase.** `[cost: 10 FC]` `[cartels capacity -2]` `[cartels suspicion +10]` `[flag: project_progress += 1]` `[flag: road_protected = true]` `→ close`
   ↳ > **Renata Salgado:** “I'll request a unit for next week. They'll protect the crews. That does not establish who burned the machines or prevent the group from changing its response.”
2. **Pause the road while Defense, Justice and the district prepare a joint security plan.** `[flag: project_delayed = true]` `[marne loyalty -1]` `→ close`
   ↳ > **Tobias Marne:** “The forest will take back some of the access if we stop. I'll get the crews off the route and bring you the plan before we set another date.”
3. **Let the selected contractor make a local arrangement.** `[show if: flag.contractor == 1]` `[flag: project_progress += 1]` `[flag: corruption += 1]` `[cartels opinion +1]` `[flag: cartel_toll = true]` `[flag: voice += 1]` `→ close`
   ↳ > **Tobias Marne:** “I'll send the contractor your instruction. I won't ask what the arrangement costs.”
   ↳ Salgado puts the preliminary report back in her folder. “Then record that you chose this route. The investigation stays open, and neither my office nor the police has approved a payment to the people who threatened the crew.”
   ↳ The contractor resumes work under the local arrangement. Any toll remains outside the public project account; the project advances, and the recorded corruption and cartel response carry forward.

## rail

> **Tobias Marne:** “A crane collapsed at the first section's bridge on Thursday. Two workers were killed. The others have stopped work. Their union wants to know who checked the crane.”

Salgado places the contractor's statement beside the inspection report.

> **Renata Salgado:** “Our inspectors say it had not been inspected for a year. The contractor says the inspection was done. The families have been told what we know so far; the union has asked for the signed log.”

1. **Order a full investigation and keep the bridge site closed until it is finished.** `[unions opinion +2]` `[salgado loyalty +1]` `[flag: project_delayed = true]` `[flag: project_safety_investigation = true]` `[flag: path_hold += 1]` `→ close`
   ↳ > **Tobias Marne:** “The current estimate is three months lost on that bridge. I'll keep the other cleared sections on their own schedule.”
   ↳ > **Renata Salgado:** “I'll give the union the investigation number and ask the clerk for the inspection log.”
2. **Pay the families 10 FC and restart the section after new inspections.** `[cost: 10 FC]` `[unions opinion +1]` `[flag: rail_family_compensation_paid = true]` `[flag: project_progress += 1]` `→ close`
   ↳ > **Renata Salgado:** “The payment does not settle who signed the inspection record. I will keep that inquiry open. The inspector must clear the crane and work area before the crews return.”
   ↳ The union receives the compensation order and the date of the new inspection. No worker returns before clearance.
3. **Blame the selected contractor publicly and remove it from this section.** `[show if: flag.contractor == 1]` `[opp opinion -1]` `[marne loyalty -2]` `[approval +2 @ tapira]` `[flag: path_harden += 1]` `[flag: project_replacement_review = true]` `→ close`
   ↳ > **Tobias Marne:** “The contractor's people are close to the OPP. Odel will hear about this today.”
   ↳ > **Renata Salgado:** “The inspection record is disputed. If you blame them today, the union will ask what evidence you relied on. Changing the contractor doesn't settle who signed the log. I'll continue the inquiry.”

## sewer

> **Tobias Marne:** “A trench wall collapsed on the sanitation line above Vila Tamarin on Tuesday night. Nobody was in the trench. Three houses were damaged. One is two streets from your mother's.”

He opens a map.

> **Renata Salgado:** “The first inspection says this section was not supported to the approved plan. The full line still needs checking. The families need to know where they can stay while we do it.”

1. **Require the contractor to rebuild the three houses and inspect every trench on the line.** `[salgado loyalty +1]` `[approval +2 @ ibicui]` `[flag: project_delayed = true]` `[flag: project_liability_review_requested = true]` `[flag: site_audit = true]` `[flag: path_hold += 1]` `→ close`
   ↳ > **Renata Salgado:** “I'll send the inspection record and the contract clause to counsel. The contractor may contest the cost. We will not reopen a trench until it passes inspection.”
2. **Spend 10 FC to repair the houses now and continue the line after safety checks.** `[cost: 10 FC]` `[approval +3 @ ibicui]` `[flag: trench_public_rebuild = true]` `[flag: project_progress += 1]` `→ close`
   ↳ > **Tobias Marne:** “The current plan gives us time to return the families before Christmas. I'll put the date in the notice as a target, not a guarantee.”
   ↳ Salgado keeps the inspection sheet on the table. “The public repair does not decide the contractor's liability. The line still needs its safety checks.”
3. **Keep the damage out of the public statement while the houses are repaired and work continues.** `[flag: project_progress += 1]` `[flag: corruption += 1]` `[flag: trench_hushed = true]` `[flag: voice += 1]` `→ quiet`
   ↳ The public statement stays narrow, but the inspection record and the residents' notices remain with their responsible offices.

## quiet

> **Salgado:** The residents have a right to information about their homes. We can coordinate the communications, but I cannot instruct inspectors to conceal their findings.

1. **“Give residents the inspection result and the next confirmed decision date.”** `[flag: trench_residents_informed = true]` `→ close`
   ↳ Salgado gives the local officer a copy of the preliminary result and asks the clerk to add the next inspection date only after it is confirmed.
2. **“Keep the public statement limited to the repair schedule.”** `→ close`
   ↳ Salgado records the instruction. “I'll keep the official statement within those terms. I won't remove the inspection report or tell the families to withhold it.”

## close

Marne writes down the instructions.

> **Marne:** I will return with the revised cost and timetable. We can establish what this means for the rest of the project once the immediate problem has been resolved.

`[if: flag.rail_family_compensation_paid]` Marne gives you the compensation receipt and the new inspection date. The union's inquiry into the inspection log remains open.

`[if: flag.trench_public_rebuild]` The housing officer gives you the current repair schedule for the three houses. Any date changed by the inspection is marked as a revision; the office does not report the homes as complete until the residents can return.

`[if: flag.trench_hushed]` The statement for the press lists the repair and inspection schedule. The full inspection record remains with Justice, and the residents receive the information required by the notice.

1. **End the meeting.** `[flag: seen_project_incident = true]` `→ END`

### The revised notice

*Separate follow-up after the facts or the costed correction are available. The initial meeting records instructions and requests. Use the actual actions taken, the authorized funds, and the inspection outcome for this follow-up.*

Marne brings the notice the local office put up when the affected work stopped. Its lower half is blank.

> **Marne:** “They've been adding the date by hand every time they get an instruction. I'd like to send them one they can leave on the board.”

*Mine access works.* The local investigator reports the evidence gathered and which works have lawful clearance. Marne names the remaining authorization and schedule. `[if: flag.cartel_toll]` The contractor's account includes a local access payment that is not in the public project invoice. “The crew got through. The payment wasn't part of the contract.” Salgado keeps the investigation open; the toll is not treated as lawful security expenditure.

`[if: flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 2]` The evidence supports a corrective plan, but Lara has already removed the contractor from this section. The former contractor disputes the change; the replacement route stays subject to the pending contract review.

*Rail works.* The inspection report identifies the section that passed and the work still awaiting clearance. If Lara authorized assistance, the local office confirms which workers received it. If it could not pay, the office gives the reason and the next decision.

`[if: flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 1]` The contract office confirms that the documented breach permits termination. Marne places the termination notice beside an eligible replacement route and its estimate. Salgado says the inspection finding concerns the contract; it does not establish personal criminal guilt.

`[if: !flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 2]` The report identifies a corrective plan that can bring the contractor back into compliance. The inspector has not cleared the closed section; the contractor must complete the listed work first.

`[if: flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 3]` The evidence is inconclusive. The inspector names the record still needed to decide the contract question; the safety closure remains until a clearance is signed.

`[if: flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 4]` The inspection did not establish a breach under the stated contract clause. The safety closure remains until the inspector signs clearance.

*Sanitation works.* A housing officer has brought the list of residents who can return. She leaves it with the notice before speaking. “Some of the families have asked whether the repair is still on schedule.” Use the actual inspection and rebuilding status. If findings were withheld, distinguish the information residents received from the report the government did not release.

`[if: flag.project_liability_review_requested && flag.project_sewer_liability_result_ready && flag.project_sewer_liability_result == 1]` Salgado gives you the inspection result and the contractor's written response. The evidence supports a breach of the stated safety requirement; counsel has identified the contractual remedy that may be pursued. This is a finding about the work reviewed, not a finding of personal criminal guilt.

`[if: flag.project_liability_review_requested && flag.project_sewer_liability_result_ready && flag.project_sewer_liability_result == 2]` The inspector lists the records still missing. “I can't say who caused the collapse from what we have. These are the documents that could narrow it down.” No remedy or public attribution is prepared.

`[if: flag.project_liability_review_requested && flag.project_sewer_liability_result_ready && flag.project_sewer_liability_result == 3]` The inspection did not establish a breach of the listed standard. Salgado closes the executive review on this record; residents retain any separate claims available to them.

`[if: flag.trench_hushed]` The official statement remains limited to the repair schedule. The full inspection record remains with Justice, and residents receive the information required by the notice.

- **“Resume the cleared part of the work.”** `[show if: flag.project_cleared_scope_available && flag.project_cleared_scope_funded]` Marne points to the inspection order. “I'll send this part with the notice. The other work stays off the schedule until its clearance arrives.” The notice names only the cleared, funded scope; no other section resumes by implication.
- **“Authorize the verified correction on the costed terms.”** `[show if: flag.project_correction_terms_ready && flag.project_correction_funded && flag.project_correction_authority]` Fontes reads the total and funding line back to you. The engineer confirms which verified work the amount covers. Lara authorizes only that scope. Marne asks for the earliest feasible date; the opening date remains pending until the contractor and inspectors confirm it.
- **“Return with a smaller correction we can fund.”** `[show if: flag.project_correction_terms_ready && flag.project_correction_revision_feasible]` Fontes marks the part of the estimate that exceeds the available authority. Marne asks the engineer to cost a reduced scope. No correction is authorized; the affected works remain closed until Lara sees the revised terms.
- **“Proceed with the replacement award for this section.”** `[show if: flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 1 && flag.project_rail_replacement_funded]` Marne shows the eligible bid and cost. Lara authorizes only this section; the inspector must still clear the bridge before crews return.
- **“Keep the rail contractor under the corrective plan.”** `[show if: !flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 2 && flag.project_rail_corrective_plan_authority]` Marne records the required work and inspection points. No crew returns to the closed section before clearance.
- **“Keep the rail section closed and request the missing contract record.”** `[show if: flag.project_rail_review_result_ready && flag.project_rail_review_result == 3 && flag.project_rail_missing_record_available]` Salgado records the custodian and requested document. The safety closure continues; the request does not allege a breach.
- **“Correct the public account: the review did not establish the breach.”** `[show if: flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_review_result == 4]` Lara's statement names the result accurately. The contractor's removal remains a separate contract decision; the correction does not automatically restore it.
- **“Keep the contractor off this section and ask counsel to state the separate contract basis.”** `[show if: flag.project_replacement_review && flag.project_rail_review_result_ready && flag.project_rail_alternative_basis_available]` Salgado gives the basis counsel can defend and the next review date. This does not turn the unproven crane allegation into a finding.
- **“Pursue the contractual remedy the inspection supports.”** `[show if: flag.project_liability_review_requested && flag.project_sewer_liability_result_ready && flag.project_sewer_liability_result == 1 && flag.project_sewer_remedy_available]` Salgado sends counsel's notice to the contractor. The claim follows the contract process; neither compensation nor a criminal finding is recorded before its separate decision.
- **“Request the missing inspection record.”** `[show if: flag.project_liability_review_requested && flag.project_sewer_liability_result_ready && flag.project_sewer_liability_result == 2 && flag.project_sewer_missing_record_available]` Salgado names the custodian and record. The review remains open until it arrives; the request does not assign fault.
- **“Close the executive review on the record we have.”** `[show if: flag.project_liability_review_requested && flag.project_sewer_liability_result_ready]` Salgado records the basis for closing it. Any independent civil or criminal process continues under its own authority.
- **“Keep the works closed and ask the office to publish its next report.”** The local office will issue a notice when it has a confirmed inspection result. No date is promised. The remaining project can continue only where separately authorized.

Carry any independently established referral forward to the inquiry scenes. At delivery, use the phase that actually opened and the later schedule for any portion still held.

→ END

⚙️ Dispatch gate: set `project_incident_triggered` only for an accumulated, qualifying incident and bind it to `project_incident_project_id` plus the affected phase. Show the specific incident only when its ID matches `active_project_id`; an ordinary report on another phase must not inherit it. The threshold model is provisional and is not derived from selecting the project.

⚙️ Provisional integration: bind every result and choice to the incident's `project_id` and affected phase. Preserve the existing resource, project-progress, relationship and political effects on the original routes for balance review; this complication changes execution and does not fail the project. The mine's local arrangement route is available only under `contractor == 1`; its toll, corruption, cartel-opinion and project-progress effects remain separate from lawful police protection. The railway family payment and government-funded house repair are distinct direct 10 FC decisions; `rail_family_compensation_paid` and `trench_public_rebuild` record the chosen response, while repair and inspection dates still require delivery reports. `project_rail_review_result_ready` gates `project_rail_review_result`: 1 (documented breach permits a contract remedy), 2 (a verified corrective plan can restore compliance), 3 (the evidence is inconclusive and a named record remains outstanding), or 4 (the inspection does not establish breach under the stated clause). `project_rail_alternative_basis_available` requires a specific contract or lawful procurement ground independent of the crane allegation. A contractor change is not automatically reversed by the inquiry; replacement funding and award remain separate. `project_cleared_scope_available` and `project_cleared_scope_funded` come from the inspector's clearance and existing appropriation. `project_correction_terms_ready` requires a verified scope, total cost and named funding source; authority and funds remain separate gates. `project_correction_revision_feasible` requires an engineer to identify a smaller safe scope. `project_next_inspection_date_confirmed` is set only from the responsible inspector's notice. `project_sewer_liability_result_ready` gates `project_sewer_liability_result`: 1 (evidence supports the specified contractual breach), 2 (material record remains inconclusive), or 3 (the inspection does not establish breach). `project_sewer_remedy_available` and `project_sewer_missing_record_available` are independent legal and evidence gates. `trench_hushed` limits the official statement but cannot erase inspector findings or residents' notice rights.
