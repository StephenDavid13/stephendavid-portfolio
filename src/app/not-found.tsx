import { ButtonLink, ArrowRight } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1240px] flex-col items-start gap-6 px-6 py-28 md:px-10 md:py-40">
      <p
        className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
        style={{ color: "var(--accent)" }}
      >
        404
      </p>
      <h1 className="text-display max-w-[14ch] text-[clamp(2.25rem,7vw,5rem)] font-semibold">
        This page does not exist
      </h1>
      <p className="max-w-[46ch] text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
        The link may be out of date, or the page may have moved. The work index is the best
        place to pick things back up.
      </p>
      <ButtonLink href="/work" variant="primary" size="m" iconRight={<ArrowRight />}>
        View work
      </ButtonLink>
    </section>
  );
}
