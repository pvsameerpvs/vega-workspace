import type { LucideIcon } from "lucide-react";

export interface LandingItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface LandingUseCaseItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export type LandingSectionId =
  | "quote"
  | "products"
  | "categories"
  | "benefits"
  | "applications"
  | "whyUs"
  | "steps"
  | "useCases"
  | "inspiration"
  | "businessSolutions"
  | "trust"
  | "faq"
  | "final";

export interface LandingHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  imageAlt: string;
  specLines: string[];
}

export interface LandingSectionHeading {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export interface LandingContent {
  path: string;
  categoryName: string;
  hero: LandingHero;
  quote: LandingSectionHeading & { note: string };
  products: LandingSectionHeading & { emptyText: string; getQuote: string; viewDetails: string };
  categories?: LandingSectionHeading & { items: LandingItem[] };
  benefits?: LandingSectionHeading & { items: LandingItem[] };
  applications?: LandingSectionHeading & { items: LandingItem[] };
  whyUs?: LandingSectionHeading & { items: LandingItem[] };
  steps?: LandingSectionHeading & { items: LandingItem[] };
  useCases?: LandingSectionHeading & { items: LandingUseCaseItem[] };
  inspiration?: LandingSectionHeading & { image: string; imageAlt: string; text: string };
  trust: LandingSectionHeading & { items: LandingItem[] };
  faq: LandingSectionHeading & { items: { q: string; a: string }[] };
  finalCta: { eyebrow: string; title: string; subtitle: string; primary: string; secondary: string; note: string };
  sections: LandingSectionId[];
}