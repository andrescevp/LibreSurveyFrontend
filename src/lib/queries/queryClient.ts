import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import type { ApiError } from '../api';

// Global React Query configuration
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Global defaults for queries
      staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes - data stays in cache for 10 minutes
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: true, // Refetch when component mounts
      refetchOnReconnect: 'always', // Always refetch when reconnecting
      retry: (failureCount, error: any) => {
        // Custom retry logic
        const apiError = error as ApiError;
        
        // Don't retry on 4xx client errors except for specific cases
        if (apiError?.status >= 400 && apiError?.status < 500) {
          // Retry on 408 (Request Timeout) and 429 (Too Many Requests)
          return apiError.status === 408 || apiError.status === 429 
            ? failureCount < 2 
            : false;
        }
        
        // Retry on network errors and 5xx server errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => {
        // Exponential backoff with a max delay of 30 seconds
        return Math.min(1000 * Math.pow(2, attemptIndex), 30000);
      },
    },
    mutations: {
      // Global defaults for mutations
      retry: (failureCount, error: any) => {
        const apiError = error as ApiError;
        
        // Don't retry mutations on client errors (4xx)
        if (apiError?.status >= 400 && apiError?.status < 500) {
          return false;
        }
        
        // Only retry once on server errors (5xx) or network errors
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => {
        // Shorter delay for mutations (max 5 seconds)
        return Math.min(1000 * Math.pow(2, attemptIndex), 5000);
      },
    },
  },
};

// Create the query client instance
export const queryClient = new QueryClient(queryClientConfig);

// Global error handlers - using event listeners instead of defaults
const handleMutationError = (error: any) => {
  const apiError = error as ApiError;
  console.error('Mutation error:', {
    message: apiError.message,
    code: apiError.code,
    status: apiError.status,
    details: apiError.details,
  });
  
  // Add global error handling here
  // For example: show toast notification, log to external service, etc.
  if (typeof window !== 'undefined') {
    // Dispatch global error event
    window.dispatchEvent(new CustomEvent('api:mutation-error', {
      detail: apiError
    }));
  }
};

const handleQueryError = (error: any) => {
  const apiError = error as ApiError;
  console.error('Query error:', {
    message: apiError.message,
    code: apiError.code,
    status: apiError.status,
    details: apiError.details,
  });
  
  // Add global error handling here
  if (typeof window !== 'undefined') {
    // Dispatch global error event
    window.dispatchEvent(new CustomEvent('api:query-error', {
      detail: apiError
    }));
  }
};

// Set up global error handling
queryClient.getQueryCache().subscribe((event) => {
  if (event.type === 'updated' && event.query.state.status === 'error') {
    handleQueryError(event.query.state.error);
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event.type === 'updated' && event.mutation.state.status === 'error') {
    handleMutationError(event.mutation.state.error);
  }
});

// Query client utilities
export const queryClientUtils = {
  // Clear all queries and mutations
  clear: () => {
    queryClient.clear();
  },

  // Invalidate all queries
  invalidateAll: () => {
    queryClient.invalidateQueries();
  },

  // Reset all queries to their initial state
  resetAll: () => {
    queryClient.resetQueries();
  },

  // Remove all queries from cache
  removeAll: () => {
    queryClient.removeQueries();
  },

  // Get cache stats
  getCacheStats: () => {
    const cache = queryClient.getQueryCache();
    const mutationCache = queryClient.getMutationCache();
    
    return {
      queries: {
        total: cache.getAll().length,
        fresh: cache.getAll().filter(query => {
          const staleTime = (query as any).options?.staleTime || 0;
          return query.state.dataUpdatedAt > Date.now() - staleTime;
        }).length,
        stale: cache.getAll().filter(query => {
          const staleTime = (query as any).options?.staleTime || 0;
          return query.state.dataUpdatedAt <= Date.now() - staleTime;
        }).length,
        loading: cache.getAll().filter(query => query.state.fetchStatus === 'fetching').length,
        error: cache.getAll().filter(query => query.state.status === 'error').length,
      },
      mutations: {
        total: mutationCache.getAll().length,
        pending: mutationCache.getAll().filter(mutation => mutation.state.status === 'pending').length,
        error: mutationCache.getAll().filter(mutation => mutation.state.status === 'error').length,
      },
    };
  },

  // Log cache information (for debugging)
  logCacheInfo: () => {
    const stats = queryClientUtils.getCacheStats();
    console.group('🗄️ React Query Cache Stats');
    console.table(stats.queries);
    console.table(stats.mutations);
    console.groupEnd();
  },

  // Prefetch multiple queries
  prefetchQueries: async (queries: Array<{ queryKey: any[]; queryFn: () => Promise<any> }>) => {
    const promises = queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    );
    
    await Promise.allSettled(promises);
  },

  // Set offline mode
  setOnlineMode: (isOnline: boolean) => {
    queryClient.setDefaultOptions({
      queries: {
        networkMode: isOnline ? 'online' : 'offlineFirst',
      },
      mutations: {
        networkMode: isOnline ? 'online' : 'offlineFirst',
      },
    });
  },
};

// Development tools configuration
export const devToolsConfig = {
  initialIsOpen: false,
  position: 'bottom-right' as const,
  toggleButtonProps: {
    style: {
      marginLeft: '5px',
    },
  },
};

// Export default
export default queryClient;