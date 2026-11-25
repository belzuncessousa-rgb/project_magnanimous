---
id: p1-defense-jaguars
chapter: 1
turn: 2
title: The Jaguars
kind: briefing
location: capital
token: security
portraits: [voss]
background: palace-courtyard
---

⚙️ Defense meeting + the Jaguars quick event (GDD 7.2: defunding the Jaguars = survival counter −1). Voss gives an overview, states his redline (the military archives) and mentions the border boats. Reacts to the Delmar petition if Lara received her.

## opening

Voss has asked to meet in the palace courtyard. The Jaguar Guard is training there: about forty men and women in green ceremonial breastplates, carrying rifles and long halberds, moving in formation.

> **Aldric Voss:** "Madam President. The Treasury has the Jaguars on its list of possible cuts. I wanted you to see them before you decide anything."

> **Aldric Voss:** "The Guard was founded under the empire, before the republic. There are three hundred and forty of them. They protect the President, the palace and the Residence. The ceremonial armour and equipment cost more each year than boots for a whole regiment. That is what the Treasury objects to."

> **Aldric Voss:** "My view is simple. In this country's history, every attempt on a president's life has been stopped by them."

→ questions

## questions

1. **"How many attempts have there been?"** `[once]` `→ questions`
   ↳ > **Aldric Voss:** "Four in the last sixty years that we know of. Two under the dictatorship, two since. The last was eleven years ago."
2. **"Couldn't the federal police do the same job?"** `[once]` `→ questions`
   ↳ > **Aldric Voss:** "They could learn to. It would take years, and in the meantime you'd be protected by people who have never done it."
3. **"Let's talk about what to do with them."** `→ decision`

## decision

1. **"Disband them. A republic doesn't need an imperial guard."** `[flag: jaguars_defunded = true]` `[voss loyalty -3]` `[armed_forces opinion -2]` `[-1 STRUCT]` `[approval +2 @ ibicui]` `[flag: path_hold += 1]`
   ↳ > **Aldric Voss:** "The Guard will be transferred to the regular army by March. Your protection will pass to the federal police. I'll send you my objection in writing."
2. **"Keep the Guard, but drop the ceremonial armour and halberds."** `[flag: jaguars_trimmed = true]` `[voss loyalty -1]` `[fontes loyalty +1]`
   ↳ > **Aldric Voss:** "They'll be offended. They'll also still be here. I can accept that."
3. **"Keep them as they are. I'll tell Fontes."** `[flag: jaguars_kept = true]` `[voss loyalty +2]` `[fontes loyalty -1]` `[+1 FORCE]`
   ↳ > **Aldric Voss:** "Thank you, Madam President."

## files

Voss walks with you to the covered arcade, away from the training ground. He takes off his cap.

> **Aldric Voss:** "There is something else I want you to hear from me directly. You will be asked many times to open the archives of the military period. The people asking will have good reasons."

> **Aldric Voss:** "If those archives are opened, I will resign and explain my reasons publicly."

1. **"I understand, General."**
   ↳ `[if: flag.files_petition == 1]` > **Aldric Voss:** "I'm told you received Mrs. Delmar on Tuesday. I understand that too."
   ↳ He puts his cap back on.
   ↳ `[if: compass.FORCE <= -3]` > **Aldric Voss:** "I'll add one thing. Since the inauguration, the officers' clubs talk about very little except what you said about armies. I tell them a president is entitled to her opinions. They ask me whether she is entitled to their budget."
2. **"Nobody is opening anything this year."** `[voss loyalty +1]` `[flag: files_promise_voss = true]` `[flag: voice += 1]`
   ↳ > **Aldric Voss:** "This year. I'll remember that you said 'this year'."
   ↳ `[if: flag.delmar_time_asked]` *You told Rosa Delmar "not forever" and Voss "not this year". Both are true, for now.*
3. **"Then I hope your reasons are good. I'll have mine."** `[voss loyalty -1]` `[flag: path_hold += 1]`
   ↳ > **Aldric Voss:** "I'm sure we both will."

## border

> **Aldric Voss:** "One practical matter. The border units in Ibira patrol a very large area of forest and river with boats bought thirty years ago. The smugglers' boats are newer and faster. I'll include it in my budget request."

1. **"Put it in the request. We'll look at it in March."** `[voss loyalty +1]` `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "It has been in every request for nine years. I'll send it again."
2. **"Ask Kesht what the cartels know about our patrols."** `[kesht loyalty +1]` `[voss loyalty -1]` `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "He'll know something. He won't tell me how he knows it."
3. **"New boats alone won't solve Ibira."** `[-1 FORCE]` `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "No. But the old ones are a problem anyway."

→ END
