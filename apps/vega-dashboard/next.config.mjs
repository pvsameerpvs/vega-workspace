/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: "standalone",
  transpilePackages: ["@vega/ui", "@vega/utils"],
};

export default nextConfig;
