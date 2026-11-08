import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Label, Photo, SectionHeader, TextLink } from "@/components/ui";
import { StoryCard, StoryLead } from "@/components/InsightCard";
import { crypto, hotspot, photos, site, values } from "@/content/site";
import { featuredInsight, getInsights } from "@/lib/insights";

const entries = [
  {
    number: "01",
    title: "Community Wi-Fi hotspots",
    text: "Shared, pay-as-you-go Wi-Fi for markets, campuses and public spaces.",
    href: "/internet-solutions",
  },
  {
    number: "02",
    title: "Markets research and education",
    text: "Plain-language research and training on digital markets, with risk first.",
    href: "/crypto-markets",
  },
];

async function LatestInsights() {
  const insights = await getInsights();
  if (insights.length === 0) return null;
  const lead = featuredInsight(insights);
  const others = insights.filter((item) => item.id !== lead.id).slice(0, 3);

  return (
    <section className="py-14 sm:py-20" aria-labelledby="insights-heading">
      <div className="container-page">
        <SectionHeader label="Insights" id="insights-heading" title="Notes on connectivity, markets and AI.">
          <div className="mt-5">
            <TextLink href="/insights">All insights</TextLink>
          </div>
        </SectionHeader>
        <div className="mt-10">
          <StoryLead insight={lead} />
        </div>
        {others.length > 0 && (
          <ul className="mt-12 grid gap-x-8 gap-y-12 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((insight) => (
              <li key={insight.id}>
                <StoryCard insight={insight} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-page grid gap-10 pt-10 pb-12 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pb-16">
          <div className="rise flex flex-col lg:col-span-6">
            <Label>Technology for access · {site.location}</Label>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-balance sm:text-[3.4rem] lg:text-[3.75rem]">
              Affordable Wi‑Fi where people gather. Honest knowledge about markets.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone">
              {site.name} is a Ugandan company in formation. We are building community Wi-Fi hotspots that make getting online
              cheaper, and we teach people how digital markets really work, risks included.
            </p>
            <ul className="mt-10 border-t border-rule lg:mt-auto">
              {entries.map((entry) => (
                <li key={entry.href} className="border-b border-rule">
                  <Link href={entry.href} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-5">
                    <span className="text-sm font-medium text-copper">{entry.number}</span>
                    <span>
                      <span className="block text-lg font-semibold tracking-[-0.01em] group-hover:underline group-hover:underline-offset-4">
                        {entry.title}
                      </span>
                      <span className="mt-0.5 block text-stone">{entry.text}</span>
                    </span>
                    <ArrowRight aria-hidden className="size-5 text-stone transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rise [animation-delay:120ms] lg:col-span-6">
            <Photo {...photos.phoneOutdoors} priority sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] lg:aspect-[5/6]" />
            <p className="mt-3 flex items-center gap-2 text-sm text-stone">
              <span aria-hidden className="size-1.5 rounded-full bg-copper" />
              {site.status}. First hotspot locations are being prepared.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="practices-heading">
        <div className="container-page">
          <SectionHeader
            label="What we do"
            id="practices-heading"
            title="Two practices with one purpose: wider access to the internet and to knowledge."
          />
          <div className="mt-10 grid lg:grid-cols-12">
            <article className="on-dark flex flex-col bg-cobalt text-white lg:col-span-7">
              <Photo {...photos.accessPoint} sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[16/9] rounded-none" />
              <div className="flex flex-1 flex-col p-6 sm:p-10">
                <p className="label text-white/70">Connectivity</p>
                <h3 className="mt-3 font-serif text-[2rem] leading-tight">Community Wi-Fi hotspots</h3>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/80">
                  Shared Wi-Fi at the places people already go, paid for with short vouchers by time or data. No contract and no home
                  installation.
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-2 text-white/90 sm:grid-cols-2">
                  {["Hotspot installation", "Access vouchers", "Hotspot hosting", "Management and support"].map((item) => (
                    <li key={item} className="border-t border-white/20 pt-2">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href="/internet-solutions" variant="light">
                    How the hotspots work
                  </ButtonLink>
                </div>
              </div>
            </article>
            <article className="flex flex-col bg-linen lg:col-span-5">
              <Photo {...photos.tradingLaptop} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[16/9] rounded-none lg:aspect-[4/3]" />
              <div className="flex flex-1 flex-col p-6 sm:p-10">
                <p className="label text-stone">Markets</p>
                <h3 className="mt-3 font-serif text-[2rem] leading-tight">Research and education</h3>
                <p className="mt-3 text-lg leading-relaxed text-stone">
                  Research, analysis and trading education grounded in practice. We never manage money or promise returns.
                </p>
                <ul className="mt-6 space-y-2">
                  {crypto.services.map((service) => (
                    <li key={service.title} className="border-t border-rule pt-2">
                      {service.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href="/crypto-markets" variant="dark">
                    Our approach
                  </ButtonLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-rule bg-paper py-14 sm:py-20" aria-labelledby="hotspot-steps-heading">
        <div className="container-page">
          <SectionHeader
            label="How a hotspot will work"
            id="hotspot-steps-heading"
            title="Four steps from finding the network to browsing."
            intro="The first hotspots are still being prepared. This is how access is designed to work when they open."
          />
          <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {hotspot.steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-ink pt-4">
                <span className="text-sm font-medium text-copper">Step {index + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <TextLink href="/internet-solutions#how-it-works">Read the full hotspot guide</TextLink>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="principles-heading">
        <div className="container-page">
          <SectionHeader
            label="How we work"
            id="principles-heading"
            title="A young company can still be clear about its standards."
          />
          <dl className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:ml-[25%] lg:w-3/4">
            {values.map((value) => (
              <div key={value.title} className="border-t border-rule py-5">
                <dt className="font-semibold">{value.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-stone">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Suspense fallback={null}>
        <LatestInsights />
      </Suspense>
    </>
  );
}
