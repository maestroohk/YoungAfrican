import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { enquiryServices, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Make an enquiry about crypto market research and education or internet and community connectivity with ${site.name}.`,
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Mail, label: "Email", value: site.contact.email },
  { icon: Phone, label: "Phone", value: site.contact.phone },
  { icon: MessageCircle, label: "WhatsApp", value: site.contact.whatsapp },
  { icon: MapPin, label: "Office", value: site.contact.address },
  { icon: Clock, label: "Hours", value: site.contact.hours },
];

async function FormWithService({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : "";
  const initialService = enquiryServices.some((item) => item.value === requested) ? requested : "";
  return <ContactForm key={initialService} initialService={initialService} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start a conversation."
        intro="Tell us what you need and we will reply with sensible next steps. There is no obligation and no pressure."
      />

      <section className="on-light py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Suspense fallback={<ContactForm />}>
              <FormWithService searchParams={searchParams} />
            </Suspense>
          </div>

          <aside className="lg:col-span-4" aria-labelledby="contact-details">
            <h2 id="contact-details" className="font-display text-2xl font-semibold tracking-[-0.02em]">
              Other ways to reach us
            </h2>
            <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {details.map((item) => (
                <li key={item.label} className="flex gap-4 py-5">
                  <item.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-stone" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm text-stone">{item.label}</p>
                    <p className="mt-1 font-medium">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl bg-paper-2 p-6">
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">What happens next</h3>
              <ol className="mt-4 list-inside list-decimal space-y-2 text-stone marker:text-ink">
                <li>We review your enquiry.</li>
                <li>We reply by email or phone to understand your needs.</li>
                <li>We suggest clear next steps, such as a site survey or an introductory session.</li>
              </ol>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-stone">
              Please do not send passwords, private keys, seed phrases or account details. We will never ask for them.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
