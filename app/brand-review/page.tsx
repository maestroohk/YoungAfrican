import type { ComponentType, ReactNode } from "react";
import { Menu, Wifi } from "lucide-react";
import { colors, directions, type Tone } from "./marks";


type MarkType = ComponentType<{ tone?: Tone; tile?: boolean; round?: boolean; size?: number | string; className?: string }>;

function Wordmark({ Mark, tone = "light", sub, size = 40, stacked = false }: { Mark: MarkType; tone?: Tone; sub?: string; size?: number; stacked?: boolean }) {
  const dark = tone === "blue" || tone === "navy" || tone === "reverse";
  const text = dark ? colors.white : colors.ink;
  const subColor = tone === "light" ? colors.blue : tone === "mono" ? colors.ink : dark ? colors.mango : colors.ink;
  return (
    <span className={`inline-flex ${stacked ? "flex-col items-center text-center" : "items-center"}`} style={{ gap: size * 0.28 }}>
      <Mark tone={tone} size={size} />
      <span className="flex flex-col" style={{ color: text }}>
        <span className="font-semibold" style={{ fontSize: size * 0.56, letterSpacing: "-0.035em", lineHeight: 1 }}>
          YoungAfrican
        </span>
        {sub && (
          <span className="font-semibold uppercase" style={{ fontSize: size * 0.22, letterSpacing: "0.2em", lineHeight: 1, marginTop: size * 0.12, color: subColor }}>
            {sub}
          </span>
        )}
      </span>
    </span>
  );
}

function Panel({ bg, children, label, className = "" }: { bg: string; children: ReactNode; label: string; className?: string }) {
  return (
    <figure className={`flex flex-col overflow-hidden rounded-3xl border border-black/10 ${className}`}>
      <div className="flex flex-1 items-center justify-center p-8" style={{ background: bg }}>
        {children}
      </div>
      <figcaption className="bg-white px-4 py-2 text-xs text-muted">{label}</figcaption>
    </figure>
  );
}

function Direction({ direction }: { direction: (typeof directions)[number] }) {
  const { Mark } = direction;
  return (
    <section id={direction.id} className="border-t border-ink/10 py-16">
      <p className="text-sm font-semibold text-blue">{direction.kind}</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{direction.name}</h2>
      <p className="mt-3 max-w-2xl text-lg text-muted">{direction.idea}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Panel bg={colors.white} label="Symbol on white">
          <Mark size={140} />
        </Panel>
        <Panel bg={colors.blue} label="Symbol on Concept D blue">
          <Mark tone="blue" size={140} />
        </Panel>
        <Panel bg={colors.navy} label="Symbol on navy">
          <Mark tone="navy" size={140} />
        </Panel>
      </div>

      <h3 className="mt-10 text-lg font-semibold">Lockups</h3>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel bg={colors.white} label="Parent: YoungAfrican">
          <Wordmark Mark={Mark} size={52} />
        </Panel>
        <Panel bg={colors.white} label="YoungAfrican Internet">
          <Wordmark Mark={Mark} size={52} sub="Internet" />
        </Panel>
        <Panel bg={colors.white} label="YoungAfrican Markets Academy">
          <Wordmark Mark={Mark} size={52} sub="Markets Academy" />
        </Panel>
        <Panel bg={colors.blue} label="Internet on blue">
          <Wordmark Mark={Mark} tone="blue" size={52} sub="Internet" />
        </Panel>
        <Panel bg={colors.navy} label="Academy on navy">
          <Wordmark Mark={Mark} tone="navy" size={52} sub="Markets Academy" />
        </Panel>
        <Panel bg={colors.paper} label="Monochrome, for print and embroidery">
          <Wordmark Mark={Mark} tone="mono" size={52} sub="Internet" />
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Panel bg={colors.paper} label="Stacked">
          <Wordmark Mark={Mark} size={64} sub="Internet" stacked />
        </Panel>
        <Panel bg={colors.paper} label="App icon (tile)">
          <Mark tile size={112} />
        </Panel>
        <Panel bg={colors.paper} label="Social avatar (circle crop)">
          <Mark tile round tone="navy" size={112} />
        </Panel>
        <Panel bg={colors.paper} label="Reverse on a photo-dark surface">
          <span className="rounded-2xl bg-ink p-5">
            <Mark tone="reverse" size={72} />
          </span>
        </Panel>
      </div>

      <h3 className="mt-10 text-lg font-semibold">Small sizes, actual pixels</h3>
      <div id={`${direction.id}-small`} className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { bg: colors.white, tone: "light" as Tone, tile: false, label: "Symbol on white" },
          { bg: colors.white, tone: "light" as Tone, tile: true, label: "Favicon tile on white" },
          { bg: colors.navy, tone: "navy" as Tone, tile: false, label: "Symbol on navy" },
          { bg: "#dfe1e5", tone: "light" as Tone, tile: true, label: "Favicon tile in a browser tab" },
        ].map((row) => (
          <Panel key={row.label} bg={row.bg} label={`${row.label}: 16, 24, 32, 48 px`}>
            <span className="flex items-end gap-6">
              {[16, 24, 32, 48].map((px) => (
                <Mark key={px} tone={row.tone} tile={row.tile} size={px} />
              ))}
            </span>
          </Panel>
        ))}
      </div>

      <h3 className="mt-10 text-lg font-semibold">In use</h3>
      <div className="mt-4 grid gap-4">
        <figure className="overflow-hidden rounded-3xl border border-black/10">
          <div className="flex items-center justify-between bg-white px-8 py-4">
            <Wordmark Mark={Mark} size={34} sub="Internet" />
            <span className="flex items-center gap-7 text-sm font-medium">
              <span>Packages</span>
              <span>Coverage</span>
              <span>How to connect</span>
              <span>Rewards</span>
              <span className="rounded-full bg-ink px-4 py-2 text-white">Check coverage</span>
            </span>
          </div>
          <div className="flex items-center justify-between px-8 py-4" style={{ background: colors.blue }}>
            <Wordmark Mark={Mark} tone="blue" size={34} sub="Internet" />
            <span className="flex items-center gap-7 text-sm font-medium text-white">
              <span>Packages</span>
              <span>Coverage</span>
              <span>How to connect</span>
              <span className="rounded-full bg-white px-4 py-2 text-blue-deep">Check coverage</span>
            </span>
          </div>
          <figcaption className="bg-white px-4 py-2 text-xs text-muted">Desktop header, light and blue hero states</figcaption>
        </figure>

        <div className="grid gap-4 md:grid-cols-[22rem_1fr_1fr]">
          <figure className="overflow-hidden rounded-3xl border border-black/10">
            <div className="bg-paper p-6">
              <div className="mx-auto w-[18rem] overflow-hidden rounded-[1.6rem] bg-white ring-6 ring-ink">
                <div className="flex items-center justify-between px-4 py-3" style={{ background: colors.blue }}>
                  <Wordmark Mark={Mark} tone="blue" size={28} />
                  <Menu className="size-5 text-white" />
                </div>
                <div className="p-4" style={{ background: colors.blue }}>
                  <p className="text-2xl leading-tight font-semibold text-white">
                    Get connected.
                    <br />
                    <span className="text-mango">Stay connected.</span>
                  </p>
                </div>
              </div>
            </div>
            <figcaption className="bg-white px-4 py-2 text-xs text-muted">Mobile header</figcaption>
          </figure>

          <figure className="overflow-hidden rounded-3xl border border-black/10">
            <div className="flex h-full items-center justify-center bg-paper p-6">
              <div className="w-64 rounded-[1.6rem] bg-blue p-6 text-white">
                <div className="flex items-center justify-between">
                  <Mark tone="blue" size={30} />
                  <span className="rounded-full bg-mango px-2.5 py-0.5 text-xs font-semibold text-mango-ink">Popular</span>
                </div>
                <p className="mt-6 text-xl font-semibold">Daily</p>
                <p className="text-sm text-white/80">24 hours</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.04em]">UGX 1,000</p>
              </div>
            </div>
            <figcaption className="bg-white px-4 py-2 text-xs text-muted">Internet package card</figcaption>
          </figure>

          <figure className="overflow-hidden rounded-3xl border border-black/10">
            <div className="flex h-full items-center justify-center gap-4 bg-paper p-6">
              <div className="flex w-44 flex-col items-center rounded-2xl p-5 text-center text-white" style={{ background: colors.navy }}>
                <Mark tone="navy" size={64} />
                <p className="mt-3 text-sm font-semibold">YoungAfrican Wi-Fi</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/70">
                  <Wifi className="size-3.5" /> youngafrican
                </p>
                <p className="mt-3 rounded-full bg-mango px-3 py-1 text-xs font-semibold text-mango-ink">From UGX 500</p>
              </div>
              <div className="w-40 rounded-xl border-2 border-dashed border-ink/25 bg-white p-4">
                <Wordmark Mark={Mark} size={22} sub="Internet" />
                <p className="mt-4 text-[0.65rem] text-muted">Voucher code</p>
                <p className="font-mono text-sm font-semibold tracking-[0.15em]">ABC123</p>
                <p className="mt-2 text-[0.65rem] text-muted">Daily · 24 hours</p>
              </div>
            </div>
            <figcaption className="bg-white px-4 py-2 text-xs text-muted">Hotspot sign and printed voucher</figcaption>
          </figure>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-3xl border border-black/10">
            <div className="p-8" style={{ background: colors.navy }}>
              <Wordmark Mark={Mark} tone="navy" size={44} sub="Markets Academy" />
              <p className="mt-8 max-w-sm text-3xl leading-tight font-semibold text-white">Learn how markets work, one lesson at a time.</p>
            </div>
            <figcaption className="bg-white px-4 py-2 text-xs text-muted">Markets Academy branding</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-3xl border border-black/10">
            <div className="flex items-center justify-center gap-6 bg-[#e8e4da] p-8">
              <div className="flex h-44 w-40 items-start justify-center rounded-t-[3rem] rounded-b-xl bg-ink pt-10">
                <Mark tone="navy" size={56} />
              </div>
              <div className="flex h-24 w-40 items-center justify-center rounded-t-[4rem] bg-ink">
                <Mark tone="reverse" size={36} />
              </div>
            </div>
            <figcaption className="bg-white px-4 py-2 text-xs text-muted">T-shirt and cap (one-colour print)</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const scores = [
  ["Legibility", [5, 4, 4]],
  ["Simplicity", [5, 3, 5]],
  ["Distinctiveness", [4, 2, 4]],
  ["Visual balance", [5, 3, 4]],
  ["Small-size clarity (16–24 px)", [5, 2, 4]],
  ["Link to the YoungAfrican name", [5, 4, 2]],
  ["Print, embroidery, one colour", [5, 4, 3]],
] as const;

export default function BrandReview() {
  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-blue">YoungAfrican brand identity · Stage 1 review</p>
        <h1 className="mt-3 text-6xl font-semibold tracking-[-0.05em]">Three directions</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          One parent symbol, one wordmark, and a descriptor line for each service. All three use the Concept D palette in flat colour and share the same
          typography, so the comparison is about the symbol.
        </p>
        <nav className="mt-6 flex gap-3">
          {directions.map((direction) => (
            <a key={direction.id} href={`#${direction.id}`} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold">
              <direction.Mark size={22} />
              {direction.name}
            </a>
          ))}
          <a href="#compare" className="rounded-full bg-ink px-4 py-2 font-semibold text-white">
            Comparison
          </a>
          <a href="/brand-review/round-two" className="rounded-full bg-blue px-4 py-2 font-semibold text-white">
            Round two
          </a>
        </nav>

        {directions.map((direction) => (
          <Direction key={direction.id} direction={direction} />
        ))}

        <section id="compare" className="border-t border-ink/10 py-16">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Comparison</h2>
          <table className="mt-8 w-full max-w-3xl overflow-hidden rounded-3xl bg-white text-left">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="p-4">Criterion</th>
                {directions.map((direction) => (
                  <th key={direction.id} className="p-4">
                    {direction.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scores.map(([label, values]) => (
                <tr key={label} className="border-b border-ink/5">
                  <td className="p-4">{label}</td>
                  {values.map((value, index) => (
                    <td key={index} className="p-4 font-semibold tabular-nums">
                      {value} / 5
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-10 max-w-3xl rounded-3xl bg-blue p-8 text-white">
            <p className="text-sm font-semibold text-mango">Recommendation</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">A · Rise</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              It is the only direction that says YoungAfrican on its own: the Y carries the name, the raised arms say youth and opportunity, and the
              mango dot carries the connection idea without another Wi-Fi icon. It stays a clear Y at 16 px, survives one-colour printing and
              embroidery, and sits naturally beside the existing Concept D type.
            </p>
            <p className="mt-4 leading-relaxed text-white/75">
              B is warm and clearly African, but a continent outline is common across African brands and turns into a blob below 24 px. C is
              strong and ownable as a pattern, and could become a secondary motif for vouchers and merchandise, but it has no link to the name.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
