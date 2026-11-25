---
id: p2-pryce
chapter: 2
turn: 1
title: The Arennian Ambassador
kind: conditional
location: capital
token: foreign
portraits: [pryce, aroun]
background: president-office
---

⚙️ First foreign contact (DECISIONS: Federation ambassador — debt, minerals, polite threat). The Federation is arrogant and somewhat imperial. Celeste Aroun sits in.

## opening

Lionel Pryce has been the Arennian Federation's ambassador in New Veldrania for five years. He is in his sixties, silver-haired and relaxed, and he speaks very good Kunasaian. He arrives with a gift: a book of photographs of the Federation's national parks. Celeste Aroun, your Exterior minister, sits beside you.

> **Lionel Pryce:** "Madam President, thank you for your time. President Ashby sends his warm regards. He followed your election closely. We all did."

> **Lionel Pryce:** "I'll be frank, as friends should be. Three things concern my government."

> **Lionel Pryce:** "First, the debt. The Fund's board will look at your plan carefully. The Federation has a voice on that board, and we'd like to use it in your favour."

> **Lionel Pryce:** "Second, Ibira. There are minerals there that matter to the whole world. We'd hate to see them go to the wrong partners."

> **Lionel Pryce:** "And third, Zharan. Their envoys are very generous. Generosity from Zharan tends to come with ports attached."

→ questions

## questions

1. **"What does 'in our favour' mean, at the Fund?"** `[once]` `→ questions`
   ↳ > **Lionel Pryce:** "Longer schedules. Fewer conditions. These things are possible between friends."
2. **"Who are the 'wrong partners' in Ibira?"** `[once]` `→ questions`
   ↳ > **Lionel Pryce:** "I think you know. Arennian companies have the technology to mine cleanly and the markets to sell to. We'd like to be considered first."
   ↳ `[if: flag.great_project == 1]` > **Lionel Pryce:** "Now that you've chosen the Tauá Hills, I'd say it's urgent."
3. **"And if Kunasai chooses its partners freely?"** `[once]` `→ questions`
   ↳ > **Lionel Pryce:** "Then of course we respect that. Our Congress is reviewing trade preferences for the whole region this year. I'm sure Kunasai will be treated fairly."
   ↳ > **Celeste Aroun:** "Your Congress reviews them every year, Ambassador."
   ↳ > **Lionel Pryce:** "Indeed it does."
   ↳ `[if: compass.IDEN >= 4]` > **Lionel Pryce:** "I should say that my government reads your speeches. Sovereignty, our soil, no foreign hand. It's a theme. Themes are noticed in our capital."
4. **"Thank you, Ambassador. Here is our position."** `→ answer`

## answer

1. **"The Federation is an important partner. We'll keep you informed and consider your companies seriously."** `[federation relation +2]` `[zharan relation -1]` `[-1 IDEN]` `[flag: pryce_tone = 1]`
   ↳ > **Lionel Pryce:** "That's all we ask. I'll tell the President."
2. **"Kunasai will choose its partners on its own terms."** `[federation relation -2]` `[+1 IDEN]` `[nf opinion +1]` `[flag: pryce_tone = 2]`
   ↳ > **Lionel Pryce:** "Of course. I'll pass that on exactly."
   ↳ `[if: flag.address_iden == 1]` > **Lionel Pryce:** "Yes. I heard the speech in January."
3. **"We'll talk to everyone. Make us the best offer and you'll have a fair chance."** `[zharan relation +1]` `[aroun loyalty +1]` `[flag: pryce_tone = 3]`
   ↳ > **Lionel Pryce:** "An auction. Well. We are good at those too."

## close

He leaves the book of photographs on the table. After he goes, Aroun picks it up and looks at the inscription inside.

> **Celeste Aroun:** "'To a great friend of the Federation.' It was written before he met you."

1. **Put the book on the shelf** `[flag: seen_pryce = true]`

→ END
