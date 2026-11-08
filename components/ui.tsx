import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "dark" | "outline" | "light" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-cobalt text-white hover:bg-cobalt-deep",
  dark: "bg-ink text-ivory hover:bg-charcoal",
  outline: "border border-ink/25 text-ink hover:border-ink",
  light: "bg-ivory text-ink hover:bg-white",
  "outline-light": "border border-white/35 text-white hover:border-white",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-[3px] px-5 text-[0.95rem] font-medium transition-colors duration-200 ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 font-medium underline decoration-current/30 underline-offset-[6px] transition-colors hover:decoration-current ${className}`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Label({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${tone === "dark" ? "text-white/75" : "text-stone"} ${className}`}>
      <span aria-hidden className="h-px w-6 bg-copper" />
      {children}
    </p>
  );
}

export function SectionHeader({
  label,
  title,
  intro,
  tone = "light",
  id,
  children,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`grid gap-6 border-t pt-6 lg:grid-cols-12 lg:gap-10 ${tone === "dark" ? "border-white/15" : "border-rule"}`}>
      <div className="lg:col-span-3">
        <Label tone={tone}>{label}</Label>
      </div>
      <div className="lg:col-span-9">
        <h2 id={id} className="max-w-3xl font-serif text-[2rem] leading-[1.1] font-normal tracking-[-0.015em] text-balance sm:text-[2.6rem]">
          {title}
        </h2>
        {intro && (
          <p className={`mt-4 max-w-2xl text-lg leading-relaxed text-pretty ${tone === "dark" ? "text-white/80" : "text-stone"}`}>{intro}</p>
        )}
        {children}
      </div>
    </div>
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
  caption,
}: PhotoSource & { className?: string; sizes?: string; priority?: boolean; imageClassName?: string; caption?: ReactNode }) {
  const frame = (
    <div className={`overflow-hidden rounded-[2px] bg-linen ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imageClassName}`} />
    </div>
  );
  if (!caption) return frame;
  return (
    <figure>
      {frame}
      <figcaption className="mt-2.5 text-sm text-stone">{caption}</figcaption>
    </figure>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0">
        <rect width="32" height="32" rx="3" fill="#2343c4" />
        <path d="M9.5 9 16 17.5 22.5 9" fill="none" stroke="#f5f1e8" strokeWidth="2.4" strokeLinecap="square" />
        <path d="M16 17.5V24" stroke="#f5f1e8" strokeWidth="2.4" strokeLinecap="square" />
      </svg>
      <span className={`text-[1.15rem] font-semibold tracking-[-0.02em] ${tone === "light" ? "text-white" : "text-ink"}`}>
        YoungAfrican
      </span>
    </span>
  );
}

export function PageHeader({
  label,
  title,
  intro,
  children,
  aside,
}: {
  label: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-rule">
      <div className="container-page grid gap-10 pt-12 pb-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-16">
        <div className="rise lg:col-span-7">
          <Label>{label}</Label>
          <h1 className="mt-5 max-w-3xl font-serif text-[2.4rem] leading-[1.05] font-normal tracking-[-0.02em] text-balance sm:text-[3.4rem] lg:text-[4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone text-pretty">{intro}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="rise [animation-delay:120ms] lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
