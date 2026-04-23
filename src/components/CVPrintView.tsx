import { identity } from "@/app/resources";
import type { AboutFrontmatter } from "@/app/utils/loadAbout";
import styles from "./CVPrintView.module.scss";
import "./CVPrintView.print.scss";

interface CVPrintViewProps {
  frontmatter: AboutFrontmatter;
}

export function CVPrintView({ frontmatter }: CVPrintViewProps) {
  return (
    <div className={styles.cvRoot} data-cv-print-root="true" aria-hidden="true">
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.name}>{identity.name}</h1>
          <p className={styles.subline}>
            {identity.role} | {identity.location}
          </p>
          <p className={styles.contactLine}>
            <a href={`mailto:${identity.emailAlt}`}>{identity.emailAlt}</a>
            <span className={styles.pipe}>|</span>
            <a href={`tel:${identity.phone.replace(/\s+/g, "")}`}>{identity.phone}</a>
            <span className={styles.pipe}>|</span>
            <a
              href={`https://${identity.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {identity.website}
            </a>
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Professional Summary</h2>
          <p className={styles.paragraph}>{frontmatter.summary}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Core Skills</h2>
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
          <h2 className={styles.sectionHeading}>Professional Experience</h2>
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
          <h2 className={styles.sectionHeading}>Education</h2>
          {frontmatter.education.map((edu, idx) => (
            <div key={`${edu.institution}-${idx}`} className={styles.educationBlock}>
              <p className={styles.educationDegree}>{edu.degree}</p>
              <p className={styles.educationInstitution}>{edu.institution}</p>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>References</h2>
          <p className={styles.paragraph}>{frontmatter.references}</p>
        </section>
      </div>
    </div>
  );
}
