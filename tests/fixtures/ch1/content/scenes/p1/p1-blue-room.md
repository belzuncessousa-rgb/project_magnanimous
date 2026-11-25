---
id: p1-blue-room
chapter: 1
turn: 1
title: The Blue Room
kind: fixed
location: capital
order: 2
portraits: [mertens, livia, fontes, marne, salgado, kesht, voss, dara, kaval, aroun]
background: blue-room
---

⚙️ P1-S2. First cabinet meeting. Goals: every minister is a person with an agenda; Fontes hints at the hole (no numbers that sound like a score); Mertens collects the first OPP price; Livia Harvan closes with the cartel briefing (GDD: end of the first meeting with the VP and Chief of Staff).
⚙️ Structure: opening → table hub (at least two exchanges before adjourning) → the price (Mertens) → the cartels (Livia).

## opening

The Blue Room is colder than you expected. The curtains are blue, the carpet is blue, and the air conditioning was installed during the dictatorship by someone who believed in it.

The cabinet is already seated. Every one of them is watching how you walk in.

Livia Harvan, your Chief of Staff, has put a folder at your place, a pen beside it at a slight angle, and a glass of water without ice. She is the youngest person at the table and the only one who knows where everything is.

Alexander Fontes, Treasury, has brought a calculator — the old kind, with a paper roll. Tobias Marne, Planning and Development, is laughing at something nobody said. Renata Salgado and Darian Kesht, Justice and Intelligence, have been seated side by side. Someone arranged that, and both of them have noticed.

General Aldric Voss sits as if the chair were a position he had been ordered to hold. Owin Dara, Health, is reading a message on his phone and does not need to tell you who sent it. Helena Kaval, Education, is the only one who brought a book. Celeste Aroun, Exterior, greets you in three words and makes them sound like a treaty.

Caio Mertens sits at your right hand, where protocol put him. He has the look of a man who has attended a great many first meetings.

1. **"Please, sit. Nobody stands for me in this room."** `[-1 STRUCT]`
   ↳ They sit. Voss sits last, and only because everyone else has.
2. **Wait, standing, until they settle on their own** `[+1 STRUCT]`
   ↳ It takes eleven seconds. Livia counts them, you suspect, because she looks up at exactly the moment the last chair stops moving.
3. **"Let's start with the bad news. Every room has some."** `[flag: blueroom_bad_news_first = true]`
   ↳ Marne laughs again. This time somebody joins him. It is not Fontes.

## table

⚙️ Hub. Each exchange once. "Adjourn" unlocks after two exchanges.

1. **"Alexander. How bad is it?"** `[once]` `[flag: blueroom_topics += 1]` `→ fontes`
2. **"Renata, Darian. You two will have to work together."** `[once]` `[flag: blueroom_topics += 1]` `→ salgado-kesht`
3. **"Owin, Tobias. You'll both want money. Tell me for what."** `[once]` `[flag: blueroom_topics += 1]` `→ dara-marne`
4. **"General. Helena. Celeste. Anything I should hear today?"** `[once]` `[flag: blueroom_topics += 1]` `→ others`
5. **"That's enough for a first day."** `[lock if: flag.blueroom_topics < 2]` `→ adjourn`

## fontes

Fontes takes off his glasses, which you will learn is what he does instead of sighing.

> **Alexander Fontes:** "Bad enough that I'd rather show you on paper than say it in front of eleven people."

> **Alexander Fontes:** "The numbers we campaigned on were the previous government's numbers. The previous government was an optimist."

> **Tobias Marne:** "Optimism is a renewable resource."

> **Alexander Fontes:** "Not at the Fund, it isn't."

1. **"Then show me on paper. This week."** `[fontes loyalty +1]` `[flag: fontes_private = true]`
   ↳ He writes a date on the corner of his folder and turns it so you can see it. It is the eighth.
2. **"Say it here. Everyone at this table will have to carry it."** `[fontes loyalty -1]` `[flag: fontes_public = true]`
   ↳ > **Alexander Fontes:** "Before we buy a single pencil, a ninth of everything we collect goes to interest."
   ↳ Dara puts his phone face down on the table. Kaval closes her book on one finger, keeping the page.
   ↳ > **Caio Mertens:** "I'd suggest that figure doesn't leave this room."
   ↳ > **Alexander Fontes:** "It's in the Fund's annual report, Mr. Vice President. It left the room some time ago."
3. **"Is there anything in there I should be afraid of?"**
   ↳ > **Alexander Fontes:** "A loan, a contract and a consortium. You'll recognise the consortium."
   ↳ *You do. Corvel. The trunk sewer that stops three streets before your mother's house.*

→ table

## salgado-kesht

> **Renata Salgado:** "We've worked together before."

> **Darian Kesht:** "Once. She tried to subpoena my service."

> **Renata Salgado:** "And you sent me forty boxes of blank paper."

> **Darian Kesht:** "Classified blank paper."

Somebody at the far end of the table coughs to cover a laugh. Neither of them looks at the other.

1. **"Renata leads where the law is concerned. Darian supports her."** `[salgado loyalty +2]` `[kesht loyalty -2]` `[-1 STRUCT]`
   ↳ Kesht inclines his head by perhaps a centimetre. It is the most expensive centimetre you will see all day.
2. **"The safety of the state is Darian's call. Renata, give him room."** `[kesht loyalty +2]` `[salgado loyalty -2]` `[+1 STRUCT]`
   ↳ > **Renata Salgado:** "Room is the one thing his service has never been short of."
3. **"You'll both report to me. Separately."** `[salgado loyalty +1]` `[kesht loyalty +1]` `[flag: separate_reports = true]` `[flag: path_harden += 1]`
   ↳ > **Darian Kesht:** "Separately is how I prefer it."
   ↳ > **Renata Salgado:** "Separately is how things get lost."
   ↳ Livia writes something down. You suspect it is the word *meetings*, twice.

→ table

## dara-marne

> **Owin Dara:** "The Mognagna transfers run out in April unless someone signs. That's not a plan, Madam President. It's a date."

> **Tobias Marne:** "And I have three projects that will make this country forget it ever had a debt."

> **Alexander Fontes:** "It will not forget."

1. **"Owin, the transfers will be signed. Bring me the papers."** `[+1 WELF]` `[dara loyalty +2]` `[fontes loyalty -1]` `[approval +2 @ mognagna]` `[flag: transfers_promised = true]`
   ↳ > **Owin Dara:** "Pelan will be pleased."
   ↳ Fontes writes a number on his paper roll and tears it off and folds it into his pocket.
   ↳ *You had not asked whether Pelan would be pleased.*
2. **"Nothing gets signed until Alexander has shown me the books."** `[dara loyalty -1]` `[fontes loyalty +1]` `[-1 WELF]`
   ↳ > **Owin Dara:** "I'll tell Sugar Bay you're reading."
   ↳ He says it pleasantly. It is not meant pleasantly.
3. **"Tobias, if it were your own money, which of the three would you build?"** `[marne loyalty +1]` `[flag: marne_prefers_railway = true]`
   ↳ > **Tobias Marne:** "None. That's why it's called public works."
   ↳ He waits for the laugh, gets half of one, and leans in.
   ↳ > **Tobias Marne:** "The railway. Everybody uses a railway. Even the people who vote against you."

→ table

## others

> **Aldric Voss:** "Nothing today, Madam President. The army is where you left it."

> "I haven't left it anywhere yet."

> **Aldric Voss:** "Then it is exactly where it was."

> **Helena Kaval:** "Only that my rectors have read your speech and want to know which part was about them."

> **Celeste Aroun:** "And the Arennian ambassador has asked for a meeting. He asked before the speech. He will ask again after it, in a slightly different tone."

1. **"Tell the ambassador he'll have his meeting when we have something to say."** `[federation relation -1]` `[aroun loyalty +1]` `[+1 IDEN]`
   ↳ > **Celeste Aroun:** "I'll put it more warmly. He'll hear it exactly as you said it."
2. **"See him this week, Celeste. Find out what he wants before he tells me."** `[aroun loyalty +1]` `[federation relation +1]`
   ↳ > **Celeste Aroun:** "He'll want what they always want. The question is what he'll call it."
3. **"Helena, tell your rectors: all of it."** `[kaval loyalty +1]` `[approval +1 @ tekoku]`
   ↳ > **Helena Kaval:** "They'll ask for that in writing. Academics."
   ↳ Voss, across the table, looks as if he has been told that the army is also expected to read.

→ table

## adjourn

> **Livia Harvan:** "Thank you, everyone. The President has another meeting."

You did not know you had another meeting. The ministers rise. Marne claps Fontes on the shoulder on his way out; Fontes looks at the shoulder afterwards, as if checking it for damage. Dara is already on the phone before the door closes. Salgado and Kesht leave by the same door, two seconds apart.

Caio Mertens does not move. Neither does Livia.

> **Caio Mertens:** "A small thing, before the big things."

He folds his hands on the table. He has good hands, the kind that have signed a great deal and carried very little.

> **Caio Mertens:** "Odel asks — and I'm only the messenger — that the Port Authority at Katanaí go to someone from our side. And some forty posts below it. Customs, berthing, inspection. Nothing anyone reads about."

Pier Nine was at Katanaí. Everyone at the table knows it. Nobody says it.

> **Livia Harvan:** "By our standards, Madam President, it's a modest opening."

> "And what does Caio Mertens want? Apart from Odel."

He considers the question as if no one had asked it in some years.

> **Caio Mertens:** "To be useful. I've been vice-something three times. Nobody remembers a vice-anything unless it goes wrong."

→ price

## price

1. **"Give Odel the port."** `[opp opinion +2]` `[mertens loyalty +2]` `[gain: 1 IPI]` `[flag: opp_price_1 = 1]` `[flag: opp_port_authority = true]` `[flag: corruption += 1]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Caio Mertens:** "He'll be grateful. For about a month. For Odel, that's a long time."
   ↳ *A port needs a director. Someone was always going to be named. It may as well be someone who owes you.*
2. **"The forty posts, yes. The port stays with a career officer."** `[cost: 1 IPI]` `[mertens loyalty +1]` `[opp opinion +1]` `[flag: opp_price_1 = 2]`
   ↳ > **Caio Mertens:** "Odel will call that half."
   ↳ > "Tell him it's the better half."
   ↳ Livia almost smiles. She writes the forty posts down as if she already had the list. She does.
3. **"Nobody gets the port. Tell Odel I'll pay for votes, not for buildings."** `[opp opinion -2]` `[mertens loyalty -1]` `[flag: opp_price_1 = 3]` `[flag: path_hold += 1]`
   ↳ > **Caio Mertens:** "I'll tell him. He'll say you'll pay for both in the end, and that buildings are cheaper."
   ↳ He does not seem offended. He seems to be making a note of the date.
4. **"Ask me again after the budget."** `[mertens loyalty -1]` `[flag: opp_price_1 = 4]`
   ↳ > **Caio Mertens:** "Of course. Though Odel finds that prices rise in the spring."

## cartels

Mertens rises and buttons his jacket.

> **Caio Mertens:** "I'll leave you to Livia. She has the interesting folder."

When he is gone, Livia slides a second folder across the table. It has no title, which in this building is a title of its own.

> **Livia Harvan:** "Two things about Ibira you won't read in the papers."

> **Livia Harvan:** "First. The Red Tree and the Blue Piranhas have kept a truce since the autumn. The rivers to the Tree, the city peripheries to the Piranhas. Nobody signed it, so everybody keeps it."

> **Livia Harvan:** "Second. A federal police operation on the upper Ibira was cancelled in November. Someone warned the boats a day early."

> "Who?"

> **Livia Harvan:** "Darian has a list. Darian always has a list. He wanted to bring it himself. I told him you'd had a long day."

*You notice that she decided that for you. You notice, too, that you are grateful.*

> **Livia Harvan:** "They'll be watching how you begin. So — how do you want to begin?"

1. **"Watch them. Quietly. I want to know before they know I know."** `[cartels suspicion +10]` `[cartels capacity -3]` `[+1 STRUCT]` `[flag: cartels_watch_quiet = true]`
   ↳ > **Livia Harvan:** "Quietly is what we're good at. I'll tell Darian he can have his meeting. Next week."
2. **"Watch them, and make sure they know we're watching."** `[cartels capacity -5]` `[cartels suspicion +20]` `[federation relation +1]` `[+1 FORCE]` `[approval +2 @ tekoku, tapira]` `[flag: cartels_watch_loud = true]`
   ↳ > **Livia Harvan:** "The Arennians will love it. The boats will notice by Friday."
   ↳ She does not say which of those she thinks matters more.
3. **"Not now. We have a hole to fill first."** `[flag: cartels_ignored = true]`
   ↳ > **Livia Harvan:** "Then I'll file it under 'first'. It's a thick file."
4. **"Ease off. I won't start a war in my first month."** `[cartels suspicion -10]` `[cartels capacity +5]` `[col -2 @ ibira]` `[-1 FORCE]` `[flag: cartels_softened = true]` `[flag: voice += 1]`
   ↳ > **Livia Harvan:** "Nobody said war, Madam President."
   ↳ > "Nobody ever does, at the start."
   ↳ *You will look at Ibira properly once the books are open. A month. Two at most. Nobody dies of a month.*

## dusk

When you look up from the folder, the room is darker. Someone has drawn the blue curtains against the evening, and you did not see who.

Livia gathers both folders, leaves you the pen.

> **Livia Harvan:** "Your secretary is waiting at the Residence. She says she has brought her own notebook, and that you'd understand."

You do.

1. **Go home, such as it is** `[flag: seen_blue_room = true]`

→ END
