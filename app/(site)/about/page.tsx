import type { Metadata } from "next";
import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { ArticleBody } from "@/components/ArticleBody";
import { ButtonLink, CtaBand, Eyebrow, PageHero, Photo, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { about, founder, photos, site, values as defaultValues } from "@/content/site";
import { isSanityConfigured } from "@/sanity/env";
import { fetchContent, urlFor } from "@/sanity/lib";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} connects knowledge, opportunity and access: responsible market education and affordable internet connectivity for underserved communities in Uganda.`,
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
  { label: "Next", text: "Opening enquiries for connectivity site surveys and market education sessions." },
  { label: "Later", text: "Growing into further technology services that widen access to knowledge and opportunity." },
];

function Headline({ text }: { text: string }) {
  const split = text.indexOf(". ");
  if (split === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, split + 1)}{" "}
      <span className="font-serif font-normal tracking-[-0.01em] text-stone italic">{text.slice(split + 2)}</span>
    </>
  );
}

export default async function AboutPage() {
  const cms = isSanityConfigured ? await fetchContent<AboutContent>(aboutQuery) : null;

  const intro = cms?.intro || about.intro;
  const mission = cms?.mission || about.mission;
  const vision = cms?.vision || about.vision;
  const values = cms?.values?.length ? cms.values : defaultValues;
  const headline = cms?.founderHeadline || founder.headline;
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
      <PageHero
        image={photos.kampalaDay}
        eyebrow={`About ${site.name}`}
        title={
          <>
            Knowledge, opportunity <span className="font-serif font-normal tracking-[-0.02em] italic">and</span> access.
          </>
        }
        intro={intro}
      />

      <section className="on-light bg-bone py-24 sm:py-32">
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">What we stand for</Eyebrow>
            <h2 className="mt-8 max-w-5xl font-display text-[2rem] leading-[1.08] font-medium tracking-[-0.035em] text-balance sm:text-6xl">
              Opportunity grows where knowledge and access meet.{" "}
              <span className="font-serif font-normal tracking-[-0.01em] text-stone italic">
                We work on both sides of that equation.
              </span>
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-3">
            {about.pillars.map((pillar, index) => (
              <li key={pillar.title} className="bg-bone p-7 sm:p-9">
                <Reveal delay={index * 0.06}>
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-lime font-mono text-sm">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.03em]">{pillar.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-stone">{pillar.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="founder" className="on-light py-24 sm:py-32" aria-labelledby="founder-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <figure>
                  <div className="relative">
                    <Photo
                      src={portrait.src}
                      alt={portrait.alt}
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
                      className="aspect-[4/5] rounded-[2rem]"
                      imageClassName="object-[50%_30%]"
                    />
                    {portrait.illustrative && (
                      <span className="absolute bottom-4 left-4 rounded-full bg-bone/90 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-ink uppercase backdrop-blur">
                        Illustrative image
                      </span>
                    )}
                  </div>
                  {portrait.illustrative && (
                    <figcaption className="mt-3 text-sm text-stone">
                      Stock photograph used for illustration. A portrait of the founder will replace it.
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="light">The founder</Eyebrow>
              <h2 id="founder-heading" className="mt-6 font-display text-[2.2rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                <Headline text={headline} />
              </h2>
              <p className="mt-6 font-mono text-sm tracking-[0.1em] text-stone uppercase">
                {cms?.founderName ? `${cms.founderName} · ${role}` : `${role}, ${site.name}`}
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-10">
              {cms?.founderStory?.length ? (
                <ArticleBody value={cms.founderStory} />
              ) : (
                <div className="space-y-6 text-lg leading-[1.8] text-ink/85">
                  {founder.story.map((paragraph, index) => (
                    <p key={index} className={index === 0 ? "text-xl leading-relaxed text-ink sm:text-2xl" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {founder.interests.map((item) => (
                  <div key={item.label} className="bg-paper p-6">
                    <dt className="font-mono text-xs tracking-[0.12em] text-stone uppercase">{item.label}</dt>
                    <dd className="mt-2 text-lg font-medium">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-page">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.14em] text-lime uppercase">What drives {site.name}</p>
            <p className="mt-8 max-w-5xl font-serif text-[2.4rem] leading-[1.05] text-balance sm:text-7xl">
              “Information only creates opportunity when people can reach it, and understand it.”
            </p>
          </Reveal>
        </div>
      </section>

      <section className="on-light py-24 sm:py-32">
        <div className="container-page grid gap-5 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[2rem] bg-ink p-8 text-white sm:p-12">
              <p className="font-mono text-xs tracking-[0.14em] text-lime uppercase">Mission</p>
              <p className="mt-6 font-display text-2xl leading-[1.25] font-medium tracking-[-0.02em] sm:text-3xl">{mission}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-[2rem] bg-lime p-8 text-ink sm:p-12">
              <p className="font-mono text-xs tracking-[0.14em] uppercase">Vision</p>
              <p className="mt-6 font-display text-2xl leading-[1.25] font-medium tracking-[-0.02em] sm:text-3xl">{vision}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="on-light bg-sand py-24 sm:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Values" title="What we hold ourselves to." />
          </Reveal>
          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li key={value.title} className="border-t border-ink/20 pt-6 pb-10">
                <Reveal delay={index * 0.05}>
                  <span className="font-mono text-xs text-clay">0{index + 1}</span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em]">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-clay">{value.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-light py-24 sm:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Where we are"
              title="Honest about our stage."
              intro="We would rather tell you exactly where we are than overstate it."
            />
            <div className="mt-8">
              <ButtonLink href="/insights" variant="outline-light">
                Read our insights
              </ButtonLink>
            </div>
          </Reveal>
          <ol className="lg:col-span-7">
            {milestones.map((item) => (
              <li key={item.label} className="grid gap-2 border-t border-ink/15 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <span className="font-mono text-sm tracking-[0.12em] uppercase">{item.label}</span>
                <p className="text-lg leading-relaxed text-stone">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Want to work with us as we grow?"
        text="We welcome conversations with prospective clients, partners and communities."
        primary={{ label: "Get in touch", href: "/contact" }}
        image={photos.benchLaptop}
      />
    </>
  );
}
