---
id: p2-contractor
chapter: 2
turn: 1
title: Who Builds It
kind: briefing
location: capital
token: project
portraits: [marne, fontes]
background: planning-model-room
---

⚙️ Staged project-specific procurement meeting. Requires selected project and appropriate funding/preparation. Existing contractor value mapping retained per project. Choices select procurement/negotiation strategy rather than guarantee award, disbursement, corruption or environmental result. Reconcile contractor and financing effects with prior announcements, partner offers, safeguards, independent review and second-round projects. Projects do not fail outright. Dates provisional.

## opening

Marne has arranged a meeting with Fontes to discuss the next stage of the Great Project. Several folders containing preliminary proposals are on the table.

> **Tobias Marne:** "We have enough information to decide how we want to organize the work. The terms of the final agreements will still have to be settled."

Fontes opens his notes.

> **Alexander Fontes:** "I would like us to distinguish the cost of the work from the cost of financing it. Some of the more attractive proposals combine the two."

1. **Review the mineral development proposals.** `[show if: flag.great_project == 1]` `→ mine`
2. **Review the railway proposals.** `[show if: flag.great_project == 4]` `→ rail`
3. **Review the sanitation proposals.** `[show if: flag.great_project == 6]` `→ sewer`
4. **Continue.** `[show if: !(flag.great_project == 1 || flag.great_project == 4 || flag.great_project == 6)]` `→ none`

## mine

Marne spreads the mineral development proposal out on the table.

> **Tobias Marne:** "We have received expressions of interest from a domestic mining consortium and two international firms. The domestic firms have experience in extraction, although less in rare-earth processing."

> **Tobias Marne:** "Halvard Minerals, from the Federation, has proposed a partnership with a domestic public enterprise. A Zharani state-owned company has proposed a similar arrangement, combined with financing for some of the transport infrastructure."

> **Alexander Fontes:** "The financing terms could make a substantial difference to the funds we require at the beginning. We will need to examine what rights the partners would receive in return."

→ mine-q

## mine-q

1. **"Could we retain control of the operation under each arrangement?"** `[once]` `→ mine-control`
2. **"How would the alternatives affect environmental safeguards?"** `[once]` `→ mine-safeguards`
3. **"Which would create the most opportunities for domestic expertise?"** `[once]` `→ mine-expertise`
4. **"I'm ready to give you a direction."** `→ mine-choice`

## mine-control

> **Tobias Marne:** "Domestic control is possible under more than one arrangement. We would need to settle ownership, financing, purchase commitments and how decisions are made within the enterprise."

1. **"I want to maintain the domestic ownership preference we discussed."** `[show if: flag.mining_ownership_preference == 1]`
   ↳ > **Tobias Marne:** "Then we'll use that as a condition in the negotiations."
2. **"We should compare the actual terms."**
   ↳ > **Alexander Fontes:** "Agreed."

→ mine-q

## mine-safeguards

> **Tobias Marne:** "The international firms have experience with more sophisticated processing and monitoring systems. The domestic consortium would need to demonstrate that it can meet the required standards, possibly with additional expertise."

> **Alexander Fontes:** "Those standards should be conditions of the agreement, regardless of which company we choose."

→ mine-q

## mine-expertise

> **Tobias Marne:** "A partnership could include training, local processing and cooperation with universities. We would have to negotiate those provisions explicitly. A foreign company bringing all its own staff would have rather different consequences."

→ mine-q

## mine-choice

1. **"Negotiate with the domestic consortium first."** `[flag: contractor = 1]`
   ↳ > **Tobias Marne:** "I'll ask them for a complete proposal, including the specialist expertise they intend to obtain."
2. **"Pursue a partnership with Halvard Minerals."** `[flag: contractor = 2]`
   ↳ > **Tobias Marne:** "I'll coordinate a meeting with the company and the relevant officials."
   ↳ > **Alexander Fontes:** "We'll examine their financing and ownership terms before committing funds."
3. **"Pursue the Zharani partnership and infrastructure financing."** `[flag: contractor = 3]`
   ↳ > **Tobias Marne:** "I'll ask them to provide the complete infrastructure and production proposals."
   ↳ Fontes nods.
   ↳ > **Alexander Fontes:** "Including the purchase commitments and financing conditions."

→ safeguards

## rail

Marne unrolls the proposed railway map.

> **Tobias Marne:** "The network can be divided into construction sections. We can invite domestic firms to submit proposals, organize an international tender, or establish a tender with domestic participation requirements."

> **Alexander Fontes:** "Those arrangements could produce different prices and timetables. The requirements also determine how much work and expertise remain in Kunasai."

→ rail-q

## rail-q

1. **"Can domestic companies undertake the entire network?"** `[once]` `→ rail-domestic`
2. **"What would an international tender involve?"** `[once]` `→ rail-tender`
3. **"What could domestic participation requirements achieve?"** `[once]` `→ rail-mixed`
4. **"I'm ready to give you a direction."** `→ rail-choice`

## rail-domestic

> **Tobias Marne:** "Several firms have the relevant experience. They would need to demonstrate that they can coordinate the sections and meet the specifications."

Fontes looks at the preliminary estimates.

> **Alexander Fontes:** "We should establish comparable prices rather than assume that an established relationship guarantees value."

→ rail-q

## rail-tender

> **Tobias Marne:** "We would publish the specifications and invite eligible companies to compete. We expect interest from several foreign firms, including companies from Zharan. We won't know the outcome until we receive and evaluate the proposals."

→ rail-q

## rail-mixed

> **Tobias Marne:** "We could specify local employment, training or partnership requirements. That might narrow the number of eligible proposals or increase their costs. It could also help establish domestic capabilities that are useful beyond this project."

→ rail-q

## rail-choice

1. **"Seek proposals directly from the domestic railway firms."** `[flag: contractor = 1]`
   ↳ > **Tobias Marne:** "I'll ask the companies for their schedules and estimates."
2. **"Organize an open international tender."** `[flag: contractor = 3]`
   ↳ > **Tobias Marne:** "We'll prepare the specifications and evaluation process."
3. **"Hold a competitive tender with domestic participation requirements."** `[flag: contractor = 2]`
   ↳ > **Tobias Marne:** "I'll work with the relevant ministries to define those requirements."

→ safeguards

## sewer

Fontes places the Corvel contract on the table.

> **Alexander Fontes:** "For this project, the central question is the existing agreement. The consortium has indicated that it is willing to resume work under the present terms."

> **Tobias Marne:** "We have also prepared options for renegotiating the remaining work or seeking a new contractor."

Fontes turns to the cost comparison.

> **Alexander Fontes:** "The first approach may allow construction to resume sooner. The second could produce better terms. Termination might involve litigation and delay, depending on the legal grounds."

→ sewer-q

## sewer-q

1. **"What has Justice established about the contract?"** `[show if: flag.corvel_to_salgado || flag.project_legal_review_requested]` `[once]` `→ sewer-legal`
2. **"What did our revised cost assessment show?"** `[show if: flag.corvel_costed || flag.project_independent_estimate]` `[once]` `→ sewer-cost`
3. **"What would a change of contractor mean for the neighbourhoods?"** `[once]` `→ sewer-delay`
4. **"I'm ready to give you a direction."** `→ sewer-choice`

## sewer-legal

> **Alexander Fontes:** "The terms are being examined. We should distinguish any possible wrongdoing in awarding the original contract from the obligations that remain under it."

> **Tobias Marne:** "We'll need advice on both before any final agreement."

→ sewer-q

## sewer-cost

> **Alexander Fontes:** "The preliminary assessment supports our concern about several of the original prices. We can use the independent figures to examine whether the present terms are reasonable."

→ sewer-q

## sewer-delay

> **Tobias Marne:** "The residents will want construction to resume as soon as possible. A change of contractor would require a transition, and a dispute could make that more complicated. We can prepare an interim plan for the parts of the site that need immediate attention."

→ sewer-q

## sewer-choice

1. **"Renegotiate the outstanding work and prices with Corvel."** `[flag: contractor = 2]`
   ↳ Fontes nods.
   ↳ > **Alexander Fontes:** "I'll establish the financial conditions for the negotiations."
2. **"Proceed under the existing contract, subject to legal requirements."** `[flag: contractor = 1]`
   ↳ > **Tobias Marne:** "I'll prepare a schedule for resuming the work."
   ↳ Fontes looks at the cost comparison.
   ↳ > **Alexander Fontes:** "We will need to explain the additional expenditure."
3. **"Prepare to terminate the contract and tender the remaining work."** `[flag: contractor = 3]`
   ↳ > **Alexander Fontes:** "We'll seek advice from Justice before issuing any notice. There is a possibility of a legal dispute."

→ safeguards

## safeguards

Marne collects the preliminary proposals.

> **Tobias Marne:** "Is there anything you would like us to establish before proceeding?"

1. **"Have the financial and technical terms independently reviewed."** `[flag: contractor_review_requested = true]`
   ↳ > **Alexander Fontes:** "I'll arrange the financial review with the appropriate officials."
2. **"Prepare the documents for publication, as I promised."** `[show if: flag.promised_transparency]` `[flag: contractor_publication_requested = true]`
   ↳ > **Tobias Marne:** "We'll establish which documents need to be included and when."
3. **"Bring me the complete terms before any final commitment."**
   ↳ > **Tobias Marne:** "Of course."

→ close

## none

> **Tobias Marne:** "We will need to settle the project's priority and funding before we can proceed with procurement."

→ close

## close

1. **End the meeting.** `[flag: seen_contractor = true]`

→ END
