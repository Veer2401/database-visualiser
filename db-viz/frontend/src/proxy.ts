import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Cache static assets (JS, CSS) indefinitely
  if (
    request.nextUrl.pathname.startsWith('/_next/static/') ||
    request.nextUrl.pathname.endsWith('.js') ||
    request.nextUrl.pathname.endsWith('.css')
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Cache images for 1 year
  if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Cache HTML pages - use ISR/stale-while-revalidate
  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.match(
      /^\/(pricing|privacy-policy|terms-of-service|documentation)$/
    )
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
    );
  }

  // Cache API responses with shorter TTL
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=60, s-maxage=120, stale-while-revalidate=300'
    );
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/image (image optimization files)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/image|_next/static|favicon.ico|public).*)',
  ],
};

