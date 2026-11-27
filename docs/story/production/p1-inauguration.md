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

⚙️ Production draft 1, staged under docs/story/production rather than content/scenes. Full proposed scene in existing markup. Existing address/greeting/pledge flag names retained where practical. New pledge count and motive flags are provisional. Numerical compass effects are placeholders aligned with the original axis orientation; validate with engine and downstream consumers. No resource costs before tutorial. No direct national index effects from private thoughts. Speech choices are public positions, not proof of private beliefs.

## opening

You can hear the crowd from inside the palace. People have been gathering in Plateau Square since early this morning, and several of the surrounding streets have been closed to traffic.

From one of the tall windows overlooking the square, you can see the people closest to the palace. Some are wearing the colours of your party. Others have brought national flags, homemade signs and photographs of you from the election campaign.

Less than five years ago, you were still working as a public prosecutor. Much of the country first came to know your name during the corruption investigation that preceded your election to the Senate.

Today, you assume the presidency of Kunasai.

1. **I finally have the means to help the people I used to represent.** `[flag: inaugural_motive = 1]`
2. **Everything I have worked for has brought me here.** `[flag: inaugural_motive = 2]`
3. **There is so much this country could become.** `[flag: inaugural_motive = 3]`
4. **Four years. I had better make good use of them.** `[flag: inaugural_motive = 4]`
5. **Turn away from the window.**

## mertens

Most of your ministers are gathered near the balcony doors, making conversation while the palace staff finish their preparations.

Caio Mertens, your vice president, approaches you with a glass of water in his hand. You have known him since your time in the Senate. He was among the principal negotiators of the agreement between your party and the Order and Progress Party, whose support helped secure your election.

He adjusts his tie before speaking.

> **Caio Mertens:** "Apparently, there are more people here than there were for the last inauguration. I have already received three different estimates from people who would like to take credit for it."

He glances through the window.

> **Caio Mertens:** "You have quite an audience, Lara."

1. **"We should thank both parties for getting us here."** `[flag: inaugural_mertens = 1]`
   ↳ Mertens smiles.
   ↳ > **Caio Mertens:** "I'll make sure Odel hears about that."
2. **"Winning the election was the easy part."** `[flag: inaugural_mertens = 2]`
   ↳ > **Caio Mertens:** "I was hoping you'd forgotten how much work that took."
   ↳ He finishes his water and sets the glass on a nearby table.
   ↳ > **Caio Mertens:** "We'll have an interesting time in Congress."
3. **"Enjoy it, Caio. Tomorrow I'm putting you to work."** `[flag: inaugural_mertens = 3]`
   ↳ > **Caio Mertens:** "Tomorrow? You're very generous."
   ↳ He smiles and looks back at the square.
4. **"I intend to give them a great deal more to celebrate."** `[flag: inaugural_mertens = 4]`
   ↳ > **Caio Mertens:** "Well, we'll need to get you a majority first. Livia and I can talk you through that later."

## doors

Two members of the Jaguar Guard take their positions beside the balcony doors. One of the officers looks towards you, awaiting permission to open them.

Mertens moves aside to let you pass.

> **Caio Mertens:** "Whenever you're ready, Madam President."

1. **Step out onto the balcony.** `[flag: address_skipped_econ = true]` `[flag: address_skipped_struct = true]` `[flag: address_skipped_iden = true]` `[flag: address_skipped_welf = true]` `[flag: address_skipped_force = true]` `→ balcony`

## balcony | The Balcony

The cheering grows louder as the doors open. The square extends well beyond the palace grounds, and people have gathered as far away as the entrance to the congressional gardens.

You approach the lectern. A technician standing beside the balcony checks the microphone and gives you a nod.

1. **"My fellow Kunasaians."** `[flag: greeting = 1]`
2. **"Brothers and sisters."** `[flag: greeting = 3]`
3. **"May God bless you all."** `[flag: greeting = 2]` `[+1 RELIG]`
4. **"Good morning, Kunasai!"** `[flag: greeting = 4]`

## opening-address

The applause gradually subsides.

> "Thank you for coming here today, and to everyone watching from home, thank you for being part of this occasion. It is an honour to stand before you as your president."

> "Over the past year, we have held a great debate about the future of this country. Millions of you took part in that debate and cast your votes."

1. **"I intend to represent those who voted against me as well."** `[flag: inaugural_audience = 1]`
   ↳ > "Whatever your political views, you will have the opportunity to be heard by this government."
2. **"Today belongs to everyone who fought for this victory."** `[flag: inaugural_audience = 2]`
   ↳ > "To the people who organised meetings in their towns, who gave their evenings to this campaign, and who persuaded their friends and neighbours to support us: this is your achievement as much as mine."
3. **"Now we have four years of work ahead of us."** `[flag: inaugural_audience = 3]`
   ↳ > "I would like to thank the public servants and everyone who has been preparing for the transition. In the coming weeks, we will be meeting with representatives from across the country."

## address | The Address

A few people call your name from the front of the square. You wait for them to finish.

⚙️ Hub topics may be selected once, in any order. Public commitments are a separate optional submenu. Finish is always available. No imposed anti-corruption claim or minimum number of subjects. Existing address_topics counts ideological subjects only.

→ hub

## hub

1. **"Let me speak about the economy."** `[once]` `→ topic-econ`
2. **"We must consider how our government is organised."** `[once]` `→ topic-struct`
3. **"I want to speak about Kunasai's place in the world."** `[once]` `→ topic-iden`
4. **"There is much to be done for our families."** `[once]` `→ topic-welf`
5. **"Let me address our national security."** `[once]` `→ topic-force`
6. **Consider making a public commitment.** `[show if: !flag.promised_CoL || !flag.promised_GDP || !flag.promised_power || !flag.promised_integrity]` `→ promises`
7. **Conclude your address.** `→ finish`

## topic-econ | The Economy

> "Many of you have spoken to me about the economy over the past year. About how difficult it has become to find work, to start a business, or simply to afford the things your families need. We will have difficult decisions to make in the coming months, and I want you to know what will guide them."

1. **"We must distribute prosperity more fairly."** `[+2 ECON]` `[flag: address_econ = 1]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "My government will work to ensure that wages keep pace with the cost of living, that workers can defend their rights, and that those who have benefited most from our economy contribute fairly to its future. We have the resources to improve the lives of millions of people. I intend to make that a priority."
2. **"We must encourage private enterprise."** `[-2 ECON]` `[flag: address_econ = 2]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "Too many businesses struggle to grow, and too many people struggle to find jobs. I want to make it easier to open a company, to hire workers and to invest in our country. We will examine the taxes and regulations that stand in the way of that growth."
3. **"We must first restore economic confidence."** `[flag: address_econ = 3]` `[flag: address_skipped_econ = false]` `[flag: address_topics += 1]`
   ↳ > "We will examine the state of our public finances, listen to the people who employ and the people who work, and make our decisions on the basis of what we find. I ask for your patience in these first months of government."

→ hub

## topic-struct | The Government

> "A generation has passed since the return of democracy. The republic we inherited has been administered by many different governments, and each has left us institutions and laws of its own. We have an opportunity to consider which of those arrangements still serve the country well."

1. **"The government needs greater capacity to act."** `[+2 STRUCT]` `[flag: address_struct = 1]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "Too many necessary decisions are delayed for months or years while public authorities dispute who is responsible for them. I want a government that can carry out the programme it was elected to deliver. We will examine the powers and responsibilities of our institutions and seek the changes necessary to make them effective."
2. **"We must strengthen the limits on presidential power."** `[-2 STRUCT]` `[flag: address_struct = 2]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "Every president should govern under rules that apply equally to the people who hold this office after them. I want our courts and elected representatives to exercise their responsibilities independently. Where the presidency has acquired powers it does not need, we should consider returning them to the institutions that can best exercise them."
3. **"Let us improve the institutions we already have."** `[flag: address_struct = 3]` `[flag: address_skipped_struct = false]` `[flag: address_topics += 1]`
   ↳ > "I will work with Congress, the governors and our public servants to find practical improvements to the way the country is administered. Before proposing fundamental changes, we ought to understand why the arrangements we have are not working as they should."

→ hub

## topic-iden | Kunasai and the World

> "The decisions taken beyond our borders already affect the prices of the things we buy, the businesses that operate here and the opportunities available to our children. Kunasai also has a great deal to offer the rest of the world. We will have choices to make about the relationships we want to build."

1. **"Kunasai must protect its sovereignty."** `[+2 IDEN]` `[flag: address_iden = 1]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "Foreign governments and companies are welcome to work with us, provided they respect our laws and our interests. We should develop industries of our own, protect our strategic resources and be able to make decisions without seeking permission abroad. I intend to place the interests of Kunasai at the centre of our foreign policy."
2. **"We should welcome closer ties with the world."** `[-2 IDEN]` `[flag: address_iden = 2]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "Our country can benefit from international trade, research, investment and the exchange of knowledge between peoples. I want our students, businesses and institutions to have opportunities beyond our borders, and I want people abroad to feel welcome here. We will work to remove unnecessary barriers to that cooperation."
3. **"We will judge our partnerships on their merits."** `[flag: address_iden = 3]` `[flag: address_skipped_iden = false]` `[flag: address_topics += 1]`
   ↳ > "We have neighbours with interests in common with ours and partners much further away. I intend to maintain constructive relations with as many of them as possible. We will examine each agreement carefully and choose the arrangements that serve our country well."

→ hub

## topic-welf | Public Services

> "During my years working in law and in the Senate, I met families whose circumstances were very different from one another. The quality of a school, the availability of a doctor and even the time it takes to travel to work can depend greatly on where in Kunasai you live. These are matters our government will have to address."

1. **"We must expand access to public services."** `[+2 WELF]` `[flag: address_welf = 1]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "I want families to be able to seek medical treatment and give their children a good education without having to ask whether they can afford it. We will invest in the communities that have been underserved, and work towards reliable services available to every citizen."
2. **"We must make our social programmes sustainable."** `[-2 WELF]` `[flag: address_welf = 2]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "There are families who depend on government assistance, and there are services that cannot continue under their present arrangements. We will concentrate public support where it is most needed, examine its costs, and make room for local organisations and private providers where they can offer better results."
3. **"We must find out which services are working."** `[flag: address_welf = 3]` `[flag: address_skipped_welf = false]` `[flag: address_topics += 1]`
   ↳ > "I will ask the ministers responsible for health, education and social assistance to review the programmes already in place. We need to understand where money is being spent effectively and where it is failing to reach the families who need it."

→ hub

## topic-force | National Security

> "There are parts of our country where people do not feel safe in their own neighbourhoods. Beyond our borders, changes in the international situation have given us other concerns. We have a responsibility to consider how we will protect the country and the people who live here."

1. **"We must strengthen our security and defence forces."** `[+2 FORCE]` `[flag: address_force = 1]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "Our police and armed forces must have the equipment, training and authority they need to carry out their duties. We will examine what additional resources are required to restore security where the state has lost control, and to ensure that we can defend our borders."
2. **"We should prioritise civilian and preventive measures."** `[-2 FORCE]` `[flag: address_force = 2]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "We must improve the investigation and prosecution of crime, and address the circumstances in which criminal organisations recruit and operate. Our armed forces have an important responsibility in defending the republic. Civilian authorities should lead the work of keeping our communities safe."
3. **"We will review our security needs before committing more resources."** `[flag: address_force = 3]` `[flag: address_skipped_force = false]` `[flag: address_topics += 1]`
   ↳ > "In the coming months I will consult those responsible for security, as well as the communities most affected by crime. We will consider where additional resources are necessary and where existing ones can be used more effectively."

→ hub

## promises | Commitments

⚙️ Each explicit pledge is optional, individually selectable once. These are broad outcome commitments; exact end-of-term measurement needs design and dependency audit. No instant economic improvement or automatic declaration of integrity.

1. **"Living standards will improve in every region."** `[show if: !flag.promised_CoL]` `[flag: promised_CoL = true]` `[flag: address_pledges += 1]` `→ promise-col`
2. **"We will achieve substantial economic growth."** `[show if: !flag.promised_GDP]` `[flag: promised_GDP = true]` `[flag: address_pledges += 1]` `→ promise-gdp`
3. **"Ordinary citizens will have a greater voice in government."** `[show if: !flag.promised_power]` `[flag: promised_power = true]` `[flag: address_pledges += 1]` `→ promise-power`
4. **"Public appointments will be made on merit."** `[show if: !flag.promised_integrity]` `[flag: promised_integrity = true]` `[flag: address_pledges += 1]` `→ promise-integrity`
5. **Return to the address.** `→ hub`

## promise-col

> "At the end of these four years, I want every region of Kunasai to be a better place to live. That includes the communities furthest from the capital. We will measure our progress, and I will be answerable to you for the results."

Applause comes from several parts of the square.

→ promises

## promise-gdp

> "I want to leave the next government with an economy considerably stronger than the one we inherit today. We should be creating new opportunities here in Kunasai, and producing more of the goods and services on which our future depends."

→ promises

## promise-power

> "I will seek changes that give people a greater say in the decisions that affect their lives. I want citizens across the country to have a meaningful opportunity to influence the work of their government."

→ promises

## promise-integrity

> "I ask everyone entrusted with public office under this administration to remember whom they serve. Appointments will be made according to the qualifications of the people who hold them. I intend to uphold that standard throughout my government."

A group near the front starts applauding, and others join them.

→ promises

## finish | The End of the Address

> "In the coming months, my ministers and I will be meeting with representatives of the states, Congress and many of the organisations that serve our communities."

> "I thank you for the trust you have placed in me, and I thank you for sharing this day with me. Long live Kunasai."

The crowd cheers. A man near the front raises his daughter onto his shoulders, and she waves a small national flag above the heads of the people around her.

1. **Wave to the crowd.**
   ↳ You stay at the balcony for a little longer. The photographers move closer to the lectern.
2. **Invite Mertens to stand beside you.** `[flag: inaugural_shared_balcony = true]`
   ↳ Mertens looks surprised when you turn towards him. He joins you at the railing and waves to the square.
3. **Return inside.**

## curtain

One of the guards holds the door open for you. Inside the palace, a member of staff is waiting to escort you to the next reception.

→ END
