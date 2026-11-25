---
id: p3-celia-ill
chapter: 3
turn: 2
title: Katanaí General
kind: personal
location: katanai
token: personal
portraits: [celia, amanda, dara]
background: hospital-ward
---

⚙️ Personal arc (DECISIONS: the mother may die during term 1 — NOT yet). Celia is hospitalised with a diabetic complication. She recovers, more fragile. Choices cross into politics: privilege vs. public hospital (and the press), time spent (PT), Dara's ministry. If `celia_doctor` (chapter 2), the illness is caught earlier and is milder.

## opening

Amanda wakes you at five in the morning with the phone in her hand.

> **Amanda Troes:** "It's your mother. She's in Katanaí General. Ivone found her on the kitchen floor last night. She's conscious. The doctors say it's her diabetes, and an infection in her foot that nobody treated."

You fly to Katanaí before seven. Katanaí General is the largest public hospital in Ibicuí. Your mother is in a ward with eleven other women. A curtain has been put around her bed since the guards arrived.

> **Celia Vento:** "You came in the plane. Everyone will know."

> "Everyone already knows, Mum."

1. **"How do you feel?"**
   ↳ > **Celia Vento:** "Tired. Annoyed. Hungry. The food here is worse than mine."
2. **"Why didn't you tell anyone about your foot?"**
   ↳ > **Celia Vento:** "Because it was a foot."
3. **Hold her hand and say nothing**
   ↳ She falls asleep after a few minutes. Her hand stays in yours.

## doctor

The doctor in charge, Dr. Lúcia Ramos, is a young woman who has been on duty for twenty hours. She speaks to you in the corridor.

> **Lúcia Ramos:** "Your mother will recover, Madam President. The infection is under control. But her diabetes has been badly managed for years, and her heart isn't strong. She'll need regular care from now on, and she should not live alone."

Owin Dara arrives an hour later. He came on the first flight from the capital.

> **Owin Dara:** "I can have her moved to the military hospital in the capital today. Private room, the best specialists. Nobody would blame you."

1. **"Move her to the capital."** `[dara loyalty +1]` `[flag: celia_privileged = true]` `[flag: voice += 1]` `[approval -2 @ ibicui]`
   ↳ > **Celia Vento:** "I'm not going in a military plane like a general."
   ↳ She goes. She complains the whole way.
   ↳ *Any daughter would do it. That you are president doesn't change that.*
2. **"She stays here, like everyone else in this ward. Send a specialist here instead."** `[dara loyalty +1]` `[approval +2 @ ibicui]` `[flag: celia_public_ward = true]` `[flag: path_hold += 1]`
   ↳ > **Owin Dara:** "I'll send two. And I'll look at why this ward has one nurse for twelve women."
3. **"Ask her what she wants."** `[celia loyalty +2]` `[flag: celia_public_ward = true]`
   ↳ > **Celia Vento:** "I want to go home. Since you won't let me, I'll stay here. These women have been very kind."

## time

> **Amanda Troes:** "You have the Treasury on Thursday and a cabinet meeting on Friday. I can move them."

1. **"Move everything. I'm staying until she goes home."** `[cost: 2 PT]` `[celia loyalty +3]` `[amanda loyalty +1]` `[flag: stayed_with_celia = true]`
   ↳ You stay four days. You sleep in a chair. On the third day your mother asks the nurses to bring you a blanket, "because she won't ask".
2. **"I'll stay today and come back at the weekend."** `[cost: 1 PT]` `[celia loyalty +1]`
   ↳ > **Celia Vento:** "Go. The country is waiting. I'm only your mother."
3. **"I have to go back tonight. Amanda will stay with her."** `[amanda loyalty -1]` `[flag: path_harden += 1]`
   ↳ > **Amanda Troes:** "I'll stay. I'll call you every evening."
   ↳ Your mother says nothing when you leave.

## after

> **Amanda Troes:** "The doctor said she shouldn't live alone any more."

1. **"Then I'll ask her again to come to the capital."** `[flag: mother_asked_to_move = true]`
   ↳ `[if: flag.stayed_with_celia]` > **Celia Vento:** "For a few weeks. Only until my foot is better. Then I'm going home."
   ↳ `[if: !flag.stayed_with_celia]` > **Celia Vento:** "No. Ivone will look in on me."
2. **"I'll pay a carer to live with her in Vila Tamarin."** `[celia loyalty +1]` `[flag: celia_carer = true]`
   ↳ > **Celia Vento:** "A stranger in my house. Well. If she can cook."
3. **"Marco and the neighbours will help. I'll ask them."** `[marco loyalty +1]` `[flag: celia_neighbours = true]`
   ↳ Marco answers the phone on the first ring. "Of course," he says. "We already are."

## close

1. **Leave the hospital** `[flag: seen_celia_ill = true]` `[flag: celia_ill = true]`

→ END
