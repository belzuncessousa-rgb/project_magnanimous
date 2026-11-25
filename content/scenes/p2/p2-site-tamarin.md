---
id: p2-site-tamarin
chapter: 2
turn: 2
title: The Works on the Hill
kind: conditional
location: katanai
token: project
when: "flag.great_project == 6"
portraits: [marne, fontes]
background: construction-site
---

⚙️ Great-project follow-up (project 6, sanitation): oversight visit to the works above Katanaí. A cost claim from the contractor; supervision. Varies with the contractor choice (contractor 1 paid Corvel / 2 renegotiating / 3 cancelled and in court).

## opening

The treatment plant of the Great Sanitation Works stands on the waterfront west of Katanaí's port. It is a large concrete building without a roof. You visit with Marne and Fontes.

> **Tobias Marne:** "Here is where we are."

1. **Hear the situation** `[show if: flag.contractor == 1]` `→ paid`
2. **Hear the situation** `[show if: flag.contractor == 2]` `→ renegotiating`
3. **Hear the situation** `[show if: flag.contractor == 3]` `→ court`
4. **Hear the situation** `[show if: !(flag.contractor >= 1)]` `→ renegotiating`

## paid

> **Tobias Marne:** "Corvel's crews came back in April. The main sewer line is moving up the hill again, about fifty metres a week. The roof of the plant will be on by the end of the year."

> **Alexander Fontes:** "And Corvel has sent a new claim. They say the materials left on site for eight years were damaged, and they want to be paid again for them."

→ decide

## renegotiating

> **Alexander Fontes:** "The renegotiation of annex nine is about half done. Corvel has accepted lower prices for pipes and labour. They are refusing on the treatment plant. Meanwhile the work is going slowly, with a small crew."

> **Tobias Marne:** "People on the hill can see the crew. They can also see it's small."

→ decide

## court

> **Alexander Fontes:** "Corvel went to court the day we cancelled. A judge has frozen the site until she decides. Our lawyers think we'll win, in about a year."

> **Tobias Marne:** "Meanwhile nobody can touch the pipes. I've had to send the new crews home."

→ decide

## decide

1. **"Ask Renata's people to audit everything on this site."** `[salgado loyalty +1]` `[mertens loyalty -1]` `[flag: site_audit = true]` `[flag: path_hold += 1]`
   ↳ > **Alexander Fontes:** "That will slow things down for a month and protect us for years."
2. **"Pay what it takes to move faster. People have waited long enough."** `[cost: 1 FC]` `[approval +3 @ ibicui]` `[flag: project_progress += 1]` `[flag: corruption += 1]` `[flag: voice += 1]`
   ↳ > **Tobias Marne:** "I'll tell them."
   ↳ *Every week the pipe doesn't move, another family waits. The money will be accounted for later.*
3. **"I'll come back every month to see the progress myself."** `[cost: 1 PT]` `[approval +2 @ ibicui]` `[marne loyalty +1]` `[flag: site_visits = true]`
   ↳ > **Tobias Marne:** "Then the crews will work harder. They always do when the President is coming."

## close

1. **Leave the site** `[flag: seen_site_visit = true]`

→ END
