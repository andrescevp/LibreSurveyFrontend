import React from 'react';
import ReactSelect from 'react-select';
import type { Props as ReactSelectProps, StylesConfig } from 'react-select';
import { cn } from '@lib/utils';

interface SelectOption {
    value: string | number;
    label: string;
    isDisabled?: boolean;
}

interface SelectProps extends Omit<ReactSelectProps<SelectOption, false>, 'classNames' | 'styles'> {
    className?: string;
    error?: boolean | string | React.ReactNode | React.ReactNode[];
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'ghost';
}

const Select = React.forwardRef<any, SelectProps>(
    (props, ref) => {
        const {
            className,
            error,
            size = 'md',
            variant = 'default',
            isDisabled = false,
            placeholder = 'Select...',
            ...rest
        } = props;

        const hasError = error !== undefined && error !== false;

        // Custom styles for react-select to match design system
        const customStyles: StylesConfig<SelectOption> = {
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
            placeholder: (provided) => ({
                ...provided,
                color: 'var(--muted-foreground)',
                fontSize: size === 'sm' ? '14px' : size === 'lg' ? '16px' : '14px',
            }),
            singleValue: (provided) => ({
                ...provided,
                color: 'var(--foreground)',
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
                // backgroundColor: 'var(--background)',
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
                '&:hover': {
                    backgroundColor: 'var(--accent) / 0.5',
                },
                '&:active': {
                    backgroundColor: 'var(--accent)',
                },
            }),
            multiValue: (provided) => ({
                ...provided,
                backgroundColor: 'var(--secondary)',
                borderRadius: 'calc(var(--radius) - 2px)',
            }),
            multiValueLabel: (provided) => ({
                ...provided,
                color: 'var(--secondary-foreground)',
                fontSize: size === 'sm' ? '12px' : '14px',
            }),
            multiValueRemove: (provided) => ({
                ...provided,
                color: 'var(--secondary-foreground)',
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
                <ReactSelect<SelectOption>
                    ref={ref}
                    styles={customStyles}
                    isDisabled={isDisabled}
                    placeholder={placeholder}
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

Select.displayName = 'Select';

export { Select };
export type { SelectProps, SelectOption };