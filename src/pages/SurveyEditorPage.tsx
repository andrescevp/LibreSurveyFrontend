import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    FileText,
    BarChart,
    Users,
    Settings,
    Bell,
    HelpCircle,
    Save,
    Eye,
    ArrowLeft
} from 'lucide-react';
import { ApplicationSkeleton } from '@ui/templates/ApplicationSkeleton';
import type { NavigationItem, UserProfile, TopBarAction } from '@ui/templates/ApplicationSkeleton';
import { useAuth } from '../auth';
import { SurveyEditor } from '../survey-editor';
import type { Survey } from '../survey-types';
import { Button } from '@ui/atoms/Button';

const SurveyEditorPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Navigation items for the sidebar
    const navigationItems: NavigationItem[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            href: '/',
        },
        {
            id: 'surveys',
            label: 'Surveys',
            icon: FileText,
            href: '/surveys',
            badge: '12',
        },
        {
            id: 'editor',
            label: 'Survey Editor',
            icon: FileText,
            href: '/editor',
            isActive: true,
        },
        {
            id: 'responses',
            label: 'Responses',
            icon: BarChart,
            href: '/responses',
            badge: '248',
        },
        {
            id: 'users',
            label: 'Users',
            icon: Users,
            href: '/users',
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            href: '/settings',
        },
    ];

    // User profile for the top bar
    const userProfile: UserProfile = {
        name: user?.name || user?.username || 'User',
        email: user?.username || 'user@example.com', // Using username as email placeholder
        role: 'Administrator', // Default role for now
    };

    // Top bar actions specific to survey editor
    const topBarActions: TopBarAction[] = [
        {
            id: 'save',
            label: 'Save Survey',
            icon: Save,
            onClick: () => console.log('Save clicked'),
        },
        {
            id: 'preview',
            label: 'Preview Survey',
            icon: Eye,
            onClick: () => console.log('Preview clicked'),
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            badge: '3',
            onClick: () => console.log('Notifications clicked'),
        },
        {
            id: 'help',
            label: 'Help',
            icon: HelpCircle,
            onClick: () => console.log('Help clicked'),
        },
    ];

    // Handle user menu actions
    const handleUserMenuClick = (action: string) => {
        switch (action) {
            case 'profile':
                console.log('Profile clicked');
                break;
            case 'settings':
                navigate('/settings');
                break;
            case 'logout':
                logout();
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    // Handle search
    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        // TODO: Implement search functionality for surveys/questions
    };

    // Survey editor handlers
    const handleSaveSurvey = (updatedSurvey: Survey) => {
        console.log('Survey saved:', updatedSurvey);
        // TODO: Implement actual save functionality
    };

    const handlePreviewSurvey = (surveyToPreview: Survey) => {
        console.log('Preview survey:', surveyToPreview);
        // TODO: Implement preview functionality
    };

    // Custom sidebar header with back button
    const sidebarHeader = (
        <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/')}
                    className="p-1 h-8 w-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="font-semibold text-sm">Survey Editor</h2>
                    <p className="text-xs text-muted-foreground">Demo Survey</p>
                </div>
            </div>
        </div>
    );

    // Breadcrumbs for the editor
    const breadcrumbs = [
        { label: 'Dashboard', href: '/' },
        { label: 'Surveys', href: '/surveys' },
        { label: 'Survey Editor' },
    ];

    return (
        <ApplicationSkeleton
            topBarTitle="LibreSurvey - Survey Editor"
            sidebarDefaultOpen={true}
            sidebarCollapsible="offcanvas"
            navigationItems={navigationItems}
            sidebarHeader={sidebarHeader}
            userProfile={userProfile}
            topBarActions={topBarActions}
            onUserMenuClick={handleUserMenuClick}
            showSearch={true}
            searchPlaceholder="Search questions, logic..."
            onSearch={handleSearch}
            showBreadcrumbs={true}
            breadcrumbs={breadcrumbs}
            contentClassName="p-0" // Remove default padding since SurveyEditor handles its own layout
        >
            {/* Survey Editor wrapped in a container that takes full height */}
            <div className="h-[calc(100vh-4rem)] overflow-hidden"> {/* Adjust height to account for top bar */}
                <SurveyEditor
                    initialSurvey={{
                        code: 'demo_survey',
                        title: 'Demo Survey',
                        description: 'A sample survey to demonstrate the editor',
                    }}
                    onSave={handleSaveSurvey}
                    onPreview={handlePreviewSurvey}
                />
            </div>
        </ApplicationSkeleton>
    );
};

export default SurveyEditorPage;