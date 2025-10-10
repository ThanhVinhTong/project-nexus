import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for protecting routes and handling authentication
// Security: Runs on every request to check authentication status

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/verify-email', '/logout'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Check if user has authentication tokens in cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const hasAuthTokens = accessToken || refreshToken;
  
  // If accessing protected route without any auth tokens, redirect to login
  if (!isPublicRoute && !hasAuthTokens) {
    // Only redirect if not already going to login
    if (pathname !== '/login') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // If accessing login/register with valid tokens, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register') && hasAuthTokens) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:5160;"
  );
  
  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
