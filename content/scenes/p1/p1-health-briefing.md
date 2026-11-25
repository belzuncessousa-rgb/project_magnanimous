---
id: p1-health-briefing
chapter: 1
turn: 2
title: Sugar Bay General
kind: briefing
location: sugar-bay
token: health
portraits: [dara]
background: hospital-corridor
---

⚙️ Health & Social Programmes meeting, held as a visit to Sugar Bay General Hospital with Owin Dara. Overview of the two possible programmes (public health system vs. cash transfers) for the chapter-2 budget, the dry season in Mognagna, and tobacco-related illness in Ibicuí. Follow-ups are informational; the only decisions are small (a public statement, a reply to a deputy).

## opening

Sugar Bay is the capital of Mognagna, on the coast. Sugar Bay General is its largest public hospital, built about fifty years ago. The corridors are wide and crowded. Patients wait on plastic chairs and on stretchers along the walls.

Owin Dara meets you at the entrance. He worked here as a doctor for twenty years before he went into politics, and many of the staff greet him by name as you walk through.

> **Owin Dara:** "Thank you for coming, Madam President. This is one of the better hospitals in the region. I thought you should see it before we talk about the others."

A young woman holding a sleeping baby recognises you. She stays seated so as not to wake the child.

> **Owin Dara:** "She probably took the first bus this morning. Most people here are on the transfer programme. The payments are funded until April."

1. **Stop and talk to her**
   ↳ She tells you about her baby's fever and the long wait. She doesn't ask you for anything. Dara waits until you have finished.
2. **Ask Dara what people here usually ask about**
   ↳ > **Owin Dara:** "Whether the transfers will continue after April. Then about the waiting times."
3. **Keep walking with Dara**
   ↳ You walk to the end of the corridor. There are many more people waiting.

## office

Dara's old office is at the end of the wing, with a window onto the bay. He offers you a chair and stays standing.

> **Owin Dara:** "Here is the overview. In the budget, my ministry can fund two kinds of programme."

> **Owin Dara:** "The first is a proper public health system: new hospitals and clinics, staff, medicines, in the places that don't have them. It costs a lot and takes years before people feel the difference."

> **Owin Dara:** "The second is the cash transfers. They keep poor families fed now, especially in Mognagna and Ibira. People feel the difference the same month. But in ten years the hospitals will be the same as today."

> **Owin Dara:** "We'll need to decide how much of each in March. I wanted you to see this place first."

→ office-q

## office-q

1. **"How much do the transfers cost compared to the hospitals?"** `[once]` `→ office-q`
   ↳ > **Owin Dara:** "The transfers cost less each year, but you pay them every year. The hospitals cost more at the start and then less. Fontes has the exact figures."
2. **"Which regions need hospitals most?"** `[once]` `→ office-q`
   ↳ > **Owin Dara:** "Ibira, by far. Then the interior of Mognagna. And the peripheries of the big cities in Ibicuí, which are growing faster than any clinic can keep up with."
3. **"What would you do, if it were only up to you?"** `[once]` `→ office-q`
   ↳ > **Owin Dara:** "Keep the transfers and build what we can. I've seen what happens when transfers stop. I'd rather not see it again."
4. **"Thank you. What else should I know?"** `→ dry-season`

## dry-season

> **Owin Dara:** "The dry season. It started early this year. The governor, Julio Porper, has sent water trucks to twelve towns in the interior. If the rains come in March, it will be a difficult year. If they don't, there is a risk of hunger in some areas. The last time that happened was twenty years ago."

> **Owin Dara:** "There are journalists outside. They will want a sentence from you."

1. **"Nobody in Mognagna will go hungry while I'm in office."** `[approval +3 @ mognagna]` `[dara loyalty +2]` `[fontes loyalty -1]` `[flag: promised_no_hunger = true]`
   ↳ The sentence is on the radio across the region by noon. That evening Fontes calls Amanda to ask whether it was a policy or a sentence.
2. **"We're preparing for the dry season, and we'll be honest about what it costs."** `[approval +1 @ mognagna]` `[fontes loyalty +1]`
   ↳ The statement is reported accurately, after a longer interview with Governor Porper.
3. **"I came to listen today. Decisions will come with the budget."** `[dara loyalty -1]`
   ↳ > **Owin Dara:** "They'll report that you came and listened. Some of them will say that's all you did."

## tobacco

On the way out, Dara hands you a sheet of paper with a graph on it.

> **Owin Dara:** "One more thing, from Ibicuí. Hospital admissions for lung and breathing problems in the old tobacco-growing districts of Katanaí and St. Veldra. They've gone up every year for ten years."

> **Owin Dara:** "An independent deputy, Ana Sollis, has a bill to restrict tobacco advertising and raise the tax on it. Congress hasn't scheduled it. The Trembolo family, who own the largest tobacco company, have a lot of friends in Congress."

1. **"Tell Deputy Sollis I'll read her bill."** `[cp opinion -1]` `[approval +1 @ ibicui]` `[flag: tobacco_bill_interest = true]` `[flag: seen_health_briefing = true]`
   ↳ > **Owin Dara:** "She'll be pleased. Nobody in government has said that to her before."
2. **"Not this year. I can't take on the Trembolos now."** `[flag: tobacco_deferred = true]` `[flag: seen_health_briefing = true]`
   ↳ He folds the graph and puts it back in his pocket.
3. **"Keep watching these numbers and bring them back to me."** `[flag: path_harden += 1]` `[flag: seen_health_briefing = true]`
   ↳ > **Owin Dara:** "I will. Every quarter."

→ END
