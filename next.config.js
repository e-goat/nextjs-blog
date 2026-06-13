const { withContentlayer } = require("next-contentlayer2")

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },
}

module.exports = withContentlayer(nextConfig)
