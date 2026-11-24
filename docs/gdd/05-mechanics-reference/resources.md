<!-- notion: https://app.notion.com/p/36b10ad0215880ccb306e4ca3499e429 | last edited: 2026-05-25T14:24:06.598Z -->
# Resources

## Political Time (PT)

Represents the president's direct attention and executive capacity.<br />Spent on actions where the bottleneck is the president — their time, focus, coordination.

```txt
AvgApproval  = Population-weighted average of Popular Approval across regions
AvgStability = Population-weighted average of Stability across regions

PT = floor( (AvgApproval + AvgStability) / 2 / 10 )
PT = clamp(PT, 2, 8)
```

<b>Narrative bands:</b>

```txt
PT 2–3   Crisis governance. Reactive only.
PT 4–5   Normal function.
PT 6–7   Political momentum. Reforms achievable.
PT 8     Full mandate. Constitutional changes possible.
```

Carryover: <b>0%</b> — use it or lose it.

---

### Financial Capital (FC)

```txt
NationalOutput = Σ( Economic Output across all regions )
NationalTrade  = Σ( Trade Volume across all foreign countries )

TaxRevenue = NationalOutput * domestic_tax_rate
           + NationalTrade  * trade_tax_rate

BaseCost   = Population_total_M * per_capita_cost
             (per_capita_cost reduced by Infrastructure investments)

RawFC      = TaxRevenue − BaseCost

FC_units   = clamp( floor(RawFC / FC_bracket), 1, 10 )
FC_bracket = tuning constant set at game design time
```

Carryover: <b>100%</b> — accumulates between phases.

---

### Internal Political Influence (IPI)

Represents leverage over congress, institutions, and individuals.<br />Spent on actions where the bottleneck is domestic actors — votes, approvals, swaying.

```txt
CharacterPI_i = normalize(Loyalty_i) * normalize(CapacityToAct_i)

  normalize(Loyalty)       = (Loyalty + 10) / 20     → [0.0, 1.0]
  normalize(CapacityToAct) = CapacityToAct / 100      → [0.0, 1.0]

IPI = clamp( floor( Σ(CharacterPI_i) / n_characters * 10 ), 1, 8 )
```

A censored loyalist (Loyalty +8, Capacity 15) contributes 0.9 × 0.15 = 0.135.<br />A capable enemy (Loyalty −6, Capacity 90) contributes 0.2 × 0.9 = 0.18.

Carryover: <b>50%</b> — networks need maintenance.

---

### External Political Influence (EPI)

Represents leverage in the international arena.<br />Spent on actions where the bottleneck is foreign actors.

```txt
CountryEPI_j = normalize(DiplRel_j) * (EconomicWeight_j / 100)

  normalize(DiplRel) = (DiplRel + 10) / 20     → [0.0, 1.0]

EPI = clamp( floor( Σ(CountryEPI_j) / n_countries * 10 ), 1, 8 )
```

Powerful countries contribute more EPI. Hostile powerful countries drag EPI down significantly.

Carryover: <b>50%</b> — relationships decay without maintenance.
