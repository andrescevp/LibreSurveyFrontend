import { Button } from '@ui/atoms/Button';
import { Save, Eye } from 'lucide-react';
import type { Survey } from '../../survey-types';

interface SurveyEditorHeaderProps {
    survey: Survey;
    validationErrors: any[];
    readOnly?: boolean;
    onSave: () => void;
    onPreview: () => void;
}

export function SurveyEditorHeader({
    survey,
    validationErrors,
    readOnly = false,
    onSave,
    onPreview,
}: SurveyEditorHeaderProps) {
    return (
        <div className="border-b bg-card p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Survey Editor</h1>
                    {survey.title && (
                        <p className="text-muted-foreground mt-1">{survey.title}</p>
                    )}
                </div>

                <div className="flex gap-2">
                    {validationErrors.length > 0 && (
                        <div className="text-sm text-destructive mr-4">
                            {validationErrors.length} validation error{validationErrors.length > 1 ? 's' : ''}
                        </div>
                    )}

                    <Button
                        variant="outline"
                        onClick={onPreview}
                        disabled={!survey.title || !survey.code}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </Button>

                    {!readOnly && (
                        <Button
                            onClick={onSave}
                            disabled={!survey.title || !survey.code}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Survey
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}