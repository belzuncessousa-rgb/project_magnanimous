---
id: p2-site-taua
chapter: 2
turn: 2
title: The Tauá Hills
kind: conditional
location: taua-hills
token: project
when: "flag.great_project == 1"
portraits: [tuyu, marne]
background: forest-camp
---

⚙️ Staged rare-earth site encounter. Consultation, land rights and environmental safeguards distinct; no guarantee of legal permission by presidential instruction. Preserve taua_consulted, taua_forced, seen_site_visit. Exact costs/delay/consent rules provisional; potential project benefits depend on later choices and conditions.

## arrival

You travel into Ibira with Tobias Marne and a small group of officials. Along the river, settlements alternate with long stretches of forest. Near the planned site, the engineers have established a temporary office beside a landing.

Marne introduces Iracema Tuyú, a representative of the Ibira Peoples' Council. She has brought two other representatives from nearby communities. They greet you and take seats beneath the shelter.

> **Iracema Tuyú:** "Thank you for coming. Several of the communities have been asking when they will have an opportunity to discuss the project with the government."

She unfolds a map showing villages and the area being assessed.

> **Iracema Tuyú:** "There are people who would welcome employment and better transport. There are others who are concerned about the land and the water. We would like to have those discussions before arrangements are made that cannot easily be changed."

Marne looks at the map.

> **Tobias Marne:** "We can discuss the preliminary work separately from the operations that will require further assessment."

## discussion

One of the representatives points to a settlement near the proposed development area.

> **Representative:** "We use the river for almost everything. We need to know what the project would mean for it."

Marne invites an engineer to explain the preliminary assessment. The engineer describes the work still required to establish the potential environmental impacts.

Tuyú listens and then turns to you.

> **Iracema Tuyú:** "We also need people from the communities to have access to the information. We have had experiences where the reports were prepared elsewhere and arrived after the decision."

→ questions

## questions

1. **"What would meaningful consultation involve?"** `[once]` `→ consultation`
2. **"Are there unresolved claims to the land?"** `[once]` `→ land`
3. **"What benefits would communities want from the project?"** `[once]` `→ benefits`
4. **"How does the Red Tree affect the area?"** `[once]` `→ security`
5. **"What work can safely proceed before the assessment?"** `[once]` `→ preparation`
6. **"Let's decide how to proceed."** `→ decision`

## consultation

> **Iracema Tuyú:** "Time for the communities to discuss the information in their own meetings, with people who can explain the technical matters. And an opportunity to make proposals that the government will actually consider."

1. **"Would the communities choose their own representatives?"**
   ↳ > **Iracema Tuyú:** "Yes. The council can help coordinate the discussions, but we shouldn't decide for every village."
2. **"We should provide the reports in an accessible form."**
   ↳ She nods.
   ↳ > **Iracema Tuyú:** "That would be helpful."
3. **"Understood."**

→ questions

## land

> **Iracema Tuyú:** "Some territories have formal recognition. There are also areas where the boundaries remain disputed or where communities have not obtained the titles they have requested."

Marne studies the map.

> **Tobias Marne:** "We need the relevant authorities to establish which issues affect the planned facilities and transport connections."

→ questions

## benefits

> **Iracema Tuyú:** "Reliable access to the communities, services that remain after the construction crews leave, employment for people who want it and arrangements for sharing the local benefits."

> **Iracema Tuyú:** "Some villages will still oppose the development. We should be able to hear their objections without treating every question as a negotiation over compensation."

→ questions

## security

Tuyú looks towards the landing.

> **Iracema Tuyú:** "The criminal organisation has influence in several communities. People who need work sometimes accept offers from them. There are also people who would like to cooperate with the authorities but are concerned about the consequences."

> **Tobias Marne:** "We'll need to coordinate with Justice on the safety of the people working here and the communities affected."

→ questions

## preparation

> **Tobias Marne:** "Surveys, assessments and work within already authorized areas may be possible. We should have the responsible officials establish the limits before issuing instructions."

Tuyú nods.

> **Iracema Tuyú:** "That would be a useful place to start."

→ questions

## decision

1. **"Conduct formal consultation before irreversible development proceeds."** `[flag: taua_consulted = true]`
   ↳ Tuyú inclines her head.
   ↳ > **Iracema Tuyú:** "I'll arrange discussions with the communities."
   ↳ > **Tobias Marne:** "We'll revise the timetable to account for that."
2. **"Continue authorized preparatory work while negotiating safeguards and benefits."** `[flag: taua_parallel_review = true]`
   ↳ > **Tobias Marne:** "I'll have the team distinguish the activities that can proceed from those that need further decisions."
   ↳ > **Iracema Tuyú:** "I would like those distinctions to be clear to the communities as well."
3. **"Prioritize the existing schedule. Resolve objections through the required procedures."** `[flag: taua_forced = true]`
   ↳ Tuyú looks at you for a moment.
   ↳ > **Iracema Tuyú:** "Then I hope those procedures give the communities a real opportunity to be heard."
   ↳ Marne closes his folder.
   ↳ > **Tobias Marne:** "We'll establish what can proceed under the present authorizations."

## close

Before leaving, Tuyú introduces you to a member of the council who has brought a small booklet describing the communities along the river.

1. **Accept the booklet and thank her.** `[flag: seen_site_visit = true]`

→ END
