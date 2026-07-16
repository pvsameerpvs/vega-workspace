/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/webp", "image/avif"],
    imageSizes: [256, 384, 512],
    deviceSizes: [640, 750, 1080, 1920, 2560, 3840],
    minimumCacheTTL: 86400,
    unoptimized: true,
  },

  transpilePackages: ["@vega/ui", "@vega/utils"],
};

export default nextConfig;
