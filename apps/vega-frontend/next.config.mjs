/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  transpilePackages: ["@vega/ui", "@vega/db", "@vega/utils"],
};

export default nextConfig;
