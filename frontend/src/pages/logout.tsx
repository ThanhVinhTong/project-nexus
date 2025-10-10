"use client";

import { useEffect } from 'react';
import { authService } from '@/lib/auth';

export default function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      console.log('Logout page: Starting logout process...');
      
      try {
        // Call logout API
        await authService.logout();
        console.log('Logout page: API logout completed');
      } catch (error) {
        console.error('Logout page: API logout failed:', error);
      }
      
      // Clear all storage
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        console.log('Logout page: Storage cleared');
      }
      
      // Clear cookies
      if (typeof document !== 'undefined') {
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log('Logout page: Cookies cleared');
      }
      
      // Force redirect to login
      console.log('Logout page: Redirecting to login...');
      window.location.href = '/login';
    };
    
    performLogout();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  );
}
