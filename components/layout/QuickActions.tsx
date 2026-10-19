"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MessageCircle, Phone, Send, X } from "lucide-react";
import { site, telHref } from "@/config/site";

import { openContactModal } from "@/components/contact/ContactModal";

export function QuickActions() {
  const [open, setOpen] = useState(false);
  const rawNumber = site.contact.whatsapp || "919910243454";
  const whatsappNumber = rawNumber.replace(/[^\d]/g, "");

  return (
    <aside className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden" aria-label="Quick contact options">
      {open && <div className="flex flex-col items-end gap-2" role="menu">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            openContactModal();
          }}
          className="group flex items-center gap-3 rounded-full border border-line bg-white py-2 pl-3 pr-4 text-sm font-semibold text-ink shadow-lift transition hover:-translate-y-0.5 hover:border-ink cursor-pointer text-left"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white">
            <MessageCircle className="h-4 w-4" />
          </span>
          <span>Send a message</span>
        </button>
        <QuickAction href="/contact" icon={MessageCircle} label="Contact details" internal />
        <QuickAction href={telHref(site.contact.phone)} icon={Phone} label={`Call ${site.contact.phone}`} />
        <QuickAction href={`mailto:${site.contact.email}`} icon={Mail} label="Email BSGSS" />
        <QuickAction href={`https://wa.me/${whatsappNumber}`} icon={Send} label={`WhatsApp (${site.contact.whatsapp || "+91 99102 43454"})`} external />
      </div>}
      <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Close quick contact options" : "Open quick contact options"} className="grid h-14 w-14 place-items-center rounded-full bg-slate-900 text-white shadow-lift transition hover:scale-105 hover:bg-black focus:outline-none focus:ring-4 focus:ring-slate-300">
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </aside>
  );
}

function QuickAction({ href, icon: Icon, label, external, internal }: { href: string; icon: typeof MessageCircle; label: string; external?: boolean; internal?: boolean }) {
  const classes = "group flex items-center gap-3 rounded-full border border-line bg-white py-2 pl-3 pr-4 text-sm font-semibold text-ink shadow-lift transition hover:-translate-y-0.5 hover:border-ink";
  const contents = <><span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white"><Icon className="h-4 w-4" /></span><span>{label}</span></>;
  if (internal) return <Link href={href} className={classes}>{contents}</Link>;
  return <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{contents}</a>;
}
