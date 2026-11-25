---
id: p1-panorama
chapter: 1
turn: 1
title: Counting Votes
kind: fixed
location: capital
token: congress
order: 3
when: "flag.seen_blue_room"
portraits: [mertens, livia]
background: vp-office
---

⚙️ New in round 2 (author feedback): political panorama by VP Mertens + Chief of Staff, blunt and practical. Mandatory overview of Congress (seats from content/world.json), optional questions per party, then the first OPP price as a worked example of how OPP charges. No resource costs (tutorial comes next).
⚙️ Senate note: Congress is unicameral for all ordinary votes. The Senate (3 senators per state) approves judges and treaties and must ratify changes to the federal pact; how it is apportioned is the subject of the representation reform.

## opening

The vice president's office is in the annex behind the palace, on the ground floor. It is a plain room with a desk, a sofa and a television showing Congress with the sound off.

Caio Mertens is the Vice President of the Republic. He is in his mid-fifties, from Ibicuí, a quiet man in a well-pressed suit. He belongs to the OPP, which joined your coalition before the election, and his post was part of that agreement. His job in the government is Congress: he negotiates with the parties, counts votes and steers bills through the chamber. He has been a deputy, a party secretary and a minister in earlier governments.

He is pouring coffee when you come in. Livia sits on the sofa with a single sheet of paper.

> **Caio Mertens:** "Madam President. I'll be direct, because that saves time. You won the election. You did not win Congress. Let me show you what you have."

→ overview

## overview

> **Livia Harvan:** "There are one hundred seats in Congress. You need fifty-one to pass an ordinary law."

> **Caio Mertens:** "Your party, the PM, has twenty-four. My party, the OPP, has twenty. That's forty-four. The Communist Vanguard has six. They supported you in the election but they are not in the government. With them, you have fifty. Fifty is not a majority."

> **Caio Mertens:** "The rest is opposition. The Capital Party, seventeen. The National Front, twelve. The Faith and Family Front, nine. The Civic Alliance, eight. And four independents, who vote however they like."

> **Livia Harvan:** "So every vote that matters will need someone outside the coalition, or all of CV plus at least one other deputy."

1. **"Then we'll build majorities vote by vote."**
   ↳ > **Caio Mertens:** "That's the only way anyone has governed here in twenty years."
   ↳ `[if: compass.STRUCT <= -3]` > **Caio Mertens:** "One more thing. Your speech about a small, honest state was noticed in my party. Odel would like to know how small. The OPP lives in the parts of the state that a small state removes."
2. **"Fifty is close. Who is easiest to bring in?"**
   ↳ > **Caio Mertens:** "The independents, one at a time. Then the Faith and Family Front, on some subjects. Ask me about each party and I'll tell you."
3. **"What happens if the coalition splits?"**
   ↳ > **Caio Mertens:** "Then you have twenty-four seats and a lot of speeches. It won't split if it's paid. That's why I'm here."

## parties

⚙️ Optional questions, each once. "That's enough" moves on.

1. **"Tell me about my own party's bench."** `[once]` `→ q-pm`
2. **"Tell me honestly how the OPP works."** `[once]` `→ q-opp`
3. **"The Capital Party."** `[once]` `→ q-cp`
4. **"The National Front."** `[once]` `→ q-nf`
5. **"The Faith and Family Front and the Civic Alliance."** `[once]` `→ q-fff-ca`
6. **"The Communist Vanguard."** `[once]` `→ q-cv`
7. **"The independents. And the Senate."** `[once]` `→ q-ind`
8. **"That's enough for now."** `→ price`

## q-pm

> **Livia Harvan:** "You lead the PM as a party. But the twenty-four deputies have their own leader in Congress, Pelan Avros. He's been there for twenty years. He's from Mognagna."

> **Caio Mertens:** "Pelan decides how the PM bench votes, day to day. He'll call you 'our candidate' and he'll support you, as long as his deputies get what they need for their districts. He also has friends in my party. You'll hear about that."

> **Livia Harvan:** "Relations with the bench are good at the moment. It's the first week."

→ parties

## q-opp

> **Caio Mertens:** "The OPP doesn't have an ideology. It has twenty seats and it is the same size in every region. It supports governments, and governments pay for that support."

> **Caio Mertens:** "Small things, routine laws, are paid with favours and attention. Bigger, more contested laws cost more, and sometimes money changes hands, which is risky for everyone. For the very big things, elections or the constitution, Odel wants money and ministries."

> **Livia Harvan:** "Each price is separate. The party doesn't keep a tab. Paying well this month doesn't make next month cheaper."

> **Caio Mertens:** "And two things the OPP will not accept at any price: prosecuting our own people, and changing how elections work."

→ parties

## q-cp

> **Caio Mertens:** "The Capital Party is the old centre-right. Business, banks, and the big farmers of Tapira. Seventeen seats. Their leader is Lucas Belzens, who speaks for industry. Their bench leader is Vando Trembolo, who speaks for the farmers. Those two don't like each other."

> **Livia Harvan:** "They governed until last month, and they lost because of the bribery scandal. They're angry and careful. They'll oppose anything that looks like higher taxes or more state, and support some infrastructure, if it helps their regions."

→ parties

## q-nf

> **Caio Mertens:** "The National Front. Twelve seats, mostly from Tekoku. Nationalists. They want a strong army, less foreign influence and more for Tekoku. Their leader is Edvar Solano. Their bench leader, Henrick Daur, is worse."

> **Livia Harvan:** "They want you to fail before the next election. Don't expect their votes, except on defence or sovereignty, and even then they'll make you pay for it in public."

→ parties

## q-fff-ca

> **Caio Mertens:** "The Faith and Family Front, nine seats. Pastors from the Tabernacle churches, strong in Mognagna and Tapira. They vote for tax breaks for churches and against anything they consider immoral. Pastor Baal leads the party; Pastor Muul leads the bench. Muul is the one you can talk to."

> **Caio Mertens:** "The Civic Alliance, eight seats. New party, educated voters in Tekoku and Ibicuí. Roan Telves leads it. They want cleaner government and better education, and some of them want only literate people to vote. They'll help you on education and corruption, and fight you on almost everything else."

→ parties

## q-cv

> **Livia Harvan:** "The Communist Vanguard has six seats and a leader, Ziara Keln. They supported you in the election and got no ministry. They call it 'critical support'."

> **Caio Mertens:** "It means they vote with you when you do what they want, and they charge for everything else. They're strong in the unions and in Ibira. They don't need you to be popular. They need you to deliver."

→ parties

## q-ind

> **Livia Harvan:** "Four independents. A deputy for the fishermen of Mognagna, a former National Front deputy from Tekoku, a deputy from Ibira nobody knows much about, and a deputy from St. Veldra whose only subject is tobacco and health."

> **Caio Mertens:** "And the Senate. Three senators per state, fifteen in all. They approve judges and treaties and any change to the federal pact, and they don't vote on ordinary laws. Some people in Ibicuí think three senators for a state of a hundred million is unfair. You'll be hearing from one of them soon."

→ parties

## price

Mertens puts his cup down.

> **Caio Mertens:** "Now, a practical example of what I explained. My party has its first request. It's small, by our standards."

> **Caio Mertens:** "Odel would like the Port Authority of Katanaí to go to someone from the OPP, and about forty posts below it: customs, berthing, inspection."

> **Livia Harvan:** "For context, Madam President: the bribery scandal that brought down the last government was at the same port. The newspapers will notice who gets the job."

> "And what do you want, Caio? Apart from what Odel wants."

> **Caio Mertens:** "To be useful. I've been vice-something several times. Nobody remembers you unless something goes wrong."

1. **"Give Odel the Port Authority."** `[opp opinion +2]` `[mertens loyalty +2]` `[flag: opp_price_1 = 1]` `[flag: opp_port_authority = true]` `[flag: corruption += 1]` `[flag: voice += 1]` `[flag: path_corrupt += 1]`
   ↳ > **Caio Mertens:** "He'll be grateful. Livia will have the name on your desk tomorrow."
   ↳ *Somebody had to be appointed to the port. It may as well be somebody whose party votes with you.*
2. **"The forty posts, yes. The Port Authority stays with a career official."** `[mertens loyalty +1]` `[opp opinion +1]` `[flag: opp_price_1 = 2]`
   ↳ > **Caio Mertens:** "Odel will call that half. I'll tell him it was a reasonable half."
3. **"No. I'll pay for votes when there are votes, not for posts."** `[opp opinion -2]` `[mertens loyalty -1]` `[flag: opp_price_1 = 3]` `[flag: path_hold += 1]`
   ↳ > **Caio Mertens:** "I'll tell him. He'll say you'll end up paying for both. He's usually right about that."
4. **"Ask me again after the budget."** `[mertens loyalty -1]` `[flag: opp_price_1 = 4]`
   ↳ > **Caio Mertens:** "Of course. Prices tend to go up in the spring, but of course."

## close

> **Livia Harvan:** "One last thing. Amanda Troes is waiting in your office. She'd like ten minutes to show you how your diary and your briefings will work. I'd recommend it."

1. **Go to your office** `[flag: seen_panorama = true]`

→ END
