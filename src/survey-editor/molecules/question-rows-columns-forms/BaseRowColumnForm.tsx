import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Button } from '@ui/atoms/Button';
import type { BaseRowColumnFormProps, BaseRowColumnFormData } from './types';

export function BaseRowColumnForm({ item, onUpdate, itemType }: BaseRowColumnFormProps) {
    const { control, handleSubmit, watch, formState: { isDirty } } = useForm<BaseRowColumnFormData>({
        defaultValues: {
            code: item.code,
            label: item.label,
            options: item.options || {},
        },
        mode: 'onChange',
    });

    const onSubmit = (data: BaseRowColumnFormData) => {
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
            .replace(/^_|_$/g, '') || `${itemType}_${item.index + 1}`;
    };

    const labelValue = watch('label');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label htmlFor="label" className="text-sm font-medium">
                        {itemType === 'row' ? 'Row Label' : 'Column Label'} *
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
                                placeholder={`Enter ${itemType} label`}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="code" className="text-sm font-medium">
                        {itemType === 'row' ? 'Row Code' : 'Column Code'} *
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
                                placeholder={`${itemType}_code`}
                                value={field.value || generateCodeFromLabel(labelValue || '')}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="pt-4 border-t">
                <Button
                    type="submit"
                    disabled={!isDirty}
                    size="sm"
                    className="w-full"
                >
                    Update {itemType === 'row' ? 'Row' : 'Column'}
                </Button>
            </div>
        </form>
    );
}