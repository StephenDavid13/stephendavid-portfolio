"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export type SocialLink = { name: string; link: string };

export function Contact({
  email,
  location,
  socials,
}: Readonly<{ email: string; location: string; socials: SocialLink[] }>) {
  const external = socials.filter((s) => !s.link.startsWith("mailto:"));

  return (
    <section aria-labelledby="contact" className="rule-t py-20 md:py-28">
      <Reveal>
        <p
          className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          Open to new work
        </p>

        <h2
          id="contact"
          className="text-display mt-6 max-w-[14ch] text-[clamp(2.25rem,7vw,5.5rem)] font-semibold"
        >
          Let&rsquo;s build something
        </h2>

        <p
          className="mt-8 max-w-[48ch] text-base leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          Based in {location}, working with teams anywhere. Email is the fastest way to
          reach me.
        </p>

        <div className="mt-10">
          <Magnetic strength={0.24}>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center px-7 py-4 font-mono text-sm transition-[filter,transform] duration-300 active:scale-[0.98]"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              {email}
            </a>
          </Magnetic>
        </div>

        <ul className="mt-12 flex flex-wrap gap-8">
          {external.map((s) => (
            <li key={s.name}>
              <a
                href={s.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 text-sm transition-colors duration-300"
                style={{ color: "var(--fg-muted)" }}
              >
                {s.name}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
