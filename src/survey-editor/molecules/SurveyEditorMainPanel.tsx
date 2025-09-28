import { Card, CardContent } from '@ui/molecules/Card';
import { QuestionEditor } from '../organisms/QuestionEditor';
import { FileText } from 'lucide-react';
import type { Survey } from '../../survey-types';
import type { QuestionnaireItem } from '../types';

interface SurveyEditorMainPanelProps {
    survey: Survey;
    selectedQuestion: QuestionnaireItem | null;
    selectedQuestionIndex: number | null;
    availableQuestions: Array<{ value: string; label: string }>;
    onQuestionUpdate: (question: QuestionnaireItem) => void;
    onQuestionDelete: () => void;
}

export function SurveyEditorMainPanel({
    selectedQuestion,
    selectedQuestionIndex,
    availableQuestions,
    onQuestionUpdate,
    onQuestionDelete,
}: SurveyEditorMainPanelProps) {
    return (
        <div className="flex-1 overflow-y-auto">
            {selectedQuestion ? (
                <QuestionEditor
                    question={selectedQuestion}
                    onUpdate={onQuestionUpdate}
                    onDelete={onQuestionDelete}
                    availableQuestions={availableQuestions}
                    index={selectedQuestionIndex ?? undefined}
                    className="p-6"
                />
            ) : (
                <div className="p-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center text-muted-foreground">
                                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-medium mb-2">No Question Selected</h3>
                                <p className="text-sm">
                                    Select a question from the list to edit its properties and settings.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}