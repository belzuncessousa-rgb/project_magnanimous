---
id: p3-year-end
title: A Quiet Evening
chapter: 3
turn: 3
location: capital
portraits: [amanda, mertens]
background: residence-night
---

<!-- Original first-year finale is now a midterm retrospective. Final placement and calendar date depend on the new eighteen-turn schedule. Only summarize decisions and verified outcomes; never infer Lara's ideology, feelings, or private motives from flags. -->

## opening

Most of the offices have emptied by the time Mertens comes to see you. He has brought a list of matters that will need attention when the next legislative session begins.

> **Mertens:** I thought I would leave this with you before I go. Livia has the longer version. Hers includes dates.

1. **"Thank you. Enjoy the break."** `→ residence`
2. **"What will you be doing?"** `→ plans`
3. **"Let's review the priorities when Congress returns."** `→ residence`

## plans

> **Mertens:** Visiting my family. If anyone from the party calls, I have promised my wife that I will be unavailable.

He considers this for a moment.

> **Mertens:** I imagine that promise will last until lunch.

→ residence

## residence

Amanda is in the sitting room of the residence, with several folders on the table. One contains the government's public announcements. Another is a collection of requests and letters that have not yet been answered.

> **Amanda:** I thought we could put some of these in order before the next chapter of your schedule begins. Or I could leave them for tomorrow.

1. **"Let's review the commitments we have made."** `→ commitments`
2. **"Show me the outstanding correspondence."** `→ letters`
3. **"Leave the work for another evening."** `→ evening`

## commitments

Amanda opens the first folder.

> **Amanda:** I have separated the announcements from the things that have actually been delivered. Some will need updating.

The following lines are eligible only when the corresponding promise was made. Completion, partial delivery and failure must be generated from verified state:

- Public living-standard commitment: review measurable changes across the relevant regions.
- Growth commitment: compare the baseline and latest available economic report.
- Integrity commitment: review actual investigations, procurement disclosures and institutional changes.
- First Great Project: compare the public timetable with actual completion and revised cost.
- Personal commitment to Celia: refer only to the visit, call or street connection actually promised.

> **Amanda:** We should decide which of these need another conversation with the ministers.

→ evening

## letters

She opens the second folder.

> **Amanda:** There are invitations, requests from associations and several letters from people who wrote to us during the campaign. I have asked the departments for answers where they can provide them.

1. **Ask her to identify the oldest unanswered requests.** `→ evening`
2. **Ask her to select a few letters for you to read personally.** `→ evening`

## evening

Amanda puts the folders back in her bag.

> **Amanda:** I have something else.

She takes out an envelope containing a photograph from a gathering of former law students. She points to two people standing at the edge of the group.

> **Amanda:** Look at us. I had completely forgotten that hairstyle.

If the earlier jacket anecdote was discussed, Amanda can recall the jacket and whether Lara remembered the story.

1. **Ask Amanda about the others in the photograph.** `→ photograph`
2. **"We should try to arrange another reunion sometime."** `→ close`
3. **Set the photograph on the table and continue talking.** `→ close`

## photograph

Amanda identifies several of the people, explaining which ones she has kept in touch with and which ones she has not seen for years.

> **Amanda:** I still have Clara's number somewhere. I wonder whether she's living in Katanaí.

→ close

## close

Outside, the lights in the government district are beginning to go out. Amanda collects her things and says goodnight.

1. **End the evening.** `[flag: seen_year_end = true]` `[flag: chapter3_complete = true]` `→ END`
