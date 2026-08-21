import type { Metadata } from "next";

const SITE_URL = "https://www.thevegauae.com";

export function buildLandingMetadata({
  locale,
  path,
  title,
  description,
  image,
  imageAlt,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const ogImage = image || "/images/logo/logo.jpeg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Vega UAE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}