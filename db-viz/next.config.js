const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
      'motion',
      '@tabler/icons-react',
      'firebase/firestore',
      'firebase/auth',
      'firebase/app',
      'radix-ui',
      'reactflow',
      '@reactflow/core',
      '@reactflow/controls',
      'gsap',
      'lenis',
    ],
  },
  // ─── HTTP Security & Caching Headers ───────────────────────────────────────
  async headers() {
    return [
      {
        // Cache static JS/CSS assets immutably for max performance
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Apply security headers to every page and API route
        source: '/(.*)',
        headers: [
          // Prevent the page from being embedded in an iframe (clickjacking)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME-type sniffing attacks
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control how much referrer info is sent with requests
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable browser DNS prefetching for privacy
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          // Restrict browser features not needed by this app
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Force HTTPS for 1 year, include all subdomains
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // CSP in report-only mode: logs violations but never blocks (safe for live site)
          // Review browser console before switching to 'Content-Security-Policy'
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.googleusercontent.com",
              "connect-src 'self' https://*.firebaseapp.com https://*.googleapis.com https://generativelanguage.googleapis.com https://openrouter.ai wss://*.firebaseio.com",
              "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      {
        // API routes must never be cached publicly — safety net on top of code-level headers
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ];
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

module.exports = withBundleAnalyzer(nextConfig);
