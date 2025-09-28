import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Switch } from '@ui/atoms/Switch';
import { Button } from '@ui/atoms/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { QuestionTypeSelector } from '../../atoms/QuestionTypeSelector';
import { ConditionBuilder } from '../ConditionBuilder';
import type { BaseQuestionFormProps, BaseFormData } from './BaseQuestionForm';
import { createBaseFormData, updateQuestionWithFormData, updateQuestionCondition, handleQuestionTypeChange } from './BaseQuestionForm';
import type { ElementCondition } from '../../../survey-types';
import type { QuestionType } from '../../types';

interface ChoiceQuestionFormData extends BaseFormData {
    options: {
        required?: boolean;
        multipleSelection?: boolean;
        minSelections?: number;
        maxSelections?: number;
        condition?: ElementCondition;
    };
}

export function ChoiceQuestionForm({
    question,
    onUpdate,
    availableQuestions = [],
    className
}: BaseQuestionFormProps) {
    const { control, handleSubmit, watch, formState: { isDirty } } = useForm<ChoiceQuestionFormData>({
        defaultValues: {
            ...createBaseFormData(question),
            options: {
                required: (question as any).options?.required || false,
                multipleSelection: (question as any).options?.multipleSelection || false,
                minSelections: (question as any).options?.minSelections || undefined,
                maxSelections: (question as any).options?.maxSelections || undefined,
                condition: (question as any).options?.condition,
            },
        },
        mode: 'onChange',
    });

    const multipleSelection = watch('options.multipleSelection');

    const onSubmit = (data: ChoiceQuestionFormData) => {
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
                    <CardTitle className="text-base">Choice Question Settings</CardTitle>
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
                                            placeholder="e.g., Q1"
                                        />
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Question Type</label>
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
                                        placeholder="Enter question text"
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="help" className="text-sm font-medium">
                                Help Text
                            </label>
                            <Controller
                                name="help"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id="help"
                                        placeholder="Optional help text for respondents"
                                    />
                                )}
                            />
                        </div>

                        {/* Choice-specific options */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Choice Options</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="options.required"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value || false}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <label className="text-sm">Required</label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="options.multipleSelection"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value || false}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <label className="text-sm">Multiple selection</label>
                                </div>
                            </div>

                            {multipleSelection && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Minimum Selections</label>
                                        <Controller
                                            name="options.minSelections"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Min selections"
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Maximum Selections</label>
                                        <Controller
                                            name="options.maxSelections"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Max selections"
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={!isDirty}
                                size="sm"
                            >
                                Update Question
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