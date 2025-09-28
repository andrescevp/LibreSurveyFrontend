import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ui/atoms/Button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './AlertDialog';

const meta: Meta<typeof AlertDialog> = {
    title: 'UI/Molecules/AlertDialog',
    component: AlertDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

export const Destructive: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

export const LongContent: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Show Long Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please read and accept our terms and conditions. This is a longer
                        description that demonstrates how the dialog handles larger amounts
                        of content. The dialog will automatically adjust its size and
                        maintain proper spacing between elements.
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Decline</AlertDialogCancel>
                    <AlertDialogAction>Accept</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

export const WithCustomContent: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="secondary">Custom Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                        🎉 Congratulations!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        You have successfully completed the survey. Your responses have
                        been saved.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center py-4">
                    <div className="rounded-lg bg-accent p-4 text-center">
                        <p className="text-lg font-semibold text-accent-foreground">
                            Survey Complete
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Thank you for your participation
                        </p>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className="w-full">Close</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

export const SimpleConfirmation: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Save Changes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Save changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Do you want to save your changes before leaving?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Don't Save</AlertDialogCancel>
                    <AlertDialogAction>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};