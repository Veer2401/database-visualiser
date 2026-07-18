const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid picking ~/package-lock.json as workspace root (breaks tailwindcss resolve)
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true, // Required for Netlify static export
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
  // Compress responses
  compress: true,
  // Aggressive tree-shaking for large packages
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@tabler/icons-react',
      'firebase/firestore',
      'firebase/auth',
      'firebase/app',
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure heavy PDF/DOCX libs are only in the chunks that need them
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Separate Firebase into its own chunk
          firebase: {
            name: 'firebase',
            test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
            chunks: 'all',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Separate ReactFlow
          reactflow: {
            name: 'reactflow',
            test: /[\\/]node_modules[\\/](reactflow|@reactflow)[\\/]/,
            chunks: 'all',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Isolate heavy export libs (jspdf, html2canvas, docx)
          exportLibs: {
            name: 'export-libs',
            test: /[\\/]node_modules[\\/](jspdf|html2canvas|docx|file-saver)[\\/]/,
            chunks: 'async', // Only load when actually needed
            priority: 20,
            reuseExistingChunk: true,
          },
          // Isolate framer-motion
          framerMotion: {
            name: 'framer-motion',
            test: /[\\/]node_modules[\\/](framer-motion|motion)[\\/]/,
            chunks: 'all',
            priority: 15,
            reuseExistingChunk: true,
          },
          // Default vendor chunk
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
