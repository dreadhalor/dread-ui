import { cn } from '@repo/utils';
import { Icons } from '../icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dread-ui/index';

const paymentMethods = [
  { icon: Icons.card, title: 'Card' },
  { icon: Icons.paypal, title: 'Paypal' },
  { icon: Icons.apple, title: 'Apple' },
];

export function PaymentMethodDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <RadioGroup defaultValue='apple' className='grid grid-cols-3 gap-4'>
          {paymentMethods.map(({ icon: Icon, title }) => (
            <Label
              className={cn(
                'border-muted bg-popover flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4',
                'hover:bg-accent hover:text-accent-foreground',
                '[&:has([data-state=checked])]:border-primary',
              )}
              key={title}
            >
              <RadioGroupItem value={title.toLowerCase()} className='sr-only' />
              <Icon className='mb-3 h-6 w-6' title='test' />
              {title}
            </Label>
          ))}
        </RadioGroup>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' placeholder='First Last' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='number'>Card number</Label>
          <Input id='number' placeholder='' />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='month'>Expires</Label>
            <Select>
              <SelectTrigger id='month'>
                <SelectValue placeholder='Month' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>January</SelectItem>
                <SelectItem value='2'>February</SelectItem>
                <SelectItem value='3'>March</SelectItem>
                <SelectItem value='4'>April</SelectItem>
                <SelectItem value='5'>May</SelectItem>
                <SelectItem value='6'>June</SelectItem>
                <SelectItem value='7'>July</SelectItem>
                <SelectItem value='8'>August</SelectItem>
                <SelectItem value='9'>September</SelectItem>
                <SelectItem value='10'>October</SelectItem>
                <SelectItem value='11'>November</SelectItem>
                <SelectItem value='12'>December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='year'>Year</Label>
            <Select>
              <SelectTrigger id='year'>
                <SelectValue placeholder='Year' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='cvc'>CVC</Label>
            <Input id='cvc' placeholder='CVC' />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Continue</Button>
      </CardFooter>
    </Card>
  );
}
