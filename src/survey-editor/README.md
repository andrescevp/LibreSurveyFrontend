# Survey Editor

A comprehensive survey editor built with React, TypeScript, and atomic design principles.

## Architecture

### Components Structure

```
src/survey-editor/
├── atoms/                      # Basic building blocks
│   ├── AddQuestionButton.tsx   # Button to add new questions
│   ├── DeleteButton.tsx        # Reusable delete button
│   ├── DepthIndicator.tsx      # Visual nesting indicator
│   ├── DragHandle.tsx          # Drag & drop handle
│   └── QuestionTypeSelector.tsx # Question type dropdown
├── molecules/                  # Combinations of atoms
│   ├── ConditionBuilder.tsx    # Conditional logic builder
│   ├── QuestionFormControls.tsx # Question-specific form controls
│   ├── QuestionItemList.tsx    # List of questions with management
│   ├── SurveyEditorHeader.tsx  # Main editor header
│   ├── SurveyEditorMainPanel.tsx # Right panel with question editor
│   ├── SurveyEditorSidebar.tsx # Left panel with tabs
│   ├── SurveyMetaForm.tsx      # Survey metadata form
│   └── ValidationErrorsPanel.tsx # Validation errors display
├── organisms/                  # Complex components
│   ├── QuestionEditor.tsx      # Detailed question editing
│   ├── SurveyEditor.tsx        # Main editor interface
│   └── SurveyPreview.tsx       # Survey preview functionality
├── hooks/                      # Custom hooks
│   └── useSurveyEditor.ts      # Main survey editor state logic
├── types.ts                    # TypeScript interfaces
├── utils.ts                    # Utility functions
└── index.ts                    # Main exports
```

## Component Breakdown

### 🏗️ SurveyEditor (Main Organism)

The main survey editor component has been split into smaller, focused components:

- **SurveyEditorHeader**: Top header with title, validation errors, and action buttons
- **SurveyEditorSidebar**: Left panel with settings and questions tabs
- **SurveyEditorMainPanel**: Right panel with question editor or empty state
- **ValidationErrorsPanel**: Bottom panel showing validation errors

### 🎣 useSurveyEditor Hook

Custom hook that manages all survey editor state and logic:

- Survey data management
- Question selection and editing
- Validation handling
- Question CRUD operations
- Available questions for conditions

## Benefits of This Structure

### ✅ Separation of Concerns
- Each component has a single responsibility
- Business logic is separated into the custom hook
- UI components focus only on presentation

### ✅ Reusability
- Components can be reused in different contexts
- Hook can be used in other survey-related components
- Atomic components can be used across the application

### ✅ Maintainability
- Smaller files are easier to understand and modify
- Clear component hierarchy following atomic design
- Centralized state management in the hook

### ✅ Testability
- Each component can be tested in isolation
- Hook logic can be tested separately from UI
- Clear interfaces make mocking easier

## Usage

```tsx
import { SurveyEditor } from './survey-editor';

function App() {
  return (
    <SurveyEditor
      initialSurvey={{
        code: 'demo_survey',
        title: 'Demo Survey',
        description: 'A sample survey',
      }}
      onSave={(survey) => console.log('Save:', survey)}
      onPreview={(survey) => console.log('Preview:', survey)}
    />
  );
}
```

## State Management

The `useSurveyEditor` hook provides a clean API for managing survey state:

```tsx
const {
  survey,                    // Current survey data
  selectedQuestion,          // Currently selected question
  selectedQuestionIndex,     // Index of selected question
  activeTab,                // Active tab (settings/questions)
  validationErrors,         // Current validation errors
  availableQuestions,       // Questions available for conditions
  
  // Actions
  handleSurveyMetaUpdate,   // Update survey metadata
  handleQuestionsUpdate,    // Update questions list
  handleQuestionSelect,     // Select a question
  handleQuestionUpdate,     // Update a question
  handleAddQuestion,        // Add new question
  handleQuestionDelete,     // Delete a question
  handleValidate,           // Validate survey
} = useSurveyEditor(initialSurvey);
```

This structure makes the survey editor much more maintainable and follows React
best practices!
