<!-- notion: https://app.notion.com/p/36a10ad0215881559645c2bd04c56ce1 | last edited: 2026-06-03T20:22:04.332Z -->
# 6. Scenes

## Scene Formatting Convention

This is the authoring standard for every scene script. The model: <b>four prose styles + two structural conventions + one mechanics syntax.</b> Notion cannot set a different font per block (typeface is a whole-page setting), so the script uses italics / quotes / blockquote / inline-code as stand-ins. The doc encodes the <i>semantic role</i>; the engine maps each role to its final in-game typography.

### The four prose styles

| Role | What it is | Notion markup (in script) | In-game intent |
| --- | --- | --- | --- |
| <b>Narration</b> | The world, actions, events. Second person, present tense. | Plain body text. | Default body font. |
| <b>Thought</b> | Lara's private interior voice — reasoning, doubt, memory. Not heard by anyone. | <i>Italic, no quotation marks.</i> | Italic / distinct "interior" font. |
| <b>Speech</b> | Anything said aloud, by Lara or an NPC. | Blockquote (\&gt;). NPC lines prefixed with <b>Name:</b> in bold. Short inline lines may use "quotes" within narration. | Dialogue font, visually set apart. |
| <b>Mechanics annotation</b> | Author/dev notes: effects, flags, costs, connections. Never fiction. | Inline <code>code</code> tokens; ⚙️ callout for multi-line logic. | Invisible to player (per invisible-mechanics pillar) unless explicitly surfaced. |

### The two structural conventions

<b>Player option (the clickable label).</b> A numbered list item. The label itself is <b>bold</b>, kept to roughly one line, and styled by what it <i>is</i> — a spoken option carries "quotes", an internal-stance option does not. Mechanics tokens sit on the same line, after the label.

<b>Accompanying text (the branch result).</b> The prose that plays <i>after</i> an option is chosen. Nested (indented) beneath its option, marked with a <code>↳</code> leader. It inherits whichever prose style it is — usually Speech (the expansion of a spoken line) or Narration (the consequence of an action).

### The mechanics syntax

All mechanics live in inline <code>code</code> using square-bracket tokens, so they are visually unmistakable and easy to grep:

- Compass: <code>[+2 ECON]</code> <code>[-2 IDEN]</code> <code>[0 FORCE]</code> — axes: ECON, WELF, IDEN, FORCE, STRUCT, RELIG
- Regional index: <code>[approval +5 @ Ibicuí]</code> <code>[CoL +1 @ all]</code> <code>[stability -3 @ Mognagna]</code>
- National index: <code>[stability +3 @ national]</code>
- Faction / character: <code>[OPP capacity -2]</code> <code>[Mertens opinion +5]</code>
- Flag: <code>[flag: promised_CoL = true]</code>
- Cost: <code>[cost: 2 capital]</code>
- Option visibility (hidden unless met): <code>[show if: fontes_fiscal_pact]</code> <code>[show if: promised_GDP & !named_cartels]</code>
- Option visible but locked (shown greyed, with reason): <code>[lock if: !met_dara]</code> — use when seeing the <i>unavailable</i> choice is itself meaningful; otherwise prefer <code>[show if: ]</code>
- Outcome / branch gate (on effects or accompanying text, not the option itself): <code>[if: named_cartels]</code>
- Requirement on an action: <code>[req flag: fontes_fiscal_pact]</code> <code>[req: 2 capital]</code>
- Connection / transition: <code>→ P1-S2</code> (use a ⚙️ callout for branching logic more complex than a single arrow)

Flag expressions use <code>&</code> (and), <code>|</code> (or), <code>!</code> (not). Flag names are snake\_case. <b>Design note:</b> <code>show if</code> <i>hides</i> a choice the player never knows existed; <code>lock if</code> <i>reveals</i> a road not taken. Pick deliberately — a hidden option is cleaner, a locked one is a storytelling device.

### Worked example (all elements together)

The Blue Room is colder than you expected. The cabinet you fought to assemble is already seated, and every one of them is watching how you walk in.

<i>You wonder if Fontes already knows what you are about to ask of her.</i>

> <b>Mirela Fontes:</b> "Madam President. I assume you did not call me here to admire the curtains."

1. <b>"I want the fiscal pact on my desk by Friday."</b> <code>[+1 STRUCT]</code> <code>[flag: fontes_fiscal_pact = true]</code> <code>[Fontes opinion -3]</code>
   - <code>↳</code> > She does not blink. "Friday," she repeats, as if testing whether the word will hold weight.
2. <b>"Tell me what you think we can actually afford."</b> <code>[0 STRUCT]</code> <code>[Fontes opinion +2]</code>
   - <code>↳</code> > "Honesty. Good." She opens the folder she brought without being asked.

⚙️ <b>Connection:</b> <code>→ P1-S2 Beat 2</code> once all three minister confirmations resolve.

---

## Scene Inventory Database

Every scene in the game has a row in the Scene Inventory database — period, type, characters involved, status, and a link to the scene script.

→ Scene Inventory is tracked as a database in the Archive workspace.

---

## Period Overview

| Period | Name | Dramatic question |
| --- | --- | --- |
| <b>P1</b> | Inauguration | Who will you be? First choices define the compass. |
| <b>P2</b> | First Budget | Can you govern? Fiscal reality meets political promises. |
| <b>P3</b> | Midterm Crisis | Can you survive? A crisis threatens the mandate. |
| <b>P4</b> | Consolidation | What did you build? Second-term pivot or steady hand. |
| <b>P5</b> | Second Term | What will you sacrifice? Accumulated costs come due. |
| <b>P6</b> | Legacy | What remains? The ending is delivered. |

---

## Subpages (per period)

- <b>P1 — Inauguration</b> — 7 scenes: inaugural address, cabinet formation, first votes
- <b>P2 — First Budget</b> — scenes TBD in review
- <b>P3 — Midterm Crisis</b> — scenes TBD in review
- <b>P4 — Consolidation</b> — scenes TBD in review
- <b>P5 — Second Term</b> — scenes TBD in review
- <b>P6 — Legacy</b> — scenes TBD in review

- 📄 [P1 — Opening the curtain](p1-opening-the-curtain/index.md)

- 📄 [P2 — A Herculean Task](p2-a-herculean-task.md)

- 📄 [P3 — Burdens of Leadership](p3-burdens-of-leadership.md)

- 📄 [P4 — Eye of the Storm](p4-eye-of-the-storm.md)

- 📄 [P5 — Tightening the strings](p5-tightening-the-strings.md)

- 📄 [P6 — Wheights of Legacy](p6-wheights-of-legacy.md)
