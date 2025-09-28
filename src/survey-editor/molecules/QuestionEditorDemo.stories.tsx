import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuestionItemList } from './QuestionItemList';
import { QuestionFormFactory } from './question-forms';
import type { QuestionnaireItem } from '../types';

// Demo component that shows the factory pattern integration
function QuestionEditorDemo() {
    const [items, setItems] = useState<QuestionnaireItem[]>([
        {
            id: 'q1',
            code: 'Q1',
            label: 'What is your name?',
            type: 'string',
            help: 'Please enter your full name',
            options: { required: true, placeholder: 'Enter your name' },
            index: 0,
            depth: 0,
            isLast: false,
        },
        {
            id: 'q2',
            code: 'Q2',
            label: 'What is your age?',
            type: 'number',
            help: 'Please enter your age in years',
            options: { required: true, min: 18, max: 120, integer: true },
            index: 1,
            depth: 0,
            isLast: false,
        },
        {
            id: 'b1',
            code: 'BLOCK1',
            type: 'block',
            options: { showLabel: true },
            children: [],
            index: 2,
            depth: 0,
            isLast: true,
        } as any,
    ]);

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(0);
    const selectedItem = selectedIndex !== undefined ? items[selectedIndex] : undefined;

    const handleUpdateItem = (updatedItem: QuestionnaireItem) => {
        if (selectedIndex !== undefined) {
            const newItems = [...items];
            newItems[selectedIndex] = updatedItem;
            setItems(newItems);
        }
    };

    const handleSelectItem = (_item: QuestionnaireItem, index: number) => {
        setSelectedIndex(index);
    };

    const handleAddItem = (type: QuestionnaireItem['type']) => {
        const newItem: QuestionnaireItem = {
            id: `item_${Date.now()}`,
            code: `ITEM_${items.length + 1}`,
            type,
            options: {},
            index: items.length,
            depth: 0,
            isLast: true,
        } as any;

        if (type !== 'breakPage') {
            (newItem as any).label = `New ${type} item`;
        }

        setItems([...items, newItem]);
        setSelectedIndex(items.length);
    };

    const availableQuestions = items.map(item => ({
        value: item.code,
        label: `${item.code} - ${(item as any).label || item.type}`,
    }));

    return (
        <div className="flex gap-6 h-[600px]">
            <div className="w-1/2">
                <QuestionItemList
                    items={items}
                    onUpdate={setItems}
                    onSelectItem={handleSelectItem}
                    selectedIndex={selectedIndex}
                    onAddItem={handleAddItem}
                />
            </div>

            <div className="w-1/2">
                {selectedItem ? (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Edit {selectedItem.type} Item
                        </h3>
                        <QuestionFormFactory
                            question={selectedItem}
                            onUpdate={handleUpdateItem}
                            availableQuestions={availableQuestions}
                        />
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground mt-8">
                        Select an item to edit its settings
                    </div>
                )}
            </div>
        </div>
    );
}

const meta: Meta<typeof QuestionEditorDemo> = {
    title: 'Survey Editor/Factory Integration Demo',
    component: QuestionEditorDemo,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof QuestionEditorDemo>;

export const InteractiveDemo: Story = {
    render: () => <QuestionEditorDemo />,
};