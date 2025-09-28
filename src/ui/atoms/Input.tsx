import React from 'react';
import { cn } from '@lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean | string | React.ReactNode | React.ReactNode[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { type = 'text', className, error, ...rest } = props;
    const haveError = error !== undefined && error !== false;
    
    return (
      <>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-base shadow-sm transition-colors',
            'focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'placeholder:text-muted-foreground',
            haveError && 'border-destructive focus:border-destructive focus:ring-destructive',
            className
          )}
          ref={ref}
          {...rest}
        />
      </>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };