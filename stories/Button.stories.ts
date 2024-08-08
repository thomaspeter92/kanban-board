import type { Meta, StoryObj } from "@storybook/react";
import "@/app/globals.css"; // replace with the name of your tailwind css file
import Button from "@/app/components/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button Text",
    intent: "primary",
    size: "lg",
  },
  argTypes: {
    size: {
      options: ["lg", "sm"],
      control: { type: "inline-radio" },
    },
  },
};

export const Secondary: Story = {
  args: {
    children: "Button Text",
    intent: "secondary",
    size: "lg",
  },
  argTypes: {
    size: {
      options: ["lg", "sm"],
      control: { type: "inline-radio" },
    },
  },
};

export const Destructive: Story = {
  args: {
    children: "Button Text",
    intent: "destructive",
    size: "lg",
  },
  argTypes: {
    size: {
      options: ["lg", "sm"],
      control: { type: "inline-radio" },
    },
  },
};

export const IconButton: Story = {
  args: {
    children: "Button Text",
    intent: "primary",
    size: "lg",
    icon: 'heart'
  },
  argTypes: {
    size: {
      options: ["lg", "sm"],
      control: { type: "inline-radio" },
    },
    intent: {
      options: ['primary', 'secondary', 'destructive'],
      control: {type: 'inline-radio'}
    },
   
  },
};
