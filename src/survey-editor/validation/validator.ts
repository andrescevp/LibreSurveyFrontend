import type { 
  SurveyValidator, 
  ValidationResult, 
  ValidationRule, 
  ValidationContext,
  ValidatorOptions,
  ValidationError
} from './types';
import type { Survey } from '../types';
import { defaultValidationRules } from './rules';

/**
 * Main survey validator implementation
 */
export class DefaultSurveyValidator implements SurveyValidator {
  private rules: ValidationRule[];
  private options: ValidatorOptions;

  constructor(
    rules: ValidationRule[] = defaultValidationRules,
    options: ValidatorOptions = {}
  ) {
    this.rules = rules;
    this.options = {
      stopOnFirstError: false,
      enabledSeverities: ['error', 'warning', 'info'],
      ...options,
    };
  }

  /**
   * Add a validation rule
   */
  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  /**
   * Remove a validation rule by name
   */
  removeRule(ruleName: string): void {
    this.rules = this.rules.filter(rule => rule.name !== ruleName);
  }

  /**
   * Get all validation rules
   */
  getRules(): ValidationRule[] {
    return [...this.rules];
  }

  /**
   * Update validator options
   */
  updateOptions(options: Partial<ValidatorOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Get current validator options
   */
  getOptions(): ValidatorOptions {
    return { ...this.options };
  }

  /**
   * Create validation context for a survey
   */
  createContext(survey: Survey): ValidationContext {
    return {
      survey,
      timestamp: Date.now(),
      options: this.options,
    };
  }

  /**
   * Validate a survey
   */
  validate(survey: Survey): ValidationResult {
    const context: ValidationContext = {
      survey,
      timestamp: Date.now(),
      options: this.options,
    };

    const allErrors: ValidationError[] = [];
    const enabledSeverities = this.options.enabledSeverities || ['error', 'warning', 'info'];

    for (const rule of this.rules) {
      try {
        const ruleErrors = rule.validate(context);
        
        // Filter errors by enabled severities
        const filteredErrors = ruleErrors.filter(error => 
          enabledSeverities.includes(error.severity)
        );

        allErrors.push(...filteredErrors);

        // Stop on first error if configured
        if (this.options.stopOnFirstError && filteredErrors.some(e => e.severity === 'error')) {
          break;
        }
      } catch (error) {
        // Handle rule execution errors
        allErrors.push({
          field: '_rule_error',
          message: `Validation rule '${rule.name}' failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          severity: 'error',
          rule: rule.name,
        });
      }
    }

    // Group errors by severity
    const errorsBySeverity = allErrors.reduce((acc, error) => {
      const severity = error.severity;
      if (!acc[severity]) {
        acc[severity] = [];
      }
      acc[severity].push(error);
      return acc;
    }, {} as Record<'error' | 'warning' | 'info', ValidationError[]>);

    const hasErrors = allErrors.some(error => error.severity === 'error');
    const hasWarnings = allErrors.some(error => error.severity === 'warning');

    return {
      isValid: !hasErrors,
      hasWarnings,
      errors: allErrors,
      errorCount: errorsBySeverity.error?.length || 0,
      warningCount: errorsBySeverity.warning?.length || 0,
      infoCount: errorsBySeverity.info?.length || 0,
      summary: this.generateSummary(allErrors),
    };
  }

  /**
   * Validate a specific field or path in the survey
   */
  validateField(survey: Survey, fieldPath: string): ValidationError[] {
    const result = this.validate(survey);
    return result.errors.filter(error => error.field === fieldPath);
  }

  /**
   * Check if survey is valid (has no errors)
   */
  isValid(survey: Survey): boolean {
    return this.validate(survey).isValid;
  }

  /**
   * Get validation errors for a survey
   */
  getErrors(survey: Survey): ValidationError[] {
    return this.validate(survey).errors.filter(error => error.severity === 'error');
  }

  /**
   * Get validation warnings for a survey
   */
  getWarnings(survey: Survey): ValidationError[] {
    return this.validate(survey).errors.filter(error => error.severity === 'warning');
  }

  /**
   * Generate a human-readable summary of validation results
   */
  private generateSummary(errors: ValidationError[]): string {
    if (errors.length === 0) {
      return 'Survey validation passed with no issues.';
    }

    const errorCount = errors.filter(e => e.severity === 'error').length;
    const warningCount = errors.filter(e => e.severity === 'warning').length;
    const infoCount = errors.filter(e => e.severity === 'info').length;

    const parts: string[] = [];
    
    if (errorCount > 0) {
      parts.push(`${errorCount} error${errorCount === 1 ? '' : 's'}`);
    }
    
    if (warningCount > 0) {
      parts.push(`${warningCount} warning${warningCount === 1 ? '' : 's'}`);
    }
    
    if (infoCount > 0) {
      parts.push(`${infoCount} info message${infoCount === 1 ? '' : 's'}`);
    }

    return `Survey validation found ${parts.join(', ')}.`;
  }
}

/**
 * Factory function to create a validator with default rules
 */
export function createSurveyValidator(
  customRules: ValidationRule[] = [],
  options: ValidatorOptions = {}
): SurveyValidator {
  return new DefaultSurveyValidator([...defaultValidationRules, ...customRules], options);
}

/**
 * Factory function to create a strict validator (errors only)
 */
export function createStrictValidator(): SurveyValidator {
  return new DefaultSurveyValidator(defaultValidationRules, {
    enabledSeverities: ['error'],
    stopOnFirstError: false,
  });
}

/**
 * Factory function to create a lenient validator (warnings and info disabled)
 */
export function createLenientValidator(): SurveyValidator {
  return new DefaultSurveyValidator(defaultValidationRules, {
    enabledSeverities: ['error'],
    stopOnFirstError: false,
  });
}