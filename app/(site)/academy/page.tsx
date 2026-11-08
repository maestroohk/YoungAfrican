import type { Metadata } from "next";
import { BookOpen, Check, ShieldAlert } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { HeroLesson } from "@/components/Visuals";
import { ChartLesson } from "@/components/ChartLesson";
import { RiskLesson } from "@/components/RiskLesson";
import { crypto, pathways } from "@/content/site";

export const metadata: Metadata = {
  title: "Markets Academy",
  description:
    "An online Markets Academy in preparation: technical analysis, fundamentals and risk management for learners anywhere. Try two interactive lesson previews.",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        tone="mango"
        eyebrow={
          <>
            <BookOpen aria-hidden className="size-4" />
            Markets Academy · Online · In preparation
          </>
        }
        title={
          <>
            Learn markets by doing. <span className="opacity-60">Risk first.</span>
          </>
        }
        intro="Short, interactive lessons for beginners and experienced learners anywhere. We teach process and risk management, never tips, signals or promises of profit."
        aside={<HeroLesson className="mx-auto rotate-2 lg:mr-0" />}
      >
        <ButtonLink href="/contact?service=crypto-education" tone="mango-ink">
          Join the interest list
        </ButtonLink>
        <ButtonLink href="#lesson-chart" tone="outline" arrow={false}>
          Try a lesson preview
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="previews-title" className="bg-mango text-mango-ink">
        <div className="container-page space-y-6 pb-20 lg:pb-28">
          <h2 id="previews-title" className="sr-only">
            Lesson previews
          </h2>
          <div id="lesson-chart" className="scroll-mt-24">
            <ChartLesson />
          </div>
          <div id="lesson-risk" className="scroll-mt-24">
            <RiskLesson />
          </div>
        </div>
      </section>

      <section id="syllabus" aria-labelledby="syllabus-title" className="scroll-mt-16">
        <div className="container-page py-20 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="font-semibold text-blue">Proposed syllabus</p>
              <h2 id="syllabus-title" className={`${heading} mt-4`}>
                Two pathways, <span className="text-muted">one habit: manage risk.</span>
              </h2>
            </div>
            <p className="text-muted lg:pb-2">
              A draft curriculum, subject to change. No courses are on sale, and no dates, prices or instructors have been announced.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {pathways.map((pathway, pathwayIndex) => (
              <div key={pathway.name} className={`rounded-[2rem] p-6 sm:p-8 ${pathwayIndex ? "bg-mango-ink text-white" : "bg-white"}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{pathway.name}</h3>
                  <span className="text-sm opacity-75">{pathway.level}</span>
                </div>
                <ol className="mt-5">
                  {pathway.modules.map((module, index) => (
                    <li key={module.title} className={`border-t ${pathwayIndex ? "border-white/15" : "border-line"}`}>
                      <details className="group">
                        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 py-2 [&::-webkit-details-marker]:hidden">
                          <span className="w-6 text-sm tabular-nums opacity-60">{index + 1}</span>
                          <span className="flex-1 font-medium">{module.title}</span>
                          {"preview" in module && <span className="rounded-full bg-blue px-2.5 py-0.5 text-xs font-semibold text-white">Preview</span>}
                          <span aria-hidden className="text-lg opacity-60 transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="pb-4 pl-9 text-sm leading-relaxed opacity-80">
                          {module.text}{" "}
                          {"preview" in module && (
                            <a href={`#lesson-${module.preview}`} className="font-semibold underline underline-offset-4">
                              Open the preview
                            </a>
                          )}
                        </p>
                      </details>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="bg-white">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">How we teach</p>
            <h2 id="approach-title" className={`${heading} mt-4`}>
              Capital first. <span className="text-muted">Then everything else.</span>
            </h2>
            <ul className="mt-10 space-y-6">
              {crypto.approach.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mango text-mango-ink">
                    <Check aria-hidden className="size-4" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{item.title}</span>
                    <span className="mt-1 block leading-relaxed text-muted">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-[2rem] bg-paper p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Research and guidance on request</h3>
              <ul className="mt-4 space-y-4">
                {crypto.services
                  .filter((service) => service.title !== "Trading education")
                  .map((service) => (
                    <li key={service.title}>
                      <span className="font-semibold">{service.title}. </span>
                      <span className="text-muted">{service.text}</span>
                    </li>
                  ))}
              </ul>
              <ButtonLink href="/contact?service=crypto-research" tone="ink" className="mt-6">
                Ask about research
              </ButtonLink>
            </div>
            <div className="rounded-[2rem] bg-coral/10 p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <ShieldAlert aria-hidden className="size-5 text-coral-deep" />
                What we will never do
              </h3>
              <ul className="mt-4 space-y-2">
                {crypto.boundaries.map((boundary) => (
                  <li key={boundary} className="flex gap-2.5">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-coral-deep" />
                    {boundary}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">Trading involves risk of loss. Nothing on this site is financial advice.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
