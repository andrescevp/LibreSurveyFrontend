import { useCallback } from 'react';
import { SurveyEditorHeader } from '../molecules/SurveyEditorHeader';
import { SurveyEditorSidebar } from '../molecules/SurveyEditorSidebar';
import { SurveyEditorMainPanel } from '../molecules/SurveyEditorMainPanel';
import { ValidationErrorsPanel } from '../molecules/ValidationErrorsPanel';
import { useSurveyEditor } from '../hooks/useSurveyEditor';
import type { SurveyEditorProps } from '../types';

export function SurveyEditor({
    initialSurvey,
    onSave,
    onPreview,
    readOnly = false
}: SurveyEditorProps) {
    const {
        survey,
        selectedQuestion,
        selectedQuestionIndex,
        activeTab,
        validationErrors,
        availableQuestions,
        setActiveTab,
        handleSurveyMetaUpdate,
        handleQuestionsUpdate,
        handleQuestionSelect,
        handleQuestionUpdate,
        handleAddQuestion,
        handleQuestionDelete,
        handleValidate,
    } = useSurveyEditor(initialSurvey);

    const handleSave = useCallback(() => {
        const isValid = handleValidate();
        if (isValid) {
            onSave?.(survey);
        }
    }, [handleValidate, onSave, survey]);

    const handlePreview = useCallback(() => {
        onPreview?.(survey);
    }, [survey, onPreview]);

    return (
        <div className="h-full flex flex-col">
            <SurveyEditorHeader
                survey={survey}
                validationErrors={validationErrors}
                readOnly={readOnly}
                onSave={handleSave}
                onPreview={handlePreview}
            />

            <div className="flex-1 flex overflow-hidden">
                <SurveyEditorSidebar
                    survey={survey}
                    activeTab={activeTab}
                    selectedQuestionIndex={selectedQuestionIndex}
                    onTabChange={setActiveTab}
                    onSurveyMetaUpdate={handleSurveyMetaUpdate}
                    onQuestionsUpdate={handleQuestionsUpdate}
                    onQuestionSelect={handleQuestionSelect}
                    onAddQuestion={handleAddQuestion}
                />

                <SurveyEditorMainPanel
                    survey={survey}
                    selectedQuestion={selectedQuestion}
                    selectedQuestionIndex={selectedQuestionIndex}
                    availableQuestions={availableQuestions}
                    onQuestionUpdate={handleQuestionUpdate}
                    onQuestionDelete={handleQuestionDelete}
                />
            </div>

            <ValidationErrorsPanel validationErrors={validationErrors} />
        </div>
    );
}