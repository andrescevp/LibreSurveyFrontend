import { GripVertical } from 'lucide-react';
import { cn } from '@lib/utils';

interface DragHandleProps {
    className?: string;
    isDragging?: boolean;
}

export function DragHandle({ className, isDragging }: DragHandleProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-center w-6 h-6 cursor-grab hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors',
                isDragging && 'cursor-grabbing opacity-50',
                className
            )}
            aria-label="Drag to reorder"
        >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
    );
}