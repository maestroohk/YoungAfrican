"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

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

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ivory/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:bg-cobalt focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative inline-flex h-16 items-center text-[0.95rem] transition-colors ${
                    isActive(item.href)
                      ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-copper"
                      : "text-stone hover:text-ink"
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
            aria-current={isActive("/contact") ? "page" : undefined}
            className="hidden min-h-10 items-center rounded-[3px] bg-ink px-4 text-sm font-medium text-ivory transition-colors hover:bg-cobalt sm:inline-flex"
          >
            Contact us
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-[3px] border border-rule transition-colors hover:border-ink lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule bg-ivory lg:hidden">
          <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between pt-4 pb-10">
            <ul className="divide-y divide-rule border-b border-rule">
              {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((item, index) => (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-serif text-[1.75rem] leading-tight"
                  >
                    {item.label}
                    <ArrowRight aria-hidden className={`size-5 ${pathname === item.href ? "text-copper" : "text-stone/50"}`} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-stone">
              {site.name} · {site.status} · {site.location}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
