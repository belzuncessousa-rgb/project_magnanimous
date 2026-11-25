---
id: p3-strawberry
chapter: 3
turn: 1
title: Strawberry
kind: conditional
location: atiaiaba
token: education
portraits: [works, kaval]
background: factory-floor
---

⚙️ Light theme (economy / education, Tekoku arc in the GDD): Strawberry, the national electronics company, lobbies for protection against foreign phones. First appearance of the "Strawberry competition" thread.

## opening

Martin Works, chief executive of Strawberry, invites you to the company's main factory in Atiaiaba. Kunasai's largest electronics company employs eleven thousand people here. Works is in his fifties, a former engineer, and a Capital Party donor. Helena Kaval comes with you.

> **Martin Works:** "Thank you for coming, Madam President. I'll be direct. Arennian and Zharani phones are sold here below their cost, to take the market. If that continues, in three years we'll be assembling their phones instead of making ours."

> **Martin Works:** "I'm asking for two things. A higher import tax on foreign phones for five years. And more engineering graduates, which Minister Kaval can explain better than I can."

→ questions

## questions

1. **"How many jobs depend on Strawberry?"** `[once]` `→ questions`
   ↳ > **Martin Works:** "Eleven thousand here, and about thirty thousand at suppliers across Tekoku and Ibicuí."
2. **"Helena, what do you think?"** `[once]` `→ questions`
   ↳ > **Helena Kaval:** "A tariff protects the factory. Graduates and research make it competitive. Without the second, the first only buys time."
3. **"What would the Federation and Zharan say?"** `[once]` `→ questions`
   ↳ > **Martin Works:** "They'd complain. They protect their own companies; they just call it something else."
4. **"Here's my answer."** `→ decide`

## decide

1. **"A five-year import tax on foreign phones."** `[tax trade +1%]` `[approval +3 @ tekoku]` `[federation relation -1]` `[zharan relation -1]` `[works loyalty +3]` `[+1 IDEN]` `[+1 ECON]` `[flag: strawberry_protected = true]`
   ↳ > **Martin Works:** "Thank you. We'll use the time well."
2. **"No tariff. A research partnership with the universities instead."** `[show if: flag.initiative.higher_ed]` `[works loyalty +1]` `[kaval loyalty +2]` `[approval +1 @ tekoku]` `[flag: strawberry_research = true]`
   ↳ > **Martin Works:** "It's slower. It may also be better. I'll send my people to Minister Kaval."
3. **"The market stays open. Strawberry will have to compete."** `[-1 ECON]` `[federation relation +1]` `[zharan relation +1]` `[works loyalty -3]` `[approval -2 @ tekoku]` `[flag: strawberry_open = true]`
   ↳ > **Martin Works:** "Then I'll start planning for a smaller company."

## close

1. **Leave the factory** `[flag: seen_strawberry = true]`

→ END
