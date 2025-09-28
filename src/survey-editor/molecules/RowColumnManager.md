# RowColumnManager Component

A reusable component for managing collections of `ElementRow` and `ElementColumn` items in survey questions. This component provides a comprehensive interface for adding, editing, deleting, and reordering row and column items for matrix-style questions.

## Features

- ✅ **Add/Edit/Delete Items**: Full CRUD operations for rows and columns
- ✅ **Reordering**: Move items up/down with visual controls
- ✅ **Inline Editing**: Edit labels directly in the interface
- ✅ **Validation**: Enforce minimum and maximum item limits
- ✅ **Auto-generated Codes**: Automatic code generation based on labels
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Accessibility**: Full keyboard navigation and screen reader support
- ✅ **Type Safety**: Full TypeScript support with proper generic typing

## Usage

### Basic Usage

```tsx
import { RowColumnManager } from '@survey-editor/molecules';
import type { ElementRow, BaseRowColumnOptions } from '@survey-types';

function MyQuestionForm() {
    const [rows, setRows] = useState<ElementRow<BaseRowColumnOptions>[]>([]);

    return (
        <RowColumnManager
            title="Response Options"
            items={rows}
            onUpdate={setRows}
            type="rows"
            placeholder="Enter response option"
        />
    );
}
```

### With Constraints

```tsx
<RowColumnManager
    title="Satisfaction Levels (2-5 options)"
    items={rows}
    onUpdate={setRows}
    type="rows"
    minItems={2}
    maxItems={5}
    placeholder="Enter satisfaction level"
/>
```

### For Choice Questions

```tsx
// In ChoiceQuestionForm.tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <RowColumnManager
        title="Response Options"
        items={question.rows || []}
        onUpdate={(rows) => onUpdate({ ...question, rows })}
        type="rows"
        minItems={1}
        maxItems={20}
        placeholder="Enter response option"
    />

    <RowColumnManager
        title="Question Items"
        items={question.columns || []}
        onUpdate={(columns) => onUpdate({ ...question, columns })}
        type="columns"
        minItems={0}
        maxItems={50}
        placeholder="Enter question item"
    />
</div>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Display title for the manager section |
| `items` | `Array<ElementRow<T> \| ElementColumn<T>>` | Yes | - | Current array of items to manage |
| `onUpdate` | `(items: Array<ElementRow<T> \| ElementColumn<T>>) => void` | Yes | - | Callback when items are updated |
| `type` | `'rows' \| 'columns'` | Yes | - | Type of items being managed |
| `maxItems` | `number` | No | `50` | Maximum number of items allowed |
| `minItems` | `number` | No | `0` | Minimum number of items required |
| `className` | `string` | No | - | Additional CSS classes |
| `placeholder` | `string` | No | `'Enter label'` | Placeholder text for input fields |

## Item Structure

Each item managed by the component must conform to the `ElementRow` or `ElementColumn` interface:

```typescript
interface ElementRow<T> extends SortableItem {
    label: string;
    options?: T | null;
}

interface ElementColumn<T> extends SortableItem {
    label: string;
    options?: T | null;
}

interface SortableItem {
    id: string;                    // Auto-generated unique identifier
    code: string;                  // Auto-generated from label
    parentIndex?: number | null;   // Parent container index
    index: number;                 // Position in the list
    depth: number;                 // Nesting depth
    isLast: boolean;              // Whether this is the last item
    parentIndexes?: number[] | null; // Array of parent indexes
}
```

## Code Generation

The component automatically generates codes for items based on their labels:

- Converts to lowercase
- Replaces non-alphanumeric characters with underscores
- Removes consecutive underscores
- Falls back to `{type}_${index}` if label is empty

Examples:
- "Very Satisfied" → `very_satisfied`
- "Price ($/unit)" → `price_unit`
- "" → `row_1` (for first row)

## Keyboard Shortcuts

- **Enter**: Save current edit
- **Escape**: Cancel current edit
- **Tab**: Navigate between elements

## Integration with Question Forms

The component is designed to integrate seamlessly with the existing question form architecture:

### ChoiceQuestionForm
- **Rows**: Response options (e.g., "Yes", "No", "Maybe")
- **Columns**: Question items for matrix questions (e.g., "Price", "Quality", "Service")

### NumberQuestionForm  
- **Rows**: Question items for numeric matrix
- **Columns**: Number column headers (e.g., "Q1 2024", "Q2 2024")

### StringQuestionForm
- **Rows**: Question items for text matrix
- **Columns**: Text column headers

## Styling

The component uses the project's design system tokens:

- **Colors**: Uses semantic color tokens (`bg-background`, `text-foreground`, etc.)
- **Spacing**: Follows consistent spacing scale
- **Borders**: Uses `--radius` CSS custom property
- **Focus States**: Includes visible focus indicators

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Logical tab order
- **Color Contrast**: Meets WCAG guidelines
- **Screen Reader Announcements**: Status updates for dynamic content

## Future Enhancements

### Drag and Drop (Planned)
- Install `react-beautiful-dnd` or similar library
- Replace up/down buttons with drag handles
- Visual drag indicators and drop zones

### Advanced Features (Planned)
- Bulk operations (delete multiple, import/export)
- Item templates and presets
- Advanced validation rules
- Conditional item display
- Item grouping and categorization

## Related Components

- **ConditionBuilder**: For adding conditional logic to items
- **QuestionTypeSelector**: For changing question types
- **ValidationErrorsPanel**: For displaying validation errors

## Examples

See the Storybook stories for comprehensive examples:
- Basic row/column management
- Empty state handling
- Constraint enforcement
- Matrix question setup