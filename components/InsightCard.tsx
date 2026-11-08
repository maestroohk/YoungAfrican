import Image from "next/image";
import Link from "next/link";
import type { InsightSummary } from "@/lib/insights";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

export function InsightMeta({ insight, tone = "light" }: { insight: InsightSummary; tone?: "light" | "dark" }) {
  return (
    <p className={`text-sm ${tone === "dark" ? "text-mist" : "text-stone"}`}>
      {insight.author && <span className={tone === "dark" ? "text-ivory" : "text-ink"}>{insight.author.name}</span>}
      {insight.author && " · "}
      {insight.publishedAt ? <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time> : "Draft"}
      {" · "}
      {insight.readingTime} min read
    </p>
  );
}

function Topic({ insight }: { insight: InsightSummary }) {
  if (!insight.category) return null;
  return <p className="label text-copper">{insight.category.title}</p>;
}

function Cover({ insight, sizes, className = "", priority = false }: { insight: InsightSummary; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[2px] bg-linen ${className}`}>
      {insight.cover && (
        <Image
          src={insight.cover.src}
          alt={insight.cover.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}

export function StoryLead({ insight, priority = false }: { insight: InsightSummary; priority?: boolean }) {
  return (
    <article className="group relative grid gap-6 lg:grid-cols-12 lg:gap-10">
      <Cover insight={insight} priority={priority} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[16/10] lg:col-span-7" />
      <div className="flex flex-col lg:col-span-5 lg:py-2">
        <Topic insight={insight} />
        <h3 className="mt-3 font-serif text-[1.9rem] leading-[1.12] tracking-[-0.015em] text-balance sm:text-[2.4rem]">
          <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px]">
            {insight.title}
          </Link>
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-stone">{insight.excerpt}</p>
        <div className="mt-6 lg:mt-auto lg:pt-6">
          <InsightMeta insight={insight} />
        </div>
      </div>
    </article>
  );
}

export function StoryCard({ insight }: { insight: InsightSummary }) {
  return (
    <article className="group relative flex h-full flex-col">
      <Cover insight={insight} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2]" />
      <div className="mt-4">
        <Topic insight={insight} />
      </div>
      <h3 className="mt-2 font-serif text-[1.45rem] leading-[1.18] tracking-[-0.01em] text-balance">
        <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 leading-relaxed text-stone">{insight.excerpt}</p>
      <div className="mt-auto pt-4">
        <InsightMeta insight={insight} />
      </div>
    </article>
  );
}

export function StoryRow({ insight }: { insight: InsightSummary }) {
  return (
    <article className="group relative grid grid-cols-[1fr_6.5rem] gap-4 sm:grid-cols-[1fr_9rem]">
      <div>
        <Topic insight={insight} />
        <h3 className="mt-1.5 font-serif text-[1.25rem] leading-[1.2] text-balance">
          <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
            {insight.title}
          </Link>
        </h3>
        <div className="mt-2">
          <InsightMeta insight={insight} />
        </div>
      </div>
      <Cover insight={insight} sizes="160px" className="aspect-square" />
    </article>
  );
}
