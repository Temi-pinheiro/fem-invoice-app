import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Select Input',
  component: SelectInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Payment Terms',
    options: [
      {
        value: 'Net 1 Day',
        label: 'Net 1 Day',
      },
      {
        value: 'Net 7 Days',
        label: 'Net 7 Days',
      },
      {
        value: 'Net 14 Days',
        label: 'Net 14 Days',
      },
      {
        value: 'Net 30 Days',
        label: 'Net 30 Days',
      },
    ],
    placeholder: 'Select Payment Terms',
    name: 'paymentTerms',

    onChange: (v: any) => console.log('hello', v),
  },
};
