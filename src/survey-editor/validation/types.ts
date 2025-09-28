import type { Survey } from '../types';

/**
 * Validation error interface
 */
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  code?: string;
  rule?: string;
}

/**
 * Validation context passed to rules
 */
export interface ValidationContext {
  survey: Survey;
  timestamp: number;
  options?: ValidatorOptions;
}

/**
 * Validator configuration options
 */
export interface ValidatorOptions {
  stopOnFirstError?: boolean;
  enabledSeverities?: Array<'error' | 'warning' | 'info'>;
}

/**
 * Validation rule interface
 */
export interface ValidationRule {
  name: string;
  description: string;
  validate: (context: ValidationContext) => ValidationError[];
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  hasWarnings: boolean;
  errors: ValidationError[];
  errorCount: number;
  warningCount: number;
  infoCount: number;
  summary: string;
}

/**
 * Main survey validator interface
 */
export interface SurveyValidator {
  validate: (survey: Survey) => ValidationResult;
  addRule: (rule: ValidationRule) => void;
  removeRule: (ruleName: string) => void;
  getRules: () => ValidationRule[];
  updateOptions: (options: Partial<ValidatorOptions>) => void;
  getOptions: () => ValidatorOptions;
  validateField: (survey: Survey, fieldPath: string) => ValidationError[];
  isValid: (survey: Survey) => boolean;
  getErrors: (survey: Survey) => ValidationError[];
  getWarnings: (survey: Survey) => ValidationError[];
  createContext: (survey: Survey) => ValidationContext;
}