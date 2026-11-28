# C-38 — Publication avatars in the Social timeline

## Goal

Replace generic two-letter initials with recognizable publication marks while keeping Social a content-safe, short-post timeline.

## Art delivered

Five circular SVG marks are installed at `public/tablet/press-avatars/{ledger,clarion,voice,dispatch,canopy}.svg`. They use the existing outlet color family and have distinct editorial symbols. The marks identify publications, not invented people.

## Direction

- Render the mark matching each edition paper's existing `paper.id` in the current Social post avatar.
- Keep a graceful initials fallback if an image fails to load. Give the decorative image an empty alt / hide it from assistive technology; the publication name remains the accessible identity.
- Preserve the current dark, vertical, unboxed short-post timeline, article text, date, and “Read in the paper” route. Do not add account holders, posts, photos, reactions, metrics, or controls that are not authored in the edition.
- Do not alter News or narrative content.

## Review

Verify all five outlet marks using an edition that contains every outlet. Check at 1600×900, 1280×800 and 390×844: the avatar and publication name should read together, rows remain clear without card borders, and keyboard and screen-reader behavior remains intact.
