import type { Metadata } from "next";
import { CalendarCheck, Gift, Ticket, Trophy } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { RewardCard } from "@/components/Visuals";
import { rewardCards, site } from "@/content/site";

export const metadata: Metadata = {
  title: "30-day gift cards",
  description: `${site.name} 30-day gift cards: visit the hotspot daily for 30 days and earn a branded bottle, plate and cup, or T-shirt and cap. Coming soon.`,
  alternates: { canonical: "/rewards" },
};

const howItWorks = [
  { icon: Ticket, title: "Get a gift card", text: "Each card comes with its own 30-day attendance schedule." },
  { icon: CalendarCheck, title: "Visit every day", text: "Tick off each day you attend on the card's 30-day schedule." },
  { icon: Trophy, title: "Claim your gift", text: "Complete all 30 days and claim your branded gift at the hotspot." },
];

const terms = [
  { title: "Who can take part", text: "Who can get a card and whether a package must be bought each day." },
  { title: "What the card amount means", text: "How the UGX 500, 800 and 1,000 amounts relate to your packages." },
  { title: "How days are counted", text: "How attendance is recorded and what happens if a day is missed." },
  { title: "Claiming and stock", text: "Where gifts are collected, by when, and while stocks last." },
];

export default function RewardsPage() {
  return (
    <>
      <PageHero
        tone="mango"
        eyebrow={
          <>
            <Gift aria-hidden className="size-4" />
            Customer rewards · Coming soon
          </>
        }
        title={
          <>
            Visit daily. <span className="opacity-60">Earn a gift.</span>
          </>
        }
        intro="Our 30-day gift cards thank customers who come to the hotspot every day. Complete 30 days and earn a YoungAfrican branded gift. The programme has not started yet; its terms will be published here first."
      >
        <ButtonLink href="#gift-cards" tone="mango-ink">
          See the gift cards
        </ButtonLink>
        <ButtonLink href="/contact?service=rewards" tone="outline" arrow={false}>
          Ask about rewards
        </ButtonLink>
      </PageHero>

      <section id="gift-cards" aria-labelledby="cards-title" className="scroll-mt-20">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="inline-flex rounded-full bg-mango px-3 py-1 text-sm font-semibold text-mango-ink">Preview</p>
              <h2 id="cards-title" className={`${heading} mt-4`}>
                Three cards, <span className="text-muted">three gifts.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted">Each card has its own branded reward. Product pictures are illustrations.</p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-md gap-6 md:max-w-none md:grid-cols-2 xl:grid-cols-3">
            {rewardCards.map((card) => (
              <li key={card.amount} className="flex">
                <RewardCard card={card} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="on-dark bg-night text-white">
        <div className="container-page py-20 lg:py-24">
          <h2 id="how-title" className={heading}>
            How it is <span className="text-blue-soft">planned to work.</span>
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <li key={step.title} className="rounded-[2rem] bg-white/6 p-6 ring-1 ring-white/10">
                <span className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full bg-mango text-mango-ink">
                    <step.icon aria-hidden className="size-5" />
                  </span>
                  <span className="text-sm text-white/50">Step {index + 1}</span>
                </span>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-1 leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="terms-title">
        <div className="container-page py-20 lg:py-28">
          <h2 id="terms-title" className={`${heading} max-w-3xl`}>
            Clear rules, <span className="text-muted">published before it starts.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">The gift cards are not available yet. Before they are, this page will explain:</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {terms.map((term) => (
              <li key={term.title} className="rounded-[2rem] bg-white p-6">
                <h3 className="text-lg font-semibold">{term.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{term.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact?service=rewards" tone="ink">
              Ask about rewards
            </ButtonLink>
            <ButtonLink href="/packages" tone="outline" arrow={false}>
              See internet packages
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
