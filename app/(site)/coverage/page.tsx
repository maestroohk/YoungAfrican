import type { Metadata } from "next";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { CoverageForm } from "@/components/CoverageForm";
import { CoverageMap } from "@/components/CoverageMap";
import { liveAreas, plannedAreas, plannedRegion } from "@/content/coverage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage areas",
  description: `${site.name} is live in Kazo, Kampala, and coming soon to Nabweru, Lugoba and the whole of Wakiso District.`,
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  return (
    <>
      <PageHero
        tone="mango"
        eyebrow={
          <>
            <MapPin aria-hidden className="size-4" />
            Coverage areas
          </>
        }
        title="Live in Kazo. Wakiso is next."
        intro="Young African Internet is live in Kazo, Kampala. Nabweru and Lugoba are next, followed by the whole of Wakiso District. Not on the list? Tell us where you are."
        aside={<CoverageForm />}
      />

      <section aria-labelledby="areas-title">
        <div className="container-page py-20 lg:py-28">
          <h2 id="areas-title" className={`${heading} max-w-3xl`}>
            Where you can get connected
          </h2>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_2fr]">
            <div className="space-y-4">
              <div className="rounded-[2rem] bg-blue p-6 text-white">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <CheckCircle2 aria-hidden className="size-5" />
                  Live now
                </h3>
                <ul className="mt-4 space-y-3">
                  {liveAreas.map((area) => (
                    <li key={area.name}>
                      <span className="block text-2xl font-semibold tracking-[-0.02em]">{area.name}</span>
                      <span className="text-white/80">{area.detail}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/packages" tone="white" className="mt-6">
                  See packages
                </ButtonLink>
              </div>

              <div className="rounded-[2rem] bg-white p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Clock aria-hidden className="size-5 text-mango-ink" />
                  Coming soon
                </h3>
                <ul className="mt-4 divide-y divide-line">
                  {plannedAreas.map((area) => (
                    <li key={area.name} className="py-3 first:pt-0">
                      <span className="block text-xl font-semibold tracking-[-0.02em]">{area.name}</span>
                      <span className="text-muted">{area.detail}</span>
                    </li>
                  ))}
                  <li className="py-3 last:pb-0">
                    <span className="block text-xl font-semibold tracking-[-0.02em]">{plannedRegion.name}</span>
                    <span className="text-muted">{plannedRegion.detail}</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-muted">Dates for new areas will be announced here and in our news.</p>
              </div>
            </div>

            <CoverageMap />
          </div>
        </div>
      </section>
    </>
  );
}
