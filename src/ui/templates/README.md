# ApplicationSkeleton Template

A comprehensive application layout template that provides a complete UI shell
with sidebar navigation, top bar, and main content area. This template-level
component combines multiple organisms and molecules to create a fully functional
application layout following atomic design principles.

## Features

- **Complete Layout Structure**: Sidebar + top bar + main content
- **Responsive Design**: Mobile-first with adaptive sidebar behavior
- **Flexible Navigation**: Configurable sidebar with icons, badges, and sub-menus
- **Top Bar Integration**: Search, actions, and user profile dropdown
- **Breadcrumb Support**: Optional breadcrumb navigation
- **Multiple Variants**: Different sidebar styles and positioning
- **Accessibility**: Full keyboard navigation and screen reader support
- **Theme Integration**: Works seamlessly with light/dark mode

## Usage

```tsx
import { ApplicationSkeleton } from '@ui/templates/ApplicationSkeleton';
import type { NavigationItem, UserProfile, TopBarAction } from '@ui/templates/ApplicationSkeleton';
import { Home, Settings, Users } from 'lucide-react';

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: Home,
    href: '/',
    isActive: true,
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    href: '/users',
    badge: '12',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

const userProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Administrator',
};

function App() {
  return (
    <ApplicationSkeleton
      navigationItems={navigationItems}
      userProfile={userProfile}
      topBarTitle="My Application"
      onUserMenuClick={(action) => console.log('User action:', action)}
    >
      <div>
        <h1>Main Content</h1>
        <p>Your application content goes here.</p>
      </div>
    </ApplicationSkeleton>
  );
}
```

## Props

### Core Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Main content area |
| `className` | `string` | - | Additional CSS classes |

### Sidebar Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sidebarDefaultOpen` | `boolean` | `true` | Initial sidebar state |
| `sidebarCollapsible` | `offcanvas`, `icon`, `none` | `offcanvas` | Collapse behavior |
| `sidebarVariant` | `sidebar`, `floating`, `inset` | `sidebar` | Visual variant |
| `sidebarSide` | `'left' \| 'right'` | `'left'` | Sidebar position |
| `navigationItems` | `NavigationItem[]` | `[]` | Navigation menu items |
| `sidebarHeader` | `ReactNode` | - | Custom sidebar header |
| `sidebarFooter` | `ReactNode` | - | Custom sidebar footer |

### Top Bar Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `topBarTitle` | `string` | `'Application'` | Application title |
| `topBarActions` | `TopBarAction[]` | `[]` | Action buttons |
| `showSearch` | `boolean` | `true` | Show search input |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `onSearch` | `(query: string) => void` | - | Search callback |

### User Profile

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userProfile` | `UserProfile` | - | User profile data |
| `onUserMenuClick` | `(action: string) => void` | - | User menu callback |

### Content Area

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `contentClassName` | `string` | - | Content area CSS classes |
| `showBreadcrumbs` | `boolean` | `false` | Show breadcrumbs |
| `breadcrumbs` | `Breadcrumb[]` | `[]` | Breadcrumb items |

## Type Definitions

### NavigationItem

```tsx
interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  isActive?: boolean;
  badge?: string | number;
  children?: NavigationItem[];
}
```

### UserProfile

```tsx
interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
```

### TopBarAction

```tsx
interface TopBarAction {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  badge?: string | number;
}
```

## Layout Variants

### Default Sidebar

```tsx
<ApplicationSkeleton
  sidebarVariant="sidebar"
  sidebarCollapsible="offcanvas"
  // ... other props
>
```

### Floating Sidebar

```tsx
<ApplicationSkeleton
  sidebarVariant="floating"
  sidebarCollapsible="icon"
  // ... other props
>
```

### Right-Side Sidebar

```tsx
<ApplicationSkeleton
  sidebarSide="right"
  // ... other props
>
```

### Icon-Only Sidebar

```tsx
<ApplicationSkeleton
  sidebarDefaultOpen={false}
  sidebarCollapsible="icon"
  // ... other props
>
```

## Advanced Examples

### With Custom Sidebar Header

```tsx
<ApplicationSkeleton
  sidebarHeader={
    <div className="flex items-center gap-2 p-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold">LS</span>
      </div>
      <div>
        <h2 className="font-semibold text-sm">LibreSurvey</h2>
        <p className="text-xs text-muted-foreground">v2.0.0</p>
      </div>
    </div>
  }
  // ... other props
>
```

### With Top Bar Actions

```tsx
const topBarActions: TopBarAction[] = [
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    badge: '3',
    onClick: () => showNotifications(),
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    onClick: () => openHelp(),
  },
];

<ApplicationSkeleton
  topBarActions={topBarActions}
  // ... other props
>
```

### With Breadcrumbs

```tsx
<ApplicationSkeleton
  showBreadcrumbs
  breadcrumbs={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/users' },
    { label: 'Profile' },
  ]}
  // ... other props
>
```

### With Search Functionality

```tsx
<ApplicationSkeleton
  showSearch
  searchPlaceholder="Search users, surveys..."
  onSearch={(query) => {
    console.log('Searching for:', query);
    // Implement search logic
  }}
  // ... other props
>
```

## Responsive Behavior

- **Desktop**: Full sidebar with configurable collapse states
- **Tablet**: Adaptive sidebar behavior based on screen size
- **Mobile**: Sidebar becomes an overlay sheet that can be toggled

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Logical focus order and visible focus indicators
- **High Contrast**: Works well with high contrast themes

## Styling

The component uses design system tokens for consistent theming:

```css
/* Key CSS custom properties */
--sidebar-width: 16rem
--sidebar-width-mobile: 18rem
--sidebar-width-icon: 3rem

/* Theme colors */
--sidebar-background
--sidebar-foreground
--sidebar-border
--sidebar-accent
```

## Integration Tips

1. **State Management**: Use the callbacks to integrate with your state
   management solution
2. **Routing**: Use navigation items with proper href values for routing
3. **Authentication**: Conditionally render user profile based on auth state
4. **Permissions**: Filter navigation items based on user permissions
5. **Real-time Updates**: Use badges to show real-time notifications or counts

## Best Practices

- Keep navigation items concise and well-organized
- Use meaningful icons that match your design system
- Implement proper loading states for dynamic content
- Test keyboard navigation thoroughly
- Ensure proper contrast ratios for accessibility
- Use consistent spacing and typography