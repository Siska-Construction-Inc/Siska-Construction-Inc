'use client';

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getContactPhone, contactEmail, getContactMailto, getContactPerson } from "@/lib/contact";
import { useAppLocale } from "@/lib/i18n/TranslationProvider";

export function ContactForm() {
  const { t: tHome } = useTranslation("home");
  const { t } = useTranslation("common");
  const { locale } = useAppLocale();
  const phone = getContactPhone(locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !message) {
      setError(t("contact.form.errors.missing"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, hp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unknown error");

      setSuccess(t("contact.form.success"));
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || t("contact.form.errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-neutral-950 py-24 text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 text-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
            {tHome("contact.kicker")}
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            {tHome("contact.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-neutral-300">
            {tHome("contact.subtitle")}
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl text-left text-neutral-900">
            <div className="grid gap-8 sm:[grid-template-columns:2fr_3fr]">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{t("contact.title")}</p>
                  <p className="text-base font-medium text-neutral-700">{getContactPerson(locale)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{t("contact.phone")}</p>
                  <a className="text-base font-medium text-neutral-900" href={phone.href}>
                    {phone.display}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{t("contact.email")}</p>
                  <a className="text-base font-medium text-neutral-900" href={getContactMailto(locale)}>
                    {contactEmail}
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="text-left" aria-label="Quick contact form">
                <input
                  type="text"
                  name="hp"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <label className="mb-2 block text-sm text-neutral-700">{t("contact.name")}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="mb-4 w-full rounded border border-neutral-200 px-3 py-2" />

                <label className="mb-2 block text-sm text-neutral-700">{t("contact.email")}</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mb-4 w-full rounded border border-neutral-200 px-3 py-2" />

                <label className="mb-2 block text-sm text-neutral-700">{t("contact.message")}</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mb-4 w-full rounded border border-neutral-200 px-3 py-2 resize-y min-h-16 max-h-56"
                />

                <div className="flex flex-col items-center">
                  <button type="submit" disabled={loading} className="rounded bg-amber-500 px-6 py-2 font-medium text-neutral-900 disabled:opacity-60">
                    {loading ? t("contact.form.sending") : t("contact.form.send")}
                  </button>
                  {success && <p className="text-sm text-emerald-600">{success}</p>}
                  {error && <p className="text-sm text-rose-600">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          {tHome("contact.note")}
        </p>
      </div>
    </section>
  );
}
