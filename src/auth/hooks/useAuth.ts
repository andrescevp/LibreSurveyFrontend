import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import type { UseAuthReturn, LoginRequest } from '../types';
import { authThunks } from '../store/authThunks';
import {
  selectIsAuthenticated,
  selectUser,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from '../store/authSlice';

/**
 * Main authentication hook
 * Provides all auth functionality in a single hook
 */
export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Selectors
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const user = useSelector((state: RootState) => selectUser(state));
  const isLoading = useSelector((state: RootState) => selectAuthLoading(state));
  const error = useSelector((state: RootState) => selectAuthError(state));

  // Actions
  const login = useCallback(async (credentials: LoginRequest): Promise<void> => {
    const result = await dispatch(authThunks.login(credentials));
    if (authThunks.login.rejected.match(result)) {
      throw result.payload;
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(authThunks.logout());
  }, [dispatch]);

  const refreshAuth = useCallback(async (): Promise<void> => {
    const result = await dispatch(authThunks.refreshToken());
    if (authThunks.refreshToken.rejected.match(result)) {
      throw result.payload;
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Utility functions
  const hasRole = useCallback((role: string): boolean => {
    return user?.role === role;
  }, [user]);

  const hasPermission = useCallback((permission: string): boolean => {
    return user?.permissions?.includes(permission) ?? false;
  }, [user]);

  const hasAnyPermission = useCallback((permissions: string[]): boolean => {
    if (!user?.permissions) return false;
    return permissions.some(permission => user.permissions!.includes(permission));
  }, [user]);

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      dispatch(authThunks.autoRefresh());
    }, 4 * 60 * 1000); // Check every 4 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated, dispatch]);

  // Initialize auth on mount
  useEffect(() => {
    dispatch(authThunks.initialize());
  }, [dispatch]);

  // Return memoized auth object
  return useMemo(() => ({
    // State
    isAuthenticated,
    isLoading,
    user,
    error,
    
    // Actions
    login,
    logout,
    refreshAuth,
    clearError: clearAuthError,
    
    // Utilities
    hasRole,
    hasPermission,
    hasAnyPermission,
  }), [
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    refreshAuth,
    clearAuthError,
    hasRole,
    hasPermission,
    hasAnyPermission,
  ]);
};

export default useAuth;