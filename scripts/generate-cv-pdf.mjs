import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const PORT = process.env.CV_PDF_PORT ?? "3457";
const TARGET_URL = `http://localhost:${PORT}/about`;
const OUTPUT_PATH = path.join(projectRoot, "public", "Stephen Lawrence David - CV.pdf");

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

async function main() {
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

    console.log(`[cv-pdf] visiting ${TARGET_URL}…`);
    // Dev mode compiles the page on first request, which can race ahead of
    // networkidle. Wait for the CV marker element before printing.
    await page.goto(TARGET_URL, { waitUntil: "domcontentloaded", timeout: 180_000 });
    await page.waitForSelector("[data-cv-print-root]", { timeout: 180_000 });
    await page.waitForNetworkIdle({ idleTime: 1000, timeout: 60_000 }).catch(() => {});
    await page.emulateMediaType("print");

    await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await page.pdf({
      path: OUTPUT_PATH,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    console.log(`[cv-pdf] wrote ${path.relative(projectRoot, OUTPUT_PATH)}`);
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
