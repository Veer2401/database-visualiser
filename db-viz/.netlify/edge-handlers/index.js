// Netlify Edge Handler - optional performance optimization
export default async (request, context) => {
  // Add security headers
  const response = await context.next();
  
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
};
