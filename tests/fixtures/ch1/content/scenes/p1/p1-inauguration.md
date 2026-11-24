---
id: p1-inauguration
chapter: 1
turn: 1
title: Inauguration Address
kind: fixed
location: capital
order: 1
portraits: [mertens]
background: palace-doors
---

⚙️ Source: the author's "Inauguration Address" (docs/gdd/06-scenes/p1-opening-the-curtain/inauguration-address.md). Text kept as written. Changes: the FORCE intro places the Arennian Federation to the SOUTH; the duplicated closing paragraph is removed; tokens converted to docs/SCENE-FORMAT.md syntax; the topic hub implemented with [once] and a FINISH option.
⚙️ Open questions resolved: (1) no RELIG topic — faith emerges later through the Communion/FFF arcs and the "Faithful people" greeting; (2) FINISH is locked until at least 2 topics have been spoken; (3) every topic starts as skipped (`address_skipped_<axis> = true`, set on the door nod) and is cleared when spoken. Skipped topics get a witness at the end of the speech and feed later reactions (news, Voss, Marco, Fontes).
⚙️ Flags written: address_skipped_{econ,struct,iden,welf,force}; address_{econ,struct,iden,welf,force} = 1 (+2 pole) / 2 (−2 pole) / 3 (centre); address_topics (count); greeting = 1 national / 2 faith / 3 comrades / 4 plain; promised_CoL / promised_GDP / promised_power.

## opening

As you hear the muffled roar of the crowd waiting outside, the reality of it hits you all at once. You have actually been elected president of Kunasai. The nation is waiting to see what kind of leader you will be — and standing here, you find you are wondering the very same thing. Your mind goes back to all those years in the NGOs and at the party rallies, the work of standing beside the people who needed the state the most and were the most thoroughly forgotten by it.

1. **You are still in this for them** `[+1 WELF]` `[col +1 @ all]`
   ↳ *The work toward a more equal country is yours for life, and you will do everything in your power to see it through.*
2. **All that sweat and tears has finally paid off** `[approval +5 @ all]`
   ↳ *You won millions of faithful voters. Now you can focus on what really matters.*
3. **Now, the nation must come first** `[stability +1 @ all]`
   ↳ *Kunasai itself must be your priority above all. Prosperity will follow.*

## mertens

You glance at your vice president, Caio Mertens. As unimpressive as he may seem, he was the price you had to pay the OPP to hold the coalition together and secure today's victory. And he will not be the last cost the OPP extracts from you.

*You think, a little worried.*

1. **Such are the ways of democracy** `[-1 STRUCT]`
   ↳ *Allying yourself with an ideological rival only makes a government more mindful, more careful.*
2. **Soon, you will no longer need them** `[opp capacity -2]`
   ↳ *The spineless OPP will be a thing of the past once you have proven your worth.*
3. **The OPP is a reliable partner, if nothing else** `[mertens opinion +5]`
   ↳ *Their political and institutional expertise will be of real value to your government.*

## doors

You look back at your ministers and the senior figures of your party, gathered and ready to follow you out into the cheering. There is so much work ahead of all of you — and you can only hope they will keep pace with you. A pair of Jaguar honor guards watch you, hands resting on the door handles, waiting for your signal — their polished emerald armor catching the light of the room.

⚙️ The nod marks every address topic as skipped; speaking a topic clears its flag.

1. **Nod for them to open the doors** `[flag: address_skipped_econ = true]` `[flag: address_skipped_struct = true]` `[flag: address_skipped_iden = true]` `[flag: address_skipped_welf = true]` `[flag: address_skipped_force = true]` `→ balcony`

## balcony | The Balcony

You step into the sun, and a roaring cheer breaks over you, revealing the vast crowd filling Plateau Square. It is time for your first address to the nation as president.

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

> "And I know that many of you have lost faith in the integrity of government, after all the administrations that came before. But know this:"

1. **"We will improve the lives of every Kunasaian, everywhere."** `[flag: promised_CoL = true]`
   ↳ > "And we will not stop until every woman, man, and child has the same opportunities and the same rights as anyone else — regardless of their color or their station."
2. **"We will turn our nation into a powerhouse."** `[flag: promised_GDP = true]`
   ↳ > "And in doing so, bring development and opportunity to every worker."
3. **"We will bring real change for the true powerhouse of this country: the people!"** `[flag: promised_power = true]`
   ↳ > "This is our country! And we will fight so that every one of us shares in the fruits of its labor!"

## address | The Address

The square falls into a waiting hush. Every face is turned up toward you. You have imagined this moment for years — and now that it is here, you find there is no script, only the truth, however you choose to tell it. You decide where to begin.

→ hub

## hub

⚙️ Hub: each topic can be spoken once, then drops from the menu. FINISH is shown locked until two topics have been spoken (a locked option tells the player the speech is not done yet).

1. **"Let me speak first of work"** `[once]` `→ topic-econ`
2. **"Let me speak of power"** `[once]` `→ topic-struct`
3. **"We must also discuss Kunasai's place in the world"** `[once]` `→ topic-iden`
4. **"And let us not forget the people"** `[once]` `→ topic-welf`
5. **"In such times of global upheaval, we must discuss how we stand as a country"** `[once]` `→ topic-force`
6. **"Thank you for entrusting me with this noble mission"** `[lock if: flag.address_topics < 2]` `→ finish`

## topic-econ | Work

> "Let me speak first of work — for it was work that built this country, and work that has been made to wait longest for its reward. The cotton of Mognagna and the great estates and mills of Tapira; the wheat that now grows where the tobacco fields of Ibicuí once stood; the ships that crowd the port of Katanaí from the first light of morning; the banks and trading floors of St. Veldra, where more wealth changes hands before lunch than most of you will hold in a lifetime. This is the labor that feeds Kunasai — in the furrow, on the docks, behind the counter, on the line — and for as long as any of us can remember, it has filled the coffers of others first. I have stood in those fields before sunrise, and I have walked beneath those glass towers after dark. I have watched the wealth roll down to the ports and up into the offices, and I have seen how little of it ever finds its way back to the hands that made it."

1. **"The wealth of this land has flowed upward for too long — and we are going to turn that current around."** `[+2 ECON]` `[flag: address_econ = 1]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "Not through charity, and not through envy, but through plain justice. For generations the people who plant and harvest and haul have been told to wait — that their share would come once the harvest was good, once the markets were kind, once the powerful had taken theirs first. That waiting ends with this government. The one who works the land will have a stake in it. The one who builds the wealth will share in it. We will not tear down what Kunasai has built — we will finally let the builders sit at the table they have spent their whole lives setting."
2. **"Prosperity cannot be summoned by decree — so we will unbind the hands that build."** `[-2 ECON]` `[flag: address_econ = 2]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "No nation in the history of the world has ever taxed its way to greatness, and I will not pretend otherwise to win your applause. The farmer, the merchant, the woman who opens her shop before dawn — these are the engine of Kunasai, and for too long that engine has been smothered under permits and penalties and the dead weight of a state that distrusts its own people. We will lift that weight. We will let enterprise breathe. And a country that is truly growing, I promise you, leaves no one standing where they began."
3. **"I will not promise you a new economy. I will promise you an honest one."** `[0 ECON]` `[flag: address_econ = 3]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "That is the lie every government before mine has told from this very balcony — that prosperity is a switch to be thrown, that next year will be golden if only you are patient now. I will not insult you with it. What I offer is harder and worth far more: a government that counts honestly, that taxes fairly, and that steals nothing. No miracles. No theft. Only work, fairly measured and fairly paid — and the slow, real wealth that honesty builds when it is given the time it needs."

→ hub

## topic-struct | Power

> "Let me speak of power — and of where, in a free country, it truly belongs. You know better than most what that word has meant in Kunasai. There are men and women standing in this very square who remember the years when the doors of this palace were shut to the people, when power was a thing done *to* you in the dark rather than held *by* you in the light. We have come a long way from those days. But the old machine did not vanish — it only learned to wear better clothes. I did not seek this office to inherit it."

1. **"Where the state has been a stranger to you, it will become a protector."** `[+2 STRUCT]` `[flag: address_struct = 1]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "For too long, the weakness of the state has been paid for by the poorest among us — in neighborhoods where the only authority is fear, in towns the law forgot, in homes where help never came because no one with power was watching. That changes now. Where the state has been absent, it will return: to build your roads, to staff your clinics, to stand between you and those who would prey on you. A government strong enough to defend its people is not their enemy. It is the first thing a free people ever needed, and the last thing they should ever surrender."
2. **"I would sooner govern small and honest than vast and feared."** `[-2 STRUCT]` `[flag: address_struct = 2]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "I have seen with my own eyes what unchecked power does in this land, and I will not become its next chapter — no matter how good the reasons sound, and they always sound good at the start. This government will step into your lives only to protect them, and step back out the very moment its work is done. I will not build a single new wall, a single new office, a single new power that I would be afraid to hand to the person who comes after me. Strong enough to serve you, never strong enough to own you."
3. **"Power is a tool, never a throne."** `[0 STRUCT]` `[flag: address_struct = 3]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "I mean to use it where it is needed and to lay it down where it is not — and to be judged, when all of this is finally over, not by how much of it I managed to gather, but by how little I needed to keep. The temptation of this office is not money. It is the quiet voice that says *just this once, just a little more, just until the work is done.* I have heard that voice already. I intend to spend the next years learning to say no to it, in front of you, where you can hold me to it."

→ hub

## topic-iden | Place in the World

> "We must also speak of who we are. Our country has changed beyond all recognition since the arrival of the Veldrans — and from that first hard collision of peoples, from the nations who were already here and the many who came after, we became something none of them ever intended. A melting pot of tongues and faiths and bloodlines, bound together not by sameness but by a shared horizon. There is no single face of Kunasai. There is the fisherman and the factory hand, the elder of Ibira and the newcomer in Ibicuí, and a thousand more besides — and the land we have made common between us."

1. **"We are not an island, and I will not govern as though we were."** `[-2 IDEN]` `[flag: address_iden = 2]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "A people as broad as ours cannot afford to live behind walls. The world is changing whether we consent to it or not, and the nations that shut their doors against that change do not preserve themselves — they are simply left behind by it. Kunasai grows strongest with its doors thrown open: to trade, to partners, to ideas, to the talent and the capital that go looking for countries brave enough to welcome them. I would rather we shape the new world by standing inside it than curse it from behind a locked gate."
2. **"Our soil is our own, and our future is ours alone to write."** `[+2 IDEN]` `[flag: address_iden = 1]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "But a melting pot is not a thing to be melted down by others, and openness must never curdle into submission. Our soil is our own. The price of our cotton, the future of our harbors, the laws our children will live under — these are not for sale, not to the Arennian Federation, not to Zharan, not to any power that mistakes our courtesy for weakness. We will deal fairly with all of them. But we will hold our heads high, and we will hold our sovereignty closer still, and no foreign hand will ever again sign its name where a Kunasaian's belongs."
3. **"We need be neither a fortress nor a marketplace."** `[0 IDEN]` `[flag: address_iden = 3]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "The truth is that the loudest voices always offer you the same false choice: throw the gates open to everyone, or wall ourselves off from everyone. I reject both. We can be something simpler, and far rarer in this world — a nation that knows exactly what it is worth, that trades honestly with all and kneels to none, that takes what is good from beyond its borders without surrendering what is good within them. Confidence does not need walls. Nor does it need to sell itself to feel safe."

→ hub

## topic-welf | The People

> "And let us never forget the people — for in the end they are the only reason any of this matters at all. I spent the better part of my life in the places this government had abandoned: the peripheries of Ibicuí where the city's lights do not reach, the dry backlands of Mognagna where a bad season still means an empty table, the villages of Ibira where a doctor is a rumor and a school is a half-day's walk. I did not travel down from the palace to find these places. I came up from them. And I have not forgotten the road."

1. **"No child in this country will learn hunger before they learn to read."** `[+2 WELF]` `[flag: address_welf = 1]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "The care we owe one another is not a charity to be rationed out in the good years and withdrawn in the lean ones. It is the floor we all stand on — and I mean to build that floor beneath every last Kunasaian, in the forgotten corners as surely as in the capital. A clinic that is staffed. A classroom with a roof. A meal that is certain. These are not luxuries a poor country cannot afford; they are the very things that stop a poor country from staying poor. We will find the means, because the alternative is a debt no nation ever stops paying."
2. **"A compassion that outruns the treasury becomes a cruelty by the next season."** `[-2 WELF]` `[flag: address_welf = 2]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "I will lift up the ones who have fallen — make no mistake, that is my promise and I will keep it — but I will do it honestly, within our means, and built to outlast my time in this office. I have watched good governments make beautiful promises they could not fund, and I have watched the poorest people pay for that vanity when the money ran dry and the programs vanished. A gift you cannot sustain is only a debt you have not yet named. We will help in ways that endure, not in ways that collapse the moment the cheering stops."
3. **"Ask, every year: are the least among us better off than we found them?"** `[0 WELF]` `[flag: address_welf = 3]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "This government will be measured by a single question, and I want you to ask it of me out loud, every year I am here: are the least among us better off than we found them? Not the averages. Not the figures we can dress up for a speech. The ones at the very bottom — the ones I grew up beside. If the answer is yes, then we have earned this place. If it is no, then no other number we report and no ribbon we cut will be worth the paper it is printed on."

→ hub

## topic-force | How We Stand

> "In such times of upheaval, we must speak plainly of how we stand — for the world beyond our borders grows colder by the year, and a nation that cannot defend itself does not get to choose its own fate. To our south stands the Arennian Federation; to the east, the rising strength of Zharan — two giants whose rivalry now reaches into every corner of Arvane, and whose contest rarely pauses to ask the consent of smaller nations like ours. The old certainties are dissolving. I will not frighten you, and I will not lie to you: the only question that was ever truly ours to answer is whether we would meet this new world standing on our own feet."

1. **"We will not be caught defenseless."** `[+2 FORCE]` `[flag: address_force = 1]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "Those who guard this country — at our borders, on our streets, on the waters of the strait — will have the strength and the discipline to do it well. I take no joy in saying so. But a nation caught unprepared in a hard age is a nation that ends up taking orders, and I did not fight my whole life for Kunasai's voice only to see it drowned out by louder powers. Peace in this world is kept by those who are visibly ready to defend it. We will be ready — not to threaten anyone, but so that no one need ever wonder whether threatening us would be worth their while."
2. **"I have seen what becomes of a republic that falls in love with its own armies."** `[-2 FORCE]` `[flag: address_force = 2]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "The barracks grow fat while the schools go hungry, the generals learn to whisper in the halls of power, and one morning the people wake to find the guns pointed inward. Not here. Not while I stand in this office. True strength was never the rifle alone — it is a people with roads and clinics and something genuinely worth defending. We will keep what we need to be safe. We will not buy a single weapon with the bread our children needed, nor hand a single inch of this republic to those who would rule it by force."
3. **"We will carry a steady hand — neither rattling the sword nor casting it aside."** `[0 FORCE]` `[flag: address_force = 3]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "Kunasai will be ready for the world as it actually is, not the world we might wish it to be — and not the world the fearmongers would sell us either. We will neither rattle our sword at every shadow nor cast it foolishly aside while giants circle our region. There is a steadiness between those two follies, and that is where this government will stand: spending on our defense exactly what wisdom demands, not one coin less for the sake of comfort, and not one coin more for the sake of glory."

→ hub

## finish | Thank You

> "I make you no promises today that I do not mean to keep on the hard mornings to come — in the budget rooms, on the floor of the chamber, in the long and unglamorous work of governing that no balcony will ever show you. Promises are easy in the sunlight. I ask only that you hold me to mine when the sky turns grey."

> "Thank you, Kunasai — for your trust, and for the noble work you have placed in my hands. This country was always yours. Today, we only make it official."

⚙️ "Silence has a witness": one short line per skipped topic. Witnesses are people the player will meet again (Fontes, Salgado, the Federation ambassador, Marco Prestes, Voss).

1. **Look out over the square one last time**
   ↳ `[if: flag.address_skipped_econ]` Behind you, the new Treasury minister closes a small notebook he had opened when you began.
   ↳ `[if: flag.address_skipped_struct]` Renata Salgado, two steps back, waits for a sentence about the law that does not come. She does not seem surprised. She seems to be filing it.
   ↳ `[if: flag.address_skipped_iden]` In the diplomatic enclosure, the Arennian ambassador lowers his phone, as though he had been ready to quote you and finds there is nothing to quote.
   ↳ `[if: flag.address_skipped_welf]` Near the barrier, in a faded union cap, an old man you know very well stops clapping, looks at you a moment longer than the others, and then looks away.
   ↳ `[if: flag.address_skipped_force]` At the edge of the balcony, General Aldric Voss keeps his eyes on the crowd, exactly as he did before. Only his jaw has changed.

## curtain

The square is louder than anything you have ever heard in your life. And yet, standing in the very middle of it, you have never felt so quiet inside. You raise your hand one last time — not to silence them, but to remember this. Then you turn, the great doors close behind you, and the work begins.

⚙️ Next: p1-blue-room (the Blue Room — your cabinet is waiting). Scenes return to the map; the turn's fixed order handles the sequence.

→ END
