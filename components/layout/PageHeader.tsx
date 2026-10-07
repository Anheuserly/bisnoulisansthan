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
    <div className="border-b border-line bg-mist">
      <Container className="py-12 md:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
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
                      <ChevronRight className="h-3.5 w-3.5 text-ink-subtle" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-5 max-w-3xl font-display text-display-md font-semibold">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{subtitle}</p>}
        {children}
      </Container>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </div>
  );
}
