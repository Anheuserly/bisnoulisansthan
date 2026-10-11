"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { ContactForm } from "./ContactForm";

export function ContactModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Check query parameter on load / route changes (e.g. /contact?modal=contact or /contact-us)
  useEffect(() => {
    const modalParam = searchParams.get("modal") || searchParams.get("contact");
    if (modalParam === "contact" || modalParam === "1" || modalParam === "open") {
      setIsOpen(true);
    }
  }, [searchParams]);

  // Listen for custom trigger events across the app
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-contact-modal", handleOpen);
    window.addEventListener("close-contact-modal", handleClose);

    return () => {
      window.removeEventListener("open-contact-modal", handleOpen);
      window.removeEventListener("close-contact-modal", handleClose);
    };
  }, []);

  // Lock scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    // If the modal was opened via query params, clean the URL cleanly
    if (searchParams.has("modal") || searchParams.has("contact")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("modal");
      params.delete("contact");
      const newQuery = params.toString();
      router.replace(newQuery ? `${pathname}?${newQuery}` : pathname, { scroll: false });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-line animate-in fade-in zoom-in-95 duration-200">
        {/* Top green accent strip matching user design */}
        <div className="h-2 w-full bg-brand-700" />

        <div className="p-6 sm:p-8">
          {/* Header with Title and Close Button */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="contact-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Contact us
              </h2>
              <p className="mt-1.5 text-sm text-ink-muted">
                Have a question or proposal? Send us a message and our team will get in touch with you.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-sand-100 hover:text-ink transition"
              aria-label="Close contact dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Helper function to open the contact modal programmatically from any component */
export function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }
}
