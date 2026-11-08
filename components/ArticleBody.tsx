import Image from "next/image";
import { Info } from "lucide-react";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib";

type BodyImage = {
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
  dimensions?: { width: number; height: number };
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-6">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-14 mb-4 font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-ink">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-10 mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-lime pl-6 font-serif text-3xl leading-snug text-ink italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 space-y-3">{children}</ul>,
    number: ({ children }) => <ol className="my-6 list-decimal space-y-3 pl-6 marker:font-mono marker:text-stone">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-4">
        <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-ink" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: BodyImage }) => {
      if (!value.asset) return null;
      const width = value.dimensions?.width ?? 1600;
      const height = value.dimensions?.height ?? 1000;
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1600).fit("max").url()}
            alt={value.alt ?? ""}
            width={width}
            height={height}
            sizes="(min-width: 768px) 44rem, 100vw"
            className="h-auto w-full rounded-2xl"
          />
          {value.caption && <figcaption className="mt-3 text-sm text-stone">{value.caption}</figcaption>}
        </figure>
      );
    },
    callout: ({ value }: { value: { text: string } }) => (
      <aside className="my-10 flex gap-4 rounded-2xl border border-ink/15 bg-sand p-6 text-base leading-relaxed">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
        <p>{value.text}</p>
      </aside>
    ),
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="text-lg leading-[1.8] text-ink/85 [&>*:first-child]:mt-0">
      <PortableText value={value} components={components} />
    </div>
  );
}
