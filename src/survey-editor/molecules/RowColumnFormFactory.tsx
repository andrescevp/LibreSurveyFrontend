import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@ui/molecules/Sheet';
import { createRowColumnForm } from './question-rows-columns-forms';
import type { ElementRow, ElementColumn } from '../../survey-types';
import type { QuestionType } from '../types';
import type { BaseRowColumnFormProps } from './question-rows-columns-forms';

// Main Factory Component Props
interface RowColumnFormFactoryProps {
    item: ElementRow<any> | ElementColumn<any>;
    onUpdate: (item: ElementRow<any> | ElementColumn<any>) => void;
    questionType: QuestionType;
    itemType: 'row' | 'column';
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}



export function RowColumnFormFactory({
    item,
    onUpdate,
    questionType,
    itemType,
    trigger,
    open,
    onOpenChange,
}: RowColumnFormFactoryProps) {
    const [isOpen, setIsOpen] = useState(open || false);

    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open);
        }
    }, [open]);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
    };

    const handleUpdate = (updatedItem: ElementRow<any> | ElementColumn<any>) => {
        onUpdate(updatedItem);
        handleOpenChange(false);
    };

    // Get the appropriate form component
    const FormComponent = createRowColumnForm(questionType, itemType);

    const title = itemType === 'row'
        ? `Edit ${questionType === 'choice' ? 'Response Option' : 'Row Item'}`
        : `Edit ${questionType === 'choice' ? 'Question Item' : 'Column Item'}`;

    const formProps: BaseRowColumnFormProps = {
        item,
        onUpdate: handleUpdate,
        questionType,
        itemType,
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
            <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                    <FormComponent {...formProps} />
                </div>
            </SheetContent>
        </Sheet>
    );
}

// Re-export from question-rows-columns-forms for convenience
export {
    createRowColumnForm,
    BaseRowColumnForm,
    ChoiceRowForm,
    ChoiceColumnForm,
    StringRowForm,
    StringColumnForm,
    NumberRowForm,
    NumberColumnForm,
} from './question-rows-columns-forms';

// Export types
export type {
    RowColumnFormFactoryProps,
};

export type {
    BaseRowColumnFormProps,
    BaseRowColumnFormData,
    ChoiceRowFormData,
    ChoiceColumnFormData,
    StringRowFormData,
    StringColumnFormData,
    NumberRowFormData,
    NumberColumnFormData,
} from './question-rows-columns-forms';