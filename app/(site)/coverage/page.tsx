import type { Metadata } from "next";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { ButtonLink, Eyebrow, heading } from "@/components/ui";
import { CoverageChecker } from "@/components/CoverageChecker";
import { liveAreas, plannedAreas, plannedRegion } from "@/content/coverage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage checker",
  description: `Check whether ${site.name} is available where you are. Live in Kazo, Kampala, and coming soon to Nabweru, Lugoba and the whole of Wakiso District.`,
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  return (
    <>
      <section data-header="mango" className="bg-mango text-mango-ink">
        <div className="container-page pt-10 pb-24 sm:pt-14">
          <Eyebrow className="bg-mango-ink/10">
            <MapPin aria-hidden className="size-4" />
            Coverage checker
          </Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] leading-[1] font-semibold tracking-[-0.05em] text-balance sm:text-6xl">Is Young African Internet available where you are?</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed opacity-85">Live now in Kazo, Kampala. Nabweru and Lugoba are next, then the whole of Wakiso District.</p>
        </div>
      </section>

      <section aria-label="Check your location" className="-mt-16">
        <div className="container-page">
          <CoverageChecker />
          <p className="mt-4 text-sm text-muted">
            Coverage is shown at the area level. A marker is a confirmed or planned area, not a measured signal footprint, and the Wakiso line is the district
            boundary we plan to roll out across, not existing coverage.
          </p>
        </div>
      </section>

      <section aria-labelledby="areas-title">
        <div className="container-page py-20 lg:py-24">
          <h2 id="areas-title" className={`${heading} max-w-3xl`}>
            Our areas
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] bg-blue p-6 text-white sm:p-8">
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
            <div className="rounded-[2rem] bg-white p-6 sm:p-8">
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
              <p className="mt-4 text-sm text-muted">No dates have been confirmed yet. New areas will be announced here and in our news.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
