---
id: p1-great-project
chapter: 1
turn: 3
title: The First Signature
kind: fixed
location: capital
when: "flag.seen_planning_briefing"
portraits: [mertens, livia, fontes, marne]
background: blue-room-night
---

⚙️ Closing scene of chapter 1 (chapters.json `closing`). The chapter's main decision: the first great project — 1 Rare-earth mining (Ibira) · 4 National Railway Integration · 6 Housing & sanitation (Luz's works, Corvel). Writes `great_project` = 1 / 4 / 6. Projects never fail; follow-ups begin in chapter 2 (contractor, oversight, incidents).
⚙️ Effects are deliberately modest here; the real weight arrives through follow-ups, the Zharan envoy (ch2), combos (1+4 mineral exports; 6+security weakens cartels in the peripheries) and the ch3 pressure meters (6 eases the Ibicuí strikes).

## opening

The Blue Room at night is a different room. The air conditioning has given up. Someone has opened a window, and the sound of the capital comes in — not traffic, because New Veldrania was designed not to have any, but the long hum of a city with too much space between its people.

Four of them are waiting. Mertens at your right. Livia with three identical folders. Fontes with his calculator, its paper roll curled on the table like a sleeping animal. Marne, without his hard hat, which makes him look like someone else's uncle.

> **Livia Harvan:** "Three folders, Madam President. One signature. The press office has three statements drafted. I'd like to know which one to send before the eleven o'clock news, if that's not too much to ask."

→ counsel

## counsel

> **Caio Mertens:** "May I say one thing, as the messenger. Odel has no preference. Odel would only ask that whichever it is, it is built by Kunasaians who know how to build. He has a list of Kunasaians."

> **Alexander Fontes:** "And I'd only ask that whichever it is, it's paid for in a currency we actually have."

> **Tobias Marne:** "And I'd only ask that it isn't nothing. Nothing is the most expensive project of all. Nothing costs you the whole term."

1. **"Alexander. In one sentence, the cost."**
   ↳ > **Alexander Fontes:** "The mine costs the most and pays back the most, eventually, to somebody. The railway costs a great deal for a long time. The works cost the least, because the rest was stolen in advance."
2. **"Livia. In one sentence, the politics."**
   ↳ > **Livia Harvan:** "The mine pleases the Arennians and the Zharani and worries everybody in Ibira. The railway pleases Tapira, which never votes for you. The works please Katanaí, which already did — and remind everyone of Tercilio."
3. **"Tobias. In one sentence, the work."**
   ↳ > **Tobias Marne:** "A hole in a hill, a line across a country, or a pipe up a hill. I can do all three. You can only sign one."
4. **Say nothing, and look at the folders**
   ↳ They let you look. Even Marne. Somewhere in the building a cleaner's radio is playing a love song from the dictatorship years, the kind everybody pretends not to know the words to.

## choice | The Signature

You uncap the pen Livia left at your place on your first day. It has been there, at its slight angle, every day since.

1. **The rare earths of Ibira** `[flag: great_project = 1]` `[flag: project_rare_earths = true]` `[+1 ECON]` `[approval +3 @ ibira]` `[approval +2 @ tekoku]` `[indigenous opinion -2]` `[business opinion +2]` `[cartels suspicion +5]` `[federation relation +1]` `[zharan relation +1]` `[marne loyalty +1]`
   ↳ > **Tobias Marne:** "The Tauá Hills. I'll need a road before I need a mine. And I'll need somebody to talk to the people who live there before the bulldozers do."
   ↳ > **Livia Harvan:** "The Arennian ambassador will ask for a meeting tomorrow. So will the Zharani. They'll both say 'congratulations' and mean 'how much'."
   ↳ > **Alexander Fontes:** "And the Fund will ask who owns the ore. I'd like to have an answer before they do."
   ↳ *Under the hills there is more than ore. There are villages, and rivers, and the Red Tree's barges. You knew that when you signed. You are almost sure you knew it.*
2. **The national railway** `[flag: great_project = 4]` `[flag: project_railway = true]` `[approval +3 @ tapira, mognagna]` `[approval +1 @ tekoku]` `[business opinion +2]` `[cp opinion +1]` `[unions opinion +1]` `[marne loyalty +3]` `[fontes loyalty -1]`
   ↳ Marne stands up, which nobody expects, and then sits down again, embarrassed, which everybody does.
   ↳ > **Tobias Marne:** "Thank you, Madam President. You won't ride it. Your grandchildren will. They'll complain it's late."
   ↳ > **Alexander Fontes:** "It will be late. That's the one forecast I'd stake the Treasury on."
   ↳ > **Livia Harvan:** "Arturo Trembolo will call to thank you. He'll want a station. Possibly two."
   ↳ *Slow. Diffuse. Nobody will thank you for years. That is what you always said you wanted: work that outlasts the applause.*
3. **The sanitation works — finish what Luz started** `[flag: great_project = 6]` `[flag: project_sanitation = true]` `[flag: luz_works_resumed = true]` `[+1 WELF]` `[approval +5 @ ibicui]` `[unions opinion +2]` `[pm opinion +1]` `[media opinion -1]` `[fontes loyalty +1]`
   ↳ > **Alexander Fontes:** "The cheapest and the dirtiest. In that order. I'll start on annex nine tomorrow."
   ↳ > **Caio Mertens:** "Corvel will want to discuss it. They'll want to discuss it with someone senior."
   ↳ `[if: flag.corvel_to_salgado]` > **Livia Harvan:** "Renata will want to discuss it too. With subpoenas."
   ↳ `[if: flag.promised_mother_street]` *Three hundred metres of pipe. You promised the hill. Now the whole country gets the hill's sewer, and nobody, not even Amanda, can say it was only for your mother.*
   ↳ `[if: !flag.promised_mother_street]` *A million and a half people. One of them is seventy-four and keeps her funeral money in a biscuit tin. You did not sign it for her. You will spend four years explaining that.*

## statement

> **Livia Harvan:** "Thank you. The statement goes at eleven. Do you want to add a line of your own?"

1. **"Say it will be finished on time and on budget."** `[flag: promised_on_time = true]` `[flag: voice += 1]`
   ↳ > **Alexander Fontes:** "Nothing in this country has ever been finished on time and on budget, Madam President. Including the budget."
   ↳ > "Then we'll be the first."
   ↳ Fontes writes something on his paper roll. You will find out in March that it was the date.
2. **"Say it will be honest. Not fast, not cheap. Honest."** `[flag: path_hold += 1]` `[fontes loyalty +1]`
   ↳ > **Livia Harvan:** "'Honest' doesn't test well."
   ↳ > "Send it anyway."
3. **"No line. Let the work speak."** `[flag: path_harden += 1]`
   ↳ > **Livia Harvan:** "The work can't speak, Madam President. The opposition can. But I'll send it as it is."

## end-of-month

They leave in the order they arrived. Mertens last, buttoning his jacket.

> **Caio Mertens:** "A good month, Madam President. Odel thinks so too. You'll find he's always more generous in the first month."

Alone, you sit at the long table under the blue curtains. The paper roll Fontes left behind has one line on it, in his small neat hand. It is a number. You do not know what it measures. You suspect you will.

Outside, the eleven o'clock news begins, and somewhere a statement you approved is read aloud by a voice that is not yours.

1. **Close the folder** `[flag: seen_great_project = true]` `[flag: chapter1_complete = true]`
   ↳ `[if: flag.path_hold >= 3]` *It was a month of saying no, mostly. You are tired in the way you used to be tired after a long hearing that you lost on the facts and won on the principle.*
   ↳ `[if: flag.path_harden >= 3]` *It was a month of deciding. You have become fast at it. Faster than you meant to. Amanda noticed on Tuesday and didn't say anything, which is how you know she noticed.*
   ↳ `[if: flag.voice >= 3]` *Just this once. Just a little more. Just until the work is done. The work has barely started.*

→ END
