// Auth Module Main Exports

// Types
export type * from './types';

// Services
export * from './services';

// Store
export * from './store';

// Hooks
export * from './hooks';

// Components
export * from './components';

// Main exports for convenience
export { useAuth } from './hooks/useAuth';
export { AuthProvider } from './components/AuthProvider';
export { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
export { LoginForm } from './components/LoginForm';

// Store setup
export { store as authStore, persistor as authPersistor } from '../store';

// Default export
export { AuthProvider as default } from './components/AuthProvider';