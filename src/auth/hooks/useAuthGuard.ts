import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Auth Guard Hook
 * Handles route protection and redirects
 */
export interface UseAuthGuardOptions {
  /** Redirect path for unauthenticated users */
  redirectTo?: string;
  /** Required role for access */
  requiredRole?: string;
  /** Required permissions for access */
  requiredPermissions?: string[];
  /** Whether to require authentication */
  requireAuth?: boolean;
  /** Whether to redirect authenticated users away (for login/register pages) */
  redirectIfAuthenticated?: boolean;
  /** Path to redirect authenticated users to */
  authenticatedRedirect?: string;
}

export interface UseAuthGuardReturn {
  /** Whether the user can access the route */
  canAccess: boolean;
  /** Whether the auth check is still loading */
  isLoading: boolean;
  /** Auth error if any */
  error: string | null;
  /** Current user */
  user: ReturnType<typeof useAuth>['user'];
  /** Whether user is authenticated */
  isAuthenticated: boolean;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}): UseAuthGuardReturn => {
  const {
    redirectTo = '/login',
    requiredRole,
    requiredPermissions = [],
    requireAuth = true,
    redirectIfAuthenticated = false,
    authenticatedRedirect = '/dashboard',
  } = options;

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, user, error, hasRole, hasAnyPermission } = useAuth();

  // Calculate if user can access the route
  const canAccess = (() => {
    // If still loading, don't make decisions yet
    if (isLoading) return true;

    // If redirecting authenticated users and user is authenticated
    if (redirectIfAuthenticated && isAuthenticated) {
      return false;
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      return false;
    }

    // If authentication is not required, allow access
    if (!requireAuth) {
      return true;
    }

    // User is authenticated, check role and permissions
    if (requiredRole && !hasRole(requiredRole)) {
      return false;
    }

    if (requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions)) {
      return false;
    }

    return true;
  })();

  // Handle redirects
  useEffect(() => {
    if (isLoading) return;

    // Redirect authenticated users away from auth pages
    if (redirectIfAuthenticated && isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || authenticatedRedirect;
      navigate(from, { replace: true });
      return;
    }

    // Redirect unauthenticated users to login
    if (requireAuth && !isAuthenticated) {
      navigate(redirectTo, {
        replace: true,
        state: { from: location },
      });
      return;
    }

    // Redirect users without required role/permissions
    if (isAuthenticated && !canAccess) {
      navigate('/unauthorized', { replace: true });
      return;
    }
  }, [
    isLoading,
    isAuthenticated,
    canAccess,
    redirectIfAuthenticated,
    requireAuth,
    redirectTo,
    authenticatedRedirect,
    navigate,
    location,
  ]);

  return {
    canAccess,
    isLoading,
    error,
    user,
    isAuthenticated,
  };
};

/**
 * Hook for protecting routes that require authentication
 */
export const useRequireAuth = (options?: Omit<UseAuthGuardOptions, 'requireAuth'>) => {
  return useAuthGuard({ ...options, requireAuth: true });
};

/**
 * Hook for protecting routes that require specific role
 */
export const useRequireRole = (role: string, options?: Omit<UseAuthGuardOptions, 'requiredRole'>) => {
  return useAuthGuard({ ...options, requiredRole: role, requireAuth: true });
};

/**
 * Hook for protecting routes that require specific permissions
 */
export const useRequirePermissions = (
  permissions: string[],
  options?: Omit<UseAuthGuardOptions, 'requiredPermissions'>
) => {
  return useAuthGuard({ ...options, requiredPermissions: permissions, requireAuth: true });
};

/**
 * Hook for public routes that should redirect authenticated users
 */
export const useRedirectIfAuthenticated = (
  redirectTo?: string,
  options?: Omit<UseAuthGuardOptions, 'redirectIfAuthenticated' | 'authenticatedRedirect'>
) => {
  return useAuthGuard({
    ...options,
    requireAuth: false,
    redirectIfAuthenticated: true,
    authenticatedRedirect: redirectTo,
  });
};

export default useAuthGuard;