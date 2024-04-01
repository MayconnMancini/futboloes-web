//next
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //domains: ["**.media.api-sports.io**"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
      },
    ],
  },
}

module.exports = nextConfig
