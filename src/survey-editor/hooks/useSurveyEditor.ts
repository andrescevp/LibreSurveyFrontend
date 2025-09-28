import { useState, useCallback } from 'react';
import { getAllCodes, createDefaultQuestion } from '../utils';
import type { Survey } from '../../survey-types';
import type { QuestionnaireItem } from '../types';
import { useSurveyValidation } from './useSurveyValidation';

export function useSurveyEditor(initialSurvey?: Partial<Survey>) {
  const [survey, setSurvey] = useState<Survey>(() => ({
    code: initialSurvey?.code || '',
    title: initialSurvey?.title || '',
    description: initialSurvey?.description || '',
    children: initialSurvey?.children || [],
  }));

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('questions');
  // Use the new validation system
  const validation = useSurveyValidation(survey);

  const selectedQuestion = selectedQuestionIndex !== null && survey.children
    ? survey.children[selectedQuestionIndex]
    : null;

  const availableQuestions = survey.children?.map(q => ({
    value: q.code,
    label: `${q.code} - ${(q as any).label || q.type}`,
  })) || [];

  const handleSurveyMetaUpdate = useCallback((updatedSurvey: Survey) => {
    setSurvey(prev => ({
      ...prev,
      code: updatedSurvey.code,
      title: updatedSurvey.title,
      description: updatedSurvey.description,
    }));
  }, []);

  const handleQuestionsUpdate = useCallback((questions: QuestionnaireItem[]) => {
    setSurvey(prev => ({
      ...prev,
      children: questions,
    }));
  }, []);

  const handleQuestionSelect = useCallback((_question: QuestionnaireItem, index: number) => {
    setSelectedQuestionIndex(index);
  }, []);

  const handleQuestionUpdate = useCallback((updatedQuestion: QuestionnaireItem) => {
    if (selectedQuestionIndex === null || !survey.children) return;

    const newQuestions = [...survey.children];
    newQuestions[selectedQuestionIndex] = updatedQuestion;

    setSurvey(prev => ({
      ...prev,
      children: newQuestions,
    }));
  }, [selectedQuestionIndex, survey.children]);

  const handleAddQuestion = useCallback((type: QuestionnaireItem['type'], parentIndex?: number) => {
    const existingCodes = getAllCodes(survey);
    const newQuestion = createDefaultQuestion(type, existingCodes);

    setSurvey(prev => {
      const newChildren = [...(prev.children || [])];

      if (parentIndex !== undefined) {
        // Add as child to a block or loop
        const parent = newChildren[parentIndex];
        if ('children' in parent && parent.children) {
          parent.children.push(newQuestion);
        } else if ('children' in parent) {
          parent.children = [newQuestion];
        }
      } else {
        // Add as top-level question
        newChildren.push(newQuestion);
      }

      return {
        ...prev,
        children: newChildren,
      };
    });
  }, [survey]);

  const handleQuestionDelete = useCallback(() => {
    if (selectedQuestionIndex !== null && survey.children) {
      const newQuestions = [...survey.children];
      newQuestions.splice(selectedQuestionIndex, 1);
      setSurvey(prev => ({ ...prev, children: newQuestions }));
      setSelectedQuestionIndex(null);
    }
  }, [selectedQuestionIndex, survey.children]);

  const handleValidate = useCallback(() => {
    const result = validation.validateSurvey();
    return result.isValid;
  }, [validation]);

  return {
    // State
    survey,
    selectedQuestion,
    selectedQuestionIndex,
    activeTab,
    availableQuestions,
    
    // Validation state
    validation,
    validationErrors: validation.errors,
    hasValidationErrors: validation.hasErrors,
    hasValidationWarnings: validation.hasWarnings,
    
    // Actions
    setSurvey,
    setActiveTab,
    setSelectedQuestionIndex,
    handleSurveyMetaUpdate,
    handleQuestionsUpdate,
    handleQuestionSelect,
    handleQuestionUpdate,
    handleAddQuestion,
    handleQuestionDelete,
    handleValidate,
  };
}