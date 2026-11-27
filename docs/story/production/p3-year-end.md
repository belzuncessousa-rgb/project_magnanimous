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

> **Amanda:** I put the announcement beside the latest report. We can check any of them, or leave the folder closed.

Choose only a subject Lara actually announced. Each subject can be opened once; skip any subject that was never promised.

1. **“Check the service commitment.”** `[show if: flag.promised_CoL]` `[once]` `→ services`
2. **“Check the growth figure.”** `[show if: flag.promised_GDP]` `[once]` `→ growth`
3. **“Check the citizens' voice commitment.”** `[show if: flag.promised_power]` `[once]` `→ voice`
4. **“Check the appointments commitment.”** `[show if: flag.promised_integrity]` `[once]` `→ appointments`
5. **“Check the hunger priority.”** `[show if: flag.promised_no_hunger]` `[once]` `→ hunger`
6. **“Check the Great Project timetable.”** `[show if: flag.promised_on_time]` `[once]` `→ project-time`
7. **“Check the Great Project publication promise.”** `[show if: flag.promised_transparency]` `[once]` `→ project-publication`
8. **“Check the street in Vila Tamarin.”** `[show if: flag.promised_mother_street]` `[once]` `→ street`
9. **“That's enough for tonight.”** `→ evening`

### services

*If the programme is operating in additional places:* Amanda turns to the report. “These are the districts where the extra service is open. This second list is where the offices still say they are waiting.” Use the dated operating record and the confirmed waiting list.

*If no expansion is operating:* She shows the current rota. “The hours haven't changed. There isn't an expansion date in the schedule they sent us.” Do not imply that an announcement or appropriation has opened a service.

→ response

### growth

Amanda lays the original figure beside the latest release. “This was the result when you made the announcement. The new column is the most recent confirmed figure.” If the latest release is provisional, she shows the date of the next scheduled publication and says it has not been confirmed.

→ response

### voice

*If a procedure took effect:* Amanda opens the notice. “These are the people who can use it now. The first report records how many requests came in.” Report the actual use separately from the legal change.

*If an approved change has not taken effect:* “The notice gives the date it begins. Until then the current procedure still applies.”

*If no change took effect:* Amanda sets the proposals beside the minutes. “We said we'd seek a change. This is the last decision the offices recorded.” If no proposal was formally submitted, she says, “I haven't found a proposal from our office. The public promise is still in the record.”

→ response

### appointments

Amanda opens the appointment register. “These are the published requirements. The next page shows which decisions can be compared with them.” If an appointment is pending, she names the stage it reached. If a review is open, she gives its actual status. If no decision can yet be compared, she does not treat an unrelated referral as an answer to the promise.

→ response

### hunger

Amanda sets the Mognagna report beside the announced priority. “The offices have confirmed these deliveries. The second page lists requests that have not been met yet.” Use the second sentence only when requests remain; give the actual coverage and outstanding need.

→ response

### project-time

Amanda opens the public project schedule. *If the promised work is operating on schedule:* “The report confirms the completed stage and the date the site opened.” *If only part of the project is operating:* “This section is in use. The other sections are still on the schedule.” *If work is delayed or has no approved opening date:* “The report names the current obstacle. It doesn't give us an opening date yet.” Use the actual project milestone and reason from the report.

→ response

### project-publication

Amanda checks the contracts against the public file. *If the promised documents were released:* “The public file has the signed contracts and the cost schedule for this stage.” *If only some were released:* “These documents are available. The list beside them names what hasn't been published yet.” *If none were released:* “I don't have a release receipt. The promise is still open.” Name a legal restriction only if the registrar has recorded it.

→ response

### street

*If Lara guaranteed construction:* Amanda shows the latest signed notice. “This is the construction commitment for Celia's street. It gives the responsible office and the next review date.” State only the recorded schedule; do not promise a connection before the works and opening are confirmed.

*If Lara requested an assessment without guaranteeing construction:* Amanda opens the assessment. “Planning has checked the street. The notice describes what could be built. It doesn't authorize the work.” Do not describe the request for an assessment as a construction pledge.

*If the work is complete and service is operating:* “The notice confirms the connection is operating and gives the service start date.” If work is complete but service has not opened, say that directly and name the next inspection or opening decision.

→ response

### response

Amanda turns the report around so the date and responsible office are visible. “Would you like me to include this in the next public status sheet, or keep it with the working file?”

1. **“Include the dated report in the next public update.”** Amanda marks the selected report for publication. The update repeats only what the report confirms; it does not add a delivery promise.
2. **“Keep it in the working file.”** Amanda returns the report to the folder. No public wording or new commitment is recorded.
3. **“Ask the office for the next confirmed decision.”** `[show if: the report identifies an unresolved decision]` Amanda writes down the office and question. “I'll ask for a date and bring back what they confirm.” This requests information; it does not authorize work or set a date.
4. **“That's enough for tonight.”** `→ evening`

→ commitments

## letters

She opens the second folder.

> **Amanda:** There are invitations, requests from associations and several letters from people who wrote to us during the campaign. I have asked the departments for answers where they can provide them.

1. **Ask her to identify the oldest unanswered requests.** `→ evening`
   ↳ Amanda looks through the receipts clipped to the letters. “I'll check which departments already have a copy before I send another one.”
2. **Ask her to select a few letters for you to read personally.** `→ evening`
   ↳ She takes two from the folder and leaves them by the lamp. “I'll leave the replies with those when they come in.”

## evening

Amanda puts the folders back in her bag.

> **Amanda:** I have something else.

She takes out an envelope containing a photograph from a gathering of former law students. She points to two people standing at the edge of the group.

> **Amanda:** Look at us. I had completely forgotten that hairstyle.

If Lara and Amanda discussed the jacket, Amanda points to it in the photograph. “That's the one I borrowed. I thought it looked better on me until I saw this picture.”

1. **Ask Amanda about the others in the photograph.** `→ photograph`
2. **"We should try to arrange another reunion sometime."** `→ close`
3. **Set the photograph on the table and continue talking.** `→ close`

## photograph

Amanda identifies several of the people, explaining which ones she has kept in touch with and which ones she has not seen for years.

> **Amanda:** I still have Clara's number somewhere. I wonder whether she's living in Katanaí.

→ close

## close

Outside, the lights in the government district are beginning to go out. Amanda collects her things and says goodnight.

1. **End the evening.** `[flag: seen_year_end = true]` `→ END`

The evening records attendance. The calendar advances after its turn's required work is resolved, independently of this optional visit.
