import { useState } from 'react';
import { Button } from '@ui/atoms/Button';
import { Input } from '@ui/atoms/Input';
import { Textarea } from '@ui/atoms/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/molecules/Card';
import { useSurveyValidation } from '../hooks/useSurveyValidation';
import { ValidationErrorsPanel } from '../molecules/ValidationErrorsPanel';
import type { Survey } from '../types';

export function ValidationDemo() {
    const [survey, setSurvey] = useState<Survey>({
        code: '',
        title: '',
        description: '',
        children: [],
    });

    const validation = useSurveyValidation(survey);

    const handleAddSimpleQuestion = () => {
        setSurvey(prev => ({
            ...prev,
            children: [
                ...(prev.children || []),
                {
                    id: `q${Date.now()}`,
                    code: '',
                    type: 'string',
                    label: '',
                } as any
            ]
        }));
    };

    const handleAddChoiceQuestion = () => {
        setSurvey(prev => ({
            ...prev,
            children: [
                ...(prev.children || []),
                {
                    id: `q${Date.now()}`,
                    code: '',
                    type: 'choice',
                    label: '',
                    rows: []
                } as any
            ]
        }));
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Survey Validation Demo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-foreground">Survey Code</label>
                            <Input
                                value={survey.code}
                                onChange={(e) => setSurvey(prev => ({ ...prev, code: e.target.value }))}
                                placeholder="Enter survey code"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground">Survey Title</label>
                            <Input
                                value={survey.title}
                                onChange={(e) => setSurvey(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter survey title"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground">Description</label>
                        <Textarea
                            value={survey.description || ''}
                            onChange={(e) => setSurvey(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter survey description"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={handleAddSimpleQuestion} variant="outline">
                            Add Text Question
                        </Button>
                        <Button onClick={handleAddChoiceQuestion} variant="outline">
                            Add Choice Question
                        </Button>
                    </div>

                    <div className="border rounded-lg p-4 bg-muted/5">
                        <h4 className="font-medium mb-2">Questions ({survey.children?.length || 0})</h4>
                        {survey.children?.map((question) => (
                            <div key={question.id} className="mb-2 p-2 border rounded text-sm">
                                <div className="font-medium">
                                    {question.type} - Code: {question.code || '(empty)'} - Label: {(question as any).label || '(empty)'}
                                </div>
                            </div>
                        ))}
                        {(!survey.children || survey.children.length === 0) && (
                            <div className="text-muted-foreground text-sm">No questions added yet</div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Validation Results</span>
                        <div className="flex items-center gap-2 text-sm">
                            <span className={validation.isValid() ? 'text-green-600' : 'text-destructive'}>
                                {validation.isValid() ? '✓ Valid' : '✗ Invalid'}
                            </span>
                            <span className="text-muted-foreground">
                                ({validation.errorCount} errors, {validation.warningCount} warnings)
                            </span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ValidationErrorsPanel
                        validationErrors={validation.errors}
                        showWarnings={true}
                        showInfo={true}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Validation Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm space-y-2">
                        <div><strong>Summary:</strong> {validation.summary}</div>
                        <div><strong>Is Valid:</strong> {validation.isValid() ? 'Yes' : 'No'}</div>
                        <div><strong>Has Warnings:</strong> {validation.hasWarnings ? 'Yes' : 'No'}</div>
                        <div><strong>Total Issues:</strong> {validation.errors.length}</div>
                        <div><strong>Error Count:</strong> {validation.errorCount}</div>
                        <div><strong>Warning Count:</strong> {validation.warningCount}</div>
                        <div><strong>Info Count:</strong> {validation.infoCount}</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}