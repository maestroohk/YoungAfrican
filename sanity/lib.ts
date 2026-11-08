import { cacheLife } from "next/cache";
import { draftMode } from "next/headers";
import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

const readToken = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId: isSanityConfigured ? projectId : "unconfigured",
  dataset,
  apiVersion,
  useCdn: true,
});

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken || false,
  browserToken: readToken || false,
  strict: true,
});

export const previewClient = client.withConfig({ token: readToken, useCdn: false });

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}

export async function fetchContent<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 86400 });
  const { isEnabled } = await draftMode();
  const { data } = await sanityFetch({
    query,
    params: { ...params, preview: isEnabled },
    perspective: isEnabled ? "drafts" : "published",
    stega: false,
    tags: ["content"],
  });
  return data as T;
}
