import React from 'react';
import { cn } from '@lib/utils';
import { Button } from '@ui/atoms/Button';
import { Badge } from '@ui/atoms/Badge';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    icon?: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    label?: string;
    onClick?: () => void;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
    ({ className, icon: Icon, badge, label, onClick, ...props }, ref) => {
        return (
            <Button
                variant="ghost"
                size="icon"
                onClick={onClick}
                className={cn('relative', className)}
                title={label}
                ref={ref}
                {...props}
            >
                {Icon && <Icon className="h-4 w-4" />}
                {badge && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                    >
                        {badge}
                    </Badge>
                )}
            </Button>
        );
    }
);

ActionButton.displayName = 'ActionButton';

export { ActionButton };
export type { ActionButtonProps };