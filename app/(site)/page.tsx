import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Cable,
  Compass,
  GraduationCap,
  LineChart,
  MapPin,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { ButtonLink, CtaBand, Eyebrow, Photo, SectionHeading } from "@/components/ui";
import { InsightCard } from "@/components/InsightCard";
import { Reveal } from "@/components/Reveal";
import { connectivity, crypto, photos, site } from "@/content/site";
import { getInsights } from "@/lib/insights";

const capabilities = ["Market research", "Trading education", "Community Wi-Fi", "Network installation", "Technical support"];

const reasons = [
  {
    icon: Compass,
    title: "Experience-led",
    text: "Our work in digital markets comes from hands-on trading and research experience, not theory or marketing.",
  },
  {
    icon: ShieldCheck,
    title: "Risk-first thinking",
    text: "In markets and in networks, we plan for what could go wrong first. No guarantees, no hype, no shortcuts.",
  },
  {
    icon: MapPin,
    title: "Built for Uganda",
    text: "Solutions designed around local power, cost, terrain and the way communities actually use technology.",
  },
  {
    icon: BookOpen,
    title: "Education at the core",
    text: "We explain our reasoning so clients understand their options and make their own informed decisions.",
  },
];

const routes = [
  { icon: GraduationCap, label: "I want to learn to trade responsibly", service: "crypto-education", area: "Markets" },
  { icon: LineChart, label: "I need market research or analysis", service: "crypto-research", area: "Markets" },
  { icon: Wifi, label: "I want Wi-Fi for my community or business", service: "connectivity-community", area: "Connectivity" },
  { icon: Cable, label: "I need a network installed or supported", service: "connectivity-installation", area: "Connectivity" },
];

function InlinePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative mx-1 inline-block h-[0.78em] w-[1.7em] overflow-hidden rounded-full align-[-0.06em]">
      <Image src={src} alt={alt} fill sizes="160px" className="object-cover" />
    </span>
  );
}

export default async function HomePage() {
  const insights = (await getInsights()).slice(0, 3);

  return (
    <>
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white">
        <Photo {...photos.kampalaSkyline} priority className="absolute inset-0 -z-10" imageClassName="hero-zoom" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 to-transparent" />

        <div className="container-page pt-36 pb-10 sm:pb-14">
          <div className="fade-up">
            <Eyebrow>Technology · Connectivity · Digital markets</Eyebrow>
            <h1 className="mt-7 font-display text-[3.1rem] leading-[0.92] font-semibold tracking-[-0.045em] xs:text-[3.6rem] sm:text-[5.5rem] xl:text-[7.5rem]">
              Connected <span className="font-serif font-normal tracking-[-0.02em] italic">communities.</span>
              <br />
              Informed <span className="font-serif font-normal tracking-[-0.02em] text-lime italic">markets.</span>
            </h1>
          </div>

          <div className="fade-up mt-10 grid gap-8 [animation-delay:150ms] lg:mt-14 lg:grid-cols-12 lg:items-end">
            <p className="max-w-lg text-lg leading-relaxed text-white/80 text-pretty lg:col-span-5 sm:text-xl">
              {site.name} is a Ugandan technology company bringing reliable internet to communities, and disciplined, honest
              research and education to digital markets.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {[
                { href: "/crypto-markets", eyebrow: "Digital markets", title: "Crypto & Markets", photo: photos.tradingLaptop, accent: true },
                { href: "/internet-solutions", eyebrow: "Connectivity", title: "Internet Solutions", photo: photos.technician, accent: false },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-ink/40 p-2.5 pr-4 backdrop-blur-md transition-colors duration-300 hover:border-white/40 hover:bg-ink/60"
                >
                  <Photo {...item.photo} alt="" sizes="96px" className="size-16 shrink-0 rounded-xl sm:size-20" imageClassName="transition-transform duration-500 group-hover:scale-110" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.7rem] tracking-[0.12em] text-white/60 uppercase">{item.eyebrow}</span>
                    <span className="mt-1 block font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</span>
                  </span>
                  <span
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      item.accent ? "bg-lime text-ink" : "bg-white text-ink"
                    }`}
                  >
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-ink/50 backdrop-blur-sm">
          <ul className="container-page flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm text-white/65">
            <li className="flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-lime uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-lime" />
              {site.status}
            </li>
            {capabilities.map((item) => (
              <li key={item} className="hidden items-center gap-3 md:flex">
                <span aria-hidden className="size-1 rounded-full bg-white/30" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-light py-24 sm:py-36">
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">About {site.name}</Eyebrow>
            <p className="mt-8 max-w-6xl font-display text-[2rem] leading-[1.12] font-medium tracking-[-0.035em] text-balance sm:text-6xl sm:leading-[1.05]">
              We build networks <InlinePhoto {...photos.towerSky} /> people can rely on, and explain markets{" "}
              <InlinePhoto {...photos.marketScreens} /> people can understand.{" "}
              <span className="font-serif font-normal tracking-[-0.01em] text-stone italic">From Uganda, for the region.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {[
                { value: "02", label: "Core service areas, today" },
                { value: "UG", label: "Founded and based in Uganda" },
                { value: "+", label: "Designed to grow into new technology services" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-5 bg-bone p-5 sm:block sm:p-8">
                  <p className="w-14 shrink-0 font-display text-4xl font-semibold tracking-[-0.04em] sm:w-auto sm:text-6xl">{item.value}</p>
                  <p className="text-stone sm:mt-4">{item.label}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="group mt-10 inline-flex min-h-11 items-center gap-2 font-medium">
              <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">More about us</span>
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="on-light pb-24 sm:pb-36" aria-labelledby="services-heading">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title={<span id="services-heading">Two practices. One standard of care.</span>}
              intro="Each practice is led by hands-on experience and shaped around the people we serve."
            />
          </Reveal>

          <div className="mt-16 space-y-20 sm:space-y-28">
            <article className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
              <Reveal className="lg:col-span-7">
                <div className="relative">
                  <Photo {...photos.tradingLaptop} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
                  <div className="absolute right-4 bottom-4 left-4 flex flex-wrap gap-2 sm:right-auto sm:bottom-6 sm:left-6">
                    {["Research", "Analysis", "Education", "Risk"].map((tag) => (
                      <span key={tag} className="rounded-full bg-ink/75 px-3 py-1.5 text-sm text-white backdrop-blur">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.08} className="lg:col-span-5">
                <p className="font-mono text-xs tracking-[0.14em] text-stone uppercase">01 — Digital markets</p>
                <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Crypto &amp; Markets</h3>
                <p className="mt-5 text-lg leading-relaxed text-stone">
                  Research, analysis and education from experienced traders, with risk management at the centre of everything.
                  We never promise returns and we never manage your money.
                </p>
                <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                  {crypto.services.map((service) => (
                    <li key={service.title} className="bg-bone px-4 py-3.5 font-medium">
                      {service.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href="/crypto-markets" variant="ink">
                    Explore Crypto &amp; Markets
                  </ButtonLink>
                </div>
              </Reveal>
            </article>

            <article className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
              <Reveal className="lg:order-2 lg:col-span-7">
                <div className="relative">
                  <Photo {...photos.technician} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
                  <div className="absolute right-4 bottom-4 flex items-center gap-3 rounded-2xl bg-bone/95 p-3 pr-5 backdrop-blur sm:right-6 sm:bottom-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lime">
                      <Wifi aria-hidden className="size-5" />
                    </span>
                    <span className="text-sm leading-tight">
                      <span className="block font-medium">Survey · Install · Support</span>
                      <span className="text-stone">The whole network lifecycle</span>
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.08} className="lg:order-1 lg:col-span-5">
                <p className="font-mono text-xs tracking-[0.14em] text-stone uppercase">02 — Connectivity</p>
                <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Internet Solutions</h3>
                <p className="mt-5 text-lg leading-relaxed text-stone">
                  Community internet, hotspots and professionally installed networks, supported by people who stay to keep them
                  running.
                </p>
                <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                  {connectivity.services.map((service) => (
                    <li key={service.title} className="flex items-center justify-between py-3.5 font-medium">
                      {service.title}
                      <span aria-hidden className="size-1.5 rounded-full bg-ink/25" />
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href="/internet-solutions" variant="ink">
                    Explore Internet Solutions
                  </ButtonLink>
                </div>
              </Reveal>
            </article>
          </div>
        </div>
      </section>

      <section className="on-light bg-sand py-24 sm:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Photo {...photos.communityLaptops} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[2rem]" />
                <p className="mt-4 text-sm text-clay">Technology is only useful when it works for the people using it.</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Why YoungAfrican"
                title={
                  <>
                    Credibility is built on how you work, <span className="font-serif font-normal italic">not what you claim.</span>
                  </>
                }
                intro="We are a young company. What we can promise is the way we operate."
              />
            </Reveal>
            <ol className="mt-12">
              {reasons.map((reason, index) => (
                <li key={reason.title} className="border-t border-ink/15 py-8">
                  <Reveal delay={index * 0.04} className="grid gap-4 sm:grid-cols-[3.5rem_1fr]">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-ink text-lime">
                      <reason.icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{reason.title}</h3>
                      <p className="mt-2 max-w-xl text-lg leading-relaxed text-clay">{reason.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="Service enquiries"
                title="Tell us what you need."
                intro="Choose the option closest to your situation and we will tailor the conversation from there."
              />
            </Reveal>
            <Link href="/contact" className="group inline-flex min-h-11 items-center gap-2 self-start text-white/80 hover:text-white lg:self-auto">
              Something else? Send a general enquiry
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {routes.map((route, index) => (
              <li key={route.service}>
                <Reveal delay={(index % 2) * 0.06} className="h-full">
                  <Link
                    href={`/contact?service=${route.service}`}
                    className="group flex h-full flex-col justify-between gap-12 rounded-3xl border border-white/10 bg-ink-2 p-6 transition-colors duration-300 hover:border-lime/60 hover:bg-ink-3 sm:p-8"
                  >
                    <span className="flex items-center justify-between">
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/5 text-lime">
                        <route.icon aria-hidden className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-xs tracking-[0.12em] text-white/50 uppercase">{route.area}</span>
                    </span>
                    <span className="flex items-end justify-between gap-6">
                      <span className="font-display text-2xl leading-tight font-medium tracking-[-0.02em] sm:text-[1.75rem]">
                        {route.label}
                      </span>
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                        <ArrowUpRight aria-hidden className="size-5" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {insights.length > 0 && (
        <section className="on-light py-24 sm:py-32">
          <div className="container-page">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <SectionHeading
                  eyebrow="Insights"
                  title={
                    <>
                      Notes on markets <span className="font-serif font-normal italic">and</span> connectivity.
                    </>
                  }
                />
              </Reveal>
              <ButtonLink href="/insights" variant="outline-light" className="self-start sm:self-auto">
                All insights
              </ButtonLink>
            </div>
            <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight, index) => (
                <li key={insight.id} className={index === 2 ? "md:hidden lg:block" : ""}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <InsightCard insight={insight} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Ready to get connected, or to understand the markets better?"
        text="Start with a conversation. No obligation, no pressure and no promises we cannot keep."
        primary={{ label: "Make an enquiry", href: "/contact" }}
        secondary={{ label: "Request a coverage check", href: "/contact?service=connectivity-community" }}
        image={photos.hillsideCity}
      />
    </>
  );
}
