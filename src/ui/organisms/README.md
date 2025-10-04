# Sidebar Components

A comprehensive sidebar component system built with React, TypeScript, and
Tailwind CSS following atomic design principles. The sidebar provides a flexible
and accessible navigation solution with mobile responsiveness, keyboard shortcuts,
and multiple layout variants.

## Features

- **Responsive Design**: Automatically adapts to mobile with overlay behavior
- **Collapsible States**: Supports expanded, collapsed, and icon-only modes
- **Keyboard Navigation**: Built-in keyboard shortcuts (Ctrl/Cmd + B)
- **Accessibility**: Full ARIA support and screen reader friendly
- **Tooltip Support**: Automatic tooltips in collapsed mode
- **Theme Support**: Works with light/dark mode out of the box
- **Multiple Variants**: Sidebar, floating, and inset layouts
- **Flexible Positioning**: Left or right side placement

## Installation

The sidebar components require the following dependencies:

```bash
npm install @radix-ui/react-slot @radix-ui/react-tooltip @radix-ui/react-separator
```

## Basic Usage

```tsx
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@ui/organisms/SidebarComponents';

function App() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-6">
            <SidebarTrigger />
            <h1>Main Content</h1>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Components

### Core Components

#### `SidebarProvider`
Root context provider that manages sidebar state.

**Props:**
- `defaultOpen?: boolean` - Initial open state (default: true)
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change handler

#### `Sidebar`
Main sidebar container component.

**Props:**
- `side?: "left" | "right"` - Sidebar position (default: "left")
- `variant?: "sidebar" | "floating" | "inset"` - Visual variant (default: "sidebar")
- `collapsible?: "offcanvas" | "icon" | "none"` - Collapse behavior (default: "offcanvas")

#### `SidebarInset`
Main content area that adjusts to sidebar state.

#### `SidebarTrigger`
Button component to toggle sidebar visibility.

### Layout Components

#### `SidebarHeader`
Header section for logo, title, or search.

#### `SidebarContent`
Scrollable content area of the sidebar.

#### `SidebarFooter`
Footer section for user info or additional actions.

#### `SidebarSeparator`
Visual separator between sidebar sections.

### Menu Components

#### `SidebarGroup`
Container for related menu items with optional label.

#### `SidebarGroupLabel`
Label for a group of menu items.

#### `SidebarGroupContent`
Content container for group items.

#### `SidebarMenu`
List container for menu items.

#### `SidebarMenuItem`
Individual menu item wrapper.

#### `SidebarMenuButton`
Interactive menu button with variants and states.

**Props:**
- `variant?: "default" | "outline"` - Visual variant
- `size?: "sm" | "default" | "lg"` - Size variant
- `isActive?: boolean` - Active state
- `tooltip?: string | TooltipProps` - Tooltip content
- `asChild?: boolean` - Render as child element

### Advanced Menu Components

#### `SidebarMenuAction`
Secondary action button for menu items.

#### `SidebarMenuBadge`
Badge/notification indicator for menu items.

#### `SidebarMenuSub`
Sub-menu container for nested navigation.

#### `SidebarMenuSubItem`
Individual sub-menu item.

#### `SidebarMenuSubButton`
Interactive sub-menu button.

### Utility Components

#### `SidebarInput`
Styled input component for search functionality.

#### `SidebarMenuSkeleton`
Loading skeleton for menu items.

#### `SidebarRail`
Invisible resize handle for desktop interaction.

## Examples

### Collapsible Sidebar with Icons

```tsx
<SidebarProvider defaultOpen={false}>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Dashboard">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {/* Main content */}
  </SidebarInset>
</SidebarProvider>
```

### Sidebar with Search and Groups

```tsx
<Sidebar>
  <SidebarHeader>
    <h2>My App</h2>
    <SidebarInput placeholder="Search..." />
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
    <SidebarSeparator />
    <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </SidebarMenuButton>
            <SidebarMenuAction>
              <MoreHorizontal className="h-3 w-3" />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

### Right-Side Sidebar

```tsx
<SidebarProvider>
  <SidebarInset>
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1>Main Content</h1>
        <SidebarTrigger />
      </div>
    </div>
  </SidebarInset>
  <Sidebar side="right">
    <SidebarContent>
      {/* Sidebar content */}
    </SidebarContent>
  </Sidebar>
</SidebarProvider>
```

## Styling

The sidebar uses CSS custom properties for consistent theming:

```css
/* Sidebar-specific colors */
--sidebar-background
--sidebar-foreground
--sidebar-primary
--sidebar-primary-foreground
--sidebar-accent
--sidebar-accent-foreground
--sidebar-border
--sidebar-ring

/* Sizing */
--sidebar-width: 16rem
--sidebar-width-mobile: 18rem
--sidebar-width-icon: 3rem
```

## Accessibility

- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus management and visible focus indicators
- Semantic HTML structure
- Proper heading hierarchy

## Browser Support

Compatible with all modern browsers that support:
- CSS custom properties
- Flexbox
- CSS Grid
- Modern JavaScript (ES2020+)

## Contributing

When contributing to the sidebar components:

1. Follow the existing component patterns
2. Add proper TypeScript types
3. Include accessibility features
4. Test with keyboard navigation
5. Verify mobile responsiveness
6. Add Storybook stories for new features