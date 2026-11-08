import type { Metadata } from "next";
import { Gift } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { GiftCard } from "@/components/Visuals";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Customer rewards",
  description: `The planned ${site.name} gift-card programme for eligible consistent customers.`,
  alternates: { canonical: "/rewards" },
};

const terms = [
  { title: "Who qualifies", text: "The eligibility rules and the qualifying period." },
  { title: "What you receive", text: "The value of each reward and any other benefits." },
  { title: "How to redeem", text: "Where and how a gift card can be used." },
  { title: "Expiry and exclusions", text: "Any expiry date and anything the programme does not cover." },
];

export default function RewardsPage() {
  return (
    <>
      <PageHero
        tone="mango"
        eyebrow={
          <>
            <Gift aria-hidden className="size-4" />
            Customer rewards · Planned
          </>
        }
        title={
          <>
            Gift cards for <span className="opacity-60">consistent clients.</span>
          </>
        }
        intro="We plan to thank eligible loyal customers with gift cards. The programme starts once the first service areas are live, and its full terms will be published here first."
        aside={
          <figure>
            <GiftCard className="mx-auto rotate-[-3deg] lg:mr-0" />
            <figcaption className="mt-4 text-center text-sm lg:text-right">Illustrative design</figcaption>
          </figure>
        }
      />

      <section aria-labelledby="terms-title">
        <div className="container-page py-20 lg:py-28">
          <h2 id="terms-title" className={`${heading} max-w-3xl`}>
            Clear rules, <span className="text-muted">published in advance.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Not every customer will qualify automatically. Before the programme starts, this page will explain:
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {terms.map((term) => (
              <li key={term.title} className="rounded-[2rem] bg-white p-6">
                <h3 className="text-lg font-semibold">{term.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{term.text}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact?service=rewards" tone="ink" className="mt-10">
            Ask about rewards
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
