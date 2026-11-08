"use client";

import { useState } from "react";
import { StoryCard } from "@/components/InsightCard";
import type { InsightSummary } from "@/lib/insights";

export function InsightsList({ items }: { items: InsightSummary[] }) {
  const [topic, setTopic] = useState("all");
  const count = (slug: string) => items.filter((item) => item.category?.slug === slug).length;
  const topics = Array.from(
    new Map(items.filter((item) => item.category).map((item) => [item.category!.slug, item.category!.title])),
  ).sort((a, b) => count(b[0]) - count(a[0]));
  const visible = topic === "all" ? items : items.filter((item) => item.category?.slug === topic);

  return (
    <>
      <nav aria-label="Topics" className="-mx-5 overflow-x-auto overflow-y-hidden border-b border-rule px-5 sm:mx-0 sm:px-0">
        <ul className="flex gap-6 whitespace-nowrap">
          {[["all", "All topics", items.length] as const, ...topics.map(([slug, title]) => [slug, title, count(slug)] as const)].map(
            ([slug, title, total]) => (
              <li key={slug}>
                <button
                  type="button"
                  onClick={() => setTopic(slug)}
                  aria-pressed={topic === slug}
                  className={`relative inline-flex min-h-12 items-center gap-1.5 text-[0.95rem] transition-colors ${
                    topic === slug
                      ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-copper"
                      : "text-stone hover:text-ink"
                  }`}
                >
                  {title}
                  <span className="text-xs text-stone">{total}</span>
                </button>
              </li>
            ),
          )}
        </ul>
      </nav>
      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "article" : "articles"} shown
      </p>
      <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((insight) => (
          <li key={insight.id}>
            <StoryCard insight={insight} />
          </li>
        ))}
      </ul>
    </>
  );
}
