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

interface StringQuestionFormData extends BaseFormData {
    options: {
        multiline?: boolean;
        required?: boolean;
        placeholder?: string;
        regex?: string;
        minLength?: number;
        maxLength?: number;
        width?: number;
        height?: number;
        verifier?: 'email' | 'number' | 'url';
        naOption?: boolean;
        naLabel?: string;
        condition?: ElementCondition;
    };
}

export function StringQuestionForm({
    question,
    onUpdate,
    availableQuestions = [],
    className
}: BaseQuestionFormProps) {
    const { control, handleSubmit, formState: { isDirty } } = useForm<StringQuestionFormData>({
        defaultValues: {
            ...createBaseFormData(question),
            options: {
                multiline: (question as any).options?.multiline || false,
                required: (question as any).options?.required || false,
                placeholder: (question as any).options?.placeholder || '',
                regex: (question as any).options?.regex || '',
                minLength: (question as any).options?.minLength || undefined,
                maxLength: (question as any).options?.maxLength || undefined,
                width: (question as any).options?.width || undefined,
                height: (question as any).options?.height || undefined,
                verifier: (question as any).options?.verifier || undefined,
                naOption: (question as any).options?.naOption || false,
                naLabel: (question as any).options?.naLabel || '',
                condition: (question as any).options?.condition,
            },
        },
        mode: 'onChange',
    });

    const onSubmit = (data: StringQuestionFormData) => {
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
                    <CardTitle className="text-base">Text Question Settings</CardTitle>
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

                        {/* String-specific options */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Text Options</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="options.multiline"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value || false}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <label className="text-sm">Multiline</label>
                                </div>

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
                                        name="options.naOption"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value || false}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <label className="text-sm">N/A Option</label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Controller
                                    name="options.placeholder"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Placeholder text"
                                            value={field.value || ''}
                                        />
                                    )}
                                />

                                <Controller
                                    name="options.naLabel"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="N/A Label (if N/A option enabled)"
                                            value={field.value || ''}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Controller
                                    name="options.minLength"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Min length"
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                    )}
                                />

                                <Controller
                                    name="options.maxLength"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Max length"
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                    )}
                                />

                                <Controller
                                    name="options.width"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Width (px)"
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                    )}
                                />
                            </div>

                            <Controller
                                name="options.regex"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Validation regex pattern"
                                        value={field.value || ''}
                                    />
                                )}
                            />
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