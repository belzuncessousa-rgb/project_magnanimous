---
id: p3-crisis-strikes
chapter: 3
title: The Port Stops
kind: crisis
location: katanai
token: strike
portraits: [sena, marco, salgado, mertens, voss]
background: port-gates
---

⚙️ Crisis (content/crises.json `strikes`): Ibicuí periphery and port strikes. Fires from the pressure meter (periphery CoL, no labour compact, no sanitation project, migration from the dry interior, CV and union mood…). Marco joins the strikers (DECISIONS). Outcomes: emergency package through Congress (`[vote: strike_package]`), decree, force, or personal mediation. Sets strike_outcome 1 package / 2 decree / 3 force / 4 unresolved.

## opening

At five in the morning, the dock workers of Katanaí do not go in. By nine, bus drivers in the peripheries have joined them, and crowds from the upper slopes block the two roads into the port. Ships wait at anchor across the gulf. By the afternoon the strike has spread to St. Veldra's transport depots.

No union called it. The National Workers' Confederation has asked people to go back to work. Almost nobody has.

Marco Prestes is at the main gate, sitting on a crate in front of the crowd. He is not speaking. Television crews film him anyway.

Livia has gathered Salgado, Mertens, Voss and Dorival Sena in the Blue Room.

> **Dorival Sena:** "They want three things: housing and a sewer on the slopes, bus services at night, and a wage increase at the port. They don't trust the confederation to negotiate for them. They might trust you."

> **Renata Salgado:** "The port handles a third of our trade. Every day it's closed costs the Treasury, and the shipping companies will start sending ships to Vassel."

> **Aldric Voss:** "If you want the port reopened by force, the army can do it in a day. I'd advise against it. I'd do it if ordered."

→ questions

## questions

1. **"Renata, can we meet their demands?"** `[once]` `→ questions`
   ↳ > **Renata Salgado:** "Partly. An emergency package in Congress could cover housing, buses and a temporary wage supplement. Mertens says it's close. Or you could decree some of it, if the Treasury can pay."
2. **"Caio, would Congress pass it?"** `[once]` `→ questions`
   ↳ > **Caio Mertens:** "Narrowly, with the Vanguard and some help. The Capital Party will vote against anything that looks like rewarding a strike."
3. **"Is Marco leading this?"** `[once]` `→ questions`
   ↳ > **Dorival Sena:** "No one is leading it. That's the problem. But they listen to him. If he says it's a fair deal, they'll go back."
4. **"Here is what we'll do."** `→ decide`

## decide

1. **"An emergency package. Take it to Congress today."** `→ vote`
2. **"I'll decree what the Treasury can pay for. Congress can debate it later."** `[cost: 30 FC]` `[col +2 @ ibicui]` `[unions opinion +2]` `[cp opinion -2]` `[+1 STRUCT]` `[flag: strike_outcome = 2]` `→ marco`
   ↳ > **Renata Salgado:** "It's legal, for ninety days. After that it needs Congress."
3. **"Reopen the port. Police first, the army if necessary."** `[flag: strike_force_used = true]` `[flag: strike_outcome = 3]` `[stability +5 @ ibicui]` `[approval -6 @ ibicui]` `[approval +2 @ tekoku, tapira]` `[unions opinion -4]` `[cv opinion -4]` `[marco loyalty -4]` `[+2 FORCE]` `[+1 STRUCT]` `[flag: path_harden += 2]` `→ force`
4. **"I'm going to the port to talk to them myself."** `[once]` `[cost: 2 PT]` `[marco loyalty +1]` `[unions opinion +1]` `[flag: lara_at_gates = true]` `→ gates`

## gates | At the Gates

You go to the port gates with Amanda and four guards. The crowd parts to let you through and closes behind you. Marco stands up from his crate.

> **Marco Prestes:** "Madam President. You came."

> **Marco Prestes:** "These people don't want speeches. They want to know what you'll do by Christmas."

You speak for twenty minutes, without a microphone, to the people nearest you. They pass your words back through the crowd. Some people shout. Most listen.

→ decide

## vote

1. **Go through the count with Mertens** `[vote: strike_package]` `→ vote-result`

## vote-result | The Result

1. **The package passes** `[show if: flag.vote.strike_package == 'passed']` `[col +3 @ ibicui]` `[unions opinion +3]` `[cv opinion +2]` `[approval +3 @ ibicui]` `[flag: strike_outcome = 1]` `→ marco`
   ↳ > **Caio Mertens:** "It passed. By a hair, but it passed."
2. **It passes, reduced** `[show if: flag.vote.strike_package == 'watered']` `[col +1 @ ibicui]` `[unions opinion +1]` `[flag: strike_outcome = 1]` `→ marco`
   ↳ > **Caio Mertens:** "They cut the wage supplement. Housing and buses survived."
3. **It fails** `[show if: flag.vote.strike_package == 'failed']` `[unions opinion -2]` `[approval -3 @ ibicui]` `[flag: strike_outcome = 4]` `→ unresolved`
   ↳ > **Caio Mertens:** "It failed. The strikers will hear it on the radio before you can tell them."

## marco

That evening Marco calls you on the private line, from a public phone near the port.

> **Marco Prestes:** "I've read it. It's not everything. It's real. I'll tell them to go back on Monday."

1. **"Thank you, Marco."** `[marco loyalty +2]` `→ end`
   ↳ > **Marco Prestes:** "Don't thank me. Build the pipe."
2. **"You could have told them to go back a week ago."** `[marco loyalty -1]` `→ end`
   ↳ > **Marco Prestes:** "I could have. They wouldn't have gone."

## force | The Port Reopens

Federal police clear the roads into the port at dawn, with army trucks behind them. There are scuffles at the main gate. Forty-one people are arrested.

One of them is Marco Prestes, sixty-nine years old, arrested for the fourth time in his life. The charge is obstructing a public road. He was sitting on a crate.

> **Renata Salgado:** "Do you want me to drop the charge against Prestes?"

1. **"Yes. Release him today."** `[marco loyalty +1]` `[salgado loyalty -1]` `[flag: marco_released = true]` `→ end`
   ↳ > **Renata Salgado:** "Then I'll release all forty-one. I won't release one man because he knows the President."
2. **"No. The law applies to him like everyone else."** `[marco loyalty -3]` `[salgado loyalty +1]` `[flag: marco_charged = true]` `→ end`
   ↳ Amanda writes it down without being asked.

## unresolved

The strike continues into December. The port works at half capacity. The Confederation and the government open talks without the strikers.

1. **Keep trying** `[flag: strike_unresolved = true]` `→ end`

## end

1. **Close the file** `[flag: seen_crisis_strikes = true]`

→ END
