/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [...config.externals, 'pngquant-bin'];
    }
    return config;
  },
}

module.exports = nextConfig