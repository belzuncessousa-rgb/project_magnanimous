---
id: p2-reform-vote
chapter: 2
turn: 3
title: The Vote
kind: fixed
location: capital
token: congress
when: "flag.seen_reform_push"
portraits: [mertens, livia, lessa, amanda]
background: congress-gallery
---

⚙️ Closing scene of chapter 2. The Lessa motion (bill senate_reform) or, if the government proposed the substitute (reform_stance 4), the Regional Powers Act (bill decentralisation_pact), goes to Congress. `[vote: …]` opens the vote screen (whip deals per party). Outcome flags: vote.<bill> = passed | watered | failed. Then Amanda closes the chapter (personal arc).

## opening

It is the second week of July. Congress meets in a long semicircular chamber under a glass dome. You watch from the presidential box in the gallery, with Mertens and Livia. Below you, the hundred deputies are taking their seats. Senator Lessa is sitting in the public gallery opposite.

> **Caio Mertens:** "The vote is in about an hour. I have a count, and there's still time to talk to some benches. Each conversation will cost us something. The OPP's price, as always, is the highest."

1. **Go through the count with Mertens** `[show if: !(flag.reform_stance == 4)]` `[vote: senate_reform]` `→ result-senate`
2. **Go through the count with Mertens** `[show if: flag.reform_stance == 4]` `[vote: decentralisation_pact]` `→ result-regional`

## result-senate | The Result

The President of Congress reads the result. There is shouting from the Tekoku benches, then applause, or silence, depending on where you look.

1. **The motion passes** `[show if: flag.vote.senate_reform == 'passed']` `[approval +4 @ ibicui, tekoku]` `[approval -5 @ mognagna, ibira, tapira]` `[opp opinion -2]` `[mertens loyalty -1]` `[lessa loyalty +3]` `[flag: reform_result = 1]` `→ after`
   ↳ Lessa stands in the gallery and looks across at your box. She nods once.
   ↳ > **Caio Mertens:** "It goes to the Senate now. It will pass there. Odel will call me tonight."
2. **The motion passes in a weakened form** `[show if: flag.vote.senate_reform == 'watered']` `[approval +2 @ ibicui, tekoku]` `[approval -2 @ mognagna, ibira]` `[opp opinion -1]` `[flag: reform_result = 2]` `→ after`
   ↳ > **Caio Mertens:** "An amendment saved it: two more senators for Ibicuí and one for Tekoku, and nobody loses any. Everyone will say they won. Lessa will say she was robbed."
3. **The motion fails** `[show if: flag.vote.senate_reform == 'failed']` `[approval -3 @ ibicui, tekoku]` `[approval +2 @ mognagna, ibira]` `[lessa loyalty -1]` `[nf opinion -1]` `[flag: reform_result = 3]` `[flag: reform_failed = true]` `→ after`
   ↳ Lessa leaves the gallery before the result is read out in full.
   ↳ > **Livia Harvan:** "She'll be on television in an hour. She'll say this isn't over."

## result-regional | The Result

1. **The Regional Powers Act passes** `[show if: flag.vote.decentralisation_pact == 'passed']` `[approval +2 @ all]` `[lessa loyalty -1]` `[opp opinion +1]` `[flag: reform_result = 4]` `→ after`
   ↳ > **Caio Mertens:** "The governors will be calling to thank you all week. Lessa will call it a bribe to the states. She'll also have nothing left to campaign on, for a while."
2. **It passes in a weakened form** `[show if: flag.vote.decentralisation_pact == 'watered']` `[approval +1 @ all]` `[flag: reform_result = 5]` `→ after`
   ↳ > **Caio Mertens:** "They kept the powers and cut the money. It's a start."
3. **It fails** `[show if: flag.vote.decentralisation_pact == 'failed']` `[approval -2 @ ibicui, tekoku]` `[flag: reform_result = 6]` `[flag: reform_failed = true]` `→ after`
   ↳ > **Livia Harvan:** "Lessa will refile her own motion in the autumn. Now nobody can say the government offered an alternative that worked."

## after

That night you have dinner at the Residence with Amanda. It is the first evening in weeks with no meetings after eight.

She has a new notebook. The first one is full.

> **Amanda Troes:** "Six months. Do you want to hear what I've written down, or only the totals?"

1. **"The totals."**
   ↳ `[if: flag.path_hold >= flag.path_harden && flag.path_hold >= flag.path_corrupt]` > **Amanda Troes:** "You've said no more often than yes. It's cost you some friends. You've kept most of your promises."
   ↳ `[if: flag.path_harden > flag.path_hold && flag.path_harden >= flag.path_corrupt]` > **Amanda Troes:** "You've made decisions quickly and stood by them. You've stopped asking me what I think before you make them."
   ↳ `[if: flag.path_corrupt > flag.path_hold && flag.path_corrupt > flag.path_harden]` > **Amanda Troes:** "You've made a lot of arrangements. Each one has a good reason in my notebook. I wrote the reasons down as you gave them."
2. **"Read me something specific."**
   ↳ `[if: flag.promised_no_hunger]` > **Amanda Troes:** "January, Sugar Bay. 'Nobody in Mognagna will go hungry while I'm in office.'"
   ↳ `[if: flag.mother_visits_promised]` > **Amanda Troes:** "January, the first night. 'Every month, Mum.'"
   ↳ `[if: flag.promised_on_time]` > **Amanda Troes:** "January, the Blue Room. 'On time and on budget.'"
   ↳ > **Amanda Troes:** "I'll read you the rest at the end of the year."
3. **"Not tonight, Amanda."**
   ↳ She puts the notebook back in her bag.

## close

1. **Go to bed** `[flag: seen_reform_vote = true]` `[flag: chapter2_complete = true]`
   ↳ `[if: flag.voice >= 4]` *Before you sleep, you go over the six months. Each concession had a reason. You can list them. You notice that you can list them very quickly now.*

→ END
