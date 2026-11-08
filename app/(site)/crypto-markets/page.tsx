import type { Metadata } from "next";
import { ButtonLink, Label, Photo, SectionHeader, TextLink } from "@/components/ui";
import { TradePlanDiagram } from "@/components/Illustrations";
import { crypto, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Markets research and education",
  description:
    "Crypto market research, analysis, trading education and consultancy grounded in practical experience and disciplined risk management. Never financial advice.",
  alternates: { canonical: "/crypto-markets" },
};

const principles = [
  { title: "Process over prediction", text: "Nobody knows what the market will do next. A repeatable process matters more than any single call." },
  { title: "Risk defined first", text: "How much could be lost, and where an idea is wrong, is decided before anything else." },
  { title: "Education, not signals", text: "We explain how we think so you can make your own decisions, rather than telling you what to buy." },
];

const modules = [
  { title: "How markets work", text: "Exchanges, order books, liquidity, spreads and the different kinds of crypto-assets." },
  { title: "Reading the chart", text: "Candlesticks, timeframes, volume and market structure, with their limits made clear." },
  { title: "Risk and position sizing", text: "Risk per trade, invalidation levels and sizing so that one loss never ends the account." },
  { title: "The written trading plan", text: "Entry, exit and invalidation criteria written before the trade, not invented during it." },
  { title: "Journaling and review", text: "Recording decisions and outcomes so you learn from evidence instead of memory." },
  { title: "Security and scams", text: "Wallet security, two-factor authentication, exchange risk and recognising fraud." },
];

export default function CryptoMarketsPage() {
  return (
    <>
      <section className="on-dark bg-ink text-ivory">
        <div className="container-page grid gap-10 pt-12 pb-14 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-20">
          <div className="rise lg:col-span-5">
            <Label tone="dark">Markets research and education</Label>
            <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-balance sm:text-[3.4rem]">
              Understand the market before you take part in it.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-mist">
              Research, analysis and education from a self-taught trader&apos;s perspective, with risk management at the centre of
              every conversation. We never manage money and never promise returns.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact?service=crypto-education" variant="light">
                Ask about education
              </ButtonLink>
              <ButtonLink href="#risk" variant="outline-light">
                Our approach to risk
              </ButtonLink>
            </div>
          </div>
          <div className="rise [animation-delay:120ms] lg:col-span-7">
            <TradePlanDiagram />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Label>Philosophy</Label>
          </div>
          <div className="lg:col-span-9">
            <blockquote className="max-w-3xl font-serif text-[2rem] leading-[1.15] tracking-[-0.01em] text-balance sm:text-[2.8rem]">
              The aim is not to be right every time. It is to stay in the market long enough to get better.
            </blockquote>
            <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {principles.map((item, index) => (
                <li key={item.title} className="border-t-2 border-ink pt-4">
                  <span className="text-sm font-medium text-copper">0{index + 1}</span>
                  <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-1.5 leading-relaxed text-stone">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-rule bg-paper py-14 sm:py-20" aria-labelledby="services-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Label>Services</Label>
            <h2 id="services-heading" className="mt-5 font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] sm:text-[2.6rem]">
              Clarity in a noisy market.
            </h2>
            <ol className="mt-8 border-b border-rule">
              {crypto.services.map((service, index) => (
                <li key={service.title} className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[3.5rem_1fr]">
                  <span className="text-sm font-medium text-copper">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.01em]">{service.title}</h3>
                    <p className="mt-1.5 max-w-xl leading-relaxed text-stone">{service.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Photo
                {...photos.analystLaptop}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] lg:aspect-[4/5]"
                caption="Research means reading widely and writing down what you expect before the market answers."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="education-heading">
        <div className="container-page">
          <SectionHeader
            label="Trading education"
            id="education-heading"
            title="Learn the craft, not just the signals."
            intro="Practical sessions in six parts. Formats, schedules and fees will be published when sessions open."
          >
            <div className="mt-5">
              <TextLink href="/contact?service=crypto-education">Register interest</TextLink>
            </div>
          </SectionHeader>
          <ol className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:ml-[25%] lg:w-3/4">
            {modules.map((module, index) => (
              <li key={module.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-rule py-5">
                <span className="font-serif text-2xl leading-none text-copper">{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="mt-1 leading-relaxed text-stone">{module.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="risk" className="on-dark bg-ink py-14 text-ivory sm:py-20" aria-labelledby="risk-heading">
        <div className="container-page">
          <SectionHeader
            tone="dark"
            label="Approach to risk"
            id="risk-heading"
            title="Protecting capital comes first."
            intro="Good trading is mostly about managing what happens when you are wrong."
          />
          <ol className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:ml-[25%] lg:w-3/4">
            {crypto.approach.map((item) => (
              <li key={item.title} className="border-t border-white/15 py-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-mist">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="boundaries-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Label>Boundaries</Label>
          </div>
          <div className="lg:col-span-5">
            <h2 id="boundaries-heading" className="font-serif text-[1.9rem] leading-tight">
              What we do not do
            </h2>
            <ul className="mt-5 border-b border-rule">
              {crypto.boundaries.map((item) => (
                <li key={item} className="border-t border-rule py-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside aria-labelledby="risk-warning" className="border-l-2 border-copper pl-6 lg:col-span-4">
            <h2 id="risk-warning" className="label text-copper">
              Risk warning
            </h2>
            <p className="mt-3 leading-relaxed">
              Crypto-assets are highly volatile and largely unregulated in many places. Their value can fall sharply and you can lose
              all of the money you put in.
            </p>
            <p className="mt-3 leading-relaxed text-stone">
              Our research and education are for learning only. They are not personal financial advice or an offer to buy, sell or
              manage any asset.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
