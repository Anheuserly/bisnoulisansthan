import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Layout";

export interface Crumb {
  name?: string;
  label?: string;
  path?: string;
  href?: string;
}

/** Page intro band with breadcrumbs (+ BreadcrumbList schema), title and lead text. */
export function PageHeader({
  title,
  lead,
  description,
  crumbs,
  breadcrumbs,
  children,
}: {
  title: string;
  lead?: string;
  description?: string;
  crumbs?: Crumb[];
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  const rawList = breadcrumbs ?? crumbs ?? [];
  const normalized = rawList.map((c) => ({
    name: c.name ?? c.label ?? "",
    path: c.path ?? c.href ?? "/",
  }));
  const trail =
    normalized.length > 0 && normalized[0]?.path === "/"
      ? normalized
      : [{ name: "Home", path: "/" }, ...normalized];
  const subtitle = lead ?? description;

  return (
    <div className="page-intro relative isolate border-b border-brand-100 bg-gradient-to-b from-white via-sand-50/40 to-white py-1">
      {/* Subtle decorative radial accent */}
      <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-brand-100/30 blur-3xl" />
      
      <Container className="page-intro-content py-5 sm:py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
            {trail.map((c, i) => {
              const isFirst = i === 0;
              const isLast = i === trail.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-1.5">
                  {isLast ? (
                    <span aria-current="page" className="font-semibold text-brand-900 bg-brand-50/80 px-2.5 py-0.5 rounded-md border border-brand-200/60">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={c.path}
                        className="inline-flex items-center gap-1 text-ink-muted hover:text-brand-800 transition-colors"
                      >
                        {isFirst && <Home className="h-3 w-3 text-brand-600 shrink-0" />}
                        <span>{c.name}</span>
                      </Link>
                      <ChevronRight className="h-3 w-3 text-brand-300" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2rem] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </div>
  );
}
