import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { isSanityConfigured } from "@/sanity/env";
import { fetchContent, urlFor } from "@/sanity/lib";
import { seedAuthors, seedCategories, seedInsights } from "@/content/insights-seed";

export type InsightSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string | null;
  featured: boolean;
  readingTime: number;
  cover: { src: string; alt: string } | null;
  category: { title: string; slug: string } | null;
  author: { name: string; role: string | null; image: string | null } | null;
};

export type Insight = InsightSummary & {
  body: PortableTextBlock[];
  seoTitle: string | null;
  seoDescription: string | null;
  related: InsightSummary[];
};

export type InsightsSource = "sanity" | "local" | "none";

type RawSummary = Omit<InsightSummary, "cover" | "author" | "readingTime"> & {
  characters: number | null;
  coverImage: (SanityImageSource & { alt?: string }) | null;
  author: { name: string; role: string | null; image: SanityImageSource | null } | null;
};

type RawInsight = RawSummary & {
  body: PortableTextBlock[];
  seoTitle: string | null;
  seoDescription: string | null;
  related: (RawSummary | null)[] | null;
};

const summaryFields = `
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "featured": coalesce(featured, false),
  "characters": length(pt::text(body)),
  coverImage,
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name, role, image }
`;

const visibleFilter = `_type == "post" && defined(slug.current) && ($preview || (defined(publishedAt) && publishedAt <= now()))`;

const listQuery = defineQuery(`*[${visibleFilter}] | order(coalesce(publishedAt, _updatedAt) desc) { ${summaryFields} }`);

const detailQuery = defineQuery(`*[${visibleFilter} && slug.current == $slug][0] {
  ${summaryFields},
  body[] {
    ...,
    _type == "image" => { ..., "dimensions": asset->metadata.dimensions }
  },
  seoTitle,
  seoDescription,
  "related": relatedPosts[]->[${visibleFilter}] { ${summaryFields} }
}`);

function readingTime(characters: number | null) {
  return Math.max(1, Math.round((characters ?? 0) / 1100));
}

function fromSanity(raw: RawSummary): InsightSummary {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt,
    publishedAt: raw.publishedAt,
    featured: raw.featured,
    readingTime: readingTime(raw.characters),
    category: raw.category,
    cover: raw.coverImage
      ? { src: urlFor(raw.coverImage).width(2000).height(1250).fit("crop").url(), alt: raw.coverImage.alt ?? "" }
      : null,
    author: raw.author
      ? {
          name: raw.author.name,
          role: raw.author.role,
          image: raw.author.image ? urlFor(raw.author.image).width(96).height(96).fit("crop").url() : null,
        }
      : null,
  };
}

function localInsights(): Insight[] {
  const summaries = seedInsights.map((seed): InsightSummary => {
    const category = seedCategories.find((item) => item.slug === seed.categorySlug)!;
    const author = seedAuthors.find((item) => item.slug === seed.authorSlug)!;
    const characters = seed.body.reduce(
      (total, block) => total + (block._type === "callout" ? block.text.length : block.children.map((child) => child.text).join("").length),
      0,
    );
    return {
      id: `local-${seed.slug}`,
      title: seed.title,
      slug: seed.slug,
      excerpt: seed.excerpt,
      publishedAt: null,
      featured: seed.featured,
      readingTime: readingTime(characters),
      cover: { src: seed.cover.url, alt: seed.cover.alt },
      category: { title: category.title, slug: category.slug },
      author: { name: author.name, role: author.role, image: null },
    };
  });

  return seedInsights.map((seed, index) => ({
    ...summaries[index],
    body: seed.body as PortableTextBlock[],
    seoTitle: null,
    seoDescription: null,
    related: summaries.filter((summary) => seed.related.includes(summary.slug)),
  }));
}

export function getInsightsSource(): InsightsSource {
  if (isSanityConfigured) return "sanity";
  return process.env.NODE_ENV === "production" ? "none" : "local";
}

export async function getInsights(): Promise<InsightSummary[]> {
  const source = getInsightsSource();
  if (source === "none") return [];
  if (source === "local") return localInsights();
  const posts = await fetchContent<RawSummary[]>(listQuery);
  return posts.map(fromSanity);
}

export async function getInsight(slug: string): Promise<Insight | null> {
  const source = getInsightsSource();
  if (source === "none") return null;
  if (source === "local") return localInsights().find((insight) => insight.slug === slug) ?? null;

  const raw = await fetchContent<RawInsight | null>(detailQuery, { slug });
  if (!raw) return null;

  let related = (raw.related ?? []).filter((item): item is RawSummary => item !== null).map(fromSanity);
  if (related.length === 0) {
    const others = (await getInsights()).filter((item) => item.slug !== slug);
    const sameCategory = others.filter((item) => item.category?.slug === raw.category?.slug);
    related = [...sameCategory, ...others.filter((item) => !sameCategory.includes(item))].slice(0, 3);
  }

  return {
    ...fromSanity(raw),
    body: raw.body ?? [],
    seoTitle: raw.seoTitle,
    seoDescription: raw.seoDescription,
    related,
  };
}

export function featuredInsight(insights: InsightSummary[]) {
  return insights.find((insight) => insight.featured) ?? insights[0];
}
