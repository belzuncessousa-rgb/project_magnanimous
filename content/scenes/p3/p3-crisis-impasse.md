---
id: p3-crisis-impasse
chapter: 3
title: The Blocked Congress
kind: crisis
location: capital
token: crisis
portraits: [mertens, livia, lessa]
background: congress-gallery
---

⚙️ Crisis (content/crises.json `impasse`): the representation impasse. If the reform failed (or Lessa was refused), Lessa's bloc obstructs Congress; if the reform passed, the losers (PM deputies from Mognagna and Ibira, the OPP) obstruct its ratification. Routed by reform_result. Sets impasse_outcome.

## opening

In October, Congress stops working. Every vote is delayed by procedural motions, every session runs out of time, and the budget review for next year cannot be scheduled.

Mertens comes to see you with Livia.

1. **Hear the situation** `[show if: !(flag.reform_result == 1 || flag.reform_result == 2)]` `→ blocked`
2. **Hear the situation** `[show if: flag.reform_result == 1 || flag.reform_result == 2]` `→ backlash`

## blocked

> **Caio Mertens:** "Lessa's bloc is behind it: the Civic Alliance, the National Front, the Tekoku deputies and half of the Capital Party. Fifty seats, more or less. Not enough to pass anything. Enough to stop everything."

> **Livia Harvan:** "Their demand is simple: a new vote on the Senate before the end of the year. Lessa says she'll keep Congress closed until she gets one."

> **Caio Mertens:** "In Atiaiaba there are demonstrations every weekend. Solano speaks at most of them."

1. **"Give her the new vote, and the government supports her this time."** `[flag: impasse_outcome = 1]` `[flag: reform_second_vote = true]` `[approval +4 @ tekoku, ibicui]` `[approval -4 @ mognagna, ibira]` `[opp opinion -2]` `[lessa loyalty +3]` `[pm opinion -1]`
   ↳ > **Caio Mertens:** "Then it will pass in December. The OPP will remember the date."
2. **"Offer a constitutional commission to study representation for a year."** `[cost: 2 IPI]` `[flag: impasse_outcome = 2]` `[lessa loyalty +1]` `[stability +2 @ tekoku]`
   ↳ > **Livia Harvan:** "She'll accept, because it's a victory she can announce. She'll also know it's a delay."
3. **"Wait them out. The public will tire of a closed Congress before we do."** `[flag: impasse_outcome = 3]` `[stability -4 @ tekoku]` `[approval -3 @ tekoku]` `[nf opinion -1]` `[flag: path_harden += 1]`
   ↳ > **Caio Mertens:** "Possibly. Possibly the public will blame whoever is president."
4. **"Ask Odel what it would cost for the OPP to break the obstruction with procedure."** `[cost: 2 IPI, 10 FC]` `[flag: impasse_outcome = 4]` `[opp opinion +2]` `[flag: corruption += 1]` `[flag: voice += 1]`
   ↳ > **Caio Mertens:** "He'll ask for the Ports ministry if we ever create one. And a few things before that. I'll arrange it."
   ↳ *Congress has to work. How it is made to work is a detail.*

→ close

## backlash

> **Caio Mertens:** "The reform passed, and now the losers are fighting back. The PM deputies from Mognagna and Ibira are voting with the OPP to block the regulations that would put it into effect. Pelan Avros is leading them, quietly."

> **Livia Harvan:** "Governor Porper says the poor states will 'never accept being silenced'. There were demonstrations in Sugar Bay."

1. **"Compensate the poorer states: a regional development fund, written into law."** `[cost: 20 FC]` `[flag: impasse_outcome = 5]` `[approval +4 @ mognagna, ibira]` `[pm opinion +2]` `[porper loyalty +2]`
   ↳ > **Caio Mertens:** "That will bring most of your deputies back. Avros will claim the credit."
2. **"Talk to Avros directly. Whatever he wants."** `[flag: impasse_outcome = 6]` `[avros loyalty +2]` `[pm opinion +2]` `[flag: corruption += 1]` `[flag: shielded_avros = true]` `[flag: voice += 1]`
   ↳ > **Livia Harvan:** "What he wants is for Renata's department to slow down. You should know that before you call him."
   ↳ *Party unity is worth something. Renata can take a little longer.*
3. **"The reform is law. I won't buy it a second time."** `[flag: impasse_outcome = 7]` `[pm opinion -2]` `[approval -3 @ mognagna, ibira]` `[lessa loyalty +1]` `[flag: path_hold += 1]`
   ↳ > **Caio Mertens:** "Then it will take months. The courts will have to settle it."

→ close

## close

1. **End the meeting** `[flag: seen_crisis_impasse = true]`

→ END
