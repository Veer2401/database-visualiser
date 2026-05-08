/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify compatibility
  output: 'standalone',
  
  images: {
    unoptimized: process.env.NODE_ENV === 'production', // Required for Netlify
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
  // Increase timeout for API routes
  serverRuntimeConfig: {
    timeout: 30,
  },
};

module.exports = nextConfig;

