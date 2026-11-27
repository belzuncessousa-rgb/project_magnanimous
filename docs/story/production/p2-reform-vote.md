---
id: p2-reform-vote
title: The Constitutional Vote
chapter: 2
turn: 3
location: capital
portraits: [mertens, livia, lessa]
background: congress-gallery
---

## second-tally | The Second Tally

*After the first chamber passed an identified version of the PEC. Show each chamber's support separately. Both must pass the same text. Record ratification only after any further constitutional requirements are satisfied. Exact majorities and those requirements remain provisional. A scheduled date alone has no legal effect.*

⚙️ Provisional integration keys for these conditional passages: `pec_government_sponsored` distinguishes executive sponsorship from an independent motion; `pec_live_concession_exists` records an outstanding political commitment tied to this text; `pec_live_concession_present_in_current_text` compares the identified text with that commitment; `pec_revised_text_submittable` reflects the filing rules and remaining calendar; `pec_amendment_offer_available` requires a specific amendment from a named bloc; `pec_sponsor_meeting_available` requires the affected members' willingness to meet; `pec_unsettled_clause_exists` names the clause still open; `pec_vote_held_before_submission` is true only if the presiding officer accepted the hold request; `pec_senate_approved_same_text` and `pec_senate_approved_changed_text` are mutually exclusive recorded chamber results; `pec_ratified` and `pec_rejected` are mutually exclusive final outcomes; `pec_followup_delegations_willing` requires actual willingness to meet; `pec_allocation_publication_available` requires a certified allocation whose release is permitted; `pec_ordinary_law_clause_available` requires a specific eligible provision that can still be enacted under ordinary law. Negotiation outcomes, caucus support, chamber votes and ratification remain separate states.

On the morning of the second vote, Livia brings a short list to your office. If Lara met the delegates named on it, she recognizes their names. Otherwise Livia identifies the delegation.

`[if: flag.pec_government_sponsored && flag.pec_live_concession_exists]` Government-sponsored text with a live concession.

> **Livia:** “They voted with us in the first chamber. The senator who speaks for their state sent this at seven.”

You read the request. It refers to one of the concessions recorded during negotiation.

- **“Send the text that carries our agreement.”** Livia puts the current text and the agreement side by side. `[if: flag.pec_live_concession_present_in_current_text]` She sends the identified version to the clerk; support remains attached only to that text. `[if: !flag.pec_live_concession_present_in_current_text]` She leaves it on your desk. “This version doesn't include what we promised them.” You choose whether to restore the clause and seek renewed approval, or submit this version and release the affected commitment.
  - **“Restore the agreed clause and return to the first chamber for approval.”** `[show if: !flag.pec_live_concession_present_in_current_text && flag.pec_revised_text_submittable]` Livia sends the revised version to the deputies first. If they approve it, the Senate can resume on that same text; the earlier tally does not count as approval of the restoration. The affected members must also confirm any commitment attached to the clause.
  - **“Submit the current text and tell them the commitment is no longer in it.”** `[show if: !flag.pec_live_concession_present_in_current_text]` Livia attaches the current text to the notice. The affected commitment remains unmet; count only the support this version receives.
- **“Ask to hold the vote for another round.”** The government requests that the presiding officer withdraw the item. If the request is accepted, use the held exchange below. If refused, Livia brings the notice back to Lara and the decision menu returns. The vote does not proceed without her separate instruction to submit this version; when a concession is missing, she must explicitly release it or restore the clause first.
- **“Proceed on the current text.”** `[show if: flag.pec_live_concession_present_in_current_text]` The chamber reads and votes on that text. If it is materially different from the version the deputies passed, send the approved text back to the first chamber before ratification.

### Government-sponsored text without a live concession

`[if: flag.pec_government_sponsored && !flag.pec_live_concession_exists]`

Livia gives you the dated version and the latest count.

> **Livia:** “They have this text. I have two replies that depend on amendments the chamber hasn't accepted.”

Use the second sentence only with those replies. The clerk's latest copy is the version before the chamber.

- **“Proceed on this text.”** Livia hands the clerk the dated copy. Count the vote on this version; an earlier whip count is not a result.
- **“Ask for another round on the named amendment.”** `[show if: flag.pec_amendment_offer_available]` Livia returns the text to the negotiators. Their revised proposal and support must come back before another vote is scheduled.
- **“Withdraw government sponsorship.”** Livia asks the clerk to remove the government item. The proposal can proceed only if its other sponsors choose to carry it under the chamber's rules.

`[if: !flag.pec_government_sponsored]` Independent sponsors. Lessa brings the sponsors' copy to the office before the vote.

> **Lessa:** “I've asked the clerk to keep the version that passed the deputies beside this one. There may be a change on the floor.”

- **“Tell our caucus which version is before them.”** Livia sends the sponsors' text. Keep Lara's caucus instruction on that text unless she explicitly changes it.
- **“Ask the sponsors to consider postponement.”** Lessa asks what her cosponsors would be revisiting. She can agree to request a delay or decline. The legislature retains the decision on its own schedule.
- **“Let the sponsors proceed.”** Lessa takes her copy with her. Count the support they secured for the text actually voted on.

Lara cannot withdraw an independent motion or amend it herself. If the Senate changes it, Lessa decides whether to seek the deputies' approval. The following choices record Lara's caucus position only.

If the Senate changes an independently sponsored motion, Lessa brings you the two versions before the deputies act.

- **“Support the amended text when it returns to the deputies.”** Livia sends the comparison and Lara's position to the caucus. The deputies decide whether to approve it; Lara does not amend the sponsors' motion herself.
- **“Keep our opposition to the amended text.”** Livia records the position for the caucus. The sponsors may still seek votes from other members.
- **“Leave the decision to the sponsors and the caucus.”** Livia sends the comparison without a new instruction from Lara. Count only the position members actually take on the amended version.

### If the proposal is held before submission

`[if: flag.pec_vote_held_before_submission]`

Use this exchange away from the gallery.

Livia calls the Senate clerk. When she hangs up, she checks the dates left on the list of business.

> **Livia:** “They've taken it off today's list. The senators who came in for it will want to know whether there will be another meeting this week.”

- **“Reopen talks on the clause the clerk returned.”** `[show if: flag.pec_sponsor_meeting_available && flag.pec_unsettled_clause_exists]` Lessa asks the affected delegates to meet. “I'll bring them the clause and the current text. They can tell us whether there's a version they can support.” Any promise tied to the former text must be confirmed against a replacement.
- **“End government sponsorship of this version.”** `[show if: flag.pec_government_sponsored]` Livia sends the clerk the withdrawal. A separately sponsored motion remains with its sponsors if chamber rules allow them to continue it.
- **“Leave the proposal off the agenda until a new version is ready.”** The clerk records that no vote is requested. No meeting or new vote date is implied.

`[if: flag.pec_senate_approved_same_text && !flag.pec_ratified]` Senate approves the same text, with further requirements still outstanding.

In the corridor, Lessa is answering a call. She asks the caller to wait and shows you the clerk's notice.

> **Lessa:** “Both chambers have approved it. The governors are asking for a start date. I'll give them the rest of the procedure first.”

`[if: flag.pec_senate_approved_changed_text]` Senate approves a changed text.

Livia gets a copy from the Senate clerk and sends a second copy to the first chamber's clerk.

> **Livia:** “This is the text approved here. The deputies can accept these changes or vote them down. The governors should have the two versions before they ask us when the new rules begin.”

For a government-sponsored proposal, Lara chooses what the executive does with the Senate's text:

- **“Send the amended text to the deputies for approval.”** Livia sends both versions and the Senate's recorded changes. The deputies vote on the amended text; support for the earlier version does not count as approval of these changes.
- **“Reopen talks on the named change.”** `[show if: flag.pec_sponsor_meeting_available && flag.pec_unsettled_clause_exists]` Livia returns the disputed clause to negotiation. The Senate's text remains unratified until the chambers approve the same version.
- **“Withdraw government sponsorship.”** Livia files the withdrawal. The proposal ends unless its independent sponsors choose to continue under the chamber's rules.

For an independently sponsored proposal, Lessa decides whether to ask the deputies to approve the Senate's text. These choices tell her the caucus position; they do not transfer control of the motion to Lara.

- **“Support sending the Senate's text to the deputies.”** Livia gives the caucus the comparison and Lara's position. The sponsors decide whether to seek the vote; the deputies decide whether to approve the amended version.
- **“Keep our opposition to the Senate's changes.”** Livia records the caucus position on the revised clauses. The sponsors may still seek votes from other members.
- **“Leave the caucus free to decide.”** Livia sends the text comparison without a new instruction. The sponsors choose whether to continue, and the caucus records its own vote.

If the deputies approve the same amended text, proceed through any remaining ratification requirements. If they reject it, use the rejection outcome.

`[if: flag.pec_ratified]` Lessa calls after confirmation. “The governors are asking when the new arrangements start. Could your office send them the implementation schedule? One of them has already asked the wrong department.”

`[if: flag.pec_rejected]` Livia puts the vote record in the same folder as the bill. “I'll send this to the negotiators. There is a provision some of them want to discuss as an ordinary law.”

- **“Give the press office an account of today's decision.”** Livia checks the clerk's notice again. “I'll give them the exact stage we reached. They can call the clerk if they need the tally.”
- **“Ask the delegations who still want to talk to meet me.”** `[show if: flag.pec_followup_delegations_willing]` Lessa puts their names on the back of her notice. “I'll ask when they can come. The governor's office should hear from us before they do.”
- **“Ask them to prepare the eligible provision as an ordinary bill.”** `[show if: flag.pec_rejected && flag.pec_ordinary_law_clause_available]` Lessa identifies the sponsor and asks the clerk which chamber can receive the bill. The new measure needs its own text, support and vote; rejection of the PEC creates no ordinary law.
- **“Let me see the agreements before I comment.”** Livia hands you her folder. “The latest text is in front. The commitments that sit outside it are clipped to the back.”

Record only the response Lara selects. The result affects the constitution only on effective ratification, and a separate promise remains outstanding until the promised action occurs. Calendar advancement must work whether or not this vote occurs.

→ END

### The new instructions

*Follow-up after ratification when there is a decision to implement. Use only the clauses enacted. The legislature continues under the prior allocation until the new seats legally take effect. In a delayed or contested implementation, keep the relevant authority visible.*

A clerk from the states' office gives Livia the letters that have come back from the governors. One governor has returned the whole circular with the last paragraph underlined.

> **Livia:** “He wants to know which part his office is supposed to put into effect. They've already sent a copy to their municipalities.”

*Representation changes.* Lessa opens the certified allocation. “This is the table the electoral office will use. The present members finish on the dates listed here.” Use the actual transition rule if it differs, including appointments or vacancies. For publication before implementing legislation, show the agreed deadline and the office responsible.

*Transfers or powers change.* The state clerk puts an application on the table. “This one was lodged last week. Can we tell the applicant whether it stays with the federal office?” Livia checks the transitional clause before she answers.

- **“Send every affected office the effective dates.”** Livia hands the clerk the relevant pages. “Tell them which rules apply to cases already lodged. If there's a question the text doesn't settle, bring it back before we issue the circular.”
- **“Publish the allocation and its assumptions.”** `[show if: flag.pec_allocation_publication_available]` Lessa holds the proof against the approved schedule. “I'd like the state clerks to have the same table as the papers.” If publication was promised, fulfil the promise only when the required material is actually published.
- **“Bring me the remaining implementation decision.”** Livia clips the returned letter to the unresolved clause. “I'll ask the legal office what can be settled here and what needs another vote.” If another act is needed, the old procedure continues within its current authority until the new act takes effect.

At the next meeting with an affected state, use what it can actually administer. A ratified change can alter the terms of a regional negotiation. It cannot settle the governor's separate claims by itself.

→ END
