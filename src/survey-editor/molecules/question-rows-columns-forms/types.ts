import type { ElementRow, ElementColumn, BaseRowColumnOptions, QuestionRowOptionsChoice, QuestionColumnOptionsChoice } from '../../../survey-types';
import type { QuestionType } from '../../types';

// Base form data interface
export interface BaseRowColumnFormData {
    code: string;
    label: string;
    options: any;
}

// Base Row/Column Form Component Props
export interface BaseRowColumnFormProps {
    item: ElementRow<any> | ElementColumn<any>;
    onUpdate: (item: ElementRow<any> | ElementColumn<any>) => void;
    questionType: QuestionType;
    itemType: 'row' | 'column';
}

// Choice-specific form data interfaces
export interface ChoiceRowFormData extends BaseRowColumnFormData {
    options: QuestionRowOptionsChoice;
}

export interface ChoiceColumnFormData extends BaseRowColumnFormData {
    options: QuestionColumnOptionsChoice;
}

// String-specific form data interfaces
export interface StringRowFormData extends BaseRowColumnFormData {
    options: BaseRowColumnOptions;
}

export interface StringColumnFormData extends BaseRowColumnFormData {
    options: BaseRowColumnOptions;
}

// Number-specific form data interfaces
export interface NumberRowFormData extends BaseRowColumnFormData {
    options: BaseRowColumnOptions;
}

export interface NumberColumnFormData extends BaseRowColumnFormData {
    options: BaseRowColumnOptions;
}

// Form component type mapping
export type FormComponentType = 
    | 'choice_row' 
    | 'choice_column' 
    | 'string_row' 
    | 'string_column' 
    | 'number_row' 
    | 'number_column';