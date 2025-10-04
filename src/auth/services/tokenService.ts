import { jwtDecode } from 'jwt-decode';
import type { JWTPayload, User, AuthConfig } from '../types';

/**
 * Token Service
 * Handles JWT token operations, validation, and storage
 */
class TokenService {
  private config: AuthConfig = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    tokenKey: 'libre_survey_token',
    refreshTokenKey: 'libre_survey_refresh_token',
    tokenExpiryBuffer: 5, // 5 minutes before expiry
  };

  /**
   * Store token in localStorage
   */
  setToken(token: string): void {
    try {
      localStorage.setItem(this.config.tokenKey, token);
    } catch (error) {
      console.warn('Failed to store token:', error);
    }
  }

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(this.config.tokenKey);
    } catch (error) {
      console.warn('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Store refresh token in localStorage
   */
  setRefreshToken(refreshToken: string): void {
    try {
      localStorage.setItem(this.config.refreshTokenKey, refreshToken);
    } catch (error) {
      console.warn('Failed to store refresh token:', error);
    }
  }

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.config.refreshTokenKey);
    } catch (error) {
      console.warn('Failed to retrieve refresh token:', error);
      return null;
    }
  }

  /**
   * Remove all tokens from storage
   */
  clearTokens(): void {
    try {
      localStorage.removeItem(this.config.tokenKey);
      localStorage.removeItem(this.config.refreshTokenKey);
    } catch (error) {
      console.warn('Failed to clear tokens:', error);
    }
  }

  /**
   * Decode JWT token and extract payload
   */
  decodeToken(token: string): JWTPayload | null {
    try {
      return jwtDecode<JWTPayload>(token);
    } catch (error) {
      console.warn('Failed to decode token:', error);
      return null;
    }
  }

  /**
   * Check if token is valid (not expired)
   */
  isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      if (!payload) return false;

      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (_error) {
      return false;
    }
  }

  /**
   * Check if token is expired or will expire soon
   */
  isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    try {
      const payload = this.decodeToken(token);
      if (!payload) return true;

      const currentTime = Date.now() / 1000;
      const bufferTime = this.config.tokenExpiryBuffer * 60; // Convert to seconds
      
      return payload.exp <= (currentTime + bufferTime);
    } catch (_error) {
      return true;
    }
  }

  /**
   * Extract user information from token
   */
  getUserFromToken(token: string): User | null {
    const payload = this.decodeToken(token);
    if (!payload) return null;

    return {
      id: payload.sub,
      username: payload.username,
      name: payload.name,
      role: payload.role,
      permissions: payload.permissions || [],
    };
  }

  /**
   * Get token expiration time
   */
  getTokenExpiration(token: string): Date | null {
    const payload = this.decodeToken(token);
    if (!payload) return null;

    return new Date(payload.exp * 1000);
  }

  /**
   * Get time until token expires (in minutes)
   */
  getTimeUntilExpiry(token: string): number | null {
    const expiration = this.getTokenExpiration(token);
    if (!expiration) return null;

    const now = new Date();
    const diffMs = expiration.getTime() - now.getTime();
    return Math.floor(diffMs / (1000 * 60)); // Convert to minutes
  }

  /**
   * Format authorization header
   */
  getAuthHeader(token?: string): string | null {
    const authToken = token || this.getToken();
    if (!authToken) return null;

    return `Bearer ${authToken}`;
  }

  /**
   * Validate token format (basic JWT structure check)
   */
  isValidTokenFormat(token: string): boolean {
    if (!token) return false;
    
    // JWT should have 3 parts separated by dots
    const parts = token.split('.');
    return parts.length === 3;
  }

  /**
   * Get current stored user if token is valid
   */
  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token || !this.isTokenValid(token)) {
      return null;
    }

    return this.getUserFromToken(token);
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return this.isTokenValid(token);
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<AuthConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): AuthConfig {
    return { ...this.config };
  }

  /**
   * Store both access and refresh tokens
   */
  setTokens(token: string, refreshToken?: string): void {
    this.setToken(token);
    if (refreshToken) {
      this.setRefreshToken(refreshToken);
    }
  }

  /**
   * Check if refresh token exists and is valid format
   */
  hasValidRefreshToken(): boolean {
    const refreshToken = this.getRefreshToken();
    return !!refreshToken && this.isValidTokenFormat(refreshToken);
  }

  /**
   * Check if token needs refresh based on expiry buffer
   */
  shouldRefreshToken(token?: string): boolean {
    const authToken = token || this.getToken();
    return this.isTokenExpired(authToken);
  }
}

// Export singleton instance
export const tokenService = new TokenService();
export default tokenService;