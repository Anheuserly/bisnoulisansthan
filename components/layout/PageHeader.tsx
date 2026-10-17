import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
    <div className="page-intro border-b border-brand-100 bg-white">
      <Container className="page-intro-content py-4 sm:py-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-muted">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-1">
                  {last ? (
                    <span aria-current="page" className="font-medium text-ink">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link href={c.path} className="hover:text-brand-700 hover:underline">
                        {c.name}
                      </Link>
                      <ChevronRight className="h-3 w-3 text-ink-subtle" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-4xl text-sm leading-normal text-ink-muted sm:text-[15px]">{subtitle}</p>}
        {children}
      </Container>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </div>
  );
}
