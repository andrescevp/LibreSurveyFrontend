import React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@lib/utils';

interface CollapsibleProps extends React.ComponentProps<typeof CollapsiblePrimitive.Root> {
    className?: string;
}

interface CollapsibleTriggerProps extends React.ComponentProps<typeof CollapsiblePrimitive.Trigger> {
    className?: string;
    showIcon?: boolean;
    iconPosition?: 'left' | 'right';
}

interface CollapsibleContentProps extends React.ComponentProps<typeof CollapsiblePrimitive.Content> {
    className?: string;
}

const Collapsible = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Root>,
    CollapsibleProps
>(({ className, ...props }, ref) => (
    <CollapsiblePrimitive.Root
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
    />
));

const CollapsibleTrigger = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
    CollapsibleTriggerProps
>(({
    className,
    children,
    showIcon = true,
    iconPosition = 'right',
    ...props
}, ref) => (
    <CollapsiblePrimitive.Trigger
        ref={ref}
        className={cn(
            'flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-sm font-medium',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            '[&[data-state=open]>svg]:rotate-180',
            className
        )}
        {...props}
    >
        {iconPosition === 'left' && showIcon && (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        )}

        <span className={cn(
            'flex-1 text-left',
            iconPosition === 'left' && showIcon && 'ml-2',
            iconPosition === 'right' && showIcon && 'mr-2'
        )}>
            {children}
        </span>

        {iconPosition === 'right' && showIcon && (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        )}
    </CollapsiblePrimitive.Trigger>
));

const CollapsibleContent = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Content>,
    CollapsibleContentProps
>(({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Content
        ref={ref}
        className={cn(
            'overflow-hidden',
            'data-[state=closed]:animate-[collapsible-up_200ms_ease-out]',
            'data-[state=open]:animate-[collapsible-down_200ms_ease-out]',
            className
        )}
        {...props}
    >
        <div className="px-4 py-3 text-sm text-muted-foreground">
            {children}
        </div>
    </CollapsiblePrimitive.Content>
));

Collapsible.displayName = 'Collapsible';
CollapsibleTrigger.displayName = 'CollapsibleTrigger';
CollapsibleContent.displayName = 'CollapsibleContent';

export {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent
};

export type {
    CollapsibleProps,
    CollapsibleTriggerProps,
    CollapsibleContentProps
};