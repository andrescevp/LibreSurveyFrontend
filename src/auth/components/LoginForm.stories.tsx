import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'Auth/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Login form component for user authentication.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        submitText: { control: 'text' },
        showRememberMe: { control: 'boolean' },
        showForgotPassword: { control: 'boolean' },
        className: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSuccess: () => console.log('Login success'),
        onForgotPassword: () => console.log('Forgot password clicked'),
    },
};

export const CustomSubmitText: Story = {
    args: {
        ...Default.args,
        submitText: 'Login to Dashboard',
    },
};

export const NoRememberMe: Story = {
    args: {
        ...Default.args,
        showRememberMe: false,
    },
};

export const NoForgotPassword: Story = {
    args: {
        ...Default.args,
        showForgotPassword: false,
    },
};

export const Minimal: Story = {
    args: {
        ...Default.args,
        showRememberMe: false,
        showForgotPassword: false,
        submitText: 'Sign In',
    },
};

export const WithCustomClass: Story = {
    args: {
        ...Default.args,
        className: 'border border-border rounded-lg p-6',
    },
};