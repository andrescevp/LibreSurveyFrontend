// Auth Hooks Exports
export { useAuth, default as useAuthHook } from './useAuth';
export { 
  useAuthGuard, 
  useRequireAuth, 
  useRequireRole, 
  useRequirePermissions, 
  useRedirectIfAuthenticated,
  default as useAuthGuardHook 
} from './useAuthGuard';

// Re-export types for convenience
export type { 
  UseAuthGuardOptions, 
  UseAuthGuardReturn 
} from './useAuthGuard';
export type { UseAuthReturn } from '../types';