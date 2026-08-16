"use client";

import { useEffect, useState } from "react";

export type TocSection = { id: string; title: string };

/**
 * Sticky section index. Tracks the section in view with IntersectionObserver
 * rather than a scroll listener, so it costs nothing per frame.
 */
export function TableOfContents({ sections }: Readonly<{ sections: TocSection[] }>) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-24 hidden self-start lg:block">
      <p
        className="font-mono text-[0.625rem] uppercase tracking-[0.2em]"
        style={{ color: "var(--fg-faint)" }}
      >
        On this page
      </p>
      <ul className="mt-5 flex flex-col gap-1">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-center gap-3 py-1.5 text-sm transition-colors duration-300"
                style={{ color: isActive ? "var(--accent)" : "var(--fg-faint)" }}
              >
                <span
                  className="h-px transition-all duration-300"
                  style={{
                    width: isActive ? "26px" : "12px",
                    background: isActive ? "var(--accent)" : "var(--rule-strong)",
                  }}
                  aria-hidden="true"
                />
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
