import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/app/components/TaskCheckbox";
import TaskCheckbox from "@/app/components/TaskCheckbox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "/TaskCheckbox",
  component: TaskCheckbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof TaskCheckbox>;

export default meta;

type Story = StoryObj<typeof TaskCheckbox>;

export const Primary: Story = {
  args: {
  task: "Example task here."
  },
  argTypes: {
    checked: {
      control: 'boolean'
    }
  }
};
