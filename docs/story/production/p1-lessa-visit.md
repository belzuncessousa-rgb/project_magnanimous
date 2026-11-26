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

⚙️ Staged rewrite. Introduce representation issue as genuine federal compromise and distinguish population/economic weighting/decentralization without deciding final PEC. Existing reform_stance values maintained (1 open, 2 skeptical, 3 opposed/defer, 4 explore decentralization). Private statements are not instantly public; future disclosure/news must respect actual actions and flags. Senate powers provisional pending constitutional design. No automatic regional approval shift from a private conversation.

## arrival

Livia accompanies Senator Augusta Lessa into your office. Lessa has represented Ibicuí in the Senate for twelve years and belongs to the Capital Party. You are familiar with her from your own time in Congress; she is a persistent speaker on matters affecting your home state.

She places a folder on the table and shakes your hand.

> **Augusta Lessa:** "Congratulations, Madam President. I hope you've had an opportunity to settle in."

> "Please, sit."

Livia takes a chair beside the table.

> **Augusta Lessa:** "I've brought something I've been discussing with successive governments for a number of years. I thought this might be a good time to raise it again."

## numbers

She opens her folder to a table of figures.

> **Augusta Lessa:** "Every state elects three senators. Ibicuí has a hundred million inhabitants. Ibira has thirty million. In the Senate, both states have the same number of votes."

She slides the table towards you.

> **Augusta Lessa:** "When the Senate considers changes to the federal arrangement or other matters within its jurisdiction, the votes representing the larger states carry much less weight per inhabitant."

Livia studies the page.

> **Livia Harvan:** "That arrangement was part of the compromise reached when the democratic constitution was adopted."

> **Augusta Lessa:** "I know. The smaller states were concerned that they would have little influence under a system based on population. I would argue that the present arrangement has consequences of its own."

She looks at you.

> **Augusta Lessa:** "I would like the government to consider a different allocation of seats."

→ questions

## questions

1. **"What distribution are you proposing?"** `[once]` `→ distribution`
2. **"How would the smaller states retain a meaningful voice?"** `[once]` `→ small-states`
3. **"Who supports the proposal?"** `[once]` `→ supporters`
4. **"How would this affect your own party?"** `[once]` `→ capital-party`
5. **"Could we address the problem through decentralization instead?"** `[once]` `→ decentralization`
6. **"What do you need from the government today?"** `→ stance`

## distribution

> **Augusta Lessa:** "My preference is for a distribution that reflects population more closely. We can discuss a minimum number for every state and how to allocate the remainder."

> **Livia Harvan:** "Some groups have also proposed taking economic contribution into account."

Lessa gives a small nod.

> **Augusta Lessa:** "Yes. There are people in Ibicuí and Tekoku who are interested in that approach. I would prefer to begin with population. It will be easier to defend as a principle."

1. **"Would you accept a compromise combining those approaches?"**
   ↳ > **Augusta Lessa:** "I would read any serious proposal. I would want to see what it means for the actual distribution."
2. **"Understood."**

→ questions

## small-states

> **Augusta Lessa:** "They would still elect representatives, and the Senate would still have a role separate from Congress. We could retain a minimum allocation for each state."

Livia turns the table towards herself.

> **Livia Harvan:** "The question is how much their relative influence would change. Mognagna and Ibira rely considerably on decisions about federal expenditure and transfers."

Lessa nods.

> **Augusta Lessa:** "That will have to be part of the negotiation."

1. **"Would you consider safeguards for federal transfers?"**
   ↳ > **Augusta Lessa:** "If there are legitimate concerns about how funds would be distributed, I think we should examine them separately and make the protections explicit."
2. **"I see the difficulty."**

→ questions

## supporters

> **Augusta Lessa:** "A number of representatives from Ibicuí and Tekoku, including members of the Civic Alliance and National Front. There is support in my own party, although it is not unanimous."

> **Livia Harvan:** "The smaller states will need to be represented in these discussions as well."

> **Augusta Lessa:** "Of course. We will need their votes for any amendment to the federal arrangement."

→ questions

## capital-party

Lessa smiles.

> **Augusta Lessa:** "Some of my colleagues in Tapira have expressed their objections at considerable length. I have been hearing them for years."

1. **"Would the party support a proposal its own members oppose?"**
   ↳ > **Augusta Lessa:** "It would depend on the proposal and the negotiations. I don't claim to have all their votes today."
2. **"Fair enough."**

→ questions

## decentralization

> **Augusta Lessa:** "Giving the states greater control of their own affairs would reduce the number of decisions on which they depend on the federal government."

> **Livia Harvan:** "It would also change the distribution of responsibilities and revenue. The governors would have a considerable interest in the details."

Lessa considers this.

> **Augusta Lessa:** "I would be willing to discuss it. It may address some of the concerns that brought me here."

→ questions

## stance

> **Augusta Lessa:** "For now, I want to know whether you would be prepared to discuss a reform. I am not asking you to endorse a finished amendment."

1. **"I'm open to changing the distribution of Senate seats."** `[flag: reform_stance = 1]`
   ↳ Lessa smiles.
   ↳ > **Augusta Lessa:** "Thank you. I can prepare a more detailed proposal for discussion."
2. **"I'm concerned about weakening the smaller states."** `[flag: reform_stance = 2]`
   ↳ > **Augusta Lessa:** "I expected that concern. I would still appreciate an opportunity to show you the alternatives."
3. **"Explore decentralization before changing Senate representation."** `[flag: reform_stance = 4]` `[flag: decentralisation_seed = true]`
   ↳ She looks towards Livia.
   ↳ > **Augusta Lessa:** "I'll ask my office to put together a few possibilities."
4. **"The government has other priorities. I don't intend to pursue this now."** `[flag: reform_stance = 3]`
   ↳ She closes her folder.
   ↳ > **Augusta Lessa:** "Then I will continue discussing it with my colleagues. I hope we'll return to the question later."

## publicity

Lessa gathers her papers.

> **Augusta Lessa:** "If anyone asks about the meeting, what may I tell them about the government's position?"

1. **"You may accurately describe what I've told you."** `[flag: reform_stance_public = true]`
   ↳ > **Augusta Lessa:** "Of course."
2. **"Say that we've discussed representation. Leave my position private for now."**
   ↳ > **Augusta Lessa:** "Very well."

She thanks you and leaves.

## livia

Livia remains seated. She looks down at her notes and then up at you.

> **Livia Harvan:** "Odel will be interested in that meeting. The OPP has serious reservations about changes to electoral arrangements. I would recommend that we speak with him before a proposal is presented publicly."

1. **"Tell him exactly what we discussed."**
   ↳ > **Livia Harvan:** "I'll arrange a conversation."
2. **"Let him know we haven't committed to a text."**
   ↳ She nods.
   ↳ > **Livia Harvan:** "That should be clear enough for now."
3. **"I want to speak to him myself."**
   ↳ > **Livia Harvan:** "I'll find a time."
4. **"Keep this meeting within the office for now."**
   ↳ She hesitates.
   ↳ > **Livia Harvan:** "Understood. I can't guarantee what he may hear from the senator or her colleagues."

## close

1. **Return to work.** `[flag: lessa_met = true]` `[flag: seen_lessa_visit = true]`

→ END
