# YoungAfrican website

Corporate website for YoungAfrican, a Ugandan technology company in formation that connects knowledge, opportunity and access through responsible market education and affordable internet connectivity.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Lucide icons, Motion and Sanity CMS.

## Requirements

- Node.js 20.9 or newer (22.18+ to run the migration script)
- npm

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The content studio is at http://localhost:3000/studio.

## Scripts

| Command                    | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `npm run dev`              | Start the development server                         |
| `npm run build`            | Create a production build                            |
| `npm run start`            | Serve the production build                           |
| `npm run lint`             | Run ESLint                                           |
| `npm run migrate:insights` | Import the bundled articles into Sanity as drafts    |

## Project structure

```
app/(site)/           Public pages, sharing the header and footer
app/studio/           Embedded Sanity Studio at /studio
app/api/draft-mode/   Enables and disables draft previews
app/api/revalidate/   Optional webhook endpoint for instant cache refresh
components/           Header, footer, shared UI, article rendering, contact form
content/site.ts       Company copy, founder story defaults, services, photography
content/insights-seed.ts  The original articles, used for migration and local fallback
lib/insights.ts       Article queries and data shaping
lib/enquiry.ts        Enquiry validation shared by the form and the server
sanity/               Sanity environment, client, image helper and schemas
sanity.config.ts      Studio configuration
scripts/              Article migration script
```

## Content management (Sanity)

### Logging in and publishing an article

1. Go to `/studio` (locally http://localhost:3000/studio) and sign in with the Google account that owns the Sanity project. Other people can be invited from the Sanity dashboard under **Members**.
2. Open **Articles** and either select an existing draft or click **+** to create one.
3. Fill in the title, slug, summary, cover image (with alternative text), category, author and body. Use the **Publishing** tab for the publication date, featured flag and related articles, and the **SEO** tab for an optional search title and description.
4. Click **Presentation** at the top to preview the draft on the real website before it goes live.
5. Click **Publish**. A publication date is required. The article appears on the website within about a minute, and immediately for visitors who have the site open.
6. To take an article down, switch to the **Published** version and choose **Unpublish** from the document actions menu.

Only published articles whose publication date has passed are shown publicly. Drafts are only visible inside Studio and its preview.

### About page

**About page** in Studio controls the introduction, mission, vision, values, founder headline, optional founder name and role, founder story and founder portrait. Any field left empty falls back to the text in `content/site.ts`, so the page always works. The portrait has an **illustrative image** switch, which is on until a real photograph of the founder is uploaded.

### Environment variables

| Variable                        | Purpose                                                             |
| ------------------------------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Public site URL for canonical links, sitemap and Open Graph         |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID                                                   |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset, normally `production`                               |
| `SANITY_API_READ_TOKEN`         | Viewer token, used server-side for draft previews                   |
| `SANITY_API_WRITE_TOKEN`        | Editor token, only for `npm run migrate:insights`                   |
| `SANITY_REVALIDATE_SECRET`      | Optional webhook secret for `/api/revalidate`                       |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Enquiry email delivery via Resend          |

Tokens belong only in `.env.local` locally and in the hosting provider's environment settings in production. They must never be committed.

Without a Sanity project ID, the Insights pages show the bundled seed articles in development (clearly labelled as a local preview) and an empty state in production, so nothing unpublished is ever presented as live.

### Deploying with Sanity

1. Add the production domain to the Sanity project's CORS origins (**API → CORS origins**) with credentials allowed, so editors can sign in to `/studio` on the live site.
2. Set the environment variables above in the hosting provider.
3. Optionally add a Sanity webhook (**API → Webhooks**) that sends a POST to `https://<domain>/api/revalidate` on create, update and delete, using `SANITY_REVALIDATE_SECRET` as the secret. Without it, changes still appear within about a minute.

### Migrating the original articles

`npm run migrate:insights` creates the four original articles as **unpublished drafts**, plus their categories and authors. It skips any article whose ID or slug already exists, so it is safe to run more than once. Add `-- --dry-run` to print the documents without writing. The articles deliberately have no publication date: an editor sets one when publishing.

## Enquiry form

The contact form validates input in the browser and again on the server, includes a hidden honeypot field for bots, and limits each IP address to five submissions per ten minutes.

- **Resend configured**: the enquiry is emailed as plain text to `CONTACT_TO_EMAIL`, with the sender as reply-to.
- **Development, no provider**: the enquiry is appended to `.enquiries/enquiries.ndjson` (git-ignored) and the visitor is told nobody was notified.
- **Production, no provider**: nothing is stored and the visitor is asked to use the direct contact details.

The rate limit is held in memory, so it is per server instance.

## Photography

Photographs are loaded from [Unsplash](https://unsplash.com/license) under the Unsplash licence and are listed in `photos` in `content/site.ts`. The founder portrait is a stock photograph used for illustration and is labelled as such on the page. Replace these with YoungAfrican's own photography when available.

## Before launch

1. Company registration status and legal entity name, and the regulatory position for each service line in Uganda. Update `legalNotice` in `content/site.ts`.
2. Business email, phone, WhatsApp number, office address and business hours (`site.contact`).
3. Founder: confirm the preferred public name (if any), approve the founder story, and upload a real portrait in Studio.
4. Review and publish the four migrated articles in Studio, setting real publication dates.
5. Social media links (`site.social`).
6. Production domain for `NEXT_PUBLIC_SITE_URL`, plus a Sanity CORS origin for it.
7. Email delivery credentials and a verified sending domain.
8. Connectivity package details, pricing and coverage areas, and education formats and fees, once confirmed.
9. Legal review of the risk warning and service boundaries, plus a privacy policy and terms of use.
10. Revoke the temporary migration token in Sanity once it is no longer needed.
