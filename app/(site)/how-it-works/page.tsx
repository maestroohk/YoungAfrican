import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Database, Phone, Users, Wifi } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { ConnectGuide } from "@/components/ConnectGuide";
import { hotspot, hotspotAccess, photos, site } from "@/content/site";

export const metadata: Metadata = {
  title: "How to connect",
  description: `How to connect to ${site.name}: join the ${hotspotAccess.network} Wi-Fi, enter a voucher or buy a package with MTN MoMo or Airtel Money, and get help.`,
  alternates: { canonical: "/how-it-works" },
};

const optionIcons = [Clock, Database, Users];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        tone="night"
        eyebrow={
          <>
            <Wifi aria-hidden className="size-4" />
            How to connect
          </>
        }
        title={
          <>
            Get online <span className="text-blue-soft">in a few taps.</span>
          </>
        }
        intro={`Join the ${hotspotAccess.network} Wi-Fi, then enter a voucher or buy a package with ${hotspotAccess.payments.join(" or ")}. No contract and no router at home.`}
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={photos.studentsPhone.src} alt={photos.studentsPhone.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            <span className="absolute right-3 bottom-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs text-white">Illustrative photograph</span>
          </div>
        }
      >
        <ButtonLink href="#connect" tone="white">
          Start the guide
        </ButtonLink>
        <ButtonLink href="/packages" tone="outline" arrow={false}>
          View packages
        </ButtonLink>
      </PageHero>

      <section id="connect" aria-labelledby="connect-title" className="scroll-mt-20">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-blue">Step-by-step guide</p>
              <h2 id="connect-title" className={`${heading} mt-4`}>
                How to connect
              </h2>
            </div>
            <p className="max-w-sm text-muted">
              Choose your path and follow along on your phone. You need to be near a {hotspotAccess.network} hotspot to sign in or buy.
            </p>
          </div>
          <div className="mt-10">
            <ConnectGuide />
          </div>
        </div>
      </section>

      <section aria-labelledby="options-title" className="bg-white">
        <div className="container-page py-20 lg:py-28">
          <p className="font-semibold text-blue">Packages</p>
          <h2 id="options-title" className={`${heading} mt-4 max-w-3xl`}>
            From 3 hours to 4 weeks. <span className="text-muted">Your choice.</span>
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {hotspot.options.map((option, index) => {
              const Icon = optionIcons[index];
              return (
                <li key={option.name} className="flex flex-col rounded-[2rem] bg-paper p-6 sm:p-8">
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
          <ButtonLink href="/packages" tone="ink" className="mt-10">
            All packages and prices
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="faq-title">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className={heading}>
              Questions
            </h2>
            <div className="mt-8 rounded-[2rem] bg-blue p-6 text-white">
              <p className="font-semibold">Stuck while connecting?</p>
              <p className="mt-1 text-white/80">Call our support team.</p>
              <ul className="mt-4 space-y-2">
                {site.contact.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a href={`tel:${phone.tel}`} className="inline-flex min-h-11 items-center gap-2 text-lg font-semibold underline-offset-4 hover:underline">
                      <Phone aria-hidden className="size-4" />
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
            <ButtonLink href="/support" tone="ink" className="mt-8">
              More help in the support centre
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
