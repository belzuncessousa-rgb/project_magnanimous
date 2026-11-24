<!-- notion: https://app.notion.com/p/36b10ad021588027bd11fc39ddb11a98 | last edited: 2026-05-25T14:23:01.828Z -->
# Taxation system

## Tax Rates

Two independently settable rates, changed only at specific trigger points or events:

```txt
domestic_tax_rate    applies to National Output    range: 0.05 to 0.60
trade_tax_rate       applies to Trade Volume        range: 0.00 to 0.40
```

<b>Cost to change:</b>

```txt
CHANGE TYPE                          TRIGGER           COST
Minor adjustment (±5% one rate)      Budget phase      1 PT
Major adjustment (±15% one rate)     Budget phase      2 PT + 1 IPI
Emergency fiscal measure             Crisis event      2 PT + 2 IPI + FC cost
Tax reform (restructure both rates)  Special legislation 3 PT + 3 IPI
```

### Tax Effects on Indices

<b>Economic Output RV</b> — private reinvestment from untaxed output:

```txt
private_output = NationalOutput * (1 − domestic_tax_rate)

EconomicOutput RV += private_output * reinvestment_rate

reinvestment_rate = 0.08 + compass_display[Economic] * 0.007
  range: Economic −10 → 0.01  (state crowds out private investment)
         Economic   0 → 0.08  (baseline)
         Economic +10 → 0.15  (market-friendly ceiling)
```

<b>Popular Approval SD</b> at phase start:

```txt
if domestic_tax_rate > 0.45:
  SD = −(domestic_tax_rate − 0.45) * 100 * welfare_sensitivity
if domestic_tax_rate < 0.15:
  SD = −(0.15 − domestic_tax_rate) * 60 * welfare_sensitivity
else:
  SD = 0

welfare_sensitivity: regional variable, higher in collectivist regions
```

<b>Trade Volume RV</b> suppression:

```txt
Trade Volume RV modifier = −TradeVolume * trade_tax_rate * 0.3
```

<b>Diplomatic Relation SD</b> from high trade taxes:

```javascript
if trade_tax_rate > 0.25:
  Diplomatic Relation SD = −(trade_tax_rate − 0.25) * 8   per affected country
```
