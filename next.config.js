/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
      largePageDataBytes: 128 * 100000,
    },
}

module.exports = nextConfig
