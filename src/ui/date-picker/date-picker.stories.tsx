import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import { DatePicker, DatePickerProps } from './date-picker';
import { DateRange } from 'react-day-picker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Components/Date Picker',
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const DatePickerSingleOrRangeDemo = (props: DatePickerProps) => {
  const [date, setDate] = useState<Date | DateRange>();

  return <DatePicker selected={date} onSelect={setDate} {...props} />;
};
export const Demo: Story = {
  render: DatePickerSingleOrRangeDemo,
};

export const Disabled: Story = {
  render: () => <DatePicker disabled />,
};

export const DisabledDates: Story = {
  render: () => (
    <DatePicker
      disabledDates={
        // disable all days after today
        (day) => day > new Date()
      }
    />
  ),
};

export const DateRangePicker: Story = {
  render: () => <DatePicker mode='range' />,
};
