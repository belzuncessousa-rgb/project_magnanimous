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

⚙️ Tutorial (round 2). Amanda Troes explains the interface with `[highlight: …]` tokens placed on narration lines (the highlight shows while that block is displayed). Sets `tutorial_done`; the engine shows choice costs only after it. The player can skip after the first beat.
⚙️ Amanda is introduced here properly (STYLE-GUIDE §3); p1-first-night builds on it.

## opening

Your office is on the first floor of the palace, with a view of Plateau Square. Workers are already taking down the stage from this morning.

Amanda Troes is waiting at a small table by the window with a laptop and a grey notebook. She is your personal secretary. She manages your diary, your correspondence and the briefings that reach your desk, and she will be with you at most meetings. She is the same age as you. You met at law school and shared a flat for three years. She has no party and has never wanted one. She has short grey hair and reading glasses on a cord.

> **Amanda Troes:** "Ten minutes. Livia's people have set up the system the way they set it up for every president. I'd like you to know how it works before they start using it on you."

1. **"Go ahead."** `→ map`
2. **"I know how a diary works, Amanda. Skip it."** `→ skip`

## map | The Map

> **Amanda Troes:** "Everything you have to deal with appears on this map of the country."

The screen shows Kunasai and its neighbours. `[highlight: map]`

> **Amanda Troes:** "There are two views. One shows the land: rivers, forests, cities. The other shows the political map: the five regions and the countries around us. You can switch between them here."

`[highlight: map-toggle]` The button switches between the terrain view and the political view.

> **Amanda Troes:** "Click a region or a country and you'll get a summary of how things stand there."

1. **"Go on."**

## markers | Markers and Readables

> **Amanda Troes:** "Each marker is a meeting, a visit or an event that needs you. They sit where the thing happens: a briefing here in the capital, a visit to Sugar Bay, a problem on a river in Ibira."

`[highlight: markers]` Markers show the main interactions of the current period. You can take them in any order.

> **Amanda Troes:** "Some of them you must do before the period ends. Others are optional, and some will go away if you leave them."

`[highlight: agenda]` The agenda lists what is waiting for you this period.

> **Amanda Troes:** "The small pins are things to read: how a city reacted, a note from a foreign government, a report from a ministry. Nothing to decide. But they tell you what people think, and I'd read them."

`[highlight: readables]` Readables are short documents. They never cost anything.

1. **"Go on."**

## resources | What You Have to Spend

> **Amanda Troes:** "Now the part that matters. Up here is what you have to work with."

`[highlight: hud]` The top bar shows your resources, your approval and the date.

`[highlight: hud-pt]` Presidential Time (PT) is your own time and energy: visits, rallies, extra meetings, personal attention to a problem. You get it fresh each period and it does not carry over. You get more when the country is calmer and you are more popular.

> **Amanda Troes:** "This is the one I'll be watching. You only have so many days."

`[highlight: hud-fc]` Financial Capital (FC) is money the government can actually use, after salaries, pensions and debt interest are paid. Unspent FC is kept for later periods.

`[highlight: hud-ipi]` Internal Political Influence (IPI) is your leverage at home: in Congress, in the cabinet and with institutions. It comes mostly from how loyal and capable your ministers and allies are. Half of it carries over to the next period.

`[highlight: hud-epi]` External Political Influence (EPI) is your leverage abroad. It depends on your relations with other countries, weighted by how important they are. Half of it carries over.

`[highlight: hud-approval]` Approval is the share of people who approve of you, averaged across the regions by population. Each region also has its own approval, stability and living conditions, which you can see on the map.

> **Amanda Troes:** "Some choices will cost one of these. From now on you'll see the cost before you choose."

1. **"Go on."**

## actions | Actions and the Calendar

`[highlight: actions]` The actions panel lists things you can do at any time in a period, for a cost: give a speech in a region, call a minister in, visit a project, give an interview.

> **Amanda Troes:** "Actions are how you use your time between the big meetings. Nobody will ask you to do them. That's why they're easy to forget."

`[highlight: hud-date]` The date shows where you are. Periods are irregular: sometimes a week, sometimes several months.

`[highlight: end-turn]` When you have done what you need to, end the period here. The country moves on, the newspapers come out, and the next period begins.

> **Amanda Troes:** "That's all of it. The rest you'll learn by doing, which is how you learned everything else."

1. **"Thank you, Amanda."** `[flag: tutorial_done = true]` `[flag: seen_tutorial = true]`
   ↳ She closes the laptop and opens the notebook.
   ↳ > **Amanda Troes:** "I'll see you at the Residence tonight. You should eat something before then."

→ END

## skip

> **Amanda Troes:** "All right. Two things, then. The bar at the top shows what you can spend: time, money, influence at home and abroad. And the markers on the map are what needs you. The rest you'll work out."

`[highlight: hud]` Your resources and approval are in the top bar.

`[highlight: markers]` Each marker on the map is a meeting, a visit or an event.

1. **"Thank you."** `[flag: tutorial_done = true]` `[flag: seen_tutorial = true]`
   ↳ > **Amanda Troes:** "I'll see you at the Residence tonight."

→ END
