// Main exports for React Query setup
export { queryClient, queryClientUtils, devToolsConfig } from './queryClient';
export { QueryErrorBoundary, DefaultErrorFallback } from './ErrorBoundary';
export type { QueryErrorBoundaryProps } from './ErrorBoundary';

// Re-export commonly used React Query hooks and utilities
export {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useSuspenseQuery,
  useQueryClient,
  useIsFetching,
  useIsMutating,
  useQueries,
  useMutationState,
  useIsRestoring,
} from '@tanstack/react-query';

// Re-export commonly used types
export type {
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  QueryKey,
  QueryFunction,
  MutationFunction,
  QueryClient,
  InfiniteData,
} from '@tanstack/react-query';