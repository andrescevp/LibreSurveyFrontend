import { Plus, ChevronDown } from 'lucide-react';
import { Button } from '@ui/atoms/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@ui/molecules/Dropdown';
import {
    QUESTION_TYPES,
    QUESTIONNAIRE_ITEMS_WITH_CHILDREN,
    QUESTIONNAIRE_ITEMS_FLOW,
    QUESTIONNAIRE_ITEMS_MISC,
    type QuestionnaireItem,
    type QuestionType
} from '../types';
import { cn } from '@lib/utils';

interface AddQuestionButtonProps {
    onAdd: (type: QuestionnaireItem['type']) => void;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'default' | 'lg';
    children?: React.ReactNode;
    className?: string;
}

interface QuestionTypeItemProps {
    item: {
        value: QuestionType;
        label: string;
        description: string;
        icon?: string;
    };
    onSelect: (type: QuestionType) => void;
}

function QuestionTypeItem({ item, onSelect }: QuestionTypeItemProps) {
    return (
        <DropdownMenuItem
            onClick={() => onSelect(item.value)}
            className="cursor-pointer"
        >
            <div className="flex items-center gap-2">
                {item.icon && (
                    <span className="text-base" aria-hidden="true">
                        {item.icon}
                    </span>
                )}
                <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                        {item.description}
                    </span>
                </div>
            </div>
        </DropdownMenuItem>
    );
}

export function AddQuestionButton({
    onAdd,
    variant = 'outline',
    size = 'sm',
    children,
    className
}: AddQuestionButtonProps) {
    const handleSelect = (type: QuestionType) => {
        onAdd(type);
    };

    // Default text question for quick access
    const handleQuickAdd = () => {
        onAdd('string');
    };

    return (
        <div className="flex items-center">
            {/* Quick add button for default text question */}
            <Button
                variant={variant}
                size={size}
                onClick={handleQuickAdd}
                className={cn("rounded-r-none border-r-0", className)}
                aria-label="Add text question"
            >
                <Plus className="w-4 h-4 mr-1" />
                {children || 'Add Question'}
            </Button>

            {/* Dropdown for selecting specific question types */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={variant}
                        size={size}
                        className="rounded-l-none px-2"
                        aria-label="Select question type"
                    >
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                    {/* Default text question at the top */}
                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                    <QuestionTypeItem
                        item={{ value: 'text', label: 'Text', description: 'Display text content', icon: '📝' }}
                        onSelect={handleSelect}
                    />

                    <DropdownMenuSeparator />

                    {/* Question Types Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span className="mr-2">❓</span>
                            Questions
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-72">
                            {QUESTION_TYPES.map((item) => (
                                <QuestionTypeItem
                                    key={item.value}
                                    item={item}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Container Elements Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span className="mr-2">📦</span>
                            Containers
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-72">
                            {QUESTIONNAIRE_ITEMS_WITH_CHILDREN.map((item) => (
                                <QuestionTypeItem
                                    key={item.value}
                                    item={item}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Flow Control Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span className="mr-2">🔀</span>
                            Flow Control
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-72">
                            {QUESTIONNAIRE_ITEMS_FLOW.map((item) => (
                                <QuestionTypeItem
                                    key={item.value}
                                    item={item}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Miscellaneous Items Submenu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span className="mr-2">🛠️</span>
                            Other Elements
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-72">
                            {QUESTIONNAIRE_ITEMS_MISC.map((item) => (
                                <QuestionTypeItem
                                    key={item.value}
                                    item={item}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}