import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { Button } from '@ui/atoms/Button';
import { Input } from '@ui/atoms/Input';
import { Select } from '@ui/atoms/Select';
import { Switch } from '@ui/atoms/Switch';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { DeleteButton } from '../atoms/DeleteButton';
import { Plus } from 'lucide-react';
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

    const actionOptions = [
        { value: 'show', label: 'Show' },
        { value: 'require', label: 'Require' },
        { value: 'set', label: 'Set' },
        { value: 'iterate', label: 'Iterate' },
    ];

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
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-base">Condition Settings</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Action</label>
                        <Controller
                            name="action"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={actionOptions.find(opt => opt.value === field.value)}
                                    onChange={(option: any) => field.onChange(option?.value)}
                                    options={actionOptions}
                                    placeholder="Select action"
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Rules</label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addRule}
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Rule
                            </Button>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="border rounded-lg p-3 space-y-3">
                                {index > 0 && (
                                    <div>
                                        <Controller
                                            name={`rules.${index}.gate`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={{ value: field.value || 'and', label: field.value === 'or' ? 'OR' : 'AND' }}
                                                    onChange={(option: any) => field.onChange(option?.value)}
                                                    options={[
                                                        { value: 'and', label: 'AND' },
                                                        { value: 'or', label: 'OR' },
                                                    ]}
                                                />
                                            )}
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
                                    <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Negate</label>
                                        <Controller
                                            name={`rules.${index}.negate`}
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value || false}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    size="sm"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Question</label>
                                        <Controller
                                            name={`rules.${index}.code`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={availableQuestions.find(q => q.value === field.value)}
                                                    onChange={(option: any) => field.onChange(option?.value || '')}
                                                    options={availableQuestions}
                                                    placeholder="Select question"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Operator</label>
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

                                    <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Value</label>
                                        <Controller
                                            name={`rules.${index}.value`}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Enter value"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-center items-center pt-6">
                                        <DeleteButton
                                            onDelete={() => removeRule(index)}
                                            size="sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button type="submit" size="sm">
                            Apply Condition
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearCondition}
                        >
                            Clear
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}