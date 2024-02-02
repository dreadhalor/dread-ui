import type { Meta, StoryObj } from "@storybook/react";
import { Button2 } from "./button2";

const meta = {
  title: "Example/Button2",
  component: Button2,
  tags: ["autodocs"],
} satisfies Meta<typeof Button2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
  },
  render: ({ children }) => <Button2>{children}</Button2>,
};
