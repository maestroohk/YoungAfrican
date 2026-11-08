import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const buttonTones = {
  blue: "bg-blue text-white hover:bg-blue-deep",
  ink: "bg-ink text-white hover:bg-blue",
  white: "bg-white text-blue-deep hover:bg-mango hover:text-mango-ink",
  mango: "bg-mango text-mango-ink hover:bg-white",
  "mango-ink": "bg-mango-ink text-white hover:bg-ink",
  outline: "ring-2 ring-current/25 hover:ring-current",
};

export function ButtonLink({
  href,
  children,
  tone = "blue",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof buttonTones;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold transition-colors sm:px-6 ${buttonTones[tone]} ${className}`}
    >
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function Rings({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 800 800" className={className}>
      {[120, 210, 300, 390].map((radius) => (
        <circle key={radius} cx="400" cy="400" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${className}`}>{children}</p>;
}

export const heading = "text-[2.4rem] leading-[1] font-semibold tracking-[-0.045em] text-balance sm:text-6xl";

const heroTones = {
  blue: { section: "bg-blue text-white on-dark", eyebrow: "bg-white/15", intro: "text-white/85", rings: "text-white/12" },
  night: { section: "bg-night text-white on-dark", eyebrow: "bg-blue/30 text-blue-soft", intro: "text-white/75", rings: "text-white/8" },
  mango: { section: "bg-mango text-mango-ink", eyebrow: "bg-mango-ink/10", intro: "text-mango-ink/80", rings: "text-mango-ink/10" },
  paper: { section: "bg-paper text-ink", eyebrow: "bg-blue/10 text-blue", intro: "text-muted", rings: "text-ink/6" },
};

export function PageHero({
  tone,
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  tone: keyof typeof heroTones;
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const t = heroTones[tone];
  return (
    <section className={`relative isolate overflow-hidden ${t.section}`}>
      <Rings className={`absolute -right-72 -bottom-96 -z-10 w-[64rem] ${t.rings}`} />
      <div className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <Eyebrow className={t.eyebrow}>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.05em] text-balance sm:text-7xl">{title}</h1>
          {intro && <p className={`mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${t.intro}`}>{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
