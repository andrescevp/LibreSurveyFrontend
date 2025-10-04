import React from 'react';
import { cn } from '@lib/utils';
import { TopBar } from '@ui/organisms/TopBar';
import { AppLayout } from '@ui/organisms/AppLayout';
import { Breadcrumb } from '@ui/molecules/Breadcrumb';
import type { TopBarAction } from '@ui/organisms/TopBar';
import type { UserProfileData } from '@ui/molecules/UserProfile';
import type { NavigationItemData } from '@ui/molecules/NavigationItem';
import type { BreadcrumbItem } from '@ui/molecules/BreadcrumbNew';

// Re-export types for backwards compatibility
type NavigationItem = NavigationItemData;
type UserProfile = UserProfileData;

interface ApplicationSkeletonProps {
    className?: string;
    children: React.ReactNode;

    // Sidebar configuration
    sidebarDefaultOpen?: boolean;
    sidebarCollapsible?: 'offcanvas' | 'icon' | 'none';
    sidebarVariant?: 'sidebar' | 'floating' | 'inset';
    sidebarSide?: 'left' | 'right';

    // Navigation
    navigationItems?: NavigationItem[];
    sidebarHeader?: React.ReactNode;
    sidebarFooter?: React.ReactNode;

    // Top bar configuration
    topBarTitle?: string;
    topBarActions?: TopBarAction[];
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;

    // User profile
    userProfile?: UserProfile;
    onUserMenuClick?: (action: string) => void;

    // Content area
    contentClassName?: string;
    showBreadcrumbs?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

const ApplicationSkeleton = React.forwardRef<HTMLDivElement, ApplicationSkeletonProps>(
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
        topBarTitle = 'Application',
        topBarActions = [],
        showSearch = true,
        searchPlaceholder = 'Search...',
        onSearch,
        userProfile,
        onUserMenuClick,
        contentClassName,
        showBreadcrumbs = false,
        breadcrumbs = [],
        ...props
    }, ref) => {
        return (
            <AppLayout
                className={className}
                ref={ref}
                sidebarDefaultOpen={sidebarDefaultOpen}
                sidebarCollapsible={sidebarCollapsible}
                sidebarVariant={sidebarVariant}
                sidebarSide={sidebarSide}
                navigationItems={navigationItems}
                sidebarHeader={sidebarHeader}
                sidebarFooter={sidebarFooter}
                contentClassName={cn(contentClassName)}
                {...props}
            >
                <TopBar
                    title={topBarTitle}
                    actions={topBarActions}
                    showSearch={showSearch}
                    searchPlaceholder={searchPlaceholder}
                    onSearch={onSearch}
                    userProfile={userProfile}
                    onUserMenuClick={onUserMenuClick}
                />
                <div className="p-6">
                    {showBreadcrumbs && breadcrumbs.length > 0 && (
                        <Breadcrumb items={breadcrumbs} />
                    )}
                    {children}
                </div>
            </AppLayout>
        );
    }
);

ApplicationSkeleton.displayName = 'ApplicationSkeleton';

export { ApplicationSkeleton };
export type {
    ApplicationSkeletonProps,
    NavigationItem,
    UserProfile,
    TopBarAction
};