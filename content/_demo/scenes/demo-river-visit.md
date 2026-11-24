---
id: demo-river-visit
chapter: 1
turn: 1
title: "[Demo] Visit the river towns"
kind: conditional
location: ibira
---

## start

[DEMO SCENE] An optional visit. The river towns of Ibira have not seen a president in eleven years.

1. **Walk the market without guards** `[cost: 1 PT]` `[approval +4 @ ibira]` `[armed_forces opinion -1]`
   ↳ People stare, then come closer.
2. **Promise a clinic** `[cost: 1 FC]` `[col +1 @ ibira]` `[news: canopy demo-canopy-clinic]`
   ↳ The mayor writes it down twice.
3. **Stay in the car** `[lock if: !flag.demo_ignored_cartels]`
   ↳ You watch the town through tinted glass.
4. **Leave it for another day** `→ END`
