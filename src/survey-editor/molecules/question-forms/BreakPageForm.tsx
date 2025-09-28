import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Button } from '@ui/atoms/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { QuestionTypeSelector } from '../../atoms/QuestionTypeSelector';
import type { BaseQuestionFormProps, BaseFormData } from './BaseQuestionForm';
import { createBaseFormData, updateQuestionWithFormData, handleQuestionTypeChange } from './BaseQuestionForm';
import type { QuestionType } from '../../types';

interface BreakPageFormData extends BaseFormData {
    options: Record<string, never>; // BreakPage has no options
}

export function BreakPageForm({
    question,
    onUpdate,
    className
}: BaseQuestionFormProps) {
    const { control, handleSubmit, formState: { isDirty } } = useForm<BreakPageFormData>({
        defaultValues: {
            ...createBaseFormData(question),
            options: {},
        },
        mode: 'onChange',
    });

    const onSubmit = (data: BreakPageFormData) => {
        const updatedQuestion = updateQuestionWithFormData(question, data);
        onUpdate(updatedQuestion);
    };

    const handleTypeChange = (newType: QuestionType) => {
        handleQuestionTypeChange(question, newType, onUpdate);
    };

    return (
        <div className={className}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Page Break Settings</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Basic Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="code" className="text-sm font-medium">
                                    Code *
                                </label>
                                <Controller
                                    name="code"
                                    control={control}
                                    rules={{
                                        required: 'Code is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9_-]+$/,
                                            message: 'Code can only contain letters, numbers, hyphens, and underscores',
                                        },
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input
                                            {...field}
                                            id="code"
                                            error={error?.message}
                                            placeholder="e.g., PAGE1"
                                        />
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Element Type</label>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <QuestionTypeSelector
                                            value={field.value}
                                            onChange={(newType) => {
                                                field.onChange(newType);
                                                handleTypeChange(newType);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* BreakPage-specific options */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Page Break Options</h4>
                            <p className="text-sm text-muted-foreground">
                                Page breaks create a new page in the survey. All questions after this element will appear on the next page.
                                Page breaks don't have additional configuration options.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={!isDirty}
                                size="sm"
                            >
                                Update Page Break
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}