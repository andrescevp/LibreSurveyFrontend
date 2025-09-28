import type { QuestionnaireItem } from './types';
import type { Survey } from '../survey-types';

/**
 * Generate a unique ID for survey items
 */
export function generateId(): string {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique code for a question based on existing codes
 */
export function generateUniqueCode(existingCodes: string[], prefix = 'Q'): string {
  let counter = 1;
  let code = `${prefix}${counter}`;
  
  while (existingCodes.includes(code)) {
    counter++;
    code = `${prefix}${counter}`;
  }
  
  return code;
}

/**
 * Get all codes from a survey to check for uniqueness
 */
export function getAllCodes(survey: Survey): string[] {
  const codes: string[] = [survey.code];
  
  function extractCodes(items: QuestionnaireItem[] = []): void {
    items.forEach(item => {
      codes.push(item.code);
      if ('children' in item && item.children) {
        extractCodes(item.children);
      }
      if ('rows' in item && item.rows) {
        item.rows.forEach(row => codes.push(row.code));
      }
      if ('columns' in item && item.columns) {
        item.columns.forEach(col => codes.push(col.code));
      }
    });
  }
  
  if (survey.children) {
    extractCodes(survey.children);
  }
  
  return codes;
}

/**
 * @deprecated Use the new validation system from ./validation instead
 * Validate a survey structure
 */
/*
export function validateSurvey(survey: Survey): ValidationError[] {
  const errors: ValidationError[] = [];
  const codes = new Set<string>();
  
  // Check survey basic fields
  if (!survey.code?.trim()) {
    errors.push({ field: 'code', message: 'Survey code is required' });
  } else if (codes.has(survey.code)) {
    errors.push({ field: 'code', message: 'Survey code must be unique', code: survey.code });
  } else {
    codes.add(survey.code);
  }
  
  if (!survey.title?.trim()) {
    errors.push({ field: 'title', message: 'Survey title is required' });
  }
  
  // Validate questionnaire items
  function validateItems(items: QuestionnaireItem[] = [], path = ''): void {
    items.forEach((item, index) => {
      const itemPath = `${path}[${index}]`;
      
      if (!item.code?.trim()) {
        errors.push({ 
          field: `${itemPath}.code`, 
          message: 'Item code is required' 
        });
      } else if (codes.has(item.code)) {
        errors.push({ 
          field: `${itemPath}.code`, 
          message: 'Item code must be unique', 
          code: item.code 
        });
      } else {
        codes.add(item.code);
      }
      
      // Check label for items that have it
      if (item.type !== 'breakPage') {
        const itemWithLabel = item as any;
        if (!itemWithLabel.label?.trim()) {
          errors.push({ 
            field: `${itemPath}.label`, 
            message: 'Item label is required' 
          });
        }
      }
      
      // Validate children
      if ('children' in item && item.children) {
        validateItems(item.children, `${itemPath}.children`);
      }
      
      // Validate rows
      if ('rows' in item && item.rows) {
        item.rows.forEach((row, rowIndex) => {
          if (!row.code?.trim()) {
            errors.push({ 
              field: `${itemPath}.rows[${rowIndex}].code`, 
              message: 'Row code is required' 
            });
          } else if (codes.has(row.code)) {
            errors.push({ 
              field: `${itemPath}.rows[${rowIndex}].code`, 
              message: 'Row code must be unique', 
              code: row.code 
            });
          } else {
            codes.add(row.code);
          }
        });
      }
      
      // Validate columns
      if ('columns' in item && item.columns) {
        item.columns.forEach((col, colIndex) => {
          if (!col.code?.trim()) {
            errors.push({ 
              field: `${itemPath}.columns[${colIndex}].code`, 
              message: 'Column code is required' 
            });
          } else if (codes.has(col.code)) {
            errors.push({ 
              field: `${itemPath}.columns[${colIndex}].code`, 
              message: 'Column code must be unique', 
              code: col.code 
            });
          } else {
            codes.add(col.code);
          }
        });
      }
    });
  }
  
  if (survey.children) {
    validateItems(survey.children, 'children');
  }
  
  return errors;
}
*/

/**
 * Deep clone a survey object
 */
export function cloneSurvey(survey: Survey): Survey {
  return JSON.parse(JSON.stringify(survey));
}

/**
 * Find an item by ID in the survey tree
 */
export function findItemById(items: QuestionnaireItem[], id: string): QuestionnaireItem | null {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    
    if ('children' in item && item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  
  return null;
}

/**
 * Calculate the depth of nesting for display
 */
export function calculateDepth(items: QuestionnaireItem[], targetId: string, currentDepth = 0): number {
  for (const item of items) {
    if (item.id === targetId) {
      return currentDepth;
    }
    
    if ('children' in item && item.children) {
      const depth = calculateDepth(item.children, targetId, currentDepth + 1);
      if (depth !== -1) return depth;
    }
  }
  
  return -1;
}

/**
 * Flatten survey structure for easier processing
 */
export function flattenSurvey(items: QuestionnaireItem[]): Array<QuestionnaireItem & { depth: number }> {
  const flattened: Array<QuestionnaireItem & { depth: number }> = [];
  
  function flatten(items: QuestionnaireItem[], depth = 0) {
    items.forEach(item => {
      flattened.push({ ...item, depth });
      
      if ('children' in item && item.children) {
        flatten(item.children, depth + 1);
      }
    });
  }
  
  flatten(items);
  return flattened;
}

/**
 * Create a default question based on type
 */
export function createDefaultQuestion(type: QuestionnaireItem['type'], existingCodes: string[]): QuestionnaireItem {
  const id = generateId();
  const code = generateUniqueCode(existingCodes);
  
  const baseItem = {
    id,
    code,
    parentIndex: null,
    index: 0,
    depth: 0,
    isLast: true,
    parentIndexes: null,
  };
  
  switch (type) {
    case 'text':
      return {
        ...baseItem,
        type: 'text' as const,
        label: 'New text content',
        options: {},
      } as QuestionnaireItem;
      
    case 'string':
      return {
        ...baseItem,
        type: 'string' as const,
        label: 'New text question',
        help: '',
        options: {
          multiline: false,
          placeholder: '',
          required: false,
        },
      } as QuestionnaireItem;
      
    case 'number':
      return {
        ...baseItem,
        type: 'number' as const,
        label: 'New number question',
        help: '',
        options: {
          min: null,
          max: null,
          integer: true,
          required: false,
        },
      } as QuestionnaireItem;
      
    case 'choice':
      return {
        ...baseItem,
        type: 'choice' as const,
        label: 'New choice question',
        help: '',
        options: {
          multipleSelection: false,
          required: false,
        },
        rows: [
          {
            ...baseItem,
            id: generateId(),
            code: generateUniqueCode([...existingCodes, code], 'R'),
            label: 'Option 1',
            options: {},
          },
          {
            ...baseItem,
            id: generateId(),
            code: generateUniqueCode([...existingCodes, code], 'R'),
            label: 'Option 2',
            options: {},
          },
        ],
      } as QuestionnaireItem;
      
    case 'block':
      return {
        ...baseItem,
        type: 'block' as const,
        options: {
          showLabel: true,
        },
        children: [],
      } as QuestionnaireItem;
      
    case 'loop':
      return {
        ...baseItem,
        type: 'loop' as const,
        options: {},
        children: [],
        concepts: [],
      } as QuestionnaireItem;
      
    case 'breakPage':
      return {
        ...baseItem,
        type: 'breakPage' as const,
      } as QuestionnaireItem;
      
    default:
      return {
        ...baseItem,
        type: 'text' as const,
        label: 'New item',
        options: {},
      } as QuestionnaireItem;
  }
}