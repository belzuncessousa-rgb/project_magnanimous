---
id: p1-education-briefing
chapter: 1
turn: 3
title: The Graduating Class
kind: briefing
location: atiaiaba
token: education
portraits: [kaval]
background: university-hall
---

⚙️ Staged rewrite. Education tradeoffs and the Tekoku technology/brain-drain arc; no budget allocation or unavoidable ideological stance. Existing education_floor_first and seen_education_briefing flags retained. New illustrative student anecdote and Kaval's son details provisional; numerical effects deferred.

## university

From the university courtyard in Atiaiaba, you can see the roofs of the old town and, beyond them, the cranes of the port. Students have gathered around the entrance to the main building.

Helena Kaval is waiting beneath the covered walkway. Several members of the university staff greet her as Rector, her former title.

> **Helena Kaval:** "I still turn around when someone calls me that."

She introduces you to the current rector and accompanies you through a laboratory building. In one room, a group of students is testing a small electric motor attached to a workbench.

> **Helena Kaval:** "They've invited you to meet some of the graduating class. I thought it might be useful to hear what they're planning to do afterwards."

## class

The students are seated in a semicircle in a lecture hall. The rector asks them to introduce themselves and explain what they hope to do when they graduate.

One young man intends to return to his hometown to teach. Another has an offer from an engineering firm in Tekoku. A young woman tells you she has been accepted into a research programme abroad.

> **Helena Kaval:** "When do you leave?"

> **Student:** "In July. If the visa comes through."

Kaval nods.

> **Student:** "I'd like to work here eventually. There aren't many laboratories doing what I want to do."

1. **"What kind of research interests you?"**
   ↳ > **Student:** "Materials for electronics. The programme has equipment we haven't been able to get here."
   ↳ Kaval looks at the rector, who gives a small nod.
2. **"Would you consider returning after your research?"**
   ↳ > **Student:** "Of course. I'd just need a position that would let me continue it."
3. **"Congratulations on being accepted."**
   ↳ The student smiles.
   ↳ > **Student:** "Thank you, Madam President."
4. **Invite the other students to continue.**

The rector introduces another student, and the conversation continues for a while. Several ask about employment and research funding.

## address

> **Helena Kaval:** "Would you like to say something before we go?"

1. **"I want more of you to have opportunities here in Kunasai."**
   ↳ > "You should be able to pursue ambitious work in this country. I intend to examine what we can do to improve the opportunities available to you."
2. **"Study wherever you can learn the most. I hope you'll return."**
   ↳ > "There is value in gaining experience abroad. I hope that in the future more of you will be able to use that experience here."
3. **"We must also reach the children who never get this far."** `[flag: education_floor_first = true]`
   ↳ > "Our universities are important, and so are the schools that prepare people to attend them. There are parts of Kunasai where too many children leave school early. I intend to give those areas particular attention."
   ↳ Kaval listens attentively, then thanks the students.
4. **"Thank you for telling me about your plans."**
   ↳ > "I wish you all success in your work. I appreciate the opportunity to hear from you."

## office

Kaval takes you to a small office overlooking the courtyard. The rector has arranged for you to use it during the visit.

> **Helena Kaval:** "That was useful. It's easier to discuss the problem when you've met some of the people concerned."

She sets two briefing documents on the desk.

> **Helena Kaval:** "Our schools are very uneven. In some regions, almost every community has access to a reasonable school. In others, children are leaving without completing basic education. We could invest in teachers, facilities and attendance."

> **Helena Kaval:** "The other substantial opportunity is higher education and research. We have good institutions, particularly here and in Ibicuí, but some are falling behind internationally. Better laboratories and research grants could help them retain people and develop new industries."

→ questions

## questions

1. **"How quickly could school investment make a difference?"** `[once]` `→ schools`
2. **"Can we address the departure of graduates?"** `[once]` `→ graduates`
3. **"What are companies like Strawberry asking for?"** `[once]` `→ strawberry`
4. **"What would you prioritize on a limited budget?"** `[once]` `→ priorities`
5. **"I think we've covered the essentials."** `→ personal`

## schools

> **Helena Kaval:** "Attendance can improve relatively quickly if we address transport, staffing and the cost to families. The broader benefits of educating a generation of children take much longer."

1. **"Could we combine that with social assistance?"**
   ↳ > **Helena Kaval:** "Certainly. We should speak with Owin about areas where the same households face both problems."
2. **"We'll discuss the details with the budget."**

→ questions

## graduates

> **Helena Kaval:** "Universities can offer more competitive positions, but they cannot employ everyone they train. We also need firms and research institutions doing sufficiently advanced work."

She looks out at the courtyard.

> **Helena Kaval:** "My son left for Veldra two years ago. He's working in a laboratory there. I would like him to have the option of doing that work here."

1. **"Does he want to come home?"**
   ↳ > **Helena Kaval:** "Sometimes. He likes his work. I think the decision would be easier if he had a comparable offer."
2. **"We need to address education and industry together."**
   ↳ > **Helena Kaval:** "Yes. I'll speak to Tobias about coordinating our proposals."
3. **"I understand."**

→ questions

## strawberry

> **Helena Kaval:** "Its chief executive, Martin Works, has been asking for engineering graduates and better research facilities. He's also concerned about competition from imported electronics."

> **Helena Kaval:** "Some of that is a matter for economic policy. From my perspective, there are real opportunities for cooperation between our universities and domestic industry."

1. **"Would the universities retain control over their research?"**
   ↳ > **Helena Kaval:** "That would depend on the agreement. I would insist on appropriate safeguards before committing public institutions to one company's research programme."
2. **"I'd like to see what cooperation could offer."**
   ↳ She nods.
3. **"Let's leave that for a separate discussion."**

→ questions

## priorities

Kaval takes a moment before answering.

> **Helena Kaval:** "I would be reluctant to let the existing universities deteriorate. At the same time, there are children in this country who cannot get a reasonable education at all."

> **Helena Kaval:** "If you can only fund one substantial new initiative, I will prepare a comparison of what each could accomplish. I would prefer that we make the choice with the full information available."

→ questions

## personal

A member of the rector's staff brings in coffee. Kaval thanks him and asks how the university has been managing since she left.

After he goes, she smiles.

> **Helena Kaval:** "It's strange to come back here as a minister. Last year, I was the person writing letters to the ministry asking for money."

1. **"And now you're receiving them."**
   ↳ > **Helena Kaval:** "From almost every institution I used to compete with for funding."
   ↳ She laughs.
2. **"Do you miss running the university?"**
   ↳ > **Helena Kaval:** "Some days. I knew the people here very well. At the ministry, I sometimes spend the whole day discussing a school I've never seen."
3. **"I appreciate you bringing me here."**
   ↳ She smiles.
   ↳ > **Helena Kaval:** "You're welcome."

## close

Kaval accompanies you back to the entrance.

1. **Leave for the airport.** `[flag: seen_education_briefing = true]`

→ END
