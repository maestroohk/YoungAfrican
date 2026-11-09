import type { ComponentType, ReactNode } from "react";
import { Menu, Wifi } from "lucide-react";
import { colors, directions, type MarkProps, type Tone } from "../marks";
import { roundTwo } from "./marks";

type MarkType = ComponentType<MarkProps>;
type Letter = { id: string; Mark: MarkType };

const textColor = (tone: Tone) => (tone === "light" || tone === "mono" ? colors.ink : colors.white);
const subColor = (tone: Tone) => (tone === "light" ? colors.blue : tone === "mono" ? colors.ink : tone === "reverse" ? colors.white : colors.mango);

function Word({ letter, tone }: { letter: Letter; tone: Tone }) {
  const glyph = (Mark: MarkType, margin: string) => (
    <span className="inline-block align-baseline" style={{ width: "0.66em", height: "0.72em", margin, position: "relative", top: "0.04em" }}>
      <Mark tone={tone} size="100%" className="block size-full scale-[1.32]" />
    </span>
  );
  if (letter.id === "d") return <>{glyph(letter.Mark, "0 0.02em 0 0")}oungAfrican</>;
  if (letter.id === "e") return <>Young{glyph(letter.Mark, "0 0.01em")}frican</>;
  if (letter.id === "g") return <>{glyph(letter.Mark, "0 0.03em 0 0")}oungafrican</>;
  return <>YoungAfrican</>;
}

function Lockup({ letter, tone = "light", sub, size = 40, stacked = false, symbol = true }: { letter: Letter; tone?: Tone; sub?: string; size?: number; stacked?: boolean; symbol?: boolean }) {
  const { Mark } = letter;
  const showSymbol = symbol && letter.id !== "d" && letter.id !== "g";
  return (
    <span className={`inline-flex ${stacked ? "flex-col items-center text-center" : "items-center"}`} style={{ gap: size * 0.28 }}>
      {showSymbol && <Mark tone={tone} size={size} />}
      <span className="flex flex-col" style={{ color: textColor(tone) }}>
        <span className="font-semibold whitespace-nowrap" style={{ fontSize: size * 0.56, letterSpacing: "-0.035em", lineHeight: 1 }}>
          <Word letter={letter} tone={tone} />
        </span>
        {sub && (
          <span className="font-semibold uppercase" style={{ fontSize: size * 0.22, letterSpacing: "0.2em", lineHeight: 1, marginTop: size * 0.14, color: subColor(tone) }}>
            {sub}
          </span>
        )}
      </span>
    </span>
  );
}

function Tile({ bg, label, children, className = "" }: { bg: string; label: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`flex flex-col overflow-hidden rounded-2xl border border-black/10 ${className}`}>
      <div className="flex flex-1 items-center justify-center p-6" style={{ background: bg }}>
        {children}
      </div>
      <figcaption className="bg-white px-3 py-1.5 text-xs text-muted">{label}</figcaption>
    </figure>
  );
}

function Direction({ direction }: { direction: (typeof roundTwo)[number] }) {
  const { Mark } = direction;
  const letter = direction;
  return (
    <section id={direction.id} className="border-t border-black/10 py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="text-sm font-semibold text-blue">{direction.kind}</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{direction.name}</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">{direction.idea}</p>
        </div>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-semibold">What makes it distinctive</dt>
            <dd className="text-muted">{direction.distinct}</dd>
          </div>
          <div>
            <dt className="font-semibold">Where it may fail</dt>
            <dd className="text-muted">{direction.risk}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Tile bg={colors.white} label="Black">
          <Mark tone="mono" size={120} />
        </Tile>
        <Tile bg={colors.ink} label="White">
          <Mark tone="reverse" size={120} />
        </Tile>
        <Tile bg={colors.white} label="Full colour">
          <Mark size={120} />
        </Tile>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Tile bg={colors.white} label="Wordmark">
          <Lockup letter={letter} size={50} />
        </Tile>
        <Tile bg={colors.white} label="Internet">
          <Lockup letter={letter} size={50} sub="Internet" />
        </Tile>
        <Tile bg={colors.navy} label="Markets Academy">
          <Lockup letter={letter} tone="navy" size={50} sub="Markets Academy" />
        </Tile>
        <Tile bg={colors.white} label="Wordmark alone">
          <Lockup letter={letter} size={60} symbol={false} />
        </Tile>
        <Tile bg={colors.blue} label="Internet on blue">
          <Lockup letter={letter} tone="blue" size={50} sub="Internet" />
        </Tile>
        <Tile bg={colors.white} label="Black, for print">
          <Lockup letter={letter} tone="mono" size={50} sub="Internet" />
        </Tile>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {[
          { bg: colors.white, tone: "light" as Tone, tile: false, label: "Colour" },
          { bg: colors.white, tone: "mono" as Tone, tile: false, label: "Black" },
          { bg: "#dfe1e5", tone: "light" as Tone, tile: true, label: "Favicon tile in a tab" },
        ].map((row) => (
          <Tile key={row.label} bg={row.bg} label={`${row.label}: 16, 24, 32, 48 px`}>
            <span className="flex items-end gap-5">
              {[16, 24, 32, 48].map((px) => (
                <Mark key={px} tone={row.tone} tile={row.tile} size={px} />
              ))}
            </span>
          </Tile>
        ))}
      </div>

      <figure className="mt-3 overflow-hidden rounded-2xl border border-black/10">
        <div className="flex items-center justify-between bg-white px-8 py-4">
          <Lockup letter={letter} size={34} sub="Internet" />
          <span className="flex items-center gap-7 text-sm font-medium">
            <span>Packages</span>
            <span>Coverage</span>
            <span>How to connect</span>
            <span>Rewards</span>
            <span className="rounded-full bg-ink px-4 py-2 text-white">Check coverage</span>
          </span>
        </div>
        <figcaption className="bg-white px-3 py-1.5 text-xs text-muted">Website header</figcaption>
      </figure>

      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <Tile bg={colors.paper} label="Mobile header">
          <div className="w-60 overflow-hidden rounded-[1.4rem] ring-6 ring-ink">
            <div className="flex items-center justify-between px-4 py-3" style={{ background: colors.blue }}>
              <Lockup letter={letter} tone="blue" size={26} />
              <Menu className="size-5 text-white" />
            </div>
            <div className="h-24 p-4" style={{ background: colors.blue }}>
              <p className="text-xl leading-tight font-semibold text-white">
                Get connected.
                <br />
                <span className="text-mango">Stay connected.</span>
              </p>
            </div>
          </div>
        </Tile>
        <Tile bg={colors.paper} label="Hotspot sign">
          <div className="flex w-40 flex-col items-center rounded-2xl p-5 text-center text-white" style={{ background: colors.navy }}>
            <Mark tone="navy" size={64} />
            <p className="mt-3 text-sm font-semibold">Free to join</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
              <Wifi className="size-3.5" /> youngafrican
            </p>
            <p className="mt-3 rounded-full bg-mango px-3 py-1 text-xs font-semibold text-mango-ink">From UGX 500</p>
          </div>
        </Tile>
        <Tile bg={colors.paper} label="Voucher card">
          <div className="w-48 rounded-xl bg-white p-4 shadow-sm">
            <Lockup letter={letter} size={24} sub="Internet" />
            <p className="mt-4 text-[0.65rem] text-muted">Voucher code</p>
            <p className="font-mono text-base font-semibold tracking-[0.15em]">ABC123</p>
            <p className="mt-2 flex justify-between text-[0.65rem] text-muted">
              <span>Daily · 24 hours</span>
              <span className="font-semibold text-ink">UGX 1,000</span>
            </p>
          </div>
        </Tile>
        <Tile bg="#e8e4da" label="T-shirt and cap, one-colour print">
          <div className="flex items-end gap-3">
            <div className="flex h-36 w-28 items-start justify-center rounded-t-[2.5rem] rounded-b-lg bg-ink pt-8">
              <Mark tone="reverse" size={44} />
            </div>
            <div className="flex h-16 w-24 items-center justify-center rounded-t-[3rem] bg-ink">
              <Mark tone="reverse" size={26} />
            </div>
          </div>
        </Tile>
      </div>
    </section>
  );
}

const lineup = [...directions.map((d) => ({ id: d.id, name: d.name, Mark: d.Mark as MarkType })), ...roundTwo.map((d) => ({ id: d.id, name: d.name, Mark: d.Mark as MarkType }))];

const similarity = [
  ["A · Rise", "Raised-arms figures are among the most common marks for charities, youth programmes and community groups. Hard to own."],
  ["B · Signal", "Continent outlines with a highlighted point are widely used by pan-African organisations, banks and NGOs."],
  ["C · Weave", "Interlocking or stacked diamonds are a familiar pattern for crypto exchanges, fintech and consulting firms."],
  ["D · Share", "Split or two-line letter marks exist (often in sport and finance), but an unjoined Y fork with blue and mango strands is not a common telecom treatment. Closest risks: antibody diagrams used in biotech, which are drawn as a Y of paired strands, and generic merge or fork icons."],
  ["E · Doorway", "Arch marks are common in property, education and hospitality, and famous yellow arches exist, so colour and proportion matter. A heavy arch with a single point is less common."],
  ["G · Line", "Lowercase letter marks are common in tech. Underline and tail devices exist (some well known as curved arrows), so the tail should stay straight and flat with a round end point."],
  ["F · Engoma", "Drum marks appear in music and cultural brands rather than telecoms. Triangle patterns are widely used in African design, so the pattern itself is not ownable, only this arrangement."],
];

export default function RoundTwo() {
  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-sm font-semibold text-blue">YoungAfrican brand identity · Round two</p>
        <h1 className="mt-3 text-6xl font-semibold tracking-[-0.05em]">Looking for the idea</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          Three new directions, each built on a single idea rather than a collection of symbols. A, B and C remain available on the first review page.
          Mango is kept as an accent because, in Uganda, yellow-and-black fields belong to MTN and red to Airtel.
        </p>

        <section id="lineup" className="mt-10">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">All seven at identical sizes</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
            {(["mono", "light"] as Tone[]).map((tone) => (
              <div key={tone} className="grid grid-cols-7 border-b border-black/10 last:border-b-0">
                {lineup.map((item) => (
                  <div key={item.id} className="flex flex-col items-center gap-4 border-r border-black/10 px-2 py-6 last:border-r-0">
                    <item.Mark tone={tone} size={96} />
                    <span className="flex items-end gap-3">
                      {[16, 24, 32].map((px) => (
                        <item.Mark key={px} tone={tone} size={px} />
                      ))}
                    </span>
                    <span className="text-xs font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {roundTwo.map((direction) => (
          <Direction key={direction.id} direction={direction} />
        ))}

        <section id="recommendation" className="border-t border-black/10 py-14">
          <div className="max-w-3xl rounded-3xl bg-blue p-8 text-white">
            <p className="text-sm font-semibold text-mango">Recommendation</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">D · Share</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              It is the only direction where the symbol, the name and the business story are the same idea. The Y is the first letter of YoungAfrican, it is
              drawn as one connection becoming two, and that is exactly what the service does. The split stem is recognisable in black alone, the symbol
              lives inside the wordmark so there is nothing extra to remember, and the two strands give the brand a device for lines, dividers and patterns.
            </p>
            <p className="mt-4 leading-relaxed text-white/75">
              E · Doorway is the best alternative: a strong, simple symbol, but its custom A reads as an n at text size, so the wordmark would need a different
              A. G · Line works as a typographic signature but is weaker as an icon. F was rejected. A remains the safest fallback from round one.
            </p>
            <p className="mt-4 leading-relaxed text-white/75">
              To refine D before it is final: tune the strand gap so it survives at 24 px, draw the full wordmark as paths with matched stroke weights, and
              decide whether the strands stay two-colour everywhere or only in the symbol.
            </p>
          </div>
        </section>

        <section id="similarity" className="border-t border-black/10 py-14">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Similarity review</h2>
          <p className="mt-3 max-w-3xl text-muted">
            A visual comparison against familiar kinds of marks in telecoms, technology, finance and education. This is a design judgement, not a trademark
            search: before adopting any mark, a proper clearance search in Uganda and the main markets is needed.
          </p>
          <dl className="mt-8 grid gap-3 md:grid-cols-2">
            {similarity.map(([name, text]) => (
              <div key={name} className="rounded-2xl bg-white p-5">
                <dt className="font-semibold">{name}</dt>
                <dd className="mt-1 text-muted">{text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
