"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export type SkillGroup = { group: string; items: string[] };

/**
 * Skills as a specimen list. Each group is a labelled row on a hairline rule,
 * which keeps the page's typographic register rather than turning into a wall
 * of identical cards.
 */
export function Capabilities({ groups }: Readonly<{ groups: SkillGroup[] }>) {
  if (!groups.length) return null;

  return (
    <section aria-labelledby="capabilities" className="py-20 md:py-28">
      <Reveal>
        <h2
          id="capabilities"
          className="text-display text-[clamp(1.75rem,4vw,3rem)] font-medium"
        >
          What I build with
        </h2>
      </Reveal>

      <RevealGroup as="ul" className="rule-t mt-10">
        {groups.map((group) => (
          <RevealItem key={group.group} as="li" className="rule-b py-6">
            <div className="grid gap-4 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
              <h3
                className="font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
                style={{ color: "var(--fg-faint)" }}
              >
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-base transition-colors duration-300 hover:text-[var(--accent)]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
