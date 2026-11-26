# First-term narrative production roadmap

Status: working production plan, 26 November 2026 review checkpoint. The six-chapter/eighteen-turn framework is author-approved; the allocation below is provisional and does not change the live calendar. All 38 original prototype scene IDs have staged narrative rewrites. This is not the complete first-term manuscript.

## Writing priorities

Keep the approved prose calibration, player-defined Lara, independent NPCs, variable scene length, naturally flowing dialogue, optional question hubs and meaningful conditional choices. Do not inflate the scene count or force questions on the author about minor creative decisions. Later chapters should diverge more substantially than the opening. Preserve opportunities to govern well, fail, exploit institutions, act corruptly, or pursue coercive policies; credible institutional resistance must not turn every controversial decision into an indefinitely deferred review. Distinguish a policy decision from delivery, but provide actual subsequent decisions and outcomes. No predetermined morality or ideology for Lara.

## Working calendar

| Chapter | Turn | Dramatic function and principal material |
|---|---|---|
| 1: Arrival and foundations | 1 | Inauguration; cabinet; congressional panorama; resource tutorial; first night. |
| 1 | 2 | Treasury and inherited obligations; health and justice priorities; defense; representation proposal; first informal regional encounters. |
| 1 | 3 | University and technology; party bench; project options; Vila Tamarin; first Great Project selection (1, 4, 6). |
| 2: Political direction | 1 | First budget and debt negotiations; project financing/procurement; Federation; intelligence; actual cabinet and congressional commitments. |
| 2 | 2 | Constitutional draft; separate party negotiations; Zharan; selected project site; Mognagna drought; family visit. |
| 2 | 3 | Arenza commission; Mondrath notice; military archives; cultural festival; PEC legislative stage or deferral, contingent on negotiations. |
| 3: Consequences | 1 | Tax reform and enactment if supported; Strawberry response; project monitoring; actual financing/contract decisions and condition-dependent incidents. |
| 3 | 2 | Celia's health; port labour; optional strike response; regional visits and action-specific fallout. |
| 3 | 3 | Midterm retrospective; first project early delivery; public promise ledger; new international offers; adjust policy or continue. |
| 4: The balance of power | 1 | First Great Project delivery and variable benefits; budget and institutional position review; major corruption findings if warranted. |
| 4 | 2 | Regional tensions, conditional Tekoku autonomy dispute; Mognagna and Tapira development; Ibira governance and cartel pathways; archive developments. |
| 4 | 3 | Second Great Project selection; all approved candidates subject to eligibility, including technology hub with prerequisites; possible additional projects only if affordable. |
| 5: Consolidation or fracture | 1 | Second project execution; debt review; party relationships and commitments; advanced trade/alliance negotiations conditional on prior diplomacy. |
| 5 | 2 | Tapira drought/severe agricultural pressure conditional; land reform or modernization consequences; cartel outcomes and accountability. |
| 5 | 3 | Institutional conflicts resolve or worsen; cabinet, family and personal developments; emerging election landscape; second project progress. |
| 6: Legacy and election | 1 | Review delivered policies, public promises and both project rounds; party leadership and coalition decisions; campaign priorities. |
| 6 | 2 | Election campaign and negotiations; state-dependent opposition and media events; conditional threats to constitutional continuity. |
| 6 | 3 | Final results, reelection or constitutional transition, personal epilogues and legacy; exceptional terminal coup/war routes only when justified by accumulated conditions. |

Actual calendar dates, scene IDs for new encounters, availability and sequencing will be determined during scene production. Ch1 first-project selection remains the newer canon default; Ch4 second selection is preserved. No second playable term. Chapter resources refresh at chapter boundaries, not each turn.

## Arc continuity and new scene work

- Constitutional package: choose provisions and optional reforms; consult PM bench, OPP, affected governors and opposition as relevant; maintain a single negotiated text; track actual support, amendments, agreements, and separate chamber requirements; allow abandonment, defeat, compromise, or ratified passage. The staged vote finale cannot be enabled before this work. Opposition and other protagonists must have independent motives.
- Fiscal policy: settle first budget, debt terms and congressional approval; tax proposal followed by actual legislative negotiation and outcome; later reviews depend on expenditure, performance and commitments. No guaranteed disbursement from exploratory offers.
- Great Projects: actual contract and funding approval; conditional oversight and local agreements; meaningful implementation choices; first-round payoff by Ch3–4 and second by Ch5–6; deliver varying costs/benefits without overriding the existing no-binary-failure rule. Support eligible additional investments; confirm technology-hub prerequisites. Preserve synergies.
- Regional arcs: Tekoku heritage, industry and possible conditional autonomy/secession; Mognagna water, social policy and local power brokers; Tapira land distribution, modernization and agricultural risk; Ibira indigenous consultation, environmental protection, minerals and separate rural/urban criminal organizations. Integrate Ibicuí labour, housing and port rather than adding repetitive stand-alone crises.
- Foreign policy: Federation and Zharan competing offers with genuine benefits, commitments and dependency risks; sovereign nonalignment as a viable active strategy; Arenza equal partnership through stages, then other willing members; Mondrath's independence and strait questions; other states enter through relevant interests, not compulsory introductions. No guaranteed foreign consent.
- Institutions: Renata's lawful independence and credible consequences for attempts to undermine it; archive study/release/prosecution as distinct questions; civil-military relations; corruption allegations, evidence, actual investigations, patronage and potentially corrupt outcomes; distinguish attempts from successful actions. Later scenes must allow player-enabled institutional capture or corrupt arrangements where plausible in fiction, not universally block them with one NPC refusal.
- Relationships: Amanda's personal and professional relationship, conditional callbacks and independent decisions; Mertens's political and family life; Livia's ambition and competence; Lara's parents alive at baseline and siblings established without premature biographies. Family outcomes should emerge from events and choices; avoid automatic illness escalation or forced residence changes.
- Politics and elections: develop independent party agendas, trust in commitments, shifts within coalitions and potential CP split, candidacies and electoral competition. Election outcomes must follow the simulation and events; no scripted first-term victory. Terminal consequences and next-term epilogue are not a second playable term.
- Optional content: standing free actions, seasonal actions, conditional events, media, reports, letters and everyday conversations. Avoid padding the mandatory narrative; make repeatable decisions concise and cumulative.

## Integration gates

1. Reconcile staged scene headers, parser grammar, speaker IDs, show-if syntax, fallback paths and post-choice continuation, then run real parser and branch tests. The drafts contain some editorial conditional placeholders that must be compiled into supported conditions.
2. Audit legacy flags and state semantics: public vs private, proposed vs approved vs delivered, consent vs actual agreement, identity/relationship/ideology vs observable action. Preserve compatibility where valid; migrate downstream references explicitly. Do not use a request for a street report as a promise to deliver a sewer; do not treat an appointment offer, procurement strategy, financing expression of interest or budget proposal as completed.
3. Establish commitment ledger and negotiated legislative outcomes, actual resource costs and funding authorization. Add downstream resolutions rather than leaving consequential choices as flags without payoff. Add free-action catalogue and balance chapter resource quantities, expenditure and interest cadence.
4. Expand and migrate active calendar to six chapters / eighteen turns. Retain current live prototype until coherent integration is tested. Reconcile original first-year and new midterm scene titles and calendar-dependent text.
5. Produce Chapter 4–6 scenes and missing Chapter 2–3 negotiation/outcome scenes in full. Add associated news/readables, conditional scenes and endings. Track evidence of choices in election and legacy.
6. Test reachable branches, choice gating, dependency ordering, no dead ends, resources, persistence, mutually exclusive outcomes, actual reading time and meaningful divergence. Playtest representative ideological, pragmatic, corrupt and failed paths; do not force the player into an archetype.

## Current production state

38 of 38 legacy prototype scene IDs have staged rewrites under this directory. The original prototype covers only three chapters, so this count does not measure completion of the full game. Some final scenes are shorter initial drafts and require expansion/conditional dialogue during integration. The vote finale and retrospective contain deliberate integration placeholders. Numeric effects remain incomplete. No active content, gameplay code or calendar changed. Author review of every scene is unnecessary; reserve questions for consequential design choices. The next substantial manuscript work is the additional negotiation/outcome scenes and the second half of the term, alongside integration of the opening playable slice.
