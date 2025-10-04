import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AuthTokenDemo } from './AuthTokenDemo';
import authSliceReducer from '../store/authSlice';

// Mock store for authenticated state
const createMockStore = (initialState: any) => {
    return configureStore({
        reducer: {
            auth: authSliceReducer,
        },
        preloadedState: {
            auth: initialState,
        },
    });
};

const meta: Meta<typeof AuthTokenDemo> = {
    title: 'Auth/AuthTokenDemo',
    component: AuthTokenDemo,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Auth Token Demo

This component demonstrates the token refresh and logout functionality:

## Features Demonstrated:
- **Token Status Display**: Shows current token information and expiration
- **Manual Token Refresh**: Button to manually call the \`/api/token/refresh\` endpoint
- **Auto Refresh Testing**: Test the automatic token refresh logic
- **Logout**: Call the \`/api/logout\` endpoint and clear tokens
- **Real-time Updates**: Token expiration countdown updates every second

## API Endpoints Used:
- \`POST /api/token/refresh\` - Refresh access token using refresh token
- \`POST /api/logout\` - Logout user and invalidate tokens
- \`POST /api/login\` - Login to get initial tokens

## Token Refresh Logic:
- Tokens are automatically refreshed when they expire within 5 minutes
- 401 responses trigger automatic token refresh attempts
- If refresh fails, user is logged out automatically
        `,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const store = createMockStore(context.args);
            return (
                <Provider store={store}>
                    <div className="min-h-screen bg-background p-4">
                        <Story />
                    </div>
                </Provider>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof AuthTokenDemo>;

// Story for unauthenticated state
export const Unauthenticated: Story = {
    args: {
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
        isLoading: false,
        error: null,
    },
};

// Story for authenticated state with valid token
export const AuthenticatedWithValidToken: Story = {
    args: {
        isAuthenticated: true,
        user: {
            id: '1',
            username: 'demo_user',
            name: 'Demo User',
            role: 'user',
            permissions: ['read', 'write'],
        },
        token: 'mock.jwt.token.here',
        refreshToken: 'mock.refresh.token.here',
        isLoading: false,
        error: null,
    },
};

// Story for authenticated state with expiring token
export const AuthenticatedWithExpiringToken: Story = {
    args: {
        isAuthenticated: true,
        user: {
            id: '1',
            username: 'demo_user',
            name: 'Demo User',
            role: 'admin',
            permissions: ['read', 'write', 'admin'],
        },
        token: 'mock.jwt.token.expiring.soon',
        refreshToken: 'mock.refresh.token.here',
        isLoading: false,
        error: null,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows the component when the token is about to expire (< 5 minutes remaining).',
            },
        },
    },
};

// Story for authenticated state without refresh token
export const AuthenticatedWithoutRefreshToken: Story = {
    args: {
        isAuthenticated: true,
        user: {
            id: '1',
            username: 'demo_user',
            name: 'Demo User',
            role: 'user',
            permissions: ['read'],
        },
        token: 'mock.jwt.token.here',
        refreshToken: null,
        isLoading: false,
        error: null,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows the component when no refresh token is available. Manual refresh will be disabled.',
            },
        },
    },
};

// Interactive story for testing token refresh
export const InteractiveTokenManagement: Story = {
    args: {
        isAuthenticated: true,
        user: {
            id: '1',
            username: 'test_user',
            name: 'Test User',
            role: 'admin',
            permissions: ['read', 'write', 'admin', 'manage_tokens'],
        },
        token: 'mock.jwt.token.here',
        refreshToken: 'mock.refresh.token.here',
        isLoading: false,
        error: null,
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive story that demonstrates all token management features:

1. **View Token Status**: Real-time display of token information
2. **Manual Refresh**: Click to manually refresh tokens
3. **Auto Refresh Test**: Test the automatic refresh logic
4. **Logout**: Test the logout functionality

Use the buttons in the component to test the different token management features.
        `,
            },
        },
    },
};

// Story showing loading state during refresh
export const RefreshingToken: Story = {
    args: {
        isAuthenticated: true,
        user: {
            id: '1',
            username: 'demo_user',
            name: 'Demo User',
            role: 'user',
            permissions: ['read', 'write'],
        },
        token: 'mock.jwt.token.here',
        refreshToken: 'mock.refresh.token.here',
        isLoading: true,
        error: null,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows the component during a token refresh operation with loading states.',
            },
        },
    },
};