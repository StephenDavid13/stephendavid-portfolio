import type { Metadata } from "next";

type MetaInput = {
  title: string;
  description: string;
  baseURL: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  author?: { name: string; url?: string };
};

const trimBase = (url: string) => (url.endsWith("/") ? url.slice(0, -1) : url);
const isAbsolute = (url: string) => /^https?:\/\//.test(url);

export function absoluteUrl(baseURL: string, path = "") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${trimBase(baseURL)}${p === "/" ? "" : p}`;
}

export function ogImageFor(baseURL: string, title: string, image?: string) {
  if (!image) return `${trimBase(baseURL)}/og?title=${encodeURIComponent(title)}`;
  return isAbsolute(image) ? image : absoluteUrl(baseURL, image);
}

/** Page metadata. Replaces the Once UI Meta module with the same output shape. */
export function buildMetadata({
  title,
  description,
  baseURL,
  path = "",
  type = "website",
  image,
  publishedTime,
  author,
}: MetaInput): Metadata {
  const url = absoluteUrl(baseURL, path);
  const ogImage = ogImageFor(baseURL, title, image);

  return {
    title,
    description,
    metadataBase: new URL(trimBase(baseURL)),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type,
      url,
      images: [{ url: ogImage, alt: title }],
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(author ? { authors: [{ name: author.name, url: author.url }] } : {}),
  };
}

type JsonLdProps = {
  as: "webPage" | "article" | "person";
  baseURL: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  publishedTime?: string;
  author?: { name: string; url?: string };
};

const TYPE_MAP = {
  webPage: "WebPage",
  article: "Article",
  person: "Person",
} as const;

/** JSON-LD block. Replaces the Once UI Schema module. */
export function JsonLd({
  as,
  baseURL,
  path,
  title,
  description,
  image,
  publishedTime,
  author,
}: JsonLdProps) {
  const url = absoluteUrl(baseURL, path);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": TYPE_MAP[as],
    url,
    ...(as === "person"
      ? { name: title, description }
      : { name: title, headline: title, description }),
    ...(image ? { image: ogImageFor(baseURL, title, image) } : {}),
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(author
      ? { author: { "@type": "Person", name: author.name, ...(author.url ? { url: author.url } : {}) } }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
