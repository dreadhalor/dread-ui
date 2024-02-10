import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@dread-ui/index';

export function ShareDocumentDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>
          Anyone with the link can view this document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-2'>
          <Input value='http://example.com/link/to/document' readOnly />
          <Button variant='secondary' className='shrink-0'>
            Copy Link
          </Button>
        </div>
        <Separator className='my-4' />
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>People with access</h4>
          <div className='grid gap-6'>
            <div className='flex min-w-0 items-center justify-between space-x-4'>
              <div className='flex min-w-0 items-center space-x-4'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/dreadhalor.png'
                    alt='Scott Hetrick'
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
                <div className='min-w-0'>
                  <p className='text-sm font-medium leading-none'>
                    Scott Hetrick
                  </p>
                  <p className='text-muted-foreground truncate text-sm'>
                    scotthetrick2@yahoo.com
                  </p>
                </div>
              </div>
              <Select defaultValue='edit'>
                <SelectTrigger className='ml-auto w-[120px] shrink-0'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='edit'>Can edit</SelectItem>
                  <SelectItem value='view'>Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center justify-between space-x-4'>
              <div className='flex items-center space-x-4'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='Arshad Chummun'
                  />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-medium leading-none'>
                    Arshad Chummun
                  </p>
                  <p className='text-muted-foreground text-sm'>
                    shad@shadcn.com
                  </p>
                </div>
              </div>
              <Select defaultValue='view'>
                <SelectTrigger className='ml-auto w-[120px]'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='edit'>Can edit</SelectItem>
                  <SelectItem value='view'>Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center justify-between space-x-4'>
              <div className='flex items-center space-x-4'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/t3dotgg.png'
                    alt='Theo Browne'
                  />
                  <AvatarFallback>TB</AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-medium leading-none'>
                    Theo Browne
                  </p>
                  <p className='text-muted-foreground text-sm'>theo@ping.gg</p>
                </div>
              </div>
              <Select defaultValue='view'>
                <SelectTrigger className='ml-auto w-[120px]'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='edit'>Can edit</SelectItem>
                  <SelectItem value='view'>Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
