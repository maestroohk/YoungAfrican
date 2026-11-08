import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Database, Users, Wifi } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { Walkthrough } from "@/components/Walkthrough";
import { connectSteps, hotspot, photos, site } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works",
  description: `How to get connected with ${site.name}: check coverage, choose a package, use a voucher and connect from your own phone.`,
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
            How it works
          </>
        }
        title={
          <>
            Get online <span className="text-blue-soft">in five simple steps.</span>
          </>
        }
        intro="Shared Wi-Fi brings one good connection to everyone nearby. Buy a voucher, connect from your own phone and browse, with no contract and no router at home."
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={photos.studentsPhone.src} alt={photos.studentsPhone.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            <span className="absolute right-3 bottom-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs text-white">Illustrative photograph</span>
          </div>
        }
      >
        <ButtonLink href="/coverage" tone="white">
          Check coverage
        </ButtonLink>
        <ButtonLink href="/packages" tone="outline" arrow={false}>
          View packages
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="steps-title" className="on-dark bg-night text-white">
        <div className="container-page pb-20 lg:pb-28">
          <h2 id="steps-title" className="sr-only">
            Steps to get connected
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {connectSteps.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white/6 p-5 ring-1 ring-white/10">
                <span className="flex size-9 items-center justify-center rounded-full bg-mango text-sm font-bold text-mango-ink">{index + 1}</span>
                <p className="mt-4 font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Try the planned experience</h2>
          <p className="mt-2 max-w-2xl text-white/70">An interactive demonstration. It does not connect to a network or take payment.</p>
          <div className="mt-8">
            <Walkthrough photo={photos.accessPoint} />
          </div>
        </div>
      </section>

      <section aria-labelledby="options-title">
        <div className="container-page py-20 lg:py-28">
          <p className="font-semibold text-blue">Ways to pay</p>
          <h2 id="options-title" className={`${heading} mt-4 max-w-3xl`}>
            By time or by data. <span className="text-muted">Your choice.</span>
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
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-white">
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
            <ButtonLink href="/support" tone="ink" className="mt-8">
              More help in the support centre
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
