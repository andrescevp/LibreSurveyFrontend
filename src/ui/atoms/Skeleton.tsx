import React from 'react';
import { cn } from '@lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'animate-pulse rounded-md bg-muted',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };