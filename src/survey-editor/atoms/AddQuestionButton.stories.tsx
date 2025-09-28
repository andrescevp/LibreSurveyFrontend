import type { Meta, StoryObj } from '@storybook/react';
import { AddQuestionButton } from './AddQuestionButton';
import type { QuestionnaireItem } from '../types';

const meta: Meta<typeof AddQuestionButton> = {
    title: 'Survey Editor/Atoms/AddQuestionButton',
    component: AddQuestionButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A button component for adding new questionnaire items. Features a quick-add button for text questions and a dropdown menu with organized submenus for all question types.'
            }
        }
    },
    argTypes: {
        onAdd: { action: 'question-added' },
        variant: {
            control: 'select',
            options: ['default', 'outline', 'ghost']
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg']
        }
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        onAdd: (type: QuestionnaireItem['type']) => {
            console.log('Adding question type:', type);
        }
    }
};

// Different variants
export const DefaultVariant: Story = {
    args: {
        ...Default.args,
        variant: 'default'
    }
};

export const OutlineVariant: Story = {
    args: {
        ...Default.args,
        variant: 'outline'
    }
};

export const GhostVariant: Story = {
    args: {
        ...Default.args,
        variant: 'ghost'
    }
};

// Different sizes
export const SmallSize: Story = {
    args: {
        ...Default.args,
        size: 'sm'
    }
};

export const DefaultSize: Story = {
    args: {
        ...Default.args,
        size: 'default'
    }
};

export const LargeSize: Story = {
    args: {
        ...Default.args,
        size: 'lg'
    }
};

// Custom label
export const CustomLabel: Story = {
    args: {
        ...Default.args,
        children: 'Add New Item'
    }
};

// With custom styling
export const CustomStyling: Story = {
    args: {
        ...Default.args,
        className: 'bg-primary text-primary-foreground hover:bg-primary/90',
        children: 'Create Question'
    }
};

// Interactive example showing the dropdown functionality
export const InteractiveExample: Story = {
    args: {
        onAdd: (type: QuestionnaireItem['type']) => {
            alert(`Adding question type: ${type}`);
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Click the main button to quickly add a text question, or click the dropdown arrow to see all available question types organized in submenus.'
            }
        }
    }
};

// Multiple buttons with different configurations
export const MultipleButtons: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <AddQuestionButton
                    onAdd={(type) => console.log('Button 1:', type)}
                    variant="default"
                    size="sm"
                />
                <AddQuestionButton
                    onAdd={(type) => console.log('Button 2:', type)}
                    variant="outline"
                    size="default"
                />
                <AddQuestionButton
                    onAdd={(type) => console.log('Button 3:', type)}
                    variant="ghost"
                    size="lg"
                />
            </div>
            <div className="flex gap-2">
                <AddQuestionButton
                    onAdd={(type) => console.log('Custom 1:', type)}
                    variant="outline"
                    children="Add Element"
                />
                <AddQuestionButton
                    onAdd={(type) => console.log('Custom 2:', type)}
                    variant="default"
                    children="New Question"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Multiple AddQuestionButton components with different variants, sizes, and labels.'
            }
        }
    }
};