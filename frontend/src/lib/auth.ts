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
  isEmailVerified: boolean;
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
    if (!this.accessToken || !this.tokenExpiry) return null;
    
    // Check if token is expired
    if (Date.now() >= this.tokenExpiry) {
      this.accessToken = null;
      this.tokenExpiry = null;
      return null;
    }
    
    return this.accessToken;
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
    
    if (!token) {
      throw new Error('No valid access token available');
    }

    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      credentials: 'include', // Include cookies for refresh token
    });

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
    const response = await fetch(`${this.API_BASE_URL}/api/authentication/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include refresh token cookie
      body: JSON.stringify({ refreshToken: '' }), // Empty string since we use cookies
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const authResponse: AuthResponse = await response.json();
    this.setAccessToken(authResponse.accessToken, authResponse.expiresAt);
  }

  // Logout user
  async logout(): Promise<void> {
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
    return this.makeAuthenticatedRequest<User>('/api/authentication/profile');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

// Export singleton instance
export const authService = new AuthService();
export type { User, LoginData, RegisterData, AuthResponse };
