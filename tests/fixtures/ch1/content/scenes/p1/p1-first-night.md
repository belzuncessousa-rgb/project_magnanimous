---
id: p1-first-night
chapter: 1
turn: 1
title: The First Night
kind: personal
location: capital
order: 3
portraits: [amanda, celia]
background: residence-night
---

⚙️ P1 personal scene. Establishes Amanda Troes (witness, records), Celia Vento (Vila Tamarin, refuses to move), Marco Prestes (off-stage), and "the voice". No PT cost to play. Choices inside it set personal flags that later cost PT or cross into politics (monthly visits; the street's sewer).
⚙️ The voice appears at most once here, and only if Lara has already compromised today (`voice >= 1`).

## opening

The Residence is a long, low house behind the palace, designed by an architect who believed presidents should live in glass. It has eleven bedrooms. You have one suitcase.

The staff have gone. Amanda sent them home, you learn later, by telling each of them that the others had already left.

She is on the sofa with her shoes off and a grey notebook on her knee — the same kind she has used since the second year of law school, when the two of you shared a flat, a kettle and a stolen typewriter. The notebook is half full. It was empty this morning.

> **Amanda Troes:** "Madam President."

> "Don't."

> **Amanda Troes:** "I had to try it once. It's awful. I'll save it for when you deserve it."

1. **Sit down next to her**
   ↳ The sofa is new and does not yet know how to be sat on. Neither of you mentions it.
2. **Stay standing by the window**
   ↳ Outside, the avenues of New Veldrania are lit in perfectly straight lines. It is a city that was drawn before it was lived in, and at night you can still see the ruler.

## notebook

> **Amanda Troes:** "I'm writing today down. Somebody should, who wasn't paid to."

1. **"What did you write?"**
   ↳ She reads without looking for the page. She knows where it is.
   ↳ `[if: flag.promised_power]` > **Amanda Troes:** "'The true powerhouse of this country: the people.' Underlined. Twice. Not by me — by the woman next to me, on her programme."
   ↳ `[if: flag.promised_GDP]` > **Amanda Troes:** "'A powerhouse.' The bankers on the left side of the square clapped first. I wrote down that they clapped first."
   ↳ `[if: flag.promised_CoL]` > **Amanda Troes:** "'Every Kunasaian, everywhere.' That's a lot of people, Lara. I counted. It's all of them."
   ↳ `[if: flag.address_skipped_welf]` > **Amanda Troes:** "And Marco was there, by the barrier. He left before the end. I wrote that down too. I'm sorry."
   ↳ `[if: flag.opp_price_1 == 1]` > **Amanda Troes:** "Livia's office called about the Port Authority. Someone already has a name ready. I wrote down the time they called. It was eleven minutes after your meeting ended."
   ↳ `[if: flag.cartels_softened]` > **Amanda Troes:** "And Livia asked me to put a meeting with Kesht 'somewhere in February'. Somewhere. I've never been asked to put a meeting somewhere."
2. **"Don't read it to me. Not tonight."**
   ↳ She closes it on her thumb, keeping the place.
   ↳ > **Amanda Troes:** "It'll keep. That's the point of it."

## pivot

She looks at you over the notebook in the way she used to look at you over exam papers — not checking your answers, checking whether you believed them.

⚙️ Routing: exactly one of the two options below is visible, depending on whether Lara named the voice on the balcony.

1. **Let her ask** `[show if: flag.address_struct == 3]` `→ voice-said`
2. **Let her ask** `[show if: !(flag.address_struct == 3)]` `→ voice-face`

## voice-said | The Voice

> **Amanda Troes:** "You told two hundred thousand people you'd heard a voice. *Just this once, just a little more.* Was that a line, or was it true?"

1. **"It's true. I heard it during the campaign. More than once."** `[amanda loyalty +1]` `[flag: told_amanda_voice = true]`
   ↳ > **Amanda Troes:** "When?"
   ↳ > "The night we took OPP's money for the television spots. The night I let Pelan choose the Health minister. It doesn't shout. It explains."
   ↳ > **Amanda Troes:** "Then you tell me when it explains, and I write it down. That's the deal."
2. **"It was a line. Speechwriters like a line."** `[flag: voice += 1]`
   ↳ > **Amanda Troes:** "You wrote that line yourself. At my kitchen table. On a napkin."
   ↳ She does not press. She writes something short.

→ records

## voice-face | The Voice

> **Amanda Troes:** "On the balcony, before the last part, you had the look you get before you agree to something. You used to get it before you co-signed leases for people who couldn't pay them."

> "I didn't agree to anything on the balcony."

> **Amanda Troes:** "No. I'm just telling you what I'm watching for."

1. **"Watch, then. Tell me when you see it."** `[amanda loyalty +1]` `[flag: told_amanda_voice = true]`
   ↳ > **Amanda Troes:** "I'll write it down when I do. You won't like the handwriting."
2. **"Some days I'm not sure whose voice I'm listening to."** `[amanda loyalty +1]`
   ↳ > **Amanda Troes:** "Then we'll keep two columns. One for yours. One for everybody else's."

→ records

## records

She taps the notebook with the back of her pen.

> **Amanda Troes:** "So. From tomorrow. How much of this do you want written down?"

1. **"Everything. Every meeting, every name, every time."** `[amanda loyalty +1]` `[flag: amanda_records = 1]` `[flag: path_hold += 1]`
   ↳ > **Amanda Troes:** "I was going to anyway. Now it's an instruction."
2. **"Not everything, Amanda. Some things shouldn't exist on paper."** `[amanda loyalty -1]` `[flag: amanda_records = 2]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ She is quiet for long enough that the refrigerator in the next room becomes audible.
   ↳ > **Amanda Troes:** "Then I'll write down that you said that."
3. **"Written down for whom?"** `[flag: amanda_records = 3]`
   ↳ > **Amanda Troes:** "For you. In four years. So you can check."
4. **"Only what matters. You'll know the difference."** `[amanda loyalty +1]` `[flag: amanda_records = 1]` `[flag: path_harden += 1]`
   ↳ > **Amanda Troes:** "I always know the difference. That's why you hired me and not someone nice."

## phone | Vila Tamarin

The private line rings. Six people have the number. One of them is your mother, who has given it to two neighbours.

> **Celia Vento:** "I watched you at Ivone's. Her television is bigger."

> "Hello, Mum."

> **Celia Vento:** "You looked thin. Are they feeding you? They should feed you, it's a palace."

> **Celia Vento:** "Marco came by after. He says to tell you the kitchen still opens at six."

> **Celia Vento:** "And the pipe, Lara. The men put a sign up in October. *Works resume soon.* The sign is still there. The men aren't. Ivone's grandson says the sign is the only part that got finished on time."

*Luz's pipe. The trunk sewer of the Great Sanitation Works, paid for twice and built once, ending three streets above the house where you learned to read.*

1. **"I'll come and see you, Mum. Every month. I promise."** `[celia loyalty +2]` `[flag: mother_visits_promised = true]`
   ↳ > **Celia Vento:** "Every month. Is Amanda there? Make her write it down."
   ↳ Amanda, without being asked, writes it down.
2. **"I'll have someone look at the street."** `[celia loyalty +1]` `[flag: promised_mother_street = true]` `[flag: voice += 1]`
   ↳ > **Celia Vento:** "Not for me. For the street."
   ↳ > "I know, Mum."
   ↳ *Three hundred metres of pipe. Nobody would call that a favour. And it isn't even for you.*
3. **"Come to New Veldrania. There's room here. There are eleven bedrooms."** `[celia loyalty -1]` `[flag: mother_asked_to_move = true]`
   ↳ > **Celia Vento:** "Eleven bedrooms and no neighbours. Who would I talk to, the guards?"
   ↳ > "They're called Jaguars."
   ↳ > **Celia Vento:** "Then I'd certainly not talk to them."
4. **"Tell me about your day."** `[celia loyalty +1]`
   ↳ She does. It takes twenty minutes and involves a cousin, a pharmacy that has run out of the good strips, and a Tabernacle pastor who sings very badly and very sincerely. You do not interrupt once. Amanda, across the room, does not write any of it down.

## insulin

> "Are you taking your insulin?"

> **Celia Vento:** "When I remember."

> "Mum."

> **Celia Vento:** "I'm seventy-four, Lara. I remember the things that matter. Go to bed. Presidents need sleep, I read it somewhere."

She hangs up before you can tell her she did not read it anywhere.

1. **Put the phone down slowly**

## window

Amanda takes the guest room at the far end of the corridor, the one nearest the kitchen, because she says the presidential wing makes her feel like a museum piece. Her door closes. The house settles around you in a series of expensive silences.

Through the glass, the straight lights of the capital run all the way to the dark.

1. **Write the day down yourself, the way Amanda does** `[flag: path_hold += 1]`
   ↳ You find a pad in the desk with the national arms on every page. You write three lines. The third is a name. You look at it for a long time before you understand it is your mother's.
2. **Open Fontes' folder and read it before you sleep** `[flag: path_harden += 1]`
   ↳ He gave it to Livia, who gave it to Amanda, who left it on your pillow like a hotel chocolate. It has no numbers in it yet, only headings. One of them is *Corvel*. You read it twice.
3. **Turn off the light. Tomorrow will come either way.**
   ↳ The switch is in an unexpected place. It takes you a while to find the dark.

## dark

1. **Sleep** `[flag: seen_first_night = true]`
   ↳ `[if: flag.voice < 1]` *For a while you lie awake listening for something. Nothing comes. It is, you think, the first quiet you have earned.*
   ↳ `[if: flag.voice >= 1]` *Just before sleep, it arrives, very gently, in your own voice: it was a long day, and every one of today's small things had a good reason. Tomorrow you can be stricter. Tomorrow there will be time.*
   ↳ `[if: flag.voice >= 3]` *You notice it has learned the word "tomorrow". You notice you were the one who taught it.*

→ END
