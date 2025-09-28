import type { ValidationRule, ValidationContext, ValidationError } from './types';
import type { QuestionnaireItem } from '../types';

/**
 * Validates that survey has required basic fields
 */
export const surveyBasicFieldsRule: ValidationRule = {
  name: 'survey-basic-fields',
  description: 'Survey must have code and title',
  validate: (context: ValidationContext): ValidationError[] => {
    const errors: ValidationError[] = [];
    const { survey } = context;

    if (!survey.code?.trim()) {
      errors.push({
        field: 'code',
        message: 'Survey code is required',
        severity: 'error',
      });
    }

    if (!survey.title?.trim()) {
      errors.push({
        field: 'title',
        message: 'Survey title is required',
        severity: 'error',
      });
    }

    if (survey.title && survey.title.length < 3) {
      errors.push({
        field: 'title',
        message: 'Survey title must be at least 3 characters long',
        severity: 'error',
      });
    }

    return errors;
  },
};

/**
 * Validates survey code format
 */
export const surveyCodeFormatRule: ValidationRule = {
  name: 'survey-code-format',
  description: 'Survey code must follow naming conventions',
  validate: (context: ValidationContext): ValidationError[] => {
    const errors: ValidationError[] = [];
    const { survey } = context;

    if (survey.code) {
      const codePattern = /^[a-zA-Z0-9_-]+$/;
      if (!codePattern.test(survey.code)) {
        errors.push({
          field: 'code',
          message: 'Survey code can only contain letters, numbers, hyphens, and underscores',
          severity: 'error',
        });
      }

      if (survey.code.length > 50) {
        errors.push({
          field: 'code',
          message: 'Survey code should not exceed 50 characters',
          severity: 'warning',
        });
      }
    }

    return errors;
  },
};

/**
 * Validates that all codes are unique across the survey
 */
export const uniqueCodesRule: ValidationRule = {
  name: 'unique-codes',
  description: 'All codes must be unique within the survey',
  validate: (context: ValidationContext): ValidationError[] => {
    const errors: ValidationError[] = [];
    const { survey } = context;
    const codeFrequency = new Map<string, { count: number; locations: string[] }>();

    // Count survey code
    if (survey.code) {
      codeFrequency.set(survey.code, { 
        count: 1, 
        locations: ['survey.code'] 
      });
    }

    // Count all item codes recursively
    function countCodes(items: QuestionnaireItem[], path = ''): void {
      items.forEach((item, index) => {
        const itemPath = `${path}[${index}]`;
        
        if (item.code) {
          const existing = codeFrequency.get(item.code);
          if (existing) {
            existing.count++;
            existing.locations.push(`${itemPath}.code`);
          } else {
            codeFrequency.set(item.code, { 
              count: 1, 
              locations: [`${itemPath}.code`] 
            });
          }
        }

        // Count rows
        if ('rows' in item && item.rows) {
          item.rows.forEach((row, rowIndex) => {
            if (row.code) {
              const existing = codeFrequency.get(row.code);
              if (existing) {
                existing.count++;
                existing.locations.push(`${itemPath}.rows[${rowIndex}].code`);
              } else {
                codeFrequency.set(row.code, { 
                  count: 1, 
                  locations: [`${itemPath}.rows[${rowIndex}].code`] 
                });
              }
            }
          });
        }

        // Count columns
        if ('columns' in item && item.columns) {
          item.columns.forEach((col, colIndex) => {
            if (col.code) {
              const existing = codeFrequency.get(col.code);
              if (existing) {
                existing.count++;
                existing.locations.push(`${itemPath}.columns[${colIndex}].code`);
              } else {
                codeFrequency.set(col.code, { 
                  count: 1, 
                  locations: [`${itemPath}.columns[${colIndex}].code`] 
                });
              }
            }
          });
        }

        // Count children
        if ('children' in item && item.children) {
          countCodes(item.children, `${itemPath}.children`);
        }
      });
    }

    if (survey.children) {
      countCodes(survey.children, 'children');
    }

    // Find duplicates
    codeFrequency.forEach((info, code) => {
      if (info.count > 1) {
        info.locations.forEach(location => {
          errors.push({
            field: location,
            message: `Code '${code}' is not unique. Found ${info.count} occurrences`,
            code,
            severity: 'error',
          });
        });
      }
    });

    return errors;
  },
};

/**
 * Validates question structure and required fields
 */
export const questionStructureRule: ValidationRule = {
  name: 'question-structure',
  description: 'Questions must have required fields and proper structure',
  validate: (context: ValidationContext): ValidationError[] => {
    const errors: ValidationError[] = [];
    const { survey } = context;

    function validateItems(items: QuestionnaireItem[], path = ''): void {
      items.forEach((item, index) => {
        const itemPath = `${path}[${index}]`;

        // Validate item code
        if (!item.code?.trim()) {
          errors.push({
            field: `${itemPath}.code`,
            message: 'Item code is required',
            severity: 'error',
          });
        }

        // Validate item label (for non-breakPage items)
        if (item.type !== 'breakPage') {
          const itemWithLabel = item as any;
          if (!itemWithLabel.label?.trim()) {
            errors.push({
              field: `${itemPath}.label`,
              message: 'Item label is required',
              severity: 'error',
            });
          }
        }

        // Validate choice questions have rows
        if (item.type === 'choice') {
          const choiceItem = item as any;
          if (!choiceItem.rows || choiceItem.rows.length === 0) {
            errors.push({
              field: `${itemPath}.rows`,
              message: 'Choice questions must have at least one option',
              severity: 'error',
            });
          } else {
            // Validate row labels and codes
            choiceItem.rows.forEach((row: any, rowIndex: number) => {
              if (!row.code?.trim()) {
                errors.push({
                  field: `${itemPath}.rows[${rowIndex}].code`,
                  message: 'Row code is required',
                  severity: 'error',
                });
              }
              if (!row.label?.trim()) {
                errors.push({
                  field: `${itemPath}.rows[${rowIndex}].label`,
                  message: 'Row label is required',
                  severity: 'error',
                });
              }
            });
          }
        }

        // Validate children
        if ('children' in item && item.children) {
          validateItems(item.children, `${itemPath}.children`);
        }
      });
    }

    if (survey.children) {
      validateItems(survey.children, 'children');
    }

    return errors;
  },
};

/**
 * Validates survey completeness and best practices
 */
export const surveyCompletenessRule: ValidationRule = {
  name: 'survey-completeness',
  description: 'Survey should follow best practices for completeness',
  validate: (context: ValidationContext): ValidationError[] => {
    const errors: ValidationError[] = [];
    const { survey } = context;

    if (!survey.description || survey.description.trim().length === 0) {
      errors.push({
        field: 'description',
        message: 'Consider adding a description to help respondents understand the survey purpose',
        severity: 'info',
      });
    }

    if (!survey.children || survey.children.length === 0) {
      errors.push({
        field: 'children',
        message: 'Survey has no questions',
        severity: 'warning',
      });
    } else if (survey.children.length === 1) {
      errors.push({
        field: 'children',
        message: 'Survey has only one question. Consider adding more questions for better insights',
        severity: 'info',
      });
    }

    return errors;
  },
};

/**
 * Default validation rules applied to all surveys
 */
export const defaultValidationRules: ValidationRule[] = [
  surveyBasicFieldsRule,
  surveyCodeFormatRule,
  uniqueCodesRule,
  questionStructureRule,
  surveyCompletenessRule,
];