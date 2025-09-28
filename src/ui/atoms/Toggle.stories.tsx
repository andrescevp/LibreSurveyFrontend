import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Bold, Italic, Underline } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
    title: 'UI/Atoms/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        pressed: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <Bold className="h-4 w-4" />,
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: <Italic className="h-4 w-4" />,
    },
};

export const Pressed: Story = {
    args: {
        pressed: true,
        children: <Bold className="h-4 w-4" />,
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: <Bold className="h-3 w-3" />,
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: <Bold className="h-5 w-5" />,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: <Bold className="h-4 w-4" />,
    },
};

export const WithText: Story = {
    args: {
        children: 'Bold',
    },
};

export const TextFormatting: Story = {
    render: () => (
        <div className="flex gap-2">
            <Toggle>
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle>
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle>
                <Underline className="h-4 w-4" />
            </Toggle>
        </div>
    ),
};