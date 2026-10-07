import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Activity Gallery", description: "BSGSS programmes and community outreach in action." };

const gallery = [
  ["Community programmes", "gallery-community/192-whatsapp-image-2025-10-09-at-15-55-32-dd874b0a.jpg"], ["Healthcare camps", "healthcare-camps/150-camp3.jpeg"], ["Vocational training", "gallery-training/186-tal2.jpeg"], ["Education initiatives", "education/153-class4.jpeg"], ["Youth activities", "gallery-jac/161-jac3.jpg"], ["Events and outreach", "gallery-events/355-1-1.jpg"], ["Women’s skills training", "gallery-training/185-tal1.jpeg"], ["Community engagement", "gallery-community/191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg"], ["Programme event", "gallery-events/367-16.jpg"],
] as const;

export default function GalleryPage() { return <><PageHeader title="Activity gallery" lead="A visual record of BSGSS programmes, people and community participation." crumbs={[{ name: "Activities", path: "/activities" }, { name: "Gallery", path: "/activities/gallery" }]} /><main className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{gallery.map(([title, image]) => <figure key={image} className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm"><div className="aspect-[4/3] overflow-hidden">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/images/bsgss/${image}`} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><figcaption className="px-5 py-4 text-sm font-semibold text-ink">{title}</figcaption></figure>)}</div></div></main></> }
