"use client";

import { Suspense, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";

const inverse = { "--logo-main": "#fff" } as CSSProperties;

export function Mark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 452.5 272" className={className} aria-hidden>
      <path fill="var(--logo-main, var(--color-brand-navy))" d="M7.2 52.7A25 25 0 0 1 24.8 10L186.5 10A8 8 0 0 1 191.7 11.9L216.4 33.2A3 3 0 0 1 214.4 38.5L134.1 38.5A3 3 0 0 0 131.6 39.8L99.8 87.6A6 6 0 0 0 99.9 94.4L118.6 120.7A3 3 0 0 0 121 122L165.6 122A3 3 0 0 1 168.3 123.7L218.5 229.8A12 12 0 0 0 239.8 230.5L313.9 96.8A3 3 0 0 0 312.6 92.6L248.5 63Q271.5 26 452.5 0L298.5 199A14 14 0 0 0 296.2 203.4L275.8 267.8A6 6 0 0 1 270.1 272L178 272A6 6 0 0 1 172.2 267.7L152.8 200.1A10 10 0 0 0 150.3 195.8Z" />
      <path fill="var(--logo-accent, var(--color-brand-gold))" d="M248.5 63Q271.5 26 452.5 0L368.3 56.5A4 4 0 0 0 367 57.8L341.3 103.8A2 2 0 0 1 337.8 103.8L316.5 64Z" />
    </svg>
  );
}

export function Logo({ inverse: reverse = false, product = "Internet" }: { inverse?: boolean; product?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-(--logo-main,var(--color-brand-navy))" style={reverse ? inverse : undefined}>
      <Mark className="h-7 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.12rem] font-semibold tracking-[-0.02em]">YoungAfrican</span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] uppercase">{product}</span>
      </span>
    </span>
  );
}

type Item = { label: string; href: string };

function LinkList({ items, pathname, className, onNavigate }: { items: Item[]; pathname: string; className: string; onNavigate?: () => void }) {
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return items.map((item) => (
    <li key={item.href}>
      <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} onClick={onNavigate} className={className}>
        {item.label}
      </Link>
    </li>
  ));
}

function CurrentLinks(props: { items: Item[]; className: string; onNavigate?: () => void }) {
  return <LinkList {...props} pathname={usePathname()} />;
}

function NavLinks(props: { items: Item[]; className: string; onNavigate?: () => void }) {
  return (
    <Suspense fallback={<LinkList {...props} pathname="" />}>
      <CurrentLinks {...props} />
    </Suspense>
  );
}

export function Header() {
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

  return (
    <header
      data-solid={scrolled || open ? "" : undefined}
      className={`site-header sticky top-0 z-40 border-b transition-[transform,background-color,color,border-color] duration-300 ${hidden && !open ? "-translate-y-full" : ""}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="YoungAfrican Internet home" className="flex min-h-11 items-center">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex gap-1 text-[0.95rem]">
            <NavLinks
              items={nav}
              className="inline-flex min-h-10 items-center rounded-full px-4 transition-colors hover:bg-current/10 aria-[current=page]:bg-current/10 aria-[current=page]:font-semibold"
            />
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/coverage"
            className="hidden min-h-10 items-center rounded-full bg-(--cta-bg) px-5 text-sm font-semibold text-(--cta-fg) transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Check coverage
          </Link>
          <button
            id="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-current/25 xl:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line xl:hidden">
          <ul className="container-page py-3">
            <NavLinks
              items={[...nav, { label: "Support", href: "/support" }, { label: "Contact us", href: "/contact" }]}
              onNavigate={() => setOpen(false)}
              className="flex min-h-14 items-center border-b border-line text-xl font-semibold tracking-[-0.02em] aria-[current=page]:text-blue"
            />
          </ul>
        </nav>
      )}
    </header>
  );
}
