import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, AuthError } from '../types';

/**
 * Initial authentication state
 */
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  refreshToken: null,
  error: null,
  lastLoginAt: undefined,
};

/**
 * Authentication Redux Slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<{
      user: User;
      token: string;
      refreshToken?: string;
    }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.error = null;
      state.lastLoginAt = new Date().toISOString();
    },

    loginFailure: (state, action: PayloadAction<AuthError>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = action.payload.message;
    },

    // Logout actions
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.lastLoginAt = undefined;
    },

    logoutFailure: (state, action: PayloadAction<AuthError>) => {
      // Even if logout fails on server, clear local state
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = action.payload.message;
      state.lastLoginAt = undefined;
    },

    // Token refresh actions
    refreshStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    refreshSuccess: (state, action: PayloadAction<{
      user: User;
      token: string;
      refreshToken?: string;
    }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
      state.error = null;
    },

    refreshFailure: (state, action: PayloadAction<AuthError>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = action.payload.message;
    },

    // User update actions
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Error management
    clearError: (state) => {
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // Initialize auth state (for hydration)
    initializeAuth: (state, action: PayloadAction<{
      user: User | null;
      token: string | null;
      refreshToken?: string | null;
      lastLoginAt?: string;
    }>) => {
      const { user, token, refreshToken, lastLoginAt } = action.payload;
      
      if (user && token) {
        state.isAuthenticated = true;
        state.user = user;
        state.token = token;
        state.refreshToken = refreshToken || null;
        state.lastLoginAt = lastLoginAt;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.lastLoginAt = undefined;
      }
      
      state.isLoading = false;
      state.error = null;
    },

    // Reset auth state
    resetAuth: () => initialState,

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  refreshStart,
  refreshSuccess,
  refreshFailure,
  updateUser,
  clearError,
  setError,
  initializeAuth,
  resetAuth,
  setLoading,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectLastLoginAt = (state: { auth: AuthState }) => state.auth.lastLoginAt;