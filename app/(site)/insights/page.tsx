import type { Metadata } from "next";
import { Suspense } from "react";
import { Newspaper } from "lucide-react";
import { ButtonLink, PageHero } from "@/components/ui";
import { InsightsGrid } from "@/components/InsightsGrid";
import { getInsights, getInsightsSource } from "@/lib/insights";

export const metadata: Metadata = {
  title: "News and articles",
  description:
    "News, service updates and practical guides from Young African Internet on getting online, staying safe and making the most of your connection.",
  alternates: { canonical: "/insights" },
};

async function Feed() {
  const insights = await getInsights();

  if (insights.length === 0) {
    return (
      <div className="rounded-[2rem] bg-white p-8 sm:p-12">
        <Newspaper aria-hidden className="size-8 text-blue" />
        <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em]">Our first articles are in editorial review.</h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
          We are preparing guides on getting connected, staying safe online and making your data go further. They will appear here
          once they are approved and published.
        </p>
        <ButtonLink href="/contact?service=other" tone="ink" className="mt-8">
          Suggest a topic
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      {getInsightsSource() === "local" && (
        <p role="note" className="mb-6 rounded-2xl bg-mango/30 px-4 py-3 text-sm">
          <strong>Local preview.</strong> Sanity is not connected, so these are bundled sample articles. They are not published.
        </p>
      )}
      <InsightsGrid insights={insights} />
    </>
  );
}

export default function InsightsPage() {
  return (
    <>
      <PageHero
        tone="paper"
        eyebrow="News and articles"
        title={
          <>
            Updates and <span className="font-serif font-normal tracking-[-0.02em] italic">practical guides.</span>
          </>
        }
        intro="New coverage, service updates and plain-language guides to getting online, staying safe and making your data go further."
      />
      <section aria-label="Articles" className="pb-20 lg:pb-28">
        <div className="container-page">
          <Suspense fallback={<div aria-hidden className="h-[30rem] animate-pulse rounded-[2rem] bg-white" />}>
            <Feed />
          </Suspense>
        </div>
      </section>
    </>
  );
}
