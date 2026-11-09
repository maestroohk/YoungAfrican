import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Wifi } from "lucide-react";
import { Logo } from "@/components/Header";

const navy = "#031f3d";
const gold = "#fea813";

function Panel({ bg, label, children, className = "" }: { bg: string; label: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-black/10 ${className}`}>
      <div className="flex min-h-40 items-center justify-center p-8" style={{ background: bg }}>
        {children}
      </div>
      <figcaption className="bg-white px-4 py-2 text-xs text-muted">{label}</figcaption>
    </figure>
  );
}

function Asset({ name, height }: { name: string; height: number }) {
  return <Image src={`/brand/${name}`} alt="" width={height * 8} height={height} unoptimized style={{ height, width: "auto" }} />;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function FinalBrand() {
  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-sm font-semibold text-muted">YoungAfrican · Notch, Refined · local preview</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Panel bg="#fff" label="youngafrican-logo.svg">
            <Asset name="youngafrican-logo.svg" height={72} />
          </Panel>
          <Panel bg={navy} label="youngafrican-logo-reverse.svg">
            <Asset name="youngafrican-logo-reverse.svg" height={72} />
          </Panel>
        </div>

        <Section title="Symbol">
          <div className="grid gap-4 sm:grid-cols-3">
            <Panel bg="#fff" label="youngafrican-symbol.svg">
              <Asset name="youngafrican-symbol.svg" height={110} />
            </Panel>
            <Panel bg={navy} label="youngafrican-symbol-reverse.svg">
              <Asset name="youngafrican-symbol-reverse.svg" height={110} />
            </Panel>
            <Panel bg="#fff" label="youngafrican-symbol-mono.svg">
              <Asset name="youngafrican-symbol-mono.svg" height={110} />
            </Panel>
          </div>
        </Section>

        <Section title="Products">
          <div className="grid gap-4 md:grid-cols-2">
            <Panel bg="#fff" label="youngafrican-internet.svg">
              <Asset name="youngafrican-internet.svg" height={52} />
            </Panel>
            <Panel bg={navy} label="youngafrican-internet-reverse.svg">
              <Asset name="youngafrican-internet-reverse.svg" height={52} />
            </Panel>
            <Panel bg="#fff" label="youngafrican-markets-academy.svg">
              <Asset name="youngafrican-markets-academy.svg" height={44} />
            </Panel>
            <Panel bg={navy} label="youngafrican-markets-academy-reverse.svg">
              <Asset name="youngafrican-markets-academy-reverse.svg" height={44} />
            </Panel>
            <Panel bg="#fff" label="youngafrican-internet-compact.svg">
              <Asset name="youngafrican-internet-compact.svg" height={56} />
            </Panel>
            <Panel bg="#fff" label="youngafrican-markets-academy-compact.svg">
              <Asset name="youngafrican-markets-academy-compact.svg" height={56} />
            </Panel>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            <Panel bg="#fff" label="youngafrican-logo-stacked.svg">
              <Asset name="youngafrican-logo-stacked.svg" height={110} />
            </Panel>
            <Panel bg="#fff" label="youngafrican-logo-mono.svg">
              <Asset name="youngafrican-logo-mono.svg" height={36} />
            </Panel>
            <Panel bg="#fff" label="youngafrican-internet-icon.svg">
              <Asset name="youngafrican-internet-icon.svg" height={96} />
            </Panel>
            <Panel bg="#fff" label="youngafrican-markets-academy-icon.svg">
              <Asset name="youngafrican-markets-academy-icon.svg" height={96} />
            </Panel>
          </div>
        </Section>

        <Section title="Sizes: 16, 24, 32, 48, 64, 128, 256 px">
          <div className="grid gap-4">
            {[
              { bg: "#fff", name: "youngafrican-symbol.svg", label: "Symbol on white (height in px)" },
              { bg: navy, name: "youngafrican-symbol-reverse.svg", label: "Reverse on navy (height in px)" },
              { bg: "#dfe1e5", name: "youngafrican-internet-icon.svg", label: "App icon and favicon tile" },
            ].map((row) => (
              <Panel key={row.name} bg={row.bg} label={row.label}>
                <span className="flex flex-wrap items-end gap-6">
                  {[16, 24, 32, 48, 64, 128, 256].map((px) => (
                    <Asset key={px} name={row.name} height={px} />
                  ))}
                </span>
              </Panel>
            ))}
          </div>
        </Section>

        <Section title="Website header and footer (live components)">
          <div className="grid gap-4">
            {[
              { bg: "#fff", style: {}, label: "Header on white" },
              { bg: "#2d3cff", style: { "--logo-main": "#fff" }, label: "Header on the blue hero" },
              { bg: "#ffc24d", style: { "--logo-accent": "#fff" }, label: "Header on the mango hero" },
              { bg: "#0f1430", style: { "--logo-main": "#fff" }, label: "Footer on night" },
            ].map((row) => (
              <figure key={row.label} className="overflow-hidden rounded-2xl border border-black/10">
                <div className="flex h-16 items-center justify-between px-6" style={{ background: row.bg, ...(row.style as CSSProperties) }}>
                  <Logo />
                  <span className="rounded-full bg-black/10 px-4 py-2 text-sm font-semibold">Check coverage</span>
                </div>
                <figcaption className="bg-white px-4 py-2 text-xs text-muted">{row.label}</figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="In use">
          <div className="grid gap-4 md:grid-cols-3">
            <Panel bg="#e9e4d8" label="Hotspot sign">
              <div className="flex w-48 flex-col items-center rounded-2xl p-6 text-center text-white" style={{ background: navy }}>
                <Asset name="youngafrican-symbol-reverse.svg" height={54} />
                <p className="mt-4 text-sm font-semibold">YoungAfrican Wi-Fi</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
                  <Wifi className="size-3.5" /> youngafrican
                </p>
                <p className="mt-3 rounded-full px-3 py-1 text-xs font-semibold text-[#031f3d]" style={{ background: gold }}>
                  From UGX 500
                </p>
              </div>
            </Panel>
            <Panel bg="#e9e4d8" label="Voucher">
              <div className="w-56 overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="px-4 py-3" style={{ background: navy }}>
                  <Asset name="youngafrican-internet-reverse.svg" height={18} />
                </div>
                <div className="p-4">
                  <p className="text-[0.65rem] text-muted">Voucher code</p>
                  <p className="font-mono text-lg font-semibold tracking-[0.15em]">ABC123</p>
                  <p className="mt-2 flex justify-between text-xs text-muted">
                    <span>Daily · 24 hours</span>
                    <span className="font-semibold text-ink">UGX 1,000</span>
                  </p>
                </div>
              </div>
            </Panel>
            <Panel bg="#e9e4d8" label="T-shirt and cap">
              <div className="flex items-end gap-3">
                <div className="flex h-40 w-32 items-start justify-center rounded-t-[2.5rem] rounded-b-lg pt-10" style={{ background: navy }}>
                  <Asset name="youngafrican-symbol-reverse.svg" height={30} />
                </div>
                <div className="flex h-16 w-24 items-center justify-center rounded-t-[3rem] bg-white">
                  <Asset name="youngafrican-symbol.svg" height={18} />
                </div>
              </div>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
