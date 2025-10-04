import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useAuthGuard } from '../hooks/useAuthGuard';
import type { ProtectedRouteProps } from '../types';

/**
 * Loading Component
 */
const LoadingScreen: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Checking authentication...</p>
        </div>
    </div>
);

/**
 * Unauthorized Component
 */
const UnauthorizedScreen: React.FC<{ message?: string }> = ({
    message = "You don't have permission to access this page."
}) => (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <div className="space-y-2">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    </div>
);

/**
 * Protected Route Component
 * Wraps routes that require authentication and/or specific permissions
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
    requiredPermissions,
    fallback,
}) => {
    const location = useLocation();
    const { canAccess, isLoading, isAuthenticated } = useAuthGuard({
        requireAuth: true,
        requiredRole,
        requiredPermissions,
    });

    // Show loading while checking authentication
    if (isLoading) {
        return fallback || <LoadingScreen />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Show unauthorized if user doesn't have required permissions
    if (!canAccess) {
        const message = requiredRole
            ? `This page requires ${requiredRole} role.`
            : requiredPermissions?.length
                ? `This page requires specific permissions.`
                : "You don't have permission to access this page.";

        return fallback || <UnauthorizedScreen message={message} />;
    }

    // User is authenticated and authorized
    return <>{children}</>;
};

/**
 * Public Route Component
 * Redirects authenticated users away (useful for login/register pages)
 */
export const PublicRoute: React.FC<{
    children: React.ReactNode;
    redirectTo?: string;
}> = ({ children, redirectTo = '/dashboard' }) => {
    const { isLoading, isAuthenticated } = useAuthGuard({
        requireAuth: false,
        redirectIfAuthenticated: true,
        authenticatedRedirect: redirectTo,
    });

    // Show loading while checking authentication
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Redirect authenticated users
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Show public content
    return <>{children}</>;
};

/**
 * Role-based Route Component
 * Protects routes that require a specific role
 */
export const RoleRoute: React.FC<{
    children: React.ReactNode;
    role: string;
    fallback?: React.ReactNode;
}> = ({ children, role, fallback }) => {
    return (
        <ProtectedRoute
            requiredRole={role}
            fallback={fallback}
        >
            {children}
        </ProtectedRoute>
    );
};

/**
 * Permission-based Route Component
 * Protects routes that require specific permissions
 */
export const PermissionRoute: React.FC<{
    children: React.ReactNode;
    permissions: string[];
    fallback?: React.ReactNode;
}> = ({ children, permissions, fallback }) => {
    return (
        <ProtectedRoute
            requiredPermissions={permissions}
            fallback={fallback}
        >
            {children}
        </ProtectedRoute>
    );
};

/**
 * Auth Wrapper Component
 * Provides authentication context and handles initialization
 */
export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const { isLoading } = useAuthGuard({ requireAuth: false });

    if (isLoading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;