import React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@lib/utils';

type ToggleGroupSingleProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    type: 'single';
} & {
    className?: string;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

type ToggleGroupMultipleProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    type: 'multiple';
} & {
    className?: string;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

const ToggleGroup = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Root>,
    ToggleGroupProps
>(({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(
            'flex items-center justify-center rounded-md',
            className
        )}
        {...props}
    />
));

interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
    className?: string;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const ToggleGroupItem = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Item>,
    ToggleGroupItemProps
>(({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
            // Base styles
            'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors',
            'hover:bg-muted hover:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            // Pressed state
            'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
            // First and last child border radius
            'first:rounded-l-md last:rounded-r-md',
            // Variant styles
            variant === 'default' && [
                'bg-transparent text-foreground',
                'border-y border-r border-input first:border-l',
            ],
            variant === 'outline' && [
                'border border-input bg-transparent',
                'hover:bg-accent hover:text-accent-foreground',
                '[&:not(:first-child)]:border-l-0',
            ],
            // Size styles
            size === 'sm' && 'h-8 px-2.5 text-xs',
            size === 'md' && 'h-9 px-3',
            size === 'lg' && 'h-10 px-3 text-base',
            className
        )}
        {...props}
    />
));

ToggleGroup.displayName = 'ToggleGroup';
ToggleGroupItem.displayName = 'ToggleGroupItem';

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps, ToggleGroupItemProps };