import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authApiService } from '../services/authApi';
import { tokenService } from '../services/tokenService';
import { Button } from '@ui/atoms/Button';
import { Card } from '@ui/molecules/Card';
import { Badge } from '@ui/atoms/Badge';

/**
 * Auth Token Demo Component
 * Demonstrates token refresh and logout functionality
 */
export const AuthTokenDemo: React.FC = () => {
    const { isAuthenticated, user, logout, isLoading } = useAuth();
    const [tokenInfo, setTokenInfo] = useState<{
        hasToken: boolean;
        hasRefreshToken: boolean;
        tokenExpiration: Date | null;
        timeUntilExpiry: number | null;
        shouldRefresh: boolean;
    } | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

    // Update token info periodically
    useEffect(() => {
        if (!isAuthenticated) {
            setTokenInfo(null);
            return;
        }

        const updateTokenInfo = () => {
            const token = tokenService.getToken();
            const refreshToken = tokenService.getRefreshToken();

            if (token) {
                const expiration = tokenService.getTokenExpiration(token);
                const timeUntilExpiry = tokenService.getTimeUntilExpiry(token);
                const shouldRefresh = tokenService.shouldRefreshToken(token);

                setTokenInfo({
                    hasToken: true,
                    hasRefreshToken: !!refreshToken,
                    tokenExpiration: expiration,
                    timeUntilExpiry,
                    shouldRefresh,
                });
            } else {
                setTokenInfo(null);
            }
        };

        updateTokenInfo();
        const interval = setInterval(updateTokenInfo, 1000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const handleRefreshToken = async () => {
        if (refreshing) return;

        setRefreshing(true);
        try {
            const result = await authApiService.refreshToken();
            if (result) {
                setLastRefresh(new Date());
                console.log('Token refreshed successfully:', result);
            } else {
                console.warn('Token refresh returned null');
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setTokenInfo(null);
            setLastRefresh(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleTestAutoRefresh = async () => {
        try {
            const result = await authApiService.ensureValidToken();
            console.log('Auto refresh check result:', result);
        } catch (error) {
            console.error('Auto refresh check failed:', error);
        }
    };

    if (!isAuthenticated || !user) {
        return (
            <Card className="p-6">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Token Management Demo</h2>
                    <p className="text-muted-foreground">Please log in to test token functionality</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Token Management Demo</h2>

                <div className="space-y-4">
                    {/* User Info */}
                    <div>
                        <h3 className="font-medium mb-2">Current User</h3>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">{user.username}</Badge>
                            {user.role && <Badge variant="outline">{user.role}</Badge>}
                        </div>
                    </div>

                    {/* Token Status */}
                    {tokenInfo && (
                        <div>
                            <h3 className="font-medium mb-2">Token Status</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Access Token:</span>{' '}
                                    <Badge variant={tokenInfo.hasToken ? 'default' : 'destructive'}>
                                        {tokenInfo.hasToken ? 'Present' : 'Missing'}
                                    </Badge>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Refresh Token:</span>{' '}
                                    <Badge variant={tokenInfo.hasRefreshToken ? 'default' : 'destructive'}>
                                        {tokenInfo.hasRefreshToken ? 'Present' : 'Missing'}
                                    </Badge>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Expires:</span>{' '}
                                    {tokenInfo.tokenExpiration ?
                                        tokenInfo.tokenExpiration.toLocaleString() :
                                        'Unknown'
                                    }
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Time Until Expiry:</span>{' '}
                                    <Badge variant={
                                        tokenInfo.timeUntilExpiry === null ? 'destructive' :
                                            tokenInfo.timeUntilExpiry < 5 ? 'destructive' :
                                                tokenInfo.timeUntilExpiry < 10 ? 'secondary' : 'default'
                                    }>
                                        {tokenInfo.timeUntilExpiry !== null ?
                                            `${tokenInfo.timeUntilExpiry} min` :
                                            'Expired'
                                        }
                                    </Badge>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-muted-foreground">Needs Refresh:</span>{' '}
                                    <Badge variant={tokenInfo.shouldRefresh ? 'destructive' : 'default'}>
                                        {tokenInfo.shouldRefresh ? 'Yes' : 'No'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Last Refresh */}
                    {lastRefresh && (
                        <div>
                            <h3 className="font-medium mb-2">Last Token Refresh</h3>
                            <p className="text-sm text-muted-foreground">
                                {lastRefresh.toLocaleString()}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={handleRefreshToken}
                            disabled={refreshing || isLoading || !tokenInfo?.hasRefreshToken}
                            variant="secondary"
                        >
                            {refreshing ? 'Refreshing...' : 'Manual Refresh Token'}
                        </Button>

                        <Button
                            onClick={handleTestAutoRefresh}
                            disabled={isLoading}
                            variant="outline"
                        >
                            Test Auto Refresh Check
                        </Button>

                        <Button
                            onClick={handleLogout}
                            disabled={isLoading}
                            variant="destructive"
                        >
                            Logout (Call /api/logout)
                        </Button>
                    </div>

                    {/* Info */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">How it works:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• <strong>Manual Refresh:</strong> Calls <code>/api/token/refresh</code> endpoint</li>
                            <li>• <strong>Auto Refresh:</strong> Automatically triggered on 401 responses</li>
                            <li>• <strong>Logout:</strong> Calls <code>/api/logout</code> and clears local tokens</li>
                            <li>• <strong>Token expires in ~5min:</strong> Shows when refresh is needed</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AuthTokenDemo;