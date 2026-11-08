import type { Metadata } from "next";
import { Check, Package } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { packageDetails, packageFormats, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Internet packages",
  description: `${site.name} internet packages: daily passes, weekly packages, monthly subscriptions and home or business connections. Prices are published when service goes live.`,
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        tone="blue"
        eyebrow={
          <>
            <Package aria-hidden className="size-4" />
            Internet packages
          </>
        }
        title={
          <>
            Cheap internet, <span className="text-mango">clearly priced.</span>
          </>
        }
        intro="Affordable options for everyday use. Every package will show its price, duration, allowance and renewal steps before you buy. We only publish packages that are actually available."
      >
        <ButtonLink href="/coverage" tone="mango">
          Check coverage first
        </ButtonLink>
        <ButtonLink href="/contact?service=packages" tone="outline" arrow={false}>
          Ask about packages
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="formats-title">
        <div className="container-page py-20 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="font-semibold text-blue">Planned package types</p>
              <h2 id="formats-title" className={`${heading} mt-4`}>
                Pay for what you use.
              </h2>
            </div>
            <p className="rounded-2xl bg-mango/30 p-4 text-mango-ink lg:mb-2">
              Prices are not published yet. They will appear here when the first service areas go live.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packageFormats.map((format, index) => (
              <li key={format.name} className={`flex flex-col rounded-[2rem] p-6 ${index === 1 ? "bg-blue text-white" : "bg-white"}`}>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{format.name}</h3>
                <p className={`mt-2 leading-relaxed ${index === 1 ? "text-white/80" : "text-muted"}`}>{format.text}</p>
                <p className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Price to be announced</p>
                <p className={`mt-auto pt-6 text-sm ${index === 1 ? "text-white/80" : "text-muted"}`}>
                  <span className="font-semibold">Best for: </span>
                  {format.bestFor}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="details-title" className="bg-white">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <h2 id="details-title" className={heading}>
              What every package will tell you
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              No hidden terms. Before you pay, you will see exactly what you are buying and how to renew it.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {packageDetails.map((detail) => (
              <li key={detail} className="flex items-center gap-3 rounded-2xl bg-paper p-4 font-semibold">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                  <Check aria-hidden className="size-4" />
                </span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
