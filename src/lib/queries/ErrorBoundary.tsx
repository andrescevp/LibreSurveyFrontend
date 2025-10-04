import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

interface QueryErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{
        error: Error;
        resetErrorBoundary: () => void
    }>;
}

// Default error fallback component
function DefaultErrorFallback({
    error,
    resetErrorBoundary
}: {
    error: Error;
    resetErrorBoundary: () => void
}) {
    return (
        <div
            role="alert"
            className="p-6 border border-destructive rounded-lg bg-card text-card-foreground max-w-md mx-auto mt-8"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                </div>
                <h2 className="text-lg font-semibold text-destructive">
                    Something went wrong
                </h2>
            </div>

            <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                    An error occurred while loading data:
                </p>
                <pre className="text-xs bg-muted p-3 rounded border overflow-auto max-h-32">
                    {error.message}
                </pre>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={resetErrorBoundary}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Try again
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
                >
                    Reload page
                </button>
            </div>
        </div>
    );
}

export function QueryErrorBoundary({
    children,
    fallback: Fallback = DefaultErrorFallback
}: QueryErrorBoundaryProps) {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
                <Fallback error={error} resetErrorBoundary={resetErrorBoundary} />
            )}
        >
            {children}
        </ErrorBoundary>
    );
}

export { DefaultErrorFallback };
export type { QueryErrorBoundaryProps };