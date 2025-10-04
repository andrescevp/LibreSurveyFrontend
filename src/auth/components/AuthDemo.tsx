import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@ui/atoms/Button';
import { Alert } from '@ui/atoms/Alert';
import { Badge } from '@ui/atoms/Badge';
import { LoginForm } from './LoginForm';

/**
 * Auth Demo Component
 * Showcases authentication functionality for development and testing
 */
export const AuthDemo: React.FC = () => {
    const {
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        error,
        clearError,
        hasRole,
        hasPermission
    } = useAuth();

    const handleDemoLogin = async () => {
        try {
            await login({
                email: 'demo@libresurvey.com',
                password: 'demo123',
                rememberMe: true,
            });
        } catch (err) {
            console.error('Demo login failed:', err);
        }
    };

    const handleDemoLogout = () => {
        logout();
    };

    if (isAuthenticated) {
        return (
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Authentication Demo
                    </h1>
                    <p className="text-muted-foreground">
                        You are successfully authenticated!
                    </p>
                </div>

                {/* User Info Card */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">User Information</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{user?.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">User ID:</span>
                            <span className="font-mono text-sm">{user?.id}</span>
                        </div>
                        {user?.name && (
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Name:</span>
                                <span className="font-medium">{user.name}</span>
                            </div>
                        )}
                        {user?.role && (
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Role:</span>
                                <Badge variant="secondary">{user.role}</Badge>
                            </div>
                        )}
                        {user?.permissions && user.permissions.length > 0 && (
                            <div>
                                <span className="text-muted-foreground block mb-2">Permissions:</span>
                                <div className="flex flex-wrap gap-1">
                                    {user.permissions.map((permission) => (
                                        <Badge key={permission} variant="outline" className="text-xs">
                                            {permission}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Permission Tests */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Permission Tests</h2>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span>Has Admin Role:</span>
                            <Badge variant={hasRole('admin') ? 'default' : 'destructive'}>
                                {hasRole('admin') ? 'Yes' : 'No'}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Has User Role:</span>
                            <Badge variant={hasRole('user') ? 'default' : 'destructive'}>
                                {hasRole('user') ? 'Yes' : 'No'}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Can Create Surveys:</span>
                            <Badge variant={hasPermission('surveys:create') ? 'default' : 'destructive'}>
                                {hasPermission('surveys:create') ? 'Yes' : 'No'}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Can Edit Surveys:</span>
                            <Badge variant={hasPermission('surveys:edit') ? 'default' : 'destructive'}>
                                {hasPermission('surveys:edit') ? 'Yes' : 'No'}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="text-center">
                    <Button
                        onClick={handleDemoLogout}
                        variant="destructive"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing out...' : 'Sign Out'}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Authentication Demo
                </h1>
                <p className="text-muted-foreground">
                    Test the authentication system
                </p>
            </div>

            {/* Error Display */}
            {error && (
                <Alert variant="destructive">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium">Authentication Error</h4>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearError}
                            className="ml-2 h-auto p-1"
                        >
                            ×
                        </Button>
                    </div>
                </Alert>
            )}

            {/* Login Form */}
            <LoginForm />

            {/* Demo Login Button */}
            <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                    Or try a demo login:
                </p>
                <Button
                    onClick={handleDemoLogin}
                    variant="outline"
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? 'Signing in...' : 'Demo Login'}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                    Email: demo@libresurvey.com<br />
                    Password: demo123
                </p>
            </div>
        </div>
    );
};

export default AuthDemo;