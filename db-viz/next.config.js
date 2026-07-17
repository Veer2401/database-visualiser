const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid picking ~/package-lock.json as workspace root (breaks tailwindcss resolve)
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true, // Required for Netlify
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      'lucide-react',
      'framer-motion',
    ],
  },
};

module.exports = nextConfig;

