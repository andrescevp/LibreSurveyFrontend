import { useState } from 'react';
import { Button } from '@ui/atoms/Button';
import { Card } from '@ui/molecules/Card';
import { DragHandle } from '../atoms/DragHandle';
import { DeleteButton } from '../atoms/DeleteButton';
import { DepthIndicator } from '../atoms/DepthIndicator';
import { AddQuestionButton } from '../atoms/AddQuestionButton';
import { ChevronDown, ChevronRight, Copy } from 'lucide-react';
import { cn } from '@lib/utils';
import type { QuestionnaireItem } from '../types';
import { QUESTION_TYPES } from '../types';

interface QuestionItemListProps {
    items: QuestionnaireItem[];
    onUpdate: (items: QuestionnaireItem[]) => void;
    onSelectItem?: (item: QuestionnaireItem, index: number) => void;
    selectedIndex?: number;
    onAddItem?: (type: QuestionnaireItem['type'], parentIndex?: number) => void;
    className?: string;
}

interface QuestionItemProps {
    item: QuestionnaireItem;
    index: number;
    depth: number;
    onSelect?: () => void;
    onDelete: () => void;
    onDuplicate?: () => void;
    onToggleCollapse?: () => void;
    onAddChild?: (type: QuestionnaireItem['type']) => void;
    isSelected?: boolean;
    isCollapsed?: boolean;
    canHaveChildren?: boolean;
}

function QuestionItem({
    item,
    depth,
    onSelect,
    onDelete,
    onDuplicate,
    onToggleCollapse,
    onAddChild,
    isSelected,
    isCollapsed,
    canHaveChildren,
}: QuestionItemProps) {
    const questionType = QUESTION_TYPES.find(t => t.value === item.type);
    const hasChildren = ('children' in item && item.children && item.children.length > 0);
    const itemLabel = (item as any).label || `${questionType?.label || item.type} (${item.code})`;

    return (
        <div className="space-y-1">
            <Card
                className={cn(
                    'p-3 cursor-pointer transition-all border-l-4 hover:shadow-sm',
                    isSelected
                        ? 'border-l-primary shadow-sm bg-accent/50'
                        : 'border-l-transparent hover:border-l-muted-foreground/20',
                    depth > 0 && 'ml-6'
                )}
                onClick={onSelect}
            >
                <div className="flex items-center gap-2">
                    <DepthIndicator depth={depth} />

                    <DragHandle />

                    {canHaveChildren && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 p-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleCollapse?.();
                            }}
                        >
                            {hasChildren ? (
                                isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            ) : (
                                <div className="w-4 h-4" />
                            )}
                        </Button>
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{questionType?.icon}</span>
                            <div className="min-w-0 flex-1">
                                <div className="font-medium text-sm truncate">
                                    {itemLabel}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {item.code} • {questionType?.label || item.type}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {(item as any).options?.condition && (
                            <div className="w-2 h-2 bg-primary rounded-full" title="Has conditions" />
                        )}

                        {(item as any).options?.required && (
                            <div className="text-xs text-destructive font-medium">*</div>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 p-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDuplicate?.();
                            }}
                            title="Duplicate"
                        >
                            <Copy className="w-3 h-3" />
                        </Button>

                        <DeleteButton
                            onDelete={() => onDelete()}
                            size="icon"
                            className="w-6 h-6 p-0"
                        />
                    </div>
                </div>
            </Card>

            {hasChildren && !isCollapsed && 'children' in item && (
                <div className="space-y-1">
                    {item.children!.map((child, childIndex) => (
                        <QuestionItem
                            key={child.id}
                            item={child}
                            index={childIndex}
                            depth={depth + 1}
                            onSelect={() => onSelect?.()}
                            onDelete={() => {/* handle child delete */ }}
                            onDuplicate={() => {/* handle child duplicate */ }}
                            onToggleCollapse={() => {/* handle child collapse */ }}
                            canHaveChildren={['block', 'loop'].includes(child.type)}
                        />
                    ))}

                    {canHaveChildren && onAddChild && (
                        <div className="ml-6 pt-2">
                            <AddQuestionButton
                                onAdd={onAddChild}
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                            >
                                Add nested item
                            </AddQuestionButton>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function QuestionItemList({
    items,
    onUpdate,
    onSelectItem,
    selectedIndex,
    onAddItem,
    className,
}: QuestionItemListProps) {
    const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());

    const handleToggleCollapse = (itemId: string) => {
        const newCollapsed = new Set(collapsedItems);
        if (newCollapsed.has(itemId)) {
            newCollapsed.delete(itemId);
        } else {
            newCollapsed.add(itemId);
        }
        setCollapsedItems(newCollapsed);
    };



    const handleDeleteItem = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        onUpdate(newItems);
    };

    const handleDuplicateItem = (index: number) => {
        const item = items[index];
        const duplicatedItem = {
            ...item,
            id: `${item.id}_copy_${Date.now()}`,
            code: `${item.code}_copy`,
        };

        const newItems = [...items];
        newItems.splice(index + 1, 0, duplicatedItem);
        onUpdate(newItems);
    };

    const handleAddChildItem = (parentIndex: number, type: QuestionnaireItem['type']) => {
        onAddItem?.(type, parentIndex);
    };

    return (
        <div className={cn('space-y-2', className)}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Questions</h3>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            if (collapsedItems.size === items.length) {
                                setCollapsedItems(new Set());
                            } else {
                                setCollapsedItems(new Set(items.map(item => item.id)));
                            }
                        }}
                    >
                        {collapsedItems.size === items.length ? 'Expand All' : 'Collapse All'}
                    </Button>
                </div>
            </div>

            {items.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                    <p className="mb-4">No questions yet. Add your first question to get started.</p>
                    {onAddItem && (
                        <AddQuestionButton onAdd={onAddItem} />
                    )}
                </Card>
            ) : (
                <div className="space-y-1">
                    {items.map((item, index) => (
                        <QuestionItem
                            key={item.id}
                            item={item}
                            index={index}
                            depth={0}
                            onSelect={() => onSelectItem?.(item, index)}
                            onDelete={() => handleDeleteItem(index)}
                            onDuplicate={() => handleDuplicateItem(index)}
                            onToggleCollapse={() => handleToggleCollapse(item.id)}
                            onAddChild={(type) => handleAddChildItem(index, type)}
                            isSelected={selectedIndex === index}
                            isCollapsed={collapsedItems.has(item.id)}
                            canHaveChildren={['block', 'loop'].includes(item.type)}
                        />
                    ))}

                    <div className="pt-4">
                        {onAddItem && (
                            <AddQuestionButton
                                onAdd={onAddItem}
                                className="w-full"
                            >
                                Add Question
                            </AddQuestionButton>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}