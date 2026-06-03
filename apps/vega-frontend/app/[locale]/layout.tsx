import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { LocaleUpdater } from "@/components/LocaleUpdater";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <LocaleUpdater locale={locale} />
      {children}
    </>
  );
}
