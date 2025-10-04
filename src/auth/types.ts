/**
 * Authentication Types
 * Based on OpenAPI schema definitions
 */

// API Schema Types (from OpenAPI)
export interface Credentials {
  username: string;
  password: string;
}

export interface Token {
  token: string;
  refreshToken?: string;
}

// Decoded JWT Token Structure
export interface JWTPayload {
  sub: string; // user ID
  username: string;
  exp: number; // expiration timestamp
  iat: number; // issued at timestamp
  [key: string]: any; // additional claims
}

// User Profile (extended from JWT)
export interface User {
  id: string;
  username: string;
  name?: string;
  role?: string;
  permissions?: string[];
}

// Authentication State
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  error: string | null;
  lastLoginAt?: string;
}

// Auth Action Payloads
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

// Auth Error Types
export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Auth Configuration
export interface AuthConfig {
  apiBaseUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  tokenExpiryBuffer: number; // minutes before expiry to refresh
}

// Route Protection Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
}

// Auth Hook Return Types
export interface UseAuthReturn {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
  
  // Utilities
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

// Auth Context Type
export interface AuthContextType extends UseAuthReturn {
  isInitialized: boolean;
}

// Storage Keys
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'libre_survey_token',
  REFRESH_TOKEN: 'libre_survey_refresh_token',
  USER: 'libre_survey_user',
  PERSIST_ROOT: 'libre_survey_auth',
} as const;

export type AuthStorageKey = typeof AUTH_STORAGE_KEYS[keyof typeof AUTH_STORAGE_KEYS];