import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '@ui/atoms';

const meta: Meta<typeof Card> = {
    title: 'UI/Molecules/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'elevated', 'outlined'],
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'w-[350px]',
    },
    render: (args) => (
        <Card {...args}>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                    Card description goes here. This is a brief explanation of the card content.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is the main content area of the card. You can put any content here.</p>
            </CardContent>
            <CardFooter>
                <Button>Action</Button>
            </CardFooter>
        </Card>
    ),
};

export const Elevated: Story = {
    args: {
        variant: 'elevated',
        className: 'w-[350px]',
    },
    render: (args) => (
        <Card {...args}>
            <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>
                    This card has an elevated appearance with more prominent shadow.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Elevated cards are great for important content that needs to stand out.</p>
            </CardContent>
        </Card>
    ),
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        className: 'w-[350px]',
    },
    render: (args) => (
        <Card {...args}>
            <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>
                    This card has a prominent border and no shadow.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Outlined cards work well for secondary content or grouped information.</p>
            </CardContent>
        </Card>
    ),
};

export const WithoutPadding: Story = {
    args: {
        padding: 'none',
        className: 'w-[350px]',
    },
    render: (args) => (
        <Card {...args}>
            <div className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">No Padding Card</h3>
                <p className="text-sm text-muted-foreground mt-1.5">
                    This card has no default padding, giving you full control over spacing.
                </p>
            </div>
            <div className="border-t border-border p-6">
                <p>You can create custom sections with your own padding.</p>
            </div>
        </Card>
    ),
};

export const SmallPadding: Story = {
    args: {
        padding: 'sm',
        className: 'w-[350px]',
    },
    render: (args) => (
        <Card {...args}>
            <h3 className="text-xl font-semibold">Compact Card</h3>
            <p className="text-sm text-muted-foreground mt-1">
                This card uses small padding for a more compact appearance.
            </p>
        </Card>
    ),
};

export const LargePadding: Story = {
    args: {
        padding: 'lg',
        className: 'w-[400px]',
    },
    render: (args) => (
        <Card {...args}>
            <h3 className="text-2xl font-semibold">Spacious Card</h3>
            <p className="text-muted-foreground mt-2">
                This card uses large padding for a more spacious, relaxed appearance.
            </p>
        </Card>
    ),
};

export const ComplexLayout: Story = {
    args: {
        className: 'w-[400px]',
    },
    render: (args) => (
        <Card {...args}>
            <CardHeader>
                <CardTitle as="h2">Project Overview</CardTitle>
                <CardDescription>
                    A comprehensive look at the current project status and metrics.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-primary rounded-full w-3/4"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium">Tasks Completed</p>
                            <p className="text-muted-foreground">24 of 32</p>
                        </div>
                        <div>
                            <p className="font-medium">Team Members</p>
                            <p className="text-muted-foreground">8 active</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button variant="default">View Details</Button>
                <Button variant="secondary">Edit Project</Button>
            </CardFooter>
        </Card>
    ),
};