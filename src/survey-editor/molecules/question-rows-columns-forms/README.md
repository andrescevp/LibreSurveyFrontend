# Question Row/Column Forms

This directory contains specialized form components for editing row and column items in matrix questions. These forms are used by the `RowColumnManager` component to provide type-specific editing interfaces.

## Architecture

The forms follow a factory pattern similar to the main question forms:

### Factory Function
```typescript
createRowColumnForm(questionType: QuestionType, itemType: 'row' | 'column')
```

This function returns the appropriate form component based on:
- **Question Type**: 'choice', 'string', 'number', etc.
- **Item Type**: 'row' or 'column'

### Form Components

#### Base Forms
- **`BaseRowColumnForm`**: Default form for basic row/column items
- Used for simple text/number questions where rows/columns just need label and code

#### Choice-Specific Forms
- **`ChoiceRowForm`**: For response options in choice questions
  - Supports exclusive selection
  - No randomize option
  - Condition support (future)
  
- **`ChoiceColumnForm`**: For question items in choice questions
  - Similar options to row form
  - Adapted UI labels for columns

#### String/Number-Specific Forms
- **`StringRowForm`** / **`StringColumnForm`**: Basic forms with minimal options
- **`NumberRowForm`** / **`NumberColumnForm`**: Similar to string forms
- Inherit from base form with question-type specific enhancements

## Form Data Interfaces

Each form has its own data interface:

```typescript
interface BaseRowColumnFormData {
    code: string;
    label: string;
    options: any;
}

interface ChoiceRowFormData extends BaseRowColumnFormData {
    options: QuestionRowOptionsChoice;
}

interface ChoiceColumnFormData extends BaseRowColumnFormData {
    options: QuestionColumnOptionsChoice;
}
```

## Integration

### With RowColumnManager
The `RowColumnManager` uses `RowColumnFormFactory` to provide editing capabilities:

```typescript
<RowColumnFormFactory
    item={item}
    onUpdate={handleUpdate}
    questionType="choice"
    itemType="row"
    trigger={<Button>Edit</Button>}
/>
```

### With Question Forms
Question forms (NumberQuestionForm, StringQuestionForm, ChoiceQuestionForm) use RowColumnManager which in turn uses these specialized forms.

## Benefits

1. **Type-Specific UX**: Each question type gets appropriate editing options
2. **Code Reusability**: Shared base components reduce duplication
3. **Maintainability**: Separated concerns make forms easier to modify
4. **Extensibility**: Easy to add new question types or options

## Example Usage

```typescript
// In a matrix question editor
const FormComponent = createRowColumnForm('choice', 'row');

<FormComponent
    item={choiceRow}
    onUpdate={handleRowUpdate}
    questionType="choice"
    itemType="row"
/>
```

## Future Enhancements

- Condition builder integration for row/column visibility
- Advanced validation rules
- Bulk editing capabilities
- Import/export functionality