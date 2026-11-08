import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InsightSummary } from "@/lib/insights";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

export function InsightMeta({ insight, tone = "light" }: { insight: InsightSummary; tone?: "light" | "dark" }) {
  const initials = insight.author?.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={`flex items-center gap-3 text-sm ${tone === "dark" ? "text-white/70" : "text-stone"}`}>
      {insight.author?.image ? (
        <Image src={insight.author.image} alt="" width={36} height={36} className="size-9 rounded-full object-cover" />
      ) : (
        <span
          aria-hidden
          className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-xs ${
            tone === "dark" ? "bg-white/10 text-white" : "bg-sand text-ink"
          }`}
        >
          {initials}
        </span>
      )}
      <span className="leading-tight">
        <span className={`block font-medium ${tone === "dark" ? "text-white" : "text-ink"}`}>{insight.author?.name}</span>
        {insight.publishedAt ? <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time> : "Unpublished"} ·{" "}
        {insight.readingTime} min read
      </span>
    </div>
  );
}

export function InsightCard({ insight, priority = false }: { insight: InsightSummary; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-sand">
        {insight.cover && (
          <Image
            src={insight.cover.src}
            alt={insight.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        {insight.category && (
          <span className="absolute top-4 left-4 rounded-full bg-bone/90 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-ink uppercase backdrop-blur">
            {insight.category.title}
          </span>
        )}
      </div>
      <h3 className="mt-6 font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
        <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-2 leading-relaxed text-stone">{insight.excerpt}</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <InsightMeta insight={insight} />
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-colors duration-200 group-hover:border-lime group-hover:bg-lime">
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </div>
    </article>
  );
}
