import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  title,
  description,
  icon,
  action,
  actionLabel,
  actionHref,
  className,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-line bg-mist/60 p-8 text-center md:p-12",
        className
      )}
    >
      <div className="mx-auto max-w-md space-y-3">
        {icon ? (
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            {icon}
          </div>
        ) : (
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        {(action || (actionLabel && actionHref)) && (
          <div className="pt-2">
            {action ?? (
              <Button href={actionHref!} variant="secondary" size="md">
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
