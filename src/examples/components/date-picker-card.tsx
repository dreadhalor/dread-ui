import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DatePicker,
  DatePickerMode,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@dread-ui/index';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export function DatePickerCardDemo() {
  const [mode, setMode] = useState<DatePickerMode>('range');
  const [selected, setSelected] = useState<Date | DateRange>();

  const updateMode = (mode: string) => {
    if (mode === 'single' || mode === 'range') setMode(mode);
    else console.error('Invalid date picker mode');
  };

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle>Date Filter</CardTitle>
        <CardDescription>Filter your leads by date</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-4'>
          <RadioGroup
            className='mb-1 grid grid-cols-2'
            defaultValue={mode}
            onValueChange={updateMode}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='single' id='single' />
              <Label htmlFor='single'>Single date</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='range' id='range' />
              <Label htmlFor='range'>Date range</Label>
            </div>
          </RadioGroup>
          <DatePicker
            mode={mode}
            className='w-full'
            selected={selected}
            onSelect={setSelected}
          />
          <div className='flex justify-between'>
            <Button variant='ghost' onClick={() => setSelected(undefined)}>
              Clear
            </Button>
            <Button>Filter</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
