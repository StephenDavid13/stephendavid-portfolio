import { Column, Skeleton } from "@/once-ui/components";

export default function Loading() {
  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingY="l">
      <Column maxWidth="xs" gap="16">
        <Skeleton shape="line" width="xs" height="s" />
        <Skeleton shape="line" width="l" height="l" />
      </Column>
      <Skeleton shape="block" height="xl" />
      <Column maxWidth="xs" gap="m">
        <Skeleton shape="line" width="m" height="m" />
        <Skeleton shape="line" width="l" height="s" />
        <Skeleton shape="line" width="l" height="s" />
        <Skeleton shape="line" width="l" height="s" />
      </Column>
    </Column>
  );
}
