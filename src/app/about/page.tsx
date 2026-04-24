import { Button, Column, Flex, Heading, Tag, Text } from "@/once-ui/components";
import { baseURL, identity, social, about } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { loadAbout } from "@/app/utils/loadAbout";
import { DownloadCVButton } from "@/components/DownloadCVButton";
import React from "react";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  const { frontmatter } = loadAbout();
  return Meta.generate({
    title: frontmatter.title,
    description: frontmatter.description,
    baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(frontmatter.title)}`,
    path: about.path,
  });
}

export default function About() {
  const { frontmatter } = loadAbout();

  const structure = [
    { title: "Professional Summary", display: true, items: [] },
    {
      title: "Core Skills",
      display: true,
      items: frontmatter.skills.map((group) => group.group),
    },
    {
      title: "Professional Experience",
      display: true,
      items: frontmatter.experience.map((experience) => experience.company),
    },
    {
      title: "Education",
      display: true,
      items: frontmatter.education.map((edu) => edu.institution),
    },
  ];

  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={frontmatter.title}
        description={frontmatter.description}
        path={about.path}
        image={`${baseURL}/og?title=${encodeURIComponent(frontmatter.title)}`}
        author={{ name: identity.name, url: `${baseURL}${about.path}` }}
      />

      <Column maxWidth="m">
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents
            structure={structure}
            about={{ tableOfContent: { display: true, subItems: false } }}
          />
        </Column>

        <Column id="intro" fillWidth horizontal="center" marginBottom="40">
          <Heading className={styles.textAlign} variant="display-strong-xl">
            {identity.name}
          </Heading>
          <Text
            className={styles.textAlign}
            variant="display-default-xs"
            onBackground="neutral-weak"
          >
            {identity.role}
          </Text>
          {social.length > 0 && (
            <Flex
              className={styles.blockAlign}
              paddingTop="20"
              paddingBottom="8"
              gap="8"
              wrap
              horizontal="center"
              fitWidth
              data-border="rounded"
            >
              <DownloadCVButton />
              {social.map(
                (item) =>
                  item.link && (
                    <Button
                      key={item.name}
                      href={item.link}
                      prefixIcon={item.icon}
                      label={item.name}
                      size="s"
                      variant="secondary"
                    />
                  ),
              )}
            </Flex>
          )}
        </Column>

        <Column fillWidth gap="s" marginBottom="40">
          <Heading as="h2" id="Professional Summary" variant="display-strong-s">
            Professional Summary
          </Heading>
          <Text variant="body-default-l">{frontmatter.summary}</Text>
        </Column>

        <Column fillWidth gap="l" marginBottom="40">
          <Heading as="h2" id="Core Skills" variant="display-strong-s">
            Core Skills
          </Heading>
          {frontmatter.skills.map((group) => (
            <Column key={group.group} fillWidth gap="8">
              <Text id={group.group} variant="heading-strong-l" onBackground="accent-weak">
                {group.group}
              </Text>
              <Flex wrap gap="8">
                {group.items.map((skill) => (
                  <Tag key={skill} size="l">
                    {skill}
                  </Tag>
                ))}
              </Flex>
            </Column>
          ))}
        </Column>

        <Heading
          as="h2"
          id="Professional Experience"
          variant="display-strong-s"
          marginBottom="m"
        >
          Professional Experience
        </Heading>
        <Column fillWidth gap="l" marginBottom="40">
          {frontmatter.experience.map((experience, index) => (
            <Column key={`${experience.company}-${index}`} fillWidth>
              <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                <Text id={experience.company} variant="heading-strong-l">
                  {experience.company}
                </Text>
                <Text variant="heading-default-xs" onBackground="neutral-weak">
                  {experience.timeframe}
                </Text>
              </Flex>
              <Text variant="body-default-s" onBackground="brand-weak" marginBottom="xs">
                {experience.role}
                {experience.location ? ` · ${experience.location}` : ""}
              </Text>
              {experience.summary && (
                <Text variant="body-default-m" marginBottom="m">
                  {experience.summary}
                </Text>
              )}
              <Column as="ul" gap="16">
                {experience.achievements.map((achievement, i) => (
                  <Text
                    as="li"
                    variant="body-default-m"
                    key={`${experience.company}-ach-${i}`}
                  >
                    {achievement}
                  </Text>
                ))}
              </Column>
            </Column>
          ))}
        </Column>

        <Heading as="h2" id="Education" variant="display-strong-s" marginBottom="m">
          Education
        </Heading>
        <Column fillWidth gap="l" marginBottom="40">
          {frontmatter.education.map((edu, index) => (
            <Column key={`${edu.institution}-${index}`} fillWidth gap="4">
              <Text id={edu.institution} variant="heading-strong-l">
                {edu.institution}
              </Text>
              <Text variant="heading-default-xs" onBackground="neutral-weak">
                {edu.degree}
              </Text>
            </Column>
          ))}
        </Column>
      </Column>
    </>
  );
}
