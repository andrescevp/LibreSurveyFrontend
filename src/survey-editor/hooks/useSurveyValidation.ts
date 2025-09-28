import { useCallback, useMemo } from 'react';
import type { Survey } from '../types';
import type { 
  ValidationResult, 
  ValidationError, 
  SurveyValidator, 
  ValidationRule,
  ValidatorOptions 
} from '../validation/types';
import { createSurveyValidator } from '../validation/validator';

/**
 * Hook for survey validation integration
 */
export function useSurveyValidation(
  survey: Survey,
  customRules: ValidationRule[] = [],
  options: ValidatorOptions = {}
) {
  // Create validator instance with custom rules
  const validator = useMemo(
    () => createSurveyValidator(customRules, options),
    [customRules, options]
  );

  // Validate the entire survey
  const validateSurvey = useCallback((): ValidationResult => {
    return validator.validate(survey);
  }, [validator, survey]);

  // Validate a specific field
  const validateField = useCallback((fieldPath: string): ValidationError[] => {
    return validator.validateField(survey, fieldPath);
  }, [validator, survey]);

  // Check if survey is valid
  const isValid = useCallback((): boolean => {
    return validator.isValid(survey);
  }, [validator, survey]);

  // Get only errors
  const getErrors = useCallback((): ValidationError[] => {
    return validator.getErrors(survey);
  }, [validator, survey]);

  // Get only warnings
  const getWarnings = useCallback((): ValidationError[] => {
    return validator.getWarnings(survey);
  }, [validator, survey]);

  // Add custom validation rule
  const addRule = useCallback((rule: ValidationRule): void => {
    validator.addRule(rule);
  }, [validator]);

  // Remove validation rule
  const removeRule = useCallback((ruleName: string): void => {
    validator.removeRule(ruleName);
  }, [validator]);

  // Update validator options
  const updateOptions = useCallback((newOptions: Partial<ValidatorOptions>): void => {
    validator.updateOptions(newOptions);
  }, [validator]);

  // Get current validation result
  const validationResult = useMemo(() => {
    return validateSurvey();
  }, [validateSurvey]);

  return {
    // Validation functions
    validateSurvey,
    validateField,
    isValid,
    getErrors,
    getWarnings,
    
    // Validator management
    addRule,
    removeRule,
    updateOptions,
    
    // Current validation state
    validationResult,
    errors: validationResult.errors,
    hasErrors: !validationResult.isValid,
    hasWarnings: validationResult.hasWarnings,
    errorCount: validationResult.errorCount,
    warningCount: validationResult.warningCount,
    infoCount: validationResult.infoCount,
    summary: validationResult.summary,
    
    // Validator instance (for advanced usage)
    validator,
  };
}

/**
 * Hook for real-time field validation
 */
export function useFieldValidation(
  survey: Survey,
  fieldPath: string,
  validator?: SurveyValidator
) {
  const defaultValidator = useMemo(() => createSurveyValidator(), []);
  const activeValidator = validator || defaultValidator;

  const fieldErrors = useMemo(() => {
    return activeValidator.validateField(survey, fieldPath);
  }, [activeValidator, survey, fieldPath]);

  const hasFieldErrors = fieldErrors.some(error => error.severity === 'error');
  const hasFieldWarnings = fieldErrors.some(error => error.severity === 'warning');

  return {
    fieldErrors,
    hasFieldErrors,
    hasFieldWarnings,
    fieldErrorCount: fieldErrors.filter(e => e.severity === 'error').length,
    fieldWarningCount: fieldErrors.filter(e => e.severity === 'warning').length,
  };
}