# Project Magnanimous — sound plan

This is the working audio inventory for the game. It is intentionally separate from UI implementation: sound assets can be created, reviewed, and kept here before a later integration pass connects them to screens and scene events.

## Audio direction to test

Magnanimous is a political narrative game about governing Kunasai. Most play is reading and considering choices, so silence is the default for dialogue and map play. Prioritize quiet, deliberate interface feedback for actions that already carry meaning: opening the tablet or a document, choosing an option, and ending a turn. The title theme can establish an identity; continuous gameplay music is not part of the current plan. Avoid generic beeps, loud confirmations, and triumphant patriotic fanfare.

Start with a short title-theme sketch. Compare two restrained treatments of the same musical idea before generating more assets:

1. **Institutional restraint:** sparse piano, low strings, subtle room tone; tension comes from harmony and silence.
2. **Civic scale:** restrained acoustic/orchestral colors with a soft modern pulse; national moments can widen without turning into a victory anthem.

Use the same core brief for both so the comparison tells us which direction fits the current art and writing. After the theme, move to interface sounds rather than a map loop.

## Priority inventory

Priority reflects value in a playable build, not how easy an asset is to make. Durations are targets and can change after listening.

| Priority | ID / proposed filename | Type | Target | First use / purpose | Status |
|---|---|---|---|---|---|
| P0 | `music/title-theme.ogg` | Music | 20–40 s, composed ending | Title screen; memorable identity without sounding like a trailer cue | First to prototype |
| P0 | `sfx/ui-confirm.ogg` | UI | 0.1–0.3 s | General confirm/open action; tactile and understated | Not started |
| P0 | `sfx/ui-back.ogg` | UI | 0.1–0.3 s | Close/cancel; distinct but equally quiet | Not started |
| P0 | `sfx/choice-select.ogg` | UI | 0.1–0.4 s | Choosing a dialogue or policy option; avoid firing on every hover | Not started |
| P0 | `sfx/tablet-open.ogg` | UI / device | 0.3–0.8 s | Opening the tablet and its news interface | Not started |
| P0 | `sfx/document-open.ogg` | UI / paper | 0.3–0.8 s | Opening a report or readable; warm paper movement, not a long foley sequence | Not started |
| P1 | `sfx/end-turn.ogg` | UI / transition | 0.4–1 s | End-turn action; subtle page/dispatch transition | Not started |
| P1 | `sfx/crisis-alert.ogg` | UI / alert | 0.5–1.5 s | A new crisis or serious warning; clear, restrained, never an ongoing alarm | Deferred |
| P2 | `sfx/vote-result.ogg` | UI / feedback | 0.3–1 s | Congress vote result; add only if it helps the result feel legible | Deferred |
| P2 | `music/radio-selection/` | Optional music feature | TBD | Player-controlled music during map decisions; only if desired after the title theme is approved | Idea only |

## Production order

1. Generate two short title-theme candidates in the chosen audio model. Compare them at matched volume against the title screen and current visual identity.
2. Produce the core interface set: confirm, back, choice select, tablet open, and document open. Keep each quiet and short; check whether any two should share one underlying sound family.
3. Add end-turn and crisis feedback after the core set. Check that it is legible without becoming a repetitive notification loop.
4. Revisit vote feedback and the optional radio idea only after playing with the title theme and interface sounds in context.
5. Keep scene ambience and continuous gameplay music out of scope unless a specific scene or a player-controlled music feature earns it.

## Asset and review rules

- Keep source files and final game-ready exports in `public/audio/`, organized as `music/`, `sfx/`, `stingers/`, and `ambience/`.
- Use descriptive lowercase filenames from the inventory. Do not bake event-specific timing into a reusable loop.
- Prefer Ogg Vorbis for in-game delivery. Keep an original WAV master when the generation or source allows it; normalize and trim exports consistently during the audio pass.
- Each accepted asset needs a recorded source, creator/model, generation or download date, prompt or source URL, license/terms checked, and any edits made. Do not ship an asset until its commercial-use terms are recorded and acceptable.
- For generated audio, save the exact prompt beside the asset in `docs/audio/prompts/` and retain the untouched generation as a source/master where practical.
- Review for looping seams, clicks, clipping, distracting artifacts, loudness consistency, and masking of text or dialogue. Check the game with sound off and with a master mute/volume control before release.
- Keep generated audio free of recognizable copyrighted melodies, named-artist imitation, and unlicensed samples.

## Generation and sourcing workflow

For each item, write a prompt or search brief, generate/find a few candidates, compare them in context, choose one, document its provenance and terms, then make a game-ready export. AI tools are useful for quick variations and designed UI sounds; a curated sound library or original recording may be better for convincing paper details. A hybrid set is fine if the final mix feels coherent.

Dreamina's official audio pages describe web audio generation for music, ambience, and effects. However, the live `model list --type audio` result for the installed CLI (v1.4.0) exposes speech-generation models only; none has a music mode, and no standalone sound-effect model is listed. The CLI can quote supported saved audio nodes, but cannot currently quote the title theme or interface effects in this inventory. The web audio tool is a separate route to investigate; confirm that it offers the needed standalone outputs and shows a credit price before generating. Confirm export and commercial-use terms on the account and model actually used.

## Integration boundary for a later session

There is no audio playback layer in the current game yet. Keep this work asset-only until the set is reviewed. A later integration pass should add a small audio manager, user volume/mute settings, and explicit hooks for title music and interface actions. Do not start map/dialogue music automatically. If the radio idea is adopted, it should be explicitly player-controlled and respect the same master/music volume controls.

