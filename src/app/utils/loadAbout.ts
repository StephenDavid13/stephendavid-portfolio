import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { CV_VARIANTS, DEFAULT_CV_VARIANT, type CVVariant } from "@/lib/cv";

export interface AboutSection {
  id: string;
  title: string;
}

export interface AboutSkillGroup {
  group: string;
  items: string[];
}

export interface AboutExperience {
  company: string;
  role: string;
  location: string;
  timeframe: string;
  summary: string;
  achievements: string[];
}

export interface AboutLeadershipHighlight {
  label: string;
  detail: string;
}

export interface AboutEducation {
  institution: string;
  degree: string;
}

/**
 * Everything printed at the top of the CV.
 *
 * A field left out falls back to `identity` in src/app/resources/config.js;
 * setting one to "" drops that line (or contact link) from the CV entirely.
 */
export interface AboutCVHeader {
  name?: string;
  role?: string;
  location?: string;
  availability?: string;
  email?: string;
  phone?: string;
  website?: string;
  /** Full profile URLs; the printed text is shortened for width. */
  linkedin?: string;
  github?: string;
}

export interface AboutFrontmatter {
  title: string;
  description: string;
  summary: string;
  header?: AboutCVHeader;
  /** Printed section headings, looked up by id. Order is fixed by CVPrintView;
   *  these only supply the wording. */
  sections: AboutSection[];
  /** Optional "Leadership Highlights" block, printed directly under the
   *  summary. Only the leadership variant supplies it. */
  leadership?: AboutLeadershipHighlight[];
  skills: AboutSkillGroup[];
  experience: AboutExperience[];
  otherWorks: AboutExperience[];
  education: AboutEducation[];
  /** Omit or leave empty to drop the References block from the printed CV. */
  references?: string;
}

export interface AboutData {
  frontmatter: AboutFrontmatter;
  content: string;
}

/** Reads the MDX source backing a CV variant. See `src/lib/cv.ts`. */
export function loadCV(variant: CVVariant = DEFAULT_CV_VARIANT): AboutData {
  const filePath = path.join(process.cwd(), "src", "content", CV_VARIANTS[variant].file);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as AboutFrontmatter, content };
}

/** The default CV — the content behind the About page and the site-wide print view. */
export function loadAbout(): AboutData {
  return loadCV(DEFAULT_CV_VARIANT);
}
