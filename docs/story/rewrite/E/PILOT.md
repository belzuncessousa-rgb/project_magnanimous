# E · Personal life and election pilot

## First Night

Optional after D's Counting Votes. Choose **See Amanda**, **Call home** or **Go upstairs**. Each conversation is available once and returns to the remaining choices. The residence can be skipped.

### See Amanda

Amanda is in the sitting room, taking two sandwiches out of a paper bag. The television is on with the sound down.

> **Amanda:** “I told my mother I'd call after the speech. She rang first to ask why I'd worn the same jacket to your inauguration and my cousin's wedding.”
>
> **Lara:** “Was it the same jacket?”
>
> **Amanda:** “It was. At least it was mine this time.”

She hands you the bag.

> **Amanda:** “Someone from Livia's office asked me earlier whether you had time tomorrow. I asked them to send a subject for the diary.”

- **“They asked for a say in the port appointments.”** Offer only when that request was actually made in D.
  Amanda folds the top of the bag over.
  **Amanda:** “All right. If they ring again, I'll ask what they need before I give them a time.”
- **“Did they send anything?”**
  **Amanda:** “I haven't had anything back. I'll check in the morning.”
- **“Which sandwich is yours?”**
  **Amanda:** “The one without the cheese. Unless you've already started on it.”

Amanda checks the clock and gathers her things. Her mother will still be up.

### Call home

Your father answers. Before he can finish asking whether you've eaten, Celia picks up the other receiver.

> **Celia:** “Your sister brought enough for everybody at Ivone's. She still sent us home with half of it.”
>
> **Father:** “You can stop telling people it's half. You've had some since we got home.”
>
> **Celia:** “Lara, that sign's back up by the old sewer works. Your father thinks they just painted over the date.”
>
> **Father:** “There's no date at all now. I went out and looked.”

- **“I'll ask Planning for an update on your street.”**
  **Celia:** “Thank you. I'll keep the letter from the residents' association here in case they want to see it.”
- **“What does the sign say?”**
  **Father:** “‘Works will resume soon.’ Same as October. I'll take a picture in the morning.”

Celia asks if you have the number for the residence switchboard. She writes it on the back of the shopping list and says good night.

### Go upstairs

Your sister has sent a photograph of the family at Ivone's. Your father is at the edge of the picture holding two plates. On the desk is tomorrow's diary. Choose **Look at the photograph** or **Turn off the light**. If you look, the television in the corner of the picture shows the wide shot of the square. You put the phone down and turn off the light.

## Vila Tamarin · The association's letter

Optional street encounter before C's GP1. It can run after First Night was skipped. At Celia's gate, your father wipes the garden table and puts down a chair. Celia brings out a letter in a clear plastic sleeve.

If Lara promised to ask Planning, Celia says, “Did you get any word about our street?”

> **Lara:** “I haven't got a date for you.”
>
> **Celia:** “Well, have a look at what the association sent us.”

Without the promise, Celia starts by asking Lara to look at the letter.

The letter asks households what they could contribute towards an extension of the sewer. The space for an estimate is blank.

> **Father:** “I've asked the association if there's a figure from the contractor. They said they'd bring it to the next meeting.”
>
> **Celia:** “I told them I'd bring the letter. I'll bring a chair from the house as well. They never have enough.”

- **“When's the meeting?”**
  **Celia:** “Thursday. Ivone usually puts the kettle on about half past six.”
- **“Has anyone put money in yet?”**
  **Father:** “People have put their names down. So far that's all I've seen.”

Celia touches the blank space under the total.

> **Celia:** “I put some money aside. I could put it towards this, or give it to Marco for the kitchen. He says they have enough for this week.”

- **“Wait for the association’s estimate.”**
  **Celia:** “All right. I’ll ask the treasurer to bring it on Thursday.”
- **“I’ll ask Planning to assess this street.”**
  **Celia:** “Take a copy of the letter. I can get another one before the meeting.”
- **“Support Marco’s kitchen if you like. I’ll make sure this street gets connected.”**
  Celia keeps her hand on the letter. “If they give you a date, tell me before I say anything at the meeting.”
- **“Let me know how the meeting goes.”**

If Lara takes a copy and authorizes delivery, her office sends it to Planning, with Livia copied on the request. From the gate you can see where the street bends down towards the unfinished works. Continue to GP1.

## Branch cards

| Scene and gate | Read and owner | Choice | Write | Knowledge | Next and fallback |
|---|---|---|---|---|---|
| First Night after D | `seen_panorama` or D's confirmed completion binding, D owns. `opp_price_1` stores the decision, with the spoken request verified from the encounter. | Tell Amanda what they asked for | None | Amanda learns only the spoken request. The selected terms stay with Lara and their actual participants. Amanda already knows her own diary contact. | Continue to the remaining evening choices. Hide disclosure if the request is unverified. |
| First Night, call home | Residence open, E owns | Ask Planning for an update | `promised_mother_street = true` | Lara and both parents hear a promise to ask for information about their street. | Tamarin opens with Celia's question. The request, reply, funding and delivery each require their own occurrence. |
| First Night, close or skip | Evening availability, E owns | Go upstairs or skip residence entirely | `seen_first_night = true` on upstairs close only | Family has only the contact the player took. | Rejoin the main route. An unset marker permits the same public progression. |
| Tamarin before GP1, optional | `promised_mother_street`, E owns | Ask about the meeting or the collections | `seen_tamarin = true` on departure | Conversation stays with Lara and her parents. | Without the promise read, use the letter opening. Skipping leaves the marker unset. |
| Tamarin, after reading the letter | Street scope and family conversation, E owns | Wait, request an assessment or guarantee a connection | Waiting can record `celia_savings = 3`; an assessment records `promised_mother_street`; a guarantee records that flag and `mother_street_guaranteed`, with `celia_savings = 2` as advice only. A copy actually sent creates a scoped Planning request. | Family hears the chosen terms. Planning and Livia know the request after receipt. | C can mention the received request or an assurance actually disclosed. None of these options writes a project selection, moves Celia's money, or connects the street. |

The port disclosure is local to First Night. Both traces can skip these encounters or take different choices and reach the same public checkpoints.
