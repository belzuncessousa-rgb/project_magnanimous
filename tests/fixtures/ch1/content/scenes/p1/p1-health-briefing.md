---
id: p1-health-briefing
chapter: 1
turn: 2
title: Sugar Bay General
kind: briefing
location: mognagna
portraits: [dara]
background: hospital-corridor
---

⚙️ Health & Social Programs briefing, staged as a visit to Sugar Bay General with Owin Dara. Seeds: Social Assistance vs. Public Health System (ch2 budget tier), famine risk in the dry season, the tobacco fallout in Katanaí (Ana Sollis' bill). Small decisions only.

## opening

Sugar Bay General was built by the dictatorship, painted by the first democratic government, and has not been painted since. The corridors are wide enough for two stretchers to pass. Today there are three, and nobody is passing.

Owin Dara walks you through it the way other men show you their gardens. He knows the cleaners by name. He knows which lift works on Thursdays.

> **Owin Dara:** "This is the good hospital, Madam President. I wanted you to see the good one first."

A woman on a plastic chair, holding a baby asleep against her shoulder, recognises you, and does not get up, because getting up would wake the baby.

> **Owin Dara:** "She'll have walked from the bus at five. The transfer card is in her pocket. If it stops in April, she stops coming here and starts going to the pastor."

1. **Kneel down and speak to her**
   ↳ She tells you, quietly, about the baby's fever, the bus, the queue. She does not ask you for anything. When you stand up, Dara is looking at you with something between approval and professional curiosity.
2. **Ask Dara what she would ask, if she could**
   ↳ > **Owin Dara:** "Whether the card still works in April. They always ask that first. Then the fever."
3. **Keep walking. There will be a hundred like her by the end of the corridor**
   ↳ There are more than a hundred. Dara does not stop counting, so neither do you.

## office

His old office at the end of the wing has a window onto the bay and a cabinet full of files that are not, strictly, still his.

> **Owin Dara:** "Two things I can do with money. Build a health system — real hospitals, staffed, in places that have never had one. Ten years before you see it."

> **Owin Dara:** "Or keep the transfers alive. Next month you see it. Next year you see it. In ten years you see the same queue, but nobody died in it."

> **Owin Dara:** "A hospital is a promise. A transfer is lunch."

1. **"We'll need both. Which one dies first if we can only fund one?"**
   ↳ > **Owin Dara:** "The hospital. It always does. It can't vote yet."
2. **"Mognagna has had lunch for forty years. It deserves the promise."** `[dara loyalty -1]` `[+1 STRUCT]` `[flag: health_system_lean = true]`
   ↳ > **Owin Dara:** "Mognagna would like both, Madam President. Mognagna has been told 'deserves' before."
3. **"Then lunch comes first. People can't wait ten years hungry."** `[dara loyalty +1]` `[+1 WELF]` `[flag: transfers_lean = true]`
   ↳ > **Owin Dara:** "Pelan says the same. He says it with less sincerity, but he says it."

## dry-season

> **Owin Dara:** "And it's dry early. Porper has water trucks in twelve municipalities. If the rains fail in March, it's not a queue, it's a famine. We haven't had one in twenty years. People here remember the last one better than they remember the dictatorship."

> **Owin Dara:** "The press are outside. They'll want one sentence."

1. **"Nobody in Mognagna will go hungry while I'm in office."** `[approval +3 @ mognagna]` `[dara loyalty +2]` `[fontes loyalty -1]` `[flag: promised_no_hunger = true]`
   ↳ The sentence goes out at eleven and is on every radio in the sertão by noon. Fontes, you learn later, heard it in his car and pulled over.
2. **"We are preparing for the dry season, and we'll be honest about the cost."** `[approval +1 @ mognagna]` `[fontes loyalty +1]`
   ↳ The sentence is accurate. It plays on the evening news after a clip of Porper saying something warmer.
3. **"I came to listen today. The decisions come with the budget."** `[dara loyalty -1]`
   ↳ > **Owin Dara:** "They'll write that you came, and they'll write that you left."

## tobacco

On the way out he gives you a single sheet of paper. A graph. One line goes up at a steady angle, like a road climbing a hill.

> **Owin Dara:** "Respiratory admissions in the old tobacco districts of Katanaí and St. Veldra. Not my region. Not my problem, if I were a different kind of minister. Deputy Sollis has a bill on advertising and taxes. Nobody in Congress will touch it. Trembolo funds half of Congress."

1. **"Tell Deputy Sollis I'll read her bill. Personally."** `[cp opinion -1]` `[approval +1 @ ibicui]` `[flag: tobacco_bill_interest = true]` `[flag: seen_health_briefing = true]`
   ↳ > **Owin Dara:** "She'll frame the letter. She frames everything."
2. **"Not this year. I can't open a war with the Trembolos in my first month."** `[flag: tobacco_deferred = true]` `[flag: seen_health_briefing = true]`
   ↳ He folds the graph in half and puts it back in his pocket, where you suspect it lives.
3. **"Keep this graph. Bring it back when it's steeper."** `[flag: path_harden += 1]` `[flag: seen_health_briefing = true]`
   ↳ > **Owin Dara:** "It's always steeper, Madam President. That's what graphs are for."

→ END
