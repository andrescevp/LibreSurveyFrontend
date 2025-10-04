import React from 'react';
import { User, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@lib/utils';
import { Button } from '@ui/atoms/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@ui/molecules/Dropdown';

interface UserProfileData {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
}

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    user: UserProfileData;
    onMenuClick?: (action: string) => void;
    showRole?: boolean;
}

const UserProfile = React.forwardRef<HTMLDivElement, UserProfileProps>(
    ({ className, user, onMenuClick, showRole = true, ...props }, ref) => {
        const handleUserMenuAction = (action: string) => {
            onMenuClick?.(action);
        };

        return (
            <div className={cn('', className)} ref={ref} {...props}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2 px-3">
                            <div className="flex items-center gap-2">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-6 w-6 rounded-full"
                                    />
                                ) : (
                                    <User className="h-4 w-4" />
                                )}
                                <div className="hidden md:flex flex-col items-start text-sm">
                                    <span className="font-medium">{user.name}</span>
                                    {showRole && user.role && (
                                        <span className="text-xs text-muted-foreground">
                                            {user.role}
                                        </span>
                                    )}
                                </div>
                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 border-b border-border">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <DropdownMenuItem onClick={() => handleUserMenuAction('profile')}>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserMenuAction('settings')}>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleUserMenuAction('logout')}
                            className="text-destructive focus:text-destructive"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }
);

UserProfile.displayName = 'UserProfile';

export { UserProfile };
export type { UserProfileProps, UserProfileData };