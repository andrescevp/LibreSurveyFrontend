import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'Enable notifications',
  },
};

export const WithLabelAndDescription: Story = {
  args: {
    checked: true,
    label: 'Enable notifications',
    description: 'Receive email notifications when someone mentions you.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    checked: false,
    label: 'Small switch',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    checked: true,
    label: 'Medium switch',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    checked: false,
    label: 'Large switch',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
    label: 'Disabled switch',
    description: 'This switch is disabled',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Disabled checked switch',
  },
};

export const WithError: Story = {
  args: {
    error: 'This field is required',
    label: 'Accept terms',
    description: 'You must accept the terms to continue',
  },
};

export const WithErrorChecked: Story = {
  args: {
    error: 'Invalid selection',
    checked: true,
    label: 'Enable feature',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" checked />
      <Switch size="lg" label="Large" />
    </div>
  ),
};