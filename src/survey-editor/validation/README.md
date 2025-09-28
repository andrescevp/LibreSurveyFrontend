# Survey Validation System

A comprehensive validation system for survey structures with extensible rules, severity levels, and React hook integration.

## Features

- **Comprehensive Validation**: Validates survey metadata, question structure, code uniqueness, and more
- **Severity Levels**: Supports error, warning, and info severity levels
- **Extensible Rules**: Easy to add custom validation rules
- **React Integration**: Hooks for real-time validation in React components
- **TypeScript Support**: Full type safety with comprehensive interfaces

## Core Components

### Validation Types

- **ValidationError**: Represents a single validation issue with field, message, severity, and optional metadata
- **ValidationRule**: Interface for creating custom validation rules
- **ValidationResult**: Complete validation outcome with errors, warnings, and summary
- **SurveyValidator**: Main validator interface for survey validation

### Default Rules

The system includes several built-in validation rules:

1. **surveyBasicFieldsRule**: Ensures survey has required code and title
2. **surveyCodeFormatRule**: Validates survey code format and length
3. **uniqueCodesRule**: Ensures all codes are unique across the survey
4. **questionStructureRule**: Validates question structure and required fields
5. **surveyCompletenessRule**: Best practices recommendations

### Validator Classes

- **DefaultSurveyValidator**: Main implementation with full feature set
- **createSurveyValidator()**: Factory for default validator with custom rules
- **createStrictValidator()**: Factory for error-only validation
- **createLenientValidator()**: Factory for essential validation only

## Usage

### Basic Validation

```typescript
import { createSurveyValidator } from '@/survey-editor';

const validator = createSurveyValidator();
const result = validator.validate(survey);

if (!result.isValid) {
  console.log('Validation errors:', result.errors);
}
```

### React Hook Integration

```typescript
import { useSurveyValidation } from '@/survey-editor';

function SurveyEditor({ survey }) {
  const validation = useSurveyValidation(survey);
  
  return (
    <div>
      {validation.hasErrors && (
        <div>Survey has {validation.errorCount} errors</div>
      )}
      <ValidationErrorsPanel validationErrors={validation.errors} />
    </div>
  );
}
```

### Field-Level Validation

```typescript
import { useFieldValidation } from '@/survey-editor';

function SurveyCodeInput({ survey, onChange }) {
  const { fieldErrors, hasFieldErrors } = useFieldValidation(survey, 'code');
  
  return (
    <div>
      <input onChange={onChange} className={hasFieldErrors ? 'error' : ''} />
      {fieldErrors.map(error => (
        <div key={error.field}>{error.message}</div>
      ))}
    </div>
  );
}
```

### Custom Validation Rules

```typescript
import type { ValidationRule } from '@/survey-editor';

const customRule: ValidationRule = {
  name: 'my-custom-rule',
  description: 'Custom validation rule',
  validate: (context) => {
    const errors = [];
    
    // Custom validation logic
    if (context.survey.title?.includes('test')) {
      errors.push({
        field: 'title',
        message: 'Survey title should not contain "test"',
        severity: 'warning'
      });
    }
    
    return errors;
  }
};

const validator = createSurveyValidator([customRule]);
```

## API Reference

### ValidationError Interface

```typescript
interface ValidationError {
  field: string;           // Field path (e.g., 'title', 'children[0].code')
  message: string;         // Human-readable error message
  severity: 'error' | 'warning' | 'info';
  code?: string;          // Optional error code for programmatic handling
  rule?: string;          // Name of the rule that generated this error
}
```

### ValidationResult Interface

```typescript
interface ValidationResult {
  isValid: boolean;        // True if no errors (warnings/info don't affect validity)
  hasWarnings: boolean;    // True if any warnings exist
  errors: ValidationError[]; // All validation issues
  errorCount: number;      // Count of errors only
  warningCount: number;    // Count of warnings only
  infoCount: number;       // Count of info messages only
  summary: string;         // Human-readable summary
}
```

### SurveyValidator Interface

```typescript
interface SurveyValidator {
  validate(survey: Survey): ValidationResult;
  addRule(rule: ValidationRule): void;
  removeRule(ruleName: string): void;
  getRules(): ValidationRule[];
  updateOptions(options: Partial<ValidatorOptions>): void;
  getOptions(): ValidatorOptions;
  validateField(survey: Survey, fieldPath: string): ValidationError[];
  isValid(survey: Survey): boolean;
  getErrors(survey: Survey): ValidationError[];
  getWarnings(survey: Survey): ValidationError[];
  createContext(survey: Survey): ValidationContext;
}
```

## Integration with Survey Editor

The validation system is fully integrated with the survey editor:

- **useSurveyEditor hook**: Automatically includes validation state
- **ValidationErrorsPanel**: Component for displaying validation results
- **Real-time validation**: Updates as survey changes
- **Field-level validation**: Individual field validation support

## Demo Component

Use the `ValidationDemo` component to test and explore the validation system:

```typescript
import { ValidationDemo } from '@/survey-editor';

function App() {
  return <ValidationDemo />;
}
```

## Best Practices

1. **Use appropriate severity levels**: Errors for blocking issues, warnings for recommendations, info for tips
2. **Provide clear field paths**: Help users locate validation issues
3. **Write descriptive messages**: Make validation feedback actionable
4. **Test custom rules**: Ensure custom validation rules handle edge cases
5. **Consider performance**: Validation runs frequently in real-time scenarios

## Migration from Old System

The new validation system replaces the old `validateSurvey` utility function:

**Old:**
```typescript
import { validateSurvey } from './utils';
const errors = validateSurvey(survey);
```

**New:**
```typescript
import { useSurveyValidation } from './hooks/useSurveyValidation';
const validation = useSurveyValidation(survey);
const errors = validation.errors;
```