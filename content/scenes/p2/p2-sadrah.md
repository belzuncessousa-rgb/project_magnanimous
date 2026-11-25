---
id: p2-sadrah
chapter: 2
turn: 2
title: The Zharani Envoy
kind: conditional
location: katanai
token: foreign
portraits: [sadrah, aroun]
background: port-office
---

⚙️ First foreign contact with Zharan (DECISIONS: Zharan envoy — investment in the chosen project). Zharan is a patient state superpower. Sadrah offers financing with conditions; accepting angers the Federation.

## opening

The Zharani special envoy, Nima Sadrah, asked to meet you in Katanaí rather than in the capital. The meeting is in the port administration building, in a room overlooking the container terminals. Sadrah is in his fifties, softly spoken, in a plain dark suit. He has visited Kunasai many times over twenty years. Celeste Aroun is with you.

> **Nima Sadrah:** "Thank you, Madam President. I asked to meet here because ports are what my country understands best. Premier Kasrai sends his respect."

> **Nima Sadrah:** "Zharan would like to help finance your great project. Long loans, low interest, payment over twenty years. Our companies can also build, if you wish."

→ offer

## offer

1. **Hear the conditions** `[show if: flag.great_project == 1]` `→ offer-mine`
2. **Hear the conditions** `[show if: !(flag.great_project == 1)]` `→ offer-port`

## offer-mine

> **Nima Sadrah:** "For the Tauá mine, we would ask for a contract to buy a fixed share of the ore for fifteen years, at a fair price. And for our company to build the river port that serves it."

→ questions

## offer-port

> **Nima Sadrah:** "In return, we would ask for a concession to operate one new container terminal here in Katanaí, for twenty-five years. Nothing more."

→ questions

## questions

1. **"What would the Federation say?"** `[once]` `→ questions`
   ↳ > **Celeste Aroun:** "Ambassador Pryce would say it to the newspapers, probably the same day."
   ↳ > **Nima Sadrah:** "The Federation also asks for things. It simply asks for them through the Fund."
2. **"What interest rate?"** `[once]` `→ questions`
   ↳ > **Nima Sadrah:** "About half of what the Fund charges you today. Fontes has the figures. I sent them to him last week."
3. **"What if we can't repay?"** `[once]` `→ questions`
   ↳ > **Nima Sadrah:** "Then we talk. We are patient. Our agreements are long."
   ↳ > **Celeste Aroun:** "In other countries, 'we talk' has meant a longer concession."
4. **"Here is our answer."** `→ answer`

## answer

1. **"We accept in principle. Prepare a memorandum."** `[gain: 20 FC]` `[zharan relation +3]` `[federation relation -2]` `[-1 IDEN]` `[flag: zharan_financing = true]`
   ↳ > **Nima Sadrah:** "Thank you. The memorandum will be with Minister Aroun this week."
   ↳ `[if: flag.contractor == 2]` > **Celeste Aroun:** "We'll have to explain this to Halvard Minerals, and to Ambassador Pryce."
2. **"We'll study it. No commitments yet."** `[zharan relation +1]` `[aroun loyalty +1]` `[flag: zharan_financing_studied = true]`
   ↳ > **Nima Sadrah:** "Of course. We are in no hurry."
3. **"Thank you, but Kunasai will finance this itself."** `[zharan relation -1]` `[+1 IDEN]` `[nf opinion +1]` `[fontes loyalty -1]`
   ↳ > **Nima Sadrah:** "I understand. The offer remains open. Offers from Zharan usually do."

## close

1. **Walk him to his car** `[flag: seen_sadrah = true]`

→ END
