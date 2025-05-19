import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, IconButton } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter, social } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Meta, Schema } from "@/once-ui/modules";
import styles from "./page.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  return (
    <Column maxWidth="xl" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s">
        {home.featured && (
        <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
          <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
            href={home.featured.href}>
            <Row paddingY="2">{home.featured.title}</Row>
          </Badge>
        </RevealFx>
        )}
        <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
          <Heading wrap="balance" variant="display-strong-l">
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="16">
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
            {home.subline}
          </Text>
          
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="20">
          <Flex gap="8">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="l"
                    className={styles["icon-button"]}
                    variant="ghost"
                  />
                ),
            )}
          </Flex>
        </RevealFx>
        <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
          <Button
            id="about"
            data-border="rounded"
            href="/about"
            variant="secondary"
            size="m"
            arrowIcon
          >
            <Flex gap="8" vertical="center">
              {about.avatar.display && (
                <Avatar
                  style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                  src={person.avatar}
                  size="m"
                />
              )}
              More about me
            </Flex>
          </Button>
        </RevealFx>
      </Column>
      <Column maxWidth="l" paddingY="24" gap="xl">
        <Projects range={[1, 3]} />
      </Column>
    </Column>
  );
}
