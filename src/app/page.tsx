import {
  Badge,
  Button,
  Column,
  Flex,
  Heading,
  IconButton,
  RevealFx,
  Row,
  Text,
} from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { DownloadCVButton } from "@/components/DownloadCVButton";

import { baseURL, home, about, identity, social } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import styles from "./page.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
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
          name: identity.name,
          url: `${baseURL}${about.path}`,
        }}
      />
      <Column maxWidth="s">
        <RevealFx
          fillWidth
          horizontal="start"
          paddingTop="16"
          paddingBottom="32"
          paddingLeft="12"
        >
          <Badge
            background="brand-alpha-weak"
            paddingX="12"
            paddingY="4"
            onBackground="neutral-strong"
            textVariant="label-default-s"
            arrow={false}
            href="/about"
          >
            <Row paddingY="2">Check out my CV</Row>
          </Badge>
        </RevealFx>
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
          <Flex gap="8" wrap>
            <DownloadCVButton size="m" variant="primary" />
            <Button
              href="/about"
              data-border="rounded"
              variant="secondary"
              size="m"
              arrowIcon
            >
              More about me
            </Button>
          </Flex>
        </RevealFx>
      </Column>
      <Column maxWidth="l" paddingY="24" gap="8">
        <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
          <Projects range={[1, 3]} />
        </RevealFx>
        <RevealFx delay={0.5} horizontal="center">
          <Button
            href="/work"
            variant="secondary"
            size="m"
            data-border="rounded"
            suffixIcon="arrowRight"
          >
            View all projects
          </Button>
        </RevealFx>
      </Column>
    </Column>
  );
}
