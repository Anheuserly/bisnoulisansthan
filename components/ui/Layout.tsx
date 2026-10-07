import { cn } from "@/lib/utils/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>{children}</div>;
}

export function Section({
  className,
  tone,
  background,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: "canvas" | "mist" | "white" | "brand" | "sand";
  background?: "canvas" | "mist" | "white" | "brand" | "sand";
}) {
  const chosen = background ?? tone ?? "canvas";
  const tones = {
    canvas: "bg-canvas",
    mist: "bg-mist",
    white: "bg-white",
    sand: "bg-sand-50/70",
    brand: "bg-brand-900 text-white",
  };
  return (
    <section className={cn("py-16 md:py-24", tones[chosen], className)} {...props}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
  inverted?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", inverted && "text-brand-200")}>{eyebrow}</p>}
      <h2
        id={id}
        className={cn("mt-3 font-display text-display-md font-semibold", inverted ? "text-white" : "text-ink")}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg leading-relaxed", inverted ? "text-brand-100" : "text-ink-muted")}>{description}</p>
      )}
    </div>
  );
}

export function Badge({
  children,
  tone,
  variant,
  className,
}: {
  children: React.ReactNode;
  tone?: "brand" | "sage" | "neutral";
  variant?: "brand" | "sage" | "neutral";
  className?: string;
}) {
  const chosen = variant ?? tone ?? "brand";
  const tones = {
    brand: "bg-brand-50 text-brand-800 ring-brand-100",
    sage: "bg-sage-50 text-sage-700 ring-sage-100",
    neutral: "bg-white text-ink-muted ring-line",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[chosen],
        className
      )}
    >
      {children}
    </span>
  );
}
