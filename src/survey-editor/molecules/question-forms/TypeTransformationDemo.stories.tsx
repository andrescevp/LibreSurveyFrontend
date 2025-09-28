import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuestionFormFactory } from './QuestionFormFactory';
import { transformQuestionForType } from './BaseQuestionForm';
import type { QuestionnaireItem } from '../../types';

const meta: Meta<typeof QuestionFormFactory> = {
    title: 'Survey Editor/Question Forms/Type Transformation Demo',
    component: QuestionFormFactory,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a sample question to transform
const sampleStringQuestion: QuestionnaireItem = {
    type: 'string',
    id: 'Q1-id',
    code: 'Q1',
    index: 0,
    depth: 0,
    isLast: false,
    label: 'Original string question',
    help: 'Original help text',
    options: {
        required: true,
        multiline: false,
        placeholder: 'Enter text here',
    },
} as QuestionnaireItem;

export const TypeTransformationDemo: Story = {
    args: {
        question: sampleStringQuestion,
        onUpdate: (updatedQuestion) => {
            console.log('Question updated:', updatedQuestion);
        },
        availableQuestions: [
            { value: 'Q1', label: 'Q1 - Sample Question' },
            { value: 'Q2', label: 'Q2 - Another Question' },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: `
                This demo shows how question type transformation works when changing the type in the QuestionTypeSelector.
                
                **Features:**
                - ✅ Proper type transformation when changing question types
                - ✅ Default options applied based on new type
                - ✅ Labels and help text handled correctly for each type
                - ✅ Container types (block, loop) handle children properly
                - ✅ Choice questions handle rows/columns
                - ✅ State management through useSurveyEditor hook
                
                **Test the transformation:**
                1. Open this story in Storybook
                2. Change the question type using the dropdown
                3. Check browser console to see the transformed question structure
                4. Notice how different properties are added/removed based on the new type
                
                **Transformation Examples:**
                - String → Choice: Adds rows/columns arrays, removes string-specific options
                - Choice → Block: Removes rows/columns, adds children array and showLabel option
                - Any type → BreakPage: Removes label and help text (not needed for page breaks)
                - Block/Loop → Other: Removes children array
                `,
            },
        },
    },
};

// Example of programmatic transformation for testing
export const ProgrammaticTransformation: Story = {
    render: () => {
        const [currentQuestion, setCurrentQuestion] = React.useState<QuestionnaireItem>(sampleStringQuestion);

        const handleTransform = (newType: QuestionnaireItem['type']) => {
            const transformed = transformQuestionForType(currentQuestion, newType);
            setCurrentQuestion(transformed);
            console.log('Transformed from', currentQuestion.type, 'to', newType, ':', transformed);
        };

        return (
            <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Current Question:</h3>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                        {JSON.stringify(currentQuestion, null, 2)}
                    </pre>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleTransform('string')}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        → String
                    </button>
                    <button
                        onClick={() => handleTransform('number')}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        → Number
                    </button>
                    <button
                        onClick={() => handleTransform('choice')}
                        className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                        → Choice
                    </button>
                    <button
                        onClick={() => handleTransform('block')}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                        → Block
                    </button>
                    <button
                        onClick={() => handleTransform('breakPage')}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        → Page Break
                    </button>
                </div>

                <QuestionFormFactory
                    question={currentQuestion}
                    onUpdate={setCurrentQuestion}
                    availableQuestions={[
                        { value: 'Q1', label: 'Q1 - Sample Question' },
                        { value: 'Q2', label: 'Q2 - Another Question' },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo showing programmatic question type transformation with visual feedback.',
            },
        },
    },
};