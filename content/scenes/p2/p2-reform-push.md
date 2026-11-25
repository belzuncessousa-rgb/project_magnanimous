---
id: p2-reform-push
chapter: 2
turn: 2
title: The Lessa Motion
kind: fixed
location: capital
token: congress
portraits: [mertens, lessa, livia]
background: vp-office
---

⚙️ Representation reform push (DECISIONS topic 4). Lessa has filed her motion; it will be voted in July (p2-reform-vote, closing of turn 3). Mertens conducts and counts. Lara sets the government's final position (reform_stance), and can free the PM bench to vote by conscience. OPP's redline is any electoral change.

## opening

It is May. Senator Lessa's motion was formally filed in Congress last week. It has the signatures of every deputy from Tekoku, the Civic Alliance, the National Front and about half of the Capital Party.

Mertens has asked to see you about it, with Livia.

> **Caio Mertens:** "Madam President. The motion goes to a vote in July. Congress votes on it because it changes the federal pact; if it passes, the Senate itself has to ratify it, and the Senate will. Lessa has made sure of that."

> **Caio Mertens:** "So the decision is in Congress, and the government's position will decide it. I'd like to know what that position is."

→ count

## count

> **Livia Harvan:** "Here is how the parties stand today. The Civic Alliance and the National Front are for. The Capital Party is split: the bankers are for, the farmers of Tapira are against. The OPP is against. It's one of our two rules."

> **Caio Mertens:** "Your own bench is the difficulty. Eleven of the PM's twenty-four deputies are from Mognagna and Ibira. Those states would lose senators. They'll vote against unless you ask them very firmly, and maybe even then."

> **Caio Mertens:** "The Communist Vanguard is against: they say it takes power from the poor regions. The Faith and Family Front doesn't care much either way."

1. **"What happens if it passes?"** `[once]` `→ count-q`
   ↳ > **Caio Mertens:** "Ibicuí would get about six senators and Tekoku three. Ibira, Tapira and Mognagna would get one or two each. Over time, more federal money would follow the population."
2. **"What does the OPP do if I support it?"** `[once]` `→ count-q`
   ↳ > **Caio Mertens:** "Odel will vote against, and he'll make the next price higher. He won't leave the coalition over it. Probably."
   ↳ `[if: compass.STRUCT >= 4]` > **Caio Mertens:** "And Odel asked me to mention something else. Your government likes a strong state. He says it reminds him of governments he did business with before the democracy. He meant it as a compliment. I'm passing it on as a warning."
3. **"Let's talk about what I'll do."** `→ position`

## count-q

1. **"What happens if it fails?"** `[once]` `→ count-q`
   ↳ > **Livia Harvan:** "Lessa will try again, with more noise. Tekoku will feel ignored again. The National Front will use it."
2. **"And Lessa herself?"** `[once]` `→ count-q`
   ↳ > **Caio Mertens:** "She's outside. She asked for five minutes. I said I'd ask you."
3. **"Let's talk about what I'll do."** `→ position`

## position | The Government's Position

1. **"The government supports the motion. One person, one weight."** `[flag: reform_stance = 1]` `[approval +3 @ ibicui, tekoku]` `[approval -4 @ mognagna, ibira]` `[opp opinion -2]` `[mertens loyalty -1]` `[lessa loyalty +2]` `[cv opinion -1]` `[-1 STRUCT]`
   ↳ > **Caio Mertens:** "Then I'll count for it, even though my party will vote against. That's my job."
2. **"The government opposes it. The poor regions need their senators."** `[flag: reform_stance = 3]` `[approval +3 @ mognagna, ibira]` `[approval -4 @ ibicui, tekoku]` `[opp opinion +1]` `[lessa loyalty -2]` `[nf opinion -1]` `[+1 WELF]`
   ↳ > **Caio Mertens:** "Then it will fail. Lessa will make it a campaign."
3. **"We'll propose an alternative: more powers and revenue for the states, and leave the Senate as it is."** `[flag: reform_stance = 4]` `[flag: decentralisation_seed = true]` `[livia loyalty +1]` `[lessa loyalty -1]` `[approval +1 @ all]`
   ↳ > **Caio Mertens:** "A substitute bill. It's an old manoeuvre, but a good one. The OPP can live with it. Lessa will call it a trick."
   ↳ > **Livia Harvan:** "The governors will like it. All five of them, for different reasons."
4. **"The government takes no position. Each deputy votes as they see fit."** `[flag: reform_stance = 2]` `[flag: reform_bench_freed = true]` `[pm opinion +1]` `[lessa loyalty +1]`
   ↳ > **Caio Mertens:** "A free vote. It looks democratic and it lets your deputies go home safe. It probably means the motion passes narrowly, or fails narrowly."

## lessa

> **Livia Harvan:** "Senator Lessa is still waiting outside."

1. **"Let her in."** `→ lessa-in`
2. **"Not today. Tell her she'll have the government's position in writing."** `[lessa loyalty -1]` `→ close`

## lessa-in

Lessa comes in, nods to Mertens and does not sit down.

> **Augusta Lessa:** "I'll be quick. I hear you've decided. I'd like to hear it from you."

1. **Tell her**
   ↳ `[if: flag.reform_stance == 1]` > **Augusta Lessa:** "Thank you. I'll need your deputies, not only your words. Your bench is the whole vote."
   ↳ `[if: flag.reform_stance == 3]` > **Augusta Lessa:** "Then I'll lose in July, and I'll lose loudly. Ibicuí will remember which of its daughters voted against it."
   ↳ `[if: flag.reform_stance == 4]` > **Augusta Lessa:** "A substitute. You'll give the states money so they stop asking for seats. It's clever. I'll vote against it, and I'll tell everyone why."
   ↳ `[if: flag.reform_stance == 2]` > **Augusta Lessa:** "A free vote. Very well. It's more than any government has given me."

→ close

## close

1. **End the meeting** `[flag: seen_reform_push = true]`

→ END
