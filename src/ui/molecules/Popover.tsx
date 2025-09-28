import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@lib/utils';

// Root Popover component
const Popover = PopoverPrimitive.Root;

// Portal component for mounting outside the normal DOM tree
const PopoverPortal = PopoverPrimitive.Portal;

// Trigger component
const PopoverTrigger = PopoverPrimitive.Trigger;

// Close component
const PopoverClose = PopoverPrimitive.Close;

// Anchor component
const PopoverAnchor = PopoverPrimitive.Anchor;

// Arrow component props
interface PopoverArrowProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow> {
    className?: string;
}

const PopoverArrow = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Arrow>,
    PopoverArrowProps
>(({ className, ...props }, ref) => (
    <PopoverPrimitive.Arrow
        ref={ref}
        className={cn(
            'fill-popover',
            className
        )}
        {...props}
    />
));
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

// Content component props
interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
    className?: string;
}

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                'z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Header component for popover titles and descriptions
interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('grid gap-2', className)}
            {...props}
        />
    )
);
PopoverHeader.displayName = 'PopoverHeader';

// Footer component for popover actions
interface PopoverFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                className
            )}
            {...props}
        />
    )
);
PopoverFooter.displayName = 'PopoverFooter';

// Title component for popover titles
interface PopoverTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    className?: string;
}

const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
    ({ className, ...props }, ref) => (
        <h4
            ref={ref}
            className={cn('font-medium leading-none', className)}
            {...props}
        />
    )
);
PopoverTitle.displayName = 'PopoverTitle';

// Description component for popover descriptions
interface PopoverDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string;
}

const PopoverDescription = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
);
PopoverDescription.displayName = 'PopoverDescription';

export {
    Popover,
    PopoverPortal,
    PopoverTrigger,
    PopoverClose,
    PopoverAnchor,
    PopoverArrow,
    PopoverContent,
    PopoverHeader,
    PopoverFooter,
    PopoverTitle,
    PopoverDescription,
};

export type {
    PopoverArrowProps,
    PopoverContentProps,
    PopoverHeaderProps,
    PopoverFooterProps,
    PopoverTitleProps,
    PopoverDescriptionProps,
};