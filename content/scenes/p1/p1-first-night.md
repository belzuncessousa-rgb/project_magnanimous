---
id: p1-first-night
chapter: 1
turn: 1
title: The First Night
kind: personal
location: capital
token: personal
order: 5
when: "flag.seen_tutorial"
portraits: [amanda, celia]
background: residence-night
---

⚙️ Personal scene. Establishes Amanda as witness and record-keeper, Celia Vento (Lara's mother, Vila Tamarin), Marco Prestes (off-stage) and "the voice". No resource costs. Choices set personal flags that later cost PT or cross into politics.
⚙️ The voice appears at most once here, and only if Lara has already compromised today (`voice >= 1`).

## opening

The Residence is a long, low house behind the palace, with glass walls and a garden. It has eleven bedrooms. You arrived this morning with one suitcase, which is still by the door.

The staff have gone home. Amanda is on the sofa with her shoes off and her grey notebook on her knee. She has used the same kind of notebook since law school. This one was empty this morning, and now it is half full.

> **Amanda Troes:** "Madam President."

> "Please don't."

> **Amanda Troes:** "I wanted to hear how it sounds. I don't like it either."

1. **Sit down next to her**
   ↳ The sofa is new and stiff. You both sit on the edge of it.
2. **Stay standing by the window**
   ↳ Outside, the avenues of New Veldrania are lit in straight lines. The city was planned on paper before anyone lived in it, and from here you can see the pattern.

## notebook

> **Amanda Troes:** "I'm writing down today. I think someone should, someone who isn't paid by a newspaper."

1. **"What did you write?"**
   ↳ She reads from the notebook.
   ↳ `[if: flag.promised_power]` > **Amanda Troes:** "'The true powerhouse of this country: the people.' The woman next to me underlined that on her programme."
   ↳ `[if: flag.promised_GDP]` > **Amanda Troes:** "'A powerhouse.' The people in suits on the left of the square clapped first."
   ↳ `[if: flag.promised_CoL]` > **Amanda Troes:** "'Every Kunasaian, everywhere.' That's a big promise, Lara."
   ↳ `[if: flag.address_skipped_welf]` > **Amanda Troes:** "Marco was by the barrier. He left before the end."
   ↳ `[if: flag.opp_price_1 == 1]` > **Amanda Troes:** "Livia's office called about the Port Authority eleven minutes after your meeting with Caio. They already had a name."
   ↳ `[if: flag.cartels_softened]` > **Amanda Troes:** "And Livia asked me to schedule Kesht for 'sometime in February'."
   ↳ `[if: compass.WELF >= 3]` > **Amanda Troes:** "And this, from the whole day: you said 'the people' or 'the poor' in every room you walked into. I counted eleven times. Livia counted too."
2. **"Not tonight. Read it to me another day."**
   ↳ She closes the notebook with her thumb inside it to keep the page.
   ↳ > **Amanda Troes:** "It'll keep."

## pivot

She looks at you for a while before she speaks again.

⚙️ Routing: exactly one option is visible, depending on whether Lara named the voice on the balcony.

1. **Let her ask** `[show if: flag.address_struct == 3]` `→ voice-said`
2. **Let her ask** `[show if: !(flag.address_struct == 3)]` `→ voice-face`

## voice-said | The Voice

> **Amanda Troes:** "In the speech you said you'd heard a voice. *Just this once, just a little more.* Was that true, or was it just a good line?"

1. **"It's true. I heard it during the campaign, more than once."** `[amanda loyalty +1]` `[flag: told_amanda_voice = true]`
   ↳ > **Amanda Troes:** "When?"
   ↳ > "When we took the OPP's money for the television adverts. When I let Pelan choose the Health minister. It doesn't shout. It gives me reasons."
   ↳ > **Amanda Troes:** "Then when it gives you reasons, tell me, and I'll write them down."
2. **"It was a line. Speeches need lines."** `[flag: voice += 1]`
   ↳ > **Amanda Troes:** "You wrote it yourself, at my kitchen table."
   ↳ She writes something short in the notebook and doesn't ask again.

→ records

## voice-face | The Voice

> **Amanda Troes:** "On the balcony, near the end, you had the face you make before you agree to something you're not sure about. You used to make it before you signed leases for people who couldn't pay."

> "I didn't agree to anything on the balcony."

> **Amanda Troes:** "No. I'm telling you what I'm watching for."

1. **"Watch, then. Tell me when you see it."** `[amanda loyalty +1]` `[flag: told_amanda_voice = true]`
   ↳ > **Amanda Troes:** "I will."
2. **"Some days I'm not sure whose advice I'm following."** `[amanda loyalty +1]`
   ↳ > **Amanda Troes:** "Then we'll keep a list. Your reasons in one column, everyone else's in the other."

→ records

## records

> **Amanda Troes:** "From tomorrow, how much of this do you want me to write down?"

1. **"Everything. Every meeting, every name."** `[amanda loyalty +1]` `[flag: amanda_records = 1]` `[flag: path_hold += 1]`
   ↳ > **Amanda Troes:** "I was going to anyway. Now it's an instruction."
2. **"Not everything, Amanda. Some things shouldn't be on paper."** `[amanda loyalty -1]` `[flag: amanda_records = 2]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ She doesn't answer for a while.
   ↳ > **Amanda Troes:** "Then I'll write down that you said that."
3. **"Written down for whom?"** `[flag: amanda_records = 3]`
   ↳ > **Amanda Troes:** "For you. In four years. So you can check."
4. **"What matters. You'll know what that is."** `[amanda loyalty +1]` `[flag: amanda_records = 1]` `[flag: path_harden += 1]`
   ↳ > **Amanda Troes:** "I usually do."

## phone | Vila Tamarin

The private phone rings. Only a few people have the number. One of them is your mother, Celia, who still lives in Vila Tamarin, the neighbourhood on the hills above Katanaí where you grew up. She has refused every offer to move.

> **Celia Vento:** "I watched you at Ivone's. Her television is bigger than mine."

> "Hello, Mum."

> **Celia Vento:** "You looked thin. Are they feeding you?"

> **Celia Vento:** "Marco came round after. He said to tell you the kitchen still opens at six."

> **Celia Vento:** "And the pipe, Lara. The men put up a sign in October saying the works would start again soon. The sign is still there. The men never came back."

*The pipe is the main sewer line of the Great Sanitation Works, the programme started by President Luz years ago and never finished. It stops three streets above your mother's house.*

1. **"I'll come and see you every month, Mum. I promise."** `[celia loyalty +2]` `[flag: mother_visits_promised = true]`
   ↳ > **Celia Vento:** "Every month. Is Amanda there? Tell her to write it down."
   ↳ Amanda writes it down.
2. **"I'll have someone look at the street."** `[celia loyalty +1]` `[flag: promised_mother_street = true]` `[flag: voice += 1]`
   ↳ > **Celia Vento:** "Not for me. For the street."
   ↳ > "I know, Mum."
   ↳ *Three hundred metres of pipe, for a whole street. It isn't a personal favour.*
3. **"Come to the capital. There's plenty of room here."** `[celia loyalty -1]` `[flag: mother_asked_to_move = true]`
   ↳ > **Celia Vento:** "Eleven bedrooms and no neighbours. Who would I talk to, the guards?"
   ↳ > "They're called Jaguars."
   ↳ > **Celia Vento:** "Then I certainly wouldn't talk to them."
4. **"Tell me about your day."** `[celia loyalty +1]`
   ↳ She does. It takes twenty minutes: a cousin, the pharmacy running out of test strips, a pastor who sings badly. You listen to all of it.

## insulin

> "Are you taking your insulin?"

> **Celia Vento:** "When I remember."

> "Mum."

> **Celia Vento:** "I'm seventy-four, Lara. Go to bed. Presidents need sleep."

She hangs up.

1. **Put the phone down**

## window

Amanda takes the guest room at the end of the corridor, near the kitchen. Her door closes. The house is very quiet.

1. **Write down the day yourself** `[flag: path_hold += 1]`
   ↳ You find a notepad in the desk with the national arms at the top of each page. You write three lines. The third is your mother's name.
2. **Read the Treasury's folder before you sleep** `[flag: path_harden += 1]`
   ↳ Fontes sent a folder for next week's meeting. It has only headings so far. One of them is *Corvel*, the company that built the sanitation works. You read it twice.
3. **Turn off the light**
   ↳ It takes you a while to find the switch.

## dark

1. **Sleep** `[flag: seen_first_night = true]`
   ↳ `[if: flag.voice < 1]` *You lie awake for a while. Then you sleep.*
   ↳ `[if: flag.voice >= 1]` *Just before you sleep, you go over the day. Each small concession had a good reason. Tomorrow you can be stricter. Tomorrow there will be more time.*
   ↳ `[if: flag.voice >= 3]` *It has started to say "tomorrow" a lot. You notice that.*

→ END
