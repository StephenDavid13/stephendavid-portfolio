/** Shape-matching placeholder, so nothing shifts when content lands. */
export function Skeleton({
  className,
  style,
}: Readonly<{ className?: string; style?: React.CSSProperties }>) {
  return (
    <span
      aria-hidden="true"
      className={["block animate-pulse", className].filter(Boolean).join(" ")}
      style={{ background: "var(--rule)", ...style }}
    />
  );
}
