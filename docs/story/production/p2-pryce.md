---
id: p2-pryce
chapter: 2
turn: 1
title: The Arennian Ambassador
kind: conditional
location: capital
token: foreign
portraits: [pryce, aroun]
background: president-office
---

⚙️ Staged rewrite. Federation's political, commercial and strategic priorities coexist. Diplomacy tone does not automatically establish a binding agreement or become public. Preserve pryce_tone and seen_pryce. Conditional callbacks use actual public speech and project flags. Proposed integration key `pryce_financing_project` captures the selected `great_project` value only when Lara asks an interested company to submit terms. A diplomatic expression of interest is not an offer. Exact relationship effects and concessions are deferred.

## arrival

Ambassador Lionel Pryce arrives with a member of his staff and a large book wrapped in blue paper.

> **Lionel Pryce:** "A small gift from President Ashby. Photographs of our national parks. He was rather involved in the selection."

He smiles as he hands you the book. Celeste Aroun is seated beside you.

> **Lionel Pryce:** "He asked me to convey his congratulations personally. We followed your election with considerable interest."

A member of the palace staff brings coffee. Pryce thanks her in fluent Kunasaian.

> **Celeste Aroun:** "Ambassador Pryce and I have already discussed several matters our governments may want to address."

→ discussion

> **Lionel Pryce:** "Indeed. I hope we can establish a productive relationship with your administration."

## discussion

Pryce takes a thin document from his assistant.

> **Lionel Pryce:** "There are opportunities for closer trade and investment between our countries. Our companies have capabilities that could be useful in several areas of your economy."

> **Lionel Pryce:** "At the Fund, my government is interested in seeing Kunasai establish a stable financial position. We would be pleased to support an appropriate programme."

Aroun looks at him.

> **Celeste Aroun:** "What would your government consider appropriate?"

> **Lionel Pryce:** "A credible approach to the public finances, naturally. More broadly, we would like to know how your government intends to develop its relationships with the major economies."

He turns towards you.

> **Lionel Pryce:** "There has been considerable interest in some of the investments being discussed in Kunasai."

→ questions

## questions

1. **"What support could the Federation offer at the Fund?"** `[once]` `→ fund`
2. **"Which investments are your companies interested in?"** `[once]` `→ investment`
3. **"Would working with Zharan affect our relationship?"** `[once]` `→ zharan`
4. **"Could we discuss improved trade access?"** `[once]` `→ trade`
5. **"What does your government expect politically?"** `[once]` `→ politics`
6. **"I'd like to explain our position."** `→ answer`

## fund

> **Lionel Pryce:** "Our representatives can support proposals that they consider financially sound. In some circumstances, that might help achieve a more favourable repayment schedule or other terms."

1. **"Would that support depend on other agreements between us?"**
   ↳ Pryce considers his answer.
   ↳ > **Lionel Pryce:** "Our government evaluates its relationships as a whole. I would not want to suggest that a decision by the Fund could be guaranteed in exchange for a particular commercial agreement."
   ↳ > **Celeste Aroun:** "Then we should discuss those matters separately."
2. **"Thank you for explaining."**

→ questions

## investment

> **Lionel Pryce:** "Minerals, energy, infrastructure, advanced manufacturing. Our firms have expressed particular interest in Ibira's resources."

1. **"We've selected rare-earth development as a priority."** `[show if: flag.great_project == 1]`
   ↳ > **Lionel Pryce:** "Yes. Our embassy has received several inquiries from companies since the announcement. I would be pleased to facilitate discussions."
2. **"Ask an interested company to submit terms for our selected project."** `[show if: flag.great_project]`
   ↳ > **Lionel Pryce:** "I can ask an interested company and its financing partner to prepare a proposal for the project you selected. They would need to show you the full cost, repayment schedule, procurement terms and any commercial rights they request."
   ↳ > **Celeste Aroun:** "Treasury can compare it with the domestic estimate. A request for terms would not commit the government to borrow or award the work."
   ↳ Record the requested project and submit it for independent review. The company may decline, return an incomplete proposal, or provide terms. Only a complete offer with an authorized lender, identified scope, repayment and rights can reach [The pages the bank will sign](TERM-DIPLOMACY.md#the-pages-the-bank-will-sign). A firm's interest alone creates no offer.
3. **"Would your companies work with domestic partners?"**
   ↳ > **Lionel Pryce:** "Many would. The terms would depend on the investment and the degree of control required to justify the capital involved."
4. **"We will consider the proposals on their merits."**

→ questions

## zharan

Pryce sets down his cup.

> **Lionel Pryce:** "We understand that your government will maintain relationships with a number of countries. Our concern is with arrangements that could give another government excessive control over infrastructure or strategically important supplies."

> **Celeste Aroun:** "We would apply that concern to arrangements with any country."

He gives her a small smile.

> **Lionel Pryce:** "Quite."

1. **"We intend to retain the freedom to work with both of you."**
   ↳ > **Lionel Pryce:** "I will convey that position. There are certain decisions, particularly involving sensitive technologies, that my government would view with concern."
2. **"What sort of restrictions would you expect us to accept?"**
   ↳ > **Lionel Pryce:** "It would depend on the sector. We can discuss specific concerns when proposals arise."
3. **"We'll consider the implications of each agreement."**

→ questions

## trade

> **Lionel Pryce:** "There are opportunities. Certain preferences for Arvane are due to be reviewed by our Congress. Your agricultural producers are particularly interested in them, I understand."

> **Celeste Aroun:** "So are ours in the manufacturing sector. We would like a broader discussion of market access."

Pryce nods.

> **Lionel Pryce:** "We can arrange a meeting between the relevant officials. I cannot speak on behalf of Congress, of course."

→ questions

## politics

> **Lionel Pryce:** "My government places considerable importance on democratic institutions and the security of the region. We would welcome a Kunasai that plays a constructive role in both respects."

1. **"What does that mean in practice?"**
   ↳ > **Lionel Pryce:** "Cooperation on regional issues, reliable agreements, and a government with which our institutions can maintain a predictable relationship."
2. **"Our institutions are a matter for Kunasai."**
   ↳ > **Lionel Pryce:** "Naturally. We also have to explain our international relationships to our own public."
3. **"I understand."**

→ questions

## answer

> **Lionel Pryce:** "I hope we can establish some areas in which our governments can work together. What would you like me to convey to President Ashby?"

1. **"We value the Federation as a partner and welcome closer cooperation."** `[flag: pryce_tone = 1]`
   ↳ He smiles.
   ↳ > **Lionel Pryce:** "I will be pleased to convey that."
2. **"Kunasai will determine its own priorities and choose its partners accordingly."** `[flag: pryce_tone = 2]`
   ↳ He inclines his head.
   ↳ > **Lionel Pryce:** "Of course. I hope we will find that many of our interests coincide."
3. **"We welcome proposals from all our partners. We will assess the terms."** `[flag: pryce_tone = 3]`
   ↳ > **Lionel Pryce:** "Then I will make sure our government knows it has an opportunity to present them."
4. **"As I said in my address, our sovereignty is a priority."** `[show if: flag.address_iden == 1]` `[flag: pryce_tone = 2]`
   ↳ Pryce nods.
   ↳ > **Lionel Pryce:** "We took note of that part of your speech. I would expect us to discuss its practical implications as our relationship develops."

## close

After the ambassador leaves, Aroun examines the inscription inside the book.

> **Celeste Aroun:** "It's a very nice edition. I'll ask our embassy whether we've sent the President something comparable."

She closes the cover.

> **Celeste Aroun:** "I'll arrange for his government's proposals to come through the relevant ministries. We should see how they look once there are actual terms attached."

1. **"Please do."** `[flag: seen_pryce = true]`
2. **"I'd like a briefing on our existing trade arrangements as well."** `[flag: seen_pryce = true]`
   ↳ > **Celeste Aroun:** "I'll have one prepared."

→ END
