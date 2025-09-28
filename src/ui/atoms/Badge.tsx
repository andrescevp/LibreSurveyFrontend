import React from 'react';
import { cn } from '@lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (props: BadgeProps, ref) => {
        const {
            className,
            variant = 'default',
            size = 'md',
            children,
            ...rest
        } = props;

        return (
            <span
                className={cn(
                    // Base styles using design tokens
                    'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    // Variant styles
                    variant === 'default' && 'bg-primary text-primary-foreground',
                    variant === 'secondary' && 'bg-secondary text-secondary-foreground',
                    variant === 'destructive' && 'bg-destructive text-white',
                    variant === 'outline' && 'border border-border bg-background text-foreground',
                    variant === 'success' && 'bg-green-500 text-white dark:bg-green-600',
                    variant === 'warning' && 'bg-yellow-500 text-white dark:bg-yellow-600',
                    // Size styles
                    size === 'sm' && 'px-2 py-0.5 text-xs',
                    size === 'md' && 'px-2.5 py-1 text-sm',
                    size === 'lg' && 'px-3 py-1.5 text-base',
                    // Custom className
                    className
                )}
                ref={ref}
                {...rest}
            >
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };