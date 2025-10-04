# Token Refresh and Logout Implementation

This document explains the implementation of refresh token functionality using `/api/token/refresh` and logout using `/api/logout`.

## Overview

The authentication system now supports:
- ✅ **Automatic token refresh** on 401 responses
- ✅ **Manual token refresh** using `/api/token/refresh` endpoint
- ✅ **Server-side logout** using `/api/logout` endpoint
- ✅ **Concurrent refresh prevention** to avoid multiple simultaneous refresh calls
- ✅ **Proper token storage** for both access and refresh tokens

## API Endpoints

### Token Refresh
- **Endpoint**: `POST /api/token/refresh`
- **Payload**: `{ refresh_token: string }`
- **Response**: `{ token: string, refreshToken?: string }`

### Logout
- **Endpoint**: `POST /api/logout`
- **Payload**: None (uses Authorization header)
- **Response**: Success/error status

## Implementation Details

### 1. AuthApiService Updates (`src/auth/services/authApi.ts`)

#### Refresh Token Method
```typescript
async refreshToken(): Promise<LoginResponse | null> {
  // Prevents multiple concurrent refresh attempts
  if (this.refreshPromise) {
    return this.refreshPromise;
  }

  // Calls /api/token/refresh endpoint
  // Updates stored tokens on success
  // Clears tokens on failure
}
```

#### Logout Method
```typescript
async logout(): Promise<void> {
  // Calls /api/logout endpoint
  // Always clears local tokens (even if server call fails)
}
```

#### Automatic Token Refresh
- **Response Interceptor**: Automatically detects 401 responses
- **Retry Logic**: Attempts token refresh and retries original request
- **Fallback**: Forces logout if refresh fails

### 2. TokenService Updates (`src/auth/services/tokenService.ts`)

#### New Utility Methods
```typescript
setTokens(token: string, refreshToken?: string): void
hasValidRefreshToken(): boolean
shouldRefreshToken(token?: string): boolean
```

### 3. Login Flow Updates

The login method now handles refresh tokens from the server:
```typescript
async login(credentials: Credentials): Promise<LoginResponse> {
  const response = await this.client.post('/api/login', credentials);
  const { token, refreshToken } = response.data;
  
  // Store both tokens
  tokenService.setTokens(token, refreshToken);
  
  return { token, user, refreshToken };
}
```

## Usage Examples

### Manual Token Refresh
```typescript
import { authApiService } from '@auth/services/authApi';

// Manual refresh
const result = await authApiService.refreshToken();
if (result) {
  console.log('Token refreshed:', result.token);
} else {
  console.log('Refresh failed or no refresh token available');
}
```

### Automatic Refresh Check
```typescript
// Check if token is valid and refresh if needed
const isValid = await authApiService.ensureValidToken();
if (isValid) {
  // Token is valid, proceed with API calls
} else {
  // No valid token available, user needs to login
}
```

### Logout
```typescript
import { useAuth } from '@auth/hooks/useAuth';

const { logout } = useAuth();

// Calls /api/logout and clears local tokens
await logout();
```

## Demo Component

A comprehensive demo component is available at `src/auth/components/AuthTokenDemo.tsx` that showcases:

- **Real-time token status** (expiration, validity, etc.)
- **Manual refresh button**
- **Auto-refresh testing**
- **Logout functionality**
- **Token information display**

### Viewing the Demo

1. **In Storybook**: Navigate to `Auth > AuthTokenDemo`
2. **In Application**: Import and use the `AuthTokenDemo` component

## Token Refresh Behavior

### Automatic Refresh Triggers
1. **401 Response**: Any API call returning 401 triggers refresh attempt
2. **Expiry Check**: Tokens expiring within 5 minutes are considered expired
3. **Interceptor**: Response interceptor handles refresh seamlessly

### Refresh Success Flow
1. Call `/api/token/refresh` with current refresh token
2. Store new access token (and refresh token if provided)
3. Retry original failed request with new token
4. Return successful response to caller

### Refresh Failure Flow
1. Clear all stored tokens
2. Dispatch `auth:unauthorized` event
3. Force user logout
4. Redirect to login (handled by auth guards)

## Security Considerations

### Token Storage
- **Access tokens**: Stored in localStorage with expiration validation
- **Refresh tokens**: Stored separately, used only for refresh calls
- **Automatic cleanup**: Tokens cleared on logout or refresh failure

### Concurrent Requests
- **Single refresh promise**: Prevents multiple simultaneous refresh attempts
- **Request queuing**: Failed requests wait for refresh to complete
- **Retry mechanism**: Original requests automatically retried with new token

### Error Handling
- **Graceful degradation**: Continues working even if refresh fails
- **User notification**: Auth state properly updated on failures
- **Event system**: Custom events for auth state changes

## Testing

### Unit Tests
- Mock API responses for refresh and logout endpoints
- Test token expiration logic
- Verify error handling paths

### Integration Tests
- Test automatic refresh on 401 responses
- Verify token persistence across browser sessions
- Test logout flow end-to-end

### Demo Testing
Use the `AuthTokenDemo` component to manually test:
- Token refresh functionality
- Logout behavior
- Real-time token status updates
- Error scenarios

## Configuration

### Environment Variables
```bash
VITE_API_BASE_URL=http://localhost:8000  # Backend API URL
```

### Token Configuration
```typescript
// In tokenService.ts
const config = {
  tokenKey: 'libre_survey_token',
  refreshTokenKey: 'libre_survey_refresh_token',
  tokenExpiryBuffer: 5, // minutes before expiry to refresh
};
```

## Troubleshooting

### Common Issues

1. **Refresh token not working**
   - Verify `/api/token/refresh` endpoint exists
   - Check refresh token is being stored correctly
   - Ensure refresh token hasn't expired server-side

2. **Logout not clearing session**
   - Verify `/api/logout` endpoint implementation
   - Check if server-side session invalidation is working
   - Ensure local token cleanup is happening

3. **Multiple refresh calls**
   - Should be prevented by `refreshPromise` mechanism
   - Check if multiple auth interceptors are registered

### Debug Information

Enable debug logging by setting:
```typescript
// In browser console
localStorage.setItem('debug', 'auth:*');
```

This will show detailed information about:
- Token refresh attempts
- API call interceptors
- Storage operations
- Error conditions

## Future Enhancements

### Potential Improvements
1. **Refresh token rotation**: Update refresh token on each refresh
2. **Token revocation**: Call dedicated revoke endpoint on logout
3. **Background refresh**: Proactively refresh tokens before expiry
4. **Offline support**: Handle refresh when offline/reconnecting
5. **Multiple refresh tokens**: Support different scopes/permissions