import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { isSanityConfigured } from "@/sanity/env";
import { previewClient } from "@/sanity/lib";

const { GET: enableDraftMode } = defineEnableDraftMode({ client: previewClient });

export async function GET(request: Request) {
  if (!isSanityConfigured || !process.env.SANITY_API_READ_TOKEN) {
    return new Response("Preview is not configured.", { status: 404 });
  }
  return enableDraftMode(request);
}
