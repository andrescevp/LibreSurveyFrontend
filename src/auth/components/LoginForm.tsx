import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@ui/atoms/Button';
import { Input } from '@ui/atoms/Input';
import { Alert } from '@ui/atoms/Alert';
import { useAuth } from '../hooks/useAuth';
import type { LoginRequest } from '../types';

/**
 * Login Form Props
 */
export interface LoginFormProps {
    /** Callback after successful login */
    onSuccess?: () => void;
    /** Custom submit button text */
    submitText?: string;
    /** Show remember me checkbox */
    showRememberMe?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Show forgot password link */
    showForgotPassword?: boolean;
    /** Forgot password callback */
    onForgotPassword?: () => void;
}

/**
 * Login Form Data
 */
interface LoginFormData {
    username: string;
    password: string;
    rememberMe?: boolean;
}

/**
 * Login Form Component
 */
export const LoginForm: React.FC<LoginFormProps> = ({
    onSuccess,
    submitText = 'Sign In',
    showRememberMe = true,
    className = '',
    showForgotPassword = true,
    onForgotPassword,
}) => {
    const { login, isLoading, error, clearError } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<LoginFormData>({
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            clearError();

            const loginRequest: LoginRequest = {
                username: data.username.trim(),
                password: data.password,
                rememberMe: data.rememberMe,
            };

            await login(loginRequest);
            reset();
            onSuccess?.();
        } catch (err) {
            // Error is handled by the auth hook
            console.error('Login failed:', err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`w-full max-w-md mx-auto ${className}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                    <p className="text-muted-foreground mt-2">
                        Sign in to your LibreSurvey account
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <div className="flex items-start">
                            <div className="flex-1">
                                <h4 className="font-medium">Sign in failed</h4>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearError}
                                className="ml-2 h-auto p-1"
                            >
                                ×
                            </Button>
                        </div>
                    </Alert>
                )}

                {/* Username Field */}
                <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-foreground">
                        Username/Email Address
                    </label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        {...register('username', {
                            required: 'Username is required',
                            minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters',
                            },
                        })}
                        className={errors.username ? 'border-destructive' : ''}
                        disabled={isLoading}
                    />
                    {errors.username && (
                        <p className="text-sm text-destructive">{errors.username.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    {showRememberMe && (
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                {...register('rememberMe')}
                                className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                                disabled={isLoading}
                            />
                            <label
                                htmlFor="rememberMe"
                                className="ml-2 text-sm text-muted-foreground"
                            >
                                Remember me
                            </label>
                        </div>
                    )}

                    {showForgotPassword && (
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                            disabled={isLoading}
                        >
                            Forgot password?
                        </button>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !isValid}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            <LogIn className="w-4 h-4 mr-2" />
                            {submitText}
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;