import type { Meta, StoryObj } from "@storybook/react";
import ThemeToggle from "@/components/ThemeToggle";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Primary: Story = {
  args: {},
};
