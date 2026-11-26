---
id: p3-project-incident
title: A Problem on Site
chapter: 3
turn: 1
location: capital
portraits: [marne, salgado]
background: planning-model-room
---

<!-- Integration gate: trigger an incident only if the relevant project is active and its condition warrants it. Preparation can reduce severity or avoid the incident entirely. Do not guarantee that all three projects experience a setback. -->

## report

Marne has requested an urgent meeting. Salgado joins him with a copy of the preliminary report.

> **Marne:** We have a situation at one of our project sites. The immediate danger has been contained, but we need to decide how to proceed.

1. **Read the report.** `[show if: flag.great_project == 1]` `→ mine`
2. **Read the report.** `[show if: flag.great_project == 4]` `→ rail`
3. **Read the report.** `[show if: flag.great_project == 6]` `→ sewer`

## mine

> **Marne:** Equipment has been damaged at the access-road works. The crews have stopped work pending a security assessment.

> **Salgado:** Local investigators are examining indications of intimidation. We should not make a public attribution before they have established who is responsible.

1. **Authorize additional lawful protection and request a revised schedule.** `[flag: road_protected = true]` `→ close`
2. **Suspend the affected works until security can be reassessed.** `[flag: project_delayed = true]` `→ close`
3. **Instruct the contractor to resolve the disruption through its local contacts.** `[flag: project_local_contacts_intent = true]` `→ contacts`

## contacts

Salgado looks directly at you.

> **Salgado:** If that means allowing a criminal organization to dictate the terms of a public project, I will not authorize it. I can give you lawful alternatives.

1. **"Very well. Bring me those alternatives."** `→ close`
2. **"I expect Planning to find a solution without involving your ministry."** `[flag: project_bypass_justice_intent = true]` `→ close`

## rail

> **Marne:** There has been an accident at one of the bridge works. The affected section is closed while inspectors assess what happened.

Salgado places the contractor's statement beside the inspection report.

> **Salgado:** They do not yet agree on the cause. We have a responsibility to establish whether the safety requirements were followed.

1. **Keep the affected site closed for an independent investigation.** `[flag: project_delayed = true]` `[flag: project_safety_investigation = true]` `→ close`
2. **Prioritize assistance to affected workers and require a safety clearance before restarting.** `[flag: project_worker_assistance_intent = true]` `→ close`
3. **Prepare a replacement contractor if the evidence supports termination.** `[flag: project_replacement_review = true]` `→ close`

## sewer

> **Marne:** A section of excavation has collapsed and damaged several homes. The engineers have cordoned off the affected area.

He opens a map.

> **Salgado:** The inspectors are establishing whether the contractor complied with the required standards. The residents need assistance regardless of the eventual finding.

1. **Authorize emergency housing assistance and pursue the liable party.** `[flag: project_housing_assistance_intent = true]` `→ close`
2. **Require a comprehensive inspection before further excavation.** `[flag: project_delayed = true]` `[flag: site_audit = true]` `→ close`
3. **"I don't want this becoming a public scandal. Handle it quietly."** `[flag: trench_hush_intent = true]` `→ quiet`

## quiet

> **Salgado:** The residents have a right to information about their homes. We can coordinate the communications, but I cannot instruct inspectors to conceal their findings.

1. **"Make sure the residents receive the information they need."** `→ close`
2. **"Marne, keep this within your department as far as possible."** `[flag: project_bypass_justice_intent = true]` `→ close`

## close

Marne writes down the instructions.

> **Marne:** I will return with the revised cost and timetable. We can establish what this means for the rest of the project once the immediate problem has been resolved.

1. **End the meeting.** `[flag: seen_project_incident = true]` `→ END`
