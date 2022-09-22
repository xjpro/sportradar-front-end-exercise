/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cms.nhl.bamgrid.com", "www-league.nhlstatic.com"],
  },
};

module.exports = nextConfig;
