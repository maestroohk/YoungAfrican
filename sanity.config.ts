"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { defineLocations, presentationTool } from "sanity/presentation";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "youngafrican",
  title: "Young African Internet",
  basePath: "/studio",
  projectId: isSanityConfigured ? projectId : "unconfigured",
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => template.schemaType !== "aboutPage"),
  },
  document: {
    actions: (actions, context) =>
      context.schemaType === "aboutPage"
        ? actions.filter((action) => action.action !== "duplicate" && action.action !== "delete")
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("About page").id("aboutPage").child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.divider(),
            S.documentTypeListItem("post").title("Articles"),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("author").title("Authors"),
          ]),
    }),
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
      resolve: {
        locations: {
          post: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || "Untitled", href: `/insights/${doc?.slug}` },
                { title: "Insights", href: "/insights" },
              ],
            }),
          }),
          aboutPage: defineLocations({
            message: "This document is used on the About page",
            locations: [{ title: "About", href: "/about" }],
          }),
        },
      },
    }),
  ],
  apiVersion,
});
