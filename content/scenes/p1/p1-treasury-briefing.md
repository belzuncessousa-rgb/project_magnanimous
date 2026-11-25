---
id: p1-treasury-briefing
chapter: 1
turn: 2
title: The Books
kind: briefing
location: capital
portraits: [fontes]
background: treasury-office
---

⚙️ Treasury briefing. Fontes reveals the hole: debt service ≈ 11% of revenue owed to the Fund, plus arrears the Castelar government pushed off the books, plus the Corvel contract still alive under Luz's sanitation works. NO debt decision here (that is chapter 2). What is decided: how Lara receives and handles the news, and what she does with the Corvel file.

## opening

The Treasury occupies the ugliest building in New Veldrania, which Fontes says is the only honest piece of architecture in the capital. His office is on the ninth floor. The coffee is cold before it reaches the desk. The paper roll from his calculator hangs over the edge like a tongue.

He does not stand when you come in. Then he remembers and stands, and then you both sit, and that is the last thing in the meeting that goes smoothly.

> **Alexander Fontes:** "Three things. A number, a habit and a contract. In that order, because the order is the only mercy I have."

> **Alexander Fontes:** "The number. Everything Kunasai owes, it owes to the Fund. The interest alone takes about a ninth of what we collect. Before salaries. Before pensions. Before a single pencil."

> **Alexander Fontes:** "The habit. The previous government didn't pay its contractors for its last eight months. It didn't record the bills either. They were in a drawer. I've found the drawer."

> **Alexander Fontes:** "And the contract. Corvel. The Great Sanitation Works are not cancelled, Madam President. They are *paused*. The contract is valid. Whoever finishes them pays Corvel's prices, or goes to court with Corvel."

*Corvel. The sign above your mother's street: works resume soon.*

1. **"Who else knows all three?"**
   ↳ > **Alexander Fontes:** "The Fund knows the first. Castelar's last Treasury minister knows the second; he's in St. Veldra writing articles about fiscal responsibility. Nobody knows the third the way I do, because I read the annexes. Nobody reads the annexes."
2. **"How long have you known?"**
   ↳ > **Alexander Fontes:** "The number, for years. The drawer, since Tuesday. The annexes, since about four this morning."
   ↳ He does not look like a man who slept between Tuesday and four this morning.
3. **"Is it worse than the campaign said?"**
   ↳ > **Alexander Fontes:** "The campaign said it was bad. It's bad in more places."

## telling

> **Alexander Fontes:** "So. The question I can't answer for you. Who do we tell, and how loudly?"

⚙️ Option 4 is the hook for the achievement "That's an order from your commander — tell Alexander to figure it out" (flag alexander_ordered).

1. **"The country. This week, in plain language, all of it."** `[fontes loyalty +2]` `[flag: hole_public = true]` `[approval -3 @ all]` `[media opinion +1]` `[flag: path_hold += 1]`
   ↳ > **Alexander Fontes:** "Honesty. Good. The bond desks will hate it for a week and believe us for a year."
   ↳ > **Alexander Fontes:** "The Fund will call it 'transparency'. When they say it, it's a warning."
2. **"Nobody, until we have a plan to go with it."** `[fontes loyalty -1]` `[flag: hole_quiet = true]` `[flag: voice += 1]`
   ↳ > **Alexander Fontes:** "The Fund already has the number. 'Until we have a plan' is a figure of speech, and the Ledger reads figures of speech for a living."
   ↳ *A week. A plan. Then the truth, whole and with a remedy attached. That is not hiding. That is timing.*
3. **"Blame Castelar. Loudly, and with the drawer."** `[cp opinion -2]` `[approval +2 @ ibicui, mognagna]` `[fontes loyalty +1]` `[flag: hole_castelar = true]` `[flag: path_harden += 1]`
   ↳ > **Alexander Fontes:** "It has the advantage of being true. That's what makes it dangerous. True things get used for longer than you intended."
4. **"That's an order, Alexander. Figure it out."** `[fontes loyalty -1]` `[flag: alexander_ordered = true]`
   ↳ He looks at you over his glasses for some time.
   ↳ > **Alexander Fontes:** "I'll put that in the minutes, Madam President. Word for word. Someone should enjoy it later."

## corvel

He slides a binder across the desk. On the spine, in somebody's careful hand from eight years ago: *GSW — Corvel — Annexes 1–14*.

> **Alexander Fontes:** "Annex nine. Unit prices. A metre of trunk pipe at roughly what a metre of railway costs. Your party signed it, Madam President. Tercilio signed it on television."

1. **"Send the binder to Renata Salgado."** `[salgado loyalty +1]` `[pm opinion -1]` `[flag: corvel_to_salgado = true]` `[flag: path_hold += 1]`
   ↳ > **Alexander Fontes:** "She'll find what I found. Then she'll find the people who wrote it. Some of them still have offices in your party."
   ↳ > "I know where their offices are."
2. **"Keep it here. Nobody opens it before the bench has voted on anything."** `[flag: corvel_held = true]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ He takes the binder back. He does not put it in the drawer with the other bills. He puts it on the shelf behind him, where you will be able to see it every time you sit in this chair.
3. **"What would it cost to finish the works honestly?"** `[fontes loyalty +1]` `[flag: corvel_costed = true]`
   ↳ > **Alexander Fontes:** "Less than it has already cost dishonestly. That's the joke. Half the pipe is in the ground. If we could renegotiate annex nine, it's the cheapest of anything Marne will show you."
   ↳ > **Alexander Fontes:** "If."

## march

> **Alexander Fontes:** "Last thing, and it's not for today. The Fund's review mission arrives in March. A man called Anselm Royce. Very courteous. He'll want to know whether we intend to pay down what we owe, borrow more, or carry on as we are."

> "And what would you tell him?"

> **Alexander Fontes:** "I'd pay a little. Not because it helps much. Because they watch."

1. **"We'll decide in March. Get me every option on paper."** `[flag: fontes_hole_known = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "On paper is the only place they exist, Madam President."
2. **"Borrowing more is off the table. Write that down."** `[fontes loyalty +1]` `[-1 WELF]` `[flag: fontes_hole_known = true]` `[flag: no_more_fund = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "I'll write it in pencil. The Fund has a way of putting things back on tables."
3. **"Find me room for the projects first. The Fund can wait its turn."** `[fontes loyalty -2]` `[+1 ECON]` `[flag: fontes_hole_known = true]` `[flag: projects_first = true]` `[flag: seen_treasury_briefing = true]`
   ↳ > **Alexander Fontes:** "The Fund has never once waited its turn. It invented turns."

## leaving

On your way out you pass the drawer. It is an ordinary grey filing cabinet. Someone has stuck a yellow note on it that says, in Fontes' handwriting, *PAST*.

→ END
