---
id: p2-reform-push
chapter: 2
turn: 2
title: The Lessa Motion
kind: fixed
location: capital
token: congress
portraits: [mertens, lessa, livia]
background: vp-office
---

⚙️ Staged rewrite. The filed representation proposal introduces the broader constitutional amendment (PEC) process. No final majority, fixed seat distribution, ratification or automatic vote purchase here. Existing `reform_stance` tracks the government's private working direction; proposed `reform_draft_axis` distinguishes population and economic approaches. This meeting makes no public announcement. Additional package provisions require later negotiated text and approvals.

## opening

Mertens is standing by the window when you enter his office. The television shows a debate in Congress, and he lowers the volume with the remote.

> **Caio Mertens:** "Augusta Lessa filed the motion this morning."

On the screen, Augusta Lessa is speaking to a group of deputies outside the chamber.

> **Caio Mertens:** "She's speaking to the deputies who signed it. Some agreed to put it on the docket and still intend to oppose it when it reaches a vote."

Livia hands you a copy of the document.

> **Livia Harvan:** "This is the initial text. It concerns Senate representation. There are also governors asking for changes to the distribution of powers and federal revenue."

→ overview

Mertens sits down and opens his notebook.

> **Caio Mertens:** "Before we decide how to approach the parties, we should establish what you want to accomplish. There may be an opportunity to address more than one constitutional question in the same process."

## overview

> **Livia Harvan:** "The Senate currently has fifteen members, three from each state. A change to its composition would affect the balance between states in the institutions where the Senate has authority."

> **Caio Mertens:** "The Civic Alliance is interested. The National Front sees an opportunity to improve Tekoku's position. The Capital Party is divided, and several of your own deputies will have serious concerns."

Livia looks at him.

> **Livia Harvan:** "And the OPP will need to be consulted."

> **Caio Mertens:** "Yes. That conversation may be the most interesting one."

→ questions

## questions

1. **"What would a population-based Senate look like?"** `[once]` `→ population`
2. **"What about weighting representation by economic contribution?"** `[once]` `→ economic`
3. **"Could decentralization address some of the same concerns?"** `[once]` `→ states`
4. **"What would it take to pass a constitutional amendment?"** `[once]` `→ procedure`
5. **"Could we leave representation unchanged and pursue other constitutional reforms?"** `[once]` `→ alternatives`
6. **"Let's establish our position."** `→ position`

## population

> **Livia Harvan:** "The larger states would receive more seats relative to the smaller ones. The result depends on how many seats we retain as a minimum, whether we change the size of the Senate and how we allocate the remainder."

> **Caio Mertens:** "A proposal that adds seats without taking any away may be easier to negotiate. It still changes the balance of votes, of course."

1. **"Would the smaller states accept a minimum allocation?"**
   ↳ > **Caio Mertens:** "Some might. We'd need to know how much influence they're losing and what other protections they have."
2. **"We need a proposal with actual numbers."**
   ↳ > **Livia Harvan:** "I'll ask the relevant offices to prepare comparisons."
3. **"I understand."**

→ questions

## economic

> **Livia Harvan:** "There are groups arguing that the states responsible for a larger share of national output should have greater influence over certain federal decisions."

> **Caio Mertens:** "The people making that argument usually come from the states with a larger share of national output."

He turns a page.

> **Caio Mertens:** "It would be a substantially different constitutional principle from population-based representation. We would need to decide how the economic figures are measured and how often the allocation changes."

1. **"Would the allocation change as states develop?"**
   ↳ > **Livia Harvan:** "It would have to, unless the weights were permanently fixed. That would create its own questions about the stability of representation."
2. **"We should examine both approaches."**
   ↳ > **Livia Harvan:** "I'll include them in the comparisons."
3. **"Understood."**

→ questions

## states

> **Livia Harvan:** "We could give state governments more responsibility for certain policies and more control over the revenue used to carry them out."

> **Caio Mertens:** "That would interest several governors. They don't all want the same powers, and some are much more interested in the money than in the responsibilities."

1. **"Could we protect poorer states from losing funding?"**
   ↳ > **Livia Harvan:** "We could propose a transfer formula or other safeguards. The financial implications would need to be assessed."
2. **"Could we combine decentralization with representation reform?"**
   ↳ > **Caio Mertens:** "Certainly. Whether the same coalition will support both is another question."
3. **"Let's consider the details later."**

→ questions

## procedure

Mertens takes a blank sheet from his notebook.

> **Caio Mertens:** "A constitutional amendment needs more support than an ordinary bill, and changing the federal arrangement also involves the Senate. We should not assume that success in one chamber guarantees success in the other."

> **Livia Harvan:** "We will need a settled text, a clear account of its financial implications and commitments from the parties. The required votes must be established before we schedule the final decision."

1. **"Can we negotiate provisions with parties individually?"**
   ↳ > **Caio Mertens:** "Yes. That's usually the only way to find a majority for something this complicated. Just make sure we don't promise two parties incompatible things."
2. **"Could you lead some of those negotiations?"**
   ↳ > **Caio Mertens:** "Gladly. I'll need to know what I am authorized to offer."
3. **"I intend to speak with the principal parties myself."**
   ↳ > **Livia Harvan:** "I'll arrange the meetings."
4. **"I understand."**

→ questions

## alternatives

> **Caio Mertens:** "We could oppose Lessa's proposal and still pursue other changes. Or we could decide not to spend the government's time on constitutional reform at all."

> **Livia Harvan:** "There are other matters that could require legislative or constitutional action later in the term. We should distinguish them from the decision before us today."

→ questions

## position

Livia opens a clean page.

> **Livia Harvan:** "What should we use as the starting point for our discussions?"

1. **"Explore a population-based allocation of Senate seats."** `[flag: reform_stance = 1]` `[flag: reform_draft_axis = 1]`
   ↳ > **Caio Mertens:** "Then we'll examine the numbers and speak to the parties concerned."
2. **"Explore representation weighted by economic contribution."** `[flag: reform_stance = 1]` `[flag: reform_draft_axis = 2]`
   ↳ Livia looks up from her notes.
   ↳ > **Livia Harvan:** "I'll have both the constitutional and financial implications assessed."
3. **"Retain the Senate's present composition and explore decentralization."** `[flag: reform_stance = 4]` `[flag: decentralisation_seed = true]`
   ↳ > **Caio Mertens:** "I'll speak with the governors' representatives and see which parties would be interested."
4. **"Oppose the representation proposal."** `[flag: reform_stance = 3]`
   ↳ > **Livia Harvan:** "We'll need to decide whether to present that position publicly."
5. **"Let the parties discuss it without a government commitment for now."** `[flag: reform_stance = 2]`
   ↳ > **Caio Mertens:** "All right. We'll keep track of the proposals that emerge."

## lessa

> **Livia Harvan:** "Senator Lessa has asked for another meeting. She is in the building today, if you would like to see her."

1. **"Let her come in."** `→ lessa-in`
2. **"Arrange a separate meeting when we have a proposal."** `→ close`

## lessa-in

Lessa arrives a few minutes later. Mertens moves his notebook aside to make space for her papers.

> **Augusta Lessa:** "Thank you for seeing me again. I hope the government has had an opportunity to examine the text."

1. **"We are examining a population-based allocation."** `[show if: flag.reform_stance == 1 && flag.reform_draft_axis == 1]`
   ↳ She smiles.
   ↳ > **Augusta Lessa:** "I would be very happy to work with your office on the details."
2. **"We want to examine economic weighting."** `[show if: flag.reform_stance == 1 && flag.reform_draft_axis == 2]`
   ↳ She looks down at her document.
   ↳ > **Augusta Lessa:** "I would prefer population. But I am prepared to discuss the alternatives."
3. **"We are considering decentralization instead."** `[show if: flag.reform_stance == 4]`
   ↳ > **Augusta Lessa:** "I will want to see how your proposal addresses the concerns that led me to file mine."
4. **"The government doesn't intend to support the proposal."** `[show if: flag.reform_stance == 3]`
   ↳ Lessa sits back.
   ↳ > **Augusta Lessa:** "Then I will continue discussing it with the parties. I hope you will reconsider when the terms are clearer."
5. **"We haven't settled a government position yet."** `[show if: flag.reform_stance == 2]`
   ↳ > **Augusta Lessa:** "I understand. I would appreciate the opportunity to participate in the discussions."
6. **"I'd like to hear more from you before discussing our position."**
   ↳ Lessa takes her own copy from the folder. “Then let me show you which part my cosponsors have agreed to.” She leaves Lara a copy. No government position is disclosed by this line.

→ lessa-out

## lessa-out

She thanks you and leaves.

→ close

## close

Mertens closes his notebook.

> **Caio Mertens:** "I'll prepare a list of people we should speak to. We can establish what is genuinely negotiable before committing ourselves to a final text."

1. **"Good. Bring me the list."** `[flag: seen_reform_push = true]`

→ END
