import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/ui";
import { enquiryServices, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Ask ${site.name} about community Wi-Fi hotspot availability, hotspot hosting, or market research and education.`,
  alternates: { canonical: "/contact" },
};

async function FormWithService({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : "";
  const initialService = enquiryServices.some((item) => item.value === requested) ? requested : "";
  return <ContactForm key={initialService} initialService={initialService} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Tell us what you need."
        intro="Ask about hotspot availability, hosting a hotspot, or our research and education work. We read every enquiry and reply by email."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<ContactForm />}>
              <FormWithService searchParams={searchParams} />
            </Suspense>
          </div>

          <aside className="lg:col-span-4" aria-labelledby="next-steps">
            <h2 id="next-steps" className="label border-t-2 border-ink pt-4 text-stone">
              What happens next
            </h2>
            <ol className="mt-4 space-y-4">
              {[
                "We read your enquiry and check whether we can help.",
                "We reply by email, usually with a few questions about your location or needs.",
                "If it makes sense, we suggest a next step such as a site visit or an introductory session.",
              ].map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed">
                  <span className="font-serif text-xl leading-none text-copper">{index + 1}</span>
                  <span className="text-stone">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 border-t border-rule pt-4">
              <h2 className="label text-stone">Direct contact</h2>
              <p className="mt-3 leading-relaxed text-stone">
                A business email address and phone line will be published once the company&apos;s registration is complete. For now,
                the form is the best way to reach us.
              </p>
            </div>
            <p className="mt-8 border-l-2 border-copper pl-4 text-sm leading-relaxed text-stone">
              Never send passwords, PINs, private keys or recovery phrases. We will never ask for them.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
