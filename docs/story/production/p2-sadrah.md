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

⚙️ Staged rewrite. Financing offers differ by selected project, prior procurement and diplomatic choices. Acceptance in principle is not disbursement; exact terms, amounts, concession, exclusivity and approvals require follow-up. Preserve zharan_financing_studied; replace premature zharan_financing with proposed zharan_financing_intent until signed. Proposed key `zharan_financing_project` captures the selected `great_project` value only when Lara asks the envoy to prepare financing terms. No automatic relation change with unobserved actions.

## arrival

Nima Sadrah has asked to meet you in Katanaí. From the conference room at the port administration building, you can see several container ships being unloaded.

The Zharani special envoy is standing beside the window when you arrive. He turns and greets you in Kunasaian, then introduces his interpreter and an official from his government's development bank.

> **Nima Sadrah:** "Thank you for coming here, Madam President. I last visited this port fifteen years ago. It has changed considerably."

Celeste Aroun is seated beside you.

> **Celeste Aroun:** "I understand your government has prepared some financing proposals."

> **Nima Sadrah:** "Yes. We have been following the investment plans announced by the President. We believe there are projects where our companies and institutions could offer useful terms."

→ offer

He opens a document in front of him.

## offer

1. **Review the mineral financing proposal.** `[show if: flag.great_project == 1]` `→ mine`
2. **Review the railway financing proposal.** `[show if: flag.great_project == 4]` `→ rail`
3. **Review the infrastructure financing proposal.** `[show if: flag.great_project == 6]` `→ sanitation`
4. **Review the general investment proposal.** `[show if: !(flag.great_project == 1 || flag.great_project == 4 || flag.great_project == 6)]` `→ general`

## mine

> **Nima Sadrah:** "For Ibira, our bank could consider financing some of the supporting infrastructure. Our industrial companies would be interested in a long-term agreement for a portion of the production."

> **Celeste Aroun:** "Would those arrangements be negotiated separately?"

> **Nima Sadrah:** "We would prefer to discuss them together. The expected production gives us a basis for assessing the financing."

→ questions

## rail

> **Nima Sadrah:** "Our companies have considerable experience delivering railway infrastructure. Our bank could consider financing parts of your proposed network, with procurement arrangements agreed as part of the package."

He indicates the port outside.

> **Nima Sadrah:** "There may also be opportunities to improve the connection between the railway and commercial terminals."

→ questions

## sanitation

> **Nima Sadrah:** "Our bank would consider a loan for the infrastructure programme. There are companies interested in supplying equipment and materials, if the existing contracts permit that."

> **Celeste Aroun:** "And what would your government seek in return?"

> **Nima Sadrah:** "A long-term commercial relationship. We are also interested in discussing investment in the port itself, although that would require a separate assessment."

→ questions

## general

> **Nima Sadrah:** "We would be interested in examining infrastructure and industrial investment opportunities with the relevant ministries. We can prepare specific proposals when we have more information about your priorities."

→ questions

## questions

1. **"How would your financing compare with the Fund's terms?"** `[once]` `→ terms`
2. **"Would we be required to use Zharani contractors?"** `[once]` `→ procurement`
3. **"What happens if the expected returns do not materialize?"** `[once]` `→ repayment`
4. **"Would your government expect exclusive commercial access?"** `[once]` `→ exclusive`
5. **"The Federation has also approached us."** `[show if: flag.seen_pryce]` `[once]` `→ federation`
6. **"Let's discuss how to proceed."** `→ answer`

## terms

> **Nima Sadrah:** "We would expect a longer repayment period than is available for many ordinary commercial loans. The precise rate and schedule depend on the project and the security of its revenues."

The development bank official hands Aroun a preliminary term sheet.

> **Celeste Aroun:** "Treasury will need to compare the entire arrangement, including any commitments concerning procurement or production."

Sadrah nods.

> **Nima Sadrah:** "Of course."

→ questions

## procurement

> **Nima Sadrah:** "Our companies would be interested in participating. In some arrangements, their participation would be part of the financing proposal."

1. **"Would you accept domestic participation and training requirements?"**
   ↳ > **Nima Sadrah:** "That can be discussed. We would need to agree on the responsibilities of the partners and how the additional costs would be treated."
2. **"We intend to assess procurement independently."**
   ↳ > **Nima Sadrah:** "Then our officials should explain which financing options would remain available under that approach."
3. **"Understood."**

→ questions

## repayment

> **Nima Sadrah:** "We would assess the risks before signing an agreement. If difficulties arose during its life, the institutions concerned would need to discuss the terms."

Aroun turns to the preliminary document.

> **Celeste Aroun:** "We would want the consequences of missed payments and any associated rights over the assets to be specified in advance."

> **Nima Sadrah:** "That is reasonable. We can include the relevant provisions in a full proposal."

→ questions

## exclusive

> **Nima Sadrah:** "We are interested in reliable access to the products and services involved in an agreement. We would not expect every commercial relationship to be exclusive."

1. **"We intend to retain the ability to trade with other countries."**
   ↳ > **Nima Sadrah:** "We can discuss a defined commitment rather than an exclusive arrangement."
2. **"We will examine the advantages of whatever terms you propose."**
   ↳ He nods.
3. **"I see."**

→ questions

## federation

Sadrah smiles slightly.

> **Nima Sadrah:** "I would be surprised if they had not. Your country has a number of very attractive opportunities."

> **Celeste Aroun:** "We intend to consider the proposals we receive from all our partners."

> **Nima Sadrah:** "Then we will try to make ours competitive."

→ questions

## answer

> **Nima Sadrah:** "If there is interest, I can arrange for the relevant institutions to prepare a full proposal."

1. **"Yes. Prepare terms for a possible financing agreement."** `[flag: zharan_financing_intent = true]`
   ↳ > **Nima Sadrah:** "Thank you. Our officials will contact Minister Aroun's office."
   ↳ > **Celeste Aroun:** "And Treasury will assess the financial arrangements before we make a commitment."
2. **"Leave the preliminary documents with us. We'll decide after reviewing them."** `[flag: zharan_financing_studied = true]`
   ↳ > **Nima Sadrah:** "Certainly."
3. **"We don't intend to seek Zharani financing for this project."**
   ↳ Sadrah closes his folder.
   ↳ > **Nima Sadrah:** "I understand. I hope there will be other opportunities for cooperation."
4. **"I'd prefer to explore trade and industrial cooperation separately from financing."**
   ↳ > **Nima Sadrah:** "We can arrange that. Our companies have expressed interest in the domestic market as well."

## close

Aroun collects the documents. Sadrah shakes your hand before leaving with his delegation.

1. **Return to the capital.** `[flag: seen_sadrah = true]`

→ END
