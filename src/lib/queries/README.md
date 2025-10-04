# React Query & API Setup

This document explains how to use the React Query features and API client in the LibreSurvey frontend.

## Overview

The project uses TanStack Query v5 (React Query) for data fetching, caching, and synchronization with an Axios-based API client that includes automatic retries and authentication handling.

## Key Files

- `src/lib/api.ts` - Axios API client with retry logic and auth integration
- `src/lib/queries/queryClient.ts` - React Query client configuration
- `src/lib/queries/ErrorBoundary.tsx` - Error boundary for query errors
- `src/lib/queries/examples/surveys.ts` - Example implementation

## API Client Features

### Configuration

The API client is configured with:
- Base URL from `VITE_API_BASE_URL` environment variable
- 30-second timeout
- Automatic retry logic (max 3 retries)
- Request/response interceptors for logging and auth

### Authentication Integration

The API client automatically:
- Includes Bearer tokens in requests
- Handles token refresh on 401 errors
- Syncs with the Redux auth store
- Dispatches logout events when token refresh fails

### Usage

```typescript
import { api, apiUtils } from '@lib/api';

// Basic API calls
const response = await api.get('/surveys');
const survey = await api.post('/surveys', data);

// Utility functions
await apiUtils.uploadFile(file, '/upload');
await apiUtils.downloadFile('/surveys/123/export', 'survey.pdf');
const stats = apiUtils.getApiStats();
```

## React Query Features

### Global Configuration

- **Stale Time**: 5 minutes for queries, 10 minutes for details
- **Cache Time**: 10 minutes for queries, 15 minutes for details
- **Retry Logic**: Smart retry based on error types
- **Error Handling**: Global error handlers with custom events

### Query Key Patterns

Always use the factory pattern for consistent cache management:

```typescript
export const featureKeys = {
  all: ['feature'] as const,
  lists: () => [...featureKeys.all, 'list'] as const,
  list: (filters: string) => [...featureKeys.lists(), { filters }] as const,
  details: () => [...featureKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...featureKeys.details(), id] as const,
} as const;
```

### Basic Query Hook

```typescript
export function useFeatures(
  params?: FeatureListParams,
  options?: Omit<UseQueryOptions<FeatureListResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: featureKeys.list(JSON.stringify(params || {})),
    queryFn: () => featureService.getAll(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
}
```

### Mutation Hook with Optimistic Updates

```typescript
export function useCreateFeature(
  options?: UseMutationOptions<Feature, Error, FeatureCreateInput>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: featureService.create,
    onSuccess: (newItem) => {
      // Invalidate and refetch list queries
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() });
      
      // Optimistically add to cache
      queryClient.setQueryData(featureKeys.detail(newItem.id), newItem);
    },
    ...options,
  });
}
```

## Error Handling

### Error Boundary

Wrap components that use queries with the error boundary:

```tsx
import { QueryErrorBoundary } from '@lib/queries';

function App() {
  return (
    <QueryErrorBoundary>
      <YourComponent />
    </QueryErrorBoundary>
  );
}
```

### Custom Error Handling

Listen for global error events:

```typescript
useEffect(() => {
  const handleQueryError = (event: CustomEvent) => {
    console.error('Query error:', event.detail);
    // Show toast, log to service, etc.
  };

  window.addEventListener('api:query-error', handleQueryError);
  window.addEventListener('api:mutation-error', handleQueryError);

  return () => {
    window.removeEventListener('api:query-error', handleQueryError);
    window.removeEventListener('api:mutation-error', handleQueryError);
  };
}, []);
```

## Best Practices

### 1. File Structure

Organize query features in folders:

```
src/lib/queries/surveys/
├── index.ts          # Main exports
├── queries.ts        # Query hooks
├── mutations.ts      # Mutation hooks
├── keys.ts           # Query key factory
├── services.ts       # API service functions
├── types.ts          # TypeScript interfaces
└── utils.ts          # Query utilities
```

### 2. Error Handling

- Always handle loading and error states
- Use error boundaries for unexpected errors
- Implement proper retry logic
- Log errors for debugging

### 3. Performance

- Set appropriate stale times based on data volatility
- Use prefetching for predictable navigation
- Implement optimistic updates for better UX
- Use infinite queries for large lists

### 4. TypeScript

- Define comprehensive interfaces for all data
- Use proper generic types for hooks
- Export types alongside hooks

### 5. Testing

- Mock React Query hooks in tests
- Test error scenarios and loading states
- Use MSW for API mocking
- Test cache invalidation strategies

## Development Tools

The React Query DevTools are automatically included in development mode:

- Press the floating React Query button to open
- Inspect queries, mutations, and cache
- Monitor network requests and timing
- Debug cache invalidation

## Environment Variables

Required environment variables:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

## Examples

See `src/lib/queries/examples/surveys.ts` for a complete example implementation following all best practices.

## Migration Guide

When migrating existing data fetching to React Query:

1. Create query key factory
2. Move API calls to service functions
3. Create query hooks
4. Replace useEffect + fetch with useQuery
5. Add proper error handling
6. Implement optimistic updates for mutations
7. Add tests for new hooks

## Troubleshooting

### Common Issues

- **"QueryClient not found"**: Ensure QueryClientProvider wraps your app
- **Infinite refetching**: Check query key stability
- **Stale data**: Adjust staleTime or invalidate manually
- **Memory leaks**: Set appropriate gcTime values

### Debug Tips

- Use React Query DevTools
- Check browser Network tab
- Log query keys for debugging
- Monitor cache stats with `queryClientUtils.getCacheStats()`