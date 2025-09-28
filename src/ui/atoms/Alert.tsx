import React from 'react';
import { cn } from '@lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    closable?: boolean;
    onClose?: () => void;
    title?: string;
    children?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (props, ref) => {
        const {
            className,
            variant = 'default',
            size = 'md',
            icon,
            closable = false,
            onClose,
            title,
            children,
            ...rest
        } = props;

        // Default icons for each variant
        const getDefaultIcon = () => {
            switch (variant) {
                case 'destructive':
                    return (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 1.5L1.5 14.5H14.5L8 1.5Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 6V9"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 12H8.01"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    );
                case 'warning':
                    return (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 1.5L1.5 14.5H14.5L8 1.5Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 6V9"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 12H8.01"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    );
                case 'success':
                    return (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.5 4.5L6 12L2.5 8.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    );
                case 'info':
                    return (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="8"
                                cy="8"
                                r="6.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M8 11V8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 5H8.01"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    );
                default:
                    return (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="8"
                                cy="8"
                                r="6.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M8 11V8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 5H8.01"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    );
            }
        };

        const displayIcon = icon !== undefined ? icon : getDefaultIcon();

        return (
            <div
                className={cn(
                    // Base styles using design tokens
                    'relative w-full rounded-lg border p-4',
                    'flex items-start gap-3',
                    // Variant styles
                    variant === 'default' && [
                        'border-border bg-background text-foreground',
                    ],
                    variant === 'destructive' && [
                        'border-destructive/50 bg-destructive/10 text-destructive',
                        '[&>svg]:text-destructive',
                    ],
                    variant === 'warning' && [
                        'border-amber-500/50 bg-amber-50 text-amber-900',
                        'dark:bg-amber-950/30 dark:text-amber-400',
                        '[&>svg]:text-amber-600 dark:[&>svg]:text-amber-400',
                    ],
                    variant === 'success' && [
                        'border-green-500/50 bg-green-50 text-green-900',
                        'dark:bg-green-950/30 dark:text-green-400',
                        '[&>svg]:text-green-600 dark:[&>svg]:text-green-400',
                    ],
                    variant === 'info' && [
                        'border-blue-500/50 bg-blue-50 text-blue-900',
                        'dark:bg-blue-950/30 dark:text-blue-400',
                        '[&>svg]:text-blue-600 dark:[&>svg]:text-blue-400',
                    ],
                    // Size styles
                    size === 'sm' && 'p-3 text-sm',
                    size === 'md' && 'p-4 text-sm',
                    size === 'lg' && 'p-5 text-base',
                    // Custom className
                    className
                )}
                ref={ref}
                role="alert"
                {...rest}
            >
                {/* Icon */}
                {displayIcon && (
                    <div className={cn(
                        'shrink-0',
                        size === 'sm' && 'mt-0.5',
                        size === 'md' && 'mt-0.5',
                        size === 'lg' && 'mt-1',
                    )}>
                        {displayIcon}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <div className={cn(
                            'font-medium mb-1',
                            size === 'sm' && 'text-sm',
                            size === 'md' && 'text-sm',
                            size === 'lg' && 'text-base',
                        )}>
                            {title}
                        </div>
                    )}
                    {children && (
                        <div className={cn(
                            size === 'sm' && 'text-xs',
                            size === 'md' && 'text-xs',
                            size === 'lg' && 'text-sm',
                            'opacity-90',
                        )}>
                            {children}
                        </div>
                    )}
                </div>

                {/* Close button */}
                {closable && (
                    <button
                        onClick={onClose}
                        className={cn(
                            'shrink-0 rounded-sm opacity-70 hover:opacity-100',
                            'transition-opacity duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                            size === 'sm' && 'p-1',
                            size === 'md' && 'p-1',
                            size === 'lg' && 'p-1.5',
                        )}
                        aria-label="Close alert"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.5 3.5L3.5 10.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.5 3.5L10.5 10.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}
            </div>
        );
    }
);

Alert.displayName = 'Alert';

export { Alert };
export type { AlertProps };