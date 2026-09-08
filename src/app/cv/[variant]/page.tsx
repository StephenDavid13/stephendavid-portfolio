import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CVPrintView } from "@/components/CVPrintView";
import { DownloadCVButton } from "@/components/DownloadCVButton";
import { loadCV } from "@/app/utils/loadAbout";
import { identity } from "@/app/resources";
import { CV_VARIANTS, CV_VARIANT_SLUGS, isCVVariant } from "@/lib/cv";

/**
 * Print source for a CV variant.
 *
 * The layout already renders the default CV as a hidden print root on every
 * page, which is what `/about` prints. This route exists so the other variants
 * have a URL of their own to print: it renders its variant's print root inside
 * <main>, and the `:has()`-scoped rules in CVPrintView.print.scss swap the
 * layout-level default out for it. On screen the print root stays hidden, so
 * the small block below is what a visitor actually sees.
 */

export function generateStaticParams(): { variant: string }[] {
  return CV_VARIANT_SLUGS.map((variant) => ({ variant }));
}

const LABEL = "font-mono text-[0.625rem] uppercase tracking-[0.2em]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  if (!isCVVariant(variant)) return {};

  return {
    title: `${CV_VARIANTS[variant].label} – ${identity.name}`,
    description: CV_VARIANTS[variant].blurb,
    // Print sources aren't content, so keep them out of search results and the
    // sitemap so only /about ranks for the CV.
    robots: { index: false, follow: false },
  };
}

export default async function CVVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  if (!isCVVariant(variant)) notFound();

  const { frontmatter } = loadCV(variant);
  const config = CV_VARIANTS[variant];

  return (
    <>
      <section className="mx-auto flex max-w-[1240px] flex-col items-start gap-6 px-6 py-28 md:px-10 md:py-40">
        <p className={LABEL} style={{ color: "var(--accent)" }}>
          {config.label}
        </p>
        <h1 className="text-display max-w-[22ch] text-[clamp(2.25rem,6vw,4rem)] font-semibold">
          {frontmatter.header?.role ?? identity.role}
        </h1>
        <p className="max-w-[52ch] text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {config.blurb}
        </p>
        <DownloadCVButton cv={variant} size="m" variant="primary" />
        <p className="max-w-[52ch] text-sm leading-relaxed" style={{ color: "var(--fg-faint)" }}>
          Printing this page produces the same document; it is the source the PDF is
          generated from.
        </p>
      </section>

      <CVPrintView frontmatter={frontmatter} />
    </>
  );
}
