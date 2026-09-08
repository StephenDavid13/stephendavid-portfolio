/**
 * Builds the cover letter PDFs.
 *
 * Unlike the CV generator, this never starts Next and adds nothing to src/app:
 * the letters are deliberately off the site, so the HTML is assembled here and
 * handed straight to Chrome. Output goes to a gitignored directory rather than
 * public/, so the PDFs are never committed and never deployed.
 *
 *   npm run build:cl              all variants
 *   npm run build:cl leadership   one variant
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const VARIANTS_PATH = path.join(projectRoot, "src", "lib", "cover-letter-variants.json");
const CONTENT_DIR = path.join(projectRoot, "src", "content");
const OUTPUT_DIR = path.join(projectRoot, "generated", "cover-letters");

/** Keep the debug HTML around; it makes styling problems much easier to see. */
const KEEP_HTML = process.env.CL_KEEP_HTML === "1";

async function loadVariants() {
  const registry = JSON.parse(await readFile(VARIANTS_PATH, "utf-8"));
  const requested = process.argv.slice(2);

  const unknown = requested.filter((slug) => !(slug in registry));
  if (unknown.length) {
    throw new Error(
      `unknown cover letter variant(s): ${unknown.join(", ")}. ` +
        `Known: ${Object.keys(registry).join(", ")}`,
    );
  }

  const slugs = requested.length ? requested : Object.keys(registry);
  return slugs.map((slug) => ({ slug, ...registry[slug] }));
}

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Mirrors the CV's typography (Arial/Calibri for PDF embedding and ATS parsing,
 * the same aqua accent) so the two documents read as a set, but uses the
 * left-aligned letter layout rather than the CV's centred header.
 */
function renderHtml(frontmatter) {
  const header = frontmatter.header ?? {};
  const paragraphs = frontmatter.paragraphs ?? [];

  const contacts = [
    header.location && esc(header.location),
    header.email && `<a href="mailto:${esc(header.email)}">${esc(header.email)}</a>`,
    header.phone &&
      `<a href="tel:${esc(String(header.phone).replace(/\s+/g, ""))}">${esc(header.phone)}</a>`,
    header.website && `<a href="https://${esc(header.website)}">${esc(header.website)}</a>`,
  ].filter(Boolean);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(frontmatter.title ?? "Cover Letter")}</title>
<style>
  @page { size: A4; margin: 20mm 22mm; }

  html, body { margin: 0; padding: 0; }

  body {
    background: #ffffff;
    color: #222222;
    font-family: Calibri, Arial, Helvetica, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a, a:link, a:visited { color: inherit; text-decoration: none; }

  .name {
    margin: 0;
    font-size: 15pt;
    font-weight: 700;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #111111;
  }

  .role { margin: 0.35rem 0 0; font-size: 10pt; color: #555555; }

  .contacts { margin: 0.2rem 0 0; font-size: 9pt; color: #555555; }
  .contacts .sep { color: #999999; padding: 0 0.3rem; }

  hr {
    border: 0;
    border-top: 1px solid #cccccc;
    margin: 4.5mm 0 6mm;
  }

  .re { margin: 0 0 5mm; font-weight: 700; color: #111111; }

  p.body { margin: 0 0 3.6mm; orphans: 2; widows: 2; }

  .sign-off { margin: 6mm 0 0; }
  .signature { margin: 5mm 0 0; font-weight: 700; color: #111111; }
</style>
</head>
<body>
  <h1 class="name">${esc(header.name)}</h1>
  ${header.role ? `<p class="role">${esc(header.role)}</p>` : ""}
  ${
    contacts.length
      ? `<p class="contacts">${contacts.join('<span class="sep">·</span>')}</p>`
      : ""
  }
  <hr>
  ${frontmatter.re ? `<p class="re">${esc(frontmatter.re)}</p>` : ""}
  ${frontmatter.salutation ? `<p class="body">${esc(frontmatter.salutation)}</p>` : ""}
  ${paragraphs.map((text) => `<p class="body">${esc(text)}</p>`).join("\n  ")}
  ${frontmatter.signOff ? `<p class="sign-off">${esc(frontmatter.signOff)}</p>` : ""}
  ${frontmatter.signature ? `<p class="signature">${esc(frontmatter.signature)}</p>` : ""}
</body>
</html>`;
}

async function main() {
  const variants = await loadVariants();
  console.log(`[cover-letter] generating: ${variants.map((v) => v.slug).join(", ")}`);

  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.emulateMediaType("print");

    for (const variant of variants) {
      const raw = await readFile(path.join(CONTENT_DIR, variant.file), "utf-8");
      const { data } = matter(raw);
      const html = renderHtml(data);

      if (KEEP_HTML) {
        const htmlPath = path.join(OUTPUT_DIR, `${variant.slug}.html`);
        await writeFile(htmlPath, html, "utf-8");
        console.log(`[cover-letter] ${variant.slug}: wrote debug ${path.basename(htmlPath)}`);
      }

      await page.setContent(html, { waitUntil: "load" });

      const outputPath = path.join(OUTPUT_DIR, variant.pdf);
      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });

      console.log(
        `[cover-letter] ${variant.slug}: wrote ${path.relative(projectRoot, outputPath)}`,
      );
    }
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((err) => {
  console.error("[cover-letter]", err);
  process.exit(1);
});
