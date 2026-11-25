---
id: p1-avros-bench
chapter: 1
turn: 3
title: The Bench
kind: conditional
location: capital
token: congress
portraits: [avros]
background: congress-office
---

⚙️ Lara leads the PM as a party, but Pelan Avros leads its 24 deputies in Congress. He wants the deputies' district funds ("amendments") restored. Reacts to Lara's position on the representation reform and to the Corvel contract. Sets up the chapter-2 votes.

## opening

Pelan Avros's office is on the ground floor of Congress, next to the cafeteria. There are three telephones on his desk and a framed photograph of former President Tercilio Luz opening a hospital, with a younger Avros standing behind him.

Avros is in his sixties, from Mognagna, heavy-set and friendly. He has been a deputy for twenty years and has led the PM's deputies for eight of them. He decides, in practice, how the party votes day to day. He embraces you at the door.

> **Pelan Avros:** "Our President. Sit down. You look tired. Are they feeding you?"

> "My mother asked the same thing."

> **Pelan Avros:** "Your mother is a wise woman. She voted for us before anyone did."

→ bench

## bench

> **Pelan Avros:** "Let me tell you where the bench stands. Twenty-four deputies, all loyal to you. They campaigned with your face on their posters."

> **Pelan Avros:** "Every year, each deputy can direct a small part of the budget to projects in their own district: a health post, a bridge, a sports ground. We call them amendments. The last government froze them. My deputies would like them back. Without them, it's hard for them to go home and face their voters."

→ questions

## questions

1. **"How much money are we talking about?"** `[once]` `→ questions`
   ↳ > **Pelan Avros:** "Not much, divided among a hundred deputies. A small part of the budget. But for a town in the interior, a new bridge is everything."
2. **"Do the other parties get them too?"** `[once]` `→ questions`
   ↳ > **Pelan Avros:** "All hundred deputies. That's why it's popular. Mertens will tell you the OPP cares about them more than about any ministry."
3. **"I've heard some of that money never reaches the bridge."** `[once]` `→ questions`
   ↳ > **Pelan Avros:** "Some of it. In every party. Less than people say."
4. **"What do you want from me?"** `→ decision`

## decision

> **Pelan Avros:** "Just a yes. The details are Fontes's problem."

1. **"The amendments come back, but every one is published."** `[pm opinion +1]` `[avros loyalty +1]` `[flag: amendments = 1]` `[flag: path_hold += 1]`
   ↳ > **Pelan Avros:** "Published. Fine. The deputies will be happy to see their bridges in the newspapers."
2. **"They come back. Quietly. Tell the deputies it was my decision."** `[pm opinion +3]` `[avros loyalty +3]` `[gain: 1 IPI]` `[flag: amendments = 2]` `[flag: corruption += 1]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Pelan Avros:** "Thank you, Lara. They won't forget."
   ↳ *A bridge is still a bridge, even if some of the money goes elsewhere. The towns need them.*
3. **"No amendments this year. The money goes to the great project."** `[pm opinion -2]` `[avros loyalty -3]` `[flag: amendments = 3]` `[flag: path_harden += 1]`
   ↳ > **Pelan Avros:** "Then I hope the project is a good one. Twenty-four deputies will have to explain it at home."
4. **"Ask me again after the budget."** `[avros loyalty -1]` `[flag: amendments = 4]`
   ↳ > **Pelan Avros:** "The last government said that too. But all right."

## lessa

> **Pelan Avros:** "And Senator Lessa's proposal."

1. **"What does the bench think of it?"**
   ↳ `[if: flag.reform_stance == 1]` > **Pelan Avros:** "Eleven of my deputies are from Mognagna and Ibira. They read that you're 'open' to it. They are not happy, Lara."
   ↳ `[if: flag.reform_stance == 2]` > **Pelan Avros:** "They were glad to hear you're sceptical. Lessa will make you pay for it in Ibicuí."
   ↳ `[if: flag.reform_stance == 3]` > **Pelan Avros:** "They're relieved. Tekoku will be angry, but Tekoku never voted for us."
   ↳ `[if: flag.reform_stance == 4]` > **Pelan Avros:** "More powers for the states instead. The governors will like it. Getting the governors to agree on anything is another matter."
   ↳ `[if: !flag.lessa_met]` > **Pelan Avros:** "You haven't met her yet? Be careful when you do. She's very good."
2. **"Will the bench hold, whatever I decide?"**
   ↳ > **Pelan Avros:** "The bench holds when the deputies can go home with something to show. That's all a bench is."

## corvel

He leans back in his chair, and stops smiling.

> **Pelan Avros:** "One more thing. I hear someone at the Treasury is reading Tercilio's contracts for the sanitation works."

> **Pelan Avros:** "Those works were the best thing this party ever did for the peripheries. Some people made money from them, yes. But a lot of families got toilets for the first time. Be careful which part of that story you tell."

1. **"I'll tell all of it, if it comes to that."** `[avros loyalty -2]` `[avros suspicion +5]` `[flag: path_hold += 1]` `[flag: seen_avros_bench = true]`
   ↳ > **Pelan Avros:** "Then it will be an interesting year."
   ↳ He walks you to the door with his arm around your shoulders, past a photographer in the corridor.
2. **"Nobody is telling any story, Pelan."** `[avros loyalty +2]` `[flag: voice += 1]` `[flag: shielded_avros = true]` `[flag: seen_avros_bench = true]`
   ↳ > **Pelan Avros:** "That's all I wanted to hear."
   ↳ *You haven't promised him anything specific.*
3. **"If you're in those contracts, Pelan, get out before Renata gets in."** `[avros loyalty -1]` `[flag: warned_avros = true]` `[flag: path_harden += 1]` `[flag: seen_avros_bench = true]`
   ↳ He looks at you for a long moment, then laughs loudly.
   ↳ > **Pelan Avros:** "You've changed already, Lara. I'll tell Tercilio."

→ END
