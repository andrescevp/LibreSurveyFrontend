import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'success', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    closable: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Alert Title',
    children: 'This is a default alert message with some additional information.',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Error',
    children: 'Something went wrong. Please try again later.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your information before proceeding.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is some helpful information for you to know.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This alert only has a message without a title.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'default',
    title: 'No Icon Alert',
    children: 'This alert has no icon displayed.',
    icon: null,
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'default',
    title: 'Custom Icon',
    children: 'This alert uses a custom icon.',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2L10.5 7H5.5L8 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'info',
    title: 'Small Alert',
    children: 'This is a small-sized alert.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'success',
    title: 'Large Alert',
    children: 'This is a large-sized alert with more prominent styling.',
  },
};

export const Closable: Story = {
  args: {
    variant: 'warning',
    title: 'Closable Alert',
    children: 'This alert can be closed by clicking the X button.',
    closable: true,
    onClose: () => alert('Alert closed!'),
  },
};

export const LongContent: Story = {
  args: {
    variant: 'default',
    title: 'Alert with Long Content',
    children: 'This is an alert with a much longer message that demonstrates how the component handles text wrapping and maintains proper spacing. The content should wrap naturally and maintain readability across different screen sizes. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const OnlyMessage: Story = {
  args: {
    variant: 'info',
    children: 'This alert contains only a message without a title.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Alert variant="default" title="Default" closable>
        This is a default alert message.
      </Alert>
      <Alert variant="info" title="Information" closable>
        This is an informational alert message.
      </Alert>
      <Alert variant="success" title="Success" closable>
        This is a success alert message.
      </Alert>
      <Alert variant="warning" title="Warning" closable>
        This is a warning alert message.
      </Alert>
      <Alert variant="destructive" title="Error" closable>
        This is an error alert message.
      </Alert>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Alert size="sm" variant="info" title="Small Alert">
        This is a small alert with minimal padding.
      </Alert>
      <Alert size="md" variant="info" title="Medium Alert">
        This is a medium alert with standard padding.
      </Alert>
      <Alert size="lg" variant="info" title="Large Alert">
        This is a large alert with generous padding.
      </Alert>
    </div>
  ),
};