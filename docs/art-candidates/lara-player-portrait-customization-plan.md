# Lara Vento: portrait customization catalog

**Status:** approved production direction; portrait catalog is not yet complete. Existing portraits are visual references until every listed combination passes review and the user approves the finished sheet. This is a cosmetic presentation feature and does not add narrative canon or mechanics.

## Character and art anchors

Lara is about 50, a lawyer and longtime community organizer from Vila Tamarin. She spent fifteen years building legal-aid offices and tenant committees before becoming a senator and president. She believes what she says, is at ease with ordinary people, and is still learning how to move through elite political rooms. Her face and proportions are one fixed identity across the set. Clothes express occasion and personal taste; they do not label a political path as good or bad.

Follow `docs/ART-UI-CANON.md`: cinematic painterly realism, transparent PNG portraits, natural side-angled posture, and waist-up framing. No full-length character sheets. Keep a consistent face, crop, scale, light direction, and image style. The Kunasai flag is a green field with a thick white wave and a gold sun disk without rays; the sun is centered behind the wave. Use this exact design for Lara's patriotic lapel pin. Lara's customization remains separate from political and story state.

## Player-facing selection model

The player chooses one option from each of three selectors:

1. **Outfit:** six options.
2. **Hairstyle:** four options.
3. **Pose and expression:** seven paired choices.

This produces **168 finished portraits** (6 � 4 � 7). Each combination is a pre-rendered complete transparent portrait. The UI still behaves as though one property changes at a time: cycling outfits keeps the selected hair and pose/expression; cycling hair keeps the outfit and pose/expression; cycling pose/expression keeps the outfit and hair. Do not randomize or reset the other two selections. Use a brief dissolve if desired; do not morph the pose or shift the camera.

The portrait art itself is not a modular layer system. Do not tell players that individual clothing, hair, or face parts are being swapped. Stable IDs and a deterministic asset lookup make the pre-rendered catalog feel like three independent selectors.

## Outfits (6)

| ID | Look | Visual direction |
|---|---|---|
| `party-sapphire` | Formal party dress | Deep sapphire/teal satin, elegant gold embroidery; the distinctive celebratory option. |
| `professor-tweed` | Professor | Brown tweed jacket, olive knit vest, ivory blouse; thoughtful academic, not costume-like. |
| `official-dark` | Formal state suit | Tidy, restrained dark navy/black tailoring and ivory blouse; classic official appearance. |
| `kunasai-patriotic` | Patriotic | Vivid emerald, ivory, and gold with crisp color blocks, sash, and correctly drawn Kunasai flag pin. |
| `business-slate` | Businesswoman | Contemporary slate/blue-gray tailored suit, clean modern silhouette, refined blouse; distinct from the classic state suit. |
| `revolutionary-red` | Revolutionary | Practical charcoal high-collar jacket, vivid red blouse, and restrained red armband/star pin; contemporary and austere, with no real-world party insignia. |

Keep every garment credible for a senior public figure. Redraw it for each pose so lapels, sleeves, cuffs, folds, hands, and accessories fit naturally.

## Hairstyles (4)

| ID | Look | Visual direction |
|---|---|---|
| `shoulder-waves` | Natural waves | Lara's current shoulder-length dark waves; baseline. |
| `low-bun` | Low gathered bun | Neat, softly twisted bun with a few loose face-framing waves. |
| `layered-bob` | Layered bob | Chin-to-jaw length, side-parted, softly voluminous. |
| `half-up-waves` | Half-up waves | Keep the length and natural texture, pin back the temples with a subtle clasp; distinct from loose waves and the bun. |

## Paired pose and expression choices (7)

Use five body silhouettes. The neutral/austere pair shares the composed hands-clasped pose; skeptical/intellectual share the hand-at-chin pose. The face acting distinguishes each pair. This avoids multiplying a separate pose selector by a separate expression selector.

| ID | Sentiment | Pose and expression |
|---|---|---|
| `neutral` | Neutral | Hands lightly clasped at waist, relaxed shoulders, steady open gaze, mouth at rest. Default portrait. |
| `compassionate` | Compassionate | One hand over the upper chest, softened eyes, small sincere smile; warm without becoming sentimental. |
| `severe` | Severe | Arms folded naturally, firm direct gaze, set jaw; resolute, not angry or aggressive. |
| `austere` | Austere | Same hands-clasped silhouette as neutral, but more upright and reserved, with a restrained mouth and less warmth in the gaze. |
| `skeptical` | Skeptical | Hand lightly at chin, small head tilt, subtly raised brow, assessing gaze; no comic exaggeration. |
| `intellectual` | Intellectual | Same hand-at-chin silhouette as skeptical, with a reflective gaze slightly off-camera and curious, thoughtful brows rather than doubt. |
| `concentrated` | Concentrated | Hands joined with slight purposeful tension, shoulders attentive, focused gaze and softly drawn brows; engaged rather than stern. |

Keep camera, head scale, eye line, light, and waist-up crop consistent across all 168 portraits. Within a paired silhouette, change expression without changing the hands or camera. Across different choices, keep the face recognizably Lara.

## Pre-rendered asset contract

Store one flattened transparent portrait per combination under:

```text
public/portraits/lara/combinations/<outfit-id>/<hair-id>/<mood-id>.png
```

For example:

```text
public/portraits/lara/combinations/kunasai-patriotic/shoulder-waves/compassionate.png
```

The complete catalog contains exactly 168 named files. Preserve the current `public/portraits/lara-standing.png` as the fallback for scenes and consumers that do not use customization. Do not substitute a near match, stretch art at runtime, or change other selected fields when a portrait is missing; log the missing ID and use the fallback.

Store current selection as cosmetic player state:

```json
{
  "outfit": "official-dark",
  "hair": "shoulder-waves",
  "demeanor": "neutral"
}
```

Resolve the portrait deterministically from those three IDs. Each selector's previous/next control updates only its own ID and re-resolves the complete image. Scene-authored pose overrides may be used for story presentation, but must not overwrite the player's saved cosmetic selection.

## Review and quality gates

1. Review a complete 168-image contact sheet before the catalog is integrated into the live portrait resolver.
2. Compare every choice at the same canvas dimensions and crop. Check Lara's identity, style, proportions, light, and alpha edges.
3. For every mood, compare all six outfits and four hairstyles. Reject accidental changes to the intended pose, expression, Kunasai pin, or framing.
4. Confirm the sun disk is centered behind the white wave on every patriotic pin; check the sash and pin remain legible at game display size.
5. Check assets at native size and at the dialogue portrait size. Verify right-slot mirroring is disabled for Lara's patriotic/asymmetric details.
6. Confirm the UI updates one selection at a time, preserves the other two IDs, handles keyboard input, and falls back cleanly when an asset is absent.
7. Keep all 168 files as one catalog change. Do not describe a partial set as complete or replace the existing portrait masters until the review passes and the user approves the catalog.

## UI/UX and scene-art handoff

- The customization screen should present three clear selectors-outfit, hairstyle, and pose/expression-with one complete portrait preview. A change to one selector leaves the other two visible selections fixed. Arrows/carousels should allow players to browse without moving through all 168 portraits as one flat list.
- Lara is usually offscreen in play. For the presidential office art plan, include a small physical framed portrait of Lara on her own desk. Make it a plausible formal portrait in an understated frame, visible as a warm environmental detail rather than a joke or a prominent hero shot. Use the approved Lara identity and established art style.
- Keep the customization portrait catalog separate from the desk prop. The framed desk portrait is a scene asset and should not change when the player edits Lara's appearance unless a later implementation deliberately supports that link.

## Current coverage

The seven latest mood portraits establish the intended Kunasai-patriotic outfit, shoulder-waves hair, and paired pose/expression direction. Earlier outfit and hairstyle studies establish the other option designs. These are references, not the 168 final combination files. The combination catalog and UI resolver remain unfinished until the complete set and review sheet are present.

