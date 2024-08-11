import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "@/app/components/Dropdown";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "/Dropdown",
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    selected: 'Option 1',
    options: ['Option 1', 'Option 2', 'Option 3']
  },
};

