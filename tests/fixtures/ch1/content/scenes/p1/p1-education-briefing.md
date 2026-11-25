---
id: p1-education-briefing
chapter: 1
turn: 3
title: The Graduating Class
kind: briefing
location: tekoku
portraits: [kaval]
background: university-hall
---

⚙️ Education briefing, staged as a visit to the Federal University of Tekoku in Atiaiaba (Lara's worst region: approval 15). Seeds: Basic Education Expansion vs. Higher Ed & Research (ch2 tier), brain drain, Strawberry, the rare-earths clean-extraction gate. Kaval's personal arc: her son in Veldra.

## opening

The Federal University of Tekoku was a monastery before it was a university, and in the great hall the students still sit on the monks' benches. The windows are Veldran glass, green and slightly warped, so that the city outside looks as if it were underwater.

Helena Kaval meets you at the door without ceremony. She was rector here for eight years. The porters still call her Rector, and she has stopped correcting them.

> **Helena Kaval:** "Welcome to the only room in Tekoku that voted for you. Narrowly. Don't let it go to your head."

> **Helena Kaval:** "The graduating class in physics. Sixty-one. I asked them, privately, how many have a ticket to Veldra or Moreya. Thirty-four raised their hands. Six more didn't, and I know they lied."

→ class

## class

The students stand when you come in, some quickly, some slowly enough to make a point. A young woman in the front row keeps her arms folded the entire time. Kaval says she has a scholarship offer from a laboratory in Moreya, and a grandmother in Mognagna.

> **Helena Kaval:** "Say something to them. Not a speech. They've had speeches."

1. **"Stay. I can't promise you salaries yet. I can promise you a country that needs you."** `[approval +2 @ tekoku]` `[kaval loyalty +1]` `[+1 IDEN]`
   ↳ A few of them write it down. One of them, at the back, writes it down and then crosses it out. You can't tell which part.
2. **"Go. Learn everything. Then come back, and we'll be ready for you."** `[approval +1 @ tekoku]` `[-1 IDEN]` `[kaval loyalty +1]`
   ↳ The young woman in the front row unfolds her arms. It is not applause, but in Tekoku it may be the local equivalent.
3. **"Some of you will leave. My first duty is the child in Mognagna who never got as far as this room."** `[+1 WELF]` `[approval -3 @ tekoku]` `[approval +2 @ mognagna]` `[kaval loyalty -1]` `[flag: education_floor_first = true]`
   ↳ The hall goes very quiet. The young woman in the front row looks, for the first time, directly at you. You can't tell whether she is angry or relieved that somebody said it.

## office

Afterwards, in the rector's old office, Kaval pours two glasses of something from a Veldran bottle and does not ask whether you want one.

> **Helena Kaval:** "Two things I can do. Raise the floor — teachers and schools in Mognagna and Ibira, results in fifteen years, which is to say, under someone else. Or extend the top — laboratories, research, the people in that hall. Results in five, mostly here."

> **Helena Kaval:** "The left wants the floor. Tekoku wants the top. Strawberry wants the top and would like it free. Martin Works has already emailed me twice."

> **Helena Kaval:** "And Marne will tell you there's a fortune in rare earths under Ibira. There is. To take it out without poisoning the river you need engineers you don't have. They're in that hall, packing."

1. **"If you had to cut one, which?"**
   ↳ > **Helena Kaval:** "Neither. Then the top, because the floor can't leave the country. That's the cruel answer. It's also the correct one, which is why I hate it."
2. **"What does Martin Works want, exactly?"**
   ↳ > **Helena Kaval:** "Graduates, cheap. And a law that says foreign phones pay more at the border than his. He'll call it national pride. It's very good pride. It has quarterly targets."
3. **"Which would you choose, if it were your son?"**
   ↳ She puts her glass down.
   ↳ > **Helena Kaval:** "My son is in Veldra. He left two years ago. He answers my messages on Sundays, briefly, in Veldran, which he knows I find funny. So you'd have to ask somebody else's mother."

## son

*You think of your own mother, who has never once answered a message on a Sunday, because she calls instead.*

1. **Ask her about her son** `[kaval loyalty +1]`
   ↳ > "What does he do there?"
   ↳ > **Helena Kaval:** "Materials science. Batteries. Exactly the thing Ibira's rare earths are for. The irony isn't lost on me. It's just not much use."
2. **Keep it to business**
   ↳ She nods, as if grateful, and refills the glasses.
3. **Tell her about your mother**
   ↳ You tell her about Celia and the telephone. Kaval laughs — a real laugh, short and surprised, the first you've heard from her.
   ↳ > **Helena Kaval:** "Then she and I would get on terribly. Bring her to Tekoku one day. She'd hate it."

## close

1. **Leave Atiaiaba before the evening papers** `[flag: seen_education_briefing = true]`

→ END
