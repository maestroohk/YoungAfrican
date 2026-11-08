import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Label, Photo, SectionHeader } from "@/components/ui";
import { hotspot, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Community Wi-Fi hotspots",
  description:
    "Affordable, pay-as-you-go community Wi-Fi hotspots for markets, campuses and public spaces in Uganda: how they work, access options and hotspot hosting.",
  alternates: { canonical: "/internet-solutions" },
};

const sections = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#access", label: "Access options" },
  { href: "#connecting", label: "Connecting and paying" },
  { href: "#host", label: "Host a hotspot" },
  { href: "#questions", label: "Questions" },
];

export default function HotspotPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-page grid gap-10 pt-12 pb-12 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-16">
          <div className="rise lg:col-span-6">
            <Label>Community Wi-Fi hotspots</Label>
            <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-balance sm:text-[3.4rem] lg:text-[3.9rem]">
              Affordable Wi‑Fi in the places people already gather.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone">
              We are building shared Wi-Fi hotspots for trading centres, campuses, transport stages and community spaces. You buy a
              short voucher for the time or data you need and connect from your own phone. No contract, no home installation.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 border border-copper/40 bg-paper px-3 py-2 text-sm">
              <span aria-hidden className="size-1.5 rounded-full bg-copper" />
              Planned service. The first hotspot locations are being prepared.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact?service=hotspot-availability">Ask about a hotspot near you</ButtonLink>
              <ButtonLink href="/contact?service=hotspot-hosting" variant="outline">
                Host a hotspot
              </ButtonLink>
            </div>
          </div>
          <div className="rise [animation-delay:120ms] lg:col-span-6">
            <Photo
              {...photos.streetMarket}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3]"
              caption="Shared Wi-Fi works best where people already spend time: markets, trading centres, campuses and waiting areas."
            />
          </div>
        </div>
      </section>

      <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-rule bg-ivory/95 backdrop-blur-sm">
        <ul className="container-page flex gap-6 overflow-x-auto text-sm whitespace-nowrap">
          {sections.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="inline-flex min-h-12 items-center text-stone hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="how-it-works" className="py-14 sm:py-20" aria-labelledby="how-heading">
        <div className="container-page">
          <SectionHeader
            label="1 · How it works"
            id="how-heading"
            title="A shared connection, sold in small amounts."
            intro="One internet connection is shared through managed access points at a hosting location. Each person pays only for what they use, which keeps the cost of getting online low."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <ol className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-4">
              {hotspot.steps.map((step, index) => (
                <li key={step.title} className="border-t-2 border-ink py-4">
                  <span className="text-sm font-medium text-copper">Step {index + 1}</span>
                  <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-stone">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10 grid gap-6 border-t border-rule pt-8 lg:grid-cols-12">
            <p className="label text-stone lg:col-span-3">Behind the hotspot</p>
            <div className="grid gap-6 sm:grid-cols-[14rem_1fr] lg:col-span-9">
              <Photo {...photos.accessPoint} sizes="224px" className="aspect-square" />
              <p className="max-w-xl leading-relaxed text-stone">
                A typical hotspot combines an upstream internet connection, one or more outdoor or indoor access points, and a
                login page that checks voucher codes and enforces fair use. We look after the equipment, monitoring and support so
                the host does not have to. Read{" "}
                <Link href="/insights/how-community-wifi-works" className="text-ink underline underline-offset-4">
                  how community Wi-Fi works
                </Link>{" "}
                for a fuller explanation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="access" className="border-y border-rule bg-paper py-14 sm:py-20" aria-labelledby="access-heading">
        <div className="container-page">
          <SectionHeader
            label="2 · Access options"
            id="access-heading"
            title="Planned ways to buy access."
            intro="Prices, durations and data amounts will be published when the first hotspots open. We will not advertise a price until we can honour it."
          />
          <div className="mt-10 overflow-x-auto lg:ml-[25%]">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="label py-3 pr-6 text-stone">Option</th>
                  <th scope="col" className="label py-3 pr-6 text-stone">How it works</th>
                  <th scope="col" className="label py-3 pr-6 text-stone">Best for</th>
                  <th scope="col" className="label py-3 text-stone">Price</th>
                </tr>
              </thead>
              <tbody>
                {hotspot.options.map((option) => (
                  <tr key={option.name} className="border-b border-rule align-top">
                    <th scope="row" className="py-4 pr-6 font-semibold">{option.name}</th>
                    <td className="py-4 pr-6 leading-relaxed text-stone">{option.how}</td>
                    <td className="py-4 pr-6 leading-relaxed text-stone">{option.bestFor}</td>
                    <td className="py-4 text-sm whitespace-nowrap">To be announced</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="connecting" className="py-14 sm:py-20" aria-labelledby="connecting-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Photo
              {...photos.marketVendor}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] lg:aspect-[4/5]"
              caption="Any Wi-Fi enabled phone, tablet or laptop can connect."
            />
          </div>
          <div className="lg:col-span-7">
            <Label>3 · Connecting and paying</Label>
            <h2 id="connecting-heading" className="mt-5 font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] sm:text-[2.6rem]">
              What using a hotspot will look like.
            </h2>
            <dl className="mt-8 border-t border-rule">
              {[
                ["Buying a voucher", "Vouchers are planned to be sold by local agents at or near each hotspot. Each voucher carries a short access code."],
                ["Logging in", "Connect to the YoungAfrican Wi-Fi network. A login page opens in your browser; enter the code to start your session."],
                ["Staying within your plan", "Your session ends when the time or data on the voucher is used. You can see what remains on the login page."],
                ["Paying online", "Mobile money payment and buying vouchers online are planned but not available yet. We will announce them here when they are."],
              ].map(([term, detail]) => (
                <div key={term} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{term}</dt>
                  <dd className="leading-relaxed text-stone">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="host" className="on-dark bg-cobalt py-14 text-white sm:py-20" aria-labelledby="host-heading">
        <div className="container-page">
          <SectionHeader
            tone="dark"
            label="4 · Host a hotspot"
            id="host-heading"
            title="Bring affordable Wi‑Fi to your business, school or community space."
            intro="Hosts give their customers, students or members a reason to stay and return. Terms depend on the location and are agreed individually."
          />
          <div className="mt-10 grid gap-10 sm:grid-cols-3 lg:ml-[25%] lg:w-3/4">
            <div>
              <h3 className="label text-white/70">Good locations</h3>
              <ul className="mt-3 space-y-2">
                {hotspot.places.map((item) => (
                  <li key={item} className="border-t border-white/20 pt-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label text-white/70">The host provides</h3>
              <ul className="mt-3 space-y-2">
                {hotspot.hostProvides.map((item) => (
                  <li key={item} className="border-t border-white/20 pt-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label text-white/70">YoungAfrican provides</h3>
              <ul className="mt-3 space-y-2">
                {hotspot.weProvide.map((item) => (
                  <li key={item} className="border-t border-white/20 pt-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 lg:ml-[25%]">
            <ButtonLink href="/contact?service=hotspot-hosting" variant="light">
              Talk to us about hosting
            </ButtonLink>
            <ButtonLink href="/contact?service=hotspot-installation" variant="outline-light">
              Installation for an organisation
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="questions" className="py-14 sm:py-20" aria-labelledby="questions-heading">
        <div className="container-page">
          <SectionHeader label="5 · Questions" id="questions-heading" title="Common questions about the hotspots." />
          <div className="mt-8 border-b border-rule lg:ml-[25%] lg:w-3/4">
            {hotspot.faqs.map((faq) => (
              <details key={faq.q} className="group border-t border-rule">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden className="text-2xl font-normal text-copper transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 leading-relaxed text-stone">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:ml-[25%] lg:w-3/4">
            {[
              { title: "Is a hotspot planned near you?", text: "Tell us the location and we will reply honestly.", service: "hotspot-availability" },
              { title: "Already run a network?", text: "Ask about hotspot management and support.", service: "hotspot-support" },
            ].map((item) => (
              <Link
                key={item.service}
                href={`/contact?service=${item.service}`}
                className="group flex items-center justify-between gap-6 border border-rule bg-paper p-5 transition-colors hover:border-ink"
              >
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="mt-0.5 block text-stone">{item.text}</span>
                </span>
                <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
