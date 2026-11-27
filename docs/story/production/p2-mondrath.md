---
id: p2-mondrath
title: The Strait
chapter: 2
turn: 3
location: capital
portraits: [aroun]
background: president-office
---

## letter

Aroun is waiting in your office when you return from the morning briefing. She has set a letter on the map table, its seal already broken, and placed a second sheet beneath it to keep the map from rolling shut.

> **Aroun:** "The chancellery in Mondrath has notified us that pilotage fees in the strait will rise by fifteen percent. They describe it as an adjustment to cover navigation maintenance."

She moves the letter aside. The map shows the shipping lanes between Kunasai, Mondrath and Vassel. A note from the trade office marks the routes used by exporters who make the crossing most often.

> **Aroun:** "Vassel received the same notice. We don't know yet how much of the increase will reach our firms. Some contracts pass the charge on to the exporter; others may absorb it until they come up for renewal."

Outside the open door, an aide waits with the next folder. Aroun notices you looking over.

> **Aroun:** "I asked them to give us a few minutes. The exporters want to know whether we intend to intervene. I don't think we should answer that until we decide what we know."

→ questions

## questions

1. **"Is this directed at Kunasai?"** `[once]` `→ motive`
2. **"How much could it cost our exporters?"** `[once]` `→ impact`
3. **"What alternatives do we have?"** `[once]` `→ alternatives`
4. **"Let's decide what to send back."** `→ response`

## motive

Aroun turns the letter so you can see the paragraph about maintenance.

> **Aroun:** "We have no evidence that it is. Mondrath has kept its shipping rules separate from ours before. The notice went to Vassel as well. If we call it a provocation now, we may make it harder to ask for the information we need."

She leaves the letter beside the map rather than returning it to the folder.

→ questions
## impact

Aroun takes the trade office's note from beneath the map. The figures are estimates, with a line beside each route for the contracts they still need to review.

> **Aroun:** "The firms with frequent crossings are most exposed. A larger shipment doesn't always mean a larger fee; it depends on the vessel and the terms agreed with the operator. We can ask for a better estimate, but it won't tell us what each company has promised its customers."

> **Aroun:** "If we announce a figure now, people may treat it as the final cost. I'd rather tell them what we can confirm and when we'll know more."

→ questions
## alternatives

Aroun traces one route on the map, then sets the pencil down before it reaches the border.

> **Aroun:** "Better rail connections through Tekoku would give some producers another route over time. It isn't a replacement for every shipment, and we don't have the capacity to redirect all of them now."

> **Aroun:** "We could also talk with Vassel about coordinating our response. That would give the two of us more information. It would not, by itself, change the fees Mondrath has set."

She looks back at the letter.

> **Aroun:** "For now, we can ask questions, make a formal objection, or see whether all three governments are willing to talk. Each asks something different of the relationship."

→ questions
## response

The aide at the door closes the folder she is holding and waits. Aroun leaves the space beside the letter clear for your reply.

> **Aroun:** "We can acknowledge the notice and ask for the calculations. We can protest that Kunasai was not consulted. Or we can invite Mondrath and Vassel to discuss a regional arrangement."

She taps the note from the exporters.

> **Aroun:** "A protest puts our objection on the record, but we should be precise about what we are objecting to. The three-party invitation may open a useful channel, though we cannot promise the firms a reduction. A request for figures gives us time to assess the cost; for now, the exporters will still be waiting for an answer."

1. **"Acknowledge the notice and request the cost calculations."** `[flag: mondrath_reply = 1]` `→ close`
2. **"Send a formal protest. We should have been consulted."** `[flag: mondrath_reply = 2]` `→ protest`
3. **"Invite Mondrath and Vassel to discuss a regional shipping agreement."** `[flag: mondrath_reply = 3]` `→ talks`
4. **"No government response is necessary at present."** `[flag: mondrath_reply = 0]` `→ no-response`

## protest

Aroun reads the sentence again before she answers.

> **Aroun:** "I can make clear that the increase affects our exporters and that we were not consulted. I recommend we acknowledge their stated reason for it. That leaves room to challenge the cost without claiming they have no right to set it."

She writes a line on the response sheet, then turns it towards you. The protest will place Kunasai's objection on the record. It will not prevent Mondrath from applying the fee while discussions continue.

→ close

## talks

Aroun takes a clean sheet from the folder and writes the names of the three foreign ministries across the top.

> **Aroun:** "We can invite them to compare the maintenance plans and discuss how the charges are calculated. If they agree, we may have a channel for other shipping questions too."

She pauses before adding a date.

> **Aroun:** "I'd leave the fee itself open. Until they answer, we should not tell our exporters that a meeting will secure a reduction."

→ close

## no-response

Aroun returns the letter to its folder and leaves the trade office's note on the map.

> **Aroun:** "All right. I'll put the letter on file. If exporters ask, Trade can explain what the notice says; we don't have a calculation to give them yet. We won't send a diplomatic response for now."

She looks once more at the exporters' routes.

> **Aroun:** "They may still ask what the government intends to do. We should be clear that this is a decision not to intervene now, not an agreement with the increase."

1. **"That's clear. Thank you."** `[flag: seen_mondrath = true]` `→ END`

## close

Aroun places the response sheet beside the letter. The map is still open beneath them, the routes marked in different colours by the trade office.

> **Aroun:** "I'll prepare the correspondence you chose and ask Trade to check the figures against the contracts. We can give the exporters an update when we know what the fee means for them."

The aide at the door asks whether she should return later for the folder.

1. **"Thank you. Send the response when it's ready."** `[flag: seen_mondrath = true]` `→ END`
