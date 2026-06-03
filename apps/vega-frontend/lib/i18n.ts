export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocalizedField<T extends Record<string, any>>(
  obj: T,
  field: string,
  locale: Locale
): string {
  if (locale === "ar") {
    const arField = `${field}Ar` as keyof T;
    const value = obj[arField];
    if (value && String(value).trim()) return String(value);
  }
  const enValue = obj[field as keyof T];
  return enValue ? String(enValue) : "";
}

export function localizeProduct(product: any, locale: Locale) {
  if (!product) return null;
  return {
    ...product,
    name: locale === "ar" && product.nameAr ? product.nameAr : product.name,
    description:
      locale === "ar" && product.shortDescriptionAr
        ? product.shortDescriptionAr
        : product.shortDescription || product.fullDescription || product.description || "",
    fullDescription:
      locale === "ar" && product.fullDescriptionAr
        ? product.fullDescriptionAr
        : product.fullDescription || "",
    features:
      locale === "ar" && product.featuresAr
        ? product.featuresAr
        : product.features || [],
  };
}

export function localizeCategory(category: any, locale: Locale) {
  if (!category) return null;
  return {
    ...category,
    name: locale === "ar" && category.nameAr ? category.nameAr : category.name,
  };
}

export function localizeBlog(blog: any, locale: Locale) {
  if (!blog) return null;
  return {
    ...blog,
    title: locale === "ar" && blog.titleAr ? blog.titleAr : blog.title,
    excerpt: locale === "ar" && blog.excerptAr ? blog.excerptAr : blog.excerpt,
    content: locale === "ar" && blog.contentAr ? blog.contentAr : blog.content,
  };
}

export function localizeCareer(career: any, locale: Locale) {
  if (!career) return null;
  return {
    ...career,
    title: locale === "ar" && career.titleAr ? career.titleAr : career.title,
    description:
      locale === "ar" && career.descriptionAr
        ? career.descriptionAr
        : career.description,
    requirements:
      locale === "ar" && career.requirementsAr
        ? career.requirementsAr
        : career.requirements,
  };
}

export function localizeFaq(faq: any, locale: Locale) {
  if (!faq) return null;
  return {
    ...faq,
    q: locale === "ar" && faq.questionAr ? faq.questionAr : faq.q || faq.question,
    a: locale === "ar" && faq.answerAr ? faq.answerAr : faq.a || faq.answer,
  };
}

export function localizeCatalog(catalog: any, locale: Locale) {
  if (!catalog) return null;
  return {
    ...catalog,
    name: locale === "ar" && catalog.nameAr ? catalog.nameAr : catalog.name,
    description:
      locale === "ar" && catalog.descriptionAr
        ? catalog.descriptionAr
        : catalog.description,
  };
}

export function localizeGallery(gallery: any, locale: Locale) {
  if (!gallery) return null;
  return {
    ...gallery,
    name: locale === "ar" && gallery.nameAr ? gallery.nameAr : gallery.name,
  };
}

export function localizeTeam(team: any, locale: Locale) {
  if (!team) return null;
  return {
    ...team,
    name: locale === "ar" && team.nameAr ? team.nameAr : team.name,
    bio: locale === "ar" && team.bioAr ? team.bioAr : team.bio,
    designation:
      locale === "ar" && team.designationAr
        ? team.designationAr
        : team.designation,
  };
}

export function localizeSetting(setting: any, locale: Locale) {
  if (!setting) return null;
  return {
    ...setting,
    label:
      locale === "ar" && setting.labelAr ? setting.labelAr : setting.label,
    value:
      locale === "ar" && setting.valueAr ? setting.valueAr : setting.value,
  };
}
