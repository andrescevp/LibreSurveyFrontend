// Example implementation of React Query features following the prompt template
// This serves as a reference implementation for the surveys feature

import { 
  useQuery, 
  useInfiniteQuery, 
  useSuspenseQuery,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { api } from '@lib/api';

// Example: Survey Query Keys
export const surveyKeys = {
  // Base keys
  all: ['surveys'] as const,
  lists: () => [...surveyKeys.all, 'list'] as const,
  list: (filters: string) => [...surveyKeys.lists(), { filters }] as const,
  details: () => [...surveyKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...surveyKeys.details(), id] as const,
  
  // Specific query keys
  infinite: (filters?: Record<string, any>) => 
    [...surveyKeys.lists(), 'infinite', { filters }] as const,
  search: (query: string) => 
    [...surveyKeys.lists(), 'search', { query }] as const,
  related: (id: string | number, relation: string) => 
    [...surveyKeys.detail(id), 'related', relation] as const,
} as const;

// Example: Survey Types
export interface Survey {
  id: string | number;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface SurveyListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string[];
}

export interface SurveyListResponse {
  items: Survey[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Example: Survey Service
export const surveyService = {
  getAll: async (params?: SurveyListParams): Promise<SurveyListResponse> => {
    const { data } = await api.get('/surveys', { params });
    return data;
  },

  getById: async (id: string | number): Promise<Survey> => {
    const { data } = await api.get(`/surveys/${id}`);
    return data;
  },

  create: async (input: Omit<Survey, 'id' | 'createdAt' | 'updatedAt'>): Promise<Survey> => {
    const { data } = await api.post('/surveys', input);
    return data;
  },
} as const;

// Example: Survey Query Hooks
export function useSurveys(
  params?: SurveyListParams,
  options?: Omit<UseQueryOptions<SurveyListResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: surveyKeys.list(JSON.stringify(params || {})),
    queryFn: () => surveyService.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

export function useSurvey(
  id: string | number | undefined,
  options?: Omit<UseQueryOptions<Survey>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: surveyKeys.detail(id!),
    queryFn: () => surveyService.getById(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for detail queries
    gcTime: 15 * 60 * 1000,
    ...options,
  });
}

// Example usage in a component:
/*
import { useSurveys, useSurvey } from '@lib/queries/examples/surveys';

function SurveyList() {
  const { data: surveys, isLoading, error } = useSurveys({
    page: 1,
    limit: 10,
    status: ['published']
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!surveys) return <div>No data</div>;

  return (
    <div>
      {surveys.items.map(survey => (
        <div key={survey.id}>{survey.title}</div>
      ))}
    </div>
  );
}
*/