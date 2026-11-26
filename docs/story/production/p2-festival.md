---
id: p2-festival
title: A Night in Mognagna
chapter: 2
turn: 3
location: mognagna-sertao
portraits: [livia, porper]
background: festival-square
---

## invitation

Livia brings you an invitation from Governor Porper to attend Mognagna's annual folk festival.

> **Livia:** There will be musicians from across the state, craft associations, and several of our deputies. The organizers would like you to open the celebrations.

1. **Accept the invitation.** `→ arrival`
2. **Send your congratulations and decline.** `[flag: festival = 0]` `→ close`

## arrival

Strings of coloured flags run between the buildings around the square. Near the stage, children practice a dance while a band adjusts its instruments. Someone has put a plate of little pastries into Porper's hands.

> **Porper:** You should try these before we get anywhere near the microphones.

He offers you the plate.

1. **Take one.** `→ pastry`
2. **Ask him to introduce the organizers.** `→ organizers`

## pastry

> **Porper:** There. Now you're officially welcome.

He finishes his own pastry as a woman wearing an embroidered dress approaches with the other organizers.

→ organizers

## organizers

The festival coordinator explains that several groups have travelled from rural towns, some bringing instruments made by their own members.

> **Coordinator:** We have been running rehearsals in borrowed classrooms. Next year, we hope to have somewhere permanent.

Livia notes the request. Porper gestures towards the stage, where the audience is gathering.

→ speech

## speech

1. **"Mognagna deserves investment and a government that listens to its people."** `[flag: festival = 1]` `→ funding`
2. **"These traditions belong to the whole country. We should give their artists a place in our national cultural life."** `[flag: festival = 2]` `→ funding`
3. **"Thank you for sharing your music, your food and your hospitality with me tonight."** `[flag: festival = 2]` `→ funding`

## funding

After the speech, Livia speaks to you beside the stage.

> **Livia:** The organizers have asked about support for a permanent rehearsal space and music school. There is also a smaller request for future editions of the festival. We would need to confirm the allocation.

1. **Ask the relevant ministry to prepare the permanent-space proposal.** `[flag: festival_investment_intent = 2]` `→ evening`
2. **Ask for a smaller festival grant proposal.** `[flag: festival_investment_intent = 1]` `→ evening`
3. **Make no funding commitment.** `→ evening`

## evening

The first band begins to play. A group of elderly women has taken the chairs closest to the stage, and a little boy is attempting to imitate the drummer.

Porper stops talking for a while to listen.

1. **Stay for part of the performance.** `→ performance`
2. **Thank the organizers and leave.** `→ close`

## performance

The singer begins a song about travelling away from home and returning after many years. By the final verse, much of the square is singing with her.

Livia waits until the song finishes before reminding you of the next day's appointments.

→ close

## close

1. **Return to your schedule.** `[flag: seen_festival = true]` `→ END`
