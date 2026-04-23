import { Column, Flex, Skeleton } from "@/once-ui/components";

export default function Loading() {
  return (
    <Column maxWidth="m" paddingY="l" gap="xl">
      <Column horizontal="center" gap="s" fillWidth>
        <Skeleton shape="line" width="l" height="xl" />
        <Skeleton shape="line" width="m" height="m" />
        <Flex gap="8" paddingTop="12">
          <Skeleton shape="line" width="xs" height="s" />
          <Skeleton shape="line" width="xs" height="s" />
          <Skeleton shape="line" width="xs" height="s" />
        </Flex>
      </Column>
      <Flex fillWidth mobileDirection="column" gap="xl">
        <Column flex={1} gap="m">
          <Skeleton shape="line" width="m" height="l" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} shape="line" width="l" height="s" delay="1" />
          ))}
        </Column>
        <Column flex={1} gap="m">
          <Skeleton shape="line" width="m" height="l" />
          <Skeleton shape="block" height="m" delay="2" />
          <Skeleton shape="block" height="m" delay="3" />
        </Column>
      </Flex>
    </Column>
  );
}
