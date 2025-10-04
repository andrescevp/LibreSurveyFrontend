import React from 'react';
import { Badge } from '@ui/atoms/Badge';
import {
    SidebarMenuItem,
    SidebarMenuButton,
} from '@ui/organisms/SidebarComponents';

interface NavigationItemData {
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    href?: string;
    isActive?: boolean;
    badge?: string | number;
    children?: NavigationItemData[];
}

interface NavigationItemProps {
    item: NavigationItemData;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item }) => {
    return (
        <SidebarMenuItem key={item.id} className='px-2 flex items-center'>
            <SidebarMenuButton
                asChild={!!item.href}
                isActive={item.isActive}
                tooltip={item.label}
            >
                {item.href ? (
                    <a href={item.href} className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.label}</span>
                    </a>
                ) : (
                    <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.label}</span>
                    </div>
                )}
            </SidebarMenuButton>
            {item.badge && (
                <Badge
                    variant="secondary"
                    className="ml-auto text-xs"
                >
                    {item.badge}
                </Badge>
            )}
        </SidebarMenuItem>
    );
};

NavigationItem.displayName = 'NavigationItem';

export { NavigationItem };
export type { NavigationItemProps, NavigationItemData };