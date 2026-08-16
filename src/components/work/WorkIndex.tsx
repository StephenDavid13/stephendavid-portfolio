"use client";

import Image from "next/image";
import Link from "next/link";

import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export type WorkEntry = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  year: string;
  stack: string[];
};

/**
 * Project index. Every row carries its own thumbnail, always visible.
 *
 * An earlier pass stacked covers behind the hero and then tried a
 * cursor-following preview panel; both hid the work behind something else.
 * A thumbnail per row cannot occlude anything and needs no hover, so the
 * projects are legible on first paint and on touch.
 */
export function WorkIndex({ entries }: Readonly<{ entries: WorkEntry[] }>) {
  return (
    <RevealGroup as="ul" className="rule-t" amount={0.05}>
      {entries.map((entry, i) => (
        <RevealItem key={entry.slug} as="li" className="rule-b">
          <Link href={`/work/${entry.slug}`} className="group block py-6 md:py-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
              <span
                className="hidden shrink-0 pt-2 font-mono text-[0.6875rem] tabular-nums md:block"
                style={{ color: "var(--fg-faint)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border md:w-[15rem] lg:w-[17rem]">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 272px"
                  priority={i < 2}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.05]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-medium transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-1.5">
                  {entry.title}
                </h3>
                <p
                  className="mt-3 max-w-[56ch] text-sm leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {entry.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 md:hidden">
                  {entry.stack.slice(0, 3).map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-[0.625rem] uppercase tracking-[0.16em]"
                      style={{ color: "var(--fg-faint)" }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden shrink-0 flex-col items-end gap-1.5 pt-2 md:flex">
                <span
                  className="font-mono text-[0.625rem] uppercase tracking-[0.16em]"
                  style={{ color: "var(--fg-faint)" }}
                >
                  {entry.stack.slice(0, 3).join(" · ")}
                </span>
                <span
                  className="font-mono text-[0.6875rem] tabular-nums"
                  style={{ color: "var(--fg-faint)" }}
                >
                  {entry.year}
                </span>
              </div>
            </div>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
