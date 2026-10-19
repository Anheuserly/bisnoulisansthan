import Image from "next/image";
import { Download, ExternalLink, FileText } from "lucide-react";

type LegalDocument = {
  title: string;
  tag: string;
  href: string;
  fileType: string;
  fileSize: string;
  description: string;
  previewImage: string;
};

type DocumentArchiveProps = {
  documents: readonly LegalDocument[];
};

/**
 * Public records shown as a visual archive. Every cover is the first page of
 * the actual local PDF, generated from the source attachment—not a stock mockup.
 */
export function DocumentArchive({ documents }: DocumentArchiveProps) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {documents.map((document, index) => (
        <article
          key={document.href}
          className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
        >
          <a
            href={document.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${document.title}`}
            className="relative block aspect-[4/3] overflow-hidden border-b border-line bg-stone-100 p-3 sm:p-4"
          >
            <Image
              src={document.previewImage}
              alt={`First page preview of ${document.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-contain p-3 transition duration-500 group-hover:scale-[1.035]"
            />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-brand-800 shadow-sm">
              <FileText className="h-3 w-3" />
              {document.fileType}
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 to-transparent px-4 pb-3 pt-9 text-[0.6875rem] font-semibold text-white opacity-0 transition group-hover:opacity-100">
              View official attachment →
            </span>
          </a>

          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[0.625rem] font-bold uppercase tracking-[0.13em] text-brand-700">{document.tag}</span>
              <span className="text-[0.6875rem] text-ink-muted">{document.fileSize}</span>
            </div>
            <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink">{document.title}</h3>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-muted">{document.description}</p>

            <div className="mt-4 flex items-center gap-3 border-t border-line pt-3">
              <a
                href={document.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open PDF
              </a>
              <a
                href={document.href}
                download
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition hover:text-brand-800"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
