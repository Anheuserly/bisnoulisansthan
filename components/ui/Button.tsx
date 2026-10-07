import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverted";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900",
  secondary: "border border-brand-200 bg-white text-brand-800 hover:border-brand-300 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
  inverted: "bg-white text-brand-900 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-4 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const { href, variant, size, className, children, ...rest } = props;
    const classes = buttonClasses({ variant, size, className });
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { variant, size, className, ...buttonProps } = props as ButtonAsButton;
  return <button className={buttonClasses({ variant, size, className })} {...buttonProps} />;
}

export const LinkButton = Button;

