import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChoiceQuestionForm } from './ChoiceQuestionForm';
import type { QuestionChoice, ElementRow, ElementColumn, QuestionRowOptionsChoice, QuestionColumnOptionsChoice } from '../../../survey-types';

const meta: Meta<typeof ChoiceQuestionForm> = {
    title: 'Survey Editor/Question Forms/ChoiceQuestionForm Enhanced',
    component: ChoiceQuestionForm,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChoiceQuestionForm>;

// Mock data
const mockRows: ElementRow<QuestionRowOptionsChoice>[] = [
    {
        id: 'row_1',
        code: 'very_satisfied',
        label: 'Very Satisfied',
        parentIndex: null,
        index: 0,
        depth: 0,
        isLast: false,
        parentIndexes: null,
        options: {}
    },
    {
        id: 'row_2',
        code: 'satisfied',
        label: 'Satisfied',
        parentIndex: null,
        index: 1,
        depth: 0,
        isLast: false,
        parentIndexes: null,
        options: {}
    },
    {
        id: 'row_3',
        code: 'neutral',
        label: 'Neutral',
        parentIndex: null,
        index: 2,
        depth: 0,
        isLast: false,
        parentIndexes: null,
        options: {}
    },
    {
        id: 'row_4',
        code: 'dissatisfied',
        label: 'Dissatisfied',
        parentIndex: null,
        index: 3,
        depth: 0,
        isLast: false,
        parentIndexes: null,
        options: {}
    },
    {
        id: 'row_5',
        code: 'very_dissatisfied',
        label: 'Very Dissatisfied',
        parentIndex: null,
        index: 4,
        depth: 0,
        isLast: true,
        parentIndexes: null,
        options: {}
    }
];

const mockColumns: ElementColumn<QuestionColumnOptionsChoice>[] = [
    {
        id: 'col_1',
        code: 'price',
        label: 'Price',
        parentIndex: null,
        index: 0,
        depth: 0,
        isLast: false,
        parentIndexes: null,
        options: {}
    },
    {
        id: 'col_2',
        code: 'quality',
        label: 'Quality',
        parentIndex: null,
        index: 1,
        depth: 0,
        isLast: false,
        parentIndexes: null,
        options: {}
    },
    {
        id: 'col_3',
        code: 'service',
        label: 'Customer Service',
        parentIndex: null,
        index: 2,
        depth: 0,
        isLast: true,
        parentIndexes: null,
        options: {}
    }
];

const createMockQuestion = (withRowsColumns = false): QuestionChoice => ({
    id: 'q1',
    code: 'satisfaction_rating',
    label: 'How satisfied are you with the following aspects?',
    type: 'choice',
    help: 'Please rate each aspect based on your experience',
    parentIndex: null,
    index: 0,
    depth: 0,
    isLast: true,
    parentIndexes: null,
    options: {
        required: true,
        multipleSelection: false,
        minSelections: undefined,
        maxSelections: undefined,
    },
    rows: withRowsColumns ? mockRows : [],
    columns: withRowsColumns ? mockColumns : [],
});

// Interactive wrapper component
function ChoiceQuestionFormWrapper({ initialQuestion }: { initialQuestion: QuestionChoice }) {
    const [question, setQuestion] = useState(initialQuestion);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Current Question State</h3>
                <pre className="text-xs overflow-auto bg-background p-2 rounded border">
                    {JSON.stringify(question, null, 2)}
                </pre>
            </div>

            <ChoiceQuestionForm
                question={question}
                onUpdate={(updatedQuestion) => setQuestion(updatedQuestion as QuestionChoice)}
                availableQuestions={[
                    { value: 'Q1', label: 'Previous Question 1' },
                    { value: 'Q2', label: 'Previous Question 2' },
                    { value: 'Q3', label: 'Previous Question 3' },
                ]}
            />
        </div>
    );
}

export const SimpleChoiceQuestion: Story = {
    render: () => (
        <ChoiceQuestionFormWrapper
            initialQuestion={createMockQuestion(false)}
        />
    ),
};

export const MatrixChoiceQuestion: Story = {
    render: () => (
        <ChoiceQuestionFormWrapper
            initialQuestion={createMockQuestion(true)}
        />
    ),
};

export const MultipleSelectionQuestion: Story = {
    render: () => {
        const question = createMockQuestion(true);
        question.options.multipleSelection = true;
        question.options.minSelections = 2;
        question.options.maxSelections = 3;

        return (
            <ChoiceQuestionFormWrapper
                initialQuestion={question}
            />
        );
    },
};

export const EmptyChoiceQuestion: Story = {
    render: () => {
        const question: QuestionChoice = {
            id: 'new_q',
            code: 'new_question',
            label: '',
            type: 'choice',
            help: '',
            parentIndex: null,
            index: 0,
            depth: 0,
            isLast: true,
            parentIndexes: null,
            options: {
                required: false,
                multipleSelection: false,
            },
            rows: [],
            columns: [],
        };

        return (
            <ChoiceQuestionFormWrapper
                initialQuestion={question}
            />
        );
    },
};