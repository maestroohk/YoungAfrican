import type { Metadata } from "next";
import { Check, Package, Smartphone } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { packageDetails, packages, site, ugx } from "@/content/site";

export const metadata: Metadata = {
  title: "Internet packages and prices",
  description: `${site.name} internet packages from UGX 500 for 3 hours, UGX 1,000 for 24 hours, UGX 5,000 for 7 days and UGX 25,000 for 30 days.`,
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
            Cheap internet, <span className="text-mango">from UGX 500.</span>
          </>
        }
        intro="Pay as you go, with no contract. Choose a few hours, a day, a weekend, a week or a month, and connect from your own phone."
      >
        <ButtonLink href="/coverage" tone="mango">
          Check coverage
        </ButtonLink>
        <ButtonLink href="/contact?service=packages" tone="outline" arrow={false}>
          Ask about packages
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="prices-title">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-blue">Prices</p>
              <h2 id="prices-title" className={`${heading} mt-4`}>
                Pick the time you need.
              </h2>
            </div>
            <p className="max-w-sm text-muted">All prices are in Uganda shillings. Packages work in areas where our service is live.</p>
          </div>

          <div className="mt-12 space-y-10">
            {packages.map((group) => (
              <div key={group.group}>
                <h3 className="text-lg font-semibold">{group.group}</h3>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => {
                    const popular = "highlight" in item && item.highlight;
                    return (
                      <li key={item.name} className={`flex flex-col rounded-[2rem] p-6 sm:p-7 ${popular ? "bg-blue text-white" : "bg-white"}`}>
                        <p className="text-xl font-semibold tracking-[-0.02em]">{item.name}</p>
                        <p className="mt-4 text-4xl font-semibold tracking-[-0.04em] tabular-nums">{ugx(item.price)}</p>
                        <p className={`mt-1 text-sm ${popular ? "text-white/80" : "text-muted"}`}>
                          One payment, no contract
                        </p>
                        <p className={`mt-6 flex items-center gap-2 text-sm font-medium ${popular ? "" : "text-ink"}`}>
                          <Smartphone aria-hidden className="size-4 shrink-0" />
                          {item.devices === 1 ? "1 device" : `${item.devices} devices at once`}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <ButtonLink href="/how-it-works" tone="ink" className="mt-12">
            How to buy and connect
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="details-title" className="bg-white">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <h2 id="details-title" className={heading}>
              No hidden terms
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">Before you pay, you will know exactly what you are buying and how to renew it.</p>
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
