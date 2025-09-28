import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuestionFormFactory } from '../molecules/question-forms';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import type { QuestionnaireItem, QuestionType } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';

// Demo component that shows dynamic form switching
function DynamicFormDemo() {
    const [questionType, setQuestionType] = useState<QuestionType>('string');

    // Create a base question that can be transformed
    const [question, setQuestion] = useState<QuestionnaireItem>(() => {
        const baseQuestion: QuestionnaireItem = {
            id: 'demo_question',
            code: 'Q1',
            type: 'string',
            options: {},
            index: 0,
            depth: 0,
            isLast: false,
        } as any;

        // Add label for non-breakPage types
        (baseQuestion as any).label = 'Demo Question';

        return baseQuestion;
    });

    // Update question when type changes
    const handleTypeChange = (newType: QuestionType) => {
        setQuestionType(newType);

        // Create a new question with the selected type
        const updatedQuestion: QuestionnaireItem = {
            ...question,
            type: newType,
            options: getDefaultOptionsForType(newType),
        };

        // Add label for non-breakPage types
        if (newType !== 'breakPage') {
            (updatedQuestion as any).label = getDefaultLabelForType(newType);
        } else {
            delete (updatedQuestion as any).label;
        }

        // Add help for question types that support it
        if (['string', 'number', 'choice'].includes(newType)) {
            (updatedQuestion as any).help = getDefaultHelpForType(newType);
        } else {
            delete (updatedQuestion as any).help;
        }

        setQuestion(updatedQuestion);
    };

    const handleQuestionUpdate = (updatedQuestion: QuestionnaireItem) => {
        setQuestion(updatedQuestion);
    };

    const getDefaultOptionsForType = (type: QuestionType) => {
        const defaultOptions: Record<QuestionType, any> = {
            string: { required: false, multiline: false, placeholder: 'Enter text here' },
            number: { required: false, integer: true, min: 0, max: 100 },
            choice: { required: false, multipleSelection: false },
            block: { showLabel: true },
            loop: {},
            text: {},
            breakPage: {},
            marker: {},
            quota: {},
            termination: {},
        };
        return defaultOptions[type] || {};
    };

    const getDefaultLabelForType = (type: QuestionType) => {
        const defaultLabels: Record<QuestionType, string> = {
            string: 'What is your opinion?',
            number: 'How many items?',
            choice: 'Which option do you prefer?',
            block: 'Question Group',
            loop: 'Repeating Section',
            text: 'Welcome to our survey',
            breakPage: '',
            marker: 'Survey Marker',
            quota: 'Response Quota',
            termination: 'Survey End',
        };
        return defaultLabels[type] || 'Untitled';
    };

    const getDefaultHelpForType = (type: QuestionType) => {
        const defaultHelp: Record<string, string> = {
            string: 'Please provide your thoughts in the text box below.',
            number: 'Enter a numeric value.',
            choice: 'Select one or more options from the list.',
        };
        return defaultHelp[type] || '';
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Dynamic Question Type Demo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Question Type:
                            </label>
                            <div className="w-80">
                                <QuestionTypeSelector
                                    value={questionType}
                                    onChange={handleTypeChange}
                                />
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <p>
                                <strong>Current Type:</strong> <code className="bg-muted px-2 py-1 rounded">{questionType}</code>
                            </p>
                            <p className="mt-1">
                                When you change the question type above, the form below will automatically
                                update to show the appropriate configuration options for that type.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Form Configuration</h3>
                    <QuestionFormFactory
                        question={question}
                        onUpdate={handleQuestionUpdate}
                        availableQuestions={[
                            { value: 'Q1', label: 'Demo Question' },
                            { value: 'Q2', label: 'Another Question' }
                        ]}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Question Data Preview</h3>
                    <Card>
                        <CardContent className="pt-6">
                            <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-96">
                                {JSON.stringify(question, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const meta: Meta = {
    title: 'Survey Editor/Dynamic Form Demo',
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj;

export const DynamicQuestionForm: Story = {
    render: () => <DynamicFormDemo />,
};