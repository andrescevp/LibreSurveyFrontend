import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import type { QuestionType } from '../types';

const meta: Meta<typeof QuestionTypeSelector> = {
    title: 'Survey Editor/Atoms/QuestionTypeSelector',
    component: QuestionTypeSelector,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        value: {
            control: 'select',
            options: [
                'string', 'number', 'choice',
                'block', 'loop',
                'breakPage', 'termination', 'quota',
                'text', 'marker'
            ],
        },
        onChange: { action: 'changed' },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof QuestionTypeSelector>;

// Interactive demo component
function InteractiveDemo() {
    const [selectedType, setSelectedType] = useState<QuestionType>('string');

    return (
        <div className="w-80 space-y-4">
            <div>
                <label className="block text-sm font-medium mb-2">
                    Current Selection: <code className="bg-muted px-2 py-1 rounded">{selectedType}</code>
                </label>
                <QuestionTypeSelector
                    value={selectedType}
                    onChange={setSelectedType}
                />
            </div>

            <div className="text-sm text-muted-foreground">
                <p>This dropdown organizes all question types into logical categories:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Questions:</strong> Interactive elements that collect responses</li>
                    <li><strong>Containers:</strong> Elements that can contain other questions</li>
                    <li><strong>Flow Control:</strong> Elements that control survey flow</li>
                    <li><strong>Content:</strong> Static content and markers</li>
                </ul>
            </div>
        </div>
    );
}

export const Interactive: Story = {
    render: () => <InteractiveDemo />,
};

export const Default: Story = {
    args: {
        value: 'string',
        onChange: (type) => console.log('Selected:', type),
    },
};

export const NumberQuestion: Story = {
    args: {
        value: 'number',
        onChange: (type) => console.log('Selected:', type),
    },
};

export const BlockContainer: Story = {
    args: {
        value: 'block',
        onChange: (type) => console.log('Selected:', type),
    },
};

export const Disabled: Story = {
    args: {
        value: 'choice',
        onChange: (type) => console.log('Selected:', type),
        disabled: true,
    },
};

export const AllTypesShowcase: Story = {
    render: () => {
        const allTypes: QuestionType[] = [
            'string', 'number', 'choice',           // Questions
            'block', 'loop',                       // Containers  
            'breakPage', 'termination', 'quota',   // Flow Control
            'text', 'marker'                       // Content
        ];

        return (
            <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
                {allTypes.map((type) => (
                    <div key={type} className="space-y-2">
                        <label className="block text-sm font-medium capitalize">
                            {type} Type
                        </label>
                        <QuestionTypeSelector
                            value={type}
                            onChange={(newType) => console.log(`Changed from ${type} to ${newType}`)}
                        />
                    </div>
                ))}
            </div>
        );
    },
};