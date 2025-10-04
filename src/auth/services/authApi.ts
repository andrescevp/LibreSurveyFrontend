import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import type { 
  Credentials, 
  Token, 
  LoginResponse, 
  User, 
  AuthError 
} from '../types';
import { tokenService } from './tokenService';

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */
class AuthApiService {
  private client: AxiosInstance;
  private baseURL: string;
  private refreshPromise: Promise<LoginResponse | null> | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    
    // Create axios instance
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Configure retry logic
    axiosRetry(this.client, {
      retries: 3,
      retryDelay: (retryCount) => {
        return retryCount * 1000; // 1s, 2s, 3s delays
      },
      retryCondition: (error) => {
        // Retry on network errors or 5xx status codes
        return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
               (error.response?.status ? error.response.status >= 500 : false);
      },
    });

    // Request interceptor to add auth header
    this.client.interceptors.request.use(
      (config) => {
        const token = tokenService.getToken();
        if (token && tokenService.isTokenValid(token)) {
          config.headers.Authorization = tokenService.getAuthHeader(token);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling and token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Handle 401 Unauthorized responses
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Attempt to refresh token
            const refreshResult = await this.refreshToken();
            if (refreshResult) {
              // Update the original request with new token
              originalRequest.headers.Authorization = tokenService.getAuthHeader(refreshResult.token);
              
              // Retry the original request
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and trigger logout
            tokenService.clearTokens();
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
            return Promise.reject(this.handleApiError(refreshError));
          }
          
          // No refresh token available, clear tokens and trigger logout
          tokenService.clearTokens();
          window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }
        
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Login user with credentials
   */
  async login(credentials: Credentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.client.post('/api/login', credentials);
      
      const { token, refreshToken } = response.data;
      
      // Decode token to get user info
      const user = tokenService.getUserFromToken(token);
      if (!user) {
        throw new Error('Invalid token received from server');
      }

      // Store tokens
      tokenService.setTokens(token, refreshToken);

      return {
        token,
        user,
        refreshToken,
      };
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call server logout endpoint
      await this.client.post('/api/logout');
      
      // Clear tokens from storage
      tokenService.clearTokens();
    } catch (error) {
      // Even if server logout fails, clear local tokens
      tokenService.clearTokens();
      throw this.handleApiError(error);
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<LoginResponse | null> {
    // Return existing refresh promise if one is in progress
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this._performRefresh();
    
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Internal method to perform token refresh
   */
  private async _performRefresh(): Promise<LoginResponse | null> {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      // Call refresh endpoint
      const response: AxiosResponse<Token> = await this.client.post('/api/token/refresh', {
        refresh_token: refreshToken
      });

      const { token, refreshToken: newRefreshToken } = response.data;
      
      // Decode token to get user info
      const user = tokenService.getUserFromToken(token);
      if (!user) {
        throw new Error('Invalid token received from server');
      }

      // Store new tokens
      tokenService.setTokens(token, newRefreshToken);

      return {
        token,
        user,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      // If refresh fails, clear all tokens
      tokenService.clearTokens();
      throw this.handleApiError(error);
    }
  }

  /**
   * Verify current token with server
   */
  async verifyToken(): Promise<User | null> {
    try {
      const token = tokenService.getToken();
      if (!token || !tokenService.isTokenValid(token)) {
        return null;
      }

      // If you have a verify endpoint, use it here
      // const response: AxiosResponse<User> = await this.client.get('/auth/verify');
      // return response.data;

      // For now, just decode the current token
      return tokenService.getUserFromToken(token);
    } catch (_error) {
      tokenService.clearTokens();
      return null;
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = tokenService.getToken();
      if (!token || !tokenService.isTokenValid(token)) {
        return null;
      }

      // If you have a user profile endpoint, use it here
      // const response: AxiosResponse<User> = await this.client.get('/auth/me');
      // return response.data;

      // For now, just decode the current token
      return tokenService.getUserFromToken(token);
    } catch (_error) {
      return null;
    }
  }

  /**
   * Change password (if endpoint exists)
   */
  async changePassword(_currentPassword: string, _newPassword: string): Promise<void> {
    try {
      // Implement when change password endpoint is available
      // await this.client.post('/auth/change-password', {
      //   current_password: currentPassword,
      //   new_password: newPassword
      // });
      
      throw new Error('Change password endpoint not implemented');
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Request password reset (if endpoint exists)
   */
  async requestPasswordReset(_email: string): Promise<void> {
    try {
      // Implement when reset password endpoint is available
      // await this.client.post('/auth/password-reset', { email });
      
      throw new Error('Password reset endpoint not implemented');
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Handle API errors and convert to AuthError
   */
  private handleApiError(error: any): AuthError {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      switch (status) {
        case 400:
          return {
            code: 'INVALID_CREDENTIALS',
            message: data?.message || 'Invalid credentials provided',
            details: data,
          };
        case 401:
          return {
            code: 'UNAUTHORIZED',
            message: data?.message || 'Authentication failed',
            details: data,
          };
        case 403:
          return {
            code: 'FORBIDDEN',
            message: data?.message || 'Access denied',
            details: data,
          };
        case 422:
          return {
            code: 'VALIDATION_ERROR',
            message: data?.message || 'Validation failed',
            details: data,
          };
        case 429:
          return {
            code: 'RATE_LIMITED',
            message: 'Too many requests. Please try again later.',
            details: data,
          };
        case 500:
        case 502:
        case 503:
        case 504:
          return {
            code: 'SERVER_ERROR',
            message: 'Server error. Please try again later.',
            details: data,
          };
        default:
          return {
            code: 'UNKNOWN_ERROR',
            message: error.message || 'An unexpected error occurred',
            details: { status, data },
          };
      }
    }

    if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network')) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
        details: error,
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: error,
    };
  }

  /**
   * Update base URL
   */
  updateBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
    this.client.defaults.baseURL = baseURL;
  }

  /**
   * Check if current token needs refresh and refresh if needed
   */
  async ensureValidToken(): Promise<boolean> {
    try {
      const token = tokenService.getToken();
      
      // No token available
      if (!token) {
        return false;
      }
      
      // Token is still valid
      if (tokenService.isTokenValid(token) && !tokenService.isTokenExpired(token)) {
        return true;
      }
      
      // Try to refresh token
      const refreshResult = await this.refreshToken();
      return refreshResult !== null;
    } catch (_error) {
      return false;
    }
  }

  /**
   * Check if refresh token is available
   */
  hasRefreshToken(): boolean {
    const refreshToken = tokenService.getRefreshToken();
    return !!refreshToken;
  }

  /**
   * Force logout (clears tokens and dispatches event)
   */
  forceLogout(): void {
    tokenService.clearTokens();
    window.dispatchEvent(new CustomEvent('auth:unauthorized'));
  }

  /**
   * Get axios instance for custom requests
   */
  getClient(): AxiosInstance {
    return this.client;
  }
}

// Export singleton instance
export const authApiService = new AuthApiService();
export default authApiService;