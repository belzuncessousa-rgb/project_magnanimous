---
id: p2-arguedas
title: Across the Border
chapter: 2
turn: 3
location: st-veldra
portraits: [arguedas, aroun]
background: residence-garden
---

## arrival

President Tomás Arguedas has spent the morning meeting representatives of the business community in St. Veldra. He arrives for lunch with his foreign minister. Aroun greets them at the entrance to the garden and makes sure the two foreign ministers are seated together.

The staff bring coffee after the dishes have been cleared. Arguedas looks across the garden, where the guests from the morning meeting are still gathering their folders before they leave.

> **Tomás Arguedas:** "My grandfather used to refuse to buy anything made in Kunasai. My father bought one of your cars. My daughter married a Kunasaian. I suppose that is progress."

> **Aroun:** "Where does your son-in-law come from?"

> **Tomás Arguedas:** "Tekoku. We have learned to avoid discussing football."

He smiles, then returns to the papers beside his cup. The top sheet lists customs complaints from several companies. He turns it so you can see the stamps from both governments.

> **Tomás Arguedas:** "I would like us to establish a joint commission on trade and customs. We lose time arguing about individual shipments when we could give our ministries a regular way to deal with these problems."

1. **"What would the commission be allowed to do?"** `→ powers`
2. **"Is there support for this in Arenza?"** `→ support`
3. **"What are you hoping we can build from it?"** `→ proposal`
4. **"What would you want the first agreement to leave outside it?"** `[once]` `→ limits`

## powers

Arguedas reads the first complaint, then puts it beside the copy his foreign minister brought.

> **Tomás Arguedas:** "At first, identify barriers, recommend changes and give our ministries a permanent channel for resolving disputes. The commission would not make an agreement on behalf of either government."

> **Aroun:** "If it works, the ministers can bring their governments an agreement that is specific enough to review. It would not bypass our laws or the approvals each country requires."

Arguedas nods. He doesn't reach for the pen beside the papers.

→ proposal

## support

Arguedas looks at his foreign minister before answering.

> **Tomás Arguedas:** "Exporters will welcome it. Some manufacturers will ask what it means for their jobs. My opponents will ask why I'm spending so much time with you."

> **Aroun:** "We can expect much the same discussion at home. If we keep the first task practical, people can judge the result before we ask them to support something broader."

Arguedas turns his cup once on the saucer.

> **Tomás Arguedas:** "And if we don't agree, we should be able to say that without pretending we did."

→ proposal

## limits

Arguedas closes the folder without stacking the papers inside it.

> **Tomás Arguedas:** "No promise to lower tariffs today. No common foreign policy. And I would not want a commission making rules that our own officials and representatives have not approved."

His foreign minister adds that the two governments would still handle urgent matters through their existing offices.

> **Aroun:** "That gives us a useful test. We can see whether the commission makes ordinary trade problems easier to resolve before either of us changes the scope."

→ proposal

## proposal

Arguedas lays the list of customs complaints between you and Aroun.

> **Tomás Arguedas:** "I want an arrangement that works for both our countries. Arenza is not looking for a patron."

> **Aroun:** "And Kunasai would need to see the same authority on both sides. A commission can give us a place to work. It cannot guarantee that every dispute will go our way."

Arguedas waits for your response. The draft on the table is still only a list of issues and a proposal to continue talking.

1. **"Let's establish the commission as equal partners."** `[flag: np_seed = 1]` `→ equal`
2. **"Could this eventually become a regional political bloc?"** `[flag: np_seed = 2]` `→ ambitious`
3. **"I'm interested in trade, but nothing beyond that for now."** `[flag: np_seed = 3]` `→ trade`
4. **"I would prefer to handle matters through our existing embassies."** `[flag: np_seed = 0]` `→ decline`

## equal

Arguedas glances at his foreign minister. She gathers the copies of the complaints and places one in front of Aroun.

> **Tomás Arguedas:** "Then let our ministers work out an arrangement as equal partners. I will want to see a draft before either of us makes an announcement."

> **Aroun:** "I'll ask our team to begin with the customs problems you have both listed. They can bring us a draft with the authority and approval process made clear."

No one signs the papers at lunch. Arguedas asks the staff to keep the draft between the two offices until both governments have reviewed it.

→ closing

## ambitious

Arguedas raises his eyebrows, but keeps his tone measured.

> **Tomás Arguedas:** "Eventually? Perhaps. But it would be very difficult to explain a political bloc to my parliament before we have shown that we can agree on a truck crossing the border."

> **Aroun:** "A successful commission would give us something to build upon. If our ministers explore the longer-term possibilities, they should also state which powers remain with each government."

Arguedas turns back to the customs list. The first step remains a commission, and the broader idea remains an inquiry rather than an agreement.

1. **"Fair enough. Let's begin with the commission."** `[flag: np_seed = 1]` `→ closing`
2. **"Ask our ministers to outline the longer-term possibilities."** `→ closing`

## trade

Arguedas nods and takes the pen from beside his cup.

> **Tomás Arguedas:** "That's a reasonable place to begin. I'll ask the trade ministry to list the problems a commission could address. We can keep the first draft to customs and trade."

He makes a note on his copy. Aroun asks that both governments name who can approve the eventual terms, so neither side mistakes discussion for authorization.

→ closing

## decline

Arguedas moves the proposal away from the customs complaints.

> **Tomás Arguedas:** "I understand. We can continue to handle these questions through our existing embassies. The proposal remains available if your government changes its mind."

Aroun thanks the foreign minister for bringing the documents. No commission or joint policy is announced.

→ closing

## closing

The conversation returns to less formal matters. Arguedas asks about the restoration of several historic buildings in the city and tells you about similar work in his own capital. His foreign minister and Aroun compare the dates of the next regional trade meeting.

When lunch ends, the two delegations agree to exchange a written record of the discussion. The record will say which proposal was made and which questions remain open; it will not present the commission or a broader partnership as an agreement already in force.

1. **Accompany Arguedas to the waiting cars.** `[flag: seen_arguedas = true]` `→ END`
