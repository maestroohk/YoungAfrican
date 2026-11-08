import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "lime" | "outline-dark" | "ink" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  lime: "bg-lime text-ink hover:bg-white",
  "outline-dark": "border border-white/20 text-white hover:border-white hover:bg-white hover:text-ink",
  ink: "bg-ink text-white hover:bg-ink-3",
  "outline-light": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
};

export function ButtonLink({
  href,
  variant = "lime",
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-200 ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-mist" : "text-stone"
      }`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-lime" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow tone={tone === "dark" ? "dark" : "light"}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed text-pretty ${
            tone === "dark" ? "text-mist" : "text-stone"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0">
        <rect width="32" height="32" rx="9" fill="#c8f03c" />
        <path d="M9 9.5 16 18l7-8.5" fill="none" stroke="#0b0c0a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 18v5.5" stroke="#0b0c0a" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-[-0.03em]">
        Young<span className="font-normal">African</span>
      </span>
    </span>
  );
}

type PhotoSource = { src: string; alt: string };

export function Photo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  imageClassName = "",
}: PhotoSource & { className?: string; sizes?: string; priority?: boolean; imageClassName?: string }) {
  return (
    <div className={`overflow-hidden bg-ink-3 ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imageClassName}`} />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  image?: PhotoSource;
}) {
  if (image) {
    return (
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink text-white">
        <Photo {...image} priority className="absolute inset-0 -z-10" imageClassName="hero-zoom" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        <div className="container-page fade-up pt-36 pb-14 sm:pb-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-[2.7rem] leading-[0.98] font-semibold tracking-[-0.04em] text-balance xs:text-5xl sm:text-7xl lg:text-[5.5rem]">
            {title}
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-white/75 text-pretty lg:col-span-6">{intro}</p>
            {children && <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">{children}</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -top-40 right-0 size-[36rem] rounded-full bg-lime/[0.07] blur-3xl" />
      <div className="container-page relative grid gap-12 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:grid-cols-12 lg:items-center">
        <div className="fade-up lg:col-span-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1] font-semibold tracking-[-0.04em] text-balance xs:text-5xl sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist text-pretty">{intro}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="fade-up [animation-delay:150ms] lg:col-span-6">{aside}</div>}
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
  image,
}: {
  title: ReactNode;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: PhotoSource;
}) {
  return (
    <section className="py-10 sm:py-16">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
          {image ? (
            <>
              <Photo {...image} sizes="(min-width: 1280px) 1200px, 100vw" className="absolute inset-0 -z-10" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
            </>
          ) : (
            <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-lime/15 blur-3xl" />
          )}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:col-span-8">
              {title}
            </h2>
            <div className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-white/75">{text}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
                {secondary && (
                  <ButtonLink href={secondary.href} variant="outline-dark">
                    {secondary.label}
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
