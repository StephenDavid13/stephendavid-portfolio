"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Fixed header. Transparent over the page until the first scroll, then it
 * lifts onto a blurred bar with a hairline under it.
 * Motivation: state transition. It marks that the page has moved without
 * spending a scroll indicator on it.
 */
export function Header({ name }: Readonly<{ name: string }>) {
  const pathname = usePathname() ?? "/";
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    // Only re-renders on the crossing, not every frame.
    setLifted((prev) => (prev === next ? prev : next));
  });

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 h-14 transition-[background-color,border-color,backdrop-filter] duration-300",
        lifted
          ? "border-b bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-[0.9375rem] font-medium tracking-tight transition-colors duration-300 hover:text-[var(--accent)]"
        >
          {name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-7">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group relative font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: active ? "var(--fg)" : "var(--fg-faint)" }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:scale-x-100"
                  style={{
                    background: "var(--accent)",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
