# C-36 — Seated portraits large and high

## Goal

Adjust seated dialogue portraits so the visible character fills most of the vertical space in the foreground. The current portraits read too small/low: the visible figure occupies roughly half the scene height.

## Direction

- Judge the opaque person, not the PNG canvas or CSS box. Main currently sets seated master images to `height: 76%` of the portrait silhouette, while standing is `94%`; the near-square seated art is therefore still visibly too small. Raise seated art to about the standing scale (start at `94%`) and keep it bottom-anchored so the added height moves the head up. Adjust only as needed to keep the head clear. Cropping at the lower edge is acceptable; the visible figure should fill most of the scene height.
- Treat the room plate as ambience. Do not anchor the character to furniture in the background. A self-contained chair may be used if the seated pose needs one, but it must travel with that character.
- Preserve the approved portrait identity, costume and lighting. Every participant remains equally lit.
- The right-slot figure must always face inward; do not leave an unmirrored per-character exception. If mirroring damages a pin, lettering, uniform detail or directional lighting, provide a corrected right-facing master (for example, `<id>-seated-right.png`).
- Standing portraits and scene/narrative content stay unchanged.

## Review

Compare Blue Room and VP office seated scenes at 1600×900 and 1280×800. Show the previous and new framing side by side; include the right-slot orientation. Verify that heads are not clipped, faces remain readable, and figures visually fill substantially more than half the scene height.
