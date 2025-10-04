# Pages

This directory contains the main application pages built using the ApplicationSkeleton template.

## Pages Overview

### HomePage (`HomePage.tsx`)

The main dashboard page that provides an overview of the survey system.

**Features:**
- **Dashboard Statistics**: Key metrics with trend indicators
- **Recent Surveys**: List of recent surveys with status badges
- **Quick Actions**: Easy access to common tasks
- **Activity Feed**: Recent activity timeline
- **Responsive Design**: Adapts to different screen sizes

**Navigation Items:**
- Dashboard (active)
- Surveys (with badge showing count)
- Responses (with badge showing total responses)
- Users
- Settings

### SurveyEditorPage (`SurveyEditorPage.tsx`)

A dedicated page for the survey editor with integrated navigation and tools.

**Features:**
- **Full Survey Editor**: Wraps the existing SurveyEditor component
- **Editor-Specific Actions**: Save and Preview buttons in top bar
- **Breadcrumb Navigation**: Shows current location in app
- **Custom Sidebar Header**: Back button and survey info
- **Search Integration**: Search for questions and logic

**Navigation Items:**
- Dashboard
- Surveys
- Survey Editor (active)
- Responses
- Users
- Settings

## Shared Features

Both pages include:

- **Authentication Integration**: Uses the existing auth system
- **User Profile**: Shows authenticated user info with dropdown menu
- **Responsive Sidebar**: Collapsible navigation with mobile support
- **Search Functionality**: Integrated search in the top bar
- **Notifications**: Bell icon with badge for alerts
- **Help Integration**: Help icon for assistance

## Usage

### Basic Navigation

```tsx
import { HomePage, SurveyEditorPage } from './pages';

// In your router
<Route path="/" element={<HomePage />} />
<Route path="/editor" element={<SurveyEditorPage />} />
```

### Authentication

Both pages integrate with the existing auth system:

```tsx
const { user, logout } = useAuth();

// User profile is automatically populated
const userProfile: UserProfile = {
  name: user?.name || user?.username || 'User',
  email: user?.username || 'user@example.com',
  role: 'Administrator',
};
```

### Navigation

Navigation between pages uses React Router:

```tsx
const navigate = useNavigate();

// Navigate to survey editor
const handleCreateSurvey = () => {
  navigate('/editor');
};

// Navigate back to dashboard
const handleBackToDashboard = () => {
  navigate('/');
};
```

## Customization

### Adding New Statistics

To add new statistics to the HomePage:

```tsx
const stats = [
  // ... existing stats
  {
    title: 'New Metric',
    value: '42',
    change: '+5 from last week',
    trend: 'up' as const,
    icon: YourIcon,
  },
];
```

### Adding Navigation Items

To add new navigation items:

```tsx
const navigationItems: NavigationItem[] = [
  // ... existing items
  {
    id: 'new-page',
    label: 'New Page',
    icon: YourIcon,
    href: '/new-page',
    badge: 'New', // Optional
  },
];
```

### Customizing Top Bar Actions

To add new actions to the top bar:

```tsx
const topBarActions: TopBarAction[] = [
  // ... existing actions
  {
    id: 'new-action',
    label: 'New Action',
    icon: YourIcon,
    onClick: () => handleNewAction(),
    badge: '1', // Optional
  },
];
```

## Integration with Existing Components

### SurveyEditor Integration

The SurveyEditorPage wraps the existing SurveyEditor component:

```tsx
<SurveyEditor
  initialSurvey={{
    code: 'demo_survey',
    title: 'Demo Survey',
    description: 'A sample survey to demonstrate the editor',
  }}
  onSave={handleSaveSurvey}
  onPreview={handlePreviewSurvey}
/>
```

### Auth System Integration

Both pages use the existing authentication system:

```tsx
import { useAuth } from '../auth';

const { user, logout } = useAuth();

// Handle logout
const handleUserMenuClick = (action: string) => {
  if (action === 'logout') {
    logout();
  }
};
```

## Styling

Pages use the ApplicationSkeleton template which provides:

- **Design System Integration**: Uses semantic color tokens
- **Dark Mode Support**: Automatic theme switching
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Full keyboard navigation and screen reader support

## Performance Considerations

- **Code Splitting**: Pages can be lazy-loaded for better performance
- **State Management**: Consider using state management for shared data
- **Caching**: Implement caching for statistics and survey data
- **Optimistic Updates**: Use optimistic updates for better UX

## Future Enhancements

Potential improvements:

1. **Real-time Updates**: WebSocket integration for live statistics
2. **Advanced Search**: Full-text search across surveys and responses
3. **Customizable Dashboard**: User-configurable widgets and metrics
4. **Bulk Operations**: Multi-select actions for surveys
5. **Export Functionality**: Export data in various formats
6. **Advanced Filtering**: Complex filtering and sorting options