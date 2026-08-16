import { baseURL, identity, about, work } from "@/app/resources";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { getPosts } from "@/app/utils/utils";
import { Reveal } from "@/components/motion/Reveal";
import { WorkIndex, type WorkEntry } from "@/components/work/WorkIndex";

export async function generateMetadata() {
  return buildMetadata({
    title: work.title,
    description: work.description,
    baseURL,
    path: work.path,
  });
}

export default function Work() {
  const entries: WorkEntry[] = getPosts(["src", "app", "work", "projects"])
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    )
    .map((post) => ({
      slug: post.slug,
      title: post.metadata.title,
      summary: post.metadata.summary,
      image: post.metadata.images?.[0] ?? "",
      year: new Date(post.metadata.publishedAt).getFullYear().toString(),
      stack: (post.metadata.technologies ?? []).map((t) => t.name),
    }));

  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-24 md:px-10">
      <JsonLd
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        author={{ name: identity.name, url: `${baseURL}${about.path}` }}
      />

      <Reveal>
        <header className="pb-14 pt-16 md:pt-24">
          <h1 className="text-display text-[clamp(2.75rem,8vw,6rem)] font-semibold">Work</h1>
          <p
            className="mt-6 max-w-[56ch] text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            Client builds and personal projects, most recent first. Agency work in Next.js,
            Payload, WordPress, and Shopify, plus things built for the sake of building them.
          </p>
        </header>
      </Reveal>

      <WorkIndex entries={entries} />
    </div>
  );
}
