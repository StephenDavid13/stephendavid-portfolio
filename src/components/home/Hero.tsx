"use client";

import Link from "next/link";
import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

import { DownloadCVButton } from "@/components/DownloadCVButton";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Strips trailing punctuation so "end." still matches the accent word "end". */
const bare = (word: string) => word.replace(/[^\w'-]+$/, "");

/**
 * Type-led hero. No imagery here on purpose: the work index directly below is
 * where projects are shown, so nothing is stacked on top of anything else.
 *
 * Motion: the statement rises word by word, then the supporting rows follow.
 * Motivation is storytelling, so the page reads in the order it was built.
 */
export function Hero({
  eyebrow,
  statement,
  accent,
  subline,
  years,
  projectCount,
}: Readonly<{
  eyebrow: string;
  statement: string;
  accent: string;
  subline: string;
  years: string;
  projectCount: number;
}>) {
  const reduce = useReducedMotion();

  // Words are tagged rather than the string being split, so punctuation welded
  // to the final accent word stays with it instead of becoming a loose token
  // with a space in front of it.
  const words = statement.split(" ");
  const accentWords = accent.split(" ");

  let accentStart = -1;
  for (let i = 0; i <= words.length - accentWords.length; i += 1) {
    const slice = words.slice(i, i + accentWords.length).map(bare);
    if (slice.join(" ") === accentWords.join(" ")) {
      accentStart = i;
      break;
    }
  }

  const isAccent = (i: number) =>
    accentStart >= 0 && i >= accentStart && i < accentStart + accentWords.length;

  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28">
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
        style={{ color: "var(--fg-faint)" }}
      >
        {eyebrow}
      </motion.p>

      <h1 className="text-display mt-8 max-w-[16ch] text-[clamp(2.75rem,8.5vw,7rem)] font-semibold">
        {words.map((word, i) => (
          // No clipping mask. The earlier masked reveal wrapped each word in an
          // overflow:hidden box, which cost two separate bugs: it swallowed the
          // spaces between words, and it sheared the overhang off italic
          // glyphs. Fading and lifting each word needs no mask at all, so
          // neither failure can recur.
          <Fragment key={`${word}-${i}`}>
            <motion.span
              className="inline-block"
              style={isAccent(i) ? { color: "var(--accent)", fontStyle: "italic" } : undefined}
              initial={reduce ? false : { opacity: 0, y: "0.28em" }}
              animate={{ opacity: 1, y: "0em" }}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.055, ease: EASE }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </h1>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        className="rule-t mt-14 flex flex-col gap-8 pt-8 md:flex-row md:items-start md:justify-between"
      >
        <p className="max-w-[46ch] text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {subline}
        </p>

        <dl className="flex gap-10">
          <div>
            <dt
              className="font-mono text-[0.625rem] uppercase tracking-[0.18em]"
              style={{ color: "var(--fg-faint)" }}
            >
              Experience
            </dt>
            <dd className="mt-2 text-2xl tabular-nums">{years}</dd>
          </div>
          <div>
            <dt
              className="font-mono text-[0.625rem] uppercase tracking-[0.18em]"
              style={{ color: "var(--fg-faint)" }}
            >
              Projects
            </dt>
            <dd className="mt-2 text-2xl tabular-nums">{projectCount}</dd>
          </div>
        </dl>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
        className="mt-10 flex flex-wrap items-center gap-4"
      >
        <DownloadCVButton size="m" variant="primary" />
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 border px-5 py-3 text-sm transition-colors duration-300"
          style={{ borderColor: "var(--rule-strong)" }}
        >
          <span>View work</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
