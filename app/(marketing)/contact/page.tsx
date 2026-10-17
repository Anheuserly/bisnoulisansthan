import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { directionsUrl, fullAddress, mapEmbedUrl, site, telHref } from "@/config/site";
import { content } from "@/config/content";

export const metadata: Metadata = {
  title: content.contact.metadataTitle,
  description: content.contact.lead,
};

export default function ContactPage() {
  const whatsappNumber = site.contact.whatsapp?.replace(/[^\d]/g, "");

  return (
    <>
      <PageHeader
        title={content.contact.title}
        lead={content.contact.lead}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <div className="bg-sand-50/40 pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left: Contact Form Card */}
            <ScrollReveal direction="up" delay={40} className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xs">
                <div className="h-2 w-full bg-brand-700" />
                <div className="p-6 sm:p-9">
                  <div className="flex items-center gap-2.5 text-brand-700">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">
                      {content.contact.eyebrow}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-ink">
                    {content.contact.form.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {content.contact.subheading}
                  </p>

                  <div className="mt-7">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Contact Information & Direct Channels */}
            <div className="space-y-6 lg:col-span-5">
              {/* Direct Reach Cards */}
              <ScrollReveal direction="up" delay={80}>
                <div className="rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-2xs">
                  <h3 className="font-display text-lg font-bold text-ink">
                    Direct channels
                  </h3>
                  <div className="mt-5 space-y-3.5">
                    <a
                      href={telHref(site.contact.phone)}
                      className="flex items-start gap-3.5 rounded-xl border border-line p-3.5 transition hover:border-brand-500 hover:bg-brand-50/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-ink-muted">Call our office</p>
                        <p className="text-sm font-bold text-ink">{site.contact.phone}</p>
                      </div>
                    </a>

                    <a
                      href={`mailto:${site.contact.email}`}
                      className="flex items-start gap-3.5 rounded-xl border border-line p-3.5 transition hover:border-brand-500 hover:bg-brand-50/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-ink-muted">Email us</p>
                        <p className="text-sm font-bold text-ink truncate">{site.contact.email}</p>
                      </div>
                    </a>

                    {whatsappNumber && (
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3.5 rounded-xl border border-line p-3.5 transition hover:border-brand-500 hover:bg-brand-50/40"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
                          <Send className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-ink-muted">WhatsApp assistance</p>
                          <p className="text-sm font-bold text-ink">{site.contact.whatsapp}</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {/* Office Location & Address */}
              <ScrollReveal direction="up" delay={120}>
                <div className="rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink">
                        {content.contact.officeNoida.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {fullAddress}
                      </p>
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex text-xs font-bold text-brand-700 hover:underline"
                      >
                        Get directions on Google Maps →
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-line flex items-start gap-3 text-sm text-ink-muted">
                    <Clock className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-ink">{content.contact.timingLabel}</p>
                      <p className="text-xs text-ink-muted">{content.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Map Embed */}
              <ScrollReveal direction="scale" delay={150}>
                <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xs aspect-[16/10]">
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
