# Writing style guide (from the author's feedback — mandatory)

The author read chapter 1 and gave this feedback. Every scene must follow it. When in doubt, re-read the
author's own prose in `content/scenes/p1/p1-inauguration.md` (the Notion original in
`docs/gdd/06-scenes/p1-opening-the-curtain/inauguration-address.md`) — but note the author ALSO found the
inauguration's intermediate texts too heavy (see 1).

## 1. Less drama, fewer names, more generic at the start
- The player knows nothing yet. Early text must not pile up proper names, places, products, economic geography
  ("the cotton of X, the mills of Y, the port of Z…"). One name here and there is fine; lists of examples are not.
- Keep the length, lower the intensity. Plain, observational, calm. Not every paragraph needs an image.
- Prefer more, shorter sentences over long rolling ones (the UI will reveal text progressively later).

## 2. BANNED: the "dramatic closer" / antithesis tic
The author called this "robotic" and "ridiculous". Do not write sentences whose job is to land a clever twist.
Banned patterns (rewrite them as plain statements, or delete them):
- Contrast closers: "She is the youngest person at the table and the only one who knows where everything is."
- "X. Not Y." / "Not X, but Y." / "It is not X. It is Y." used for effect.
- Aphoristic one-liners ending a paragraph: "Optimism is a renewable resource." "Someone arranged that, and both of
  them have noticed." "He makes three words sound like a treaty."
- Rule-of-three flourishes, "which you will learn is what he does instead of sighing", knowing winks at the reader.
- Personification gags about objects/rooms ("air conditioning installed by someone who believed in it").
Self-check every paragraph: if the last sentence exists mainly to be quotable, cut or flatten it.
Wit is allowed only inside dialogue, sparingly, when it is in character — never in narration.

## 3. Introducing characters
- When a character first matters, give them a real introductory paragraph: who they are, their department and what
  it handles (in plain words, e.g. "Treasury — she will help you with the budget, taxes and the debt"), a little of
  their appearance, and what they are doing in the moment. No one-line sketches meant to be "memorable".
- Introduce people when they first speak or act, not all at once in a roll call.

## 4. Meetings are conducted by someone else
- The president does not drive every meeting. A conductor (Chief of Staff Livia Harvan, or VP Mertens, or Amanda for
  personal matters) opens, explains the purpose, and calls on people.
- Structure of briefings: mandatory short introduction by the conductor → each minister/group gives a GENERAL
  overview (what the situation is, what will need to be discussed in this first period, what they intend) → optional
  follow-up questions the president can ask to learn more (informational, NO decisions) → close.
- Ministers must not jump ahead: in the first cabinet meeting nobody recommends which great project to choose, nobody
  forces decisions. It is a panorama of what will need to be discussed in the first months. Deeper discussion
  happens in each sector's own meeting later.
- Overviews should actually inform. Example — Treasury overview: the state of the economy (growth stagnant or not),
  where revenue comes from, what the state spends on, and then: "one item needs your attention: the debt — we will
  need to discuss it in depth". Follow-ups: where the money is, the biggest sectors, which regions produce what, etc.
  Some follow-ups can be deferred to the sector meeting.

## 5. UI-facing rules for content
- Do NOT show locked/greyed options. Gate them with `[show if: …]` so they appear only when available.
  (`[lock if: …]` only when seeing the road not taken is itself the point — rare.)
- No resource costs on choices before the tutorial has explained the resources.

## 6. Between scenes
- After a scene the player returns to the map. There should be small optional readable things on the map between
  the main interactions: regional reactions (click a region/city to read how it reacted), notes/telegrams from
  neighbouring governments (congratulations, acknowledgements) that are not newspaper items, minor incidents.
- Place each scene's token where it happens (use point ids from public/map/regions.json `points`:
  capital, katanai, st-veldra, vila-tamarin, atiaiaba, sugar-bay, mognagna-sertao, tapira-mines, upper-ibira,
  taua-hills, strait — or a region/country id).


## 7. Author-approved calibration (session 55)

- The author approves the tone, narration and dialogue of [calibration sample 01](calibration/01-inauguration-sample.md). Use it as a positive reference alongside the earlier feedback. The sample is not yet a playable scene.
- Keep clickable choices short, usually the opening words of Lara's speech or a clear summary of the intended action. Expand after selection. Clarity overrides brevity: use a longer label when necessary to convey the actual political stance, action, or commitment. Never put a surprising ideological reversal or material new promise into the accompanying text.
- Ordinary conversation may have no mechanical effects. Other options may set flags (especially public commitments), shift the hidden compass, affect relationships, or change resources. These effects may coexist; do not force every option to carry a stat change. Unspoken thoughts must not directly change external world conditions.
- Preserve the hidden political compass until the end of the term. Working visibility recommendation: explicit costs shown before choice (after tutorial), predictable resource effects may use tooltips, opinion and long-term effects remain implicit. Exact tooltip behavior and promise tracking UI remain to be confirmed; do not expose hidden compass deltas.
- Speeches may use more rhetorical language than private conversation, but shared introductions must remain compatible with every available stance.

## 8. Conversational texture (session 56)

- Plain narration must not become sterile. Include observable facial expressions, vocal changes, gestures, pauses and physical surroundings when they convey personality, social tension or changing mood. It is fine to describe someone looking stern or sounding annoyed; do not claim access to concealed motives or force Lara's emotions.
- NPCs may interact with each other, interrupt, disagree, joke, correct or elaborate on answers; avoid treating them as isolated information terminals. Not every line requires a reaction beat.
- Optional conversation hubs permit proceeding directly to the decision or asking questions in any order. Once visited, a topic disappears on return. Some topics can open a nested hub or a short choice of follow-ups, comments, jokes or silence, then return to the parent hub. Allow an exit without forcing extra questions. Validate parser behavior before implementing nested hubs.
- Lara's conversational participation matters even without political or mechanical effects. Provide expressive choices, not just information requests and policy decisions. Important negotiations may merit roughly 50–100% more optional interactions than calibration sample 02 revision 1; this is an illustrative scale, not a quota or universal length requirement. Add interaction rather than unnecessary exposition.
- Use state-dependent callbacks when relevant, especially earlier public commitments and visible actions. A short conditional exchange is often sufficient; do not introduce huge duplicated branches for cosmetic differences. Never presume a prior choice was made.
- [Sample 02 revision 2](calibration/02-counting-votes-sample.md) illustrates these principles; the author approved the initial voices but requested richer reactions and optional interaction. Revised prose awaits calibration feedback.

## 9. Natural transitions and layered reactivity (session 57)

- Author approves sample 02 revision 2's writing, amount of description and character personality. A specific qualifications follow-up felt awkward before returning to the hub. Informational dialogue must not imply a decision that has not been made. End a nested exchange naturally before returning; provide a relevant continuation or exit if needed rather than mechanically looping. Not every conversation needs a hub.
- Conditional writing applies to player options as well as NPC lines. Earlier choices, flags, relationships, resource levels, regional conditions or other thresholds can unlock flavour responses, substantive decisions, alternate scene variants or entirely different encounters. Conditions should make narrative sense; do not leak hidden compass values.
- Use all four levels of reactivity (dialogue, player responses, decisions, scene availability/variants), increasingly consequential as the term progresses. Prioritize meaningful divergence and reuse of common passages where appropriate rather than a combinatorial branch explosion. Validate continuity across reachable states.
- [Sample 03](calibration/03-first-night-sample.md) tests a more private register, shared personal history, ordinary interactions and conditional conversation/options with Amanda. Provisional until author review.
