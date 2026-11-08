import type { Metadata } from "next";
import { LifeBuoy, Mail, Phone, RefreshCw, Ticket, Wallet, Wifi, Zap } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { site, statusNotice, supportFaqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Support centre",
  description: `Help connecting to ${site.name}: frequently asked questions, quick troubleshooting and how to contact support.`,
  alternates: { canonical: "/support" },
};

const checks = [
  { icon: Wifi, title: "Wi-Fi is on", text: "Turn Wi-Fi off and on again on your phone." },
  { icon: RefreshCw, title: "Right network", text: "Reconnect to youngafrican. If you see similar names, ask the attendant which one to use." },
  { icon: Zap, title: "Package active", text: "Check that your time has not run out." },
  { icon: Ticket, title: "Voucher code", text: "Type the code exactly, or tap Already bought? Find My Voucher on the sign-in page." },
  { icon: Wallet, title: "Payment", text: "Follow the Mobile Money instructions on your phone and check you have enough balance." },
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
        <a href={`tel:${site.contact.phones[0].tel}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-blue-deep hover:bg-mango hover:text-mango-ink sm:px-6">
          <Phone aria-hidden className="size-4" />
          Call {site.contact.phones[0].label}
        </a>
        <ButtonLink href="/contact?service=support" tone="outline" arrow={false}>
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
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[2rem] bg-white p-6">
            <p className="text-lg font-semibold">Still not working? Call support:</p>
            {site.contact.phones.map((phone) => (
              <a key={phone.tel} href={`tel:${phone.tel}`} className="inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-blue underline-offset-4 hover:underline">
                <Phone aria-hidden className="size-4" />
                {phone.label}
              </a>
            ))}
            <ButtonLink href="/how-it-works#connect" tone="ink" className="lg:ml-auto">
              Step-by-step guide
            </ButtonLink>
          </div>
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
