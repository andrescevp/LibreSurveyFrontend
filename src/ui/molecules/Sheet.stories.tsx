import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ui/atoms';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './Sheet';

const meta: Meta<typeof Sheet> = {
    title: 'UI/Molecules/Sheet',
    component: Sheet,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // We'll focus on SheetContent's side prop for the main story
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with right side (default)
export const Default: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="username" className="text-right text-sm font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    ),
};

// Left side sheet
export const LeftSide: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Left Sheet</Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                        Navigate through different sections of the application.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <nav className="flex flex-col space-y-2">
                        <a href="#" className="px-2 py-1 rounded hover:bg-accent">Home</a>
                        <a href="#" className="px-2 py-1 rounded hover:bg-accent">About</a>
                        <a href="#" className="px-2 py-1 rounded hover:bg-accent">Services</a>
                        <a href="#" className="px-2 py-1 rounded hover:bg-accent">Contact</a>
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    ),
};

// Top sheet
export const TopSide: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Top Sheet</Button>
            </SheetTrigger>
            <SheetContent side="top">
                <SheetHeader>
                    <SheetTitle>Notification Center</SheetTitle>
                    <SheetDescription>
                        View your latest notifications and updates.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium">New message received</p>
                                <p className="text-xs text-muted-foreground">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium">Survey completed</p>
                                <p className="text-xs text-muted-foreground">1 hour ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    ),
};

// Bottom sheet
export const BottomSide: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Bottom Sheet</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Quick Actions</SheetTitle>
                    <SheetDescription>
                        Perform quick actions without leaving this page.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <Button variant="outline" size="sm">
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            Import
                        </Button>
                        <Button variant="outline" size="sm">
                            Share
                        </Button>
                        <Button variant="outline" size="sm">
                            Print
                        </Button>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    ),
};

// Without close button (controlled)
export const WithoutCloseButton: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Controlled Sheet</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Controlled Sheet</SheetTitle>
                    <SheetDescription>
                        This sheet doesn't show the default close button.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        Use the footer buttons or press Escape to close.
                    </p>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button>Confirm</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    ),
};

// Custom styling
export const CustomStyling: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Custom Sheet</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="text-primary">Custom Styled Sheet</SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                        This sheet has custom styling applied.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    <div className="p-4 bg-accent rounded-lg">
                        <h4 className="font-semibold mb-2">Featured Content</h4>
                        <p className="text-sm text-muted-foreground">
                            This content is highlighted with a background color.
                        </p>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-semibold mb-2">Bordered Section</h4>
                        <p className="text-sm text-muted-foreground">
                            This section has a subtle border.
                        </p>
                    </div>
                </div>
                <SheetFooter className="sm:justify-start">
                    <SheetClose asChild>
                        <Button variant="destructive">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    ),
};