import React from 'react';
import { cn } from '@lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined' | 'none';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (props: CardProps, ref) => {
        const {
            className,
            variant = 'default',
            padding = 'md',
            children,
            ...rest
        } = props;

        return (
            <div
                className={cn(
                    // Base styles using design tokens
                    'rounded-lg border bg-card text-card-foreground',
                    // Variant styles
                    variant === 'default' && 'border-border shadow-sm',
                    variant === 'elevated' && 'border-border shadow-md',
                    variant === 'outlined' && 'border-2 border-border shadow-none',
                    variant === 'none' && 'border-0 shadow-none',
                    // Padding styles
                    padding === 'none' && 'p-0',
                    padding === 'sm' && 'p-3',
                    padding === 'md' && 'p-6',
                    padding === 'lg' && 'p-8',
                    // Custom className
                    className
                )}
                ref={ref}
                {...rest}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, as: Component = 'h3', ...props }, ref) => (
        <Component
            ref={ref}
            className={cn(
                'text-2xl font-semibold leading-none tracking-tight',
                className
            )}
            {...props}
        />
    )
);
CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
);
CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
    )
);
CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center p-6 pt-0', className)}
            {...props}
        />
    )
);
CardFooter.displayName = 'CardFooter';

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
};

export type {
    CardProps,
    CardHeaderProps,
    CardTitleProps,
    CardDescriptionProps,
    CardContentProps,
    CardFooterProps
};