import Link from "next/link";

export type FooterLink = { name: string; link: string };

export function Footer({
  name,
  location,
  email,
  socials,
}: Readonly<{
  name: string;
  location: string;
  email: string;
  socials: FooterLink[];
}>) {
  const year = new Date().getFullYear();
  const external = socials.filter((s) => !s.link.startsWith("mailto:"));

  return (
    <footer className="rule-t">
      <div className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href={`mailto:${email}`}
              className="text-2xl tracking-tight transition-colors duration-300 hover:text-[var(--accent)] md:text-3xl"
            >
              {email}
            </a>
            <p
              className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
              style={{ color: "var(--fg-faint)" }}
            >
              {location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/work"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[var(--accent)]"
              style={{ color: "var(--fg-muted)" }}
            >
              Work
            </Link>
            <Link
              href="/about"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[var(--accent)]"
              style={{ color: "var(--fg-muted)" }}
            >
              About
            </Link>
            {external.map((s) => (
              <a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[var(--accent)]"
                style={{ color: "var(--fg-muted)" }}
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>

        <p
          className="mt-10 font-mono text-[0.6875rem] tracking-[0.14em]"
          style={{ color: "var(--fg-faint)" }}
        >
          © {year} {name}
        </p>
      </div>
    </footer>
  );
}
