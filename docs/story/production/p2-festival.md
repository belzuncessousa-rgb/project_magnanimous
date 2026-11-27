---
id: p2-festival
title: A Night in Mognagna
chapter: 2
turn: 3
kind: conditional
location: mognagna-sertao
token: palace
portraits: [livia, porper]
background: festival-square
---

⚙️ Staged cultural investment records Lara's request for a proposal. No Culture Fund allocation or effect is applied in this scene. The current `festival` values remain 0 (declined), 1 (regional investment address), and 2 (national cultural address); the later courtesy line has been removed because it had no distinct approved value. The new provisional `festival_investment_intent` is 1 (request a one-edition grant proposal) or 2 (request a permanent-space proposal); it is not yet a live-game state.

## invitation

Livia leaves the invitation beside the papers for the next day's meetings. The governor of Mognagna has asked you to open the state's three-day folk festival.

> **Livia Harvan:** "There'll be musicians from across the state, food stalls and craft associations. Governor Porper says the organizers want you to open the first evening. Presidents don't usually go. The ones who have gone were remembered for it."

She waits while you read the note attached to the invitation. The organizers have also asked whether the government would consider helping with a permanent rehearsal space and a music school.

> **Livia Harvan:** "You can accept without promising them money. If you go, they'll ask what your government intends to do."

1. **"I'll go and hear what they have to say."** `→ arrival`
2. **"Thank the governor and send my congratulations."** `→ skip`

## skip

Livia folds the invitation and places it in the outgoing correspondence tray.

> **Livia Harvan:** "I'll send your congratulations. I'll make clear that we haven't discussed the funding request."

1. **"Thank you."** `[flag: festival = 0]` `[flag: seen_festival = true]` `→ END`

## arrival

The road into the town is busy enough that the car slows before it reaches the square. People are walking in from the surrounding streets, some carrying folding chairs and others carrying food to the stalls. A group of musicians has gathered beside a low stage to check their instruments before the opening.

Governor Julio Porper meets you near the entrance. He offers you a plate of small pastries from a stall whose owner is waiting nearby.

> **Julio Porper:** "They're still warm. You should try one before everyone asks you to speak."

You take one. The pastry is crisp at the edge and soft in the middle. Porper introduces the woman beside him as the festival coordinator. She gives you her name and points out the groups who have travelled in from other towns.

> **Coordinator:** "Most of us rehearse wherever we can borrow a room. The schools let us use theirs when they're free. We'd like a place where the groups can practise and teach the children."

Porper looks towards the stage. The musicians are ready, and a member of the Governor's staff is asking Livia whether the opening remarks will be brief.

1. **"Show me who organized the festival before I go on."** `→ organizers`
2. **"We can meet after the opening. Let's begin."** `→ speech`

## organizers

The coordinator introduces you to two of the people who arranged the festival. One brought the performers' schedule; the other has spent the afternoon checking the stalls and stage with the town staff.

> **Coordinator:** "The schedule changes every year as groups confirm. We keep the stage times open until we know who's made it in."

One of the organizers hands you a programme. You ask which performances come from outside the town. She marks three names and explains how the groups share instruments when a van cannot carry everything.

> **Organizer:** "It means we don't always have to cancel. But most of us are still borrowing space to rehearse."

Porper glances towards the waiting stage staff.

> **Julio Porper:** "They've given you the programme. I'll make sure you have time to look at the funding request after the speech."

→ speech

## speech

The emcee introduces you, then steps aside. From the stage you can see the stalls and the musicians arranging themselves behind the microphone. A few people call your name. Others keep talking with their neighbours as they wait for the first performance.

Porper stands at the edge of the stage. The coordinator is in the front row with the festival programme open on her lap.

1. **"Mognagna deserves investment and a government that listens to its people."** `[flag: festival = 1]` `→ regional-address`
2. **"These traditions belong to the whole country. We should give their artists a place in our national cultural life."** `[flag: festival = 2]` `→ national-address`

## regional-address

> "A festival gives us a chance to meet. It doesn't replace the work that has to continue after the visitors have left. I want to hear what this state needs and what our government can reasonably do."

The applause rises from the front of the square. Porper gives a small nod but doesn't step forward to add anything. The coordinator closes the programme and waits for the emcee to announce the first group.

→ funding

## national-address

> "The music and work shared here belong to the people who make them. They also belong in the country's schools, theatres and public life. We should make it easier for artists from every state to reach one another."

The audience applauds. The coordinator turns a page in her programme and passes it to the organizer beside her. Porper thanks you quietly as you step down.

→ funding

## funding

The first group is taking its place on stage. Livia waits with the coordinator near the side of the square, holding the funding request but not the budget papers.

> **Livia Harvan:** "They've asked about a permanent rehearsal space and music school. They also have a smaller request for future editions of the festival."

The coordinator explains that a permanent space would let groups rehearse and teach between festivals, but it would need staff and ongoing maintenance. The smaller grant would help pay for an edition of the event; the organizers would have to make a new case for support next year.

> **Coordinator:** "Either would help. We don't want you to promise a building tonight if no one has costed it."

> **Livia Harvan:** "We can ask the ministry for a proposal. That would start the assessment, not approve the spending. Or we can ask for a festival grant proposal. We don't have to fund either one."

1. **Ask the ministry to prepare a proposal for the permanent space.** `[flag: festival_investment_intent = 2]` `→ evening`
2. **Ask for a proposal for a smaller festival grant.** `[flag: festival_investment_intent = 1]` `→ evening`
3. **Make no funding commitment tonight.** `→ evening`

## evening

The emcee begins to announce the performers. Stalls are serving plates from long tables, and people move between the square and the side streets as the music starts.

Porper asks whether you want to stay for a performance or return to the schedule. He doesn't bring up the funding request again.

1. **Stay for part of the performance.** `→ performance`
2. **Thank the organizers and leave.** `→ close`

## performance

The first group plays a song the coordinator says is sung at weddings in her town. Some people near the front know the words. Others listen until the refrain comes around again.

Porper speaks with the organizers while you watch. When the group finishes, he asks whether the next day's programme has changed. The coordinator shows him a note from one of the performers and says the schedule is still holding.

> **Julio Porper:** "They'll be back after the next group. I promised not to keep them from their own festival."

Livia waits until the applause has settled before reminding you of the appointments in the morning.

→ close

## close

Porper walks with you to the car. The coordinator remains by the stage, speaking with the next group about where to leave their cases.

> **Julio Porper:** "Thank you for coming. I'll tell the organizers what you asked the ministry to prepare, if anything."

Livia checks that the invitation and programme are back in the folder.

1. **Return to your schedule.** `[flag: seen_festival = true]` `→ END`
