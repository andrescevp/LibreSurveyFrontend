import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { QuestionFormControls } from '../molecules/QuestionFormControls';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@ui/molecules/AlertDialog';

import { Button } from '@ui/atoms/Button';
import { Copy, Trash2 } from 'lucide-react';
import type { QuestionEditorProps } from '../types';

export function QuestionEditor({
    question,
    onUpdate,
    onDelete,
    onDuplicate,
    availableQuestions = [],
    index,
    className,
}: QuestionEditorProps) {
    const questionLabel = (question as any).label || `${question.type} (${question.code})`;

    return (
        <div className={className}>
            <Card variant='none' className='p-1'>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                            Edit Question {index !== undefined && `#${index + 1}`}
                        </CardTitle>
                        <div className="flex gap-2">
                            {onDuplicate && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onDuplicate}
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Duplicate
                                </Button>
                            )}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this question? This action cannot be undone and will permanently remove the question from your survey.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction variant="destructive" onClick={onDelete}>
                                            Delete Question
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <QuestionFormControls
                        question={question}
                        onUpdate={onUpdate}
                        availableQuestions={availableQuestions}
                    />
                </CardContent>
            </Card>
        </div>
    );
}