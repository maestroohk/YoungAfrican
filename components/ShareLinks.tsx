"use client";

import { useState } from "react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}` },
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
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
      <span className="label text-stone">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          {link.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
      <button type="button" onClick={copy} className="inline-flex min-h-10 items-center underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
