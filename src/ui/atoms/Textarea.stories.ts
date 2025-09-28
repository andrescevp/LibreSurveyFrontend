import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
    cols: {
      control: 'number',
    },
    error: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type your message here...',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your text here...',
    error: 'This field is required',
    defaultValue: '',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
    defaultValue: 'This is disabled text',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large textarea with many rows...',
    rows: 8,
    cols: 50,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'This is some default text in the textarea that can be edited.',
    rows: 4,
  },
};