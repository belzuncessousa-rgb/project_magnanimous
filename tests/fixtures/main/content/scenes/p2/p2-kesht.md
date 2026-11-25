---
id: p2-kesht
chapter: 2
turn: 1
title: The List
kind: conditional
location: capital
token: security
portraits: [kesht]
background: intelligence-office
---

⚙️ Security theme. Kesht finally gets his private meeting (Livia had been postponing it since January). He names informants inside state offices. The choice interacts with the cartel model (DECISIONS): antagonising the cartels without first reducing their capacity is risky (flag cartels_provoked feeds later events).

## opening

The Ministry of Intelligence has no sign on its building. Kesht receives you in a windowless room on the third floor, with a table, two chairs and a single folder.

> **Darian Kesht:** "Thank you for coming, Madam President. I asked for this meeting in January."

> **Darian Kesht:** "Three names. A federal police officer in the upper Ibira, who warned the smugglers before the November operation. A clerk at the Ministry of Justice office in Ibira, who passes on case files. And a deputy director at the Port Authority of Katanaí, who allows certain containers through without inspection."

> **Darian Kesht:** "All three are paid by the Red Tree. I have recordings and bank records. Not enough for a trial yet, but enough for me."

→ questions

## questions

1. **"The Port Authority? Who appointed him?"** `[once]` `→ questions`
   ↳ `[if: flag.opp_port_authority]` > **Darian Kesht:** "He's the new director's deputy. The new director is the OPP's appointee. I don't believe the director knows. I'm not certain."
   ↳ `[if: !flag.opp_port_authority]` > **Darian Kesht:** "He has been there for six years. He survived three directors."
2. **"Why did Livia keep postponing this meeting?"** `[once]` `→ questions`
   ↳ > **Darian Kesht:** "Ask her. My guess is that she likes to know what you know before you know it."
3. **"What would you do?"** `[once]` `→ questions`
   ↳ > **Darian Kesht:** "Leave them in place and use them to send the Red Tree false information. That needs money and patience, which the budget may not give me."
4. **"Here's what we'll do."** `→ decide`

## decide

1. **"Arrest all three. Publicly."** `[cartels capacity -3]` `[cartels suspicion +15]` `[approval +2 @ tekoku, tapira]` `[kesht loyalty -1]` `[salgado loyalty +1]` `[flag: informants = 1]` `[flag: cartels_provoked = true]`
   ↳ > **Darian Kesht:** "Renata will be pleased. The Red Tree will know exactly how much we know."
2. **"Leave them in place. Use them, as you said."** `[kesht loyalty +2]` `[cartels capacity -2]` `[+1 STRUCT]` `[flag: informants = 2]`
   ↳ > **Darian Kesht:** "Thank you. It may take a year before you see results."
3. **"Move them quietly to jobs where they can't do harm."** `[cartels suspicion +5]` `[flag: informants = 3]`
   ↳ > **Darian Kesht:** "That will work for a while. The Tree will buy new people."
4. **"Do nothing for now."** `[kesht loyalty -2]` `[flag: informants = 4]` `[flag: voice += 1]` `[show if: flag.cartels_softened || flag.cartels_ignored]`
   ↳ > **Darian Kesht:** "As you wish, Madam President."
   ↳ *The cartels are calm at the moment. There is no need to change that yet.*

## close

> **Darian Kesht:** "One more thing. If the budget allows, I'd like to set up a domestic monitoring department. We'll talk about it when you're ready."

1. **Leave** `[flag: seen_kesht = true]`

→ END
