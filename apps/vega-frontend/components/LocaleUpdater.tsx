"use client";

import { useLayoutEffect } from "react";

export function LocaleUpdater({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  return null;
}
