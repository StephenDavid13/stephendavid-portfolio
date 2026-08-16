import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "s" | "m" | "l";

const SIZES: Record<Size, string> = {
  s: "px-4 py-2 text-xs",
  m: "px-5 py-3 text-sm",
  l: "px-7 py-4 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-[background-color,border-color,color,transform,filter] duration-300 active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed";

function variantProps(variant: Variant) {
  if (variant === "primary") {
    return {
      className: "hover:brightness-110",
      style: { background: "var(--accent)", color: "var(--accent-ink)" },
    };
  }
  if (variant === "secondary") {
    return {
      className: "border hover:border-[var(--accent)]",
      style: { borderColor: "var(--rule-strong)", color: "var(--fg)" },
    };
  }
  return {
    className: "hover:text-[var(--fg)]",
    style: { color: "var(--fg-muted)" },
  };
}

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export function Button({
  children,
  variant = "primary",
  size = "m",
  className,
  iconLeft,
  iconRight,
  ...rest
}: Readonly<Common & ComponentProps<"button">>) {
  const v = variantProps(variant);
  return (
    <button
      className={[BASE, SIZES[size], v.className, className].filter(Boolean).join(" ")}
      style={v.style}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  size = "m",
  className,
  iconLeft,
  iconRight,
  href,
  ...rest
}: Readonly<Common & { href: string } & Omit<ComponentProps<"a">, "href">>) {
  const v = variantProps(variant);
  const cls = [BASE, SIZES[size], v.className, className].filter(Boolean).join(" ");
  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        style={v.style}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} style={v.style} {...rest}>
      {inner}
    </Link>
  );
}

export const ArrowRight = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
