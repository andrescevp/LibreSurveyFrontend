import { cn } from '@lib/utils';

interface DepthIndicatorProps {
    depth: number;
    maxDepth?: number;
    className?: string;
}

export function DepthIndicator({ depth, maxDepth = 10, className }: DepthIndicatorProps) {
    if (depth === 0) return null;

    // Create visual indentation based on depth
    const indentWidth = Math.min(depth, maxDepth) * 16; // 16px per level

    return (
        <div className={cn('flex-shrink-0', className)}>
            <div
                className="border-l-2 border-border h-6"
                style={{ marginLeft: `${indentWidth}px` }}
                aria-label={`Nested ${depth} level${depth > 1 ? 's' : ''} deep`}
            />
        </div>
    );
}