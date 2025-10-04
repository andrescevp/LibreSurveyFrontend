import type { Meta, StoryObj } from '@storybook/react';
import {
    Home,
    FileText,
    Users,
    Settings,
    BarChart,
    Bell,
    HelpCircle,
    Plus,
    Filter
} from 'lucide-react';

import { ApplicationSkeleton } from './ApplicationSkeleton';
import type { NavigationItem, UserProfile, TopBarAction } from './ApplicationSkeleton';
import { Button } from '@ui/atoms/Button';
import { Badge } from '@ui/atoms/Badge';

const meta: Meta<typeof ApplicationSkeleton> = {
    title: 'UI/Templates/ApplicationSkeleton',
    component: ApplicationSkeleton,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        sidebarDefaultOpen: {
            control: 'boolean',
            description: 'Whether the sidebar is open by default',
        },
        sidebarCollapsible: {
            control: 'select',
            options: ['offcanvas', 'icon', 'none'],
            description: 'Sidebar collapse behavior',
        },
        sidebarVariant: {
            control: 'select',
            options: ['sidebar', 'floating', 'inset'],
            description: 'Sidebar visual variant',
        },
        sidebarSide: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Sidebar position',
        },
        showSearch: {
            control: 'boolean',
            description: 'Show search bar in top navigation',
        },
        showBreadcrumbs: {
            control: 'boolean',
            description: 'Show breadcrumb navigation',
        },
        topBarTitle: {
            control: 'text',
            description: 'Application title in top bar',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items
const navigationItems: NavigationItem[] = [
    {
        id: 'home',
        label: 'Dashboard',
        icon: Home,
        href: '#',
        isActive: true,
    },
    {
        id: 'surveys',
        label: 'Surveys',
        icon: FileText,
        href: '#',
        badge: '12',
    },
    {
        id: 'responses',
        label: 'Responses',
        icon: BarChart,
        href: '#',
        badge: '248',
    },
    {
        id: 'users',
        label: 'Users',
        icon: Users,
        href: '#',
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '#',
    },
];

// Sample user profile
const userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
};

// Sample top bar actions
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

// Sample content
const SampleContent = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Welcome back! Here's what's happening with your surveys.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
                <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Survey
                </Button>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
                { title: 'Total Surveys', value: '24', change: '+2 from last month' },
                { title: 'Active Surveys', value: '8', change: '+1 from last week' },
                { title: 'Total Responses', value: '1,248', change: '+18% from last month' },
                { title: 'Completion Rate', value: '87%', change: '+3% from last month' },
            ].map((stat, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {stat.change}
                    </p>
                </div>
            ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Recent Surveys</h3>
                <div className="space-y-3">
                    {[
                        { name: 'Customer Satisfaction Q3', status: 'Active', responses: 145 },
                        { name: 'Employee Feedback 2024', status: 'Draft', responses: 0 },
                        { name: 'Product Market Research', status: 'Completed', responses: 892 },
                    ].map((survey, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                            <div>
                                <p className="font-medium">{survey.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {survey.responses} responses
                                </p>
                            </div>
                            <Badge variant={survey.status === 'Active' ? 'default' : survey.status === 'Draft' ? 'secondary' : 'outline'}>
                                {survey.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'Create Survey', icon: Plus },
                        { label: 'View Reports', icon: BarChart },
                        { label: 'Manage Users', icon: Users },
                        { label: 'Settings', icon: Settings },
                    ].map((action, index) => (
                        <Button key={index} variant="outline" className="h-16 flex-col gap-2">
                            <action.icon className="h-5 w-5" />
                            <span className="text-sm">{action.label}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Default story
export const Default: Story = {
    args: {
        sidebarDefaultOpen: true,
        sidebarCollapsible: 'offcanvas',
        sidebarVariant: 'sidebar',
        sidebarSide: 'left',
        navigationItems,
        topBarTitle: 'LibreSurvey',
        topBarActions,
        showSearch: true,
        searchPlaceholder: 'Search surveys...',
        userProfile,
        showBreadcrumbs: false,
    },
    render: (args) => (
        <ApplicationSkeleton {...args}>
            <SampleContent />
        </ApplicationSkeleton>
    ),
};

// With custom sidebar header and footer
export const WithCustomSidebar: Story = {
    args: {
        ...Default.args,
        sidebarHeader: (
            <div className="flex items-center gap-2 p-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">LS</span>
                </div>
                <div>
                    <h2 className="font-semibold text-sm">LibreSurvey</h2>
                    <p className="text-xs text-muted-foreground">v2.0.0</p>
                </div>
            </div>
        ),
        sidebarFooter: (
            <div className="p-2 text-center">
                <p className="text-xs text-muted-foreground">
                    © 2024 LibreSurvey
                </p>
            </div>
        ),
    },
    render: (args) => (
        <ApplicationSkeleton {...args}>
            <SampleContent />
        </ApplicationSkeleton>
    ),
};

// With breadcrumbs
export const WithBreadcrumbs: Story = {
    args: {
        ...Default.args,
        showBreadcrumbs: true,
        breadcrumbs: [
            { label: 'Dashboard', href: '#' },
            { label: 'Surveys', href: '#' },
            { label: 'Customer Feedback' },
        ],
    },
    render: (args) => (
        <ApplicationSkeleton {...args}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Customer Feedback Survey</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your customer feedback survey and view responses.
                    </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Survey Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Survey Title</label>
                            <p className="text-sm text-muted-foreground">Q3 Customer Satisfaction Survey</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Status</label>
                            <div className="mt-1">
                                <Badge>Active</Badge>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Total Responses</label>
                            <p className="text-sm text-muted-foreground">145 responses</p>
                        </div>
                    </div>
                </div>
            </div>
        </ApplicationSkeleton>
    ),
};

// Collapsed sidebar
export const CollapsedSidebar: Story = {
    args: {
        ...Default.args,
        sidebarDefaultOpen: false,
        sidebarCollapsible: 'icon',
    },
    render: (args) => (
        <ApplicationSkeleton {...args}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Collapsed Sidebar</h1>
                    <p className="text-muted-foreground mt-1">
                        The sidebar is collapsed to icons only. Click the trigger to expand.
                    </p>
                </div>
                <SampleContent />
            </div>
        </ApplicationSkeleton>
    ),
};

// Right-side sidebar
export const RightSidebar: Story = {
    args: {
        ...Default.args,
        sidebarSide: 'right',
        topBarTitle: 'Right Sidebar Layout',
    },
    render: (args) => (
        <ApplicationSkeleton {...args}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Right Sidebar</h1>
                    <p className="text-muted-foreground mt-1">
                        The sidebar is positioned on the right side of the screen.
                    </p>
                </div>
                <SampleContent />
            </div>
        </ApplicationSkeleton>
    ),
};

// Floating sidebar
export const FloatingSidebar: Story = {
    args: {
        ...Default.args,
        sidebarVariant: 'floating',
        topBarTitle: 'Floating Sidebar',
    },
    render: (args) => (
        <ApplicationSkeleton {...args}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Floating Sidebar</h1>
                    <p className="text-muted-foreground mt-1">
                        The sidebar has a floating appearance with border and shadow.
                    </p>
                </div>
                <SampleContent />
            </div>
        </ApplicationSkeleton>
    ),
};

// Minimal layout (no search, minimal actions)
export const Minimal: Story = {
    args: {
        sidebarDefaultOpen: true,
        sidebarCollapsible: 'offcanvas',
        navigationItems: navigationItems.slice(0, 3), // Only first 3 items
        topBarTitle: 'Minimal App',
        showSearch: false,
        topBarActions: [], // No actions
        userProfile: {
            name: 'User',
            email: 'user@example.com',
        },
    },
    render: (args) => (
        <ApplicationSkeleton {...args}>
            <div className="space-y-6">
                <div className="text-center py-12">
                    <h1 className="text-3xl font-bold">Minimal Layout</h1>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                        A clean, minimal application layout with reduced navigation and top bar elements.
                    </p>
                </div>
                <div className="max-w-2xl mx-auto">
                    <div className="bg-card p-8 rounded-lg border text-center">
                        <h3 className="text-lg font-semibold mb-2">Welcome</h3>
                        <p className="text-muted-foreground">
                            This is a minimal version of the application skeleton with reduced UI elements
                            for simpler use cases.
                        </p>
                    </div>
                </div>
            </div>
        </ApplicationSkeleton>
    ),
};