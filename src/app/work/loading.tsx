import { Column, Grid, Skeleton } from "@/once-ui/components";

export default function Loading() {
  return (
    <Column maxWidth="m" paddingY="l" gap="l">
      <Skeleton shape="line" width="s" height="l" />
      <Grid
        fillWidth
        columns="3"
        tabletColumns="2"
        mobileColumns="1"
        gap="m"
      >
        {(["1", "2", "3", "4", "5", "6"] as const).map((delay) => (
          <Skeleton key={delay} shape="block" height="xl" delay={delay} />
        ))}
      </Grid>
    </Column>
  );
}
