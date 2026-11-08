import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Check, Handshake, Wifi } from "lucide-react";
import { ButtonLink, PageHero, heading } from "@/components/ui";
import { hotspot, partnerTypes, photos, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Partner with us",
  description: `Host a ${site.name} hotspot, connect a school or institution, or discuss a reseller partnership.`,
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        tone="night"
        eyebrow={
          <>
            <Handshake aria-hidden className="size-4" />
            Partner with us
          </>
        }
        title={
          <>
            Bring Wi-Fi to <span className="text-blue-soft">the people who visit you.</span>
          </>
        }
        intro="We work with hotspot hosts, landlords, schools, institutions and resellers. Terms depend on the location and are agreed individually, in writing."
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={photos.technician.src} alt={photos.technician.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            <span className="absolute right-3 bottom-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs text-white">Illustrative photograph</span>
          </div>
        }
      >
        <ButtonLink href="/contact?service=hotspot-hosting" tone="white">
          Host a hotspot
        </ButtonLink>
        <ButtonLink href="/contact?service=partnership" tone="outline" arrow={false}>
          Discuss a partnership
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="types-title">
        <div className="container-page py-20 lg:py-28">
          <h2 id="types-title" className={`${heading} max-w-3xl`}>
            Who we partner with
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((partner) => (
              <li key={partner.title} className="rounded-[2rem] bg-white p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{partner.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{partner.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="split-title" className="bg-white">
        <div className="container-page py-20 lg:py-28">
          <h2 id="split-title" className={`${heading} max-w-3xl`}>
            How hosting works
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              { title: "The host provides", items: hotspot.hostProvides, icon: Building2, colour: "bg-paper" },
              { title: "Young African Internet provides", items: hotspot.weProvide, icon: Wifi, colour: "bg-blue text-white" },
            ].map((group) => (
              <div key={group.title} className={`rounded-[2rem] p-6 sm:p-8 ${group.colour}`}>
                <group.icon aria-hidden className="size-6" />
                <h3 className="mt-6 text-xl font-semibold">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 opacity-70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ButtonLink href="/contact?service=institution" tone="ink" className="mt-10">
            Connect a school or institution
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
