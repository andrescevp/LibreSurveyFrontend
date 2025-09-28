import React from 'react';
import { cn } from '@lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean | string | React.ReactNode | React.ReactNode[];
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props: TextareaProps, ref) => {
    const { className, error, ...rest } = props;
    const hasError = error !== undefined && error !== false;
    
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-border bg-input px-3 py-2 text-base shadow-sm transition-colors',
          'focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'placeholder:text-muted-foreground',
          'resize-vertical',
          hasError && 'border-destructive focus:border-destructive focus:ring-destructive',
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };