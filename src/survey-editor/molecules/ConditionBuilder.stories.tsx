import type { Meta, StoryObj } from '@storybook/react';
import { ConditionBuilder } from './ConditionBuilder';

const meta: Meta<typeof ConditionBuilder> = {
    title: 'Survey Editor/Molecules/ConditionBuilder',
    component: ConditionBuilder,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
};

export default meta;
type Story = StoryObj<typeof ConditionBuilder>;

const mockQuestions = [
    { value: 'q1', label: 'What is your age?' },
    { value: 'q2', label: 'What is your gender?' },
    { value: 'q3', label: 'What is your occupation?' },
    { value: 'q4', label: 'Do you have experience?' },
];

export const Default: Story = {
    args: {
        availableQuestions: mockQuestions,
    },
};

export const WithExistingCondition: Story = {
    args: {
        availableQuestions: mockQuestions,
        condition: {
            action: 'show',
            rules: [
                {
                    negate: false,
                    code: 'q1',
                    operator: '>',
                    value: '18',
                },
                {
                    negate: false,
                    code: 'q2',
                    operator: '=',
                    value: 'male',
                    gate: 'and',
                },
            ],
        } as any,
    },
};

export const RequireAction: Story = {
    args: {
        availableQuestions: mockQuestions,
        condition: {
            action: 'require',
            rules: [
                {
                    negate: true,
                    code: 'q4',
                    operator: '=',
                    value: 'yes',
                },
            ],
        } as any,
    },
};

export const ComplexCondition: Story = {
    args: {
        availableQuestions: mockQuestions,
        condition: {
            action: 'show',
            rules: [
                {
                    negate: false,
                    code: 'q1',
                    operator: '>=',
                    value: '21',
                },
                {
                    negate: false,
                    code: 'q2',
                    operator: '=',
                    value: 'female',
                    gate: 'or',
                },
                {
                    negate: true,
                    code: 'q3',
                    operator: 'contains',
                    value: 'student',
                    gate: 'and',
                },
            ],
        } as any,
    },
};

export const EmptyState: Story = {
    args: {
        availableQuestions: mockQuestions,
        condition: undefined,
    },
};