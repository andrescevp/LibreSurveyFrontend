import React from 'react';
import { cn } from '@lib/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
    ({ className, items, separator = '/', ...props }, ref) => {
        if (items.length === 0) return null;

        return (
            <nav
                className={cn(
                    'flex items-center space-x-1 text-sm text-muted-foreground mb-4',
                    className
                )}
                ref={ref}
                {...props}
            >
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <span>{separator}</span>}
                        {item.href ? (
                            <a
                                href={item.href}
                                className="hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className="text-foreground font-medium">{item.label}</span>
                        )}
                    </React.Fragment>
                ))}
            </nav>
        );
    }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
export type { BreadcrumbProps, BreadcrumbItem };