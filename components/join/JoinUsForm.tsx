"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  Heart,
  Laptop,
  Mail,
  Send,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { content, links } from "@/config/content";

const roleIcons: Record<string, typeof UsersRound> = {
  volunteer: UsersRound,
  internship: GraduationCap,
  csr_partner: Building2,
  trainer: Laptop,
  supporter: Heart,
  other: BriefcaseBusiness,
};

export function JoinUsForm() {
  const roles = content.join.roles;
  const defaultRole = roles[0]!;

  const [selectedRoleId, setSelectedRoleId] = useState<string>(defaultRole.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<string>(defaultRole.suggestedSubject);
  const [message, setMessage] = useState<string>(defaultRole.suggestedMessage);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    reference: string;
    roleName: string;
    applicantName: string;
  } | null>(null);

  const currentRole = roles.find((r) => r.id === selectedRoleId) ?? defaultRole;

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId);
    const chosen = roles.find((r) => r.id === roleId);
    if (chosen) {
      setSubject(chosen.suggestedSubject);
      setMessage(chosen.suggestedMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          roleType: selectedRoleId,
          roleLabel: currentRole.label,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit application. Please try again.");
      }

      setSuccess({
        reference: data.reference || `BSGSS-JOIN-${Date.now().toString(36).toUpperCase()}`,
        roleName: currentRole.label,
        applicantName: name.trim(),
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-white via-sand-50/70 to-brand-50/50 p-6 sm:p-10 shadow-soft text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <CheckCircle2 className="h-8 w-8 text-brand-700" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-100/80 px-3 py-1 text-xs font-semibold text-brand-850">
          Application Received
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
          Thank you, {success.applicantName}!
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-ink-muted sm:text-sm">
          Your application for <span className="font-semibold text-ink">{success.roleName}</span> has been successfully logged with our community coordination desk.
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-xl border border-brand-200/80 bg-white p-4 shadow-2xs">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Application Reference ID</p>
          <p className="mt-1 font-mono text-base font-bold text-ink select-all">{success.reference}</p>
          <p className="mt-1 text-[0.6875rem] text-ink-muted">A confirmation notice has been sent to {email}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSuccess(null);
              setName("");
              setEmail("");
              setPhone("");
            }}
            className="rounded-lg border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-2xs hover:bg-sand-50 sm:text-sm"
          >
            Submit another application
          </button>
          <a
            href={links.work}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-brand-800 sm:text-sm"
          >
            Explore our programmes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700" />

      <div className="p-6 sm:p-8 md:p-10">
        <div>
          <div className="flex items-center gap-2 text-brand-700">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Fast & Smart Application</span>
          </div>
          <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
            How would you like to join BSGSS?
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
            Select a role below. Suggested subject and text will automatically populate so you only need to enter your contact info and submit!
          </p>
        </div>

        {/* Interactive Role Selector Pills */}
        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
            1. Select Your Pathway
          </label>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => {
              const Icon = roleIcons[role.id] ?? UsersRound;
              const isSelected = selectedRoleId === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-brand-600 bg-brand-50/80 shadow-2xs ring-1 ring-brand-500"
                      : "border-line bg-white hover:border-brand-200 hover:bg-sand-50/50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isSelected ? "bg-brand-700 text-white" : "bg-sand-100 text-brand-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="block text-xs font-bold text-ink sm:text-sm">
                        {role.shortTitle}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[0.6875rem] leading-relaxed text-ink-muted line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Auto-Suggestion Banner */}
        <div className="mt-5 rounded-xl border border-brand-200/80 bg-gradient-to-r from-sand-50 via-brand-50/40 to-sand-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-brand-850">
              Selected Pathway: <span className="text-ink">{currentRole.label}</span>
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-[0.6875rem] font-semibold text-brand-700 shadow-2xs border border-brand-100">
              {currentRole.badge}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            Subject and text below are auto-configured. You can submit directly or edit them as needed.
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="join-name" className="block text-xs font-semibold text-ink">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="join-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="mt-1.5 h-10 w-full rounded-lg border border-line bg-sand-50/40 px-3 text-xs text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="join-email" className="block text-xs font-semibold text-ink">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="join-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="mt-1.5 h-10 w-full rounded-lg border border-line bg-sand-50/40 px-3 text-xs text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="join-phone" className="block text-xs font-semibold text-ink">
                Phone Number (optional)
              </label>
              <input
                id="join-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="mt-1.5 h-10 w-full rounded-lg border border-line bg-sand-50/40 px-3 text-xs text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="join-subject" className="block text-xs font-semibold text-ink">
                Application Subject (auto-suggested)
              </label>
              <input
                id="join-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-line bg-sand-50/40 px-3 text-xs font-medium text-ink focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="join-message" className="block text-xs font-semibold text-ink">
                Your Note / Statement (auto-suggested)
              </label>
              <button
                type="button"
                onClick={() => setMessage(currentRole.suggestedMessage)}
                className="text-[0.6875rem] font-semibold text-brand-700 hover:underline"
              >
                Reset to default suggestion
              </button>
            </div>
            <textarea
              id="join-message"
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-sand-50/40 p-3 text-xs text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-700 px-6 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 disabled:opacity-60 sm:text-sm"
            >
              {loading ? (
                <>Submitting application...</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Application
                </>
              )}
            </button>

            <a
              href={`mailto:bsgssindia@yahoo.co.in?subject=${encodeURIComponent(
                subject || "Joining BSGSS"
              )}&body=${encodeURIComponent(
                `Name: ${name || "[Your Name]"}\nEmail: ${email || "[Your Email]"}\nPhone: ${
                  phone || "N/A"
                }\nRole: ${currentRole.label}\n\n${message}`
              )}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              Or send directly via email client
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
