import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

// Let's put a description here because Storybook is buggy
/** A vertically stacked set of interactive headings that each reveal a section of content. */
const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Components/Accordion",
  argTypes: {
    type: {
      description: "The accordion type.",
      options: ["single", "multiple"],
      control: { type: "select" },
    },
    // collapsible is only a prop of the 'single' accordion, so just ignore the error when 'multiple' is selected
    collapsible: {
      description:
        "Whether an accordion item can be collapsed after it has been opened.",
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/** A basic accordion. */
export const Demo: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/** An accordion that can have multiple panels open at the same time. */
export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What are the specifications?</AccordionTrigger>
        <AccordionContent>
          Our product adheres to the highest industry standards, providing
          unparalleled performance & quality.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Are there customizable options?</AccordionTrigger>
        <AccordionContent>
          Absolutely. The product comes with a variety of customizable options
          to match your specific needs & preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          What about the product's appearance?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 leading-6">
            <li>
              Our design team has meticulously crafted the aesthetics of the
              product, ensuring a sleek & modern look.
            </li>
            <li>
              We understand the importance of style & that is why our product is
              not only functional but also visually appealing.
            </li>
            <li>
              The product's design complements any environment it's placed in,
              adding a touch of elegance & sophistication.
            </li>
            <li>
              Apart from functionality, we have invested in creating an
              ergonomic design that ensures comfort during usage.
            </li>
            <li>
              The product features a durable finish that resists wear & tear,
              maintaining its pristine appearance over time.
            </li>
            <li>
              We believe that a product should be visually pleasing as it is
              functional. With this philosophy, we've created a product that
              you'll be proud to showcase.
            </li>
            <li>
              Our product blends in with any interior design, thanks to its
              versatile aesthetic.
            </li>
            <li>
              Each detail on the product is carefully thought out to enhance its
              overall aesthetic & user experience.
            </li>
            <li>
              We've ensured that our product doesn't just work exceptionally
              well, but also looks fantastic in any setting.
            </li>
            <li>
              The aesthetic of our product is an embodiment of our commitment to
              providing you not only with performance but also style.
            </li>
            <li>
              Every aspect of our product's design is aimed at complementing its
              surroundings & meeting your style needs.
            </li>
            <li>
              Our product's design not only focuses on delivering superior
              functionality, but also on elevating the overall aesthetic appeal
              of your space.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
