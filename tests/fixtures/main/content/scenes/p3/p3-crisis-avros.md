---
id: p3-crisis-avros
chapter: 3
title: The Avros File
kind: crisis
location: capital
token: crisis
portraits: [salgado, avros, livia]
background: president-office
---

⚙️ Crisis (content/crises.json `avros`): only possible if Salgado's Anti-Corruption Department was funded (DECISIONS). The department asks Congress to lift Pelan Avros's parliamentary immunity. Salgado's redline: corruption left unpunished in her own government. Sets avros_outcome.

## opening

Salgado asks to see you at seven in the morning, alone.

> **Renata Salgado:** "The Anti-Corruption Department has finished its first investigation. Pelan Avros received payments for at least eleven contracts in Mognagna over six years, through a cousin's company. Two OPP deputies are involved. So is a director at Corvel."

> **Renata Salgado:** "The department will ask Congress to lift his immunity this week. It doesn't need my permission or yours. But Congress will vote, and the PM's position will matter. And the press will ask what you knew."

> **Renata Salgado:** "I want you to hear one more thing from me. If the government protects him, I will resign."

→ questions

## questions

1. **"How solid is the evidence?"** `[once]` `→ questions`
   ↳ > **Renata Salgado:** "Bank records, two witnesses, and his cousin's accounts. It's solid."
2. **"What does this do to the bench?"** `[once]` `→ questions`
   ↳ > **Livia Harvan:** "Without Avros, the PM bench has no leader for a while. Some deputies will be relieved. Others are in the same records."
3. **"Did the envelope in January have anything to do with this?"** `[once]` `→ questions`
   ↳ `[if: flag.avros_envelope == 1]` > **Renata Salgado:** "It was where we started."
   ↳ `[if: flag.avros_envelope == 2 || flag.avros_envelope == 3]` > **Renata Salgado:** "We started without it. We'd have been faster with it."
   ↳ `[if: !(flag.avros_envelope >= 1)]` > **Renata Salgado:** "No. The department found its own way."
4. **"Here is the government's position."** `→ decide`

## decide

1. **"The PM will vote to lift his immunity. Nobody is above the law."** `[salgado loyalty +3]` `[pm opinion -4]` `[avros loyalty -6]` `[ca opinion +2]` `[media opinion +2]` `[approval +3 @ all]` `[flag: avros_outcome = 1]` `[flag: avros_charged = true]` `[flag: path_hold += 2]`
   ↳ > **Renata Salgado:** "Thank you, Madam President."
   ↳ That afternoon Avros calls you. You don't take the call. He leaves a message: "You've changed, Lara."
2. **"The government takes no position. Congress decides."** `[salgado loyalty -1]` `[pm opinion -1]` `[flag: avros_outcome = 2]`
   ↳ > **Renata Salgado:** "Congress will protect him without your position. You know that."
   ↳ Congress keeps his immunity by six votes. Salgado does not resign. She stops sending you her notes in advance.
3. **"Ask Avros to resign as bench leader, quietly, in exchange for the vote failing."** `[salgado loyalty -6]` `[pm opinion +1]` `[avros loyalty +1]` `[flag: avros_outcome = 3]` `[flag: salgado_resigned = true]` `[flag: corruption += 2]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Renata Salgado:** "Then I resign, Madam President. You'll have my letter in an hour."
   ↳ *He loses his post. The party stays together. The country keeps its government. You can explain all of it.*

## close

1. **End the meeting** `[flag: seen_crisis_avros = true]`

→ END
