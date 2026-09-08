import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const PORT = process.env.CV_PDF_PORT ?? "3457";

// Same registry the app reads (src/lib/cv.ts imports this file), so adding a
// variant there is all it takes for it to be generated here too.
const VARIANTS_PATH = path.join(projectRoot, "src", "lib", "cv-variants.json");

async function loadVariants() {
  const registry = JSON.parse(await readFile(VARIANTS_PATH, "utf-8"));
  const requested = process.argv.slice(2);

  const unknown = requested.filter((slug) => !(slug in registry));
  if (unknown.length) {
    throw new Error(
      `unknown CV variant(s): ${unknown.join(", ")}. Known: ${Object.keys(registry).join(", ")}`,
    );
  }

  const slugs = requested.length ? requested : Object.keys(registry);
  return slugs.map((slug) => ({ slug, ...registry[slug] }));
}

function waitForReady(child, timeoutMs = 120_000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`next dev did not become ready within ${timeoutMs}ms`));
    }, timeoutMs);

    const onData = (buf) => {
      const text = buf.toString();
      process.stdout.write(text);
      // Next 15 prints "- Local: http://..." once the server is listening.
      if (/Local:\s+http/i.test(text) || /Ready in/i.test(text)) {
        clearTimeout(timer);
        child.stdout.off("data", onData);
        resolve();
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", (buf) => process.stderr.write(buf));
    child.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`next dev exited early with code ${code}`));
    });
  });
}

async function printVariant(page, variant) {
  const targetUrl = `http://localhost:${PORT}${variant.printPath}`;
  const outputPath = path.join(projectRoot, "public", variant.pdf);

  console.log(`[cv-pdf] ${variant.slug}: visiting ${targetUrl}…`);
  // Dev mode compiles the page on first request, which can race ahead of
  // networkidle. Wait for the CV marker element before printing.
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 180_000 });
  await page.waitForSelector("[data-cv-print-root]", { timeout: 180_000 });
  await page.waitForNetworkIdle({ idleTime: 1000, timeout: 60_000 }).catch(() => {});

  await mkdir(path.dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });

  console.log(`[cv-pdf] ${variant.slug}: wrote ${path.relative(projectRoot, outputPath)}`);
}

async function main() {
  const variants = await loadVariants();
  console.log(`[cv-pdf] generating: ${variants.map((v) => v.slug).join(", ")}`);

  console.log(`[cv-pdf] starting next dev on port ${PORT}…`);
  const dev = spawn("npx", ["--no-install", "next", "dev", "-p", PORT], {
    cwd: projectRoot,
    env: { ...process.env, NODE_ENV: "development" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let browser;
  try {
    await waitForReady(dev);

    console.log("[cv-pdf] launching puppeteer…");
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set the viewport to A4 dimensions at 96dpi so initial screen layout
    // matches the print sheet. deviceScaleFactor 2 keeps PDF text crisp.
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    await page.emulateMediaType("print");

    for (const variant of variants) {
      await printVariant(page, variant);
    }
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    if (!dev.killed) {
      dev.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  console.error("[cv-pdf]", err);
  process.exit(1);
});
