import { identity, social } from "@/app/resources";
import type { AboutFrontmatter } from "@/app/utils/loadAbout";
import styles from "./CVPrintView.module.scss";
import "./CVPrintView.print.scss";

const CONTACT_ICONS: Record<string, string> = {
  email:
    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  phone:
    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  website:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.08 16zm2.95-8H5.08a7.99 7.99 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a12.3 12.3 0 0 1 6 0c2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
};

function ContactIcon({ name }: Readonly<{ name: string }>) {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={CONTACT_ICONS[name]} />
    </svg>
  );
}

/** Profile URLs print without the protocol so the contact line stays short. */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

const socialLink = (name: string) => social.find((s) => s.name === name)?.link ?? "";

interface Contact {
  id: string;
  href: string;
  text: string;
  external?: boolean;
}

/** Drops the falsy entries left behind by an omitted header field. */
const present = (...items: (Contact | string | false | undefined)[]) =>
  items.filter((item): item is Contact => Boolean(item) && typeof item !== "string");

interface CVPrintViewProps {
  frontmatter: AboutFrontmatter;
}

export function CVPrintView({ frontmatter }: CVPrintViewProps) {
  // The MDX frontmatter is the source of truth for everything printed here.
  // A missing field falls back to the site-wide identity; an explicit "" drops
  // the line, so a variant can omit e.g. a phone number without code changes.
  const header = frontmatter.header ?? {};
  const name = header.name ?? identity.name;
  const email = header.email ?? identity.emailAlt;
  const phone = header.phone ?? identity.phone;
  const website = header.website ?? identity.website;
  const linkedin = header.linkedin ?? socialLink("LinkedIn");
  const github = header.github ?? socialLink("GitHub");

  const subline = [
    header.role ?? identity.role,
    header.location ?? identity.cvLocation,
    header.availability ?? identity.cvAvailability,
  ].filter(Boolean);

  const contacts = present(
    email && { id: "email", href: `mailto:${email}`, text: email },
    phone && { id: "phone", href: `tel:${phone.replace(/\s+/g, "")}`, text: phone },
    website && { id: "website", href: `https://${website}`, text: website, external: true },
    linkedin && { id: "linkedin", href: linkedin, text: displayUrl(linkedin), external: true },
    github && { id: "github", href: github, text: displayUrl(github), external: true },
  );

  /** Heading wording comes from `sections` in the MDX, keyed by id. */
  const heading = (id: string, fallback: string) =>
    frontmatter.sections?.find((section) => section.id === id)?.title ?? fallback;

  return (
    <div className={styles.cvRoot} data-cv-print-root="true" aria-hidden="true">
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.name}>{name}</h1>
          {subline.length ? <p className={styles.subline}>{subline.join(" | ")}</p> : null}
          {contacts.length ? (
            <p className={styles.contactLine}>
              {contacts.map((contact) => (
                <a
                  key={contact.id}
                  href={contact.href}
                  {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <ContactIcon name={contact.id} />
                  {contact.text}
                </a>
              ))}
            </p>
          ) : null}
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>{heading("summary", "Professional Summary")}</h2>
          <p className={styles.paragraph}>{frontmatter.summary}</p>
        </section>

        {frontmatter.leadership?.length ? (
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>
              {heading("leadership", "Leadership Highlights")}
            </h2>
            <ul className={styles.highlights}>
              {frontmatter.leadership.map((item) => (
                <li key={item.label}>
                  <span className={styles.highlightLabel}>{item.label}:</span> {item.detail}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>{heading("skills", "Core Skills")}</h2>
          <div className={styles.skillList}>
            {frontmatter.skills.map((group) => (
              <p key={group.group} className={styles.skillRow}>
                <span className={styles.skillGroup}>{group.group}:</span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>
            {heading("experience", "Professional Experience")}
          </h2>
          {frontmatter.experience.map((exp, idx) => (
            <div key={`${exp.company}-${idx}`} className={styles.experienceBlock}>
              <p className={styles.experienceRole}>
                <strong>{exp.role}</strong>
                <span className={styles.pipe}>|</span>
                {exp.company}
              </p>
              <p className={styles.experienceMeta}>
                {exp.location} · {exp.timeframe}
              </p>
              {exp.summary && <p className={styles.experienceSummary}>{exp.summary}</p>}
              <ul className={styles.achievements}>
                {exp.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>{heading("otherWorks", "Other Works")}</h2>
          {frontmatter.otherWorks.map((work, idx) => (
            <div key={`${work.company}-${idx}`} className={styles.experienceBlock}>
              <p className={styles.experienceRole}>
                <strong>{work.role}</strong>
                <span className={styles.pipe}>|</span>
                {work.company}
              </p>
              <p className={styles.experienceMeta}>
                {work.location} · {work.timeframe}
              </p>
              {work.summary && <p className={styles.experienceSummary}>{work.summary}</p>}
              <ul className={styles.achievements}>
                {work.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>{heading("education", "Education")}</h2>
          {frontmatter.education.map((edu, idx) => (
            <div key={`${edu.institution}-${idx}`} className={styles.educationBlock}>
              <p className={styles.educationDegree}>{edu.degree}</p>
              <p className={styles.educationInstitution}>{edu.institution}</p>
            </div>
          ))}
        </section>

        {frontmatter.references ? (
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>{heading("references", "References")}</h2>
            <p className={styles.paragraph}>{frontmatter.references}</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
