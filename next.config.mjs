/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopackPluginRuntimeStrategy: "workerThreads",
    agentUpgrade: "security",
  },
};

export default nextConfig;