"use client";

import { useState, FormEvent } from "react";
import { CheckCircle } from "lucide-react";

export default function QuickForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <CheckCircle size={40} className="text-brand-red" />
        <p className="text-lg font-semibold text-charcoal">Request sent successfully!</p>
        <p className="text-mid-gray text-sm">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          className="px-4 py-3 rounded-lg border border-border-gray bg-white text-sm text-charcoal placeholder-mid-gray focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Business Email"
          required
          className="px-4 py-3 rounded-lg border border-border-gray bg-white text-sm text-charcoal placeholder-mid-gray focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
        />
      </div>
      <input
        type="text"
        name="company"
        placeholder="Company Name"
        className="px-4 py-3 rounded-lg border border-border-gray bg-white text-sm text-charcoal placeholder-mid-gray focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
      />
      <select
        name="service"
        required
        defaultValue=""
        className="px-4 py-3 rounded-lg border border-border-gray bg-white text-sm text-charcoal focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
      >
        <option value="" disabled>What do you need help with?</option>
        <option>Custom Software</option>
        <option>Cloud & Digital Transformation</option>
        <option>AI & Data Analytics</option>
        <option>Automation & SaaS</option>
        <option>Mobile & Web Engineering</option>
        <option>Other</option>
      </select>
      <textarea
        name="message"
        placeholder="Brief message…"
        rows={3}
        className="px-4 py-3 rounded-lg border border-border-gray bg-white text-sm text-charcoal placeholder-mid-gray focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-brand-red-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          "Send My Request"
        )}
      </button>
    </form>
  );
}
