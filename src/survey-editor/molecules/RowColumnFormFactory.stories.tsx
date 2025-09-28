import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@ui/atoms/Button';
import { RowColumnFormFactory } from './RowColumnFormFactory';
import type { ElementRow, ElementColumn, QuestionRowOptionsChoice, QuestionColumnOptionsChoice } from '../../survey-types';

const meta: Meta<typeof RowColumnFormFactory> = {
    title: 'Survey Editor/Molecules/RowColumnFormFactory',
    component: RowColumnFormFactory,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RowColumnFormFactory>;

// Mock data
const mockChoiceRow: ElementRow<QuestionRowOptionsChoice> = {
    id: 'row_1',
    code: 'very_satisfied',
    label: 'Very Satisfied',
    parentIndex: null,
    index: 0,
    depth: 0,
    isLast: false,
    parentIndexes: null,
    options: {
        exclusive: false,
        noRandomize: false,
    }
};

const mockChoiceColumn: ElementColumn<QuestionColumnOptionsChoice> = {
    id: 'col_1',
    code: 'price',
    label: 'Price',
    parentIndex: null,
    index: 0,
    depth: 0,
    isLast: false,
    parentIndexes: null,
    options: {
        exclusive: false,
        noRandomize: true,
    }
};

const mockStringRow: ElementRow<any> = {
    id: 'row_2',
    code: 'feedback_item',
    label: 'Overall Experience',
    parentIndex: null,
    index: 1,
    depth: 0,
    isLast: false,
    parentIndexes: null,
    options: {}
};

const mockNumberColumn: ElementColumn<any> = {
    id: 'col_2',
    code: 'q1_2024',
    label: 'Q1 2024',
    parentIndex: null,
    index: 1,
    depth: 0,
    isLast: false,
    parentIndexes: null,
    options: {}
};

// Wrapper component for interactive demos
function FormFactoryWrapper({
    item,
    questionType,
    itemType
}: {
    item: ElementRow<any> | ElementColumn<any>,
    questionType: 'choice' | 'string' | 'number',
    itemType: 'row' | 'column'
}) {
    const [currentItem, setCurrentItem] = useState(item);
    const [lastUpdate, setLastUpdate] = useState<string>('');

    const handleUpdate = (updatedItem: ElementRow<any> | ElementColumn<any>) => {
        setCurrentItem(updatedItem);
        setLastUpdate(new Date().toLocaleTimeString());
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Current Item State</h3>
                {lastUpdate && (
                    <p className="text-sm text-muted-foreground mb-2">
                        Last updated: {lastUpdate}
                    </p>
                )}
                <pre className="text-xs overflow-auto bg-background p-2 rounded border">
                    {JSON.stringify(currentItem, null, 2)}
                </pre>
            </div>

            <div className="flex justify-center">
                <RowColumnFormFactory
                    item={currentItem}
                    onUpdate={handleUpdate}
                    questionType={questionType}
                    itemType={itemType}
                    trigger={
                        <Button>
                            Edit {itemType === 'row' ? 'Response Option' : 'Question Item'}
                        </Button>
                    }
                />
            </div>
        </div>
    );
}

export const ChoiceRowEditor: Story = {
    render: () => (
        <FormFactoryWrapper
            item={mockChoiceRow}
            questionType="choice"
            itemType="row"
        />
    ),
};

export const ChoiceColumnEditor: Story = {
    render: () => (
        <FormFactoryWrapper
            item={mockChoiceColumn}
            questionType="choice"
            itemType="column"
        />
    ),
};

export const StringRowEditor: Story = {
    render: () => (
        <FormFactoryWrapper
            item={mockStringRow}
            questionType="string"
            itemType="row"
        />
    ),
};

export const NumberColumnEditor: Story = {
    render: () => (
        <FormFactoryWrapper
            item={mockNumberColumn}
            questionType="number"
            itemType="column"
        />
    ),
};

export const EmptyChoiceRow: Story = {
    render: () => {
        const emptyRow: ElementRow<QuestionRowOptionsChoice> = {
            id: 'new_row',
            code: '',
            label: '',
            parentIndex: null,
            index: 0,
            depth: 0,
            isLast: true,
            parentIndexes: null,
            options: {}
        };

        return (
            <FormFactoryWrapper
                item={emptyRow}
                questionType="choice"
                itemType="row"
            />
        );
    },
};

export const AdvancedChoiceOptions: Story = {
    render: () => {
        const advancedRow: ElementRow<QuestionRowOptionsChoice> = {
            id: 'advanced_row',
            code: 'none_of_the_above',
            label: 'None of the above',
            parentIndex: null,
            index: 4,
            depth: 0,
            isLast: true,
            parentIndexes: null,
            options: {
                exclusive: true,
                noRandomize: true,
            }
        };

        return (
            <FormFactoryWrapper
                item={advancedRow}
                questionType="choice"
                itemType="row"
            />
        );
    },
};

export const MultipleTypes: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Choice Question</h3>
                    <div className="space-y-4">
                        <RowColumnFormFactory
                            item={mockChoiceRow}
                            onUpdate={(item) => console.log('Choice row updated:', item)}
                            questionType="choice"
                            itemType="row"
                            trigger={<Button variant="outline" size="sm">Edit Response Option</Button>}
                        />
                        <RowColumnFormFactory
                            item={mockChoiceColumn}
                            onUpdate={(item) => console.log('Choice column updated:', item)}
                            questionType="choice"
                            itemType="column"
                            trigger={<Button variant="outline" size="sm">Edit Question Item</Button>}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Text & Number Questions</h3>
                    <div className="space-y-4">
                        <RowColumnFormFactory
                            item={mockStringRow}
                            onUpdate={(item) => console.log('String row updated:', item)}
                            questionType="string"
                            itemType="row"
                            trigger={<Button variant="outline" size="sm">Edit Text Row</Button>}
                        />
                        <RowColumnFormFactory
                            item={mockNumberColumn}
                            onUpdate={(item) => console.log('Number column updated:', item)}
                            questionType="number"
                            itemType="column"
                            trigger={<Button variant="outline" size="sm">Edit Number Column</Button>}
                        />
                    </div>
                </div>
            </div>
        );
    },
};