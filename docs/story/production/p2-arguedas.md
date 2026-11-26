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

President Tomás Arguedas has spent the morning meeting representatives of the business community in St. Veldra. He arrives for lunch accompanied by his foreign minister, who joins Aroun at the other end of the table.

Arguedas looks out across the garden as the staff bring coffee.

> **Arguedas:** My grandfather used to refuse to buy anything made in Kunasai. My father bought one of your cars. My daughter married a Kunasaian. I suppose that is progress.

> **Aroun:** Where does your son-in-law come from?

> **Arguedas:** Tekoku. We have learned to avoid discussing football.

He smiles, then sets his cup down.

> **Arguedas:** I would like us to establish a joint commission on trade and customs. We lose a great deal of time arguing about individual shipments when we could settle many of these problems permanently.

1. **"What would the commission be empowered to do?"** `→ powers`
2. **"Is there support for this in Arenza?"** `→ support`
3. **"Tell me what you have in mind."** `→ proposal`

## powers

> **Arguedas:** Initially, identify barriers, recommend changes, and give our ministries a permanent channel for resolving disputes. Any agreement would still go through our respective governments.

→ proposal

## support

> **Arguedas:** Exporters will welcome it. Some manufacturers will ask what it means for their jobs. And my opponents will ask why I am spending so much time with you.

Aroun nods.

> **Aroun:** We can expect much the same discussion at home.

→ proposal

## proposal

> **Arguedas:** I am interested in an arrangement that works for both our countries. Arenza is not looking for a patron.

1. **"Let's establish the commission as equal partners."** `[flag: np_seed = 1]` `→ equal`
2. **"Could this eventually become a regional political bloc?"** `[flag: np_seed = 2]` `→ ambitious`
3. **"I'm interested in trade, but nothing beyond that for now."** `[flag: np_seed = 3]` `→ trade`
4. **"I would prefer to handle matters through our existing embassies."** `[flag: np_seed = 0]` `→ decline`

## equal

Arguedas extends his hand across the table.

> **Arguedas:** Then let our ministers work out the arrangements together. I will want to see a draft before either of us makes an announcement.

→ closing

## ambitious

Arguedas raises his eyebrows.

> **Arguedas:** Eventually? Perhaps. But I would find it very difficult to explain a political bloc to my parliament before we have demonstrated that we can agree on a truck crossing the border.

> **Aroun:** A successful commission would give us something to build upon.

1. **"Fair enough. Let's begin there."** `[flag: np_seed = 1]` `→ closing`
2. **"I'd still like our ministers to explore the longer-term possibilities."** `→ closing`

## trade

> **Arguedas:** That is a reasonable place to begin.

He takes a pen from his pocket and makes a note on the document in front of him.

→ closing

## decline

> **Arguedas:** I understand. The proposal remains available should your government reconsider.

He moves the document aside.

→ closing

## closing

The conversation returns to less formal matters. Arguedas asks about the restoration of several historic buildings in the city and tells you about a similar undertaking in his own capital.

When lunch ends, the two delegations agree to exchange a record of the discussion.

1. **Accompany Arguedas to the waiting cars.** `[flag: seen_arguedas = true]` `→ END`
