# Working agreement for AI collaborators

Two AI collaborators work on this repository with the author. They talk to each other **through the repository**.
Read this file first, then `docs/collab/BOARD.md` and the newest entries in `docs/collab/LOG.md`.

| Who | Role | Owns |
|---|---|---|
| **Author** (belzuncessousa-rgb) | Final say on story, art and design. Approves anything marked *needs author*. | `docs/DECISIONS.md` (author decisions), story canon |
| **ChatGPT** — art & graphic design lead | Generates and selects art, writes art direction, makes visual design calls (palette, type, composition, iconography, mood), specifies how a screen should *look*. Reviews Claude's UI work against the art direction. | `docs/ART-UI-CANON.md`, `docs/art-candidates/`, `docs/design/` specs, art files in `public/` (backgrounds, portraits, identity, map art, tokens, audio) |
| **Claude** — UI/UX engineering lead | Implements screens and interactions in code, keeps the build and tests green, integrates delivered art, raises UX problems, writes art requests with exact technical specs. | `src/`, `tests/`, `tools/`, `index.html`, build config |

Ownership means "edits by default". Either collaborator may touch anything, but when you change a file the other owns,
say so in the LOG entry for that commit.

## The loop

1. `git pull --rebase origin main` before you start and again right before you push.
2. Read the BOARD and LOG entries since your last visit. Answer anything addressed to you.
3. **Claim** a task: set its status to `doing` and the owner to you in `BOARD.md`, commit, push. One small commit; this
   tells the other collaborator what you are working on.
4. Do the work in small commits. Push often. Never leave `main` with a failing `npm test` or `npm run build`.
5. When done: set the task to `review` (if the other collaborator or the author should look) or `done`, and add a
   LOG entry: what changed, where to look (paths, screenshots), what you need from the other side.
6. New work you discover goes on the BOARD as a new task with the right owner. Don't do the other role's work silently;
   file a request instead.

## Commit conventions

- Prefix the subject with the author: `[claude] …`, `[chatgpt] …`, `[author] …`. The other side scans `git log` for this.
- Never force-push, rebase published commits, or rewrite history on `main`.
- If a pull brings conflicts in `BOARD.md` or `LOG.md`, keep **both** sides' lines.
- Keep binary art out of commits that also change code, so either side can revert one without the other.

## Handoffs

**Art request (Claude → ChatGPT).** A BOARD task tagged `art` with: target path, format, pixel size, alpha yes/no,
where it appears on screen (screenshot), what must line up with code (e.g. "glass opening must be at x 2.4–67.6 %"),
and the art-direction constraints that apply. ChatGPT delivers to that exact path (or a `-candidate` path when it needs
approval), updates the task, and Claude integrates.

**Design spec (ChatGPT → Claude).** A BOARD task tagged `ui` that points to a spec in `docs/design/<screen>.md`
(mock-up image welcome): layout, hierarchy, colors/tokens, type, states (hover, focus, disabled, selected), compact
layout. Claude implements, posts before/after screenshots in `docs/screenshots/`, and moves the task to `review`.

**Review.** Leave review notes as a LOG entry addressed to the other collaborator, referencing the task id.
Small fixes can be made directly; say so.

## Hard rules (from the author, see `docs/DECISIONS.md` and `docs/ART-UI-CANON.md`)

- Art: cinematic painterly realism, no animated character art. Palette `#173F35` emerald, `#326554`, `#B99A60` brass,
  `#F0EBDD` ivory, `#392B24`. Source Serif 4 + Inter. Red only for crises / harmful outcomes.
- No generic rectangular focus or selection outlines; focus/hover/selected/disabled must stay visually distinct.
- Equal lighting for all characters on stage; never dim or brighten the active speaker.
- No numbers after dialogue choices; locked options hidden; always return to the map between scenes.
- Story content, scene IDs and state effects belong to the narrative track — UI/art work must not change them.
- Record each new author decision in `docs/DECISIONS.md` (author-confirmed only) and each art-direction change in
  `docs/ART-UI-CANON.md`.

## Commands

```bash
npm ci
npm test            # must pass before every push that touches code or content
npm run build
node tools/check-art.mjs   # checks referenced art exists and PNG masters keep alpha
```
