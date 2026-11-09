import type { ComponentType, ReactNode } from "react";
import { Menu, Wifi } from "lucide-react";
import { colors, type MarkProps, type Tone } from "../marks";

export type MarkType = ComponentType<MarkProps>;

const textColor = (tone: Tone) => (tone === "light" || tone === "mono" ? colors.ink : colors.white);
const subColor = (tone: Tone) => (tone === "light" ? colors.blue : tone === "mono" ? colors.ink : tone === "reverse" ? colors.white : colors.mango);

function FlatA() {
  return (
    <svg viewBox="0 0 40 50" aria-hidden className="inline-block" style={{ height: "0.71em", width: "0.57em", margin: "0 0.005em", verticalAlign: "0" }}>
      <clipPath id="flat-a">
        <rect width="40" height="50" />
      </clipPath>
      <path d="M2 58 20 -9 38 58M10 35h20" fill="none" stroke="currentColor" strokeWidth="7.4" strokeLinejoin="miter" clipPath="url(#flat-a)" />
    </svg>
  );
}

export function Word({ custom = true }: { custom?: boolean }) {
  if (!custom) return <>YoungAfrican</>;
  return (
    <>
      Young
      <FlatA />
      frican
    </>
  );
}

export function Lockup({ Mark, tone = "light", sub, size = 40, stacked = false, symbol = true }: { Mark: MarkType; tone?: Tone; sub?: string; size?: number; stacked?: boolean; symbol?: boolean }) {
  return (
    <span className={`inline-flex ${stacked ? "flex-col items-center text-center" : "items-center"}`} style={{ gap: size * 0.3 }}>
      {symbol && <Mark tone={tone} size={size} />}
      <span className="flex flex-col" style={{ color: textColor(tone) }}>
        <span className="font-semibold whitespace-nowrap" style={{ fontSize: size * 0.56, letterSpacing: "-0.03em", lineHeight: 1 }}>
          <Word />
        </span>
        {sub && (
          <span className="font-semibold uppercase" style={{ fontSize: size * 0.21, letterSpacing: "0.22em", lineHeight: 1, marginTop: size * 0.15, color: subColor(tone) }}>
            {sub}
          </span>
        )}
      </span>
    </span>
  );
}

export function Tile({ bg, label, children, className = "" }: { bg: string; label: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`flex flex-col overflow-hidden rounded-2xl border border-black/10 ${className}`}>
      <div className="flex flex-1 items-center justify-center p-6" style={{ background: bg }}>
        {children}
      </div>
      <figcaption className="bg-white px-3 py-1.5 text-xs text-muted">{label}</figcaption>
    </figure>
  );
}

export type Direction = {
  id: string;
  letter: string;
  name: string;
  question: string;
  status: "Finalist" | "Eliminated";
  Mark: MarkType;
  idea: string;
  strengths: string;
  weaknesses: string;
  similarity: string;
};

export function DirectionSection({ direction }: { direction: Direction }) {
  const { Mark } = direction;
  const finalist = direction.status === "Finalist";
  return (
    <section id={direction.id} className="border-t border-black/10 py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold">
            <span className="text-blue">
              Direction {direction.letter} · {direction.question}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${finalist ? "bg-blue text-white" : "bg-black/10 text-ink"}`}>{direction.status}</span>
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{direction.name}</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">{direction.idea}</p>
        </div>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-semibold">Strengths</dt>
            <dd className="text-muted">{direction.strengths}</dd>
          </div>
          <div>
            <dt className="font-semibold">Weaknesses</dt>
            <dd className="text-muted">{direction.weaknesses}</dd>
          </div>
          <div>
            <dt className="font-semibold">Looks like</dt>
            <dd className="text-muted">{direction.similarity}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Tile bg={colors.white} label="1 · Black">
          <Mark tone="mono" size={128} />
        </Tile>
        <Tile bg={colors.ink} label="2 · White reverse">
          <Mark tone="reverse" size={128} />
        </Tile>
        <Tile bg={colors.white} label="3 · Full colour">
          <Mark size={128} />
        </Tile>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <Tile bg={colors.white} label="4 · 16, 24, 32, 48 px, colour">
          <span className="flex items-end gap-5">
            {[16, 24, 32, 48].map((px) => (
              <Mark key={px} size={px} />
            ))}
          </span>
        </Tile>
        <Tile bg={colors.white} label="4 · 16, 24, 32, 48 px, black">
          <span className="flex items-end gap-5">
            {[16, 24, 32, 48].map((px) => (
              <Mark key={px} tone="mono" size={px} />
            ))}
          </span>
        </Tile>
        <Tile bg={colors.navy} label="4 · 16, 24, 32, 48 px, on navy">
          <span className="flex items-end gap-5">
            {[16, 24, 32, 48].map((px) => (
              <Mark key={px} tone="navy" size={px} />
            ))}
          </span>
        </Tile>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Tile bg={colors.white} label="5 · YoungAfrican parent brand">
          <Lockup Mark={Mark} size={52} />
        </Tile>
        <Tile bg={colors.white} label="6 · Internet">
          <Lockup Mark={Mark} size={52} sub="Internet" />
        </Tile>
        <Tile bg={colors.navy} label="6 · Markets Academy">
          <Lockup Mark={Mark} tone="navy" size={52} sub="Markets Academy" />
        </Tile>
      </div>

      <figure className="mt-3 overflow-hidden rounded-2xl border border-black/10">
        <div className="flex items-center justify-between bg-white px-8 py-4">
          <Lockup Mark={Mark} size={36} sub="Internet" />
          <span className="flex items-center gap-7 text-sm font-medium">
            <span>Packages</span>
            <span>Coverage</span>
            <span>How to connect</span>
            <span>Rewards</span>
            <span className="rounded-full bg-ink px-4 py-2 text-white">Check coverage</span>
          </span>
        </div>
        <div className="flex items-center justify-between px-8 py-4" style={{ background: colors.blue }}>
          <Lockup Mark={Mark} tone="blue" size={36} sub="Internet" />
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-deep">Check coverage</span>
        </div>
        <figcaption className="bg-white px-3 py-1.5 text-xs text-muted">7 · Website desktop header, on white and on the blue hero</figcaption>
      </figure>

      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Tile bg={colors.paper} label="8 · Mobile header and favicon">
          <div className="w-60">
            <div className="flex items-center gap-2 rounded-t-xl bg-[#dfe1e5] px-3 pt-2">
              <span className="flex items-center gap-1.5 rounded-t-lg bg-white px-3 py-1.5 text-[0.7rem]">
                <Mark tile size={16} />
                YoungAfrican
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3" style={{ background: colors.blue }}>
              <Lockup Mark={Mark} tone="blue" size={26} />
              <Menu className="size-5 text-white" />
            </div>
            <div className="h-20 rounded-b-xl p-4" style={{ background: colors.blue }}>
              <p className="text-lg leading-tight font-semibold text-white">
                Get connected.
                <br />
                <span className="text-mango">Stay connected.</span>
              </p>
            </div>
          </div>
        </Tile>
        <Tile bg={colors.paper} label="9 · Wi-Fi hotspot sign">
          <div className="flex w-40 flex-col items-center rounded-2xl p-5 text-center text-white" style={{ background: colors.navy }}>
            <Mark tone="navy" size={64} />
            <p className="mt-3 text-sm font-semibold">YoungAfrican Wi-Fi</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
              <Wifi className="size-3.5" /> youngafrican
            </p>
            <p className="mt-3 rounded-full bg-mango px-3 py-1 text-xs font-semibold text-mango-ink">From UGX 500</p>
          </div>
        </Tile>
        <Tile bg={colors.paper} label="10 · Voucher card">
          <div className="w-52 overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3" style={{ background: colors.blue }}>
              <Lockup Mark={Mark} tone="blue" size={22} sub="Internet" />
            </div>
            <div className="p-4">
              <p className="text-[0.65rem] text-muted">Voucher code</p>
              <p className="font-mono text-base font-semibold tracking-[0.15em]">ABC123</p>
              <p className="mt-2 flex justify-between text-[0.65rem] text-muted">
                <span>Daily · 24 hours</span>
                <span className="font-semibold text-ink">UGX 1,000</span>
              </p>
            </div>
          </div>
        </Tile>
        <Tile bg="#e8e4da" label="11 · T-shirt and cap, one-colour print">
          <div className="flex items-end gap-3">
            <div className="flex h-36 w-28 items-start justify-center rounded-t-[2.5rem] rounded-b-lg bg-ink pt-8">
              <Mark tone="reverse" size={44} />
            </div>
            <div className="flex h-16 w-24 items-center justify-center rounded-t-[3rem]" style={{ background: colors.blue }}>
              <Mark tone="reverse" size={26} />
            </div>
          </div>
        </Tile>
      </div>
    </section>
  );
}
