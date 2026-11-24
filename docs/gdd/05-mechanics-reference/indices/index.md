<!-- notion: https://app.notion.com/p/36b10ad0215880a596b4d38a12f5b448 | last edited: 2026-05-25T21:25:29.363Z -->
# Indices

Indices values are carried through the game and may move due to decisions and events. At the end of every turn, indices with [Rest Values](rest-values.md) move towards it, following formulas on the Rest Values page.

### Regional Indices <i>(per region)</i>

| Index | Scale | Type | Visible |
| --- | --- | --- | --- |
| Popular Approval | 0–100 | Formula-driven RV | Yes |
| Stability | 0–100 | Formula-driven RV | Yes |
| Economic Output | \$(/month) value | Formula-driven RV | Yes |
| Education | 0–100 | Decision/event only | Yes |
| Infrastructure | 0–100 | Decision/event only, no drift | Yes |
| Population | millions | Very slow, event/investment driven | Yes |
| Conditions of living | 0-100 | Formula-driven and events/decisions, no natural drift. This index changes automatically with it’s Rest Value formula. | Yes |

### Foreign and Own Country Indices

<b>Relational</b> (bilateral, player-driven, only for foreign nations):

| Index | Scale | Type | Visibility |
| --- | --- | --- | --- |
| Diplomatic Relation | −10 to +10 | Formula-driven and events/decisions, no natural drift. This index changes automatically with it’s Rest Value formula. | Only general (Rival -10 /Terrible -10 - -7/Bad -7 - -4/Cold -4 - -1/Professional -1 - 2/Good 2 - 5/ Cooperation 5 - 9/Full support 9 - 10) |
| Trade Volume | \$ value | Compounding formula | Yes |
| Cultural Influence | -10 to 10 | Derived from Cultural power comparison (Foreign - Own)/10 | No |
| Aggressiveness | −10 to +10 | Formula-driven RV, player-influenceable | No |

<b>Structural</b> (intrinsic character of the country, slow-moving):

| Index | Scale | Type | Visibility |
| --- | --- | --- | --- |
| Military Prowess | 0–100 | Event/decision only | Only general (weak \<10 /questionable 10-35/stabilished 35-65/respectable 65 - 80/ powerful 80 - 95/global power 95 - 100) |
| National GDP | \$ value | Event/decision only. For own nation follows the Own National GDP formula described in Rest Values page | Yes |
| Cultural Power | 0 - 100 | Decision/event only | Yes |

### Character Indices <i>(per character)</i>

| Index | Scale | Type |
| --- | --- | --- |
| Personal Loyalty | −10 to +10 | Formula-driven RV (compass-based) + event |
| Suspicion | 0–100 | Event only, no RV |
| Capacity to Act | 0–100 | Formula-driven RV |
| Base | Category | Name of the region or country the character is based |

## 

- 📄 [Rest Values](rest-values.md)
