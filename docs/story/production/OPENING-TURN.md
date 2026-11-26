# Opening turn — production and integration plan

Status: working plan, not an implementation change. Author-approved narrative canon sessions 01–58 and calibration samples govern this rewrite. The prototype remains playable and unchanged until staged scenes and their downstream dependencies have been reconciled.

## Sequence

1. Inaugural address — complete draft staged in [p1-inauguration.md](p1-inauguration.md); choose optional topics and commitments, in any order; finish without pledges possible.
2. Blue Room — retain Livia conducting and an informational overview of ministries, introduce characters when they participate, distinguish voices, allow optional follow-ups, no forced budget or project decisions.
3. Counting Votes — keep parliamentary arithmetic and political context; deepen optional questions, negotiation and consequences; adapt approved sample 02; callback to actual inaugural pledges. Do not presume a party appointment automatically establishes criminal corruption.
4. Tutorial — retain existing UI tutorial and order, reconcile chapter-level resources and revised bargaining only after engine design is agreed; avoid misleading tutorial claims. No pre-tutorial resource costs.
5. The First Night — complete draft staged in [p1-first-night.md](p1-first-night.md): approved sample 03 expanded with residence, family call, independent personal and political topics, conditional Lara options and evening activities. Verify family biography and downstream flags before integration.

Use short optional map readables/news reactions, with meaningful variations based on public choices. Existing scene order is the initial working default, not a commitment to final calendar or event count.

## Inaugural draft integration checklist

- Retain existing scene ID, portraits, anchors and basic beat grammar. Staged file deliberately outside content/scenes to avoid duplicate scene IDs.
- Existing greeting numeric identities preserved, general patriotic/social greetings no longer equated with an ideological shift. Explicit faith greeting has provisional RELIG delta. Other axes preserve original sign convention pending balance. Private motive and attitude choices record flags only.
- Existing address_econ, address_struct, address_iden, address_welf, address_force, skipped flags and address_topics remain. Center STRUCT speech no longer contains old "voice" line; remove stale callbacks that assume it does. Check all news, readables, later dialogue, election evaluation and engine tests.
- Existing promised_CoL, promised_GDP and promised_power retained, now optional and independently selectable. New promised_integrity and address_pledges proposed; evaluate merit-based appointments against actual qualification/appointment decisions, not automatic guilt by affiliation. Broad rhetoric and measurable pledges remain distinguishable; actual thresholds and outcomes not locked. Audit existing achievement, speech and ending logic for multiple or zero commitments.
- Review whether public rhetoric changes hidden compass, approval or influence. Draft has provisional compass shifts only, no resource gain values or arbitrary approval adjustments. All resource visibility/cadence changes require integration with engine.
- Verify that choice labels are not automatically repeated before accompanying speech in awkward ways, once-only topic routing and repeatable pledge submenu work, all loops have exits, all transitions resolve, no unavailable choices are shown, and no forced player commitments arise.
- Test zero-topic/zero-pledge, full-topic/full-pledge, mixed-order and minimal/maximum variants. Check every conditional read for prior knowledge. No tests yet executed against engine.

## Decisions not requiring immediate author input

Minor dialogue, blocking, gestures, pacing, flavour flags and scene details are delegated. Use a single critical question at a time if a major design issue blocks writing. First outstanding systems task: reconcile what public promises mean mechanically and how the game records and judges them; this does not block prose production. A more urgent engine task is moving resource generation from turns to chapters without accidentally duplicating recurring costs or effects. Coordinate code changes with author/Claude rather than changing implementation silently.

## Review packet

Author should review representative complete scenes and major choice points rather than approve every line. Proceed in batches, retain clean Git history, and do not claim testing or playable integration until performed.

## First-night integration checklist

- Keep existing scene ID and completion flag; port callback mapping assumes current opp_price_1 values. Verify against eventual Counting Votes rewrite.
- Replace outdated moral voice/path flags and old record-keeping plot only after auditing all dependent scenes, crisis conditions and ending logic. No invented forced guilt or compulsory thoughts. New draft preserves family neighbourhood and unfinished sanitation connection without assuming a personal favour or promising immediate construction.
- The existing monthly visit commitment and illness storyline are not automatically preserved; new next-month visit and residence invitation are separate proposed flags, not a permanent commitment. Reconcile later family scenes and personal calendar accordingly. Both parents and siblings present in the new family account; names, ages and illnesses not fixed in this draft.
- Optional conversation hub now has mutually exclusive prior-port-decision options, with no additional routing menu. Validate once-only behavior across hidden options and returns. Test combinations of each inaugural pledge and each earlier port decision, as well as skipping every optional conversation.
