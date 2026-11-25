---
id: p2-fund-mission
chapter: 2
turn: 1
title: The Fund's Mission
kind: fixed
location: capital
token: treasury
order: 1
portraits: [royce, fontes]
background: treasury-office
---

⚙️ Chapter 2 opens. The Fund's review mission (Anselm Royce) meets Lara with Fontes before the budget. Informational, with pressure; one choice on the tone of the government's answer. The debt decision itself is in p2-budget.

## opening

It is March. The rains have started in most of the country, later than usual.

The Fund's review mission has spent a week at the Treasury. Its head, Anselm Royce, asks to see you before he leaves. He is an Arennian economist in his fifties, tall and courteous, who has led missions to a dozen countries. He comes to the palace with Fontes and two assistants who take notes throughout.

> **Anselm Royce:** "Thank you for receiving us, Madam President. I'll be brief. Your Treasury has been very open with us, and we appreciate it."

> **Anselm Royce:** "Our view is this. Kunasai can pay what it owes, but the interest takes a large part of your revenue, and that limits what your government can do. The Fund would like to see a plan: either to start reducing the debt, or, if you need more time, a new agreement with conditions."

> **Alexander Fontes:** "The conditions usually mean spending limits and some privatisations, Madam President."

→ questions

## questions

1. **"What conditions, exactly?"** `[once]` `→ questions`
   ↳ > **Anselm Royce:** "A ceiling on public spending, a review of the pension system, and the sale of some state companies. They are standard. Every country says its situation is different. Sometimes it is."
2. **"And if we simply continue as we are?"** `[once]` `→ questions`
   ↳ > **Anselm Royce:** "Then nothing happens this year. Next year the interest is the same, and our board will ask the same question with less patience."
3. **"Who decides at the Fund?"** `[once]` `→ questions`
   ↳ > **Anselm Royce:** "The board. The largest shareholders have the most votes. You know who they are."
   ↳ *The Arennian Federation holds the largest share of the Fund's votes.*
4. **"Thank you. I'll give you our position."** `→ answer`

## answer

1. **"We'll present a credible plan. Kunasai pays its debts."** `[federation relation +1]` `[fontes loyalty +1]` `[flag: fund_tone = 1]`
   ↳ > **Anselm Royce:** "That is what our board hopes to hear. I'll report it."
2. **"We'll decide what is good for Kunasai first. The Fund will be informed."** `[federation relation -1]` `[+1 IDEN]` `[flag: fund_tone = 2]`
   ↳ > **Anselm Royce:** "Of course. I'll report that too."
   ↳ Fontes keeps writing and does not look up.
3. **"We need easier terms. A longer schedule, without new conditions."** `[cost: 1 EPI]` `[flag: fund_tone = 3]` `[flag: fund_terms_eased = true]`
   ↳ > **Anselm Royce:** "I can recommend a longer schedule. I can't promise the board will agree. I'll try."

## close

After they leave, Fontes stays behind.

> **Alexander Fontes:** "The budget meeting is this afternoon. Livia has the ministries' requests. They add up to more than we have."

1. **"Then we'll choose."** `[flag: seen_fund_mission = true]`

→ END
