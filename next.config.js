/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      "/api/analysis": { page: "/api/analysis" },
    };
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
