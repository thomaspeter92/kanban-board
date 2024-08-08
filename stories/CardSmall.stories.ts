import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import CardSmall from "@/app/components/CardSmall";
import "@/app/globals.css"; // replace with the name of your tailwind css file

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "/CardSmall",
  component: CardSmall,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof CardSmall>;

export default meta;

type Story = StoryObj<typeof CardSmall>;

export const Primary: Story = {
  args: {
    task: "Example of a task with text truncation",
    subtasks: 3,
    subtasksCompleted: 1,
  },
};
