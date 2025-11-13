'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";

const wrapperClasses = "border-t border-stone-200 bg-stone-50";

const linkClasses = "text-sm font-medium text-stone-600 transition hover:text-stone-900";

export function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer className={wrapperClasses}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-700">
            Siska Construction Inc.
          </p>
          <div className="text-sm text-stone-600">
            <p>Robert Šiška</p>
            <p>
              <span className="font-medium">{t("contact.phone")}:</span>{" "}
              <a className={linkClasses} href="tel:+420737340795">
                +420 737 340 795
              </a>
            </p>
            <p>
              <span className="font-medium">{t("contact.email")}:</span>{" "}
              <a className={linkClasses} href="mailto:contact@siskaconstructioninc.com">
                contact@siskaconstructioninc.com
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm text-stone-500 md:items-end">
          <p>{t("footer.rights", { year })}</p>
          <p>
            {t("footer.crafted")}{" "}
            <Link
              href="https://github.com/ZurekMartin"
              className={linkClasses}
              target="_blank"
              rel="noreferrer"
            >
              Martin Žůrek
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
