import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React, { type ReactNode } from "react";

function slugify(input: string) {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

const HEADING_CLASS = {
  1: "text-display mt-14 mb-5 text-[clamp(1.9rem,4vw,2.75rem)] font-semibold",
  2: "mt-14 mb-4 text-2xl font-medium tracking-tight md:text-3xl",
  3: "mt-10 mb-3 text-xl font-medium tracking-tight",
  4: "mt-8 mb-2 text-lg font-medium",
  5: "mt-8 mb-2 text-base font-medium",
  6: "mt-8 mb-2 text-base font-medium",
} as const;

function heading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
  return function H({ children }: { children?: ReactNode }) {
    const label = textOf(children);
    const id = slugify(label);
    return (
      <Tag id={id} className={`group scroll-mt-24 ${HEADING_CLASS[level]}`}>
        <a
          href={`#${id}`}
          aria-label={`Link to ${label}`}
          className="mr-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
          style={{ color: "var(--accent)" }}
        >
          #
        </a>
        {children}
      </Tag>
    );
  };
}

function MdxLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  const cls = "underline decoration-1 underline-offset-4 transition-colors duration-300";
  const style = { color: "var(--accent)" };

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} style={style} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls} style={style} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style} {...props}>
      {children}
    </a>
  );
}

function MdxImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <figure className="my-10">
      <Image src={src} alt={alt} width={1600} height={900} className="w-full border" />
      {alt ? (
        <figcaption className="mt-3 text-sm" style={{ color: "var(--fg-faint)" }}>
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

const components = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  a: MdxLink as never,
  img: MdxImage as never,
  Image: MdxImage as never,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-5 max-w-[68ch] text-[1.0625rem] leading-[1.75]"
      style={{ color: "var(--fg-muted)" }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 max-w-[68ch] list-disc pl-5" style={{ color: "var(--fg-muted)" }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-6 max-w-[68ch] list-decimal pl-5"
      style={{ color: "var(--fg-muted)" }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2 text-[1.0625rem] leading-[1.7]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 border-l-2 pl-6 text-[1.0625rem] leading-[1.7]"
      style={{ borderColor: "var(--accent)", color: "var(--fg-muted)" }}
      {...props}
    />
  ),
  hr: () => <hr className="my-12" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold" style={{ color: "var(--fg)" }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-sm px-1.5 py-0.5 font-mono text-[0.9em]"
      style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto border p-5 font-mono text-sm leading-relaxed"
      style={{ background: "var(--bg-sunken)" }}
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
};

export function CustomMDX(props: Readonly<MDXRemoteProps>) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
