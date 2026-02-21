import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TranslationProvider } from "@/lib/i18n/TranslationProvider";
import { initTranslations } from "@/lib/i18n/initTranslations";
import { resolveLocale } from "@/lib/i18n/localeUtils";
import { namespaces, type Locale } from "@/lib/i18n/settings";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Siska Construction Inc.",
    template: "%s | Siska Construction Inc.",
  },
  description:
    "Siska Construction Inc. — full-service remodeling and precise renovations. See individual project pages for detailed descriptions.",
  keywords: [
    "Siska Construction",
    "Robert Siska",
    "Chicago remodeling",
    "Rancho Mirage renovation",
    "Mission Viejo remodeling",
    "Ladera Ranch renovation",
    "Lake Shore Drive bathroom",
    "Glen Ellyn remodel",
    "kitchen remodeling",
    "bathroom renovation",
    "luxury home remodel",
    "deck replacement",
    "home renovation contractor",
    "Southern California home remodeling",
    "Northern Illinois remodeling",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language");
  const initialLocale = resolveLocale(acceptLanguage) as Locale;

  const { resources } = await initTranslations(initialLocale, [...namespaces]);

  return (
    <html lang={initialLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-neutral-100 font-sans text-neutral-900 antialiased`}
      >
        <TranslationProvider
          initialLocale={initialLocale}
          namespaces={[...namespaces]}
          resources={resources}
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
