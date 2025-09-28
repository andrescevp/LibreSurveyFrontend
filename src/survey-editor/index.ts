// Survey Editor Components Export
export { SurveyEditor } from './organisms/SurveyEditor.tsx';
export { QuestionEditor } from './organisms/QuestionEditor.tsx';
export { SurveyPreview } from './organisms/SurveyPreview.tsx';

// Molecules
export { QuestionItemList } from './molecules/QuestionItemList.tsx';
export { QuestionFormControls } from './molecules/QuestionFormControls.tsx';
export { ConditionBuilder } from './molecules/ConditionBuilder.tsx';
export { SurveyMetaForm } from './molecules/SurveyMetaForm.tsx';
export { SurveyEditorHeader } from './molecules/SurveyEditorHeader.tsx';
export { SurveyEditorSidebar } from './molecules/SurveyEditorSidebar.tsx';
export { SurveyEditorMainPanel } from './molecules/SurveyEditorMainPanel.tsx';
export { ValidationErrorsPanel } from './molecules/ValidationErrorsPanel.tsx';

// Question Form Components (Factory Pattern)
export {
    QuestionFormFactory,
    StringQuestionForm,
    NumberQuestionForm,
    ChoiceQuestionForm,
    BlockForm,
    LoopForm,
    TextForm,
    BreakPageForm,
    MarkerForm,
    QuotaForm,
    TerminationForm,
    createQuestionForm,
} from './molecules/question-forms';
export type { BaseQuestionFormProps } from './molecules/question-forms';

// Atoms
export { QuestionTypeSelector } from './atoms/QuestionTypeSelector.tsx';
export { DragHandle } from './atoms/DragHandle.tsx';
export { AddQuestionButton } from './atoms/AddQuestionButton.tsx';
export { DeleteButton } from './atoms/DeleteButton.tsx';
export { DepthIndicator } from './atoms/DepthIndicator.tsx';

// Hooks
export { useSurveyEditor } from './hooks/useSurveyEditor.ts';
export { useSurveyValidation, useFieldValidation } from './hooks/useSurveyValidation.ts';

// Validation system
export {
  createSurveyValidator,
  createStrictValidator,
  createLenientValidator,
  DefaultSurveyValidator,
  defaultValidationRules,
  surveyBasicFieldsRule,
  surveyCodeFormatRule,
  uniqueCodesRule,
  questionStructureRule,
  surveyCompletenessRule
} from './validation/index.ts';

export type {
  ValidationError as SurveyValidationError,
  ValidationRule,
  ValidationResult,
  ValidationContext,
  ValidatorOptions,
  SurveyValidator
} from './validation/types.ts';

// Demo components
export { ValidationDemo } from './organisms/ValidationDemo.tsx';

// Types and utils
export type * from './types.ts';
export * from './utils.ts';