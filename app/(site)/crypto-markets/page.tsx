import type { Metadata } from "next";
import { TriangleAlert, X } from "lucide-react";
import { ButtonLink, CtaBand, Eyebrow, PageHero, Photo, SectionHeading } from "@/components/ui";
import { TradePlanDiagram } from "@/components/Illustrations";
import { Reveal } from "@/components/Reveal";
import { crypto, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Crypto & Markets",
  description:
    "Crypto market research, analysis, trading education and consultancy grounded in practical experience and disciplined risk management.",
  alternates: { canonical: "/crypto-markets" },
};

const principles = [
  { title: "Process over prediction", text: "Nobody knows what the market will do next. A repeatable process matters more than any single call." },
  { title: "Risk defined first", text: "How much could be lost, and where the idea is wrong, is decided before anything else." },
  { title: "Education, not signals", text: "We explain how we think so you can make your own decisions, rather than telling you what to buy." },
];

const modules = [
  { title: "How markets work", text: "Exchanges, order books, liquidity, spreads and the different types of crypto-assets." },
  { title: "Reading the chart", text: "Candlesticks, timeframes, volume and market structure, with their limits made clear." },
  { title: "Risk and position sizing", text: "Risk per trade, invalidation levels and sizing positions so one loss never ends the account." },
  { title: "The written trading plan", text: "Entry, exit and invalidation criteria written before the trade, not invented during it." },
  { title: "Journaling and review", text: "Recording decisions and outcomes so you can learn from evidence instead of memory." },
  { title: "Security and scams", text: "Wallet security, two-factor authentication, exchange risk and recognising fraudulent schemes." },
];

export default function CryptoMarketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Crypto & Markets"
        title={
          <>
            Understand the market <span className="font-serif font-normal tracking-[-0.02em] italic">before</span> you take part
            in it.
          </>
        }
        intro="Research, analysis and education from experienced traders, with risk management at the centre of every conversation."
        aside={
          <div className="relative pb-40 sm:pb-32 lg:pb-24">
            <Photo {...photos.analystLaptop} priority sizes="(min-width: 1024px) 45vw, 100vw" className="ml-auto aspect-[4/3] w-full rounded-[2rem] sm:w-[88%]" />
            <div className="absolute bottom-0 left-0 w-[94%] sm:w-[72%]">
              <TradePlanDiagram className="shadow-2xl shadow-black/50" />
            </div>
          </div>
        }
      >
        <ButtonLink href="/contact?service=crypto-education">Enquire about education</ButtonLink>
        <ButtonLink href="#risk" variant="outline-dark">
          Our approach to risk
        </ButtonLink>
      </PageHero>

      <section className="on-light bg-bone py-24 sm:py-36">
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">Our trading philosophy</Eyebrow>
            <blockquote className="mt-8 max-w-5xl font-serif text-[2.4rem] leading-[1.05] tracking-[-0.01em] text-balance sm:text-7xl">
              “The aim is not to be right every time. It is to stay in the game long enough to get better.”
            </blockquote>
          </Reveal>
          <ol className="mt-16 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {principles.map((item, index) => (
              <li key={item.title} className="border-t border-ink/20 pt-6">
                <Reveal delay={index * 0.06}>
                  <span className="font-mono text-xs text-stone">0{index + 1}</span>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em]">{item.title}</h2>
                  <p className="mt-2 leading-relaxed text-stone">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="services" className="on-light py-24 sm:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Services"
                title="Clarity in a noisy market."
                intro="Digital markets are full of confident predictions. We focus on process, evidence and helping you think for yourself."
              />
            </Reveal>
            <ol className="mt-12 border-b border-ink/15">
              {crypto.services.map((service, index) => (
                <li key={service.title} className="group border-t border-ink/15">
                  <Reveal className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:py-8">
                    <span className="font-mono text-sm text-stone">0{index + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{service.title}</h3>
                      <p className="mt-2 max-w-xl text-lg leading-relaxed text-stone">{service.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Photo {...photos.candlesDark} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[2rem]" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="on-light bg-sand py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Trading education"
                title={
                  <>
                    Learn the craft, <span className="font-serif font-normal italic">not just the signals.</span>
                  </>
                }
                intro="Practical sessions grounded in real trading experience. Formats, schedules and fees will be published when sessions open."
              />
            </Reveal>
            <ButtonLink href="/contact?service=crypto-education" variant="ink" className="self-start lg:self-auto">
              Register interest
            </ButtonLink>
          </div>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => (
              <li key={module.title}>
                <Reveal delay={(index % 3) * 0.05} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl bg-bone p-7">
                    <span className="font-mono text-xs tracking-[0.12em] text-clay uppercase">Module 0{index + 1}</span>
                    <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.02em]">{module.title}</h3>
                    <p className="mt-2 leading-relaxed text-clay">{module.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="risk" className="bg-ink py-24 text-white sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="Approach to risk"
                title="Protecting capital comes first."
                intro="Good trading is mostly about managing what happens when you are wrong. That principle shapes everything we research and teach."
              />
            </Reveal>
            <ol className="mt-12">
              {crypto.approach.map((item, index) => (
                <li key={item.title} className="border-t border-white/15 py-6">
                  <Reveal className="grid gap-3 sm:grid-cols-[3rem_1fr]">
                    <span className="font-mono text-sm text-lime">0{index + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                      <p className="mt-2 leading-relaxed text-mist">{item.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <TradePlanDiagram />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="on-light py-24 sm:py-32">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[2rem] border border-ink/10 bg-white p-7 sm:p-10">
              <Eyebrow tone="light">Clear boundaries</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">What we do not do</h2>
              <ul className="mt-8 space-y-4">
                {crypto.boundaries.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <X aria-hidden className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <aside aria-labelledby="risk-warning" className="h-full rounded-[2rem] border-2 border-ink bg-lime p-7 text-ink sm:p-10">
              <TriangleAlert aria-hidden className="size-8" strokeWidth={1.75} />
              <h2 id="risk-warning" className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">
                Risk warning
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed">
                <p>
                  Crypto-assets are highly volatile and largely unregulated in many jurisdictions. Their value can fall sharply
                  and you can lose all of the money you put in.
                </p>
                <p>
                  Our research and education are for information and learning only. They are not personal financial advice and
                  are not an offer to buy, sell or manage any asset.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Start with understanding."
        text="Tell us what you want to learn or research and we will suggest a sensible starting point."
        primary={{ label: "Make an enquiry", href: "/contact?service=crypto-research" }}
        secondary={{ label: "Read market education", href: "/insights" }}
        image={photos.studentsPhone}
      />
    </>
  );
}
