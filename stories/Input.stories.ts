import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: "Enter task name",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Enter task name",
    error: true,
    errorMessage: "This is an error",
  },
};
