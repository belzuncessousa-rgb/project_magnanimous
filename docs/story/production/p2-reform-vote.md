---
id: p2-reform-vote
title: The Constitutional Vote
chapter: 2
turn: 3
location: capital
portraits: [mertens, livia, lessa]
background: congress-gallery
---

<!-- Integration gate: this finale requires actual negotiated PEC text and results from the applicable legislative stages. Do not use an influence purchase to simulate a constitutional majority. Until the engine supports these outcomes, keep the staged scene unavailable. The proposed pec_final_* flags require mapping to real vote/ratification results. -->

## opening

From the presidential gallery, you can see deputies returning to their seats as the presiding officer calls the chamber to order. Mertens has brought the final version of the amendment, with several pages marked by coloured tabs.

> **Mertens:** This is the text they will vote on. Every delegation has received it.

Livia checks the document against the record of negotiations.

> **Livia:** There are provisions we agreed to pursue after this vote. We will need to follow through on those separately.

1. **Review the outcome of the vote.** `[show if: flag.pec_final_passed]` `→ passed`
2. **Review the outcome of the vote.** `[show if: flag.pec_final_revised]` `→ revised`
3. **Review the outcome of the vote.** `[show if: flag.pec_final_rejected]` `→ rejected`
4. **Review the status of the proposal.** `[show if: flag.pec_final_deferred]` `→ deferred`

## passed

The presiding officer announces that the required majority has been reached. There is applause from the benches that sponsored the final text.

> **Mertens:** That is the chamber's decision. Now we must complete the remaining constitutional requirements.

> **Livia:** I'll ask the legal department for the implementation schedule once ratification is confirmed.

→ reaction

## revised

The amended text is approved. Several provisions originally proposed by the government are absent from the final version.

Mertens turns to the marked pages in his copy.

> **Mertens:** This is what the parties ultimately accepted. We should explain the changes before everyone starts giving their own account of what happened.

→ reaction

## rejected

The presiding officer reads the result twice. Deputies begin leaving their seats.

Livia closes her folder.

> **Livia:** We will need to inform the governors that the proposal has not advanced.

> **Mertens:** We can reconsider the text, if you want to. We should also consider which agreements survive this result.

→ reaction

## deferred

> **Mertens:** The text has not reached the necessary stage for a final decision. I would rather know that before the vote than discover it on the floor.

Livia hands you the latest negotiating record.

> **Livia:** These are the points that remain unresolved.

→ reaction

## reaction

1. **"Prepare a factual statement explaining what has happened."** `→ close`
2. **"Arrange a meeting with the parties that supported our proposal."** `→ close`
3. **"I want to review the agreements before making a public statement."** `→ close`

## close

Livia and Mertens leave to make the necessary arrangements. The chamber below continues with its next item of business.

1. **Return to the palace.** `[flag: seen_reform_vote = true]` `[flag: chapter2_complete = true]` `→ END`
