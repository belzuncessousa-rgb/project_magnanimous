---
id: p1-justice-briefing
chapter: 1
turn: 2
title: The Envelope
kind: briefing
location: capital
token: security
portraits: [salgado, delmar]
background: justice-office
---

⚙️ Justice, Interior & Labour meeting. Salgado's overview of her three possible programmes (for the chapter-2 budget), an unopened anonymous envelope about Pelan Avros (seed of the Avros-scandal crisis), and the petition of the Families of the Disappeared (Military Dictatorship Files — seed only; nothing is opened in chapters 1–3).

## opening

The Ministry of Justice is an old stone building across the square from Congress. Salgado's office still has her predecessor's portrait leaning against the wall, facing it. She has not decided what to do with it.

On her desk there are three folders side by side, and a sealed envelope a little apart from them.

> **Renata Salgado:** "Madam President. I'll start with what my ministry could do this year, if the budget allows. There are three programmes. You'll choose in March, but I'd like you to know what each involves."

> **Renata Salgado:** "The first is strengthening the courts. We can put more judges, prosecutors and police into one area of crime: either the cartels in Ibira, or the big landowners in Tapira and Mognagna who control local politics. We can't afford both."

> **Renata Salgado:** "The second is a labour agreement: a formal negotiation with the unions on wages and rights. It would reduce the risk of strikes, especially in Katanaí."

> **Renata Salgado:** "The third is an independent anti-corruption department. It would investigate public officials, including people in Congress, without needing my approval or yours."

→ questions

## questions

1. **"Which would you choose if you could fund only one?"** `[once]` `→ questions`
   ↳ > **Renata Salgado:** "The anti-corruption department. But it will cause you problems in your own party. I'll explain why in a moment."
2. **"How likely are strikes without the labour agreement?"** `[once]` `→ questions`
   ↳ > **Renata Salgado:** "In Katanaí, fairly likely within the year. The port workers' union is under pressure from its members. Many of them live in the peripheries, where conditions are getting worse."
3. **"Why only one area for the courts?"** `[once]` `→ questions`
   ↳ > **Renata Salgado:** "Money and people. We don't have enough experienced prosecutors to open both fronts at once without doing both badly."
4. **"And the envelope?"** `→ envelope`

## envelope

She moves the envelope a little closer to you.

> **Renata Salgado:** "This arrived the day after the election, with no sender. I haven't opened it. If I open it and it contains evidence of a crime, I'm required by law to act on it."

> **Renata Salgado:** "I think it concerns Pelan Avros, the leader of the PM in Congress. There have been rumours about him for years, about public contracts in Mognagna."

*If it is Avros, it probably involves people in the OPP as well. Avros has worked with them for years.*

1. **"Open it."** `[salgado loyalty +2]` `[avros suspicion +10]` `[flag: avros_envelope = 1]` `[flag: path_hold += 1]`
   ↳ She opens it and reads the two pages inside, then turns them face down.
   ↳ > **Renata Salgado:** "Names, dates and three contracts in Mognagna. Pelan Avros is named. So is an OPP deputy. It isn't enough for a case yet. But now I have to start looking."
2. **"Keep it closed until the budget has passed."** `[salgado loyalty -2]` `[flag: avros_envelope = 2]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Renata Salgado:** "I'll keep it closed. I'll also write down the date you asked me to."
   ↳ *You need Avros's deputies for the budget. After the budget, the law can take its course.*
3. **"Give it to me."** `[salgado loyalty -1]` `[flag: avros_envelope = 3]` `[flag: path_harden += 1]`
   ↳ She hesitates, then hands it over.
   ↳ > **Renata Salgado:** "Then it's your responsibility now, Madam President."

## anteroom

> **Renata Salgado:** "Last thing. There are people waiting outside who would like to see you. The Families of the Disappeared."

> **Renata Salgado:** "Under the dictatorship, many people were arrested and never seen again. When the military handed over power, the Amnesty Act protected them from prosecution and sealed their archives. These families have collected forty thousand signatures asking for the archives to be opened. Their spokeswoman is Rosa Delmar. Her brother disappeared in Sugar Bay when she was nineteen."

> **Renata Salgado:** "I'd like to receive them. General Voss will hear about it within the hour. He has said he would resign if the archives were opened."

1. **"I'll receive her myself."** `[flag: files_petition = 1]` `[voss loyalty -1]` `[armed_forces opinion -1]` `[-1 STRUCT]` `→ delmar`
2. **"Receive them yourself, Renata. Tell them I'll write to them."** `[flag: files_petition = 2]` `[salgado loyalty +1]`
   ↳ > **Renata Salgado:** "I will. A letter from the President will matter to them."
3. **"Not now. Thank them and ask them to be patient."** `[flag: files_petition = 3]` `[salgado loyalty -1]` `[voss loyalty +1]`
   ↳ > **Renata Salgado:** "They've waited twenty-five years. I'll tell them."

→ close

## delmar | Rosa Delmar

Rosa Delmar is a small woman in her late sixties. She carries the petition in a plastic shopping bag. The box broke on the bus, she says.

> **Rosa Delmar:** "Thank you for seeing me. Most presidents didn't."

> **Rosa Delmar:** "I'm not asking you to open the archives today. I know you can't, not yet. I'm asking you to say publicly that you know they are closed, and that you know why."

1. **"I know they are closed, and I know why."** `[approval +2 @ mognagna]` `[flag: delmar_acknowledged = true]`
   ↳ > **Rosa Delmar:** "Thank you. No one in this building has said that before. I'll come back."
2. **"I can't promise you anything yet, and I won't pretend otherwise."** `[flag: path_hold += 1]`
   ↳ > **Rosa Delmar:** "That's honest. I'll come back."
3. **"Give me time. Not forever, but time."** `[flag: delmar_time_asked = true]` `[flag: voice += 1]`
   ↳ > **Rosa Delmar:** "Everyone asks for time. I'll remember that you said 'not forever'."

## close

1. **Thank Salgado and leave** `[flag: seen_justice_briefing = true]`

→ END
