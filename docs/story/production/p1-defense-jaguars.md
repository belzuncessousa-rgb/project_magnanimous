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

⚙️ Staged rewrite. Retain Jaguar Guard decision and archive redline, border equipment discussion, old completion and choice flags. Actual protection consequences, savings and military loyalty effects require reconciliation. Petition references conditional on already completed Justice scene; speech references require actual selected topic, not hidden compass. No precise security deployment details.

## courtyard

General Voss has asked to meet you in the palace courtyard. Several members of the Jaguar Guard are rehearsing a ceremonial formation. Their dark green uniforms are the same ones you saw during the inauguration.

Voss stands with his hands behind his back, watching them.

> **Aldric Voss:** "Good morning, Madam President."

He turns towards the courtyard.

> **Aldric Voss:** "I wanted to speak to you about the Guard before we discuss the defense budget. Treasury has included its ceremonial expenses among several possible savings."

The formation comes to a halt.

> **Aldric Voss:** "They have a long history. The unit predates the republic, although its responsibilities have changed over the years. Today it provides presidential protection as well as ceremonial services."

1. **"I'd like to watch for a moment."**
   ↳ Voss nods. You remain beside him while the formation completes its exercise.
2. **"How much of their budget is ceremonial?"**
   ↳ > **Aldric Voss:** "A relatively small part of our overall spending, but a considerable amount for a unit of this size. We maintain several sets of equipment that are used only on formal occasions."
3. **"What are our alternatives?"**

## guard

The general leads you towards the covered arcade.

> **Aldric Voss:** "My preference is to retain the unit in its current form. We could reduce its ceremonial responsibilities, or transfer presidential protection to another service. The latter would require considerable preparation."

→ questions

## questions

1. **"Could we preserve the protection and reduce the ceremony?"** `[once]` `→ trim`
2. **"Would another service be able to take over?"** `[once]` `→ transfer`
3. **"Why does the tradition matter to the armed forces?"** `[once]` `→ tradition`
4. **"I'm ready to decide."** `→ decision`

## trim

> **Aldric Voss:** "Certainly. The training and protective responsibilities would remain. We could replace much of the ceremonial equipment with standard uniforms."

He glances back at the courtyard.

> **Aldric Voss:** "I expect the personnel would be disappointed. But we can explain the decision."

→ questions

## transfer

> **Aldric Voss:** "The federal police could establish the necessary capability, given sufficient preparation. I would want any transfer to be planned carefully with both services."

1. **"Would the savings justify the transition?"**
   ↳ > **Aldric Voss:** "That is a question for Alexander as much as for me. The new arrangements would also have costs."
2. **"Understood."**

→ questions

## tradition

> **Aldric Voss:** "The Guard has represented the office of the presidency for generations. There are people serving in it whose parents served before them."

He smiles faintly.

> **Aldric Voss:** "They take great pride in appearing at occasions like your inauguration."

→ questions

## decision

1. **"Transfer presidential protection to the federal police and disband the Guard."** `[flag: jaguars_defunded = true]`
   ↳ Voss's expression stiffens.
   ↳ > **Aldric Voss:** "I disagree with that decision. I'll prepare my objections and a proposal for the transition, should you decide to proceed."
2. **"Retain the Guard but reduce its ceremonial expenses."** `[flag: jaguars_trimmed = true]`
   ↳ He looks towards the courtyard.
   ↳ > **Aldric Voss:** "Very well. I'll speak to the commander and have the revised estimates sent to Treasury."
3. **"Keep the Guard in its present form."** `[flag: jaguars_kept = true]`
   ↳ > **Aldric Voss:** "Thank you. I'll inform the commander."

## files

As you walk along the arcade, Voss slows down.

> **Aldric Voss:** "There is one other matter, Madam President. I would prefer to discuss it directly with you."

> **Aldric Voss:** "You will be asked to open the military archives. I understand the reasons some people have for making that request. I also believe that the arrangements made at the return to civilian government remain important to the armed forces."

1. **"I received a petition from Rosa Delmar."** `[show if: flag.files_petition == 1]`
   ↳ > **Aldric Voss:** "Yes, I heard that you had received her. I don't object to your meeting with the families."
2. **"Renata is handling the families' petition."** `[show if: flag.files_petition == 2]`
   ↳ > **Aldric Voss:** "I would like to be informed before the ministry prepares any proposal to change the present arrangements."
3. **"I understand that there are legal restrictions."**
   ↳ > **Aldric Voss:** "There are. I would like us to observe them."
4. **"What precisely are you concerned about?"**
   ↳ > **Aldric Voss:** "That a decision taken for political reasons might overturn the settlement on which the institutions have relied since the transition."

He stops beside one of the columns.

> **Aldric Voss:** "I should be clear about my own position. If the government decides to open those archives, I will not be able to remain Minister of Defense."

## archive-response

1. **"I understand your position, General."**
   ↳ He inclines his head.
   ↳ > **Aldric Voss:** "Thank you for hearing me."
2. **"The archives will not be opened this year."** `[flag: files_promise_voss = true]`
   ↳ > **Aldric Voss:** "I appreciate the assurance."
3. **"I will make that decision when I have examined the issue."**
   ↳ > **Aldric Voss:** "Of course. I wanted you to know where I stand."
4. **"Your resignation cannot determine government policy."**
   ↳ He looks directly at you.
   ↳ > **Aldric Voss:** "I have no intention of deciding policy in your place. I am telling you what I would do."

## border

Voss takes a small folder from an assistant waiting nearby.

> **Aldric Voss:** "As for the budget, I would particularly like you to consider the condition of our equipment in Ibira. A large portion of the region is difficult to reach, and some of the equipment in use there is decades old."

1. **"Include the requirements in your budget proposal."** `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "I will."
2. **"Coordinate your assessment with Justice and Intelligence."** `[flag: seen_defense_briefing = true]`
   ↳ He nods.
   ↳ > **Aldric Voss:** "I'll arrange a meeting with their offices."
3. **"We should consider the whole situation in Ibira before committing funds."** `[flag: seen_defense_briefing = true]`
   ↳ > **Aldric Voss:** "Certainly. I'll make sure you have the relevant figures."

→ END
