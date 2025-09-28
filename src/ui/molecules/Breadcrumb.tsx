import React from 'react';
import { cn } from '@lib/utils';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
    current?: boolean;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    showRoot?: boolean;
    rootLabel?: string;
    rootHref?: string;
    maxItems?: number;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
    (props: BreadcrumbProps, ref) => {
        const {
            className,
            items,
            separator = <ChevronRight className="h-4 w-4" />,
            showRoot = false,
            rootLabel = "Home",
            rootHref = "/",
            maxItems,
            ...rest
        } = props;

        // Process items with root
        let processedItems = [...items];
        if (showRoot && items.length > 0 && !items[0].href?.includes(rootHref)) {
            processedItems = [
                { label: rootLabel, href: rootHref },
                ...items
            ];
        }

        // Handle max items with ellipsis
        if (maxItems && processedItems.length > maxItems) {
            const firstItem = processedItems[0];
            const lastItems = processedItems.slice(-(maxItems - 2));
            processedItems = [
                firstItem,
                { label: "...", href: undefined },
                ...lastItems
            ];
        }

        return (
            <nav
                className={cn(
                    "flex items-center space-x-1 text-sm text-muted-foreground",
                    className
                )}
                aria-label="breadcrumb"
                ref={ref}
                {...rest}
            >
                <ol className="flex items-center space-x-1">
                    {processedItems.map((item, index) => {
                        const isLast = index === processedItems.length - 1;
                        const isCurrent = item.current || isLast;
                        const isEllipsis = item.label === "...";

                        return (
                            <li key={`${item.label}-${index}`} className="flex items-center">
                                {index > 0 && !isEllipsis && (
                                    <span
                                        className="mx-2 text-muted-foreground/60"
                                        aria-hidden="true"
                                    >
                                        {separator}
                                    </span>
                                )}

                                {isEllipsis ? (
                                    <span
                                        className="px-2 text-muted-foreground/60"
                                        aria-label="More items"
                                    >
                                        {item.label}
                                    </span>
                                ) : item.href && !isCurrent ? (
                                    <a
                                        href={item.href}
                                        className={cn(
                                            "hover:text-foreground transition-colors duration-200",
                                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1",
                                            "underline-offset-4 hover:underline"
                                        )}
                                        aria-current={isCurrent ? "page" : undefined}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <span
                                        className={cn(
                                            isCurrent && "text-foreground font-medium"
                                        )}
                                        aria-current={isCurrent ? "page" : undefined}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        );
    }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
export type { BreadcrumbProps, BreadcrumbItem };