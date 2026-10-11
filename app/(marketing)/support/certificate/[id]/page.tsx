import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";
import { PrintCertificateButton } from "@/components/support/PrintCertificateButton";

export const dynamic = "force-dynamic";

type Certificate = { donorName: string; amount: string; currency: string; certificateNumber: string; issuedAt: string };

export default async function DonationCertificate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id) || !process.env.DATABASE_URL) notFound();
  const { rows } = await db.query<Certificate>("SELECT donor_name AS \"donorName\", amount::text, currency, certificate_number AS \"certificateNumber\", certificate_issued_at AS \"issuedAt\" FROM donation_requests WHERE id = $1 AND status = 'certificate_issued'", [id]);
  const donation = rows[0];
  if (!donation) notFound();
  const issued = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(donation.issuedAt));
  const amount = new Intl.NumberFormat("en-IN", { style: "currency", currency: donation.currency }).format(Number(donation.amount));
  return <main className="min-h-screen bg-sand-50 px-5 py-10 print:bg-white md:px-8"><div className="mx-auto max-w-3xl print:max-w-none"><div className="mb-6 print:hidden"><PrintCertificateButton /></div><article className="border-8 border-brand-700 bg-white p-8 text-center shadow-sm sm:p-14 print:border-4 print:shadow-none"><CheckCircle2 className="mx-auto h-11 w-11 text-brand-700" /><p className="mt-5 text-sm font-bold uppercase tracking-[.22em] text-brand-700">Bisnouli Sarvodaya Gramodyog Sewa Sansthan</p><h1 className="mt-5 font-display text-3xl font-bold text-ink sm:text-5xl">Donation acknowledgement</h1><div className="mx-auto mt-7 h-px w-24 bg-brand-600" /><p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">This acknowledges, with gratitude, the contribution received from</p><p className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{donation.donorName}</p><p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">towards the community-development work of BSGSS in the amount of</p><p className="mt-3 font-display text-3xl font-bold text-brand-800">{amount}</p><dl className="mx-auto mt-10 grid max-w-lg gap-4 border-y border-line py-5 text-sm sm:grid-cols-2"><div><dt className="font-semibold text-ink-muted">Certificate number</dt><dd className="mt-1 font-bold text-ink">{donation.certificateNumber}</dd></div><div><dt className="font-semibold text-ink-muted">Issued on</dt><dd className="mt-1 font-bold text-ink">{issued}</dd></div></dl><p className="mt-10 text-xs leading-relaxed text-ink-muted">This acknowledgement is issued after payment verification by BSGSS. It is not a tax-exemption certificate.</p></article></div></main>;
}
