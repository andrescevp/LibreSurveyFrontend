import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginRequest, LoginResponse, Credentials } from '../types';
import { authApiService } from '../services/authApi';
import { tokenService } from '../services/tokenService';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  refreshStart,
  refreshSuccess,
  refreshFailure,
  initializeAuth,
} from './authSlice';

/**
 * Login thunk
 */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (loginRequest: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());

      const credentials: Credentials = {
        username: loginRequest.username,
        password: loginRequest.password,
      };

      const response: LoginResponse = await authApiService.login(credentials);

      dispatch(loginSuccess({
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
      }));

      return response;
    } catch (error: any) {
      const authError = {
        code: error.code || 'LOGIN_ERROR',
        message: error.message || 'Login failed',
        details: error.details,
      };

      dispatch(loginFailure(authError));
      return rejectWithValue(authError);
    }
  }
);

/**
 * Logout thunk
 */
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(logoutStart());

      await authApiService.logout();

      dispatch(logoutSuccess());

      return true;
    } catch (error: any) {
      const authError = {
        code: error.code || 'LOGOUT_ERROR',
        message: error.message || 'Logout failed',
        details: error.details,
      };

      dispatch(logoutFailure(authError));
      return rejectWithValue(authError);
    }
  }
);

/**
 * Refresh token thunk
 */
export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(refreshStart());

      const response = await authApiService.refreshToken();

      if (!response) {
        throw new Error('Unable to refresh token');
      }

      dispatch(refreshSuccess({
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
      }));

      return response;
    } catch (error: any) {
      const authError = {
        code: error.code || 'REFRESH_ERROR',
        message: error.message || 'Token refresh failed',
        details: error.details,
      };

      dispatch(refreshFailure(authError));
      return rejectWithValue(authError);
    }
  }
);

/**
 * Initialize auth state from stored tokens
 */
export const initializeAuthThunk = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    try {
      const token = tokenService.getToken();
      const refreshToken = tokenService.getRefreshToken();

      if (!token) {
        dispatch(initializeAuth({
          user: null,
          token: null,
          refreshToken: null,
        }));
        return null;
      }

      // Check if token is still valid
      if (!tokenService.isTokenValid(token)) {
        // Try to refresh if we have a refresh token
        if (refreshToken) {
          try {
            const response = await authApiService.refreshToken();
            if (response) {
              dispatch(initializeAuth({
                user: response.user,
                token: response.token,
                refreshToken: response.refreshToken,
              }));
              return response;
            }
          } catch (_error) {
            // Refresh failed, clear tokens
            tokenService.clearTokens();
          }
        }

        // No valid token or refresh failed
        dispatch(initializeAuth({
          user: null,
          token: null,
          refreshToken: null,
        }));
        return null;
      }

      // Token is valid, get user info
      const user = tokenService.getUserFromToken(token);
      
      if (user) {
        dispatch(initializeAuth({
          user,
          token,
          refreshToken,
        }));
        
        return { user, token, refreshToken };
      } else {
        // Invalid token format
        tokenService.clearTokens();
        dispatch(initializeAuth({
          user: null,
          token: null,
          refreshToken: null,
        }));
        return null;
      }
    } catch (_error) {
      // Error during initialization, clear everything
      tokenService.clearTokens();
      dispatch(initializeAuth({
        user: null,
        token: null,
        refreshToken: null,
      }));
      return null;
    }
  }
);

/**
 * Verify current token with server
 */
export const verifyTokenThunk = createAsyncThunk(
  'auth/verifyToken',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await authApiService.verifyToken();

      if (!user) {
        throw new Error('Token verification failed');
      }

      const token = tokenService.getToken();
      const refreshToken = tokenService.getRefreshToken();

      dispatch(initializeAuth({
        user,
        token,
        refreshToken,
      }));

      return user;
    } catch (error: any) {
      const authError = {
        code: error.code || 'VERIFY_ERROR',
        message: error.message || 'Token verification failed',
        details: error.details,
      };

      // Clear invalid tokens
      tokenService.clearTokens();
      dispatch(initializeAuth({
        user: null,
        token: null,
        refreshToken: null,
      }));

      return rejectWithValue(authError);
    }
  }
);

/**
 * Auto-refresh token when it's about to expire
 */
export const autoRefreshThunk = createAsyncThunk(
  'auth/autoRefresh',
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as { auth: { token: string | null } };
      const { token } = state.auth;

      if (!token) {
        return null;
      }

      // Check if token needs refresh (expires in less than 5 minutes)
      if (tokenService.isTokenExpired(token)) {
        const response = await authApiService.refreshToken();
        
        if (response) {
          dispatch(refreshSuccess({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
          }));
          return response;
        } else {
          // Refresh failed, logout user
          dispatch(logoutThunk());
          return null;
        }
      }

      return null;
    } catch (_error) {
      // Auto-refresh failed, logout user
      dispatch(logoutThunk());
      return null;
    }
  }
);

// Export all thunks
export const authThunks = {
  login: loginThunk,
  logout: logoutThunk,
  refreshToken: refreshTokenThunk,
  initialize: initializeAuthThunk,
  verifyToken: verifyTokenThunk,
  autoRefresh: autoRefreshThunk,
};