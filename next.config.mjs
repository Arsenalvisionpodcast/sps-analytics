/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint circular-ref bug with eslint-config-next 14 — types still checked
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
