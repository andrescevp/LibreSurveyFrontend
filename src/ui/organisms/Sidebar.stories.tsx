import type { Meta, StoryObj } from '@storybook/react';
import { Home, Settings, User, Search, FileText, HelpCircle, Bell, Calendar } from 'lucide-react';

import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarInset,
    SidebarSeparator,
    SidebarInput,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@ui/organisms/SidebarComponents';

const meta: Meta<typeof SidebarProvider> = {
    title: 'UI/Organisms/Sidebar',
    component: SidebarProvider,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        defaultOpen: {
            control: 'boolean',
            description: 'Whether the sidebar is open by default',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic sidebar example
export const Default: Story = {
    args: {
        defaultOpen: true,
    },
    render: (args) => (
        <SidebarProvider {...args}>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarHeader>
                        <h2 className="text-lg font-semibold">LibreSurvey</h2>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#" className="flex items-center gap-2">
                                                <Home className="h-4 w-4" />
                                                Home
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#" className="flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                Surveys
                                            </a>
                                        </SidebarMenuButton>
                                        <SidebarMenuBadge>3</SidebarMenuBadge>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#" className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                Profile
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarSeparator />
                        <SidebarGroup>
                            <SidebarGroupLabel>Settings</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#" className="flex items-center gap-2">
                                                <Settings className="h-4 w-4" />
                                                Preferences
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#" className="flex items-center gap-2">
                                                <HelpCircle className="h-4 w-4" />
                                                Help
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="p-2 text-xs text-muted-foreground">
                            © 2024 LibreSurvey
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <SidebarTrigger />
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                        </div>
                        <div className="grid gap-4">
                            <div className="bg-card p-6 rounded-lg border">
                                <h2 className="text-lg font-semibold mb-2">Welcome to LibreSurvey</h2>
                                <p className="text-muted-foreground">
                                    Use the sidebar to navigate through different sections of the application.
                                </p>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    ),
};

// Collapsed by default
export const Collapsed: Story = {
    args: {
        defaultOpen: false,
    },
    render: (args) => (
        <SidebarProvider {...args}>
            <div className="flex min-h-screen">
                <Sidebar collapsible="icon">
                    <SidebarHeader>
                        <div className="flex items-center justify-center">
                            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">LS</span>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Home">
                                            <Home className="h-4 w-4" />
                                            <span>Home</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Surveys">
                                            <FileText className="h-4 w-4" />
                                            <span>Surveys</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Profile">
                                            <User className="h-4 w-4" />
                                            <span>Profile</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Settings">
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <SidebarInset>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <SidebarTrigger />
                            <h1 className="text-2xl font-bold">Collapsed Sidebar</h1>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <p className="text-muted-foreground">
                                The sidebar is collapsed by default. Click the trigger to expand it.
                                Hover over the icons to see tooltips.
                            </p>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    ),
};

// With search and sub-menus
export const WithSearch: Story = {
    args: {
        defaultOpen: true,
    },
    render: (args) => (
        <SidebarProvider {...args}>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xs">LS</span>
                            </div>
                            <span className="font-semibold">LibreSurvey</span>
                        </div>
                        <SidebarInput placeholder="Search..." />
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton isActive>
                                            <Home className="h-4 w-4" />
                                            <span>Overview</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Calendar className="h-4 w-4" />
                                            <span>Schedule</span>
                                        </SidebarMenuButton>
                                        <SidebarMenuBadge>2</SidebarMenuBadge>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Survey Management</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <FileText className="h-4 w-4" />
                                            <span>My Surveys</span>
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton href="#" isActive>
                                                    <span>Customer Feedback</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton href="#">
                                                    <span>Employee Survey</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton href="#">
                                                    <span>Market Research</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Bell className="h-4 w-4" />
                                            <span>Responses</span>
                                        </SidebarMenuButton>
                                        <SidebarMenuAction>
                                            <Settings className="h-3 w-3" />
                                        </SidebarMenuAction>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <User className="h-4 w-4" />
                                    <span>John Doe</span>
                                </SidebarMenuButton>
                                <SidebarMenuAction showOnHover>
                                    <Settings className="h-3 w-3" />
                                </SidebarMenuAction>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <SidebarTrigger />
                            <h1 className="text-2xl font-bold">Advanced Sidebar</h1>
                        </div>
                        <div className="grid gap-4">
                            <div className="bg-card p-6 rounded-lg border">
                                <h2 className="text-lg font-semibold mb-2">Features Demonstrated</h2>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• Search input in header</li>
                                    <li>• Active menu items</li>
                                    <li>• Menu badges for notifications</li>
                                    <li>• Sub-menu navigation</li>
                                    <li>• Menu actions and hover effects</li>
                                    <li>• User section in footer</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    ),
};

// Loading state with skeletons
export const Loading: Story = {
    args: {
        defaultOpen: true,
    },
    render: (args) => (
        <SidebarProvider {...args}>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarHeader>
                        <h2 className="text-lg font-semibold">Loading...</h2>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuSkeleton showIcon />
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuSkeleton showIcon />
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuSkeleton />
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuSkeleton showIcon />
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarSeparator />
                        <SidebarGroup>
                            <SidebarGroupLabel>Settings</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuSkeleton />
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuSkeleton showIcon />
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <SidebarInset>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <SidebarTrigger />
                            <h1 className="text-2xl font-bold">Loading State</h1>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <p className="text-muted-foreground">
                                This shows how to display loading skeletons while the sidebar content is being fetched.
                            </p>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    ),
};

// Right-aligned sidebar
export const RightSide: Story = {
    args: {
        defaultOpen: true,
    },
    render: (args) => (
        <SidebarProvider {...args}>
            <div className="flex min-h-screen">
                <SidebarInset>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold">Right Sidebar</h1>
                            <SidebarTrigger />
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <p className="text-muted-foreground">
                                The sidebar can be positioned on the right side of the screen.
                                Toggle it using the trigger on the right.
                            </p>
                        </div>
                    </div>
                </SidebarInset>
                <Sidebar side="right">
                    <SidebarHeader>
                        <h2 className="text-lg font-semibold">Right Sidebar</h2>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Tools</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Search className="h-4 w-4" />
                                            <span>Search</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <HelpCircle className="h-4 w-4" />
                                            <span>Help</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </div>
        </SidebarProvider>
    ),
};