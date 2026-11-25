---
id: p2-celia
chapter: 2
turn: 2
title: Sunday in Vila Tamarin
kind: personal
location: vila-tamarin
token: personal
portraits: [celia, marco, amanda]
background: tamarin-kitchen
---

⚙️ Personal arc beat (chapter 2). Celia's health shows a first sign (she fainted at church), a Tabernacle pastor wants a photograph with the President's mother (FFF courts her), Marco reports on the slopes. Playing is free; staying longer costs PT if monthly visits were promised. Seeds the chapter-3 illness.

## opening

It is a Sunday in May. You visit Vila Tamarin without the press. Amanda comes with you.

Your mother is sitting down when you arrive, which is unusual. Her ankles are swollen. A neighbour, Ivone, is in the kitchen making coffee.

> **Celia Vento:** "Don't look at me like that. I'm fine."

> **Ivone:** "She fainted at church on Wednesday. In the middle of the hymn."

> **Celia Vento:** "It was hot. Everyone was hot."

1. **"Have you seen a doctor?"**
   ↳ > **Celia Vento:** "The clinic gave me an appointment for August."
2. **"Are you taking your insulin?"**
   ↳ > **Celia Vento:** "Mostly."
3. **Sit beside her and say nothing for a while**
   ↳ She takes your hand and pats it, as if you were the one who fainted.

## health

1. **"I'll have a doctor come to the house this week."** `[celia loyalty -1]` `[flag: celia_doctor = true]`
   ↳ > **Celia Vento:** "A private doctor, sent by the President, to Vila Tamarin. Everyone will talk."
   ↳ > "Let them."
2. **"Then you'll go to the August appointment, like everyone else."** `[celia loyalty +1]` `[flag: path_hold += 1]`
   ↳ > **Celia Vento:** "Good. I don't want special treatment."
   ↳ Amanda writes the date down.
3. **"Come and stay in the capital for a few weeks. Just until you're better."** `[celia loyalty -1]` `[flag: mother_asked_to_move = true]`
   ↳ > **Celia Vento:** "No."

## pastor

> **Celia Vento:** "One more thing. Pastor Ezequiel from the Tabernacle wants to take a photograph with me for the church newsletter. He's been very kind since I fainted. He came every day."

> **Amanda Troes:** "The Faith and Family Front will print it everywhere."

1. **"It's your church and your decision, Mum."** `[fff opinion +1]` `[celia loyalty +1]` `[flag: pastor_photo = true]`
   ↳ > **Celia Vento:** "Then I'll do it. He's a good man. He sings terribly."
2. **"Please don't. They'll use it against me."** `[celia loyalty -2]` `[flag: pastor_photo_refused = true]`
   ↳ > **Celia Vento:** "Everything is about you now, is it?"
   ↳ She doesn't say anything else for a while.
3. **"Tell him the President will visit his church herself one day."** `[fff opinion +2]` `[+1 RELIG]` `[flag: promised_tabernacle_visit = true]` `[flag: voice += 1]`
   ↳ > **Celia Vento:** "He'll faint too."
   ↳ *Pastor Muul's deputies have nine votes. A visit to a church costs nothing.*

## marco

Marco comes in at four, with bread from the kitchen.

> **Marco Prestes:** "The slopes are fuller than in January. More families from the sertão every week."

1. **"What are people saying about the government?"**
   ↳ `[if: flag.initiative.labor_compact]` > **Marco Prestes:** "They heard about the talks with the unions. They want to see what comes of them."
   ↳ `[if: !flag.initiative.labor_compact]` > **Marco Prestes:** "That the budget had money for many things. Not much for them."
   ↳ `[if: flag.great_project == 6]` > **Marco Prestes:** "They can see the pipe moving, at least. Slowly."
   ↳ `[if: !(flag.great_project == 6)]` > **Marco Prestes:** "The pipe is still where it was."
2. **"How long do I have?"**
   ↳ > **Marco Prestes:** "Until the cold weather, maybe. People put up with more in summer."

## leaving

It is getting dark.

1. **Stay for dinner** `[cost: 1 PT]` `[celia loyalty +2]` `[marco loyalty +1]` `[flag: stayed_for_dinner = true]` `[show if: flag.mother_visits_promised]`
   ↳ You stay until nine. Your mother eats more than she has all week, Ivone says.
2. **Stay for dinner** `[celia loyalty +2]` `[flag: stayed_for_dinner = true]` `[show if: !flag.mother_visits_promised]`
   ↳ You stay until nine. Your mother talks about your father for the first time in years.
3. **Leave before dinner. There's work in the morning.** `[celia loyalty -1]` `[flag: path_harden += 1]`
   ↳ > **Celia Vento:** "Go. Presidents have work."

## close

1. **Go down the hill** `[flag: seen_celia_may = true]`

→ END
