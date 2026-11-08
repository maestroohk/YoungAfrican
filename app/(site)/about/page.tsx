import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { about, founders as defaultFounders, site, values as defaultValues } from "@/content/site";
import { isSanityConfigured } from "@/sanity/env";
import { fetchContent, urlFor } from "@/sanity/lib";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is an African-founded connectivity initiative working to make internet access more affordable and dependable for communities in Uganda.`,
  alternates: { canonical: "/about" },
};

type Founder = { name: string; role?: string; bio?: string; photo?: (SanityImageSource & { asset?: unknown; alt?: string }) | null };

type AboutContent = {
  intro?: string;
  mission?: string;
  vision?: string;
  values?: { title: string; text: string }[];
  founders?: Founder[];
} | null;

const aboutQuery = defineQuery(`*[_type == "aboutPage"][0] {
  intro, mission, vision, values[] { title, text }, founders[] { name, role, bio, photo }
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

function initials(name: string) {
  return name
    .replace(/^Mr\.? |^Mrs\.? |^Ms\.? |^Dr\.? /, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function AboutView({ cms }: { cms: AboutContent }) {
  const values = cms?.values?.length ? cms.values : defaultValues;
  const founders: Founder[] = cms?.founders?.length ? cms.founders : defaultFounders.map((founder) => ({ name: founder.name, role: founder.role, bio: founder.text }));

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

      <section id="founders" aria-labelledby="founders-heading">
        <div className="container-page py-20 lg:py-28">
          <p className="font-semibold text-blue">Founders</p>
          <h2 id="founders-heading" className={`${heading} mt-4 max-w-3xl`}>
            Built by people who believe <span className="text-muted">connectivity creates opportunity.</span>
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {founders.map((founder) => (
              <li key={founder.name} className="flex flex-col gap-6 rounded-[2rem] bg-white p-6 sm:flex-row sm:p-8">
                {founder.photo?.asset ? (
                  <div className="relative size-28 shrink-0 overflow-hidden rounded-3xl">
                    <Image src={urlFor(founder.photo).width(224).height(224).fit("crop").url()} alt={founder.photo.alt ?? founder.name} fill sizes="112px" className="object-cover" />
                  </div>
                ) : (
                  <span aria-hidden className="flex size-28 shrink-0 items-center justify-center rounded-3xl bg-blue text-3xl font-semibold text-white">
                    {initials(founder.name)}
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{founder.name}</h3>
                  {founder.role && <p className="font-medium text-blue">{founder.role}</p>}
                  {founder.bio && <p className="mt-3 leading-relaxed text-muted">{founder.bio}</p>}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Photographs and full biographies will be added once each founder has approved them.</p>
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
