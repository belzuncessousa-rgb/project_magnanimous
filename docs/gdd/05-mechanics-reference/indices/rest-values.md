<!-- notion: https://app.notion.com/p/36b10ad02158801f8388f125bba5a448 | last edited: 2026-05-25T21:26:03.735Z -->
# Rest Values

Every formula-driven index has:

- <b>Rest Value (RV)</b> — the equilibrium the index drifts toward each turn. A formula of other indices and accumulated flags. The index moves toward RV by its drift rate each turn.
- <b>Shock Delta (SD)</b> — an immediate ±change applied when a decision is made. Can also modify the RV formula itself (e.g. a flag that raises the RV floor permanently).

```txt
turn update:
  if current < RV:  current += drift_rate
  if current > RV:  current -= drift_rate
  then apply any SD from this turn's decisions
```

### Drift Rates

| Index | Drift Rate | Feel |
| --- | --- | --- |
| Popular Approval | 1 / turn | Reactive, volatile |
| Stability | 0.6 / turn | Slow to build, slow to collapse |
| Aggressiveness | 0.6 / turn | Resistive but shiftable |
| Personal Loyalty | 0.6 / turn | Buildable trust, fast shifts only via SD |
| Capacity to Act | 1 / turn | Structural position |
| Diplomatic Relation | no drift | Only events and formula |
| Infrastructure | no drift | Stock variable, build/destroy only |
| Education | 0.4 / turn | Decision/event only |

### Delta Magnitude Guidelines

| Weight | Typical Δ | Examples |
| --- | --- | --- |
| Trace | ±1–2 | Relationship indices only (Loyalty, DiplRel, Suspicion). Fine-grained drift from side effects, secondary reactions, or indirect signals. Not valid for 0–100 system indices. |
| Minor | ±3–6 | Symbolic gesture, minor speech |
| Moderate | ±7–12 | Signed agreement, regional visit, minor law |
| Major | ±13–20 | War declaration, major economic reform, arrest |
| Crisis | ±21–30 | Only from critical events; triggers narrative beat |

---

## REST VALUE FORMULAS

### Regional Indices

<b>Popular Approval</b>

```txt
RV = Base + Events
   + 0.4 * Stability
   + 0.6 * Δ(Output/Population)%

Note: Δ(Output/Population) is the % change in per-capita output since last turn.
      Clamp Δ to [−20, +20] before applying weight.
```

<b>Stability</b>

```txt
RV = Base + Events
   + 0.5 * Approval
   − pop_sensitivity * Population(M)

pop_sensitivity:  default 0.5
                  range [0.2, 1.0]
                  modified by events and infrastructure investments
                  0.2 = well-governed, high-infrastructure
                  1.0 = neglected, high inequality
```

<b>Economic Output</b>

```txt
Potential = Base * (1 + Education/100) * (1 + log(Population_M)/10)

RV = Potential * (Infrastructure + Stability) / 200 + Events

- Education adds up to +100% to base potential at Education 100
- log(Population_M)/10 provides diminishing returns from population
- (Infrastructure + Stability)/200 is the efficiency multiplier [0, 1.0]
```

<b>Education</b> — event/decision only. No RV formula.

<b>Infrastructure</b> — event/decision only. No RV or drift.

<b>Population</b> — event/investment driven. Feeds into Output and Stability formulas.

Condition of Living

CoL = (Education × 0.35) + (Infrastructure × 0.30) + (Economic Output per capita × 0.25) + (Stability × 0.10)

### Foreign Country Indices

<b>Diplomatic Relation</b>

```txt
RV = Base + Events + (TradeVolume / TheirGDP) * 10

No natural drift. Only moves via events, decisions, and trade relationship.
TheirGDP = their Economic Weight as a $ proxy.
```

<b>Trade Volume</b>

```txt
TV(t) = max(
          TV_floor,
          TV(t-1) * (1.001)^(1 + DiplRel/100 + |CulturalInfluence|/10 + Education/1000)
        ) + Events

TV_floor = small non-zero constant (irreducible informal trade)
embargo flag = true → bypasses formula entirely, locks TV to 0
               lifting embargo requires a specific diplomatic event

Note: |CulturalInfluence| — cultural familiarity in either direction lubricates trade.
      Education/1000 is intentionally small — long-run compounding advantage.
```

<b>Cultural Influence</b> <i>(on foreign countries)</i>

```txt
CI_drift = (YourCulturalPower − TheirCulturalPower) / 100  per phase

Dominant cultures naturally spread without player action.
Drift rate: 1/phase toward this value.
```

<b>Aggressiveness</b>

```txt
RV = Base + Events
     (player-influenceable via covert ops, military posture, diplomacy)
Drift rate: 2/phase
```

<b>Military Prowess, Economic Weight</b> — event/decision only.

---

### Character Indices

<b>Personal Loyalty</b>

```txt
RV = f(CompassDistance, archetype sensitivity)
     — see Political Compass section below

Drift rate: 3/phase
```

<b>Suspicion</b> — event only. No RV.

<b>Capacity to Act</b>
