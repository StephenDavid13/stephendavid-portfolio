import variants from "./cv-variants.json";

/**
 * A CV variant is one MDX source under `src/content` plus the metadata needed
 * to route to it, print it, and offer the resulting PDF for download.
 *
 * `src/lib/cv-variants.json` is the single source of truth: it is imported here
 * for the app and read directly by `scripts/generate-cv-pdf.mjs`, so adding a
 * variant means adding one JSON entry and one MDX file.
 */
export interface CVVariantConfig {
  /** MDX file under `src/content` supplying the frontmatter. */
  file: string;
  /** Short human name, e.g. "Leadership CV". */
  label: string;
  /** Label for the download button. */
  downloadLabel: string;
  /** One line describing who this cut of the CV is for. */
  blurb: string;
  /** Filename of the generated PDF in `public/`, also the download filename. */
  pdf: string;
  /** Route the PDF generator prints to produce this variant. */
  printPath: string;
  /**
   * True for a CV meant to be handed out directly rather than found. Its PDF is
   * added to robots.txt's Disallow list, so it still deploys and stays
   * reachable by URL, but crawlers are asked to leave it out of search results.
   */
  unlisted: boolean;
}

export type CVVariant = keyof typeof variants;

export const CV_VARIANTS: Record<CVVariant, CVVariantConfig> = variants;

export const DEFAULT_CV_VARIANT: CVVariant = "default";

export const CV_VARIANT_SLUGS = Object.keys(CV_VARIANTS) as CVVariant[];

export function isCVVariant(value: string): value is CVVariant {
  return Object.prototype.hasOwnProperty.call(CV_VARIANTS, value);
}

/** Public URL of a variant's PDF. Encoded because the filenames contain spaces. */
export function cvPdfHref(variant: CVVariant): string {
  return `/${encodeURIComponent(CV_VARIANTS[variant].pdf)}`;
}

/**
 * Paths to keep out of search results: the /cv print-source routes, which only
 * duplicate /about, plus the PDF of every variant marked `unlisted`. The PDF is
 * a static file with nowhere to put a noindex tag, so robots.txt is the only
 * lever short of an X-Robots-Tag response header.
 */
export function cvDisallowPaths(): string[] {
  return [
    "/cv/",
    ...CV_VARIANT_SLUGS.filter((variant) => CV_VARIANTS[variant].unlisted).map(cvPdfHref),
  ];
}
