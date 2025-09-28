import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

// Tabs Root Component
const TabsRoot = TabsPrimitive.Root;

// Tabs List Component with variants
const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted",
        card: "bg-card border border-border",
        underline: "bg-transparent border-b border-border p-0 h-auto",
      },
      size: {
        sm: "h-8 p-0.5",
        md: "h-10 p-1",
        lg: "h-12 p-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  className?: string;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// Tabs Trigger Component with variants
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        card: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        underline: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent hover:bg-accent hover:text-accent-foreground px-4 py-2",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  className?: string;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// Tabs Content Component
const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      spacing: {
        none: "mt-0",
        sm: "mt-1",
        md: "mt-2",
        lg: "mt-4",
        xl: "mt-6",
      },
    },
    defaultVariants: {
      spacing: "md",
    },
  }
);

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {
  className?: string;
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, spacing, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ spacing }), className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Compound Tabs Component
interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  className?: string;
  variant?: VariantProps<typeof tabsListVariants>['variant'];
  size?: VariantProps<typeof tabsListVariants>['size'];
  contentSpacing?: VariantProps<typeof tabsContentVariants>['spacing'];
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = "default", size = "md", contentSpacing = "md", ...props }, ref) => (
  <TabsRoot
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
Tabs.displayName = "Tabs";

// Export all components
export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  TabsRoot
};

export type { 
  TabsProps, 
  TabsListProps, 
  TabsTriggerProps, 
  TabsContentProps 
};