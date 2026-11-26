---
id: p1-tamarin
chapter: 1
turn: 3
title: Vila Tamarin
kind: personal
location: vila-tamarin
token: personal
portraits: [celia, marco, amanda]
background: tamarin-kitchen
---

⚙️ Staged rewrite. Both parents and siblings exist per canon; no unapproved names, ages, illnesses or compulsory family commitments. Keep Celia savings and Marco labour threads and established choice flags with meanings noted. The staged first-night promised_mother_street means request for an update, not a guarantee to build; new mother_street_guaranteed explicitly records a construction promise. Reconcile downstream flags. Visit timing flexible; do not claim a monthly promise based on one promised visit.

## arrival

The road up to Vila Tamarin narrows near the neighbourhood's entrance. You leave the car and continue on foot with Amanda and members of the presidential staff.

People recognise you as you pass. Several wave from their windows. A man outside a shop calls your name and asks if you remember him.

> "Of course. Good afternoon."

At the corner of your parents' street stands the sign for the sanitation works. Its lower edge has begun to rust, and someone has written a question beneath the notice announcing that construction will resume.

Celia is standing by the gate. Your father is behind her, trying to persuade a neighbour's dog to move away from the entrance.

> **Celia Vento:** "There you are. I told him you weren't going to arrive before lunch."

Your father closes the gate once everyone has entered.

1. **Hug your parents.**
   ↳ Celia holds you for a moment and then adjusts the collar of your jacket.
   ↳ > **Celia Vento:** "Come inside. It's too hot out here."
2. **"I hope I haven't kept you waiting."**
   ↳ > **Celia Vento:** "We ate a little while ago. There's plenty left for you."
3. **"I said I'd come and see you."** `[show if: flag.mother_visit_next_month]`
   ↳ Celia smiles.
   ↳ > **Celia Vento:** "And you did."

## lunch

The dining table has been extended with a board your father fitted between its two halves years ago. Celia has brought out plates that do not quite match.

Amanda greets your parents and accepts a glass of juice.

> **Celia Vento:** "Did you see the television? They keep showing you walking into that room with all the ministers."

Your father takes a plate from the cupboard.

> **Father:** "I saw it three times yesterday. They could show something about what she's doing now."

Celia looks at him.

> **Celia Vento:** "People are interested."

She sets a bowl on the table.

1. **"Have you had many visitors since the inauguration?"**
   ↳ > **Celia Vento:** "Everyone wants to know if we've spoken to you. And whether I've been to the palace."
   ↳ > **Father:** "Your mother tells them everything you've told her, which isn't very much."
2. **"How are my brother and sister?"**
   ↳ Celia tells you about the family. Your father occasionally adds a detail she has left out.
3. **"This is much better than the food at the palace."**
   ↳ Celia laughs.
   ↳ > **Celia Vento:** "You haven't even tasted it yet."
4. **Eat and listen to the conversation.**

## kitchen

After lunch, your father takes the plates to the sink. Celia brings an envelope from a drawer and sits beside you.

> **Celia Vento:** "I wanted to ask you about something. You saw the sign at the corner."

She opens the envelope. It contains a few notes and a letter from a neighbourhood association.

> **Celia Vento:** "Some of us have been discussing whether we could raise money to get the street connected. The people further down have the pipes already. Up here we've been waiting all this time."

Your father turns off the tap.

> **Father:** "I told her we should get a proper estimate before anyone starts collecting money."

> **Celia Vento:** "Of course. That's why I'm asking."

1. **"Did you get the update I requested?"** `[show if: flag.promised_mother_street]`
   ↳ > **Celia Vento:** "Not yet. I thought perhaps you had heard something."
2. **"Has anyone confirmed that a separate connection is possible?"**
   ↳ > **Father:** "Not in writing. That's what I've been trying to find out."
3. **"How much were you thinking of contributing?"**
   ↳ Celia shows you the amount she has set aside.
   ↳ > **Celia Vento:** "I could manage that. If everyone put in something, it might be enough."
4. **"I see."**

> **Celia Vento:** "What do you think?"

## savings

1. **"Keep your savings until there's a proper plan."** `[flag: celia_savings = 1]`
   ↳ Your father nods.
   ↳ > **Father:** "That's what I think too."
   ↳ Celia closes the envelope.
   ↳ > **Celia Vento:** "All right. But I don't want another year to go by without anyone doing anything."
2. **"You could support Marco's kitchen instead. I'll make sure the street gets connected."** `[flag: celia_savings = 2]` `[flag: mother_street_guaranteed = true]` `[flag: promised_mother_street = true]`
   ↳ Celia looks at you.
   ↳ > **Celia Vento:** "Really?"
   ↳ > "Yes."
   ↳ She puts the envelope back on the table.
   ↳ > **Celia Vento:** "I'll tell the association you've said that."
3. **"It's your money. Wait for an estimate, then decide with the neighbours."** `[flag: celia_savings = 3]`
   ↳ > **Celia Vento:** "That's what I intend to do."
   ↳ Your father asks to see the letter again.
4. **"I'll ask for a technical assessment, without promising construction."** `[flag: promised_mother_street = true]`
   ↳ > **Celia Vento:** "That would be something."
   ↳ > **Father:** "Make sure they look at the whole street."

## visitor

There is a knock at the gate. Your mother goes to answer it and returns with Marco Prestes, who is carrying a bag of groceries.

Marco runs the community kitchen in Vila Tamarin. You have known him through your work in the neighbourhood and the legal assistance you provided before entering national politics.

> **Marco Prestes:** "I thought I'd better bring something if I'm going to invite myself to lunch."

> **Celia Vento:** "You're too late for lunch. But there's coffee."

He sets the bag on the counter and greets you and Amanda.

> **Marco Prestes:** "Madam President."

He smiles.

1. **"Don't start, Marco."**
   ↳ > **Marco Prestes:** "All right, Lara."
2. **"How's the kitchen doing?"**
   ↳ > **Marco Prestes:** "Busy. We have some new volunteers, which helps."
3. **"It's good to see you."**
   ↳ > **Marco Prestes:** "You too."

## neighbours

Marco takes a cup of coffee from Celia.

> **Marco Prestes:** "There have been a lot of new families arriving on the upper slopes. Some came from Mognagna after the last difficult season. Many of them are looking for work at the port."

He pulls his chair closer to the table.

> **Marco Prestes:** "There are concerns about wages and employment there. Some of the workers have been talking about a strike. I thought you should know."

1. **"Are the unions involved?"**
   ↳ > **Marco Prestes:** "Some of their representatives are talking with the workers. At the moment, people are mostly discussing what they can afford and what they can't."
2. **"Renata mentioned labour negotiations at the cabinet meeting."**
   ↳ > **Marco Prestes:** "Good. I hope they speak to the workers themselves before deciding what an agreement should contain."
3. **"What are the families finding most difficult?"**
   ↳ > **Marco Prestes:** "Rent, transport, food. For people who haven't found regular work, all of it."
4. **"I understand."**

> **Marco Prestes:** "If they decide to strike, I don't intend to tell them they shouldn't. I may be able to help people who are struggling while it happens."

## response

1. **"Give me until the budget. Then judge what we've done."** `[flag: marco_deadline = true]`
   ↳ He nods.
   ↳ > **Marco Prestes:** "All right. I can tell them you're asking for a little time."
2. **"If a strike happens, I expect everyone to respect the law."**
   ↳ > **Marco Prestes:** "So do I. I'll expect the same of the police and the employers."
3. **"Tell me who I could speak to about their concerns."** `[flag: tamarin_names = true]`
   ↳ He takes a small notebook from his pocket and offers several names.
   ↳ > **Marco Prestes:** "They know what the situation is like. I can ask whether they'd be willing to meet."
4. **"If you organize against the government, don't expect my protection."** `[flag: warned_marco = true]`
   ↳ Marco sets his cup down.
   ↳ > **Marco Prestes:** "I'm not asking you for protection, Lara."
   ↳ Celia looks from him to you.
   ↳ > **Celia Vento:** "Would anyone like more coffee?"

## afternoon

Marco stays for a little while longer. Your father brings a small album from the sitting room and shows Amanda a photograph taken at your law-school graduation.

> **Father:** "You were in this one too. Somewhere behind her."

Amanda leans over the photograph.

> **Amanda Troes:** "There I am. I remember that dress."

1. **Look through the album with them.**
   ↳ Several photographs date from your childhood. Your parents disagree about the year in which one of them was taken.
2. **Help Celia clear the table.**
   ↳ She hands you a towel and begins washing the cups.
3. **Step outside for some air.**
   ↳ A neighbour waves from the opposite pavement. You spend a few minutes speaking to her before returning inside.

## departure

The afternoon is drawing to an end. Amanda checks the time and quietly informs you that the cars are ready.

Celia brings a container of food to the door.

> **Celia Vento:** "Take this. You can have it tomorrow."

Your father holds the gate open.

1. **"I'll call when I get back."**
   ↳ > **Celia Vento:** "All right. Safe journey."
2. **"Thank you for lunch."**
   ↳ She smiles and hands the container to you.
3. **Say goodbye to them.**

## car

You walk back down the street with Amanda.

1. **Get into the car.** `[flag: seen_tamarin = true]`

→ END
