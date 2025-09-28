import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@ui/atoms/Input';
import { Switch } from '@ui/atoms/Switch';
import { Button } from '@ui/atoms/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@ui/molecules/Sheet';
import type {
    ElementRow,
    ElementColumn,
    BaseRowColumnOptions,
    QuestionRowOptionsChoice,
    QuestionColumnOptionsChoice
} from '../../survey-types';
import type { QuestionType } from '../types';
import { cn } from '@lib/utils';

// Base form data interface
interface BaseRowColumnFormData {
    code: string;
    label: string;
    options: any;
}

// Factory function to get the appropriate form component based on question type
function createRowColumnForm(questionType: QuestionType, itemType: 'row' | 'column') {
    const formKey = `${questionType}_${itemType}` as const;

    const formComponents = {
        'choice_row': ChoiceRowForm,
        'choice_column': ChoiceColumnForm,
        'string_row': BaseRowColumnForm,
        'string_column': BaseRowColumnForm,
        'number_row': BaseRowColumnForm,
        'number_column': BaseRowColumnForm,
        // Add more combinations as needed
    } as const;

    return formComponents[formKey as keyof typeof formComponents] || BaseRowColumnForm;
}

// Base Row/Column Form Component
interface BaseRowColumnFormProps {
    item: ElementRow<any> | ElementColumn<any>;
    onUpdate: (item: ElementRow<any> | ElementColumn<any>) => void;
    questionType: QuestionType;
    itemType: 'row' | 'column';
}

function BaseRowColumnForm({ item, onUpdate, questionType, itemType }: BaseRowColumnFormProps) {
    const { control, handleSubmit, watch, setValue, formState: { isDirty } } = useForm<BaseRowColumnFormData>({
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
                                placeholder={`Enter ${itemType} label`}
                                onChange={(e) => {
                                    field.onChange(e);
                                    // Auto-generate code from label
                                    const newCode = generateCodeFromLabel(e.target.value);
                                    setValue('code', newCode);
                                }}
                            />
                        )}
                    />
                </div>

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
                    Update {itemType}
                </Button>
            </div>
        </form>
    );
}

// Choice-specific Row Form
function ChoiceRowForm({ item, onUpdate, questionType, itemType }: BaseRowColumnFormProps) {
    const { control, handleSubmit, formState: { isDirty } } = useForm<BaseRowColumnFormData & {
        options: QuestionRowOptionsChoice;
    }>({
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

    const onSubmit = (data: any) => {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 gap-4">
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
                                placeholder="Enter response option"
                            />
                        )}
                    />
                </div>

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
                    <div className="flex items-center space-x-2">
                        <Controller
                            name="options.exclusive"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value || false}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                        <label className="text-sm">Exclusive option</label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        When selected, this option will deselect all other options
                    </p>

                    <div className="flex items-center space-x-2">
                        <Controller
                            name="options.noRandomize"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value || false}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                        <label className="text-sm">Don't randomize</label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Keep this option in its original position when randomizing
                    </p>
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

// Choice-specific Column Form
function ChoiceColumnForm({ item, onUpdate, questionType, itemType }: BaseRowColumnFormProps) {
    const { control, handleSubmit, formState: { isDirty } } = useForm<BaseRowColumnFormData & {
        options: QuestionColumnOptionsChoice;
    }>({
        defaultValues: {
            code: item.code,
            label: item.label,
            options: {
                exclusive: (item.options as QuestionColumnOptionsChoice)?.exclusive || false,
                condition: (item.options as QuestionColumnOptionsChoice)?.condition || undefined,
                noRandomize: (item.options as QuestionColumnOptionsChoice)?.noRandomize || false,
            },
        },
        mode: 'onChange',
    });

    const onSubmit = (data: any) => {
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
                                placeholder="Enter question item"
                            />
                        )}
                    />
                </div>

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
                                placeholder="question_code"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Choice Column Options */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium">Column Options</h4>

                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Controller
                            name="options.exclusive"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value || false}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                        <label className="text-sm">Exclusive column</label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        When selected, this column will deselect all other columns in the same row
                    </p>

                    <div className="flex items-center space-x-2">
                        <Controller
                            name="options.noRandomize"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value || false}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                        <label className="text-sm">Don't randomize</label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Keep this column in its original position when randomizing
                    </p>
                </div>
            </div>

            <div className="pt-4 border-t">
                <Button
                    type="submit"
                    disabled={!isDirty}
                    size="sm"
                    className="w-full"
                >
                    Update Question Item
                </Button>
            </div>
        </form>
    );
}

// Main Factory Component
interface RowColumnFormFactoryProps {
    item: ElementRow<any> | ElementColumn<any>;
    onUpdate: (item: ElementRow<any> | ElementColumn<any>) => void;
    questionType: QuestionType;
    itemType: 'row' | 'column';
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function RowColumnFormFactory({
    item,
    onUpdate,
    questionType,
    itemType,
    trigger,
    open,
    onOpenChange,
}: RowColumnFormFactoryProps) {
    const [isOpen, setIsOpen] = useState(open || false);

    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open);
        }
    }, [open]);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
    };

    const handleUpdate = (updatedItem: ElementRow<any> | ElementColumn<any>) => {
        onUpdate(updatedItem);
        handleOpenChange(false);
    };

    // Get the appropriate form component
    const FormComponent = createRowColumnForm(questionType, itemType);

    const title = itemType === 'row'
        ? `Edit ${questionType === 'choice' ? 'Response Option' : 'Row Item'}`
        : `Edit ${questionType === 'choice' ? 'Question Item' : 'Column Item'}`;

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
            <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                {item.label || `${itemType} ${item.index + 1}`}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormComponent
                                item={item}
                                onUpdate={handleUpdate}
                                questionType={questionType}
                                itemType={itemType}
                            />
                        </CardContent>
                    </Card>
                </div>
            </SheetContent>
        </Sheet>
    );
}

// Export all components for direct use if needed
export {
    BaseRowColumnForm,
    ChoiceRowForm,
    ChoiceColumnForm,
    createRowColumnForm,
};

// Export types
export type {
    BaseRowColumnFormProps,
    BaseRowColumnFormData,
    RowColumnFormFactoryProps,
};