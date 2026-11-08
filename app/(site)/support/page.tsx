import type { Metadata } from "next";
import { LifeBuoy, Mail, RefreshCw, Wifi, Zap } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { site, statusNotice, supportFaqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Support centre",
  description: `Help connecting to ${site.name}: frequently asked questions, quick troubleshooting and how to contact support.`,
  alternates: { canonical: "/support" },
};

const checks = [
  { icon: Wifi, title: "Wi-Fi is on", text: "Turn Wi-Fi off and on again on your phone." },
  { icon: RefreshCw, title: "Right network", text: "Reconnect to the Young African Wi-Fi network, not a similar name." },
  { icon: Zap, title: "Package active", text: "Check that your time or data has not run out." },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        tone="blue"
        eyebrow={
          <>
            <LifeBuoy aria-hidden className="size-4" />
            Support centre
          </>
        }
        title={
          <>
            We are here <span className="text-mango">to help.</span>
          </>
        }
        intro="Answers to common questions, quick checks when the internet stops working, and how to reach our team."
      >
        <ButtonLink href="/contact?service=support" tone="white">
          Request support
        </ButtonLink>
        <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold ring-2 ring-white/25 hover:ring-white">
          <Mail aria-hidden className="size-4" />
          Email us
        </a>
      </PageHero>

      <section aria-labelledby="status-title" className="bg-white">
        <div className="container-page py-10">
          <h2 id="status-title" className="text-sm font-semibold text-muted">
            Service status
          </h2>
          <p className="mt-2 text-lg">{statusNotice}</p>
        </div>
      </section>

      <section aria-labelledby="checks-title">
        <div className="container-page py-20 lg:py-24">
          <h2 id="checks-title" className={heading}>
            Internet stopped working?
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {checks.map((check, index) => (
              <li key={check.title} className="rounded-[2rem] bg-white p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-blue text-white">
                  <check.icon aria-hidden className="size-5" />
                </span>
                <p className="mt-6 text-sm font-semibold text-muted">Check {index + 1}</p>
                <h3 className="text-xl font-semibold">{check.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{check.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-lg">Still not working? Contact support with your location and a short description of the problem.</p>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-white">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <h2 id="faq-title" className={`${heading} lg:col-span-4`}>
            Questions
          </h2>
          <div className="lg:col-span-8">
            {supportFaqs.map((faq) => (
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
