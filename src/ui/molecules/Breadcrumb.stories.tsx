import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { Home } from 'lucide-react';

const meta: Meta<typeof Breadcrumb> = {
    title: 'UI/Molecules/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        items: {
            control: 'object',
            description: 'Array of breadcrumb items',
        },
        separator: {
            control: false,
            description: 'Custom separator element',
        },
        maxItems: {
            control: 'number',
            description: 'Maximum number of items to show (with ellipsis)',
        },
        showRoot: {
            control: 'boolean',
            description: 'Whether to show root/home item',
        },
        rootLabel: {
            control: 'text',
            description: 'Label for root item',
        },
        rootHref: {
            control: 'text',
            description: 'URL for root item',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Projects', href: '/projects' },
            { label: 'Current Project', current: true },
        ],
    },
};

export const WithRoot: Story = {
    args: {
        showRoot: true,
        rootLabel: 'Home',
        rootHref: '/',
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Projects', href: '/projects' },
            { label: 'Current Project' },
        ],
    },
};

export const LongPath: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Computers', href: '/products/electronics/computers' },
            { label: 'Laptops', href: '/products/electronics/computers/laptops' },
            { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
            { label: 'Current Model' },
        ],
    },
};

export const WithMaxItems: Story = {
    args: {
        maxItems: 4,
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Computers', href: '/products/electronics/computers' },
            { label: 'Laptops', href: '/products/electronics/computers/laptops' },
            { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
            { label: 'Current Model' },
        ],
    },
};

export const CustomSeparator: Story = {
    args: {
        separator: <span className="text-muted-foreground/60">→</span>,
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Settings', href: '/settings' },
            { label: 'Profile' },
        ],
    },
};

export const WithIcons: Story = {
    args: {
        separator: <Home className="h-3 w-3" />,
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Documents', href: '/documents' },
            { label: 'Current File' },
        ],
    },
};

export const SingleItem: Story = {
    args: {
        items: [
            { label: 'Dashboard' },
        ],
    },
};

export const AllLinks: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
        ],
    },
};

export const NoLinks: Story = {
    args: {
        items: [
            { label: 'Level 1' },
            { label: 'Level 2' },
            { label: 'Level 3' },
        ],
    },
};