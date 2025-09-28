import { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Edit3, Settings } from 'lucide-react';
import { Button } from '@ui/atoms/Button';
import { Input } from '@ui/atoms/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/molecules/Card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@ui/molecules/AlertDialog';
import { RowColumnFormFactory } from './RowColumnFormFactory';
import type { ElementRow, ElementColumn, BaseRowColumnOptions } from '../../survey-types';
import type { QuestionType } from '../types';
import { cn } from '@lib/utils';

interface RowColumnManagerProps<T extends BaseRowColumnOptions> {
    title: string;
    items: Array<ElementRow<T> | ElementColumn<T>>;
    onUpdate: (items: Array<ElementRow<T> | ElementColumn<T>>) => void;
    type: 'rows' | 'columns';
    questionType: QuestionType;
    maxItems?: number;
    minItems?: number;
    className?: string;
    placeholder?: string;
}

interface EditingItem {
    id: string;
    label: string;
}

export function RowColumnManager<T extends BaseRowColumnOptions>({
    title,
    items,
    onUpdate,
    type,
    questionType,
    maxItems = 50,
    minItems = 0,
    className,
    placeholder = 'Enter label'
}: RowColumnManagerProps<T>) {
    const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
    const [newItemLabel, setNewItemLabel] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);

    const generateId = () => `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const generateCode = (label: string, index: number) => {
        const cleanLabel = label.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').trim();
        return cleanLabel || `${type.slice(0, -1)}_${index + 1}`;
    };

    const createNewItem = (label: string, index: number): ElementRow<T> | ElementColumn<T> => {
        const baseItem = {
            id: generateId(),
            code: generateCode(label, index),
            label,
            parentIndex: null,
            index,
            depth: 0,
            isLast: index === items.length,
            parentIndexes: null,
            options: {} as T
        };

        return baseItem as ElementRow<T> | ElementColumn<T>;
    };

    const handleAddNew = () => {
        if (!newItemLabel.trim() || items.length >= maxItems) return;

        const newItem = createNewItem(newItemLabel.trim(), items.length);
        const updatedItems = [...items, newItem].map((item, idx) => ({
            ...item,
            index: idx,
            isLast: idx === items.length
        }));

        onUpdate(updatedItems);
        setNewItemLabel('');
        setIsAddingNew(false);
    };

    const handleEdit = (id: string, newLabel: string) => {
        if (!newLabel.trim()) return;

        const updatedItems = items.map(item =>
            item.id === id
                ? { ...item, label: newLabel.trim(), code: generateCode(newLabel.trim(), item.index) }
                : item
        );

        onUpdate(updatedItems);
        setEditingItem(null);
    };

    const handleDelete = (id: string) => {
        if (items.length <= minItems) return;

        const updatedItems = items
            .filter(item => item.id !== id)
            .map((item, idx) => ({
                ...item,
                index: idx,
                isLast: idx === items.length - 2 // -2 because we removed one item
            }));

        onUpdate(updatedItems);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;

        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];

        const updatedItems = newItems.map((item, idx) => ({
            ...item,
            index: idx,
            isLast: idx === newItems.length - 1
        }));

        onUpdate(updatedItems);
    };

    const handleMoveDown = (index: number) => {
        if (index >= items.length - 1) return;

        const newItems = [...items];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];

        const updatedItems = newItems.map((item, idx) => ({
            ...item,
            index: idx,
            isLast: idx === newItems.length - 1
        }));

        onUpdate(updatedItems);
    };

    const startEditing = (item: ElementRow<T> | ElementColumn<T>) => {
        setEditingItem({ id: item.id, label: item.label });
    };

    const cancelEditing = () => {
        setEditingItem(null);
    };

    const canDelete = items.length > minItems;
    const canAdd = items.length < maxItems;

    return (
        <Card className={cn('w-full', className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base">{title}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {items.length}/{maxItems}
                    {minItems > 0 && ` (min: ${minItems})`}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">No {type} added yet</p>
                        <p className="text-xs mt-1">Click the button below to add your first {type.slice(0, -1)}</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-2 p-3 bg-background border rounded-md transition-all"
                            >
                                <div className="flex flex-col gap-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleMoveUp(index)}
                                        disabled={index === 0}
                                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                                    >
                                        <ChevronUp size={12} />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleMoveDown(index)}
                                        disabled={index >= items.length - 1}
                                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                                    >
                                        <ChevronDown size={12} />
                                    </Button>
                                </div>

                                <div className="flex-1 min-w-0">
                                    {editingItem?.id === item.id ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={editingItem.label}
                                                onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleEdit(item.id, editingItem.label);
                                                    } else if (e.key === 'Escape') {
                                                        cancelEditing();
                                                    }
                                                }}
                                                placeholder={placeholder}
                                                autoFocus
                                                className="flex-1"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => handleEdit(item.id, editingItem.label)}
                                                disabled={!editingItem.label.trim()}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={cancelEditing}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-sm truncate">{item.label}</p>
                                                <p className="text-xs text-muted-foreground truncate">Code: {item.code}</p>
                                            </div>
                                            <div className="flex items-center gap-1 ml-2">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => startEditing(item)}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Edit3 size={14} />
                                                </Button>
                                                <RowColumnFormFactory
                                                    item={item}
                                                    onUpdate={(updatedItem) => {
                                                        const updatedItems = items.map(i =>
                                                            i.id === updatedItem.id ? updatedItem : i
                                                        );
                                                        onUpdate(updatedItems as Array<ElementRow<T> | ElementColumn<T>>);
                                                    }}
                                                    questionType={questionType}
                                                    itemType={type === 'rows' ? 'row' : 'column'}
                                                    trigger={
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Settings size={14} />
                                                        </Button>
                                                    }
                                                />
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            disabled={!canDelete}
                                                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                        >
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete {type.slice(0, -1)}</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{item.label}"? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(item.id)}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add new item section */}
                <div className="border-t pt-4">
                    {isAddingNew ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={newItemLabel}
                                onChange={(e) => setNewItemLabel(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddNew();
                                    } else if (e.key === 'Escape') {
                                        setIsAddingNew(false);
                                        setNewItemLabel('');
                                    }
                                }}
                                placeholder={placeholder}
                                autoFocus
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleAddNew}
                                disabled={!newItemLabel.trim() || !canAdd}
                            >
                                Add
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setIsAddingNew(false);
                                    setNewItemLabel('');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsAddingNew(true)}
                            disabled={!canAdd}
                            className="w-full"
                        >
                            <Plus size={16} className="mr-2" />
                            Add {type.slice(0, -1)}
                            {!canAdd && ` (${maxItems} max)`}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}