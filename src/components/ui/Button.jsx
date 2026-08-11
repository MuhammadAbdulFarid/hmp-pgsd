import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const variants = {
  primary: "bg-primary-blue text-pure-white hover:bg-royal-blue",

  secondary:
    "border border-deep-navy/20 bg-transparent text-deep-navy hover:border-primary-blue hover:text-primary-blue",

  light:
    "border border-white/25 bg-white/10 text-white hover:bg-white hover:text-deep-navy",

  ghost: "bg-transparent text-primary-blue hover:bg-primary-blue/8",
};

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  showArrow = false,
  className = "",
  type = "button",
  ...props
}) {
  const classes = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-md
    font-heading
    font-semibold
    tracking-[-0.01em]
    transition-all
    duration-300
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-sky-accent
    focus-visible:ring-offset-4
    disabled:pointer-events-none
    disabled:opacity-50
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `;

  const content = (
    <>
      <span>{children}</span>

      {showArrow && (
        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
