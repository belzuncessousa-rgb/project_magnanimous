---
id: p2-site-tamarin
chapter: 2
turn: 2
title: The Works on the Hill
kind: conditional
location: katanai
token: project
when: "flag.great_project == 6"
portraits: [marne, fontes]
background: construction-site
---

⚙️ Staged sanitation oversight. Contractor flag records strategy, not proof a contract is signed. Branches describe current negotiation/provisional state unless verified signed. No spending or construction automatically bypasses legal restrictions. Preserve site_audit/site_visits/seen_site_visit; effects deferred.

## arrival

The treatment plant stands near the waterfront outside Katanaí. From the entrance, you can see the unfinished structure and several rows of equipment that have been covered to protect them from the weather.

Marne introduces the engineer responsible for inspecting the existing work. Fontes has brought a copy of the latest financial assessment.

> **Tobias Marne:** "We've completed a preliminary inspection. Some of the infrastructure is in good condition. Other parts will need work before they can be used."

The engineer explains which sections of the plant were completed and which remained unfinished when the construction stopped.

## status

1. **Review the existing-contract approach.** `[show if: flag.contractor == 1]` `→ existing`
2. **Review the renegotiation.** `[show if: flag.contractor == 2]` `→ renegotiation`
3. **Review the proposed change of contractor.** `[show if: flag.contractor == 3]` `→ termination`
4. **Review the current position.** `[show if: !(flag.contractor >= 1)]` `→ pending`

## existing

> **Tobias Marne:** "Corvel has prepared a proposal for resuming the work under the existing terms. The inspection has identified some materials that deteriorated while the site was unused."

> **Alexander Fontes:** "The company has submitted an additional claim concerning those materials. We need to establish which costs the contract makes the government responsible for."

→ questions

## renegotiation

> **Alexander Fontes:** "We've made some progress discussing the outstanding prices. There are still disagreements over several of the larger items at the treatment plant."

> **Tobias Marne:** "The engineers can continue examining the condition of the site while those discussions proceed."

→ questions

## termination

> **Alexander Fontes:** "Justice has been examining the legal grounds and the possible consequences of terminating the agreement. We must be prepared for a dispute with Corvel."

> **Tobias Marne:** "We can prepare the specifications for the remaining work. We will need to confirm what can proceed while the contractual situation is unresolved."

→ questions

## pending

> **Alexander Fontes:** "We have not settled how the remaining work will be contracted. The inspection and revised estimate will be important to that decision."

→ questions

## questions

1. **"What additional work has the inspection identified?"** `[once]` `→ assessment`
2. **"Can we improve service for some households before the whole project is complete?"** `[once]` `→ partial`
3. **"How are the neighbourhoods being kept informed?"** `[once]` `→ residents`
4. **"Has the report covered the street I mentioned?"** `[show if: flag.promised_mother_street]` `[once]` `→ family`
5. **"Let's decide how to follow up."** `→ decision`

## assessment

The engineer opens a set of photographs.

> **Tobias Marne:** "Some of the equipment needs to be repaired or replaced. We also have to verify the condition of several sections that were built before the work stopped."

> **Alexander Fontes:** "We should agree on a defensible estimate before approving any additional claims."

→ questions

## partial

> **Tobias Marne:** "Possibly. Some sections can be commissioned separately if they are connected to functioning treatment and distribution systems. Others depend on work elsewhere."

He points to the plan.

> **Tobias Marne:** "I would like the engineers to identify which improvements are genuinely usable before we announce dates."

→ questions

## residents

> **Tobias Marne:** "There are municipal officials responsible for communicating with residents. The information hasn't always been consistent."

1. **"Publish an updated schedule once the milestones are verified."**
   ↳ > **Tobias Marne:** "We'll prepare one."
2. **"Arrange regular briefings with the neighbourhood associations."**
   ↳ He nods.
   ↳ > **Tobias Marne:** "I'll coordinate that with the municipalities."
3. **"Understood."**

→ questions

## family

Marne asks the engineer to locate Vila Tamarin on the plan.

> **Tobias Marne:** "That street is in the area affected by the unfinished connections. We still need to establish the condition of the nearby infrastructure and the sequence of work."

1. **"I made a commitment that the street would be connected."** `[show if: flag.mother_street_guaranteed]`
   ↳ > **Tobias Marne:** "Then we should establish a reliable schedule and explain it to the residents."
2. **"Make sure it is assessed alongside the other streets."**
   ↳ > **Tobias Marne:** "Of course."

→ questions

## decision

1. **"Commission an independent audit of the outstanding work and costs."** `[flag: site_audit = true]`
   ↳ > **Alexander Fontes:** "I'll arrange the appropriate financial review with the relevant authorities."
2. **"Prepare an accelerated schedule and identify the additional funding it requires."** `[flag: site_acceleration_requested = true]`
   ↳ > **Tobias Marne:** "We'll prepare a comparison of what could be achieved and when."
   ↳ > **Alexander Fontes:** "And what it would cost. We should review the figures before committing the money."
3. **"Arrange regular progress reports and opportunities for oversight visits."** `[flag: site_visits = true]`
   ↳ > **Tobias Marne:** "I'll coordinate the schedule with your office."
4. **"Continue with the existing plan and notify me of significant changes."**
   ↳ > **Tobias Marne:** "Very well."

## close

1. **Leave the site.** `[flag: seen_site_visit = true]`

→ END
