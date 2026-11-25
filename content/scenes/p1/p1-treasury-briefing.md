---
id: p1-treasury-briefing
chapter: 1
turn: 2
title: The Debt
kind: briefing
location: capital
token: treasury
portraits: [fontes]
background: treasury-office
---

⚙️ The in-depth debt meeting Fontes asked for in the Blue Room. He explains: the debt to the Fund and its interest (~11% of revenue), unpaid bills left by the previous government, and the Corvel contract behind Luz's unfinished sanitation works. NO debt decision (that is chapter 2). Decided here: how the news is handled and what happens to the Corvel file. Optional follow-up questions are informational.

## opening

The Ministry of the Treasury is a grey office tower near the palace. Fontes' office is on the ninth floor. There are files on every chair except one, which he has cleared for you.

> **Alexander Fontes:** "Thank you for coming, Madam President. I'll go through three things: the debt itself, the bills the last government didn't pay, and one contract. Then you can ask me whatever you like."

> **Alexander Fontes:** "First, the debt. All of it is owed to the Fund, the international lender. Most of it comes from a large loan taken eight years ago, under President Luz, to pay for the Great Sanitation Works. Since then it has been refinanced twice. Today the interest alone takes about eleven percent of everything the state collects in taxes. That's before we pay a single salary."

> **Alexander Fontes:** "Second, the bills. In its last eight months, the previous government stopped paying many of its suppliers and builders, and didn't record the bills in the accounts. We found them last week. It isn't a catastrophe, but it means we have less money this year than the campaign assumed."

> **Alexander Fontes:** "Third, the contract. The sanitation works were never cancelled, only paused. The builder, a consortium called Corvel, still has a valid contract. Its prices were very high. Whoever finishes the works has to pay those prices, renegotiate them, or go to court."

→ questions

## questions

⚙️ Optional follow-ups (information only).

1. **"Who else knows all this?"** `[once]` `→ questions`
   ↳ > **Alexander Fontes:** "The Fund knows the size of the debt; it's in their reports. The unpaid bills, only the last Treasury minister and my staff. The details of the Corvel contract, probably only me. They're in the annexes, and few people read those."
2. **"How bad are Corvel's prices?"** `[once]` `→ questions`
   ↳ > **Alexander Fontes:** "Annex nine lists the unit prices. A metre of sewer pipe was priced at about what a metre of railway costs. I'd estimate the works were overpriced by about forty percent."
3. **"What does the Fund expect from us?"** `[once]` `→ questions`
   ↳ > **Alexander Fontes:** "The Fund sends a review mission in March. They'll ask whether we intend to start paying back the principal, borrow more, or continue as we are. We'll have to decide that with the budget."
4. **"I understand. Let's talk about what we do now."** `→ telling`

## telling

> **Alexander Fontes:** "The first thing I can't decide for you: who do we tell about the unpaid bills and the real size of the problem, and how?"

1. **"The public. This week, in plain language."** `[fontes loyalty +2]` `[flag: hole_public = true]` `[approval -3 @ all]` `[media opinion +1]` `[flag: path_hold += 1]`
   ↳ > **Alexander Fontes:** "Good. The markets will be unhappy for a few days. After that they'll trust our figures more."
2. **"Nobody, until we have a plan to present with it."** `[fontes loyalty -1]` `[flag: hole_quiet = true]` `[flag: voice += 1]`
   ↳ > **Alexander Fontes:** "I can keep it inside this building for a while. Not for long. The Fund already has most of the numbers, and journalists read the Fund's reports."
   ↳ *A few weeks, then the whole truth with a plan attached. That is better for everyone.*
3. **"Tell it, and make clear it was the last government's doing."** `[cp opinion -2]` `[approval +2 @ ibicui, mognagna]` `[fontes loyalty +1]` `[flag: hole_castelar = true]` `[flag: path_harden += 1]`
   ↳ > **Alexander Fontes:** "It's true, so I can say it. The Capital Party will remember that we said it."
4. **"That's an order, Alexander. Figure it out."** `[fontes loyalty -1]` `[flag: alexander_ordered = true]`
   ↳ He takes off his glasses and looks at you for a moment.
   ↳ > **Alexander Fontes:** "Very well, Madam President. I'll put that in the minutes, word for word."

⚙️ Option 4 is the hook for the achievement "That's an order from your commander — tell Alexander to figure it out" (flag alexander_ordered).

## corvel

He puts a thick binder on the desk. The label on the spine reads *Great Sanitation Works — Corvel — Annexes 1–14*.

> **Alexander Fontes:** "This is the Corvel contract. President Luz signed it. If you want to finish those works one day, this is what you'd be dealing with. What should I do with it?"

1. **"Send it to Renata Salgado at Justice."** `[salgado loyalty +1]` `[pm opinion -1]` `[flag: corvel_to_salgado = true]` `[flag: path_hold += 1]`
   ↳ > **Alexander Fontes:** "She'll look for who wrote those prices. Some of those people are still in your party. You should know that before you send it."
   ↳ > "Send it."
2. **"Keep it here for now. Nobody opens it until we've passed a budget."** `[flag: corvel_held = true]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ He puts the binder on the shelf behind his desk.
   ↳ *You need the PM's votes for the budget. After that, the contract can go wherever it has to go.*
3. **"Work out what it would cost to finish the works at fair prices."** `[fontes loyalty +1]` `[flag: corvel_costed = true]`
   ↳ > **Alexander Fontes:** "Less than you'd think. Half the pipes are already in the ground. If we could renegotiate the prices, it would be the cheapest of the large projects. I'll prepare the figures for Tobias."

## march

> **Alexander Fontes:** "Last thing. The Fund's mission arrives in March, led by a man called Anselm Royce. Before then I'll prepare the three options for you on paper: paying down the principal, borrowing more, or continuing as we are."

> "What would you do?"

> **Alexander Fontes:** "I'd pay back a little. It doesn't change much in the short term, but the Fund pays attention to it."

1. **"Prepare all three options. We'll decide with the budget."** `[flag: fontes_hole_known = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "You'll have them in February."
2. **"I don't want to borrow more. Note that."** `[fontes loyalty +1]` `[-1 WELF]` `[flag: fontes_hole_known = true]` `[flag: no_more_fund = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "Noted. I'll still prepare the option, so you can see what you're turning down."
3. **"I want room for a great project first. The Fund can wait."** `[fontes loyalty -2]` `[+1 ECON]` `[flag: fontes_hole_known = true]` `[flag: projects_first = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "The Fund doesn't usually wait. But I'll look for room."

→ END
