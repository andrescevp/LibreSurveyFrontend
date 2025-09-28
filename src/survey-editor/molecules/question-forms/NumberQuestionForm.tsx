import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Switch } from '@ui/atoms/Switch';
import { Button } from '@ui/atoms/Button';
import { Select } from '@ui/atoms/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { QuestionTypeSelector } from '../../atoms/QuestionTypeSelector';
import { ConditionBuilder } from '../ConditionBuilder';
import { RowColumnManager } from '../RowColumnManager';
import type { BaseQuestionFormProps, BaseFormData } from './BaseQuestionForm';
import { createBaseFormData, updateQuestionWithFormData, updateQuestionCondition, handleQuestionTypeChange } from './BaseQuestionForm';
import type { ElementCondition, ElementRow, ElementColumn, BaseRowColumnOptions } from '../../../survey-types';
import type { QuestionType } from '../../types';

interface NumberQuestionFormData extends BaseFormData {
    options: {
        required?: boolean;
        placeholder?: string;
        min?: number;
        max?: number;
        width?: number;
        integer?: boolean;
        decimalPlaces?: number;
        fixedValues?: number[];
        naOption?: boolean;
        naLabel?: string;
        condition?: ElementCondition;
    };
}

export function NumberQuestionForm({
    question,
    onUpdate,
    availableQuestions = [],
    className
}: BaseQuestionFormProps) {
    const { control, handleSubmit, watch, formState: { isDirty } } = useForm<NumberQuestionFormData>({
        defaultValues: {
            ...createBaseFormData(question),
            options: {
                required: (question as any).options?.required || false,
                placeholder: (question as any).options?.placeholder || '',
                min: (question as any).options?.min || undefined,
                max: (question as any).options?.max || undefined,
                width: (question as any).options?.width || undefined,
                integer: (question as any).options?.integer !== false,  // default true
                decimalPlaces: (question as any).options?.decimalPlaces || undefined,
                fixedValues: (question as any).options?.fixedValues || [],
                naOption: (question as any).options?.naOption || false,
                naLabel: (question as any).options?.naLabel || '',
                condition: (question as any).options?.condition,
            },
        },
        mode: 'onChange',
    });

    const isInteger = watch('options.integer');

    const onSubmit = (data: NumberQuestionFormData) => {
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
                    <CardTitle className="text-base">Number Question Settings</CardTitle>
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

                        {/* Number-specific options */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Number Options</h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                        name="options.integer"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value !== false}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <label className="text-sm">Integer only</label>
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

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Controller
                                    name="options.min"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Min value"
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                    )}
                                />

                                <Controller
                                    name="options.max"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Max value"
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

                                {!isInteger && (
                                    <Controller
                                        name="options.decimalPlaces"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Decimal places"
                                                value={field.value || ''}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            />
                                        )}
                                    />
                                )}
                            </div>
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

            {/* Row and Column Management for Matrix Questions */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RowColumnManager
                    title="Question Items"
                    items={(question as any).rows || []}
                    onUpdate={(rows: ElementRow<BaseRowColumnOptions>[]) => {
                        const updatedQuestion = { ...question, rows } as any;
                        onUpdate(updatedQuestion);
                    }}
                    type="rows"
                    questionType="number"
                    minItems={0}
                    maxItems={50}
                    placeholder="Enter question item"
                />

                <RowColumnManager
                    title="Number Columns"
                    items={(question as any).columns || []}
                    onUpdate={(columns: ElementColumn<BaseRowColumnOptions>[]) => {
                        const updatedQuestion = { ...question, columns } as any;
                        onUpdate(updatedQuestion);
                    }}
                    type="columns"
                    questionType="number"
                    minItems={0}
                    maxItems={20}
                    placeholder="Enter column header"
                />
            </div>

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