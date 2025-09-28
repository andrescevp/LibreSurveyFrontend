import { Button } from '@ui/atoms/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@ui/molecules/Dropdown';
import { ChevronDown } from 'lucide-react';
import { cn } from '@lib/utils';
import {
    QUESTION_TYPES,
    QUESTIONNAIRE_ITEMS_WITH_CHILDREN,
    QUESTIONNAIRE_ITEMS_FLOW,
    QUESTIONNAIRE_ITEMS_MISC,
    type QuestionType
} from '../types';

interface QuestionTypeSelectorProps {
    value: QuestionType;
    onChange: (type: QuestionType) => void;
    disabled?: boolean;
    className?: string;
}

export function QuestionTypeSelector({
    value,
    onChange,
    disabled,
    className
}: QuestionTypeSelectorProps) {
    // Find the current selected type across all categories
    const getCurrentTypeInfo = () => {
        const allTypes = [
            ...QUESTION_TYPES,
            ...QUESTIONNAIRE_ITEMS_WITH_CHILDREN,
            ...QUESTIONNAIRE_ITEMS_FLOW,
            ...QUESTIONNAIRE_ITEMS_MISC,
        ];
        return allTypes.find(type => type.value === value);
    };

    const currentType = getCurrentTypeInfo();
    const displayValue = currentType
        ? `${currentType.icon || ''} ${currentType.label}`.trim()
        : 'Select type';

    const handleTypeSelect = (selectedType: QuestionType) => {
        onChange(selectedType);
    };

    return (
        <div className={cn('w-full', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className="w-full justify-between"
                    >
                        <span className="truncate">{displayValue}</span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="start">
                    {/* Questions Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>📋 Questions</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuLabel>Interactive Questions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {QUESTION_TYPES.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => handleTypeSelect(type.value)}
                                    className={cn(
                                        'cursor-pointer',
                                        value === type.value && 'bg-accent'
                                    )}
                                >
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center gap-2">
                                            <span>{type.icon}</span>
                                            <span className="font-medium">{type.label}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">
                                            {type.description}
                                        </span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Container Elements Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>📦 Containers</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuLabel>Container Elements</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {QUESTIONNAIRE_ITEMS_WITH_CHILDREN.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => handleTypeSelect(type.value)}
                                    className={cn(
                                        'cursor-pointer',
                                        value === type.value && 'bg-accent'
                                    )}
                                >
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center gap-2">
                                            <span>{type.icon}</span>
                                            <span className="font-medium">{type.label}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">
                                            {type.description}
                                        </span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Flow Control Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>🔀 Flow Control</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuLabel>Flow Control Elements</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {QUESTIONNAIRE_ITEMS_FLOW.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => handleTypeSelect(type.value)}
                                    className={cn(
                                        'cursor-pointer',
                                        value === type.value && 'bg-accent'
                                    )}
                                >
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center gap-2">
                                            <span>{type.icon}</span>
                                            <span className="font-medium">{type.label}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">
                                            {type.description}
                                        </span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Miscellaneous Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>🏷️ Content</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuLabel>Content Elements</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {QUESTIONNAIRE_ITEMS_MISC.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => handleTypeSelect(type.value)}
                                    className={cn(
                                        'cursor-pointer',
                                        value === type.value && 'bg-accent'
                                    )}
                                >
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center gap-2">
                                            <span>{type.icon}</span>
                                            <span className="font-medium">{type.label}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">
                                            {type.description}
                                        </span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}