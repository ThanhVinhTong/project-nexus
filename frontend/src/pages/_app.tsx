import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MainNavigation } from "@/components/MainNavigation";
import { authService } from "@/lib/auth";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/verify-email', '/logout'];
  const isPublicRoute = publicRoutes.includes(router.pathname);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        // If user is not authenticated and trying to access protected route
        if (!authenticated && !isPublicRoute) {
          router.replace('/login');
          return;
        }
        
        // If user is authenticated and trying to access auth pages
        if (authenticated && isPublicRoute) {
          router.replace('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          router.replace('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router.pathname, isPublicRoute]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated and not on public route
  if (!isAuthenticated && !isPublicRoute) {
    return null; // Don't render anything, let middleware handle redirect
  }

  // Don't show navigation on public pages
  const showNavigation = isAuthenticated && !isPublicRoute;

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <MainNavigation />}
      <main className={showNavigation ? "py-8" : ""}>
        <div className={showNavigation ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" : ""}>
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}
