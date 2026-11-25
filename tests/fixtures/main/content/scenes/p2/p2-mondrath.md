---
id: p2-mondrath
chapter: 2
turn: 3
title: A Letter from Mondrath
kind: conditional
location: strait
token: foreign
portraits: [aroun]
background: president-office
---

⚙️ First foreign contact with Mondrath (DECISIONS: a cold letter). Mondrath wants to be left alone; it can turn hostile if threatened. The Strait matters to Kunasai's trade. Aroun brings the letter.

## opening

Celeste Aroun brings you a letter delivered by the Mondrathi embassy that morning. It is printed on heavy paper with the Archduke's seal.

> **Celeste Aroun:** "It's from the Chancellery of Archduke Casimir. I'll summarise. From September, pilotage fees for ships passing through the Strait in Mondrathi waters will rise by fifteen percent, 'to fund maintenance of navigation aids'. Vassel was informed separately. It's addressed to you personally, which is unusual."

> **Celeste Aroun:** "Most of the ships that will pay it are going to or from Katanaí."

→ questions

## questions

1. **"Is the increase legal?"** `[once]` `→ questions`
   ↳ > **Celeste Aroun:** "Yes. The fees are theirs to set. The last increase was twelve years ago."
2. **"Why address it to me personally?"** `[once]` `→ questions`
   ↳ > **Celeste Aroun:** "To see how you answer. Mondrath watches Kunasaian presidents very closely, mostly for signs of interest in Tekoku."
3. **"What does it cost us?"** `[once]` `→ questions`
   ↳ > **Celeste Aroun:** "For shipping companies, a little. For the government, nothing directly. For Katanaí's competitiveness, a little more each year."
4. **"Let's draft a reply."** `→ reply`

## reply

1. **"A short, polite acknowledgement. Nothing more."** `[aroun loyalty +1]` `[flag: mondrath_reply = 1]`
   ↳ > **Celeste Aroun:** "They'll read it as acceptance. That's probably what they hoped for."
2. **"A formal protest. Kunasai expects to be consulted."** `[mondrath relation -1]` `[+1 IDEN]` `[nf opinion +1]` `[flag: mondrath_reply = 2]`
   ↳ > **Celeste Aroun:** "They'll answer in three weeks, more coldly. It won't change the fees."
3. **"Propose talks on the Strait, together with Vassel."** `[cost: 1 EPI]` `[mondrath relation +1]` `[flag: mondrath_reply = 3]`
   ↳ > **Celeste Aroun:** "Mondrath dislikes meetings. But it dislikes being left out of one even more. I'll write to Vassel."
4. **"Don't reply at all."** `[mondrath relation -1]` `[flag: mondrath_reply = 0]`
   ↳ > **Celeste Aroun:** "Silence is also an answer. In Mondrath's case, they may prefer it."

## close

1. **Return the letter to Aroun** `[flag: seen_mondrath = true]`

→ END
