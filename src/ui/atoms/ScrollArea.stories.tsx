import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/Atoms/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the scroll area root',
    },
    children: {
      control: false,
      description: 'Content to be scrolled',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-96 border border-border rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const longContent = Array.from({ length: 50 }, (_, i) => (
  <div key={i} className="p-2 border-b border-border last:border-b-0">
    <h3 className="font-medium text-foreground">Item {i + 1}</h3>
    <p className="text-sm text-muted-foreground">
      This is some sample content for item {i + 1}. It demonstrates how the scroll area works with various amounts of content.
    </p>
  </div>
));

const wideContent = (
  <div className="flex gap-4 p-4">
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="flex-shrink-0 w-32 h-20 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-sm font-medium">Card {i + 1}</span>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    className: "h-80",
    children: (
      <div className="p-4">
        {longContent}
      </div>
    ),
  },
};

export const ChatMessages: Story = {
  args: {
    className: 'bg-background border border-border rounded-lg h-80',
    children: (
      <div className="p-4 space-y-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className={`flex ${i % 3 === 0 ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${i % 3 === 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
                }`}
            >
              <p className="text-sm">
                This is message {i + 1}. {i % 3 === 0 ? 'Sent by you.' : 'Received from someone else.'}
              </p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(Date.now() - (20 - i) * 60000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
};