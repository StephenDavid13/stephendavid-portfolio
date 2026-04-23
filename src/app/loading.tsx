import { Column, Flex, Grid, Skeleton } from "@/once-ui/components";

export default function Loading() {
  return (
    <Column maxWidth="xl" gap="xl" horizontal="center" paddingY="l">
      <Column maxWidth="s" gap="m" fillWidth>
        <Skeleton shape="line" width="xs" height="s" />
        <Skeleton shape="line" width="l" height="l" />
        <Skeleton shape="line" width="m" height="m" />
        <Flex gap="8">
          <Skeleton shape="circle" width="xs" height="xs" />
          <Skeleton shape="circle" width="xs" height="xs" />
          <Skeleton shape="circle" width="xs" height="xs" />
        </Flex>
      </Column>
      <Grid
        fillWidth
        maxWidth="l"
        columns="3"
        tabletColumns="2"
        mobileColumns="1"
        gap="m"
      >
        {(["1", "2", "3"] as const).map((delay) => (
          <Skeleton key={delay} shape="block" height="xl" delay={delay} />
        ))}
      </Grid>
    </Column>
  );
}
