import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { InsightMeta, StoryCard } from "@/components/InsightCard";
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

  return (
    <>
      <article>
        <header className="container-page pt-8 sm:pt-12">
          <Link href="/insights" className="inline-flex min-h-11 items-center gap-2 text-sm text-stone hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" />
            All insights
          </Link>
          <div className="mt-6 grid gap-6 border-t-2 border-ink pt-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              {insight.category && <p className="label text-copper">{insight.category.title}</p>}
              <div className="mt-3">
                <InsightMeta insight={insight} />
              </div>
            </div>
            <div className="lg:col-span-9">
              <h1 className="max-w-4xl font-serif text-[2.3rem] leading-[1.08] tracking-[-0.02em] text-balance sm:text-[3.2rem]">
                {insight.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone sm:text-xl">{insight.excerpt}</p>
            </div>
          </div>
        </header>

        {insight.cover && (
          <figure className="container-page mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2px] bg-linen lg:aspect-[21/9]">
              <Image src={insight.cover.src} alt={insight.cover.alt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-2.5 text-sm text-stone">{insight.cover.alt}</figcaption>
          </figure>
        )}

        <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-12">
          <aside className="order-last lg:order-none lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              {insight.author && (
                <div className="border-t border-rule pt-4">
                  <p className="label text-stone">Written by</p>
                  <p className="mt-2 font-semibold">{insight.author.name}</p>
                  {insight.author.role && <p className="text-sm text-stone">{insight.author.role}</p>}
                </div>
              )}
              <div className="mt-6 border-t border-rule pt-4">
                <ShareLinks url={url} title={insight.title} />
              </div>
            </div>
          </aside>
          <div className="lg:col-span-7">
            {!insight.publishedAt && (
              <p role="note" className="mb-8 border-l-2 border-copper bg-paper px-4 py-3 text-sm text-stone">
                This article is not published. You are seeing it in a preview.
              </p>
            )}
            <ArticleBody value={insight.body} />
          </div>
        </div>
      </article>

      {insight.related.length > 0 && (
        <section className="border-t border-rule bg-paper py-12 sm:py-16" aria-labelledby="related-heading">
          <div className="container-page">
            <h2 id="related-heading" className="font-serif text-[1.9rem] leading-tight">
              Related reading
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {insight.related.map((item) => (
                <li key={item.id}>
                  <StoryCard insight={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function ArticleSkeleton() {
  return (
    <div className="container-page pt-12 pb-20" aria-hidden>
      <div className="h-3 w-24 bg-linen" />
      <div className="mt-8 h-12 w-3/4 bg-linen" />
      <div className="mt-4 h-12 w-1/2 bg-linen" />
      <div className="mt-10 aspect-[21/9] bg-linen" />
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
