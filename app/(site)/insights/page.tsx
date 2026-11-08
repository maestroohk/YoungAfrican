import type { Metadata } from "next";
import { Suspense } from "react";
import { Newspaper } from "lucide-react";
import { ButtonLink, PageHero } from "@/components/ui";
import { InsightsGrid } from "@/components/InsightsGrid";
import { getInsights, getInsightsSource } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research and plain-language explainers from YoungAfrican on markets, community connectivity, technology and digital opportunity. Educational content, never financial advice.",
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
          We are preparing articles on markets and risk, community connectivity, and practical technology. They will appear here once
          they are approved and published.
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
        eyebrow="Insights"
        title={
          <>
            Research, <span className="font-serif font-normal tracking-[-0.02em] italic">made readable.</span>
          </>
        }
        intro="Markets and money, community connectivity, and technology, explained plainly with sources linked. Nothing here is financial advice."
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
