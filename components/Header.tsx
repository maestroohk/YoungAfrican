"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const links = nav.filter((item) => item.href !== "/contact");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-ink/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
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
            href="/contact"
            className="hidden min-h-11 items-center gap-1.5 rounded-full bg-lime px-5 text-sm font-medium text-ink transition-colors hover:bg-white sm:inline-flex"
          >
            Make an enquiry
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-ink lg:hidden">
          <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between pt-6 pb-10">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {[{ label: "Home", href: "/" }, ...nav].map((item, index) => (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-center justify-between py-5 font-display text-3xl font-semibold tracking-[-0.03em]"
                  >
                    {item.label}
                    <ArrowUpRight
                      aria-hidden
                      className={`size-6 ${pathname === item.href ? "text-lime" : "text-white/30"}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-lime text-base font-medium text-ink"
              >
                Make an enquiry
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
              <p className="mt-6 text-center text-sm text-mist">
                {site.status} · {site.location}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
