import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse, 
  type AxiosError,
  type InternalAxiosRequestConfig 
} from 'axios';
import axiosRetry from 'axios-retry';

// Extend Axios types to include metadata
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: {
      startTime?: number;
      [key: string]: any;
    };
    _retry?: boolean;
  }
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const API_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

// Error response interface
export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, any>;
  timestamp?: string;
}

// Request/Response interceptor types
interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

// Token management - you can integrate this with your auth store
let authTokens: AuthTokens = {};

export const setAuthTokens = (tokens: AuthTokens) => {
  authTokens = tokens;
};

export const clearAuthTokens = () => {
  authTokens = {};
};

export const getAuthTokens = (): AuthTokens => authTokens;

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Configure axios-retry
  axiosRetry(instance, {
    retries: MAX_RETRIES,
    retryDelay: (retryCount) => {
      // Exponential backoff with jitter
      const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
      const jitter = Math.random() * 0.1 * delay;
      return delay + jitter;
    },
    retryCondition: (error: AxiosError) => {
      // Retry on network errors and 5xx server errors
      if (axiosRetry.isNetworkError(error)) {
        return true;
      }
      
      // Retry on specific HTTP status codes
      if (error.response?.status) {
        const status = error.response.status;
        // Retry on server errors (5xx) and specific client errors
        return status >= 500 || status === 408 || status === 429;
      }
      
      return false;
    },
    shouldResetTimeout: true,
    onRetry: (retryCount, error, requestConfig) => {
      console.warn(
        `API retry attempt ${retryCount} for ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`,
        { error: error.message }
      );
    },
  });

  return instance;
};

// Create the main API instance
export const api = createApiClient();

// Request interceptor - Add auth token and request logging
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authorization token if available
    if (authTokens.accessToken) {
      config.headers.Authorization = `Bearer ${authTokens.accessToken}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
        headers: config.headers,
      });
    }

    // Add request timestamp
    config.metadata = { 
      ...config.metadata, 
      startTime: Date.now() 
    };

    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      const duration = Date.now() - (response.config.metadata?.startTime || 0);
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          duration: `${duration}ms`,
          data: response.data,
        }
      );
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { 
      _retry?: boolean 
    };

    // Log error in development
    if (import.meta.env.DEV) {
      const duration = Date.now() - (originalRequest?.metadata?.startTime || 0);
      console.error(
        `❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`,
        {
          status: error.response?.status,
          duration: `${duration}ms`,
          message: error.message,
          data: error.response?.data,
        }
      );
    }

    // Handle 401 Unauthorized - Token refresh logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        if (authTokens.refreshToken) {
          const refreshResponse = await refreshAccessToken(authTokens.refreshToken);
          
          if (refreshResponse.accessToken) {
            setAuthTokens({
              accessToken: refreshResponse.accessToken,
              refreshToken: refreshResponse.refreshToken || authTokens.refreshToken,
            });

            // Retry the original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;
            }
            
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        clearAuthTokens();
        
        // Dispatch logout event or redirect to login
        window.dispatchEvent(new CustomEvent('auth:logout', { 
          detail: { reason: 'token_refresh_failed' } 
        }));
        
        return Promise.reject(createApiError(error));
      }
    }

    // Handle other errors
    return Promise.reject(createApiError(error));
  }
);

// Token refresh function
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    return response.data;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

// Create standardized API error
const createApiError = (error: AxiosError): ApiError => {
  const response = error.response;
  const data = response?.data as any;

  return {
    message: data?.message || error.message || 'An unexpected error occurred',
    code: data?.code || error.code || 'UNKNOWN_ERROR',
    status: response?.status || 0,
    details: data?.details || data || {},
    timestamp: new Date().toISOString(),
  };
};

// API utility functions
export const apiUtils = {
  // Health check
  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const { data } = await api.get('/health');
    return data;
  },

  // Upload file
  uploadFile: async (
    file: File, 
    endpoint: string = '/upload',
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });

    return data;
  },

  // Download file
  downloadFile: async (
    url: string, 
    filename?: string
  ): Promise<void> => {
    const response = await api.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  },

  // Cancel all pending requests
  cancelAllRequests: () => {
    // This would require implementing a request cancellation system
    console.warn('Cancel all requests not implemented yet');
  },

  // Get API stats
  getApiStats: () => {
    return {
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      maxRetries: MAX_RETRIES,
      hasAuthToken: !!authTokens.accessToken,
    };
  },
};

// Export types
export type { AxiosRequestConfig, AxiosResponse, AxiosError };

// Default export
export default api;