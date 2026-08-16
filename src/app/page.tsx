import { Hero } from "@/components/home/Hero";
import { StackStrip } from "@/components/home/StackStrip";
import { Capabilities } from "@/components/home/Capabilities";
import { Timeline } from "@/components/home/Timeline";
import { Contact } from "@/components/home/Contact";

import { getPosts } from "@/app/utils/utils";
import { loadAbout } from "@/app/utils/loadAbout";
import { baseURL, home, about, identity, social } from "@/app/resources";
import { buildMetadata, JsonLd } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
  });
}

export default function Home() {
  // Still counted for the hero stat, even though the projects themselves now
  // live only on /work.
  const projects = getPosts(["src", "app", "work", "projects"]);

  const { frontmatter } = loadAbout();
  const stack = frontmatter.skills.flatMap((g) => g.items);
  const roles = frontmatter.experience.slice(0, 4).map((e) => ({
    company: e.company,
    role: e.role,
    timeframe: e.timeframe,
    summary: e.summary,
  }));

  return (
    <>
      <JsonLd
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        author={{ name: identity.name, url: `${baseURL}${about.path}` }}
      />

      <Hero
        eyebrow={`${identity.role} · ${identity.location}`}
        statement={home.statement}
        accent={home.accent}
        subline={home.subline}
        // Matches the claim in the CV rather than inferring a larger number.
        years="10+"
        projectCount={projects.length}
      />

      <StackStrip items={stack} />

      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Capabilities groups={frontmatter.skills} />

        <Timeline roles={roles} />

        <Contact
          email={identity.email}
          location={identity.location}
          socials={social.map((s) => ({ name: s.name, link: s.link }))}
        />
      </div>
    </>
  );
}
