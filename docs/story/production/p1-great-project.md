---
id: p1-great-project
chapter: 1
turn: 3
title: The First Great Project
kind: fixed
location: capital
token: project
when: "flag.seen_planning_briefing"
portraits: [livia, fontes, marne, mertens]
background: blue-room-night
---

⚙️ Staged Chapter 1 closer. Select first investment priority using existing great_project values 1/4/6 and corresponding flags. No funding deducted until budget or approved project funding mechanism. Additional investment opportunities and second round remain planned; do not imply all governments can afford only one. Project delivery complications modify costs and benefits, not binary failure. Public pledge meanings and thresholds provisional; numerical effects deferred.

## opening

The Blue Room is much quieter than it was during your first cabinet meeting. Four chairs have been arranged at one end of the table, and the staff have left three project summaries at your place.

Livia is standing beside a small display board.

> **Livia Harvan:** "We've received the updated proposals from Planning and Treasury. We need to identify the principal investment to include in the government's first budget."

Fontes opens his folder.

> **Alexander Fontes:** "I would recommend establishing a priority today. We can examine whether there is room for additional investment once the full budget is prepared."

Marne nods.

> **Tobias Marne:** "That will allow us to begin the detailed work on the proposal you select."

Mertens takes his seat.

> **Caio Mertens:** "And give me something to discuss with the deputies."

→ counsel

## counsel

1. **"Alexander, compare the financial implications."** `[once]` `→ finance`
2. **"Tobias, compare the delivery challenges."** `[once]` `→ delivery`
3. **"Livia, what are the wider consequences?"** `[once]` `→ politics`
4. **"Caio, what should I expect from Congress?"** `[once]` `→ congress`
5. **"Could we undertake more than one?"** `[once]` `→ additional`
6. **"I'm ready to select a priority."** `→ choice`

## finance

Fontes sets out the cost comparisons.

> **Alexander Fontes:** "The mineral development has substantial initial costs and the potential to generate considerable revenue later. The railway would require a sustained commitment over several years, with much of the financial benefit accruing indirectly through economic activity."

> **Alexander Fontes:** "Finishing the sanitation works would ordinarily be the least expensive of the three, because much of the infrastructure has already been built. The outstanding contractual terms will matter."

1. **"Which has the most predictable financial return?"**
   ↳ > **Alexander Fontes:** "They have different types of return. The mine depends on production and market conditions. The railway depends on usage and economic development. Much of the value of sanitation is in living conditions, health and the costs families currently bear."
2. **"Thank you."**

→ counsel

## delivery

> **Tobias Marne:** "The mine requires several preliminary agreements, assessments and supporting facilities. The railway can be developed in sections, although coordination will be important. The sanitation works need an inspection and a resolution of the outstanding contract."

1. **"Can we monitor the projects directly from the presidency?"**
   ↳ > **Tobias Marne:** "Certainly. My office can prepare progress reports and arrange visits when there are particular matters you want to review."
2. **"All right."**

→ counsel

## politics

Livia points to the three project locations.

> **Livia Harvan:** "The mineral development will attract international interest and require engagement with the communities in Ibira. The railway has a broad regional constituency, particularly among producers and businesses. The sanitation works will be important to a great many families in the cities."

> **Livia Harvan:** "The last of those is also associated with President Luz and our coalition's leading party. We should be prepared for questions about the previous contracts."

1. **"What would the indigenous communities expect from the government?"**
   ↳ > **Livia Harvan:** "We would need to speak with the affected communities. Their concerns may include land, environmental protection and the arrangements for sharing any local benefits."
2. **"Which regions would see the earliest improvements?"**
   ↳ > **Livia Harvan:** "That will depend on the proposal and its implementation. Sanitation could deliver relatively direct improvements once connections are completed. The other two have more extensive preparatory work."
3. **"Understood."**

→ counsel

## congress

> **Caio Mertens:** "We'll need sufficient support for the budget. Most parties have members who would welcome at least one of these proposals, though they will want to see the details."

> **Caio Mertens:** "If we choose the railway, several deputies will have suggestions about the route. If we choose the mine, there will be questions about the partners. And with sanitation, I expect the contracts to receive particular attention."

1. **"I won't make commitments to contractors in exchange for support."** `[show if: flag.patronage_redline]`
   ↳ He nods.
   ↳ > **Caio Mertens:** "I remember. I'll focus on the proposal and the interests of the constituencies."
2. **"We'll discuss congressional support when the budget is ready."**
   ↳ > **Caio Mertens:** "I'll prepare the ground in the meantime."
3. **"Thank you."**

→ counsel

## additional

Fontes glances at Marne.

> **Alexander Fontes:** "Potentially. It would depend on the funding available, the terms of any external financing and what you intend to spend on other priorities."

> **Tobias Marne:** "There are other projects under preparation as well. We can review the investment programme again once we have a clearer picture of the government's capacity."

> **Alexander Fontes:** "I would prefer not to commit the same money twice."

→ counsel

## choice

Livia places the three summaries beside one another.

> **Livia Harvan:** "Which proposal should we prioritize?"

1. **Ibira rare-earth development.** `[flag: great_project = 1]` `[flag: project_rare_earths = true]` `→ rare`
2. **National Railway Integration.** `[flag: great_project = 4]` `[flag: project_railway = true]` `→ rail`
3. **Prioritize completion of the housing and sanitation works.** `[flag: great_project = 6]` `[flag: project_sanitation = true]` `→ sanitation`

## rare

Marne pulls the Ibira proposal towards him.

> **Tobias Marne:** "I'll begin coordinating the assessments and the preliminary infrastructure plan."

> **Livia Harvan:** "I'll arrange for the relevant communities and regional authorities to be consulted."

> **Alexander Fontes:** "And we'll need to examine the financial arrangements with any prospective partners before making commitments."

1. **"Prepare alternatives that retain domestic ownership."** `[flag: mining_ownership_preference = 1]`
   ↳ > **Tobias Marne:** "I'll have them prepared."
2. **"Include private and international partnership options."** `[flag: mining_ownership_preference = 2]`
   ↳ > **Tobias Marne:** "Certainly."
3. **"Bring me the assessments before we discuss ownership."**

→ statement

## rail

Marne looks pleased. He turns one of the route maps towards Fontes.

> **Tobias Marne:** "I'll have the team prepare the order in which we would develop the sections."

> **Alexander Fontes:** "And the corresponding schedule of expenditure, please."

> **Livia Harvan:** "I'll contact the regional administrations. We should be able to arrange discussions about the proposed connections."

1. **"Make sure the plan includes the connections to Mognagna."**
   ↳ > **Tobias Marne:** "I'll include those in the assessment."
2. **"Prioritize the sections with the strongest economic case."**
   ↳ > **Tobias Marne:** "I'll prepare the comparison."
3. **"We'll discuss the route once we have the full plan."**

→ statement

## sanitation

Fontes puts a hand on the contract folder.

> **Alexander Fontes:** "We should establish the current obligations and the costs of completing the work before committing the funds."

> **Tobias Marne:** "I'll arrange the inspection and prepare the revised schedule."

1. **"Justice should be involved in reviewing the existing agreement."** `[flag: project_legal_review_requested = true]`
   ↳ > **Livia Harvan:** "I'll coordinate that with Renata."
2. **"I want the remaining work priced independently."** `[flag: project_independent_estimate = true]`
   ↳ > **Alexander Fontes:** "We'll make the appropriate arrangements."
3. **"I promised my parents' street that it would be connected."** `[show if: flag.mother_street_guaranteed]`
   ↳ Livia looks at the project summary.
   ↳ > **Livia Harvan:** "We'll need to establish whether that street falls within the programme and explain the timetable accurately."
4. **"Prepare the proposal for the whole programme."**
   ↳ > **Tobias Marne:** "Of course."

→ statement

## statement

> **Livia Harvan:** "The press office will announce the selection. Would you like to include a particular commitment?"

1. **"Commit to delivering the project on time and within budget."** `[flag: promised_on_time = true]`
   ↳ Fontes looks up.
   ↳ > **Alexander Fontes:** "We haven't finalized either the schedule or the budget yet. I would advise against making that commitment at this stage."
   ↳ > "Include the commitment."
2. **"Commit to publishing the project's contracts and costs."** `[flag: promised_transparency = true]`
   ↳ Livia makes a note.
   ↳ > **Livia Harvan:** "We'll need to establish the publication process with the ministries."
3. **"Announce the selection and explain the next steps."**
   ↳ > **Livia Harvan:** "All right. I'll have the statement prepared."

## close

The ministers gather the relevant documents. Marne stops at the door to speak to Fontes about a figure in one of the summaries.

Livia remains behind for a moment.

> **Livia Harvan:** "I'll arrange the follow-up meetings and send you the statement before it goes out."

1. **"Thank you. I'll review it."**
2. **"Make sure everyone has the same version of the plan."**
   ↳ > **Livia Harvan:** "I will."
3. **"That's all for tonight."**

## end

You return the remaining summaries to their folders. The room is almost empty, and a member of staff is waiting outside to collect the documents.

1. **Leave the Blue Room.** `[flag: seen_great_project = true]` `[flag: chapter1_complete = true]`

→ END
