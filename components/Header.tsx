"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";

export function Mark({ className = "size-7", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill={inverse ? "#fff" : "var(--color-blue)"} />
      <circle cx="10" cy="22" r="2.6" fill={inverse ? "var(--color-blue)" : "#fff"} />
      <path d="M10 14.5a7.5 7.5 0 0 1 7.5 7.5" fill="none" stroke={inverse ? "var(--color-blue)" : "#fff"} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M10 7.5A14.5 14.5 0 0 1 24.5 22" fill="none" stroke="var(--color-mango)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[1.08rem] font-semibold tracking-[-0.02em]">
      <Mark inverse={inverse} />
      Young African Internet
    </span>
  );
}

const tones: Record<string, string> = {
  "/": "on-dark border-white/15 bg-blue text-white",
  "/contact": "on-dark border-white/15 bg-blue text-white",
  "/how-it-works": "on-dark border-white/10 bg-night text-white",
  "/rewards": "border-mango-ink/10 bg-mango text-mango-ink",
};

export function Header() {
  return (
    <Suspense fallback={<HeaderBar pathname="" />}>
      <CurrentHeader />
    </Suspense>
  );
}

function CurrentHeader() {
  return <HeaderBar pathname={usePathname()} />;
}

function HeaderBar({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 400);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      document.getElementById("menu-button")?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tone = tones[pathname];
  const light = scrolled || open || !tone;
  const onColour = !light && tone !== tones["/rewards"];
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[transform,background-color,color,border-color] duration-300 ${light ? "border-line bg-white text-ink" : tone} ${
        hidden && !open ? "-translate-y-full" : ""
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Young African Internet home" className="flex min-h-11 items-center">
          <Logo inverse={onColour} />
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex gap-1 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full px-4 transition-colors aria-[current=page]:font-semibold ${
                    light ? "hover:bg-paper aria-[current=page]:bg-paper" : "hover:bg-current/10 aria-[current=page]:bg-current/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/coverage"
            className={`hidden min-h-10 items-center rounded-full px-5 text-sm font-semibold transition-colors sm:inline-flex ${
              light ? "bg-ink text-white hover:bg-blue" : onColour ? "bg-white text-blue-deep hover:bg-mango hover:text-mango-ink" : "bg-mango-ink text-white hover:bg-ink"
            }`}
          >
            Check coverage
          </Link>
          <button
            id="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`inline-flex size-11 items-center justify-center rounded-full border xl:hidden ${light ? "border-line" : "border-current/30"}`}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line xl:hidden">
          <ul className="container-page py-3">
            {[...nav, { label: "Support", href: "/support" }, { label: "Contact us", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center border-b border-line text-xl font-semibold tracking-[-0.02em] aria-[current=page]:text-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
