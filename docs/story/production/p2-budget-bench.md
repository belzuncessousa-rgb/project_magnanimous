# District allocations

Staged scene for Chapter 2, after the first budget proposal and before the vote. Pelan Avros speaks for the governing party's bench. The district allocation, the routes available to finance it, and the bench's exact vote commitment depend on the revised bill. `amendments` carries the opening commitment. The new `avros_school_response` and `district_terms_response` choices below are provisional integration keys, not live-game states.

Avros is still on the telephone when you arrive. He points to a chair across from him and moves a second copy of the budget within reach.

> **Avros:** “No, I see the school on the list. Is the work listed under Education or under the municipality?”

He waits a moment, then writes down the name of the municipality.

> **Avros:** “All right. Send me the page you have. I'll ask.”

He puts down the telephone.

> **Avros:** “A deputy from our bench. A school in his district has closed two classrooms. The municipality says it applied to Education last year. Education sent him back to the municipality.”

> **Lara:** “Is it in our budget?”

> **Avros:** “I haven't found it. It's the sort of thing they want to be able to put forward themselves.”

> **Avros:** “I can bring the bench together tomorrow. I'd like to know what I can tell them before I ask them to defend the bill.”

Optional exchanges, available in any order.

- **“What have they heard from me so far?”** `[once]`

  Avros opens the earlier note beside the revised bill.

  ↳ `[if: flag.amendments == 1]` > **Avros:** “I told them you would restore district funds and publish the allocations. Some have already asked their mayors for estimates. They want to know whether the revised bill includes a line for them.”

  ↳ `[if: flag.amendments == 2]` > **Avros:** “I told them the funds would return and that we would discuss allocations privately. Some have already spoken with the ministries. We should tell those ministers who can settle the amounts.”

  ↳ `[if: flag.amendments == 3]` > **Avros:** “I told them you wanted the money to stay in the national programme. This deputy asked whether his school could get a decision before the next school year. I said I would find out.”

  ↳ `[if: flag.amendments == 4]` > **Avros:** “I told them you wanted to wait until the budget was ready. They're waiting to see whether there'll be a fund.”

  ↳ `[if: !flag.amendments]` > **Avros:** “I told them we hadn't settled whether there would be a fund. This deputy asked whether his school could get a decision before the next school year. I said I'd ask you.”

- **“How many would vote against us?”**

  Avros takes his glasses off and sets them on the budget.

  > **Avros:** “A few would vote against. More of them would ask me to postpone the meeting. They want to see which requests the ministries have accepted before they go home this weekend.”

  > **Lara:** “Would they come in and tell me that themselves?”

  > **Avros:** “Some would. If you want to speak to them, I'll bring the ones who have an actual objection. You can hear the speeches when the bill goes to the floor.”

- **“Can the ministries handle these requests directly?”**

  > **Avros:** “Certainly. Ask Education for a list of repairs and the grounds for putting one school before another. I'd welcome it.”

  He picks up the note he made during the call.

  > **Avros:** “Could they give the deputy an answer on this one, either way? He's been ringing me since Tuesday.”

- **“Would publication cost us support?”**

  > **Avros:** “Some deputies would welcome it. They'd have something to show the local paper. Others have been discussing projects with mayors who expect to hear about the result before anyone else.”

  > **Lara:** “Have they already promised the money?”

  > **Avros:** “I hope they said they'd ask. I can think of two people I'd like to check with.”

Lara can authorize terms for the revised bill.

1. **“Set aside district funds. Publish the allocations.”**

   Avros puts his glasses back on and opens the bill to the investment section.

   > **Avros:** “I'll ask the bench to send requests with estimates. Will Treasury tell us the ceiling before I meet them?”

   > **Lara:** “I'll ask Fontes for a figure. We'll need to show what it comes out of.”

2. **“Set aside district funds. Negotiate the allocations privately.”**

   > **Avros:** “Then let me collect the requests. If each deputy goes straight to a minister, we'll have five different accounts of what's been agreed by Friday.”

   He pulls a ruled pad from under the budget.

   > **Avros:** “I'll bring you the list before I give them amounts.”

3. **“Keep the money in the national programme.”**

   Avros looks at the note from his phone call.

   > **Avros:** “All right. I'll tell them. I'd still like Education to look at the school. If they can give him a date for a decision, at least he'll have something accurate to take home.”

   ↳ `[if: flag.amendments == 1 || flag.amendments == 2]` > **Avros:** “I told them the funds would return. If you're keeping the money in the national programme now, they'll want to hear why. What should I tell them?”

   1. **“I'll attend the bench meeting and explain the change.”** `[show if: flag.amendments == 1 || flag.amendments == 2]` `[flag: avros_school_response = 1]`
      ↳ > **Avros:** “I'll arrange the meeting. I'll tell them the revised bill is your decision and leave the school request open for Education to answer.”
   2. **“Give them the revised bill and its reason in writing.”** `[show if: flag.amendments == 1 || flag.amendments == 2]` `[flag: avros_school_response = 2]`
      ↳ > **Avros:** “I'll send the same explanation with the new copy. I'll ask Education to answer the deputy's question separately.”
   3. **“Ask Education to answer the deputy before the meeting.”** `[flag: avros_school_response = 3]`
      ↳ > **Avros:** “I'll ask him to wait for their answer. I'll tell the bench the district allocation is not in this bill.”

4. **“Bring me the requests and the cost before I commit.”**

   > **Avros:** “I'll have them send what they have today. I can give you the list. The ministries will have to tell us which estimates are any good.”

   ↳ `[if: flag.amendments == 1 || flag.amendments == 2]` > **Avros:** “When I ask for estimates, they'll ask whether your earlier commitment still stands. The bill has not set an amount yet. What should I say?”

   1. **“The earlier terms stand while we review the estimates.”** `[show if: flag.amendments == 1 || flag.amendments == 2]` `[flag: district_terms_response = 1]`
      ↳ > **Avros:** “I'll tell them the publication or privacy terms are unchanged. I'll make clear that the amount still depends on the estimates and the revised bill.”
   2. **“Reopen the earlier terms before you brief the bench.”** `[show if: flag.amendments == 1 || flag.amendments == 2]` `[flag: district_terms_response = 2]`
      ↳ > **Avros:** “I'll tell them the funding terms are under review. They can still send their requests, but no one should treat the earlier decision as settled.”
   3. **“Wait for the estimates before I answer.”** `[show if: flag.amendments == 1 || flag.amendments == 2]` `[flag: district_terms_response = 3]`
      ↳ > **Avros:** “I'll tell them you haven't confirmed a new amount. I'll bring the estimates back before I give them another answer.”

### Changing the publication terms

Use after choosing published allocations following a private arrangement, or private allocations following a publication promise. Avros asks whether Lara wants him to read the new terms to the people he briefed.

> **Avros:** “They'll remember what I told them the first time. So will the people they spoke to afterwards.”

- **“Tell them which terms I've changed.”** He reads back whether allocations will be public. Lara confirms the new position or corrects it before he contacts anyone.
- **“Keep the earlier terms.”** He turns back to the earlier instructions. “Then I'll give them the answer they already have. We still need to agree the amount.”

Record any earlier promise alongside the current instruction. Where a change affects support, hear from the affected members once they have seen the revised bill.

Avros's telephone rings again. He turns it over to see who's calling.

> **Avros:** “It's the deputy. I'll tell him I have the name of the municipality. That's all I've got for him so far.”

### Continuity notes (designer)

- If Lara reverses a live promise in either direction, acknowledge the promise she made, including a reversal between public and private allocation. Keep the earlier promise in the record alongside the new terms.
- The bill can return with an affordable, smaller, or unfunded allocation. A promise to publish concerns the final allocations. A privately negotiated allocation still requires funding authority. The school repair remains a request unless separately approved and delivered.
- Pass the authorized terms into the coalition meeting. Avros reports support against the revised bill after the bench has seen it. A national-programme route can still pass if Lara assembles sufficient support for the bill.
