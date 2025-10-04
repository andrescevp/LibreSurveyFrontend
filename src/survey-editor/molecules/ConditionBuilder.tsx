import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { Button } from '@ui/atoms/Button';
import { Input } from '@ui/atoms/Input';
import { Select } from '@ui/atoms/Select';
import { Toggle } from '@ui/atoms/Toggle';
import { ToggleGroup, ToggleGroupItem } from '@ui/molecules/ToggleGroup';
import { DeleteButton } from '../atoms/DeleteButton';
import { Plus, X } from 'lucide-react';
import { OPERATORS } from '../types';
import type { ElementCondition } from '../../survey-types';

interface ConditionRule {
    negate?: boolean;
    code: string;
    rowCode?: string;
    columnCode?: string;
    operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains' | 'not_contains';
    value: string;
    gate?: 'and' | 'or';
}

interface ConditionBuilderProps {
    condition?: ElementCondition;
    onUpdate: (condition: ElementCondition | null) => void;
    availableQuestions?: Array<{ value: string; label: string }>;
    className?: string;
}

interface ConditionFormData {
    action: 'show' | 'require' | 'set' | 'iterate';
    rules: ConditionRule[];
}

export function ConditionBuilder({
    condition,
    onUpdate,
    availableQuestions = [],
    className
}: ConditionBuilderProps) {
    const { control, handleSubmit, setValue } = useForm<ConditionFormData>({
        defaultValues: {
            action: condition?.action || 'show',
            rules: condition?.rules?.map(rule => ({
                negate: rule.negate || false,
                code: rule.code,
                rowCode: rule.rowCode,
                columnCode: rule.columnCode,
                operator: (rule.operator as ConditionRule['operator']) || '=',
                value: rule.value || '',
                gate: rule.gate as 'and' | 'or' | undefined,
            })) || [{ negate: false, code: '', operator: '=' as const, value: '', gate: undefined }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'rules',
    });

    const onSubmit = (data: ConditionFormData) => {
        if (data.rules.length === 0 || data.rules.every(rule => !rule.code)) {
            onUpdate(null);
            return;
        }

        const validRules = data.rules.filter(rule => rule.code && rule.value);
        if (validRules.length === 0) {
            onUpdate(null);
            return;
        }

        onUpdate({
            action: data.action as any,
            rules: validRules.map(rule => ({
                negate: rule.negate || false,
                code: rule.code,
                rowCode: rule.rowCode || undefined,
                columnCode: rule.columnCode || undefined,
                operator: rule.operator,
                value: String(rule.value),
                gate: rule.gate,
            })),
        });
    };

    const addRule = () => {
        append({ negate: false, code: '', operator: '=', value: '', gate: 'and' });
    };

    const removeRule = (index: number) => {
        remove(index);
    };

    const clearCondition = () => {
        setValue('rules', []);
        onUpdate(null);
    };

    return (
        <div className={`p-4 border rounded-lg bg-card space-y-4 ${className || ''}`}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Conditions</h3>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearCondition}
                    className="text-xs h-6 px-2"
                >
                    <X className="w-3 h-3 mr-1" />
                    Clear
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Action Toggle Group */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Action</label>
                    <Controller
                        name="action"
                        control={control}
                        render={({ field }) => (
                            <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={(value) => field.onChange(value || 'show')}
                                size="sm"
                                variant="outline"
                            >
                                <ToggleGroupItem value="show">Show</ToggleGroupItem>
                                <ToggleGroupItem value="require">Require</ToggleGroupItem>
                                <ToggleGroupItem value="set">Set</ToggleGroupItem>
                                <ToggleGroupItem value="iterate">Iterate</ToggleGroupItem>
                            </ToggleGroup>
                        )}
                    />
                </div>

                {/* Rules */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground">Rules</label>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={addRule}
                            className="text-xs h-6 px-2"
                        >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="p-3 border rounded bg-muted/20 space-y-2">
                            {/* Gate selector for subsequent rules */}
                            {index > 0 && (
                                <Controller
                                    name={`rules.${index}.gate`}
                                    control={control}
                                    render={({ field }) => (
                                        <ToggleGroup
                                            type="single"
                                            value={field.value || 'and'}
                                            onValueChange={(value) => field.onChange(value || 'and')}
                                            size="sm"
                                            variant="outline"
                                            className="w-fit"
                                        >
                                            <ToggleGroupItem value="and">AND</ToggleGroupItem>
                                            <ToggleGroupItem value="or">OR</ToggleGroupItem>
                                        </ToggleGroup>
                                    )}
                                />
                            )}

                            {/* Rule configuration */}
                            <div className="grid grid-cols-12 gap-2 items-center">
                                {/* Negate Toggle */}
                                <div className="col-span-2">
                                    <Controller
                                        name={`rules.${index}.negate`}
                                        control={control}
                                        render={({ field }) => (
                                            <Toggle
                                                pressed={field.value || false}
                                                onPressedChange={field.onChange}
                                                size="sm"
                                                variant="outline"
                                                aria-label="Negate condition"
                                            >
                                                NOT
                                            </Toggle>
                                        )}
                                    />
                                </div>

                                {/* Question Select */}
                                <div className="col-span-3">
                                    <Controller
                                        name={`rules.${index}.code`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={availableQuestions.find(q => q.value === field.value)}
                                                onChange={(option: any) => field.onChange(option?.value || '')}
                                                options={availableQuestions}
                                                placeholder="Question"
                                            />
                                        )}
                                    />
                                </div>

                                {/* Operator Select */}
                                <div className="col-span-2">
                                    <Controller
                                        name={`rules.${index}.operator`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={OPERATORS.find(op => op.value === field.value)}
                                                onChange={(option: any) => field.onChange(option?.value)}
                                                options={OPERATORS}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Value Input */}
                                <div className="col-span-4">
                                    <Controller
                                        name={`rules.${index}.value`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Value"
                                                className="text-sm"
                                            />
                                        )}
                                    />
                                </div>

                                {/* Delete Button */}
                                <div className="col-span-1 flex justify-center">
                                    <DeleteButton
                                        onDelete={() => removeRule(index)}
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Apply Button */}
                <div className="pt-1">
                    <Button type="submit" size="sm" className="w-full">
                        Apply Condition
                    </Button>
                </div>
            </form>
        </div>
    );
}