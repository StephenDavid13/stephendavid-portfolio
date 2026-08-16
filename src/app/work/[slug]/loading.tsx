import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mx-auto max-w-[1240px] px-6 pt-16 md:px-10 md:pt-24"
    >
      <Skeleton className="h-3 w-40" />
      <Skeleton className="mt-8 h-24 w-[min(38rem,100%)]" />
      <Skeleton className="mt-4 h-24 w-[min(28rem,100%)]" />
      <div className="mt-16 flex flex-col gap-6">
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-14 w-[min(30rem,100%)]" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-14 w-[min(26rem,100%)]" />
        <Skeleton className="h-px w-full" />
      </div>
    </div>
  );
}
