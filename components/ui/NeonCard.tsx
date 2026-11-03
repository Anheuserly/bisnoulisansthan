import React from "react";
import { cn } from "@/lib/utils/cn";

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
}

export function NeonCard({
  children,
  className,
  glowColor,
  interactive = true,
  style,
  ...props
}: NeonCardProps) {
  const customStyles: React.CSSProperties = {
    ...style,
    ...(glowColor
      ? {
          borderColor: `${glowColor}66`,
          boxShadow: `0 0 20px -2px ${glowColor}40, 0 4px 14px rgba(16, 40, 48, 0.05)`,
        }
      : {}),
  };

  return (
    <div
      data-neon-card="true"
      className={cn(
        "design-card neon-card relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300",
        interactive && "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      style={customStyles}
      {...props}
    >
      {/* Corner light reflection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-16 w-16 -translate-y-1 translate-x-1 rounded-tr-2xl bg-gradient-to-bl from-emerald-500/20 via-emerald-400/5 to-transparent blur-xs"
      />
      {children}
    </div>
  );
}
