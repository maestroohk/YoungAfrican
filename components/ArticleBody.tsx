import Image from "next/image";
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
    normal: ({ children }) => <p className="my-5">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 mb-3 font-sans text-[1.45rem] leading-snug font-semibold tracking-[-0.01em] text-ink">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 mb-2 font-sans text-[1.15rem] font-semibold text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-copper pl-5 text-[1.35rem] leading-snug text-ink italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6 marker:text-copper">{children}</ul>,
    number: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-copper">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-cobalt underline decoration-cobalt/35 underline-offset-[3px] hover:decoration-cobalt"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: BodyImage }) => {
      if (!value.asset) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1600).fit("max").url()}
            alt={value.alt ?? ""}
            width={value.dimensions?.width ?? 1600}
            height={value.dimensions?.height ?? 1000}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="h-auto w-full rounded-[2px]"
          />
          {value.caption && <figcaption className="mt-2.5 font-sans text-sm text-stone">{value.caption}</figcaption>}
        </figure>
      );
    },
    callout: ({ value }: { value: { text: string } }) => (
      <aside className="my-8 border-l-2 border-copper bg-linen px-5 py-4 font-sans text-base leading-relaxed text-charcoal">
        {value.text}
      </aside>
    ),
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="font-serif text-[1.2rem] leading-[1.7] text-charcoal [&>*:first-child]:mt-0">
      <PortableText value={value} components={components} />
    </div>
  );
}
