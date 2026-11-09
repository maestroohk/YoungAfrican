import type { MarkProps, Tone } from "../marks";
import { DirectionSection, Lockup, type Direction, type MarkType } from "./kit";
import { ChannelAfrica, Horseshoe, Ligature, Ligature2, NotchY, NotchY2, Seed, ShareMark, Stamp, Step } from "./marks";

const SteppedStamp = (props: MarkProps) => <Stamp asymmetric {...props} />;

const sketches: { label: string; Mark: MarkType; verdict: string }[] = [
  { label: "A1 Notch Y", Mark: NotchY, verdict: "Keep. A heavy Y whose fork is cut in the shape of Africa." },
  { label: "B1 Channel", Mark: ChannelAfrica, verdict: "Cut. Reads as a cracked continent; messy below 32 px." },
  { label: "C1 yA ligature", Mark: Ligature, verdict: "Keep. One stroke serves as the y's tail and the A's leg." },
  { label: "D1 Stamp", Mark: Stamp, verdict: "Keep as reference. Barkcloth horseshoe-and-dot motif." },
  { label: "D2 Stepped stamp", Mark: SteppedStamp, verdict: "Cut. Reads as a P." },
  { label: "E1 Step", Mark: Step, verdict: "Cut. Split discs are everywhere in tech and finance." },
  { label: "E2 Share", Mark: ShareMark, verdict: "Keep. One connection becoming two." },
  { label: "F1 Seed", Mark: Seed, verdict: "Cut. Reads as a peach or an egg." },
];

const refinements: { label: string; Mark: MarkType; note: string }[] = [
  { label: "A1 → A2", Mark: NotchY2, note: "Africa enlarged and centred on the stem so the Cape sits exactly on the fork; arms rebalanced so West Africa never thins below a printable width." },
  { label: "C1 → C2", Mark: Ligature2, note: "Every terminal cut flat on the same top and baseline, apex flattened, the y's arm joined cleanly into the shared stroke, dot reduced." },
  { label: "D1 → D3", Mark: Horseshoe, note: "Tried a true horseshoe arch, a form found in North African architecture. Rejected: it reads as a keyhole or an upside-down location pin." },
];

const directions: Direction[] = [
  {
    id: "a",
    letter: "A",
    question: "The African Y",
    name: "Notch",
    status: "Finalist",
    Mark: NotchY2,
    idea: "A heavy, confident Y. The space inside its fork is cut in the exact shape of the African continent, with the north coast running along the top edge, the Horn in the right arm and the Cape landing on the stem. At a glance it is a strong letter; look again and Africa is held inside it. The continent is not added to the Y, it is the Y's own negative space.",
    strengths: "Recognisable in black alone. Reads as a Y at 16 px and as Africa from 32 px. The idea fits the parent brand, not one product: young (Y) and African (the continent) in a single shape. No arcs, dots, rings or maps placed behind a letter.",
    weaknesses: "The coastline has more points than the other marks, so it needs accurate reproduction for embroidery below about 3 cm. Some people will see only a bold Y until the Africa is pointed out, which is acceptable but means the idea grows with exposure rather than landing instantly.",
    similarity: "Bold wedge-shaped Y monograms exist in sport and media; the Africa-shaped fork is what separates this one, so the notch must never be simplified to a plain V. Africa in negative space has been used by pan-African organisations; I found no example inside a Y, but a proper search is needed.",
  },
  {
    id: "b",
    letter: "B",
    question: "Africa as the foundation",
    name: "Channel",
    status: "Eliminated",
    Mark: ChannelAfrica,
    idea: "A minimal continent with a Y-shaped channel cut through it, so the letter emerges from the land.",
    strengths: "Immediately African and works in black.",
    weaknesses: "The cut reads as a crack or a border dispute, and three pieces of continent turn into noise below 32 px. Direction A answers this brief better: there the continent becomes negative space, rather than being cut up.",
    similarity: "Continent silhouettes are used by many pan-African institutions, banks and NGOs.",
  },
  {
    id: "c",
    letter: "C",
    question: "The YA signature",
    name: "Shared stroke",
    status: "Finalist",
    Mark: Ligature2,
    idea: "A lowercase y and a capital A written as one gesture: the long stroke of the y is also the left leg of the A. Flat cuts on every terminal give it the feel of a carved or stencilled letter, and the mango point sits where the A's crossbar would be.",
    strengths: "Says the name with no illustration. Dynamic, forward-leaning silhouette, and the flat-cut letter style extends naturally into a custom wordmark.",
    weaknesses: "At 16 px the y's arm and the A's apex crowd together. It has the least African character of the finalists; any African reading would have to come from colour and use.",
    similarity: "Joined YA monograms exist in fashion and personal brands, and triangular A marks are common in tech. The shared diagonal and flat apex are the distinguishing details.",
  },
  {
    id: "d",
    letter: "D",
    question: "African-inspired abstract",
    name: "Stamp",
    status: "Eliminated",
    Mark: Stamp,
    idea: "Inspired by the small horseshoe-and-dot shapes block-printed on Baganda barkcloth: a heavy arch with a single point inside, like a carved printing block.",
    strengths: "Simple, solid and printable, with a genuine Ugandan source.",
    weaknesses: "Too close to round two's Doorway. Out of context it reads as a magnet, an n or a horseshoe, and the barkcloth source is invisible without explanation. The horseshoe-arch refinement read as a keyhole or location pin.",
    similarity: "Arch marks are common in property and education, and famous yellow arches exist.",
  },
  {
    id: "e",
    letter: "E",
    question: "Connection and community",
    name: "Share",
    status: "Finalist",
    Mark: ShareMark,
    idea: "From round two: the Y drawn as two strands, blue and mango, that run together and then part. One good connection, shared well.",
    strengths: "Clear story, distinctive split stem, and the strands can become lines and borders across the brand.",
    weaknesses: "The split closes below 24 px. Less African character than A, and it is the round-two concept you felt was not yet distinctive enough.",
    similarity: "Antibody diagrams in biotech are drawn as a Y of paired strands; generic fork and merge icons.",
  },
  {
    id: "f",
    letter: "F",
    question: "The unexpected signature",
    name: "Step",
    status: "Eliminated",
    Mark: Step,
    idea: "Two half-discs, one raised a step above the other: two parties meeting, one moving up.",
    strengths: "Superb at small sizes, very simple.",
    weaknesses: "A split disc is one of the most common shapes in tech and finance identities; it has no African character and little to own. The other unexpected idea, a seed with a Y groove, read as a peach or an egg.",
    similarity: "Split and offset circles are widespread in fintech and media marks.",
  },
];

const criteria = ["Originality", "African character", "Simplicity", "Memorability", "Small-size legibility", "Parent-brand fit", "Scalability", "Longevity", "Similarity risk (5 = low)"];
const scores: Record<string, number[]> = {
  a: [5, 5, 4, 5, 5, 5, 5, 4, 4],
  b: [2, 4, 3, 3, 2, 3, 3, 3, 2],
  c: [4, 2, 4, 4, 3, 5, 4, 4, 3],
  d: [3, 3, 5, 3, 4, 3, 4, 4, 2],
  e: [4, 2, 5, 3, 3, 4, 4, 4, 3],
  f: [2, 1, 5, 3, 5, 2, 5, 3, 2],
};

const finalists = [NotchY2, Ligature2, ShareMark];

function Strip({ marks, size, tones }: { marks: MarkType[]; size: number; tones: Tone[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      {tones.map((tone) => (
        <div key={tone} className="grid border-b border-black/10 last:border-b-0" style={{ gridTemplateColumns: `repeat(${marks.length}, minmax(0, 1fr))` }}>
          {marks.map((Mark, index) => (
            <div key={index} className="flex flex-col items-center gap-5 border-r border-black/10 px-2 py-8 last:border-r-0">
              <Mark tone={tone} size={size} />
              <span className="flex items-end gap-4">
                {[16, 24, 32].map((px) => (
                  <Mark key={px} tone={tone} size={px} />
                ))}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function RoundThree() {
  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-sm font-semibold text-blue">YoungAfrican brand identity · Round three</p>
        <h1 className="mt-3 text-6xl font-semibold tracking-[-0.05em]">A symbol that can become YoungAfrican</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          Designed in black first. Six directions were sketched, most were cut, and three finalists were refined and tested in the places the brand will
          actually live. Rounds one and two remain available as fallbacks.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
          {[
            ["#blind", "Blind comparison"],
            ["#process", "Process"],
            ["#a", "A"],
            ["#b", "B"],
            ["#c", "C"],
            ["#d", "D"],
            ["#e", "E"],
            ["#f", "F"],
            ["#evaluation", "Evaluation"],
            ["#recommendation", "Recommendation"],
            ["/brand-review", "Round one"],
            ["/brand-review/round-two", "Round two"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full bg-white px-4 py-2">
              {label}
            </a>
          ))}
        </nav>

        <section id="blind" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">The three finalists, unlabelled, at identical sizes</h2>
          <div className="mt-5">
            <Strip marks={finalists} size={150} tones={["mono", "light"]} />
          </div>
        </section>

        <section id="process" className="mt-16 border-t border-black/10 pt-14">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Process</h2>
          <div className="mt-6 grid gap-6 text-muted lg:grid-cols-3">
            <p>
              <span className="font-semibold text-ink">What the research pointed to.</span> The most convincing African identities derive the idea from the
              name or the place rather than adding symbols: the logo should feel African once the story is known, not announce it. Traditional motifs work
              best abstracted into simple, scalable forms.
            </p>
            <p>
              <span className="font-semibold text-ink">Ugandan source material.</span> Barkcloth (olubugo) from Buganda is decorated with block-printed
              zigzags, small horseshoe shapes and dots. I found no reliable source for what individual motifs mean, so they are used here as shapes only,
              with no claimed meaning.
            </p>
            <p>
              <span className="font-semibold text-ink">Local context.</span> In Uganda, yellow-and-black belongs to MTN and red to Airtel, so mango stays an
              accent. Every mark was judged in solid black before colour was added.
            </p>
          </div>

          <h3 className="mt-10 text-lg font-semibold">First sketches</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sketches.map((sketch) => (
              <figure key={sketch.label} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="flex items-center justify-center gap-4">
                  <sketch.Mark tone="mono" size={84} />
                  <sketch.Mark tone="mono" size={20} />
                </div>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{sketch.label}.</span> <span className="text-muted">{sketch.verdict}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <h3 className="mt-10 text-lg font-semibold">Refinements</h3>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {refinements.map((item) => (
              <figure key={item.label} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="flex items-center justify-center gap-4">
                  <item.Mark tone="mono" size={96} />
                  <item.Mark size={96} />
                </div>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{item.label}.</span> <span className="text-muted">{item.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <h3 className="mt-10 text-lg font-semibold">Wordmark</h3>
          <p className="mt-2 max-w-3xl text-muted">
            One custom letter shared by every finalist: an A with its apex cut flat, echoing the flat terminals of the marks. It gives the word a signature
            without decoration, and it is the same A in YoungAfrican, YoungAfrican Internet and YoungAfrican Markets Academy.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-10 rounded-2xl border border-black/10 bg-white p-8">
            <Lockup Mark={NotchY2} size={64} symbol={false} />
            <Lockup Mark={NotchY2} size={64} tone="mono" symbol={false} sub="Markets Academy" />
          </div>
        </section>

        {directions.map((direction) => (
          <DirectionSection key={direction.id} direction={direction} />
        ))}

        <section id="evaluation" className="border-t border-black/10 py-14">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Evaluation</h2>
          <p className="mt-3 max-w-3xl text-muted">My judgement, out of 5. Similarity is a visual review only, not a trademark search; clearance is needed before adoption.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="p-3">Criterion</th>
                  {directions.map((direction) => (
                    <th key={direction.id} className="p-3">
                      {direction.letter} · {direction.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((criterion, row) => (
                  <tr key={criterion} className="border-b border-black/5">
                    <td className="p-3">{criterion}</td>
                    {directions.map((direction) => (
                      <td key={direction.id} className="p-3 font-semibold tabular-nums">
                        {scores[direction.id][row]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-3 font-semibold">Total / 45</td>
                  {directions.map((direction) => (
                    <td key={direction.id} className="p-3 font-semibold tabular-nums">
                      {scores[direction.id].reduce((sum, value) => sum + value, 0)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="recommendation" className="border-t border-black/10 py-14">
          <div className="grid gap-8 rounded-3xl bg-night p-8 text-white lg:grid-cols-[auto_1fr] lg:p-12">
            <div className="flex items-center gap-6">
              <NotchY2 tone="navy" size={140} />
            </div>
            <div>
              <p className="text-sm font-semibold text-mango">Recommendation</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">A · Notch</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                It is the first concept in three rounds that I believe can carry the brand on its own. The silhouette is a single bold shape that works in
                black, holds at 16 px and survives a T-shirt print. The idea is in the geometry, not added to it: young and African in one form, with the
                continent as the Y&apos;s own negative space. It does not describe internet or trading, so it can sit above every service YoungAfrican starts.
              </p>
              <p className="mt-4 leading-relaxed text-white/70">
                C · Shared stroke is the strongest alternative if you want a purely typographic identity, and E · Share remains the clearest story. If you
                choose Notch, the next refinement is to simplify the coastline to the fewest points that still read as Africa, test embroidery at 3 cm, and
                run a trademark clearance search.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
