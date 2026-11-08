import type { Metadata } from "next";
import { Suspense } from "react";
import { defineQuery } from "next-sanity";
import { Check } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { about, promises, site, story, values as defaultValues } from "@/content/site";
import { isSanityConfigured } from "@/sanity/env";
import { fetchContent } from "@/sanity/lib";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is an African-founded connectivity initiative working to make internet access more affordable and dependable for communities in Uganda.`,
  alternates: { canonical: "/about" },
};

type AboutContent = {
  intro?: string;
  mission?: string;
  vision?: string;
  values?: { title: string; text: string }[];
} | null;

const aboutQuery = defineQuery(`*[_type == "aboutPage"][0] {
  intro, mission, vision, values[] { title, text }
}`);

const milestones = [
  { label: "Now", text: "Establishing the company and confirming registration and licensing requirements in Uganda." },
  { label: "Next", text: "Opening the first service areas and publishing packages, prices and coverage." },
  { label: "Later", text: "Improving coverage, reliability and support as the network grows." },
];

async function AboutWithCms() {
  const cms = isSanityConfigured ? await fetchContent<AboutContent>(aboutQuery) : null;
  return <AboutView cms={cms} />;
}

function AboutView({ cms }: { cms: AboutContent }) {
  const values = cms?.values?.length ? cms.values : defaultValues;

  return (
    <>
      <PageHero
        tone="blue"
        eyebrow="About us"
        title={
          <>
            Connecting communities. <span className="text-mango">Empowering generations.</span>
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
          <blockquote className="on-dark flex flex-col justify-end rounded-[2rem] bg-night p-8 text-white sm:p-10">
            <p className="text-[1.75rem] leading-snug font-semibold tracking-[-0.03em] text-balance">{about.belief}</p>
          </blockquote>
        </div>
      </section>

      <section id="story" aria-labelledby="story-heading">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">Our story</p>
            <h2 id="story-heading" className={`${heading} mt-4`}>
              {story.title}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">Reasons to believe in us</h3>
            <ul className="mt-6 space-y-5">
              {promises.map((promise) => (
                <li key={promise.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                    <Check aria-hidden className="size-4" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block font-semibold">{promise.title}</span>
                    <span className="mt-0.5 block leading-relaxed text-muted">{promise.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="on-dark bg-night text-white">
        <div className="container-page py-20 lg:py-28">
          <h2 id="values-heading" className={heading}>
            What we stand for
          </h2>
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/partners" tone="outline" arrow={false}>
              Partner with us
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
