/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/getPageInfo',
        destination: 'http://localhost:7001/api/getPageInfo',
      },
    ];
  },
};

module.exports = nextConfig;
