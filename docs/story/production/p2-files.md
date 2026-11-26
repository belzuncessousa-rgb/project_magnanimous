---
id: p2-files
title: The Names We Carry
chapter: 2
turn: 3
location: capital
portraits: [salgado, voss, delmar]
background: president-office
---

## opening

The photographs on Salgado's desk were taken during the annual gathering of families seeking information about relatives who disappeared under the military government. In one photograph, Rosa Delmar stands beside a young man holding a portrait of his grandfather.

General Voss examines the pictures without touching them.

> **Salgado:** The families have submitted another petition. There are records that could establish what happened to some of these people. Before we can decide what to release, I want a legal assessment of their status.

> **Voss:** And the officer corps will want to know whether the assessment is intended to reopen prosecutions.

> **Salgado:** Then we should be precise about its purpose.

1. **"What exactly would the assessment cover?"** `→ scope`
2. **"General, what is the military's concern?"** `→ concern`
3. **"Have we heard from the families directly?"** `→ families`
4. **"I understand. Let's make a decision."** `→ decision`

## scope

> **Salgado:** Classification, custody, applicable protections and the rights of the families. The law does not treat every document in the same way.

She moves a blank sheet beside the photographs.

> **Salgado:** We would submit recommendations. No document would be released simply because the study had begun.

→ decision

## concern

> **Voss:** Some officers believe that opening the records would mean the government has already decided to disregard the transition agreements. Many of the people serving today were children when those agreements were signed.

> **Salgado:** The study can address those agreements. We cannot ask the families to accept an interpretation we have never examined.

→ decision

## families

> **Salgado:** Mrs. Delmar asked for an answer to the petition. Her request is for information about her brother.

If Lara previously received Delmar, Salgado adds:

> **Salgado:** She appreciated being heard at the palace. I think she would appreciate a written response just as much.

→ decision

## decision

1. **"Commission an independent legal study."** `[flag: files_study = true]` `→ study`
2. **"Issue a statement acknowledging the families' right to seek answers, but defer the study."** `[flag: files_statement = true]` `→ statement`
3. **"Leave the existing arrangements in place. No new initiative."** `[flag: files_shelved = true]` `→ shelve`

## study

> **Salgado:** I will prepare the terms of reference and identify the necessary specialists.

Voss leans back.

> **Voss:** I would ask that the military be informed before any change to the handling of its records.

> **Salgado:** We can consult the institutions responsible for the archives. The conclusions must remain independent.

→ close

## statement

Salgado takes a note.

> **Salgado:** I can prepare a statement. It will not settle the legal questions, but the families deserve an accurate account of what we intend to do.

→ close

## shelve

Salgado looks at the photographs for a moment.

> **Salgado:** I will respond to the petition. I cannot promise the families that the question will disappear.

Voss gives a small nod.

→ close

## close

The two ministers collect their documents. Salgado leaves the photographs on the table beside the petition.

1. **End the meeting.** `[flag: seen_files = true]` `→ END`
