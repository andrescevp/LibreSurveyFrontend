import React from 'react';
import { cn } from '@lib/utils';
import {
    Sidebar,
    SidebarProvider,
    SidebarInset,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
} from '@ui/organisms/SidebarComponents';
import { NavigationItem } from '@ui/molecules/NavigationItem';
import type { NavigationItemData } from '@ui/molecules/NavigationItem';

interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;

    // Sidebar configuration
    sidebarDefaultOpen?: boolean;
    sidebarCollapsible?: 'offcanvas' | 'icon' | 'none';
    sidebarVariant?: 'sidebar' | 'floating' | 'inset';
    sidebarSide?: 'left' | 'right';

    // Navigation
    navigationItems?: NavigationItemData[];
    sidebarHeader?: React.ReactNode;
    sidebarFooter?: React.ReactNode;

    // Content area
    contentClassName?: string;
}

const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
    ({
        className,
        children,
        sidebarDefaultOpen = true,
        sidebarCollapsible = 'offcanvas',
        sidebarVariant = 'sidebar',
        sidebarSide = 'left',
        navigationItems = [],
        sidebarHeader,
        sidebarFooter,
        contentClassName,
        ...props
    }, ref) => {
        return (
            <SidebarProvider defaultOpen={sidebarDefaultOpen}>
                <div
                    className={cn('flex min-h-screen w-full', className)}
                    ref={ref}
                    {...props}
                >
                    <Sidebar
                        side={sidebarSide}
                        variant={sidebarVariant}
                        collapsible={sidebarCollapsible}
                    >
                        {/* Sidebar Header */}
                        {sidebarHeader && (
                            <SidebarHeader>
                                {sidebarHeader}
                            </SidebarHeader>
                        )}

                        {/* Sidebar Content */}
                        <SidebarContent>
                            {navigationItems.length > 0 && (
                                <SidebarMenu>
                                    {navigationItems.map((item) => (
                                        <NavigationItem key={item.id} item={item} />
                                    ))}
                                </SidebarMenu>
                            )}
                        </SidebarContent>

                        {/* Sidebar Footer */}
                        {sidebarFooter && (
                            <SidebarFooter>
                                {sidebarFooter}
                            </SidebarFooter>
                        )}
                    </Sidebar>

                    <SidebarInset>
                        <main className={cn('flex-1', contentClassName)}>
                            {children}
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        );
    }
);

AppLayout.displayName = 'AppLayout';

export { AppLayout };
export type { AppLayoutProps };