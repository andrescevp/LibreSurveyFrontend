import { useState, useEffect } from 'react';
import type { QuestionnaireItem } from '../../types';
import type { BaseQuestionFormProps } from './BaseQuestionForm';
import { transformQuestionForType } from './BaseQuestionForm';
import { StringQuestionForm } from './StringQuestionForm';
import { NumberQuestionForm } from './NumberQuestionForm';
import { ChoiceQuestionForm } from './ChoiceQuestionForm';
import { BlockForm } from './BlockForm';
import { LoopForm } from './LoopForm';
import { TextForm } from './TextForm';
import { BreakPageForm } from './BreakPageForm';
import { MarkerForm } from './MarkerForm';
import { QuotaForm } from './QuotaForm';
import { TerminationForm } from './TerminationForm';

// Factory function that returns the appropriate form component
export function createQuestionForm(questionType: QuestionnaireItem['type']) {
    const formComponents = {
        string: StringQuestionForm,
        number: NumberQuestionForm,
        choice: ChoiceQuestionForm,
        block: BlockForm,
        loop: LoopForm,
        text: TextForm,
        breakPage: BreakPageForm,
        marker: MarkerForm,
        quota: QuotaForm,
        termination: TerminationForm,
    } as const;

    return formComponents[questionType as keyof typeof formComponents] || StringQuestionForm; // Default fallback
}

// Note: Transformation functions moved to BaseQuestionForm.ts to avoid duplication

// Higher-order component factory that creates a form component for a specific question
export function QuestionFormFactory({ question, onUpdate, ...restProps }: BaseQuestionFormProps) {
    const [currentQuestion, setCurrentQuestion] = useState<QuestionnaireItem>(question);

    // Update internal state when prop changes
    useEffect(() => {
        setCurrentQuestion(question);
    }, [question]);

    // Handle question updates from form components
    const handleQuestionUpdate = (updatedQuestion: QuestionnaireItem) => {
        // Check if the type has changed
        if (updatedQuestion.type !== currentQuestion.type) {
            // Transform the question to match the new type
            const transformedQuestion = transformQuestionForType(updatedQuestion, updatedQuestion.type);
            setCurrentQuestion(transformedQuestion);
            onUpdate(transformedQuestion);
        } else {
            // Normal update - just pass through
            setCurrentQuestion(updatedQuestion);
            onUpdate(updatedQuestion);
        }
    };

    // Get the appropriate form component for the current type
    const FormComponent = createQuestionForm(currentQuestion.type);

    return (
        <FormComponent
            {...restProps}
            question={currentQuestion}
            onUpdate={handleQuestionUpdate}
        />
    );
}

// Export all form components for direct use if needed
export {
    StringQuestionForm,
    NumberQuestionForm,
    ChoiceQuestionForm,
    BlockForm,
    LoopForm,
    TextForm,
    BreakPageForm,
    MarkerForm,
    QuotaForm,
    TerminationForm,
};

// Export types for consistency
export type { BaseQuestionFormProps } from './BaseQuestionForm';