---
id: p1-health-hours
title: The Hours at Sugar Bay
kind: conditional
when: "flag.health_service_status"
location: sugar-bay
token: health
portraits: [dara]
background: hospital-corridor
---

⚙️ Conditional service report after an authorized health-service change or a documented difference in access. Proposed integration key `health_service_status`: 1 (additional sessions operating), 2 (service reduced and appointments changed), 3 (a requested change is pending and the current rota remains in force). This key is provisional; use the actual schedule, district and contact status. Do not present a planned session as operating.

## report

Dara waits by the reception desk while a clerk finishes explaining an appointment to a man holding a bus ticket. The clerk writes the address on his card and points out the morning session.

When he leaves, Dara opens the district rota to the page that has changed.

1. **"Tell me what happened to the service."** `[once]`
   ↳ `[if: flag.health_service_status == 1]` > **Owin Dara:** "The additional sessions are operating. These are the appointments patients have actually received."
   ↳ `[if: flag.health_service_status == 2]` > **Owin Dara:** "The reduced schedule is in effect. This page lists the appointments that changed and what the clerk has confirmed about contacting each patient."
   ↳ `[if: flag.health_service_status == 3]` > **Owin Dara:** "The change is still waiting for a decision. The current hours remain in force. We can't schedule additional appointments until the staffing and date are confirmed."
2. **"Give patients the confirmed dates and addresses."**
   ↳ The clerk marks the clinics that need the notice.
   ↳ > **Clerk:** "I'll send the same information to those offices. We'll use the current schedule until we receive a confirmed change."
3. **"Bring me a costed option for the people still waiting."**
   ↳ Dara asks for the pending appointment list and names the staffing cost the district needs to provide.
   ↳ > **Owin Dara:** "I'll ask the district to show what another session would cover and which staff it requires. Nothing changes until we have a cost and authority to proceed."
4. **"Keep the current schedule and report any confirmed change."**
   ↳ Dara asks the clerk to separate appointments offered from visits completed in the next report.
   ↳ > **Owin Dara:** "We'll bring you the rota and the figures the district can verify."

→ END
