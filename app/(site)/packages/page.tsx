import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Gift, Package, Smartphone, Wallet, Wifi } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { hotspotAccess, packageDetails, packages, site, ugx } from "@/content/site";

const buySteps = [
  { icon: Wifi, title: `Join ${hotspotAccess.network}`, text: "Connect to the Wi-Fi and the sign-in page opens." },
  { icon: Package, title: "Tap BUY", text: "Choose a package from the list on the sign-in page." },
  { icon: Wallet, title: "Pay with Mobile Money", text: `Use ${hotspotAccess.payments.join(" or ")} and follow the instructions.` },
];

export const metadata: Metadata = {
  title: "Internet packages and prices",
  description: `${site.name} internet packages from UGX 500 for 3 hours, UGX 1,000 for 24 hours, UGX 5,000 for 7 days and UGX 25,000 for 4 weeks, paid with MTN MoMo or Airtel Money.`,
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
        intro="Pay as you go, with no contract. Choose a few hours, a day, a week or four weeks, and pay with MTN MoMo or Airtel Money on your own phone."
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
            <p className="max-w-sm text-muted">All prices are in Uganda shillings. These are the packages on the {hotspotAccess.network} sign-in page.</p>
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
                        <p className="flex items-baseline justify-between gap-3">
                          <span className="text-xl font-semibold tracking-[-0.02em]">{item.name}</span>
                          {popular && <span className="rounded-full bg-mango px-2.5 py-0.5 text-xs font-semibold text-mango-ink">Popular</span>}
                        </p>
                        <p className={`text-sm font-medium ${popular ? "text-white/80" : "text-muted"}`}>{item.duration}</p>
                        <p className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{ugx(item.price)}</p>
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

          <div className="on-dark mt-14 rounded-[2rem] bg-night p-6 text-white sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">How to buy</h3>
                <p className="mt-2 max-w-xl text-white/70">
                  Packages are sold on the {hotspotAccess.network} sign-in page, so you need to be connected to the hotspot. This website does not sell packages.
                </p>
              </div>
              <ButtonLink href="/how-it-works#connect" tone="white">
                Step-by-step guide
              </ButtonLink>
            </div>
            <ol className="mt-8 grid gap-3 md:grid-cols-3">
              {buySteps.map((step, index) => (
                <li key={step.title} className="flex gap-4 rounded-3xl bg-white/6 p-5 ring-1 ring-white/10">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mango text-mango-ink">
                    <step.icon aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-white/50">Step {index + 1}</span>
                    <span className="block font-semibold">{step.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-white/70">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-white/70">Already have a voucher? Enter the code on the sign-in page and tap Login.</p>
          </div>

          <Link href="/rewards" className="group mt-6 flex flex-wrap items-center gap-4 rounded-[2rem] bg-mango p-6 text-mango-ink sm:p-8">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mango-ink text-mango">
              <Gift aria-hidden className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">Coming soon</span>
              <span className="block text-xl font-semibold tracking-[-0.02em]">30-day gift cards: visit daily and earn a branded gift.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold">
              See the gift cards
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
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
