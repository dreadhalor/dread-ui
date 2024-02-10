import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@dread-ui/index';
import { getRandomAvatar } from '@repo/utils';

const recentSales = [
  {
    name: 'Olivia Martin',
    initials: 'OM',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    name: 'Jackson Lee',
    initials: 'JL',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
  },
  {
    name: 'Isabella Nguyen',
    initials: 'IN',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
  },
  {
    name: 'William Kim',
    initials: 'WK',
    email: 'will@email.com',
    amount: '+$99.00',
  },
  {
    name: 'Sofia Davis',
    initials: 'SD',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
  },
];
export function RecentSalesDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          See who purchased your products in the last 24 hours.
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-8'>
        {recentSales.map(({ name, initials, email, amount }) => (
          <div className='flex items-center' key={initials}>
            <Avatar className='h-9 w-9'>
              <AvatarImage src={getRandomAvatar(name)} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className='ml-4 space-y-1'>
              <p className='text-sm font-medium leading-none'>{name}</p>
              <p className='text-muted-foreground text-sm'>{email}</p>
            </div>
            <div className='ml-auto font-medium'>{amount}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
