import { defineArrayMember, defineField, defineType } from "sanity";

const blockContent = defineType({
  name: "blockContent",
  title: "Article body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineArrayMember({
      name: "callout",
      title: "Note",
      type: "object",
      fields: [defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (rule) => rule.required() })],
      preview: { select: { title: "text" }, prepare: ({ title }) => ({ title: "Note", subtitle: title }) },
    }),
  ],
});

const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
});

const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Short biography", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});

const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "publishing", title: "Publishing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "The web address of the article, for example /insights/my-article.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "Shown on article cards and used as the default search description.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Body", type: "blockContent", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      group: "publishing",
      description: "Required before publishing. Articles only appear on the website once published and this date has passed.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured article",
      type: "boolean",
      group: "publishing",
      description: "Shows this article in the featured position on the Insights page. If several are featured, the newest is used.",
      initialValue: false,
    }),
    defineField({
      name: "relatedPosts",
      title: "Related articles",
      type: "array",
      group: "publishing",
      description: "Up to three articles to suggest at the end. If empty, articles from the same category are suggested.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
          options: { filter: ({ document }) => ({ filter: "_id != $id && _id != $draftId", params: { id: document._id.replace("drafts.", ""), draftId: document._id } }) },
        }),
      ],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Optional. Defaults to the article title.",
      validation: (rule) => rule.max(70).warning("Search engines usually show around 60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      group: "seo",
      description: "Optional. Defaults to the summary.",
      validation: (rule) => rule.max(170).warning("Search engines usually show around 155 characters."),
    }),
  ],
  orderings: [
    { title: "Publication date, newest", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", category: "category.title", date: "publishedAt", media: "coverImage" },
    prepare: ({ title, category, date, media }) => ({
      title,
      media,
      subtitle: [category, date ? new Date(date).toLocaleDateString("en-GB") : "No publication date"].filter(Boolean).join(" · "),
    }),
  },
});

const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
      description: "Shown under the page title. Leave empty to use the default text.",
    }),
    defineField({ name: "mission", title: "Mission", type: "text", rows: 3 }),
    defineField({ name: "vision", title: "Vision", type: "text", rows: 3 }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", title: "Text", type: "text", rows: 2, validation: (rule) => rule.required() }),
          ],
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

export const schemaTypes = [post, category, author, blockContent, aboutPage];
