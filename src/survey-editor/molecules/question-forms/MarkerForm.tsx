import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Button } from '@ui/atoms/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { QuestionTypeSelector } from '../../atoms/QuestionTypeSelector';
import { ConditionBuilder } from '../ConditionBuilder';
import type { BaseQuestionFormProps, BaseFormData } from './BaseQuestionForm';
import { createBaseFormData, updateQuestionWithFormData, updateQuestionCondition, handleQuestionTypeChange } from './BaseQuestionForm';
import type { ElementCondition } from '../../../survey-types';
import type { QuestionType } from '../../types';

interface MarkerFormData extends BaseFormData {
    options: {
        condition?: ElementCondition;
    };
}

export function MarkerForm({
    question,
    onUpdate,
    availableQuestions = [],
    className
}: BaseQuestionFormProps) {
    const { control, handleSubmit, formState: { isDirty } } = useForm<MarkerFormData>({
        defaultValues: {
            ...createBaseFormData(question),
            options: {
                condition: (question as any).options?.condition,
            },
        },
        mode: 'onChange',
    });

    const onSubmit = (data: MarkerFormData) => {
        const updatedQuestion = updateQuestionWithFormData(question, data);
        onUpdate(updatedQuestion);
    };

    const handleConditionUpdate = (condition: ElementCondition | null) => {
        const updatedQuestion = updateQuestionCondition(question, condition);
        onUpdate(updatedQuestion);
    };

    const handleTypeChange = (newType: QuestionType) => {
        handleQuestionTypeChange(question, newType, onUpdate);
    };

    return (
        <div className={className}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Marker Settings</CardTitle>
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
                                            placeholder="e.g., MARKER1"
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

                        <div className="space-y-2">
                            <label htmlFor="label" className="text-sm font-medium">
                                Label *
                            </label>
                            <Controller
                                name="label"
                                control={control}
                                rules={{ required: 'Label is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input
                                        {...field}
                                        id="label"
                                        error={error?.message}
                                        placeholder="Enter marker label"
                                    />
                                )}
                            />
                        </div>

                        {/* Marker-specific options */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Marker Options</h4>
                            <p className="text-sm text-muted-foreground">
                                Markers are conditional elements that can be set or triggered based on survey logic.
                                They are often used for tracking survey flow or setting flags.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={!isDirty}
                                size="sm"
                            >
                                Update Marker
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Condition Builder */}
            <div className="mt-4">
                <ConditionBuilder
                    condition={(question as any).options?.condition}
                    onUpdate={handleConditionUpdate}
                    availableQuestions={availableQuestions}
                />
            </div>
        </div>
    );
}