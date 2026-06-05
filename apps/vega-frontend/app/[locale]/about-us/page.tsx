import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getTeam, getCounters, mapTeamToFrontend } from "@/lib/api";
import {
  AboutStory,
  AboutStats,
  AboutValues,
  AboutTeam,
  AboutCta,
} from "./sections";

export const metadata: Metadata = {
  title: "About Us | Vega UAE",
  description:
    "Learn about Vega, a trusted supplier of camp furniture, barriers, and industrial supplies across the UAE.",
};

export default async function AboutUsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";

  const [team, counters] = await Promise.all([getTeam(), getCounters()]);
  const mappedTeam = (team || [])
    .map(mapTeamToFrontend)
    .filter(Boolean) as any[];
  const mappedCounters = counters.filter(Boolean);

  const stats =
    mappedCounters.length > 0
      ? mappedCounters.slice(0, 4).map((c: any) => ({
          value: c.value || c.label,
          label: isAR && c.labelAr ? c.labelAr : c.label || c.labelAr,
        }))
      : [
          { value: "15+", label: isAR ? "سنوات من الخبرة" : "Years of experience" },
          { value: "10,000+", label: isAR ? "قدم مربع مستودع" : "sq ft warehouse" },
          { value: "1,500+", label: isAR ? "عميل راضٍ" : "Satisfied customers" },
          { value: "300+", label: isAR ? "منتج في المخزون" : "Products in stock" },
        ];

  return (
    <main>
      <AboutStory isAR={isAR} />
      <AboutStats isAR={isAR} stats={stats} />
      <AboutValues isAR={isAR} />
      <AboutTeam isAR={isAR} team={mappedTeam} />
      <AboutCta isAR={isAR} locale={locale} />
    </main>
  );
}
