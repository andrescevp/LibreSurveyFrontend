import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import type { SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Atoms/Select',
  component: Select,
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
    isDisabled: {
      control: 'boolean',
    },
    isSearchable: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', isDisabled: true },
  { value: 'option5', label: 'Very Long Option Name That Should Be Handled Properly' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option...',
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: sampleOptions[1],
    placeholder: 'Select an option...',
  },
};

export const Small: Story = {
  args: {
    options: sampleOptions,
    size: 'sm',
    placeholder: 'Small select...',
  },
};

export const Large: Story = {
  args: {
    options: sampleOptions,
    size: 'lg',
    placeholder: 'Large select...',
  },
};

export const Ghost: Story = {
  args: {
    options: sampleOptions,
    variant: 'ghost',
    placeholder: 'Ghost variant...',
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    error: 'Please select a valid option',
    placeholder: 'Select with error...',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    isDisabled: true,
    placeholder: 'Disabled select...',
  },
};

export const Searchable: Story = {
  args: {
    options: sampleOptions,
    isSearchable: true,
    placeholder: 'Searchable select...',
  },
};

export const Clearable: Story = {
  args: {
    options: sampleOptions,
    isClearable: true,
    value: sampleOptions[0],
    placeholder: 'Clearable select...',
  },
};

export const NoOptions: Story = {
  args: {
    options: [],
    placeholder: 'No options available...',
    noOptionsMessage: () => 'No options found',
  },
};

export const Loading: Story = {
  args: {
    options: sampleOptions,
    isLoading: true,
    placeholder: 'Loading...',
  },
};

// Note: Multi-select would require a separate component type due to TypeScript constraints
// export const MultiSelect: Story = {
//   args: {
//     options: sampleOptions,
//     isMulti: true,
//     placeholder: 'Select multiple options...',
//   },
// };

export const CustomWidth: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Custom width...',
    className: 'w-80',
  },
};