import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setAuthTokens, clearAuthTokens } from '@lib/api';

/**
 * Hook to sync authentication state with API client
 * This ensures the API client always has the current auth tokens
 */
export const useApiAuthSync = () => {
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Sync auth tokens with API client whenever auth state changes
    if (authState.isAuthenticated && authState.token) {
      setAuthTokens({
        accessToken: authState.token,
        refreshToken: authState.refreshToken || undefined,
      });
    } else {
      clearAuthTokens();
    }
  }, [authState.isAuthenticated, authState.token, authState.refreshToken]);

  // Handle logout events from API client
  useEffect(() => {
    const handleApiLogout = (event: CustomEvent) => {
      console.log('API logout event received:', event.detail);
      // This could trigger a logout action in your auth store
      // dispatch(authThunks.logout());
    };

    window.addEventListener('auth:logout', handleApiLogout as EventListener);

    return () => {
      window.removeEventListener('auth:logout', handleApiLogout as EventListener);
    };
  }, []);
};