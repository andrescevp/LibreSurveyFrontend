import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Button } from '@ui/atoms/Button';
import { Switch } from '@ui/atoms/Switch';
import type { BaseRowColumnFormProps, StringRowFormData } from './types';
import type { BaseRowColumnOptions } from '../../../survey-types';

export function StringRowForm({ item, onUpdate }: BaseRowColumnFormProps) {
    const { control, handleSubmit, watch, formState: { isDirty } } = useForm<StringRowFormData>({
        defaultValues: {
            code: item.code,
            label: item.label,
            options: {
                condition: (item.options as BaseRowColumnOptions)?.condition || undefined,
                noRandomize: (item.options as BaseRowColumnOptions)?.noRandomize || false,
            },
        },
        mode: 'onChange',
    });

    const onSubmit = (data: StringRowFormData) => {
        const updatedItem = {
            ...item,
            code: data.code,
            label: data.label,
            options: data.options,
        };
        onUpdate(updatedItem);
    };

    const generateCodeFromLabel = (label: string) => {
        return label
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '') || `row_${item.index + 1}`;
    };

    const labelValue = watch('label');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label htmlFor="label" className="text-sm font-medium">
                        Row Label *
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
                                placeholder="Enter row label"
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="code" className="text-sm font-medium">
                        Row Code *
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
                                placeholder="row_code"
                                value={field.value || generateCodeFromLabel(labelValue || '')}
                            />
                        )}
                    />
                </div>
            </div>

            {/* String Row Options */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium">Row Options</h4>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">No Randomize</label>
                            <p className="text-xs text-muted-foreground">
                                Keep this row in fixed position when randomizing
                            </p>
                        </div>
                        <Controller
                            name="options.noRandomize"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value || false}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t">
                <Button
                    type="submit"
                    disabled={!isDirty}
                    size="sm"
                    className="w-full"
                >
                    Update Row
                </Button>
            </div>
        </form>
    );
}