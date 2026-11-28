# C-35 — Tutorial targets for the current desk UI

## Goal

Make the existing tutorial highlight API point at real, current interface controls and add a stable target for the physical tablet. This is UI wiring only. Keep tutorial prose, beats, flags, scene IDs and game rules unchanged.

## Evidence from main

The current `p1-tutorial` content emits highlights for `map`, `map-toggle`, `markers`, `agenda`, `readables`, `hud`, `hud-pt`, `hud-fc`, `hud-ipi`, `hud-epi`, `hud-approval`, `actions`, `hud-date` and `end-turn`.

The active DOM currently exposes `data-ui` targets for `map`, `markers`, `readables` and `actions`. The highlights for the HUD and its values, date, and End Turn have no matching elements. The physical tablet (`.map-tablet`) is clickable but not targetable through `data-ui`.

## Direction

- Add stable `data-ui` hooks to existing live UI only: the HUD group, each actual resource/approval value, date, End Turn control and the resting physical tablet.
- Keep existing target IDs stable. Make each new target highlight the smallest useful visual region without covering neighboring HUD values or the tablet's real screen.
- Use the existing highlight treatment and preserve the current no-rectangle visual rule, keyboard access and pointer behavior.
- Do not add a tutorial step, change content, create a fake control, or change mechanics.
- The old scene requests `agenda` and `map-toggle`; neither exists in the current approved desk UI. Do not recreate them. Leave these content references for the narrative track to reconcile when it revises the tutorial.

## Review

Capture the tutorial at 1600×900 and 1280×800 with the HUD, each resource step, date, End Turn and tablet highlighted. Confirm the marker/readable/map/Actions highlights still work, and that highlighting does not obscure the target or create a rectangular outline.
