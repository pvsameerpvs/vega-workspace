/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@vega/ui", "@vega/db", "@vega/utils"],
};

export default nextConfig;
