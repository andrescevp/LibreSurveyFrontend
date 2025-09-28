import React from 'react';
import ReactSelect from 'react-select';
import type { Props as ReactSelectProps, StylesConfig } from 'react-select';
import { cn } from '@lib/utils';

interface MultiSelectOption {
    value: string | number;
    label: string;
    isDisabled?: boolean;
}

interface MultiSelectProps extends Omit<ReactSelectProps<MultiSelectOption, true>, 'classNames' | 'styles'> {
    className?: string;
    error?: boolean | string | React.ReactNode | React.ReactNode[];
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'ghost';
    maxSelectedDisplay?: number;
    selectedDisplayFormat?: 'count' | 'truncate' | 'wrap';
}

const MultiSelect = React.forwardRef<any, MultiSelectProps>(
    (props, ref) => {
        const {
            className,
            error,
            size = 'md',
            variant = 'default',
            isDisabled = false,
            placeholder = 'Select multiple...',
            maxSelectedDisplay = 3,
            selectedDisplayFormat = 'count',
            ...rest
        } = props;

        const hasError = error !== undefined && error !== false;

        // Custom styles for react-select to match design system
        const customStyles: StylesConfig<MultiSelectOption, true> = {
            control: (provided) => ({
                ...provided,
                minHeight: size === 'sm' ? '32px' : size === 'lg' ? '44px' : '40px',
                border: 'none',
                borderRadius: 'var(--radius)',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                '&:hover': {
                    borderColor: 'transparent',
                },
            }),
            valueContainer: (provided) => ({
                ...provided,
                padding: size === 'sm' ? '0 8px' : size === 'lg' ? '0 16px' : '0 12px',
                fontSize: size === 'sm' ? '14px' : size === 'lg' ? '16px' : '14px',
                gap: '4px',
                flexWrap: selectedDisplayFormat === 'wrap' ? 'wrap' : 'nowrap',
                overflowX: selectedDisplayFormat === 'truncate' ? 'hidden' : 'visible',
            }),
            input: (provided) => ({
                ...provided,
                margin: '0px',
                color: 'var(--foreground)',
            }),
            indicatorSeparator: () => ({
                display: 'none',
            }),
            indicatorsContainer: (provided) => ({
                ...provided,
                paddingRight: size === 'sm' ? '4px' : '8px',
            }),
            dropdownIndicator: (provided, state) => ({
                ...provided,
                color: 'var(--muted-foreground)',
                padding: size === 'sm' ? '4px' : '8px',
                '&:hover': {
                    color: 'var(--foreground)',
                },
                transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
            }),
            clearIndicator: (provided) => ({
                ...provided,
                color: 'var(--muted-foreground)',
                padding: size === 'sm' ? '4px' : '8px',
                '&:hover': {
                    color: 'var(--destructive)',
                },
            }),
            placeholder: (provided) => ({
                ...provided,
                color: 'var(--muted-foreground)',
                fontSize: size === 'sm' ? '14px' : size === 'lg' ? '16px' : '14px',
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                zIndex: 50,
            }),
            menuList: (provided) => ({
                ...provided,
                padding: '4px',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                    ? 'var(--accent)'
                    : state.isFocused
                        ? 'var(--accent) / 0.5'
                        : 'transparent',
                color: state.isSelected
                    ? 'var(--accent-foreground)'
                    : 'var(--foreground)',
                borderRadius: 'calc(var(--radius) - 2px)',
                margin: '1px 0',
                padding: size === 'sm' ? '6px 8px' : size === 'lg' ? '10px 12px' : '8px 10px',
                fontSize: size === 'sm' ? '14px' : size === 'lg' ? '16px' : '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                '&:hover': {
                    backgroundColor: 'var(--accent) / 0.5',
                },
                '&:active': {
                    backgroundColor: 'var(--accent)',
                },
                // Add checkbox-like styling
                '&::before': {
                    content: '""',
                    width: '16px',
                    height: '16px',
                    border: '2px solid var(--border)',
                    borderRadius: '3px',
                    backgroundColor: state.isSelected ? 'var(--primary)' : 'transparent',
                    backgroundImage: state.isSelected
                        ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
                        : 'none',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                },
            }),
            multiValue: (provided) => ({
                ...provided,
                backgroundColor: 'var(--secondary)',
                borderRadius: 'calc(var(--radius) - 2px)',
                fontSize: size === 'sm' ? '12px' : '14px',
                maxWidth: selectedDisplayFormat === 'truncate' ? '120px' : 'none',
            }),
            multiValueLabel: (provided) => ({
                ...provided,
                color: 'var(--secondary-foreground)',
                fontSize: size === 'sm' ? '12px' : '14px',
                padding: size === 'sm' ? '2px 6px' : '4px 8px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }),
            multiValueRemove: (provided) => ({
                ...provided,
                color: 'var(--secondary-foreground)',
                borderRadius: '0 calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0',
                '&:hover': {
                    backgroundColor: 'var(--destructive)',
                    color: 'var(--destructive-foreground)',
                },
            }),
            loadingIndicator: (provided) => ({
                ...provided,
                color: 'var(--muted-foreground)',
            }),
            noOptionsMessage: (provided) => ({
                ...provided,
                color: 'var(--muted-foreground)',
                fontSize: size === 'sm' ? '14px' : size === 'lg' ? '16px' : '14px',
            }),
        };

        return (
            <div className={cn('relative', className)}>
                <ReactSelect<MultiSelectOption, true>
                    ref={ref}
                    isMulti
                    styles={customStyles}
                    isDisabled={isDisabled}
                    placeholder={placeholder}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    className={cn(
                        // Base styles
                        'relative',
                        // Variant styles
                        variant === 'default' && [
                            'border border-input bg-input',
                            'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                            hasError && 'border-destructive focus-within:ring-destructive',
                        ],
                        variant === 'ghost' && [
                            'border-0 bg-transparent',
                            'focus-within:bg-accent',
                        ],
                        // Size styles
                        size === 'sm' && 'text-sm',
                        size === 'lg' && 'text-base',
                        // Disabled styles
                        isDisabled && 'opacity-50 cursor-not-allowed',
                        // Rounded corners
                        'rounded-lg',
                    )}
                    // Custom components for better UX
                    components={{
                        DropdownIndicator: (props) => (
                            <div {...props.innerProps} className="flex items-center">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    className="transition-transform duration-200"
                                    style={{
                                        transform: props.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}
                                >
                                    <path
                                        d="M3 4.5L6 7.5L9 4.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        ),
                        ClearIndicator: (props) => (
                            <div
                                {...props.innerProps}
                                className="flex items-center cursor-pointer hover:text-destructive transition-colors"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        ),
                    }}
                    {...rest}
                />
                {hasError && typeof error === 'string' && (
                    <p className="mt-1 text-sm text-destructive">{error}</p>
                )}
                {hasError && React.isValidElement(error) && (
                    <div className="mt-1">{error}</div>
                )}
            </div>
        );
    }
);

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
export type { MultiSelectProps, MultiSelectOption };