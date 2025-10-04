import React from 'react';
import { cn } from '@lib/utils';
import { ActionButton } from '@ui/atoms/ActionButton';
import { SearchBar } from '@ui/molecules/SearchBar';
import { UserProfile } from '@ui/molecules/UserProfile';
import type { UserProfileData } from '@ui/molecules/UserProfile';
import { SidebarTrigger } from '@ui/organisms/SidebarComponents';

interface TopBarAction {
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
    badge?: string | number;
}

interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    title?: string;
    actions?: TopBarAction[];
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    userProfile?: UserProfileData;
    onUserMenuClick?: (action: string) => void;
}

const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
    ({
        className,
        title = 'Application',
        actions = [],
        showSearch = true,
        searchPlaceholder = 'Search...',
        onSearch,
        userProfile,
        onUserMenuClick,
        ...props
    }, ref) => {
        return (
            <header
                className={cn(
                    'bg-background border-b border-border sticky top-0 z-40',
                    className
                )}
                ref={ref}
                {...props}
            >
                <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
                    {/* Sidebar trigger and title */}
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
                            {title}
                        </h1>
                    </div>

                    {/* Search bar */}
                    {showSearch && (
                        <div className="mx-4">
                            <SearchBar
                                placeholder={searchPlaceholder}
                                onSearch={onSearch}
                            />
                        </div>
                    )}

                    {/* Top bar actions */}
                    <div className="flex items-center gap-2 ml-auto">
                        {actions.map((action) => (
                            <ActionButton
                                key={action.id}
                                icon={action.icon}
                                badge={action.badge}
                                label={action.label}
                                onClick={action.onClick}
                            />
                        ))}

                        {/* User profile dropdown */}
                        {userProfile && (
                            <UserProfile
                                user={userProfile}
                                onMenuClick={onUserMenuClick}
                            />
                        )}
                    </div>
                </div>
            </header>
        );
    }
);

TopBar.displayName = 'TopBar';

export { TopBar };
export type { TopBarProps, TopBarAction };