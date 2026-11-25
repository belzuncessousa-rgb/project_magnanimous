---
id: p3-year-end
chapter: 3
turn: 3
title: The End of the First Year
kind: fixed
location: capital
token: personal
when: "flag.seen_tax_reform"
portraits: [amanda, celia, mertens]
background: residence-night
---

⚙️ Closing scene of chapter 3 and of the playable block (chapters 1–3). Amanda reads back the year from her notebooks, conditioned on the main outcomes; Celia (recovering) and the voice close Lara's arc for now. After this scene the final edition prints and the game shows "to be continued".

## opening

It is the eighteenth of December. Congress has closed for the year. The palace is quieter than it has been since January.

In the afternoon, Mertens stops by your office to say goodbye before the holidays.

> **Caio Mertens:** "A difficult year, Madam President. Most first years are. Odel asked me to tell you he'll want to talk about next year's budget in February. He always wants to talk in February."

1. **"Thank you, Caio. For all of it."** `[mertens loyalty +1]`
   ↳ > **Caio Mertens:** "I was useful, I think. That's all I wanted."
2. **"Tell Odel I'll be ready."**
   ↳ > **Caio Mertens:** "He knows."

## residence

In the evening you go back to the Residence. Amanda is there, with the third notebook of the year and a bottle of wine she says was a present from the Veldmoor embassy.

1. **Go into the kitchen** `[show if: flag.celia_ill]` `→ residence-celia`
2. **Sit down with Amanda** `[show if: !flag.celia_ill]` `→ residence-amanda`

## residence-celia

Your mother is in the kitchen. She has been staying in the guest room for two weeks, since she left hospital, and she has already reorganised the cupboards. She says she is going home after Christmas.

> **Celia Vento:** "Sit down, both of you. I made too much food. Your cook doesn't know what she's doing."

→ residence-amanda

## residence-amanda

> **Amanda Troes:** "I promised to read you the year. Do you still want it?"

1. **"Read it."** `→ reading`
2. **"Only the important parts."** `→ reading`

## reading | The Year

She opens the first notebook and reads, in her ordinary voice, the things you said and did.

1. **Listen**
   ↳ `[if: flag.great_project == 1]` > **Amanda Troes:** "January. You chose the mine in the Tauá Hills. There is a road now, and a camp, and eleven villages that have been asked or haven't, depending on the month."
   ↳ `[if: flag.great_project == 4]` > **Amanda Troes:** "January. You chose the railway. The first section has rails on twenty kilometres. Marne says it's ahead of schedule. Fontes says it's behind."
   ↳ `[if: flag.great_project == 6]` > **Amanda Troes:** "January. You chose to finish the sewers. The pipe is past your mother's street now."
   ↳ `[if: flag.debt_policy == 1]` > **Amanda Troes:** "March. You started paying back the debt. Fontes smiled. I wrote that down, because it happened once."
   ↳ `[if: flag.debt_policy == 2]` > **Amanda Troes:** "March. You borrowed more from the Fund. The first state company goes up for sale in the spring."
   ↳ `[if: flag.reform_result == 1]` > **Amanda Troes:** "July. The Senate reform passed. Ibicuí has more senators. Mognagna has fewer, and it hasn't forgiven you."
   ↳ `[if: flag.reform_result == 3 || flag.reform_result == 6]` > **Amanda Troes:** "July. The reform failed. Lessa has been on television every week since."
   ↳ `[if: flag.reform_result == 4 || flag.reform_result == 5]` > **Amanda Troes:** "July. The states got their new powers. The governors send you Christmas cards now."
   ↳ `[if: flag.strike_outcome == 1 || flag.strike_outcome == 2]` > **Amanda Troes:** "November. The port stopped for nine days. It opened again because you paid for houses and buses. Marco told them to go back."
   ↳ `[if: flag.strike_outcome == 3]` > **Amanda Troes:** "November. The port stopped and you opened it with the police. Marco was arrested for the fourth time."
   ↳ `[if: flag.strike_unresolved]` > **Amanda Troes:** "The port is still at half capacity. That page isn't finished."
   ↳ `[if: flag.avros_outcome == 1]` > **Amanda Troes:** "Pelan Avros lost his immunity. He'll be tried next year. The PM is still angry with you. The country less so."
   ↳ `[if: flag.salgado_resigned]` > **Amanda Troes:** "Renata Salgado resigned. Her letter is in the second notebook. I copied it out by hand."
   ↳ `[if: flag.impasse_outcome >= 1]` > **Amanda Troes:** "October. Congress stopped working for five weeks. You got it working again. I've written down how."
   ↳ `[if: flag.celia_ill]` > **Amanda Troes:** "November. Katanaí General."
   ↳ > **Amanda Troes:** "That's the year."
   ↳ `[if: compass.ECON >= 5]` > **Amanda Troes:** "A note in the margin, in my handwriting: every economic choice this year went toward the state doing more. I don't think you noticed it was every one."
   ↳ `[if: compass.ECON <= -5]` > **Amanda Troes:** "A note in the margin: every economic choice this year went toward the market. Marco asked me in November whether you'd changed parties. I said I'd ask."

## voice

Later, after your mother has gone to bed and Amanda has gone to hers, you stay up alone in the living room with the lights of the capital outside.

1. **Think about the year**
   ↳ `[if: flag.voice < 2]` *You made many decisions this year. Most of them you would make again. A few you would not. You can name each one.*
   ↳ `[if: flag.voice >= 2 && flag.voice < 5]` *Each concession this year had a reason. The reasons were good. You notice that you no longer need to look for them; they arrive by themselves.*
   ↳ `[if: flag.voice >= 5]` *Just this once, just a little more, just until the work is done. You said that on the balcony as a warning. This year it became a way of working.*
   ↳ `[if: flag.path_hold >= flag.path_harden && flag.path_hold >= flag.path_corrupt]` *You kept most of your promises, and paid for each one. You are not sure the country noticed. Amanda did.*
   ↳ `[if: flag.path_harden > flag.path_hold && flag.path_harden >= flag.path_corrupt]` *You decide faster than you did in January. People wait less for you, and talk to you less.*
   ↳ `[if: flag.path_corrupt > flag.path_hold && flag.path_corrupt > flag.path_harden]` *You know more people who owe you something than you did in January. You also owe more.*

## close

1. **Turn off the lights** `[flag: seen_year_end = true]` `[flag: chapter3_complete = true]`
   ↳ The second year begins in six weeks.

→ END
