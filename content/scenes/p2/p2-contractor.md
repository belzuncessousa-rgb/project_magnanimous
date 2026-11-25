---
id: p2-contractor
chapter: 2
turn: 1
title: Who Builds It
kind: briefing
location: capital
token: project
portraits: [marne, fontes]
background: planning-model-room
---

⚙️ First great-project follow-up (DECISIONS: contractor choice). Branches on great_project via one-option routing. Projects never fail; this choice changes cost, speed, corruption risk and foreign relations.

## opening

Marne and Fontes meet you at the Ministry of Planning. Marne has a folder for each option. Fontes has a single page with numbers.

> **Tobias Marne:** "Madam President, before we can start the work we need to decide who does it. There are always three ways: a Kunasaian company chosen directly, an open tender, or a foreign partner. I'll explain the options for our project."

1. **Hear the options** `[show if: flag.great_project == 1]` `→ mine`
2. **Hear the options** `[show if: flag.great_project == 4]` `→ rail`
3. **Hear the options** `[show if: flag.great_project == 6]` `→ sewer`
4. **Hear the options** `[show if: !(flag.great_project == 1 || flag.great_project == 4 || flag.great_project == 6)]` `→ none`

## mine | The Mine

> **Tobias Marne:** "For the Tauá Hills, the first step is a road and a river port, then the mine. Three options."

> **Tobias Marne:** "One: a national consortium of mining firms from Tapira. I know them; they'd start quickly. They have little experience with rare earths. Two: a state company in partnership with an Arennian firm, Halvard Minerals, which has the technology. Three: a state company with a Zharani state firm, which would also finance the road and the port."

> **Alexander Fontes:** "The Zharani offer is the cheapest for us now. The Arennian is the most expensive and the most respected by the markets. The national consortium is in the middle, and the hardest to supervise."

1. **"The national consortium."** `[flag: contractor = 1]` `[opp opinion +2]` `[marne loyalty +2]` `[flag: corruption += 1]` `[flag: project_progress += 1]`
   ↳ > **Tobias Marne:** "They'll be on site within a month."
   ↳ > **Alexander Fontes:** "I'll want monthly accounts from them."
2. **"The state company with Halvard Minerals."** `[cost: 10 FC]` `[flag: contractor = 2]` `[federation relation +2]` `[zharan relation -1]` `[flag: clean_extraction = true]`
   ↳ > **Tobias Marne:** "It will be slower to negotiate. Ambassador Pryce will be pleased."
3. **"The state company with the Zharani partner."** `[gain: 10 FC]` `[flag: contractor = 3]` `[zharan relation +2]` `[federation relation -2]` `[flag: zharan_in_ibira = true]`
   ↳ > **Tobias Marne:** "They'll build the road fast. They'll also want a long contract for the ore."

→ close

## rail | The Railway

> **Tobias Marne:** "For the railway, the first section would be Tapira to the capital. Three options."

> **Tobias Marne:** "One: direct contracts with the four Kunasaian firms that build railways, section by section. Two: an open international tender; Zharani state firms would probably win on price. Three: a mixed model: open tender, but with a requirement for Kunasaian partners and workers."

> **Alexander Fontes:** "Direct contracts are fastest and the least transparent. The open tender is cheapest. The mixed model is slower to set up and the most defensible."

1. **"Direct contracts with the Kunasaian firms."** `[flag: contractor = 1]` `[opp opinion +2]` `[marne loyalty +2]` `[flag: corruption += 1]` `[flag: project_progress += 1]`
   ↳ > **Tobias Marne:** "The first section can start in June."
2. **"An open international tender."** `[gain: 10 FC]` `[flag: contractor = 3]` `[zharan relation +1]` `[unions opinion -1]` `[marne loyalty -1]`
   ↳ > **Tobias Marne:** "Then the Zharani will win it. I'd prepare the unions for that."
3. **"The mixed model."** `[flag: contractor = 2]` `[unions opinion +1]` `[fontes loyalty +1]`
   ↳ > **Tobias Marne:** "It will take three more months to write the rules. But nobody will be able to say we gave it away."

→ close

## sewer | The Sanitation Works

> **Alexander Fontes:** "For the sanitation works, the question is Corvel. Their contract is still valid. Three options."

> **Alexander Fontes:** "One: renegotiate the prices in annex nine. It will take months and Corvel will resist, but the works would then cost what they should. Two: pay their prices and restart immediately. Three: cancel the contract and tender the rest; Corvel will go to court, and the works may stop for a year or more."

> **Tobias Marne:** "Corvel's people have already called me twice. They'd prefer option two, naturally."

1. **"Renegotiate. Every price in annex nine."** `[flag: contractor = 2]` `[fontes loyalty +2]` `[mertens loyalty -1]` `[flag: path_hold += 1]`
   ↳ > **Alexander Fontes:** "Good. I'll lead it myself. Expect them to complain to the newspapers."
2. **"Pay their prices. People have waited eight years."** `[cost: 10 FC]` `[flag: contractor = 1]` `[flag: corruption += 1]` `[flag: project_progress += 1]` `[approval +2 @ ibicui]` `[flag: voice += 1]`
   ↳ > **Tobias Marne:** "The crews can be back on the hill in two weeks."
   ↳ *The people on the hill don't care about annex nine. They care about the pipe.*
3. **"Cancel the contract and tender the rest."** `[flag: contractor = 3]` `[salgado loyalty +1]` `[approval -2 @ ibicui]` `[flag: corvel_lawsuit = true]`
   ↳ > **Alexander Fontes:** "Corvel will sue on the same day. Renata's lawyers will be busy."

→ close

## none

> **Tobias Marne:** "We haven't settled the project yet, so there's nothing to contract. We'll come back to this."

→ close

## close

1. **Thank them** `[flag: seen_contractor = true]`

→ END
