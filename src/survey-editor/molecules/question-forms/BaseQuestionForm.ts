import type { QuestionnaireItem, QuestionType } from '../../types';
import type { ElementCondition } from '../../../survey-types';

export interface BaseQuestionFormProps {
    question: QuestionnaireItem;
    onUpdate: (question: QuestionnaireItem) => void;
    availableQuestions?: Array<{ value: string; label: string }>;
    className?: string;
}

export interface BaseFormData {
    code: string;
    label?: string;
    type: QuestionnaireItem['type'];
    help?: string;
    options: any;
}

export const createBaseFormData = (question: QuestionnaireItem): BaseFormData => ({
    code: question.code,
    label: (question as any).label || '',
    type: question.type,
    help: (question as any).help || '',
    options: (question as any).options || {},
});

export const updateQuestionWithFormData = (
    question: QuestionnaireItem,
    data: BaseFormData
): QuestionnaireItem => {
    const updatedQuestion = {
        ...question,
        code: data.code,
        type: data.type,
        options: data.options,
    } as QuestionnaireItem;

    // Add label if the question type supports it
    if (data.type !== 'breakPage') {
        (updatedQuestion as any).label = data.label;
    }

    // Add help if the question type supports it
    if (['string', 'number', 'choice'].includes(data.type)) {
        (updatedQuestion as any).help = data.help;
    }

    return updatedQuestion;
};

export const updateQuestionCondition = (
    question: QuestionnaireItem,
    condition: ElementCondition | null
): QuestionnaireItem => {
    const updatedOptions = { ...(question as any).options };
    if (condition) {
        updatedOptions.condition = condition;
    } else {
        delete updatedOptions.condition;
    }

    return {
        ...question,
        options: updatedOptions,
    } as QuestionnaireItem;
};

// Default options for each question type
const getDefaultOptionsForType = (type: QuestionType): any => {
    const defaultOptions: Record<QuestionType, any> = {
        string: {
            required: false,
            multiline: false,
            placeholder: '',
            minLength: undefined,
            maxLength: undefined,
            naOption: false,
            naLabel: ''
        },
        number: {
            required: false,
            integer: true,
            min: undefined,
            max: undefined,
            placeholder: '',
            naOption: false,
            naLabel: ''
        },
        choice: {
            required: false,
            multipleSelection: false,
            minSelections: undefined,
            maxSelections: undefined
        },
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

// Default labels for each question type
const getDefaultLabelForType = (type: QuestionType): string => {
    const defaultLabels: Record<QuestionType, string> = {
        string: 'Enter your response',
        number: 'Enter a number',
        choice: 'Select an option',
        block: 'Question Group',
        loop: 'Repeating Section',
        text: 'Information text',
        breakPage: '',
        marker: 'Survey Marker',
        quota: 'Response Quota',
        termination: 'Survey End',
    };
    return defaultLabels[type] || 'Untitled';
};

// Default help text for question types that support it
const getDefaultHelpForType = (type: QuestionType): string => {
    const defaultHelp: Record<string, string> = {
        string: 'Please provide your answer in the text field.',
        number: 'Enter a numeric value.',
        choice: 'Select one or more options from the list.',
    };
    return defaultHelp[type] || '';
};

// Transform question data when type changes
export const transformQuestionForType = (
    currentQuestion: QuestionnaireItem,
    newType: QuestionType
): QuestionnaireItem => {
    // Base transformation - preserve core properties
    const transformedQuestion: QuestionnaireItem = {
        ...currentQuestion,
        type: newType,
        options: getDefaultOptionsForType(newType),
    };

    // Handle label - all types except breakPage need a label
    if (newType !== 'breakPage') {
        (transformedQuestion as any).label = getDefaultLabelForType(newType);
    } else {
        // Remove label for breakPage
        delete (transformedQuestion as any).label;
    }

    // Add help text for question types that support it
    if (['string', 'number', 'choice'].includes(newType)) {
        (transformedQuestion as any).help = getDefaultHelpForType(newType);
    } else {
        // Remove help for types that don't support it
        delete (transformedQuestion as any).help;
    }

    // Handle children property for container types
    if (['block', 'loop'].includes(newType)) {
        (transformedQuestion as any).children = (transformedQuestion as any).children || [];
    } else {
        // Remove children for non-container types
        delete (transformedQuestion as any).children;
    }

    // Handle rows/columns for choice questions
    if (!['string', 'number', 'choice'].includes(newType)) {
        delete (transformedQuestion as any).rows;
        delete (transformedQuestion as any).columns;
    }

    // // Handle rows/columns for choice questions
    // if (newType === 'choice') {
    //     (transformedQuestion as any).rows = (transformedQuestion as any).rows || [];
    //     (transformedQuestion as any).columns = (transformedQuestion as any).columns || [];
    // } else {
    //     // Remove rows/columns for non-choice types
    //     delete (transformedQuestion as any).rows;
    //     delete (transformedQuestion as any).columns;
    // }

    return transformedQuestion;
};

// Handle type changes with proper transformation
export const handleQuestionTypeChange = (
    currentQuestion: QuestionnaireItem,
    newType: QuestionType,
    onUpdate: (question: QuestionnaireItem) => void
) => {
    if (newType !== currentQuestion.type) {
        const transformedQuestion = transformQuestionForType(currentQuestion, newType);
        onUpdate(transformedQuestion);
    }
};