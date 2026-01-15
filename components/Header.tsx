'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppLocale } from "@/lib/i18n/TranslationProvider";
import { getContactMailto } from "@/lib/contact";

const linkClasses =
  "text-sm font-semibold text-neutral-600 transition hover:text-neutral-900 data-[active=true]:text-neutral-900";
const actionButtonClasses =
  "rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-neutral-50 shadow-sm transition hover:bg-neutral-700";
const languageButtonClasses =
  "rounded-full border w-10 h-10 flex-shrink-0 flex items-center justify-center transition";

export function Header() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const { locale, setLocale } = useAppLocale();

  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { href: "/", label: t("navigation.home") },
      { href: "/about", label: t("navigation.about") },
      { href: "/projects", label: t("navigation.projects") },
      { href: "/#contact", label: t("navigation.contact") },
    ],
    [t],
  );

  const otherLocale = locale === "cs" ? "en" : "cs";

  function Flag({ code }: { code: "cs" | "en" }) {
    return code === "cs" ? (
      <span className="fi fi-cz" aria-hidden />
    ) : (
      <span className="fi fi-us" aria-hidden />
    );
  }

  const toggleLocale = () => setLocale(otherLocale);
  const toggleMenu = () => setMenuOpen((s) => !s);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/logos/logo.jpg"
            alt="Siska Construction logo"
            width={168}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const baseHref = link.href.replace(/#.*/, "");
            const isActive =
              baseHref === "/"
                ? pathname === "/"
                : pathname.startsWith(baseHref);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses}
                data-active={isActive}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 justify-end">
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={t(`language.switch` as const)}
              className={`${languageButtonClasses} border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 flex items-center gap-2`}
            >
              <Flag code={otherLocale as "cs" | "en"} />
            </button>
          </div>
          <a href="#contact" className={`${actionButtonClasses} hidden md:inline-flex`}>
            {t("cta.requestQuote")}
          </a>
          {/* Mobile: hamburger button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("close") : t("open")}
            className="md:hidden rounded-full w-10 h-10 flex items-center justify-center border border-neutral-200 bg-white text-neutral-700"
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect y="0" width="20" height="2" rx="1" fill="currentColor" />
              <rect y="5" width="20" height="2" rx="1" fill="currentColor" />
              <rect y="10" width="20" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} border-t border-neutral-200 bg-white/95`}>
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav className="flex flex-col items-end gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${linkClasses} block w-full py-3 text-right`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => { toggleLocale(); setMenuOpen(false); }}
              aria-label={t(`language.switch` as const)}
              className={`${languageButtonClasses} border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900`}
            >
              <Flag code={otherLocale as "cs" | "en"} />
            </button>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className={`${actionButtonClasses} flex-1 text-center ml-3`}
            >
              {t("cta.requestQuote")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
