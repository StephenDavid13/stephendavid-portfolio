import { loadAbout } from "@/app/utils/loadAbout";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { baseURL, about, identity, social } from "@/app/resources";
import { DownloadCVButton } from "@/components/DownloadCVButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TableOfContents } from "@/components/about/TableOfContents";

export async function generateMetadata() {
  const { frontmatter } = loadAbout();
  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    baseURL,
    path: about.path,
  });
}

const SECTIONS = [
  { id: "summary", title: "Summary" },
  { id: "skills", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "other-works", title: "Other works" },
  { id: "education", title: "Education" },
];

const LABEL = "font-mono text-[0.625rem] uppercase tracking-[0.2em]";

function Role({
  role,
  company,
  timeframe,
  location,
  summary,
  achievements,
}: Readonly<{
  role: string;
  company: string;
  timeframe: string;
  location?: string;
  summary?: string;
  achievements?: string[];
}>) {
  return (
    <div className="rule-b pb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium tracking-tight md:text-xl">{role}</h3>
        <span
          className={`${LABEL} shrink-0 tabular-nums`}
          style={{ color: "var(--fg-faint)" }}
        >
          {timeframe}
        </span>
      </div>
      <p className="mt-1 text-sm" style={{ color: "var(--accent)" }}>
        {company}
        {location ? <span style={{ color: "var(--fg-faint)" }}> · {location}</span> : null}
      </p>
      {summary ? (
        <p
          className="mt-3 max-w-[68ch] text-sm leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          {summary}
        </p>
      ) : null}
      {achievements?.length ? (
        <ul className="mt-4 flex flex-col gap-2">
          {achievements.map((item) => (
            <li
              key={item}
              className="relative max-w-[72ch] pl-5 text-sm leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              <span
                className="absolute left-0 top-[0.62em] h-px w-2.5"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function About() {
  const { frontmatter } = loadAbout();
  const external = social.filter((s) => !s.link.startsWith("mailto:"));

  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-24 md:px-10">
      <JsonLd
        as="person"
        baseURL={baseURL}
        path={about.path}
        title={identity.name}
        description={frontmatter.description}
      />

      <Reveal>
        <header className="rule-b pb-14 pt-16 md:pt-24">
          <p className={LABEL} style={{ color: "var(--fg-faint)" }}>
            {identity.role} · {identity.location}
          </p>
          <h1 className="text-display mt-6 text-[clamp(2.75rem,8vw,6rem)] font-semibold">
            {identity.name}
          </h1>
          <p
            className="mt-8 max-w-[68ch] text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {frontmatter.summary}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <DownloadCVButton size="m" variant="primary" />
            <a
              href={`mailto:${identity.email}`}
              className="font-mono text-sm transition-colors duration-300"
              style={{ color: "var(--accent)" }}
            >
              {identity.email}
            </a>
            {external.map((s) => (
              <a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm transition-colors duration-300 hover:text-[var(--accent)]"
                style={{ color: "var(--fg-muted)" }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </header>
      </Reveal>

      <div className="grid gap-14 pt-14 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-20">
        <TableOfContents sections={SECTIONS} />

        <div className="min-w-0">
          <section id="summary" className="pb-16">
            <Reveal>
              <h2 className="rule-b pb-3 text-2xl font-medium tracking-tight">Summary</h2>
              <p
                className="mt-6 max-w-[68ch] text-base leading-[1.75]"
                style={{ color: "var(--fg-muted)" }}
              >
                {frontmatter.summary}
              </p>
            </Reveal>
          </section>

          <section id="skills" className="pb-16">
            <Reveal>
              <h2 className="rule-b pb-3 text-2xl font-medium tracking-tight">Skills</h2>
            </Reveal>
            <RevealGroup as="ul" className="mt-6">
              {frontmatter.skills.map((group) => (
                <RevealItem key={group.group} as="li" className="rule-b py-5">
                  <div className="grid gap-3 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
                    <h3 className={LABEL} style={{ color: "var(--fg-faint)" }}>
                      {group.group}
                    </h3>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm" style={{ color: "var(--fg-muted)" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          <section id="experience" className="pb-16">
            <Reveal>
              <h2 className="rule-b pb-3 text-2xl font-medium tracking-tight">Experience</h2>
            </Reveal>
            <div className="mt-8 flex flex-col gap-8">
              {frontmatter.experience.map((e) => (
                <Reveal key={`${e.company}-${e.timeframe}`}>
                  <Role
                    role={e.role}
                    company={e.company}
                    timeframe={e.timeframe}
                    location={e.location}
                    summary={e.summary}
                    achievements={e.achievements}
                  />
                </Reveal>
              ))}
            </div>
          </section>

          <section id="other-works" className="pb-16">
            <Reveal>
              <h2 className="rule-b pb-3 text-2xl font-medium tracking-tight">Other works</h2>
            </Reveal>
            <div className="mt-8 flex flex-col gap-8">
              {frontmatter.otherWorks.map((e) => (
                <Reveal key={`${e.company}-${e.timeframe}`}>
                  <Role
                    role={e.role}
                    company={e.company}
                    timeframe={e.timeframe}
                    summary={e.summary}
                    achievements={e.achievements}
                  />
                </Reveal>
              ))}
            </div>
          </section>

          <section id="education">
            <Reveal>
              <h2 className="rule-b pb-3 text-2xl font-medium tracking-tight">Education</h2>
              <div className="mt-8 flex flex-col gap-6">
                {frontmatter.education.map((edu) => (
                  <div key={edu.institution}>
                    <h3 className="text-lg font-medium tracking-tight">{edu.institution}</h3>
                    <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
                      {edu.degree}
                    </p>
                  </div>
                ))}
              </div>
              {frontmatter.references ? (
                <p className="mt-10 text-sm" style={{ color: "var(--fg-faint)" }}>
                  References {frontmatter.references.toLowerCase()}
                </p>
              ) : null}
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}
