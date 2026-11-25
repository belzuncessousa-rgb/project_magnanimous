---
id: p1-lessa-visit
chapter: 1
turn: 2
title: The Senator from Ibicuí
kind: conditional
location: capital
token: congress
portraits: [lessa, livia]
background: president-office
---

⚙️ First appearance of the Representation Crisis. Senator Augusta Lessa (CP, Ibicuí) is its recurring face. Livia sits in: the OPP will not accept any change to the electoral system. The difficulty: Lessa is right about Lara's own state, and the reform would reduce the weight of PM's poorest regions (Mognagna, Ibira).
⚙️ reform_stance: 1 open · 2 sceptical · 3 opposed · 4 compromise (decentralisation seed).

## opening

Senator Augusta Lessa arrives a few minutes early. She is in her sixties, with silver hair and an expensive suit. She has been a senator for Ibicuí for twelve years and belongs to the Capital Party, the opposition. She comes from an old banking family in St. Veldra. She is known as the best speaker in the Senate.

Livia Harvan takes a chair by the window with a notebook.

> **Augusta Lessa:** "Congratulations, Madam President. I voted for your opponent, as you know. I'm not here about that. I'm here about how this country is represented."

→ arithmetic

## arithmetic

> **Augusta Lessa:** "Each state has three senators, whatever its size. Ibicuí has a hundred million people. Ibira has thirty million. So a senator from Ibira represents ten million people, and a senator from Ibicuí represents thirty-three million."

> **Augusta Lessa:** "The Senate approves judges, treaties and any change to the federal pact, including how money is shared between the states. In those decisions, a person in Ibicuí counts for about a third of a person in Ibira."

> **Augusta Lessa:** "I want senators to be distributed by population. I've been proposing it for nine years. This year I think I can get it through Congress, if the government doesn't oppose it."

*She is right about the numbers for Ibicuí, your home state. But Ibira and Mognagna are poor, and their senators are one of the few ways those regions are heard in the capital.*

→ questions

## questions

1. **"Your own party would lose seats in Tapira."** `[once]` `→ questions`
   ↳ > **Augusta Lessa:** "Some of my colleagues from Tapira would. They don't like this proposal. I've told them so."
2. **"Why should a left-wing government trust a Capital Party senator on this?"** `[once]` `→ questions`
   ↳ > **Augusta Lessa:** "You don't have to trust me. Check the figures. They are the same whoever presents them."
3. **"Who supports you?"** `[once]` `→ questions`
   ↳ > **Augusta Lessa:** "Most of Tekoku's deputies, the Civic Alliance, and part of my party. The National Front likes it because it gives Tekoku more weight. I'm not proud of all my supporters."
4. **"What exactly do you want from me?"** `→ stance`

## stance

> **Augusta Lessa:** "Today, only to know whether the government is open to the idea. I'll do the rest."

Livia has stopped writing.

1. **"I'm open to it. Ibicuí has been under-represented for a long time."** `[flag: reform_stance = 1]` `[lessa loyalty +2]` `[approval +3 @ ibicui, tekoku]` `[approval -3 @ mognagna, ibira]` `[opp opinion -1]` `[livia loyalty -1]` `[-1 STRUCT]`
   ↳ > **Augusta Lessa:** "Thank you. I'll say that you're open, and nothing more."
2. **"For the poor states, those seats are all they have. I'm sceptical."** `[flag: reform_stance = 2]` `[lessa loyalty -1]` `[approval +2 @ mognagna, ibira]` `[approval -2 @ ibicui]` `[+1 WELF]`
   ↳ > **Augusta Lessa:** "I understand the argument. But the cost of it is paid by people in Ibicuí, including your neighbours in Katanaí."
3. **"Bring me something that doesn't set the regions against each other."** `[flag: reform_stance = 4]` `[flag: decentralisation_seed = true]` `[lessa loyalty +1]` `[livia loyalty +1]`
   ↳ > **Augusta Lessa:** "You mean giving more powers to the states instead of changing the Senate. It's been tried in other countries. Sometimes it works. I'll think about it."
4. **"Not this year, Senator. We have other priorities."** `[flag: reform_stance = 3]` `[lessa loyalty -2]` `[approval -2 @ tekoku, ibicui]` `[opp opinion +1]` `[livia loyalty +1]`
   ↳ > **Augusta Lessa:** "Then I'll go ahead without the government. I'll let you know when I have the votes."

## departure

> **Augusta Lessa:** "One thing to keep in mind, Madam President. The Tekoku deputies will sign anything with my name on it this year. They're tired of being outvoted."

She leaves. Livia closes her notebook.

> **Livia Harvan:** "My uncle will want to know what you told her. The OPP has one firm rule about elections: nobody changes how they work. What should I tell him?"

1. **"Tell him exactly what I said."** `[livia loyalty +1]` `[flag: path_hold += 1]`
   ↳ > **Livia Harvan:** "I will."
2. **"Tell him whatever keeps him calm until March."** `[livia loyalty +1]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Livia Harvan:** "That's what I would have done anyway."
   ↳ *Odel will find out eventually. It is only a question of timing.*
3. **"Nothing. It was my conversation."** `[livia loyalty -1]` `[mertens loyalty -1]` `[flag: path_harden += 1]`
   ↳ > **Livia Harvan:** "Then he'll hear it from Lessa, and her version will be longer. But it's your decision."

## end

1. **Return to work** `[flag: lessa_met = true]` `[flag: seen_lessa_visit = true]`

→ END
