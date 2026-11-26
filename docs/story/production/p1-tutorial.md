---
id: p1-tutorial
chapter: 1
turn: 1
title: The Diary
kind: fixed
location: capital
token: personal
order: 4
when: "flag.seen_panorama"
portraits: [amanda]
background: president-office
---

⚙️ Staged narrative/tutorial draft, not yet valid for current turn-based resource implementation. Retain highlights and completion flags, but validate against actual UI and chapter resource model before enabling. Avoid claiming locked features such as personal wealth, exact costs, or fixed-action availability until implemented.

## opening

Your office overlooks Plateau Square. Through the windows you can see workers dismantling the temporary stage erected for the inauguration.

Amanda Troes is waiting at a small table with her laptop open. You have known her since law school, and she is now your personal secretary, responsible for your correspondence, diary and the briefings that reach you.

> **Amanda Troes:** "I know you've had a long day. Can I show you the system they've set up for us?"

She turns the laptop towards you.

> **Amanda Troes:** "I've spent the better part of the afternoon finding out where everything is."

1. **"Go ahead."** `→ map`
2. **"Just give me the essentials."** `→ skip`

## map

> **Amanda Troes:** "This is where we'll keep track of what needs your attention."

The screen shows the country and its neighbours. `[highlight: map]`

`[highlight: map-toggle]` Switch between the terrain and political map views.

> **Amanda Troes:** "You can select a region or a country to see a summary. I've asked the ministries to keep the information up to date as we receive it."

Select a place on the map to examine its available information.

1. **Continue.**

## events

`[highlight: markers]` Markers represent available encounters, meetings and other events. Some are required, some optional. Some become available only after a previous encounter or particular decision.

> **Amanda Troes:** "I'll tell you which meetings we need to get through. There may be others you choose to attend, and sometimes something will come up during the period."

`[highlight: agenda]` Your agenda lists the current events.

`[highlight: readables]` Smaller markers represent reports, messages and other documents. Reading them does not consume resources.

> **Amanda Troes:** "These are worth looking through when you have a moment. You may learn something before a meeting that would otherwise come as a surprise."

1. **Continue.**

## resources

`[highlight: hud]` The top bar shows the resources available to your government.

`[highlight: hud-pt]` Presidential Time (PT) represents the attention Lara can devote to additional activities. Ordinary generation occurs at the start of each chapter. Unspent PT does not carry over.

`[highlight: hud-fc]` Financial Capital (FC) is the government's available money. Unspent funds carry forward.

`[highlight: hud-ipi]` Internal Political Influence (IPI) represents leverage with domestic institutions and political actors.

`[highlight: hud-epi]` External Political Influence (EPI) represents leverage in foreign affairs. Half of unused IPI and EPI carries over to the next chapter under the working resource model.

> **Amanda Troes:** "We'll have a number of things competing for your attention. If you use everything early, some opportunities later in the chapter may have to wait."

`[highlight: hud-approval]` National approval summarizes approval across the regions, weighted by population. Select a region to examine its local conditions.

Explicit costs are shown before committing to an action. Not every conversation has a cost or a numerical effect.

1. **Continue.**

## actions

`[highlight: actions]` The free-actions panel lists additional actions available to the President. Some are repeatable; others are available only during a particular project, event or period.

> **Amanda Troes:** "You can choose where to spend your time outside the scheduled meetings. For instance, if a project is having problems, you might want to visit it yourself."

`[highlight: hud-date]` The calendar indicates the current point in the presidential term. Turns follow the narrative; chapters contain several turns.

`[highlight: end-turn]` Advance when the required encounters and decisions for the current turn are complete. Unresolved optional opportunities may expire. The country changes in response to events and your decisions.

> **Amanda Troes:** "That's the essentials. If we find anything missing, I'll speak to the people responsible for the system."

1. **"Thank you, Amanda."** `[flag: tutorial_done = true]` `[flag: seen_tutorial = true]`
   ↳ > **Amanda Troes:** "I'll see you at the residence later."

→ END

## skip

> **Amanda Troes:** "All right. The markers are the things that need your attention. The agenda shows the meetings, and the bar at the top shows the resources you have available."

`[highlight: markers]` Select an encounter to begin it.

`[highlight: hud]` Review your available resources before taking discretionary actions.

1. **"Thank you."** `[flag: tutorial_done = true]` `[flag: seen_tutorial = true]`

→ END
