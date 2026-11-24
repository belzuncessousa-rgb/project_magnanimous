---
id: p1-lessa-visit
chapter: 1
turn: 2
title: The Senator from Ibicuí
kind: conditional
location: capital
portraits: [lessa, livia]
background: president-office
---

⚙️ First appearance of the Constitutional Representation Crisis. Senator Augusta Lessa (CP, Ibicuí) is its recurring face. Livia Harvan sits in: OPP's redline is any change to the electoral system. The drama: Lessa is right about Lara's own state, and the reform would strip weight from PM's poorest bases (Mognagna, Ibira).
⚙️ Sets reform_stance: 1 open · 2 sceptical · 3 opposed · 4 wants a compromise (decentralisation seed). Feeds the ch2 push and the ch3 impasse meter.

## opening

Senator Augusta Lessa arrives four minutes early, which you suspect is a tactic, and sits before she is invited to, which you are certain is one. She is in her sixties, silver-haired, dressed by someone in St. Veldra who charges by the stitch. She is the best speaker in the Senate and does not pretend otherwise.

Livia Harvan takes the chair by the window, a notebook on her knee, as if she had always been part of the furniture.

> **Augusta Lessa:** "Madam President. Congratulations. I voted for your opponent, which you know, and I'd do it again, which you suspect. I'm not here about that."

> **Augusta Lessa:** "I'm here about arithmetic."

→ arithmetic

## arithmetic

She does not take out any papers. She does not need them.

> **Augusta Lessa:** "Every state sends three senators. Ibicuí has a hundred million people. Ibira has thirty. A senator from Ibira speaks for ten million Kunasaians. A senator from Ibicuí speaks for thirty-three."

> **Augusta Lessa:** "Your state, Madam President. Your mother's state. Its people weigh a third of what a voter in Ibira weighs, and the Senate decides what Congress is allowed to send it."

> **Augusta Lessa:** "One Kunasaian, one weight. That's all. It's in every civics textbook in the country, except, apparently, the constitution."

*She is right about Ibicuí. She is right about the textbooks. And the three senators of Ibira are the only reason anyone in New Veldrania remembers that Ibira exists.*

1. **"And Tapira? Your own party's landlords would lose seats."**
   ↳ > **Augusta Lessa:** "Some of my party would lose seats. Some of my party would lose a great deal more than that if they ever had to win an argument in a room full of people. I can live with their disappointment."
2. **"You're a CP senator from St. Veldra. Why should the left trust this?"**
   ↳ > **Augusta Lessa:** "You shouldn't trust me. You should check my sums. Then you should decide whether the sums care who added them."
3. **"What do you need from me, exactly?"**
   ↳ > **Augusta Lessa:** "Today? A word. 'Open.' I'll do the rest. I've been doing the rest for nine years."

## stance

Livia has stopped writing. She is looking at the window, which is the most attentive thing you have seen her do.

> **Augusta Lessa:** "So. Are you open, Madam President?"

1. **"I'm open. Ibicuí has been under-counted for a century."** `[flag: reform_stance = 1]` `[lessa loyalty +2]` `[approval +3 @ ibicui, tekoku]` `[approval -3 @ mognagna, ibira]` `[opp opinion -1]` `[livia loyalty -1]` `[-1 STRUCT]`
   ↳ > **Augusta Lessa:** "Good. I'll say you said so. Accurately. I'm very accurate; it upsets people."
   ↳ Livia writes one word. You can't see it. You can guess the first letter.
2. **"Representation isn't only arithmetic. For the poor states, those seats are all they have."** `[flag: reform_stance = 2]` `[lessa loyalty -1]` `[approval +2 @ mognagna, ibira]` `[approval -2 @ ibicui]` `[+1 WELF]`
   ↳ > **Augusta Lessa:** "Then you're defending a privilege for the poor. It's still a privilege. Somebody pays for it, and it's your neighbours in Katanaí."
3. **"Bring me something that doesn't set the regions against each other."** `[flag: reform_stance = 4]` `[flag: decentralisation_seed = true]` `[lessa loyalty +1]` `[livia loyalty +1]`
   ↳ > **Augusta Lessa:** "You mean give the regions more power instead of rebalancing the centre. Everyone gets a little, nobody gets enough. It's the oldest trick in federalism."
   ↳ > **Augusta Lessa:** "It sometimes works. I'll think about it. I'll think about it unkindly."
4. **"Not this year, Senator. I have a hole to fill."** `[flag: reform_stance = 3]` `[lessa loyalty -2]` `[approval -2 @ tekoku, ibicui]` `[opp opinion +1]` `[livia loyalty +1]`
   ↳ > **Augusta Lessa:** "Then I'll count without you. I'm good at it. I'll let you know when I reach a number you can't ignore."

## departure

She leaves exactly on time. At the door she turns, as if remembering something she had planned to remember.

> **Augusta Lessa:** "The Tekoku deputies will sign anything with my name on it this year, Madam President. Not because they love me. Because they hate being counted last. Bear it in mind."

When the door closes, Livia caps her pen.

> **Livia Harvan:** "My uncle will want to know what you told her. Odel has one rule about elections, which is that nobody touches how they work. I'll have to tell him something."

1. **"Tell him exactly what I said."** `[livia loyalty +1]` `[flag: path_hold += 1]`
   ↳ > **Livia Harvan:** "Exactly is a lot to ask of my family. I'll try."
2. **"Tell him whatever keeps him calm until March."** `[livia loyalty +1]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Livia Harvan:** "That's what I'd have told him anyway. It's nice to have it authorised."
   ↳ *It isn't a lie. It's a schedule.*
3. **"Tell him nothing. It was my conversation."** `[livia loyalty -1]` `[mertens loyalty -1]` `[flag: path_harden += 1]`
   ↳ > **Livia Harvan:** "Then he'll hear it from Lessa, who will tell him more than you said. But it's your conversation."

→ end

## end

⚙️ The Tekoku petition pop-up and the Ledger's representation item follow at the end of the turn.

1. **Let the room settle** `[flag: lessa_met = true]` `[flag: seen_lessa_visit = true]`

→ END
