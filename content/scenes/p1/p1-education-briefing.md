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

⚙️ Education meeting, held as a visit to the Federal University of Tekoku in Atiaiaba (Lara's weakest region). Overview of the two programmes for the chapter-2 budget (basic schooling vs. universities and research), emigration of graduates, Strawberry, and the link to Ibira's rare earths. Kaval's son is in Veldra.

## opening

Atiaiaba is the largest city of Tekoku, on the north coast, where the two great rivers reach the sea. The Federal University occupies a former monastery in the old town. The main hall still has the monks' wooden benches.

Helena Kaval meets you at the gate. The porters greet her as "Rector", her old title, and she lets them.

> **Helena Kaval:** "Welcome, Madam President. This is the physics class that graduates this year. Sixty-one students. I asked them privately how many already have a job offer in Veldra or Moreya. Thirty-four said yes."

→ class

## class

The students stand up when you come in. A young woman in the front row keeps her arms crossed. Kaval tells you quietly that she has an offer from a laboratory in Moreya, and that her grandmother lives in Mognagna.

> **Helena Kaval:** "Would you say a few words to them? Short is fine."

1. **"Stay if you can. I can't promise better salaries yet, but this country needs you."** `[approval +2 @ tekoku]` `[kaval loyalty +1]` `[+1 IDEN]`
   ↳ Some of them write it down. Most just listen.
2. **"If you go, learn everything you can, and then come back. We'll try to be ready for you."** `[approval +1 @ tekoku]` `[-1 IDEN]` `[kaval loyalty +1]`
   ↳ The young woman in the front row uncrosses her arms.
3. **"Some of you will leave. My first duty is to the children who never got as far as this room."** `[+1 WELF]` `[approval -3 @ tekoku]` `[approval +2 @ mognagna]` `[kaval loyalty -1]` `[flag: education_floor_first = true]`
   ↳ The hall goes quiet. The young woman in the front row looks directly at you for the first time.

## office

Afterwards, in her old office, Kaval gives you the overview.

> **Helena Kaval:** "In the budget, Education can fund two programmes. One is basic schooling: teachers and schools in Mognagna and Ibira, where many children leave school early. The results take fifteen years to show."

> **Helena Kaval:** "The other is universities and research: laboratories, salaries for researchers, grants. That keeps people like the students you just met. The results come faster, but mostly here in Tekoku and in Ibicuí."

> **Helena Kaval:** "The left of your party will want the schools first. Tekoku and the businesses here will want the universities. We'll decide in March."

→ questions

## questions

1. **"What does Strawberry want from us?"** `[once]` `→ questions`
   ↳ > **Helena Kaval:** "Strawberry is our largest electronics company. Its chief executive, Martin Works, has written to me twice. He wants more engineering graduates, and he wants higher import taxes on foreign phones."
2. **"What does this have to do with the minerals in Ibira?"** `[once]` `→ questions`
   ↳ > **Helena Kaval:** "Tobias will tell you about the rare earths. To mine them without poisoning the rivers, you need engineers and chemists we mostly don't have. Many of them are in that hall, planning to leave."
3. **"Is there a way to do both programmes?"** `[once]` `→ questions`
   ↳ > **Helena Kaval:** "With enough money. If we only have money for one, I'd keep the universities, because the schools can't move abroad and the graduates can. I don't like that answer, but I think it's right."
4. **"Thank you, Helena."** `→ son`

## son

She pours two small glasses of a Veldran liqueur from a bottle on the shelf.

> **Helena Kaval:** "Forgive me. It's a habit from this office."

1. **Ask about her family** `[kaval loyalty +1]`
   ↳ > **Helena Kaval:** "My son lives in Veldra. He left two years ago. He works on batteries, which is what Ibira's rare earths are used for. He writes to me on Sundays."
2. **Keep to work**
   ↳ She nods, and you talk about the budget calendar until your car arrives.
3. **Tell her about your mother**
   ↳ You tell her about Celia, who phones instead of writing and refuses to move to the capital. Kaval laughs.
   ↳ > **Helena Kaval:** "She sounds like my mother. Bring her to Tekoku one day."

## close

1. **Leave for the airport** `[flag: seen_education_briefing = true]`

→ END
