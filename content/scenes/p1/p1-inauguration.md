---
id: p1-inauguration
chapter: 1
turn: 1
title: Inauguration Address
kind: fixed
location: capital
token: palace
order: 1
portraits: [mertens]
background: palace-doors
---

⚙️ Source: the author's "Inauguration Address" (docs/gdd/06-scenes/p1-opening-the-curtain/inauguration-address.md). Structure, choices and choice labels kept. Round 2: the spoken topic texts are toned down per STYLE-GUIDE §1 (same length, shorter sentences, fewer names and examples); FINISH is hidden (not greyed) until two topics have been spoken.
⚙️ No RELIG topic (faith emerges later). Every topic starts as skipped (`address_skipped_<axis> = true`, set on the door nod) and is cleared when spoken. Skipped topics get a witness at the end.
⚙️ Flags: address_skipped_{econ,struct,iden,welf,force}; address_{axis} = 1 (+2 pole) / 2 (−2 pole) / 3 (centre); address_topics; greeting 1–4; promised_CoL / promised_GDP / promised_power.

## opening

As you hear the muffled roar of the crowd waiting outside, the reality of it hits you all at once. You have actually been elected president of Kunasai. The nation is waiting to see what kind of leader you will be — and standing here, you find you are wondering the very same thing. Your mind goes back to all those years in the NGOs and at the party rallies, the work of standing beside the people who needed the state the most and were the most thoroughly forgotten by it.

1. **You are still in this for them** `[+1 WELF]` `[col +1 @ all]`
   ↳ *The work toward a more equal country is yours for life, and you will do everything in your power to see it through.*
2. **All that sweat and tears has finally paid off** `[approval +5 @ all]`
   ↳ *You won millions of faithful voters. Now you can focus on what really matters.*
3. **Now, the nation must come first** `[stability +1 @ all]`
   ↳ *Kunasai itself must be your priority above all. Prosperity will follow.*

## mertens

You glance at your vice president, Caio Mertens. He was the price you had to pay the OPP to hold the coalition together and win today. He will not be the last cost the OPP asks of you.

*You think, a little worried.*

1. **Such are the ways of democracy** `[-1 STRUCT]`
   ↳ *Allying yourself with an ideological rival only makes a government more mindful, more careful.*
2. **Soon, you will no longer need them** `[opp capacity -2]`
   ↳ *The OPP will matter much less once you have proven your worth.*
3. **The OPP is a reliable partner, if nothing else** `[mertens opinion +5]`
   ↳ *Their political and institutional experience will be of real value to your government.*

## doors

You look back at your ministers and the senior figures of your party, ready to follow you out. There is a great deal of work ahead of all of you. Two guards of the Jaguar Guard, the old presidential guard in green armour, stand at the doors with their hands on the handles, waiting for your signal.

⚙️ The nod marks every address topic as skipped; speaking a topic clears its flag.

1. **Nod for them to open the doors** `[flag: address_skipped_econ = true]` `[flag: address_skipped_struct = true]` `[flag: address_skipped_iden = true]` `[flag: address_skipped_welf = true]` `[flag: address_skipped_force = true]` `→ balcony`

## balcony | The Balcony

You step out into the sun. The crowd filling Plateau Square starts cheering. It is time for your first address to the nation as president.

1. **"My fellow Kunasaians…"** `[+1 IDEN]` `[flag: greeting = 1]`
2. **"Faithful people of Kunasai…"** `[+1 RELIG]` `[flag: greeting = 2]`
3. **"Sisters and brothers…"** `[+1 ECON]` `[flag: greeting = 3]`
4. **"Dear people of Kunasai!"** `[flag: greeting = 4]`

## long-road

> "We have come a long way in this election."

1. **"But regardless of political affiliation, I will make sure Kunasai is better for everyone."** `[stability +3 @ national]` `[approval -5 @ ibicui, mognagna, ibira]`
2. **"And the support I was given by the people, I will give back to the people."** `[stability -3 @ national]` `[approval +5 @ ibicui, mognagna, ibira]`
3. **"But a long road still lies ahead of us on this journey."**

## faith

> "I know that many of you have lost faith in the honesty of government, after the administrations that came before. But know this:"

1. **"We will improve the lives of every Kunasaian, everywhere."** `[flag: promised_CoL = true]`
   ↳ > "We will keep working until every woman, man and child has the same opportunities and the same rights, whatever their colour or background."
2. **"We will turn our nation into a powerhouse."** `[flag: promised_GDP = true]`
   ↳ > "And that growth will bring opportunity to every worker."
3. **"We will bring real change for the true powerhouse of this country: the people!"** `[flag: promised_power = true]`
   ↳ > "This is our country, and everyone who works in it should share in what it produces."

## address | The Address

The square goes quiet. Thousands of people are looking up at you. You have imagined this moment for years. Now you have to decide where to begin.

→ hub

## hub

⚙️ Hub: each topic once. FINISH appears only after two topics have been spoken (show if, per STYLE-GUIDE §5).

1. **"Let me speak first of work"** `[once]` `→ topic-econ`
2. **"Let me speak of power"** `[once]` `→ topic-struct`
3. **"We must also discuss Kunasai's place in the world"** `[once]` `→ topic-iden`
4. **"And let us not forget the people"** `[once]` `→ topic-welf`
5. **"In such times of global upheaval, we must discuss how we stand as a country"** `[once]` `→ topic-force`
6. **"Thank you for entrusting me with this noble mission"** `[show if: flag.address_topics >= 2]` `→ finish`

## topic-econ | Work

> "Let me speak first of work. It was work that built this country, and it is work that has waited longest for its reward. Most of you earn your living on the land, on the docks, behind a counter or on a factory line. You start early and you finish late. For as long as most of us can remember, what you produce has gone to other people first. I have spent years talking with people who do this work, in the countryside and in the cities. I have watched the money move away from them. Very little of it comes back to the people who made it."

1. **"The wealth of this land has flowed upward for too long — and we are going to turn that current around."** `[+2 ECON]` `[flag: address_econ = 1]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "This will be done fairly and within the law. For generations, the people who plant, harvest and carry have been told to wait for their share. Wait for a good harvest. Wait for the markets to improve. Wait until others have been paid. That waiting ends with this government. Those who work the land will have a stake in it. Those who create wealth will share in it. We will not tear down what Kunasai has built. We will make sure the people who built it are properly paid."
2. **"Prosperity cannot be summoned by decree — so we will unbind the hands that build."** `[-2 ECON]` `[flag: address_econ = 2]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "No country has ever taxed its way to prosperity, and I will not pretend otherwise to win applause. Farmers, traders and the people who open small shops at dawn keep this economy running. For too long they have been held back by permits, fines and a state that does not trust its own people. We will reduce that burden. We will make it easier to start and run a business. When a country grows, the people at the bottom should rise with it, and I intend to make sure they do."
3. **"I will not promise you a new economy. I will promise you an honest one."** `[0 ECON]` `[flag: address_econ = 3]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "Many governments have promised from this balcony that next year will be better if you are patient now. I will not repeat that promise. What I can offer is a government that keeps honest accounts, taxes fairly and does not steal. There will be no miracles. There will be work, measured fairly and paid fairly. Given time, that builds real wealth."

→ hub

## topic-struct | Power

> "Let me speak of power, and of where it belongs in a free country. Many of you remember the years when this palace was closed to the people. Decisions were made about you, without you. We have come a long way since then. But the old habits of power did not disappear when the dictatorship ended. They adapted, and they are still here. I did not come to this office to continue them."

1. **"Where the state has been a stranger to you, it will become a protector."** `[+2 STRUCT]` `[flag: address_struct = 1]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "In too many places the state has been absent, and the poorest have paid for it. In some neighbourhoods the only authority is fear. In some towns the law never arrives. That will change. Where the state has been missing, it will return, with roads, with clinics, and with police who protect people. A state strong enough to protect its citizens is not their enemy. It is one of the first things a free people needs."
2. **"I would sooner govern small and honest than vast and feared."** `[-2 STRUCT]` `[flag: address_struct = 2]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "I have seen what unchecked power does in this country, and I do not want to add to that history. The reasons for more power always sound good at the start. This government will step in where people need protection and step back when the job is done. I will not create any power that I would be afraid to hand to whoever comes after me. The state should be strong enough to serve you, and never strong enough to own you."
3. **"Power is a tool, never a throne."** `[0 STRUCT]` `[flag: address_struct = 3]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "I intend to use power where it is needed and give it up where it is not. When my term ends, I would like to be judged by how little of it I needed to keep. The temptation of this office is not money. It is a quiet voice that says *just this once, just a little more, just until the work is done.* I have heard that voice already. I intend to keep saying no to it, in public, where you can hold me to it."

→ hub

## topic-iden | Place in the World

> "We must also speak of who we are. This country changed completely after the Veldrans arrived. The peoples who were already here, and the many who came later, became something new together. We speak different languages at home. We pray in different ways. We do not look alike. What we share is this land and a future in common."

1. **"We are not an island, and I will not govern as though we were."** `[-2 IDEN]` `[flag: address_iden = 2]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "A country as varied as ours cannot live behind walls. The world is changing whether we agree or not. Countries that close their doors do not protect themselves. They fall behind. Kunasai will be stronger if it is open to trade, to partners and to new ideas, and to the people and investment that come with them. I would rather we help shape that world than complain about it from outside."
2. **"Our soil is our own, and our future is ours alone to write."** `[+2 IDEN]` `[flag: address_iden = 1]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "Being open must never mean being for sale. Our land is our own. The price of what we produce, the future of our ports and the laws our children will live under are decided here, by Kunasaians. Not by the Arennian Federation, not by Zharan, not by any other power. We will deal fairly with all of them. But we will protect our sovereignty, and no foreign government will sign where a Kunasaian should."
3. **"We need be neither a fortress nor a marketplace."** `[0 IDEN]` `[flag: address_iden = 3]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "We are often told there are only two choices: open the gates to everyone, or close them to everyone. I do not accept that. We can trade with every country without depending on any of them. We can take what is useful from abroad and keep what is good at home. A country that knows its own worth does not need walls, and it does not need to sell itself either."

→ hub

## topic-welf | The People

> "And let us not forget the people, who are the reason any of this matters. I spent most of my life in places the government had forgotten. Poor neighbourhoods on the edge of the big cities. Dry towns where one bad season means hunger. Villages where the nearest doctor is a day away. I did not discover these places as a politician. I grew up in one of them, and I have not forgotten it."

1. **"No child in this country will learn hunger before they learn to read."** `[+2 WELF]` `[flag: address_welf = 1]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "Taking care of each other is not charity, offered in good years and withdrawn in bad ones. It is the floor everyone stands on. I intend to build that floor for every Kunasaian, in remote places as well as in the capital. A clinic with staff. A school with a roof. Enough to eat. These are not luxuries a poor country cannot afford. They are how a poor country stops being poor. We will find the money."
2. **"A compassion that outruns the treasury becomes a cruelty by the next season."** `[-2 WELF]` `[flag: address_welf = 2]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "I will help those who have fallen behind. That is a promise. But I will do it honestly, within our means, and in ways that last beyond my term. I have seen governments make generous promises they could not pay for. When the money ran out, the poorest suffered first. A programme we cannot sustain is a debt we have not admitted to yet. We will help in ways that last."
3. **"Ask, every year: are the least among us better off than we found them?"** `[0 WELF]` `[flag: address_welf = 3]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "I want this government to be measured by one question, and I want you to ask it every year: are the poorest Kunasaians better off than when we started? Not the averages. Not the figures that look good in a speech. The people at the very bottom, the people I grew up with. If the answer is yes, we will have earned this office. If it is no, nothing else we report will matter much."

→ hub

## topic-force | How We Stand

> "We also need to speak plainly about how we stand in the world. The world outside our borders is becoming more dangerous, and a country that cannot defend itself does not choose its own future. To our south is the Arennian Federation. To the east, across the sea, is Zharan. Their rivalry now reaches every part of Arvane, and they rarely ask smaller countries for permission. I will not try to frighten you, and I will not lie to you. The question is whether we face this on our own terms."

1. **"We will not be caught defenseless."** `[+2 FORCE]` `[flag: address_force = 1]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "Those who guard this country, at the borders, on our streets and at sea, will have the means and the training to do it well. I take no pleasure in saying this. But a country that is unprepared in a dangerous time ends up taking orders from others. Peace is kept by those who are clearly ready to defend it. We will be ready, so that no one is tempted to threaten us."
2. **"I have seen what becomes of a republic that falls in love with its own armies."** `[-2 FORCE]` `[flag: address_force = 2]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "When a republic puts its army first, the barracks grow and the schools go short. Generals start giving advice nobody asked for. Then one day the guns face inward. That will not happen here while I am in this office. Real security comes from people who have roads, clinics and something worth defending. We will keep what we need to be safe, and we will not buy weapons with money our children need."
3. **"We will carry a steady hand — neither rattling the sword nor casting it aside."** `[0 FORCE]` `[flag: address_force = 3]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "Kunasai will prepare for the world as it is, not as we would like it to be, and not as the fearmongers describe it. We will not threaten our neighbours, and we will not disarm while larger powers compete around us. We will spend on defence what is sensible, and we will explain every coin of it."

→ hub

## finish | Thank You

> "I make you no promises today that I do not mean to keep on the hard mornings to come — in the budget rooms, on the floor of the chamber, in the long and unglamorous work of governing that no balcony will ever show you. Promises are easy in the sunlight. I ask only that you hold me to mine when the sky turns grey."

> "Thank you, Kunasai — for your trust, and for the noble work you have placed in my hands. This country was always yours. Today, we only make it official."

⚙️ Witnesses for skipped topics. Plain statements; each person returns later (Fontes, Salgado, the Arennian ambassador, Marco Prestes, Voss).

1. **Look out over the square one last time**
   ↳ `[if: flag.address_skipped_econ]` Behind you, the new Treasury minister closes the notebook he opened when you began. He had not written anything in it.
   ↳ `[if: flag.address_skipped_struct]` Renata Salgado, your Justice minister, had been waiting for you to mention the courts. You did not, and she noticed.
   ↳ `[if: flag.address_skipped_iden]` In the diplomatic stand, the Arennian ambassador puts his phone away. He had been ready to report a line about his country.
   ↳ `[if: flag.address_skipped_welf]` Near the barrier, an old man in a union cap stops clapping. You know him well: Marco Prestes, from your old neighbourhood. He looks at you for a moment, then turns and leaves.
   ↳ `[if: flag.address_skipped_force]` General Aldric Voss, your Defense minister, stands at the edge of the balcony in uniform. He expected a word about the armed forces. He keeps his eyes on the crowd.

## curtain

The square is louder than anything you have heard in your life. Standing in the middle of it, you feel very quiet. You raise your hand one last time, to remember this. Then you turn, the great doors close behind you, and the work begins.

→ END
