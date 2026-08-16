/**
 * Single horizontal marquee for the stack strip. The only marquee on the page.
 * Motivation: breadth without attention. Twenty-odd technologies do not each
 * deserve a tile; together they read as range.
 *
 * Slow by default. The point is texture at the edge of vision, not motion the
 * eye has to track.
 */
export function Marquee({
  items,
  duration = 110,
}: Readonly<{ items: string[]; duration?: number }>) {
  const Group = ({ hidden = false }: { hidden?: boolean }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={`${hidden ? "dup-" : ""}${item}`}
          className="flex shrink-0 items-center font-mono text-xs tracking-wide"
          style={{ color: "var(--fg-faint)" }}
        >
          {item}
          <span
            className="mx-6 inline-block h-[3px] w-[3px] rounded-full"
            style={{ background: "var(--accent)" }}
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee-mask w-full overflow-hidden">
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${duration}s` }}
      >
        <Group />
        {/* Duplicate makes the loop point seamless; hidden from assistive tech
            so the list is announced once. */}
        <Group hidden />
      </div>
    </div>
  );
}
