import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

export interface AboutEducation {
  institution: string;
  degree: string;
}

export interface AboutFrontmatter {
  title: string;
  description: string;
  summary: string;
  sections: AboutSection[];
  skills: AboutSkillGroup[];
  experience: AboutExperience[];
  education: AboutEducation[];
  references: string;
}

export interface AboutData {
  frontmatter: AboutFrontmatter;
  content: string;
}

export function loadAbout(): AboutData {
  const filePath = path.join(process.cwd(), "src", "content", "about.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as AboutFrontmatter, content };
}
