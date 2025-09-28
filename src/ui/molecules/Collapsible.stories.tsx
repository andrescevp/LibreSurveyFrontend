import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
    title: 'UI/Molecules/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        defaultOpen: {
            control: 'boolean',
            description: 'Whether the collapsible is open by default',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the collapsible is disabled',
        },
    },
    decorators: [
        (Story) => (
            <div className="w-96">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Collapsible {...args}>
            <CollapsibleTrigger>
                Click to expand
            </CollapsibleTrigger>
            <CollapsibleContent>
                This is the collapsible content. It can contain any React elements, text, or other components.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const DefaultOpen: Story = {
    render: (args) => (
        <Collapsible defaultOpen {...args}>
            <CollapsibleTrigger>
                Click to collapse
            </CollapsibleTrigger>
            <CollapsibleContent>
                This collapsible is open by default. You can click the trigger to collapse it.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const WithoutIcon: Story = {
    render: (args) => (
        <Collapsible {...args}>
            <CollapsibleTrigger showIcon={false}>
                No chevron icon
            </CollapsibleTrigger>
            <CollapsibleContent>
                This collapsible trigger doesn't show the chevron icon.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const IconLeft: Story = {
    render: (args) => (
        <Collapsible {...args}>
            <CollapsibleTrigger iconPosition="left">
                Icon on the left
            </CollapsibleTrigger>
            <CollapsibleContent>
                This collapsible has the chevron icon positioned on the left side.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <Collapsible {...args}>
            <CollapsibleTrigger disabled>
                Disabled trigger
            </CollapsibleTrigger>
            <CollapsibleContent>
                This content won't be accessible because the trigger is disabled.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const MultipleItems: Story = {
    render: () => (
        <div className="space-y-4">
            <Collapsible>
                <CollapsibleTrigger>
                    Section 1: Getting Started
                </CollapsibleTrigger>
                <CollapsibleContent>
                    Welcome to our documentation! This section covers the basics of getting started with our platform.
                </CollapsibleContent>
            </Collapsible>

            <Collapsible>
                <CollapsibleTrigger>
                    Section 2: Advanced Features
                </CollapsibleTrigger>
                <CollapsibleContent>
                    Learn about advanced features and customization options available in our system.
                </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
                <CollapsibleTrigger>
                    Section 3: API Reference
                </CollapsibleTrigger>
                <CollapsibleContent>
                    Complete API documentation with examples and best practices.
                </CollapsibleContent>
            </Collapsible>
        </div>
    ),
};

export const CustomStyling: Story = {
    render: () => (
        <Collapsible>
            <CollapsibleTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
                Custom styled trigger
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-muted">
                This collapsible has custom styling applied to both the trigger and content areas.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const WithComplexContent: Story = {
    render: () => (
        <Collapsible>
            <CollapsibleTrigger>
                FAQ: How to use this component?
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="space-y-2">
                    <p>This collapsible component can contain complex content:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multiple paragraphs</li>
                        <li>Lists and bullet points</li>
                        <li>Links and buttons</li>
                        <li>Other React components</li>
                    </ul>
                    <div className="mt-3 p-3 bg-accent rounded-md">
                        <strong>Note:</strong> The content area automatically handles overflow and animations.
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    ),
};