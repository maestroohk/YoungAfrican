"use client";

import { Suspense, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";

const inverseMark = { "--mark-bg": "#fff", "--mark-fg": "var(--color-blue)" } as CSSProperties;

export function Mark({ className = "size-7", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={inverse ? inverseMark : undefined} aria-hidden>
      <rect width="32" height="32" rx="9" fill="var(--mark-bg, var(--color-blue))" />
      <circle cx="10" cy="22" r="2.6" fill="var(--mark-fg, #fff)" />
      <path d="M10 14.5a7.5 7.5 0 0 1 7.5 7.5" fill="none" stroke="var(--mark-fg, #fff)" strokeWidth="2.6" strokeLinecap="round" />
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
        <Link href="/" aria-label="Young African Internet home" className="flex min-h-11 items-center">
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
