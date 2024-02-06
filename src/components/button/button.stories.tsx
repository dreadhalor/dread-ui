import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { HomeIcon } from "@radix-ui/react-icons";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
};

export default meta;
type Story = StoryObj<typeof Button>;

/** A basic button. */
export const Demo: Story = {
  args: {
    children: "Button Label",
  },
  argTypes: {
    children: {
      description: "The button label.",
      control: {
        type: "text",
      },
    },
    variant: {
      description: "The button variant.",
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "destructive",
        "ghost",
        "link",
      ],
    },
    size: {
      description: "The button size.",
      control: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
      },
    },
    disabled: {
      description: "Whether the button is disabled.",
      control: {
        type: "boolean",
      },
    },
    asChild: {
      description: "Whether the button is rendered as a child of a slot.",
      control: {
        type: "boolean",
      },
    },
  },
  render: (args) => <Button {...args} />,
};

/** All button variants. */
export const Variants: Story = {
  args: {
    children: "Button Label",
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args}>Primary</Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

/** All button sizes. */
export const Sizes: Story = {
  args: {
    children: "Button Label",
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args} size="lg">
        Primary (lg)
      </Button>
      <Button {...args}>Primary (default)</Button>
      <Button {...args} size="sm">
        Primary (sm)
      </Button>
      <Button {...args} size="icon">
        <HomeIcon />
      </Button>
    </div>
  ),
};
