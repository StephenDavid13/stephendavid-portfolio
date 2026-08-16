import { Marquee } from "@/components/motion/Marquee";

/**
 * The stack as range rather than as a list. Unlabelled on purpose: the content
 * is self-evident and the page spends its labels elsewhere.
 */
export function StackStrip({ items }: Readonly<{ items: string[] }>) {
  if (!items.length) return null;

  return (
    <div className="rule-t rule-b py-5">
      <Marquee items={items} duration={110} />
    </div>
  );
}
