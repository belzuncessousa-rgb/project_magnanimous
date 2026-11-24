<!-- notion: https://app.notion.com/p/36b10ad0215880b1893fe6bdbe3e727b | last edited: 2026-05-26T04:48:03.233Z -->
# Reward tree

## REWARD TREE — STRUCTURE

<i>Specific nodes defined after story is written.</i>

### Design Principle

Reward tree nodes are things the player can <b>see coming and work toward</b> — visible targets rewarding sustained narrative investment. They are not events (which happen <i>to</i> the player). The tree is a story commitment device: it shows players what kinds of rulers they can become.

<b>Good fit for reward tree:</b> character relationship payoffs, foreign policy landmarks, ideological consolidation, coalition formation, regional development milestones.

<b>Belongs in events instead:</b> crisis recovery, unexpected betrayals, foreign incidents, economic shocks.

### Node Structure Format

```txt
NODE STRUCTURE

  id:           internal reference
  label:        player-visible name (evocative, not mechanical)
  visibility:   always_visible / unlocks_when_condition / hidden_until_adjacent

  trigger:
    index conditions:   e.g. Character X Loyalty ≥ +7
    flag conditions:    e.g. flag[met_character_x] = true
    compass conditions: e.g. player Economic ≤ −3  (optional)
    resource cost:      PT / IPI / EPI to activate once conditions met

  type:
    relationship_scene   — private conversation, revelation, or commitment
    policy_unlock        — new action category becomes available
    narrative_branch     — modifies how a future event plays out
    persistent_modifier  — changes an index formula or decay rate

  scene_premise:   2–3 sentences (designer reference, not shown to player)
  player_payoff:   what the player concretely gains
  locks:           nodes that become unavailable after this one
  unlocks:         nodes that become visible/accessible after this one
```

The tree is a <b>directed graph</b> — nodes open and close paths. Taking one relationship to its conclusion may foreclose another.

## Structure later:

- Anti-nuclear missiles
