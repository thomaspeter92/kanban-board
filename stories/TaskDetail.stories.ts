import type { Meta, StoryObj } from "@storybook/react";
import TaskDetail from "@/components/TaskDetail";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "/TaskDetail",
  component: TaskDetail,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  //   decorators: [(Story) => div]
} satisfies Meta<typeof TaskDetail>;

export default meta;

type Story = StoryObj<typeof TaskDetail>;

export const Primary: Story = {
  args: {
    task: {
      title:
        "Research pricing points of various competitors and trial different business models",
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        "Talk to potential customers about our proposed solution and ask for fair price expectancy",
        "Outline a business model that works for our solution",
        "Research competitor pricing and business models",
      ],
      status: "Doing",
    },
  },
};
