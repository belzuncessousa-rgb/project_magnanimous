---
id: p1-avros-bench
chapter: 1
turn: 3
title: The Bench
kind: conditional
location: capital
portraits: [avros]
background: congress-office
---

⚙️ Lara is PM party leader but not bench leader. Pelan Avros (Statist wing, corruption scheme with OPP) runs the 24 PM deputies. He wants the bench's amendments (district money). Reacts to the representation stance and to the Corvel file. Sets up the ch2 votes.

## opening

Pelan Avros' office in Congress is on the ground floor, by the cafeteria, because, he says, a bench leader should be where the deputies eat. There are three telephones on his desk and a framed photograph of Tercilio Luz cutting a ribbon, with a much younger Avros at the edge of the frame, holding the scissors' box.

He embraces you at the door. He smells of good soap and cigarettes he says he gave up.

> **Pelan Avros:** "Our candidate. Our President. Sit, sit. You look tired. They're not feeding you."

> "My mother said the same thing."

> **Pelan Avros:** "Your mother is a wise woman. She voted for us forty years before it was fashionable."

→ bench

## bench

> **Pelan Avros:** "The bench loves you, Lara. Twenty-four deputies, every one of them campaigned with your face on the van."

> **Pelan Avros:** "The bench also has rent. Every year, each deputy directs a little money to his district. A health post, a bridge, a football pitch. Amendments. The Castelar people froze them. My deputies would like them unfrozen. They'd like to be able to go home."

> **Pelan Avros:** "It's not a bribe. It's a bridge. Sometimes it's literally a bridge."

1. **"The bench gets its amendments. Every one published, every coin traceable."** `[pm opinion +1]` `[avros loyalty +1]` `[flag: amendments = 1]` `[flag: path_hold += 1]`
   ↳ > **Pelan Avros:** "Published. Of course. The deputies will love seeing their bridges in the newspaper."
   ↳ He says it warmly. Two of his three telephones begin, almost at once, to ring.
2. **"The bench gets its amendments. Quietly. Tell them it came from me."** `[pm opinion +3]` `[avros loyalty +3]` `[gain: 1 IPI]` `[flag: amendments = 2]` `[flag: corruption += 1]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Pelan Avros:** "That's the President I campaigned for."
   ↳ *A bridge is a bridge. A health post is a health post. If a little of it ends up in the wrong pocket, the bridge is still there in the morning.*
3. **"No amendments this year. Every coin goes to the great project."** `[pm opinion -2]` `[avros loyalty -3]` `[flag: amendments = 3]` `[flag: path_harden += 1]`
   ↳ > **Pelan Avros:** "Then the great project had better be very great. Because twenty-four deputies are going to go home and explain it."
4. **"Ask me again after the budget."** `[avros loyalty -1]` `[flag: amendments = 4]`
   ↳ > **Pelan Avros:** "After the budget. That's what Castelar said. I'm only mentioning it."

## lessa

> **Pelan Avros:** "And this senator. Lessa."

1. **"What does the bench think?"**
   ↳ `[if: flag.reform_stance == 1]` > **Pelan Avros:** "The bench thinks its President told the Ledger she's 'open'. Eleven of my deputies are from Mognagna and Ibira. They read the Ledger too, Lara. With a dictionary, but they read it."
   ↳ `[if: flag.reform_stance == 2]` > **Pelan Avros:** "The bench thinks you said the right thing to the wrong woman. Lessa will make you pay for it in Ibicuí, which is the only place she can."
   ↳ `[if: flag.reform_stance == 3]` > **Pelan Avros:** "The bench thinks you did well. The bench also thinks Tekoku will make a martyr of her. Tekoku loves a martyr from somewhere else."
   ↳ `[if: flag.reform_stance == 4]` > **Pelan Avros:** "Decentralisation. Very clever. Give the regions power so they stop asking for seats. The governors will love it. The governors are the problem."
   ↳ `[if: !flag.lessa_met]` > **Pelan Avros:** "You haven't seen her yet? Good. When you do, count your fingers. She's from St. Veldra; they take rings."
2. **"Whatever I decide, will the bench hold?"**
   ↳ > **Pelan Avros:** "The bench holds for whoever keeps it fed. That's not cynicism. That's a description of a bench."

## corvel

He leans back, and for the first time he isn't smiling.

> **Pelan Avros:** "One more thing, and then I'll let you go. Somebody at the Treasury has been reading Tercilio's contracts. Annexes. People talk."

> **Pelan Avros:** "Those works were the best thing this party ever did. Some people got rich. A great many people got toilets. Be careful which half of that sentence you read out loud."

1. **"I read both halves. So will the country."** `[avros loyalty -2]` `[avros suspicion +5]` `[flag: path_hold += 1]` `[flag: seen_avros_bench = true]`
   ↳ > **Pelan Avros:** "Then the country will have a very interesting year."
   ↳ He walks you to the door anyway, his arm around your shoulders, for the photographer who happens to be in the corridor.
2. **"Nobody is reading anything out loud, Pelan."** `[avros loyalty +2]` `[flag: voice += 1]` `[flag: shielded_avros = true]` `[flag: seen_avros_bench = true]`
   ↳ > **Pelan Avros:** "That's all I wanted to hear."
   ↳ *It isn't a promise. It's a sentence. You can say a sentence without it meaning anything.*
3. **"If you're in those annexes, Pelan, get out of them before Renata gets in."** `[avros loyalty -1]` `[flag: warned_avros = true]` `[flag: path_harden += 1]` `[flag: seen_avros_bench = true]`
   ↳ He looks at you for a long moment. Then he laughs, loudly, the way he laughs at funerals to show he is not afraid of them.
   ↳ > **Pelan Avros:** "You've changed, Lara. Already. I'll tell Tercilio. He'll be proud."

→ END
