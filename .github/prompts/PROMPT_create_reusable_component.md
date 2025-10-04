---
mode: 'agent'
description: 'Create reusable react component following Atomic Design'
---

**Create a new reusable component or refactor an existing one using atomic design**

Ask any needed information to the user before start if it is not clear or you need more details.

**KEEP ALL COMPONENTS UNDER 150 LINE**

## Step-by-Step Instructions

### 1. Determine Component Level

Choose the appropriate atomic design level:

- **Atoms**: Basic building blocks (Button, Input, Label, Icon)
- **Molecules**: Combinations of atoms (FormField, SearchBox, Navigation Item)
- **Organisms**: Complex components (Header, SurveyForm, DataTable)
- **Templates**: Page-level layouts (PageLayout, DashboardTemplate)

### 2. Create Component File Structure

- **Subcomponents of complex components such as molecules, organisms or templates must be place in the right level**
- **Use hooks to manage the logic of components**
- **One component per file**

#### File Location Pattern:
```
src/ui/{level}/{ComponentName}.tsx
src/ui/{level}/hooks/use{Logic}.tsx
src/ui/{level}/{ComponentName}.stories.ts (optional but recommended)
src/ui/{level}/index.ts (for exports)
src/ui/{lowerLevel}/{ComponentName}/{SubComponent}.tsx
src/ui/{lowerLevel}/{ComponentName}/index.tsx
```

#### Example for an atom called "Button":
```
src/ui/atoms/Button.tsx
src/ui/atoms/hooks/useButton.tsx
src/ui/atoms/Button.stories.ts
src/ui/atoms/index.ts
```

### 3. Component Implementation Template

```tsx
import React from 'react';
import { cn } from '@lib/utils';
// Import other dependencies as needed (cva, lucide-react, etc.)

interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  // Add specific props here
  variant?: 'default' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  // For form elements, consider error prop:
  error?: boolean | string | React.ReactNode | React.ReactNode[];
}

const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  (props: ComponentNameProps, ref) => {
    const { 
      className, 
      variant = 'default',
      size = 'md',
      // destructure other props
      ...rest 
    } = props;
    
    // Calculate error state if applicable
    const hasError = error !== undefined && error !== false;
    
    return (
      <element
        className={cn(
          // Base styles using design tokens
          'base-classes-here',
          // Variant styles
          variant === 'default' && 'default-variant-classes',
          variant === 'secondary' && 'secondary-variant-classes',
          variant === 'destructive' && 'destructive-variant-classes',
          // Size styles
          size === 'sm' && 'small-size-classes',
          size === 'md' && 'medium-size-classes',
          size === 'lg' && 'large-size-classes',
          // Error styles (if applicable)
          hasError && 'error-classes',
          // Custom className
          className
        )}
        ref={ref}
        {...rest}
      >
        {/* Component content */}
      </element>
    );
  }
);

ComponentName.displayName = 'ComponentName';

export { ComponentName };
export type { ComponentNameProps };
```

### 4. Design System Token Usage

#### Always use semantic design tokens instead of hardcoded colors:

**Colors:**
```css
/* Backgrounds */
bg-background     /* Main app background */
bg-card          /* Card/panel backgrounds */
bg-primary       /* Primary action backgrounds */
bg-secondary     /* Secondary action backgrounds */
bg-muted         /* Subtle backgrounds */
bg-accent        /* Hover/selected states */
bg-destructive   /* Error/danger backgrounds - use it with text-white */
bg-input         /* Form input backgrounds */

/* Text Colors */
text-foreground           /* Primary text */
text-primary-foreground   /* Text on primary backgrounds */
text-secondary-foreground /* Text on secondary backgrounds */
text-muted-foreground     /* Subtle/secondary text */
text-destructive          /* Error/danger text */

/* Borders */
border-border     /* Default borders */
border-input      /* Form input borders */
border-ring       /* Focus ring borders */
border-destructive /* Error borders */

/* Interactive States */
ring-ring         /* Focus rings */
hover:bg-accent   /* Hover backgrounds */
focus:ring-ring   /* Focus ring color */
```

**Spacing & Sizing:**
```css
/* Use Tailwind's spacing scale */
p-2, p-4, p-6     /* Padding */
m-2, m-4, m-6     /* Margin */
gap-2, gap-4      /* Grid/flex gaps */
h-8, h-10, h-12   /* Heights */
w-full, w-auto    /* Widths */

/* Border Radius (use design system values) */
rounded-sm        /* Small radius (--radius - 4px) */
rounded-md        /* Medium radius (--radius - 2px) */
rounded-lg        /* Default radius (--radius = 0.625rem) */
rounded-xl        /* Large radius (--radius + 4px) */
```

### 5. TypeScript Interface Guidelines

#### For form elements:
```tsx
interface FormElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean | string | React.ReactNode | React.ReactNode[];
  // other specific props
}
```

#### For interactive elements:
```tsx
interface InteractiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  // other specific props
}
```

#### For container elements:
```tsx
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  // specific layout props
}
```

### 6. Export Pattern

#### Component file export:
```tsx
export { ComponentName };
export type { ComponentNameProps };
```

#### Index file pattern:
```tsx
// src/ui/atoms/index.ts
export { Input } from './Input';
export { Button } from './Button';
export { Label } from './Label';
// ... other atoms

export type { InputProps } from './Input';
export type { ButtonProps } from './Button';
export type { LabelProps } from './Label';
// ... other types
```

#### Main UI index:
```tsx
// src/ui/index.ts
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
```

### 7. Storybook Stories (Optional but Recommended)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'UI/{Level}/{ComponentName}',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // default props
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const WithError: Story = {
  args: {
    error: 'Error message here',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
```

### 8. Common Patterns

#### Error Handling Pattern:
```tsx
const hasError = error !== undefined && error !== false;

// In className:
hasError && 'border-destructive focus:border-destructive focus:ring-destructive'
```

#### Loading State Pattern:
```tsx
{loading && <LoadingSpinner />}
{loading ? 'Loading...' : children}
```

#### Conditional Rendering Pattern:
```tsx
{icon && <Icon className="mr-2" />}
{children}
{endIcon && <Icon className="ml-2" />}
```

### 9. Accessibility Guidelines

- Always include proper ARIA attributes
- Ensure keyboard navigation works
- Use semantic HTML elements when possible
- Include `displayName` for React DevTools
- Support ref forwarding for form elements

#### Accessibility Examples:
```tsx
// For buttons
<button
  type={type}
  disabled={disabled}
  aria-disabled={disabled}
  aria-label={ariaLabel}
  // ...
>

// For inputs
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? `${id}-error` : undefined}
  // ...
/>
```

### 10. Testing Considerations

- Ensure component renders without crashing
- Test all variants and states
- Test error conditions
- Test accessibility features
- Test ref forwarding

### 11. Configuration Requirements

Ensure these are configured in your project:

#### Vite Config (vite.config.ts):
```tsx
resolve: {
  alias: {
    '@ui': path.resolve(__dirname, './src/ui'),
    '@lib': path.resolve(__dirname, './src/lib'),
  },
},
```

#### TypeScript Config:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    // ... other options
  }
}
```

#### Root tsconfig.json:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@ui/*": ["./src/ui/*"],
      "@lib/*": ["./src/lib/*"]
    }
  }
}
```

## Checklist

- [ ] Created component file in correct atomic level directory
- [ ] Used proper TypeScript interface extending appropriate HTML element
- [ ] Implemented React.forwardRef for form elements
- [ ] Used design system tokens instead of hardcoded values
- [ ] Added proper className merging with `cn()` utility
- [ ] Exported component and types properly
- [ ] Updated index files for proper exports
- [ ] Created Storybook stories (optional)
- [ ] Tested component in different states
- [ ] Ensured accessibility features work
- [ ] Added proper displayName for debugging

## Design System Reference

For the complete list of available design tokens, refer to:
- `src/index.css` for color definitions
- Tailwind CSS v4 documentation for utility classes
- Project's design system documentation

## Notes

- Always prefer composition over complex prop APIs
- Keep components focused on a single responsibility
- Use consistent naming conventions across the project
- Consider performance implications for frequently used components
- Document any complex behavior or non-obvious usage patterns usign stories for Storybook