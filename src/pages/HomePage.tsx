import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    FileText,
    BarChart,
    Users,
    Settings,
    Plus,
    Filter,
    Bell,
    HelpCircle,
    TrendingUp,
    TrendingDown,
    Clock
} from 'lucide-react';
import { ApplicationSkeleton } from '@ui/templates/ApplicationSkeleton';
import type { NavigationItem, UserProfile, TopBarAction } from '@ui/templates/ApplicationSkeleton';
import { useAuth } from '../auth';
import { Button } from '@ui/atoms/Button';
import { Badge } from '@ui/atoms/Badge';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Navigation items for the sidebar
    const navigationItems: NavigationItem[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            href: '/',
            isActive: true,
        },
        {
            id: 'surveys',
            label: 'Surveys',
            icon: FileText,
            href: '/surveys',
            badge: '12',
        },
        {
            id: 'responses',
            label: 'Responses',
            icon: BarChart,
            href: '/responses',
            badge: '248',
        },
        {
            id: 'users',
            label: 'Users',
            icon: Users,
            href: '/users',
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            href: '/settings',
        },
    ];

    // User profile for the top bar
    const userProfile: UserProfile = {
        name: user?.name || user?.username || 'User',
        email: user?.username || 'user@example.com', // Using username as email placeholder
        role: 'Administrator', // Default role for now
    };

    // Top bar actions
    const topBarActions: TopBarAction[] = [
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            badge: '3',
            onClick: () => console.log('Notifications clicked'),
        },
        {
            id: 'help',
            label: 'Help',
            icon: HelpCircle,
            onClick: () => console.log('Help clicked'),
        },
    ];

    // Handle user menu actions
    const handleUserMenuClick = (action: string) => {
        switch (action) {
            case 'profile':
                console.log('Profile clicked');
                break;
            case 'settings':
                navigate('/settings');
                break;
            case 'logout':
                logout();
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    // Handle search
    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        // TODO: Implement search functionality
    };

    // Navigate to survey editor
    const handleCreateSurvey = () => {
        navigate('/editor');
    };

    // Dashboard statistics data
    const stats = [
        {
            title: 'Total Surveys',
            value: '24',
            change: '+2 from last month',
            trend: 'up' as const,
            icon: FileText,
        },
        {
            title: 'Active Surveys',
            value: '8',
            change: '+1 from last week',
            trend: 'up' as const,
            icon: Clock,
        },
        {
            title: 'Total Responses',
            value: '1,248',
            change: '+18% from last month',
            trend: 'up' as const,
            icon: BarChart,
        },
        {
            title: 'Completion Rate',
            value: '87%',
            change: '+3% from last month',
            trend: 'up' as const,
            icon: TrendingUp,
        },
    ];

    // Recent surveys data
    const recentSurveys = [
        {
            name: 'Customer Satisfaction Q3',
            status: 'Active' as const,
            responses: 145,
            lastUpdated: '2 hours ago'
        },
        {
            name: 'Employee Feedback 2024',
            status: 'Draft' as const,
            responses: 0,
            lastUpdated: '1 day ago'
        },
        {
            name: 'Product Market Research',
            status: 'Completed' as const,
            responses: 892,
            lastUpdated: '3 days ago'
        },
        {
            name: 'Website Usability Study',
            status: 'Active' as const,
            responses: 67,
            lastUpdated: '5 hours ago'
        },
    ];

    // Quick actions data
    const quickActions = [
        {
            label: 'Create Survey',
            icon: Plus,
            onClick: handleCreateSurvey,
            description: 'Start building a new survey'
        },
        {
            label: 'View Reports',
            icon: BarChart,
            onClick: () => navigate('/responses'),
            description: 'Analyze survey responses'
        },
        {
            label: 'Manage Users',
            icon: Users,
            onClick: () => navigate('/users'),
            description: 'User management'
        },
        {
            label: 'Settings',
            icon: Settings,
            onClick: () => navigate('/settings'),
            description: 'App configuration'
        },
    ];

    return (
        <ApplicationSkeleton
            topBarTitle="LibreSurvey"
            sidebarDefaultOpen={true}
            sidebarCollapsible="offcanvas"
            sidebarHeader={
                <div className="px-4 py-3">
                    <span className="text-lg font-bold">LibreSurvey</span>
                </div>
            }
            navigationItems={navigationItems}
            userProfile={userProfile}
            topBarActions={topBarActions}
            onUserMenuClick={handleUserMenuClick}
            showSearch={true}
            searchPlaceholder="Search surveys, responses..."
            onSearch={handleSearch}
        >
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Welcome back, {user?.name || user?.username}!
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Here's what's happening with your surveys today.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Button size="sm" onClick={handleCreateSurvey}>
                            <Plus className="h-4 w-4 mr-2" />
                            New Survey
                        </Button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-card p-6 rounded-lg border border-border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-md">
                                        <stat.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold text-foreground">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {stat.trend === 'up' ? (
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                                {stat.trend === 'up' ? (
                                    <span className="text-green-500">↗</span>
                                ) : (
                                    <span className="text-red-500">↘</span>
                                )}
                                {stat.change}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Surveys */}
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">Recent Surveys</h3>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/surveys')}>
                                View all
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {recentSurveys.map((survey, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground truncate">{survey.name}</p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <p className="text-sm text-muted-foreground">
                                                {survey.responses} responses
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {survey.lastUpdated}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={
                                            survey.status === 'Active' ? 'default' :
                                                survey.status === 'Draft' ? 'secondary' : 'outline'
                                        }
                                    >
                                        {survey.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="h-20 flex-col gap-2 p-4 hover:bg-accent"
                                    onClick={action.onClick}
                                >
                                    <action.icon className="h-6 w-6 text-primary" />
                                    <div className="text-center">
                                        <div className="text-sm font-medium">{action.label}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {action.description}
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            {
                                action: 'New response received',
                                survey: 'Customer Satisfaction Q3',
                                time: '5 minutes ago',
                                type: 'response'
                            },
                            {
                                action: 'Survey published',
                                survey: 'Website Usability Study',
                                time: '2 hours ago',
                                type: 'publish'
                            },
                            {
                                action: 'Survey completed',
                                survey: 'Product Market Research',
                                time: '1 day ago',
                                type: 'complete'
                            },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors">
                                <div className={`w-2 h-2 rounded-full ${activity.type === 'response' ? 'bg-green-500' :
                                    activity.type === 'publish' ? 'bg-blue-500' : 'bg-orange-500'
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-sm text-foreground">
                                        <span className="font-medium">{activity.action}</span>
                                        {' for '}
                                        <span className="font-medium">{activity.survey}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ApplicationSkeleton>
    );
};

export default HomePage;