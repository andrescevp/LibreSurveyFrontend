import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { Button } from '@ui/atoms/Button';
import { Input } from '@ui/atoms/Input';
import { Textarea } from '@ui/atoms/Textarea';
import { Badge } from '@ui/atoms/Badge';
import { X } from 'lucide-react';
import { cn } from '@lib/utils';
import type { Survey } from '../../survey-types';
import type { QuestionnaireItem } from '../types';

interface SurveyPreviewProps {
    survey: Survey;
    onClose?: () => void;
    className?: string;
}

interface QuestionPreviewProps {
    question: QuestionnaireItem;
    depth?: number;
}

function QuestionPreview({ question, depth = 0 }: QuestionPreviewProps) {
    const questionData = question as any;

    if (question.type === 'breakPage') {
        return (
            <div className="border-t-2 border-dashed border-border py-8 text-center text-muted-foreground">
                <div className="text-sm font-medium">— Page Break —</div>
            </div>
        );
    }

    if (question.type === 'text') {
        return (
            <div className={cn('py-4', depth > 0 && 'ml-6')}>
                <div className="prose prose-sm max-w-none">
                    <p>{questionData.label}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('space-y-3 py-4', depth > 0 && 'ml-6')}>
            <div className="space-y-2">
                <div className="flex items-start gap-2">
                    <label className="text-sm font-medium leading-6">
                        {questionData.label}
                        {questionData.options?.required && (
                            <span className="text-destructive ml-1">*</span>
                        )}
                    </label>
                    <Badge variant="secondary" className="text-xs">
                        {question.code}
                    </Badge>
                </div>

                {questionData.help && (
                    <p className="text-sm text-muted-foreground">
                        {questionData.help}
                    </p>
                )}
            </div>

            <div className="max-w-md">
                {question.type === 'string' && (
                    <div>
                        {questionData.options?.multiline ? (
                            <Textarea
                                placeholder={questionData.options?.placeholder || 'Enter your answer...'}
                                disabled
                                rows={3}
                            />
                        ) : (
                            <Input
                                placeholder={questionData.options?.placeholder || 'Enter your answer...'}
                                disabled
                            />
                        )}
                    </div>
                )}

                {question.type === 'number' && (
                    <div>
                        <Input
                            type="number"
                            placeholder={questionData.options?.placeholder || 'Enter a number...'}
                            min={questionData.options?.min}
                            max={questionData.options?.max}
                            disabled
                        />
                        {(questionData.options?.min !== null || questionData.options?.max !== null) && (
                            <div className="text-xs text-muted-foreground mt-1">
                                {questionData.options?.min !== null && `Min: ${questionData.options.min}`}
                                {questionData.options?.min !== null && questionData.options?.max !== null && ' • '}
                                {questionData.options?.max !== null && `Max: ${questionData.options.max}`}
                            </div>
                        )}
                    </div>
                )}

                {question.type === 'choice' && (
                    <div className="space-y-2">
                        {questionData.rows?.map((row: any, index: number) => (
                            <div key={row.id || index} className="flex items-center space-x-2">
                                <input
                                    type={questionData.options?.multipleSelection ? 'checkbox' : 'radio'}
                                    id={`${question.code}_${row.code}`}
                                    name={question.code}
                                    disabled
                                    className="rounded border-input"
                                />
                                <label
                                    htmlFor={`${question.code}_${row.code}`}
                                    className="text-sm"
                                >
                                    {row.label}
                                </label>
                            </div>
                        ))}

                        {questionData.options?.multipleSelection && (
                            <div className="text-xs text-muted-foreground mt-2">
                                {questionData.options?.minSelections && (
                                    <span>Min selections: {questionData.options.minSelections}</span>
                                )}
                                {questionData.options?.minSelections && questionData.options?.maxSelections && ' • '}
                                {questionData.options?.maxSelections && (
                                    <span>Max selections: {questionData.options.maxSelections}</span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {question.type === 'block' && (
                    <div className="border-l-2 border-muted pl-4 space-y-4">
                        {questionData.children?.map((child: QuestionnaireItem, index: number) => (
                            <QuestionPreview
                                key={child.id || index}
                                question={child}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}

                {question.type === 'loop' && (
                    <div className="border border-dashed border-muted rounded-lg p-4 space-y-4">
                        <div className="text-sm text-muted-foreground">
                            Loop: The following questions will be repeated
                        </div>
                        {questionData.children?.map((child: QuestionnaireItem, index: number) => (
                            <QuestionPreview
                                key={child.id || index}
                                question={child}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>

            {questionData.options?.condition && (
                <div className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                    Conditional: {questionData.options.condition.action} when conditions are met
                </div>
            )}
        </div>
    );
}

export function SurveyPreview({ survey, onClose, className }: SurveyPreviewProps) {
    return (
        <div className={cn('h-full flex flex-col', className)}>
            {/* Header */}
            <div className="border-b bg-card p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{survey.title || 'Untitled Survey'}</h1>
                        {survey.description && (
                            <p className="text-muted-foreground mt-1">{survey.description}</p>
                        )}
                    </div>

                    {onClose && (
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{survey.title}</CardTitle>
                            {survey.description && (
                                <p className="text-muted-foreground">{survey.description}</p>
                            )}
                        </CardHeader>

                        <CardContent>
                            {!survey.children || survey.children.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <p>No questions have been added to this survey yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-1 divide-y divide-border">
                                    {survey.children.map((question, index) => (
                                        <QuestionPreview
                                            key={question.id || index}
                                            question={question}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t">
                                <Button disabled className="mr-4">
                                    Submit Survey
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    This is a preview - responses cannot be submitted
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}