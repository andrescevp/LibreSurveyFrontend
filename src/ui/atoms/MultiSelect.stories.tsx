import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'UI/Atoms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selectedDisplayFormat: {
      control: 'select',
      options: ['count', 'truncate', 'wrap'],
    },
    maxSelectedDisplay: {
      control: 'number',
      description: 'Max number of selected items to display before showing count',
    },
    isDisabled: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
    isSearchable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select technologies...',
    isClearable: true,
    isSearchable: true,
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    placeholder: 'Select (small)...',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    placeholder: 'Select (large)...',
  },
};

export const GhostVariant: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    placeholder: 'Ghost variant...',
  },
};

export const WithDefaultValues: Story = {
  args: {
    ...Default.args,
    defaultValue: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'react', label: 'React' },
    ],
  },
};

export const CountDisplayFormat: Story = {
  args: {
    ...Default.args,
    selectedDisplayFormat: 'count',
    maxSelectedDisplay: 2,
    defaultValue: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
    ],
  },
};

export const TruncateDisplayFormat: Story = {
  args: {
    ...Default.args,
    selectedDisplayFormat: 'truncate',
    defaultValue: [
      { value: 'javascript', label: 'JavaScript - A versatile programming language' },
      { value: 'typescript', label: 'TypeScript - JavaScript with static typing' },
      { value: 'react', label: 'React - A JavaScript library for building user interfaces' },
    ],
  },
};

export const WrapDisplayFormat: Story = {
  args: {
    ...Default.args,
    selectedDisplayFormat: 'wrap',
    defaultValue: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
    ],
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Please select at least one technology',
  },
};

export const WithErrorElement: Story = {
  args: {
    ...Default.args,
    error: (
      <div className="flex items-center gap-1 text-destructive text-sm mt-1">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 3v4M7 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        This field is required
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    defaultValue: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'react', label: 'React' },
    ],
  },
};

export const NotSearchable: Story = {
  args: {
    ...Default.args,
    isSearchable: false,
    placeholder: 'Not searchable...',
  },
};

export const NotClearable: Story = {
  args: {
    ...Default.args,
    isClearable: false,
    defaultValue: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'react', label: 'React' },
    ],
  },
};

export const WithDisabledOptions: Story = {
  args: {
    ...Default.args,
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'react', label: 'React', isDisabled: true },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular', isDisabled: true },
      { value: 'svelte', label: 'Svelte' },
    ],
    placeholder: 'Some options are disabled...',
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    placeholder: 'Select from many options...',
    isClearable: true,
    isSearchable: true,
  },
};