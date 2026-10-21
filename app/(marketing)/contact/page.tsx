import type { Metadata } from "next";
import { Building2, Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { directionsUrl, fullAddress, mapEmbedUrl, site, telHref } from "@/config/site";
import { content } from "@/config/content";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact BSGSS | Administrative Office | BSGSS",
  description:
    "Reach out to BSGSS administrative office in Noida & New Delhi. Contact us for programme inquiries, partnership discussions, or visits.",
  path: "/contact",
});

export default async function ContactPage() {
  const customizer = await getCustomizerSettings();
  const offices = customizer.offices;
  const activePhone = offices.adminOffice.phone || offices.registeredOffice.phone || site.contact.phone;
  const activeEmail = offices.adminOffice.email || offices.registeredOffice.email || site.contact.email || "bisnoulisansthan@gmail.com";
  const whatsappNumber = customizer.contactActions?.whatsappNumber || "919910243454";

  return (
    <>
      <PageHeader
        title={content.contact.title}
        lead={content.contact.lead}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <div className="bg-sand-50/40 pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left: Contact Form Section (Borderless, Open Editorial) */}
            <ScrollReveal direction="up" delay={40} className="lg:col-span-7">
              <div className="border-t-2 border-brand-850 pt-6">
                <div>
                  <div className="flex items-center gap-2 text-brand-800">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]">
                      {content.contact.eyebrow}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-ink">
                    {content.contact.form.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {content.contact.subheading}
                  </p>

                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Contact Information & Direct Channels (Borderless, Zero Colored Icon Boxes) */}
            <div className="space-y-8 lg:col-span-5">
              {/* Direct Reach Channels */}
              <ScrollReveal direction="up" delay={80}>
                <div className="border-t-2 border-brand-850 pt-6">
                  <h3 className="font-display text-xl font-bold text-ink">
                    Direct channels
                  </h3>
                  <div className="mt-4 divide-y divide-line/70">
                    <a
                      href={telHref(activePhone)}
                      className="group flex items-center gap-4 py-3.5 transition hover:text-brand-800"
                    >
                      <Phone className="h-5 w-5 text-ink shrink-0 group-hover:text-brand-800" />
                      <div>
                        <p className="text-xs font-semibold text-ink-muted">Call our office</p>
                        <p className="text-sm font-bold text-ink group-hover:text-brand-800">{activePhone}</p>
                      </div>
                    </a>

                    <a
                      href={`mailto:${activeEmail}`}
                      className="group flex items-center gap-4 py-3.5 transition hover:text-brand-800"
                    >
                      <Mail className="h-5 w-5 text-ink shrink-0 group-hover:text-brand-800" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-ink-muted">Email us</p>
                        <p className="text-sm font-bold text-ink truncate group-hover:text-brand-800">{activeEmail}</p>
                      </div>
                    </a>

                    {whatsappNumber && (
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 py-3.5 transition hover:text-brand-800"
                      >
                        <Send className="h-5 w-5 text-ink shrink-0 group-hover:text-brand-800" />
                        <div>
                          <p className="text-xs font-semibold text-ink-muted">WhatsApp assistance</p>
                          <p className="text-sm font-bold text-ink group-hover:text-brand-800">{site.contact.whatsapp}</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {/* Both Offices: Registered Office & Administrative Office */}
              <ScrollReveal direction="up" delay={120}>
                <div className="space-y-6">
                  {/* Registered Office */}
                  <div className="border-t border-line pt-5">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-ink shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-display text-base font-bold text-ink">
                            {offices.registeredOffice.title}
                          </h3>
                          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                            {offices.registeredOffice.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                          {offices.registeredOffice.line1}, {offices.registeredOffice.line2}, {offices.registeredOffice.city}, {offices.registeredOffice.state} – {offices.registeredOffice.pincode}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-800">
                          <a
                            href={offices.registeredOffice.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <MapPin className="h-3.5 w-3.5" />
                            <span>View on Google Maps</span>
                          </a>
                          <span>·</span>
                          <span>Tel: {offices.registeredOffice.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Administrative Office */}
                  <div className="border-t border-line pt-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-ink shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-display text-base font-bold text-ink">
                            {offices.adminOffice.title}
                          </h3>
                          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                            {offices.adminOffice.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                          {offices.adminOffice.line1}, {offices.adminOffice.line2}, {offices.adminOffice.city}, {offices.adminOffice.state} – {offices.adminOffice.pincode}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-800">
                          <a
                            href={offices.adminOffice.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <MapPin className="h-3.5 w-3.5" />
                            <span>Get Directions</span>
                          </a>
                          <span>·</span>
                          <span>Tel: {offices.adminOffice.phone}</span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-line/60 flex items-start gap-2.5 text-xs text-ink-muted">
                          <Clock className="h-3.5 w-3.5 text-ink-muted shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-ink">{content.contact.timingLabel}:</span>{" "}
                            <span>{content.contact.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Map Embed */}
              <ScrollReveal direction="scale" delay={150}>
                <div className="overflow-hidden border-t border-b border-line aspect-[16/10]">
                  <iframe
                    title="BSGSS Location Map"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
