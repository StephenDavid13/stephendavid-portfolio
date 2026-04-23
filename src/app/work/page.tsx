import { Column } from "@/once-ui/components";
import { baseURL, identity, about, work } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`${baseURL}/og?title=${encodeURIComponent(work.title)}`}
        author={{
          name: identity.name,
          url: `${baseURL}${about.path}`,
        }}
      />
      <Projects />
    </Column>
  );
}
