import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Check, Clock, Database, MapPin, Users, Wifi } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { Walkthrough } from "@/components/Walkthrough";
import { hotspot, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Community Wi-Fi hotspots",
  description:
    "Pay-as-you-go community Wi-Fi from YoungAfrican, starting in Uganda. See how hotspot access is planned to work, host a hotspot or ask about availability.",
  alternates: { canonical: "/connectivity" },
};

const optionIcons = [Clock, Database, Users];

export default function ConnectivityPage() {
  return (
    <>
      <PageHero
        tone="night"
        eyebrow={
          <>
            <Wifi aria-hidden className="size-4" />
            Wi-Fi hotspots · Preparing first sites in Uganda
          </>
        }
        title={
          <>
            Shared Wi-Fi, <span className="text-blue-soft">priced for everyday use.</span>
          </>
        }
        intro="A hotspot shares one good connection with everyone nearby. Visitors buy a voucher locally and connect from their own phones, with no contract and no router at home."
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={photos.technician.src} alt={photos.technician.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            <span className="absolute right-3 bottom-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs text-white">Illustrative photograph</span>
          </div>
        }
      >
        <ButtonLink href="/contact?service=hotspot-availability" tone="white">
          Ask about Wi-Fi near you
        </ButtonLink>
        <ButtonLink href="/contact?service=hotspot-hosting" tone="outline" arrow={false}>
          Host a hotspot
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="demo-title" className="on-dark bg-night text-white">
        <div className="container-page pb-20 lg:pb-28">
          <h2 id="demo-title" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Try the planned experience
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">An interactive demonstration. It does not connect to a network or take payment.</p>
          <div className="mt-8">
            <Walkthrough photo={photos.accessPoint} />
          </div>
        </div>
      </section>

      <section aria-labelledby="options-title">
        <div className="container-page py-20 lg:py-28">
          <p className="font-semibold text-blue">Access options</p>
          <h2 id="options-title" className={`${heading} mt-4 max-w-3xl`}>
            Pay for what you use. <span className="text-muted">Nothing more.</span>
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {hotspot.options.map((option, index) => {
              const Icon = optionIcons[index];
              return (
                <li key={option.name} className="flex flex-col rounded-[2rem] bg-white p-6 sm:p-8">
                  <span className="flex size-12 items-center justify-center rounded-full bg-blue text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">{option.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{option.how}</p>
                  <p className="mt-auto pt-6 text-sm">
                    <span className="font-semibold">Best for: </span>
                    {option.bestFor}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-muted">Prices will be published when the first hotspots open. Mobile money and online purchase are planned for later.</p>
        </div>
      </section>

      <section aria-labelledby="host-title" className="bg-white">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">For hosts and organisations</p>
            <h2 id="host-title" className={`${heading} mt-4`}>
              Bring Wi-Fi to the people who visit you.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Hotspots work best where people already spend time. Hosting terms depend on the location and are agreed individually.
            </p>
            <div className="mt-8">
              <p className="flex items-center gap-2 font-semibold">
                <MapPin aria-hidden className="size-4 text-blue" />
                Good locations include
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {hotspot.places.map((place) => (
                  <li key={place} className="rounded-full bg-paper px-4 py-2 text-sm">
                    {place}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact?service=hotspot-hosting">Ask about hosting</ButtonLink>
              <ButtonLink href="/contact?service=hotspot-installation" tone="outline" arrow={false}>
                Discuss a project
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "The host provides", items: hotspot.hostProvides, icon: Building2, colour: "bg-paper" },
              { title: "YoungAfrican provides", items: hotspot.weProvide, icon: Wifi, colour: "bg-blue text-white" },
            ].map((group) => (
              <div key={group.title} className={`rounded-[2rem] p-6 ${group.colour}`}>
                <group.icon aria-hidden className="size-6" />
                <h3 className="mt-6 text-lg font-semibold">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 opacity-70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <h2 id="faq-title" className={`${heading} lg:col-span-4`}>
            Questions
          </h2>
          <div className="lg:col-span-8">
            {hotspot.faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden className="text-2xl text-blue transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
