---
id: p3-celia-ill
title: Katanaí General
chapter: 3
turn: 2
location: katanai
portraits: [celia, amanda, dara]
background: hospital-ward
---

## arrival

Amanda calls you shortly before the morning appointments begin.

> **Amanda:** Your father called the residence. Your mother is at Katanaí General. She's conscious, and he's with her. He asked me to let you know.

At the hospital, you find your father sitting beside Celia's bed. He stands when you enter and gives up his chair.

Celia is watching the television mounted on the opposite wall.

> **Celia:** I told him there was no need to call you. He doesn't listen.

1. **"How are you feeling?"** `→ conversation`
2. **Take her hand.** `→ conversation`
3. **Ask your father what the doctors have said.** `→ conversation`

## conversation

> **Celia:** Better than yesterday. They keep telling me I need to rest, and then somebody comes in to ask me another question.

Your father looks at her.

> **Father:** They are trying to find out what is wrong, Celia.

She gives him a small smile.

A doctor comes to the bed and introduces herself. She explains that Celia is stable, but that the medical team wants to complete several assessments before she goes home.

1. **"What will she need when she leaves?"** `→ care`
2. **"Could she receive treatment closer to our residence?"** `→ transfer`
3. **"Let's ask her what she would prefer."** `→ preference`

## care

> **Doctor:** We expect her to need follow-up appointments. Once the assessments are complete, we'll be able to discuss the precise arrangements with your parents.

→ preference

## transfer

> **Doctor:** A transfer may be possible if there is a clinical reason or if she wishes to continue her care elsewhere. I would need to discuss the available options with her.

→ preference

## preference

> **Celia:** I would like to go home when they let me. Your father has already brought half the house here.

Your father looks down at a bag containing several books, a cardigan and a flask.

1. **Offer to pay privately for any additional care she agrees to.** `[flag: celia_private_care_intent = true]` `→ time`
2. **Ask the medical team to arrange appropriate follow-up through the public system.** `[flag: celia_public_ward = true]` `→ time`
3. **Offer your parents a temporary stay at the presidential residence.** `[flag: mother_asked_to_move = true]` `→ residence`
4. **Ask Dara to arrange preferential access to a specialist.** `[flag: celia_privileged_intent = true]` `→ dara`

## residence

Celia looks at your father.

> **Celia:** We will talk about it. I don't want him travelling all the way back here every time he needs something from the house.

→ time

## dara

Dara speaks with you in the corridor.

> **Dara:** I can ask whether an appropriate specialist is available. If you are asking me to change the order in which patients are seen, we will have to discuss what that means for the others waiting.

1. **"Arrange it through the usual clinical process."** `→ time`
2. **"I want her seen as soon as possible. Make the necessary arrangements."** `[flag: celia_preference_requested = true]` `→ time`

## time

Amanda waits until the doctor and your father have stepped away.

> **Amanda:** We can rearrange some of your appointments. Let me know how much time you want to set aside.

1. **Stay for the remainder of the day.** `[flag: stayed_with_celia = true]` `→ stay`
2. **Spend a little longer with your parents, then return to work.** `→ goodbye`
3. **Ask Amanda to help arrange the next visit and return to the capital.** `→ goodbye`

## stay

Later, your father goes home to collect some clothes. Celia asks you to change the television channel. A repeat of an old comedy is playing.

For a while, the two of you watch it together.

→ goodbye

## goodbye

Celia raises a hand as you prepare to leave.

> **Celia:** Tell your brother he still has my baking dish. He said he would bring it back two weeks ago.

1. **"I'll remind him."** `→ close`
2. **"I'll call you tomorrow."** `[flag: celia_call_promised = true]` `→ close`

## close

1. **Leave the ward.** `[flag: seen_celia_ill = true]` `[flag: celia_ill = true]` `→ END`
