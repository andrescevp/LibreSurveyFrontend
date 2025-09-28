import type { Survey, Block, BreakPage, Loop, QuestionNumber, QuestionChoice, QuestionString, Text, ElementCondition } from '../survey-types';

// Re-export Survey for validation system
export type { Survey };

// Union type for all questionnaire items
export type QuestionnaireItem = Block | BreakPage | Loop | QuestionNumber | QuestionChoice | QuestionString | Text;

export interface SurveyEditorProps {
  initialSurvey?: Partial<Survey>;
  onSave?: (survey: Survey) => void;
  onPreview?: (survey: Survey) => void;
  readOnly?: boolean;
}

export interface QuestionEditorProps {
  question: QuestionnaireItem;
  onUpdate: (question: QuestionnaireItem) => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  availableQuestions?: Array<{ value: string; label: string }>;
  depth?: number;
  index?: number;
  parentIndex?: number;
  className?: string;
}

export interface QuestionFormData {
  code: string;
  label: string;
  type: QuestionnaireItem['type'];
  help?: string;
  options: any;
  rows?: any[];
  columns?: any[];
  condition?: ElementCondition;
}

export interface DragDropItem {
  id: string;
  type: 'question' | 'block' | 'loop';
  parentId?: string;
  index: number;
}

export interface ConditionRule {
  negate?: boolean;
  code: string;
  rowCode?: string;
  columnCode?: string;
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains' | 'not_contains';
  value: string | number;
  gate?: 'and' | 'or';
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export type QuestionType = QuestionnaireItem['type'];

export const QUESTION_TYPES: Array<{
  value: QuestionType;
  label: string;
  description: string;
  icon?: string;
}> = [
  { value: 'string', label: 'Text Input', description: 'Single or multi-line text input', icon: '✏️' },
  { value: 'number', label: 'Number Input', description: 'Numeric input with validation', icon: '🔢' },
  { value: 'choice', label: 'Multiple Choice', description: 'Single or multiple selection', icon: '☑️' },
];

export const QUESTIONNAIRE_ITEMS_WITH_CHILDREN: Array<{
  value: QuestionType;
  label: string;
  description: string;
  icon?: string;
}> = [
  { value: 'block', label: 'Block', description: 'Group questions together', icon: '📦' },
  { value: 'loop', label: 'Loop', description: 'Repeat questions for multiple items', icon: '🔄' },
];

export const QUESTIONNAIRE_ITEMS_FLOW: Array<{
  value: QuestionType;
  label: string;
  description: string;
  icon?: string;
}> = [
  { value: 'breakPage', label: 'Page Break', description: 'Create a new page', icon: '📄' },
  { value: 'termination', label: 'Termination', description: 'End survey conditionally', icon: '🛑' },
  { value: 'quota', label: 'Quota', description: 'Set quotas for responses', icon: '📊' },
];

export const QUESTIONNAIRE_ITEMS_MISC: Array<{
  value: QuestionType;
  label: string;
  description: string;
  icon?: string;
}> = [
  { value: 'text', label: 'Text', description: 'Display text content', icon: '📝' },
  { value: 'marker', label: 'Marker', description: 'Conditional marker', icon: '🏷️' },
];

export const OPERATORS = [
  { value: '=', label: 'Equals' },
  { value: '!=', label: 'Not equals' },
  { value: '>', label: 'Greater than' },
  { value: '<', label: 'Less than' },
  { value: '>=', label: 'Greater than or equal' },
  { value: '<=', label: 'Less than or equal' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Does not contain' },
];