import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { footerNav, legalNotice, site } from "@/content/site";
import { Logo } from "@/components/Header";

export function Footer() {
  return (
    <footer className="on-dark bg-night text-white">
      <div className="container-page pt-14 pb-10">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-6">
            <Link href="/" aria-label="Young African Internet home" className="inline-flex min-h-11 items-center">
              <Logo inverse />
            </Link>
            <p className="mt-3 text-lg font-semibold text-mango">{site.tagline}</p>
            <a href={`mailto:${site.contact.email}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-white/75 hover:text-white">
              <Mail aria-hidden className="size-4" />
              {site.contact.email}
            </a>
            <p className="flex flex-wrap items-center gap-x-4 text-white/75">
              <Phone aria-hidden className="size-4" />
              {site.contact.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className="inline-flex min-h-11 items-center hover:text-white">
                  {phone.label}
                </a>
              ))}
            </p>
          </div>
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <p className="text-sm font-semibold">{column.title}</p>
              <ul className="mt-3">
                {column.links.map(([text, href]) => (
                  <li key={text}>
                    <Link href={href} className="inline-flex min-h-10 items-center text-sm text-white/65 hover:text-white">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/55">{legalNotice}</p>
      </div>
    </footer>
  );
}
