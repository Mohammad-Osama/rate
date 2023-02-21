/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
      largePageDataBytes: 128 * 100000,
    },
    trailingSlash: true ,
}

module.exports = nextConfig
