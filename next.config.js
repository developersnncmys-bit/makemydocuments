/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  reactStrictMode: false,
  compress: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
};
