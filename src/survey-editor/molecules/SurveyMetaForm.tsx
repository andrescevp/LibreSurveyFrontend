import { useForm } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Textarea } from '@ui/atoms/Textarea';
import { Button } from '@ui/atoms/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@ui/molecules/Card';
import type { Survey } from '../../survey-types';

interface SurveyMetaFormProps {
    initialData?: Partial<Survey>;
    onSave: (data: Survey) => void;
    onCancel?: () => void;
    className?: string;
}

interface SurveyFormData {
    code: string;
    title: string;
    description?: string;
}

export function SurveyMetaForm({
    initialData,
    onSave,
    onCancel,
    className
}: SurveyMetaFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<SurveyFormData>({
        defaultValues: {
            code: initialData?.code || '',
            title: initialData?.title || '',
            description: initialData?.description || '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data: SurveyFormData) => {
        const survey: Survey = {
            ...initialData,
            ...data,
            children: initialData?.children || [],
        };
        onSave(survey);
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Survey Information</CardTitle>
                <CardDescription>
                    Enter the basic information for your survey
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="code" className="text-sm font-medium">
                            Survey Code *
                        </label>
                        <Input
                            id="code"
                            {...register('code', {
                                required: 'Survey code is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_-]+$/,
                                    message: 'Code can only contain letters, numbers, hyphens, and underscores',
                                },
                            })}
                            error={errors.code?.message}
                            placeholder="e.g., customer_satisfaction_2024"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Survey Title *
                        </label>
                        <Input
                            id="title"
                            {...register('title', {
                                required: 'Survey title is required',
                                minLength: {
                                    value: 3,
                                    message: 'Title must be at least 3 characters long',
                                },
                            })}
                            error={errors.title?.message}
                            placeholder="e.g., Customer Satisfaction Survey"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            {...register('description')}
                            placeholder="Optional description of the survey purpose and content..."
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            disabled={!isDirty || !isValid}
                            className="flex-1"
                        >
                            Save Survey Info
                        </Button>
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}