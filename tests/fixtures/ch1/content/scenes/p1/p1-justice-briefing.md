---
id: p1-justice-briefing
chapter: 1
turn: 2
title: The Envelope
kind: briefing
location: capital
portraits: [salgado, delmar]
background: justice-office
---

⚙️ Justice, Interior & Labor briefing. Salgado previews her three initiatives (ch2 budget), holds an unopened envelope about Pelan Avros (seed of the ch3 Avros-scandal pressure meter), and has the Families of the Disappeared waiting in her anteroom (Military Dictatorship Files — SEED ONLY; nothing opens in ch1–3).

## opening

Salgado's office at the Ministry of Justice still has her predecessor's portrait leaning against the wall, face in, waiting for somebody to decide what to do with it. She has decided. She simply has not found the time.

Her desk is clear except for three folders laid side by side, and an envelope placed slightly apart from them, the way you would place a glass you suspect is poisoned.

> **Renata Salgado:** "Three things I can do, if you fund me. You'll choose in March. I'd like you to choose knowing what each one costs you personally."

> **Renata Salgado:** "Judicial strengthening. Real courts in Ibira, or real courts in the landlord country — I can't afford both. Pick the cartels or the Coronéis."

> **Renata Salgado:** "A labour compact. Wages, rights, a table where the unions sit before they block the port instead of after."

> **Renata Salgado:** "And an anti-corruption department I don't control and you don't control. That's the point of it."

1. **"If you could only fund one, which would it be?"**
   ↳ > **Renata Salgado:** "The department. And you won't like why."
2. **"Which one frightens Congress most?"**
   ↳ > **Renata Salgado:** "The department. Then the courts. Nobody's frightened of the unions until the port stops."
3. **"Which one would you have funded, as a judge?"**
   ↳ > **Renata Salgado:** "As a judge I'd have funded all three and complained it wasn't enough. That's the luxury of the bench."

## envelope

She touches the envelope with one finger and moves it two centimetres toward you.

> **Renata Salgado:** "This arrived the day after the election. No sender. I haven't opened it. If I open it, I have to act on it. That's not a figure of speech, it's the law."

> **Renata Salgado:** "I can guess whose name is in it. So can you."

*Pelan. Of course Pelan. And if Pelan, then OPP, because Pelan never does anything alone.*

1. **"Open it."** `[salgado loyalty +2]` `[avros suspicion +10]` `[flag: avros_envelope = 1]` `[flag: path_hold += 1]`
   ↳ She opens it with a paper knife, unhurried. Reads both pages. Puts them face down.
   ↳ > **Renata Salgado:** "Names and dates. Three contracts in Mognagna. One of the names is Pelan Avros. One is an OPP deputy you've had dinner with."
   ↳ > **Renata Salgado:** "It's a beginning, not a case. But now it's a beginning I can't pretend I didn't read."
2. **"Keep it closed until the budget is through."** `[salgado loyalty -2]` `[flag: avros_envelope = 2]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Renata Salgado:** "I'll keep it closed. I'll also keep a note of the date you asked me to."
   ↳ *Two months. You need Pelan's bench for two months, and then the law can have him. That is not protecting him. That is sequencing.*
3. **"Give it to me."** `[salgado loyalty -1]` `[flag: avros_envelope = 3]` `[flag: path_harden += 1]`
   ↳ She hesitates for exactly as long as it takes to decide that refusing a president is a worse precedent than obeying one.
   ↳ > **Renata Salgado:** "Then it's yours, Madam President. So is whatever's inside."

## anteroom

> **Renata Salgado:** "One more thing. There are people in my anteroom. They've been there since seven."

> **Renata Salgado:** "The Families of the Disappeared. Forty thousand signatures asking the government to open the archives sealed by the Amnesty Act. Their spokeswoman is Rosa Delmar. Her brother vanished in Sugar Bay in the last years of the regime. She was nineteen."

> **Renata Salgado:** "I'd like to receive them. I'd like you to know that General Voss will hear about it within the hour."

1. **"Bring her in. I'll receive her myself."** `[flag: files_petition = 1]` `[voss loyalty -1]` `[armed_forces opinion -1]` `[-1 STRUCT]` `→ delmar`
2. **"Receive them yourself, Renata. Tell them I'll write."** `[flag: files_petition = 2]` `[salgado loyalty +1]`
   ↳ > **Renata Salgado:** "A letter. They'll frame that too. They frame everything, these people. It's all they've been given."
3. **"Not now. Thank them, and ask them to be patient."** `[flag: files_petition = 3]` `[salgado loyalty -1]` `[voss loyalty +1]`
   ↳ > **Renata Salgado:** "They've been patient for twenty-five years, Madam President. I'll tell them you said so."

→ close

## delmar | Rosa Delmar

Rosa Delmar is smaller than her voice on the radio. She carries the petition in a supermarket bag, because, she says, the box broke on the bus.

> **Rosa Delmar:** "Thank you for seeing me. Most of them didn't."

> **Rosa Delmar:** "I'm not asking you to open anything today, Madam President. I know what you are and where you sit. I'm asking you to say, out loud, that you know it's closed."

1. **"I know it's closed. And I know why."** `[approval +2 @ mognagna]` `[flag: delmar_acknowledged = true]`
   ↳ She nods once, as though checking a word off a list she has carried for a very long time.
   ↳ > **Rosa Delmar:** "That's more than anyone has said in this building. I'll come back when you can say the next thing."
2. **"I can't promise you anything yet. I won't lie to you about that."** `[flag: path_hold += 1]`
   ↳ > **Rosa Delmar:** "No. You won't. That's why I'll come back."
3. **"Give me time. Not forever. Time."** `[flag: delmar_time_asked = true]` `[flag: voice += 1]`
   ↳ > **Rosa Delmar:** "Everyone asks for time. You're the first who said 'not forever'. I'll hold you to the 'not'."

## close

When you leave, the portrait is still leaning against the wall, face in. Salgado sees you look at it.

> **Renata Salgado:** "I'll turn it round when I've decided what he deserves."

1. **Leave her to her decisions** `[flag: seen_justice_briefing = true]`

→ END
