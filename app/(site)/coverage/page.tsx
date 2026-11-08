import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero, heading } from "@/components/ui";
import { CoverageForm } from "@/components/CoverageForm";
import { hotspot, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage areas",
  description: `Check whether ${site.name} is available in your area, and register interest if it is not live yet.`,
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
        title="Is your area covered?"
        intro="We are preparing our first service areas in Uganda. Tell us where you are and we will let you know what is planned near you."
        aside={<CoverageForm />}
      />

      <section aria-labelledby="status-title">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">Current coverage</p>
            <h2 id="status-title" className={`${heading} mt-4`}>
              No live areas yet.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              Live villages, zones and trading centres will be listed here, with a map, as soon as each one is switched on. Until then we
              will never suggest that service is available where it is not.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Places we are looking at first</h3>
            <p className="mt-2 text-muted">Hotspots work best where people already gather.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {hotspot.places.map((place) => (
                <li key={place} className="rounded-full bg-paper px-4 py-2 text-sm">
                  {place}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
