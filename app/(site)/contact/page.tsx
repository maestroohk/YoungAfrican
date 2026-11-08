import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { enquiryServices, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} about community Wi-Fi availability, hosting a hotspot, the Markets Academy or a partnership.`,
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
      <PageHero
        tone="blue"
        eyebrow="Contact"
        title={
          <>
            Tell us what <span className="text-mango">you need.</span>
          </>
        }
        intro="Ask about Wi-Fi near you, hosting a hotspot, the Markets Academy or a partnership. We read every enquiry and reply by email."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<ContactForm />}>
              <FormWithService searchParams={searchParams} />
            </Suspense>
          </div>

          <aside className="space-y-4 lg:col-span-4" aria-labelledby="next-steps">
            <div className="rounded-[2rem] bg-white p-6">
              <h2 id="next-steps" className="text-lg font-semibold">
                What happens next
              </h2>
              <ol className="mt-4 space-y-4">
                {[
                  "We read your enquiry and check whether we can help.",
                  "We reply by email, usually with a few questions about your location or needs.",
                  "If it makes sense, we suggest a next step such as a site visit or an introductory call.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3 leading-relaxed">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">{index + 1}</span>
                    <span className="text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[2rem] bg-white p-6">
              <h2 className="text-lg font-semibold">Direct contact</h2>
              <p className="mt-2 leading-relaxed text-muted">
                A business email address and phone line will be published once the company&apos;s registration is complete. For now, the
                form is the best way to reach {site.name}.
              </p>
            </div>
            <p className="rounded-[2rem] bg-coral/10 p-6 text-sm leading-relaxed">
              Never send passwords, PINs, private keys or recovery phrases. We will never ask for them.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
