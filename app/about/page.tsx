"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAppLocale } from "@/lib/i18n/TranslationProvider";
import { CONTACT_PERSON_CS, CONTACT_PERSON_EN } from "@/components/constants";

type EssenceCard = {
  title: string;
  text: string;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
};

type HistoryItem = {
  year: string;
  title: string;
  description: string;
};

function toArray<T>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[];
  if (val && typeof val === "object") return Object.values(val) as T[];
  return [];
}

export default function AboutPage() {
  const { t } = useTranslation("about");
  const { locale } = useAppLocale();
  const contactName = locale === "cs" ? CONTACT_PERSON_CS : CONTACT_PERSON_EN;

  const rawEssence = t("essence", { returnObjects: true });
  const rawTeam = t("teamMembers", { returnObjects: true });
  const rawHistory = t("history", { returnObjects: true });

  const essence = toArray<EssenceCard>(rawEssence);
  const teamMembers = toArray<TeamMember>(rawTeam);
  const history = toArray<HistoryItem>(rawHistory);

  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">{t("hero.kicker")}</p>
            <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{t("hero.title")}</h1>
            <p className="text-base text-neutral-600 md:text-lg">{t("team.subtitle")}</p>
            <p className="text-base text-neutral-600">{t("hero.description")}</p>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-900/5">
              <Image
                src="/team/robert.jpg"
                alt="Robert Siska in the office"
                width={640}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/30 bg-neutral-900/80 px-6 py-4 text-neutral-100 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300">{t("team.member.role")}</p>
                <p className="mt-1 text-lg font-semibold">{contactName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 py-20">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{t("essenceHeading")}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {essence.map((card) => (
            <article key={card.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">{card.title}</p>
              <p className="mt-3 text-base text-neutral-600">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl space-y-8 px-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{t("teamHeading")}</h2>
            <p className="text-base text-neutral-600">{t("teamDescription")}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.map((member) => (
              <article 
                key={member.name} 
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm shadow-neutral-900/5"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={`/team/${member.image ?? 'robert.jpg'}`}
                    alt={member.name}
                    width={800}
                    height={1080}
                    className="h-64 md:h-80 w-full object-cover"
                    priority={false}
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900">{member.name}</h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">{member.role}</p>
                <p className="mt-3 text-sm text-neutral-600 text-justify">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 py-20">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">{t("historyHeading")}</p>
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{t("historyHeading")}</h2>
          <p className="text-base text-neutral-600">{t("historyIntro")}</p>
        </div>
        <ol className="space-y-6">
          {history.map((item) => (
            <li key={`${item.year}-${item.title}`} className="rounded-3xl border border-dashed border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-lg font-semibold text-neutral-900">{item.year}</p>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">{item.title}</p>
              </div>
              <p className="mt-3 text-base text-neutral-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
