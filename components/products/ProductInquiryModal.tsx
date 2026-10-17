"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Mail, Send, X } from "lucide-react";

interface ProductInquiryModalProps {
  productName: string | null;
  onClose: () => void;
}

export function ProductInquiryModal({ productName, onClose }: ProductInquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Close on Escape & lock body scroll
  useEffect(() => {
    if (!productName) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [productName, onClose]);

  if (!productName) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const compiledMessage = [
        `Product requested: ${productName}`,
        quantity.trim() ? `Estimated Quantity / Requirement: ${quantity.trim()}` : null,
        message.trim() ? `Additional notes: ${message.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          subject: `SHG Product Enquiry — ${productName}`,
          message: compiledMessage,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request. Please try again.");
      }

      setSubmittedRef(data.reference || "BSGSS-INQ");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-inquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-line animate-in fade-in zoom-in-95 duration-200">
        <div className="h-2 w-full bg-brand-700" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Artisan Guilds Order</p>
              <h2 id="product-inquiry-title" className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
                Request Pricing &amp; Sample
              </h2>
              <div className="mt-2 inline-block rounded-md bg-sand-100 px-2.5 py-1 text-xs font-semibold text-brand-900">
                {productName}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-sand-100 hover:text-ink transition"
              aria-label="Close inquiry dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {submittedRef ? (
            <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/70 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">Inquiry Submitted!</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
                Thank you for your interest in our rural women SHG artisans. Our team will review your requirement and share pricing and catalogue details shortly.
              </p>
              <div className="mt-3 inline-block rounded-md bg-white px-3 py-1 text-xs font-mono font-semibold text-brand-800 border border-brand-200">
                Reference: {submittedRef}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-lg bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-800 sm:text-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5" noValidate>
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="inquiry-name" className="block text-xs font-medium text-ink">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priyanshi Sharma / Organisation"
                  className="mt-1 block w-full rounded-lg border border-line bg-sand-50/50 px-3 py-2 text-xs text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 sm:text-sm"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-medium text-ink">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="mt-1 block w-full rounded-lg border border-line bg-sand-50/50 px-3 py-2 text-xs text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-phone" className="block text-xs font-medium text-ink">
                    Phone / Mobile <span className="text-[10px] text-ink-muted font-normal">(optional)</span>
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-1 block w-full rounded-lg border border-line bg-sand-50/50 px-3 py-2 text-xs text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-qty" className="block text-xs font-medium text-ink">
                  Estimated Quantity or Order Type <span className="text-[10px] text-ink-muted font-normal">(optional)</span>
                </label>
                <input
                  id="inquiry-qty"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. Single sample, 25 pcs festive gift, bulk order"
                  className="mt-1 block w-full rounded-lg border border-line bg-sand-50/50 px-3 py-2 text-xs text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="inquiry-message" className="block text-xs font-medium text-ink">
                  Requirement Details <span className="text-[10px] text-ink-muted font-normal">(optional)</span>
                </label>
                <textarea
                  id="inquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Preferred weave patterns, delivery location, or timeline..."
                  className="mt-1 block w-full rounded-lg border border-line bg-sand-50/50 px-3 py-2 text-xs text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 resize-none sm:text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-800 disabled:opacity-60 cursor-pointer sm:text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>

              <div className="border-t border-line/70 pt-3 text-center">
                <p className="text-[11px] text-ink-muted">
                  Or prefer direct email?{" "}
                  <a
                    href={`mailto:bsgssindia@yahoo.co.in?subject=${encodeURIComponent(`BSGSS SHG Product Enquiry — ${productName}`)}`}
                    className="font-semibold text-brand-700 hover:underline inline-flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3 inline" />
                    <span>bsgssindia@yahoo.co.in</span>
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
