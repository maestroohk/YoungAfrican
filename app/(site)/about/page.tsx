import type { Metadata } from "next";
import { Suspense } from "react";
import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { ArticleBody } from "@/components/ArticleBody";
import { Label, PageHeader, Photo, SectionHeader, TextLink } from "@/components/ui";
import { about, founder, site, values as defaultValues } from "@/content/site";
import { isSanityConfigured } from "@/sanity/env";
import { fetchContent, urlFor } from "@/sanity/lib";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} connects knowledge, opportunity and access: community Wi-Fi hotspots and responsible market education, built in Uganda.`,
  alternates: { canonical: "/about" },
};

type AboutContent = {
  intro?: string;
  mission?: string;
  vision?: string;
  values?: { title: string; text: string }[];
  founderHeadline?: string;
  founderName?: string;
  founderRole?: string;
  founderStory?: PortableTextBlock[];
  founderPortrait?: SanityImageSource & { asset?: unknown; alt?: string; illustrative?: boolean };
} | null;

const aboutQuery = defineQuery(`*[_type == "aboutPage"][0] {
  intro, mission, vision, values[] { title, text },
  founderHeadline, founderName, founderRole, founderStory, founderPortrait
}`);

const milestones = [
  { label: "Now", text: "Establishing the company and confirming registration and licensing requirements in Uganda." },
  { label: "Next", text: "Preparing the first community Wi-Fi hotspot locations and opening education enquiries." },
  { label: "Later", text: "Adding services that widen access to knowledge and opportunity as the company grows." },
];

async function AboutWithCms() {
  const cms = isSanityConfigured ? await fetchContent<AboutContent>(aboutQuery) : null;
  return <AboutView cms={cms} />;
}

function AboutView({ cms }: { cms: AboutContent }) {
  const values = cms?.values?.length ? cms.values : defaultValues;
  const role = cms?.founderRole || founder.role;
  const portrait = cms?.founderPortrait?.asset
    ? {
        src: urlFor(cms.founderPortrait).width(1200).height(1500).fit("crop").url(),
        alt: cms.founderPortrait.alt ?? "",
        illustrative: cms.founderPortrait.illustrative ?? false,
      }
    : founder.portrait;

  return (
    <>
      <PageHeader
        label="About"
        title={`${site.name} connects knowledge, opportunity and access.`}
        intro={cms?.intro || about.intro}
        aside={
          <dl className="border-t-2 border-ink lg:mt-14">
            {[
              ["Based in", site.location],
              ["Stage", site.status],
              ["Connectivity", "Community Wi-Fi hotspots"],
              ["Markets", "Research and financial education"],
            ].map(([term, detail]) => (
              <div key={term} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-rule py-3.5">
                <dt className="text-sm text-stone">{term}</dt>
                <dd className="font-medium">{detail}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="py-14 sm:py-20" aria-labelledby="purpose-heading">
        <div className="container-page">
          <div className="grid gap-6 border-t border-rule pt-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <Label>Purpose</Label>
            </div>
            <div className="lg:col-span-9">
              <h2 id="purpose-heading" className="sr-only">
                Mission and vision
              </h2>
              <p className="label text-copper">Mission</p>
              <p className="mt-3 max-w-3xl font-serif text-[1.9rem] leading-[1.2] tracking-[-0.01em] text-balance sm:text-[2.4rem]">
                {cms?.mission || about.mission}
              </p>
              <div className="mt-8 grid gap-4 border-t border-rule pt-6 sm:grid-cols-[8rem_1fr]">
                <p className="label text-copper">Vision</p>
                <p className="max-w-2xl font-serif text-[1.35rem] leading-snug text-stone">{cms?.vision || about.vision}</p>
              </div>
            </div>
          </div>

          <ol className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-3 lg:ml-[25%] lg:w-3/4">
            {about.pillars.map((pillar, index) => (
              <li key={pillar.title} className="border-t-2 border-ink pt-4">
                <span className="text-sm font-medium text-copper">0{index + 1}</span>
                <h3 className="mt-1 text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-1.5 leading-relaxed text-stone">{pillar.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="founder" className="border-y border-rule bg-paper py-14 sm:py-20" aria-labelledby="founder-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Label>The founder</Label>
            <div className="mt-6 lg:sticky lg:top-24">
              <Photo
                src={portrait.src}
                alt={portrait.alt}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 100vw"
                className="aspect-[4/5] max-w-md"
                imageClassName="object-[50%_30%]"
                caption={
                  portrait.illustrative ? (
                    <>
                      <span className="font-medium text-ink">Illustrative image.</span> A stock photograph used until a portrait of the
                      founder is available.
                    </>
                  ) : undefined
                }
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 id="founder-heading" className="max-w-2xl font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] text-balance sm:text-[2.6rem]">
              {cms?.founderHeadline || founder.headline}
            </h2>
            <p className="mt-4 text-sm text-stone">{cms?.founderName ? `${cms.founderName}, ${role}` : `${role}, ${site.name}`}</p>
            <div className="mt-8 max-w-2xl">
              {cms?.founderStory?.length ? (
                <ArticleBody value={cms.founderStory} />
              ) : (
                <div className="space-y-5 text-lg leading-[1.75] text-charcoal">
                  {founder.story.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
            <dl className="mt-10 grid max-w-2xl border-t border-rule sm:grid-cols-2">
              {founder.interests.map((item) => (
                <div key={item.label} className="border-b border-rule py-3.5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                  <dt className="label text-stone">{item.label}</dt>
                  <dd className="mt-1 font-medium">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="values-heading">
        <div className="container-page">
          <SectionHeader label="Values" id="values-heading" title="What we hold ourselves to." />
          <dl className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:ml-[25%] lg:w-3/4">
            {values.map((value) => (
              <div key={value.title} className="border-t border-rule py-5">
                <dt className="font-semibold">{value.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-stone">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-14 sm:pb-20" aria-labelledby="stage-heading">
        <div className="container-page">
          <SectionHeader
            label="Where we are"
            id="stage-heading"
            title="Honest about our stage."
            intro="We would rather tell you exactly where we are than overstate it."
          />
          <ol className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-3 lg:ml-[25%] lg:w-3/4">
            {milestones.map((item) => (
              <li key={item.label} className="border-t-2 border-ink pt-4">
                <p className="label text-copper">{item.label}</p>
                <p className="mt-2 leading-relaxed text-stone">{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 lg:ml-[25%]">
            <TextLink href="/insights">Read our insights</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutView cms={null} />}>
      <AboutWithCms />
    </Suspense>
  );
}
