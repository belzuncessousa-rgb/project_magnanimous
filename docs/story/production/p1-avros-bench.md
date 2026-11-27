---
id: p1-avros-bench
chapter: 1
turn: 3
title: The Bench
kind: conditional
location: capital
token: congress
portraits: [avros]
background: congress-office
---

⚙️ Staged rewrite. Preserve amendment flags 1 transparent, 2 opaque/discretionary, 3 decline, 4 defer; implementation and actual costs deferred. Do not presume allegations prove guilt. Corvel and Lessa callbacks require appropriate prior flags/publicity; confidential stance not treated as known to Avros. Party support is not bought automatically.

## office

Pelan Avros meets you outside his office in Congress. He greets you with a broad smile and introduces you to two deputies who have been waiting with him.

> **Pelan Avros:** "These two have come all the way from Mognagna for a committee meeting. I thought they'd enjoy saying hello."

One of them thanks you for your work during the campaign. Avros asks them to give you a few minutes alone, and they leave.

→ bench

His office contains photographs from years of party conferences and campaigns. In one of them, former President Tercilio Luz is opening a hospital, with a much younger Avros standing among the people behind him.

> **Pelan Avros:** "That was a good day. The old hospital was in such a state that they were treating patients in the courtyard."

He pulls a chair towards you.

> **Pelan Avros:** "Well. Let's talk about our deputies."

## bench

> **Pelan Avros:** "We have twenty-four. A number of them have been asking me when the government will restore their district investment funds."

He opens a folder containing a list of requests.

> **Pelan Avros:** "Under the previous arrangements, deputies could propose small projects in their constituencies for the federal budget. Health posts, bridges, school repairs. The last government froze most of the funds."

He slides the list towards you.

> **Pelan Avros:** "They would like to know whether they'll be able to include these projects again."

→ questions

## questions

1. **"How much would restoring the funds cost?"** `[once]` `→ costs`
2. **"Would the other parties receive funds as well?"** `[once]` `→ others`
3. **"What safeguards are there against misuse?"** `[once]` `→ safeguards`
4. **"Would the deputies support us on the budget in return?"** `[once]` `→ support`
5. **"Let's decide how to proceed."** `→ decision`

## costs

> **Pelan Avros:** "We can set the overall allocation when we prepare the budget. The individual requests are often quite small compared with a national project."

1. **"Then we should assess them against the other spending proposals."**
   ↳ He nods, although he keeps his hand on the folder.
   ↳ > **Pelan Avros:** "Of course. My people would appreciate knowing there'll be something to assess."
2. **"I see."**

→ questions

## others

> **Pelan Avros:** "Every deputy would have the opportunity to submit proposals. That is one reason the system has always been popular in Congress."

> **Pelan Avros:** "Caio's people have been asking about it as well."

→ questions

## safeguards

Avros looks down at the list.

> **Pelan Avros:** "The projects go through the relevant departments. There have been problems in the past, as there have been with other kinds of spending."

1. **"Could we publish the allocations and the recipients?"**
   ↳ > **Pelan Avros:** "I don't think most of our deputies would object to the people in their districts seeing what they'd obtained for them."
   ↳ He pauses.
   ↳ > **Pelan Avros:** "The details may be a little more complicated for some of the existing arrangements."
2. **"We should ensure the projects are properly assessed."**
   ↳ > **Pelan Avros:** "Certainly. I'd just ask that the process doesn't take the entire term."
3. **"Understood."**

→ questions

## support

> **Pelan Avros:** "It would help me considerably. Some deputies are being asked to support decisions that may be unpopular at home. They would like to show their voters that the government is also doing something for their communities."

1. **"I want them to support worthwhile legislation on its merits."**
   ↳ Avros smiles.
   ↳ > **Pelan Avros:** "So do I. I also want them to be reelected."
2. **"We should agree on the details before promising anything."**
   ↳ > **Pelan Avros:** "All right. We can discuss the budget when Alexander has the figures."
3. **"That's clear."**

→ questions

## decision

> **Pelan Avros:** "Can I tell the deputies that we intend to restore the programme?"

1. **"Yes, with published allocations and proper oversight."** `[flag: amendments = 1]`
   ↳ > **Pelan Avros:** "I'll let them know. We'll have to agree with the departments on how the requests are processed."
2. **"Yes. Let the deputies negotiate their allocations privately."** `[flag: amendments = 2]`
   ↳ Avros's expression brightens.
   ↳ > **Pelan Avros:** "That will be very welcome. I'll make sure they know the government is willing to work with them."
3. **"No. We'll prioritize the national investment programme."** `[flag: amendments = 3]`
   ↳ He folds the list slowly.
   ↳ > **Pelan Avros:** "That's going to be difficult for some of my people. I hope we can find other projects that will benefit their constituencies."
4. **"We'll decide when the budget is ready."** `[flag: amendments = 4]`
   ↳ > **Pelan Avros:** "All right. I'll bring it up again when we meet about the budget."

## representation

Avros puts the folder aside.

> **Pelan Avros:** "And what are we going to do about Senator Lessa?"

1. **"What does the bench think of her proposal?"**
   ↳ `[if: flag.reform_stance_public && flag.reform_stance == 1]` > **Pelan Avros:** "Some of my deputies heard that you're open to a change. The ones from Mognagna and Ibira would like to know what that means for them."
   ↳ `[if: flag.reform_stance_public && flag.reform_stance == 2]` > **Pelan Avros:** "The deputies from the smaller states appreciated your reservations. They would still like to see the details."
   ↳ `[if: flag.reform_stance_public && flag.reform_stance == 3]` > **Pelan Avros:** "They were pleased to hear you don't intend to pursue it now. A few from Ibicuí are less pleased."
   ↳ `[if: flag.reform_stance_public && flag.reform_stance == 4]` > **Pelan Avros:** "Decentralization will interest the governors. Our deputies will want to understand what happens to federal transfers."
   ↳ `[if: !flag.reform_stance_public]` > **Pelan Avros:** "The smaller states are concerned about losing their influence in the Senate. Our deputies from Ibicuí have a rather different view."
2. **"I asked her to explore decentralization."** `[show if: flag.decentralisation_seed]`
   ↳ > **Pelan Avros:** "That could be interesting. We'd want some guarantees about the way money is distributed."
3. **"We'll have a separate discussion with the bench when there's a proposal."**
   ↳ > **Pelan Avros:** "I'd appreciate that."

## corvel

He leans back in his chair.

> **Pelan Avros:** "There's one last matter. I understand that the Treasury is reviewing some of the contracts for the old sanitation works."

He looks towards the photograph of Luz.

> **Pelan Avros:** "A lot of people in our party worked on that programme. Some of the neighbourhoods where it was completed benefited enormously."

> **Pelan Avros:** "I hope the government will keep that in mind when it decides how to proceed."

1. **"The benefits don't exempt the contracts from scrutiny."**
   ↳ His smile disappears.
   ↳ > **Pelan Avros:** "I understand. I would just ask that people distinguish between the problems with the contracts and the value of the programme."
2. **"I asked Renata to review the contract."** `[show if: flag.corvel_to_salgado]`
   ↳ Avros looks at you.
   ↳ > **Pelan Avros:** "I see. I hope she'll have the complete records available."
3. **"I don't intend to pursue the old contracts politically."** `[flag: shielded_avros = true]`
   ↳ He appears relieved.
   ↳ > **Pelan Avros:** "I'm glad to hear it."
4. **"I would like the facts established before we discuss the matter."**
   ↳ > **Pelan Avros:** "Fair enough."
5. **"If the contracts involve you, Pelan, you should seek independent legal advice."** `[show if: flag.avros_envelope == 1 || flag.avros_envelope == 2 || flag.avros_envelope == 3]` `[flag: warned_avros = true]`
   ↳ Avros looks at you for a moment without speaking.
   ↳ > **Pelan Avros:** "Is there something you want to ask me, Lara?"
   ↳ > "I think I've made myself clear."
   ↳ He nods slowly.

## close

Avros accompanies you to the door. The two deputies are still in the corridor, talking with an assistant.

> **Pelan Avros:** "We'll speak again about the budget."

1. **Return to the palace.** `[flag: seen_avros_bench = true]`

→ END
