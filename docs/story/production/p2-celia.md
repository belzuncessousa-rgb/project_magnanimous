---
id: p2-celia
chapter: 2
turn: 2
title: Sunday in Vila Tamarin
kind: personal
location: vila-tamarin
token: personal
portraits: [celia, marco, amanda]
background: tamarin-kitchen
---

⚙️ Staged family scene. Celia has a minor health incident; serious illness, exact diagnosis and later outcome not predetermined. Both parents alive; siblings unnamed. Celia's religious life is her own; photos/visits are distinct choices. Preserve relevant flags. Optional stay may compete for PT in final system, not automatically based on unchosen monthly promise.

## arrival

Your father is sitting outside the house when you arrive. He has a newspaper folded on his lap.

> **Father:** "Your mother is in the kitchen. Don't let her tell you nothing happened on Wednesday."

Celia appears at the door.

> **Celia Vento:** "I heard that."

She greets Amanda and you, then leads you inside.

> **Celia Vento:** "I got a bit dizzy at church. It was very hot. I've been perfectly all right since."

Your father follows you into the kitchen.

> **Father:** "She had to sit down during the service. Ivone brought her home."

1. **"Have you spoken to a doctor?"**
   ↳ > **Celia Vento:** "I've called the clinic. They gave me an appointment."
2. **"How have you been feeling since then?"**
   ↳ > **Celia Vento:** "Better. I haven't been out in the heat as much."
3. **"Dad, were you there when it happened?"**
   ↳ > **Father:** "No. I was here. Ivone told me what happened."
4. **Sit down with them.**

## health

Celia sets three glasses on the table.

> **Celia Vento:** "I didn't want you to make a special trip because of it. You have enough to do."

1. **"Would you like me to help arrange a medical appointment?"** `[flag: celia_doctor = true]`
   ↳ She considers the offer.
   ↳ > **Celia Vento:** "If the clinic can see me sooner, that would be nice. I don't want anyone else losing an appointment because of me."
2. **"Let me know how the clinic appointment goes."**
   ↳ > **Celia Vento:** "I will."
3. **"You could stay with me in the capital for a while."** `[flag: mother_asked_to_move = true]`
   ↳ Celia looks towards your father.
   ↳ > **Celia Vento:** "I appreciate it. I would rather stay here for the moment."
4. **"If you feel unwell again, please seek help promptly."**
   ↳ Your father nods.
   ↳ > **Father:** "I've told her that already."
   ↳ > **Celia Vento:** "And I heard you both."

## church

After a while, Celia brings out the church newsletter.

> **Celia Vento:** "Pastor Ezequiel asked whether he could have a photograph with me for the next one. He has been asking how I'm doing."

Amanda looks at the newsletter.

> **Amanda Troes:** "If the photograph is published, there is a good chance the Faith and Family Front will use it as well."

Celia turns a page.

> **Celia Vento:** "I don't know why they would be interested in me."

1. **"It's your church, Mum. It's your decision."**
   ↳ > **Celia Vento:** "All right. I'll see what he has in mind."
2. **"I'd prefer that the photograph wasn't used for politics."**
   ↳ She looks at Amanda.
   ↳ > **Celia Vento:** "Can I ask him not to let them use it?"
   ↳ > **Amanda Troes:** "You can ask. Once it's published, it may be difficult to control."
3. **"Please decline the photograph."** `[flag: pastor_photo_refused = true]`
   ↳ Celia frowns.
   ↳ > **Celia Vento:** "I'd rather explain it to him myself."
4. **"Tell him I'd be willing to visit the church sometime."** `[flag: promised_tabernacle_visit = true]`
   ↳ Celia looks pleased.
   ↳ > **Celia Vento:** "He would be very happy to have you there."

## afternoon

Your father asks Amanda whether she has had an opportunity to visit the city outside the palace. They begin discussing a restaurant that used to be near their old neighbourhood.

A little later, Marco arrives with bread from the community kitchen. He greets your parents and sits beside the window.

> **Marco Prestes:** "There are still families coming to the upper slopes from the interior. We've been trying to find places for the children in the local schools."

He looks towards you.

> **Marco Prestes:** "People have been asking what the government intends to do about work and housing."

1. **"Have the discussions with the unions started?"** `[show if: flag.initiative.labor_compact]`
   ↳ > **Marco Prestes:** "Some representatives have heard from the ministry. They are waiting to see what comes of the meetings."
2. **"Have there been any changes at the sanitation site?"** `[show if: flag.great_project == 6]`
   ↳ > **Marco Prestes:** "People have seen officials and engineers visiting the works. They want to know when the connections will actually be ready."
3. **"Are the people arriving receiving any assistance?"**
   ↳ > **Marco Prestes:** "Some are. The local organisations have been doing what they can. There are quite a few families who don't know which offices they need to contact."
4. **"I'd rather talk about something else today."**
   ↳ He nods.
   ↳ > **Marco Prestes:** "Fair enough. Have you seen the new shop at the corner?"

## leaving

It is late in the afternoon. Amanda checks her phone and tells you when the cars will be ready.

> **Celia Vento:** "If you stay, there's enough food for dinner."

Your father looks towards the kitchen.

> **Father:** "She made enough this morning for twice the number of people who were coming."

1. **Stay for dinner.** `[flag: stayed_for_dinner = true]`
   ↳ Celia sets about preparing the table. Marco helps your father move the chairs.
   ↳ During dinner, the conversation turns to your siblings and several people who lived on the street when you were younger.
2. **"I need to return to the capital, but I'll call you."**
   ↳ > **Celia Vento:** "All right. Take something with you."
3. **Spend a little more time with your parents before leaving.**
   ↳ You sit outside with them until Amanda lets you know that it is time to go.

## close

1. **Say goodbye and leave.** `[flag: seen_celia_may = true]`

→ END
