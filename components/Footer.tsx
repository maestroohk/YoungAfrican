import Link from "next/link";
import { legalNotice, site } from "@/content/site";
import { ButtonLink, Logo } from "@/components/ui";

const groups = [
  {
    title: "Community Wi-Fi",
    links: [
      { label: "How hotspots work", href: "/internet-solutions#how-it-works" },
      { label: "Access options", href: "/internet-solutions#access" },
      { label: "Host a hotspot", href: "/internet-solutions#host" },
    ],
  },
  {
    title: "Markets",
    links: [
      { label: "Research and education", href: "/crypto-markets" },
      { label: "Approach to risk", href: "/crypto-markets#risk" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Founder", href: "/about#founder" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export async function Footer() {
  "use cache";
  const socials = site.social.filter((item) => item.href);
  const contacts = [
    site.contact.email && { label: site.contact.email, href: `mailto:${site.contact.email}` },
    site.contact.phone && { label: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
  ].filter((item): item is { label: string; href: string } => Boolean(item));

  return (
    <footer className="on-dark bg-ink text-ivory">
      <div className="container-page">
        <div className="grid gap-8 border-b border-white/12 py-12 sm:py-14 lg:grid-cols-12 lg:items-end">
          <h2 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.015em] text-balance sm:text-[2.6rem] lg:col-span-8">
            Asking about a hotspot, hosting one, or our education work? We would like to hear from you.
          </h2>
          <div className="lg:col-span-4 lg:text-right">
            <ButtonLink href="/contact" variant="light">
              Send an enquiry
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs leading-relaxed text-mist">
              Community Wi-Fi hotspots and market education, built in {site.location}.
            </p>
            {contacts.length > 0 ? (
              <ul className="mt-5 space-y-1">
                {contacts.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-ivory underline decoration-white/30 underline-offset-4 hover:decoration-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
                Direct contact details will be listed here soon. Until then, the{" "}
                <Link href="/contact" className="text-ivory underline underline-offset-4">
                  enquiry form
                </Link>{" "}
                reaches us.
              </p>
            )}
          </div>

          {groups.map((group, index) => (
            <div key={group.title} className={`lg:col-span-2 ${index === 0 ? "lg:col-start-7" : ""}`}>
              <h3 className="label text-mist">{group.title}</h3>
              <ul className="mt-4 space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-1.5 text-ivory/85 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 py-8 text-sm text-mist lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-2xl leading-relaxed">{legalNotice}</p>
          <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-2">
            {socials.map((item) => (
              <a key={item.label} href={item.href} rel="noopener noreferrer" target="_blank" className="hover:text-white">
                {item.label}
              </a>
            ))}
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
