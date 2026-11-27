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

⚙️ Staged rewrite. Intelligence allegations, Red Tree rural network and Blue Piranhas urban contacts distinguished. Allegations not proven guilt. Existing informants 1 public investigation, 2 discreet investigation/intelligence cooperation, 3 administrative safeguards, 4 no immediate change (gated) retained as policy direction, not automatic operational success. No forced criminal collaboration or detailed operational techniques. Check prerequisite knowledge and later consequences. Numerical effects deferred.

## opening

Darian Kesht has arranged a private meeting at the ministry. An assistant leads you into a small conference room and leaves after bringing water.

Kesht waits until the door is closed.

> **Darian Kesht:** "Thank you for coming, Madam President. I have an update on the concerns we discussed at the cabinet meeting."

He places a folder on the table.

> **Darian Kesht:** "We believe that several public officials have established relationships with criminal organisations. Some work in the institutions responsible for investigating them."

He opens the folder.

→ assessment

> **Darian Kesht:** "The information is not sufficient to establish criminal liability in every case. It is sufficient to warrant further attention."

## assessment

> **Darian Kesht:** "The strongest indications concerning the Red Tree are in Ibira. We also have concerns about contacts between commercial intermediaries at the port and people associated with the Blue Piranhas."

He turns several pages.

> **Darian Kesht:** "The difficulty is that we need to protect the integrity of our investigations while establishing which of the allegations are reliable."

1. **"Has Justice received the information?"**
   ↳ > **Darian Kesht:** "Some of it. We are discussing how to make the remaining material available in a form that can be used appropriately."
2. **"How confident are you in the assessment?"**
   ↳ > **Darian Kesht:** "It varies by case. I would not describe all the names in this folder as confirmed members of criminal organisations."
3. **"Let's discuss what can be done."**

→ questions

## questions

1. **"What do we know about the port officials?"** `[once]` `→ port`
2. **"How do the two organisations differ?"** `[once]` `→ organisations`
3. **"What would you recommend?"** `[once]` `→ recommend`
4. **"What safeguards would prevent further interference?"** `[once]` `→ safeguards`
5. **"I'm ready to establish a direction."** `→ decision`

## port

> **Darian Kesht:** "Several of the people concerned have been at the authority for years. We need to establish the extent of their contacts and whether other officials were aware of them."

1. **"Have you examined the proposed OPP appointments?"** `[show if: flag.opp_port_authority]`
   ↳ > **Darian Kesht:** "We have no basis for treating the entire list as implicated. I would advise an appropriate review of any appointments, particularly while the existing allegations are being examined."
2. **"The director was to remain independent under our arrangement."** `[show if: flag.opp_price_1 == 2]`
   ↳ > **Darian Kesht:** "That may help with the administrative review. It doesn't settle the allegations concerning existing officials."
3. **"Understood."**

→ questions

## organisations

> **Darian Kesht:** "The Red Tree's influence is particularly visible in parts of Ibira, where it affects territorial access and local economic activity. The Blue Piranhas have more extensive contacts in urban commercial and financial networks."

> **Darian Kesht:** "They have avoided a major confrontation with one another recently. That does not mean their interests will always coincide."

→ questions

## recommend

> **Darian Kesht:** "I would prefer a coordinated investigation with Justice. We have information that may help identify broader institutional problems. Announcing individual cases before they are ready may complicate that work."

1. **"Can that be done within the existing legal framework?"**
   ↳ > **Darian Kesht:** "We will need to coordinate the responsibilities of the service and the investigators. I would ask for clear authorization of the resources required."
2. **"What would you need from the government?"**
   ↳ > **Darian Kesht:** "Continuity of funding and a clear understanding of which institutions will be responsible for the investigation."
3. **"I see."**

→ questions

## safeguards

> **Darian Kesht:** "Administrative reviews, appropriate restrictions on access to sensitive material, and cooperation with the relevant authorities. We should establish what is justified in each individual case."

1. **"I don't want people punished on the basis of an unverified allegation."**
   ↳ Kesht nods.
   ↳ > **Darian Kesht:** "Then the distinction between administrative precautions and criminal proceedings should be made explicit."
2. **"Prepare recommendations for the institutions concerned."**

→ questions

## decision

1. **"Refer the allegations for investigation and announce a broader anti-corruption effort."** `[flag: informants = 1]` `[flag: cartels_provoked = true]`
   ↳ > **Darian Kesht:** "I'll coordinate the referral. I would advise that the public statement avoid identifying individuals before the appropriate authorities can assess the cases."
2. **"Coordinate a discreet investigation with Justice."** `[flag: informants = 2]`
   ↳ Kesht looks satisfied.
   ↳ > **Darian Kesht:** "I'll arrange the necessary discussions with Renata's office."
3. **"Prioritize administrative safeguards while the allegations are assessed."** `[flag: informants = 3]`
   ↳ > **Darian Kesht:** "I'll prepare recommendations for the institutions concerned."
4. **"Keep the present arrangements for now. Continue reporting to me."** `[show if: flag.cartels_softened || flag.cartels_ignored]` `[flag: informants = 4]`
   ↳ Kesht closes the folder.
   ↳ > **Darian Kesht:** "Very well. I'll keep you informed of any developments that require a decision."

## close

> **Darian Kesht:** "There are some broader questions about the service's capabilities that I would like to discuss when the budget is settled."

1. **"Arrange a separate meeting through Livia."** `[flag: seen_kesht = true]`
2. **"Send me the proposal first."** `[flag: seen_kesht = true]`

→ END
