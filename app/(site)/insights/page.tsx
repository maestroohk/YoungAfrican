import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { CtaBand, Eyebrow } from "@/components/ui";
import { InsightMeta } from "@/components/InsightCard";
import { InsightsList } from "@/components/InsightsList";
import { featuredInsight, getInsights, getInsightsSource } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: "Trading insights, market education, connectivity explainers and company updates from YoungAfrican.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const insights = await getInsights();
  const source = getInsightsSource();
  const featured = featuredInsight(insights);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute -top-40 -right-20 size-[36rem] rounded-full bg-lime/[0.06] blur-3xl" />
        <div className="container-page relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="fade-up flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Insights</Eyebrow>
              <h1 className="mt-6 font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-8xl">
                Notes on markets <span className="font-serif font-normal tracking-[-0.02em] italic">&amp;</span> connectivity.
              </h1>
            </div>
            <p className="max-w-sm text-lg leading-relaxed text-mist">
              Practical education, research perspectives and company updates. Educational content only, never financial advice.
            </p>
          </div>

          {featured && (
            <article className="group fade-up relative mt-14 grid overflow-hidden rounded-[2rem] bg-ink-2 [animation-delay:150ms] lg:grid-cols-12">
              <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]">
                {featured.cover && (
                  <Image
                    src={featured.cover.src}
                    alt={featured.cover.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="flex flex-col p-7 sm:p-10 lg:col-span-5">
                <p className="font-mono text-xs tracking-[0.14em] text-lime uppercase">
                  Featured{featured.category ? ` · ${featured.category.title}` : ""}
                </p>
                <h2 className="mt-5 font-display text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
                  <Link href={`/insights/${featured.slug}`} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-5 leading-relaxed text-mist">{featured.excerpt}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-10">
                  <InsightMeta insight={featured} tone="dark" />
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="on-light py-16 sm:py-24">
        <div className="container-page">
          {source === "local" && (
            <p role="note" className="mb-10 rounded-2xl border border-dashed border-ink/25 bg-sand p-5 text-clay">
              <strong className="font-medium text-ink">Local preview.</strong> Sanity is not connected, so these are the bundled
              seed articles. They are not published and will not appear on the live site.
            </p>
          )}
          {insights.length > 0 ? (
            <InsightsList items={insights} />
          ) : (
            <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-ink/20 px-6 py-20 text-center">
              <FileText aria-hidden className="size-10 text-stone" strokeWidth={1.25} />
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">Articles are on their way.</h2>
              <p className="mt-3 max-w-md text-stone">
                We are preparing our first insights on markets and connectivity. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Have a question we should write about?"
        text="Tell us what you would like explained, and we may cover it in a future article."
        primary={{ label: "Suggest a topic", href: "/contact?service=other" }}
      />
    </>
  );
}
