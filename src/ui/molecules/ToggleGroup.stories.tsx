import type { Meta } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const meta: Meta = {
    title: 'UI/Molecules/ToggleGroup',
    component: ToggleGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Single = {
    render: () => (
        <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left">
                <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
                <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
                <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Multiple = {
    render: () => (
        <ToggleGroup type="multiple" defaultValue={['bold']}>
            <ToggleGroupItem value="bold">
                <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic">
                <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline">
                <Underline className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Outline = {
    render: () => (
        <ToggleGroup type="single" variant="outline" defaultValue="center">
            <ToggleGroupItem value="left">
                <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
                <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
                <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Small = {
    render: () => (
        <ToggleGroup type="single" size="sm" defaultValue="center">
            <ToggleGroupItem value="left">
                <AlignLeft className="h-3 w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
                <AlignCenter className="h-3 w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
                <AlignRight className="h-3 w-3" />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Large = {
    render: () => (
        <ToggleGroup type="single" size="lg" defaultValue="center">
            <ToggleGroupItem value="left">
                <AlignLeft className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
                <AlignCenter className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
                <AlignRight className="h-5 w-5" />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const WithText = {
    render: () => (
        <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Disabled = {
    render: () => (
        <ToggleGroup type="single" disabled defaultValue="center">
            <ToggleGroupItem value="left">
                <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
                <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
                <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};