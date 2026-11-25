---
id: p3-tax-reform
chapter: 3
turn: 1
title: Tax Reform
kind: fixed
location: capital
token: treasury
order: 1
portraits: [fontes, mertens, livia]
background: treasury-office
---

⚙️ Chapter 3 opens with the Treasury's tax reform discussion (GDD Treasury standing theme: start of chapter 3, through Congress). Fontes explains, Mertens counts. `tax_direction` 1 progressive / 2 lower and simpler / 3 modest / 0 none. If a direction is chosen, `[vote: tax_reform]`; the tax change only applies if it passes (watered = half).

## opening

It is September. The first year's accounts are almost closed. Fontes asks for a meeting at the Treasury with Mertens and Livia.

> **Alexander Fontes:** "Madam President, I said in January that we'd discuss taxes this autumn. Here is the situation. Revenue this year is slightly below the forecast. The economy grew a little, not much. Interest on the debt is still about a ninth of what we collect."

> **Alexander Fontes:** "A tax reform has to go through Congress. Caio will tell you how hard that is. There are three directions it could take."

> **Alexander Fontes:** "One: raise taxes on high incomes, large estates and inheritances. More revenue, and the burden falls on those who can pay. The Capital Party and business will fight it. Two: lower and simplify taxes, especially for companies. Less revenue at first, more investment later, if it works. Your own party will dislike it. Three: a modest change: close the loopholes everyone knows about, small adjustments. Less revenue gained, less resistance."

> **Caio Mertens:** "Or no reform this year. Congress is tired, and so are we."

→ questions

## questions

1. **"How much would each one bring in?"** `[once]` `→ questions`
   ↳ > **Alexander Fontes:** "The first, a lot, once collection works, which takes a year. The second loses money for two or three years. The third brings in a little, quickly."
2. **"Who votes for what, Caio?"** `[once]` `→ questions`
   ↳ > **Caio Mertens:** "The first: your party and the Communist Vanguard, and nobody else willingly. The second: the Capital Party and the Faith and Family Front; your party against. The third could get a majority with some work. The OPP votes for whatever is paid for."
3. **"What does the Fund think?"** `[once]` `→ questions`
   ↳ > **Alexander Fontes:** "The Fund likes the second direction and the third. It would accept the first if the money goes to the debt."
4. **"Here's what we'll propose."** `→ decide`

## decide

1. **"Higher taxes on high incomes, estates and inheritances."** `[flag: tax_direction = 1]` `[+2 ECON]` `[+1 WELF]` `[cp opinion -2]` `[business opinion -2]` `[cv opinion +1]` `→ vote`
2. **"Lower and simpler taxes, especially for companies."** `[flag: tax_direction = 2]` `[-2 ECON]` `[-1 WELF]` `[cp opinion +2]` `[business opinion +2]` `[pm opinion -1]` `[cv opinion -2]` `→ vote`
3. **"A modest reform: close the loopholes."** `[flag: tax_direction = 3]` `[fontes loyalty +1]` `→ vote`
4. **"No reform this year."** `[flag: tax_direction = 0]` `[fontes loyalty -1]` `→ close`

## vote

> **Caio Mertens:** "Then I'll take it to Congress. Let's see the count."

1. **Go through the count** `[vote: tax_reform]` `→ result`

## result | The Result

1. **The reform passes** `[show if: flag.vote.tax_reform == 'passed']` `→ applied`
2. **It passes with amendments** `[show if: flag.vote.tax_reform == 'watered']` `→ applied-half`
3. **It fails** `[show if: flag.vote.tax_reform == 'failed']` `[fontes loyalty -1]` `[flag: tax_failed = true]` `→ close`
   ↳ > **Caio Mertens:** "It failed. We can try again next year with a different version."

## applied

1. **Read Fontes's note on what changes** `[show if: flag.tax_direction == 1]` `[tax domestic +3%]` `[approval -2 @ tekoku, ibicui]` `[approval +2 @ mognagna, ibira]` `[flag: tax_reformed = 1]` `→ close`
   ↳ > **Alexander Fontes:** "It will take a year to collect properly. After that, we'll have room we haven't had since the loan."
2. **Read Fontes's note on what changes** `[show if: flag.tax_direction == 2]` `[tax domestic -3%]` `[tax trade -2%]` `[federation relation +1]` `[flag: tax_reformed = 2]` `→ close`
   ↳ > **Alexander Fontes:** "Revenue will fall before it rises. I'll need you to hold the budget steady."
3. **Read Fontes's note on what changes** `[show if: flag.tax_direction == 3]` `[tax domestic +1%]` `[flag: tax_reformed = 3]` `→ close`
   ↳ > **Alexander Fontes:** "Modest, as promised. It helps."

## applied-half

1. **Read Fontes's note on what changes** `[show if: flag.tax_direction == 1]` `[tax domestic +1.5%]` `[flag: tax_reformed = 1]` `→ close`
   ↳ > **Alexander Fontes:** "Half of what we asked for. Still more than we had."
2. **Read Fontes's note on what changes** `[show if: flag.tax_direction == 2]` `[tax domestic -1.5%]` `[flag: tax_reformed = 2]` `→ close`
   ↳ > **Alexander Fontes:** "A smaller cut. Easier for the budget, less useful for business."
3. **Read Fontes's note on what changes** `[show if: flag.tax_direction == 3]` `[tax domestic +0.5%]` `[flag: tax_reformed = 3]` `→ close`
   ↳ > **Alexander Fontes:** "Even more modest. It's something."

## close

1. **End the meeting** `[flag: seen_tax_reform = true]`

→ END
