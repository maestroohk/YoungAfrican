# YoungAfrican website

Website for YoungAfrican, an African-founded company in formation, being established in Uganda. It is building pay-as-you-go community Wi-Fi hotspots and an online Markets Academy that teaches risk before reward.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Lucide icons and Sanity CMS.

## Design system

- Colours (tokens in `app/globals.css`): signal blue for the brand and Wi-Fi, night for the Wi-Fi product world, mango for the Markets Academy, coral for risk and stops, all on warm paper.
- Type: Schibsted Grotesk for interface and headings, Newsreader for article text and editorial accents.
- Components: pill buttons and page heroes in `components/ui.tsx`; the Wi-Fi walkthrough, lesson previews and hero mock-ups are shared between the homepage and the section pages.

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
app/(site)/           Public pages: home, /connectivity, /academy, /insights, /about, /contact, /privacy
app/studio/           Embedded Sanity Studio at /studio
app/api/draft-mode/   Enables and disables draft previews
app/api/revalidate/   Optional webhook endpoint for instant cache refresh
components/           Header, footer, shared UI, Wi-Fi walkthrough, lessons, Insights grid, contact form
content/site.ts       Company copy, founder story defaults, services, photography
content/insights-seed.ts  The original four articles, used for migration and local fallback
content/articles/     Researched AI articles in Markdown, imported into Sanity as drafts
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

### Importing articles

`npm run migrate:insights` creates the four original articles and the Markdown articles in `content/articles/` as **unpublished drafts**, together with their topics (Artificial Intelligence, Digital Markets, Community Connectivity, Company updates) and authors. It skips any article whose ID or slug already exists and only re-aligns its topic, so it is safe to run more than once. Add `-- --dry-run` to see what would be written. Articles deliberately have no publication date: an editor sets one when publishing.

To add another Markdown article, copy the front matter of an existing file in `content/articles/`, write the body using headings, lists, links, bold and italics, and run the import again.

### Caching, preview and not-found pages

Sanity content is fetched in one cached function (`fetchContent` in `sanity/lib.ts`) and every page renders CMS content inside a `<Suspense>` boundary. Published pages are prerendered and refreshed within about a minute (immediately for visitors with the site open). In draft mode Next.js skips the cache, and the Suspense boundaries let draft content stream without blocking the page. Unknown or unpublished article URLs show the not-found page with a `noindex` tag; because the article streams inside Suspense, the HTTP status stays 200, as documented for Next.js Partial Prefetching.

## Enquiry form

The contact form validates input in the browser and again on the server, includes a hidden honeypot field for bots, and limits each IP address to five submissions per ten minutes.

- **Resend configured**: the enquiry is emailed as plain text to `CONTACT_TO_EMAIL`, with the sender as reply-to.
- **Development, no provider**: the enquiry is appended to `.enquiries/enquiries.ndjson` (git-ignored) and the visitor is told nobody was notified.
- **Production, no provider**: nothing is stored and the visitor is told the message could not be sent.

The rate limit is held in memory, so it is per server instance.

## Photography

Photographs are loaded from [Unsplash](https://unsplash.com/license) under the Unsplash licence and are listed in `photos` in `content/site.ts`. No stock photograph is presented as the founder; the About page shows a placeholder until a real portrait is uploaded in Studio. Replace the photographs with YoungAfrican's own when available.

## Before launch

1. Review, edit and publish the six AI article drafts in Studio. Check the sources flagged in each article, especially figures read from image-only PDFs (the UCC Q2 2026 market report) and summaries of Uganda's Data Protection and Privacy Act.

1. Company registration status and legal entity name, and the regulatory position for each service line in Uganda. Update `legalNotice` in `content/site.ts`.
2. Business email, phone, WhatsApp number, office address and business hours (`site.contact`).
3. Founder: confirm the preferred public name (if any), approve the founder story, and upload a real portrait in Studio.
4. Review and publish the four migrated articles in Studio, setting real publication dates.
5. Social media links (`site.social`).
6. Production domain for `NEXT_PUBLIC_SITE_URL`, plus a Sanity CORS origin for it.
7. Email delivery credentials and a verified sending domain.
8. Hotspot locations, voucher prices, durations and data amounts, the voucher sales process, and education formats and fees, once confirmed. Online voucher sales and mobile money payment are not implemented yet.
9. Legal review of the risk warning, service boundaries and the privacy notice at /privacy, plus terms of use if needed.
10. Revoke the temporary migration token in Sanity once it is no longer needed.

## Branches and releases

- `main`: approved releases only. Changes arrive by pull request from `development`.
- `development`: integration branch where finished work is reviewed and tested.
- `feature/*` and `fix/*`: one branch per piece of work, merged into `development` by pull request.

Every pull request into `development` or `main` runs `.github/workflows/ci.yml`: install, `next typegen` and type-check, ESLint and a production build. The workflow reads the public Sanity project ID, dataset and site URL from repository variables; no secrets are needed to build.

## Hosting

The site needs a Node.js host. The contact form is a server action, Sanity previews use draft mode, `/api/*` handles preview and cache refresh, `/studio` hosts the editor and old URLs are redirected, and none of these work in a static export. GitHub Pages can therefore only serve a cut-down copy without a working contact form, so it is not used. Vercel, Netlify or another Node host can deploy `development` as a preview and `main` as production, with the environment variables above set in the host.
