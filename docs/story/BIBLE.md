# Story Bible — Project Magnanimous (term 1, chapters 1–3)

For writers. Sources, in order of authority: `docs/DECISIONS.md` › the mirrored GDD in `docs/gdd/` › this file.
Where this file invents something, it is marked **(new)**. Everything marked (new) is open to the author's veto.
Scene file syntax: `docs/SCENE-FORMAT.md`. Data file shapes: `docs/story/DATA-SCHEMAS.md`.

---

## 0. Voice and house rules

- English. Second person, present tense. The narrator is anonymous, dry and observational — closer to a political novel than a
  thriller. It notices; it never editorialises. It may be quietly funny about rooms, furniture, protocol, weather.
- NPCs speak short and precise. Two or three sentences is a long speech. Nobody monologues except Lara on a balcony.
- Lara speaks in full sentences. She was a lawyer and an organiser; she argues, she does not quip.
- Thoughts are italic paragraphs, no quotes. "The voice" (§3) is a special kind of thought.
- Choices: one line, 2–4 per beat (a single "continue" choice is allowed for pacing). Outcome text always plays.
- No mechanical feedback in text. Nobody says "that will cost us influence". They say "Odel will remember this."
- Grounded, melancholy, occasionally funny. Morally complex: every option should be defensible by someone the player respects.
- Terminology: **CoL = Conditions of Living**, never cost of living. **PT = Presidential Time**. The Fund is "the Fund".
- Never name a real country, company or person. Kunasai is a Brazil analog; do not import Brazilian proper nouns wholesale.

---

## 1. World facts writers keep getting wrong

**Kunasai.** ~280 million people, northern hemisphere of the continent **Arvane** (a South America analog, flipped north).
Colonised by **Veldra** (a nation of the old continent, **Verath**) from the north, through Tekoku. Enslaved people were
trafficked from **Ondara**. Independence ~150 years ago was an elite pact. Oligarchic republic → military dictatorship
(~80 to ~25 years ago) → redemocratisation under the **Amnesty Act** (the military were never tried) → today's cycle of
exhaustion: corruption exposed, swing to an extreme, swing back.

**Geography.**
- Five regions (ids): `tekoku` (north coast, Veldran heritage, port city **Atiaiaba**), `ibicui` (the populous heart:
  megacities **Katanaí** — the great port — and **St. Veldra** — banks and towers), `mognagna` (arid sertão with a fertile
  coast; capital **Sugar Bay**, old viceroyalty seat, oldest cathedral), `tapira` (cattle, grain, landlords, Tabernacles),
  `ibira` (rainforest frontier, indigenous peoples, cartels, newly found rare earths).
- Capital: **New Veldrania**, a planned city at the junction of Ibicuí, Mognagna and Tapira. The palace balcony faces
  **Plateau Square**. Cabinet meets in the **Blue Room**.
- The **Mondrath Strait** (Mondrath + Vassel) on the far west opens into the gulf that bathes Ibicuí and Mognagna. Katanaí
  sits on that gulf. Any crisis with Mondrath is an economic emergency.
- Rivers **Arvane** and **Ibira** run **north** to Tekoku. The Ibira rises in Ibira and crosses Tapira and Ibicuí on its way.
  Pollution upstream is Tekoku's problem downstream.
- The **Arennian Federation** lies to the **SOUTH**, on the continent **Moreya**, beyond the continental canal held by
  **Torreval**. **Zharan** is on **Karath**, another continent to the east. Tarev, Orvane and Selvara form a Zharan-leaning
  belt on the eastern border; **Arenza** lies behind that belt. **Veldmoor** is the peninsula north of Tekoku.
- The **Northern Partnership** is the name of the *regional bloc* Lara may build (Arenza required to start it). It is never
  the name of the Federation alignment.

**The Jaguars.** The presidential guard: an imperial-era elite unit that survived into the republic. Emerald armour,
ceremonial halberds, real rifles. ~340 men and women. A quick event in chapter 1 offers to defund them (survival −1).

**The Fund (new name detail).** The whole inherited debt is owed to "the Fund" — an international lender the Federation
de facto controls. Interest ≈ **11% of initial revenue**. Fund officials are polite, punctual and never in a hurry.

---

## 2. The inheritance (what Lara walks into)

The cycle has faces. The two governments before Lara:

**Tercilio Luz (PM) — the populist patriarch.** First president after redemocratisation (a term ~25 years ago) and again
~8 to ~4 years ago **(second term: new)**. His second term launched the **Great Sanitation Works** **(new name)**: trunk
sewers, a treatment plant on the gulf and housing blocks for the peripheries of Katanaí and St. Veldra. Financed by the Fund
loan that is now the national debt. Built by the **Corvel Consortium** **(new)**, which billed roughly 40% above any honest
estimate. Half finished: the trunk line in Katanaí stops three streets short of Vila Tamarin — Lara's mother's street.
The concrete shell of the **Tamarin Treatment Station** stands on the waterfront like a ruin from a future that did not come.
Luz is in his late seventies, still adored in Mognagna, still PM's most famous name, still never charged.
→ Great project 6 (housing & sanitation) **is** finishing Luz's work: cheaper (half the pipes are in the ground), but the
scandal comes attached, and it is Lara's own party's scandal.

**Silvio Castelar (CP) — the bribery government (new).** ~4 years ago to now. Elected against Luz's overspending, promised
"a government of accountants". Undone by the **Pier Nine affair** **(new)**: his Ports minister and chief of staff sold
terminal concessions at Katanaí's Pier Nine to an exporters' consortium for cash delivered in wine cases. The chief of staff
is in prison; Castelar is not, and lives in St. Veldra writing his memoirs. The Ledger covered Pier Nine late and gently.
Castelar's collapse is why the left won — and why everybody now expects the left to be next.

**What this means in play.** Lara inherits: a debt she did not take, a half-built monument to her own party's corruption, a
public that assumes everyone steals, a coalition she cannot command, and a mandate that is wide but shallow.

---

## 3. Lara Vento and her personal arc

**Lara Vento** — President. PM party leader (but **not** leader of the PM bench in Congress). Senator from Ibicuí. ~50.
Grew up in **Vila Tamarin** **(new)**, a hillside periphery of Katanaí. Law degree at night; fifteen years of organising:
legal aid offices, tenant committees, the slow work. She believes what she says — her greatest strength and her most
exploitable vulnerability. She is good in rooms with poor people and still learning rooms with rich ones.

**Theme:** what power does to an honest person. Three directions stay open until late in term 1:
- **Harden** — she becomes efficient, cold, willing to break people to deliver. (Tracks: `path_harden`.)
- **Corrupt** — she starts trading, small and then less small, always for good reasons. (Tracks: `path_corrupt`.)
- **Hold the line** — she keeps her word and pays for it in time, allies and results. (Tracks: `path_hold`.)
Each scene that touches the arc should offer at least two of the three. None is the "good" one: holding the line can fail
the people she swore to; hardening can save them; corruption can be the only way a bill passes.

**"The voice."** Seeded in the inaugural address (STRUCT option 3): *just this once, just a little more, just until the
work is done.* It is an italic Thought beat that appears **when she compromises** (flag `voice` += 1). Rules:
- It never gives orders; it offers reasons. It speaks in Lara's own vocabulary, which is what makes it dangerous.
- Tone shifts with accumulated choices: early (`voice` 0–1) it is tentative and almost tender; middle (2–4) it is fluent and
  practical; late (5+) it is bored, as if the argument were already won. If `path_hold` leads, it grows sarcastic and smaller.
  If `path_harden` leads, it stops using "just".
- Never more than one voice line per scene. Never explain it. No UI number.

**Personal scenes** happen regardless (no PT to watch). Decisions *inside* them can cost or affect resources and cross into
politics, e.g. promising to visit mum monthly → later visits cost PT but soften future beats; letting mum spend her savings on
the street's sewage connection becomes a news item; Marco's arrests are public record.

### Personal cast

**Amanda Troes** — personal secretary. College friend (they shared a flat and a stolen typewriter). No party, no ideology,
total loyalty to the person. Keeps records of everything, in small grey notebooks — protection, not a weapon. Dry, quick,
unimpressed by titles; calls Lara "Lara" in private and "Madam President" when she is angry with her.
Wants: Lara alive and whole at the end of the term. Fears: that politics changes Lara in ways she notices too late.
Redline: being asked to destroy a record. Arc: invisible shield → the only reliable witness → (possibly) a public voice.
Function: the conscience that never lectures. She asks one question and lets the silence work.

**Marco Prestes** — old periphery organiser, late sixties, Vila Tamarin. Arrested three times on charges that were each
embarrassing for the people who brought them (blocking a bulldozer with a church pew; "illegal assembly" at a funeral;
"theft of electricity" for wiring a crèche). Close to CV, not a member — "I don't join things, I start them." Runs the
**Six O'Clock Kitchen** **(new)**, a community kitchen that opens at six every morning. Taught Lara how to run a meeting.
Wants: the promises kept, specifically, for named people. Fears: becoming the old man who says "I told you so".
No hidden agenda — which makes him dangerous to an opportunistic player. If the Ibicuí strikes fire (ch3), he joins them.
Writes the occasional column for The Katanaí Voice.

**Celia Vento — Lara's mother (new name).** Seventies. Widow, retired school cook, Communion churchgoer who also attends
the Tabernacle on Wednesdays "for the singing". Lives alone in the house in Vila Tamarin where Lara grew up and refuses to
move: "The palace doesn't have my neighbours." Diabetic, careless with it, proud. Funny without trying.
She is the one person who talks to Lara as if the presidency were a temporary job. May die during term 1 (a chapter-4/5
event, never before chapter 3). Her street is where Luz's sewer stops.
Hooks: monthly visits (PT), her savings (she wants to pay for the street's connection herself, or for Marco's kitchen),
her health (Dara's hospitals vs. transfers becomes personal), her faith (FFF and the Communion both court her).

---

## 4. Government

### Vice President

**Caio Mertens (OPP)** — Vice President. Ibicuí (capital). Mid-fifties, soft-spoken, perfectly pressed, forgettable on
purpose. The price of the PM+CV+OPP electoral coalition. **Not a plotter.** He shows up to collect the alliance price,
politely, as a courier who regrets the weight of the parcel. He legislates (land reform, religious legislation, AI) as the
VP power centre. Hidden: an undeclared friendship with Federation financiers (not an agent — the relationship simply
exists). Wants: status quo, OPP's access, to be useful. Fears: being a façade; an authoritarian drift that exposes the
party. Redline: changing the electoral system (OPP's redline — collides with the representation reform).
Loyalty +1 · Suspicion 10 · Capacity 65.
Voice: "I'm only the messenger, Madam President. But I am a very punctual messenger."

### The cabinet (term 1, fixed by the pre-election coalition)

OPP holds VP + Chief of Staff + Planning & Development. PM holds Justice/Interior/Labor and Health. Intelligence went to an
NF card-holder as the security establishment's condition. The rest are independents chosen by Lara.

| Ministry | Minister | Party | Capacity | Loyalty (start) |
|---|---|---|---|---|
| Chief of Staff | **Livia Harvan** (new) | OPP | 78 | 0 |
| Treasury | **Alexander Fontes** (surname new) | independent (PM nominee) | 80 | +3 |
| Planning & Development | **Tobias Marne** (archive name) | OPP | 70 | 0 |
| Justice, Interior & Labor | Renata Salgado | PM | 82 | +4 |
| Defense | Gen. (ret.) Aldric Voss | none, career officer | 85 | −1 |
| Intelligence | Darian Kesht | NF | 80 | −2 |
| Health & Social Programs | **Owin Dara** (archive name) | PM (Avros wing) | 65 | +2 |
| Education | **Helena Kaval** (new) | independent | 72 | +3 |
| Exterior | **Celeste Aroun** (archive name) | career diplomat | 75 | +1 |

**Livia Harvan — Chief of Staff (OPP) (new).** Late thirties. Odel Harvan's niece, Mantel Harvan's cousin. Law and
administration at St. Veldra; ran the Ibicuí governor's office for Melissa Matel. Controls the door to the president's
office and therefore half of the government. Precise, warm when it is useful, genuinely brilliant at the machine. She
briefs on the cartels at the end of the first meeting (GDD).
Wants: to be the one who makes this government work — and for the Harvans to survive it. Redline: prosecution of OPP
members; changing the electoral system. Arc: split loyalty. If Lara trusts her with real power, Livia can become the best
operator in New Veldrania and, eventually, has to choose between the president and the family. Culture & Festivals runs
through her office.
Voice: "I have three things for you and you will like one of them."

**Alexander Fontes — Treasury (surname new).** Sixty. Former deputy governor of the Central Bank, sat out the Castelar
years teaching. Independent; Lara's pick, PM tolerates him. Gloomy, exact, privately funny, speaks in percentages and
regrets them. He reveals the hole in chapter 1 (no decision), presents the debt options in chapter 2, tax reform at the
start of chapter 3.
Wants: credibility — the country paying what it owes and saying what it has. Redline: default/repudiation without a plan;
using the Treasury to hide a scandal. Arc: the honest accountant in a government that will need creative accounting. The
achievement "tell Alexander to figure it out" is his.
Voice: "Eleven percent, Madam President. Before we buy a single pencil."

**Tobias Marne — Planning & Development (OPP) (archive name).** Late fifties, civil engineer, two-term mayor of a Tapira
river town, OPP's man for public works. Big, jovial, a hard hat on every photo, an astonishing memory for tonnage and for
the names of contractors' children. Genuinely loves building things; genuinely knows which firms "deliver". Presents the
three great projects in chapter 1.
Wants: a monument with his name on the plaque, and the contracts flowing to people OPP knows. Redline: a project cancelled
midway; an audit that names his contractors. Arc: every great-project follow-up (contractor, oversight, incidents) passes
through him; he can be Lara's builder or her scandal.
Voice: "Concrete doesn't vote, Madam President. But it remembers who poured it."

**Renata Salgado — Justice, Interior & Labor (PM).** Fifties. Brilliant judicial career, recruited by PM, flirted with CA.
Believes the law can work and is impatient with people who say it cannot. Initiatives: Judicial Strengthening (cartels or
oligarchs), Anti-Corruption department (would expose CP–cartel links — Vando Trembolo's people — and PM bench leader Avros's scheme
with OPP members), Labor Rights & Compact. Involved in the Military Dictatorship Files and the unions arc.
Wants: corruption punished, including in her own government. Redline: discovered corruption left unpunished. Arc: the
Avros scandal (ch3 candidate) is hers to light or to bury.
Voice: "I don't need you to be brave. I need you not to call me afterwards."

**Aldric Voss — Defense (career officer).** Sixties. Blunt, institutional, wants politics to leave the army alone. Not a
putschist; a man whose idea of loyalty is to the barracks first. Defends the Jaguars as tradition and as security.
Redline: opening the military-rule files. Arc: the files seed (ch1–3) → explosion later; the cartel deployment question.
Voice: "I serve the office, Madam President. I'm still deciding about the occupant."

**Darian Kesht — Intelligence (NF).** Fifties. Thirty years in the service; joined NF late and quietly. Kept on because
the service would accept no one else — Solano calls him a turncoat, Daur calls him useful. Believes the state must be able
to do quiet things the public would not applaud; refusing those tools is a failure to serve. Wants to be asked.
Redline: a weak government that refuses to protect the state. Arc: Domestic Monitoring → Secret Service (term 2).
Livia controls his access to Lara; he resents it.
Voice: "You'll want to know about this later. I'm offering you now."

**Owin Dara — Health & Social Programs (PM, Avros wing) (archive name).** Sixties. Public-hospital doctor from Sugar Bay
turned PM machine politician; Governor Julio Porper's ally. Warm, tired, unsentimental about money: transfers keep people
alive this month, hospitals keep them alive in ten years, and "ten years is a luxury in Mognagna". Owes Pelan Avros his
appointment — the price Lara paid her own party.
Wants: Social Assistance funded and untouched in Mognagna. Redline: transfers cut in Mognagna. Arc: famine risk; the tobacco
(Trembolo) health fallout; his loyalty to the party machine vs. the president if the Avros scandal fires.
Voice: "A hospital is a promise. A transfer is lunch."

**Helena Kaval — Education (independent) (new).** Fifties, from Atiaiaba, former rector of the Federal University of
Tekoku; the only Tekokuan in a cabinet the Tekoku press calls "Ibicuí's". Cool, ironic, impatient with slogans from both
sides. Her son left for Veldra two years ago and does not answer quickly. Wants: Higher Education & Research (feeds the
Tekoku tech arc and the clean-extraction gate in Ibira) — but she knows the left wants the floor raised first.
Redline: churches or parties writing the curriculum; purges of faculty. Arc: brain drain; the Tekoku representation
grievance through the eyes of a loyal Tekokuan.
Voice: "Everyone wants an educated country. Nobody wants to pay for the second decade."

**Celeste Aroun — Exterior (career diplomat) (archive name).** Sixties. Former ambassador to Arenza and to the Federation;
impeccable manners, a contempt for politicians she conceals perfectly from everyone but Amanda. The ministry has no budget
initiatives (international play is transversal), but she stages every foreign contact in chapter 2 and tells Lara the
truth about rooms she has not been in yet. Wants: a professional foreign service and no humiliations. Redline: signing
something she has not read.
Voice: "The Arennians will be charming. Count your fingers afterwards."

---

## 5. Congress, parties, the bench

Unicameral Congress for all votes (the Senate exists only as the subject of the representation reform).

| Party | Seats | Leader | Bench leader | Notes |
|---|---|---|---|---|
| PM (Popular Movement) | 24 | Lara Vento | **Pelan Avros** | Lara must win her own bench. Avros (Statist wing) runs a corruption scheme with OPP. |
| OPP (Order and Progress) | 20 | **Odel Harvan** | **Mantel Harvan** | Transactional. Redlines: prosecuting their own; changing the electoral system. |
| CP (Capital Party) | 17 | **Lucas Belzens** (industrialists) | **Vando Trembolo** (ruralists) | Will never sit with CV or NF. |
| NF (National Front) | 12 | **Edvar Solano** ("blame the outside") | **Henrick Daur** ("internal blame") | Founded by Daur against Luz's "submission". Sabotages. |
| FFF (Faith and Family Front) | 9 | **Pastor Suren Baal** (opportunists) | **Pastor Kerner Muul** (humanists) | Tabernacle machine; Coronéis' instrument. |
| CA (Civic Alliance) | 8 | **Roan Telves** | Roan Telves | Technocratic, literacy-voting agenda. Notable: Maria Curite (Laurel Award). |
| CV (Communist Vanguard) | 6 | **Ziara Keln** | Ziara Keln | Backed Lara in the election, got no ministry; "critical support", charges dearly. Prof. Amber Babau. |
| Independents | 4 | — | — | Four people with four prices (new: see below). |

PM+OPP = 44. PM+OPP+CV = 50. No majority without someone uncomfortable.

**Independents (new).** Dep. **Joana Ferraz** (Mognagna fishers' cooperative; votes for anything with boats in it),
Dep. **Ulisses Bray** (ex-NF, Tekoku, expelled for being "too moderate", wants to be courted), Dep. **Ramiro Quenta**
(Ibira, rumoured cartel money, always present, rarely speaks), Dep. **Ana Sollis** (St. Veldra, single-issue: the tobacco
health bill).

**Pelan Avros (PM bench leader).** Sixties, Mognagna, the man who knows which judge's nephew needs a job. Statist: "don't grow
the state enough to madden the capitalists, boost assistance near elections, keep the judges fed". Calls Lara "our
candidate" in private, still. Treats the presidency as the party's asset and the bench as his.
Voice: "The bench loves you, Lara. The bench also has rent."

**Other faces.** **Melissa Matel** (OPP), Governor of Ibicuí — practical, ambitious, Livia's former boss. **Arturo Trembolo**
(CP), Governor of Tapira, of the tobacco family. **Martin Works**, Strawberry's CEO (CP). **Marcia Gaciarez** (PM), Governor
of Ibira. **Julio Porper** (PM), Governor of Mognagna, Luz loyalist. **Marisa Picos**, TV actress, PM's campaign face.
**Archbishop Therecio** of Sugar Bay (the Communion). **Edgar Monsoon**, media tycoon (NF), owns the Clarion.

### The representation reform champion (new)

**Senator Augusta Lessa (CP, Ibicuí).** Sixties. St. Veldra old money (shipping, then banks), Belzens' ally in the
industrialist wing, the best speaker in the Senate and aware of it. She champions the **Representation Reform**: the Senate's
three-senators-per-state rule over-weights Mognagna, Ibira and Tapira and under-weights Ibicuí (100M people) and, by GDP,
Tekoku. She wants senators by population ("one Kunasaian, one weight") and will accept GDP-weighting as a fallback.
The drama: she is right about Ibicuí — Lara's own state — and the reform would strip weight from PM's poorest bases. Her
own party is split (Tapira's ruralists lose too). OPP's redline is electoral change. NF and CA in Tekoku cheer her.
Recurring: she visits in ch1 T2, files the motion in ch2, and is the face of the ch3 impasse if it fires.
Voice: "I'm not asking you to like me, Madam President. I'm asking you to count."

---

## 6. Factions (faces)

- **Armed Forces:** Voss in cabinet; General **Ernesto Cazal** (new), Chief of Army Staff, the one who actually commands.
- **The Communion:** Archbishop Therecio of Sugar Bay — patient, worldly, losing his flock to the Tabernacles.
- **Media:** three conglomerate families — the **Ostranders** (new; Ledger, CP-aligned), **Monsoon** (Clarion, NF), the
  **Albarran** family (new; TV, centrist and for sale). Social media is eating all three.
- **Business:** Martin Works (Strawberry, tech, Tekoku); **Lucia Brandt** (new), president of the Katanaí Industrial
  Federation; the Trembolo family (tobacco, agro).
- **Unions:** **Dorival Sena** (new), president of the National Workers' Confederation (moderate, PM-aligned); the
  radical base listens to CV and to Marco.
- **Indigenous Movement:** **Iracema Tuyú** (new), spokeswoman of the Ibira Peoples' Council; speaks for many peoples who
  do not agree with each other.
- **Landless Movement:** **Bento Arruda** (new), coordinator of the Landless Workers' Front in Tapira.
- **Cartels:** **Red Tree** (river routes, processing in Tarev, older, disciplined) and **Blue Piranhas** (younger, faster,
  the peripheries, more violent). Uneasy truce. No named leaders in term 1 — they are known by what happens near them.

---

## 7. Foreign leaders (new names)

| Country | Leader | Envoy / face in ch2 | Notes |
|---|---|---|---|
| Arennian Federation (south) | **President Conrad Ashby** | **Ambassador Lionel Pryce** | Arrogant, faintly imperial, sincerely believes it is doing Kunasai a favour. De facto owner of the Fund. Wants open market, Ibira minerals, Kunasai away from Zharan. Pryce: "We're friends. Friends don't make each other ask twice." |
| Zharan (Karath, east) | **Premier Daryun Kasrai** | **Special Envoy Nima Sadrah** | Patient state superpower. Builds ports and railways in exchange for minerals and access. Sadrah never raises his voice and never leaves without a memorandum. |
| Arenza (behind the eastern belt) | **President Tomás Arguedas** | himself (courtesy visit) | Proud mid-size democracy, Kunasai's historical rival (a war of borders a century ago, a century of football since). Partnership of equals only. Required to start the Northern Partnership. Tests Lara. |
| Tarev (east border) | **Chairman Edin Morav** | — | Fragile Zharan satellite. The cartels manufacture there. Pleased by anything that weakens Kunasai's state in Ibira. |
| Veldmoor (peninsula north of Tekoku) | **Prime Minister Ottilie Varn** | — | Small, rich, scientific, culturally Veldran. Credibility for democratic behaviour. Cools if the cartels dominate or the press is muzzled. |
| Mondrath (west, the Strait) | **Archduke Casimir III** | a cold letter (ch2) | Wants to be left alone. The Veldran Question. |

Context neighbours (news/map only in v1): Vassel, Orvane, Selvara, Cabral, Torreval.

---

## 8. Newspapers (ids for `content/news`)

| id | Paper | Slant | Face (new) |
|---|---|---|---|
| `ledger` | **The St. Veldra Ledger** | establishment liberal, CP family (the Ostranders) | Editor **Beatriz Ostrander**: cool, superior, fond of the word "unserious". |
| `clarion` | **The Kunasai Clarion** | NF tabloid, Edgar Monsoon | Front-page voice **"The Watchman"** (an unsigned column everybody knows Monsoon dictates). Capitals, exclamation marks. |
| `voice` | **The Katanaí Voice** | unions/movements, presses Lara from the left | Cooperative paper; editor **Tomé Araci**. Marco Prestes writes occasionally. |
| `dispatch` | **Arvane Dispatch** | neutral, geopolitics | Editor **Ilse Marrow**. Dry, foreign-desk tone, datelines. |
| `canopy` | **The Canopy Review** | neutral, science/health/environment | Editor **Dr. Caetano Ruiz**. Measured, data-first, footnote energy. |

Same event, different slant. Not every paper every turn. News is the main channel of indirect feedback; never print numbers
the player could read as a score.

---

## 9. Flag registry (chapter 1)

Naming: snake_case. Booleans unless stated. Counters use `+= 1`.

- Address: `greeting` (1–4) · `promised_CoL` / `promised_GDP` / `promised_power` · `address_topics` (count) ·
  `address_<econ|struct|iden|welf|force>` (1 = +2 pole, 2 = −2 pole, 3 = centre) · `address_skipped_<axis>`.
- Arc counters: `voice`, `path_harden`, `path_corrupt`, `path_hold`.
- Corruption bar seed: `corruption` (counter; feeds the impeachment condition later).
- Coalition: `opp_price_1` (1 paid in full / 2 paid in part / 3 refused / 4 deferred), `opp_port_authority`.
- Cartels: `cartels_watch_quiet` / `cartels_watch_loud` / `cartels_ignored` / `cartels_softened`.
- Personal: `amanda_records` (1 keep everything / 2 not everything / 3 asked why), `mother_visits_promised`,
  `promised_mother_street`, `mother_asked_to_move`.
- Blue Room extras: `blueroom_topics`, `fontes_private` / `fontes_public`, `separate_reports`, `transfers_promised`,
  `marne_prefers_railway`.
- Treasury (T2): `fontes_hole_known`; how it was told: `hole_public` / `hole_quiet` / `hole_castelar` / `alexander_ordered`
  (achievement hook); Corvel file: `corvel_to_salgado` / `corvel_held` / `corvel_costed`; Fund stance preview:
  `no_more_fund` / `projects_first`.
- Health (T2): `health_system_lean` / `transfers_lean`, `promised_no_hunger`, `tobacco_bill_interest` / `tobacco_deferred`.
- Justice (T2): `avros_envelope` (1 opened / 2 held closed / 3 taken by Lara), `files_petition` (1 received / 2 letter /
  3 declined), `delmar_acknowledged`, `delmar_time_asked`.
- Defense (T2): `jaguars_defunded` (survival −1) / `jaguars_trimmed` / `jaguars_kept`, `files_promise_voss`.
- Representation (T2): `lessa_met`, `reform_stance` (0 none / 1 open / 2 sceptical / 3 opposed / 4 compromise),
  `decentralisation_seed`.
- Bench (T3): `amendments` (1 published / 2 quiet / 3 refused / 4 deferred), `shielded_avros`, `warned_avros`.
- Education (T3): `education_floor_first`. Planning (T3): `planning_seen` (count).
- Vila Tamarin (T3): `celia_savings` (1 kept / 2 to Marco's kitchen + Lara promises the street / 3 Celia pays for the street →
  Voice front page), `marco_deadline`, `warned_marco`, `tamarin_names`.
- Great project (T3 closing): `great_project` (1 / 4 / 6) + `project_rare_earths` / `project_railway` / `project_sanitation`,
  `luz_works_resumed`, `promised_on_time`, `chapter1_complete`.
- `seen_<scene_id>` flags are set by each scene's last choice where later content depends on them.

**Chapter-1 places and props (new):** the **Tauá Hills** (rare-earth deposit, Ibira; Indigenous land on two sides, cartel
river on the third) · the **Six O'Clock Kitchen** (Marco) · **annex nine** (Corvel's unit prices) · the Treasury drawer
labelled *PAST* · the sign *WORKS RESUME SOON* (someone added *WHEN?*) · **Anselm Royce**, head of the Fund's March review
mission · Dona Ivone (Celia's neighbour with the bigger television) · Dona Severina (sells lunch at the dock gate).

---

## 10. Chapters 1–3 outline

Rhythm: irregular, visible dates. Each turn = 3–6 main interactions in any order (briefings, meetings, visits), plus ambient
map pop-ups and news. The engine's fixed `order` handles scenes that must play first; a turn's `closing` scene plays last.

### Chapter 1 — "Opening the Curtain" (all within the first month)

Focus: getting hold of the situation; the debt; the great projects; the political map; first sight of the representation
crisis. Ends with the great-project choice.

**Turn 1 — 1 January (Inauguration Day).**
1. `p1-inauguration` (fixed, first) — the author's address. The compass starts to move; skipped topics have witnesses.
2. `p1-blue-room` (fixed) — the first cabinet meeting. Ministers as people with agendas; Fontes hints at the hole; Mertens
   collects the first OPP price (the Katanaí Port Authority); Livia's cartel briefing and choice.
3. `p1-first-night` (personal) — the Residence; Amanda and her notebooks; a call from Celia; the voice, first heard.
News: first editions of all five papers react to the address.

**Turn 2 — 8 January (the first full week).** Any order:
- `p1-treasury-briefing` — Fontes opens the books. The hole: debt service ~11% of revenue, the Corvel overbilling, the Fund's
  review in March. No decision; how Lara receives it shapes Fontes.
- `p1-health-briefing` — Dara: transfers vs. hospitals, famine risk in Mognagna's dry season, the tobacco admissions in
  Katanaí. Seeds the ch2 budget tier.
- `p1-justice-briefing` — Salgado: three initiatives, an envelope about Avros she will not open yet, the Truth & Memory
  petition from the families of the disappeared (Military Files seed).
- `p1-defense-jaguars` — Voss and the Jaguars quick event (defund = survival −1); border staff; a look at the files from
  the other side.
- `p1-lessa-visit` — the representation crisis appears: Senator Augusta Lessa, with Livia in the room.
Pop-ups: Arvane river low at Atiaiaba; Blue Piranhas in a Katanaí periphery; Tekoku petition signatures.

**Turn 3 — 26 January.** Any order, then the closing choice:
- `p1-education-briefing` — Kaval: brain drain, the two initiatives, her son.
- `p1-avros-bench` — Pelan Avros and the PM bench: the party wants its share; what the bench thinks of Lessa.
- `p1-planning-briefing` — Marne presents the three projects: 1 rare earths (Ibira), 4 railway, 6 housing & sanitation.
- `p1-tamarin` (personal) — Vila Tamarin: Celia, Marco, the sewer that stops three streets short.
- `p1-great-project` (closing) — the chapter's main decision.
News: chapter-end editions.

### Chapter 2 — "A Herculean Task" (March → July)

Focus: the budget; deeper politics; first international contacts.
- **T1 (early March):** the budget. Each ministry's tier (Cut/Low/Regular/High). Inside the budget, the debt decision with
  Fontes: pay principal / borrow more (Fund only) / status quo. The Fund's review mission arrives. Federation ambassador
  Pryce visits: the debt, the minerals, a polite threat. First great-project follow-up (pick the contractor: Marne's firm /
  open tender / foreign consortium).
- **T2 (May):** the representation reform push. Lessa files the motion; the PM bench splits by region; OPP's redline;
  Mertens counts votes; Lara must state a position (population / GDP / status quo / decentralisation compromise).
  Zharan envoy Sadrah: investment in the chosen project, with conditions. Small health/education decisions.
- **T3 (July):** Arenza President Arguedas' courtesy visit (tests Lara; the seed of the Northern Partnership). A cold letter
  from Archduke Casimir (Mondrath). Military Files: the petition becomes a news story. Culture & Festivals (Livia): the
  Mognagna Folk Festival invitation. Personal: a visit to Celia if promised (PT); Celia's savings.
Ambient: strike rumours in Katanaí, cartel toll stories, river pollution notes, Tekoku brain-drain columns.

### Chapter 3 — "Burdens of Leadership" (September → December)

Focus: Fontes' tax reform discussion (start of chapter), then a **crisis** from hidden pressure meters (several may fire and
compound). Player sees only signals (pop-ups, news). Chapter ends with a newspaper summary and "to be continued".

Pressure meters (computed each turn from chapter 2 T1; thresholds to be tuned):
- **Ibicuí periphery strikes.** + Periphery Pressure flag (each turn) · + CoL in Ibicuí falling · + no decentralisation /
  railway / project 6 · + Labor Compact unfunded · + CV relation < 0 · + unions opinion falling · + Luz-works news.
  − palliatives (temporary housing, meals) · − Ibicuí approval above ~45 · − project 6 chosen and visibly moving.
  If it fires: Marco joins; Dorival Sena loses control of the base; CV chooses between Lara and the street.
- **Representation impasse.** + Lessa's motion stalled · + Lara declared for population/GDP (PM bench revolt in Mognagna/Ibira)
  or against (Tekoku/NF/CA campaign) · + OPP price unpaid · + Tekoku approval < 20 · + NF capacity high.
  − decentralisation compromise on the table · − Mertens' loyalty high.
- **Avros scandal.** Requires the Anti-Corruption department funded. + each turn funded · + Salgado loyalty high · + Avros
  suspicion high · + Pier Nine-style press appetite (media capacity). − Lara shielded Avros · − Salgado defunded.
Also in ch3: Strawberry's first lobbying; Kesht asks for Domestic Monitoring; the Jaguars matter if anything goes wrong.

---

## 11. Military Dictatorship Files (seed only, ch1–3)

The Amnesty Act sealed the archives of the dictatorship's security services. In ch1 a petition from the **Families of the
Disappeared** (spokeswoman **Rosa Delmar**, new — her brother vanished in Sugar Bay in the dictatorship's last decade) asks
the new government to open them. Salgado wants to receive them; Voss's redline is the files. In ch1–3 this is only a
petition, a meeting, a news story. It explodes later (term 1 late / term 2). Do not resolve it early.

## 12. Cartel handling (from the GDD, with the dominance model)

At the end of the first meeting with the VP and Chief of Staff, Livia briefs Lara: monitor quietly (suspicion up, capacity
down), monitor loudly (more capacity down, Federation pleased, cartels alert), ignore, or soften (the opposite, plus CoL down in
Ibira). Conceding is not war: conceding leads to cartel **dominance** (quiet streets, controlled votes, collapsing CoL,
illicit output, a toll on rare earths, a rising corruption bar). War comes from antagonising them without first reducing
their capacity. Cartel war is too early for chapter 3.
