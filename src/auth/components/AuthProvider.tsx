import React, { createContext, useContext, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Loader2 } from 'lucide-react';
import { store, persistor } from '../../store';
import type { AuthContextType } from '../types';
import { useAuth } from '../hooks/useAuth';

/**
 * Auth Context
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Loading Component for PersistGate
 */
const PersistLoading: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading authentication...</p>
        </div>
    </div>
);

/**
 * Auth Context Provider (Internal)
 * Provides auth context to components
 */
const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const auth = useAuth();
    const [isInitialized, setIsInitialized] = React.useState(false);

    // Mark as initialized after first auth check
    useEffect(() => {
        if (!auth.isLoading) {
            setIsInitialized(true);
        }
    }, [auth.isLoading]);

    const contextValue: AuthContextType = {
        ...auth,
        isInitialized,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Auth Provider Component
 * Main provider that wraps the app with Redux and auth context
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<PersistLoading />} persistor={persistor}>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </PersistGate>
        </Provider>
    );
};

/**
 * Hook to access auth context
 */
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

/**
 * Hook to check if auth is initialized
 */
export const useAuthInitialized = (): boolean => {
    const { isInitialized } = useAuthContext();
    return isInitialized;
};

/**
 * HOC to wrap components with auth context requirement
 */
export const withAuth = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P> => {
    const WrappedComponent: React.FC<P> = (props) => {
        const auth = useAuthContext();
        return <Component {...props} auth={auth} />;
    };

    WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

    return WrappedComponent;
};

/**
 * Auth Status Component
 * Displays current authentication status (useful for debugging)
 */
export const AuthStatus: React.FC<{
    className?: string;
    showDetails?: boolean;
}> = ({ className = '', showDetails = false }) => {
    const {
        isAuthenticated,
        isLoading,
        user,
        error,
        isInitialized
    } = useAuthContext();

    if (!showDetails && process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className={`p-4 bg-muted rounded-lg text-sm ${className}`}>
            <h4 className="font-medium mb-2">Auth Status</h4>
            <div className="space-y-1 text-muted-foreground">
                <p>Initialized: {isInitialized ? '✅' : '❌'}</p>
                <p>Authenticated: {isAuthenticated ? '✅' : '❌'}</p>
                <p>Loading: {isLoading ? '⏳' : '✅'}</p>
                {user && <p>User: {user.email}</p>}
                {error && <p className="text-destructive">Error: {error}</p>}
            </div>
        </div>
    );
};

export default AuthProvider;