import { QuestionFormFactory } from './question-forms';
import type { QuestionnaireItem } from '../types';

interface QuestionFormControlsProps {
    question: QuestionnaireItem;
    onUpdate: (question: QuestionnaireItem) => void;
    availableQuestions?: Array<{ value: string; label: string }>;
    className?: string;
}

export function QuestionFormControls({
    question,
    onUpdate,
    availableQuestions = [],
    className
}: QuestionFormControlsProps) {
    return (
        <QuestionFormFactory
            question={question}
            onUpdate={onUpdate}
            availableQuestions={availableQuestions}
            className={className}
        />
    );
}