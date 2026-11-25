---
id: p1-defense-jaguars
chapter: 1
turn: 2
title: The Jaguars
kind: briefing
location: capital
portraits: [voss]
background: palace-courtyard
---

⚙️ Defense briefing + the Jaguars quick event (GDD 7.2: defunding the Jaguars = survival counter −1). Also: Voss states his redline (the military-rule files) in his own words, and reacts to Lara's handling of the Delmar petition if it has already happened.

## opening

Voss has asked to meet you in the palace courtyard rather than his ministry, which you understand only when you arrive: the Jaguar Guard is drilling. Forty men and women in emerald breastplates move across the flagstones with ceremonial halberds and very modern rifles, turning on a single word.

> **Aldric Voss:** "Madam President. I thought you should see what the Treasury wants to cut before you agree to cut it."

> **Aldric Voss:** "Three hundred and forty of them. Imperial foundation, older than the republic, older than the dictatorship. They've guarded every head of state since the last Viceroy. Including several who deserved it less than you."

> "Is that a compliment, General?"

> **Aldric Voss:** "It's an observation. I don't do compliments before the second month."

→ line-item

## line-item

> **Aldric Voss:** "Fontes has them on a list. The armour costs more than a regiment's boots. The tradition, he says, is 'priceless', which in Treasury language means he'd like to stop paying for it."

> **Aldric Voss:** "I'll say this once. They are not decoration. Every attempt on a president in this country's history failed at a door one of these people was standing at."

1. **"Disband them. A republic doesn't need an emperor's guard."** `[flag: jaguars_defunded = true]` `[voss loyalty -3]` `[armed_forces opinion -2]` `[-1 STRUCT]` `[approval +2 @ ibicui]` `[flag: path_hold += 1]`
   ↳ The drill continues behind you. You notice that the word of command is given a fraction later than before.
   ↳ > **Aldric Voss:** "The guard will be reassigned to the regular army by March. Your protection becomes the federal police's problem. I'll put my objection in writing, so it exists."
2. **"Keep the guard. Lose the armour and the halberds."** `[flag: jaguars_trimmed = true]` `[voss loyalty -1]` `[fontes loyalty +1]`
   ↳ > **Aldric Voss:** "They'll be very offended and very much alive. Which is the correct order of priorities."
3. **"Keep them as they are. Tell Fontes I said so."** `[flag: jaguars_kept = true]` `[voss loyalty +2]` `[fontes loyalty -1]` `[+1 FORCE]`
   ↳ > **Aldric Voss:** "He'll say you're sentimental about armour."
   ↳ > "I'm sentimental about doors."

## files

Voss walks you to the arcade, out of earshot of the drill. He takes his cap off, which in him is the equivalent of raising his voice.

> **Aldric Voss:** "You'll be asked about the archives. Often. By people with good reasons and photographs. I want you to hear my answer from me, not from the newspapers."

> **Aldric Voss:** "The day those archives are opened, I will hand you my resignation and my reasons. In that order."

1. **"Noted, General."**
   ↳ `[if: flag.files_petition == 1]` > **Aldric Voss:** "You received Mrs. Delmar on Tuesday. I noted that too."
   ↳ He puts his cap back on. The conversation, for him, is finished.
2. **"Nobody is opening anything. Not this year."** `[voss loyalty +1]` `[flag: files_promise_voss = true]` `[flag: voice += 1]`
   ↳ > **Aldric Voss:** "Not this year. I'll remember the 'year', Madam President. I have a good memory for qualifiers."
   ↳ `[if: flag.files_petition == 1]` *You told Rosa Delmar "not forever". You told Voss "not this year". Both are true. That is what makes it work.*
3. **"Then I hope your reasons are good ones. Mine will be."** `[voss loyalty -1]` `[flag: path_hold += 1]`
   ↳ > **Aldric Voss:** "They're excellent reasons, Madam President. That has always been the problem with them."

## border

> **Aldric Voss:** "One practical thing before you go. The border staff in Ibira patrol a forest the size of a country with boats we bought from the Federation thirty years ago. The cartels' boats are newer. That isn't a request. It's a description."

1. **"Put it in writing for the budget."** `[voss loyalty +1]` `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "It's been in writing for nine years. I'll change the date."
2. **"Ask Kesht what the cartels know about our boats."** `[kesht loyalty +1]` `[voss loyalty -1]` `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "Kesht will tell you what they know. He won't tell you how he knows. Ask him anyway."
3. **"New boats won't fix a river nobody governs."** `[-1 FORCE]` `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "No. But old boats sink in it."

→ END
