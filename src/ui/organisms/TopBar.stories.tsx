import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Settings, Mail } from 'lucide-react';
import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
    title: 'UI/Organisms/TopBar',
    component: TopBar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
        },
        showSearch: {
            control: 'boolean',
        },
        searchPlaceholder: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleActions = [
    {
        id: 'notifications',
        label: 'Notifications',
        icon: Bell,
        badge: 3,
        onClick: () => console.log('Notifications clicked'),
    },
    {
        id: 'mail',
        label: 'Mail',
        icon: Mail,
        badge: 12,
        onClick: () => console.log('Mail clicked'),
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        onClick: () => console.log('Settings clicked'),
    },
];

const sampleUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    avatar: 'https://github.com/shadcn.png',
};

export const Default: Story = {
    args: {
        title: 'Dashboard',
        showSearch: true,
        searchPlaceholder: 'Search...',
        actions: sampleActions,
        userProfile: sampleUser,
        onSearch: (query: string) => console.log('Search:', query),
        onUserMenuClick: (action: string) => console.log('User action:', action),
    },
};

export const WithoutSearch: Story = {
    args: {
        title: 'Survey Editor',
        showSearch: false,
        actions: sampleActions,
        userProfile: sampleUser,
        onUserMenuClick: (action: string) => console.log('User action:', action),
    },
};

export const WithoutUser: Story = {
    args: {
        title: 'Public Page',
        showSearch: true,
        searchPlaceholder: 'Search surveys...',
        actions: sampleActions.slice(0, 2),
        onSearch: (query: string) => console.log('Search:', query),
    },
};

export const MinimalBar: Story = {
    args: {
        title: 'Simple App',
        showSearch: false,
        actions: [],
    },
};