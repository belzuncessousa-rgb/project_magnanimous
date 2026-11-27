---
id: p3-celia-ill
title: Katanaí General
chapter: 3
turn: 2
location: katanai
portraits: [celia, amanda, dara]
background: hospital-ward
---

*Play after confirmed admission. A dizzy spell at church, a missed visit, or a disagreement with Celia cannot by itself trigger hospitalization. The hospital visit may be declined. Preserve the admission as an independent fact and establish the care and contact choices separately. The Chapter 2 clinic result is a separate provisional callback and never establishes a diagnosis or admission. A residence offer is not a move until both parents consent and arrangements are confirmed. Proposed `celia_move_offer_status` values: 0 no offer, 1 declined in Chapter 2, 2 under discussion after the hospital visit, 3 two-week stay confirmed and begun, 4 withdrawn. Proposed `celia_move_parent_consent` and `celia_residence_stay_feasible` gate the final choice; they require both parents' consent, a suitable room, and a care schedule that remains available. Proposed `celia_call_status` values: 0 none, 1 promised, 2 completed, 3 missed before the family callback. Call completion or a missed date updates this state; making the promise does not count as keeping it. A specialist request must resolve through a separate capacity and patient-impact report; Lara's instruction alone does not prove it was carried out. Proposed `celia_care_plan_status` separates a request from a confirmed appointment and an accepted private arrangement. Do not infer one from `celia_private_care_intent` or `celia_public_ward`. All values and follow-up dispatch are provisional.*

## arrival

Amanda calls you shortly before the morning appointments begin.

> **Amanda:** Your father called the residence. Your mother is at Katanaí General. She's conscious, and he's with her. He asked me to let you know.

1. **“Make time for me to go.”** `→ ward`
2. **“Put me through to the ward.”** `→ telephone`
3. **“Ask my father to call when there's news.”** `→ leave-message`

## telephone

Your father answers from a chair beside the bed. He asks you to wait while Celia puts her glasses down and takes the telephone.

> **Celia:** I can hear you. Your father keeps holding the phone too far away. They want me to stay until they've read the results.

1. **“Would you like me to come?”** `→ ward`
   ↳ She tells you when visiting hours begin. “Bring him something to read if you do. He finished the paper before breakfast.”
2. **“I'll call again tomorrow.”** `[flag: celia_call_promised = true]` `[flag: celia_call_status = 1]` `→ close`
   ↳ She asks whether you will call before or after lunch.
3. **“Ask Dad to tell me when the doctors have read them.”** `→ close`
   ↳ She passes him the telephone so he can hear the request himself.

## leave-message

Amanda writes down the ward number.

> **Amanda:** I'll ask him to ring me directly. I'll give him the number for your office too.

→ close

## ward

At the hospital, you find your father sitting beside Celia's bed. He stands when you enter and gives up his chair.

Celia is watching the television mounted on the opposite wall.

> **Celia:** I told him there was no need to call you. He doesn't listen.

1. **"How are you feeling?"** `→ conversation`
2. **Take her hand.** `→ conversation`
3. **Ask your father what the doctors have said.** `→ conversation`
4. **"Did the clinic manage to see you earlier?"** `[show if: flag.celia_earlier_appointment_requested]` `[once]` `→ conversation`
   ↳ `[if: flag.celia_clinic_result == 1]` > **Celia:** "They found a cancellation. I went in. They asked me to come back if it happened again."
   ↳ `[if: flag.celia_clinic_result == 2]` > **Celia:** "There wasn't an earlier appointment. I kept the one they gave me."
   ↳ `[if: flag.celia_clinic_result == 3]` > **Celia:** "They offered a time, but I couldn't get there that day. I'll talk to them again when I'm home."
   ↳ `[if: flag.celia_clinic_result == 0]` > **Celia:** "I didn't get to the clinic before this. We can talk about it when I go home."

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
3. **Offer your parents a temporary stay at the presidential residence.** `[flag: celia_move_offer_status = 2]` `→ residence`
4. **Ask Dara to arrange preferential access to a specialist.** `[flag: celia_privileged_intent = true]` `→ dara`

## residence

Celia looks at your father.

> **Celia:** We will talk about it. I don't want him travelling all the way back here every time he needs something from the house.

→ time

## dara

Dara speaks with you in the corridor.

> **Dara:** I can ask whether an appropriate specialist is available. If you are asking me to change the order in which patients are seen, we will have to discuss what that means for the others waiting.

1. **"Arrange it through the usual clinical process."** `→ time`
2. **"Ask whether she can be seen sooner, even if another patient has to wait."** `[flag: celia_preference_requested = true]` `→ time`

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
2. **"I'll call you tomorrow."** `[flag: celia_call_promised = true]` `[flag: celia_call_status = 1]` `→ close`

## close

1. **Return to your appointments.** `[flag: seen_celia_ill = true]` `[flag: celia_ill = true]` `→ END`

Only set the hospital-visit state on the ward route. The legacy illness flag records the confirmed event. It carries no diagnosis or permanent decline. At follow-up, distinguish a request, an approved care arrangement and the appointment that actually occurred.


⚙️ Provisional integration: Celia's Chapter 2 clinic request is not proof that an earlier appointment occurred. If the appointment result is available, the return conversation must use that result; otherwise omit this exchange. Proposed `celia_clinic_result`: 0 no visit before admission, 1 attended earlier appointment, 2 no earlier slot, 3 offered but unable to attend. It does not encode a diagnosis or change admission eligibility. This key is not live.


## The call from the ward

*Separate next-day contact while Celia remains admitted, only if Lara promised to call and the agreed time arrives. If Celia has gone home, use Call Celia in the free-action list. The call is optional; a promise is not fulfilled until the call connects.*

Amanda checks whether the ward can take the call before transferring it. Celia answers after a moment.

> **Celia:** "You called. They haven't finished the tests yet. Your father has gone home to get a clean shirt."

1. **"How are you feeling today?"** `[flag: celia_call_status = 2]`
   ↳ Celia answers from her current state. If there is no new medical result, she does not invent one.
2. **"Did the doctors give you a time for the next update?"** `[flag: celia_call_status = 2]`
   ↳ Celia tells you only the time the ward has confirmed. If none is set, she says she will ask at the next visit.
3. **"I wanted you to know I was thinking of you. I'll let you rest."** `[flag: celia_call_status = 2]`
   ↳ She says goodnight and asks you to pass a message to her father if you speak to him.

If the agreed time passes and Lara does not call, set `celia_call_status = 3`. The missed call can be raised later only if Celia chooses to mention it. A call does not change admission, diagnosis or treatment.

→ END
