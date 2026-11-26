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

Aroun arrives with a slim folder and a copy of a letter bearing the seal of Archduke Casimir of Mondrath.

> **Aroun:** Their chancellery has informed us that pilotage fees in the strait will increase by fifteen percent. The stated purpose is maintenance of the navigation infrastructure. Vassel has received the same notice.

She hands you a map of the shipping routes.

> **Aroun:** Our exporters are already asking whether the government intends to intervene.

1. **"Is this directed at Kunasai?"** `→ motive`
2. **"How much would it affect our economy?"** `→ impact`
3. **"What alternatives do we have?"** `→ alternatives`
4. **"Let's discuss our response."** `→ response`

## motive

> **Aroun:** We have no indication that it is. Mondrath has been quite consistent about keeping its affairs separate from ours. We should be careful about treating an administrative change as a provocation.

→ response

## impact

> **Aroun:** It matters most to firms that depend on frequent passage through the strait. The precise effect depends on their contracts and how much of the additional cost they can pass on.

→ response

## alternatives

> **Aroun:** Better railway connections to Tekoku would give some producers other options. But there is no immediate substitute for every shipment. We can also discuss joint arrangements with Vassel.

→ response

## response

1. **"Acknowledge the notice and request the relevant cost calculations."** `[flag: mondrath_reply = 1]` `→ close`
2. **"Send a formal protest. We should have been consulted."** `[flag: mondrath_reply = 2]` `→ protest`
3. **"Invite Mondrath and Vassel to discuss a regional shipping agreement."** `[flag: mondrath_reply = 3]` `→ talks`
4. **"No government response is necessary at present."** `[flag: mondrath_reply = 0]` `→ close`

## protest

Aroun takes a moment to consider your wording.

> **Aroun:** I will make clear that our objection concerns the economic impact and the lack of consultation. We have no reason to challenge their sovereignty.

→ close

## talks

> **Aroun:** We can extend the invitation. I would avoid promising our exporters a reduction until we know whether both governments are willing to participate.

→ close

## close

Aroun closes the folder.

> **Aroun:** I will prepare the appropriate correspondence and ask our trade department for a more detailed assessment.

1. **Thank her.** `[flag: seen_mondrath = true]` `→ END`
