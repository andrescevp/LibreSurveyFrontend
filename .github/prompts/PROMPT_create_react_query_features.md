---
mode: 'agent'
description: 'Create React Query features following TanStack Query v5 best practices'
---

**Create React Query features including queries, mutations, and related utilities following TanStack Query v5 best practices**

Ask any needed information to the user before start if it is not clear or you need more details.

**KEEP ALL CUSTOM HOOKS UNDER 150 LINES**

## Step-by-Step Instructions

### 1. Determine Feature Type

Choose the appropriate React Query feature type:

- **Queries**: Data fetching operations (useQuery, useInfiniteQuery, useSuspenseQuery)
- **Mutations**: Data modification operations (useMutation)
- **Query Utilities**: Query invalidation, prefetching, optimistic updates
- **Query Keys**: Centralized query key management
- **API Services**: Backend integration services with proper error handling

### 2. File Structure Pattern

#### File Location Pattern:
```
src/features/{feature}/
  ├── index.ts                    # Main exports
  ├── queries.ts                  # Query hooks (useQuery, useInfiniteQuery)
  ├── mutations.ts                # Mutation hooks (useMutation)
  ├── keys.ts                     # Query key factory
  ├── services.ts                 # API service functions
  ├── types.ts                    # TypeScript interfaces
  └── utils.ts                    # Query utilities (invalidation, prefetching)
```

#### Example for "surveys" feature:
```
src/features/surveys/
  ├── index.ts
  ├── queries.ts        # useSurveys, useSurvey, useInfiniteSurveys
  ├── mutations.ts      # useCreateSurvey, useUpdateSurvey, useDeleteSurvey
  ├── keys.ts           # surveyKeys factory
  ├── services.ts       # API functions
  ├── types.ts          # Survey interfaces
  └── utils.ts          # Survey query utilities
```

### 3. Query Keys Factory Pattern

Always create a centralized query key factory for consistent cache management:

```tsx
// src/features/{feature}/keys.ts
export const {feature}Keys = {
  // Base keys
  all: ['{feature}'] as const,
  lists: () => [...{feature}Keys.all, 'list'] as const,
  list: (filters: string) => [...{feature}Keys.lists(), { filters }] as const,
  details: () => [...{feature}Keys.all, 'detail'] as const,
  detail: (id: string | number) => [...{feature}Keys.details(), id] as const,
  
  // Specific query keys
  infinite: (filters?: Record<string, any>) => 
    [...{feature}Keys.lists(), 'infinite', { filters }] as const,
  search: (query: string) => 
    [...{feature}Keys.lists(), 'search', { query }] as const,
  related: (id: string | number, relation: string) => 
    [...{feature}Keys.detail(id), 'related', relation] as const,
} as const;

// Export type for better TypeScript support
export type {Feature}QueryKey = ReturnType<typeof {feature}Keys[keyof typeof {feature}Keys]>;
```

### 4. API Service Functions

Create clean, reusable API service functions:

```tsx
// src/features/{feature}/services.ts
import { api } from '@lib/api'; // Your axios instance or fetch wrapper

// Base interfaces
export interface {Feature}ListParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Record<string, any>;
}

export interface {Feature}CreateInput {
  // Define creation fields
}

export interface {Feature}UpdateInput {
  // Define update fields
}

// API service functions
export const {feature}Service = {
  // List/search operations
  getAll: async (params?: {Feature}ListParams): Promise<{Feature}ListResponse> => {
    const { data } = await api.get('/{feature}', { params });
    return data;
  },

  getInfinite: async ({ 
    pageParam = 1, 
    ...params 
  }: {Feature}ListParams & { pageParam?: number }): Promise<{Feature}InfiniteResponse> => {
    const { data } = await api.get('/{feature}', { 
      params: { ...params, page: pageParam } 
    });
    return data;
  },

  // Detail operations
  getById: async (id: string | number): Promise<{Feature}> => {
    const { data } = await api.get(`/{feature}/${id}`);
    return data;
  },

  // Mutation operations
  create: async (input: {Feature}CreateInput): Promise<{Feature}> => {
    const { data } = await api.post('/{feature}', input);
    return data;
  },

  update: async (id: string | number, input: {Feature}UpdateInput): Promise<{Feature}> => {
    const { data } = await api.put(`/{feature}/${id}`, input);
    return data;
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/{feature}/${id}`);
  },

  // Batch operations
  bulkDelete: async (ids: (string | number)[]): Promise<void> => {
    await api.delete('/{feature}/bulk', { data: { ids } });
  },

  // Related data
  getRelated: async (id: string | number, relation: string): Promise<any[]> => {
    const { data } = await api.get(`/{feature}/${id}/${relation}`);
    return data;
  },
} as const;
```

### 5. Query Hooks Implementation

Create query hooks following TanStack Query v5 patterns:

```tsx
// src/features/{feature}/queries.ts
import { 
  useQuery, 
  useInfiniteQuery, 
  useSuspenseQuery,
  type UseQueryOptions,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { {feature}Keys } from './keys';
import { {feature}Service } from './services';
import type { {Feature}, {Feature}ListParams, {Feature}ListResponse } from './types';

// List query hook
export function use{Feature}s(
  params?: {Feature}ListParams,
  options?: Omit<UseQueryOptions<{Feature}ListResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: {feature}Keys.list(JSON.stringify(params || {})),
    queryFn: () => {feature}Service.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options,
  });
}

// Infinite query hook
export function useInfinite{Feature}s(
  params?: {Feature}ListParams,
  options?: Omit<UseInfiniteQueryOptions<{Feature}InfiniteResponse>, 'queryKey' | 'queryFn' | 'getNextPageParam'>
) {
  return useInfiniteQuery({
    queryKey: {feature}Keys.infinite(params),
    queryFn: ({ pageParam }) => {feature}Service.getInfinite({ ...params, pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.nextPage || lastPage.page + 1;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    ...options,
  });
}

// Detail query hook
export function use{Feature}(
  id: string | number | undefined,
  options?: Omit<UseQueryOptions<{Feature}>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: {feature}Keys.detail(id!),
    queryFn: () => {feature}Service.getById(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for detail queries
    gcTime: 15 * 60 * 1000,
    ...options,
  });
}

// Suspense query hook (for React Suspense)
export function use{Feature}Suspense(
  id: string | number,
  options?: Omit<Parameters<typeof useSuspenseQuery<{Feature}>>[0], 'queryKey' | 'queryFn'>
) {
  return useSuspenseQuery({
    queryKey: {feature}Keys.detail(id),
    queryFn: () => {feature}Service.getById(id),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}

// Search query hook with debouncing
export function use{Feature}Search(
  query: string,
  options?: Omit<UseQueryOptions<{Feature}ListResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: {feature}Keys.search(query),
    queryFn: () => {feature}Service.getAll({ search: query }),
    enabled: query.length >= 2, // Only search with 2+ characters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000,
    ...options,
  });
}

// Related data query hook
export function use{Feature}Related(
  id: string | number | undefined,
  relation: string,
  options?: Omit<UseQueryOptions<any[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: {feature}Keys.related(id!, relation),
    queryFn: () => {feature}Service.getRelated(id!, relation),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
```

### 6. Mutation Hooks Implementation

Create mutation hooks with proper optimistic updates and error handling:

```tsx
// src/features/{feature}/mutations.ts
import { 
  useMutation, 
  useQueryClient,
  type UseMutationOptions 
} from '@tanstack/react-query';
import { {feature}Keys } from './keys';
import { {feature}Service } from './services';
import type { {Feature}, {Feature}CreateInput, {Feature}UpdateInput } from './types';

// Create mutation hook
export function useCreate{Feature}(
  options?: UseMutationOptions<{Feature}, Error, {Feature}CreateInput>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: {feature}Service.create,
    onSuccess: (newItem) => {
      // Invalidate and refetch list queries
      queryClient.invalidateQueries({ queryKey: {feature}Keys.lists() });
      
      // Optimistically add to cache
      queryClient.setQueryData({feature}Keys.detail(newItem.id), newItem);
      
      // Update list cache if exists
      queryClient.setQueriesData(
        { queryKey: {feature}Keys.lists() },
        (oldData: any) => {
          if (!oldData) return oldData;
          if (Array.isArray(oldData)) {
            return [newItem, ...oldData];
          }
          if (oldData.items) {
            return { ...oldData, items: [newItem, ...oldData.items] };
          }
          return oldData;
        }
      );
    },
    onError: (error) => {
      console.error('Failed to create {feature}:', error);
    },
    ...options,
  });
}

// Update mutation hook
export function useUpdate{Feature}(
  options?: UseMutationOptions<{Feature}, Error, { id: string | number; data: {Feature}UpdateInput }>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => {feature}Service.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: {feature}Keys.detail(id) });

      // Snapshot previous value
      const previousItem = queryClient.getQueryData({feature}Keys.detail(id));

      // Optimistically update
      queryClient.setQueryData({feature}Keys.detail(id), (old: {Feature} | undefined) => 
        old ? { ...old, ...data } : undefined
      );

      return { previousItem, id };
    },
    onSuccess: (updatedItem, { id }) => {
      // Update detail cache
      queryClient.setQueryData({feature}Keys.detail(id), updatedItem);
      
      // Update list caches
      queryClient.setQueriesData(
        { queryKey: {feature}Keys.lists() },
        (oldData: any) => {
          if (!oldData) return oldData;
          if (Array.isArray(oldData)) {
            return oldData.map((item) => 
              item.id === id ? updatedItem : item
            );
          }
          if (oldData.items) {
            return {
              ...oldData,
              items: oldData.items.map((item: any) =>
                item.id === id ? updatedItem : item
              ),
            };
          }
          return oldData;
        }
      );
    },
    onError: (error, { id }, context) => {
      // Rollback on error
      if (context?.previousItem) {
        queryClient.setQueryData({feature}Keys.detail(id), context.previousItem);
      }
      console.error('Failed to update {feature}:', error);
    },
    onSettled: (data, error, { id }) => {
      // Always refetch after mutation settles
      queryClient.invalidateQueries({ queryKey: {feature}Keys.detail(id) });
    },
    ...options,
  });
}

// Delete mutation hook
export function useDelete{Feature}(
  options?: UseMutationOptions<void, Error, string | number>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: {feature}Service.delete,
    onMutate: async (id) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: {feature}Keys.detail(id) });
      await queryClient.cancelQueries({ queryKey: {feature}Keys.lists() });

      // Snapshot previous values
      const previousItem = queryClient.getQueryData({feature}Keys.detail(id));
      const previousLists = queryClient.getQueriesData({ queryKey: {feature}Keys.lists() });

      // Optimistically remove from cache
      queryClient.removeQueries({ queryKey: {feature}Keys.detail(id) });
      queryClient.setQueriesData(
        { queryKey: {feature}Keys.lists() },
        (oldData: any) => {
          if (!oldData) return oldData;
          if (Array.isArray(oldData)) {
            return oldData.filter((item) => item.id !== id);
          }
          if (oldData.items) {
            return {
              ...oldData,
              items: oldData.items.filter((item: any) => item.id !== id),
            };
          }
          return oldData;
        }
      );

      return { previousItem, previousLists, id };
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: {feature}Keys.lists() });
    },
    onError: (error, id, context) => {
      // Rollback on error
      if (context?.previousItem) {
        queryClient.setQueryData({feature}Keys.detail(id), context.previousItem);
      }
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      console.error('Failed to delete {feature}:', error);
    },
    ...options,
  });
}

// Bulk delete mutation hook
export function useBulkDelete{Feature}s(
  options?: UseMutationOptions<void, Error, (string | number)[]>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: {feature}Service.bulkDelete,
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: {feature}Keys.all });
    },
    onError: (error) => {
      console.error('Failed to bulk delete {feature}s:', error);
    },
    ...options,
  });
}
```

### 7. Query Utilities

Create utility functions for common query operations:

```tsx
// src/features/{feature}/utils.ts
import { useQueryClient } from '@tanstack/react-query';
import { {feature}Keys } from './keys';
import { {feature}Service } from './services';
import type { {Feature}, {Feature}ListParams } from './types';

// Custom hook for query utilities
export function use{Feature}QueryUtils() {
  const queryClient = useQueryClient();

  return {
    // Prefetch operations
    prefetch: async (id: string | number) => {
      await queryClient.prefetchQuery({
        queryKey: {feature}Keys.detail(id),
        queryFn: () => {feature}Service.getById(id),
        staleTime: 10 * 60 * 1000,
      });
    },

    prefetchList: async (params?: {Feature}ListParams) => {
      await queryClient.prefetchQuery({
        queryKey: {feature}Keys.list(JSON.stringify(params || {})),
        queryFn: () => {feature}Service.getAll(params),
        staleTime: 5 * 60 * 1000,
      });
    },

    // Cache operations
    setItem: (id: string | number, item: {Feature}) => {
      queryClient.setQueryData({feature}Keys.detail(id), item);
    },

    getItem: (id: string | number): {Feature} | undefined => {
      return queryClient.getQueryData({feature}Keys.detail(id));
    },

    // Invalidation operations
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: {feature}Keys.all });
    },

    invalidateList: () => {
      queryClient.invalidateQueries({ queryKey: {feature}Keys.lists() });
    },

    invalidateItem: (id: string | number) => {
      queryClient.invalidateQueries({ queryKey: {feature}Keys.detail(id) });
    },

    // Remove operations
    removeItem: (id: string | number) => {
      queryClient.removeQueries({ queryKey: {feature}Keys.detail(id) });
    },

    removeAll: () => {
      queryClient.removeQueries({ queryKey: {feature}Keys.all });
    },

    // Reset operations
    resetAll: () => {
      queryClient.resetQueries({ queryKey: {feature}Keys.all });
    },

    // Optimistic updates
    updateItemOptimistically: (id: string | number, updateFn: (old: {Feature}) => {Feature}) => {
      queryClient.setQueryData({feature}Keys.detail(id), updateFn);
    },
  };
}

// Standalone utility functions
export const {feature}QueryUtils = {
  // Query key helpers
  isListQuery: (queryKey: unknown[]): boolean => {
    return Array.isArray(queryKey) && queryKey.includes('list');
  },

  isDetailQuery: (queryKey: unknown[]): boolean => {
    return Array.isArray(queryKey) && queryKey.includes('detail');
  },

  extractIdFromDetailQuery: (queryKey: unknown[]): string | number | undefined => {
    if (!{feature}QueryUtils.isDetailQuery(queryKey)) return undefined;
    return queryKey[queryKey.length - 1] as string | number;
  },

  // Cache manipulation helpers
  updateItemInLists: (
    queryClient: any,
    updatedItem: {Feature},
    predicate?: (item: {Feature}) => boolean
  ) => {
    queryClient.setQueriesData(
      { queryKey: {feature}Keys.lists() },
      (oldData: any) => {
        if (!oldData) return oldData;
        
        const updateItem = (item: {Feature}) => {
          if (predicate ? predicate(item) : item.id === updatedItem.id) {
            return updatedItem;
          }
          return item;
        };

        if (Array.isArray(oldData)) {
          return oldData.map(updateItem);
        }
        
        if (oldData.items) {
          return {
            ...oldData,
            items: oldData.items.map(updateItem),
          };
        }
        
        return oldData;
      }
    );
  },

  removeItemFromLists: (
    queryClient: any,
    itemId: string | number,
    predicate?: (item: {Feature}) => boolean
  ) => {
    queryClient.setQueriesData(
      { queryKey: {feature}Keys.lists() },
      (oldData: any) => {
        if (!oldData) return oldData;
        
        const shouldRemove = (item: {Feature}) => {
          if (predicate) return predicate(item);
          return item.id === itemId;
        };

        if (Array.isArray(oldData)) {
          return oldData.filter((item) => !shouldRemove(item));
        }
        
        if (oldData.items) {
          return {
            ...oldData,
            items: oldData.items.filter((item: {Feature}) => !shouldRemove(item)),
          };
        }
        
        return oldData;
      }
    );
  },
};
```

### 8. TypeScript Interfaces

Define comprehensive TypeScript interfaces:

```tsx
// src/features/{feature}/types.ts

// Base entity interface
export interface {Feature} {
  id: string | number;
  // Add entity-specific fields
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  // ... other fields
}

// API response interfaces
export interface {Feature}ListResponse {
  items: {Feature}[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface {Feature}InfiniteResponse {
  items: {Feature}[];
  nextPage?: number;
  hasNextPage: boolean;
  page: number;
  total: number;
}

// Input interfaces
export interface {Feature}CreateInput {
  name: string;
  description?: string;
  // ... creation fields
}

export interface {Feature}UpdateInput {
  name?: string;
  description?: string;
  // ... update fields (all optional)
}

// Query parameter interfaces
export interface {Feature}ListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: {
    // Add filter-specific fields
    status?: string[];
    dateRange?: {
      from: string;
      to: string;
    };
  };
}

export interface {Feature}SearchParams {
  query: string;
  limit?: number;
  filters?: Partial<{Feature}ListParams['filters']>;
}

// Error interfaces
export interface {Feature}ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// Utility types
export type {Feature}Id = {Feature}['id'];
export type {Feature}Status = 'active' | 'inactive' | 'draft' | 'archived';

// Hook option types
export interface {Feature}QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
}

export interface {Feature}MutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}
```

### 9. Main Export File

Create a clean main export file:

```tsx
// src/features/{feature}/index.ts

// Query hooks
export {
  use{Feature}s,
  useInfinite{Feature}s,
  use{Feature},
  use{Feature}Suspense,
  use{Feature}Search,
  use{Feature}Related,
} from './queries';

// Mutation hooks
export {
  useCreate{Feature},
  useUpdate{Feature},
  useDelete{Feature},
  useBulkDelete{Feature}s,
} from './mutations';

// Utilities
export {
  use{Feature}QueryUtils,
  {feature}QueryUtils,
} from './utils';

// Query keys
export { {feature}Keys } from './keys';

// Services
export { {feature}Service } from './services';

// Types
export type {
  {Feature},
  {Feature}ListResponse,
  {Feature}InfiniteResponse,
  {Feature}CreateInput,
  {Feature}UpdateInput,
  {Feature}ListParams,
  {Feature}SearchParams,
  {Feature}ApiError,
  {Feature}Id,
  {Feature}Status,
  {Feature}QueryOptions,
  {Feature}MutationOptions,
} from './types';

// Re-export query key type
export type { {Feature}QueryKey } from './keys';
```

### 10. Global Query Configuration

Global React Query configuration:

```tsx
// src/lib/queries/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: 'always',
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.status >= 400 && error?.status < 500) {
          return error.status === 408 || error.status === 429 ? failureCount < 2 : false;
        }
        // Retry on network errors and 5xx errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry mutations on client errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    },
  },
});

// Global error handler
queryClient.setMutationDefaults(['mutation'], {
  onError: (error: any) => {
    console.error('Mutation error:', error);
    // Add global error handling (toast, logging, etc.)
  },
});

// Global query error handler
queryClient.setQueryDefaults(['query'], {
  onError: (error: any) => {
    console.error('Query error:', error);
    // Add global error handling
  },
});
```

### 11. Usage Examples

#### Basic Query Usage:
```tsx
import { use{Feature}s, use{Feature} } from '@lib/queries/{feature}';

function {Feature}List() {
  const { data: {feature}s, isLoading, error } = use{Feature}s({
    page: 1,
    limit: 10,
    filters: { status: ['active'] }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!{feature}s) return <div>No data</div>;

  return (
    <div>
      {surveys.items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

#### Mutation Usage:
```tsx
import { useCreate{Feature}, use{Feature}QueryUtils } from '@lib/queries/{feature}';

function Create{Feature}Form() {
  const create{Feature} = useCreate{Feature}({
    onSuccess: () => {
      console.log('{Feature} created successfully!');
    }
  });
  
  const handleSubmit = (data: {Feature}CreateInput) => {
    create{Feature}.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={create{Feature}.isPending}
      >
        {create{Feature}.isPending ? 'Creating...' : 'Create {Feature}'}
      </button>
    </form>
  );
}
```

### 14. Best Practices Checklist

- [ ] Created centralized query key factory
- [ ] Implemented proper error handling and retry logic
- [ ] Added optimistic updates for mutations
- [ ] Used TypeScript interfaces for all data structures
- [ ] Implemented proper cache invalidation strategies
- [ ] Added prefetching for predictable data needs
- [ ] Used React.Suspense patterns where appropriate
- [ ] Implemented proper loading and error states
- [ ] Added proper stale time and cache time configurations
- [ ] Created reusable query utilities
- [ ] Implemented bulk operations where needed
- [ ] Added proper pagination and infinite scrolling
- [ ] Used consistent naming conventions
- [ ] Added comprehensive TypeScript types
- [ ] Implemented error boundaries for query errors

### 15. Performance Considerations

- **Stale Time**: Set appropriate stale times based on data volatility
- **Cache Time**: Configure cache times based on memory constraints
- **Background Refetching**: Enable for critical data, disable for less important data
- **Query Key Structure**: Use hierarchical keys for efficient invalidation
- **Optimistic Updates**: Implement for better user experience
- **Prefetching**: Use for predictable user navigation patterns
- **Infinite Queries**: Use for large lists instead of traditional pagination
- **Suspense**: Use with React 18+ for better loading states

### 16. Testing Considerations

- Mock React Query hooks in component tests
- Test query key factories for consistency
- Test optimistic updates and rollback scenarios
- Test error handling and retry logic
- Test cache invalidation strategies
- Use MSW (Mock Service Worker) for API mocking
- Test loading and error states
- Test infinite query pagination

## Notes

- Always use the latest TanStack Query v5 patterns
- Implement proper TypeScript types for better developer experience
- Consider using React Query with Suspense for better UX
- Implement proper error boundaries for query errors
- Use query key factories for consistent cache management
- Implement optimistic updates for better perceived performance
- Always handle loading and error states in components
- Use prefetching strategically to improve performance
- Consider implementing offline support with background sync
- Monitor query performance using React Query DevTools