---
id: p2-arguedas
chapter: 2
turn: 3
title: The President of Arenza
kind: conditional
location: st-veldra
token: foreign
portraits: [arguedas, aroun]
background: residence-garden
---

⚙️ First foreign contact with Arenza (DECISIONS: courtesy visit that tests Lara; seed of the Northern Partnership, which requires Arenza). Arenza is a proud mid-size democracy and Kunasai's historical rival. Partnership of equals only.

## opening

Tomás Arguedas, President of Arenza, makes a two-day visit in July. The official part is in the capital. The second day he asks to spend in St. Veldra, to meet business leaders, and he invites you to lunch there.

He is in his early sixties, a former history teacher, elected four years ago. Arenza lies beyond Kunasai's eastern neighbours. A century ago the two countries fought a border war; since then they have competed for trade and, mainly, at football. Celeste Aroun, who was ambassador in Arenza, sits with you.

> **Tomás Arguedas:** "Thank you for lunch, Madam President. I'll tell you why I came. Our two countries spend a great deal of energy watching each other, and the Federation and Zharan spend very little energy watching either of us. They don't need to."

> **Tomás Arguedas:** "I'd like to propose something modest. A joint commission on trade and customs between Kunasai and Arenza. If it works, we can talk about something larger. If it doesn't, we've lost nothing but some meetings."

→ questions

## questions

1. **"What would 'something larger' look like?"** `[once]` `→ questions`
   ↳ > **Tomás Arguedas:** "A regional bloc. Common tariffs, common positions at the Fund, perhaps one day free movement. Vassel would join quickly. The others would need persuading."
2. **"Why now?"** `[once]` `→ questions`
   ↳ > **Tomás Arguedas:** "Because you're new and so am I, more or less. And because if Kunasai signs a large agreement with the Federation or with Zharan first, there will be nothing left to discuss."
3. **"Arenza has always seen us as a threat."** `[once]` `→ questions`
   ↳ > **Tomás Arguedas:** "You're three times our size. Of course we have. That's why I'm proposing equals. We would never accept anything else."
   ↳ `[if: compass.IDEN <= -4]` > **Tomás Arguedas:** "Although I'll admit you make it easier. You are the first Kunasaian president I've met who didn't mention the war, or your size, in the first five minutes. My advisers noticed. They're not sure what to make of it."
4. **"Here's my answer."** `→ answer`

## answer

1. **"Yes to the commission, as equals. Let's see where it leads."** `[arenza relation +2]` `[aroun loyalty +1]` `[flag: np_seed = 1]` `[-1 IDEN]`
   ↳ > **Tomás Arguedas:** "Good. I'll send our trade minister next month."
2. **"Why stop at a commission? Let's announce a regional bloc now."** `[arenza relation +1]` `[flag: np_seed = 2]` `[federation relation -1]` `[zharan relation -1]`
   ↳ > **Tomás Arguedas:** "That's generous, and too fast. If Kunasai announces it, my people will think Kunasai is in charge. Let's start with the commission and let it grow."
   ↳ > **Celeste Aroun:** "He's right, Madam President. If we lead, Arenza can't follow."
3. **"Trade, yes. Anything political, not yet."** `[arenza relation +1]` `[flag: np_seed = 3]`
   ↳ > **Tomás Arguedas:** "Trade first. It's how these things usually start."
4. **"We prefer to keep our relations bilateral, with everyone."** `[arenza relation -1]` `[+1 IDEN]` `[flag: np_seed = 0]`
   ↳ > **Tomás Arguedas:** "I understand. The offer won't expire, but it may become less interesting."

## close

1. **See him to his car** `[flag: seen_arguedas = true]`

→ END
