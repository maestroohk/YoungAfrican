import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { InsightsGrid } from "@/components/InsightsGrid";
import { ShareLinks } from "@/components/ShareLinks";
import { site } from "@/content/site";
import { getInsight, getInsights } from "@/lib/insights";

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.length > 0 ? insights.map((insight) => ({ slug: insight.slug })) : [{ slug: "not-published" }];
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Article not found", robots: { index: false } };

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

async function Article({ params }: { params: PageProps<"/insights/[slug]">["params"] }) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const url = `${site.url}/insights/${insight.slug}`;

  const published = insight.publishedAt
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(insight.publishedAt))
    : null;

  return (
    <>
      <article>
        <header className="bg-white">
          <div className="container-page pt-8 pb-12 sm:pt-12">
            <Link href="/insights" className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-muted hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" />
              All insights
            </Link>
            <div className="mt-6 max-w-4xl">
              {insight.category && <p className="inline-flex rounded-full bg-blue/10 px-3 py-1 text-sm font-semibold text-blue">{insight.category.title}</p>}
              <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.06] tracking-[-0.02em] text-balance sm:text-[3.4rem]">{insight.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{insight.excerpt}</p>
              <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                {insight.author && <span className="font-semibold text-ink">{insight.author.name}</span>}
                {published && <time dateTime={insight.publishedAt ?? undefined}>{published}</time>}
                <span>{insight.readingTime} min read</span>
              </p>
            </div>
          </div>
        </header>

        {insight.cover && (
          <figure className="container-page mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-blue lg:aspect-[21/9]">
              <Image src={insight.cover.src} alt={insight.cover.alt} fill priority sizes="(min-width: 1216px) 1152px, 100vw" className="object-cover" />
            </div>
          </figure>
        )}

        <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-2">
            {!insight.publishedAt && (
              <p role="note" className="mb-8 rounded-2xl bg-mango/30 px-4 py-3 text-sm">
                This article is not published. You are seeing it in a preview.
              </p>
            )}
            <ArticleBody value={insight.body} />
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
              {insight.author && (
                <p>
                  <span className="block font-semibold">{insight.author.name}</span>
                  {insight.author.role && <span className="text-sm text-muted">{insight.author.role}</span>}
                </p>
              )}
              <ShareLinks url={url} title={insight.title} />
            </div>
            <p className="mt-8 rounded-2xl bg-white p-4 text-sm text-muted">Educational content only. Nothing here is financial advice.</p>
          </div>
        </div>
      </article>

      {insight.related.length > 0 && (
        <section className="bg-white py-16 sm:py-20" aria-labelledby="related-heading">
          <div className="container-page">
            <h2 id="related-heading" className="mb-8 text-3xl font-semibold tracking-[-0.03em]">
              Related reading
            </h2>
            <InsightsGrid insights={insight.related} filter={false} />
          </div>
        </section>
      )}
    </>
  );
}

function ArticleSkeleton() {
  return (
    <div className="container-page animate-pulse pt-12 pb-20" aria-hidden>
      <div className="h-4 w-24 rounded-full bg-white" />
      <div className="mt-8 h-12 w-3/4 rounded-2xl bg-white" />
      <div className="mt-4 h-12 w-1/2 rounded-2xl bg-white" />
      <div className="mt-10 aspect-[21/9] rounded-[2rem] bg-white" />
    </div>
  );
}

export default function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}
