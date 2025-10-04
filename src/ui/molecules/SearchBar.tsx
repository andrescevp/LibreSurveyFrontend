import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@lib/utils';
import { Input } from '@ui/atoms/Input';

interface SearchBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    maxWidth?: boolean;
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
    ({
        className,
        placeholder = 'Search...',
        value,
        onChange,
        onSearch,
        maxWidth = true,
        ...props
    }, ref) => {
        const [searchQuery, setSearchQuery] = React.useState(value || '');

        React.useEffect(() => {
            if (value !== undefined) {
                setSearchQuery(value);
            }
        }, [value]);

        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setSearchQuery(newValue);
            onChange?.(newValue);
            onSearch?.(newValue);
        };

        return (
            <div
                className={cn(
                    'relative',
                    maxWidth && 'flex-1 max-w-md',
                    className
                )}
                ref={ref}
                {...props}
            >
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-9 bg-muted/50 border-0 focus:bg-background"
                />
            </div>
        );
    }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
export type { SearchBarProps };