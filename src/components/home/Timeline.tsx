"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { Reveal } from "@/components/motion/Reveal";

export type Role = {
  company: string;
  role: string;
  timeframe: string;
  summary: string;
};

/**
 * Career rail. The vertical line draws itself as the section scrolls.
 * Motivation: storytelling. The line is the through-line of the career, so
 * tying its length to scroll is the one place scroll-linked motion carries
 * meaning here rather than decoration.
 */
export function Timeline({ roles }: Readonly<{ roles: Role[] }>) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  if (!roles.length) return null;

  return (
    <section aria-labelledby="experience" className="py-20 md:py-28">
      <Reveal>
        <div className="flex items-baseline justify-between gap-6">
          <h2
            id="experience"
            className="text-display text-[clamp(1.75rem,4vw,3rem)] font-medium"
          >
            Where I have worked
          </h2>
          <Link
            href="/about"
            className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[var(--accent)]"
            style={{ color: "var(--fg-faint)" }}
          >
            Full CV
          </Link>
        </div>
      </Reveal>

      <div ref={ref} className="relative mt-12 pl-8 md:pl-12">
        <div
          className="absolute bottom-1 left-0 top-1 w-px overflow-hidden"
          style={{ background: "var(--rule)" }}
          aria-hidden="true"
        >
          <motion.span
            className="block h-full w-full origin-top"
            style={{
              scaleY: reduce ? 1 : scaleY,
              background: "var(--accent)",
            }}
          />
        </div>

        <ol className="flex flex-col gap-12">
          {roles.map((role, i) => (
            <motion.li
              key={`${role.company}-${role.timeframe}`}
              className="relative"
              initial={reduce ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="absolute top-2 h-[7px] w-[7px] rounded-full"
                style={{
                  left: "calc(-2rem - 3px)",
                  background: "var(--bg)",
                  boxShadow: "0 0 0 1px var(--accent)",
                }}
                aria-hidden="true"
              />
              <p
                className="font-mono text-[0.6875rem] tracking-[0.1em]"
                style={{ color: "var(--fg-faint)" }}
              >
                {role.timeframe}
              </p>
              <h3 className="mt-2 text-xl font-medium tracking-tight md:text-2xl">
                {role.role}
                <span style={{ color: "var(--fg-faint)" }}> at </span>
                <span style={{ color: "var(--accent)" }}>{role.company}</span>
              </h3>
              {role.summary ? (
                <p
                  className="mt-2 max-w-[62ch] text-sm leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {role.summary}
                </p>
              ) : null}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
