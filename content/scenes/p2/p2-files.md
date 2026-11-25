---
id: p2-files
chapter: 2
turn: 3
title: The March in Sugar Bay
kind: conditional
location: sugar-bay
token: security
portraits: [salgado, voss, delmar]
background: president-office
---

⚙️ Military Dictatorship Files — still a SEED (DECISIONS: only petitions and news in chapters 1–3). The Families of the Disappeared march in Sugar Bay on an anniversary; the petition becomes a national story. Salgado and Voss state their positions. Nothing is opened.

## opening

On the twelfth of July, the anniversary of the largest wave of arrests under the dictatorship, about thirty thousand people march through Sugar Bay. They carry photographs of people who disappeared. Rosa Delmar speaks at the end, outside the cathedral. The march is on every evening news programme.

The next morning Salgado and Voss are both in your office. Each asked for the meeting separately. Livia put them in the same one.

> **Renata Salgado:** "Madam President, I'm not asking to open the archives. I'm asking for permission to prepare a legal study: what the Amnesty Act actually covers, and what it doesn't. Without one, we're arguing in the dark."

> **Aldric Voss:** "A study is how it starts. I told you my position in January. It hasn't changed."

→ questions

## questions

1. **"Renata, what would the study find?"** `[once]` `→ questions`
   ↳ > **Renata Salgado:** "Probably that the Act protects the officers from prosecution, but not the archives from being read. That's the part General Voss doesn't want written down."
2. **"General, what exactly are you afraid of?"** `[once]` `→ questions`
   ↳ > **Aldric Voss:** "That officers who served their country under orders will be put on trial by people who weren't born then. And that the army will stop trusting the government it serves."
3. **"Did Rosa Delmar mention me?"** `[once]` `→ questions`
   ↳ `[if: flag.files_petition == 1]` > **Renata Salgado:** "She said you were the first president to receive them. She asked you to take the next step."
   ↳ `[if: !(flag.files_petition == 1)]` > **Renata Salgado:** "She said the government had been polite and had done nothing. Which is accurate."
4. **"Here is what we'll do."** `→ decide`

## decide

1. **"Prepare the legal study, Renata. Quietly."** `[salgado loyalty +2]` `[voss loyalty -2]` `[armed_forces opinion -1]` `[flag: files_study = true]`
   ↳ > **Aldric Voss:** "Then I'll prepare too, Madam President."
   ↳ He leaves first.
2. **"No study this year. I'll make a public statement of respect for the families."** `[salgado loyalty -1]` `[approval +2 @ mognagna]` `[flag: files_statement = true]`
   ↳ > **Renata Salgado:** "A statement. They've had statements."
   ↳ > **Aldric Voss:** "Thank you, Madam President."
3. **"Nothing this year. The government has other priorities."** `[salgado loyalty -2]` `[voss loyalty +2]` `[armed_forces opinion +1]` `[flag: files_shelved = true]` `[flag: voice += 1]`
   ↳ > **Renata Salgado:** "Understood."
   ↳ *The families have waited twenty-five years. One more year will not change much for them, and it will keep the army calm.*

## close

1. **End the meeting** `[flag: seen_files = true]`

→ END
