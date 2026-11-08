import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Check, Handshake, MapPin, MessageCircle, Newspaper, Wifi } from "lucide-react";
import { ButtonLink, Eyebrow, Rings, heading } from "@/components/ui";
import { HeroLesson, HeroPhone, Interests } from "@/components/Visuals";
import { Walkthrough } from "@/components/Walkthrough";
import { RiskLesson } from "@/components/RiskLesson";
import { InsightsGrid } from "@/components/InsightsGrid";
import { pathways, photos, usageGap } from "@/content/site";
import { getInsights } from "@/lib/insights";

const contactTopics = [
  { icon: Wifi, title: "Wi-Fi near me", text: "Suggest your area for a hotspot", service: "hotspot-availability" },
  { icon: MapPin, title: "Host a hotspot", text: "For shops, schools and community spaces", service: "hotspot-hosting" },
  { icon: BookOpen, title: "Join the Academy list", text: "Hear when the first lessons open", service: "crypto-education" },
  { icon: Handshake, title: "Partner with us", text: "Organisations and investors", service: "partnership" },
  { icon: MessageCircle, title: "Something else", text: "Any other question", service: "other" },
];

const topics = [
  { title: "Markets and money", text: "Risk, charts and how markets really work.", colour: "bg-mango text-mango-ink" },
  { title: "Connectivity", text: "How community networks are built and paid for.", colour: "bg-blue text-white" },
  { title: "Technology and AI", text: "Practical, evidence-based use of new tools.", colour: "bg-coral text-ink" },
];

async function LatestInsights() {
  const insights = await getInsights();
  if (insights.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {topics.map((topic) => (
          <div key={topic.title} className={`flex min-h-40 flex-col rounded-[2rem] p-6 md:min-h-56 ${topic.colour}`}>
            <Newspaper aria-hidden className="size-6" />
            <p className="mt-auto text-2xl font-semibold tracking-[-0.03em]">{topic.title}</p>
            <p className="mt-1 opacity-80">{topic.text}</p>
          </div>
        ))}
        <p className="text-muted md:col-span-3">The first articles are in editorial review and will appear here once published.</p>
      </div>
    );
  }
  return <InsightsGrid insights={insights.slice(0, 5)} filter={false} />;
}

export default function HomePage() {
  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-blue text-white">
        <Rings className="absolute -right-72 -bottom-80 -z-10 w-[70rem] text-white/12" />
        <div className="container-page grid gap-8 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:pt-16">
          <div className="lg:pb-24">
            <Eyebrow className="bg-white/15 text-xs sm:text-sm">African-founded · Wi-Fi in Uganda · Learning online</Eyebrow>
            <h1 className="mt-6 text-[3.1rem] leading-[0.95] font-semibold tracking-[-0.055em] xs:text-[3.4rem] sm:text-[5rem] lg:text-[4.9rem]">
              <span className="block">Get connected.</span>
              <span className="block text-mango">Get confident.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">
              YoungAfrican is building community Wi-Fi you pay for as you go, and a Markets Academy that teaches risk before reward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/connectivity" tone="white" arrow={false}>
                <Wifi aria-hidden className="size-4" />
                <span className="sm:hidden">Wi-Fi demo</span>
                <span className="hidden sm:inline">See how Wi-Fi works</span>
              </ButtonLink>
              <ButtonLink href="/academy" tone="mango" arrow={false}>
                <BookOpen aria-hidden className="size-4" />
                Try a lesson
              </ButtonLink>
            </div>
          </div>

          <div className="relative h-[25rem] sm:h-[33rem] lg:h-auto lg:min-h-[37rem]">
            <div className="absolute inset-y-0 right-0 left-16 overflow-hidden rounded-t-[12rem] bg-blue-deep sm:right-10 sm:left-28 lg:right-8 lg:left-16">
              <Image src={photos.phoneOutdoors.src} alt={photos.phoneOutdoors.alt} fill priority sizes="(min-width: 1024px) 440px, 80vw" className="object-cover object-[50%_25%]" />
            </div>
            <HeroPhone className="absolute bottom-0 -left-6 origin-bottom-left scale-[0.68] sm:bottom-8 sm:left-0 sm:scale-90" />
            <HeroLesson className="absolute top-8 -right-2 hidden sm:block lg:-right-6" />
            <p className="absolute right-2 bottom-2 rounded-full bg-ink/60 px-2.5 py-1 text-[0.68rem] text-white">Illustrative photo and demo screens</p>
          </div>
        </div>
      </section>

      <section aria-label="Where things stand" className="border-b border-line bg-white">
        <ul className="container-page flex snap-x gap-6 overflow-x-auto py-5 text-sm [scrollbar-width:none] lg:grid lg:grid-cols-4">
          {[
            { icon: Wifi, title: "Wi-Fi hotspots", status: "Preparing first sites in Uganda", colour: "bg-blue text-white" },
            { icon: BookOpen, title: "Markets Academy", status: "Curriculum in preparation", colour: "bg-mango text-mango-ink" },
            { icon: Newspaper, title: "Insights", status: "First articles in review", colour: "bg-coral text-ink" },
            { icon: MapPin, title: "The company", status: "Being established in Uganda", colour: "bg-ink text-white" },
          ].map((item) => (
            <li key={item.title} className="flex w-60 shrink-0 snap-start items-center gap-3 lg:w-auto">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.colour}`}>
                <item.icon aria-hidden className="size-4" />
              </span>
              <span>
                <span className="block font-semibold">{item.title}</span>
                <span className="block text-muted">{item.status}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="gap-title">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">Why we started with Wi-Fi</p>
            <h2 id="gap-title" className={`${heading} mt-4`}>
              The signal is there. <span className="text-muted">The cost is the gap.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Most people who are offline already live under a mobile signal. Sharing one good connection through a hotspot can bring
              the cost per person down.
            </p>
            <a href={usageGap.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium underline underline-offset-4">
              Source: {usageGap.source}
              <ArrowUpRight aria-hidden className="size-3.5 shrink-0" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <figure className="rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(13,16,32,0.5)] sm:p-10">
            <p className="text-6xl font-semibold tracking-[-0.05em] text-blue sm:text-7xl">
              {usageGap.figure}
              <span className="text-3xl text-muted sm:text-4xl"> in 100</span>
            </p>
            <div className="mt-6 grid grid-cols-20 gap-1.5" role="img" aria-label={`100 dots, ${usageGap.figure} highlighted`}>
              {Array.from({ length: 100 }, (_, index) => (
                <span key={index} className={`aspect-square rounded-full ${index < usageGap.figure ? "bg-blue" : "bg-ink/12"}`} />
              ))}
            </div>
            <figcaption className="mt-6 leading-relaxed text-muted">
              <span className="font-semibold text-ink">{usageGap.figure}% of people in Sub-Saharan Africa</span> {usageGap.text}
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="wifi-title" className="on-dark relative isolate overflow-hidden bg-night text-white">
        <Rings className="absolute -top-96 -left-96 -z-10 w-[64rem] text-white/6" />
        <div className="container-page py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow className="bg-blue/30 text-blue-soft">
                <Wifi aria-hidden className="size-4" />
                Wi-Fi hotspots · Uganda first
              </Eyebrow>
              <h2 id="wifi-title" className={`${heading} mt-5`}>
                From tap to online, <span className="text-blue-soft">no contract needed.</span>
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {["Free to join", "Pay by time or data", "Vouchers sold locally", "Works on your own phone"].map((feature) => (
                <li key={feature} className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-sm ring-1 ring-white/12">
                  <Check aria-hidden className="size-3.5 text-mango" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12">
            <Walkthrough photo={photos.accessPoint} />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/60">How the service is planned to work. Sites, prices and vouchers will be published before launch.</p>
            <ButtonLink href="/connectivity" tone="white">
              Explore Wi-Fi hotspots
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="academy-title" className="bg-mango text-mango-ink">
        <div className="container-page py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow className="bg-mango-ink/10">
                <BookOpen aria-hidden className="size-4" />
                Markets Academy · Online · In preparation
              </Eyebrow>
              <h2 id="academy-title" className={`${heading} mt-5`}>
                Learn markets by doing. <span className="opacity-60">Risk first.</span>
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="text-lg leading-relaxed opacity-80">
                Short interactive lessons in technical analysis, fundamentals and risk management, for learners anywhere. Process, not
                tips or signals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact?service=crypto-education" tone="mango-ink">
                  Join the interest list
                </ButtonLink>
                <ButtonLink href="/academy" tone="outline" arrow={false}>
                  Explore the Academy
                </ButtonLink>
              </div>
            </div>
          </div>

          <ol aria-label="Foundations pathway" className="-mx-5 mt-14 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-6">
            {pathways[0].modules.map((module, index) => (
              <li key={module.title} className="w-40 shrink-0 snap-start lg:w-auto">
                <Link
                  href={module.preview ? `/academy#lesson-${module.preview}` : "/academy#syllabus"}
                  className={`block h-full rounded-3xl p-4 transition-transform hover:-translate-y-1 ${module.preview ? "bg-white shadow-[0_20px_40px_-25px_rgba(58,36,0,0.6)] ring-2 ring-blue" : "bg-white/45"}`}
                >
                  <span className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${module.preview ? "bg-blue text-white" : "bg-mango-ink/10"}`}>{index + 1}</span>
                  <span className="mt-4 block leading-snug font-semibold">{module.title}</span>
                  <span className={`mt-1 block text-xs font-medium ${module.preview ? "text-blue" : "opacity-70"}`}>{module.preview ? "Preview available" : "Planned"}</span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <RiskLesson />
          </div>
        </div>
      </section>

      <section aria-labelledby="founder-title">
        <div className="container-page grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">The person behind it</p>
            <h2 id="founder-title" className={`${heading} mt-4`}>
              Five interests. <span className="text-muted">One idea.</span>
            </h2>
            <div className="mt-6 space-y-4 font-serif text-[1.3rem] leading-relaxed">
              <p>
                YoungAfrican&rsquo;s founder is a practising pharmacist who taught himself to trade. One taught him to read carefully and
                take responsibility for advice; the other showed him how much risk people take on without guidance.
              </p>
              <p>
                Connectivity, technology and continuous learning tie it together: information only creates opportunity when people can
                reach it, and understand it well enough to use it safely.
              </p>
            </div>
            <ButtonLink href="/about" tone="ink" className="mt-8">
              Read the founder&rsquo;s story
            </ButtonLink>
          </div>
          <Interests />
        </div>
      </section>

      <section aria-labelledby="insights-title" className="bg-white">
        <div className="container-page py-20 lg:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-coral-deep">Insights</p>
              <h2 id="insights-title" className={`${heading} mt-4`}>
                Research, <span className="font-serif font-normal tracking-[-0.02em] italic">made readable.</span>
              </h2>
            </div>
            <ButtonLink href="/insights" tone="ink">
              All insights
            </ButtonLink>
          </div>
          <Suspense fallback={<div className="h-80 rounded-[2rem] bg-paper" />}>
            <LatestInsights />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="on-dark relative isolate overflow-hidden bg-blue text-white">
        <Rings className="absolute -right-80 -bottom-96 -z-10 w-[70rem] text-white/12" />
        <div className="container-page py-20 lg:py-28">
          <h2 id="contact-title" className={`${heading} max-w-3xl`}>
            Where would you like to <span className="text-mango">start?</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/85">Pick a topic and the contact form opens with it already selected.</p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {contactTopics.map((topic) => (
              <li key={topic.service}>
                <Link
                  href={`/contact?service=${topic.service}`}
                  className="group flex h-full flex-col rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 transition-colors hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-white/15 group-hover:bg-blue group-hover:text-white">
                    <topic.icon aria-hidden className="size-5" />
                  </span>
                  <span className="mt-8 text-lg font-semibold">{topic.title}</span>
                  <span className="mt-1 text-sm opacity-80">{topic.text}</span>
                  <ArrowRight aria-hidden className="mt-4 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
