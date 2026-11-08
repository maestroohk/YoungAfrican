import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Gift, Headphones, Info, LifeBuoy, Mail, MapPin, MessageCircle, Newspaper, Package, Signal, Users, Wallet, Wifi } from "lucide-react";
import { ButtonLink, Eyebrow, Rings, heading } from "@/components/ui";
import { HeroPackages, HeroPhone } from "@/components/Visuals";
import { Walkthrough } from "@/components/Walkthrough";
import { InsightsGrid } from "@/components/InsightsGrid";
import { CoverageForm } from "@/components/CoverageForm";
import { connectSteps, founders, partnerTypes, photos, products, reasons, site, usageGap } from "@/content/site";
import { getInsights } from "@/lib/insights";

const reasonIcons = [Wallet, Signal, Gift, Headphones, Info];
const productStyles = [
  { colour: "bg-blue text-white", icon: Package, href: "/packages", action: "View packages" },
  { colour: "on-dark bg-night text-white", icon: Signal, href: "/how-it-works", action: "How it works" },
  { colour: "bg-mango text-mango-ink", icon: Gift, href: "/rewards", action: "About rewards" },
];

const contactTopics = [
  { icon: MapPin, title: "Coverage in my area", service: "coverage" },
  { icon: Package, title: "Packages and prices", service: "packages" },
  { icon: LifeBuoy, title: "Help with my connection", service: "support" },
  { icon: Users, title: "Host a hotspot", service: "hotspot-hosting" },
  { icon: MessageCircle, title: "Something else", service: "other" },
];

async function LatestNews() {
  const insights = await getInsights();
  if (insights.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[2rem] bg-paper p-8">
        <Newspaper aria-hidden className="size-7 text-blue" />
        <p className="max-w-xl text-lg text-muted">News about new coverage areas, planned maintenance, offers and practical guides will appear here.</p>
      </div>
    );
  }
  return <InsightsGrid insights={insights.slice(0, 5)} filter={false} />;
}

export default function HomePage() {
  return (
    <>
      <section data-header="blue" className="on-dark relative isolate overflow-hidden bg-blue text-white">
        <Rings className="absolute -right-72 -bottom-80 -z-10 w-[70rem] text-white/12" />
        <div className="container-page grid gap-8 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:pt-16">
          <div className="lg:pb-24">
            <Eyebrow className="bg-white/15 text-xs sm:text-sm">{site.tagline}</Eyebrow>
            <h1 className="mt-6 text-[3.1rem] leading-[0.95] font-semibold tracking-[-0.055em] xs:text-[3.4rem] sm:text-[5rem] lg:text-[clamp(3.4rem,5.3vw,4.9rem)]">
              <span className="block">Get connected.</span>
              <span className="block text-mango">Stay connected.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">
              Affordable internet for everyday life. Young African Internet is working to bring dependable community connectivity closer to
              households, students, entrepreneurs and local businesses across Uganda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/packages" tone="white" arrow={false}>
                <Package aria-hidden className="size-4" />
                View packages
              </ButtonLink>
              <ButtonLink href="/coverage" tone="mango" arrow={false}>
                <MapPin aria-hidden className="size-4" />
                Check coverage
              </ButtonLink>
              <ButtonLink href="/support" tone="outline" arrow={false}>
                <LifeBuoy aria-hidden className="size-4" />
                Contact support
              </ButtonLink>
            </div>
          </div>

          <div className="relative h-[25rem] sm:h-[33rem] lg:h-auto lg:min-h-[37rem]">
            <div className="absolute inset-y-0 right-0 left-16 overflow-hidden rounded-t-[12rem] bg-blue-deep sm:right-10 sm:left-28 lg:right-8 lg:left-16">
              <Image src={photos.phoneOutdoors.src} alt={photos.phoneOutdoors.alt} fill priority sizes="(min-width: 1024px) 440px, 80vw" className="object-cover object-[50%_25%]" />
            </div>
            <HeroPhone className="absolute bottom-0 -left-6 origin-bottom-left scale-[0.68] sm:bottom-8 sm:left-0 sm:scale-90" />
            <HeroPackages className="absolute top-8 -right-2 hidden sm:block lg:-right-6" />
            <p className="absolute right-2 bottom-2 rounded-full bg-ink/60 px-2.5 py-1 text-[0.68rem] text-white">Illustrative photo and demo screens</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="border-b border-line bg-white">
        <div className="container-page py-8">
          <h2 id="why-title" className="sr-only">
            Why choose Young African Internet
          </h2>
          <ul className="-mx-5 flex snap-x gap-6 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5">
            {reasons.map((reason, index) => {
              const Icon = reasonIcons[index];
              return (
                <li key={reason.title} className="flex w-56 shrink-0 snap-start gap-3 lg:w-auto">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold">{reason.title}</span>
                    <span className="block text-muted">{reason.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="products-title">
        <div className="container-page py-20 lg:py-28">
          <p className="font-semibold text-blue">What we offer</p>
          <h2 id="products-title" className={`${heading} mt-4 max-w-3xl`}>
            Internet that fits <span className="text-muted">everyday budgets.</span>
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {products.map((product, index) => {
              const style = productStyles[index];
              return (
                <li key={product.title}>
                  <Link href={style.href} className={`group flex h-full min-h-72 flex-col rounded-[2rem] p-6 transition-transform hover:-translate-y-1 sm:p-8 ${style.colour}`}>
                    <style.icon aria-hidden className="size-7" />
                    <span className="mt-auto pt-10 text-2xl font-semibold tracking-[-0.03em]">{product.title}</span>
                    <span className="mt-2 leading-relaxed opacity-85">{product.text}</span>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-semibold">
                      {style.action}
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="connect-title" className="on-dark relative isolate overflow-hidden bg-night text-white">
        <Rings className="absolute -top-96 -left-96 -z-10 w-[64rem] text-white/6" />
        <div className="container-page py-20 lg:py-28">
          <Eyebrow className="bg-blue/30 text-blue-soft">
            <Wifi aria-hidden className="size-4" />
            How to get connected
          </Eyebrow>
          <h2 id="connect-title" className={`${heading} mt-5 max-w-3xl`}>
            Five steps, <span className="text-blue-soft">no contract.</span>
          </h2>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {connectSteps.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white/6 p-5 ring-1 ring-white/10">
                <span className="flex size-9 items-center justify-center rounded-full bg-mango text-sm font-bold text-mango-ink">{index + 1}</span>
                <p className="mt-4 font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Walkthrough photo={photos.accessPoint} />
          </div>
          <p className="mt-4 text-sm text-white/60">An interactive demonstration of how hotspot access is planned to work. It does not connect to a network or take payment.</p>
        </div>
      </section>

      <section aria-labelledby="coverage-title" className="bg-mango text-mango-ink">
        <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <h2 id="coverage-title" className={heading}>
              Is your area covered?
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed opacity-85">
              We are preparing our first service areas. Tell us your village, zone or nearest landmark and we will let you know when
              service reaches you.
            </p>
          </div>
          <CoverageForm />
        </div>
      </section>

      <section aria-labelledby="gap-title">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-semibold text-blue">Why connectivity matters</p>
            <h2 id="gap-title" className={`${heading} mt-4`}>
              The signal is there. <span className="text-muted">The cost is the gap.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Many people who are offline already live under a mobile signal. Sharing one good connection through community Wi-Fi can bring
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

      <section aria-labelledby="partners-title" className="bg-white">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={photos.shopkeeper.src} alt={photos.shopkeeper.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            <span className="absolute right-3 bottom-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs text-white">Illustrative photograph</span>
          </div>
          <div>
            <p className="font-semibold text-blue">Partner with us</p>
            <h2 id="partners-title" className={`${heading} mt-4`}>
              Bring Wi-Fi to the people who visit you.
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {partnerTypes.map((partner) => (
                <li key={partner.title} className="flex gap-3">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-blue" />
                  <span>
                    <span className="block font-semibold">{partner.title}</span>
                    <span className="text-sm text-muted">{partner.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/partners" tone="ink" className="mt-8">
              Become a partner
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="founders-title">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-blue">Who we are</p>
              <h2 id="founders-title" className={`${heading} mt-4 max-w-3xl`}>
                African-founded. <span className="text-muted">Community focused.</span>
              </h2>
            </div>
            <ButtonLink href="/about" tone="ink">
              About us
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {founders.map((founder) => (
              <li key={founder.name} className="flex gap-5 rounded-[2rem] bg-white p-6 sm:p-8">
                <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue text-lg font-semibold text-white">
                  {founder.name.replace("Mr ", "").split(" ").map((part) => part[0]).join("")}
                </span>
                <span>
                  <span className="block text-xl font-semibold tracking-[-0.02em]">{founder.name}</span>
                  <span className="block text-sm font-medium text-blue">{founder.role}</span>
                  <span className="mt-2 block leading-relaxed text-muted">{founder.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="news-title" className="bg-white">
        <div className="container-page py-20 lg:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-coral-deep">News and articles</p>
              <h2 id="news-title" className={`${heading} mt-4`}>
                Updates and <span className="font-serif font-normal tracking-[-0.02em] italic">practical guides.</span>
              </h2>
            </div>
            <ButtonLink href="/insights" tone="ink">
              All articles
            </ButtonLink>
          </div>
          <Suspense fallback={<div className="h-80 rounded-[2rem] bg-paper" />}>
            <LatestNews />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="on-dark relative isolate overflow-hidden bg-blue text-white">
        <Rings className="absolute -right-80 -bottom-96 -z-10 w-[70rem] text-white/12" />
        <div className="container-page py-20 lg:py-28">
          <h2 id="contact-title" className={`${heading} max-w-3xl`}>
            How can we <span className="text-mango">help?</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/85">Pick a topic and the contact form opens with it already selected, or email us directly.</p>
          <a href={`mailto:${site.contact.email}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">
            <Mail aria-hidden className="size-4" />
            {site.contact.email}
          </a>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
