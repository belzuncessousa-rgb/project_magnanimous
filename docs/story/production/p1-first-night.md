---
id: p1-first-night
chapter: 1
turn: 1
title: The First Night
kind: personal
location: capital
token: personal
order: 5
when: "flag.seen_tutorial"
portraits: [amanda, celia]
background: residence-night
---

⚙️ Production draft 1, staged outside playable content. Builds on approved calibration sample 03. Celia's name and Vila Tamarin retained from prototype; both parents and siblings exist per newer canon. No forced illness, romance, childlessness, corruption guilt or inner "voice". Port callbacks assume existing opp_price_1 mapping (1 accept, 2 compromise, 3 refuse, 4 defer); update if negotiation rewrite changes it. New flavour flags are provisional. No compulsory resource costs.

## arrival

By the time you reach the presidential residence, it is well after dark. The house stands in a garden behind the palace, a short drive from the offices where you have spent the afternoon.

A member of staff shows you to your bedroom. Your luggage has already been brought upstairs, and someone has left a directory of the residence's internal telephone numbers on the bedside table.

There is a small sitting room adjoining the bedroom. Beyond its windows, a row of lamps illuminates the garden path. A little further away, you can make out the lights of the palace.

1. **Look around upstairs.**
   ↳ There are several guest bedrooms along the corridor, each with its own bathroom. At the end of the hall, you find a room furnished as a study, with a desk, shelves and a view of the garden.
   ↳ On the desk is a framed photograph of the residence taken shortly after it was built. The trees in the photograph are barely taller than the people standing beside them.
2. **Look out over the garden.**
   ↳ You open the window a little. The air outside is still warm. Somewhere beyond the garden wall, you hear a car passing along the road.
   ↳ Two members of the security staff are walking along the path. One of them notices the open window and gives you a small wave.
3. **Go downstairs.**

## sitting-room

When you enter the sitting room, Amanda is kneeling beside the coffee table, taking food out of a paper bag.

You have known Amanda Troes since law school. She now serves as your personal secretary, and today she has spent most of her time arranging meetings and dealing with the people who want to see you.

> **Amanda Troes:** "Have you eaten?"

She looks up at you.

> **Amanda Troes:** "I bought some sandwiches on the way here. I wasn't sure what they'd have in the kitchen."

1. **"After today, I could eat both of them."**
   ↳ Amanda laughs and hands you the bag.
   ↳ > **Amanda Troes:** "Take the one on top. I don't like the cheese in that one."
2. **"You know we have a kitchen staff now, right?"**
   ↳ > **Amanda Troes:** "I know. I haven't worked out who to ask for food yet. I thought I'd give the poor people a day to settle in."
3. **"I'm not hungry, but sit with me for a while."**
   ↳ > **Amanda Troes:** "Of course."
   ↳ She puts the bag aside.

## memory

Amanda takes a seat and slips off her shoes. On the television, with the volume turned down, a news presenter is standing in front of the palace. They show a photograph of you during the campaign.

> **Amanda Troes:** "Do you remember the suit you wore when we went to look for our first internships?"

> "The blue one?"

> **Amanda Troes:** "Yes! You had to lend me your jacket for my interview. It didn't fit me at all."

> "You kept it for nearly a month."

> **Amanda Troes:** "Two weeks, Lara."

She starts laughing.

1. **"You got the job, though."** `[flag: amanda_jacket_callback = 1]`
   ↳ > **Amanda Troes:** "Yes. They asked me to start on Monday. I had to call you and ask if I could keep it for another week."
2. **"And I had to wait in the corridor in my shirt."** `[flag: amanda_jacket_callback = 2]`
   ↳ > **Amanda Troes:** "I told you to go home! You insisted on waiting for me."
   ↳ She smiles at the memory.
3. **"That was a long time ago."** `[flag: amanda_jacket_callback = 3]`
   ↳ > **Amanda Troes:** "It was."
   ↳ She watches the television for a moment.

## evening

Amanda reaches for the notebook she has left beside the television remote.

> **Amanda Troes:** "I have tomorrow's schedule. There are already a few things I'd like to move around. We can go through it in the morning."

She looks at you.

> **Amanda Troes:** "Unless there's anything from today you want to talk about?"

1. **"How did the speech go, from where you were standing?"** `[once]` `→ speech-reaction`
2. **"Is there a list of port nominees yet?"** `[show if: flag.opp_price_1 == 1]` `[once]` `→ port-accepted`
3. **"Are we expecting the OPP’s port candidates?"** `[show if: flag.opp_price_1 == 2]` `[once]` `→ port-compromise`
4. **"Has Odel said anything about the port?"** `[show if: flag.opp_price_1 == 3]` `[once]` `→ port-refused`
5. **"Have they asked for another meeting about the port?"** `[show if: flag.opp_price_1 == 4]` `[once]` `→ port-deferred`
6. **"How has your first day been?"** `[once]` `→ amanda-day`
7. **"We can talk about work tomorrow."** `→ departure`

## speech-reaction

> **Amanda Troes:** "It was quite something. You couldn't see the people standing further back, could you? There were people watching from the windows of the surrounding buildings."

1. **"Did anyone mention my commitments?"** `[show if: flag.promised_CoL || flag.promised_GDP || flag.promised_power || flag.promised_integrity]`
   ↳ `[if: flag.promised_CoL]` > **Amanda Troes:** "A woman from Mognagna came up to me afterwards. She wanted to know when you'd be visiting. She'd been listening to what you said about living standards in the regions."
   ↳ `[if: flag.promised_GDP]` > **Amanda Troes:** "There were several people from the business delegation talking about your economic commitment afterwards. I expect we'll hear from them soon."
   ↳ `[if: flag.promised_power]` > **Amanda Troes:** "A couple of our old party colleagues were particularly pleased that you spoke about giving citizens a greater voice."
   ↳ `[if: flag.promised_integrity]` > **Amanda Troes:** "And someone from the newspaper asked whether your promise on appointments would apply to the coalition parties. I told him to send his question to the press office."
2. **"I wanted to leave myself some room to manoeuvre."** `[show if: !flag.promised_CoL && !flag.promised_GDP && !flag.promised_power && !flag.promised_integrity]`
   ↳ > **Amanda Troes:** "I noticed. There'll be people who want to hear more in the coming weeks, but at least you'll have the ministers' reports by then."
3. **"I'm glad so many people came."**
   ↳ > **Amanda Troes:** "My mother watched the whole thing on television. She's already told everyone in her building that we went to university together."
4. **"Well, we'll see what people say tomorrow."**
   ↳ > **Amanda Troes:** "I'll have the papers ready for you."

## after-speech

Amanda sets the notebook down.

→ evening

## port-accepted

> **Amanda Troes:** "Livia called while I was on my way here. She's expecting the names tomorrow."

She sits up a little.

> **Amanda Troes:** "Did you get a chance to discuss what happened there under the last government?"

1. **"Yes. We can still make sure the appointments are sound."**
   ↳ > **Amanda Troes:** "It would be worth having someone check the names independently."
2. **"I needed the OPP's cooperation."**
   ↳ She nods slowly.
   ↳ > **Amanda Troes:** "I understand. I'd still like to know who they're sending us."
3. **"I'll make sure they meet the standard I promised today."** `[show if: flag.promised_integrity]`
   ↳ > **Amanda Troes:** "Good. We should make sure Livia has that instruction before she starts processing the appointments."
4. **"We can deal with that tomorrow."**
   ↳ > **Amanda Troes:** "All right. I'll leave it on your desk."

→ evening

## port-compromise

> **Amanda Troes:** "They're still discussing the list. Livia said the director would remain independent."

She closes the notebook.

> **Amanda Troes:** "I'll make sure you have a copy when it comes in."

1. **"Thank you. I'd like to see who they're proposing."**
   ↳ > **Amanda Troes:** "Of course."
2. **"Let Livia deal with it for now."**
   ↳ > **Amanda Troes:** "All right."

→ evening

## port-refused

> **Amanda Troes:** "Livia told me about the port. I imagine Odel won't be particularly pleased."

1. **"He'll get over it."**
   ↳ Amanda smiles.
   ↳ > **Amanda Troes:** "I hope he gets over it before he starts calling me."
2. **"We need to find another way to work with him."**
   ↳ > **Amanda Troes:** "I'm sure Caio can help with that."
3. **"I made a commitment about appointments today."** `[show if: flag.promised_integrity]`
   ↳ > **Amanda Troes:** "Yes. It will be interesting to see what the newspapers make of your first appointments."

→ evening

## port-deferred

> **Amanda Troes:** "Not yet. Livia asked me to keep some space in your diary in case they do."

> "All right."

→ evening

## amanda-day

Amanda puts her notebook down.

> **Amanda Troes:** "Ask me again in a month."

She smiles.

> **Amanda Troes:** "I think we can do some good here. I want to see what we can actually get done."

> **Amanda Troes:** "And I need to learn how to do my own job. I didn't expect so many people to be asking me for favours already."

1. **"Send the unreasonable ones to Caio."**
   ↳ She laughs.
   ↳ > **Amanda Troes:** "That might be the first sensible system we've established today."
2. **"You don't have to handle everything yourself."**
   ↳ > **Amanda Troes:** "I know. I'll need to get better at telling people no."
3. **"We'll work it out."**
   ↳ She gives you a small smile.

→ evening

## departure

Amanda checks the time on her phone.

> **Amanda Troes:** "I should probably go. I told my mother I'd call her tonight, and I'm already late."

She reaches for her shoes.

1. **"Thank you for today, Amanda."**
   ↳ She looks up and smiles.
   ↳ > **Amanda Troes:** "You're welcome, Lara."
2. **"Go on. I'll see you tomorrow."**
   ↳ > **Amanda Troes:** "Good night."

## after-departure

She gathers her things and heads towards the door.

## telephone

Your phone rings a few minutes later. Your mother's name appears on the screen.

> "Hello, Mum."

> **Celia Vento:** "Oh, thank goodness. Your father has been telling me not to ring you. He says you're probably in another meeting."

> "I'm at the residence."

> **Celia Vento:** "Already? Have you seen the whole house? They showed the outside on television. Your brother kept trying to count the windows."

She laughs.

> **Celia Vento:** "We watched the speech at Ivone's. She has a bigger television than ours. Your sister was taking photographs of the screen to send to everyone."

1. **"I wish you could all have been here."**
   ↳ > **Celia Vento:** "We'll come and visit when you've settled in. I don't know if I can persuade your father to spend the night there."
2. **"You should come and see the house sometime."** `[flag: mother_invited_residence = true]`
   ↳ > **Celia Vento:** "I would like that. We'll have to find a time when we're all free."
3. **"How was everything at home?"**
   ↳ > **Celia Vento:** "Oh, you know. Ivone bought far too much food. We still have half of it in the fridge."

## family-neighbourhood

> **Celia Vento:** "By the way, they put another sign up near the end of our street. About the sewer works. Your father thinks it's the same sign they took down in October."

You know the works she means. They were part of a large sanitation programme begun under President Luz. Several sections were left unfinished, including the one near the neighbourhood where you grew up.

> **Celia Vento:** "It would be nice if someone finally came to do something about it."

1. **"I'll ask Planning for an update on the works."** `[flag: promised_mother_street = true]`
   ↳ > **Celia Vento:** "Thank you. Perhaps they'll know when the work is supposed to start again."
2. **"We'll be reviewing the whole programme soon."**
   ↳ > **Celia Vento:** "Good. Your father will be glad to hear that."
3. **"I can't promise anything about it yet."**
   ↳ > **Celia Vento:** "Of course, dear. I wasn't asking you to do it tomorrow."

## family-goodnight

You hear someone speaking in the background.

> **Celia Vento:** "Your father says hello. He wants me to let you get some rest."

1. **"I'll try to visit when I can."**
   ↳ > **Celia Vento:** "Whenever you have time, Lara."
2. **"I'll come and see you next month."** `[flag: mother_visit_next_month = true]`
   ↳ > **Celia Vento:** "That would be lovely. Let us know when you know the date."
3. **"Give everyone my love. Good night."**
   ↳ > **Celia Vento:** "Good night, dear."
4. **"Good night, Mum."**
   ↳ > **Celia Vento:** "Good night."

## after-call

She hangs up.

## late-evening

You go upstairs. A light has been left on in the study, and someone has placed a folder of documents on the desk.

1. **Read the briefing for tomorrow.** `[flag: first_night_activity = 1]`
   ↳ There is a short summary of the ministries' upcoming meetings, followed by a list of documents you are expected to receive in the next few days.
   ↳ You spend some time reading the summary before returning to the bedroom.
2. **Look through the photographs on your phone.** `[flag: first_night_activity = 2]`
   ↳ There are messages from former colleagues, party members and relatives. Your sister has sent you a photograph of the family gathered around Ivone's television.
   ↳ You can see your father at the edge of the picture, holding a plate of food.
3. **Sit by the window for a while.** `[flag: first_night_activity = 3]`
   ↳ Most of the lights in the garden have been switched off. The security staff are still making their rounds.
4. **Go to bed.**

## close

You close the bedroom door and prepare for the night.

1. **Turn off the light.** `[flag: seen_first_night = true]`

→ END
