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

const postId = (slug: string) => `post-${slug}`;

async function uploadCover(slug: string, url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download cover for ${slug}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: `${slug}.jpg`, source: { name: "unsplash", id: url, url } });
  return asset._id;
}

async function run() {
  for (const category of seedCategories) {
    const doc = {
      _id: `category-${category.slug}`,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
    };
    if (dryRun) console.log(JSON.stringify(doc));
    else await client.createIfNotExists(doc);
  }

  for (const author of seedAuthors) {
    const doc = {
      _id: `author-${author.slug}`,
      _type: "author",
      name: author.name,
      slug: { _type: "slug", current: author.slug },
      role: author.role,
    };
    if (dryRun) console.log(JSON.stringify(doc));
    else await client.createIfNotExists(doc);
  }

  for (const seed of seedInsights) {
    const id = postId(seed.slug);

    if (!dryRun) {
      const existing = await client.fetch<number>(
        `count(*[_type == "post" && (_id in [$id, $draftId] || slug.current == $slug)])`,
        { id, draftId: `drafts.${id}`, slug: seed.slug },
      );
      if (existing > 0) {
        console.log(`Skipped "${seed.title}": an article with this ID or slug already exists.`);
        continue;
      }
    }

    const assetId = dryRun ? "image-dryrun" : await uploadCover(seed.slug, seed.cover.url);

    const doc = {
      _id: publish ? id : `drafts.${id}`,
      _type: "post",
      title: seed.title,
      slug: { _type: "slug", current: seed.slug },
      excerpt: seed.excerpt,
      coverImage: { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: seed.cover.alt },
      category: { _type: "reference", _ref: `category-${seed.categorySlug}` },
      author: { _type: "reference", _ref: `author-${seed.authorSlug}` },
      featured: seed.featured,
      body: seed.body,
      relatedPosts: seed.related.map((slug) => ({
        _type: "reference",
        _key: `related-${slug}`,
        _ref: postId(slug),
        _weak: true,
      })),
      ...(publish ? { publishedAt: new Date().toISOString() } : {}),
    };

    if (dryRun) {
      console.log(JSON.stringify({ ...doc, body: `${doc.body.length} blocks` }));
    } else {
      await client.create(doc);
      console.log(`${publish ? "Published" : "Created draft"}: "${seed.title}"`);
    }
  }

  console.log(dryRun ? "Dry run complete. Nothing was written." : "Migration complete.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
