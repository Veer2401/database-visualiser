import { NextResponse } from 'next/server';

/**
 * Add cache headers to API responses
 * Useful for Vercel caching strategy
 */
export function setCacheHeaders(
  response: NextResponse,
  maxAge: number = 60,
  sMaxAge: number = 120,
  staleWhileRevalidate: number = 300
) {
  response.headers.set(
    'Cache-Control',
    `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  );
  return response;
}

/**
 * Add no-cache headers for dynamic/user-specific responses
 */
export function setNoCacheHeaders(response: NextResponse) {
  response.headers.set(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate'
  );
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

/**
 * Add immutable cache headers for permanent resources
 */
export function setImmutableCacheHeaders(response: NextResponse) {
  response.headers.set(
    'Cache-Control',
    'public, max-age=31536000, immutable'
  );
  return response;
}
