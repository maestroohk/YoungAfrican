"use client";

import { useState } from "react";
import { InsightCard } from "@/components/InsightCard";
import type { InsightSummary } from "@/lib/insights";

export function InsightsList({ items }: { items: InsightSummary[] }) {
  const [category, setCategory] = useState("all");
  const categories = Array.from(
    new Map(items.filter((item) => item.category).map((item) => [item.category!.slug, item.category!.title])),
  );
  const visible = category === "all" ? items : items.filter((item) => item.category?.slug === category);

  return (
    <>
      <nav aria-label="Article categories" className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
          {[["all", "All articles"], ...categories].map(([slug, title]) => (
            <li key={slug} className="shrink-0">
              <button
                type="button"
                onClick={() => setCategory(slug)}
                aria-pressed={category === slug}
                className={`min-h-11 rounded-full border px-5 text-sm transition-colors ${
                  category === slug ? "border-ink bg-ink text-white" : "border-ink/15 bg-white hover:border-ink"
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "article" : "articles"} shown
      </p>
      <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((insight) => (
          <li key={insight.id}>
            <InsightCard insight={insight} />
          </li>
        ))}
      </ul>
    </>
  );
}
