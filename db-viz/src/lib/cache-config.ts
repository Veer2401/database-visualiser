/**
 * Cache-aware page metadata and revalidation configuration
 * This file documents the caching strategy for each page
 */

export const PAGE_CACHE_CONFIG = {
  // Landing/Public Pages - Cache for long time (ISR)
  landing: {
    revalidate: 86400, // 24 hours
    dynamic: 'auto',
    description: 'Main landing page - revalidates every 24 hours'
  },
  
  pricing: {
    revalidate: 86400, // 24 hours
    dynamic: 'auto',
    description: 'Pricing page - static, revalidates every 24 hours'
  },
  
  privacy_policy: {
    revalidate: 604800, // 7 days
    dynamic: 'auto',
    description: 'Privacy policy - rarely changes, revalidate weekly'
  },
  
  terms_of_service: {
    revalidate: 604800, // 7 days
    dynamic: 'auto',
    description: 'Terms of service - rarely changes, revalidate weekly'
  },
  
  documentation: {
    revalidate: 86400, // 24 hours
    dynamic: 'auto',
    description: 'Documentation - revalidates daily'
  },
  
  // Dynamic Pages - No caching (always fresh)
  dashboard: {
    revalidate: 0,
    dynamic: 'force-dynamic',
    description: 'User dashboard - always fresh, no caching'
  },
  
  terminal_mode: {
    revalidate: 0,
    dynamic: 'force-dynamic',
    description: 'Terminal mode - always fresh'
  },
  
  presentation: {
    revalidate: 0,
    dynamic: 'force-dynamic',
    description: 'Presentation mode - always fresh'
  },
  
  profile: {
    revalidate: 0,
    dynamic: 'force-dynamic',
    description: 'User profile - always fresh'
  },
  
  settings: {
    revalidate: 0,
    dynamic: 'force-dynamic',
    description: 'User settings - always fresh'
  },
  
  login: {
    revalidate: 3600, // 1 hour
    dynamic: 'auto',
    description: 'Login page - cache for 1 hour'
  }
};

/**
 * API Route Cache Configuration
 * Defines how long each API endpoint should be cached
 */
export const API_CACHE_CONFIG = {
  // User-specific routes - Never cache (private data)
  dynamicRoutes: [
    '/api/query/execute',
    '/api/database/list',
    '/api/database/create',
    '/api/database/drop',
    '/api/table/describe',
    '/api/table/create',
    '/api/chat/openrouter'
  ],
  
  // Cache strategy: private, no-cache, no-store
  noCacheDuration: 0,
  
  // Headers for dynamic routes
  dynamicHeaders: {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
};

/**
 * Static asset cache configuration
 * These are served with aggressive caching (1 year)
 */
export const STATIC_ASSET_CONFIG = {
  // Image cache - 1 year immutable
  images: {
    maxAge: 31536000,
    immutable: true,
    extensions: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif']
  },
  
  // Font cache - 1 year immutable
  fonts: {
    maxAge: 31536000,
    immutable: true,
    extensions: ['.woff', '.woff2', '.ttf', '.otf']
  },
  
  // Next.js static assets - 1 year immutable
  nextStatic: {
    maxAge: 31536000,
    immutable: true,
    pattern: '/_next/static/**'
  }
};

/**
 * Get cache headers for a URL path
 * @param path - URL path to check
 * @returns Cache control string
 */
export function getCacheHeadersForPath(path: string): string {
  // Static assets
  if (path.match(/\.(png|jpg|jpeg|gif|webp|svg|avif|woff|woff2|ttf|otf)$/i)) {
    return 'public, max-age=31536000, immutable';
  }
  
  // Next.js static assets
  if (path.startsWith('/_next/static/')) {
    return 'public, max-age=31536000, immutable';
  }
  
  // API routes - don't cache user-specific data
  if (path.startsWith('/api/')) {
    return 'private, no-cache, no-store, must-revalidate';
  }
  
  // Default public page caching
  return 'public, max-age=3600, s-maxage=86400';
}

/**
 * Revalidate path on demand
 * Useful for content updates
 * Usage: call from API route on content update
 */
export async function revalidatePath(path: string): Promise<void> {
  // This would be implemented in your API route
  // Using NextResponse to trigger revalidation
  console.log(`[Cache] Revalidating path: ${path}`);
}
