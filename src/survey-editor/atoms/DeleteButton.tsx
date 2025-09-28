import { Trash2 } from 'lucide-react';
import { Button } from '@ui/atoms/Button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@ui/molecules/AlertDialog';

interface DeleteButtonProps {
    onDelete: () => void;
    disabled?: boolean;
    size?: 'sm' | 'default' | 'lg' | 'icon';
    className?: string;
    confirmTitle?: string;
    confirmDescription?: string;
}

export function DeleteButton({
    onDelete,
    disabled,
    size = 'sm',
    className,
    confirmTitle = "Are you sure?",
    confirmDescription = "This action cannot be undone. This will permanently delete the item."
}: DeleteButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size={size}
                    disabled={disabled}
                    className={className}
                    aria-label="Delete item"
                >
                    <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {confirmDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}