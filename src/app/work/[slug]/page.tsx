import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { baseURL, identity, about, work } from "@/app/resources";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPosts(["src", "app", "work", "projects"]).map((p) => ({ slug: p.slug }));
}

const resolveSlug = (slug: string | string[]) => (Array.isArray(slug) ? slug.join("/") : slug || "");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts(["src", "app", "work", "projects"]).find(
    (p) => p.slug === resolveSlug(slug),
  );
  if (!post) return {};

  return buildMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL,
    type: "article",
    publishedTime: post.metadata.publishedAt,
    image: post.metadata.images?.[0],
    path: `${work.path}/${post.slug}`,
    author: { name: identity.name, url: `${baseURL}${about.path}` },
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const { slug } = await params;
  const slugPath = resolveSlug(slug);

  const all = getPosts(["src", "app", "work", "projects"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  const index = all.findIndex((p) => p.slug === slugPath);
  const post = all[index];
  if (!post) notFound();

  const next = all[(index + 1) % all.length];
  const cover = post.metadata.images?.[0];

  return (
    <article className="mx-auto max-w-[1240px] px-6 pb-24 md:px-10">
      <JsonLd
        as="article"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        image={cover}
        publishedTime={post.metadata.publishedAt}
        author={{ name: identity.name, url: `${baseURL}${about.path}` }}
      />

      <Reveal y={16}>
        <Link
          href="/work"
          className="group mt-16 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 md:mt-20"
          style={{ color: "var(--fg-faint)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Work
        </Link>

        <header className="rule-b pb-12 pt-8">
          <h1 className="text-display max-w-[18ch] text-[clamp(2.25rem,6.5vw,5rem)] font-semibold">
            {post.metadata.title}
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {post.metadata.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span
              className="font-mono text-[0.6875rem] tracking-[0.12em]"
              style={{ color: "var(--fg-faint)" }}
            >
              {formatDate(post.metadata.publishedAt)}
            </span>
            {post.metadata.link ? (
              <ButtonLink href={post.metadata.link} variant="secondary" size="s">
                Visit site
              </ButtonLink>
            ) : null}
          </div>
        </header>
      </Reveal>

      {cover ? (
        <Reveal y={28}>
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden border">
            <Image
              src={cover}
              alt={post.metadata.title}
              fill
              sizes="(max-width: 900px) 100vw, 1240px"
              priority
              className="object-cover"
            />
          </div>
        </Reveal>
      ) : null}

      <div className="grid gap-14 py-16 md:grid-cols-[minmax(0,1fr)_16rem] md:items-start md:gap-20">
        <Reveal y={20}>
          <div className="[&>*:first-child]:mt-0">
            <CustomMDX source={post.content} />
          </div>
        </Reveal>

        {post.metadata.technologies?.length ? (
          <Reveal y={20}>
            <div className="rule-t pt-6 md:sticky md:top-24">
              <h2
                className="font-mono text-[0.625rem] uppercase tracking-[0.2em]"
                style={{ color: "var(--fg-faint)" }}
              >
                Stack
              </h2>
              <dl className="mt-6 flex flex-col gap-5">
                {post.metadata.technologies.map((tech) => (
                  <div key={tech.name}>
                    <dt className="text-sm font-medium">{tech.name}</dt>
                    <dd
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: "var(--fg-faint)" }}
                    >
                      {tech.role}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ) : null}
      </div>

      {next && next.slug !== post.slug ? (
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            className="rule-t group flex flex-col gap-3 py-12 transition-colors duration-500"
          >
            <span
              className="font-mono text-[0.625rem] uppercase tracking-[0.2em]"
              style={{ color: "var(--fg-faint)" }}
            >
              Next project
            </span>
            <span className="text-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-medium transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-2">
              {next.metadata.title}
            </span>
          </Link>
        </Reveal>
      ) : null}

      <ScrollToHash />
    </article>
  );
}
