import Link from "next/link";
import { legalNotice } from "@/content/site";
import { Logo } from "@/components/Header";

const columns = [
  { title: "Products", links: [["Wi-Fi hotspots", "/connectivity"], ["Markets Academy", "/academy"], ["Insights", "/insights"]] },
  {
    title: "Get involved",
    links: [
      ["Host a hotspot", "/contact?service=hotspot-hosting"],
      ["Academy interest list", "/contact?service=crypto-education"],
      ["Partner with us", "/contact?service=partnership"],
    ],
  },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"]] },
];

export function Footer() {
  return (
    <footer className="on-dark bg-night text-white">
      <div className="container-page pt-14 pb-10">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-6">
            <Link href="/" aria-label="YoungAfrican home" className="inline-flex min-h-11 items-center">
              <Logo inverse />
            </Link>
            <p className="mt-3 max-w-sm leading-relaxed text-white/65">
              Community Wi-Fi, markets education and research. African-founded, being established in Uganda.
            </p>
          </div>
          {columns.map((column) => (
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
