# Question Form Factory Pattern

This directory contains the refactored question form components using the Factory Pattern. Each questionnaire item type now has its own dedicated form component, making the codebase more maintainable and extensible.

## Architecture Overview

### Factory Pattern Implementation

The `QuestionFormFactory` uses the Factory Pattern to instantiate the appropriate form component based on the question type:

```typescript
// Usage
<QuestionFormFactory
    question={questionItem}
    onUpdate={handleUpdate}
    availableQuestions={availableQuestions}
/>
```

### Component Structure

```
question-forms/
├── BaseQuestionForm.ts          # Common interfaces and utilities
├── QuestionFormFactory.tsx     # Factory component and creation logic
├── StringQuestionForm.tsx      # Text input questions
├── NumberQuestionForm.tsx      # Numeric input questions  
├── ChoiceQuestionForm.tsx      # Multiple choice questions
├── BlockForm.tsx               # Block containers
├── LoopForm.tsx                # Loop containers
├── TextForm.tsx                # Static text elements
├── BreakPageForm.tsx           # Page break elements
├── MarkerForm.tsx              # Conditional markers
├── QuotaForm.tsx               # Response quotas
├── TerminationForm.tsx         # Survey termination
├── index.ts                    # Barrel exports
└── QuestionFormFactory.stories.tsx # Storybook demonstrations
```

## Benefits of This Architecture

### 1. **Separation of Concerns**
Each question type has its own component with type-specific logic and options.

### 2. **Maintainability** 
- Easy to modify individual question types without affecting others
- Clear boundaries between different question configurations
- Each component stays under 150 lines as per coding guidelines

### 3. **Extensibility**
- Adding new question types only requires creating a new form component
- Factory automatically handles routing to the correct component
- No need to modify existing code when adding new types

### 4. **Type Safety**
- Each form component has its own strongly-typed interface
- Prevents configuration mismatches between question types
- Better IDE support and error detection

### 5. **Reusability**
- Individual form components can be used directly when needed
- Factory provides convenience wrapper for dynamic usage
- Components are self-contained and portable

## Component Details

### Base Components

#### `BaseQuestionForm.ts`
Contains shared interfaces and utility functions:
- `BaseQuestionFormProps` - Common props interface
- `BaseFormData` - Common form data structure
- `createBaseFormData()` - Creates default form data
- `updateQuestionWithFormData()` - Updates question with form data
- `updateQuestionCondition()` - Updates question conditions

#### `QuestionFormFactory.tsx`
The main factory component:
- `createQuestionForm()` - Returns appropriate component class
- `QuestionFormFactory` - React component that renders the correct form
- Handles all question types with fallback to StringQuestionForm

### Question-Specific Components

Each component includes:
- **Basic Fields**: Code, type, label (where applicable)
- **Help Text**: For question types that support it
- **Specific Options**: Tailored to each question type's capabilities
- **Condition Builder**: For setting display/logic conditions
- **Form Validation**: Type-specific validation rules

#### Question Types Supported:
- **string**: Text input with multiline, validation, placeholders
- **number**: Numeric input with min/max, decimals, fixed values
- **choice**: Multiple choice with selection limits and options
- **block**: Container elements with label visibility
- **loop**: Repeating question containers
- **text**: Static content display
- **breakPage**: Page break elements (minimal config)
- **marker**: Conditional markers for survey logic
- **quota**: Response quota management
- **termination**: Survey termination conditions

## Usage Examples

### Direct Component Usage
```typescript
import { StringQuestionForm } from './question-forms';

<StringQuestionForm
    question={stringQuestion}
    onUpdate={handleUpdate}
    availableQuestions={questions}
/>
```

### Factory Usage (Recommended)
```typescript
import { QuestionFormFactory } from './question-forms';

<QuestionFormFactory
    question={dynamicQuestion}
    onUpdate={handleUpdate}  
    availableQuestions={questions}
/>
```

### Dynamic Type Switching
The factory automatically handles question type changes:

```typescript
// When user changes type from 'string' to 'number' via QuestionTypeSelector:
// 1. Factory detects the type change
// 2. Automatically transforms question data structure
// 3. Switches to NumberQuestionForm component
// 4. Preserves valid properties, adds type-specific defaults
```

### Creating New Question Types
1. Create new form component following existing patterns
2. Add to factory's `formComponents` mapping
3. Export from `index.ts`
4. Add to main survey-editor exports

## Dynamic Type Switching

### How It Works

The `QuestionFormFactory` includes intelligent type switching that automatically:

1. **Detects Type Changes**: Monitors when `QuestionTypeSelector` changes the question type
2. **Transforms Data Structure**: Automatically restructures question data for the new type
3. **Switches Components**: Seamlessly transitions to the appropriate form component
4. **Preserves Data**: Maintains valid properties while adding type-specific defaults

### Transformation Rules

When switching between types, the factory applies these transformations:

#### Property Management
- **Labels**: Added for all types except `breakPage`
- **Help Text**: Added for question types (`string`, `number`, `choice`)
- **Children**: Added for container types (`block`, `loop`)
- **Rows/Columns**: Added for `choice` questions
- **Options**: Reset to type-appropriate defaults

#### Default Values
Each question type gets sensible defaults:
- **String**: `required: false`, `multiline: false`, placeholder text
- **Number**: `integer: true`, no min/max limits, N/A option support
- **Choice**: `multipleSelection: false`, no selection limits
- **Block**: `showLabel: true`
- **Containers**: Empty children arrays
- **Flow Control**: Minimal configuration

### State Management

The factory uses React state to:
- Track current question data internally
- Detect type changes through prop comparison
- Apply transformations before component switching
- Ensure smooth UI transitions without flickering

## Integration with Existing Code

The refactored `QuestionFormControls.tsx` now simply wraps the factory:

```typescript
export function QuestionFormControls(props) {
    return <QuestionFormFactory {...props} />;
}
```

All existing code continues to work while gaining dynamic switching capabilities.

## Storybook Integration

All form components are demonstrated in `QuestionFormFactory.stories.tsx` with realistic examples for each question type, making it easy to:
- Test individual components
- Document component behavior
- Verify styling consistency
- Debug form interactions

## Future Enhancements

1. **Validation System**: Integrate with survey validation system
2. **Form Plugins**: Allow extending forms with custom field types  
3. **Conditional Fields**: Hide/show fields based on other field values
4. **Import/Export**: Support for question template import/export
5. **Localization**: Multi-language support for form labels and help text