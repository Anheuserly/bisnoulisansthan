"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
  defaultSubject?: string;
}

export function ContactForm({ onSuccess, className = "", defaultSubject = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          subject: subject.trim() || "General Enquiry",
          message: message.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit message. Please try again.");
      }

      setSubmittedRef(data.reference || "BSGSS-SUBMITTED");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setPhone("");
    setSubmittedRef(null);
    setError(null);
  };

  if (submittedRef) {
    return (
      <div className={`rounded-xl border border-brand-200 bg-brand-50/70 p-6 sm:p-8 text-center ${className}`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">Thank you!</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Your message has been received. Our team will review your enquiry and get back to you shortly.
        </p>
        <div className="mt-4 inline-block rounded-md bg-white px-3.5 py-1.5 text-xs font-mono font-semibold text-brand-800 border border-brand-200">
          Reference: {submittedRef}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-ink">
          Your name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="mt-1.5 block w-full rounded-lg border border-line bg-sand-50/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-ink">
          Your email <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="mt-1.5 block w-full rounded-lg border border-line bg-sand-50/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-ink">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Volunteer Enquiry, CSR Partnership, General Support"
          className="mt-1.5 block w-full rounded-lg border border-line bg-sand-50/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-ink">
          Your message <span className="text-xs text-ink-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help or collaborate with you?"
          className="mt-1.5 block w-full rounded-lg border border-line bg-sand-50/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 resize-y"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#24292e] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#181a1d] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
