// Authentication service for handling JWT tokens and API calls
// Security: Uses HTTP-only cookies for refresh tokens, memory storage for access tokens

interface User {
  userId: number;
  legalName: string;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
  lastLoginAt?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  legalName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class AuthService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  private readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5160';

  // Store access token in memory (not localStorage for security)
  setAccessToken(token: string, expiresAt: string): void {
    this.accessToken = token;
    this.tokenExpiry = new Date(expiresAt).getTime();
  }

  // Get current access token
  getAccessToken(): string | null {
    return 'demo-token'; // Always return a dummy token for demo
    /*
    if (!this.accessToken || !this.tokenExpiry) return null;
    
    // Check if token is expired
    if (Date.now() >= this.tokenExpiry) {
      this.accessToken = null;
      this.tokenExpiry = null;
      return null;
    }
    
    return this.accessToken;
    */
  }

  // Clear stored tokens
  clearTokens(): void {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Make authenticated API request
  async makeAuthenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAccessToken();
    // Temporarily allow request without token for demo
    // if (!token) {
    //   throw new Error('No valid access token available');
    // }

    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      credentials: 'include', // Include cookies for refresh token
    });

    console.log('makeAuthenticatedRequest response', response);

    // Handle token expiration
    if (response.status === 401 && response.headers.get('Token-Expired')) {
      try {
        await this.refreshAccessToken();
        // Retry the original request
        return this.makeAuthenticatedRequest<T>(endpoint, options);
      } catch (error) {
        this.clearTokens();
        throw new Error('Session expired. Please log in again.');
      }
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Login user
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${this.API_BASE_URL}/api/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for refresh token
      body: JSON.stringify(loginData),
    });
    console.log('2');
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const authResponse: AuthResponse = await response.json();
    this.setAccessToken(authResponse.accessToken, authResponse.expiresAt);

    return authResponse;
  }

  // Register user
  async register(registerData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${this.API_BASE_URL}/api/authentication/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for refresh token
      body: JSON.stringify(registerData),
    });
    console.log('3');
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const authResponse: AuthResponse = await response.json();
    this.setAccessToken(authResponse.accessToken, authResponse.expiresAt);

    return authResponse;
  }

  // Refresh access token using refresh token cookie
  async refreshAccessToken(): Promise<void> {
    // First try: no body, no content-type (common pattern when server reads cookie only)
    let response = await fetch(`${this.API_BASE_URL}/api/authentication/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    console.log('4');
    console.log('refreshAccessToken response', response);
    // Fallback: send empty JSON if server requires a body
    if (!response.ok) {
      try {
        response = await fetch(`${this.API_BASE_URL}/api/authentication/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ refreshToken: '' }),
        });
      } catch (_) {
        // ignore and handle below
      }
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText} ${errorText}`.trim());
    }

    const authResponse: AuthResponse = await response.json();
    this.setAccessToken(authResponse.accessToken, authResponse.expiresAt);
  }

  // Logout user
  async logout(): Promise<void> {
    console.log('5');
    try {
      await this.makeAuthenticatedRequest('/api/authentication/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearTokens();
    }
  }

  // Get user profile
  async getProfile(): Promise<User> {
    // Return dummy user for demo
    return {
      userId: 1,
      legalName: 'Demo User',
      userName: 'demouser',
      email: 'demo@example.com',
      role: 'Admin',
      createdAt: new Date().toISOString()
    };
    // return this.makeAuthenticatedRequest<User>('/api/authentication/profile');
  }

  // Initialize auth service (call this on app startup)
  async initialize(): Promise<boolean> {
    console.log('7');
    try {
      // If we already have a valid access token, we're good
      if (this.getAccessToken() !== null) {
        return true;
      }

      // Always attempt a silent refresh once on startup.
      // The server will read the HttpOnly refresh cookie if present.
      // await this.refreshAccessToken();
      return this.getAccessToken() !== null;
    } catch (error) {
      console.error('Auth initialization failed:', error);
      return false;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return true; // Always true for demo
    // Only trust the in-memory access token. HttpOnly cookies are not readable here.
    // return this.getAccessToken() !== null;
  }
}

// Export singleton instance
export const authService = new AuthService();
export type { AuthService, User, LoginData, RegisterData, AuthResponse };
