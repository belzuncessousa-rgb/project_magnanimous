---
id: p2-budget
chapter: 2
turn: 1
title: The Budget
kind: fixed
location: capital
token: treasury
order: 2
when: "flag.seen_fund_mission"
portraits: [livia, fontes, dara]
background: blue-room
---

⚙️ The first budget (CABINET-NOTION / GDD Ministries & Cabinet). Livia conducts, Fontes explains the money. `[open: budget]` opens the budget screen (tiers per ministry from content/ministries.json). Afterwards: the Judicial Strengthening target (if funded), the debt decision (DECISIONS: pay principal / borrow more from the Fund / status quo), reactions.
⚙️ Debt (engine, src/core/turn.ts debtService): the debt is a balance in FC; every turn a fixed % of the balance is paid as interest (TUNING.debt.interestRatePerTurn). debt_policy 1 = also pay principal each turn (balance falls → next interest falls); 2 = the balance grows by the amount borrowed (amounts chosen on the [open: debt] screen); 3 = interest only.

## opening

The Blue Room again. Livia has put a single sheet in front of each minister: the total requests of all ministries, and below it, a smaller number.

> **Livia Harvan:** "Madam President, this meeting sets the budget for the rest of the year. Each ministry has a set of programmes. For each one you choose a level: cut, low, regular, and for some, high. Each level costs money every month. Alexander will explain what we have."

> **Alexander Fontes:** "After salaries, pensions and interest, what's left for programmes is about three units a month, plus what we've kept. The requests on your sheet add up to almost five. So something has to be smaller than its minister would like."

> **Alexander Fontes:** "At the end, there's also the debt. I'll come to that."

→ questions

## questions

1. **"What happens if I cut a ministry completely?"** `[once]` `→ questions`
   ↳ > **Livia Harvan:** "Its programmes stop, and its minister will be unhappy every month it stays cut. Some cuts have other consequences. Cutting Planning stops the great project. Cutting Health stops the transfers."
2. **"Which requests are fixed?"** `[once]` `→ questions`
   ↳ > **Alexander Fontes:** "None, legally. Politically, the transfers in Mognagna and the great project you announced in January are the hardest to touch."
3. **"Can we change this later?"** `[once]` `→ questions`
   ↳ > **Livia Harvan:** "There will be a review at mid-term, with the next debt meeting. Until then, this is the budget."
4. **"Let's go through it."** `→ screen`

## screen

1. **Open the budget** `[open: budget]`

## judicial

⚙️ Judicial Strengthening needs a target (ministries.json note). Only asked if it was funded.

1. **"Renata's courts should go after the cartels."** `[show if: flag.initiative.judicial]` `[flag: judicial_target = 1]` `[cartels suspicion +5]` `[salgado loyalty +1]`
   ↳ > **Livia Harvan:** "I'll tell her. She'll start with Ibira."
2. **"Renata's courts should go after the big landowners."** `[show if: flag.initiative.judicial]` `[flag: judicial_target = 2]` `[cp opinion -2]` `[fff opinion -1]` `[landless opinion +2]`
   ↳ > **Livia Harvan:** "The Tapira deputies will hear about it by tonight."
3. **Continue** `[show if: !flag.initiative.judicial]`

## reactions

⚙️ Reactions to the budget, one line each where relevant.

1. **Hear the ministers' reactions**
   ↳ `[if: flag.transfers_cut]` > **Owin Dara:** "You've cut the transfers. I'll have to explain that in Sugar Bay. I'll tell them it was your decision."
   ↳ `[if: flag.transfers_cut && flag.promised_no_hunger]` *You told the radio in Sugar Bay that nobody would go hungry. Dara has not forgotten. Neither has the radio.*
   ↳ `[if: flag.initiative.transfers]` > **Owin Dara:** "The transfers continue. Thank you, Madam President."
   ↳ `[if: flag.project_paused]` > **Livia Harvan:** "With Planning cut, the great project stops. Tobias will want to see you."
   ↳ `[if: flag.initiative.anticorruption]` > **Livia Harvan:** "The anti-corruption department will be noticed in Congress. Pelan Avros has already asked me what it's for."
   ↳ `[if: flag.initiative.labor_compact]` > **Livia Harvan:** "Renata will open talks with the unions next month."
   ↳ `[if: flag.intelligence_cut]` > **Livia Harvan:** "Darian asked me to tell you he has 'noted the decision'."
   ↳ > **Alexander Fontes:** "Now the debt."

## debt | The Debt

> **Alexander Fontes:** "Three options, as I said in January. First: start paying back the principal. It costs us money every month for years, and the Fund and the markets will trust us more. Second: borrow more from the Fund. We'd have more money now, with conditions attached, and a larger debt later. Third: continue as we are. Nothing changes this year."

> **Alexander Fontes:** "The Fund is the only lender available to us at the moment. Other options might exist in a few years, depending on how things go."

1. **"We start paying back the principal."** `[flag: debt_policy = 1]` `[federation relation +1]` `[fontes loyalty +2]` `[-1 WELF]` `[open: debt]`
   ↳ > **Alexander Fontes:** "Good. It will be tight. But in four years the interest will be smaller, and that matters more than anything else on this sheet."
2. **"We borrow more, and accept the conditions."** `[flag: debt_policy = 2]` `[federation relation +1]` `[fontes loyalty -2]` `[-1 IDEN]` `[-1 ECON]` `[open: debt]`
   ↳ > **Alexander Fontes:** "I'll prepare the agreement. The conditions will include a spending ceiling and the sale of at least one state company. You'll be asked which one."
   ↳ `[if: flag.no_more_fund]` > **Alexander Fontes:** "You told me in January you didn't want this. I noted it. I'll note this too."
3. **"We continue as we are for now."** `[flag: debt_policy = 3]` `[fontes loyalty -1]`
   ↳ > **Alexander Fontes:** "Then we'll have this conversation again at mid-term, with the same numbers or worse."

## close

> **Livia Harvan:** "Thank you. The budget goes to Congress for approval next week. Mertens says it will pass. Budgets usually do."

1. **End the meeting** `[flag: seen_budget = true]`
   ↳ `[if: flag.debt_policy == 2]` *More money now. The next government, or the next term, can deal with the rest.*

→ END
