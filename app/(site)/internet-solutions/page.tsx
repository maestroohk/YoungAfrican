import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, Check, Home, Radio, RadioTower, Router, Search, Smartphone, Wrench } from "lucide-react";
import { ButtonLink, CtaBand, Eyebrow, PageHero, Photo, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { connectivity, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Internet Solutions",
  description:
    "Community internet distribution, Wi-Fi hotspots, network installations, network management and technical support in Uganda.",
  alternates: { canonical: "/internet-solutions" },
};

const journeys = [
  {
    icon: Search,
    title: "Check coverage",
    text: "Tell us where you are and who needs access. We will tell you honestly whether and how we can help.",
    service: "connectivity-community",
    cta: "Request a coverage check",
  },
  {
    icon: Wrench,
    title: "Plan an installation",
    text: "Homes, offices, campuses and multi-building sites. Every installation starts with a site survey.",
    service: "connectivity-installation",
    cta: "Book a site survey",
  },
  {
    icon: Router,
    title: "Support a network",
    text: "Already have a network that is slow or unreliable? We can diagnose, manage and maintain it.",
    service: "connectivity-support",
    cta: "Get network support",
  },
];

const layers = [
  { icon: RadioTower, title: "Backhaul", text: "Fibre, licensed wireless or cellular link that brings the internet to the area." },
  { icon: Radio, title: "Distribution", text: "Point-to-point and point-to-multipoint radios that carry the connection across distance." },
  { icon: Router, title: "Access", text: "Managed access points and hotspots that devices connect to, with fair-use controls." },
  { icon: Smartphone, title: "People", text: "Homes, shops, schools and public spaces using a connection that is monitored and supported." },
];

const servicePhotos = [photos.communityLaptops, photos.benchLaptop, photos.fibreSwitch, photos.patchCables, photos.technician];

export default function InternetSolutionsPage() {
  return (
    <>
      <PageHero
        image={photos.towersDusk}
        eyebrow="Internet Solutions"
        title={
          <>
            Reliable internet, built <span className="font-serif font-normal tracking-[-0.02em] italic">around</span> the community.
          </>
        }
        intro="We plan, install and support networks that bring dependable connectivity to homes, businesses, schools and public spaces."
      >
        <ButtonLink href="/contact?service=connectivity-community">Request a coverage check</ButtonLink>
        <ButtonLink href="#packages" variant="outline-dark">
          View packages
        </ButtonLink>
      </PageHero>

      <section className="on-light bg-bone py-16 sm:py-20" aria-labelledby="start-heading">
        <div className="container-page">
          <h2 id="start-heading" className="font-mono text-xs tracking-[0.14em] text-stone uppercase">
            Where would you like to start?
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {journeys.map((journey, index) => (
              <li key={journey.title}>
                <Reveal delay={index * 0.05} className="h-full">
                  <Link
                    href={`/contact?service=${journey.service}`}
                    className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-xl hover:shadow-ink/5 sm:p-7"
                  >
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-lime">
                      <journey.icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="mt-8 font-display text-2xl font-semibold tracking-[-0.02em]">{journey.title}</span>
                    <span className="mt-2 leading-relaxed text-stone">{journey.text}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 font-medium">
                      {journey.cta}
                      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-light py-24 sm:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="How a community network works"
              title="From backhaul to the last metre."
              intro="A reliable connection depends on four layers working together. We design, build and look after all of them."
            />
          </Reveal>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden border-t-2 border-dashed border-ink/20 md:block" />
            {layers.map((layer, index) => (
              <li key={layer.title} className="relative">
                <Reveal delay={index * 0.08} className="flex gap-5 md:block">
                  <span
                    className={`relative inline-flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-paper ${
                      index === layers.length - 1 ? "bg-lime text-ink" : "bg-ink text-lime"
                    }`}
                  >
                    <layer.icon aria-hidden className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="block md:mt-6">
                    <span className="font-mono text-xs tracking-[0.12em] text-stone uppercase">Layer 0{index + 1}</span>
                    <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.02em]">{layer.title}</span>
                    <span className="mt-2 block leading-relaxed text-stone">{layer.text}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-light pb-24 sm:pb-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="From the first cable to everyday support."
              intro="Connectivity is only useful if it keeps working. We take responsibility for the whole lifecycle of the network."
            />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {connectivity.services.map((service, index) => {
              const featured = index < 2;
              return (
                <li key={service.title} className={featured ? "lg:col-span-3" : "lg:col-span-2"}>
                  <Reveal delay={(index % 3) * 0.05} className="h-full">
                    <article className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-8">
                      <Photo
                        {...servicePhotos[index]}
                        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                        className="absolute inset-0 -z-10"
                        imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/10" />
                      <span className="font-mono text-xs tracking-[0.12em] text-lime uppercase">0{index + 1}</span>
                      <h3 className={`mt-3 font-display font-semibold tracking-[-0.02em] ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-md leading-relaxed text-white/75">{service.text}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-forest py-24 text-white sm:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading tone="dark" eyebrow="How it works" title="A clear path from enquiry to connection." />
          </Reveal>
          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {connectivity.process.map((step, index) => (
              <li key={step.title} className="relative border-t border-white/15 pt-6 pb-10">
                <span aria-hidden className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-lime" />
                <Reveal delay={index * 0.06}>
                  <span className="font-mono text-xs text-white/60">Step 0{index + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/70">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="packages" className="on-light py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Packages"
                title="Options for every kind of site."
                intro="Packages are being finalised. Pricing depends on location, equipment and backhaul, so every quote starts with a site survey."
              />
            </Reveal>
            <p className="inline-flex items-center gap-2 self-start rounded-full border border-ink/15 px-4 py-2 font-mono text-xs tracking-[0.1em] uppercase lg:self-auto">
              <span aria-hidden className="size-1.5 rounded-full bg-ink" />
              Tariffs to be announced
            </p>
          </div>
          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {connectivity.packages.map((plan, index) => {
              const Icon = [Home, RadioTower, Building2][index];
              const highlight = index === 1;
              return (
                <li key={plan.name}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <article
                      className={`flex h-full flex-col rounded-[2rem] p-7 sm:p-9 ${highlight ? "bg-ink text-white" : "border border-ink/10 bg-white"}`}
                    >
                      <span className={`inline-flex size-12 items-center justify-center rounded-2xl ${highlight ? "bg-lime text-ink" : "bg-sand"}`}>
                        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
                      <p className={`mt-2 lg:min-h-12 ${highlight ? "text-mist" : "text-stone"}`}>{plan.audience}</p>
                      <div className={`mt-6 border-y py-6 ${highlight ? "border-white/15" : "border-ink/10"}`}>
                        <p className="font-display text-3xl font-semibold tracking-[-0.03em]">Price on request</p>
                        <p className={`mt-1 text-sm ${highlight ? "text-mist" : "text-stone"}`}>Quoted after a site survey</p>
                      </div>
                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check aria-hidden className={`mt-0.5 size-5 shrink-0 ${highlight ? "text-lime" : ""}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-10">
                        <ButtonLink href="/contact?service=connectivity-community" variant={highlight ? "lime" : "ink"} className="w-full">
                          Request a quote
                        </ButtonLink>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="on-light pb-10">
        <div className="container-page">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2rem] bg-sand lg:grid-cols-2">
              <Photo {...photos.hillsideCity} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]" />
              <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
                <Eyebrow tone="light">Coverage</Eyebrow>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
                  We are planning our first service areas.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-clay">
                  Coverage has not yet been published. Register your interest and tell us about your location. Demand helps us
                  decide where to begin.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/contact?service=connectivity-community" variant="ink">
                    Register interest
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let’s get your community connected."
        text="Tell us about the site and the people who need access. We will come back with sensible next steps."
        primary={{ label: "Request a site survey", href: "/contact?service=connectivity-installation" }}
        secondary={{ label: "Network support", href: "/contact?service=connectivity-support" }}
      />
    </>
  );
}
