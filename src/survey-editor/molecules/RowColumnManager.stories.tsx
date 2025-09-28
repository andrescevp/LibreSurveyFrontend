import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RowColumnManager } from './RowColumnManager';
import type { ElementRow, ElementColumn, BaseRowColumnOptions } from '../../survey-types';

const meta: Meta<typeof RowColumnManager> = {
    title: 'Survey Editor/Molecules/RowColumnManager',
    component: RowColumnManager,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RowColumnManager>;

// Mock data
const mockRows: ElementRow<BaseRowColumnOptions>[] = [
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

const mockColumns: ElementColumn<BaseRowColumnOptions>[] = [
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

// Interactive wrapper component
function RowManagerWrapper({ initialItems, type, title, questionType = 'choice' }: {
    initialItems: ElementRow<BaseRowColumnOptions>[] | ElementColumn<BaseRowColumnOptions>[],
    type: 'rows' | 'columns',
    title: string,
    questionType?: 'choice' | 'string' | 'number'
}) {
    const [items, setItems] = useState(initialItems);

    return (
        <div className="max-w-2xl">
            <RowColumnManager
                title={title}
                items={items}
                onUpdate={setItems}
                type={type}
                questionType={questionType}
                placeholder={`Enter ${type.slice(0, -1)} label`}
            />
        </div>
    );
}

export const RowManager: Story = {
    render: () => (
        <RowManagerWrapper
            initialItems={mockRows}
            type="rows"
            title="Response Options"
        />
    ),
};

export const ColumnManager: Story = {
    render: () => (
        <RowManagerWrapper
            initialItems={mockColumns}
            type="columns"
            title="Evaluation Criteria"
        />
    ),
};

export const EmptyRowManager: Story = {
    render: () => (
        <RowManagerWrapper
            initialItems={[]}
            type="rows"
            title="Response Options"
        />
    ),
};

export const EmptyColumnManager: Story = {
    render: () => (
        <RowManagerWrapper
            initialItems={[]}
            type="columns"
            title="Evaluation Criteria"
        />
    ),
};

export const WithConstraints: Story = {
    render: () => {
        const [items, setItems] = useState(mockRows.slice(0, 2));

        return (
            <div className="max-w-2xl">
                <RowColumnManager
                    title="Response Options (2-5 items)"
                    items={items}
                    onUpdate={setItems}
                    type="rows"
                    questionType="choice"
                    minItems={2}
                    maxItems={5}
                    placeholder="Enter response option"
                />
            </div>
        );
    },
};

export const SingleItem: Story = {
    render: () => {
        const [items, setItems] = useState([mockRows[0]]);

        return (
            <div className="max-w-2xl">
                <RowColumnManager
                    title="Single Response Option"
                    items={items}
                    onUpdate={setItems}
                    type="rows"
                    questionType="choice"
                    minItems={1}
                    maxItems={1}
                    placeholder="Enter response option"
                />
            </div>
        );
    },
};