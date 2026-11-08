import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { CtaBand } from "@/components/ui";
import { InsightCard, InsightMeta } from "@/components/InsightCard";
import { ShareLinks } from "@/components/ShareLinks";
import { site } from "@/content/site";
import { getInsight, getInsights } from "@/lib/insights";

export const instant = false;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.length > 0 ? insights.map((insight) => ({ slug: insight.slug })) : [{ slug: "not-published" }];
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Article not found" };

  const title = insight.seoTitle || insight.title;
  const description = insight.seoDescription || insight.excerpt;
  const images = insight.cover ? [{ url: insight.cover.src, alt: insight.cover.alt }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      images,
      publishedTime: insight.publishedAt ?? undefined,
      authors: insight.author ? [insight.author.name] : undefined,
      section: insight.category?.title,
    },
    twitter: { card: "summary_large_image", title, description, images: images?.map((image) => image.url) },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const url = `${site.url}/insights/${insight.slug}`;

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-page fade-up pt-32 pb-24 sm:pt-40 sm:pb-32">
          <Link href="/insights" className="inline-flex min-h-11 items-center gap-2 text-sm text-mist transition-colors hover:text-white">
            <ArrowLeft aria-hidden className="size-4" />
            All insights
          </Link>
          {insight.category && (
            <p className="mt-8 font-mono text-xs tracking-[0.14em] text-lime uppercase">{insight.category.title}</p>
          )}
          <h1 className="mt-5 max-w-5xl font-display text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
            {insight.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">{insight.excerpt}</p>
          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <InsightMeta insight={insight} tone="dark" />
            <div className="text-white">
              <ShareLinks url={url} title={insight.title} />
            </div>
          </div>
        </div>
      </section>

      {insight.cover && (
        <div className="container-page -mt-14 sm:-mt-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-sand">
            <Image src={insight.cover.src} alt={insight.cover.alt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <article className="on-light py-16 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-[44rem]">
            {!insight.publishedAt && (
              <p role="note" className="mb-10 rounded-2xl border border-dashed border-ink/25 bg-sand p-4 text-sm text-clay">
                This article is not published. You are seeing it in a preview.
              </p>
            )}
            <ArticleBody value={insight.body} />
            {insight.author && (
              <div className="mt-16 flex flex-col gap-6 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs tracking-[0.12em] text-stone uppercase">Written by</p>
                  <p className="mt-2 font-display text-xl font-semibold">{insight.author.name}</p>
                  {insight.author.role && <p className="text-stone">{insight.author.role}</p>}
                </div>
                <ShareLinks url={url} title={insight.title} />
              </div>
            )}
          </div>
        </div>
      </article>

      {insight.related.length > 0 && (
        <section className="on-light border-t border-ink/10 bg-bone py-16 sm:py-24">
          <div className="container-page">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Related articles</h2>
            <ul className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {insight.related.map((item) => (
                <li key={item.id}>
                  <InsightCard insight={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Questions about this topic?"
        text="We are happy to talk it through. Educational conversations only, never personal financial advice."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
