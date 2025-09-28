import React from 'react';
import { cn } from '@lib/utils';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'size'> {
  className?: string;
  /**
   * The size of the switch
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the switch is in an error state
   */
  error?: boolean | string | React.ReactNode | React.ReactNode[];
  /**
   * Optional label for the switch
   */
  label?: string;
  /**
   * Optional description text
   */
  description?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { 
      className, 
      size = 'md',
      error,
      label,
      description,
      disabled,
      checked,
      id,
      ...rest 
    } = props;
    
    // Calculate error state
    const hasError = error !== undefined && error !== false;
    
    // Generate unique ID if not provided
    const switchId = id || React.useId();
    const errorId = hasError ? `${switchId}-error` : undefined;
    const descriptionId = description ? `${switchId}-description` : undefined;
    
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <div className="flex items-center gap-2">
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              role="switch"
              className="sr-only"
              id={switchId}
              ref={ref}
              disabled={disabled}
              checked={checked}
              aria-invalid={hasError}
              aria-describedby={cn(
                errorId,
                descriptionId
              ).trim() || undefined}
              {...rest}
            />
            <label
              htmlFor={switchId}
              className={cn(
                // Base styles
                'relative inline-flex cursor-pointer items-center rounded-full border-2 transition-all duration-200 ease-in-out',
                // Size variants
                size === 'sm' && 'h-4 w-7',
                size === 'md' && 'h-5 w-9',
                size === 'lg' && 'h-6 w-11',
                // Color states - unchecked
                'border-input bg-input',
                // Color states - checked
                'data-[checked=true]:border-primary data-[checked=true]:bg-primary',
                // Error states
                hasError && 'border-destructive data-[checked=true]:border-destructive data-[checked=true]:bg-destructive',
                // Disabled states
                disabled && 'cursor-not-allowed opacity-50',
                // Focus states
                'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background'
              )}
              data-checked={checked}
            >
              <span
                className={cn(
                  // Base thumb styles
                  'pointer-events-none block rounded-full bg-background shadow-sm transition-all duration-200 ease-in-out',
                  // Size variants for thumb
                  size === 'sm' && 'h-3 w-3',
                  size === 'md' && 'h-4 w-4',
                  size === 'lg' && 'h-5 w-5',
                  // Position - unchecked (left)
                  size === 'sm' && 'translate-x-0',
                  size === 'md' && 'translate-x-0',
                  size === 'lg' && 'translate-x-0',
                  // Position - checked (right)
                  checked && size === 'sm' && 'translate-x-3',
                  checked && size === 'md' && 'translate-x-4',
                  checked && size === 'lg' && 'translate-x-5'
                )}
              />
            </label>
          </div>
          
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'cursor-pointer text-sm font-medium text-foreground',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {description && (
          <p
            id={descriptionId}
            className={cn(
              'text-xs text-muted-foreground',
              disabled && 'opacity-50'
            )}
          >
            {description}
          </p>
        )}
        
        {hasError && typeof error === 'string' && (
          <p
            id={errorId}
            className="text-xs text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {hasError && typeof error !== 'string' && error !== true && (
          <div
            id={errorId}
            className="text-xs text-destructive"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };