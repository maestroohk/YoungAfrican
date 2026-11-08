"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { InsightSummary } from "@/lib/insights";

const categoryColours: Record<string, string> = {
  "digital-markets": "bg-mango text-mango-ink",
  connectivity: "bg-blue text-white",
  "artificial-intelligence": "bg-coral text-ink",
};

const colourFor = (insight: InsightSummary) => categoryColours[insight.category?.slug ?? ""] ?? "bg-ink text-white";

function Tag({ insight }: { insight: InsightSummary }) {
  if (!insight.category) return null;
  return <span className={`self-start rounded-full px-2.5 py-1 text-xs font-semibold ${colourFor(insight)}`}>{insight.category.title}</span>;
}

function Cover({ insight, sizes, className }: { insight: InsightSummary; sizes: string; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-blue ${className}`}>
      {insight.cover && (
        <Image src={insight.cover.src} alt={insight.cover.alt} fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      )}
    </div>
  );
}

export function InsightsGrid({ insights, filter = true }: { insights: InsightSummary[]; filter?: boolean }) {
  const [topic, setTopic] = useState("all");
  const categories = [...new Map(insights.filter((item) => item.category).map((item) => [item.category!.slug, item.category!.title])).entries()];
  const shown = topic === "all" ? insights : insights.filter((item) => item.category?.slug === topic);
  const [lead, ...rest] = shown;
  const side = rest.slice(0, 2);
  const more = rest.slice(2);

  return (
    <>
      {filter && categories.length > 1 && (
        <div role="group" aria-label="Filter by topic" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {[["all", "All"], ...categories].map(([slug, title]) => {
            const count = slug === "all" ? insights.length : insights.filter((item) => item.category?.slug === slug).length;
            return (
              <button
                key={slug}
                type="button"
                aria-pressed={topic === slug}
                onClick={() => setTopic(slug)}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-paper px-4 text-sm font-semibold transition-colors hover:bg-ink/10 aria-pressed:bg-ink aria-pressed:text-white"
              >
                {title}
                <span className="text-xs tabular-nums opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div aria-live="polite" className={filter ? "mt-8" : ""}>
        {lead && (
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Link href={`/insights/${lead.slug}`} className="group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:min-h-[30rem] sm:p-8">
              <Cover insight={lead} sizes="(min-width: 1024px) 700px, 100vw" className="absolute inset-0" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
              <span className="relative flex flex-col">
                <Tag insight={lead} />
                <span className="mt-4 max-w-xl font-serif text-[1.9rem] leading-[1.1] sm:text-[2.6rem]">{lead.title}</span>
                <span className="mt-3 max-w-xl text-white/80">{lead.excerpt}</span>
                <span className="mt-4 text-sm text-white/70">{lead.readingTime} min read</span>
              </span>
            </Link>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {side.map((insight) => (
                <li key={insight.id}>
                  <Link href={`/insights/${insight.slug}`} className="group flex h-full gap-4 rounded-[2rem] bg-paper p-4 transition-colors hover:bg-ink/5">
                    <Cover insight={insight} sizes="128px" className="aspect-square w-28 shrink-0 rounded-2xl sm:w-32" />
                    <span className="flex flex-col justify-center">
                      <Tag insight={insight} />
                      <span className="mt-2 font-serif text-xl leading-snug group-hover:underline">{insight.title}</span>
                      <span className="mt-1 text-xs text-muted">{insight.readingTime} min read</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {more.length > 0 && (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((insight) => (
              <li key={insight.id}>
                <Link href={`/insights/${insight.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-paper transition-colors hover:bg-ink/5">
                  <Cover insight={insight} sizes="(min-width: 1024px) 380px, 100vw" className="aspect-[16/9]" />
                  <span className="flex flex-col p-5">
                    <Tag insight={insight} />
                    <span className="mt-3 font-serif text-xl leading-snug group-hover:underline">{insight.title}</span>
                    <span className="mt-2 text-xs text-muted">{insight.readingTime} min read</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
