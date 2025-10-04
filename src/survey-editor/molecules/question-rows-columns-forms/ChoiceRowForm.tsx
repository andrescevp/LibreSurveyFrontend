import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Button } from '@ui/atoms/Button';
import { Switch } from '@ui/atoms/Switch';
import type { BaseRowColumnFormProps, ChoiceRowFormData } from './types';
import type { QuestionRowOptionsChoice } from '../../../survey-types';

export function ChoiceRowForm({ item, onUpdate }: BaseRowColumnFormProps) {
    const { control, handleSubmit, formState: { isDirty } } = useForm<ChoiceRowFormData>({
        defaultValues: {
            code: item.code,
            label: item.label,
            options: {
                exclusive: (item.options as QuestionRowOptionsChoice)?.exclusive || false,
                condition: (item.options as QuestionRowOptionsChoice)?.condition || undefined,
                noRandomize: (item.options as QuestionRowOptionsChoice)?.noRandomize || false,
            },
        },
        mode: 'onChange',
    });

    const onSubmit = (data: ChoiceRowFormData) => {
        const updatedItem = {
            ...item,
            code: data.code,
            label: data.label,
            options: data.options,
        };
        onUpdate(updatedItem);
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label htmlFor="label" className="text-sm font-medium">
                        Response Option Label *
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
                                placeholder="Enter response option"
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="code" className="text-sm font-medium">
                        Response Code *
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
                                placeholder="response_code"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Choice-specific Options */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium">Response Options</h4>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">Exclusive Selection</label>
                            <p className="text-xs text-muted-foreground">
                                If enabled, selecting this option will deselect all others
                            </p>
                        </div>
                        <Controller
                            name="options.exclusive"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value || false}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">No Randomize</label>
                            <p className="text-xs text-muted-foreground">
                                Keep this option in fixed position when randomizing
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
                    Update Response Option
                </Button>
            </div>
        </form>
    );
}