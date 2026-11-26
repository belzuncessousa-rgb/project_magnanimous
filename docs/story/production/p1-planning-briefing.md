---
id: p1-planning-briefing
chapter: 1
turn: 3
title: Three Projects
kind: briefing
location: capital
token: project
portraits: [marne]
background: planning-model-room
---

⚙️ Staged rewrite. Retain first-round catalogue 1/4/6, all three core presentations before closing, optional follow-ups and planning_seen/seen_planning_briefing. No selection or costs here. Two investment rounds remain planned, with additional projects conditional on future affordability. No automatic project failure. Technical/geographic details and benefits need final world-data review.

## opening

The Ministry of Planning has set aside a room for the models, maps and drawings it uses when reviewing large projects. A long table in the centre of the room holds several maps of Kunasai at different scales.

Tobias Marne is waiting with a group of engineers. He introduces them and asks them to remain nearby in case you have questions.

> **Tobias Marne:** "We have three proposals sufficiently advanced for a decision. Alexander and I have been discussing which could be accommodated within the budget."

He opens the first of three folders.

> **Tobias Marne:** "I'll explain the purpose of each and what would be involved in carrying it out. We should also discuss the things that haven't been settled yet."

→ models

## models

1. **Examine the Ibira mineral development proposal.** `[once]` `[flag: planning_seen += 1]` `→ rare-earths`
2. **Examine the national railway proposal.** `[once]` `[flag: planning_seen += 1]` `→ railway`
3. **Examine the housing and sanitation proposal.** `[once]` `[flag: planning_seen += 1]` `→ sanitation`
4. **"I've seen all three. Thank you."** `[show if: flag.planning_seen >= 3]` `→ close`

## rare-earths

Marne leads you to a large map of Ibira. Several coloured outlines mark the boundaries of protected areas and indigenous territories.

> **Tobias Marne:** "The Tauá Hills. The Geological Service has identified a substantial rare-earth deposit. These materials are used in a variety of industrial and advanced manufacturing applications."

He places a smaller map over the area.

> **Tobias Marne:** "Developing the deposit would require transport infrastructure, power and processing facilities. We'd also need specialist expertise. There are foreign companies interested in participating."

> **Tobias Marne:** "The potential revenue is considerable. We could also build some of the industrial capabilities here, depending on the arrangements we reach. The difficulties are the location, environmental impacts, local communities and the criminal groups active in the region."

One engineer moves closer to show you the proposed transport connections.

→ rare-q

## rare-q

1. **"Who would own the operation?"** `[once]` `→ rare-owner`
2. **"How would we protect the communities and the forest?"** `[once]` `→ rare-protect`
3. **"What could we develop beyond the mine itself?"** `[once]` `→ rare-industry`
4. **"Let's look at another project."** `→ models`

## rare-owner

> **Tobias Marne:** "There are several possible arrangements. A public enterprise, a concession to a private operator, or a partnership involving both. The financing and conditions offered by potential partners would influence the decision."

1. **"Could we retain domestic control while using foreign expertise?"**
   ↳ > **Tobias Marne:** "Potentially. We would have to negotiate the terms and be able to finance our share."
2. **"We'll examine the offers if we choose it."**

→ rare-q

## rare-protect

> **Tobias Marne:** "The current proposal identifies several areas requiring further environmental and social assessment. We need to discuss the boundaries with the communities concerned and establish what safeguards are necessary."

He points to the proposed site.

> **Tobias Marne:** "The costs and timetable will depend partly on those decisions. I would not recommend proceeding on the assumption that every issue can be resolved after construction starts."

→ rare-q

## rare-industry

> **Tobias Marne:** "Processing and advanced manufacturing could bring greater returns than simply exporting the material. Those investments would require facilities, skilled workers and a market for what we produce."

1. **"Could we coordinate this with the technology sector in Tekoku?"**
   ↳ > **Tobias Marne:** "Yes. Helena and I have discussed the possibility. It would require investment beyond the mine."
2. **"Understood."**

→ rare-q

## railway

The railway proposal occupies a map covering much of the country. Existing tracks are marked in black and proposed additions in red.

> **Tobias Marne:** "National Railway Integration. Much of our freight currently travels long distances by road. The proposal would improve existing corridors and connect them to additional agricultural and industrial regions."

He runs a finger along the principal route.

> **Tobias Marne:** "Tapira's producers would gain better access to the ports. Industry would have more options for moving goods, and parts of Mognagna would become better connected to the rest of the country."

> **Tobias Marne:** "It's a substantial undertaking, with several sections. We can open some sections before the whole network is complete, although the largest benefits depend on the connections between them."

→ railway-q

## railway-q

1. **"Who would benefit first?"** `[once]` `→ rail-benefits`
2. **"What would determine the route?"** `[once]` `→ rail-route`
3. **"Could we connect it to future industrial projects?"** `[once]` `→ rail-links`
4. **"Let's look at another project."** `→ models`

## rail-benefits

> **Tobias Marne:** "Initially, the areas where existing rail lines can be improved. The construction itself would also generate employment. Over time, better connections would make investment more attractive in some of the regions the network reaches."

→ railway-q

## rail-route

Marne indicates several possible alignments.

> **Tobias Marne:** "Engineering requirements, freight demand, land acquisition and the locations of existing facilities. We should expect regional authorities and producers to have their own preferences."

1. **"Could the stations serve smaller communities too?"**
   ↳ > **Tobias Marne:** "Some could. We would need to balance local accessibility with the purpose of the principal freight routes."
2. **"The detailed route can be discussed later."**

→ railway-q

## rail-links

> **Tobias Marne:** "Certainly. If we eventually develop substantial new industrial or mineral production, we could extend the network where it makes economic sense. It is one of the advantages of establishing the principal corridors early."

→ railway-q

## sanitation

The third display contains photographs of housing blocks, construction sites and streets in Katanaí and St. Veldra. Some photographs show completed buildings and others show work left unfinished.

> **Tobias Marne:** "The programme begun under President Luz. A significant amount of the infrastructure is already in place, but much of it cannot be used until the remaining sections and treatment facilities are completed."

You recognise Vila Tamarin on the map.

> **Tobias Marne:** "Finishing the works could improve water and sanitation for a large number of households. There is also housing that was never completed."

He opens a contract summary.

> **Tobias Marne:** "The principal difficulty is the existing agreement with Corvel. We would need to settle the contractual terms and establish exactly what remains to be built."

→ sanitation-q

## sanitation-q

1. **"What are our options with Corvel?"** `[once]` `→ corvel`
2. **"What could be completed within this term?"** `[once]` `→ sanitation-time`
3. **"My parents live near one of the unfinished sections."** `[once]` `→ tamarin`
4. **"Let's look at another project."** `→ models`

## corvel

> **Tobias Marne:** "We can examine the scope of the remaining work and negotiate the terms, or consider the legal alternatives. Each approach has its own costs and timing implications."

1. **"I asked Treasury to send the contract to Justice."** `[show if: flag.corvel_to_salgado]`
   ↳ Marne nods.
   ↳ > **Tobias Marne:** "I'll make sure the engineers cooperate with the review."
2. **"I asked for a new cost estimate."** `[show if: flag.corvel_costed]`
   ↳ > **Tobias Marne:** "Our staff are preparing it. We should be able to compare the outstanding work with the original prices."
3. **"We'll settle the contract before work resumes."**
   ↳ > **Tobias Marne:** "That would give us a much clearer basis for planning."
4. **"I understand."**

→ sanitation-q

## sanitation-time

> **Tobias Marne:** "Much of the work could be completed within the term if we resolve the outstanding arrangements promptly. We would need to examine the condition of the infrastructure that's been left unused."

He turns to an engineer.

> **Tobias Marne:** "We should include that inspection in the preliminary schedule."

→ sanitation-q

## tamarin

Marne looks at the map again.

> **Tobias Marne:** "I see. Several of the connections in that area remain unfinished. I can have the team prepare an update on the site."

1. **"I've already asked for an update on their street."** `[show if: flag.promised_mother_street]`
   ↳ > **Tobias Marne:** "I'll check with my office and make sure the report reaches you."
2. **"I'd like the same assessment we would make for any neighbourhood."**
   ↳ > **Tobias Marne:** "Of course."
3. **"Thank you."**

→ sanitation-q

## close

Marne gathers the three folders.

> **Tobias Marne:** "I'll have a summary of the estimated costs and principal decisions sent to your office. We can then discuss which proposal to include in the budget."

1. **"Thank you, Tobias. We'll make the selection at the next meeting."** `[flag: seen_planning_briefing = true]`
2. **"Include your engineers' assessment with the summary."** `[flag: seen_planning_briefing = true]`
   ↳ > **Tobias Marne:** "Certainly."

→ END
