---
id: p1-justice-briefing
chapter: 1
turn: 2
title: The Envelope
kind: briefing
location: capital
token: security
portraits: [salgado, delmar]
background: justice-office
---

⚙️ Staged rewrite. Preserve justice programme overview, Avros allegation, families' petition and original flag mappings. Salgado's role must respect her independence and prior professional relationship with Lara. Evidence handling is fictional and procedural; the option to suppress or retain an allegation is an explicit attempted interference, not a lawful entitlement. Validate legal framework and later investigation consequences; no automatic institutional obedience.

## arrival

The Ministry of Justice occupies one of the older public buildings near Congress. When you arrive at Renata Salgado's office, she is standing by the window speaking on the telephone.

> **Renata Salgado:** "No. Send the complete file, please. I'll look at it this afternoon."

She puts the receiver down.

> **Renata Salgado:** "Good morning. Sorry to keep you waiting."

Several legal texts occupy the shelves behind her desk, and a familiar edition catches your eye. You used the same reference work during the investigation that brought the two of you together.

Salgado notices you looking at it.

> **Renata Salgado:** "The new edition is considerably worse. I still use that one."

1. **"I'm glad some things haven't changed."**
   ↳ She smiles briefly.
2. **"You used to lend me that."**
   ↳ > **Renata Salgado:** "And you usually brought it back. Eventually."
3. **"Shall we begin?"**

## take-seat

She takes a seat.

→ programme

## programme

> **Renata Salgado:** "There are several areas where we could improve the work of the ministry within this term."

She arranges three thin folders on her desk.

> **Renata Salgado:** "First, enforcement and access to justice. In parts of the country, investigations take years because we don't have the necessary people or facilities. We could direct additional resources towards organised crime, or towards the use of coercion and unlawful influence in rural areas."

> **Renata Salgado:** "Second, labour relations. Several unions are asking for a coordinated negotiation with the government and employers. We have an opportunity to establish better arrangements before disputes become more serious."

> **Renata Salgado:** "Third, an anti-corruption unit with sufficient resources and independence to examine cases involving public officials."

She rests her hand on the third folder.

> **Renata Salgado:** "We have a great deal of experience investigating these cases. What we frequently lack is the ability to finish them without political interference."

→ questions

## questions

1. **"What would the anti-corruption unit be able to do?"** `[once]` `→ unit`
2. **"What are the main obstacles to enforcement in Ibira?"** `[once]` `→ ibira`
3. **"How urgent are the labour negotiations?"** `[once]` `→ labour`
4. **"Could we fund more than one of these programmes?"** `[once]` `→ capacity`
5. **"How do we keep my promise about appointments?"** `[show if: flag.promised_integrity]` `[once]` `→ pledge`
6. **"Is there anything else you wanted to discuss?"** `→ envelope`

## unit

> **Renata Salgado:** "It would give investigators and prosecutors dedicated support for complex cases, with safeguards against decisions being dictated by the people they are investigating."

1. **"Would the President be able to intervene?"**
   ↳ > **Renata Salgado:** "The President would set policy and propose the resources. Individual cases would have to be handled according to the law. That is rather important to the proposal."
2. **"We should examine how to guarantee its independence."**
   ↳ She nods.
   ↳ > **Renata Salgado:** "I'll prepare the relevant proposals for you."
3. **"I understand."**

→ questions

## ibira

> **Renata Salgado:** "Territory, resources and the influence criminal organisations have over public officials. Our people can make an arrest and discover that nobody nearby can safely provide testimony."

> **Renata Salgado:** "We need the capacity to maintain a presence, and institutions that people can trust with information."

→ questions

## labour

> **Renata Salgado:** "The unions at Katanaí have asked for a meeting about wages and working conditions. Several other industries have similar concerns."

1. **"Have the employers agreed to meet?"**
   ↳ > **Renata Salgado:** "Some have. Others want to see the government's position before committing themselves."
2. **"Keep me informed before the next budget meeting."**

→ questions

## capacity

> **Renata Salgado:** "With adequate funding and staff, certainly. If we concentrate the same small number of investigators across too many cases, we will make very little progress on any of them."

→ questions

## pledge

> **Renata Salgado:** "Start by asking each office to record the requirements before it considers names. If someone challenges an appointment later, there should be a record of how it was made."

She looks at the papers on her desk.

> **Renata Salgado:** "It will matter the first time someone brings you a name you would rather keep."

→ questions

## envelope

Salgado moves an unmarked envelope towards the edge of her desk.

> **Renata Salgado:** "An anonymous allegation was sent to this office shortly after the election. It concerns contracts in Mognagna and appears to name Pelan Avros."

She leaves the envelope where it is.

> **Renata Salgado:** "I have not yet examined its contents in detail. It will need to be assessed by the appropriate authorities. I wanted to inform you because Avros leads your deputies in Congress."

1. **"What do you know about the allegation?"**
   ↳ > **Renata Salgado:** "Only what was indicated when it arrived. An allegation is not proof. We need to establish whether there is anything that can be corroborated."
2. **"Have other people received it?"**
   ↳ > **Renata Salgado:** "I don't know. Whoever sent this may have sent copies elsewhere."
3. **"I see."**

## assessment

> **Renata Salgado:** "I intend to have it assessed. There is no reason to announce anything publicly before we know whether the information is credible."

→ envelope-choice

## envelope-choice

1. **"Have it assessed through the proper channels."** `[flag: avros_envelope = 1]`
   ↳ > **Renata Salgado:** "I will. If we establish grounds for an investigation, I'll let you know what can appropriately be shared with your office."
2. **"I want you to delay action until the budget has passed."** `[flag: avros_envelope = 2]`
   ↳ Salgado looks at you for a moment.
   ↳ > **Renata Salgado:** "I can establish what needs to be done and when. I cannot agree to suspend a legitimate investigation for a congressional vote."
   ↳ She moves the envelope back towards her files.
   ↳ > **Renata Salgado:** "I'll take legal advice on how the matter must proceed."
3. **"Give me the allegation. I want to decide what happens next."** `[flag: avros_envelope = 3]`
   ↳ She rests her hand on the envelope.
   ↳ > **Renata Salgado:** "I can provide you with an appropriate briefing. The original has to remain in the ministry's custody."
   ↳ Her expression becomes more serious.
   ↳ > **Renata Salgado:** "If you intend to issue an instruction about this case, I would ask you to do so formally."

⚙️ Existing flags now record Lara's stance or attempted interference; later content must not assume Salgado complied. No new illegal procedure is established here.

## petition

Salgado closes the folder in front of her.

> **Renata Salgado:** "There is another group of people who have asked to meet you. They are representatives of the families of those who disappeared during military rule."

She takes a printed letter from the corner of her desk.

> **Renata Salgado:** "They are asking for access to the archives. They have collected signatures from across the country and would like to present the petition to the President."

1. **"What would be required to open the archives?"**
   ↳ > **Renata Salgado:** "We would need to examine the legal restrictions and decide what changes are necessary. Access to records and the question of prosecution are distinct issues."
2. **"How do the armed forces regard the petition?"**
   ↳ > **Renata Salgado:** "General Voss has made his opposition to opening the archives quite clear. Receiving a petition does not in itself change the law."
3. **"Who is representing them?"**
   ↳ > **Renata Salgado:** "Rosa Delmar. Her brother disappeared when she was a young woman."

## petition-choice

> **Renata Salgado:** "Mrs. Delmar is in the building this morning. Would you like to see her?"

1. **"Yes. I'll receive her."** `[flag: files_petition = 1]` `→ delmar`
2. **"Please meet her on my behalf. I'll send a letter."** `[flag: files_petition = 2]`
   ↳ > **Renata Salgado:** "I'll let her know."
3. **"I won't receive the delegation today."** `[flag: files_petition = 3]`
   ↳ Salgado nods, though her expression is somewhat disappointed.
   ↳ > **Renata Salgado:** "I'll inform them."

→ close

## delmar

Rosa Delmar comes into the office carrying a canvas bag. She takes out a thick bundle of papers and places it carefully on the desk.

> **Rosa Delmar:** "Thank you for receiving me."

Salgado offers her a chair. Mrs. Delmar sits down and smooths the top page of the bundle with her hand.

> **Rosa Delmar:** "My brother was twenty-three when he disappeared. My parents spent years writing letters to the authorities. My mother kept every reply in a box at home."

> **Rosa Delmar:** "Neither of them lived to find out what happened to him."

She takes a breath.

> **Rosa Delmar:** "There are many families like ours. Some of the people who signed this have been waiting since their children were taken. We are asking to see the records that concern them."

1. **"What information have you been able to obtain?"**
   ↳ > **Rosa Delmar:** "Very little officially. There are people who have told us things in private. We cannot verify most of them."
2. **"Did your family ever receive an explanation?"**
   ↳ She shakes her head.
   ↳ > **Rosa Delmar:** "We were told he had left the country. His passport was in my mother's drawer."
3. **Let her continue.**

## petition-request

> **Rosa Delmar:** "I understand that you cannot make a decision about the archives in this room. I would like to know whether you are prepared to acknowledge what we are asking."

→ delmar-response

## delmar-response

1. **"I acknowledge your request. The country deserves to know what happened."** `[flag: delmar_acknowledged = true]`
   ↳ She nods slowly.
   ↳ > **Rosa Delmar:** "Thank you. I hope we'll have an opportunity to speak again."
2. **"I will have the legal options examined before making a commitment."**
   ↳ > **Rosa Delmar:** "I understand. Please keep us informed."
3. **"Give me some time. I don't intend to leave this indefinitely."** `[flag: delmar_time_asked = true]`
   ↳ She looks at you directly.
   ↳ > **Rosa Delmar:** "I'll tell the others what you said."
4. **"I can't commit to reopening the question."**
   ↳ Mrs. Delmar lowers her eyes to the petition.
   ↳ > **Rosa Delmar:** "Then I hope you will at least keep this."

## receive-petition

Salgado takes the bundle and promises to acknowledge its receipt formally.

→ close

## close

1. **Thank Salgado and leave.** `[flag: seen_justice_briefing = true]`

→ END
