import type { Metadata } from "next";
import { Suspense } from "react";
import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { ArticleBody } from "@/components/ArticleBody";
import Image from "next/image";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { Interests } from "@/components/Visuals";
import { about, founder, site, values as defaultValues } from "@/content/site";
import { isSanityConfigured } from "@/sanity/env";
import { fetchContent, urlFor } from "@/sanity/lib";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is an African-founded company in formation, connecting access and knowledge through community Wi-Fi and markets education.`,
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
  const portrait =
    cms?.founderPortrait?.asset && !cms.founderPortrait.illustrative
      ? { src: urlFor(cms.founderPortrait).width(1200).height(1500).fit("crop").url(), alt: cms.founderPortrait.alt ?? "" }
      : null;

  return (
    <>
      <PageHero
        tone="blue"
        eyebrow="About YoungAfrican"
        title={
          <>
            Knowledge, opportunity <span className="text-mango">and access.</span>
          </>
        }
        intro={cms?.intro || about.intro}
      />

      <section aria-labelledby="purpose-heading" className="bg-white">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">Mission</p>
            <h2 id="purpose-heading" className="mt-4 text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-balance sm:text-[2.6rem]">
              {cms?.mission || about.mission}
            </h2>
            <p className="mt-8 font-semibold text-blue">Vision</p>
            <p className="mt-3 max-w-xl font-serif text-[1.4rem] leading-snug">{cms?.vision || about.vision}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {about.pillars.map((pillar, index) => (
              <li key={pillar.title} className={`rounded-[2rem] p-6 ${["bg-blue text-white", "bg-mango text-mango-ink", "bg-night text-white"][index]}`}>
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-2 leading-relaxed opacity-85">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="founder" aria-labelledby="founder-heading">
        <div className="container-page grid items-start gap-14 py-20 lg:grid-cols-2 lg:py-28">
          <div className="lg:sticky lg:top-24">
            {portrait ? (
              <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem]">
                <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 448px, 100vw" className="object-cover object-[50%_30%]" />
              </div>
            ) : (
              <>
                <Interests />
                <p className="mt-6 text-center text-sm text-muted">A photograph of the founder will be added when available.</p>
              </>
            )}
          </div>
          <div>
            <p className="font-semibold text-blue">The founder</p>
            <h2 id="founder-heading" className="mt-4 text-[2rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-[2.6rem]">
              {cms?.founderHeadline || founder.headline}
            </h2>
            <p className="mt-4 text-sm text-muted">{cms?.founderName ? `${cms.founderName}, ${role}` : `${role}, ${site.name}`}</p>
            <div className="mt-8">
              {cms?.founderStory?.length ? (
                <ArticleBody value={cms.founderStory} />
              ) : (
                <div className="space-y-5 font-serif text-[1.25rem] leading-relaxed">
                  {founder.story.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              {founder.interests.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-4">
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="mt-1 font-semibold">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="on-dark bg-night text-white">
        <div className="container-page py-20 lg:py-28">
          <h2 id="values-heading" className={heading}>
            What we hold ourselves to.
          </h2>
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-[2rem] bg-white/8 p-6 ring-1 ring-white/10">
                <dt className="text-lg font-semibold">{value.title}</dt>
                <dd className="mt-2 leading-relaxed text-white/70">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="stage-heading">
        <div className="container-page py-20 lg:py-28">
          <p className="font-semibold text-blue">Where we are</p>
          <h2 id="stage-heading" className={`${heading} mt-4 max-w-3xl`}>
            Honest about our stage.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {milestones.map((item, index) => (
              <li key={item.label} className={`rounded-[2rem] p-6 ${index === 0 ? "bg-blue text-white" : "bg-white"}`}>
                <p className="text-sm font-semibold opacity-75">{item.label}</p>
                <p className="mt-3 text-lg leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/insights" tone="outline" arrow={false}>
              Read our insights
            </ButtonLink>
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
