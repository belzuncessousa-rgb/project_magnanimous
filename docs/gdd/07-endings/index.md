<!-- notion: https://app.notion.com/p/37310ad0215881ce80aace5b9940bb9d | last edited: 2026-06-02T16:59:42.531Z -->
# 7. Endings

The epilogue of Project Magnanimous takes the form of Lara's final campaign speech before the second-term election — a political address in which she defends, reframes, and owns her record. Every fragment is written as she would actually say it: a sitting president making a case, not a narrator delivering a verdict.

The speech is assembled from modular fragments — one per sphere — composed together in sequence. What the player hears is determined entirely by the state of the game at the end of P5.

Two additional subpages handle what comes after the speech:

- 📄 [7.1 Epilogue Scenarios](7.1-epilogue-scenarios.md)

- Should the speech have a distinct visual or audio state — a podium background, a different music track?

- 📄 [7.2 Ending Scenarios](7.2-ending-scenarios.md)

- How does the second term modify the speech structure? Full Submission becomes available only then — does anything else change in register?

---

## Design Philosophy

- <b>A political speech, not a verdict.</b> Lara does not confess failures — she reframes them. A bad outcome produces a defensive or deflective fragment, not an admission. The player recognizes the spin.
- <b>No single axis.</b> Each sphere resolves independently. A strong result in one does not redeem failure in another.
- <b>Matrix logic for Economy.</b> The economic fragment is determined by two independent variables — policy direction (Statization / Balance / Privatization) and development outcome (Growth / Stagnation / Contraction) — producing 9 distinct speech fragments.
- <b>Outcome logic for Geopolitics.</b> International relations produce five discrete named outcomes, not a tier ladder. These are positions, not grades.
- <b>Threshold gates, not gradients.</b> All other spheres use named tiers crossed at defined thresholds. Precise values locked once indices are finalized.
- <b>Critical tiers require active arc failures.</b> They cannot be reached by passive neglect alone — a specific arc must have been triggered and resolved badly.
- <b>Coalition & Governance</b> is held as an open question — it may warrant a short addendum fragment given it is exactly the material an opponent would attack in a campaign.

---

## Speech Fragments

### 1. Economy

<i>Driven by: National GDP, Economic Output per region, debt trajectory, great project outcomes, trade agreements.</i>

<i>Two variables combine: Policy Direction (Statization / Balance / Privatization) x Development Outcome (Growth / Stagnation / Contraction) — 9 fragments total.</i>

<b>Statization + Growth:</b> <i>"We took back what belonged to the people — and the results speak for themselves. When the state leads, Kunasai grows."</i>

<b>Statization + Stagnation:</b> <i>"The unchecked capitalism of previous decades set us on a path of economic anarchy. Our reforms to restore government leadership in key sectors are already bearing structural fruit — the harvest takes time, but the seeds are planted."</i>

<b>Statization + Contraction:</b> <i>"The unchecked capitalism of previous decades set us on a path of economic anarchy. Our successful reforms to improve government control in key sectors will surely bear fruit in our future — the sabotage of entrenched interests has slowed us, but it will not stop us."</i>

<b>Balance + Growth:</b> <i>"We governed without dogma. We protected what needed protecting and opened what could be opened. The economy grew because we trusted Kunasai, not ideology."</i>

<b>Balance + Stagnation:</b> <i>"We inherited a structural crisis that no single term could reverse. We kept the balance. We did not make it worse. The foundation for what comes next is solid."</i>

<b>Balance + Contraction:</b> <i>"No government inherits a crisis and resolves it in four years. We held the line. The adjustments we made were painful and necessary. The next term is where they pay off."</i>

<b>Privatization + Growth:</b> <i>"We trusted the Kunasaian entrepreneur, and the Kunasaian entrepreneur delivered. Less government interference, more growth. The data is not a matter of opinion."</i>

<b>Privatization + Stagnation:</b> <i>"Reform takes time to compound. We removed the obstacles. The private sector now has the conditions to grow — what it needs is a second term to prove it."</i>

<b>Privatization + Contraction:</b> <i>"Our opponents spent decades building a state that suffocated investment. We began dismantling it. Did it hurt in the short term? Yes. Is Kunasai positioned better than it was? Unquestionably."</i>

---

### 2. Democracy & Institutions

<i>Driven by: STRUCT compass axis, press freedom choices, CA alliance costs, constitutional reform outcomes, military redlines crossed or respected.</i>

<b>Base tier:</b>

| Tier | Label | Speech fragment |
| --- | --- | --- |
| High | <b>The Republic Holds</b> | <i>"I was told that governing with principles was naive. That you could not hold the line and hold power. I am standing here, having done both. The institutions of this republic are stronger today than the day I took office. That is not a small thing. That is everything."</i> |
| Mid | <b>Survived Intact</b> | <i>"Democracy is not a gift. It is a practice. It was tested during this term — by those who wished it to fail, by crises that demanded shortcuts, by the easy path that was always available. We did not take it. The republic stands."</i> |
| Low | <b>The Erosion</b> | <i>"Governing is not clean. Anyone who tells you otherwise has never governed. We made difficult decisions under difficult circumstances, and yes — some of them will be debated. I stand by the reasoning. I stand by the results."</i> |
| Critical | <b>The Breaking Point</b> | <i>"There are those who will call what we did an overreach. I call it survival. Kunasai was on the edge. You do not govern an edge with academic restraint. History will be fairer to us than our opponents are today."</i> |

<b>Addendum — Representativity Reform</b> <i>(plays after base tier only if the reform was put to a vote):</i>

| Outcome | Addendum fragment |
| --- | --- |
| Passed — population weight | <i>"And we did something no government dared before us: we made every Kunasaian's vote worth the same. Ibicuí no longer subsidizes the silence of those who benefit from keeping it unheard."</i> |
| Passed — GDP weight | <i>"We modernized the republic's foundation — representation tied to economic reality, not to colonial-era boundaries designed to keep power concentrated in the wrong hands."</i> |
| Passed — decentralization | <i>"We did not fight over the center. We gave power back to the regions. Kunasai is not one country — it is five, and it governs better when it remembers that."</i> |
| Blocked or not attempted | <i>(no addendum)</i> |

---

### 3. Corruption

<i>Driven by: Suspicion indices, active dismantling of cartels or coronels, OPP dependency, scandal flags triggered.</i>

| Tier | Label | Speech fragment |
| --- | --- | --- |
| High | <b>Clean Hands</b> | <i>"You were told this was impossible. That power corrupts, that the system corrupts, that it was only a matter of time before we became what we replaced. Four years. Not one minister indicted. Not one contract investigated. Not one name. We proved something this term that will outlast this government: it is possible to govern Kunasai without stealing from it."</i> |
| Mid | <b>The Usual Compromise</b> | <i>"I will not stand here and tell you this government was perfect. Politics is coalition, and coalition is negotiation, and negotiation sometimes means holding your nose. What I will tell you is that we drew lines. We held them. The serious corruption — the structural kind, the kind that hollows out institutions — we fought it. The evidence is in the indictments."</i> |
| Low | <b>The Scandal Government</b> | <i>"Our opponents will talk about investigations. Let them. Every government is investigated. What matters is what was built, what was protected, what was preserved for the Kunasaian people despite the noise."</i> |
| Critical | <b>Captured</b> | <i>"Governing Kunasai means inheriting Kunasai — its debts, its entanglements, its long history of arrangements that predate this government by decades. We navigated that reality. Some of those navigations were imperfect. I will defend every decision I made in the room I was in, with the information I had."</i> |

---

### 4. Geopolitics & Sovereignty

<i>Driven by: Diplomatic Relations with the Federation and Zharan, trade agreements, Mondrath/Strait outcomes, IDEN compass axis.</i>

<i>Five discrete outcomes — not a tier ladder.</i>

| Outcome | Label | Speech fragment |
| --- | --- | --- |
| Multilateralism / Regional Bloc | <b>The Independent Path</b> | <i>"We were told to choose a side. We refused. We built relationships with Arenza, with Tarev, with Vassel — countries that, like us, have nothing to gain from being owned. The Arennian Federation and Zharan are powerful. They are not the only option. Kunasai proved that this term."</i> |
| Federation-leaned | <b>The Northern Partnership</b> | <i>"The Arennian Federation is the world's largest economy and our neighbor's neighbor. Building a serious relationship with them was not submission — it was strategy. We negotiated as equals. The agreements we signed reflect Kunasai's interests, not our dependency."</i> |
| Zharan-leaned | <b>The Eastern Investment</b> | <i>"While others talked about development, Zharan built it. We were pragmatic enough to accept that partnership on our terms, with protections for our sovereignty and our workers. The infrastructure being built in Kunasai today will be Kunasaian for generations."</i> |
| Isolationism | <b>Kunasai First</b> | <i>"We were told that closing doors would isolate us. What it did was give us time to look inward — to build what we have before bargaining it away. The next term, we re-engage from a position of strength, not desperation."</i> |
| Full Submission <i>(second term only)</i> | <b>The Terms of Survival</b> | <i>"There are moments in history when a country must be honest about what it can and cannot do alone. We made a choice. I will defend that choice. The alternative was worse."</i> |

<b>Conditional addendum — Mondrath</b> <i>(only if Mondrath relations are tense at end of P5):</i>

<i>"There is one relationship I want to address directly, because our opponents will not stop talking about it. The Strait question is real. The tensions with Mondrath are real. What I will not do is pretend that four years of careful diplomacy produced nothing — or that the alternative, confrontation, would have produced anything better."</i>

---

### 5. Social Development

<i>Driven by: Education indices per region, CoL per region, infrastructure investment, welfare program choices.</i>

| Tier | Label | Speech fragment |
| --- | --- | --- |
| High | <b>A Generation Changed</b> | <i>"Numbers are numbers. Let me tell you what the numbers mean. They mean a child in Mognagna who has a teacher. They mean a clinic in Ibira that was not there before. They mean a family in Tekoku that is not choosing between rent and food. We did not fix everything. We fixed enough that the next generation inherits a different country."</i> |
| Mid | <b>Incremental Progress</b> | <i>"Social transformation does not happen in one term. Anyone who promised you otherwise lied to you. What we did was move — steadily, without reversing, without sacrificing the vulnerable for the comfortable. The trajectory is right. The distance covered is real."</i> |
| Low | <b>The Neglected Half</b> | <i>"The structural conditions inherited by this government were severe. We prioritized stability — economic stability, institutional stability — because without it, social investment means nothing. The second term is where that stability becomes investment. I ask for the chance to finish what we started."</i> |

---

### 6. Internal Security & Order

<i>Driven by: Stability indices per region, cartel containment or separatist arc outcomes. Note: no military coup arc in the first term design.</i>

| Tier | Label | Speech fragment |
| --- | --- | --- |
| High | <b>Order Without Repression</b> | <i>"We made Kunasai calmer. Not through fear — we have had enough governments that governed through fear. Through presence. Through investment in the places that had been abandoned long enough to become ungovernable. The cartels are smaller. Ibira is not at war. Mognagna is not hungry. This is what security looks like when it is done right."</i> |
| Mid | <b>Held Together</b> | <i>"Crises came. They came from the cartels, from the regions, from forces that do not want Kunasai to succeed. We managed them. Not perfectly. But we managed them without losing ground, without losing lives we did not have to lose, without losing the republic."</i> |
| Low | <b>The Slow Fire</b> | <i>"There are places in Kunasai where life is still very hard. I will not pretend otherwise. What I will tell you is that this government did not abandon those places — and that the investment we made, even when it was insufficient, was more than any previous government made. We are not done. We are not giving up."</i> |
| Critical | <b>The Emergency</b> | <i>"There are moments when a president is tested not by the decisions they planned, but by the ones they never expected to make. I made hard calls. I will stand by them. The country did not break. It bent, and it held, because this government held it."</i> |

---

## Combination Logic

The speech is assembled in sequence: <b>Economy → Democracy & Institutions</b> (+ Representativity addendum if applicable) <b>→ Corruption → Geopolitics</b> (+ Mondrath addendum if applicable) <b>→ Social Development → Internal Security.</b>

The order moves from structural to human: what we built economically, how we governed the republic, how clean we were, where we stand in the world, what it meant for people's lives, whether the country was safe.

Critical tier fragments are written as defenses, not admissions — consistent with the speech format. The player recognizes the spin; Lara's opponents in the room recognize it too.

---

## Open Questions

- Does <b>Coalition & Governance</b> warrant its own fragment? It is politically the most exposed material in a campaign — who Lara needed, what she owed, what it cost. Could follow Corruption.
- What are the precise threshold values for each tier? <i>(To be locked once indices are finalized)</i>
- Does <b>Public Opinion</b> appear as a framing device for the speech itself — crowd reaction, tone of the room — rather than as its own fragment?
