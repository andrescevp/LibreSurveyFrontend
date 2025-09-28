import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'underline'],
      description: 'Visual style variant of the tabs',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tabs',
    },
    contentSpacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing between tabs list and content',
    },
    defaultValue: {
      control: 'text',
      description: 'The default active tab value',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px] p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Tabs Example
export const Default: Story = {
  render: ({ variant = 'default', size = 'md', contentSpacing = 'md', ...args }) => (
    <Tabs defaultValue="account" className="w-full" {...args}>
      <TabsList variant={variant} size={size}>
        <TabsTrigger value="account" variant={variant} size={size}>Account</TabsTrigger>
        <TabsTrigger value="password" variant={variant} size={size}>Password</TabsTrigger>
        <TabsTrigger value="settings" variant={variant} size={size}>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" spacing={contentSpacing}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Account</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password" spacing={contentSpacing}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings" spacing={contentSpacing}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your application settings and preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'account',
  },
};

// Card Variant
export const CardVariant: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" className="w-full" {...args}>
      <TabsList variant="card" size="md">
        <TabsTrigger value="overview" variant="card" size="md">Overview</TabsTrigger>
        <TabsTrigger value="analytics" variant="card" size="md">Analytics</TabsTrigger>
        <TabsTrigger value="reports" variant="card" size="md">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" spacing="md">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold">Overview Dashboard</h3>
          <p className="text-sm text-muted-foreground mt-2">
            View your main dashboard metrics and key performance indicators.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" spacing="md">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Detailed analytics and insights about your data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" spacing="md">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold">Reports</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Generate and view comprehensive reports.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'overview',
  },
};

// Underline Variant
export const UnderlineVariant: Story = {
  render: (args) => (
    <Tabs defaultValue="home" className="w-full" {...args}>
      <TabsList variant="underline" size="md">
        <TabsTrigger value="home" variant="underline" size="md">Home</TabsTrigger>
        <TabsTrigger value="products" variant="underline" size="md">Products</TabsTrigger>
        <TabsTrigger value="services" variant="underline" size="md">Services</TabsTrigger>
        <TabsTrigger value="contact" variant="underline" size="md">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="home" spacing="lg">
        <div className="py-4">
          <h3 className="text-xl font-semibold mb-2">Welcome Home</h3>
          <p className="text-muted-foreground">
            This is the home page content with underline-style navigation.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="products" spacing="lg">
        <div className="py-4">
          <h3 className="text-xl font-semibold mb-2">Our Products</h3>
          <p className="text-muted-foreground">
            Explore our wide range of products and services.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="services" spacing="lg">
        <div className="py-4">
          <h3 className="text-xl font-semibold mb-2">Services</h3>
          <p className="text-muted-foreground">
            Learn about the services we offer to our customers.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="contact" spacing="lg">
        <div className="py-4">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-muted-foreground">
            Get in touch with our team for any inquiries.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'home',
  },
};

// Small Size
export const SmallSize: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" className="w-full" {...args}>
      <TabsList variant="default" size="sm">
        <TabsTrigger value="tab1" variant="default" size="sm">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2" variant="default" size="sm">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" variant="default" size="sm">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" spacing="sm">
        <p className="text-sm">Small tabs with minimal spacing.</p>
      </TabsContent>
      <TabsContent value="tab2" spacing="sm">
        <p className="text-sm">Second tab content in small size.</p>
      </TabsContent>
      <TabsContent value="tab3" spacing="sm">
        <p className="text-sm">Third tab content in small size.</p>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'tab1',
  },
};

// Large Size with Card Variant
export const LargeSize: Story = {
  render: (args) => (
    <Tabs defaultValue="dashboard" className="w-full" {...args}>
      <TabsList variant="card" size="lg">
        <TabsTrigger value="dashboard" variant="card" size="lg">Dashboard</TabsTrigger>
        <TabsTrigger value="users" variant="card" size="lg">Users</TabsTrigger>
        <TabsTrigger value="settings" variant="card" size="lg">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" spacing="xl">
        <div className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-muted-foreground">
            Large tabs with extra spacing provide a more spacious feel.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="users" spacing="xl">
        <div className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <p className="text-muted-foreground">
            Manage users and their permissions from this panel.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings" spacing="xl">
        <div className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold mb-4">System Settings</h2>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'dashboard',
  },
};

// Disabled Tab Example
export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs defaultValue="available" className="w-full" {...args}>
      <TabsList variant="default" size="md">
        <TabsTrigger value="available" variant="default" size="md">Available</TabsTrigger>
        <TabsTrigger value="pending" variant="default" size="md">Pending</TabsTrigger>
        <TabsTrigger value="disabled" variant="default" size="md" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="available" spacing="md">
        <div className="p-4 rounded-lg bg-muted">
          <p>This tab is available and active.</p>
        </div>
      </TabsContent>
      <TabsContent value="pending" spacing="md">
        <div className="p-4 rounded-lg bg-muted">
          <p>This tab shows pending items.</p>
        </div>
      </TabsContent>
      <TabsContent value="disabled" spacing="md">
        <div className="p-4 rounded-lg bg-muted">
          <p>This content won't be visible due to disabled tab.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'available',
  },
};