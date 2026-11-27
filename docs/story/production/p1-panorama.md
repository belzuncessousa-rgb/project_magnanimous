---
id: p1-panorama
chapter: 1
turn: 1
title: Counting Votes
kind: fixed
location: capital
token: congress
order: 3
when: "flag.seen_blue_room"
portraits: [mertens, livia]
background: vp-office
---

⚙️ Staged production draft. Congress arithmetic from current world.json (100 seats). Senate rules provisional; preserve existing separation of ordinary votes from Senate ratification pending PEC design. Existing port flag values 1 accept, 2 compromise, 3 refuse, 4 defer preserved to match staged First Night. No resource costs. Relationship deltas and precise appointment/reciprocal commitment mechanics require testing; nomination alone is not automatic corruption. Conditional callback uses actual promised_integrity flag from staged inauguration.

## opening

The vice president's office is in an annex behind the palace. There is a small sitting area beside the windows and a television showing coverage of the inauguration.

Mertens is pouring coffee when you arrive. He points towards an empty cup on the table.

> **Caio Mertens:** "Would you like some?"

Livia is sitting on the sofa with a folder open on her lap.

1. **"Please."**
   ↳ He fills the cup and brings it over.
2. **"No, thank you."**

## overview

> **Livia Harvan:** "We've prepared a summary of the composition of Congress."

She hands you a sheet. The parties are arranged in columns with the number of seats beside each name.

> **Livia Harvan:** "One hundred seats in total. Fifty-one for an ordinary majority."

> **Caio Mertens:** "Twenty-four for the Popular Movement, twenty for the OPP. The Communist Vanguard supported you during the election, and they have six."

> "That makes fifty."

> **Caio Mertens:** "It does. And I'd recommend against counting the Communists before we've seen what we're voting on."

Livia points to the other column.

> **Livia Harvan:** "Seventeen for the Capital Party, twelve for the National Front, nine for Faith and Family, eight for the Civic Alliance and four independents."

Mertens sits down opposite you.

> **Caio Mertens:** "Most of the time, we'll have to negotiate with two or three groups. It depends on the issue."

1. **"Who would you approach first?"**
   ↳ > **Caio Mertens:** "I'd start with the parties that have something to gain from the proposal. Then find out how many votes we're still missing."
2. **"What if our own coalition disagrees?"**
   ↳ > **Livia Harvan:** "We should identify its disagreements before introducing the bill. It will be considerably easier to negotiate while the text is still being prepared."
3. **"Let's go through the parties."**

→ parties

## parties

1. **"How united is the Popular Movement?"** `[once]` `→ q-pm`
2. **"Tell me about your party, Caio."** `[once]` `→ q-opp`
3. **"The Capital Party."** `[once]` `→ q-cp`
4. **"The National Front."** `[once]` `→ q-nf`
5. **"Faith and Family."** `[once]` `→ q-fff`
6. **"The Civic Alliance."** `[once]` `→ q-ca`
7. **"The Communist Vanguard."** `[once]` `→ q-cv`
8. **"What about the independents and the Senate?"** `[once]` `→ q-ind`
9. **"That's enough for now."** `→ price`

## q-pm

> **Livia Harvan:** "Your party has a fairly broad base. Some of its deputies have spent years campaigning for social reform. Others have built their careers around particular regions or municipalities."

> **Caio Mertens:** "Pelan Avros leads the bench. He knows all of them, including the ones who don't particularly like him."

1. **"Will Pelan support the government's programme?"**
   ↳ > **Caio Mertens:** "I expect so, provided his people have an opportunity to influence it. I'd meet him early."
2. **"I'll speak to Pelan myself."**
   ↳ Livia makes a note.
   ↳ > **Livia Harvan:** "I'll find a suitable time."
3. **"All right."**

→ parties

## q-opp

Mertens sets his cup down.

> **Caio Mertens:** "You will rarely find twenty OPP deputies with the same opinion about a policy. What Odel is very good at is finding something that gives all of them an interest in supporting it."

> **Livia Harvan:** "Our coalition agreement gives the party a place in government. It doesn't settle the details of every future vote."

> **Caio Mertens:** "Exactly. Sometimes the deputies will want a change to the bill. Sometimes they'll want an investment in their constituencies. And sometimes they'll want something that has very little to do with the legislation."

1. **"Are there matters on which your party won't compromise?"**
   ↳ Mertens glances at Livia.
   ↳ > **Caio Mertens:** "Electoral reform that threatens its position. And measures directed against its own members. Those will be very difficult discussions."
   ↳ > **Livia Harvan:** "I'd advise you to speak with Odel directly before pursuing either."
2. **"Does an agreement on one bill help us with the next?"**
   ↳ > **Caio Mertens:** "If you've kept your part of the agreement, yes. If you've promised him something and he is still waiting, probably not."
3. **"I understand."**

→ parties

## q-cp

> **Caio Mertens:** "The Capital Party governed until the election. They have important supporters in the business community and among the large agricultural producers."

> **Livia Harvan:** "Lucas Belzens speaks for the national party, but Vando Trembolo has considerable influence over the deputies. Their priorities don't always coincide."

1. **"Could we work with Belzens?"**
   ↳ > **Caio Mertens:** "On some subjects, certainly. He's interested in growth, industrial development and private enterprise. Vando will want to know how any agreement affects the agricultural sector."
2. **"Will the scandal still affect them?"**
   ↳ > **Livia Harvan:** "It will affect how they present themselves publicly. They will be particularly sensitive to allegations involving the previous government."
3. **"Let's move on."**

→ parties

## q-nf

> **Caio Mertens:** "Solano's party has its strongest support in Tekoku. Its deputies generally favour national sovereignty, a strong defense establishment and a much more restrictive approach to foreign influence."

> **Livia Harvan:** "They may support proposals on those subjects, although they have little interest in making the government look successful."

> **Caio Mertens:** "Solano came rather close to sitting in your office himself."

1. **"Is there much difference between Solano and his deputies?"**
   ↳ > **Caio Mertens:** "There are differences. We shouldn't assume that every member of the National Front would take the same position Solano would."
2. **"Understood."**

→ parties

## q-fff

> **Livia Harvan:** "Faith and Family has a strong presence among congregations of the Tabernacle. Several of its leaders are pastors."

> **Caio Mertens:** "They have nine seats. On questions of religion and family policy, they'll be quite firm. On other matters there is more room for discussion."

1. **"Who should we speak to?"**
   ↳ > **Caio Mertens:** "Pastor Muul leads their bench. I'll arrange a meeting if we need one."
2. **"Thank you."**

→ parties

## q-ca

> **Livia Harvan:** "The Civic Alliance is particularly interested in education, research and the quality of public administration. Its support is concentrated among the more educated urban population."

> **Caio Mertens:** "Roan Telves is quite serious about the idea that people exercising political authority should be qualified to do so."

1. **"What does he mean by qualified?"**
   ↳ > **Livia Harvan:** "There are proposals within the party for educational requirements for certain offices. They don't all agree on how far those requirements should extend."
   ↳ > **Caio Mertens:** "On a good education bill, we might find ourselves with eight useful votes."
2. **"I see."**

→ parties

## q-cv

> **Livia Harvan:** "The Communist Vanguard supported your candidacy but chose not to join the cabinet. Their cooperation will depend on the policies we pursue."

> **Caio Mertens:** "Ziara Keln is unlikely to be persuaded by an appointment or a ceremonial post. Her party will want to see something substantial in the bill."

1. **"What would they consider substantial?"**
   ↳ > **Livia Harvan:** "Land reform, public ownership, improvements in labour rights and living conditions. They'll be particularly interested in what happens in the poorer regions."
2. **"Let's continue."**

→ parties

## q-ind

> **Livia Harvan:** "The independents have different constituencies and interests. We should approach them individually when we know what we need."

> **Caio Mertens:** "As for the Senate, each state elects three senators. Fifteen in total. They have a separate role in appointments, treaties and changes to the federal arrangement."

1. **"Has anyone proposed changing the number of senators?"**
   ↳ > **Livia Harvan:** "Several times. The larger states have argued for a different distribution of representation."
   ↳ > **Caio Mertens:** "There are people who intend to bring that question before you quite soon."
2. **"We'll come back to the Senate later."**

→ parties

## price

Livia takes a second sheet from her folder and slides it across the coffee table towards you. A list of departments occupies most of the page, with the requested number of appointments beside each one.

> **Livia Harvan:** "There's one appointment we should discuss while we're all here. The Port Authority of Katanaí."

> **Caio Mertens:** "Odel has been asking me about that since the election."

> **Livia Harvan:** "He would like to nominate the director and fill about forty positions in the authority. Most of them are supervisory posts."

> **Caio Mertens:** "He originally asked for sixty."

Livia gives him a stern look.

> **Livia Harvan:** "Fifty-two."

> **Caio Mertens:** "Did he? Well, we got him down to forty."

He smiles at her, but she is already looking back at the list.

The port was at the centre of the bribery scandal that brought down the previous government. You recognise several of the departments on the page.

→ port-hub

## port-hub

1. **"Why does Odel want the port?"** `[once]` `→ port-why`
2. **"Do we know who would get these jobs?"** `[once]` `→ port-jobs`
3. **"What would we get in return?"** `[once]` `→ port-return`
4. **"The last government fell over this port."** `[once]` `→ port-scandal`
5. **"I promised appointments would be made on merit."** `[show if: flag.promised_integrity]` `[once]` `→ port-pledge`
6. **"Is this the first of many requests?"** `[once]` `→ port-requests`
7. **"I'm ready to decide."** `→ port-decision`

## port-why

> **Caio Mertens:** "It's one of the largest public employers in the city. A few of our deputies have been asking for appointments there for years. Odel can keep several people happy with one agreement."

> **Livia Harvan:** "And the director has considerable discretion over spending. That's the appointment we should pay particular attention to."

Mertens nods and reaches for his coffee.

→ port-hub

## port-jobs

> **Livia Harvan:** "Not yet. I've asked the party for a list of names. We can insist on the ordinary qualification requirements."

> **Caio Mertens:** "I suspect some of those names have been waiting in Odel's desk for a very long time."

Livia frowns.

> **Livia Harvan:** "Then I hope he's had time to check their qualifications."

1. **"And if they aren't qualified?"** `→ port-qualified`
2. **"At least someone has been preparing for our government."**
   ↳ Mertens laughs.
   ↳ > **Caio Mertens:** "Oh, they'd prepared for Solano's as well."
   ↳ Livia presses her lips together, though a moment later she is smiling too.
3. **Look through the list in silence.**
   ↳ Livia waits while you read. Mertens finishes his coffee.
4. **"All right. Let's move on."**

→ port-hub

## port-qualified

> **Livia Harvan:** "We send the names back. It would be easier to establish the requirements before we agree to anything."

> **Caio Mertens:** "Yes. We can make that part of any agreement you decide to offer."

> "All right."

Livia places the list between you again.

→ port-hub

## port-return

> **Caio Mertens:** "A rather more cooperative coalition partner when we present the budget. I wouldn't pretend this buys you every vote for the next four years."

> **Livia Harvan:** "We should agree on what support the party is committing to before we send any names to the port."

Mertens tilts his head towards her.

> **Caio Mertens:** "Which is precisely why I'd like to have this settled before the budget meeting."

1. **"Can you guarantee their support?"**
   ↳ He considers the question for a moment.
   ↳ > **Caio Mertens:** "For a budget they've seen and agreed to, quite possibly. If you want them to approve a budget they haven't read, we'll have to discuss that separately."
2. **"I'd rather have the agreement in writing."**
   ↳ > **Livia Harvan:** "I can prepare a record of the commitments once we've negotiated them."
   ↳ Mertens looks somewhat amused.
   ↳ > **Caio Mertens:** "I don't think Odel will want a copy framed in his office, but we can certainly make the terms clear."
3. **"Understood."**

→ port-hub

## port-scandal

Livia leans forward.

> **Livia Harvan:** "Yes. And the first appointments we make there will receive considerable attention. We should be prepared to explain them."

Mertens glances down at the sheet.

> **Caio Mertens:** "I told Odel much the same thing. He seems to think enough time has passed."

> **Livia Harvan:** "It's been a month, Caio."

> **Caio Mertens:** "I know."

→ port-hub

## port-pledge

> **Livia Harvan:** "Yes. I expect the newspapers will compare our first appointments with what you said this morning."

> **Caio Mertens:** "There are people in my party who could do these jobs perfectly well. We would need to establish that before any appointments were announced."

1. **"I want any appointments to stand up to scrutiny."**
   ↳ > **Livia Harvan:** "I'll make sure we have the appropriate documentation if you decide to proceed."
2. **"I'll take that into account."**

→ port-hub

## port-requests

Mertens smiles.

> **Caio Mertens:** "From Odel? Certainly."

Livia closes the folder on her lap.

> **Livia Harvan:** "We'll have to establish which appointments you are willing to negotiate and which you intend to keep outside the coalition agreement. It would save us a great deal of time."

→ port-hub

## port-decision

1. **"Let the OPP nominate all forty officials and the director."** `[flag: opp_price_1 = 1]` `[flag: opp_port_authority = true]` `→ port-accept`
2. **"Keep the director independent. Consider the other nominees on merit."** `[flag: opp_price_1 = 2]` `→ port-compromise`
3. **"No political appointments at the port."** `[flag: opp_price_1 = 3]` `→ port-refuse`
4. **"No agreement until we've negotiated the budget."** `[flag: opp_price_1 = 4]` `→ port-defer`

## port-accept

Livia draws the sheet back towards her and writes a note at the top.

> **Livia Harvan:** "I'll ask for the names today."

Mertens looks pleased.

> **Caio Mertens:** "I'll speak to Odel about the budget this afternoon."

1. **"Make sure the candidates meet the requirements."** `[flag: port_require_qualifications = true]`
   ↳ > **Livia Harvan:** "I'll arrange for the list to be reviewed."
2. **"Keep me informed."**

→ close

## port-compromise

Mertens picks up the sheet and studies the list, his brow slightly furrowed.

> **Caio Mertens:** "He'll want to know which posts he's actually getting."

> **Livia Harvan:** "Then he can send us the candidates and we'll tell him."

He reads the list once more.

> **Caio Mertens:** "Fine. Give me a day with him."

→ close

## port-defer

> **Caio Mertens:** "I can take that back to him. He may want a little more by then."

Livia makes a small note.

> **Livia Harvan:** "I'll keep the appointments on hold."

→ close

## port-refuse

Mertens's smile fades. He looks down at the list for a few seconds.

> **Caio Mertens:** "All right. We'll have to find him something else."

> **Livia Harvan:** "I'll have the relevant positions filled through the usual process."

He folds his copy of the list and puts it into his jacket pocket. When he speaks again, his tone is more serious.

> **Caio Mertens:** "If there are other restrictions on what I can negotiate, Lara, I'd like to know about them before I go back to Congress."

1. **"I'll consider your proposals. Just not this one."**
   ↳ He nods, looking a little less concerned.
   ↳ > **Caio Mertens:** "Fair enough."
2. **"I don't intend to trade public offices for votes."** `[flag: patronage_redline = true]`
   ↳ > **Caio Mertens:** "Then we'd better find something the parties want that you're willing to give them."
   ↳ Livia looks up from her notes.
   ↳ > **Livia Harvan:** "I'll make sure that is clear in the next round of negotiations."
3. **"We'll discuss that another time."**
   ↳ > **Caio Mertens:** "Of course."

→ close

## close

Livia checks her phone.

> **Livia Harvan:** "Amanda is waiting in your office. She'd like to show you the new diary system before the end of the day."

Mertens stands and starts collecting the empty cups.

> **Caio Mertens:** "I'll let you know when I've spoken to Odel."

1. **Return to your office.** `[flag: seen_panorama = true]`

→ END
