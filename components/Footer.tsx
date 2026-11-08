import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { legalNotice, nav, site } from "@/content/site";
import { Logo } from "@/components/ui";

const groups = [
  {
    title: "Services",
    links: [
      { label: "Crypto & Markets", href: "/crypto-markets" },
      { label: "Internet Solutions", href: "/internet-solutions" },
      { label: "Packages", href: "/internet-solutions#packages" },
      { label: "Trading education", href: "/crypto-markets#services" },
    ],
  },
  {
    title: "Company",
    links: nav.filter((item) => !item.href.includes("solutions") && !item.href.includes("crypto")),
  },
];

export async function Footer() {
  "use cache";
  const socials = site.social.filter((item) => item.href);

  return (
    <footer className="bg-ink text-white">
      <div className="container-page pt-20 pb-10">
        <Link
          href="/contact"
          className="group flex flex-col gap-6 border-b border-white/10 pb-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <span className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-8xl">
            Let’s build <span className="font-serif font-normal tracking-[-0.02em] text-lime italic">something</span>
            <br />
            useful together.
          </span>
          <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:rotate-45 sm:size-24">
            <ArrowUpRight aria-hidden className="size-7 sm:size-10" />
          </span>
        </Link>
        <div className="grid gap-12 border-b border-white/10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-mist">{site.description}</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-white/70 hover:text-white" rel="noopener noreferrer" target="_blank">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {groups.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h2 className="font-mono text-xs tracking-[0.14em] text-mist uppercase">{group.title}</h2>
              <ul className="mt-5 space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-1.5 text-white/80 transition-colors hover:text-lime">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs tracking-[0.14em] text-mist uppercase">Contact</h2>
            <ul className="mt-5 space-y-3 text-white/80">
              <li>{site.contact.email}</li>
              <li>{site.contact.phone}</li>
              <li>{site.contact.address}</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-4xl text-sm leading-relaxed text-white/50">{legalNotice}</p>
        <div className="mt-8 flex flex-col gap-3 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.status}.
          </p>
          <p>Built in {site.location}.</p>
        </div>
      </div>
    </footer>
  );
}
