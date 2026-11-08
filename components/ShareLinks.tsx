"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-xs tracking-[0.12em] uppercase opacity-70">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center rounded-full border border-current/20 px-4 text-sm transition-colors hover:border-current"
        >
          {link.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-current/20 px-4 text-sm transition-colors hover:border-current"
      >
        {copied ? <Check aria-hidden className="size-4" /> : <Link2 aria-hidden className="size-4" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
