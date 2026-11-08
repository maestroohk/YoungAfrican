import type { Metadata } from "next";
import { Suspense } from "react";
import { Label } from "@/components/ui";
import { StoryLead, StoryRow } from "@/components/InsightCard";
import { InsightsList } from "@/components/InsightsList";
import { featuredInsight, getInsights, getInsightsSource } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles on community connectivity, digital markets and artificial intelligence from YoungAfrican. Educational content, never financial advice.",
  alternates: { canonical: "/insights" },
};

async function InsightsFeed() {
  const insights = await getInsights();
  const source = getInsightsSource();

  if (insights.length === 0) {
    return (
      <div className="container-page py-16">
        <div className="border-t-2 border-ink pt-6 lg:ml-[25%] lg:w-3/4">
          <h2 className="font-serif text-[2rem] leading-tight">Our first articles are being edited.</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-stone">
            We are preparing articles on community Wi-Fi, digital markets and artificial intelligence. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  const lead = featuredInsight(insights);
  const secondary = insights.filter((item) => item.id !== lead.id).slice(0, 3);

  return (
    <>
      {source === "local" && (
        <div className="container-page pt-8">
          <p role="note" className="border-l-2 border-copper bg-paper px-4 py-3 text-sm text-stone">
            <strong className="font-semibold text-ink">Local preview.</strong> Sanity is not connected, so these are the bundled seed
            articles. They are not published.
          </p>
        </div>
      )}
      <section className="py-10 sm:py-14" aria-label="Featured">
        <div className="container-page">
          <StoryLead insight={lead} priority />
          {secondary.length > 0 && (
            <div className="mt-12">
              <h2 className="label border-t-2 border-ink pt-3 text-stone">Also worth reading</h2>
              <ul className="mt-5 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {secondary.map((insight) => (
                  <li key={insight.id}>
                    <StoryRow insight={insight} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <section className="border-t border-rule bg-paper py-12 sm:py-16" aria-labelledby="all-heading">
        <div className="container-page">
          <h2 id="all-heading" className="font-serif text-[1.9rem] leading-tight">
            Browse by topic
          </h2>
          <div className="mt-6">
            <InsightsList items={insights} />
          </div>
        </div>
      </section>
    </>
  );
}

function FeedSkeleton() {
  return (
    <div className="container-page py-10 sm:py-14" aria-hidden>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="aspect-[16/10] bg-linen lg:col-span-5" />
        <div className="space-y-4 lg:col-span-3">
          <div className="h-3 w-24 bg-linen" />
          <div className="h-8 w-full bg-linen" />
          <div className="h-8 w-3/4 bg-linen" />
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <>
      <header className="border-b border-rule">
        <div className="container-page grid gap-6 pt-12 pb-10 sm:pt-16 lg:grid-cols-12 lg:items-end">
          <div className="rise lg:col-span-8">
            <Label>Insights</Label>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.02em] sm:text-[3.6rem] lg:text-[4.2rem]">
              Connectivity, markets and AI, explained plainly.
            </h1>
          </div>
          <p className="max-w-sm leading-relaxed text-stone lg:col-span-4">
            Practical articles for Ugandan readers. We cite our sources, and nothing here is financial advice.
          </p>
        </div>
      </header>
      <Suspense fallback={<FeedSkeleton />}>
        <InsightsFeed />
      </Suspense>
    </>
  );
}
