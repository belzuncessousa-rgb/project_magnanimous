# Lara Vento: modular portrait and customization plan

**Status:** planning proposal for art and later implementation. This document does not add character canon, mechanics, or approved assets.

## Character anchors from the GDD

Lara is about 50, a lawyer and longtime community organizer from Vila Tamarin. She spent fifteen years building legal-aid offices and tenant committees before becoming a senator and president. She believes what she says, is at ease with ordinary people, and is still learning how to move through elite political rooms. Her three possible paths are hardening, compromising, and holding the line. These are story anchors; her clothes should not reduce any path to a costume or moral label.

The current GDD does not specify her physical appearance. Keep her face and body design consistent across options once approved. The existing portrait system consumes one transparent master image per actor and pose; scene staging currently selects a broad standing or seated pose. Hair, outfit, facial expression, and player-selected presentation are not yet represented in scene metadata.

## Recommendation: modular sources, composed portraits

Do not paint every combination as a separate finished portrait. Even a modest starter set - 4 outfits x 2 hairstyles x 2 poses x 3 expressions - creates 48 combinations. Designing and maintaining 48 full images would be expensive and makes later edits inconsistent.

Instead, make aligned transparent source layers and compose only the selected combination. Keep a small set of complete preview compositions for art review and fallback. Clothing must be prepared for each pose because sleeves, shoulders, and folds change with posture; hair and expression can share fixed alignment if the base head and canvas remain consistent.

### Starter option set

| Dimension | Initial options | Direction |
|---|---|---|
| Hair | Natural shoulder-length waves; practical low-tied style | Keep Lara recognizable; both styles remain polished and plausible for her age and job. |
| Clothing | Everyday; community work; government office; ceremony/state event | Everyday and community clothing should feel cared for and practical, not poverty-coded. Office wear is tailored and durable. Ceremonial wear can use restrained Kunasai colors without turning into a flag costume. |
| Pose | Attentive/listening; addressing a room | Both are standing, waist-up portraits. Keep the posture natural and usable in dialogue scenes. |
| Expression | Composed; warm; resolute | Expressions communicate temperament without changing Lara's underlying identity. A weary option can be added if the story needs it. |

After the story paths are finalized, add optional outfit variants that echo them: sharper structure for hardening, richer materials for compromising, and continuity of practical signature pieces for holding the line. These are player-facing style choices or scene suggestions, never automatic moral indicators.

## Asset construction

Use one approved waist-up body/head base for identity and proportions, with consistent canvas size, lighting, camera angle, and neck/shoulder anchors. Keep the source layers transparent and aligned:

1. Pose/body base, including shoulders, arms, and hands.
2. Back-hair layer.
3. Clothing layer matched to that pose.
4. Base head and expression variant.
5. Front-hair layer and optional accessories.

For the starter set, clothing therefore needs 8 pose-compatible layers (4 outfits x 2 poses). Hair needs two front/back pairs. Expressions need three aligned face variants. Preserve an editable layered source where possible; export transparent PNGs for the game.

Compose a few review examples first: everyday/warm/listening, office/composed/listening, and ceremonial/resolute/addressing. Once those look right, the same source pieces can produce the remaining combinations without redrawing each full portrait.

## Future mechanics and presentation hook

Keep appearance state separate from political path variables. Choosing a hairstyle, outfit, pose, or expression should be cosmetic unless a future design decision explicitly gives an appearance choice a story effect. A path may suggest or unlock a look, but should not silently force it.

Use stable IDs so content and mechanics can refer to options without depending on filenames:

    {
      "hair": "natural-waves",
      "outfit": "community",
      "pose": "listening",
      "expression": "warm"
    }

A future save can store these as Lara's player-selected appearance defaults. Scene presentation can optionally override pose or expression for a particular beat, and specify an occasion such as formal dress while still respecting the player's choices within that dress code. This belongs in presentation metadata, not in the narrative effect system. The current static portrait loader would need a later resolver/compositor; this plan does not implement it.

Proposed source/export layout:

    public/portraits/lara/layers/
      poses/{listening,addressing}/body.png
      hair/{natural-waves,low-tied}/{back,front}.png
      outfits/{everyday,community,office,ceremony}/{listening,addressing}.png
      expressions/{composed,warm,resolute}.png
    public/portraits/lara/composites/   # selected previews and fallback exports

Keep public/portraits/lara-standing.png as the existing fallback until a layered portrait resolver is implemented. Do not create seated Lara art as part of this starter package.
