import { BaseRowColumnForm } from './BaseRowColumnForm';
import { ChoiceRowForm } from './ChoiceRowForm';
import { ChoiceColumnForm } from './ChoiceColumnForm';
import { StringRowForm } from './StringRowForm';
import { StringColumnForm } from './StringColumnForm';
import { NumberRowForm } from './NumberRowForm';
import { NumberColumnForm } from './NumberColumnForm';
import type { QuestionType } from '../../types';
import type { FormComponentType } from './types';

// Factory function to get the appropriate form component based on question type
export function createRowColumnForm(questionType: QuestionType, itemType: 'row' | 'column') {
    const formKey = `${questionType}_${itemType}` as FormComponentType;

    const formComponents = {
        'choice_row': ChoiceRowForm,
        'choice_column': ChoiceColumnForm,
        'string_row': StringRowForm,
        'string_column': StringColumnForm,
        'number_row': NumberRowForm,
        'number_column': NumberColumnForm,
    } as const;

    return formComponents[formKey] || BaseRowColumnForm;
}

// Export all components
export {
    BaseRowColumnForm,
    ChoiceRowForm,
    ChoiceColumnForm,
    StringRowForm,
    StringColumnForm,
    NumberRowForm,
    NumberColumnForm,
};

// Export types
export type * from './types';