import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { seedAuthors, seedCategories, seedInsights } from "../content/insights-seed.ts";

const dryRun = process.argv.includes("--dry-run");
const publish = process.argv.includes("--publish");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!dryRun && (!projectId || !token)) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (for example in .env.local) before migrating.");
  process.exit(1);
}

const client = createClient({
  projectId: projectId || "dryrun",
  dataset,
  token,
  apiVersion: "2026-11-01",
  useCdn: false,
  perspective: "raw",
});

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };
type Block = {
  _type: "block";
  _key: string;
  style: string;
  listItem?: "bullet" | "number";
  level?: number;
  markDefs: MarkDef[];
  children: Span[];
};

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  authorSlug: string;
  featured: boolean;
  cover: { url: string; alt: string };
  related: string[];
  body: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

const postId = (slug: string) => `post-${slug}`;

function parseInline(text: string, key: () => string, marks: string[], markDefs: MarkDef[]): Span[] {
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|\*([^*]+)\*/;
  const match = pattern.exec(text);
  if (!match) return text ? [{ _type: "span", _key: key(), text, marks }] : [];

  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[0].length);
  let inner: Span[];
  if (match[1] !== undefined) {
    const def: MarkDef = { _type: "link", _key: key(), href: match[2] };
    markDefs.push(def);
    inner = parseInline(match[1], key, [...marks, def._key], markDefs);
  } else if (match[3] !== undefined) {
    inner = parseInline(match[3], key, [...marks, "strong"], markDefs);
  } else {
    inner = parseInline(match[4], key, [...marks, "em"], markDefs);
  }
  return [...parseInline(before, key, marks, markDefs), ...inner, ...parseInline(after, key, marks, markDefs)];
}

function markdownToBlocks(markdown: string, slug: string): Block[] {
  let counter = 0;
  const key = () => `${slug.slice(0, 12)}${(counter++).toString(36)}`;
  const block = (text: string, style: string, listItem?: "bullet" | "number"): Block => {
    const markDefs: MarkDef[] = [];
    const children = parseInline(text.trim(), key, [], markDefs);
    return { _type: "block", _key: key(), style, markDefs, children, ...(listItem ? { listItem, level: 1 } : {}) };
  };

  const blocks: Block[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) blocks.push(block(paragraph.join(" "), "normal"));
    paragraph = [];
  };

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
    } else if (trimmed.startsWith("### ")) {
      flush();
      blocks.push(block(trimmed.slice(4), "h3"));
    } else if (trimmed.startsWith("## ")) {
      flush();
      blocks.push(block(trimmed.slice(3), "h2"));
    } else if (trimmed.startsWith("> ")) {
      flush();
      blocks.push(block(trimmed.slice(2), "blockquote"));
    } else if (/^[-*] /.test(trimmed)) {
      flush();
      blocks.push(block(trimmed.slice(2), "normal", "bullet"));
    } else if (/^\d+\. /.test(trimmed)) {
      flush();
      blocks.push(block(trimmed.replace(/^\d+\. /, ""), "normal", "number"));
    } else {
      paragraph.push(trimmed);
    }
  }
  flush();
  return blocks;
}

function loadMarkdownArticles(): Article[] {
  const folder = path.join(import.meta.dirname, "..", "content", "articles");
  return readdirSync(folder)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = readFileSync(path.join(folder, file), "utf8");
      const [, frontMatter, body] = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? [];
      if (!frontMatter) throw new Error(`${file} has no front matter`);
      const meta = Object.fromEntries(
        frontMatter.split(/\r?\n/).map((line) => {
          const index = line.indexOf(":");
          return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
        }),
      );
      return {
        slug: meta.slug,
        title: meta.title,
        excerpt: meta.excerpt,
        categorySlug: "artificial-intelligence",
        authorSlug: "youngafrican-research",
        featured: false,
        cover: { url: meta.coverUrl, alt: meta.coverAlt },
        related: (meta.related ?? "").split(",").map((slug: string) => slug.trim()).filter(Boolean),
        body: markdownToBlocks(body, meta.slug),
        seoTitle: meta.seoTitle,
        seoDescription: meta.seoDescription,
      };
    });
}

async function uploadCover(slug: string, url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download cover for ${slug}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: `${slug}.jpg`, source: { name: "unsplash", id: url, url } });
  return asset._id;
}

async function syncCategoriesAndAuthors() {
  for (const category of seedCategories) {
    const doc = {
      _id: `category-${category.slug}`,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
    };
    if (dryRun) {
      console.log(`Category: ${category.title}`);
      continue;
    }
    await client.createIfNotExists(doc);
    await client.patch(doc._id).set({ title: category.title, description: category.description }).commit();
  }

  for (const author of seedAuthors) {
    const doc = {
      _id: `author-${author.slug}`,
      _type: "author",
      name: author.name,
      slug: { _type: "slug", current: author.slug },
      role: author.role,
    };
    if (dryRun) console.log(`Author: ${author.name}`);
    else await client.createIfNotExists(doc);
  }
}

async function importArticle(article: Article) {
  const id = postId(article.slug);
  const categoryRef = `category-${article.categorySlug}`;

  if (!dryRun) {
    const existing = await client.fetch<{ _id: string; category?: string }[]>(
      `*[_type == "post" && (_id in [$id, $draftId] || slug.current == $slug)]{ _id, "category": category._ref }`,
      { id, draftId: `drafts.${id}`, slug: article.slug },
    );
    if (existing.length > 0) {
      for (const doc of existing.filter((item) => item.category !== categoryRef)) {
        await client.patch(doc._id).set({ category: { _type: "reference", _ref: categoryRef } }).commit();
        console.log(`Moved "${article.title}" (${doc._id}) to ${article.categorySlug}.`);
      }
      console.log(`Skipped "${article.title}": it already exists.`);
      return;
    }
  }

  const assetId = dryRun ? "image-dryrun" : await uploadCover(article.slug, article.cover.url);
  const doc = {
    _id: publish ? id : `drafts.${id}`,
    _type: "post",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    excerpt: article.excerpt,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: article.cover.alt },
    category: { _type: "reference", _ref: categoryRef },
    author: { _type: "reference", _ref: `author-${article.authorSlug}` },
    featured: article.featured,
    body: article.body,
    relatedPosts: article.related.map((slug) => ({ _type: "reference", _key: `related-${slug}`, _ref: postId(slug), _weak: true })),
    ...(article.seoTitle ? { seoTitle: article.seoTitle } : {}),
    ...(article.seoDescription ? { seoDescription: article.seoDescription } : {}),
    ...(publish ? { publishedAt: new Date().toISOString() } : {}),
  };

  if (dryRun) {
    const words = JSON.stringify(article.body).match(/"text":"([^"]*)"/g)?.join(" ").split(/\s+/).length ?? 0;
    console.log(`${doc._id} · ${article.categorySlug} · ${article.body.length} blocks · ~${words} words · related: ${article.related.join(", ")}`);
  } else {
    await client.create(doc);
    console.log(`${publish ? "Published" : "Created draft"}: "${article.title}"`);
  }
}

async function run() {
  await syncCategoriesAndAuthors();
  const articles: Article[] = [
    ...seedInsights.map((seed) => ({ ...seed, cover: seed.cover })),
    ...loadMarkdownArticles(),
  ];
  for (const article of articles) await importArticle(article);
  console.log(dryRun ? "Dry run complete. Nothing was written." : "Migration complete.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
