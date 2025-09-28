import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ui/atoms';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverFooter,
    PopoverTitle,
    PopoverDescription,
    PopoverClose,
    PopoverArrow,
} from './Popover';

const meta: Meta<typeof Popover> = {
    title: 'UI/Molecules/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // Popover is mostly controlled by its children, so we don't have many args
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>
                        Set the dimensions for the layer.
                    </PopoverDescription>
                </PopoverHeader>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="width">Width</label>
                        <input
                            id="width"
                            defaultValue="100%"
                            className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="maxWidth">Max. width</label>
                        <input
                            id="maxWidth"
                            defaultValue="300px"
                            className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="height">Height</label>
                        <input
                            id="height"
                            defaultValue="25px"
                            className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="maxHeight">Max. height</label>
                        <input
                            id="maxHeight"
                            defaultValue="none"
                            className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const WithArrow: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open Popover with Arrow</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>
                    <PopoverTitle>Settings</PopoverTitle>
                    <PopoverDescription>
                        Configure your preferences here.
                    </PopoverDescription>
                </PopoverHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                            Choose how you want to be notified.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="push" />
                        <label htmlFor="push" className="text-sm">
                            Push notifications
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email" />
                        <label htmlFor="email" className="text-sm">
                            Email notifications
                        </label>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const WithFooter: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open Popover with Footer</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Confirm Action</PopoverTitle>
                    <PopoverDescription>
                        Are you sure you want to perform this action? This cannot be undone.
                    </PopoverDescription>
                </PopoverHeader>
                <PopoverFooter className="pt-4">
                    <PopoverClose asChild>
                        <Button variant="outline" size="sm">
                            Cancel
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button size="sm">
                            Confirm
                        </Button>
                    </PopoverClose>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    ),
};

export const DifferentSides: Story = {
    render: () => (
        <div className="flex gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Top</Button>
                </PopoverTrigger>
                <PopoverContent side="top">
                    <PopoverTitle>Top Popover</PopoverTitle>
                    <PopoverDescription>
                        This popover opens on the top side.
                    </PopoverDescription>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Right</Button>
                </PopoverTrigger>
                <PopoverContent side="right">
                    <PopoverTitle>Right Popover</PopoverTitle>
                    <PopoverDescription>
                        This popover opens on the right side.
                    </PopoverDescription>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                </PopoverTrigger>
                <PopoverContent side="bottom">
                    <PopoverTitle>Bottom Popover</PopoverTitle>
                    <PopoverDescription>
                        This popover opens on the bottom side.
                    </PopoverDescription>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Left</Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                    <PopoverTitle>Left Popover</PopoverTitle>
                    <PopoverDescription>
                        This popover opens on the left side.
                    </PopoverDescription>
                </PopoverContent>
            </Popover>
        </div>
    ),
};

export const CustomWidth: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Custom Width Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                <PopoverHeader>
                    <PopoverTitle>Wide Popover</PopoverTitle>
                    <PopoverDescription>
                        This popover has a custom width that's wider than the default.
                    </PopoverDescription>
                </PopoverHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <p className="text-sm">
                            You can customize the width of popovers by passing a className
                            to the PopoverContent component. This example uses 'w-96' to make
                            it wider than the default 'w-72'.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            The content will automatically wrap and adjust to the new width.
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const ControlledPopover: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);

        return (
            <div className="flex gap-4">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            {open ? 'Close' : 'Open'} Controlled Popover
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader>
                            <PopoverTitle>Controlled Popover</PopoverTitle>
                            <PopoverDescription>
                                This popover's open state is controlled externally.
                            </PopoverDescription>
                        </PopoverHeader>
                        <div className="py-4">
                            <p className="text-sm">
                                Current state: <strong>{open ? 'Open' : 'Closed'}</strong>
                            </p>
                        </div>
                        <PopoverFooter>
                            <Button onClick={() => setOpen(false)} size="sm">
                                Close via Button
                            </Button>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>

                <Button
                    variant="secondary"
                    onClick={() => setOpen(!open)}
                >
                    Toggle from Outside
                </Button>
            </div>
        );
    },
};