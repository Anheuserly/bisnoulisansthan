import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Activities", description: "BSGSS activities and community programmes in action." };
const activities = [
  ["Community programmes", "gallery-community/192-whatsapp-image-2025-10-09-at-15-55-32-dd874b0a.jpg"], ["Healthcare camps", "healthcare-camps/150-camp3.jpeg"], ["Vocational training", "gallery-training/186-tal2.jpeg"], ["Education initiatives", "education/153-class4.jpeg"], ["Youth activities", "gallery-jac/161-jac3.jpg"], ["Events and outreach", "gallery-events/355-1-1.jpg"],
] as const;
export default function ActivitiesPage() { return <><PageHeader title="Activities" lead="A view into BSGSS programmes, training and community outreach." crumbs={[{ name: "Activities", path: "/activities" }]} /><main className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{activities.map(([title, image]) => <figure key={image} className="group overflow-hidden rounded-xl bg-brand-100"><div className="aspect-[4/3] overflow-hidden">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/images/bsgss/${image}`} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><figcaption className="bg-white px-5 py-4 font-semibold text-ink">{title}</figcaption></figure>)}</div></div></main></> }
